use super::auth::verify_user_session;
use super::common::{rate_limit_retry_after, request_is_cross_site, unix_now};
use crate::db::chat_pins::{KIND_DIRECT, KIND_GROUP};
use crate::state::app_state::AppState;
use axum::{
    extract::{Path, State},
    http::{header, HeaderMap, StatusCode},
    response::{IntoResponse, Response},
    Json,
};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Debug, Deserialize)]
pub struct PinMessagePayload {
    pinned: bool,
}

#[derive(Debug, Serialize)]
struct PinnedMessage {
    id: i64,
    message: String,
    attachment_kind: String,
    sender_name: String,
}

fn json_error(status: StatusCode, error: &str) -> Response {
    (status, Json(json!({"ok": false, "error": error}))).into_response()
}

fn direct_conversation_id(
    db: &rusqlite::Connection,
    user_id: i64,
    other_user_id: i64,
) -> Option<i64> {
    if user_id <= 0 || other_user_id <= 0 || user_id == other_user_id {
        return None;
    }
    let (first, second) = if user_id < other_user_id {
        (user_id, other_user_id)
    } else {
        (other_user_id, user_id)
    };
    db.query_row(
        "SELECT id FROM conversations WHERE user1_id = ?1 AND user2_id = ?2",
        rusqlite::params![first, second],
        |row| row.get(0),
    )
    .ok()
}

fn group_role(db: &rusqlite::Connection, group_id: i64, user_id: i64) -> Option<String> {
    db.query_row(
        "SELECT role FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
        rusqlite::params![group_id, user_id],
        |row| row.get(0),
    )
    .ok()
}

fn can_manage_group_pins(role: &str) -> bool {
    role == "owner" || role == "admin"
}

fn direct_pin(db: &rusqlite::Connection, conversation_id: i64) -> Option<PinnedMessage> {
    db.query_row(
        "SELECT message.id, message.message,
                COALESCE(message.attachment_kind, ''), ''
         FROM chat_message_pins AS pin
         JOIN messages AS message ON message.id = pin.message_id
         WHERE pin.chat_kind = ?1 AND pin.target_id = ?2
           AND message.conversation_id = ?2 AND message.deleted_at = 0",
        rusqlite::params![KIND_DIRECT, conversation_id],
        |row| {
            Ok(PinnedMessage {
                id: row.get(0)?,
                message: row.get(1)?,
                attachment_kind: row.get(2)?,
                sender_name: row.get(3)?,
            })
        },
    )
    .ok()
}

fn group_pin(db: &rusqlite::Connection, group_id: i64) -> Option<PinnedMessage> {
    db.query_row(
        "SELECT message.id, message.message,
                COALESCE(message.attachment_kind, ''),
                trim(COALESCE(profile.first_name, '') || ' ' || COALESCE(profile.last_name, ''))
         FROM chat_message_pins AS pin
         JOIN group_messages AS message ON message.id = pin.message_id
         LEFT JOIN profiles AS profile ON profile.user_id = message.sender_user_id
         WHERE pin.chat_kind = ?1 AND pin.target_id = ?2
           AND message.group_id = ?2 AND message.deleted_at = 0",
        rusqlite::params![KIND_GROUP, group_id],
        |row| {
            Ok(PinnedMessage {
                id: row.get(0)?,
                message: row.get(1)?,
                attachment_kind: row.get(2)?,
                sender_name: row.get(3)?,
            })
        },
    )
    .ok()
}

fn set_pin(
    db: &rusqlite::Connection,
    kind: &str,
    target_id: i64,
    message_id: i64,
    user_id: i64,
    pinned: bool,
) -> rusqlite::Result<bool> {
    if pinned {
        db.execute(
            "INSERT INTO chat_message_pins (
                chat_kind, target_id, message_id, pinned_by, pinned_at
             ) VALUES (?1, ?2, ?3, ?4, ?5)
             ON CONFLICT(chat_kind, target_id) DO UPDATE SET
                message_id = excluded.message_id,
                pinned_by = excluded.pinned_by,
                pinned_at = excluded.pinned_at",
            rusqlite::params![kind, target_id, message_id, user_id, unix_now()],
        )?;
        Ok(true)
    } else {
        Ok(db.execute(
            "DELETE FROM chat_message_pins
             WHERE chat_kind = ?1 AND target_id = ?2 AND message_id = ?3",
            rusqlite::params![kind, target_id, message_id],
        )? > 0)
    }
}

pub async fn api_chat_pinned(
    State(state): State<AppState>,
    Path(other_user_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    let user_id = match verify_user_session(&state, &headers) {
        Some(value) => value,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    let db = match state.db_pool.get() {
        Ok(value) => value,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    let Some(conversation_id) = direct_conversation_id(&db, user_id, other_user_id) else {
        return json_error(StatusCode::NOT_FOUND, "conversation_not_found");
    };
    Json(json!({
        "ok": true,
        "pinned": direct_pin(&db, conversation_id),
        "can_manage_pins": true
    }))
    .into_response()
}

pub async fn api_group_pinned(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    let user_id = match verify_user_session(&state, &headers) {
        Some(value) => value,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    let db = match state.db_pool.get() {
        Ok(value) => value,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    let Some(role) = group_role(&db, group_id, user_id) else {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    };
    Json(json!({
        "ok": true,
        "pinned": group_pin(&db, group_id),
        "can_manage_pins": can_manage_group_pins(&role)
    }))
    .into_response()
}

pub async fn api_chat_pin(
    State(state): State<AppState>,
    Path((other_user_id, message_id)): Path<(i64, i64)>,
    headers: HeaderMap,
    Json(payload): Json<PinMessagePayload>,
) -> Response {
    if request_is_cross_site(&headers) {
        return json_error(StatusCode::FORBIDDEN, "cross_site_request_rejected");
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(value) => value,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    if message_id <= 0 {
        return json_error(StatusCode::BAD_REQUEST, "invalid_request");
    }
    if let Some(retry_after) = rate_limit_retry_after(&state, user_id, "chat_pin", 30, 60).await {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            [(header::RETRY_AFTER, retry_after.to_string())],
            Json(json!({"ok": false, "error": "rate_limited"})),
        )
            .into_response();
    }
    let db = match state.db_pool.get() {
        Ok(value) => value,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    let Some(conversation_id) = direct_conversation_id(&db, user_id, other_user_id) else {
        return json_error(StatusCode::FORBIDDEN, "conversation_not_open");
    };
    let exists = db
        .query_row(
            "SELECT 1 FROM messages
             WHERE id = ?1 AND conversation_id = ?2 AND deleted_at = 0",
            rusqlite::params![message_id, conversation_id],
            |_| Ok(()),
        )
        .is_ok();
    if !exists {
        return json_error(StatusCode::NOT_FOUND, "message_not_found");
    }
    if set_pin(
        &db,
        KIND_DIRECT,
        conversation_id,
        message_id,
        user_id,
        payload.pinned,
    )
    .is_err()
    {
        return json_error(StatusCode::INTERNAL_SERVER_ERROR, "pin_update_failed");
    }
    state.publish_chat_event(
        "message.updated",
        conversation_id,
        message_id,
        user_id,
        other_user_id,
    );
    Json(json!({"ok": true, "pinned": direct_pin(&db, conversation_id)})).into_response()
}

pub async fn api_group_pin(
    State(state): State<AppState>,
    Path((group_id, message_id)): Path<(i64, i64)>,
    headers: HeaderMap,
    Json(payload): Json<PinMessagePayload>,
) -> Response {
    if request_is_cross_site(&headers) {
        return json_error(StatusCode::FORBIDDEN, "cross_site_request_rejected");
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(value) => value,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    if group_id <= 0 || message_id <= 0 {
        return json_error(StatusCode::BAD_REQUEST, "invalid_request");
    }
    if let Some(retry_after) = rate_limit_retry_after(&state, user_id, "group_pin", 30, 60).await {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            [(header::RETRY_AFTER, retry_after.to_string())],
            Json(json!({"ok": false, "error": "rate_limited"})),
        )
            .into_response();
    }
    let db = match state.db_pool.get() {
        Ok(value) => value,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    let role = group_role(&db, group_id, user_id).unwrap_or_default();
    if !can_manage_group_pins(&role) {
        return json_error(StatusCode::FORBIDDEN, "group_admin_required");
    }
    let exists = db
        .query_row(
            "SELECT 1 FROM group_messages
             WHERE id = ?1 AND group_id = ?2 AND deleted_at = 0",
            rusqlite::params![message_id, group_id],
            |_| Ok(()),
        )
        .is_ok();
    if !exists {
        return json_error(StatusCode::NOT_FOUND, "message_not_found");
    }
    if set_pin(
        &db,
        KIND_GROUP,
        group_id,
        message_id,
        user_id,
        payload.pinned,
    )
    .is_err()
    {
        return json_error(StatusCode::INTERNAL_SERVER_ERROR, "pin_update_failed");
    }
    let members = db
        .prepare("SELECT user_id FROM chat_group_members WHERE group_id = ?1")
        .and_then(|mut statement| {
            statement
                .query_map(rusqlite::params![group_id], |row| row.get(0))?
                .collect::<rusqlite::Result<Vec<i64>>>()
        })
        .unwrap_or_default();
    state.publish_group_chat_event("message.updated", group_id, message_id, &members);
    Json(json!({"ok": true, "pinned": group_pin(&db, group_id)})).into_response()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn group_pin_permissions_are_limited_to_managers() {
        assert!(can_manage_group_pins("owner"));
        assert!(can_manage_group_pins("admin"));
        assert!(!can_manage_group_pins("member"));
        assert!(!can_manage_group_pins(""));
    }
}
