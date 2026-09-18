use super::auth::{
    cookie_security_flags, email_rate_limit_id, ip_rate_limit_id, normalize_email,
    verify_authenticated_user,
};
use super::auth_email::verify_password;
use super::common::{
    constant_time_eq, csrf_rejected_response, rate_limit_retry_after, request_is_cross_site,
    send_transactional_email, unix_now,
};
use crate::state::app_state::AppState;
use crate::web::templates;
use axum::{
    extract::{Form, Query, State},
    http::{header, HeaderMap, HeaderValue, StatusCode},
    response::{Html, IntoResponse, Response},
    Json,
};
use hmac::{Hmac, Mac};
use serde::Deserialize;
use serde_json::json;
use sha2::Sha256;

const DELETION_CODE_TTL_SECONDS: i64 = 900;
const DELETION_CODE_MAX_ATTEMPTS: i64 = 5;
const DELETION_CANCEL_TOKEN_TTL_SECONDS: i64 = crate::account_deletion::GRACE_PERIOD_SECONDS;

fn generate_deletion_code() -> String {
    let mut bytes = [0u8; 4];
    getrandom::getrandom(&mut bytes).expect("secure random");
    let value = u32::from_be_bytes(bytes) % 1_000_000;
    format!("{value:06}")
}

fn hash_deletion_code(state: &AppState, email: &str, code: &str, expires_at: i64) -> String {
    type HmacSha256 = Hmac<Sha256>;

    let payload = format!("account-deletion-code:{email}:{code}:{expires_at}");
    let mut mac = HmacSha256::new_from_slice(state.admin_key.as_bytes()).expect("HMAC key");
    mac.update(payload.as_bytes());
    hex::encode(mac.finalize().into_bytes())
}

async fn send_deletion_code_email(email: &str, code: &str) -> Result<(), String> {
    send_transactional_email(
        email,
        "Подтверждение удаления аккаунта GRABIT",
        templates::transactional_code_email_html(
            "GRABIT",
            "Код для удаления аккаунта:",
            code,
            "Код действует 15 минут. После подтверждения аккаунт будет скрыт сразу, а данные удалены безвозвратно через 30 дней.",
            "Если вы не запрашивали удаление, проигнорируйте письмо — код никого не пустит в аккаунт.",
        ),
    )
    .await
}

fn generate_cancel_token() -> String {
    let mut bytes = [0u8; 32];
    getrandom::getrandom(&mut bytes).expect("secure random");
    hex::encode(bytes)
}

fn hash_cancel_token(state: &AppState, email: &str, token: &str, expires_at: i64) -> String {
    type HmacSha256 = Hmac<Sha256>;

    let payload = format!("account-deletion-cancel:{email}:{token}:{expires_at}");
    let mut mac = HmacSha256::new_from_slice(state.admin_key.as_bytes()).expect("HMAC key");
    mac.update(payload.as_bytes());
    hex::encode(mac.finalize().into_bytes())
}

/// Issues a one-time cancellation link, valid for the same 30-day window as
/// the grace period itself, and emails it. Best-effort: a failure here
/// doesn't undo the deletion that was already recorded — logging back in
/// within the window still cancels it regardless of this email.
async fn send_deletion_cancel_link(state: &AppState, email: &str) {
    let now = unix_now();
    let expires_at = now + DELETION_CANCEL_TOKEN_TTL_SECONDS;
    let token = generate_cancel_token();
    let token_hash = hash_cancel_token(state, email, &token, expires_at);

    let stored = crate::db::pool::get_connection(&state.db_pool).ok().and_then(|db| {
        db.execute(
            "INSERT INTO email_login_codes (
                email, code_hash, expires_at, attempts, consumed_at, created_at, purpose
             ) VALUES (?1, ?2, ?3, 0, 0, ?4, 'account_deletion_cancel')",
            rusqlite::params![email, &token_hash, expires_at, now],
        )
        .ok()
    });

    if stored.is_none() {
        return;
    }

    let cancel_url = format!(
        "https://grabitmap.com/account/delete/cancel?email={}&token={}",
        urlencoding::encode(email),
        token
    );

    let _ = send_transactional_email(
        email,
        "Удаление аккаунта GRABIT запланировано",
        format!(
            "<p>Аккаунт скрыт и будет удалён безвозвратно через 30 дней.</p>\
             <p>Чтобы отменить: войдите в аккаунт как обычно, либо перейдите по ссылке ниже \
             (действует 30 дней, можно использовать один раз):</p>\
             <p><a href=\"{cancel_url}\">Отменить удаление</a></p>\
             <p>Если вы не запрашивали удаление — срочно смените пароль.</p>"
        ),
    )
    .await;
}

fn deletion_scheduled_response(document_title: &str, purge_at: i64) -> String {
    let until = crate::account_deletion::format_until(purge_at);
    templates::status_page(
        document_title,
        "GRABIT",
        "Аккаунт скрыт",
        &format!(
            "Данные будут удалены безвозвратно {until}. Чтобы отменить — просто войдите \
             в аккаунт снова до этой даты.",
        ),
        r#"<a class="ui-button" href="/login">Войти обратно</a>"#,
    )
}

#[derive(Debug, Deserialize)]
pub struct AccountDeleteForm {
    pub password: String,
}

/// Authenticated flow: a logged-in owner deletes their own account after
/// re-entering their password. Every session (including this one) is
/// revoked immediately by `request_deletion`.
pub async fn account_delete_request(
    State(state): State<AppState>,
    headers: HeaderMap,
    Form(form): Form<AccountDeleteForm>,
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

    if let Some(_retry_after) = rate_limit_retry_after(
        &state,
        authenticated.user_id,
        "account_delete_request",
        5,
        3_600,
    )
    .await
    {
        return Html(templates::status_page(
            "Удаление аккаунта · GRABIT",
            "⚠ GRABIT",
            "Слишком много попыток",
            "Подождите немного и повторите попытку.",
            r#"<a class="ui-button" href="/app/me">Назад в профиль</a>"#,
        ))
        .into_response();
    }

    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return (StatusCode::SERVICE_UNAVAILABLE, "Сервис недоступен").into_response();
        }
    };

    let password_hash: Option<String> = db
        .query_row(
            "SELECT password_hash
             FROM auth_identities
             WHERE user_id = ?1
               AND provider = 'email'
             LIMIT 1",
            rusqlite::params![authenticated.user_id],
            |row| row.get(0),
        )
        .ok();

    let password_hash = password_hash.unwrap_or_default();

    if !verify_password(form.password.trim(), &password_hash) {
        return Html(templates::status_page(
            "Удаление аккаунта · GRABIT",
            "⚠ GRABIT",
            "Неверный пароль",
            "Введите текущий пароль, чтобы подтвердить удаление аккаунта.",
            r#"<a class="ui-button" href="/app/me">Назад в профиль</a>"#,
        ))
        .into_response();
    }

    drop(db);

    let mut db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return (StatusCode::SERVICE_UNAVAILABLE, "Сервис недоступен").into_response();
        }
    };

    let purge_at =
        match crate::account_deletion::request_deletion(&mut db, authenticated.user_id, unix_now())
        {
            Ok(purge_at) => purge_at,
            Err(_) => {
                return Html(templates::status_page(
                    "Удаление аккаунта · GRABIT",
                    "⚠ GRABIT",
                    "Не удалось удалить аккаунт",
                    "Попробуйте ещё раз позже.",
                    r#"<a class="ui-button" href="/app/me">Назад в профиль</a>"#,
                ))
                .into_response();
            }
        };

    let owner_email: Option<String> = db
        .query_row(
            "SELECT email FROM auth_identities WHERE user_id = ?1 AND provider = 'email' LIMIT 1",
            rusqlite::params![authenticated.user_id],
            |row| row.get(0),
        )
        .ok();

    if let Some(owner_email) = owner_email {
        send_deletion_cancel_link(&state, &owner_email).await;
    }

    let mut response = Html(deletion_scheduled_response(
        "Аккаунт удаляется · GRABIT",
        purge_at,
    ))
    .into_response();

    // The session was just revoked server-side; also drop the cookie so
    // the browser stops sending a dead token.
    let cookie = format!(
        "resursmap_user=; Path=/; {}; Max-Age=0",
        cookie_security_flags()
    );

    if let Ok(value) = HeaderValue::from_str(&cookie) {
        response.headers_mut().append(header::SET_COOKIE, value);
    }

    response
}

pub async fn public_account_delete_page() -> Html<String> {
    let body_html = r##"
        <div class="rm-auth-warn">
            <strong>Необратимо</strong>
            Аккаунт будет скрыт сразу и удалён навсегда через 30 дней.
        </div>

        <div class="rm-auth-field">
            <label class="rm-auth-label" for="email-input">Почта</label>
            <input id="email-input" class="rm-auth-input" type="email" inputmode="email" autocomplete="email" maxlength="254" placeholder="pochta@mail.ru">
            <span id="email-error" class="rm-auth-field-error"></span>
        </div>

        <button id="request-button" type="button" class="rm-auth-button rm-auth-button--compact">
            <span class="rm-auth-spinner" aria-hidden="true"></span>
            <span class="rm-auth-button-label">Отправить</span>
        </button>

        <div id="confirm-section" hidden class="rm-auth-step">
            <div class="rm-auth-field">
                <label class="rm-auth-label" for="code-input">Код из письма</label>
                <input id="code-input" class="rm-auth-input rm-auth-input--code" type="text" inputmode="numeric" maxlength="6" placeholder="000000">
                <span id="code-error" class="rm-auth-field-error"></span>
            </div>

            <div id="step-two" hidden>
                <p class="rm-auth-subtitle">Будет удалено безвозвратно:</p>
                <ul class="rm-auth-delete-list">
                    <li>Профиль и фото</li>
                    <li>Объявления</li>
                    <li>Переписка</li>
                </ul>

                <div class="rm-auth-field">
                    <label class="rm-auth-label" for="confirm-word-input">Введите «УДАЛИТЬ», чтобы подтвердить</label>
                    <input id="confirm-word-input" class="rm-auth-input" type="text" autocomplete="off" placeholder="УДАЛИТЬ">
                </div>
            </div>

            <button id="confirm-button" type="button" class="rm-auth-button rm-auth-button--compact rm-auth-button--danger" disabled>
                <span class="rm-auth-spinner" aria-hidden="true"></span>
                <span class="rm-auth-button-label">Удалить аккаунт</span>
            </button>
        </div>
"##;

    let footer_html =
        super::auth_email::auth_footer_nav("/app", super::auth_email::email_delivery_configured());

    let body_after = r##"
<script>
(function () {
    const emailInput = document.getElementById("email-input");
    const emailError = document.getElementById("email-error");
    const codeInput = document.getElementById("code-input");
    const codeError = document.getElementById("code-error");
    const confirmSection = document.getElementById("confirm-section");
    const stepTwo = document.getElementById("step-two");
    const confirmWordInput = document.getElementById("confirm-word-input");
    const requestButton = document.getElementById("request-button");
    const confirmButton = document.getElementById("confirm-button");
    const authStatus = document.getElementById("auth-status");

    function setStatus(message, kind) {
        authStatus.textContent = message || "";
        authStatus.className = "rm-auth-status" + (kind ? " is-" + kind : "");
    }

    function setLoading(button, loading) {
        button.disabled = loading;
        button.dataset.loading = loading ? "true" : "false";
    }

    function deletionError(error) {
        const messages = {
            invalid_email: "Проверьте правильность почты.",
            invalid_code: "Введите шестизначный код.",
            code_store_failed: "Не удалось сохранить код. Попробуйте ещё раз.",
            code_not_found: "Сначала запросите код.",
            code_used: "Этот код уже использован.",
            code_expired: "Код истёк. Запросите новый.",
            wrong_code: "Код неверный.",
            too_many_attempts: "Слишком много попыток. Запросите код заново.",
            rate_limited: "Слишком много попыток. Попробуйте позже.",
            mail_unavailable: "Почта не настроена. Обратитесь к администратору.",
            database_unavailable: "Сервис временно недоступен."
        };
        return messages[error] || "Не удалось выполнить запрос.";
    }

    const CODE_FIELD_ERRORS = new Set([
        "invalid_code", "code_not_found", "code_used", "code_expired",
        "wrong_code", "too_many_attempts"
    ]);

    function showError(error) {
        const message = deletionError(error);
        emailError.textContent = "";
        codeError.textContent = "";

        if (error === "invalid_email") {
            emailError.textContent = message;
        } else if (CODE_FIELD_ERRORS.has(error)) {
            codeError.textContent = message;
        } else {
            setStatus(message, "error");
        }
    }

    function updateConfirmButton() {
        const codeReady = codeInput.value.trim().length === 6;
        stepTwo.hidden = !codeReady;

        const wordMatches = confirmWordInput.value.trim().toUpperCase() === "УДАЛИТЬ";
        confirmButton.disabled = !(codeReady && wordMatches);
    }

    async function requestCode() {
        const email = emailInput.value.trim();
        emailError.textContent = "";
        setStatus("", null);

        if (!email) {
            emailError.textContent = "Введите почту.";
            emailInput.focus();
            return;
        }

        setLoading(requestButton, true);

        try {
            const response = await fetch("/account/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await response.json().catch(function () { return {}; });

            if (!response.ok || !data.ok) {
                showError(data.error);
                return;
            }

            confirmSection.hidden = false;
            setStatus("Если аккаунт с такой почтой существует, код отправлен.", "success");
            codeInput.focus();
        } catch (error) {
            setStatus("Нет соединения. Проверьте интернет и попробуйте снова.", "error");
        } finally {
            setLoading(requestButton, false);
        }
    }

    async function confirmDeletion() {
        const email = emailInput.value.trim();
        const code = codeInput.value.trim();

        if (!code || code.length !== 6) {
            codeError.textContent = "Введите шестизначный код.";
            codeInput.focus();
            return;
        }

        codeError.textContent = "";
        setStatus("", null);
        setLoading(confirmButton, true);

        try {
            const response = await fetch("/account/delete/confirm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code })
            });
            const data = await response.json().catch(function () { return {}; });

            if (!response.ok || !data.ok) {
                showError(data.error);
                updateConfirmButton();
                return;
            }

            document.querySelector(".rm-auth-card").innerHTML =
                '<h1 class="rm-auth-title">Аккаунт скрыт</h1>' +
                '<p class="rm-auth-subtitle">Данные будут удалены безвозвратно через 30 дней. ' +
                'Войдите в аккаунт в течение этого времени или перейдите по ссылке из письма, ' +
                'чтобы отменить удаление.</p>' +
                '<a class="rm-auth-button" href="/login"><span class="rm-auth-button-label">Вход</span></a>';
        } catch (error) {
            setStatus("Нет соединения. Проверьте интернет и попробуйте снова.", "error");
            confirmButton.disabled = false;
        } finally {
            confirmButton.dataset.loading = "false";
        }
    }

    requestButton.addEventListener("click", requestCode);
    confirmButton.addEventListener("click", confirmDeletion);
    codeInput.addEventListener("input", function () {
        codeInput.value = codeInput.value.replace(/[^0-9]/g, "").slice(0, 6);
        updateConfirmButton();
    });
    confirmWordInput.addEventListener("input", updateConfirmButton);
})();
</script>
"##;

    Html(templates::render_auth_page(templates::AuthPageParams {
        document_title: "Удаление аккаунта · GRABIT",
        heading: "Удалить аккаунт",
        subtitle: "Без входа: код на почту.",
        body_html,
        footer_html: &footer_html,
        script_html: body_after,
        back_link: false,
    }))
}

#[derive(Debug, Deserialize)]
pub struct PublicAccountDeleteRequest {
    pub email: String,
}

pub async fn public_account_delete_request(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(payload): Json<PublicAccountDeleteRequest>,
) -> Response {
    if request_is_cross_site(&headers) {
        return csrf_rejected_response();
    }

    let Some(email) = normalize_email(&payload.email) else {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({ "ok": false, "error": "invalid_email" })),
        )
            .into_response();
    };

    let rate_id = email_rate_limit_id(&state, &email);
    let ip_rate_id = ip_rate_limit_id(&state, &headers);

    if rate_limit_retry_after(&state, ip_rate_id, "account_deletion_public_request_ip", 20, 3_600)
        .await
        .is_some()
    {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            Json(json!({ "ok": false, "error": "rate_limited" })),
        )
            .into_response();
    }

    if let Some(retry_after) =
        rate_limit_retry_after(&state, rate_id, "account_deletion_public_request", 5, 3_600).await
    {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            Json(json!({ "ok": false, "error": "rate_limited", "retry_after": retry_after })),
        )
            .into_response();
    }

    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(json!({ "ok": false, "error": "database_unavailable" })),
            )
                .into_response();
        }
    };

    // Same shape regardless of whether the account exists — avoids leaking
    // which emails are registered.
    let account_exists: bool = db
        .query_row(
            "SELECT 1 FROM auth_identities WHERE provider = 'email' AND email = ?1 LIMIT 1",
            rusqlite::params![&email],
            |_| Ok(()),
        )
        .is_ok();

    if account_exists {
        let code = generate_deletion_code();
        let expires_at = unix_now() + DELETION_CODE_TTL_SECONDS;
        let code_hash = hash_deletion_code(&state, &email, &code, expires_at);

        let _ = db.execute(
            "UPDATE email_login_codes
             SET consumed_at = ?2
             WHERE email = ?1
               AND purpose = 'account_deletion'
               AND consumed_at = 0",
            rusqlite::params![&email, unix_now()],
        );

        if db
            .execute(
                "INSERT INTO email_login_codes (
                    email, code_hash, expires_at, attempts, consumed_at, created_at, purpose
                 ) VALUES (?1, ?2, ?3, 0, 0, ?4, 'account_deletion')",
                rusqlite::params![&email, &code_hash, expires_at, unix_now()],
            )
            .is_err()
        {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "ok": false, "error": "code_store_failed" })),
            )
                .into_response();
        }

        if send_deletion_code_email(&email, &code).await.is_err() {
            let _ = db.execute(
                "UPDATE email_login_codes
                 SET consumed_at = ?2
                 WHERE email = ?1
                   AND purpose = 'account_deletion'
                   AND consumed_at = 0",
                rusqlite::params![&email, unix_now()],
            );

            return (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(json!({ "ok": false, "error": "mail_unavailable" })),
            )
                .into_response();
        }
    }

    (
        StatusCode::OK,
        Json(json!({ "ok": true, "expires_in": DELETION_CODE_TTL_SECONDS })),
    )
        .into_response()
}

#[derive(Debug, Deserialize)]
pub struct PublicAccountDeleteConfirm {
    pub email: String,
    pub code: String,
}

pub async fn public_account_delete_confirm(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(payload): Json<PublicAccountDeleteConfirm>,
) -> Response {
    if request_is_cross_site(&headers) {
        return csrf_rejected_response();
    }

    let Some(email) = normalize_email(&payload.email) else {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({ "ok": false, "error": "invalid_email" })),
        )
            .into_response();
    };

    let code = payload.code.trim();

    if code.len() != 6 || !code.bytes().all(|byte| byte.is_ascii_digit()) {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({ "ok": false, "error": "invalid_code" })),
        )
            .into_response();
    }

    let rate_id = email_rate_limit_id(&state, &email);

    if let Some(retry_after) =
        rate_limit_retry_after(&state, rate_id, "account_deletion_public_confirm", 15, 600).await
    {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            Json(json!({ "ok": false, "error": "rate_limited", "retry_after": retry_after })),
        )
            .into_response();
    }

    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(json!({ "ok": false, "error": "database_unavailable" })),
            )
                .into_response();
        }
    };

    let row: Option<(i64, String, i64, i64, i64)> = db
        .query_row(
            "SELECT id, code_hash, expires_at, attempts, consumed_at
             FROM email_login_codes
             WHERE email = ?1
               AND purpose = 'account_deletion'
             ORDER BY id DESC
             LIMIT 1",
            rusqlite::params![&email],
            |row| {
                Ok((
                    row.get(0)?,
                    row.get(1)?,
                    row.get(2)?,
                    row.get(3)?,
                    row.get(4)?,
                ))
            },
        )
        .ok();

    let (code_id, expected_hash, expires_at, attempts, consumed_at) = match row {
        Some(row) => row,
        None => {
            return (
                StatusCode::UNAUTHORIZED,
                Json(json!({ "ok": false, "error": "code_not_found" })),
            )
                .into_response();
        }
    };

    if consumed_at != 0 {
        return (
            StatusCode::UNAUTHORIZED,
            Json(json!({ "ok": false, "error": "code_used" })),
        )
            .into_response();
    }

    if expires_at < unix_now() {
        return (
            StatusCode::UNAUTHORIZED,
            Json(json!({ "ok": false, "error": "code_expired" })),
        )
            .into_response();
    }

    if attempts >= DELETION_CODE_MAX_ATTEMPTS {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            Json(json!({ "ok": false, "error": "too_many_attempts" })),
        )
            .into_response();
    }

    if !constant_time_eq(&hash_deletion_code(&state, &email, code, expires_at), &expected_hash) {
        let _ = db.execute(
            "UPDATE email_login_codes SET attempts = attempts + 1 WHERE id = ?1",
            rusqlite::params![code_id],
        );

        return (
            StatusCode::UNAUTHORIZED,
            Json(json!({ "ok": false, "error": "wrong_code" })),
        )
            .into_response();
    }

    let user_id: Option<i64> = db
        .query_row(
            "SELECT user_id FROM auth_identities WHERE provider = 'email' AND email = ?1 LIMIT 1",
            rusqlite::params![&email],
            |row| row.get(0),
        )
        .ok();

    let Some(user_id) = user_id else {
        return (
            StatusCode::UNAUTHORIZED,
            Json(json!({ "ok": false, "error": "code_not_found" })),
        )
            .into_response();
    };

    let _ = db.execute(
        "UPDATE email_login_codes SET consumed_at = ?2 WHERE id = ?1",
        rusqlite::params![code_id, unix_now()],
    );

    drop(db);

    let mut db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(json!({ "ok": false, "error": "database_unavailable" })),
            )
                .into_response();
        }
    };

    match crate::account_deletion::request_deletion(&mut db, user_id, unix_now()) {
        Ok(purge_at) => {
            send_deletion_cancel_link(&state, &email).await;

            (
                StatusCode::OK,
                Json(json!({ "ok": true, "purge_at": purge_at })),
            )
                .into_response()
        }
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "ok": false, "error": "deletion_request_failed" })),
        )
            .into_response(),
    }
}

#[derive(Debug, Deserialize)]
pub struct CancelDeletionQuery {
    pub email: String,
    pub token: String,
}

fn cancel_link_failed_page() -> Response {
    Html(templates::status_page(
        "Отмена удаления · GRABIT",
        "⚠ GRABIT",
        "Ссылка недействительна",
        "Она уже использована, устарела или скопирована не полностью. Можно отменить удаление, просто войдя в аккаунт.",
        r#"<a class="ui-button" href="/login">Войти</a>"#,
    ))
    .into_response()
}

/// One-time link from the deletion-scheduled email. Second way to cancel a
/// pending deletion besides logging back in.
pub async fn account_delete_cancel(
    State(state): State<AppState>,
    Query(query): Query<CancelDeletionQuery>,
) -> Response {
    let Some(email) = normalize_email(&query.email) else {
        return cancel_link_failed_page();
    };

    let token = query.token.trim();

    if token.is_empty() {
        return cancel_link_failed_page();
    }

    let mut db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return (StatusCode::SERVICE_UNAVAILABLE, "Сервис недоступен").into_response(),
    };

    let row: Option<(i64, String, i64, i64)> = db
        .query_row(
            "SELECT id, code_hash, expires_at, consumed_at
             FROM email_login_codes
             WHERE email = ?1
               AND purpose = 'account_deletion_cancel'
             ORDER BY id DESC
             LIMIT 1",
            rusqlite::params![&email],
            |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?)),
        )
        .ok();

    let Some((token_id, expected_hash, expires_at, consumed_at)) = row else {
        return cancel_link_failed_page();
    };

    if consumed_at != 0 || expires_at < unix_now() {
        return cancel_link_failed_page();
    }

    let computed_hash = hash_cancel_token(&state, &email, token, expires_at);

    if !constant_time_eq(&computed_hash, &expected_hash) {
        return cancel_link_failed_page();
    }

    let user_id: Option<i64> = db
        .query_row(
            "SELECT user_id FROM auth_identities WHERE provider = 'email' AND email = ?1 LIMIT 1",
            rusqlite::params![&email],
            |row| row.get(0),
        )
        .ok();

    let Some(user_id) = user_id else {
        return cancel_link_failed_page();
    };

    let _ = db.execute(
        "UPDATE email_login_codes SET consumed_at = ?2 WHERE id = ?1",
        rusqlite::params![token_id, unix_now()],
    );

    match crate::account_deletion::restore_if_pending(&mut db, user_id) {
        Ok(true) => Html(templates::status_page(
            "Удаление отменено · GRABIT",
            "GRABIT",
            "Удаление отменено",
            "Аккаунт восстановлен. Можно войти как обычно.",
            r#"<a class="ui-button" href="/login">Войти</a>"#,
        ))
        .into_response(),
        _ => cancel_link_failed_page(),
    }
}
