use crate::web::templates;
use axum::response::Html;

pub async fn rules_page() -> Html<String> {
    Html(templates::render_rules())
}

pub async fn privacy_page() -> Html<String> {
    Html(templates::render_privacy())
}
