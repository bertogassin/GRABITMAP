use super::auth::verify_user_session;
use super::chat_api::ensure_conversation_for_outgoing;
use super::chat_identity::active_user_id_by_chat_route;
use super::common::{input_text_is_valid, rate_limit_retry_after, request_is_cross_site, unix_now};
use super::user_blocks::users_are_blocked;
use crate::state::app_state::AppState;
use axum::{
    body::Body,
    extract::{multipart::Field, Multipart, Path, State},
    http::{header, HeaderMap, HeaderValue, StatusCode},
    response::{IntoResponse, Response},
    Json,
};
use serde::Serialize;
use serde_json::json;
use std::fs;
use std::path::{Path as FsPath, PathBuf};
use tokio::io::AsyncWriteExt;

const MAX_IMAGE_BYTES: usize = 8 * 1024 * 1024;
pub(crate) const MAX_VOICE_BYTES: usize = 8 * 1024 * 1024;
pub(crate) const MAX_VIDEO_BYTES: usize = 40 * 1024 * 1024;
pub(crate) const MAX_DOCUMENT_BYTES: usize = 16 * 1024 * 1024;
pub(crate) const MAX_VIDEO_DURATION_SECONDS: f64 = 180.0;

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub(crate) struct DetectedMedia {
    pub kind: &'static str,
    pub mime: &'static str,
    pub extension: &'static str,
    pub max_bytes: usize,
}

#[derive(Debug, Serialize)]
struct MediaChatMessage {
    id: i64,
    message: String,
    is_mine: bool,
    delivered_at: i64,
    read_at: i64,
    created_at: i64,
    reply_to_message_id: Option<i64>,
    reply_is_mine: bool,
    reply_message: String,
    edited_at: i64,
    deleted_at: i64,
    #[serde(skip_serializing_if = "String::is_empty")]
    client_message_id: String,
    #[serde(skip_serializing_if = "String::is_empty")]
    attachment_kind: String,
    #[serde(skip_serializing_if = "String::is_empty")]
    attachment_mime: String,
    attachment_size: i64,
    #[serde(skip_serializing_if = "String::is_empty")]
    attachment_url: String,
}

fn json_error(status: StatusCode, error: &str) -> Response {
    (status, Json(json!({"ok": false, "error": error}))).into_response()
}

fn client_message_id_is_valid(value: &str) -> bool {
    (16..=80).contains(&value.len())
        && value
            .bytes()
            .all(|b| b.is_ascii_alphanumeric() || b == b'-' || b == b'_')
}

pub(crate) fn media_root() -> PathBuf {
    std::env::var("CHAT_MEDIA_DIR")
        .ok()
        .map(PathBuf::from)
        .filter(|path| !path.as_os_str().is_empty())
        .unwrap_or_else(|| PathBuf::from("data/chat-media"))
}

#[derive(Debug)]
pub(crate) struct QuarantinedUpload {
    path: Option<PathBuf>,
    pub original_name: String,
    pub size: usize,
    prefix: Vec<u8>,
}

impl QuarantinedUpload {
    pub(crate) fn publish(mut self, destination: &FsPath) -> std::io::Result<()> {
        if let Some(parent) = destination.parent() {
            fs::create_dir_all(parent)?;
        }
        let source = self.path.take().ok_or_else(|| {
            std::io::Error::new(std::io::ErrorKind::NotFound, "quarantine file missing")
        })?;
        if let Err(error) = fs::rename(&source, destination) {
            self.path = Some(source);
            return Err(error);
        }
        Ok(())
    }

    fn is_zip(&self) -> bool {
        looks_like_zip(&self.prefix)
    }
}

impl Drop for QuarantinedUpload {
    fn drop(&mut self) {
        if let Some(path) = self.path.take() {
            let _ = fs::remove_file(path);
        }
    }
}

#[derive(Clone, Copy, Debug)]
pub(crate) struct AttachmentValidationError {
    pub status: StatusCode,
    pub code: &'static str,
}

fn quarantine_root() -> PathBuf {
    media_root().join(".quarantine")
}

async fn cleanup_stale_quarantine(root: &FsPath) {
    let Ok(mut entries) = tokio::fs::read_dir(root).await else {
        return;
    };
    let stale_before = std::time::SystemTime::now()
        .checked_sub(std::time::Duration::from_secs(60 * 60))
        .unwrap_or(std::time::UNIX_EPOCH);
    for _ in 0..32 {
        let Ok(Some(entry)) = entries.next_entry().await else {
            break;
        };
        let path = entry.path();
        if path.extension().and_then(|value| value.to_str()) != Some("upload") {
            continue;
        }
        let is_stale = entry
            .metadata()
            .await
            .ok()
            .and_then(|metadata| metadata.modified().ok())
            .is_some_and(|modified| modified < stale_before);
        if is_stale {
            let _ = tokio::fs::remove_file(path).await;
        }
    }
}

pub(crate) async fn quarantine_attachment_field(
    mut field: Field<'_>,
) -> Result<QuarantinedUpload, AttachmentValidationError> {
    let original_name = field.file_name().unwrap_or("").to_string();
    let root = quarantine_root();
    tokio::fs::create_dir_all(&root)
        .await
        .map_err(|_| AttachmentValidationError {
            status: StatusCode::INTERNAL_SERVER_ERROR,
            code: "media_store_failed",
        })?;
    cleanup_stale_quarantine(&root).await;
    let path = root.join(format!("{}.upload", random_file_stem()));
    let mut options = tokio::fs::OpenOptions::new();
    options.write(true).create_new(true);
    #[cfg(unix)]
    {
        options.mode(0o600);
    }
    let mut file = options
        .open(&path)
        .await
        .map_err(|_| AttachmentValidationError {
            status: StatusCode::INTERNAL_SERVER_ERROR,
            code: "media_store_failed",
        })?;
    let mut size = 0usize;
    let mut prefix = Vec::with_capacity(16);
    loop {
        let chunk = match field.chunk().await {
            Ok(chunk) => chunk,
            Err(_) => {
                drop(file);
                let _ = tokio::fs::remove_file(&path).await;
                return Err(AttachmentValidationError {
                    status: StatusCode::BAD_REQUEST,
                    code: "attachment_upload_interrupted",
                });
            }
        };
        let Some(chunk) = chunk else { break };
        size = match size.checked_add(chunk.len()) {
            Some(size) => size,
            None => {
                drop(file);
                let _ = tokio::fs::remove_file(&path).await;
                return Err(AttachmentValidationError {
                    status: StatusCode::PAYLOAD_TOO_LARGE,
                    code: "attachment_too_large",
                });
            }
        };
        if size > MAX_VIDEO_BYTES {
            drop(file);
            let _ = tokio::fs::remove_file(&path).await;
            return Err(AttachmentValidationError {
                status: StatusCode::PAYLOAD_TOO_LARGE,
                code: "attachment_too_large",
            });
        }
        if prefix.len() < 16 {
            let wanted = (16 - prefix.len()).min(chunk.len());
            prefix.extend_from_slice(&chunk[..wanted]);
        }
        if file.write_all(&chunk).await.is_err() {
            drop(file);
            let _ = tokio::fs::remove_file(&path).await;
            return Err(AttachmentValidationError {
                status: StatusCode::INTERNAL_SERVER_ERROR,
                code: "media_store_failed",
            });
        }
    }
    if size == 0 {
        drop(file);
        let _ = tokio::fs::remove_file(&path).await;
        return Err(AttachmentValidationError {
            status: StatusCode::BAD_REQUEST,
            code: "image_required",
        });
    }
    if file.flush().await.is_err() {
        drop(file);
        let _ = tokio::fs::remove_file(&path).await;
        return Err(AttachmentValidationError {
            status: StatusCode::INTERNAL_SERVER_ERROR,
            code: "media_store_failed",
        });
    }
    drop(file);
    Ok(QuarantinedUpload {
        path: Some(path),
        original_name,
        size,
        prefix,
    })
}

pub(crate) async fn validate_quarantined_attachment(
    state: &AppState,
    upload: &QuarantinedUpload,
) -> Result<DetectedMedia, AttachmentValidationError> {
    if upload.is_zip() && upload.size > MAX_DOCUMENT_BYTES {
        return Err(AttachmentValidationError {
            status: StatusCode::PAYLOAD_TOO_LARGE,
            code: "attachment_too_large",
        });
    }
    let permit = if upload.is_zip() {
        Some(
            state
                .office_zip_validation_slots
                .clone()
                .try_acquire_owned()
                .map_err(|_| AttachmentValidationError {
                    status: StatusCode::TOO_MANY_REQUESTS,
                    code: "attachment_validation_busy",
                })?,
        )
    } else {
        None
    };
    let path = upload.path.clone().ok_or(AttachmentValidationError {
        status: StatusCode::INTERNAL_SERVER_ERROR,
        code: "attachment_validation_failed",
    })?;
    let name = upload.original_name.clone();
    let size = upload.size;
    let task = tokio::task::spawn_blocking(move || {
        let _permit = permit;
        let file = fs::File::open(path).map_err(|_| ())?;
        // The file is private, immutable and owned by this request until the
        // blocking task finishes. Mapping avoids a second full-size heap copy.
        let bytes = unsafe { memmap2::MmapOptions::new().map(&file) }.map_err(|_| ())?;
        let detected = detect_attachment(&bytes, &name).ok_or(())?;
        if size > detected.max_bytes {
            return Err(());
        }
        if detected.kind == "video" && !video_duration_is_allowed(&bytes, detected.mime) {
            return Err(());
        }
        Ok(detected)
    });
    match tokio::time::timeout(std::time::Duration::from_secs(6), task).await {
        Ok(Ok(Ok(detected))) => Ok(detected),
        Ok(Ok(Err(()))) => Err(AttachmentValidationError {
            status: StatusCode::BAD_REQUEST,
            code: "unsupported_attachment",
        }),
        Ok(Err(_)) => Err(AttachmentValidationError {
            status: StatusCode::INTERNAL_SERVER_ERROR,
            code: "attachment_validation_failed",
        }),
        Err(_) => Err(AttachmentValidationError {
            status: StatusCode::REQUEST_TIMEOUT,
            code: "attachment_validation_timeout",
        }),
    }
}

pub(crate) fn media_path_is_safe(relative: &str) -> bool {
    let path = FsPath::new(relative);
    !relative.trim().is_empty()
        && !relative.contains("..")
        && !path.is_absolute()
        && path.components().all(|component| {
            matches!(
                component,
                std::path::Component::Normal(_) | std::path::Component::CurDir
            )
        })
}

pub(crate) fn safe_attachment_name(value: &str, fallback_extension: &str) -> String {
    let basename = FsPath::new(value)
        .file_name()
        .and_then(|part| part.to_str())
        .unwrap_or("");
    let mut safe = basename
        .chars()
        .filter(|ch| !ch.is_control() && *ch != '/' && *ch != '\\')
        .take(120)
        .collect::<String>();
    safe = safe.trim().trim_matches('.').to_string();
    if safe.is_empty() {
        safe = format!("attachment.{fallback_extension}");
    }
    safe
}

pub(crate) fn detect_image(bytes: &[u8]) -> Option<(&'static str, &'static str)> {
    if bytes.len() >= 3 && bytes[0] == 0xff && bytes[1] == 0xd8 && bytes[2] == 0xff {
        return Some(("image", "image/jpeg"));
    }
    if bytes.len() >= 8
        && bytes[0] == 0x89
        && bytes[1] == 0x50
        && bytes[2] == 0x4e
        && bytes[3] == 0x47
    {
        return Some(("image", "image/png"));
    }
    if bytes.len() >= 12 && &bytes[0..4] == b"RIFF" && &bytes[8..12] == b"WEBP" {
        return Some(("image", "image/webp"));
    }
    None
}

pub(crate) fn detect_audio(bytes: &[u8]) -> Option<(&'static str, &'static str)> {
    if bytes.len() >= 4 && &bytes[0..4] == b"OggS" {
        return Some(("voice", "audio/ogg"));
    }
    if bytes.len() >= 4
        && bytes[0] == 0x1a
        && bytes[1] == 0x45
        && bytes[2] == 0xdf
        && bytes[3] == 0xa3
    {
        return Some(("voice", "audio/webm"));
    }
    if bytes.len() >= 12 && &bytes[4..8] == b"ftyp" {
        return Some(("voice", "audio/mp4"));
    }
    None
}

pub(crate) fn extension_for_mime(mime: &str) -> &'static str {
    match mime {
        "image/jpeg" => "jpg",
        "image/png" => "png",
        "image/webp" => "webp",
        "audio/ogg" => "ogg",
        "audio/webm" => "webm",
        "audio/mp4" => "m4a",
        "video/mp4" => "mp4",
        "video/webm" => "webm",
        "application/pdf" => "pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" => "docx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" => "xlsx",
        "text/plain" => "txt",
        "text/csv" => "csv",
        "application/rtf" => "rtf",
        _ => "bin",
    }
}

fn parse_single_range(value: &str, total: u64) -> Option<(u64, u64)> {
    if total == 0 {
        return None;
    }
    let spec = value.strip_prefix("bytes=")?;
    if spec.contains(',') {
        return None;
    }
    let (start_text, end_text) = spec.split_once('-')?;
    if start_text.is_empty() {
        let suffix: u64 = end_text.parse().ok()?;
        if suffix == 0 {
            return None;
        }
        let length = suffix.min(total);
        return Some((total - length, total - 1));
    }
    let start: u64 = start_text.parse().ok()?;
    if start >= total {
        return None;
    }
    let end = if end_text.is_empty() {
        total - 1
    } else {
        end_text.parse::<u64>().ok()?.min(total - 1)
    };
    (start <= end).then_some((start, end))
}

pub(crate) fn private_media_response(
    bytes: Vec<u8>,
    mime: &str,
    request_headers: &HeaderMap,
    download_name: Option<&str>,
) -> Response {
    let total = bytes.len() as u64;
    let requested_range = request_headers
        .get(header::RANGE)
        .and_then(|value| value.to_str().ok());
    let range = requested_range.and_then(|value| parse_single_range(value, total));

    if total == 0 || (requested_range.is_some() && range.is_none()) {
        let mut response = Response::new(Body::empty());
        *response.status_mut() = StatusCode::RANGE_NOT_SATISFIABLE;
        if let Ok(value) = HeaderValue::from_str(&format!("bytes */{total}")) {
            response.headers_mut().insert(header::CONTENT_RANGE, value);
        }
        return response;
    }

    let (start, end, status) = match range {
        Some((start, end)) => (start, end, StatusCode::PARTIAL_CONTENT),
        None => (0, total - 1, StatusCode::OK),
    };
    let payload = bytes[start as usize..=end as usize].to_vec();
    let mut response = Response::new(Body::from(payload));
    *response.status_mut() = status;
    response.headers_mut().insert(
        header::CONTENT_TYPE,
        HeaderValue::from_str(if mime.is_empty() {
            "application/octet-stream"
        } else {
            mime
        })
        .unwrap_or_else(|_| HeaderValue::from_static("application/octet-stream")),
    );
    response.headers_mut().insert(
        header::CACHE_CONTROL,
        HeaderValue::from_static("private, no-store, max-age=0"),
    );
    response.headers_mut().insert(
        header::X_CONTENT_TYPE_OPTIONS,
        HeaderValue::from_static("nosniff"),
    );
    response
        .headers_mut()
        .insert(header::ACCEPT_RANGES, HeaderValue::from_static("bytes"));
    if let Ok(value) = HeaderValue::from_str(&(end - start + 1).to_string()) {
        response.headers_mut().insert(header::CONTENT_LENGTH, value);
    }
    if status == StatusCode::PARTIAL_CONTENT {
        if let Ok(value) = HeaderValue::from_str(&format!("bytes {start}-{end}/{total}")) {
            response.headers_mut().insert(header::CONTENT_RANGE, value);
        }
    }
    if let Some(name) = download_name {
        let value = format!("attachment; filename*=UTF-8''{}", urlencoding::encode(name));
        if let Ok(value) = HeaderValue::from_str(&value) {
            response
                .headers_mut()
                .insert(header::CONTENT_DISPOSITION, value);
        }
        response.headers_mut().insert(
            header::CONTENT_SECURITY_POLICY,
            HeaderValue::from_static("default-src 'none'; sandbox"),
        );
    }
    response
}

// --- Real, streamed ZIP validation for DOCX/XLSX uploads ---------------
//
// Real, bounded, streamed decompression + structural validation via the
// `zip` crate. We never call `ZipArchive::extract`: every entry is inspected
// and streamed individually, and nothing is written to a path supplied by
// the archive.
//
// Limits are a `ZipValidationLimits` struct rather than bare constants so
// tests can exercise the same code path with small thresholds.
#[derive(Clone, Copy)]
struct ZipValidationLimits {
    max_entries: usize,
    max_entry_decompressed_bytes: u64,
    max_total_decompressed_bytes: u64,
    max_path_len: usize,
    max_path_depth: usize,
}

impl ZipValidationLimits {
    /// Conservative limits for the current small production host.
    const fn production() -> Self {
        Self {
            max_entries: 512,
            max_entry_decompressed_bytes: 32 * 1024 * 1024,
            max_total_decompressed_bytes: 64 * 1024 * 1024,
            max_path_len: 180,
            max_path_depth: 10,
        }
    }
}

const ZIP_STREAM_BUFFER_BYTES: usize = 64 * 1024;
// Cooperative deadline check inside the decompression loop. This does
// NOT stop the underlying blocking task the instant it fires — nothing
// short of a subprocess with its own kill switch can guarantee that. It
// bounds how much *our own loop* keeps decompressing once a request is
// already known to be too slow, checked between buffer-sized reads
// rather than only once at the start. Combined with
// `office_zip_validation_slots` (a bounded semaphore — see AppState) and
// the byte-count caps above, this keeps worst-case cost bounded on
// multiple independent axes rather than relying on any single one.
const ZIP_VALIDATION_DEADLINE: std::time::Duration = std::time::Duration::from_secs(4);

#[derive(Clone, Copy, PartialEq, Eq, Debug)]
enum OfficeDocumentKind {
    Docx,
    Xlsx,
}

/// Typed internal rejection reason. The public HTTP API still only ever
/// returns the generic `unsupported_attachment` error code. Typed reasons
/// let tests prove which defense rejected a hostile archive.
#[derive(Clone, Copy, PartialEq, Eq, Debug)]
enum OfficeZipRejection {
    NotAZip,
    TooManyEntries,
    UnsafePath,
    Encrypted,
    UnsupportedFileType,
    DuplicateEntry,
    MacroEnabled,
    NotAnOfficePackage,
    AmbiguousOfficeKind,
    EntryTooLarge,
    TotalSizeTooLarge,
    InvalidCrcOrStream,
    UnsafeXml,
    ExternalRelationship,
    ContentTypeMismatch,
    Timeout,
}

fn unix_mode_is_regular_file_or_directory(mode: u32) -> bool {
    const S_IFMT: u32 = 0o170000;
    const S_IFREG: u32 = 0o100000;
    const S_IFDIR: u32 = 0o040000;
    let file_type = mode & S_IFMT;
    // Some writers leave the type bits unset for plain entries — treat
    // "no type bits at all" as regular, everything else must be exactly
    // a regular file or a directory. Symlinks (S_IFLNK), devices, FIFOs
    // and sockets are all rejected by this being `false`.
    file_type == 0 || file_type == S_IFREG || file_type == S_IFDIR
}

/// Normalizes a validated, enclosed path for critical-entry comparison:
/// lowercased (OPC part names are case-insensitive per the spec) and
/// with a leading "./" stripped. This is intentionally narrow — full
/// Unicode confusable normalization is out of scope for this pass, but it closes
/// the two concrete
/// collision shapes ("Word/Document.xml" vs "word/document.xml", and
/// "./word/document.xml" vs "word/document.xml") without attempting a
/// general-purpose path-equivalence solver.
fn normalize_for_critical_entry_comparison(path: &str) -> String {
    path.trim_start_matches("./").to_ascii_lowercase()
}

/// Validates a DOCX/XLSX candidate using real, bounded, streamed
/// decompression. Never more than one entry's compressed+decompressed
/// data resident at once — each entry is streamed through a fixed 64 KiB
/// buffer and discarded, never accumulated into a growing buffer.
fn validate_office_zip(
    bytes: &[u8],
    limits: ZipValidationLimits,
    deadline: std::time::Instant,
) -> Result<OfficeDocumentKind, OfficeZipRejection> {
    let mut archive = zip::ZipArchive::new(std::io::Cursor::new(bytes))
        .map_err(|_| OfficeZipRejection::NotAZip)?;
    let entry_count = archive.len();
    if entry_count == 0 || entry_count > limits.max_entries {
        return Err(OfficeZipRejection::TooManyEntries);
    }

    let mut has_content_types = false;
    let mut has_rels = false;
    let mut has_document_xml = false;
    let mut has_workbook_xml = false;
    let mut has_macro_project = false;
    let mut seen_normalized_names: std::collections::HashSet<String> =
        std::collections::HashSet::with_capacity(entry_count);

    // Pass 1: metadata-only (by_index_raw never decompresses). Reject on
    // any structural red flag before spending CPU decompressing anything.
    for index in 0..entry_count {
        let entry = archive
            .by_index_raw(index)
            .map_err(|_| OfficeZipRejection::InvalidCrcOrStream)?;

        if entry.encrypted() {
            return Err(OfficeZipRejection::Encrypted);
        }
        let name_raw = entry.name_raw();
        if name_raw.contains(&0u8) || name_raw.contains(&b'\\') {
            // NUL: ambiguous/truncatable names. Backslash: not a valid
            // ZIP path separator per spec, and `enclosed_name` below is
            // written for '/'-separated paths — a literal backslash is
            // only ever present to smuggle a different path once opened
            // by a decompressor with different platform semantics.
            return Err(OfficeZipRejection::UnsafePath);
        }
        let Some(enclosed) = entry.enclosed_name() else {
            // The crate's own path-safety check: rejects NUL bytes,
            // absolute paths, and traversal outside the archive root.
            return Err(OfficeZipRejection::UnsafePath);
        };
        let enclosed_str = enclosed.to_string_lossy();
        if enclosed_str.is_empty()
            || enclosed_str.len() > limits.max_path_len
            || enclosed.components().count() > limits.max_path_depth
        {
            return Err(OfficeZipRejection::UnsafePath);
        }
        if let Some(mode) = entry.unix_mode() {
            if !unix_mode_is_regular_file_or_directory(mode) {
                return Err(OfficeZipRejection::UnsupportedFileType);
            }
        }

        let normalized = normalize_for_critical_entry_comparison(&enclosed_str);
        if !seen_normalized_names.insert(normalized.clone()) {
            // Any repeated normalized path — not just the critical ones
            // — is ambiguous: different tools may resolve which entry
            // "wins" differently. Fail closed rather than special-case
            // only the handful of names we happen to check below.
            return Err(OfficeZipRejection::DuplicateEntry);
        }

        match normalized.as_str() {
            "[content_types].xml" => has_content_types = true,
            "_rels/.rels" => has_rels = true,
            "word/document.xml" => has_document_xml = true,
            "xl/workbook.xml" => has_workbook_xml = true,
            "word/vbaproject.bin" | "xl/vbaproject.bin" => has_macro_project = true,
            _ => {}
        }
    }

    if has_macro_project {
        return Err(OfficeZipRejection::MacroEnabled);
    }
    if !has_content_types || !has_rels {
        return Err(OfficeZipRejection::NotAnOfficePackage);
    }
    let kind = match (has_document_xml, has_workbook_xml) {
        (true, false) => OfficeDocumentKind::Docx,
        (false, true) => OfficeDocumentKind::Xlsx,
        // Neither marker (not Office at all) or both (ambiguous /
        // malformed dual-purpose file) — reject either way. This is also
        // what makes DOCX-content-mislabeled-as-.xlsx (or the reverse)
        // safe: the *filename* is never consulted for kind detection,
        // only the real internal structure is.
        _ => return Err(OfficeZipRejection::AmbiguousOfficeKind),
    };

    // Pass 2: real, bounded, streamed decompression. This — not any
    // declared metadata — is what actually proves the archive isn't a
    // decompression bomb: nothing above ever rejects based on a
    // compression *ratio*, only on bytes actually read out of the
    // decompressor. Reading each entry to completion also makes the
    // crate perform its own CRC32 validation at end-of-stream; a
    // mismatch surfaces as a `Read` error, treated as rejection.
    let mut total_decompressed: u64 = 0;
    let mut buffer = [0u8; ZIP_STREAM_BUFFER_BYTES];
    let mut content_types_xml = Vec::new();
    let mut root_rels_xml = Vec::new();
    for index in 0..entry_count {
        if std::time::Instant::now() >= deadline {
            return Err(OfficeZipRejection::Timeout);
        }
        let mut entry = archive
            .by_index(index)
            .map_err(|_| OfficeZipRejection::InvalidCrcOrStream)?;
        if entry.is_dir() {
            continue;
        }
        let normalized_name = normalize_for_critical_entry_comparison(entry.name());
        let mut entry_decompressed: u64 = 0;
        loop {
            if std::time::Instant::now() >= deadline {
                return Err(OfficeZipRejection::Timeout);
            }
            let read = match std::io::Read::read(&mut entry, &mut buffer) {
                Ok(0) => break,
                Ok(read) => read,
                Err(_) => return Err(OfficeZipRejection::InvalidCrcOrStream),
            };
            entry_decompressed += read as u64;
            total_decompressed += read as u64;
            if entry_decompressed > limits.max_entry_decompressed_bytes {
                return Err(OfficeZipRejection::EntryTooLarge);
            }
            if total_decompressed > limits.max_total_decompressed_bytes {
                return Err(OfficeZipRejection::TotalSizeTooLarge);
            }
            if normalized_name == "[content_types].xml" {
                if content_types_xml.len() + read > 256 * 1024 {
                    return Err(OfficeZipRejection::InvalidCrcOrStream);
                }
                content_types_xml.extend_from_slice(&buffer[..read]);
            } else if normalized_name == "_rels/.rels" {
                if root_rels_xml.len() + read > 256 * 1024 {
                    return Err(OfficeZipRejection::InvalidCrcOrStream);
                }
                root_rels_xml.extend_from_slice(&buffer[..read]);
            }
        }
    }

    let content_types = String::from_utf8(content_types_xml)
        .map_err(|_| OfficeZipRejection::NotAnOfficePackage)?
        .to_ascii_lowercase();
    let root_rels = String::from_utf8(root_rels_xml)
        .map_err(|_| OfficeZipRejection::NotAnOfficePackage)?
        .to_ascii_lowercase();
    if content_types.contains("<!doctype")
        || content_types.contains("<!entity")
        || root_rels.contains("<!doctype")
        || root_rels.contains("<!entity")
    {
        return Err(OfficeZipRejection::UnsafeXml);
    }
    if root_rels.contains("targetmode=\"external\"") || root_rels.contains("targetmode='external'")
    {
        return Err(OfficeZipRejection::ExternalRelationship);
    }
    if content_types.contains("macroenabled") {
        return Err(OfficeZipRejection::MacroEnabled);
    }
    let expected_content_type = match kind {
        OfficeDocumentKind::Docx => {
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"
        }
        OfficeDocumentKind::Xlsx => {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"
        }
    };
    if !content_types.contains(expected_content_type)
        || !root_rels.contains("relationships/officedocument")
    {
        return Err(OfficeZipRejection::ContentTypeMismatch);
    }

    Ok(kind)
}

/// Cheap, synchronous, non-blocking-pool-worthy check: is this candidate
/// even shaped like a ZIP? Only PK\x03\x04-prefixed input goes anywhere
/// near `validate_office_zip`'s real decompression work — photos,
/// videos, PDFs, and plain text never touch the semaphore, the blocking
/// pool, or the timeout machinery added for the ZIP path.
pub(crate) fn looks_like_zip(bytes: &[u8]) -> bool {
    bytes.starts_with(b"PK\x03\x04")
}

pub(crate) fn detect_attachment(bytes: &[u8], filename: &str) -> Option<DetectedMedia> {
    if let Some((kind, mime)) = detect_image(bytes) {
        return Some(DetectedMedia {
            kind,
            mime,
            extension: extension_for_mime(mime),
            max_bytes: MAX_IMAGE_BYTES,
        });
    }
    if bytes.len() >= 12 && &bytes[4..8] == b"ftyp" {
        return Some(DetectedMedia {
            kind: "video",
            mime: "video/mp4",
            extension: "mp4",
            max_bytes: MAX_VIDEO_BYTES,
        });
    }
    if bytes.starts_with(&[0x1a, 0x45, 0xdf, 0xa3]) {
        return Some(DetectedMedia {
            kind: "video",
            mime: "video/webm",
            extension: "webm",
            max_bytes: MAX_VIDEO_BYTES,
        });
    }
    if bytes.starts_with(b"%PDF-") {
        return Some(DetectedMedia {
            kind: "document",
            mime: "application/pdf",
            extension: "pdf",
            max_bytes: MAX_DOCUMENT_BYTES,
        });
    }
    if looks_like_zip(bytes) {
        let deadline = std::time::Instant::now() + ZIP_VALIDATION_DEADLINE;
        match validate_office_zip(bytes, ZipValidationLimits::production(), deadline) {
            Ok(OfficeDocumentKind::Docx) => {
                return Some(DetectedMedia {
                    kind: "document",
                    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    extension: "docx",
                    max_bytes: MAX_DOCUMENT_BYTES,
                });
            }
            Ok(OfficeDocumentKind::Xlsx) => {
                return Some(DetectedMedia {
                    kind: "document",
                    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    extension: "xlsx",
                    max_bytes: MAX_DOCUMENT_BYTES,
                });
            }
            Err(_rejection) => {}
        }
    }
    if bytes.starts_with(b"{\\rtf") {
        return Some(DetectedMedia {
            kind: "document",
            mime: "application/rtf",
            extension: "rtf",
            max_bytes: MAX_DOCUMENT_BYTES,
        });
    }
    let extension = FsPath::new(filename)
        .extension()
        .and_then(|value| value.to_str())
        .unwrap_or("")
        .to_ascii_lowercase();
    if matches!(extension.as_str(), "txt" | "csv")
        && std::str::from_utf8(bytes).is_ok()
        && !String::from_utf8_lossy(&bytes[..bytes.len().min(512)])
            .trim_start()
            .starts_with('<')
    {
        let (mime, ext) = if extension == "csv" {
            ("text/csv", "csv")
        } else {
            ("text/plain", "txt")
        };
        return Some(DetectedMedia {
            kind: "document",
            mime,
            extension: ext,
            max_bytes: MAX_DOCUMENT_BYTES,
        });
    }
    None
}

pub(crate) fn mp4_duration_seconds(bytes: &[u8]) -> Option<f64> {
    let position = bytes.windows(4).position(|window| window == b"mvhd")?;
    let data = bytes.get(position + 4..)?;
    let version = *data.first()?;
    let (timescale_offset, duration_offset, duration_size) = if version == 1 {
        (20, 24, 8)
    } else {
        (12, 16, 4)
    };
    let timescale = u32::from_be_bytes(
        data.get(timescale_offset..timescale_offset + 4)?
            .try_into()
            .ok()?,
    );
    if timescale == 0 {
        return None;
    }
    let duration = if duration_size == 8 {
        u64::from_be_bytes(
            data.get(duration_offset..duration_offset + 8)?
                .try_into()
                .ok()?,
        )
    } else {
        u32::from_be_bytes(
            data.get(duration_offset..duration_offset + 4)?
                .try_into()
                .ok()?,
        ) as u64
    };
    Some(duration as f64 / timescale as f64)
}

fn ebml_size(bytes: &[u8]) -> Option<(usize, usize)> {
    let first = *bytes.first()?;
    let width = (first.leading_zeros() as usize) + 1;
    if width > 8 || bytes.len() < width {
        return None;
    }
    let mut value = (first & (0xff >> width)) as usize;
    for byte in &bytes[1..width] {
        value = value.checked_mul(256)?.checked_add(*byte as usize)?;
    }
    Some((value, width))
}

pub(crate) fn webm_duration_seconds(bytes: &[u8]) -> Option<f64> {
    let duration_at = bytes.windows(2).position(|window| window == [0x44, 0x89])? + 2;
    let (duration_size, duration_width) = ebml_size(bytes.get(duration_at..)?)?;
    let duration_data =
        bytes.get(duration_at + duration_width..duration_at + duration_width + duration_size)?;
    let duration = match duration_size {
        4 => f32::from_be_bytes(duration_data.try_into().ok()?) as f64,
        8 => f64::from_be_bytes(duration_data.try_into().ok()?),
        _ => return None,
    };
    let scale = if let Some(scale_at) = bytes
        .windows(3)
        .position(|window| window == [0x2a, 0xd7, 0xb1])
    {
        let start = scale_at + 3;
        let (size, width) = ebml_size(bytes.get(start..)?)?;
        let data = bytes.get(start + width..start + width + size)?;
        data.iter()
            .fold(0u64, |value, byte| (value << 8) | u64::from(*byte))
    } else {
        1_000_000
    };
    Some(duration * scale as f64 / 1_000_000_000.0)
}

pub(crate) fn video_duration_is_allowed(bytes: &[u8], mime: &str) -> bool {
    let duration = match mime {
        "video/mp4" => mp4_duration_seconds(bytes),
        "video/webm" => webm_duration_seconds(bytes),
        _ => None,
    };
    duration.is_some_and(|seconds| {
        seconds.is_finite() && seconds > 0.0 && seconds <= MAX_VIDEO_DURATION_SECONDS
    })
}

fn random_file_stem() -> String {
    let mut bytes = [0u8; 16];
    let _ = getrandom::getrandom(&mut bytes);
    bytes.iter().map(|b| format!("{:02x}", b)).collect()
}

fn load_message(
    conn: &rusqlite::Connection,
    conversation_id: i64,
    message_id: i64,
    user_id: i64,
) -> Option<MediaChatMessage> {
    conn.query_row(
        "SELECT messages.id, messages.sender_user_id, messages.message,
                messages.delivered_at, messages.read_at, messages.created_at,
                messages.reply_to_message_id,
                (SELECT reply.sender_user_id FROM messages AS reply
                  WHERE reply.id = messages.reply_to_message_id AND reply.conversation_id = messages.conversation_id),
                COALESCE((SELECT CASE WHEN reply.deleted_at > 0 THEN '__deleted__' ELSE reply.message END
                          FROM messages AS reply
                          WHERE reply.id = messages.reply_to_message_id AND reply.conversation_id = messages.conversation_id), ''),
                messages.edited_at, messages.deleted_at,
                COALESCE(messages.client_message_id, ''),
                COALESCE(messages.attachment_kind, ''),
                COALESCE(messages.attachment_mime, ''),
                COALESCE(messages.attachment_size, 0),
                COALESCE(messages.attachment_path, '')
         FROM messages WHERE messages.id = ?1 AND messages.conversation_id = ?2 LIMIT 1",
        rusqlite::params![message_id, conversation_id],
        |row| {
            let id: i64 = row.get(0)?;
            let sender: i64 = row.get(1)?;
            let deleted_at: i64 = row.get(10)?;
            let kind: String = row.get(12)?;
            let path: String = row.get(15)?;
            let attachment_url = if deleted_at == 0
                && matches!(kind.as_str(), "image" | "voice" | "video" | "document")
                && !path.is_empty()
            {
                format!("/api/chat/media/{id}")
            } else { String::new() };
            Ok(MediaChatMessage {
                id, message: row.get(2)?, is_mine: sender == user_id,
                delivered_at: row.get(3)?, read_at: row.get(4)?, created_at: row.get(5)?,
                reply_to_message_id: row.get(6)?,
                reply_is_mine: row.get::<_, Option<i64>>(7)? == Some(user_id),
                reply_message: row.get(8)?, edited_at: row.get(9)?, deleted_at,
                client_message_id: row.get(11)?, attachment_kind: kind,
                attachment_mime: row.get(13)?, attachment_size: row.get(14)?, attachment_url,
            })
        },
    ).ok()
}

pub async fn api_chat_send_image(
    State(state): State<AppState>,
    Path(other_user_route): Path<String>,
    headers: HeaderMap,
    mut multipart: Multipart,
) -> Response {
    if request_is_cross_site(&headers) {
        return json_error(StatusCode::FORBIDDEN, "cross_site_request_rejected");
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(v) => v,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    if let Some(retry_after) =
        rate_limit_retry_after(&state, user_id, "chat_api_send_image", 20, 60).await
    {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            [(header::RETRY_AFTER, retry_after.to_string())],
            Json(json!({"ok": false, "error": "rate_limited", "retry_after": retry_after})),
        )
            .into_response();
    }

    let mut caption = String::new();
    let mut client_message_id = String::new();
    let mut reply_to_message_id: Option<i64> = None;
    let mut upload: Option<QuarantinedUpload> = None;

    while let Ok(Some(field)) = multipart.next_field().await {
        let name = field.name().unwrap_or("").to_string();
        match name.as_str() {
            "caption" | "message" => {
                if let Ok(t) = field.text().await {
                    caption = t.trim().to_string();
                }
            }
            "client_message_id" => {
                if let Ok(t) = field.text().await {
                    client_message_id = t.trim().to_string();
                }
            }
            "reply_to_message_id" => {
                if let Ok(t) = field.text().await {
                    if let Ok(id) = t.trim().parse::<i64>() {
                        if id > 0 {
                            reply_to_message_id = Some(id);
                        }
                    }
                }
            }
            "image" | "file" => match quarantine_attachment_field(field).await {
                Ok(value) => upload = Some(value),
                Err(error) => return json_error(error.status, error.code),
            },
            _ => {}
        }
    }

    let upload = match upload {
        Some(upload) => upload,
        _ => return json_error(StatusCode::BAD_REQUEST, "image_required"),
    };
    let detected = match validate_quarantined_attachment(&state, &upload).await {
        Ok(value) => value,
        Err(error) => return json_error(error.status, error.code),
    };
    let attachment_size = upload.size;
    let kind = detected.kind;
    let mime = detected.mime;
    if !client_message_id.is_empty() && !client_message_id_is_valid(&client_message_id) {
        return json_error(StatusCode::BAD_REQUEST, "invalid_client_message_id");
    }
    if !caption.is_empty() && !input_text_is_valid(&caption, 1, 2000) {
        return json_error(StatusCode::BAD_REQUEST, "invalid_message");
    }

    let mut connection = match state.db_pool.get() {
        Ok(c) => c,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };

    let Some(other_user_id) = active_user_id_by_chat_route(&connection, &other_user_route)
        .filter(|other_user_id| *other_user_id != user_id)
    else {
        return json_error(StatusCode::BAD_REQUEST, "invalid_user");
    };
    if users_are_blocked(&connection, user_id, other_user_id) {
        return json_error(StatusCode::FORBIDDEN, "user_blocked");
    }
    let conversation_id =
        match ensure_conversation_for_outgoing(&connection, user_id, other_user_id) {
            Ok(id) => id,
            Err(error) => return json_error(StatusCode::FORBIDDEN, error),
        };

    if !client_message_id.is_empty() {
        if let Ok(existing_id) = connection.query_row(
            "SELECT id FROM messages
             WHERE conversation_id = ?1
               AND sender_user_id = ?2
               AND client_message_id = ?3
             LIMIT 1",
            rusqlite::params![conversation_id, user_id, client_message_id],
            |row| row.get::<_, i64>(0),
        ) {
            if let Some(message) = load_message(&connection, conversation_id, existing_id, user_id)
            {
                return (
                    StatusCode::OK,
                    Json(json!({"ok": true, "duplicate": true, "message": message})),
                )
                    .into_response();
            }
        }
    }

    if let Some(reply_id) = reply_to_message_id {
        let exists: i64 = connection.query_row(
            "SELECT COUNT(*) FROM messages WHERE id = ?1 AND conversation_id = ?2 AND deleted_at = 0",
            rusqlite::params![reply_id, conversation_id],
            |row| row.get(0),
        ).unwrap_or(0);
        if exists != 1 {
            return json_error(StatusCode::BAD_REQUEST, "invalid_reply");
        }
    }

    let relative = format!(
        "{}/{}.{}",
        conversation_id,
        random_file_stem(),
        detected.extension
    );
    let absolute = media_root().join(&relative);
    if upload.publish(&absolute).is_err() {
        return json_error(StatusCode::INTERNAL_SERVER_ERROR, "media_store_failed");
    }

    let now = unix_now();
    let transaction =
        match connection.transaction_with_behavior(rusqlite::TransactionBehavior::Immediate) {
            Ok(tx) => tx,
            Err(_) => {
                let _ = fs::remove_file(&absolute);
                return json_error(StatusCode::CONFLICT, "chat_busy");
            }
        };

    let inserted = transaction.execute(
        "INSERT OR IGNORE INTO messages (
            conversation_id, sender_user_id, message, is_read, delivered_at, read_at, created_at,
            reply_to_message_id, client_message_id, attachment_kind, attachment_mime, attachment_size, attachment_path
         ) VALUES (?1,?2,?3,0,0,0,?4,?5,?6,?7,?8,?9,?10)",
        rusqlite::params![
            conversation_id, user_id, caption, now, reply_to_message_id, client_message_id,
            kind, mime, attachment_size as i64, relative
        ],
    ).unwrap_or(0);
    if inserted == 0 {
        let existing_id: Option<i64> = transaction
            .query_row(
                "SELECT id
                 FROM messages
                 WHERE conversation_id = ?1
                   AND sender_user_id = ?2
                   AND client_message_id = ?3
                 LIMIT 1",
                rusqlite::params![conversation_id, user_id, client_message_id],
                |row| row.get(0),
            )
            .ok();
        if let Some(existing_id) = existing_id {
            if transaction.commit().is_err() {
                let _ = fs::remove_file(&absolute);
                return json_error(StatusCode::INTERNAL_SERVER_ERROR, "message_store_failed");
            }
            let _ = fs::remove_file(&absolute);
            if let Some(message) = load_message(&connection, conversation_id, existing_id, user_id)
            {
                return (
                    StatusCode::OK,
                    Json(json!({"ok": true, "duplicate": true, "message": message})),
                )
                    .into_response();
            }
        }
        let _ = fs::remove_file(&absolute);
        return json_error(StatusCode::INTERNAL_SERVER_ERROR, "message_store_failed");
    }
    let message_id = transaction.last_insert_rowid();
    let _ = transaction.execute(
        "UPDATE conversations SET updated_at = ?2 WHERE id = ?1",
        rusqlite::params![conversation_id, now],
    );
    if transaction.commit().is_err() {
        let _ = fs::remove_file(&absolute);
        return json_error(StatusCode::INTERNAL_SERVER_ERROR, "message_store_failed");
    }

    let message = match load_message(&connection, conversation_id, message_id, user_id) {
        Some(m) => m,
        None => return json_error(StatusCode::INTERNAL_SERVER_ERROR, "message_load_failed"),
    };
    state.publish_chat_event(
        "message.created",
        conversation_id,
        message_id,
        user_id,
        other_user_id,
    );

    let _ = connection.execute(
        "UPDATE chat_preferences
         SET archived_at = 0, updated_at = ?3
         WHERE user_id = ?1 AND chat_kind = 'direct' AND target_id = ?2 AND archived_at > 0",
        rusqlite::params![other_user_id, user_id, now],
    );

    if !crate::db::chat_preferences::notifications_muted(
        &connection,
        other_user_id,
        crate::db::chat_preferences::KIND_DIRECT,
        user_id,
        now,
    ) {
        let _ = connection
            .execute(
                "INSERT INTO user_notifications (
                user_id,
                resource_id,
                kind,
                title,
                message,
                is_read,
                created_at
             )
             SELECT ?1, ?2, 'chat_message', 'Новое сообщение',
                    'У вас новое сообщение в GRABIT.', 0, ?3
             WHERE NOT EXISTS (
                SELECT 1
                FROM user_notifications
                WHERE user_id = ?1
                  AND kind = 'chat_message'
                  AND (resource_id = ?2 OR resource_id IS NULL)
                  AND is_read = 0
             )",
                rusqlite::params![other_user_id, user_id, now],
            )
            .unwrap_or(0);
    }

    (
        StatusCode::OK,
        Json(json!({"ok": true, "message": message})),
    )
        .into_response()
}

pub async fn api_chat_send_voice(
    State(state): State<AppState>,
    Path(other_user_route): Path<String>,
    headers: HeaderMap,
    mut multipart: Multipart,
) -> Response {
    if request_is_cross_site(&headers) {
        return json_error(StatusCode::FORBIDDEN, "cross_site_request_rejected");
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(v) => v,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    if let Some(retry_after) =
        rate_limit_retry_after(&state, user_id, "chat_api_send_voice", 12, 60).await
    {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            [(header::RETRY_AFTER, retry_after.to_string())],
            Json(json!({"ok": false, "error": "rate_limited", "retry_after": retry_after})),
        )
            .into_response();
    }

    let mut client_message_id = String::new();
    let mut reply_to_message_id: Option<i64> = None;
    let mut file_bytes: Option<Vec<u8>> = None;

    while let Ok(Some(field)) = multipart.next_field().await {
        let name = field.name().unwrap_or("").to_string();
        match name.as_str() {
            "client_message_id" => {
                if let Ok(t) = field.text().await {
                    client_message_id = t.trim().to_string();
                }
            }
            "reply_to_message_id" => {
                if let Ok(t) = field.text().await {
                    if let Ok(id) = t.trim().parse::<i64>() {
                        if id > 0 {
                            reply_to_message_id = Some(id);
                        }
                    }
                }
            }
            "voice" | "audio" | "file" => {
                if let Ok(b) = field.bytes().await {
                    file_bytes = Some(b.to_vec());
                }
            }
            _ => {}
        }
    }

    let file_bytes = match file_bytes {
        Some(b) if !b.is_empty() => b,
        _ => return json_error(StatusCode::BAD_REQUEST, "voice_required"),
    };
    if file_bytes.len() > MAX_VOICE_BYTES {
        return json_error(StatusCode::PAYLOAD_TOO_LARGE, "voice_too_large");
    }
    let (kind, mime) = match detect_audio(&file_bytes) {
        Some(p) => p,
        None => return json_error(StatusCode::BAD_REQUEST, "unsupported_voice"),
    };
    if !client_message_id.is_empty() && !client_message_id_is_valid(&client_message_id) {
        return json_error(StatusCode::BAD_REQUEST, "invalid_client_message_id");
    }

    let mut connection = match state.db_pool.get() {
        Ok(c) => c,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };

    let Some(other_user_id) = active_user_id_by_chat_route(&connection, &other_user_route)
        .filter(|other_user_id| *other_user_id != user_id)
    else {
        return json_error(StatusCode::BAD_REQUEST, "invalid_user");
    };
    if users_are_blocked(&connection, user_id, other_user_id) {
        return json_error(StatusCode::FORBIDDEN, "user_blocked");
    }
    let conversation_id =
        match ensure_conversation_for_outgoing(&connection, user_id, other_user_id) {
            Ok(id) => id,
            Err(error) => return json_error(StatusCode::FORBIDDEN, error),
        };

    if !client_message_id.is_empty() {
        if let Ok(existing_id) = connection.query_row(
            "SELECT id FROM messages
             WHERE conversation_id = ?1
               AND sender_user_id = ?2
               AND client_message_id = ?3
             LIMIT 1",
            rusqlite::params![conversation_id, user_id, client_message_id],
            |row| row.get::<_, i64>(0),
        ) {
            if let Some(message) = load_message(&connection, conversation_id, existing_id, user_id)
            {
                return (
                    StatusCode::OK,
                    Json(json!({"ok": true, "duplicate": true, "message": message})),
                )
                    .into_response();
            }
        }
    }

    if let Some(reply_id) = reply_to_message_id {
        let exists: i64 = connection.query_row(
            "SELECT COUNT(*) FROM messages WHERE id = ?1 AND conversation_id = ?2 AND deleted_at = 0",
            rusqlite::params![reply_id, conversation_id],
            |row| row.get(0),
        ).unwrap_or(0);
        if exists != 1 {
            return json_error(StatusCode::BAD_REQUEST, "invalid_reply");
        }
    }

    let relative = format!(
        "{}/{}.{}",
        conversation_id,
        random_file_stem(),
        extension_for_mime(mime)
    );
    let absolute = media_root().join(&relative);
    if let Some(parent) = absolute.parent() {
        if fs::create_dir_all(parent).is_err() {
            return json_error(StatusCode::INTERNAL_SERVER_ERROR, "media_store_failed");
        }
    }
    match fs::File::create(&absolute) {
        Ok(mut file) => {
            use std::io::Write;
            if file.write_all(&file_bytes).is_err() {
                let _ = fs::remove_file(&absolute);
                return json_error(StatusCode::INTERNAL_SERVER_ERROR, "media_store_failed");
            }
        }
        Err(_) => return json_error(StatusCode::INTERNAL_SERVER_ERROR, "media_store_failed"),
    }

    let now = unix_now();
    let transaction =
        match connection.transaction_with_behavior(rusqlite::TransactionBehavior::Immediate) {
            Ok(tx) => tx,
            Err(_) => {
                let _ = fs::remove_file(&absolute);
                return json_error(StatusCode::CONFLICT, "chat_busy");
            }
        };

    let inserted = transaction
        .execute(
            "INSERT OR IGNORE INTO messages (
                conversation_id, sender_user_id, message, is_read, delivered_at, read_at, created_at,
                reply_to_message_id, client_message_id, attachment_kind, attachment_mime, attachment_size, attachment_path
             ) VALUES (?1,?2,'',0,0,0,?3,?4,?5,?6,?7,?8,?9)",
            rusqlite::params![
                conversation_id,
                user_id,
                now,
                reply_to_message_id,
                client_message_id,
                kind,
                mime,
                file_bytes.len() as i64,
                relative
            ],
        )
        .unwrap_or(0);
    if inserted == 0 {
        let existing_id: Option<i64> = transaction
            .query_row(
                "SELECT id
                 FROM messages
                 WHERE conversation_id = ?1
                   AND sender_user_id = ?2
                   AND client_message_id = ?3
                 LIMIT 1",
                rusqlite::params![conversation_id, user_id, client_message_id],
                |row| row.get(0),
            )
            .ok();
        if let Some(existing_id) = existing_id {
            if transaction.commit().is_err() {
                let _ = fs::remove_file(&absolute);
                return json_error(StatusCode::INTERNAL_SERVER_ERROR, "message_store_failed");
            }
            let _ = fs::remove_file(&absolute);
            if let Some(message) = load_message(&connection, conversation_id, existing_id, user_id)
            {
                return (
                    StatusCode::OK,
                    Json(json!({"ok": true, "duplicate": true, "message": message})),
                )
                    .into_response();
            }
        }
        let _ = fs::remove_file(&absolute);
        return json_error(StatusCode::INTERNAL_SERVER_ERROR, "message_store_failed");
    }
    let message_id = transaction.last_insert_rowid();
    let _ = transaction.execute(
        "UPDATE conversations SET updated_at = ?2 WHERE id = ?1",
        rusqlite::params![conversation_id, now],
    );
    if transaction.commit().is_err() {
        let _ = fs::remove_file(&absolute);
        return json_error(StatusCode::INTERNAL_SERVER_ERROR, "message_store_failed");
    }

    let message = match load_message(&connection, conversation_id, message_id, user_id) {
        Some(m) => m,
        None => return json_error(StatusCode::INTERNAL_SERVER_ERROR, "message_load_failed"),
    };
    state.publish_chat_event(
        "message.created",
        conversation_id,
        message_id,
        user_id,
        other_user_id,
    );

    let _ = connection.execute(
        "UPDATE chat_preferences
         SET archived_at = 0, updated_at = ?3
         WHERE user_id = ?1 AND chat_kind = 'direct' AND target_id = ?2 AND archived_at > 0",
        rusqlite::params![other_user_id, user_id, now],
    );

    if !crate::db::chat_preferences::notifications_muted(
        &connection,
        other_user_id,
        crate::db::chat_preferences::KIND_DIRECT,
        user_id,
        now,
    ) {
        let _ = connection
            .execute(
                "INSERT INTO user_notifications (
                user_id,
                resource_id,
                kind,
                title,
                message,
                is_read,
                created_at
             )
             SELECT ?1, ?2, 'chat_message', 'Новое сообщение',
                    'У вас новое сообщение в GRABIT.', 0, ?3
             WHERE NOT EXISTS (
                SELECT 1
                FROM user_notifications
                WHERE user_id = ?1
                  AND kind = 'chat_message'
                  AND (resource_id = ?2 OR resource_id IS NULL)
                  AND is_read = 0
             )",
                rusqlite::params![other_user_id, user_id, now],
            )
            .unwrap_or(0);
    }

    (
        StatusCode::OK,
        Json(json!({"ok": true, "message": message})),
    )
        .into_response()
}

pub async fn api_chat_media(
    State(state): State<AppState>,
    Path(message_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    let user_id = match verify_user_session(&state, &headers) {
        Some(v) => v,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    let connection = match state.db_pool.get() {
        Ok(c) => c,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    let row: Result<(i64, String, String, String, String), _> = connection.query_row(
        "SELECT m.deleted_at, m.attachment_path, m.attachment_mime,
                m.attachment_kind, m.message
         FROM messages m JOIN conversations c ON c.id = m.conversation_id
         WHERE m.id = ?1 AND (c.user1_id = ?2 OR c.user2_id = ?2) LIMIT 1",
        rusqlite::params![message_id, user_id],
        |row| {
            Ok((
                row.get(0)?,
                row.get(1)?,
                row.get(2)?,
                row.get(3)?,
                row.get(4)?,
            ))
        },
    );
    let (deleted_at, relative, mime, kind, message) = match row {
        Ok(r) => r,
        Err(_) => return json_error(StatusCode::NOT_FOUND, "media_not_found"),
    };
    if deleted_at > 0 || !media_path_is_safe(&relative) {
        return json_error(StatusCode::NOT_FOUND, "media_not_found");
    }
    let bytes = match fs::read(media_root().join(&relative)) {
        Ok(b) => b,
        Err(_) => return json_error(StatusCode::NOT_FOUND, "media_not_found"),
    };
    let download_name =
        (kind == "document").then(|| safe_attachment_name(&message, extension_for_mime(&mime)));
    private_media_response(bytes, &mime, &headers, download_name.as_deref())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn media_paths_stay_inside_the_private_media_root() {
        assert!(media_path_is_safe("42/photo.webp"));
        assert!(media_path_is_safe("groups/7/voice.ogg"));
        assert!(!media_path_is_safe(""));
        assert!(!media_path_is_safe("../votes.db"));
        assert!(!media_path_is_safe("groups/../../votes.db"));
        assert!(!media_path_is_safe("/etc/passwd"));
    }

    fn temporary_upload_path(label: &str) -> PathBuf {
        std::env::temp_dir().join(format!(
            "grabit-{label}-{}-{}",
            std::process::id(),
            random_file_stem()
        ))
    }

    #[test]
    fn quarantined_upload_removes_unpublished_files_on_drop() {
        let path = temporary_upload_path("drop");
        fs::write(&path, b"temporary").expect("write quarantine fixture");
        let upload = QuarantinedUpload {
            path: Some(path.clone()),
            original_name: "fixture.txt".to_string(),
            size: 9,
            prefix: b"temporary".to_vec(),
        };
        drop(upload);
        assert!(!path.exists());
    }

    #[test]
    fn quarantine_publish_is_an_atomic_rename() {
        let source = temporary_upload_path("source");
        let destination = temporary_upload_path("destination");
        fs::write(&source, b"published").expect("write quarantine fixture");
        let upload = QuarantinedUpload {
            path: Some(source.clone()),
            original_name: "fixture.txt".to_string(),
            size: 9,
            prefix: b"published".to_vec(),
        };
        upload.publish(&destination).expect("publish upload");
        assert!(!source.exists());
        assert_eq!(
            fs::read(&destination).expect("read published file"),
            b"published"
        );
        fs::remove_file(destination).expect("remove published fixture");
    }

    #[test]
    fn media_retries_keep_one_message_per_client_id() {
        let connection = rusqlite::Connection::open_in_memory().expect("database");
        connection
            .execute_batch(
                "CREATE TABLE messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    conversation_id INTEGER NOT NULL,
                    sender_user_id INTEGER NOT NULL,
                    client_message_id TEXT NOT NULL,
                    attachment_kind TEXT NOT NULL,
                    UNIQUE(conversation_id, sender_user_id, client_message_id)
                 );",
            )
            .expect("schema");

        let first = connection
            .execute(
                "INSERT OR IGNORE INTO messages (
                    conversation_id, sender_user_id, client_message_id, attachment_kind
                 ) VALUES (7, 11, 'media_retry_123456', 'voice')",
                [],
            )
            .expect("first insert");
        let retry = connection
            .execute(
                "INSERT OR IGNORE INTO messages (
                    conversation_id, sender_user_id, client_message_id, attachment_kind
                 ) VALUES (7, 11, 'media_retry_123456', 'voice')",
                [],
            )
            .expect("retry insert");
        let count: i64 = connection
            .query_row("SELECT COUNT(*) FROM messages", [], |row| row.get(0))
            .expect("message count");

        assert_eq!(first, 1);
        assert_eq!(retry, 0);
        assert_eq!(count, 1);
    }

    #[test]
    fn attachment_detection_rejects_active_content() {
        assert!(detect_attachment(b"<html><script>alert(1)</script>", "attack.html").is_none());
        assert!(
            detect_attachment(b"<svg xmlns='http://www.w3.org/2000/svg'>", "attack.svg").is_none()
        );
        assert_eq!(
            detect_attachment(b"%PDF-1.7\n", "report.pdf").unwrap().kind,
            "document"
        );
        assert_eq!(
            detect_attachment(b"plain notes", "notes.txt").unwrap().mime,
            "text/plain"
        );
    }

    /// Builds a real, valid ZIP archive with `zip::ZipWriter` — genuine
    /// deflate-compressed entries, a real central directory, real CRC32s.
    fn build_zip_with_entries(entries: &[(&str, &[u8])]) -> Vec<u8> {
        let mut buffer = Vec::new();
        {
            let mut writer = zip::ZipWriter::new(std::io::Cursor::new(&mut buffer));
            let options = zip::write::SimpleFileOptions::default()
                .compression_method(zip::CompressionMethod::Deflated);
            for (name, data) in entries {
                writer.start_file(*name, options).expect("start_file");
                std::io::Write::write_all(&mut writer, data).expect("write entry data");
            }
            writer.finish().expect("finish zip");
        }
        buffer
    }

    /// Tiny limits so size/count tests don't allocate hundreds of
    /// megabytes just to prove the same comparison logic. Production
    /// traffic always uses `ZipValidationLimits::production()`; the
    /// *algorithm* being tested is identical either way — only the
    /// threshold changes.
    fn tiny_test_limits() -> ZipValidationLimits {
        ZipValidationLimits {
            max_entries: 4,
            max_entry_decompressed_bytes: 6144,
            max_total_decompressed_bytes: 8192,
            max_path_len: 180,
            max_path_depth: 10,
        }
    }

    fn far_future_deadline() -> std::time::Instant {
        std::time::Instant::now() + std::time::Duration::from_secs(30)
    }

    fn already_passed_deadline() -> std::time::Instant {
        std::time::Instant::now() - std::time::Duration::from_millis(1)
    }

    const DOCX_CONTENT_TYPES_XML: &[u8] = br#"<?xml version="1.0"?><Types><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>"#;
    const XLSX_CONTENT_TYPES_XML: &[u8] = br#"<?xml version="1.0"?><Types><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/></Types>"#;
    const RELS_XML: &[u8] = br#"<?xml version="1.0"?><Relationships><Relationship Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>"#;

    fn minimal_docx_entries() -> Vec<(&'static str, &'static [u8])> {
        vec![
            ("[Content_Types].xml", DOCX_CONTENT_TYPES_XML),
            ("_rels/.rels", RELS_XML),
            (
                "word/document.xml",
                br#"<?xml version="1.0"?><w:document xmlns:w="w"><w:body/></w:document>"#,
            ),
        ]
    }

    fn minimal_xlsx_entries() -> Vec<(&'static str, &'static [u8])> {
        vec![
            ("[Content_Types].xml", XLSX_CONTENT_TYPES_XML),
            ("_rels/.rels", RELS_XML),
            (
                "xl/workbook.xml",
                br#"<?xml version="1.0"?><workbook xmlns="s"><sheets/></workbook>"#,
            ),
        ]
    }

    #[test]
    fn accepts_a_real_minimal_docx() {
        let zip = build_zip_with_entries(&minimal_docx_entries());
        assert_eq!(
            validate_office_zip(
                &zip,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Ok(OfficeDocumentKind::Docx)
        );
        assert_eq!(
            detect_attachment(&zip, "report.docx").unwrap().mime,
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
    }

    #[test]
    fn accepts_a_real_minimal_xlsx() {
        let zip = build_zip_with_entries(&minimal_xlsx_entries());
        assert_eq!(
            validate_office_zip(
                &zip,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Ok(OfficeDocumentKind::Xlsx)
        );
        assert_eq!(
            detect_attachment(&zip, "sheet.xlsx").unwrap().mime,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
    }

    #[test]
    fn rejects_a_zip_with_no_office_structure() {
        let zip = build_zip_with_entries(&[("readme.txt", b"just a plain zip")]);
        assert_eq!(
            validate_office_zip(
                &zip,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::NotAnOfficePackage)
        );
        assert!(detect_attachment(&zip, "archive.zip").is_none());
    }

    #[test]
    fn docx_content_is_identified_correctly_even_with_an_xlsx_filename() {
        // The attack this defends against: naming real DOCX bytes
        // "evil.xlsx" (or vice versa) to confuse extension-based logic
        // downstream. Kind must come from the verified internal
        // structure, never the filename.
        let zip = build_zip_with_entries(&minimal_docx_entries());
        let detected = detect_attachment(&zip, "not-really.xlsx").unwrap();
        assert_eq!(
            detected.mime,
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
    }

    #[test]
    fn xlsx_content_is_identified_correctly_even_with_a_docx_filename() {
        let zip = build_zip_with_entries(&minimal_xlsx_entries());
        let detected = detect_attachment(&zip, "not-really.docx").unwrap();
        assert_eq!(
            detected.mime,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
    }

    #[test]
    fn office_content_type_must_match_the_detected_package_kind() {
        let entries = vec![
            ("[Content_Types].xml", XLSX_CONTENT_TYPES_XML),
            ("_rels/.rels", RELS_XML),
            ("word/document.xml", b"<w:document/>" as &[u8]),
        ];
        let zip = build_zip_with_entries(&entries);
        assert_eq!(
            validate_office_zip(
                &zip,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::ContentTypeMismatch)
        );
    }

    #[test]
    fn office_metadata_rejects_doctype_and_external_relationships() {
        let unsafe_content_types = br#"<!DOCTYPE Types><Types><Override ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>"#;
        let entries = vec![
            ("[Content_Types].xml", unsafe_content_types.as_slice()),
            ("_rels/.rels", RELS_XML),
            ("word/document.xml", b"<w:document/>" as &[u8]),
        ];
        let zip = build_zip_with_entries(&entries);
        assert_eq!(
            validate_office_zip(
                &zip,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::UnsafeXml)
        );

        let external_rels = br#"<Relationships><Relationship Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="https://attacker.invalid/file" TargetMode="External"/></Relationships>"#;
        let entries = vec![
            ("[Content_Types].xml", DOCX_CONTENT_TYPES_XML),
            ("_rels/.rels", external_rels.as_slice()),
            ("word/document.xml", b"<w:document/>" as &[u8]),
        ];
        let zip = build_zip_with_entries(&entries);
        assert_eq!(
            validate_office_zip(
                &zip,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::ExternalRelationship)
        );
    }

    #[test]
    fn a_real_highly_compressible_entry_within_limits_is_accepted() {
        // No ratio-based rejection is used: real decompressed byte counts
        // are enforced.
        // 3 KiB of zeros compresses via Deflate to a handful of bytes (a
        // very high real ratio) but the actual decompressed size is
        // trivially within tiny_test_limits' caps, so this must be
        // accepted purely on that basis.
        let mut entries = minimal_docx_entries();
        let compressible = vec![0u8; 3 * 1024];
        entries.push(("word/media/pattern.bin", &compressible));
        let zip = build_zip_with_entries(&entries);
        assert_eq!(
            validate_office_zip(&zip, tiny_test_limits(), far_future_deadline()),
            Ok(OfficeDocumentKind::Docx)
        );
    }

    #[test]
    fn a_real_decompression_bomb_is_caught_by_actual_streamed_output_not_metadata() {
        // Passes every metadata prefilter (entry count fine, declared
        // sizes aren't even inspected pre-decompression anymore) and is
        // only caught once Pass 2 actually reads more real bytes out of
        // the decompressor than tiny_test_limits allows for a single
        // entry. This is the test that specifically proves the streamed
        // limit — not a declared-size check — is what fires.
        let mut entries = minimal_docx_entries();
        let bomb_payload = vec![0u8; tiny_test_limits().max_entry_decompressed_bytes as usize + 1];
        entries.push(("word/media/bomb.bin", &bomb_payload));
        let zip = build_zip_with_entries(&entries);
        assert_eq!(
            validate_office_zip(&zip, tiny_test_limits(), far_future_deadline()),
            Err(OfficeZipRejection::EntryTooLarge)
        );
    }

    #[test]
    fn total_decompressed_limit_is_enforced_across_entries() {
        let mut limits = tiny_test_limits();
        limits.max_entries = 8;
        let mut entries = minimal_docx_entries();
        // Two entries, each individually under the per-entry cap, whose
        // sum exceeds the total cap.
        let half = vec![0u8; (limits.max_total_decompressed_bytes / 2) as usize + 100];
        entries.push(("word/media/a.bin", &half));
        entries.push(("word/media/b.bin", &half));
        let zip = build_zip_with_entries(&entries);
        assert_eq!(
            validate_office_zip(&zip, limits, far_future_deadline()),
            Err(OfficeZipRejection::TotalSizeTooLarge)
        );
    }

    #[test]
    fn too_many_entries_is_rejected() {
        let limits = tiny_test_limits(); // max_entries: 4
        let entries = vec![
            ("[Content_Types].xml", DOCX_CONTENT_TYPES_XML),
            ("_rels/.rels", RELS_XML),
            ("word/document.xml", b"<w:document/>" as &[u8]),
            ("word/media/one.bin", b"a"),
            ("word/media/two.bin", b"b"), // 5th entry, over the tiny limit
        ];
        let zip = build_zip_with_entries(&entries);
        assert_eq!(
            validate_office_zip(&zip, limits, far_future_deadline()),
            Err(OfficeZipRejection::TooManyEntries)
        );
    }

    #[test]
    fn validation_stops_at_a_deadline_that_has_already_passed() {
        let zip = build_zip_with_entries(&minimal_docx_entries());
        // A deadline in the past must be caught on the very first
        // cooperative check, before any decompression happens.
        assert_eq!(
            validate_office_zip(
                &zip,
                ZipValidationLimits::production(),
                already_passed_deadline()
            ),
            Err(OfficeZipRejection::Timeout)
        );
    }

    #[test]
    fn path_traversal_entry_is_rejected() {
        let mut entries = minimal_docx_entries();
        entries.push(("../../etc/passwd", b"pwned"));
        let zip = build_zip_with_entries(&entries);
        assert_eq!(
            validate_office_zip(
                &zip,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::UnsafePath)
        );
    }

    #[test]
    fn backslash_traversal_entry_is_rejected() {
        let mut entries = minimal_docx_entries();
        entries.push(("word\\..\\..\\evil.dll", b"pwned"));
        let zip = build_zip_with_entries(&entries);
        assert_eq!(
            validate_office_zip(
                &zip,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::UnsafePath)
        );
    }

    #[test]
    fn absolute_path_entry_is_rejected() {
        let mut entries = minimal_docx_entries();
        entries.push(("/etc/passwd", b"pwned"));
        let zip = build_zip_with_entries(&entries);
        assert_eq!(
            validate_office_zip(
                &zip,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::UnsafePath)
        );
    }

    #[test]
    fn encrypted_entry_is_rejected() {
        let mut buffer = build_zip_with_entries(&minimal_docx_entries());
        // Set the ZIP encryption flag in the first local and central
        // headers. The validator rejects on metadata before attempting
        // decryption, so a real encrypted payload is unnecessary here.
        let local = buffer
            .windows(4)
            .position(|window| window == b"PK\x03\x04")
            .expect("local header");
        buffer[local + 6] |= 1;
        let central = buffer
            .windows(4)
            .position(|window| window == b"PK\x01\x02")
            .expect("central header");
        buffer[central + 8] |= 1;
        assert_eq!(
            validate_office_zip(
                &buffer,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::Encrypted)
        );
    }

    #[test]
    fn symlink_entry_is_rejected() {
        let mut buffer = Vec::new();
        {
            let mut writer = zip::ZipWriter::new(std::io::Cursor::new(&mut buffer));
            let plain = zip::write::SimpleFileOptions::default()
                .compression_method(zip::CompressionMethod::Deflated);
            for (name, data) in minimal_docx_entries() {
                writer.start_file(name, plain).expect("start_file");
                std::io::Write::write_all(&mut writer, data).expect("write entry data");
            }
            writer
                .add_symlink("word/media/link", "/etc/passwd", plain)
                .expect("add_symlink");
            writer.finish().expect("finish zip");
        }
        assert_eq!(
            validate_office_zip(
                &buffer,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::UnsupportedFileType)
        );
    }

    #[test]
    fn duplicate_critical_entry_is_rejected() {
        let mut buffer = Vec::new();
        {
            let mut writer = zip::ZipWriter::new(std::io::Cursor::new(&mut buffer));
            let options = zip::write::SimpleFileOptions::default()
                .compression_method(zip::CompressionMethod::Deflated);
            // "[Content_Types].xml" written twice — a genuine unzip tool
            // must pick one, silently ignoring the other; that ambiguity
            // itself is the attack surface.
            for name in ["[Content_Types].xml", "[content_types].xml"] {
                writer.start_file(name, options).expect("start_file");
                std::io::Write::write_all(&mut writer, DOCX_CONTENT_TYPES_XML).expect("write");
            }
            writer
                .start_file("_rels/.rels", options)
                .expect("start_file");
            std::io::Write::write_all(&mut writer, RELS_XML).expect("write");
            writer
                .start_file("word/document.xml", options)
                .expect("start_file");
            std::io::Write::write_all(&mut writer, b"<w:document/>").expect("write");
            writer.finish().expect("finish zip");
        }
        assert_eq!(
            validate_office_zip(
                &buffer,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::DuplicateEntry)
        );
    }

    #[test]
    fn case_and_dot_slash_variant_duplicate_is_rejected() {
        // "./word/document.xml" and "Word/Document.xml" both normalize to
        // the same critical entry name — a second, differently-cased or
        // dot-prefixed copy must still be caught as a duplicate.
        let mut buffer = Vec::new();
        {
            let mut writer = zip::ZipWriter::new(std::io::Cursor::new(&mut buffer));
            let options = zip::write::SimpleFileOptions::default()
                .compression_method(zip::CompressionMethod::Deflated);
            writer
                .start_file("[Content_Types].xml", options)
                .expect("start_file");
            std::io::Write::write_all(&mut writer, DOCX_CONTENT_TYPES_XML).expect("write");
            writer
                .start_file("_rels/.rels", options)
                .expect("start_file");
            std::io::Write::write_all(&mut writer, RELS_XML).expect("write");
            writer
                .start_file("word/document.xml", options)
                .expect("start_file");
            std::io::Write::write_all(&mut writer, b"<w:document/>").expect("write");
            writer
                .start_file("Word/Document.xml", options)
                .expect("start_file");
            std::io::Write::write_all(&mut writer, b"<w:document/>").expect("write");
            writer.finish().expect("finish zip");
        }
        assert_eq!(
            validate_office_zip(
                &buffer,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::DuplicateEntry)
        );
    }

    #[test]
    fn macro_enabled_docm_style_payload_is_rejected() {
        let mut entries = minimal_docx_entries();
        entries.push(("word/vbaProject.bin", b"fake macro payload"));
        let zip = build_zip_with_entries(&entries);
        assert_eq!(
            validate_office_zip(
                &zip,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::MacroEnabled)
        );
    }

    #[test]
    fn corrupted_crc_is_rejected_for_the_actual_payload_not_the_directory() {
        // Use Stored (not Deflated) for the target entry so its bytes
        // appear verbatim in the archive and can be located exactly —
        // flipping a byte inside real entry *data*, not anywhere near the
        // central directory, so this genuinely proves a CRC32 mismatch on
        // read, not incidental structural corruption.
        let marker = b"FIND-THIS-EXACT-PAYLOAD-1234567890";
        let mut buffer = Vec::new();
        {
            let mut writer = zip::ZipWriter::new(std::io::Cursor::new(&mut buffer));
            let deflated = zip::write::SimpleFileOptions::default()
                .compression_method(zip::CompressionMethod::Deflated);
            let stored = zip::write::SimpleFileOptions::default()
                .compression_method(zip::CompressionMethod::Stored);
            writer
                .start_file("[Content_Types].xml", deflated)
                .expect("start_file");
            std::io::Write::write_all(&mut writer, DOCX_CONTENT_TYPES_XML).expect("write");
            writer
                .start_file("_rels/.rels", deflated)
                .expect("start_file");
            std::io::Write::write_all(&mut writer, RELS_XML).expect("write");
            writer
                .start_file("word/document.xml", stored)
                .expect("start_file");
            std::io::Write::write_all(&mut writer, marker).expect("write");
            writer.finish().expect("finish zip");
        }
        let data_at = buffer
            .windows(marker.len())
            .position(|window| window == marker)
            .expect("marker bytes must appear verbatim (Stored, no compression)");
        buffer[data_at] ^= 0xFF;
        assert_eq!(
            validate_office_zip(
                &buffer,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::InvalidCrcOrStream)
        );
    }

    #[test]
    fn truncated_zip_is_rejected() {
        let zip = build_zip_with_entries(&minimal_docx_entries());
        let truncated = &zip[..zip.len() / 2];
        assert_eq!(
            validate_office_zip(
                truncated,
                ZipValidationLimits::production(),
                far_future_deadline()
            ),
            Err(OfficeZipRejection::NotAZip)
        );
    }

    #[test]
    fn attachment_names_cannot_escape_storage() {
        assert_eq!(
            safe_attachment_name("../../report.pdf", "pdf"),
            "report.pdf"
        );
        assert_eq!(safe_attachment_name("../..", "txt"), "attachment.txt");
    }

    #[test]
    fn webm_duration_is_server_validated() {
        let mut webm = vec![
            0x1a, 0x45, 0xdf, 0xa3, 0x2a, 0xd7, 0xb1, 0x83, 0x0f, 0x42, 0x40, 0x44, 0x89, 0x88,
        ];
        // WebM Duration is expressed in TimecodeScale units. With the
        // default 1 ms scale, 120 seconds is encoded as 120_000 ticks.
        webm.extend_from_slice(&120_000.0f64.to_be_bytes());
        assert_eq!(webm_duration_seconds(&webm), Some(120.0));
        assert!(video_duration_is_allowed(&webm, "video/webm"));
    }

    #[test]
    fn byte_ranges_are_bounded_and_single_only() {
        assert_eq!(parse_single_range("bytes=0-99", 1000), Some((0, 99)));
        assert_eq!(parse_single_range("bytes=900-", 1000), Some((900, 999)));
        assert_eq!(parse_single_range("bytes=-200", 1000), Some((800, 999)));
        assert_eq!(parse_single_range("bytes=1000-", 1000), None);
        assert_eq!(parse_single_range("bytes=0-1,4-5", 1000), None);
    }
}
