use super::auth::{
    append_user_session_cookie, auth_redirect_target, create_user_session, email_rate_limit_id,
    ensure_profile_public_id, normalize_email, EMAIL_USER_ID_BASE,
};
use super::common::{
    csrf_rejected_response, rate_limit_retry_after, request_is_cross_site, unix_now,
};
use crate::state::app_state::AppState;
use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
use axum::{
    extract::{Query, State},
    http::{HeaderMap, StatusCode},
    response::{Html, IntoResponse, Response},
    Json,
};
use serde::Deserialize;
use serde_json::json;

#[derive(Debug, Deserialize)]
pub struct EmailPasswordRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct EmailRegisterRequest {
    pub email: String,
    pub password: String,
    #[serde(default)]
    pub password_confirm: String,
    /// Must be explicitly `true` — the checkbox is enforced server-side too,
    /// not just via the disabled submit button.
    #[serde(default)]
    pub consent: bool,
}

#[derive(Debug, Deserialize)]
pub struct AuthNextQuery {
    pub next: Option<String>,
    pub email: Option<String>,
    pub resend: Option<String>,
}

pub(super) fn auth_related_href(base: &str, redirect_target: &str) -> String {
    if redirect_target == "/app" {
        base.to_string()
    } else {
        format!("{base}?next={}", urlencoding::encode(redirect_target))
    }
}

/// Shared footer nav for the auth screen family (login/register/forgot
/// password/account deletion) — same set of links on all four, per design.
pub(super) fn auth_footer_nav(redirect_target: &str, mail_ready: bool) -> String {
    let login_href = auth_related_href("/login", redirect_target);
    let register_href = auth_related_href("/register", redirect_target);
    let delete_href = auth_related_href("/account/delete", redirect_target);

    let forgot_link = if mail_ready {
        format!(
            r#"<a href="{href}">Забыли пароль?</a>"#,
            href = auth_related_href("/login/forgot", redirect_target),
        )
    } else {
        String::new()
    };

    format!(
        r##"<nav class="rm-auth-footer">
            <a href="{login_href}">Вход</a>
            <a href="{register_href}">Регистрация</a>
            {forgot_link}
            <a href="{delete_href}">Удалить аккаунт</a>
            <a href="/app">&larr; Города</a>
        </nav>"##,
    )
}

pub(super) fn validate_password(password: &str) -> Result<(), &'static str> {
    let password = password.trim();

    if password.len() < 8 {
        return Err("password_too_short");
    }

    if password.len() > 128 {
        return Err("password_too_long");
    }

    Ok(())
}

/// Registration-only: on top of the length check every password reset also
/// enforces, new accounts must mix letters and digits. Scoped to signup so
/// it doesn't change behavior for existing password-reset/change flows.
fn validate_new_account_password(password: &str) -> Result<(), &'static str> {
    validate_password(password)?;

    let password = password.trim();
    let has_letter = password.chars().any(|c| c.is_alphabetic());
    let has_digit = password.chars().any(|c| c.is_ascii_digit());

    if !has_letter || !has_digit {
        return Err("password_too_weak");
    }

    Ok(())
}

pub(super) fn hash_password(password: &str) -> Result<String, &'static str> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();

    argon2
        .hash_password(password.as_bytes(), &salt)
        .map(|hash| hash.to_string())
        .map_err(|_| "password_hash_failed")
}

pub(super) fn verify_password(password: &str, password_hash: &str) -> bool {
    if password_hash.is_empty() {
        return false;
    }

    let parsed = match PasswordHash::new(password_hash) {
        Ok(parsed) => parsed,
        Err(_) => return false,
    };

    Argon2::default()
        .verify_password(password.as_bytes(), &parsed)
        .is_ok()
}

fn username_from_email(email: &str) -> String {
    let local = email.split('@').next().unwrap_or("").trim();
    let cleaned: String = local
        .chars()
        .filter(|ch| ch.is_ascii_alphanumeric() || *ch == '_' || *ch == '.' || *ch == '-')
        .take(32)
        .collect();
    if cleaned.is_empty() {
        "user".to_string()
    } else {
        cleaned
    }
}

fn allocate_email_user_id(transaction: &rusqlite::Transaction<'_>) -> i64 {
    transaction
        .query_row(
            "SELECT COALESCE(MAX(id), ?1 - 1) + 1
             FROM users
             WHERE id >= ?1",
            rusqlite::params![EMAIL_USER_ID_BASE],
            |row| row.get(0),
        )
        .unwrap_or(EMAIL_USER_ID_BASE)
}

pub(crate) fn email_delivery_configured() -> bool {
    std::env::var("RESEND_API_KEY")
        .ok()
        .map(|value| !value.trim().is_empty())
        .unwrap_or(false)
}

/// Bumped whenever the terms/privacy documents change in a way that needs
/// re-consent; recorded on each account alongside when they accepted.
pub(super) const CURRENT_CONSENT_VERSION: &str = "2026-09-18";

fn provision_email_account(
    transaction: &rusqlite::Transaction<'_>,
    email: &str,
    password_hash: &str,
    verified_at: i64,
) -> Result<i64, &'static str> {
    let existing_user_id: Option<i64> = transaction
        .query_row(
            "SELECT user_id
             FROM auth_identities
             WHERE provider = 'email'
               AND email = ?1
             LIMIT 1",
            rusqlite::params![email],
            |row| row.get(0),
        )
        .ok();

    if let Some(existing_user_id) = existing_user_id {
        let pending_deletion: bool = transaction
            .query_row(
                "SELECT deletion_requested_at <> 0 AND deleted_at = 0
                 FROM users
                 WHERE id = ?1",
                rusqlite::params![existing_user_id],
                |row| row.get(0),
            )
            .unwrap_or(false);

        return Err(if pending_deletion {
            "pending_deletion"
        } else {
            "email_already_registered"
        });
    }

    let now = unix_now();
    let next_id = allocate_email_user_id(transaction);

    transaction
        .execute(
            "INSERT INTO users (
                id,
                created_at,
                updated_at,
                is_active,
                telegram_id
             )
             VALUES (?1, ?2, ?2, 1, NULL)",
            rusqlite::params![next_id, now],
        )
        .map_err(|_| "user_create_failed")?;

    transaction
        .execute(
            "INSERT INTO auth_identities (
                user_id,
                provider,
                provider_subject,
                email,
                password_hash,
                verified_at,
                consent_accepted_at,
                consent_version,
                created_at,
                updated_at
             )
             VALUES (
                ?1,
                'email',
                ?2,
                ?2,
                ?3,
                ?4,
                ?5,
                ?6,
                ?5,
                ?5
             )",
            rusqlite::params![
                next_id,
                email,
                password_hash,
                verified_at,
                now,
                CURRENT_CONSENT_VERSION
            ],
        )
        .map_err(|_| "identity_create_failed")?;

    let client_id = format!("user:{next_id}");
    let username = username_from_email(email);

    transaction
        .execute(
            "INSERT OR IGNORE INTO profiles (
                client_id,
                user_id,
                public_id,
                username,
                updated_at
             )
             VALUES (
                ?1,
                ?2,
                lower(hex(randomblob(16))),
                ?3,
                ?4
             )",
            rusqlite::params![&client_id, next_id, username, now],
        )
        .map_err(|_| "profile_create_failed")?;

    ensure_profile_public_id(transaction, next_id)?;

    Ok(next_id)
}

pub(super) fn email_password_auth_response(
    state: &AppState,
    user_id: i64,
    headers: &HeaderMap,
) -> Response {
    // A pending account deletion is cancelled by the very next successful
    // login — this is the only path back, since the deletion request
    // itself revokes all sessions. Must run before `create_user_session`:
    // that session would otherwise be dead on arrival, because
    // `verify_user_session` requires `users.is_active = 1`.
    if let Ok(mut db) = crate::db::pool::get_connection(&state.db_pool) {
        let _ = crate::account_deletion::restore_if_pending(&mut db, user_id);
    }

    let session = match create_user_session(state, user_id, headers) {
        Ok(session) => session,
        Err(error) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({
                    "ok": false,
                    "error": error
                })),
            )
                .into_response();
        }
    };

    let mut response = (
        StatusCode::OK,
        Json(json!({
            "ok": true
        })),
    )
        .into_response();

    append_user_session_cookie(&mut response, &session);

    response
}

pub async fn register_email(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(payload): Json<EmailRegisterRequest>,
) -> Response {
    if request_is_cross_site(&headers) {
        return csrf_rejected_response();
    }

    let email = match normalize_email(&payload.email) {
        Some(email) => email,
        None => {
            return (
                StatusCode::BAD_REQUEST,
                Json(json!({
                    "ok": false,
                    "error": "invalid_email"
                })),
            )
                .into_response();
        }
    };

    if let Err(error) = validate_new_account_password(&payload.password) {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({
                "ok": false,
                "error": error
            })),
        )
            .into_response();
    }

    if payload.password.trim() != payload.password_confirm.trim() {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({
                "ok": false,
                "error": "password_mismatch"
            })),
        )
            .into_response();
    }

    if !payload.consent {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({
                "ok": false,
                "error": "consent_required"
            })),
        )
            .into_response();
    }

    let rate_id = email_rate_limit_id(&state, &email);

    if let Some(retry_after) =
        rate_limit_retry_after(&state, rate_id, "email_register", 8, 600).await
    {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            Json(json!({
                "ok": false,
                "error": "rate_limited",
                "retry_after": retry_after
            })),
        )
            .into_response();
    }

    let password_hash = match hash_password(payload.password.trim()) {
        Ok(password_hash) => password_hash,
        Err(error) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({
                    "ok": false,
                    "error": error
                })),
            )
                .into_response();
        }
    };

    let mut db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(json!({
                    "ok": false,
                    "error": "database_unavailable"
                })),
            )
                .into_response();
        }
    };

    let transaction = match db.transaction() {
        Ok(transaction) => transaction,
        Err(_) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({
                    "ok": false,
                    "error": "transaction_failed"
                })),
            )
                .into_response();
        }
    };

    let verification_required = email_delivery_configured();
    let verified_at = if verification_required { 0 } else { unix_now() };

    let user_id = match provision_email_account(&transaction, &email, &password_hash, verified_at) {
        Ok(user_id) => user_id,
        Err(error) => {
            let status = if error == "email_already_registered" || error == "pending_deletion" {
                StatusCode::CONFLICT
            } else {
                StatusCode::INTERNAL_SERVER_ERROR
            };

            return (
                status,
                Json(json!({
                    "ok": false,
                    "error": error
                })),
            )
                .into_response();
        }
    };

    if transaction.commit().is_err() {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({
                "ok": false,
                "error": "commit_failed"
            })),
        )
            .into_response();
    }

    drop(db);

    if verification_required {
        return (
            StatusCode::OK,
            Json(json!({
                "ok": true,
                "verification_required": true
            })),
        )
            .into_response();
    }

    email_password_auth_response(&state, user_id, &headers)
}

pub async fn login_email(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(payload): Json<EmailPasswordRequest>,
) -> Response {
    if request_is_cross_site(&headers) {
        return csrf_rejected_response();
    }

    let email = match normalize_email(&payload.email) {
        Some(email) => email,
        None => {
            return (
                StatusCode::BAD_REQUEST,
                Json(json!({
                    "ok": false,
                    "error": "invalid_email"
                })),
            )
                .into_response();
        }
    };

    if payload.password.trim().is_empty() {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({
                "ok": false,
                "error": "invalid_password"
            })),
        )
            .into_response();
    }

    let rate_id = email_rate_limit_id(&state, &email);

    if let Some(retry_after) = rate_limit_retry_after(&state, rate_id, "email_login", 20, 600).await
    {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            Json(json!({
                "ok": false,
                "error": "rate_limited",
                "retry_after": retry_after
            })),
        )
            .into_response();
    }

    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(json!({
                    "ok": false,
                    "error": "database_unavailable"
                })),
            )
                .into_response();
        }
    };

    let row: Option<(i64, String, i64)> = db
        .query_row(
            "SELECT user_id, password_hash, verified_at
             FROM auth_identities
             WHERE provider = 'email'
               AND email = ?1
             LIMIT 1",
            rusqlite::params![&email],
            |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?)),
        )
        .ok();

    let (user_id, password_hash, verified_at) = match row {
        Some(row) => row,
        None => {
            return (
                StatusCode::UNAUTHORIZED,
                Json(json!({
                    "ok": false,
                    "error": "invalid_credentials"
                })),
            )
                .into_response();
        }
    };

    if verified_at <= 0 && email_delivery_configured() {
        return (
            StatusCode::FORBIDDEN,
            Json(json!({
                "ok": false,
                "error": "verification_required"
            })),
        )
            .into_response();
    }

    if !verify_password(payload.password.trim(), &password_hash) {
        let error = if password_hash.is_empty() {
            "password_not_set"
        } else {
            "invalid_credentials"
        };

        return (
            StatusCode::UNAUTHORIZED,
            Json(json!({
                "ok": false,
                "error": error
            })),
        )
            .into_response();
    }

    email_password_auth_response(&state, user_id, &headers)
}

pub async fn login_page(Query(query): Query<AuthNextQuery>) -> Html<String> {
    let redirect_target = auth_redirect_target(query.next.as_deref());
    let mail_ready = email_delivery_configured();

    let body_html = r##"
        <div class="rm-auth-field">
            <label class="rm-auth-label" for="email-input">Почта</label>
            <input id="email-input" class="rm-auth-input" type="email" inputmode="email" autocomplete="email" maxlength="254" placeholder="pochta@mail.ru">
            <span id="email-error" class="rm-auth-field-error"></span>
        </div>

        <div class="rm-auth-field">
            <label class="rm-auth-label" for="password-input">Пароль</label>
            <div class="rm-auth-password-row">
                <input id="password-input" class="rm-auth-input" type="password" autocomplete="current-password" maxlength="128" placeholder="********">
                <button id="password-toggle" type="button" class="rm-auth-password-toggle" aria-label="Показать пароль" aria-pressed="false">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                        <circle cx="12" cy="12" r="3"/>
                        <line class="slash" x1="3" y1="3" x2="21" y2="21"/>
                    </svg>
                </button>
            </div>
            <span id="password-error" class="rm-auth-field-error"></span>
        </div>

        <button id="login-button" type="button" class="rm-auth-button">
            <span class="rm-auth-spinner" aria-hidden="true"></span>
            <span class="rm-auth-button-label">Войти</span>
        </button>
"##;

    let footer_html = super::auth_email::auth_footer_nav(&redirect_target, mail_ready);

    let body_after = format!(
        r##"
<script>
(function () {{
    const redirectTarget = {redirect_target_json};
    const emailInput = document.getElementById("email-input");
    const emailError = document.getElementById("email-error");
    const passwordInput = document.getElementById("password-input");
    const passwordError = document.getElementById("password-error");
    const passwordToggle = document.getElementById("password-toggle");
    const loginButton = document.getElementById("login-button");
    const authStatus = document.getElementById("auth-status");

    function setStatus(message, kind) {{
        authStatus.textContent = message || "";
        authStatus.className = "rm-auth-status" + (kind ? " is-" + kind : "");
    }}

    function setLoading(button, loading) {{
        button.disabled = loading;
        button.dataset.loading = loading ? "true" : "false";
    }}

    function errorMessage(error) {{
        const messages = {{
            invalid_email: "Проверьте правильность почты.",
            invalid_password: "Введите пароль.",
            invalid_credentials: "Неверная почта или пароль.",
            password_not_set: "Для этой почты пароль ещё не задан.",
            verification_required: "Сначала подтвердите почту кодом из письма. Если письма нет — запросите код ещё раз.",
            rate_limited: "Слишком много попыток. Попробуйте позже.",
            database_unavailable: "Сервис временно недоступен."
        }};
        return messages[error] || "Не удалось выполнить вход.";
    }}

    function showError(error) {{
        const message = errorMessage(error);
        if (error === "invalid_email") {{
            emailError.textContent = message;
        }} else if (error === "invalid_password" || error === "password_not_set") {{
            passwordError.textContent = message;
        }} else {{
            setStatus(message, "error");
        }}
    }}

    async function login() {{
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        emailError.textContent = "";
        passwordError.textContent = "";
        setStatus("", null);

        if (!email) {{
            emailError.textContent = "Введите почту.";
            emailInput.focus();
            return;
        }}

        if (!password) {{
            passwordError.textContent = "Введите пароль.";
            passwordInput.focus();
            return;
        }}

        setLoading(loginButton, true);

        try {{
            const response = await fetch("/auth/login-email", {{
                method: "POST",
                headers: {{ "Content-Type": "application/json" }},
                body: JSON.stringify({{ email, password }})
            }});

            const data = await response.json().catch(function () {{
                return {{ ok: false, error: "invalid_response" }};
            }});

            if (!response.ok || !data.ok) {{
                showError(data.error);
                return;
            }}

            setStatus("Вход выполнен", "success");
            window.location.replace(redirectTarget);
        }} catch (_) {{
            setStatus("Нет соединения. Проверьте интернет и попробуйте снова.", "error");
        }} finally {{
            setLoading(loginButton, false);
        }}
    }}

    passwordToggle.addEventListener("click", function () {{
        const showing = passwordInput.type === "text";
        passwordInput.type = showing ? "password" : "text";
        passwordToggle.setAttribute("aria-pressed", showing ? "false" : "true");
    }});

    loginButton.addEventListener("click", login);

    if (window.resursmapAuthForms) {{
        window.resursmapAuthForms.bindEnterSubmit([emailInput, passwordInput], login);
    }}

    emailInput.focus();
}})();
</script>
"##,
        redirect_target_json =
            serde_json::to_string(&redirect_target).unwrap_or_else(|_| "\"/app\"".to_string()),
    );

    Html(crate::web::templates::render_auth_page(
        crate::web::templates::AuthPageParams {
            document_title: "Вход · GRABIT",
            heading: "Вход",
            subtitle: "",
            body_html,
            footer_html: &footer_html,
            script_html: &body_after,
            back_link: false,
        },
    ))
}

pub async fn register_page(Query(query): Query<AuthNextQuery>) -> Html<String> {
    let redirect_target = auth_redirect_target(query.next.as_deref());
    let mail_ready = email_delivery_configured();

    let body_html = r##"
        <div class="rm-auth-field">
            <label class="rm-auth-label" for="email-input">Почта</label>
            <input id="email-input" class="rm-auth-input" type="email" inputmode="email" autocomplete="email" maxlength="254" placeholder="pochta@mail.ru">
            <span id="email-error" class="rm-auth-field-error"></span>
        </div>

        <div class="rm-auth-field">
            <label class="rm-auth-label" for="password-input">Пароль</label>
            <div class="rm-auth-password-row">
                <input id="password-input" class="rm-auth-input" type="password" autocomplete="new-password" maxlength="128" placeholder="Минимум 8 символов">
                <button id="password-toggle" type="button" class="rm-auth-password-toggle" aria-label="Показать пароль" aria-pressed="false">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                        <circle cx="12" cy="12" r="3"/>
                        <line class="slash" x1="3" y1="3" x2="21" y2="21"/>
                    </svg>
                </button>
            </div>
            <div id="password-strength" class="rm-auth-strength" data-level="0" aria-hidden="true">
                <i></i><i></i><i></i><i></i>
            </div>
            <span id="password-error" class="rm-auth-field-error"></span>
        </div>

        <div class="rm-auth-field">
            <label class="rm-auth-label" for="password-confirm-input">Повторите пароль</label>
            <div class="rm-auth-password-row">
                <input id="password-confirm-input" class="rm-auth-input" type="password" autocomplete="new-password" maxlength="128" placeholder="Ещё раз">
                <button id="password-confirm-toggle" type="button" class="rm-auth-password-toggle" aria-label="Показать пароль" aria-pressed="false">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                        <circle cx="12" cy="12" r="3"/>
                        <line class="slash" x1="3" y1="3" x2="21" y2="21"/>
                    </svg>
                </button>
            </div>
            <span id="password-confirm-error" class="rm-auth-field-error"></span>
        </div>

        <label class="rm-auth-consent" for="consent-checkbox">
            <input id="consent-checkbox" type="checkbox">
            <span>Принимаю <a href="/rules" target="_blank" rel="noopener">условия использования</a> и
            <a href="/privacy" target="_blank" rel="noopener">политику конфиденциальности</a></span>
        </label>
        <span id="consent-error" class="rm-auth-field-error"></span>

        <button id="register-button" type="button" class="rm-auth-button">
            <span class="rm-auth-spinner" aria-hidden="true"></span>
            <span class="rm-auth-button-label">Создать аккаунт</span>
        </button>
"##;

    let footer_html = auth_footer_nav(&redirect_target, mail_ready);

    let body_after = format!(
        r##"
<script>
(function () {{
    const redirectTarget = {redirect_target_json};
    const emailInput = document.getElementById("email-input");
    const emailError = document.getElementById("email-error");
    const passwordInput = document.getElementById("password-input");
    const passwordError = document.getElementById("password-error");
    const passwordStrength = document.getElementById("password-strength");
    const passwordConfirmInput = document.getElementById("password-confirm-input");
    const passwordConfirmError = document.getElementById("password-confirm-error");
    const passwordToggle = document.getElementById("password-toggle");
    const passwordConfirmToggle = document.getElementById("password-confirm-toggle");
    const consentCheckbox = document.getElementById("consent-checkbox");
    const consentError = document.getElementById("consent-error");
    const registerButton = document.getElementById("register-button");
    const authStatus = document.getElementById("auth-status");

    function setStatus(message, kind) {{
        authStatus.textContent = message || "";
        authStatus.className = "rm-auth-status" + (kind ? " is-" + kind : "");
    }}

    function setLoading(button, loading) {{
        button.disabled = loading;
        button.dataset.loading = loading ? "true" : "false";
    }}

    function clearFieldErrors() {{
        emailError.textContent = "";
        emailError.innerHTML = "";
        passwordError.textContent = "";
        passwordConfirmError.textContent = "";
        consentError.textContent = "";
    }}

    function errorMessage(error) {{
        const messages = {{
            invalid_email: "Проверьте правильность почты.",
            password_too_short: "Пароль короче 8 символов.",
            password_too_long: "Пароль слишком длинный.",
            password_too_weak: "Нужны и буквы, и цифры.",
            password_mismatch: "Пароли не совпадают.",
            consent_required: "Нужно принять условия и политику.",
            email_already_registered: "Эта почта уже зарегистрирована. Попробуйте войти.",
            verification_required: "Подтвердите почту кодом из письма.",
            rate_limited: "Слишком много попыток. Попробуйте позже.",
            database_unavailable: "Сервис временно недоступен."
        }};
        return messages[error] || "Не удалось зарегистрироваться.";
    }}

    function showError(error) {{
        if (error === "pending_deletion") {{
            emailError.innerHTML = "Аккаунт с этой почтой ожидает удаления. " +
                "<a href=\"/login\">Войти, чтобы отменить удаление</a>.";
            return;
        }}

        const message = errorMessage(error);

        if (error === "invalid_email" || error === "email_already_registered") {{
            emailError.textContent = message;
        }} else if (error === "password_too_short" || error === "password_too_long" || error === "password_too_weak") {{
            passwordError.textContent = message;
        }} else if (error === "password_mismatch") {{
            passwordConfirmError.textContent = message;
        }} else if (error === "consent_required") {{
            consentError.textContent = message;
        }} else {{
            setStatus(message, "error");
        }}
    }}

    function passwordStrengthLevel(password) {{
        if (!password) return 0;
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-zA-Zа-яА-ЯёЁ]/.test(password) && /[0-9]/.test(password)) score++;
        if (/[a-zа-яё]/.test(password) && /[A-ZА-ЯЁ]/.test(password)) score++;
        if (password.length >= 12 || /[^a-zA-Zа-яА-ЯёЁ0-9]/.test(password)) score++;
        return Math.min(score, 4);
    }}

    passwordInput.addEventListener("input", function () {{
        passwordStrength.dataset.level = String(passwordStrengthLevel(passwordInput.value));
        passwordError.textContent = "";
        if (passwordConfirmInput.value) {{
            passwordConfirmError.textContent = passwordConfirmInput.value === passwordInput.value
                ? "" : "Пароли не совпадают.";
        }}
    }});

    passwordConfirmInput.addEventListener("input", function () {{
        passwordConfirmError.textContent = !passwordConfirmInput.value || passwordConfirmInput.value === passwordInput.value
            ? "" : "Пароли не совпадают.";
    }});

    consentCheckbox.addEventListener("change", function () {{
        if (consentCheckbox.checked) {{
            consentError.textContent = "";
        }}
    }});

    async function register() {{
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const passwordConfirm = passwordConfirmInput.value;

        clearFieldErrors();
        setStatus("", null);

        if (!email) {{
            emailError.textContent = "Введите почту.";
            emailInput.focus();
            return;
        }}

        if (password.length < 8) {{
            passwordError.textContent = "Пароль короче 8 символов.";
            passwordInput.focus();
            return;
        }}

        if (password !== passwordConfirm) {{
            passwordConfirmError.textContent = "Пароли не совпадают.";
            passwordConfirmInput.focus();
            return;
        }}

        if (!consentCheckbox.checked) {{
            consentError.textContent = "Нужно принять условия и политику.";
            consentCheckbox.focus();
            return;
        }}

        setLoading(registerButton, true);

        try {{
            const response = await fetch("/auth/register-email", {{
                method: "POST",
                headers: {{ "Content-Type": "application/json" }},
                body: JSON.stringify({{
                    email,
                    password,
                    password_confirm: passwordConfirm,
                    consent: consentCheckbox.checked
                }})
            }});

            const data = await response.json().catch(function () {{
                return {{ ok: false, error: "invalid_response" }};
            }});

            if (!response.ok || !data.ok) {{
                showError(data.error);
                return;
            }}

            if (data.verification_required) {{
                setStatus("Отправляем код на почту...", null);
                let mailSent = false;
                try {{
                    const codeResponse = await fetch("/auth/email/request", {{
                        method: "POST",
                        headers: {{ "Content-Type": "application/json" }},
                        body: JSON.stringify({{ email }})
                    }});
                    const codeData = await codeResponse.json().catch(function () {{
                        return {{ ok: false }};
                    }});
                    mailSent = Boolean(codeResponse.ok && codeData.ok);
                }} catch (_) {{
                    mailSent = false;
                }}
                const params = new URLSearchParams();
                params.set("next", redirectTarget);
                params.set("email", email);
                if (!mailSent) {{
                    params.set("resend", "1");
                }}
                window.location.replace("/login/code?" + params.toString());
                return;
            }}

            setStatus("Аккаунт создан", "success");
            window.location.replace(redirectTarget);
        }} catch (_) {{
            setStatus("Нет соединения. Проверьте интернет и попробуйте снова.", "error");
        }} finally {{
            setLoading(registerButton, false);
        }}
    }}

    [passwordToggle, passwordConfirmToggle].forEach(function (button) {{
        const input = button === passwordToggle ? passwordInput : passwordConfirmInput;
        button.addEventListener("click", function () {{
            const showing = input.type === "text";
            input.type = showing ? "password" : "text";
            button.setAttribute("aria-pressed", showing ? "false" : "true");
        }});
    }});

    registerButton.addEventListener("click", register);

    if (window.resursmapAuthForms) {{
        window.resursmapAuthForms.bindEnterSubmit(
            [emailInput, passwordInput, passwordConfirmInput],
            register
        );
    }}

    emailInput.focus();
}})();
</script>
"##,
        redirect_target_json =
            serde_json::to_string(&redirect_target).unwrap_or_else(|_| "\"/app\"".to_string()),
    );

    Html(crate::web::templates::render_auth_page(
        crate::web::templates::AuthPageParams {
            document_title: "Регистрация · GRABIT",
            heading: "Регистрация",
            subtitle: if mail_ready {
                "Почта и пароль. Придёт код подтверждения."
            } else {
                "Почта и пароль. После регистрации вход сразу."
            },
            body_html,
            footer_html: &footer_html,
            script_html: &body_after,
            back_link: false,
        },
    ))
}
