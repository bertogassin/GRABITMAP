use super::admin_access::{
    create_admin_session, load_admin_context, record_denied_access, scope_is_authorized,
    verify_admin_session, AdminPermission,
};
use super::auth::verify_authenticated_user;
use crate::state::app_state::AppState;
use crate::web::templates::{render_admin_dashboard, AdminDashboardData};
use axum::{
    extract::State,
    http::{header, HeaderMap, HeaderValue, StatusCode},
    response::{Html, IntoResponse, Response},
};
use rusqlite::params;
use std::{env, fs};

const DEFAULT_MONITOR_STATE_PATH: &str = "/run/grabit-monitor/current";
const MAX_MONITOR_STATE_BYTES: usize = 4_096;
const MONITOR_STALE_SECONDS: i64 = 180;

struct ProductionStatus {
    status: String,
    checked_at: String,
    details: String,
    disk_used_percent: i64,
    memory_available_percent: i64,
}

impl Default for ProductionStatus {
    fn default() -> Self {
        Self {
            status: "unavailable".to_string(),
            checked_at: "Нет данных".to_string(),
            details: "monitor_state_unavailable".to_string(),
            disk_used_percent: 0,
            memory_available_percent: 0,
        }
    }
}

fn parse_production_status(raw: &str, now: i64) -> ProductionStatus {
    if raw.len() > MAX_MONITOR_STATE_BYTES {
        return ProductionStatus::default();
    }

    let value = |key: &str| -> Option<&str> {
        raw.lines()
            .find_map(|line| line.strip_prefix(&format!("{key}=")))
            .map(str::trim)
    };

    let mut status = match value("status") {
        Some("healthy") => "healthy".to_string(),
        Some("failed") => "failed".to_string(),
        _ => "unavailable".to_string(),
    };

    let checked_at = value("checked_at").unwrap_or("Нет данных").to_string();
    let mut details = value("details")
        .unwrap_or("monitor_state_unavailable")
        .to_string();

    let disk_used_percent = value("disk_used_percent")
        .and_then(|item| item.parse::<i64>().ok())
        .unwrap_or(0)
        .clamp(0, 100);

    let memory_available_percent = value("memory_available_percent")
        .and_then(|item| item.parse::<i64>().ok())
        .unwrap_or(0)
        .clamp(0, 100);

    let checked_timestamp = chrono::DateTime::parse_from_rfc3339(&checked_at)
        .ok()
        .map(|checked| checked.timestamp());

    if status != "unavailable"
        && checked_timestamp
            .map(|checked| now.saturating_sub(checked) > MONITOR_STALE_SECONDS)
            .unwrap_or(true)
    {
        status = "stale".to_string();
        details = "monitor_data_stale".to_string();
    }

    ProductionStatus {
        status,
        checked_at,
        details,
        disk_used_percent,
        memory_available_percent,
    }
}

fn load_production_status() -> ProductionStatus {
    let path =
        env::var("MONITOR_STATE_PATH").unwrap_or_else(|_| DEFAULT_MONITOR_STATE_PATH.to_string());

    let Ok(raw) = fs::read_to_string(path) else {
        return ProductionStatus::default();
    };

    parse_production_status(&raw, chrono::Utc::now().timestamp())
}

pub async fn center_panel(State(state): State<AppState>, headers: HeaderMap) -> Response {
    let authenticated_user = match verify_authenticated_user(&state, &headers) {
        Some(user) => user,
        None => {
            return (StatusCode::UNAUTHORIZED, "Требуется вход в аккаунт GRABIT").into_response();
        }
    };

    let context = match load_admin_context(&state, authenticated_user.user_id) {
        Some(context) => context,
        None => {
            record_denied_access(
                &state,
                authenticated_user.user_id,
                "admin_center_access_denied",
                "Нет активного административного назначения",
            );

            return (StatusCode::NOT_FOUND, "404").into_response();
        }
    };

    if context.level.number() == 1
        && context.scope_type == "group"
        && context.has_permission(AdminPermission::ModerationReview)
    {
        return (
            StatusCode::SEE_OTHER,
            [(header::LOCATION, "/app/center/group")],
        )
            .into_response();
    }

    if context.level.number() == 2
        && context.scope_type == "city"
        && context.has_permission(AdminPermission::ModerationReview)
        && context.has_permission(AdminPermission::GroupsManage)
        && context.has_permission(AdminPermission::AssistantsManage)
    {
        return (
            StatusCode::SEE_OTHER,
            [(header::LOCATION, "/app/center/city")],
        )
            .into_response();
    }

    if !context.is_owner() || !context.has_permission(AdminPermission::InfrastructureRead) {
        record_denied_access(
            &state,
            authenticated_user.user_id,
            "owner_center_access_denied",
            "Недостаточный уровень или разрешение",
        );

        return (StatusCode::FORBIDDEN, "Доступ запрещён").into_response();
    }

    if !scope_is_authorized(&state, &context, context.scope_id) {
        record_denied_access(
            &state,
            authenticated_user.user_id,
            "admin_scope_access_denied",
            "Назначенная территория не прошла серверную проверку",
        );

        return (StatusCode::FORBIDDEN, "Территория недоступна").into_response();
    }

    if !verify_admin_session(&state, &headers, context.user_id, context.assignment_id) {
        let cookie = match create_admin_session(&state, &context, &headers) {
            Ok(cookie) => cookie,
            Err(_) => {
                record_denied_access(
                    &state,
                    authenticated_user.user_id,
                    "admin_session_creation_failed",
                    "Не удалось создать короткую административную сессию",
                );

                return (
                    StatusCode::SERVICE_UNAVAILABLE,
                    "Не удалось открыть защищённую административную сессию",
                )
                    .into_response();
            }
        };

        let cookie_header = match HeaderValue::from_str(&cookie) {
            Ok(value) => value,
            Err(_) => {
                return (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Ошибка защищённой сессии",
                )
                    .into_response();
            }
        };

        let mut response = StatusCode::SEE_OTHER.into_response();

        response
            .headers_mut()
            .insert(header::LOCATION, HeaderValue::from_static("/app/center"));

        response
            .headers_mut()
            .insert(header::SET_COOKIE, cookie_header);

        response.headers_mut().insert(
            header::CACHE_CONTROL,
            HeaderValue::from_static("no-store, no-cache, must-revalidate, private"),
        );

        return response;
    }

    let connection = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(connection) => connection,
        Err(_) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                "База данных временно недоступна",
            )
                .into_response();
        }
    };

    let scalar =
        |sql: &str| -> i64 { connection.query_row(sql, [], |row| row.get(0)).unwrap_or(0) };

    let users = scalar("SELECT COUNT(*) FROM users WHERE is_active = 1");

    let resources = scalar("SELECT COUNT(*) FROM resources WHERE is_active = 1");

    let pending_resources = scalar(
        "SELECT COUNT(*)
         FROM resources
         WHERE moderation_status = 'pending'",
    );

    let complaints = scalar(
        "SELECT COUNT(*)
         FROM resource_reports
         WHERE status <> 'closed'",
    );

    let unread_notifications = connection
        .query_row(
            "SELECT COUNT(*)
             FROM user_notifications
             WHERE user_id = ?1
               AND is_read = 0",
            params![context.user_id],
            |row| row.get(0),
        )
        .unwrap_or(0);

    let active_sessions = scalar(
        "SELECT COUNT(*)
         FROM admin_sessions
         WHERE revoked_at IS NULL
           AND expires_at > strftime('%s','now')",
    );

    let security_warnings = scalar(
        "SELECT COUNT(*)
         FROM admin_security_events
         WHERE severity IN ('high','critical')
           AND created_at > strftime('%s','now') - 86400",
    );

    let audit_events = scalar("SELECT COUNT(*) FROM admin_action_audit");

    let premium_resources = scalar(
        "SELECT COUNT(*)
         FROM resources
         WHERE is_premium = 1
           AND is_active = 1",
    );

    let mut levels = [0_i64; 5];

    if let Ok(mut statement) = connection.prepare(
        "SELECT role_level, COUNT(*)
         FROM admin_assignments
         WHERE status = 'active'
           AND valid_from <= strftime('%s','now')
           AND (
                valid_until IS NULL
                OR valid_until > strftime('%s','now')
           )
         GROUP BY role_level",
    ) {
        if let Ok(rows) =
            statement.query_map([], |row| Ok((row.get::<_, i64>(0)?, row.get::<_, i64>(1)?)))
        {
            for row in rows.flatten() {
                let (level, count) = row;

                if (1..=5).contains(&level) {
                    levels[(level - 1) as usize] = count;
                }
            }
        }
    }

    let enabled_permissions = AdminPermission::all()
        .iter()
        .filter(|permission| context.has_permission(**permission))
        .count() as i64;

    let owner_display_name: String = connection
        .query_row(
            "SELECT CASE
                WHEN TRIM(first_name || ' ' || last_name) <> ''
                    THEN TRIM(first_name || ' ' || last_name)
                WHEN username <> ''
                    THEN '@' || username
                ELSE 'Владелец GRABIT'
             END
             FROM profiles
             WHERE user_id = ?1",
            params![context.user_id],
            |row| row.get(0),
        )
        .unwrap_or_else(|_| "Владелец GRABIT".to_string());

    let production = load_production_status();

    let data = AdminDashboardData {
        owner_name: &owner_display_name,
        level: context.level.number(),
        level_title: context.level.title(),
        territory: &context.scope_name,
        assignment_id: context.assignment_id,
        scope_id: context.scope_id,
        enabled_permissions,
        users,
        resources,
        pending_resources,
        premium_resources,
        complaints,
        unread_notifications,
        active_sessions,
        security_warnings,
        audit_events,
        level_counts: levels,
        production_status: &production.status,
        production_checked_at: &production.checked_at,
        production_details: &production.details,
        disk_used_percent: production.disk_used_percent,
        memory_available_percent: production.memory_available_percent,
    };

    drop(connection);

    let html = render_admin_dashboard(data);
    let mut response = Html(html).into_response();

    let response_headers = response.headers_mut();

    response_headers.insert(
        "cache-control",
        HeaderValue::from_static("no-store, no-cache, must-revalidate, private"),
    );

    response_headers.insert("pragma", HeaderValue::from_static("no-cache"));

    response_headers.insert("x-frame-options", HeaderValue::from_static("DENY"));

    response_headers.insert(
        "x-content-type-options",
        HeaderValue::from_static("nosniff"),
    );

    response_headers.insert("referrer-policy", HeaderValue::from_static("no-referrer"));

    response_headers.insert(
        "content-security-policy",
        HeaderValue::from_static(
            "default-src 'self'; \
             style-src 'self' 'unsafe-inline'; \
             img-src 'self' data:; \
             script-src 'self'; \
             connect-src 'self'; \
             object-src 'none'; \
             base-uri 'none'; \
             frame-ancestors 'none'; \
             form-action 'self'",
        ),
    );

    response
}

#[cfg(test)]
mod production_status_tests {
    use super::*;

    const HEALTHY: &str = "status=healthy
checked_at=2026-09-09T07:28:50Z
details=all_checks_passed
disk_used_percent=8
memory_available_percent=81
";

    fn checked_timestamp() -> i64 {
        chrono::DateTime::parse_from_rfc3339("2026-09-09T07:28:50Z")
            .expect("timestamp")
            .timestamp()
    }

    #[test]
    fn fresh_monitor_state_is_renderable() {
        let state = parse_production_status(HEALTHY, checked_timestamp() + 60);

        assert_eq!(state.status, "healthy");
        assert_eq!(state.details, "all_checks_passed");
        assert_eq!(state.disk_used_percent, 8);
        assert_eq!(state.memory_available_percent, 81);
    }

    #[test]
    fn old_monitor_state_is_marked_stale() {
        let state =
            parse_production_status(HEALTHY, checked_timestamp() + MONITOR_STALE_SECONDS + 1);

        assert_eq!(state.status, "stale");
        assert_eq!(state.details, "monitor_data_stale");
    }

    #[test]
    fn malformed_monitor_state_is_not_trusted() {
        let state = parse_production_status(
            "status=unknown
checked_at=broken
disk_used_percent=900
memory_available_percent=-20
",
            checked_timestamp(),
        );

        assert_eq!(state.status, "unavailable");
        assert_eq!(state.disk_used_percent, 100);
        assert_eq!(state.memory_available_percent, 0);
    }
}
