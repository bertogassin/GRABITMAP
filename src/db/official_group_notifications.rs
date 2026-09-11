use crate::web::view_models::NotificationRow;
use rusqlite::{params, Connection};

pub fn load(connection: &Connection, user_id: i64, now: i64) -> Vec<NotificationRow> {
    if user_id <= 0 {
        return Vec::new();
    }
    connection
        .prepare(
            "SELECT g.id, g.name, latest.message, latest.created_at
         FROM chat_group_members AS member
         JOIN chat_groups AS g ON g.id = member.group_id
         JOIN chat_group_scopes AS scope ON scope.group_id = g.id
         JOIN group_messages AS latest ON latest.id = (
            SELECT MAX(message.id) FROM group_messages AS message
            WHERE message.group_id = g.id
              AND message.sender_user_id <> ?1
              AND message.deleted_at = 0
              AND message.id > COALESCE(member.last_read_message_id, 0)
         )
         LEFT JOIN chat_preferences AS preference
           ON preference.user_id = ?1 AND preference.chat_kind = 'group'
          AND preference.target_id = g.id
         WHERE member.user_id = ?1
           AND COALESCE(preference.muted_until, 0) <= ?2
         ORDER BY latest.created_at DESC, latest.id DESC
         LIMIT 100",
        )
        .and_then(|mut statement| {
            statement
                .query_map(params![user_id, now], |row| {
                    let group_id = row.get::<_, i64>(0)?;
                    let group_name = row.get::<_, String>(1)?;
                    let preview = row.get::<_, String>(2)?;
                    Ok((
                        -group_id,
                        Some(group_id),
                        "official_group_message".to_string(),
                        format!("Новое сообщение · {group_name}"),
                        preview,
                        0,
                        row.get(3)?,
                    ))
                })?
                .collect::<Result<Vec<_>, _>>()
        })
        .unwrap_or_default()
}

pub fn unread_count(connection: &Connection, user_id: i64, now: i64) -> i64 {
    if user_id <= 0 {
        return 0;
    }
    connection
        .query_row(
            "SELECT COUNT(*) FROM chat_group_members AS member
         JOIN chat_group_scopes AS scope ON scope.group_id = member.group_id
         LEFT JOIN chat_preferences AS preference
           ON preference.user_id = ?1 AND preference.chat_kind = 'group'
          AND preference.target_id = member.group_id
         WHERE member.user_id = ?1
           AND COALESCE(preference.muted_until, 0) <= ?2
           AND EXISTS (
              SELECT 1 FROM group_messages AS message
              WHERE message.group_id = member.group_id
                AND message.sender_user_id <> ?1 AND message.deleted_at = 0
                AND message.id > COALESCE(member.last_read_message_id, 0)
           )",
            params![user_id, now],
            |row| row.get(0),
        )
        .unwrap_or(0)
}

pub fn resolve_group(connection: &Connection, user_id: i64, notification_id: i64) -> Option<i64> {
    let group_id = notification_id.checked_neg().filter(|id| *id > 0)?;
    connection
        .query_row(
            "SELECT member.group_id FROM chat_group_members AS member
         JOIN chat_group_scopes AS scope ON scope.group_id = member.group_id
         WHERE member.user_id = ?1 AND member.group_id = ?2",
            params![user_id, group_id],
            |row| row.get(0),
        )
        .ok()
}

pub fn mark_all_read(connection: &Connection, user_id: i64) {
    if user_id <= 0 {
        return;
    }
    let _ = connection.execute(
        "UPDATE chat_group_members AS member
         SET last_read_message_id = MAX(COALESCE(member.last_read_message_id, 0),
             COALESCE((SELECT MAX(message.id) FROM group_messages AS message
                       WHERE message.group_id = member.group_id), 0))
         WHERE member.user_id = ?1
           AND EXISTS (SELECT 1 FROM chat_group_scopes AS scope
                       WHERE scope.group_id = member.group_id)",
        params![user_id],
    );
}

#[cfg(test)]
mod tests {
    use super::*;
    fn db() -> Connection {
        let db = Connection::open_in_memory().unwrap();
        db.execute_batch("CREATE TABLE chat_groups(id INTEGER PRIMARY KEY,name TEXT);
          CREATE TABLE chat_group_scopes(group_id INTEGER PRIMARY KEY);
          CREATE TABLE chat_group_members(group_id INTEGER,user_id INTEGER,last_read_message_id INTEGER,PRIMARY KEY(group_id,user_id));
          CREATE TABLE group_messages(id INTEGER PRIMARY KEY,group_id INTEGER,sender_user_id INTEGER,message TEXT,deleted_at INTEGER,created_at INTEGER);
          CREATE TABLE chat_preferences(user_id INTEGER,chat_kind TEXT,target_id INTEGER,muted_until INTEGER);
          INSERT INTO chat_groups VALUES(7,'Город'); INSERT INTO chat_group_scopes VALUES(7);
          INSERT INTO chat_group_members VALUES(7,1,0); INSERT INTO group_messages VALUES(10,7,2,'Привет',0,100);").unwrap();
        db
    }
    #[test]
    fn virtual_notification_uses_no_personal_row() {
        let db = db();
        let rows = load(&db, 1, 200);
        assert_eq!(rows.len(), 1);
        assert_eq!(rows[0].0, -7);
        assert_eq!(unread_count(&db, 1, 200), 1);
        assert_eq!(resolve_group(&db, 1, -7), Some(7));
        mark_all_read(&db, 1);
        assert_eq!(unread_count(&db, 1, 200), 0);
    }
    #[test]
    fn muted_official_group_is_excluded() {
        let db = db();
        db.execute("INSERT INTO chat_preferences VALUES(1,'group',7,500)", [])
            .unwrap();
        assert!(load(&db, 1, 200).is_empty());
        assert_eq!(unread_count(&db, 1, 200), 0);
    }
}
