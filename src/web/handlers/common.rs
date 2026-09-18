use crate::state::app_state::AppState;
use axum::{
    extract::Request,
    http::{header, HeaderMap, StatusCode},
    middleware::Next,
    response::IntoResponse,
    response::Response,
    Json,
};
use serde_json::json;
use std::collections::{HashMap, VecDeque};

const RATE_LIMIT_MAX_KEYS: usize = 16_384;
// Keep this at least as large as the longest window passed below (currently
// one hour), so cleanup never weakens an active limit.
const RATE_LIMIT_STALE_AFTER_SECONDS: i64 = 60 * 60;

fn reserve_rate_limit_key(
    limits: &mut HashMap<String, VecDeque<i64>>,
    key: &str,
    now: i64,
    max_keys: usize,
    stale_after_seconds: i64,
) -> bool {
    if limits.contains_key(key) {
        return true;
    }

    if limits.len() >= max_keys {
        let cutoff = now.saturating_sub(stale_after_seconds);
        limits.retain(|_, events| events.back().is_some_and(|timestamp| *timestamp > cutoff));
    }

    limits.len() < max_keys
}

/// Apply browser hardening headers to every response, including error responses.
pub(crate) async fn security_headers(request: Request, next: Next) -> Response {
    let mut response = next.run(request).await;
    let headers = response.headers_mut();
    headers.insert(
        header::X_CONTENT_TYPE_OPTIONS,
        "nosniff".parse().expect("valid header"),
    );
    headers.insert(
        header::X_FRAME_OPTIONS,
        "DENY".parse().expect("valid header"),
    );
    headers.insert(
        header::REFERRER_POLICY,
        "strict-origin-when-cross-origin"
            .parse()
            .expect("valid header"),
    );
    headers.insert(
        "permissions-policy",
        "camera=(), geolocation=(), microphone=(self), accelerometer=(self), gyroscope=(self)"
            .parse()
            .expect("valid header"),
    );
    response
}

pub(super) fn resource_owner_user_id(client_id: &str) -> Option<i64> {
    if let Some(value) = client_id.strip_prefix("user:") {
        return value.parse::<i64>().ok();
    }

    client_id
        .strip_prefix("tg:")
        .and_then(|value| value.parse::<i64>().ok())
}

pub(super) fn input_text_is_valid(value: &str, min_chars: usize, max_chars: usize) -> bool {
    let length = value.chars().count();

    if length < min_chars || length > max_chars {
        return false;
    }

    // Запрещаем управляющие символы, которые не нужны
    // обычному пользовательскому тексту.
    //
    // Перевод строки / CR / TAB разрешаем:
    // они нужны описаниям, сообщениям и статусам.
    !value
        .chars()
        .any(|c| c.is_control() && c != '\n' && c != '\r' && c != '\t')
}

pub(super) fn unix_now() -> i64 {
    use std::time::{SystemTime, UNIX_EPOCH};

    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_secs() as i64)
        .unwrap_or(0)
}

pub(super) async fn rate_limit_retry_after(
    state: &AppState,
    user_id: i64,
    action: &str,
    max_requests: usize,
    window_seconds: i64,
) -> Option<u64> {
    let now = unix_now();
    let cutoff = now.saturating_sub(window_seconds);
    let key = format!("{}:{}", action, user_id);

    let mut limits = state.rate_limits.lock().await;
    if !reserve_rate_limit_key(
        &mut limits,
        &key,
        now,
        RATE_LIMIT_MAX_KEYS,
        RATE_LIMIT_STALE_AFTER_SECONDS,
    ) {
        // Fail closed under cardinality abuse instead of allowing an
        // attacker to grow the process-local map without a bound.
        return Some(window_seconds.max(1) as u64);
    }

    let events = limits.entry(key).or_default();

    // Sliding window:
    // забываем только запросы, вышедшие за текущее окно.
    while let Some(timestamp) = events.front().copied() {
        if timestamp <= cutoff {
            events.pop_front();
        } else {
            break;
        }
    }

    if events.len() >= max_requests {
        let oldest = events.front().copied().unwrap_or(now);

        let retry_after = oldest
            .saturating_add(window_seconds)
            .saturating_sub(now)
            .max(1);

        return Some(retry_after as u64);
    }

    events.push_back(now);

    None
}

fn trusted_request_origin(origin: &str) -> bool {
    matches!(
        origin.trim_end_matches('/'),
        "https://grabitmap.com"
            | "https://www.grabitmap.com"
            | "http://127.0.0.1:3000"
            | "http://localhost:3000"
    )
}

fn trusted_request_referer(referer: &str) -> bool {
    let referer = referer.trim();

    [
        "https://grabitmap.com",
        "https://www.grabitmap.com",
        "http://127.0.0.1:3000",
        "http://localhost:3000",
    ]
    .iter()
    .any(|origin| {
        referer == *origin
            || referer
                .strip_prefix(origin)
                .is_some_and(|path| path.starts_with('/'))
    })
}

/// Best-effort client IP (first hop of `X-Forwarded-For`, spoofable by the
/// client — fine for display/audit, not for authorization) and user agent,
/// both length-capped for storage.
pub(super) fn request_metadata(headers: &HeaderMap) -> (String, String) {
    let ip_address = headers
        .get("x-forwarded-for")
        .and_then(|value| value.to_str().ok())
        .and_then(|value| value.split(',').next())
        .map(str::trim)
        .unwrap_or("")
        .chars()
        .take(64)
        .collect::<String>();

    let user_agent = headers
        .get(header::USER_AGENT)
        .and_then(|value| value.to_str().ok())
        .unwrap_or("")
        .chars()
        .take(255)
        .collect::<String>();

    (ip_address, user_agent)
}

pub(super) fn request_is_cross_site(headers: &HeaderMap) -> bool {
    let origin = headers
        .get(header::ORIGIN)
        .and_then(|value| value.to_str().ok())
        .map(str::trim);

    let fetch_site = headers
        .get("sec-fetch-site")
        .and_then(|value| value.to_str().ok())
        .map(str::trim);

    let fetch_is_cross_site =
        fetch_site.is_some_and(|value| value.eq_ignore_ascii_case("cross-site"));

    let fetch_is_first_party = fetch_site.is_some_and(|value| {
        value.eq_ignore_ascii_case("same-origin") || value.eq_ignore_ascii_case("same-site")
    });

    // Only first-party browser origins are trusted.
    if origin.is_some_and(trusted_request_origin) {
        return false;
    }

    // Android PWA/WebView can send an opaque Origin for a legitimate form
    // navigation. Accept it only when browser-controlled fetch metadata or a
    // first-party Referer independently confirms the request source.
    if origin == Some("null") {
        if fetch_is_cross_site {
            return true;
        }

        let trusted_referer = headers
            .get(header::REFERER)
            .and_then(|value| value.to_str().ok())
            .is_some_and(trusted_request_referer);

        return !(fetch_is_first_party || trusted_referer);
    }

    // Any other explicitly supplied Origin is untrusted.
    if origin.is_some() {
        return true;
    }

    // Если Origin отсутствует, Sec-Fetch-Site остаётся
    // дополнительной защитой от внешней формы.
    fetch_is_cross_site
}

/// Shared Resend transactional-email sender used by every code-delivery
/// flow (login code, password reset, account deletion, owner step-up).
pub(super) async fn send_transactional_email(
    to: &str,
    subject: &str,
    html: String,
) -> Result<(), String> {
    let api_key = std::env::var("RESEND_API_KEY")
        .map_err(|_| "RESEND_API_KEY is not configured".to_string())?;

    let from = std::env::var("GRABIT_MAIL_FROM")
        .or_else(|_| std::env::var("RESURSMAP_MAIL_FROM"))
        .unwrap_or_else(|_| "GRABIT <noreply@grabitmap.com>".to_string());

    let response = reqwest::Client::new()
        .post("https://api.resend.com/emails")
        .bearer_auth(api_key)
        .json(&json!({
            "from": from,
            "to": [to],
            "subject": subject,
            "html": html,
        }))
        .send()
        .await
        .map_err(|_| "mail_transport_error".to_string())?;

    if !response.status().is_success() {
        return Err(format!("mail_provider_status_{}", response.status()));
    }

    Ok(())
}

pub(super) fn csrf_rejected_response() -> Response {
    (
        StatusCode::FORBIDDEN,
        Json(json!({
            "ok": false,
            "error": "cross_site_request_rejected"
        })),
    )
        .into_response()
}

#[cfg(test)]
mod request_origin_tests {
    use super::*;

    #[test]
    fn rate_limit_keys_prune_stale_entries_at_capacity() {
        let now = 10_000;
        let mut limits = HashMap::from([
            ("old-a".to_string(), VecDeque::from([100])),
            ("old-b".to_string(), VecDeque::from([200])),
        ]);

        assert!(reserve_rate_limit_key(&mut limits, "new", now, 2, 60));
        assert!(limits.is_empty());
    }

    #[test]
    fn rate_limit_keys_fail_closed_when_capacity_is_fresh() {
        let now = 10_000;
        let mut limits = HashMap::from([
            ("fresh-a".to_string(), VecDeque::from([now - 1])),
            ("fresh-b".to_string(), VecDeque::from([now - 2])),
        ]);

        assert!(!reserve_rate_limit_key(&mut limits, "new", now, 2, 60));
        assert_eq!(limits.len(), 2);
        assert!(reserve_rate_limit_key(&mut limits, "fresh-a", now, 2, 60));
    }

    #[test]
    fn opaque_origin_accepts_browser_confirmed_first_party_requests() {
        for fetch_site in ["same-origin", "same-site"] {
            let mut headers = HeaderMap::new();
            headers.insert(header::ORIGIN, "null".parse().expect("origin"));
            headers.insert("sec-fetch-site", fetch_site.parse().expect("fetch site"));

            assert!(!request_is_cross_site(&headers));
        }
    }

    #[test]
    fn opaque_origin_accepts_trusted_referer_fallback() {
        let mut headers = HeaderMap::new();
        headers.insert(header::ORIGIN, "null".parse().expect("origin"));
        headers.insert(
            header::REFERER,
            "https://grabitmap.com/app/me".parse().expect("referer"),
        );

        assert!(!request_is_cross_site(&headers));
    }

    #[test]
    fn opaque_origin_still_rejects_cross_site_requests() {
        let mut headers = HeaderMap::new();
        headers.insert(header::ORIGIN, "null".parse().expect("origin"));
        headers.insert("sec-fetch-site", "cross-site".parse().expect("fetch site"));
        headers.insert(
            header::REFERER,
            "https://grabitmap.com/app/me".parse().expect("referer"),
        );

        assert!(request_is_cross_site(&headers));
    }

    #[test]
    fn opaque_origin_without_first_party_evidence_is_rejected() {
        let mut headers = HeaderMap::new();
        headers.insert(header::ORIGIN, "null".parse().expect("origin"));
        headers.insert(
            header::REFERER,
            "https://evil.example/attack".parse().expect("referer"),
        );

        assert!(request_is_cross_site(&headers));
    }

    #[test]
    fn missing_origin_does_not_override_cross_site_signal() {
        let mut headers = HeaderMap::new();

        headers.insert("sec-fetch-site", "cross-site".parse().expect("fetch site"));

        assert!(request_is_cross_site(&headers));
    }

    #[test]
    fn only_grabit_and_local_development_origins_are_trusted() {
        assert!(trusted_request_origin("https://grabitmap.com"));
        assert!(trusted_request_origin("https://www.grabitmap.com"));
        assert!(trusted_request_origin("http://localhost:3000"));

        assert!(!trusted_request_origin("https://resursmap.de"));
        assert!(!trusted_request_origin("https://www.resursmap.de"));
        assert!(!trusted_request_referer("https://resursmap.de/app/me"));
        assert!(!trusted_request_referer(
            "https://www.resursmap.de/app/center"
        ));

        assert!(!trusted_request_origin("https://t.me"));
        assert!(!trusted_request_origin("https://web.telegram.org"));
        assert!(!trusted_request_origin("https://evil.example"));
        assert!(!trusted_request_origin(
            "https://grabitmap.com.evil.example"
        ));
    }
}
