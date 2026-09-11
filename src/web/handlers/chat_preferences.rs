use super::auth::verify_user_session;
use super::chat_identity::active_user_id_by_chat_route;
use super::common::{request_is_cross_site, unix_now};
use crate::db::chat_preferences::{KIND_DIRECT, KIND_GROUP};
use crate::state::app_state::AppState;
use axum::{
    extract::{Path, State},
    http::HeaderMap,
    response::{IntoResponse, Redirect, Response},
    Form,
};
use serde::Deserialize;

const TEN_YEARS_SECONDS: i64 = 10 * 365 * 24 * 60 * 60;

#[derive(Debug, Deserialize)]
pub struct ChatPreferenceForm {
    action: String,
    #[serde(default)]
    return_view: String,
}

fn target_is_accessible(
    db: &rusqlite::Connection,
    user_id: i64,
    kind: &str,
    target_id: i64,
) -> bool {
    if kind == KIND_DIRECT && target_id != user_id {
        let (first, second) = if user_id < target_id {
            (user_id, target_id)
        } else {
            (target_id, user_id)
        };
        db.query_row(
            "SELECT 1 FROM conversations WHERE user1_id = ?1 AND user2_id = ?2",
            rusqlite::params![first, second],
            |_| Ok(()),
        )
        .is_ok()
    } else if kind == KIND_GROUP {
        db.query_row(
            "SELECT 1 FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
            rusqlite::params![target_id, user_id],
            |_| Ok(()),
        )
        .is_ok()
    } else {
        false
    }
}

pub async fn update_chat_preference(
    State(state): State<AppState>,
    Path((kind, target_route)): Path<(String, String)>,
    headers: HeaderMap,
    Form(form): Form<ChatPreferenceForm>,
) -> Response {
    let archived_view = form.return_view == "archived";
    let redirect = if archived_view {
        "/app/messages?view=archived"
    } else {
        "/app/messages"
    };
    if request_is_cross_site(&headers) {
        return Redirect::to(redirect).into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Redirect::to("/login?next=/app/messages").into_response(),
    };
    if !matches!(kind.as_str(), KIND_DIRECT | KIND_GROUP) {
        return Redirect::to(redirect).into_response();
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Redirect::to(redirect).into_response(),
    };
    let target_id = if kind == KIND_DIRECT {
        active_user_id_by_chat_route(&db, &target_route).filter(|target_id| *target_id != user_id)
    } else {
        target_route
            .parse::<i64>()
            .ok()
            .filter(|target_id| *target_id > 0)
    };
    let Some(target_id) = target_id else {
        return Redirect::to(redirect).into_response();
    };
    if !target_is_accessible(&db, user_id, &kind, target_id) {
        return Redirect::to(redirect).into_response();
    }
    let now = unix_now();
    let tx = match db.unchecked_transaction() {
        Ok(tx) => tx,
        Err(_) => return Redirect::to(redirect).into_response(),
    };
    if tx
        .execute(
            "INSERT OR IGNORE INTO chat_preferences (
                user_id, chat_kind, target_id, updated_at
             ) VALUES (?1, ?2, ?3, ?4)",
            rusqlite::params![user_id, kind, target_id, now],
        )
        .is_err()
    {
        return Redirect::to(redirect).into_response();
    }
    let sql = match form.action.as_str() {
        "pin" => "UPDATE chat_preferences SET pinned_at = ?4, archived_at = 0, updated_at = ?4 WHERE user_id = ?1 AND chat_kind = ?2 AND target_id = ?3",
        "unpin" => "UPDATE chat_preferences SET pinned_at = 0, updated_at = ?4 WHERE user_id = ?1 AND chat_kind = ?2 AND target_id = ?3",
        "archive" => "UPDATE chat_preferences SET archived_at = ?4, pinned_at = 0, updated_at = ?4 WHERE user_id = ?1 AND chat_kind = ?2 AND target_id = ?3",
        "unarchive" => "UPDATE chat_preferences SET archived_at = 0, updated_at = ?4 WHERE user_id = ?1 AND chat_kind = ?2 AND target_id = ?3",
        "mute" => "UPDATE chat_preferences SET muted_until = ?5, updated_at = ?4 WHERE user_id = ?1 AND chat_kind = ?2 AND target_id = ?3",
        "unmute" => "UPDATE chat_preferences SET muted_until = 0, updated_at = ?4 WHERE user_id = ?1 AND chat_kind = ?2 AND target_id = ?3",
        _ => return Redirect::to(redirect).into_response(),
    };
    let muted_until = now.saturating_add(TEN_YEARS_SECONDS);
    if tx
        .execute(
            sql,
            rusqlite::params![user_id, kind, target_id, now, muted_until],
        )
        .is_err()
    {
        return Redirect::to(redirect).into_response();
    }
    if form.action == "mute" {
        let notification_kind = if kind == KIND_GROUP {
            "group_message"
        } else {
            "chat_message"
        };
        let _ = tx.execute(
            "UPDATE user_notifications
             SET is_read = 1
             WHERE user_id = ?1 AND kind = ?2 AND resource_id = ?3 AND is_read = 0",
            rusqlite::params![user_id, notification_kind, target_id],
        );
    }
    if tx.commit().is_err() {
        return Redirect::to(redirect).into_response();
    }
    Redirect::to(redirect).into_response()
}
