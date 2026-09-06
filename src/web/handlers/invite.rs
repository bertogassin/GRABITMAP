use super::auth::verify_user_session;
use super::user_blocks::users_are_blocked;
use crate::state::app_state::AppState;
use crate::web::templates;
use axum::{
    extract::{Path, Query, State},
    http::{header, HeaderMap, StatusCode},
    response::{Html, IntoResponse, Redirect, Response},
};
use rusqlite::OptionalExtension;
use serde::Deserialize;

#[derive(Debug, Default, Deserialize)]
pub struct InviteQuery {
    pub to: Option<String>,
}

fn invite_kind(raw: Option<&str>) -> &'static str {
    match raw.unwrap_or("").trim() {
        "steps" => "steps",
        "work" => "work",
        "chat" => "chat",
        _ => "",
    }
}

fn public_id_is_valid(value: &str) -> bool {
    let value = value.trim();
    !value.is_empty()
        && value.len() <= 64
        && value.chars().all(|character| {
            character.is_ascii_alphanumeric() || character == '-' || character == '_'
        })
}

fn display_name(username: &str, first: &str, last: &str) -> String {
    let full = format!("{} {}", first.trim(), last.trim());
    let full = full.trim();
    if !full.is_empty() {
        return full.to_string();
    }
    if !username.trim().is_empty() {
        return format!("@{}", username.trim());
    }
    String::new()
}

fn destination(kind: &str, inviter_user_id: i64) -> String {
    match kind {
        "steps" => "/app/steps".to_string(),
        "work" => "/app/search?kind=work".to_string(),
        _ => format!("/app/chat/{inviter_user_id}"),
    }
}

fn load_public_id(db: &rusqlite::Connection, user_id: i64) -> String {
    db.query_row(
        "SELECT COALESCE(public_id, '') FROM profiles WHERE user_id = ?1",
        rusqlite::params![user_id],
        |row| row.get(0),
    )
    .unwrap_or_default()
}

fn ensure_friend_conversation(
    db: &rusqlite::Connection,
    joiner_user_id: i64,
    inviter_user_id: i64,
) -> Result<(), ()> {
    if joiner_user_id <= 0 || inviter_user_id <= 0 || joiner_user_id == inviter_user_id {
        return Err(());
    }
    if users_are_blocked(db, joiner_user_id, inviter_user_id) {
        return Err(());
    }

    let (user1_id, user2_id) = if joiner_user_id < inviter_user_id {
        (joiner_user_id, inviter_user_id)
    } else {
        (inviter_user_id, joiner_user_id)
    };
    let now = crate::web::handlers::common::unix_now();

    db.execute(
        "INSERT OR IGNORE INTO conversations (user1_id, user2_id, created_at, updated_at)
         VALUES (?1, ?2, ?3, ?3)",
        rusqlite::params![user1_id, user2_id, now],
    )
    .map_err(|_| ())?;

    let conversation_id: i64 = db
        .query_row(
            "SELECT id FROM conversations WHERE user1_id = ?1 AND user2_id = ?2 LIMIT 1",
            rusqlite::params![user1_id, user2_id],
            |row| row.get(0),
        )
        .map_err(|_| ())?;

    let already: i64 = db
        .query_row(
            "SELECT COUNT(*) FROM messages WHERE conversation_id = ?1",
            rusqlite::params![conversation_id],
            |row| row.get(0),
        )
        .unwrap_or(0);

    if already > 0 {
        return Ok(());
    }

    db.execute(
        "INSERT INTO messages (
            conversation_id, sender_user_id, message, is_read,
            delivered_at, read_at, created_at, reply_to_message_id, edited_at, deleted_at
         )
         VALUES (?1, ?2, ?3, 0, 0, 0, ?4, NULL, 0, 0)",
        rusqlite::params![
            conversation_id,
            joiner_user_id,
            "Привет. Я по твоей ссылке.",
            now
        ],
    )
    .map_err(|_| ())?;

    let _ = db.execute(
        "UPDATE conversations SET updated_at = ?2 WHERE id = ?1",
        rusqlite::params![conversation_id, now],
    );

    Ok(())
}

pub fn current_user_public_id(state: &AppState, headers: &HeaderMap) -> String {
    let Some(user_id) = verify_user_session(state, headers) else {
        return String::new();
    };
    match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => load_public_id(&db, user_id),
        Err(_) => String::new(),
    }
}

pub async fn join_invite(
    State(state): State<AppState>,
    Path(public_id): Path<String>,
    Query(query): Query<InviteQuery>,
    headers: HeaderMap,
) -> Response {
    let public_id = public_id.trim().to_string();
    if !public_id_is_valid(&public_id) {
        return StatusCode::NOT_FOUND.into_response();
    }

    let kind = invite_kind(query.to.as_deref());
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return StatusCode::SERVICE_UNAVAILABLE.into_response();
        }
    };

    let inviter: Option<(i64, String, String, String)> = db
        .query_row(
            "SELECT profile.user_id,
                    COALESCE(profile.username, ''),
                    COALESCE(profile.first_name, ''),
                    COALESCE(profile.last_name, '')
             FROM profiles AS profile
             JOIN users AS user
               ON user.id = profile.user_id
              AND user.is_active = 1
             WHERE profile.public_id = ?1
             LIMIT 1",
            rusqlite::params![&public_id],
            |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?)),
        )
        .optional()
        .ok()
        .flatten();

    let Some((inviter_user_id, username, first, last)) = inviter else {
        return StatusCode::NOT_FOUND.into_response();
    };

    let Some(joiner_user_id) = verify_user_session(&state, &headers) else {
        drop(db);
        return Html(templates::render_invite_landing(
            &display_name(&username, &first, &last),
            &public_id,
            kind,
        ))
        .into_response();
    };

    if joiner_user_id == inviter_user_id {
        drop(db);
        return Redirect::to(&destination(kind, inviter_user_id)).into_response();
    }

    let _ = ensure_friend_conversation(&db, joiner_user_id, inviter_user_id);
    drop(db);

    (
        [(header::LOCATION, destination(kind, inviter_user_id))],
        StatusCode::SEE_OTHER,
    )
        .into_response()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn invite_kind_is_narrow() {
        assert_eq!(invite_kind(Some("steps")), "steps");
        assert_eq!(invite_kind(Some("work")), "work");
        assert_eq!(invite_kind(Some("chat")), "chat");
        assert_eq!(invite_kind(Some("admin")), "");
        assert!(public_id_is_valid("ab12"));
        assert!(!public_id_is_valid("../x"));
    }
}
