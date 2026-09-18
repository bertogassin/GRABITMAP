use super::auth::{current_session_public_id, verify_authenticated_user};
use super::auth_email::{hash_password, validate_password, verify_password};
use super::common::{
    csrf_rejected_response, rate_limit_retry_after, request_is_cross_site, unix_now,
};
use crate::state::app_state::AppState;
use crate::web::templates;
use axum::{
    extract::{Form, State},
    http::{header, HeaderMap, StatusCode},
    response::{Html, IntoResponse, Response},
};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct ChangePasswordForm {
    pub current_password: String,
    pub new_password: String,
    #[serde(default)]
    pub new_password_confirm: String,
}

fn password_status_page(heading: &str, body: &str) -> Response {
    Html(templates::status_page(
        "Смена пароля · GRABIT",
        "⚠ GRABIT",
        heading,
        body,
        r#"<a class="ui-button" href="/app/me">Назад в профиль</a>"#,
    ))
    .into_response()
}

pub async fn change_password(
    State(state): State<AppState>,
    headers: HeaderMap,
    Form(form): Form<ChangePasswordForm>,
) -> Response {
    if request_is_cross_site(&headers) {
        return csrf_rejected_response();
    }

    let Some(authenticated) = verify_authenticated_user(&state, &headers) else {
        return (
            StatusCode::SEE_OTHER,
            [(header::LOCATION, "/login?next=/app/me")],
        )
            .into_response();
    };

    if rate_limit_retry_after(&state, authenticated.user_id, "change_password", 5, 3_600)
        .await
        .is_some()
    {
        return password_status_page(
            "Слишком много попыток",
            "Подождите немного и повторите попытку.",
        );
    }

    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return (StatusCode::SERVICE_UNAVAILABLE, "Сервис недоступен").into_response(),
    };

    let password_hash: Option<String> = db
        .query_row(
            "SELECT password_hash FROM auth_identities WHERE user_id = ?1 AND provider = 'email' LIMIT 1",
            rusqlite::params![authenticated.user_id],
            |row| row.get(0),
        )
        .ok();

    if !verify_password(
        form.current_password.trim(),
        &password_hash.unwrap_or_default(),
    ) {
        return password_status_page(
            "Неверный текущий пароль",
            "Введите правильный текущий пароль, чтобы задать новый.",
        );
    }

    if let Err(error) = validate_password(&form.new_password) {
        let body = match error {
            "password_too_short" => "Новый пароль должен быть не короче 8 символов.",
            "password_too_long" => "Новый пароль слишком длинный.",
            _ => "Проверьте новый пароль.",
        };
        return password_status_page("Некорректный пароль", body);
    }

    if form.new_password_confirm.trim() != form.new_password.trim() {
        return password_status_page(
            "Пароли не совпадают",
            "Новый пароль и подтверждение должны совпадать.",
        );
    }

    let new_hash = match hash_password(form.new_password.trim()) {
        Ok(hash) => hash,
        Err(_) => {
            return (StatusCode::INTERNAL_SERVER_ERROR, "Не удалось сохранить пароль")
                .into_response()
        }
    };

    let now = unix_now();

    if db
        .execute(
            "UPDATE auth_identities SET password_hash = ?2, updated_at = ?3
             WHERE user_id = ?1 AND provider = 'email'",
            rusqlite::params![authenticated.user_id, &new_hash, now],
        )
        .unwrap_or(0)
        != 1
    {
        return (StatusCode::INTERNAL_SERVER_ERROR, "Не удалось сохранить пароль").into_response();
    }

    // Смена пароля отзывает остальные сессии — та же логика, что и
    // "Выйти на других устройствах" (app_revoke_other_sessions), текущую
    // сессию не трогаем.
    let current_public_id = current_session_public_id(&headers).unwrap_or_default();
    let _ = db.execute(
        "UPDATE user_sessions SET revoked_at = ?3
         WHERE user_id = ?1 AND session_public_id <> ?2 AND revoked_at IS NULL",
        rusqlite::params![authenticated.user_id, current_public_id, now],
    );

    (
        StatusCode::SEE_OTHER,
        [(header::LOCATION, "/app/me?password=changed")],
    )
        .into_response()
}
