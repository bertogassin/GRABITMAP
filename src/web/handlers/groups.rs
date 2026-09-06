use super::auth::verify_user_session;
use super::chat::load_user_conversations;
use super::chat_api::{message_can_be_edited, message_is_valid, reaction_emoji_is_allowed};
use super::chat_media::{detect_audio, detect_image, extension_for_mime, media_root};
use super::common::{input_text_is_valid, request_is_cross_site, unix_now};
use crate::state::app_state::AppState;
use crate::web::templates;
use axum::{
    extract::{Multipart, Path, State},
    http::{header, HeaderMap, HeaderValue, StatusCode},
    response::{Html, IntoResponse, Redirect, Response},
    Form, Json,
};
use serde::Deserialize;
use serde_json::json;
use std::fs;
use std::io::Write;

#[derive(Debug, Deserialize)]
pub struct CreateGroupForm {
    name: String,
    #[serde(default)]
    member_ids: String,
}

fn json_error(status: StatusCode, error: &str) -> Response {
    (status, Json(json!({"ok": false, "error": error}))).into_response()
}

fn client_message_id_ok(value: &str) -> bool {
    (16..=80).contains(&value.len())
        && value
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || byte == b'-' || byte == b'_')
}

fn find_group_message_by_client_id(
    db: &rusqlite::Connection,
    group_id: i64,
    user_id: i64,
    client_message_id: &str,
) -> Option<crate::web::view_models::ChatMessageRow> {
    let existing_id: i64 = db
        .query_row(
            "SELECT id FROM group_messages
             WHERE group_id = ?1
               AND sender_user_id = ?2
               AND client_message_id = ?3
             LIMIT 1",
            rusqlite::params![group_id, user_id, client_message_id],
            |row| row.get(0),
        )
        .ok()?;
    load_group_messages(db, group_id, user_id, existing_id - 1, 0, 1)
        .into_iter()
        .find(|row| row.id == existing_id)
}

fn group_member_ids(db: &rusqlite::Connection, group_id: i64) -> Vec<i64> {
    db.prepare("SELECT user_id FROM chat_group_members WHERE group_id = ?1")
        .and_then(|mut stmt| {
            stmt.query_map(rusqlite::params![group_id], |row| row.get(0))?
                .collect::<Result<Vec<i64>, _>>()
        })
        .unwrap_or_default()
}

fn notify_group_members(
    db: &rusqlite::Connection,
    group_id: i64,
    sender_id: i64,
    title: &str,
    preview: &str,
) {
    let now = unix_now();
    let members = group_member_ids(db, group_id);
    for member_id in members {
        if member_id <= 0 || member_id == sender_id {
            continue;
        }
        let updated = db
            .execute(
                "UPDATE user_notifications
                 SET title = ?3, message = ?4, created_at = ?5, is_read = 0
                 WHERE user_id = ?1
                   AND kind = 'group_message'
                   AND resource_id = ?2
                   AND is_read = 0",
                rusqlite::params![member_id, group_id, title, preview, now],
            )
            .unwrap_or(0);
        if updated == 0 {
            let _ = db.execute(
                "INSERT INTO user_notifications (
                    user_id, resource_id, kind, title, message, is_read, created_at
                 ) VALUES (?1, ?2, 'group_message', ?3, ?4, 0, ?5)",
                rusqlite::params![member_id, group_id, title, preview, now],
            );
        }
    }
}

fn fanout_group_message(
    state: &AppState,
    db: &rusqlite::Connection,
    kind: &str,
    group_id: i64,
    message_id: i64,
    sender_id: i64,
    preview: &str,
) {
    let members = group_member_ids(db, group_id);
    if kind == "message.created" {
        notify_group_members(db, group_id, sender_id, "Новое сообщение в группе", preview);
    }
    state.publish_group_chat_event(kind, group_id, message_id, &members);
}

fn is_member(db: &rusqlite::Connection, group_id: i64, user_id: i64) -> bool {
    db.query_row(
        "SELECT 1 FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
        rusqlite::params![group_id, user_id],
        |_| Ok(()),
    )
    .is_ok()
}

fn partners_for_picker(
    db: &rusqlite::Connection,
    user_id: i64,
) -> Vec<(i64, String)> {
    load_user_conversations(db, user_id)
        .into_iter()
        .filter(|row| !row.is_group && row.other_user_id > 0)
        .map(|row| {
            (
                row.other_user_id,
                templates::conversation_display_name(
                    row.other_user_id,
                    &row.username,
                    &row.first_name,
                    &row.last_name,
                ),
            )
        })
        .collect()
}

fn load_group_messages(
    db: &rusqlite::Connection,
    group_id: i64,
    viewer_user_id: i64,
    after_id: i64,
    before_id: i64,
    limit: i64,
) -> Vec<crate::web::view_models::ChatMessageRow> {
    let mut messages = if after_id > 0 {
        let sql = "SELECT id, sender_user_id, message, created_at, edited_at, deleted_at,
                          attachment_kind, attachment_path, client_message_id, reply_to_message_id
                   FROM group_messages
                   WHERE group_id = ?1 AND id > ?2
                   ORDER BY id ASC
                   LIMIT ?3";
        db.prepare(sql)
            .ok()
            .and_then(|mut stmt| {
                stmt.query_map(rusqlite::params![group_id, after_id, limit], map_group_message_row)
                    .ok()
                    .map(|rows| rows.filter_map(Result::ok).collect::<Vec<_>>())
            })
            .unwrap_or_default()
    } else if before_id > 0 {
        let sql = "SELECT id, sender_user_id, message, created_at, edited_at, deleted_at,
                          attachment_kind, attachment_path, client_message_id, reply_to_message_id
                   FROM group_messages
                   WHERE group_id = ?1 AND id < ?2
                   ORDER BY id DESC
                   LIMIT ?3";
        let mut rows = db
            .prepare(sql)
            .ok()
            .and_then(|mut stmt| {
                stmt.query_map(rusqlite::params![group_id, before_id, limit], map_group_message_row)
                    .ok()
                    .map(|rows| rows.filter_map(Result::ok).collect::<Vec<_>>())
            })
            .unwrap_or_default();
        rows.reverse();
        rows
    } else {
        // Newest page: take latest N then present ascending (same as DM).
        let sql = "SELECT gm.id, gm.sender_user_id, gm.message, gm.created_at, gm.edited_at, gm.deleted_at,
                          gm.attachment_kind, gm.attachment_path, gm.client_message_id, gm.reply_to_message_id
                   FROM (
                        SELECT id
                        FROM group_messages
                        WHERE group_id = ?1
                        ORDER BY id DESC
                        LIMIT ?2
                   ) AS recent
                   INNER JOIN group_messages gm ON gm.id = recent.id
                   ORDER BY gm.id ASC";
        db.prepare(sql)
            .ok()
            .and_then(|mut stmt| {
                stmt.query_map(rusqlite::params![group_id, limit], map_group_message_row)
                    .ok()
                    .map(|rows| rows.filter_map(Result::ok).collect::<Vec<_>>())
            })
            .unwrap_or_default()
    };
    decorate_group_messages(db, group_id, viewer_user_id, &mut messages);
    apply_group_delivery_ticks(db, group_id, viewer_user_id, &mut messages);
    messages
}

fn apply_group_delivery_ticks(
    db: &rusqlite::Connection,
    group_id: i64,
    viewer_user_id: i64,
    messages: &mut [crate::web::view_models::ChatMessageRow],
) {
    let others: Vec<i64> = group_member_ids(db, group_id)
        .into_iter()
        .filter(|id| *id > 0 && *id != viewer_user_id)
        .collect();
    if others.is_empty() {
        return;
    }
    let mut max_other_read: i64 = 0;
    for member_id in &others {
        let read_id: i64 = db
            .query_row(
                "SELECT COALESCE(last_read_message_id, 0)
                 FROM chat_group_members
                 WHERE group_id = ?1 AND user_id = ?2",
                rusqlite::params![group_id, member_id],
                |row| row.get(0),
            )
            .unwrap_or(0);
        if read_id > max_other_read {
            max_other_read = read_id;
        }
    }
    for message in messages.iter_mut() {
        if message.sender_user_id != viewer_user_id || message.deleted_at > 0 {
            continue;
        }
        if max_other_read >= message.id {
            message.delivered_at = message.created_at.max(1);
            message.read_at = message.created_at.max(1);
            message.is_read = 1;
        } else {
            message.delivered_at = 0;
            message.read_at = 0;
            message.is_read = 0;
        }
    }
}

fn group_peer_read_through(db: &rusqlite::Connection, group_id: i64, viewer_user_id: i64) -> i64 {
    db.query_row(
        "SELECT COALESCE(MAX(last_read_message_id), 0)
         FROM chat_group_members
         WHERE group_id = ?1
           AND user_id <> ?2",
        rusqlite::params![group_id, viewer_user_id],
        |row| row.get(0),
    )
    .unwrap_or(0)
}

fn profile_display_name(db: &rusqlite::Connection, user_id: i64) -> String {
    let row: Option<(String, String, String)> = db
        .query_row(
            "SELECT COALESCE(username, ''), COALESCE(first_name, ''), COALESCE(last_name, '')
             FROM profiles WHERE user_id = ?1 LIMIT 1",
            rusqlite::params![user_id],
            |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?)),
        )
        .ok();
    match row {
        Some((username, first, last)) => {
            templates::conversation_display_name(user_id, &username, &first, &last)
        }
        None => format!("Участник · {:06}", user_id.rem_euclid(1_000_000)),
    }
}

fn decorate_group_messages(
    db: &rusqlite::Connection,
    group_id: i64,
    viewer_user_id: i64,
    messages: &mut [crate::web::view_models::ChatMessageRow],
) {
    let mut names = std::collections::HashMap::<i64, String>::new();
    for message in messages.iter_mut() {
        if message.sender_user_id > 0 {
            let name = names
                .entry(message.sender_user_id)
                .or_insert_with(|| profile_display_name(db, message.sender_user_id))
                .clone();
            message.sender_name = name;
        }
        if message.reply_to_message_id > 0 {
            if let Ok((sender, text, deleted)) = db.query_row(
                "SELECT sender_user_id, message, deleted_at
                 FROM group_messages
                 WHERE id = ?1 AND group_id = ?2",
                rusqlite::params![message.reply_to_message_id, group_id],
                |row| Ok((row.get::<_, i64>(0)?, row.get::<_, String>(1)?, row.get::<_, i64>(2)?)),
            ) {
                message.reply_sender_user_id = sender;
                message.reply_message = if deleted > 0 {
                    "__deleted__".to_string()
                } else {
                    text
                };
            }
        }
    }
    let ids: Vec<i64> = messages.iter().map(|m| m.id).collect();
    if ids.is_empty() {
        return;
    }
    let placeholders = ids.iter().map(|_| "?").collect::<Vec<_>>().join(",");
    let sql = format!(
        "SELECT message_id, emoji, user_id FROM group_message_reactions WHERE message_id IN ({placeholders})"
    );
    let mut stmt = match db.prepare(&sql) {
        Ok(stmt) => stmt,
        Err(_) => return,
    };
    let params = rusqlite::params_from_iter(ids.iter());
    let rows = match stmt.query_map(params, |row| {
        Ok((row.get::<_, i64>(0)?, row.get::<_, String>(1)?, row.get::<_, i64>(2)?))
    }) {
        Ok(rows) => rows.filter_map(Result::ok).collect::<Vec<_>>(),
        Err(_) => return,
    };
    let mut grouped: std::collections::HashMap<(i64, String), (i64, bool)> =
        std::collections::HashMap::new();
    for (message_id, emoji, user_id) in rows {
        let entry = grouped.entry((message_id, emoji)).or_insert((0, false));
        entry.0 += 1;
        if user_id == viewer_user_id {
            entry.1 = true;
        }
    }
    for message in messages.iter_mut() {
        message.reactions = grouped
            .iter()
            .filter(|((id, _), _)| *id == message.id)
            .map(|((_, emoji), (count, mine))| crate::web::view_models::ChatReactionRow {
                emoji: emoji.clone(),
                count: *count,
                mine: *mine,
            })
            .collect();
    }
}

fn mark_group_notifications_read(db: &rusqlite::Connection, user_id: i64, group_id: i64) {
    if user_id <= 0 || group_id <= 0 {
        return;
    }
    let _ = db.execute(
        "UPDATE user_notifications
         SET is_read = 1
         WHERE user_id = ?1
           AND kind = 'group_message'
           AND is_read = 0
           AND resource_id = ?2",
        rusqlite::params![user_id, group_id],
    );
}

fn mark_group_read(
    state: Option<&AppState>,
    db: &rusqlite::Connection,
    group_id: i64,
    user_id: i64,
    through_id: i64,
) {
    if group_id <= 0 || user_id <= 0 || through_id <= 0 {
        return;
    }
    let previous: i64 = db
        .query_row(
            "SELECT COALESCE(last_read_message_id, 0)
             FROM chat_group_members
             WHERE group_id = ?1 AND user_id = ?2",
            rusqlite::params![group_id, user_id],
            |row| row.get(0),
        )
        .unwrap_or(0);
    let changed = db
        .execute(
            "UPDATE chat_group_members
             SET last_read_message_id = CASE
                    WHEN COALESCE(last_read_message_id, 0) > ?3 THEN last_read_message_id
                    ELSE ?3
                 END
             WHERE group_id = ?1 AND user_id = ?2",
            rusqlite::params![group_id, user_id, through_id],
        )
        .unwrap_or(0);
    mark_group_notifications_read(db, user_id, group_id);
    if changed > 0 && through_id > previous {
        if let Some(state) = state {
            let members = group_member_ids(db, group_id);
            state.publish_group_chat_event("message.read", group_id, through_id, &members);
        }
    }
}

fn map_group_message_row(
    row: &rusqlite::Row<'_>,
) -> rusqlite::Result<crate::web::view_models::ChatMessageRow> {
            let deleted_at: i64 = row.get(5)?;
            let attachment_kind: String = row.get(6)?;
            let attachment_path: String = row.get(7)?;
            let client_message_id: String = row.get(8)?;
            let message_id: i64 = row.get(0)?;
            Ok(crate::web::view_models::ChatMessageRow {
                id: message_id,
                sender_user_id: row.get(1)?,
                message: row.get(2)?,
                is_read: 0,
                created_at: row.get(3)?,
                delivered_at: 0,
                read_at: 0,
                reply_to_message_id: row.get(9)?,
                reply_sender_user_id: 0,
                reply_message: String::new(),
                edited_at: row.get(4)?,
                deleted_at,
                attachment_kind: attachment_kind.clone(),
                attachment_url: if deleted_at == 0
                    && (attachment_kind == "image" || attachment_kind == "voice")
                    && !attachment_path.is_empty()
                {
                    format!("/api/group/media/{message_id}")
                } else {
                    String::new()
                },
                reactions: Vec::new(),
                sender_name: String::new(),
                client_message_id,
            })
}

fn message_json(message: &crate::web::view_models::ChatMessageRow, viewer_user_id: i64) -> serde_json::Value {
    json!({
        "id": message.id,
        "sender_user_id": message.sender_user_id.to_string(),
        "message": message.message,
        "is_mine": message.sender_user_id == viewer_user_id,
        "delivered_at": message.delivered_at,
        "read_at": message.read_at,
        "created_at": message.created_at,
        "reply_to_message_id": if message.reply_to_message_id > 0 { Some(message.reply_to_message_id) } else { None::<i64> },
        "reply_sender_user_id": if message.reply_sender_user_id > 0 { Some(message.reply_sender_user_id) } else { None::<i64> },
        "reply_message": message.reply_message,
        "edited_at": message.edited_at,
        "deleted_at": message.deleted_at,
        "client_message_id": message.client_message_id,
        "attachment_kind": message.attachment_kind,
        "attachment_url": message.attachment_url,
        "sender_name": message.sender_name,
        "reactions": message.reactions.iter().map(|reaction| json!({
            "emoji": reaction.emoji,
            "count": reaction.count,
            "mine": reaction.mine,
        })).collect::<Vec<_>>(),
    })
}

pub async fn new_group_page(State(state): State<AppState>, headers: HeaderMap) -> Html<String> {
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Html(templates::render_new_group(false, vec![], "")),
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return Html("<h1>503</h1><p>База данных временно недоступна.</p>".to_string());
        }
    };
    let partners = partners_for_picker(&db, user_id);
    Html(templates::render_new_group(true, partners, ""))
}

pub async fn create_group(
    State(state): State<AppState>,
    headers: HeaderMap,
    Form(form): Form<CreateGroupForm>,
) -> Response {
    if request_is_cross_site(&headers) {
        return Redirect::to("/app/groups/new").into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Redirect::to("/login?next=/app/groups/new").into_response(),
    };
    let name = form.name.trim();
    if !input_text_is_valid(name, 1, 80) {
        let db = crate::db::pool::get_connection(&state.db_pool).ok();
        let partners = db
            .as_ref()
            .map(|db| partners_for_picker(db, user_id))
            .unwrap_or_default();
        return Html(templates::render_new_group(
            true,
            partners,
            "Название группы нужно от 1 до 80 знаков.",
        ))
        .into_response();
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Redirect::to("/app/groups/new").into_response(),
    };
    let allowed: std::collections::HashSet<i64> = partners_for_picker(&db, user_id)
        .into_iter()
        .map(|(id, _)| id)
        .collect();
    let mut members: Vec<i64> = form
        .member_ids
        .split(',')
        .filter_map(|value| value.trim().parse::<i64>().ok())
        .filter(|id| *id > 0 && *id != user_id && allowed.contains(id))
        .collect();
    members.sort_unstable();
    members.dedup();
    members.insert(0, user_id);

    let now = unix_now();
    let tx = match db.unchecked_transaction() {
        Ok(tx) => tx,
        Err(_) => return Redirect::to("/app/groups/new").into_response(),
    };
    if tx
        .execute(
            "INSERT INTO chat_groups (name, created_by, created_at) VALUES (?1, ?2, ?3)",
            rusqlite::params![name, user_id, now],
        )
        .is_err()
    {
        return Redirect::to("/app/groups/new").into_response();
    }
    let group_id = tx.last_insert_rowid();
    for member in &members {
        let _ = tx.execute(
            "INSERT OR IGNORE INTO chat_group_members (group_id, user_id, joined_at)
             VALUES (?1, ?2, ?3)",
            rusqlite::params![group_id, member, now],
        );
    }
    if tx.commit().is_err() {
        return Redirect::to("/app/groups/new").into_response();
    }
    Redirect::to(&format!("/app/group/{group_id}")).into_response()
}

pub async fn group_chat_page(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
) -> Html<String> {
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => {
            return Html(templates::render_group_chat(
                false,
                0,
                group_id,
                "Группа",
                0,
                vec![],
            ));
        }
    };
    if group_id <= 0 {
        return Html(templates::render_group_chat(true, user_id, 0, "", 0, vec![]));
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return Html("<h1>503</h1><p>База данных временно недоступна.</p>".to_string());
        }
    };
    if !is_member(&db, group_id, user_id) {
        return Html(templates::render_group_chat(
            true,
            user_id,
            0,
            "Нет доступа",
            0,
            vec![],
        ));
    }
    let name: String = db
        .query_row(
            "SELECT name FROM chat_groups WHERE id = ?1",
            rusqlite::params![group_id],
            |row| row.get(0),
        )
        .unwrap_or_else(|_| "Группа".to_string());
    let member_count: i64 = db
        .query_row(
            "SELECT COUNT(*) FROM chat_group_members WHERE group_id = ?1",
            rusqlite::params![group_id],
            |row| row.get(0),
        )
        .unwrap_or(0);
    let messages = load_group_messages(&db, group_id, user_id, 0, 0, 100);
    if let Some(last) = messages.last() {
        mark_group_read(Some(&state), &db, group_id, user_id, last.id);
    } else {
        mark_group_notifications_read(&db, user_id, group_id);
    }
    Html(templates::render_group_chat(
        true,
        user_id,
        group_id,
        &name,
        member_count,
        messages,
    ))
}

pub async fn api_group_messages(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
    axum::extract::Query(query): axum::extract::Query<std::collections::HashMap<String, String>>,
) -> Response {
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    if group_id <= 0 || !is_member(&db, group_id, user_id) {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    }
    let after_id = query
        .get("after_id")
        .and_then(|v| v.parse::<i64>().ok())
        .unwrap_or(0);
    let before_id = query
        .get("before_id")
        .and_then(|v| v.parse::<i64>().ok())
        .unwrap_or(0);
    let limit = query
        .get("limit")
        .and_then(|v| v.parse::<i64>().ok())
        .unwrap_or(50)
        .clamp(1, 100);
    let mark_read = query.get("mark_read").map(|v| v == "1").unwrap_or(false);
    let read_through = query
        .get("read_through_id")
        .and_then(|v| v.parse::<i64>().ok())
        .unwrap_or(0);
    let fetch_limit = limit.saturating_add(1);
    let mut messages = load_group_messages(&db, group_id, user_id, after_id, before_id, fetch_limit);
    let has_more = messages.len() as i64 > limit;
    if has_more {
        if before_id > 0 || after_id <= 0 {
            // ASC pages where the extra row is the oldest (first).
            messages.remove(0);
        } else {
            // after_id ASC: extra row is the newest (last).
            messages.truncate(limit as usize);
        }
    }
    if mark_read {
        let through = read_through.max(messages.last().map(|m| m.id).unwrap_or(0));
        mark_group_read(Some(&state), &db, group_id, user_id, through);
    }
    let items: Vec<serde_json::Value> = messages
        .iter()
        .map(|message| message_json(message, user_id))
        .collect();
    let peer_read_through_id = group_peer_read_through(&db, group_id, user_id);
    Json(json!({
        "ok": true,
        "messages": items,
        "has_more": has_more,
        "peer_read_through_id": peer_read_through_id,
    }))
    .into_response()
}

#[derive(Debug, Deserialize)]
pub(crate) struct GroupSendPayload {
    message: String,
    #[serde(default)]
    client_message_id: String,
    #[serde(default)]
    reply_to_message_id: i64,
}

pub async fn api_group_send(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
    Json(payload): Json<GroupSendPayload>,
) -> Response {
    if request_is_cross_site(&headers) {
        return json_error(StatusCode::FORBIDDEN, "cross_site_request_rejected");
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    let message = payload.message.trim();
    if !input_text_is_valid(message, 1, 2000) {
        return json_error(StatusCode::BAD_REQUEST, "invalid_message");
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    if group_id <= 0 || !is_member(&db, group_id, user_id) {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    }
    if payload.reply_to_message_id > 0
        && db
            .query_row(
                "SELECT 1 FROM group_messages
                 WHERE id = ?1 AND group_id = ?2 AND deleted_at = 0",
                rusqlite::params![payload.reply_to_message_id, group_id],
                |_| Ok(()),
            )
            .is_err()
    {
        return json_error(StatusCode::BAD_REQUEST, "invalid_reply");
    }
    let client_message_id = payload.client_message_id.trim().to_string();
    if !client_message_id.is_empty() && !client_message_id_ok(&client_message_id) {
        return json_error(StatusCode::BAD_REQUEST, "invalid_client_message_id");
    }
    let now = unix_now();
    if !client_message_id.is_empty() {
        if let Some(existing) =
            find_group_message_by_client_id(&db, group_id, user_id, &client_message_id)
        {
            return Json(json!({
                "ok": true,
                "message": message_json(&existing, user_id),
                "deduped": true
            }))
            .into_response();
        }
    }
    if db
        .execute(
            "INSERT INTO group_messages (
                group_id, sender_user_id, message, created_at, client_message_id, reply_to_message_id
             ) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
            rusqlite::params![
                group_id,
                user_id,
                message,
                now,
                client_message_id,
                payload.reply_to_message_id.max(0)
            ],
        )
        .is_err()
    {
        if !client_message_id.is_empty() {
            if let Some(existing) =
                find_group_message_by_client_id(&db, group_id, user_id, &client_message_id)
            {
                return Json(json!({
                    "ok": true,
                    "message": message_json(&existing, user_id),
                    "deduped": true
                }))
                .into_response();
            }
        }
        return json_error(StatusCode::INTERNAL_SERVER_ERROR, "message_store_failed");
    }
    let message_id = db.last_insert_rowid();
    fanout_group_message(
        &state,
        &db,
        "message.created",
        group_id,
        message_id,
        user_id,
        message,
    );
    let loaded = load_group_messages(&db, group_id, user_id, message_id - 1, 0, 1);
    let item = loaded
        .first()
        .map(|row| message_json(row, user_id))
        .unwrap_or(json!({
            "id": message_id,
            "sender_user_id": user_id.to_string(),
            "message": message,
            "is_mine": true,
            "created_at": now,
            "client_message_id": client_message_id,
            "attachment_kind": "",
            "attachment_url": "",
        }));
    Json(json!({"ok": true, "message": item})).into_response()
}

pub async fn api_group_send_image(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
    mut multipart: Multipart,
) -> Response {
    if request_is_cross_site(&headers) {
        return json_error(StatusCode::FORBIDDEN, "cross_site_request_rejected");
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    if group_id <= 0 || !is_member(&db, group_id, user_id) {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    }
    let mut caption = String::new();
    let mut client_message_id = String::new();
    let mut file_bytes: Option<Vec<u8>> = None;
    while let Ok(Some(field)) = multipart.next_field().await {
        let name = field.name().unwrap_or("").to_string();
        match name.as_str() {
            "caption" | "message" => {
                if let Ok(text) = field.text().await {
                    caption = text.trim().to_string();
                }
            }
            "client_message_id" => {
                if let Ok(text) = field.text().await {
                    client_message_id = text.trim().to_string();
                }
            }
            "image" | "file" => {
                if let Ok(bytes) = field.bytes().await {
                    file_bytes = Some(bytes.to_vec());
                }
            }
            _ => {}
        }
    }
    let Some(bytes) = file_bytes else {
        return json_error(StatusCode::BAD_REQUEST, "image_required");
    };
    if !client_message_id.is_empty() && !client_message_id_ok(&client_message_id) {
        return json_error(StatusCode::BAD_REQUEST, "invalid_client_message_id");
    }
    if !client_message_id.is_empty() {
        if let Some(existing) =
            find_group_message_by_client_id(&db, group_id, user_id, &client_message_id)
        {
            return Json(json!({
                "ok": true,
                "message": message_json(&existing, user_id),
                "deduped": true
            }))
            .into_response();
        }
    }
    if bytes.len() > 8 * 1024 * 1024 {
        return json_error(StatusCode::PAYLOAD_TOO_LARGE, "image_too_large");
    }
    let Some((_, mime)) = detect_image(&bytes) else {
        return json_error(StatusCode::BAD_REQUEST, "unsupported_image");
    };
    let ext = extension_for_mime(mime);
    let unique = format!(
        "{}-{}",
        unix_now(),
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|duration| duration.as_nanos())
            .unwrap_or_default()
    );
    let relative = format!("groups/{group_id}/{user_id}-{unique}.{ext}");
    let absolute = media_root().join(&relative);
    if let Some(parent) = absolute.parent() {
        let _ = fs::create_dir_all(parent);
    }
    match fs::File::create(&absolute) {
        Ok(mut file) => {
            if file.write_all(&bytes).is_err() {
                let _ = fs::remove_file(&absolute);
                return json_error(StatusCode::INTERNAL_SERVER_ERROR, "media_store_failed");
            }
        }
        Err(_) => return json_error(StatusCode::INTERNAL_SERVER_ERROR, "media_store_failed"),
    }
    let now = unix_now();
    if db
        .execute(
            "INSERT INTO group_messages (
                group_id, sender_user_id, message, created_at, client_message_id,
                attachment_kind, attachment_path, attachment_mime, attachment_size
             ) VALUES (?1, ?2, ?3, ?4, ?5, 'image', ?6, ?7, ?8)",
            rusqlite::params![
                group_id,
                user_id,
                caption,
                now,
                client_message_id,
                relative,
                mime,
                bytes.len() as i64
            ],
        )
        .is_err()
    {
        let _ = fs::remove_file(&absolute);
        return json_error(StatusCode::INTERNAL_SERVER_ERROR, "message_store_failed");
    }
    let message_id = db.last_insert_rowid();
    fanout_group_message(
        &state,
        &db,
        "message.created",
        group_id,
        message_id,
        user_id,
        if caption.is_empty() { "Фото" } else { caption.as_str() },
    );
    Json(json!({
        "ok": true,
        "message": {
            "id": message_id,
            "sender_user_id": user_id.to_string(),
            "message": caption,
            "is_mine": true,
            "created_at": now,
            "sender_name": profile_display_name(&db, user_id),
            "attachment_kind": "image",
            "attachment_url": format!("/api/group/media/{message_id}"),
        }
    }))
    .into_response()
}

pub async fn api_group_media(
    State(state): State<AppState>,
    Path(message_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    let row: Option<(i64, String, String, i64)> = db
        .query_row(
            "SELECT group_id, attachment_path, attachment_mime, deleted_at
             FROM group_messages WHERE id = ?1",
            rusqlite::params![message_id],
            |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?)),
        )
        .ok();
    let Some((group_id, path, mime, deleted_at)) = row else {
        return json_error(StatusCode::NOT_FOUND, "not_found");
    };
    if deleted_at > 0 || !is_member(&db, group_id, user_id) {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    }
    if path.is_empty() || path.contains("..") {
        return json_error(StatusCode::NOT_FOUND, "not_found");
    }
    let absolute = media_root().join(&path);
    let bytes = match fs::read(&absolute) {
        Ok(bytes) => bytes,
        Err(_) => return json_error(StatusCode::NOT_FOUND, "not_found"),
    };
    let content_type = if mime.is_empty() {
        "application/octet-stream"
    } else {
        mime.as_str()
    };
    (
        [
            (
                header::CONTENT_TYPE,
                HeaderValue::from_str(content_type)
                    .unwrap_or_else(|_| HeaderValue::from_static("application/octet-stream")),
            ),
            (
                header::CACHE_CONTROL,
                HeaderValue::from_static("private, max-age=3600"),
            ),
        ],
        bytes,
    )
        .into_response()
}

pub async fn api_group_send_voice(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
    mut multipart: Multipart,
) -> Response {
    if request_is_cross_site(&headers) {
        return json_error(StatusCode::FORBIDDEN, "cross_site_request_rejected");
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    if group_id <= 0 || !is_member(&db, group_id, user_id) {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    }
    let mut client_message_id = String::new();
    let mut file_bytes: Option<Vec<u8>> = None;
    while let Ok(Some(field)) = multipart.next_field().await {
        let name = field.name().unwrap_or("").to_string();
        match name.as_str() {
            "client_message_id" => {
                if let Ok(text) = field.text().await {
                    client_message_id = text.trim().to_string();
                }
            }
            "voice" | "audio" | "file" => {
                if let Ok(bytes) = field.bytes().await {
                    file_bytes = Some(bytes.to_vec());
                }
            }
            _ => {}
        }
    }
    let Some(bytes) = file_bytes else {
        return json_error(StatusCode::BAD_REQUEST, "voice_required");
    };
    if !client_message_id.is_empty() && !client_message_id_ok(&client_message_id) {
        return json_error(StatusCode::BAD_REQUEST, "invalid_client_message_id");
    }
    if !client_message_id.is_empty() {
        if let Some(existing) =
            find_group_message_by_client_id(&db, group_id, user_id, &client_message_id)
        {
            return Json(json!({
                "ok": true,
                "message": message_json(&existing, user_id),
                "deduped": true
            }))
            .into_response();
        }
    }
    if bytes.len() > 512 * 1024 {
        return json_error(StatusCode::BAD_REQUEST, "voice_too_large");
    }
    let Some((_, mime)) = detect_audio(&bytes) else {
        return json_error(StatusCode::BAD_REQUEST, "unsupported_voice");
    };
    let ext = extension_for_mime(mime);
    let unique = format!(
        "{}-{}",
        unix_now(),
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|duration| duration.as_nanos())
            .unwrap_or_default()
    );
    let relative = format!("groups/{group_id}/{user_id}-voice-{unique}.{ext}");
    let absolute = media_root().join(&relative);
    if let Some(parent) = absolute.parent() {
        let _ = fs::create_dir_all(parent);
    }
    if fs::write(&absolute, &bytes).is_err() {
        return json_error(StatusCode::INTERNAL_SERVER_ERROR, "media_store_failed");
    }
    let now = unix_now();
    if db
        .execute(
            "INSERT INTO group_messages (
                group_id, sender_user_id, message, created_at, client_message_id,
                attachment_kind, attachment_path, attachment_mime, attachment_size
             ) VALUES (?1, ?2, '', ?3, ?4, 'voice', ?5, ?6, ?7)",
            rusqlite::params![
                group_id,
                user_id,
                now,
                client_message_id,
                relative,
                mime,
                bytes.len() as i64
            ],
        )
        .is_err()
    {
        let _ = fs::remove_file(&absolute);
        return json_error(StatusCode::INTERNAL_SERVER_ERROR, "message_store_failed");
    }
    let message_id = db.last_insert_rowid();
    fanout_group_message(
        &state,
        &db,
        "message.created",
        group_id,
        message_id,
        user_id,
        "Голосовое",
    );
    Json(json!({
        "ok": true,
        "message": {
            "id": message_id,
            "sender_user_id": user_id.to_string(),
            "message": "",
            "is_mine": true,
            "created_at": now,
            "sender_name": profile_display_name(&db, user_id),
            "attachment_kind": "voice",
            "attachment_url": format!("/api/group/media/{message_id}"),
        }
    }))
    .into_response()
}

pub async fn api_group_edit(
    State(state): State<AppState>,
    Path((group_id, message_id)): Path<(i64, i64)>,
    headers: HeaderMap,
    Json(payload): Json<super::chat_api::ChatEditPayload>,
) -> Response {
    if request_is_cross_site(&headers) {
        return json_error(StatusCode::FORBIDDEN, "cross_site_request_rejected");
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    let text = payload.message.trim();
    if !message_is_valid(text) {
        return json_error(StatusCode::BAD_REQUEST, "invalid_message");
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    if group_id <= 0 || !is_member(&db, group_id, user_id) {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    }
    let row: Option<(i64, i64)> = db
        .query_row(
            "SELECT created_at, deleted_at FROM group_messages
             WHERE id = ?1 AND group_id = ?2 AND sender_user_id = ?3",
            rusqlite::params![message_id, group_id, user_id],
            |row| Ok((row.get(0)?, row.get(1)?)),
        )
        .ok();
    let Some((created_at, deleted_at)) = row else {
        return json_error(StatusCode::NOT_FOUND, "message_not_found");
    };
    let now = unix_now();
    if !message_can_be_edited(created_at, deleted_at, now) {
        return json_error(StatusCode::CONFLICT, "message_not_editable");
    }
    if db
        .execute(
            "UPDATE group_messages SET message = ?1, edited_at = ?2
             WHERE id = ?3 AND group_id = ?4 AND sender_user_id = ?5 AND deleted_at = 0",
            rusqlite::params![text, now, message_id, group_id, user_id],
        )
        .unwrap_or(0)
        != 1
    {
        return json_error(StatusCode::CONFLICT, "message_changed");
    }
    fanout_group_message(&state, &db, "message.updated", group_id, message_id, user_id, text);
    Json(json!({"ok": true, "message_id": message_id, "message": text, "edited_at": now}))
        .into_response()
}

pub async fn api_group_delete(
    State(state): State<AppState>,
    Path((group_id, message_id)): Path<(i64, i64)>,
    headers: HeaderMap,
) -> Response {
    if request_is_cross_site(&headers) {
        return json_error(StatusCode::FORBIDDEN, "cross_site_request_rejected");
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    if group_id <= 0 || !is_member(&db, group_id, user_id) {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    }
    let now = unix_now();
    if db
        .execute(
            "UPDATE group_messages SET deleted_at = ?1, message = ''
             WHERE id = ?2 AND group_id = ?3 AND sender_user_id = ?4 AND deleted_at = 0",
            rusqlite::params![now, message_id, group_id, user_id],
        )
        .unwrap_or(0)
        != 1
    {
        return json_error(StatusCode::NOT_FOUND, "message_not_found");
    }
    fanout_group_message(
        &state,
        &db,
        "message.deleted",
        group_id,
        message_id,
        user_id,
        "__deleted__",
    );
    Json(json!({"ok": true, "deleted_at": now})).into_response()
}

pub async fn api_group_react(
    State(state): State<AppState>,
    Path((group_id, message_id)): Path<(i64, i64)>,
    headers: HeaderMap,
    Json(payload): Json<super::chat_api::ChatReactPayload>,
) -> Response {
    if request_is_cross_site(&headers) {
        return json_error(StatusCode::FORBIDDEN, "cross_site_request_rejected");
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return json_error(StatusCode::UNAUTHORIZED, "login_required"),
    };
    let emoji = payload.emoji.trim();
    if !reaction_emoji_is_allowed(emoji) {
        return json_error(StatusCode::BAD_REQUEST, "invalid_reaction");
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    if group_id <= 0 || !is_member(&db, group_id, user_id) {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    }
    let exists: i64 = db
        .query_row(
            "SELECT COUNT(*) FROM group_messages WHERE id = ?1 AND group_id = ?2 AND deleted_at = 0",
            rusqlite::params![message_id, group_id],
            |row| row.get(0),
        )
        .unwrap_or(0);
    if exists == 0 {
        return json_error(StatusCode::NOT_FOUND, "message_not_found");
    }
    let existing: Option<String> = db
        .query_row(
            "SELECT emoji FROM group_message_reactions WHERE message_id = ?1 AND user_id = ?2",
            rusqlite::params![message_id, user_id],
            |row| row.get(0),
        )
        .ok();
    if existing.as_deref() == Some(emoji) {
        let _ = db.execute(
            "DELETE FROM group_message_reactions WHERE message_id = ?1 AND user_id = ?2",
            rusqlite::params![message_id, user_id],
        );
    } else {
        let _ = db.execute(
            "INSERT INTO group_message_reactions (message_id, user_id, emoji, created_at)
             VALUES (?1, ?2, ?3, ?4)
             ON CONFLICT(message_id, user_id) DO UPDATE SET emoji = excluded.emoji, created_at = excluded.created_at",
            rusqlite::params![message_id, user_id, emoji, unix_now()],
        );
    }
    let mut loaded = load_group_messages(&db, group_id, user_id, message_id - 1, 0, 1);
    let reactions = loaded
        .pop()
        .map(|m| m.reactions)
        .unwrap_or_default();
    fanout_group_message(
        &state,
        &db,
        "message.updated",
        group_id,
        message_id,
        user_id,
        "",
    );
    Json(json!({
        "ok": true,
        "reactions": reactions.iter().map(|r| json!({"emoji": r.emoji, "count": r.count, "mine": r.mine})).collect::<Vec<_>>()
    }))
    .into_response()
}

#[derive(Debug, Deserialize)]
pub(crate) struct GroupMembersForm {
    #[serde(default)]
    member_ids: String,
}

pub async fn group_members_page(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
) -> Html<String> {
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Html(templates::render_group_members(false, 0, "", vec![], vec![], "")),
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Html("<h1>503</h1><p>База данных временно недоступна.</p>".to_string()),
    };
    if group_id <= 0 || !is_member(&db, group_id, user_id) {
        return Html(templates::render_group_members(true, group_id, "Группа", vec![], vec![], "Нет доступа"));
    }
    let name: String = db
        .query_row(
            "SELECT name FROM chat_groups WHERE id = ?1",
            rusqlite::params![group_id],
            |row| row.get(0),
        )
        .unwrap_or_else(|_| "Группа".to_string());
    let members = load_group_member_names(&db, group_id);
    let current: std::collections::HashSet<i64> = members.iter().map(|(id, _)| *id).collect();
    let candidates = partners_for_picker(&db, user_id)
        .into_iter()
        .filter(|(id, _)| !current.contains(id))
        .collect();
    Html(templates::render_group_members(true, group_id, &name, members, candidates, ""))
}

pub async fn add_group_members(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
    Form(form): Form<GroupMembersForm>,
) -> Response {
    if request_is_cross_site(&headers) {
        return Redirect::to(&format!("/app/group/{group_id}/members")).into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Redirect::to("/login?next=/app/messages").into_response(),
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Redirect::to("/app/messages").into_response(),
    };
    if group_id <= 0 || !is_member(&db, group_id, user_id) {
        return Redirect::to("/app/messages").into_response();
    }
    let allowed: std::collections::HashSet<i64> = partners_for_picker(&db, user_id)
        .into_iter()
        .map(|(id, _)| id)
        .collect();
    let now = unix_now();
    for member in form.member_ids.split(',') {
        if let Ok(id) = member.trim().parse::<i64>() {
            if id > 0 && id != user_id && allowed.contains(&id) {
                let _ = db.execute(
                    "INSERT OR IGNORE INTO chat_group_members (group_id, user_id, joined_at)
                     VALUES (?1, ?2, ?3)",
                    rusqlite::params![group_id, id, now],
                );
            }
        }
    }
    Redirect::to(&format!("/app/group/{group_id}")).into_response()
}

pub async fn leave_group(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    if request_is_cross_site(&headers) {
        return Redirect::to("/app/messages").into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Redirect::to("/login?next=/app/messages").into_response(),
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Redirect::to("/app/messages").into_response(),
    };
    let _ = db.execute(
        "DELETE FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
        rusqlite::params![group_id, user_id],
    );
    Redirect::to("/app/messages").into_response()
}

fn load_group_member_names(
    db: &rusqlite::Connection,
    group_id: i64,
) -> Vec<(i64, String)> {
    db.prepare(
        "SELECT user_id FROM chat_group_members WHERE group_id = ?1 ORDER BY joined_at ASC",
    )
    .and_then(|mut stmt| {
        stmt.query_map(rusqlite::params![group_id], |row| row.get(0))?
            .collect::<Result<Vec<i64>, _>>()
    })
    .unwrap_or_default()
    .into_iter()
    .map(|id| (id, profile_display_name(db, id)))
    .collect()
}

pub fn load_user_groups(
    db: &rusqlite::Connection,
    user_id: i64,
) -> Vec<crate::web::view_models::ConversationRow> {
    db.prepare(
        "SELECT
            g.id,
            g.name,
            COALESCE((
                SELECT CASE
                    WHEN m.deleted_at > 0 THEN '__deleted__'
                    WHEN m.attachment_kind = 'image' THEN 'Фото'
                    ELSE m.message
                END
                FROM group_messages m
                WHERE m.group_id = g.id
                ORDER BY m.id DESC
                LIMIT 1
            ), ''),
            COALESCE((
                SELECT m.created_at
                FROM group_messages m
                WHERE m.group_id = g.id
                ORDER BY m.id DESC
                LIMIT 1
            ), g.created_at),
            (
                SELECT COUNT(*)
                FROM group_messages m
                WHERE m.group_id = g.id
                  AND m.sender_user_id <> ?1
                  AND m.deleted_at = 0
                  AND m.id > COALESCE(mem.last_read_message_id, 0)
            )
         FROM chat_groups g
         JOIN chat_group_members mem
           ON mem.group_id = g.id
          AND mem.user_id = ?1
         ORDER BY 4 DESC
         LIMIT 100",
    )
    .and_then(|mut stmt| {
        stmt.query_map(rusqlite::params![user_id], |row| {
            Ok(crate::web::view_models::ConversationRow {
                _id: row.get(0)?,
                other_user_id: 0,
                username: String::new(),
                first_name: row.get(1)?,
                last_name: String::new(),
                last_message: row.get(2)?,
                unread_count: row.get(4)?,
                updated_at: row.get(3)?,
                is_group: true,
                group_id: row.get(0)?,
                has_avatar: false,
            })
        })?
        .collect::<Result<Vec<_>, _>>()
    })
    .unwrap_or_default()
}
