use super::auth::verify_user_session;
use super::common::rate_limit_retry_after;
use crate::state::app_state::AppState;
use axum::{
    extract::{Path, Query, State},
    http::{header, HeaderMap, StatusCode},
    response::{IntoResponse, Response},
    Json,
};
use serde::{Deserialize, Serialize};
use serde_json::json;

// Keep results inside the history-reveal window used by the browser client.
const SEARCH_SCAN_LIMIT: i64 = 2_000;
const SEARCH_RESULT_LIMIT: usize = 50;
const SEARCH_MIN_CHARS: usize = 2;
const SEARCH_MAX_CHARS: usize = 100;

#[derive(Debug, Deserialize)]
pub struct ChatSearchQuery {
    q: String,
}

#[derive(Debug, Serialize)]
struct ChatSearchResult {
    id: i64,
    message: String,
    sender_name: String,
    is_mine: bool,
    created_at: i64,
    attachment_kind: String,
}

fn json_error(status: StatusCode, error: &str) -> Response {
    (status, Json(json!({ "ok": false, "error": error }))).into_response()
}

fn normalize_query(value: &str) -> Option<String> {
    let value = value.trim();
    let chars = value.chars().count();
    if !(SEARCH_MIN_CHARS..=SEARCH_MAX_CHARS).contains(&chars) {
        return None;
    }
    Some(value.to_lowercase())
}

fn excerpt(value: &str) -> String {
    let value = value.trim();
    if value.chars().count() <= 180 {
        return value.to_string();
    }
    let mut result: String = value.chars().take(177).collect();
    result.push('…');
    result
}

fn matches_query(value: &str, normalized_query: &str) -> bool {
    value.to_lowercase().contains(normalized_query)
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

fn user_display_name(db: &rusqlite::Connection, user_id: i64) -> String {
    db.query_row(
        "SELECT trim(COALESCE(first_name, '') || ' ' || COALESCE(last_name, ''))
         FROM profiles WHERE user_id = ?1",
        rusqlite::params![user_id],
        |row| row.get::<_, String>(0),
    )
    .unwrap_or_default()
}

fn search_direct_messages(
    db: &rusqlite::Connection,
    conversation_id: i64,
    viewer_user_id: i64,
    normalized_query: &str,
) -> rusqlite::Result<Vec<ChatSearchResult>> {
    let mut statement = db.prepare(
        "SELECT id, sender_user_id, message, created_at,
                COALESCE(attachment_kind, '')
         FROM messages
         WHERE conversation_id = ?1 AND deleted_at = 0 AND trim(message) != ''
         ORDER BY id DESC LIMIT ?2",
    )?;
    let rows = statement.query_map(
        rusqlite::params![conversation_id, SEARCH_SCAN_LIMIT],
        |row| {
            Ok((
                row.get::<_, i64>(0)?,
                row.get::<_, i64>(1)?,
                row.get::<_, String>(2)?,
                row.get::<_, i64>(3)?,
                row.get::<_, String>(4)?,
            ))
        },
    )?;
    let mut results = Vec::new();
    for row in rows {
        let (id, sender_user_id, message, created_at, attachment_kind) = row?;
        if matches_query(&message, normalized_query) {
            results.push(ChatSearchResult {
                id,
                message: excerpt(&message),
                sender_name: String::new(),
                is_mine: sender_user_id == viewer_user_id,
                created_at,
                attachment_kind,
            });
            if results.len() >= SEARCH_RESULT_LIMIT {
                break;
            }
        }
    }
    Ok(results)
}

fn search_group_messages(
    db: &rusqlite::Connection,
    group_id: i64,
    viewer_user_id: i64,
    normalized_query: &str,
) -> rusqlite::Result<Vec<ChatSearchResult>> {
    let mut statement = db.prepare(
        "SELECT gm.id, gm.sender_user_id, gm.message, gm.created_at,
                COALESCE(gm.attachment_kind, ''),
                trim(COALESCE(p.first_name, '') || ' ' || COALESCE(p.last_name, ''))
         FROM group_messages AS gm
         LEFT JOIN profiles AS p ON p.user_id = gm.sender_user_id
         WHERE gm.group_id = ?1 AND gm.deleted_at = 0 AND trim(gm.message) != ''
         ORDER BY gm.id DESC LIMIT ?2",
    )?;
    let rows = statement.query_map(rusqlite::params![group_id, SEARCH_SCAN_LIMIT], |row| {
        Ok((
            row.get::<_, i64>(0)?,
            row.get::<_, i64>(1)?,
            row.get::<_, String>(2)?,
            row.get::<_, i64>(3)?,
            row.get::<_, String>(4)?,
            row.get::<_, String>(5)?,
        ))
    })?;
    let mut results = Vec::new();
    for row in rows {
        let (id, sender_user_id, message, created_at, attachment_kind, sender_name) = row?;
        if matches_query(&message, normalized_query) {
            results.push(ChatSearchResult {
                id,
                message: excerpt(&message),
                sender_name,
                is_mine: sender_user_id == viewer_user_id,
                created_at,
                attachment_kind,
            });
            if results.len() >= SEARCH_RESULT_LIMIT {
                break;
            }
        }
    }
    Ok(results)
}

pub async fn api_chat_search(
    State(state): State<AppState>,
    Path(other_user_id): Path<i64>,
    headers: HeaderMap,
    Query(query): Query<ChatSearchQuery>,
) -> Response {
    let user_id = match verify_user_session(&state, &headers) {
        Some(user_id) => user_id,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    let Some(normalized_query) = normalize_query(&query.q) else {
        return json_error(StatusCode::BAD_REQUEST, "invalid_search_query");
    };
    if let Some(retry_after) = rate_limit_retry_after(&state, user_id, "chat_search", 60, 60).await
    {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            [(header::RETRY_AFTER, retry_after.to_string())],
            Json(json!({ "ok": false, "error": "rate_limited" })),
        )
            .into_response();
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    let Some(conversation_id) = direct_conversation_id(&db, user_id, other_user_id) else {
        return json_error(StatusCode::NOT_FOUND, "conversation_not_found");
    };
    match search_direct_messages(&db, conversation_id, user_id, &normalized_query) {
        Ok(mut results) => {
            let peer_name = user_display_name(&db, other_user_id);
            for result in &mut results {
                if !result.is_mine {
                    result.sender_name.clone_from(&peer_name);
                }
            }
            Json(json!({ "ok": true, "results": results })).into_response()
        }
        Err(_) => json_error(StatusCode::INTERNAL_SERVER_ERROR, "search_failed"),
    }
}

pub async fn api_group_search(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
    Query(query): Query<ChatSearchQuery>,
) -> Response {
    let user_id = match verify_user_session(&state, &headers) {
        Some(user_id) => user_id,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    let Some(normalized_query) = normalize_query(&query.q) else {
        return json_error(StatusCode::BAD_REQUEST, "invalid_search_query");
    };
    if let Some(retry_after) = rate_limit_retry_after(&state, user_id, "group_search", 60, 60).await
    {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            [(header::RETRY_AFTER, retry_after.to_string())],
            Json(json!({ "ok": false, "error": "rate_limited" })),
        )
            .into_response();
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    let is_member = db
        .query_row(
            "SELECT 1 FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
            rusqlite::params![group_id, user_id],
            |_| Ok(()),
        )
        .is_ok();
    if group_id <= 0 || !is_member {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    }
    match search_group_messages(&db, group_id, user_id, &normalized_query) {
        Ok(results) => Json(json!({ "ok": true, "results": results })).into_response(),
        Err(_) => json_error(StatusCode::INTERNAL_SERVER_ERROR, "search_failed"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn unicode_search_is_case_insensitive_and_excludes_deleted_messages() {
        let db = rusqlite::Connection::open_in_memory().expect("search database");
        db.execute_batch(
            "CREATE TABLE messages (
                id INTEGER PRIMARY KEY, conversation_id INTEGER NOT NULL,
                sender_user_id INTEGER NOT NULL, message TEXT NOT NULL,
                created_at INTEGER NOT NULL, deleted_at INTEGER NOT NULL DEFAULT 0,
                attachment_kind TEXT NOT NULL DEFAULT ''
             );
             INSERT INTO messages VALUES
                (1, 7, 10, 'Ищу РАБОТУ в Ницце', 100, 0, ''),
                (2, 7, 20, 'работу уже нашли', 200, 1, ''),
                (3, 8, 10, 'Работу в другом чате', 300, 0, '');",
        )
        .expect("search fixtures");

        let results = search_direct_messages(&db, 7, 10, "работу").expect("search results");
        assert_eq!(results.len(), 1);
        assert_eq!(results[0].id, 1);
        assert!(results[0].is_mine);
    }

    #[test]
    fn invalid_search_lengths_are_rejected() {
        assert!(normalize_query(" ").is_none());
        assert!(normalize_query("a").is_none());
        assert!(normalize_query(&"x".repeat(101)).is_none());
        assert_eq!(normalize_query("  GRABIT  ").as_deref(), Some("grabit"));
    }
}
