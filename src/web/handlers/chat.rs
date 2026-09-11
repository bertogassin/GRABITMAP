use super::auth::verify_user_session;
use super::chat_identity::{active_public_id_by_user_id, active_user_id_by_chat_route};
use crate::state::app_state::AppState;
use crate::web::templates;
use axum::{
    extract::{Path, Query, State},
    http::HeaderMap,
    response::Html,
};

fn optional_i64(row: &rusqlite::Row<'_>, index: usize) -> rusqlite::Result<i64> {
    Ok(row.get::<_, Option<i64>>(index)?.unwrap_or(0))
}

fn load_recent_chat_messages(
    db: &rusqlite::Connection,
    conversation_id: i64,
) -> Vec<crate::web::view_models::ChatMessageRow> {
    if conversation_id <= 0 {
        return Vec::new();
    }

    match db
        .prepare(
            "SELECT
                messages.id,
                messages.sender_user_id,
                messages.message,
                COALESCE(messages.is_read, 0),
                COALESCE(messages.created_at, 0),
                COALESCE(messages.delivered_at, 0),
                COALESCE(messages.read_at, 0),
                COALESCE(messages.reply_to_message_id, 0),
                (
                    SELECT reply.sender_user_id
                    FROM messages AS reply
                    WHERE reply.id =
                        messages.reply_to_message_id
                      AND reply.conversation_id =
                        messages.conversation_id
                ),
                COALESCE((
                    SELECT CASE
                        WHEN reply.deleted_at > 0
                        THEN '__deleted__'
                        ELSE reply.message
                    END
                    FROM messages AS reply
                    WHERE reply.id =
                        messages.reply_to_message_id
                      AND reply.conversation_id =
                        messages.conversation_id
                ), ''),
                COALESCE(messages.edited_at, 0),
                COALESCE(messages.deleted_at, 0),
                COALESCE(messages.attachment_kind, ''),
                COALESCE(messages.attachment_path, ''),
                COALESCE(messages.client_message_id, '')
             FROM (
                SELECT id
                FROM messages
                WHERE conversation_id = ?1
                ORDER BY id DESC
                LIMIT 100
             ) AS recent
             INNER JOIN messages
               ON messages.id = recent.id
             ORDER BY messages.id ASC",
        )
        .and_then(|mut stmt| {
            stmt.query_map(rusqlite::params![conversation_id], |row| {
                let deleted_at = optional_i64(row, 11)?;
                let attachment_kind: String = row.get(12)?;
                let attachment_path: String = row.get(13)?;
                let message_id: i64 = row.get(0)?;

                Ok(crate::web::view_models::ChatMessageRow {
                    id: message_id,
                    sender_user_id: row.get(1)?,
                    message: row.get(2)?,
                    is_read: optional_i64(row, 3)?,
                    created_at: optional_i64(row, 4)?,
                    delivered_at: optional_i64(row, 5)?,
                    read_at: optional_i64(row, 6)?,
                    reply_to_message_id: optional_i64(row, 7)?,
                    reply_sender_user_id: optional_i64(row, 8)?,
                    reply_sender_name: String::new(),
                    reply_message: row.get(9)?,
                    edited_at: optional_i64(row, 10)?,
                    deleted_at,
                    attachment_kind: attachment_kind.clone(),
                    attachment_url: if deleted_at == 0
                        && (attachment_kind == "image" || attachment_kind == "voice")
                        && !attachment_path.is_empty()
                    {
                        format!("/api/chat/media/{message_id}")
                    } else {
                        String::new()
                    },
                    reactions: Vec::new(),
                    sender_name: String::new(),
                    client_message_id: row.get(14)?,
                })
            })?
            .collect::<Result<Vec<_>, _>>()
        }) {
        Ok(messages) => messages,
        Err(error) => {
            eprintln!("chat page history failed for conversation {conversation_id}: {error}");
            Vec::new()
        }
    }
}

pub(super) fn mark_user_messages_delivered(db: &rusqlite::Connection, user_id: i64) -> usize {
    if user_id <= 0 {
        return 0;
    }

    db.execute(
        "UPDATE messages
         SET delivered_at = strftime('%s','now')
         WHERE delivered_at = 0
           AND sender_user_id <> ?1
           AND conversation_id IN (
               SELECT id
               FROM conversations
               WHERE user1_id = ?1 OR user2_id = ?1
           )",
        rusqlite::params![user_id],
    )
    .unwrap_or(0)
}

pub(super) fn load_user_conversations(
    db: &rusqlite::Connection,
    user_id: i64,
) -> Vec<crate::web::view_models::ConversationRow> {
    db.prepare(
        "SELECT
            c.id,

            CASE
                WHEN c.user1_id = ?1
                THEN c.user2_id
                ELSE c.user1_id
            END AS other_user_id,

            COALESCE(p.public_id, ''),
            COALESCE(p.username, ''),
            COALESCE(p.first_name, ''),
            COALESCE(p.last_name, ''),

            COALESCE((
                SELECT CASE
                    WHEN m.deleted_at > 0
                    THEN '__deleted__'
                    WHEN m.attachment_kind = 'image' AND trim(m.message) = ''
                    THEN '__image__'
                    WHEN m.attachment_kind = 'voice'
                    THEN '__voice__'
                    ELSE m.message
                END
                FROM messages m
                WHERE m.conversation_id = c.id
                ORDER BY
                    m.created_at DESC,
                    m.id DESC
                LIMIT 1
            ), ''),

            (
                SELECT COUNT(*)
                FROM messages m
                WHERE m.conversation_id = c.id
                  AND m.sender_user_id <> ?1
                  AND m.is_read = 0
                  AND COALESCE(m.deleted_at, 0) = 0
            ) AS unread_count,

            c.updated_at,
            CASE WHEN trim(COALESCE(p.avatar_path, '')) <> '' THEN 1 ELSE 0 END,
            COALESCE(pref.pinned_at, 0),
            COALESCE(pref.archived_at, 0),
            COALESCE(pref.muted_until, 0)

         FROM conversations c

         LEFT JOIN profiles p
           ON p.user_id = CASE
                WHEN c.user1_id = ?1
                THEN c.user2_id
                ELSE c.user1_id
           END

         LEFT JOIN chat_preferences pref
           ON pref.user_id = ?1
          AND pref.chat_kind = 'direct'
          AND pref.target_id = CASE
                WHEN c.user1_id = ?1 THEN c.user2_id ELSE c.user1_id
              END

         WHERE c.user1_id = ?1
            OR c.user2_id = ?1

         ORDER BY
            c.updated_at DESC,
            c.id DESC

         LIMIT 200",
    )
    .and_then(|mut stmt| {
        stmt.query_map(rusqlite::params![user_id], |row| {
            Ok(crate::web::view_models::ConversationRow {
                _id: row.get(0)?,
                other_user_id: row.get(1)?,
                other_public_id: row.get(2)?,
                username: row.get(3)?,
                first_name: row.get(4)?,
                last_name: row.get(5)?,
                last_message: row.get(6)?,
                unread_count: row.get(7)?,
                updated_at: row.get(8)?,
                is_group: false,
                group_id: 0,
                has_avatar: row.get::<_, i64>(9)? != 0,
                pinned_at: row.get(10)?,
                archived_at: row.get(11)?,
                muted_until: row.get(12)?,
                group_scope_type: String::new(),
                group_scope_id: 0,
            })
        })?
        .collect::<Result<Vec<_>, _>>()
    })
    .unwrap_or_else(|_| vec![])
}

pub(super) fn organize_conversations(
    mut conversations: Vec<crate::web::view_models::ConversationRow>,
    archived: bool,
) -> Vec<crate::web::view_models::ConversationRow> {
    conversations.retain(|row| (row.archived_at > 0) == archived);
    conversations.sort_by(|left, right| {
        (right.pinned_at > 0)
            .cmp(&(left.pinned_at > 0))
            .then(right.pinned_at.cmp(&left.pinned_at))
            .then(right.updated_at.cmp(&left.updated_at))
            .then(right._id.cmp(&left._id))
    });
    conversations
}

pub async fn messages_page(
    State(state): State<AppState>,
    Query(params): Query<std::collections::BTreeMap<String, String>>,
    headers: HeaderMap,
) -> Html<String> {
    let share_listing_id = params
        .get("share")
        .and_then(|value| value.parse::<i64>().ok())
        .filter(|value| *value > 0);
    let archived = params.get("view").is_some_and(|value| value == "archived");
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,

        None => {
            return Html(templates::render_messages(false, "", vec![], None, false));
        }
    };

    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return Html("<h1>503</h1><p>База данных временно недоступна.</p>".to_string());
        }
    };

    mark_user_messages_delivered(&db, user_id);
    let mut conversations = load_user_conversations(&db, user_id);
    conversations.extend(super::groups::load_user_groups(&db, user_id));
    let conversations = organize_conversations(conversations, archived);
    let viewer_public_id = active_public_id_by_user_id(&db, user_id).unwrap_or_default();

    drop(db);

    Html(templates::render_messages(
        true,
        &viewer_public_id,
        conversations,
        share_listing_id,
        archived,
    ))
}

pub async fn chat_page(
    State(state): State<AppState>,
    Path(other_user_route): Path<String>,
    headers: HeaderMap,
) -> Html<String> {
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => {
            return Html(templates::render_chat(false, 0, 0, "", "", "", "", vec![]));
        }
    };

    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return Html("<h1>503</h1><p>База данных временно недоступна.</p>".to_string());
        }
    };

    let other_user_id = match active_user_id_by_chat_route(&db, &other_user_route) {
        Some(other_user_id) if other_user_id > 0 && other_user_id != user_id => other_user_id,
        _ => {
            return Html(templates::render_chat(
                true,
                user_id,
                0,
                "",
                "",
                "",
                "",
                vec![],
            ));
        }
    };

    let (user1_id, user2_id) = if user_id < other_user_id {
        (user_id, other_user_id)
    } else {
        (other_user_id, user_id)
    };

    let _ = db.execute(
        "UPDATE profiles
         SET last_seen_at = strftime('%s','now')
         WHERE user_id = ?1",
        rusqlite::params![user_id],
    );

    let conversation_id: Option<i64> = db
        .query_row(
            "SELECT id
             FROM conversations
             WHERE user1_id = ?1
               AND user2_id = ?2
             LIMIT 1",
            rusqlite::params![user1_id, user2_id,],
            |row| row.get(0),
        )
        .ok();

    let conversation_id = conversation_id.unwrap_or(0);

    let other_profile: Option<(String, String, String, String)> = db
        .query_row(
            "SELECT
                COALESCE(public_id, ''),
                COALESCE(username, ''),
                COALESCE(first_name, ''),
                COALESCE(last_name, '')
             FROM profiles
             WHERE user_id = ?1
             LIMIT 1",
            rusqlite::params![other_user_id],
            |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?)),
        )
        .ok();

    let (other_public_id, other_username, other_first_name, other_last_name) = other_profile
        .unwrap_or_else(|| (String::new(), String::new(), String::new(), String::new()));

    let mut messages: Vec<crate::web::view_models::ChatMessageRow> =
        load_recent_chat_messages(&db, conversation_id);

    let message_ids: Vec<i64> = messages.iter().map(|message| message.id).collect();
    let reactions_by_message = super::chat_api::reactions_for_view(&db, &message_ids, user_id);

    for message in &mut messages {
        if let Some(reactions) = reactions_by_message.get(&message.id) {
            message.reactions = reactions.clone();
        }
    }

    let read_through_id = messages
        .iter()
        .filter(|message| message.sender_user_id == other_user_id)
        .map(|message| message.id)
        .max()
        .unwrap_or(0);

    let read_changed = if read_through_id > 0 {
        let now = crate::web::handlers::common::unix_now();

        db.execute(
            "UPDATE messages
             SET is_read = 1,
                 delivered_at = CASE
                     WHEN delivered_at = 0 THEN ?4
                     ELSE delivered_at
                 END,
                 read_at = CASE
                     WHEN read_at = 0 THEN ?4
                     ELSE read_at
                 END
             WHERE conversation_id = ?1
               AND sender_user_id = ?2
               AND id <= ?3
               AND read_at = 0",
            rusqlite::params![conversation_id, other_user_id, read_through_id, now],
        )
        .unwrap_or(0)
    } else {
        0
    };

    let _ = db.execute(
        "UPDATE user_notifications
         SET is_read = 1
         WHERE user_id = ?1
           AND kind = 'chat_message'
           AND is_read = 0
           AND resource_id = ?2",
        rusqlite::params![user_id, other_user_id],
    );

    drop(db);

    if read_changed > 0 {
        state.publish_chat_event(
            "message.read",
            conversation_id,
            read_through_id,
            user_id,
            other_user_id,
        );
    }

    Html(templates::render_chat(
        true,
        user_id,
        other_user_id,
        &other_public_id,
        &other_username,
        &other_first_name,
        &other_last_name,
        messages,
    ))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn inbox_marks_only_incoming_messages_delivered() {
        let db = rusqlite::Connection::open_in_memory().expect("database");
        db.execute_batch(
            "CREATE TABLE conversations (
                id INTEGER PRIMARY KEY,
                user1_id INTEGER NOT NULL,
                user2_id INTEGER NOT NULL
             );
             CREATE TABLE messages (
                id INTEGER PRIMARY KEY,
                conversation_id INTEGER NOT NULL,
                sender_user_id INTEGER NOT NULL,
                delivered_at INTEGER NOT NULL DEFAULT 0
             );
             INSERT INTO conversations (id, user1_id, user2_id)
             VALUES (1, 10, 20), (2, 20, 30);
             INSERT INTO messages (id, conversation_id, sender_user_id)
             VALUES (1, 1, 10), (2, 1, 20), (3, 2, 30);",
        )
        .expect("schema");

        assert_eq!(mark_user_messages_delivered(&db, 20), 2);

        let delivered: Vec<(i64, i64)> = db
            .prepare("SELECT id, delivered_at FROM messages ORDER BY id")
            .expect("statement")
            .query_map([], |row| Ok((row.get(0)?, row.get(1)?)))
            .expect("rows")
            .collect::<Result<_, _>>()
            .expect("values");

        assert!(delivered[0].1 > 0);
        assert_eq!(delivered[1].1, 0);
        assert!(delivered[2].1 > 0);
    }

    #[test]
    fn page_keeps_messages_when_reply_id_is_null() {
        let db = rusqlite::Connection::open_in_memory().expect("database");
        db.execute_batch(
            "CREATE TABLE messages (
                id INTEGER PRIMARY KEY,
                conversation_id INTEGER NOT NULL,
                sender_user_id INTEGER NOT NULL,
                message TEXT NOT NULL,
                is_read INTEGER NOT NULL DEFAULT 0,
                created_at INTEGER NOT NULL DEFAULT 0,
                delivered_at INTEGER,
                read_at INTEGER,
                reply_to_message_id INTEGER,
                edited_at INTEGER,
                deleted_at INTEGER,
                attachment_kind TEXT,
                attachment_path TEXT,
                client_message_id TEXT NOT NULL DEFAULT ''
             );
             INSERT INTO messages (
                id, conversation_id, sender_user_id, message
             ) VALUES (11, 4, 7, 'Привет');",
        )
        .expect("schema");

        let messages = load_recent_chat_messages(&db, 4);
        assert_eq!(messages.len(), 1);
        assert_eq!(messages[0].id, 11);
        assert_eq!(messages[0].message, "Привет");
        assert_eq!(messages[0].reply_to_message_id, 0);
        assert_eq!(messages[0].client_message_id, "");
    }

    #[test]
    fn page_keeps_client_message_identity_after_reload() {
        let db = rusqlite::Connection::open_in_memory().expect("database");
        db.execute_batch(
            "CREATE TABLE messages (
                id INTEGER PRIMARY KEY,
                conversation_id INTEGER NOT NULL,
                sender_user_id INTEGER NOT NULL,
                message TEXT NOT NULL,
                is_read INTEGER NOT NULL DEFAULT 0,
                created_at INTEGER NOT NULL DEFAULT 0,
                delivered_at INTEGER,
                read_at INTEGER,
                reply_to_message_id INTEGER,
                edited_at INTEGER,
                deleted_at INTEGER,
                attachment_kind TEXT,
                attachment_path TEXT,
                client_message_id TEXT NOT NULL DEFAULT ''
             );
             INSERT INTO messages (
                id, conversation_id, sender_user_id, message, client_message_id
             ) VALUES (12, 4, 7, 'Сохранено', 'client-message-123456');",
        )
        .expect("schema");

        let messages = load_recent_chat_messages(&db, 4);
        assert_eq!(messages.len(), 1);
        assert_eq!(messages[0].client_message_id, "client-message-123456");
    }

    #[test]
    fn inbox_uses_a_voice_marker_for_voice_only_messages() {
        let db = rusqlite::Connection::open_in_memory().expect("database");
        db.execute_batch(
            "CREATE TABLE conversations (
                id INTEGER PRIMARY KEY,
                user1_id INTEGER NOT NULL,
                user2_id INTEGER NOT NULL,
                updated_at INTEGER NOT NULL
             );
             CREATE TABLE profiles (
                user_id INTEGER PRIMARY KEY,
                public_id TEXT NOT NULL DEFAULT '',
                username TEXT,
                first_name TEXT,
                last_name TEXT,
                avatar_path TEXT
             );
             CREATE TABLE chat_preferences (
                user_id INTEGER NOT NULL,
                chat_kind TEXT NOT NULL,
                target_id INTEGER NOT NULL,
                pinned_at INTEGER NOT NULL DEFAULT 0,
                archived_at INTEGER NOT NULL DEFAULT 0,
                muted_until INTEGER NOT NULL DEFAULT 0,
                updated_at INTEGER NOT NULL DEFAULT 0,
                PRIMARY KEY (user_id, chat_kind, target_id)
             );
             CREATE TABLE messages (
                id INTEGER PRIMARY KEY,
                conversation_id INTEGER NOT NULL,
                sender_user_id INTEGER NOT NULL,
                message TEXT NOT NULL DEFAULT '',
                is_read INTEGER NOT NULL DEFAULT 0,
                created_at INTEGER NOT NULL,
                deleted_at INTEGER NOT NULL DEFAULT 0,
                attachment_kind TEXT NOT NULL DEFAULT ''
             );
             INSERT INTO conversations (id, user1_id, user2_id, updated_at)
             VALUES (1, 10, 20, 100);
             INSERT INTO profiles (user_id, public_id, first_name)
             VALUES (20, 'peer-public-20', 'Друг');
             INSERT INTO chat_preferences (
                user_id, chat_kind, target_id, pinned_at, muted_until
             ) VALUES (10, 'direct', 20, 150, 500);
             INSERT INTO messages (
                id, conversation_id, sender_user_id, message, created_at, attachment_kind
             ) VALUES (1, 1, 20, '', 100, 'voice');",
        )
        .expect("schema");

        let conversations = load_user_conversations(&db, 10);
        assert_eq!(conversations.len(), 1);
        assert_eq!(conversations[0].other_public_id, "peer-public-20");
        assert_eq!(conversations[0].last_message, "__voice__");
        assert_eq!(conversations[0].pinned_at, 150);
        assert_eq!(conversations[0].muted_until, 500);
    }
}
