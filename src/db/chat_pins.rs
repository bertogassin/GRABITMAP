use rusqlite::{Connection, Result};

pub const KIND_DIRECT: &str = "direct";
pub const KIND_GROUP: &str = "group";

pub fn initialize(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS chat_message_pins (
            chat_kind TEXT NOT NULL CHECK (chat_kind IN ('direct', 'group')),
            target_id INTEGER NOT NULL CHECK (target_id > 0),
            message_id INTEGER NOT NULL CHECK (message_id > 0),
            pinned_by INTEGER NOT NULL CHECK (pinned_by > 0),
            pinned_at INTEGER NOT NULL CHECK (pinned_at > 0),
            PRIMARY KEY (chat_kind, target_id)
         );
         CREATE INDEX IF NOT EXISTS idx_chat_message_pins_message
         ON chat_message_pins(chat_kind, message_id);",
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn one_pin_per_chat_replaces_cleanly_and_is_idempotent() {
        let connection = Connection::open_in_memory().expect("pin database");
        initialize(&connection).expect("first migration");
        initialize(&connection).expect("second migration");
        connection
            .execute(
                "INSERT INTO chat_message_pins (
                    chat_kind, target_id, message_id, pinned_by, pinned_at
                 ) VALUES (?1, 7, 10, 1, 100)
                 ON CONFLICT(chat_kind, target_id) DO UPDATE SET
                    message_id = excluded.message_id,
                    pinned_by = excluded.pinned_by,
                    pinned_at = excluded.pinned_at",
                rusqlite::params![KIND_DIRECT],
            )
            .expect("first pin");
        connection
            .execute(
                "INSERT INTO chat_message_pins (
                    chat_kind, target_id, message_id, pinned_by, pinned_at
                 ) VALUES (?1, 7, 11, 2, 101)
                 ON CONFLICT(chat_kind, target_id) DO UPDATE SET
                    message_id = excluded.message_id,
                    pinned_by = excluded.pinned_by,
                    pinned_at = excluded.pinned_at",
                rusqlite::params![KIND_DIRECT],
            )
            .expect("replacement pin");

        let pin: (i64, i64) = connection
            .query_row(
                "SELECT message_id, pinned_by FROM chat_message_pins
                 WHERE chat_kind = ?1 AND target_id = 7",
                rusqlite::params![KIND_DIRECT],
                |row| Ok((row.get(0)?, row.get(1)?)),
            )
            .expect("stored pin");
        assert_eq!(pin, (11, 2));
        assert!(connection
            .execute(
                "INSERT INTO chat_message_pins (
                    chat_kind, target_id, message_id, pinned_by, pinned_at
                 ) VALUES ('invalid', 7, 12, 1, 102)",
                [],
            )
            .is_err());
        assert_ne!(KIND_DIRECT, KIND_GROUP);
    }
}
