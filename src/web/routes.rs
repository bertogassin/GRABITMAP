mod account;
mod admin;
mod communication;
mod public;
mod resources;
mod system;

use crate::state::app_state::AppState;
use axum::{
    extract::DefaultBodyLimit,
    http::{header, HeaderValue, Request},
    middleware::{self, Next},
    response::Response,
    Router,
};

async fn security_headers(request: Request<axum::body::Body>, next: Next) -> Response {
    let mut response = next.run(request).await;
    let headers = response.headers_mut();
    headers.insert(
        header::X_CONTENT_TYPE_OPTIONS,
        HeaderValue::from_static("nosniff"),
    );
    headers.insert(
        header::X_FRAME_OPTIONS,
        HeaderValue::from_static("SAMEORIGIN"),
    );
    headers.insert(
        header::REFERRER_POLICY,
        HeaderValue::from_static("strict-origin-when-cross-origin"),
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
        .nest_service("/static", tower_http::services::ServeDir::new("static"))
        .layer(DefaultBodyLimit::max(15 * 1024 * 1024))
        .layer(middleware::from_fn(security_headers))
        .with_state(state)
}
