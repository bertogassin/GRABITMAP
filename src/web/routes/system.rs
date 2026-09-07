use super::super::handlers::{
    health, metrics, profession_sectors, profession_suggestions, ready, robots_txt,
    stripe_promotion_webhook,
};
use crate::state::app_state::AppState;
use axum::{
    routing::{get, post},
    Router,
};

pub(super) fn routes() -> Router<AppState> {
    Router::new()
        .route("/health", get(health))
        .route("/ready", get(ready))
        .route("/metrics", get(metrics))
        .route("/robots.txt", get(robots_txt))
        .route("/api/professions/sectors", get(profession_sectors))
        .route("/api/professions/suggest", get(profession_suggestions))
        .route("/api/stripe/webhook", post(stripe_promotion_webhook))
}
