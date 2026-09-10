use rusqlite::{Connection, Result};

pub const KIND_DIRECT: &str = "direct";
pub const KIND_GROUP: &str = "group";

pub fn initialize(conn: &Connection) -> Result<()> {
    let tx = conn.unchecked_transaction()?;
    tx.execute_batch(
        "CREATE TABLE IF NOT EXISTS chat_preferences (
            user_id INTEGER NOT NULL,
            chat_kind TEXT NOT NULL CHECK (chat_kind IN ('direct', 'group')),
            target_id INTEGER NOT NULL CHECK (target_id > 0),
            pinned_at INTEGER NOT NULL DEFAULT 0,
            archived_at INTEGER NOT NULL DEFAULT 0,
            muted_until INTEGER NOT NULL DEFAULT 0,
            updated_at INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (user_id, chat_kind, target_id)
         );
         CREATE INDEX IF NOT EXISTS idx_chat_preferences_inbox
         ON chat_preferences(user_id, archived_at, pinned_at DESC, updated_at DESC);",
    )?;
    tx.commit()
}

pub fn notifications_muted(
    conn: &Connection,
    user_id: i64,
    chat_kind: &str,
    target_id: i64,
    now: i64,
) -> bool {
    conn.query_row(
        "SELECT 1 FROM chat_preferences
         WHERE user_id = ?1 AND chat_kind = ?2 AND target_id = ?3 AND muted_until > ?4",
        rusqlite::params![user_id, chat_kind, target_id, now],
        |_| Ok(()),
    )
    .is_ok()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn preferences_are_account_scoped_and_idempotent() {
        let connection = Connection::open_in_memory().expect("preferences database");
        initialize(&connection).expect("first migration");
        initialize(&connection).expect("second migration");
        connection
            .execute(
                "INSERT INTO chat_preferences (
                    user_id, chat_kind, target_id, muted_until, updated_at
                 ) VALUES (1, 'direct', 9, 500, 100)",
                [],
            )
            .expect("preference fixture");

        assert!(notifications_muted(&connection, 1, KIND_DIRECT, 9, 200));
        assert!(!notifications_muted(&connection, 2, KIND_DIRECT, 9, 200));
        assert!(!notifications_muted(&connection, 1, KIND_GROUP, 9, 200));
        assert!(!notifications_muted(&connection, 1, KIND_DIRECT, 9, 600));
    }
}
