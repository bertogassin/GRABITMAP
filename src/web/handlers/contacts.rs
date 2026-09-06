use axum::{
    extract::Path,
    response::{IntoResponse, Redirect, Response},
};

pub async fn contact_requests_page() -> Response {
    Redirect::to("/app/messages").into_response()
}

pub async fn retired_contact_decision(Path(_id): Path<i64>) -> Response {
    Redirect::to("/app/messages").into_response()
}
