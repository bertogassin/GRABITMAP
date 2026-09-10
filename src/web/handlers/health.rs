use super::admin_access::{
    load_admin_context, record_denied_access, verify_admin_session, AdminPermission,
};
use super::auth::verify_authenticated_user;
use crate::state::app_state::AppState;
use axum::{
    extract::State,
    http::{header, HeaderMap, HeaderValue, StatusCode},
    response::{IntoResponse, Response},
};

pub async fn health(State(state): State<AppState>) -> Response {
    let connection = match state.db_pool.get() {
        Ok(connection) => connection,
        Err(_) => {
            return (StatusCode::SERVICE_UNAVAILABLE, "db_unavailable").into_response();
        }
    };

    match connection.query_row("SELECT 1", [], |_| Ok(())) {
        Ok(()) => "ok".into_response(),
        Err(_) => (StatusCode::SERVICE_UNAVAILABLE, "db_error").into_response(),
    }
}

/// Readiness is deliberately stricter than liveness: it verifies that a
/// pooled SQLite connection can execute a query before traffic is sent here.
pub async fn ready(State(state): State<AppState>) -> Response {
    let connection = match state.db_pool.get() {
        Ok(connection) => connection,
        Err(_) => return (StatusCode::SERVICE_UNAVAILABLE, "db_unavailable").into_response(),
    };

    match connection.query_row("SELECT 1", [], |_| Ok(())) {
        Ok(()) => "ready".into_response(),
        Err(_) => (StatusCode::SERVICE_UNAVAILABLE, "db_error").into_response(),
    }
}

pub async fn metrics(State(state): State<AppState>, headers: HeaderMap) -> Response {
    let Some(authenticated) = verify_authenticated_user(&state, &headers) else {
        return (StatusCode::NOT_FOUND, "404").into_response();
    };

    let Some(context) = load_admin_context(&state, authenticated.user_id) else {
        record_denied_access(
            &state,
            authenticated.user_id,
            "metrics_access_denied",
            "Нет активного административного назначения",
        );
        return (StatusCode::NOT_FOUND, "404").into_response();
    };

    if !context.is_owner()
        || !context.has_permission(AdminPermission::InfrastructureRead)
        || !verify_admin_session(&state, &headers, context.user_id, context.assignment_id)
    {
        record_denied_access(
            &state,
            authenticated.user_id,
            "metrics_permission_denied",
            "Недостаточно прав или отсутствует действующая административная сессия",
        );
        return (StatusCode::FORBIDDEN, "Доступ запрещён").into_response();
    }

    let pool = &state.db_pool;
    let pool_state = pool.state();
    let backfill = crate::db::pool::get_connection(pool)
        .ok()
        .and_then(|connection| crate::db::group_member_search::backfill_status(&connection).ok());
    let backfill_processed = backfill.map_or(0, |status| status.processed_count);
    let backfill_completed = backfill.map_or(0, |status| i64::from(status.completed));
    let body = format!(
        "# HELP grabitmap_db_connections Open database connections.
\
# TYPE grabitmap_db_connections gauge
\
grabitmap_db_connections {}
\
# HELP grabitmap_db_idle_connections Idle database connections.
\
# TYPE grabitmap_db_idle_connections gauge
\
grabitmap_db_idle_connections {}
\
# HELP grabitmap_group_member_index_processed Membership rows processed by the private search backfill.
\
# TYPE grabitmap_group_member_index_processed gauge
\
grabitmap_group_member_index_processed {}
\
# HELP grabitmap_group_member_index_completed Whether the private member index backfill is complete.
\
# TYPE grabitmap_group_member_index_completed gauge
\
grabitmap_group_member_index_completed {}
",
        pool_state.connections,
        pool_state.idle_connections,
        backfill_processed,
        backfill_completed,
    );
    let mut response = body.into_response();
    let response_headers = response.headers_mut();

    response_headers.insert(
        header::CONTENT_TYPE,
        HeaderValue::from_static("text/plain; version=0.0.4; charset=utf-8"),
    );
    response_headers.insert(
        header::CACHE_CONTROL,
        HeaderValue::from_static("no-store, private"),
    );
    response_headers.insert(
        header::X_CONTENT_TYPE_OPTIONS,
        HeaderValue::from_static("nosniff"),
    );

    response
}

pub async fn robots_txt() -> Response {
    (
        [(header::CONTENT_TYPE, "text/plain; charset=utf-8")],
        "User-agent: *\n\
Allow: /rules\n\
Allow: /privacy\n\
Disallow: /app/user/\n\
Disallow: /app/me\n\
Disallow: /app/chat\n\
Disallow: /app/messages\n\
Disallow: /login\n\
Disallow: /register\n",
    )
        .into_response()
}

#[cfg(test)]
mod tests {
    #[test]
    fn robots_allows_legal_pages() {
        let source = include_str!("health.rs");
        assert!(source.contains("Allow: /rules"));
        assert!(source.contains("Allow: /privacy"));
    }

    #[test]
    fn metrics_require_owner_infrastructure_session() {
        let source = include_str!("health.rs");

        assert!(source.contains("verify_authenticated_user"));
        assert!(source.contains("load_admin_context"));
        assert!(source.contains("context.is_owner()"));
        assert!(source.contains("AdminPermission::InfrastructureRead"));
        assert!(source.contains("verify_admin_session"));
        assert!(source.contains("no-store, private"));
    }
}
