mod account;
mod admin;
mod communication;
mod public;
mod resources;
mod system;

use crate::state::app_state::AppState;
use axum::{
    extract::DefaultBodyLimit,
    http::{header, HeaderValue},
    middleware,
    response::Response,
    Router,
};

async fn add_security_headers(mut response: Response) -> Response {
    let headers = response.headers_mut();
    headers.insert(
        header::X_CONTENT_TYPE_OPTIONS,
        HeaderValue::from_static("nosniff"),
    );
    headers.insert(header::X_FRAME_OPTIONS, HeaderValue::from_static("DENY"));
    headers.insert(
        header::REFERRER_POLICY,
        HeaderValue::from_static("no-referrer"),
    );
    headers.insert(
        header::HeaderName::from_static("permissions-policy"),
        HeaderValue::from_static("camera=(), microphone=(), geolocation=()"),
    );
    response
}

pub fn routes(state: AppState) -> Router {
    Router::new()
        .merge(public::routes())
        .merge(account::routes())
        .merge(communication::routes())
        .merge(resources::routes())
        .merge(admin::routes())
        .merge(system::routes())
        .nest_service(
            "/static",
            tower_http::services::ServeDir::new(
                std::env::var("STATIC_DIR").unwrap_or_else(|_| "static".to_string()),
            ),
        )
        .layer(DefaultBodyLimit::max(15 * 1024 * 1024))
        .layer(middleware::map_response(add_security_headers))
        .with_state(state)
}
