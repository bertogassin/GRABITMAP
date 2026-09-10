use super::auth::verify_user_session;
use super::chat::load_user_conversations;
use super::chat_api::{message_content_can_be_edited, message_is_valid, reaction_emoji_is_allowed};
use super::chat_media::{
    detect_audio, detect_image, extension_for_mime, media_path_is_safe, media_root, MAX_VOICE_BYTES,
};
use super::common::{input_text_is_valid, rate_limit_retry_after, request_is_cross_site, unix_now};
use crate::state::app_state::AppState;
use crate::web::templates;
use axum::{
    extract::{Multipart, Path, State},
    http::{header, HeaderMap, HeaderValue, StatusCode},
    response::{Html, IntoResponse, Redirect, Response},
    Form, Json,
};
use hmac::{Hmac, Mac};
use rand_core::{OsRng, RngCore};
use serde::Deserialize;
use serde_json::json;
use sha2::Sha256;
use std::fs;
use std::io::Write;

const MAX_GROUP_MEMBERS: i64 = 250;
const GROUP_ROLE_OWNER: &str = "owner";
const GROUP_ROLE_ADMIN: &str = "admin";
const GROUP_ROLE_MEMBER: &str = "member";
const GROUP_INVITE_LIFETIME_SECONDS: i64 = 7 * 24 * 60 * 60;
const MAX_GROUP_AVATAR_BYTES: usize = 8 * 1024 * 1024;

type HmacSha256 = Hmac<Sha256>;

#[derive(Debug, Deserialize)]
pub struct CreateGroupForm {
    name: String,
    #[serde(default)]
    member_ids: String,
}

#[derive(Debug, Deserialize)]
pub(crate) struct GroupNameForm {
    name: String,
    #[serde(default)]
    description: String,
}

#[derive(Debug, Deserialize)]
pub(crate) struct GroupRoleForm {
    role: String,
}

#[derive(Debug, Deserialize)]
pub(crate) struct GroupMuteForm {
    seconds: i64,
}

fn json_error(status: StatusCode, error: &str) -> Response {
    (status, Json(json!({"ok": false, "error": error}))).into_response()
}

fn rate_limited(retry_after: u64) -> Response {
    (
        StatusCode::TOO_MANY_REQUESTS,
        [(header::RETRY_AFTER, retry_after.to_string())],
        Json(json!({
            "ok": false,
            "error": "rate_limited",
            "retry_after": retry_after
        })),
    )
        .into_response()
}

fn positive_message_id(value: &str) -> Option<i64> {
    value.trim().parse::<i64>().ok().filter(|id| *id > 0)
}

fn group_avatar_root() -> std::path::PathBuf {
    std::path::PathBuf::from("data/group-avatars")
}

fn group_avatar_name_is_safe(group_id: i64, value: &str) -> bool {
    group_id > 0
        && value.starts_with(&format!("{group_id}-"))
        && !value.contains("..")
        && !value.contains('/')
        && !value.contains('\\')
        && value
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'-' | b'_' | b'.'))
}

#[derive(Debug, PartialEq)]
struct GroupInviteToken {
    group_id: i64,
    nonce: String,
}

fn sign_group_invite(admin_key: &str, payload: &str) -> Option<String> {
    let mut mac = HmacSha256::new_from_slice(admin_key.as_bytes()).ok()?;
    mac.update(payload.as_bytes());
    Some(hex::encode(mac.finalize().into_bytes()))
}

fn create_group_invite_token(admin_key: &str, group_id: i64, now: i64) -> Option<(String, String)> {
    if group_id <= 0 || admin_key.is_empty() {
        return None;
    }
    let mut bytes = [0_u8; 24];
    OsRng.fill_bytes(&mut bytes);
    let nonce = hex::encode(bytes);
    let payload = format!(
        "{group_id}.{}.{}",
        now + GROUP_INVITE_LIFETIME_SECONDS,
        nonce
    );
    let signature = sign_group_invite(admin_key, &payload)?;
    Some((format!("{payload}.{signature}"), nonce))
}

fn parse_group_invite_token(admin_key: &str, token: &str, now: i64) -> Option<GroupInviteToken> {
    let mut parts = token.split('.');
    let group_id = parts.next()?.parse::<i64>().ok()?;
    let expires_at = parts.next()?.parse::<i64>().ok()?;
    let nonce = parts.next()?;
    let signature = parts.next()?;
    if parts.next().is_some()
        || group_id <= 0
        || expires_at <= now
        || nonce.len() != 48
        || !nonce.bytes().all(|byte| byte.is_ascii_hexdigit())
        || signature.len() != 64
    {
        return None;
    }
    let payload = format!("{group_id}.{expires_at}.{nonce}");
    let expected = hex::decode(signature).ok()?;
    let mut mac = HmacSha256::new_from_slice(admin_key.as_bytes()).ok()?;
    mac.update(payload.as_bytes());
    mac.verify_slice(&expected).ok()?;
    Some(GroupInviteToken {
        group_id,
        nonce: nonce.to_ascii_lowercase(),
    })
}

fn group_reply_is_valid(db: &rusqlite::Connection, group_id: i64, message_id: i64) -> bool {
    message_id <= 0
        || db
            .query_row(
                "SELECT 1 FROM group_messages
                 WHERE id = ?1 AND group_id = ?2 AND deleted_at = 0",
                rusqlite::params![message_id, group_id],
                |_| Ok(()),
            )
            .is_ok()
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
    let _ = db.execute(
        "UPDATE chat_preferences
         SET archived_at = 0, updated_at = ?3
         WHERE chat_kind = 'group'
           AND target_id = ?1
           AND user_id <> ?2
           AND archived_at > 0
           AND user_id IN (
                SELECT user_id FROM chat_group_members WHERE group_id = ?1
           )",
        rusqlite::params![group_id, sender_id, now],
    );
    let _ = db.execute(
        "UPDATE user_notifications
         SET title = ?3, message = ?4, created_at = ?5, is_read = 0
         WHERE kind = 'group_message'
           AND resource_id = ?1
           AND is_read = 0
           AND user_id <> ?2
           AND user_id IN (
                SELECT user_id
                FROM chat_group_members
                WHERE group_id = ?1
           )
           AND NOT EXISTS (
                SELECT 1 FROM chat_preferences AS preference
                WHERE preference.user_id = user_notifications.user_id
                  AND preference.chat_kind = 'group'
                  AND preference.target_id = ?1
                  AND preference.muted_until > ?5
           )",
        rusqlite::params![group_id, sender_id, title, preview, now],
    );

    let _ = db.execute(
        "INSERT INTO user_notifications (
            user_id, resource_id, kind, title, message, is_read, created_at
         )
         SELECT member.user_id, ?1, 'group_message', ?3, ?4, 0, ?5
         FROM chat_group_members AS member
         WHERE member.group_id = ?1
           AND member.user_id > 0
           AND member.user_id <> ?2
           AND NOT EXISTS (
                SELECT 1 FROM chat_preferences AS preference
                WHERE preference.user_id = member.user_id
                  AND preference.chat_kind = 'group'
                  AND preference.target_id = ?1
                  AND preference.muted_until > ?5
           )
           AND NOT EXISTS (
                SELECT 1
                FROM user_notifications AS notification
                WHERE notification.user_id = member.user_id
                  AND notification.kind = 'group_message'
                  AND notification.resource_id = ?1
                  AND notification.is_read = 0
           )",
        rusqlite::params![group_id, sender_id, title, preview, now],
    );
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

fn group_role(db: &rusqlite::Connection, group_id: i64, user_id: i64) -> Option<String> {
    db.query_row(
        "SELECT role FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
        rusqlite::params![group_id, user_id],
        |row| row.get(0),
    )
    .ok()
}

fn role_can_manage_members(role: &str) -> bool {
    role == GROUP_ROLE_OWNER || role == GROUP_ROLE_ADMIN
}

fn role_can_remove(actor_role: &str, target_role: &str) -> bool {
    actor_role == GROUP_ROLE_OWNER && target_role != GROUP_ROLE_OWNER
        || actor_role == GROUP_ROLE_ADMIN && target_role == GROUP_ROLE_MEMBER
}

fn role_can_moderate_message(
    actor_role: &str,
    actor_user_id: i64,
    sender_user_id: i64,
    sender_role: &str,
) -> bool {
    actor_user_id == sender_user_id
        || actor_role == GROUP_ROLE_OWNER
        || (actor_role == GROUP_ROLE_ADMIN
            && (sender_role.is_empty() || sender_role == GROUP_ROLE_MEMBER))
}

fn group_member_muted_until(db: &rusqlite::Connection, group_id: i64, user_id: i64) -> i64 {
    db.query_row(
        "SELECT COALESCE(muted_until, 0)
         FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
        rusqlite::params![group_id, user_id],
        |row| row.get(0),
    )
    .unwrap_or(0)
}

fn muted_response(muted_until: i64) -> Response {
    (
        StatusCode::FORBIDDEN,
        Json(json!({
            "ok": false,
            "error": "member_muted",
            "muted_until": muted_until
        })),
    )
        .into_response()
}

fn selected_member_ids(
    value: &str,
    viewer_user_id: i64,
    allowed: &std::collections::HashSet<i64>,
) -> Vec<i64> {
    let mut members = value
        .split(',')
        .filter_map(|item| item.trim().parse::<i64>().ok())
        .filter(|id| *id > 0 && *id != viewer_user_id && allowed.contains(id))
        .collect::<Vec<_>>();
    members.sort_unstable();
    members.dedup();
    members
}

fn transfer_group_owner(
    db: &rusqlite::Connection,
    group_id: i64,
    current_owner_id: i64,
    new_owner_id: i64,
    now: i64,
) -> rusqlite::Result<bool> {
    if group_id <= 0
        || current_owner_id <= 0
        || new_owner_id <= 0
        || current_owner_id == new_owner_id
    {
        return Ok(false);
    }
    let tx = db.unchecked_transaction()?;
    let current_role: Option<String> = tx
        .query_row(
            "SELECT role FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
            rusqlite::params![group_id, current_owner_id],
            |row| row.get(0),
        )
        .ok();
    let target_role: Option<String> = tx
        .query_row(
            "SELECT role FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
            rusqlite::params![group_id, new_owner_id],
            |row| row.get(0),
        )
        .ok();
    if current_role.as_deref() != Some(GROUP_ROLE_OWNER) || target_role.is_none() {
        return Ok(false);
    }
    tx.execute(
        "UPDATE chat_group_members SET role = ?1 WHERE group_id = ?2 AND user_id = ?3",
        rusqlite::params![GROUP_ROLE_ADMIN, group_id, current_owner_id],
    )?;
    tx.execute(
        "UPDATE chat_group_members SET role = ?1 WHERE group_id = ?2 AND user_id = ?3",
        rusqlite::params![GROUP_ROLE_OWNER, group_id, new_owner_id],
    )?;
    let updated = tx.execute(
        "UPDATE chat_groups
         SET owner_user_id = ?1, updated_at = ?2
         WHERE id = ?3 AND owner_user_id = ?4",
        rusqlite::params![new_owner_id, now, group_id, current_owner_id],
    )?;
    if updated != 1 {
        return Ok(false);
    }
    tx.commit()?;
    Ok(true)
}

fn partners_for_picker(db: &rusqlite::Connection, user_id: i64) -> Vec<(i64, String)> {
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
                stmt.query_map(
                    rusqlite::params![group_id, after_id, limit],
                    map_group_message_row,
                )
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
                stmt.query_map(
                    rusqlite::params![group_id, before_id, limit],
                    map_group_message_row,
                )
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
    let (max_other_read, min_other_read, recipient_count) =
        group_peer_read_bounds(db, group_id, viewer_user_id);
    for message in messages.iter_mut() {
        if message.sender_user_id != viewer_user_id || message.deleted_at > 0 {
            continue;
        }
        if recipient_count > 0 && min_other_read >= message.id {
            message.delivered_at = message.created_at.max(1);
            message.read_at = message.created_at.max(1);
            message.is_read = 1;
        } else if max_other_read >= message.id {
            message.delivered_at = message.created_at.max(1);
            message.read_at = 0;
            message.is_read = 0;
        } else {
            message.delivered_at = 0;
            message.read_at = 0;
            message.is_read = 0;
        }
    }
}

fn group_peer_read_bounds(
    db: &rusqlite::Connection,
    group_id: i64,
    viewer_user_id: i64,
) -> (i64, i64, i64) {
    db.query_row(
        "SELECT COALESCE(MAX(last_read_message_id), 0),
                COALESCE(MIN(last_read_message_id), 0),
                COUNT(*)
         FROM chat_group_members
         WHERE group_id = ?1
           AND user_id <> ?2",
        rusqlite::params![group_id, viewer_user_id],
        |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?)),
    )
    .unwrap_or((0, 0, 0))
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
    if messages.is_empty() {
        return;
    }

    let reply_ids = messages
        .iter()
        .filter_map(|message| {
            (message.reply_to_message_id > 0).then_some(message.reply_to_message_id)
        })
        .collect::<std::collections::BTreeSet<_>>();
    let mut replies = std::collections::HashMap::<i64, (i64, String)>::new();

    if !reply_ids.is_empty() {
        let placeholders = (0..reply_ids.len())
            .map(|index| format!("?{}", index + 2))
            .collect::<Vec<_>>()
            .join(",");
        let sql = format!(
            "SELECT id, sender_user_id, message, deleted_at
             FROM group_messages
             WHERE group_id = ?1
               AND id IN ({placeholders})"
        );
        let mut params = Vec::with_capacity(reply_ids.len() + 1);
        params.push(rusqlite::types::Value::from(group_id));
        params.extend(reply_ids.iter().copied().map(rusqlite::types::Value::from));

        if let Ok(mut statement) = db.prepare(&sql) {
            if let Ok(rows) = statement.query_map(rusqlite::params_from_iter(params), |row| {
                let deleted_at = row.get::<_, i64>(3)?;
                Ok((
                    row.get::<_, i64>(0)?,
                    row.get::<_, i64>(1)?,
                    if deleted_at > 0 {
                        "__deleted__".to_string()
                    } else {
                        row.get::<_, String>(2)?
                    },
                ))
            }) {
                for row in rows.flatten() {
                    replies.insert(row.0, (row.1, row.2));
                }
            }
        }
    }

    let mut sender_ids = messages
        .iter()
        .filter_map(|message| (message.sender_user_id > 0).then_some(message.sender_user_id))
        .collect::<std::collections::BTreeSet<_>>();
    sender_ids.extend(replies.values().map(|(sender_id, _)| *sender_id));

    let mut names = std::collections::HashMap::<i64, String>::new();
    if !sender_ids.is_empty() {
        let placeholders = (1..=sender_ids.len())
            .map(|index| format!("?{index}"))
            .collect::<Vec<_>>()
            .join(",");
        let sql = format!(
            "SELECT user_id, COALESCE(username, ''), COALESCE(first_name, ''),
                    COALESCE(last_name, '')
             FROM profiles
             WHERE user_id IN ({placeholders})"
        );
        let params = sender_ids
            .iter()
            .copied()
            .map(rusqlite::types::Value::from)
            .collect::<Vec<_>>();

        if let Ok(mut statement) = db.prepare(&sql) {
            if let Ok(rows) = statement.query_map(rusqlite::params_from_iter(params), |row| {
                Ok((
                    row.get::<_, i64>(0)?,
                    row.get::<_, String>(1)?,
                    row.get::<_, String>(2)?,
                    row.get::<_, String>(3)?,
                ))
            }) {
                for row in rows.flatten() {
                    names.insert(
                        row.0,
                        templates::conversation_display_name(row.0, &row.1, &row.2, &row.3),
                    );
                }
            }
        }
    }

    for message in messages.iter_mut() {
        if message.sender_user_id > 0 {
            message.sender_name =
                names
                    .get(&message.sender_user_id)
                    .cloned()
                    .unwrap_or_else(|| {
                        format!(
                            "Участник · {:06}",
                            message.sender_user_id.rem_euclid(1_000_000)
                        )
                    });
        }
        if let Some((sender_id, text)) = replies.get(&message.reply_to_message_id) {
            message.reply_sender_user_id = *sender_id;
            message.reply_sender_name = names.get(sender_id).cloned().unwrap_or_default();
            message.reply_message = text.clone();
        }
    }

    let ids: Vec<i64> = messages.iter().map(|m| m.id).collect();
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
        Ok((
            row.get::<_, i64>(0)?,
            row.get::<_, String>(1)?,
            row.get::<_, i64>(2)?,
        ))
    }) {
        Ok(rows) => rows.filter_map(Result::ok).collect::<Vec<_>>(),
        Err(_) => return,
    };
    let mut grouped: std::collections::HashMap<i64, Vec<crate::web::view_models::ChatReactionRow>> =
        std::collections::HashMap::new();
    let mut counts = std::collections::HashMap::<(i64, String), (i64, bool)>::new();
    for (message_id, emoji, user_id) in rows {
        let entry = counts.entry((message_id, emoji)).or_insert((0, false));
        entry.0 += 1;
        if user_id == viewer_user_id {
            entry.1 = true;
        }
    }
    for ((message_id, emoji), (count, mine)) in counts {
        grouped
            .entry(message_id)
            .or_default()
            .push(crate::web::view_models::ChatReactionRow { emoji, count, mine });
    }
    for message in messages.iter_mut() {
        message.reactions = grouped.remove(&message.id).unwrap_or_default();
        message
            .reactions
            .sort_by_key(|reaction| std::cmp::Reverse(reaction.count));
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
        reply_sender_name: String::new(),
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

fn message_json(
    message: &crate::web::view_models::ChatMessageRow,
    viewer_user_id: i64,
) -> serde_json::Value {
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
        "reply_sender_name": message.reply_sender_name,
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
    let members = selected_member_ids(&form.member_ids, user_id, &allowed);
    if members.len() as i64 + 1 > MAX_GROUP_MEMBERS {
        return Html(templates::render_new_group(
            true,
            partners_for_picker(&db, user_id),
            "В группе может быть не больше 250 участников.",
        ))
        .into_response();
    }

    let now = unix_now();
    let tx = match db.unchecked_transaction() {
        Ok(tx) => tx,
        Err(_) => return Redirect::to("/app/groups/new").into_response(),
    };
    if tx
        .execute(
            "INSERT INTO chat_groups (name, created_by, created_at, owner_user_id, updated_at)
             VALUES (?1, ?2, ?3, ?2, ?3)",
            rusqlite::params![name, user_id, now],
        )
        .is_err()
    {
        return Redirect::to("/app/groups/new").into_response();
    }
    let group_id = tx.last_insert_rowid();
    if tx
        .execute(
            "INSERT INTO chat_group_members (group_id, user_id, joined_at, role)
             VALUES (?1, ?2, ?3, ?4)",
            rusqlite::params![group_id, user_id, now, GROUP_ROLE_OWNER],
        )
        .is_err()
    {
        return Redirect::to("/app/groups/new").into_response();
    }
    for member in &members {
        if tx
            .execute(
                "INSERT INTO chat_group_members (group_id, user_id, joined_at, role)
                 VALUES (?1, ?2, ?3, ?4)",
                rusqlite::params![group_id, member, now, GROUP_ROLE_MEMBER],
            )
            .is_err()
        {
            return Redirect::to("/app/groups/new").into_response();
        }
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
                "",
                0,
                vec![],
            ));
        }
    };
    if group_id <= 0 {
        return Html(templates::render_group_chat(
            true,
            user_id,
            0,
            "",
            "",
            0,
            vec![],
        ));
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
            "",
            0,
            vec![],
        ));
    }
    let (name, description): (String, String) = db
        .query_row(
            "SELECT name, COALESCE(description, '') FROM chat_groups WHERE id = ?1",
            rusqlite::params![group_id],
            |row| Ok((row.get(0)?, row.get(1)?)),
        )
        .unwrap_or_else(|_| ("Группа".to_string(), String::new()));
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
        &description,
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
    let mut messages =
        load_group_messages(&db, group_id, user_id, after_id, before_id, fetch_limit);
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
    let (peer_delivered_through_id, peer_read_through_id, _) =
        group_peer_read_bounds(&db, group_id, user_id);
    Json(json!({
        "ok": true,
        "messages": items,
        "has_more": has_more,
        "peer_delivered_through_id": peer_delivered_through_id,
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
    reply_to_message_id: Option<i64>,
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
    if let Some(retry_after) =
        rate_limit_retry_after(&state, user_id, "group_api_send", 30, 60).await
    {
        return rate_limited(retry_after);
    }
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
    let muted_until = group_member_muted_until(&db, group_id, user_id);
    if muted_until > unix_now() {
        return muted_response(muted_until);
    }
    let reply_to_message_id = payload.reply_to_message_id.unwrap_or(0).max(0);
    if !group_reply_is_valid(&db, group_id, reply_to_message_id) {
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
    let inserted = db
        .execute(
            "INSERT OR IGNORE INTO group_messages (
                group_id, sender_user_id, message, created_at, client_message_id, reply_to_message_id
             ) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
            rusqlite::params![
                group_id,
                user_id,
                message,
                now,
                client_message_id,
                reply_to_message_id
            ],
        )
        .unwrap_or(0);
    if inserted == 0 {
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
    if let Some(retry_after) =
        rate_limit_retry_after(&state, user_id, "group_api_send_image", 20, 60).await
    {
        return rate_limited(retry_after);
    }
    {
        let db = match crate::db::pool::get_connection(&state.db_pool) {
            Ok(db) => db,
            Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
        };
        if group_id <= 0 || !is_member(&db, group_id, user_id) {
            return json_error(StatusCode::FORBIDDEN, "not_a_member");
        }
        let muted_until = group_member_muted_until(&db, group_id, user_id);
        if muted_until > unix_now() {
            return muted_response(muted_until);
        }
    }
    let mut caption = String::new();
    let mut client_message_id = String::new();
    let mut reply_to_message_id = 0;
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
            "reply_to_message_id" => {
                if let Ok(text) = field.text().await {
                    reply_to_message_id = positive_message_id(&text).unwrap_or(0);
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
    if !caption.is_empty() && !input_text_is_valid(&caption, 1, 2000) {
        return json_error(StatusCode::BAD_REQUEST, "invalid_message");
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    if !is_member(&db, group_id, user_id) {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    }
    let muted_until = group_member_muted_until(&db, group_id, user_id);
    if muted_until > unix_now() {
        return muted_response(muted_until);
    }
    if !group_reply_is_valid(&db, group_id, reply_to_message_id) {
        return json_error(StatusCode::BAD_REQUEST, "invalid_reply");
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
    let inserted = db
        .execute(
            "INSERT OR IGNORE INTO group_messages (
                group_id, sender_user_id, message, created_at, client_message_id,
                reply_to_message_id, attachment_kind, attachment_path, attachment_mime,
                attachment_size
             ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'image', ?7, ?8, ?9)",
            rusqlite::params![
                group_id,
                user_id,
                caption,
                now,
                client_message_id,
                reply_to_message_id,
                relative,
                mime,
                bytes.len() as i64
            ],
        )
        .unwrap_or(0);
    if inserted == 0 {
        if !client_message_id.is_empty() {
            if let Some(existing) =
                find_group_message_by_client_id(&db, group_id, user_id, &client_message_id)
            {
                let _ = fs::remove_file(&absolute);
                return Json(json!({
                    "ok": true,
                    "message": message_json(&existing, user_id),
                    "deduped": true
                }))
                .into_response();
            }
        }
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
        if caption.is_empty() {
            "Фото"
        } else {
            caption.as_str()
        },
    );
    let item = load_group_messages(&db, group_id, user_id, message_id - 1, 0, 1)
        .into_iter()
        .find(|message| message.id == message_id)
        .map(|message| message_json(&message, user_id))
        .unwrap_or_else(|| {
            json!({
                "id": message_id,
                "sender_user_id": user_id.to_string(),
                "message": caption,
                "is_mine": true,
                "created_at": now,
                "sender_name": profile_display_name(&db, user_id),
                "reply_to_message_id": if reply_to_message_id > 0 { Some(reply_to_message_id) } else { None },
                "attachment_kind": "image",
                "attachment_url": format!("/api/group/media/{message_id}"),
            })
        });
    Json(json!({"ok": true, "message": item})).into_response()
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
    let row: Option<(i64, String, String, String, i64)> = db
        .query_row(
            "SELECT group_id, attachment_path, attachment_mime, attachment_kind, deleted_at
             FROM group_messages WHERE id = ?1",
            rusqlite::params![message_id],
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
    let Some((group_id, path, mime, kind, deleted_at)) = row else {
        return json_error(StatusCode::NOT_FOUND, "not_found");
    };
    if deleted_at > 0 || !is_member(&db, group_id, user_id) {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    }
    if !media_path_is_safe(&path) || (kind != "image" && kind != "voice") {
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
            (
                header::X_CONTENT_TYPE_OPTIONS,
                HeaderValue::from_static("nosniff"),
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
    if let Some(retry_after) =
        rate_limit_retry_after(&state, user_id, "group_api_send_voice", 12, 60).await
    {
        return rate_limited(retry_after);
    }
    {
        let db = match crate::db::pool::get_connection(&state.db_pool) {
            Ok(db) => db,
            Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
        };
        if group_id <= 0 || !is_member(&db, group_id, user_id) {
            return json_error(StatusCode::FORBIDDEN, "not_a_member");
        }
        let muted_until = group_member_muted_until(&db, group_id, user_id);
        if muted_until > unix_now() {
            return muted_response(muted_until);
        }
    }
    let mut client_message_id = String::new();
    let mut reply_to_message_id = 0;
    let mut file_bytes: Option<Vec<u8>> = None;
    while let Ok(Some(field)) = multipart.next_field().await {
        let name = field.name().unwrap_or("").to_string();
        match name.as_str() {
            "client_message_id" => {
                if let Ok(text) = field.text().await {
                    client_message_id = text.trim().to_string();
                }
            }
            "reply_to_message_id" => {
                if let Ok(text) = field.text().await {
                    reply_to_message_id = positive_message_id(&text).unwrap_or(0);
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
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    if !is_member(&db, group_id, user_id) {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    }
    let muted_until = group_member_muted_until(&db, group_id, user_id);
    if muted_until > unix_now() {
        return muted_response(muted_until);
    }
    if !group_reply_is_valid(&db, group_id, reply_to_message_id) {
        return json_error(StatusCode::BAD_REQUEST, "invalid_reply");
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
    if bytes.len() > MAX_VOICE_BYTES {
        return json_error(StatusCode::PAYLOAD_TOO_LARGE, "voice_too_large");
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
    let inserted = db
        .execute(
            "INSERT OR IGNORE INTO group_messages (
                group_id, sender_user_id, message, created_at, client_message_id,
                reply_to_message_id, attachment_kind, attachment_path, attachment_mime,
                attachment_size
             ) VALUES (?1, ?2, '', ?3, ?4, ?5, 'voice', ?6, ?7, ?8)",
            rusqlite::params![
                group_id,
                user_id,
                now,
                client_message_id,
                reply_to_message_id,
                relative,
                mime,
                bytes.len() as i64
            ],
        )
        .unwrap_or(0);
    if inserted == 0 {
        if !client_message_id.is_empty() {
            if let Some(existing) =
                find_group_message_by_client_id(&db, group_id, user_id, &client_message_id)
            {
                let _ = fs::remove_file(&absolute);
                return Json(json!({
                    "ok": true,
                    "message": message_json(&existing, user_id),
                    "deduped": true
                }))
                .into_response();
            }
        }
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
    let item = load_group_messages(&db, group_id, user_id, message_id - 1, 0, 1)
        .into_iter()
        .find(|message| message.id == message_id)
        .map(|message| message_json(&message, user_id))
        .unwrap_or_else(|| {
            json!({
                "id": message_id,
                "sender_user_id": user_id.to_string(),
                "message": "",
                "is_mine": true,
                "created_at": now,
                "sender_name": profile_display_name(&db, user_id),
                "reply_to_message_id": if reply_to_message_id > 0 { Some(reply_to_message_id) } else { None },
                "attachment_kind": "voice",
                "attachment_url": format!("/api/group/media/{message_id}"),
            })
        });
    Json(json!({"ok": true, "message": item})).into_response()
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
    let row: Option<(i64, i64, String)> = db
        .query_row(
            "SELECT created_at, deleted_at, COALESCE(attachment_kind, '') FROM group_messages
             WHERE id = ?1 AND group_id = ?2 AND sender_user_id = ?3",
            rusqlite::params![message_id, group_id, user_id],
            |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?)),
        )
        .ok();
    let Some((created_at, deleted_at, attachment_kind)) = row else {
        return json_error(StatusCode::NOT_FOUND, "message_not_found");
    };
    let now = unix_now();
    if !message_content_can_be_edited(created_at, deleted_at, &attachment_kind, now) {
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
    fanout_group_message(
        &state,
        &db,
        "message.updated",
        group_id,
        message_id,
        user_id,
        text,
    );
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
    if group_id <= 0 || message_id <= 0 {
        return json_error(StatusCode::BAD_REQUEST, "invalid_request");
    }
    if let Some(retry_after) =
        rate_limit_retry_after(&state, user_id, "group_message_delete", 30, 60).await
    {
        return rate_limited(retry_after);
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return json_error(StatusCode::SERVICE_UNAVAILABLE, "database_unavailable"),
    };
    let actor_role = group_role(&db, group_id, user_id).unwrap_or_default();
    if actor_role.is_empty() {
        return json_error(StatusCode::FORBIDDEN, "not_a_member");
    }
    let sender_user_id: i64 = match db.query_row(
        "SELECT sender_user_id FROM group_messages
         WHERE id = ?1 AND group_id = ?2 AND deleted_at = 0",
        rusqlite::params![message_id, group_id],
        |row| row.get(0),
    ) {
        Ok(value) => value,
        Err(_) => return json_error(StatusCode::NOT_FOUND, "message_not_found"),
    };
    let sender_role = group_role(&db, group_id, sender_user_id).unwrap_or_default();
    if !role_can_moderate_message(&actor_role, user_id, sender_user_id, &sender_role) {
        return json_error(StatusCode::FORBIDDEN, "moderator_required");
    }
    let now = unix_now();
    if db
        .execute(
            "UPDATE group_messages SET deleted_at = ?1, message = ''
             WHERE id = ?2 AND group_id = ?3 AND deleted_at = 0
               AND (
                    sender_user_id = ?4
                    OR EXISTS (
                        SELECT 1 FROM chat_group_members AS actor
                        WHERE actor.group_id = ?3
                          AND actor.user_id = ?4
                          AND actor.role = ?5
                    )
                    OR (
                        EXISTS (
                            SELECT 1 FROM chat_group_members AS actor
                            WHERE actor.group_id = ?3
                              AND actor.user_id = ?4
                              AND actor.role = ?6
                        )
                        AND NOT EXISTS (
                            SELECT 1 FROM chat_group_members AS protected_sender
                            WHERE protected_sender.group_id = ?3
                              AND protected_sender.user_id = group_messages.sender_user_id
                              AND protected_sender.role IN (?5, ?6)
                        )
                    )
               )",
            rusqlite::params![
                now,
                message_id,
                group_id,
                user_id,
                GROUP_ROLE_OWNER,
                GROUP_ROLE_ADMIN
            ],
        )
        .unwrap_or(0)
        != 1
    {
        return json_error(StatusCode::NOT_FOUND, "message_not_found");
    }
    let _ = db.execute(
        "DELETE FROM chat_message_pins
         WHERE chat_kind = 'group' AND target_id = ?1 AND message_id = ?2",
        rusqlite::params![group_id, message_id],
    );
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
    let changed = if existing.as_deref() == Some(emoji) {
        db.execute(
            "DELETE FROM group_message_reactions WHERE message_id = ?1 AND user_id = ?2",
            rusqlite::params![message_id, user_id],
        )
    } else {
        db.execute(
            "INSERT INTO group_message_reactions (message_id, user_id, emoji, created_at)
             VALUES (?1, ?2, ?3, ?4)
             ON CONFLICT(message_id, user_id) DO UPDATE SET emoji = excluded.emoji, created_at = excluded.created_at",
            rusqlite::params![message_id, user_id, emoji, unix_now()],
        )
    }
    .unwrap_or(0);
    if changed != 1 {
        return json_error(StatusCode::INTERNAL_SERVER_ERROR, "reaction_save_failed");
    }
    let mut loaded = load_group_messages(&db, group_id, user_id, message_id - 1, 0, 1);
    let Some(message) = loaded.pop() else {
        return json_error(StatusCode::INTERNAL_SERVER_ERROR, "message_reload_failed");
    };
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
        "message_id": message_id,
        "reactions": message.reactions.iter().map(|r| json!({"emoji": r.emoji, "count": r.count, "mine": r.mine})).collect::<Vec<_>>(),
        "message": message_json(&message, user_id),
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
        None => {
            return Html(templates::render_group_members(
                templates::GroupMembersPage {
                    viewer_user_id: 0,
                    group_id: 0,
                    name: "",
                    description: "",
                    viewer_role: "",
                    members: vec![],
                    candidates: vec![],
                    error: "",
                },
            ))
        }
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Html("<h1>503</h1><p>База данных временно недоступна.</p>".to_string()),
    };
    if group_id <= 0 || !is_member(&db, group_id, user_id) {
        return Html(templates::render_group_members(
            templates::GroupMembersPage {
                viewer_user_id: user_id,
                group_id,
                name: "Группа",
                description: "",
                viewer_role: "",
                members: vec![],
                candidates: vec![],
                error: "Нет доступа",
            },
        ));
    }
    let (name, description): (String, String) = db
        .query_row(
            "SELECT name, COALESCE(description, '') FROM chat_groups WHERE id = ?1",
            rusqlite::params![group_id],
            |row| Ok((row.get(0)?, row.get(1)?)),
        )
        .unwrap_or_else(|_| ("Группа".to_string(), String::new()));
    let viewer_role = group_role(&db, group_id, user_id).unwrap_or_default();
    let members = load_group_member_names(&db, group_id);
    let current: std::collections::HashSet<i64> = members.iter().map(|(id, _, _, _)| *id).collect();
    let candidates = if role_can_manage_members(&viewer_role) {
        partners_for_picker(&db, user_id)
            .into_iter()
            .filter(|(id, _)| !current.contains(id))
            .collect()
    } else {
        vec![]
    };
    Html(templates::render_group_members(
        templates::GroupMembersPage {
            viewer_user_id: user_id,
            group_id,
            name: &name,
            description: &description,
            viewer_role: &viewer_role,
            members,
            candidates,
            error: "",
        },
    ))
}

pub async fn create_group_invite(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    let target = format!("/app/group/{group_id}/members");
    if request_is_cross_site(&headers) {
        return Redirect::to(&target).into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Redirect::to("/login?next=/app/messages").into_response(),
    };
    if rate_limit_retry_after(&state, user_id, "group_invite_create", 10, 600)
        .await
        .is_some()
    {
        return Redirect::to(&target).into_response();
    }
    let Some((token, nonce)) = create_group_invite_token(&state.admin_key, group_id, unix_now())
    else {
        return Redirect::to(&target).into_response();
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Redirect::to(&target).into_response(),
    };
    let changed = db
        .execute(
            "UPDATE chat_groups
             SET invite_nonce = ?1, updated_at = ?2
             WHERE id = ?3
               AND EXISTS (
                    SELECT 1 FROM chat_group_members AS actor
                    WHERE actor.group_id = chat_groups.id
                      AND actor.user_id = ?4
                      AND actor.role IN (?5, ?6)
               )",
            rusqlite::params![
                nonce,
                unix_now(),
                group_id,
                user_id,
                GROUP_ROLE_OWNER,
                GROUP_ROLE_ADMIN
            ],
        )
        .unwrap_or(0);
    if changed != 1 {
        return Redirect::to("/app/messages").into_response();
    }
    Redirect::to(&format!("{target}?invite={}", urlencoding::encode(&token))).into_response()
}

pub async fn set_group_avatar(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
    mut multipart: Multipart,
) -> Response {
    let target = format!("/app/group/{group_id}/members");
    if request_is_cross_site(&headers) {
        return Redirect::to(&target).into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Redirect::to("/login?next=/app/messages").into_response(),
    };
    if rate_limit_retry_after(&state, user_id, "group_avatar_upload", 5, 300)
        .await
        .is_some()
    {
        return Redirect::to(&target).into_response();
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Redirect::to(&target).into_response(),
    };
    if !role_can_manage_members(&group_role(&db, group_id, user_id).unwrap_or_default()) {
        return Redirect::to("/app/messages").into_response();
    }
    let mut image = None;
    while let Ok(Some(field)) = multipart.next_field().await {
        if matches!(field.name().unwrap_or(""), "image" | "file" | "avatar") {
            if let Ok(bytes) = field.bytes().await {
                image = Some(bytes.to_vec());
            }
            break;
        }
    }
    let Some(bytes) = image else {
        return Redirect::to(&target).into_response();
    };
    if bytes.len() > MAX_GROUP_AVATAR_BYTES {
        return Redirect::to(&target).into_response();
    }
    let Some((_, mime)) = detect_image(&bytes) else {
        return Redirect::to(&target).into_response();
    };
    let mut random = [0_u8; 8];
    OsRng.fill_bytes(&mut random);
    let relative = format!(
        "{group_id}-{}.{}",
        hex::encode(random),
        extension_for_mime(mime)
    );
    let root = group_avatar_root();
    if fs::create_dir_all(&root).is_err() || fs::write(root.join(&relative), &bytes).is_err() {
        return Redirect::to(&target).into_response();
    }
    let previous = db
        .query_row(
            "SELECT COALESCE(avatar_path, '') FROM chat_groups WHERE id = ?1",
            rusqlite::params![group_id],
            |row| row.get::<_, String>(0),
        )
        .unwrap_or_default();
    let changed = db
        .execute(
            "UPDATE chat_groups
             SET avatar_path = ?1, updated_at = ?2
             WHERE id = ?3
               AND EXISTS (
                    SELECT 1 FROM chat_group_members AS actor
                    WHERE actor.group_id = chat_groups.id
                      AND actor.user_id = ?4
                      AND actor.role IN (?5, ?6)
               )",
            rusqlite::params![
                relative,
                unix_now(),
                group_id,
                user_id,
                GROUP_ROLE_OWNER,
                GROUP_ROLE_ADMIN
            ],
        )
        .unwrap_or(0);
    if changed != 1 {
        let _ = fs::remove_file(root.join(&relative));
        return Redirect::to(&target).into_response();
    }
    if previous != relative && group_avatar_name_is_safe(group_id, &previous) {
        let _ = fs::remove_file(root.join(previous));
    }
    Redirect::to(&target).into_response()
}

pub async fn delete_group_avatar(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    let target = format!("/app/group/{group_id}/members");
    if request_is_cross_site(&headers) {
        return Redirect::to(&target).into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Redirect::to("/login?next=/app/messages").into_response(),
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Redirect::to(&target).into_response(),
    };
    if !role_can_manage_members(&group_role(&db, group_id, user_id).unwrap_or_default()) {
        return Redirect::to("/app/messages").into_response();
    }
    let previous = db
        .query_row(
            "SELECT COALESCE(avatar_path, '') FROM chat_groups WHERE id = ?1",
            rusqlite::params![group_id],
            |row| row.get::<_, String>(0),
        )
        .unwrap_or_default();
    let changed = db
        .execute(
            "UPDATE chat_groups SET avatar_path = '', updated_at = ?1
             WHERE id = ?2
               AND EXISTS (
                    SELECT 1 FROM chat_group_members AS actor
                    WHERE actor.group_id = chat_groups.id
                      AND actor.user_id = ?3
                      AND actor.role IN (?4, ?5)
               )",
            rusqlite::params![
                unix_now(),
                group_id,
                user_id,
                GROUP_ROLE_OWNER,
                GROUP_ROLE_ADMIN
            ],
        )
        .unwrap_or(0);
    if changed == 1 && group_avatar_name_is_safe(group_id, &previous) {
        let _ = fs::remove_file(group_avatar_root().join(previous));
    }
    Redirect::to(&target).into_response()
}

pub async fn get_group_avatar(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return StatusCode::UNAUTHORIZED.into_response(),
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return StatusCode::SERVICE_UNAVAILABLE.into_response(),
    };
    if !is_member(&db, group_id, user_id) {
        return StatusCode::NOT_FOUND.into_response();
    }
    let relative = db
        .query_row(
            "SELECT COALESCE(avatar_path, '') FROM chat_groups WHERE id = ?1",
            rusqlite::params![group_id],
            |row| row.get::<_, String>(0),
        )
        .unwrap_or_default();
    if !group_avatar_name_is_safe(group_id, &relative) {
        return StatusCode::NOT_FOUND.into_response();
    }
    let bytes = match fs::read(group_avatar_root().join(&relative)) {
        Ok(bytes) => bytes,
        Err(_) => return StatusCode::NOT_FOUND.into_response(),
    };
    let mime = if relative.ends_with(".png") {
        "image/png"
    } else if relative.ends_with(".webp") {
        "image/webp"
    } else {
        "image/jpeg"
    };
    (
        [
            (header::CONTENT_TYPE, HeaderValue::from_static(mime)),
            (
                header::CACHE_CONTROL,
                HeaderValue::from_static("private, max-age=60, must-revalidate"),
            ),
        ],
        bytes,
    )
        .into_response()
}

pub async fn revoke_group_invite(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    let target = format!("/app/group/{group_id}/members");
    if request_is_cross_site(&headers) {
        return Redirect::to(&target).into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Redirect::to("/login?next=/app/messages").into_response(),
    };
    if let Ok(db) = crate::db::pool::get_connection(&state.db_pool) {
        let _ = db.execute(
            "UPDATE chat_groups
             SET invite_nonce = '', updated_at = ?1
             WHERE id = ?2
               AND EXISTS (
                    SELECT 1 FROM chat_group_members AS actor
                    WHERE actor.group_id = chat_groups.id
                      AND actor.user_id = ?3
                      AND actor.role IN (?4, ?5)
               )",
            rusqlite::params![
                unix_now(),
                group_id,
                user_id,
                GROUP_ROLE_OWNER,
                GROUP_ROLE_ADMIN
            ],
        );
    }
    Redirect::to(&target).into_response()
}

pub async fn group_invite_page(
    State(state): State<AppState>,
    Path(token): Path<String>,
    headers: HeaderMap,
) -> Response {
    let Some(invite) = parse_group_invite_token(&state.admin_key, &token, unix_now()) else {
        return Html(templates::render_group_invite(false, &token, "", 0, false)).into_response();
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                "Сервис временно недоступен",
            )
                .into_response()
        }
    };
    let details = db
        .query_row(
            "SELECT chat_groups.name, chat_groups.invite_nonce,
                    COUNT(chat_group_members.user_id)
             FROM chat_groups
             LEFT JOIN chat_group_members ON chat_group_members.group_id = chat_groups.id
             WHERE chat_groups.id = ?1
             GROUP BY chat_groups.id",
            rusqlite::params![invite.group_id],
            |row| {
                Ok((
                    row.get::<_, String>(0)?,
                    row.get::<_, String>(1)?,
                    row.get::<_, i64>(2)?,
                ))
            },
        )
        .ok();
    let Some((name, current_nonce, member_count)) = details else {
        return Html(templates::render_group_invite(false, &token, "", 0, false)).into_response();
    };
    if current_nonce != invite.nonce
        || current_nonce.is_empty()
        || member_count >= MAX_GROUP_MEMBERS
    {
        return Html(templates::render_group_invite(false, &token, "", 0, false)).into_response();
    }
    let user_id = verify_user_session(&state, &headers).unwrap_or(0);
    if user_id > 0 && is_member(&db, invite.group_id, user_id) {
        return Redirect::to(&format!("/app/group/{}", invite.group_id)).into_response();
    }
    Html(templates::render_group_invite(
        user_id > 0,
        &token,
        &name,
        member_count,
        true,
    ))
    .into_response()
}

pub async fn join_group_invite(
    State(state): State<AppState>,
    Path(token): Path<String>,
    headers: HeaderMap,
) -> Response {
    let invite_path = format!("/app/group-invite/{}", urlencoding::encode(&token));
    if request_is_cross_site(&headers) {
        return Redirect::to(&invite_path).into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => {
            return Redirect::to(&format!(
                "/login?next={}",
                urlencoding::encode(&invite_path)
            ))
            .into_response()
        }
    };
    if rate_limit_retry_after(&state, user_id, "group_invite_join", 12, 600)
        .await
        .is_some()
    {
        return Redirect::to(&invite_path).into_response();
    }
    let Some(invite) = parse_group_invite_token(&state.admin_key, &token, unix_now()) else {
        return Redirect::to(&invite_path).into_response();
    };
    let mut db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Redirect::to(&invite_path).into_response(),
    };
    let tx = match db.transaction() {
        Ok(tx) => tx,
        Err(_) => return Redirect::to(&invite_path).into_response(),
    };
    let current_nonce = tx
        .query_row(
            "SELECT invite_nonce FROM chat_groups WHERE id = ?1",
            rusqlite::params![invite.group_id],
            |row| row.get::<_, String>(0),
        )
        .unwrap_or_default();
    let member_count = tx
        .query_row(
            "SELECT COUNT(*) FROM chat_group_members WHERE group_id = ?1",
            rusqlite::params![invite.group_id],
            |row| row.get::<_, i64>(0),
        )
        .unwrap_or(MAX_GROUP_MEMBERS);
    if current_nonce.is_empty()
        || current_nonce != invite.nonce
        || member_count >= MAX_GROUP_MEMBERS
    {
        return Redirect::to(&invite_path).into_response();
    }
    if tx
        .execute(
            "INSERT OR IGNORE INTO chat_group_members (group_id, user_id, joined_at, role)
             VALUES (?1, ?2, ?3, ?4)",
            rusqlite::params![invite.group_id, user_id, unix_now(), GROUP_ROLE_MEMBER],
        )
        .is_err()
        || tx.commit().is_err()
    {
        return Redirect::to(&invite_path).into_response();
    }
    Redirect::to(&format!("/app/group/{}", invite.group_id)).into_response()
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
    let actor_role = group_role(&db, group_id, user_id).unwrap_or_default();
    if group_id <= 0 || !role_can_manage_members(&actor_role) {
        return Redirect::to("/app/messages").into_response();
    }
    let allowed: std::collections::HashSet<i64> = partners_for_picker(&db, user_id)
        .into_iter()
        .map(|(id, _)| id)
        .collect();
    let current: std::collections::HashSet<i64> =
        group_member_ids(&db, group_id).into_iter().collect();
    let members = selected_member_ids(&form.member_ids, user_id, &allowed)
        .into_iter()
        .filter(|id| !current.contains(id))
        .collect::<Vec<_>>();
    if current.len() as i64 + members.len() as i64 > MAX_GROUP_MEMBERS {
        return Redirect::to(&format!("/app/group/{group_id}/members")).into_response();
    }
    let now = unix_now();
    let tx = match db.unchecked_transaction() {
        Ok(tx) => tx,
        Err(_) => return Redirect::to(&format!("/app/group/{group_id}/members")).into_response(),
    };
    let transaction_role = tx
        .query_row(
            "SELECT role FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
            rusqlite::params![group_id, user_id],
            |row| row.get::<_, String>(0),
        )
        .unwrap_or_default();
    let transaction_count = tx
        .query_row(
            "SELECT COUNT(*) FROM chat_group_members WHERE group_id = ?1",
            rusqlite::params![group_id],
            |row| row.get::<_, i64>(0),
        )
        .unwrap_or(MAX_GROUP_MEMBERS);
    if !role_can_manage_members(&transaction_role)
        || transaction_count + members.len() as i64 > MAX_GROUP_MEMBERS
    {
        return Redirect::to(&format!("/app/group/{group_id}/members")).into_response();
    }
    for member in members {
        if tx
            .execute(
                "INSERT INTO chat_group_members (group_id, user_id, joined_at, role)
                 VALUES (?1, ?2, ?3, ?4)",
                rusqlite::params![group_id, member, now, GROUP_ROLE_MEMBER],
            )
            .is_err()
        {
            return Redirect::to(&format!("/app/group/{group_id}/members")).into_response();
        }
    }
    if tx
        .execute(
            "UPDATE chat_groups SET updated_at = ?1 WHERE id = ?2",
            rusqlite::params![now, group_id],
        )
        .is_err()
        || tx.commit().is_err()
    {
        return Redirect::to(&format!("/app/group/{group_id}/members")).into_response();
    }
    Redirect::to(&format!("/app/group/{group_id}/members")).into_response()
}

pub async fn rename_group(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
    Form(form): Form<GroupNameForm>,
) -> Response {
    let target = format!("/app/group/{group_id}/members");
    if request_is_cross_site(&headers) {
        return Redirect::to(&target).into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Redirect::to("/login?next=/app/messages").into_response(),
    };
    let name = form.name.trim();
    let description = form.description.trim();
    if !input_text_is_valid(name, 1, 80)
        || (!description.is_empty() && !input_text_is_valid(description, 1, 500))
    {
        return Redirect::to(&target).into_response();
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Redirect::to(&target).into_response(),
    };
    let role = group_role(&db, group_id, user_id).unwrap_or_default();
    if !role_can_manage_members(&role) {
        return Redirect::to("/app/messages").into_response();
    }
    let _ = db.execute(
        "UPDATE chat_groups
         SET name = ?1, description = ?2, updated_at = ?3
         WHERE id = ?4
           AND EXISTS (
                SELECT 1 FROM chat_group_members AS actor
                WHERE actor.group_id = chat_groups.id
                  AND actor.user_id = ?5
                  AND actor.role IN (?6, ?7)
           )",
        rusqlite::params![
            name,
            description,
            unix_now(),
            group_id,
            user_id,
            GROUP_ROLE_OWNER,
            GROUP_ROLE_ADMIN
        ],
    );
    Redirect::to(&target).into_response()
}

pub async fn update_group_member_role(
    State(state): State<AppState>,
    Path((group_id, member_id)): Path<(i64, i64)>,
    headers: HeaderMap,
    Form(form): Form<GroupRoleForm>,
) -> Response {
    let target = format!("/app/group/{group_id}/members");
    if request_is_cross_site(&headers) {
        return Redirect::to(&target).into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Redirect::to("/login?next=/app/messages").into_response(),
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Redirect::to(&target).into_response(),
    };
    if group_role(&db, group_id, user_id).as_deref() != Some(GROUP_ROLE_OWNER)
        || member_id == user_id
        || !matches!(form.role.as_str(), GROUP_ROLE_ADMIN | GROUP_ROLE_MEMBER)
    {
        return Redirect::to(&target).into_response();
    }
    let changed = db
        .execute(
            "UPDATE chat_group_members
             SET role = ?1
             WHERE group_id = ?2
               AND user_id = ?3
               AND role <> ?4
               AND EXISTS (
                    SELECT 1 FROM chat_group_members AS actor
                    WHERE actor.group_id = ?2 AND actor.user_id = ?5 AND actor.role = ?4
               )",
            rusqlite::params![form.role, group_id, member_id, GROUP_ROLE_OWNER, user_id],
        )
        .unwrap_or(0);
    if changed == 1 {
        let _ = db.execute(
            "UPDATE chat_groups SET updated_at = ?1 WHERE id = ?2",
            rusqlite::params![unix_now(), group_id],
        );
    }
    Redirect::to(&target).into_response()
}

pub async fn update_group_member_mute(
    State(state): State<AppState>,
    Path((group_id, member_id)): Path<(i64, i64)>,
    headers: HeaderMap,
    Form(form): Form<GroupMuteForm>,
) -> Response {
    let target = format!("/app/group/{group_id}/members");
    if request_is_cross_site(&headers) {
        return Redirect::to(&target).into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Redirect::to("/login?next=/app/messages").into_response(),
    };
    if rate_limit_retry_after(&state, user_id, "group_member_mute", 30, 60)
        .await
        .is_some()
    {
        return Redirect::to(&target).into_response();
    }
    if group_id <= 0
        || member_id <= 0
        || member_id == user_id
        || !matches!(form.seconds, 0 | 600 | 3600 | 86_400 | 604_800 | 2_592_000)
    {
        return Redirect::to(&target).into_response();
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Redirect::to(&target).into_response(),
    };
    let actor_role = group_role(&db, group_id, user_id).unwrap_or_default();
    let target_role = group_role(&db, group_id, member_id).unwrap_or_default();
    if !role_can_remove(&actor_role, &target_role) {
        return Redirect::to(&target).into_response();
    }
    let now = unix_now();
    let muted_until = if form.seconds == 0 {
        0
    } else {
        now.saturating_add(form.seconds)
    };
    let changed = db
        .execute(
            "UPDATE chat_group_members
             SET muted_until = ?1
             WHERE group_id = ?2
               AND user_id = ?3
               AND role <> ?4
               AND EXISTS (
                    SELECT 1 FROM chat_group_members AS actor
                    WHERE actor.group_id = ?2
                      AND actor.user_id = ?5
                      AND (
                           actor.role = ?4
                           OR (actor.role = ?6 AND chat_group_members.role = ?7)
                      )
               )",
            rusqlite::params![
                muted_until,
                group_id,
                member_id,
                GROUP_ROLE_OWNER,
                user_id,
                GROUP_ROLE_ADMIN,
                GROUP_ROLE_MEMBER
            ],
        )
        .unwrap_or(0);
    if changed == 1 {
        let _ = db.execute(
            "UPDATE chat_groups SET updated_at = ?1 WHERE id = ?2",
            rusqlite::params![now, group_id],
        );
    }
    Redirect::to(&target).into_response()
}

pub async fn transfer_group_ownership(
    State(state): State<AppState>,
    Path((group_id, member_id)): Path<(i64, i64)>,
    headers: HeaderMap,
) -> Response {
    let target = format!("/app/group/{group_id}/members");
    if request_is_cross_site(&headers) {
        return Redirect::to(&target).into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Redirect::to("/login?next=/app/messages").into_response(),
    };
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Redirect::to(&target).into_response(),
    };
    let _ = transfer_group_owner(&db, group_id, user_id, member_id, unix_now());
    Redirect::to(&target).into_response()
}

pub async fn remove_group_member(
    State(state): State<AppState>,
    Path((group_id, member_id)): Path<(i64, i64)>,
    headers: HeaderMap,
) -> Response {
    let target = format!("/app/group/{group_id}/members");
    if request_is_cross_site(&headers) {
        return Redirect::to(&target).into_response();
    }
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Redirect::to("/login?next=/app/messages").into_response(),
    };
    if member_id == user_id {
        return Redirect::to(&target).into_response();
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Redirect::to(&target).into_response(),
    };
    let actor_role = group_role(&db, group_id, user_id).unwrap_or_default();
    let member_role = group_role(&db, group_id, member_id).unwrap_or_default();
    if !role_can_remove(&actor_role, &member_role) {
        return Redirect::to(&target).into_response();
    }
    if db
        .execute(
            "DELETE FROM chat_group_members
             WHERE group_id = ?1
               AND user_id = ?2
               AND role <> ?3
               AND EXISTS (
                    SELECT 1 FROM chat_group_members AS actor
                    WHERE actor.group_id = ?1
                      AND actor.user_id = ?4
                      AND (
                           actor.role = ?3
                           OR (actor.role = ?5 AND chat_group_members.role = ?6)
                      )
               )",
            rusqlite::params![
                group_id,
                member_id,
                GROUP_ROLE_OWNER,
                user_id,
                GROUP_ROLE_ADMIN,
                GROUP_ROLE_MEMBER
            ],
        )
        .unwrap_or(0)
        == 1
    {
        let _ = db.execute(
            "UPDATE chat_groups SET updated_at = ?1 WHERE id = ?2",
            rusqlite::params![unix_now(), group_id],
        );
    }
    Redirect::to(&target).into_response()
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
    if group_role(&db, group_id, user_id).as_deref() == Some(GROUP_ROLE_OWNER) {
        return Redirect::to(&format!("/app/group/{group_id}/members")).into_response();
    }
    let _ = db.execute(
        "DELETE FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
        rusqlite::params![group_id, user_id],
    );
    Redirect::to("/app/messages").into_response()
}

fn load_group_member_names(
    db: &rusqlite::Connection,
    group_id: i64,
) -> Vec<(i64, String, String, i64)> {
    db.prepare(
        "SELECT member.user_id, member.role, COALESCE(member.muted_until, 0),
                COALESCE(profile.username, ''),
                COALESCE(profile.first_name, ''),
                COALESCE(profile.last_name, '')
         FROM chat_group_members AS member
         LEFT JOIN profiles AS profile ON profile.user_id = member.user_id
         WHERE member.group_id = ?1
         ORDER BY CASE member.role WHEN 'owner' THEN 0 WHEN 'admin' THEN 1 ELSE 2 END,
                  member.joined_at ASC, member.user_id ASC",
    )
    .and_then(|mut stmt| {
        stmt.query_map(rusqlite::params![group_id], |row| {
            let id = row.get::<_, i64>(0)?;
            let role = row.get::<_, String>(1)?;
            let muted_until = row.get::<_, i64>(2)?;
            let username = row.get::<_, String>(3)?;
            let first_name = row.get::<_, String>(4)?;
            let last_name = row.get::<_, String>(5)?;
            Ok((
                id,
                templates::conversation_display_name(id, &username, &first_name, &last_name),
                role,
                muted_until,
            ))
        })?
        .collect::<Result<Vec<_>, _>>()
    })
    .unwrap_or_default()
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
                    WHEN m.attachment_kind = 'image' AND trim(m.message) = '' THEN '__image__'
                    WHEN m.attachment_kind = 'voice' THEN '__voice__'
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
            ),
            CASE WHEN trim(COALESCE(g.avatar_path, '')) <> '' THEN 1 ELSE 0 END,
            COALESCE(pref.pinned_at, 0),
            COALESCE(pref.archived_at, 0),
            COALESCE(pref.muted_until, 0),
            COALESCE(scope.scope_type, ''),
            COALESCE(scope.scope_id, 0)
         FROM chat_groups g
         JOIN chat_group_members mem
           ON mem.group_id = g.id
          AND mem.user_id = ?1
         LEFT JOIN chat_preferences pref
           ON pref.user_id = ?1
          AND pref.chat_kind = 'group'
          AND pref.target_id = g.id
         LEFT JOIN chat_group_scopes AS scope
           ON scope.group_id = g.id
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
                has_avatar: row.get::<_, i64>(5)? != 0,
                pinned_at: row.get(6)?,
                archived_at: row.get(7)?,
                muted_until: row.get(8)?,
                group_scope_type: row.get(9)?,
                group_scope_id: row.get(10)?,
            })
        })?
        .collect::<Result<Vec<_>, _>>()
    })
    .unwrap_or_default()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn group_database() -> rusqlite::Connection {
        let connection = rusqlite::Connection::open_in_memory().expect("group database");
        connection
            .execute_batch(
                "CREATE TABLE chat_group_members (
                    group_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    joined_at INTEGER NOT NULL DEFAULT 0,
                    last_read_message_id INTEGER NOT NULL DEFAULT 0,
                    role TEXT NOT NULL DEFAULT 'member',
                    muted_until INTEGER NOT NULL DEFAULT 0,
                    PRIMARY KEY (group_id, user_id)
                );
                CREATE TABLE user_notifications (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    resource_id INTEGER,
                    kind TEXT NOT NULL,
                    title TEXT NOT NULL,
                    message TEXT NOT NULL,
                    is_read INTEGER NOT NULL DEFAULT 0,
                    created_at INTEGER NOT NULL
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
                CREATE TABLE chat_group_scopes (
                    group_id INTEGER PRIMARY KEY,
                    scope_type TEXT NOT NULL,
                    scope_id INTEGER NOT NULL,
                    UNIQUE(scope_type, scope_id)
                );
                CREATE TABLE profiles (
                    user_id INTEGER PRIMARY KEY,
                    username TEXT,
                    first_name TEXT,
                    last_name TEXT
                );
                CREATE TABLE group_messages (
                    id INTEGER PRIMARY KEY,
                    group_id INTEGER NOT NULL,
                    sender_user_id INTEGER NOT NULL,
                    message TEXT NOT NULL DEFAULT '',
                    created_at INTEGER NOT NULL,
                    edited_at INTEGER NOT NULL DEFAULT 0,
                    deleted_at INTEGER NOT NULL DEFAULT 0,
                    attachment_kind TEXT NOT NULL DEFAULT '',
                    attachment_path TEXT NOT NULL DEFAULT '',
                    client_message_id TEXT NOT NULL DEFAULT '',
                    reply_to_message_id INTEGER NOT NULL DEFAULT 0
                );
                CREATE TABLE group_message_reactions (
                    message_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    emoji TEXT NOT NULL,
                    PRIMARY KEY (message_id, user_id)
                );",
            )
            .expect("group schema");
        connection
    }

    #[test]
    fn group_notifications_are_coalesced_for_every_recipient() {
        let connection = group_database();
        connection
            .execute_batch(
                "INSERT INTO chat_group_members (group_id, user_id)
                 VALUES (7, 1), (7, 2), (7, 3);
                 INSERT INTO user_notifications (
                    user_id, resource_id, kind, title, message, is_read, created_at
                 ) VALUES (2, 7, 'group_message', 'Старое', 'Старое', 0, 1);",
            )
            .expect("notification fixtures");

        notify_group_members(&connection, 7, 1, "Новое", "Первое");
        notify_group_members(&connection, 7, 1, "Новое", "Второе");

        let recipients: Vec<(i64, String)> = connection
            .prepare(
                "SELECT user_id, message
                 FROM user_notifications
                 WHERE kind = 'group_message' AND is_read = 0
                 ORDER BY user_id",
            )
            .expect("notification query")
            .query_map([], |row| Ok((row.get(0)?, row.get(1)?)))
            .expect("notification rows")
            .collect::<Result<_, _>>()
            .expect("notification values");

        assert_eq!(recipients, vec![(2, "Второе".into()), (3, "Второе".into())]);
    }

    #[test]
    fn group_history_batches_names_replies_reactions_and_read_ticks() {
        let connection = group_database();
        connection
            .execute_batch(
                "INSERT INTO chat_group_members (group_id, user_id, last_read_message_id)
                 VALUES (7, 1, 0), (7, 2, 11), (7, 3, 0);
                 INSERT INTO profiles (user_id, username, first_name, last_name)
                 VALUES (1, '', 'Амир', ''), (2, '', 'Лейла', 'А');
                 INSERT INTO group_messages (
                    id, group_id, sender_user_id, message, created_at, reply_to_message_id
                 ) VALUES
                    (10, 7, 1, 'Первое', 100, 0),
                    (11, 7, 2, 'Ответ', 101, 10);
                 INSERT INTO group_message_reactions (message_id, user_id, emoji)
                 VALUES (11, 1, '👍'), (11, 2, '👍');",
            )
            .expect("history fixtures");

        let messages = load_group_messages(&connection, 7, 1, 0, 0, 100);

        assert_eq!(messages.len(), 2);
        assert_eq!(messages[0].sender_name, "Амир");
        assert_eq!(messages[0].delivered_at, 100);
        assert_eq!(messages[0].read_at, 0);
        assert_eq!(messages[1].sender_name, "Лейла А");
        assert_eq!(messages[1].reply_sender_user_id, 1);
        assert_eq!(messages[1].reply_sender_name, "Амир");
        assert_eq!(messages[1].reply_message, "Первое");
        assert_eq!(messages[1].reactions.len(), 1);
        assert_eq!(messages[1].reactions[0].count, 2);
        assert!(messages[1].reactions[0].mine);

        let response = message_json(&messages[1], 1);
        assert_eq!(response["reply_sender_name"], "Амир");
        assert_eq!(response["reactions"][0]["count"], 2);
    }

    #[test]
    fn member_can_read_group_history_from_before_joining() {
        let connection = group_database();
        connection
            .execute_batch(
                "INSERT INTO chat_group_members (group_id, user_id, joined_at)
                 VALUES (7, 2, 200);
                 INSERT INTO group_messages (
                    id, group_id, sender_user_id, message, created_at
                 ) VALUES (10, 7, 1, 'История группы', 100);",
            )
            .expect("history visibility fixtures");

        let messages = load_group_messages(&connection, 7, 2, 0, 0, 100);

        assert_eq!(messages.len(), 1);
        assert_eq!(messages[0].message, "История группы");
        assert!(messages[0].created_at < 200);
    }

    #[test]
    fn group_delivery_ticks_distinguish_one_reader_from_every_reader() {
        let connection = group_database();
        connection
            .execute_batch(
                "INSERT INTO chat_group_members (group_id, user_id, last_read_message_id)
                 VALUES (8, 1, 0), (8, 2, 12), (8, 3, 10);
                 INSERT INTO group_messages (
                    id, group_id, sender_user_id, message, created_at, reply_to_message_id
                 ) VALUES
                    (10, 8, 1, 'Прочитано всеми', 100, 0),
                    (11, 8, 1, 'Прочитано одним', 101, 0),
                    (13, 8, 1, 'Не прочитано', 103, 0);",
            )
            .expect("receipt fixtures");

        let messages = load_group_messages(&connection, 8, 1, 0, 0, 100);

        assert_eq!(messages.len(), 3);
        assert_eq!(messages[0].delivered_at, 100);
        assert_eq!(messages[0].read_at, 100);
        assert_eq!(messages[1].delivered_at, 101);
        assert_eq!(messages[1].read_at, 0);
        assert_eq!(messages[2].delivered_at, 0);
        assert_eq!(messages[2].read_at, 0);
    }

    #[test]
    fn group_invite_tokens_are_signed_expiring_and_tamper_evident() {
        let (token, nonce) =
            create_group_invite_token("test-secret", 77, 1_000).expect("invite token");
        let parsed = parse_group_invite_token("test-secret", &token, 1_001).expect("valid token");

        assert_eq!(parsed.group_id, 77);
        assert_eq!(parsed.nonce, nonce);
        assert!(parse_group_invite_token("wrong-secret", &token, 1_001).is_none());
        assert!(parse_group_invite_token(
            "test-secret",
            &token,
            1_000 + GROUP_INVITE_LIFETIME_SECONDS
        )
        .is_none());

        let tampered = token.replacen("77.", "78.", 1);
        assert!(parse_group_invite_token("test-secret", &tampered, 1_001).is_none());
    }

    #[test]
    fn group_avatar_names_cannot_escape_the_private_directory() {
        assert!(group_avatar_name_is_safe(7, "7-a1b2c3.webp"));
        assert!(!group_avatar_name_is_safe(8, "7-a1b2c3.webp"));
        assert!(!group_avatar_name_is_safe(7, "../secret.jpg"));
        assert!(!group_avatar_name_is_safe(7, "nested/avatar.png"));
        assert!(!group_avatar_name_is_safe(7, "nested\\avatar.png"));
        assert!(!group_avatar_name_is_safe(7, ""));
    }

    #[test]
    fn group_send_accepts_an_explicit_null_reply() {
        let payload: GroupSendPayload = serde_json::from_str(
            r#"{"message":"Обычное сообщение","client_message_id":"1234567890abcdef","reply_to_message_id":null}"#,
        )
        .expect("group send payload with no reply");

        assert_eq!(payload.reply_to_message_id, None);
    }

    #[test]
    fn group_management_permissions_keep_owner_control_bounded() {
        assert!(role_can_manage_members(GROUP_ROLE_OWNER));
        assert!(role_can_manage_members(GROUP_ROLE_ADMIN));
        assert!(!role_can_manage_members(GROUP_ROLE_MEMBER));
        assert!(role_can_remove(GROUP_ROLE_OWNER, GROUP_ROLE_ADMIN));
        assert!(role_can_remove(GROUP_ROLE_OWNER, GROUP_ROLE_MEMBER));
        assert!(!role_can_remove(GROUP_ROLE_OWNER, GROUP_ROLE_OWNER));
        assert!(role_can_remove(GROUP_ROLE_ADMIN, GROUP_ROLE_MEMBER));
        assert!(!role_can_remove(GROUP_ROLE_ADMIN, GROUP_ROLE_ADMIN));
        assert!(!role_can_remove(GROUP_ROLE_MEMBER, GROUP_ROLE_MEMBER));
    }

    #[test]
    fn group_moderation_respects_role_hierarchy_and_mute_deadlines() {
        assert!(role_can_moderate_message("member", 10, 10, "member"));
        assert!(role_can_moderate_message("owner", 10, 20, "admin"));
        assert!(role_can_moderate_message("admin", 10, 20, "member"));
        assert!(role_can_moderate_message("admin", 10, 20, ""));
        assert!(!role_can_moderate_message("admin", 10, 20, "admin"));
        assert!(!role_can_moderate_message("admin", 10, 20, "owner"));
        assert!(!role_can_moderate_message("member", 10, 20, "member"));

        let connection = group_database();
        connection
            .execute(
                "INSERT INTO chat_group_members (
                    group_id, user_id, joined_at, role, muted_until
                 ) VALUES (7, 20, 100, 'member', 900)",
                [],
            )
            .expect("muted member fixture");
        assert_eq!(group_member_muted_until(&connection, 7, 20), 900);
        assert_eq!(group_member_muted_until(&connection, 7, 21), 0);
    }

    #[test]
    fn ownership_transfer_is_atomic_and_keeps_exactly_one_owner() {
        let connection = group_database();
        connection
            .execute_batch(
                "CREATE TABLE chat_groups (
                    id INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    created_by INTEGER NOT NULL,
                    created_at INTEGER NOT NULL,
                    owner_user_id INTEGER NOT NULL,
                    updated_at INTEGER NOT NULL
                 );
                 CREATE UNIQUE INDEX idx_chat_group_single_owner
                 ON chat_group_members(group_id) WHERE role = 'owner';
                 INSERT INTO chat_groups (
                    id, name, created_by, created_at, owner_user_id, updated_at
                 ) VALUES (7, 'Команда', 1, 100, 1, 100);
                 INSERT INTO chat_group_members (group_id, user_id, joined_at, role)
                 VALUES (7, 1, 100, 'owner'), (7, 2, 101, 'member');",
            )
            .expect("ownership fixtures");

        assert!(transfer_group_owner(&connection, 7, 1, 2, 200).expect("ownership transfer"));
        assert!(!transfer_group_owner(&connection, 7, 1, 2, 201).expect("stale owner rejected"));

        let group: (i64, i64) = connection
            .query_row(
                "SELECT owner_user_id, updated_at FROM chat_groups WHERE id = 7",
                [],
                |row| Ok((row.get(0)?, row.get(1)?)),
            )
            .expect("group owner");
        let roles: Vec<(i64, String)> = connection
            .prepare(
                "SELECT user_id, role FROM chat_group_members WHERE group_id = 7 ORDER BY user_id",
            )
            .expect("role query")
            .query_map([], |row| Ok((row.get(0)?, row.get(1)?)))
            .expect("role rows")
            .collect::<Result<_, _>>()
            .expect("role values");
        let owner_count = roles.iter().filter(|(_, role)| role == "owner").count();

        assert_eq!(group, (2, 200));
        assert_eq!(roles, vec![(1, "admin".into()), (2, "owner".into())]);
        assert_eq!(owner_count, 1);
    }

    #[test]
    fn group_media_replies_require_an_active_message_in_the_same_group() {
        let connection = group_database();
        connection
            .execute_batch(
                "INSERT INTO group_messages (
                    id, group_id, sender_user_id, message, created_at, deleted_at
                 ) VALUES
                    (10, 7, 1, 'Доступно', 100, 0),
                    (11, 7, 1, 'Удалено', 101, 1),
                    (12, 8, 1, 'Другая группа', 102, 0);",
            )
            .expect("reply fixtures");

        assert_eq!(positive_message_id("10"), Some(10));
        assert_eq!(positive_message_id("0"), None);
        assert_eq!(positive_message_id("не число"), None);
        assert!(group_reply_is_valid(&connection, 7, 0));
        assert!(group_reply_is_valid(&connection, 7, 10));
        assert!(!group_reply_is_valid(&connection, 7, 11));
        assert!(!group_reply_is_valid(&connection, 7, 12));
    }

    #[test]
    fn group_inbox_uses_an_image_marker_for_image_only_messages() {
        let connection = group_database();
        connection
            .execute_batch(
                "CREATE TABLE chat_groups (
                    id INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    created_at INTEGER NOT NULL,
                    avatar_path TEXT NOT NULL DEFAULT ''
                 );
                 INSERT INTO chat_groups (id, name, created_at, avatar_path)
                 VALUES (7, 'Команда', 100, '7-avatar.webp');
                 INSERT INTO chat_group_members (
                    group_id, user_id, joined_at, last_read_message_id
                 ) VALUES (7, 1, 100, 0);
                 INSERT INTO chat_preferences (
                    user_id, chat_kind, target_id, archived_at
                 ) VALUES (1, 'group', 7, 150);
                 INSERT INTO group_messages (
                    id, group_id, sender_user_id, message, created_at, attachment_kind
                 ) VALUES (20, 7, 2, '', 101, 'image');",
            )
            .expect("group inbox fixtures");

        let conversations = load_user_groups(&connection, 1);
        assert_eq!(conversations.len(), 1);
        assert_eq!(conversations[0].last_message, "__image__");
        assert_eq!(conversations[0].archived_at, 150);
        assert!(conversations[0].has_avatar);
    }
}
