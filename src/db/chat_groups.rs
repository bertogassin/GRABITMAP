use rusqlite::{Connection, Result};

pub fn initialize(conn: &Connection) -> Result<()> {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS chat_groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            created_by INTEGER NOT NULL,
            created_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS chat_group_members (
            group_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            joined_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
            PRIMARY KEY (group_id, user_id)
        )",
        [],
    )?;

    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_chat_group_members_user
         ON chat_group_members(user_id, joined_at)",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS group_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_id INTEGER NOT NULL,
            sender_user_id INTEGER NOT NULL,
            message TEXT NOT NULL DEFAULT '',
            created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
            edited_at INTEGER NOT NULL DEFAULT 0,
            deleted_at INTEGER NOT NULL DEFAULT 0,
            attachment_kind TEXT NOT NULL DEFAULT '',
            attachment_path TEXT NOT NULL DEFAULT '',
            attachment_mime TEXT NOT NULL DEFAULT '',
            attachment_size INTEGER NOT NULL DEFAULT 0,
            client_message_id TEXT NOT NULL DEFAULT '',
            reply_to_message_id INTEGER NOT NULL DEFAULT 0
        )",
        [],
    )?;

    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_group_messages_group
         ON group_messages(group_id, id)",
        [],
    )?;

    conn.execute(
        "CREATE UNIQUE INDEX IF NOT EXISTS idx_group_messages_client_id
         ON group_messages(sender_user_id, client_message_id)
         WHERE client_message_id != ''",
        [],
    )?;

    let _ = conn.execute(
        "ALTER TABLE chat_group_members
         ADD COLUMN last_read_message_id INTEGER NOT NULL DEFAULT 0",
        [],
    );

    conn.execute(
        "CREATE TABLE IF NOT EXISTS group_message_reactions (
            message_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            emoji TEXT NOT NULL,
            created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
            PRIMARY KEY (message_id, user_id)
        )",
        [],
    )?;

    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_group_message_reactions_message
         ON group_message_reactions(message_id, emoji)",
        [],
    )?;

    Ok(())
}

pub fn ensure_profile_avatar_column(conn: &Connection) -> Result<()> {
    let _ = conn.execute(
        "ALTER TABLE profiles
         ADD COLUMN avatar_path TEXT NOT NULL DEFAULT ''",
        [],
    );
    Ok(())
}
