use super::auth::verify_user_session;
use super::chat_api::ensure_conversation_for_outgoing;
use super::chat_identity::active_user_id_by_chat_route;
use super::common::{input_text_is_valid, rate_limit_retry_after, request_is_cross_site, unix_now};
use super::user_blocks::users_are_blocked;
use crate::state::app_state::AppState;
use axum::{
    body::Body,
    extract::{Multipart, Path, State},
    http::{header, HeaderMap, HeaderValue, StatusCode},
    response::{IntoResponse, Response},
    Json,
};
use serde::Serialize;
use serde_json::json;
use std::fs;
use std::path::{Path as FsPath, PathBuf};

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

fn zip_contains(bytes: &[u8], marker: &[u8]) -> bool {
    bytes.windows(marker.len()).any(|window| window == marker)
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
    if bytes.starts_with(b"PK\x03\x04") && zip_contains(bytes, b"[Content_Types].xml") {
        if zip_contains(bytes, b"word/") {
            return Some(DetectedMedia {
                kind: "document",
                mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                extension: "docx",
                max_bytes: MAX_DOCUMENT_BYTES,
            });
        }
        if zip_contains(bytes, b"xl/") {
            return Some(DetectedMedia {
                kind: "document",
                mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                extension: "xlsx",
                max_bytes: MAX_DOCUMENT_BYTES,
            });
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
    let mut file_bytes: Option<Vec<u8>> = None;
    let mut original_name = String::new();

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
            "image" | "file" => {
                original_name = field.file_name().unwrap_or("").to_string();
                if let Ok(b) = field.bytes().await {
                    file_bytes = Some(b.to_vec());
                }
            }
            _ => {}
        }
    }

    let file_bytes = match file_bytes {
        Some(b) if !b.is_empty() => b,
        _ => return json_error(StatusCode::BAD_REQUEST, "image_required"),
    };
    let detected = match detect_attachment(&file_bytes, &original_name) {
        Some(value) => value,
        None => return json_error(StatusCode::BAD_REQUEST, "unsupported_attachment"),
    };
    if file_bytes.len() > detected.max_bytes {
        return json_error(StatusCode::PAYLOAD_TOO_LARGE, "attachment_too_large");
    }
    if detected.kind == "video" && !video_duration_is_allowed(&file_bytes, detected.mime) {
        return json_error(StatusCode::BAD_REQUEST, "video_duration_invalid");
    }
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

    let inserted = transaction.execute(
        "INSERT OR IGNORE INTO messages (
            conversation_id, sender_user_id, message, is_read, delivered_at, read_at, created_at,
            reply_to_message_id, client_message_id, attachment_kind, attachment_mime, attachment_size, attachment_path
         ) VALUES (?1,?2,?3,0,0,0,?4,?5,?6,?7,?8,?9,?10)",
        rusqlite::params![
            conversation_id, user_id, caption, now, reply_to_message_id, client_message_id,
            kind, mime, file_bytes.len() as i64, relative
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
    let mut response = Response::new(Body::from(bytes));
    *response.status_mut() = StatusCode::OK;
    let ct = if mime.is_empty() {
        "application/octet-stream"
    } else {
        mime.as_str()
    };
    response.headers_mut().insert(
        header::CONTENT_TYPE,
        HeaderValue::from_str(ct)
            .unwrap_or_else(|_| HeaderValue::from_static("application/octet-stream")),
    );
    response.headers_mut().insert(
        header::CACHE_CONTROL,
        HeaderValue::from_static("private, max-age=3600"),
    );
    response.headers_mut().insert(
        header::X_CONTENT_TYPE_OPTIONS,
        HeaderValue::from_static("nosniff"),
    );
    response.headers_mut().insert(
        header::CONTENT_SECURITY_POLICY,
        HeaderValue::from_static("default-src 'none'; sandbox"),
    );
    if kind == "document" {
        let name = safe_attachment_name(&message, extension_for_mime(&mime));
        let value = format!(
            "attachment; filename*=UTF-8''{}",
            urlencoding::encode(&name)
        );
        if let Ok(value) = HeaderValue::from_str(&value) {
            response
                .headers_mut()
                .insert(header::CONTENT_DISPOSITION, value);
        }
    }
    response
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
        webm.extend_from_slice(&120_000.0f64.to_be_bytes());
        assert_eq!(webm_duration_seconds(&webm), Some(120.0));
        assert!(video_duration_is_allowed(&webm, "video/webm"));
    }
}
