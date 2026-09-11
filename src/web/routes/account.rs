use super::super::handlers::{
    api_attention_count, api_open_count, api_profile_avatar_get, api_profile_avatar_set,
    api_profile_get, api_profile_set, api_public_profile_avatar_get, app_logout, app_me,
    app_revoke_other_sessions, app_revoke_session, email_auth_request, email_auth_verify,
    favorites_page, forgot_password_page, forgot_password_request, join_invite, login_code_page,
    login_email, login_page, mark_all_notifications_read, notifications_page, open_notification,
    public_user_profile, register_email, register_page, reset_password, unread_count,
};
use crate::state::app_state::AppState;
use axum::{
    routing::{get, post},
    Router,
};

pub(super) fn routes() -> Router<AppState> {
    Router::new()
        .route("/login", get(login_page))
        .route("/login/code", get(login_code_page))
        .route("/login/forgot", get(forgot_password_page))
        .route("/register", get(register_page))
        .route("/auth/register-email", post(register_email))
        .route("/auth/login-email", post(login_email))
        .route("/auth/forgot-password", post(forgot_password_request))
        .route("/auth/reset-password", post(reset_password))
        .route("/auth/email/request", post(email_auth_request))
        .route("/auth/email/verify", post(email_auth_verify))
        .route("/app/logout", post(app_logout))
        .route(
            "/app/sessions/revoke-others",
            post(app_revoke_other_sessions),
        )
        .route("/app/sessions/revoke", post(app_revoke_session))
        .route("/app/auth/email/request", post(email_auth_request))
        .route("/app/auth/email/verify", post(email_auth_verify))
        .route("/app/locale", post(crate::i18n::set_locale))
        .route("/app/me", get(app_me))
        .route("/app/favorites", get(favorites_page))
        .route("/app/join/{public_id}", get(join_invite))
        .route("/app/notifications", get(notifications_page))
        .route(
            "/app/notifications/read-all",
            get(mark_all_notifications_read),
        )
        .route("/app/notifications/{id}/open", get(open_notification))
        .route("/app/user/{public_id}", get(public_user_profile))
        .route("/api/profile", get(api_profile_get).post(api_profile_set))
        .route("/api/profile/avatar", post(api_profile_avatar_set))
        .route("/api/avatars/{user_id}", get(api_profile_avatar_get))
        .route(
            "/api/public-avatars/{public_id}",
            get(api_public_profile_avatar_get),
        )
        .route("/api/open_count", get(api_open_count))
        .route("/api/account/attention-count", get(api_attention_count))
        .route("/api/notifications/unread-count", get(unread_count))
}
