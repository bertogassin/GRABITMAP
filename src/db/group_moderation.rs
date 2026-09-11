use rusqlite::{params, Connection, Result, Transaction};

pub const ACTION_MUTE: &str = "mute";
pub const ACTION_UNMUTE: &str = "unmute";
pub const ACTION_REMOVE: &str = "remove";
const ACTION_RESTORE: &str = "restore";

pub struct NewModerationEvent<'a> {
    pub group_id: i64,
    pub actor_user_id: i64,
    pub target_user_id: i64,
    pub action: &'a str,
    pub duration_seconds: i64,
    pub reason: &'a str,
    pub created_at: i64,
}

pub fn initialize(connection: &Connection) -> Result<()> {
    connection.execute_batch(
        "CREATE TABLE IF NOT EXISTS chat_group_member_blocks (
            group_id INTEGER NOT NULL CHECK(group_id > 0),
            user_id INTEGER NOT NULL CHECK(user_id > 0),
            blocked_by_user_id INTEGER NOT NULL CHECK(blocked_by_user_id > 0),
            reason TEXT NOT NULL DEFAULT '',
            created_at INTEGER NOT NULL,
            revoked_at INTEGER NOT NULL DEFAULT 0,
            revoked_by_user_id INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY(group_id, user_id)
         );

         CREATE INDEX IF NOT EXISTS idx_chat_group_member_blocks_active
         ON chat_group_member_blocks(group_id, user_id)
         WHERE revoked_at = 0;

         CREATE TABLE IF NOT EXISTS chat_group_moderation_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_id INTEGER NOT NULL CHECK(group_id > 0),
            actor_user_id INTEGER NOT NULL CHECK(actor_user_id > 0),
            target_user_id INTEGER NOT NULL CHECK(target_user_id > 0),
            action TEXT NOT NULL
                CHECK(action IN ('mute', 'unmute', 'remove', 'restore')),
            duration_seconds INTEGER NOT NULL DEFAULT 0
                CHECK(duration_seconds >= 0),
            reason TEXT NOT NULL DEFAULT '',
            created_at INTEGER NOT NULL
         );

         CREATE INDEX IF NOT EXISTS idx_chat_group_moderation_events_group
         ON chat_group_moderation_events(group_id, id DESC);

         CREATE INDEX IF NOT EXISTS idx_chat_group_moderation_events_target
         ON chat_group_moderation_events(group_id, target_user_id, id DESC);

         CREATE TRIGGER IF NOT EXISTS chat_group_moderation_events_no_update
         BEFORE UPDATE ON chat_group_moderation_events
         BEGIN
             SELECT RAISE(ABORT, 'group_moderation_events_are_append_only');
         END;

         CREATE TRIGGER IF NOT EXISTS chat_group_moderation_events_no_delete
         BEFORE DELETE ON chat_group_moderation_events
         BEGIN
             SELECT RAISE(ABORT, 'group_moderation_events_are_append_only');
         END;",
    )
}

pub fn member_is_blocked(connection: &Connection, group_id: i64, user_id: i64) -> bool {
    if group_id <= 0 || user_id <= 0 {
        return false;
    }
    connection
        .query_row(
            "SELECT 1 FROM chat_group_member_blocks
             WHERE group_id = ?1 AND user_id = ?2 AND revoked_at = 0",
            params![group_id, user_id],
            |_| Ok(()),
        )
        .is_ok()
}

pub fn record_event(transaction: &Transaction<'_>, event: &NewModerationEvent<'_>) -> Result<()> {
    transaction.execute(
        "INSERT INTO chat_group_moderation_events (
            group_id, actor_user_id, target_user_id, action,
            duration_seconds, reason, created_at
         ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
        params![
            event.group_id,
            event.actor_user_id,
            event.target_user_id,
            event.action,
            event.duration_seconds,
            event.reason,
            event.created_at
        ],
    )?;
    Ok(())
}

pub fn block_member(
    transaction: &Transaction<'_>,
    group_id: i64,
    actor_user_id: i64,
    target_user_id: i64,
    reason: &str,
    created_at: i64,
) -> Result<()> {
    transaction.execute(
        "INSERT INTO chat_group_member_blocks (
            group_id, user_id, blocked_by_user_id, reason, created_at,
            revoked_at, revoked_by_user_id
         ) VALUES (?1, ?2, ?3, ?4, ?5, 0, 0)
         ON CONFLICT(group_id, user_id) DO UPDATE SET
            blocked_by_user_id = excluded.blocked_by_user_id,
            reason = excluded.reason,
            created_at = excluded.created_at,
            revoked_at = 0,
            revoked_by_user_id = 0",
        params![group_id, target_user_id, actor_user_id, reason, created_at],
    )?;
    record_event(
        transaction,
        &NewModerationEvent {
            group_id,
            actor_user_id,
            target_user_id,
            action: ACTION_REMOVE,
            duration_seconds: 0,
            reason,
            created_at,
        },
    )
}

pub fn restore_member(
    transaction: &Transaction<'_>,
    group_id: i64,
    actor_user_id: i64,
    target_user_id: i64,
    reason: &str,
    created_at: i64,
) -> Result<bool> {
    let changed = transaction.execute(
        "UPDATE chat_group_member_blocks
         SET revoked_at = ?1, revoked_by_user_id = ?2
         WHERE group_id = ?3 AND user_id = ?4 AND revoked_at = 0",
        params![created_at, actor_user_id, group_id, target_user_id],
    )?;
    if changed == 1 {
        record_event(
            transaction,
            &NewModerationEvent {
                group_id,
                actor_user_id,
                target_user_id,
                action: ACTION_RESTORE,
                duration_seconds: 0,
                reason,
                created_at,
            },
        )?;
    }
    Ok(changed == 1)
}

#[cfg(test)]
mod tests {
    use super::*;

    fn database() -> Connection {
        let connection = Connection::open_in_memory().expect("moderation database");
        initialize(&connection).expect("moderation schema");
        connection
    }

    #[test]
    fn migration_is_idempotent_and_indexes_point_lookups() {
        let connection = database();
        initialize(&connection).expect("second migration");

        let indexes: String = connection
            .prepare(
                "SELECT group_concat(name, ',') FROM sqlite_master
                 WHERE type = 'index' AND tbl_name IN (
                    'chat_group_member_blocks', 'chat_group_moderation_events'
                 )",
            )
            .expect("index query")
            .query_row([], |row| row.get(0))
            .expect("indexes");

        assert!(indexes.contains("idx_chat_group_member_blocks_active"));
        assert!(indexes.contains("idx_chat_group_moderation_events_target"));
    }

    #[test]
    fn removal_block_is_restorable_and_audited() {
        let mut connection = database();
        let transaction = connection.transaction().expect("block transaction");
        block_member(&transaction, 7, 10, 20, "Нарушение правил", 100).expect("block member");
        transaction.commit().expect("block commit");
        assert!(member_is_blocked(&connection, 7, 20));

        let transaction = connection.transaction().expect("restore transaction");
        assert!(
            restore_member(&transaction, 7, 10, 20, "Апелляция принята", 200)
                .expect("restore member")
        );
        transaction.commit().expect("restore commit");
        assert!(!member_is_blocked(&connection, 7, 20));

        let actions: String = connection
            .prepare(
                "SELECT group_concat(action, ',')
                 FROM chat_group_moderation_events ORDER BY id",
            )
            .expect("event query")
            .query_row([], |row| row.get(0))
            .expect("events");
        assert_eq!(actions, "remove,restore");
    }

    #[test]
    fn moderation_events_are_append_only() {
        let mut connection = database();
        let transaction = connection.transaction().expect("event transaction");
        record_event(
            &transaction,
            &NewModerationEvent {
                group_id: 7,
                actor_user_id: 10,
                target_user_id: 20,
                action: ACTION_MUTE,
                duration_seconds: 600,
                reason: "Флуд",
                created_at: 100,
            },
        )
        .expect("event");
        transaction.commit().expect("event commit");

        assert!(connection
            .execute(
                "UPDATE chat_group_moderation_events SET reason = 'changed'",
                []
            )
            .is_err());
        assert!(connection
            .execute("DELETE FROM chat_group_moderation_events", [])
            .is_err());
    }
}
