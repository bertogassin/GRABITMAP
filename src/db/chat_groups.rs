use rusqlite::{Connection, Result};

pub fn initialize(conn: &Connection) -> Result<()> {
    let tx = conn.unchecked_transaction()?;
    tx.execute(
        "CREATE TABLE IF NOT EXISTS chat_groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            created_by INTEGER NOT NULL,
            created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
            owner_user_id INTEGER NOT NULL DEFAULT 0,
            updated_at INTEGER NOT NULL DEFAULT 0,
            invite_nonce TEXT NOT NULL DEFAULT '',
            description TEXT NOT NULL DEFAULT '',
            avatar_path TEXT NOT NULL DEFAULT ''
        )",
        [],
    )?;

    let _ = tx.execute(
        "ALTER TABLE chat_groups
         ADD COLUMN owner_user_id INTEGER NOT NULL DEFAULT 0",
        [],
    );
    let _ = tx.execute(
        "ALTER TABLE chat_groups
         ADD COLUMN updated_at INTEGER NOT NULL DEFAULT 0",
        [],
    );
    let _ = tx.execute(
        "ALTER TABLE chat_groups
         ADD COLUMN invite_nonce TEXT NOT NULL DEFAULT ''",
        [],
    );
    let _ = tx.execute(
        "ALTER TABLE chat_groups
         ADD COLUMN description TEXT NOT NULL DEFAULT ''",
        [],
    );
    let _ = tx.execute(
        "ALTER TABLE chat_groups
         ADD COLUMN avatar_path TEXT NOT NULL DEFAULT ''",
        [],
    );

    tx.execute(
        "CREATE TABLE IF NOT EXISTS chat_group_members (
            group_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            joined_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
            role TEXT NOT NULL DEFAULT 'member'
                CHECK (role IN ('owner', 'admin', 'member')),
            muted_until INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (group_id, user_id)
        )",
        [],
    )?;

    tx.execute(
        "CREATE INDEX IF NOT EXISTS idx_chat_group_members_user
         ON chat_group_members(user_id, joined_at)",
        [],
    )?;

    tx.execute(
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

    tx.execute(
        "CREATE INDEX IF NOT EXISTS idx_group_messages_group
         ON group_messages(group_id, id)",
        [],
    )?;

    tx.execute(
        "CREATE UNIQUE INDEX IF NOT EXISTS idx_group_messages_client_id
         ON group_messages(sender_user_id, client_message_id)
         WHERE client_message_id != ''",
        [],
    )?;

    let _ = tx.execute(
        "ALTER TABLE chat_group_members
         ADD COLUMN last_read_message_id INTEGER NOT NULL DEFAULT 0",
        [],
    );
    let _ = tx.execute(
        "ALTER TABLE chat_group_members
         ADD COLUMN role TEXT NOT NULL DEFAULT 'member'",
        [],
    );
    let _ = tx.execute(
        "ALTER TABLE chat_group_members
         ADD COLUMN muted_until INTEGER NOT NULL DEFAULT 0",
        [],
    );

    tx.execute(
        "CREATE INDEX IF NOT EXISTS idx_chat_group_members_mute
         ON chat_group_members(group_id, muted_until)",
        [],
    )?;

    tx.execute_batch(
        "UPDATE chat_groups
         SET owner_user_id = created_by
         WHERE (owner_user_id <= 0 OR NOT EXISTS (
                SELECT 1 FROM chat_group_members AS current_owner
                WHERE current_owner.group_id = chat_groups.id
                  AND current_owner.user_id = chat_groups.owner_user_id
           ))
           AND created_by > 0
           AND EXISTS (
                SELECT 1 FROM chat_group_members AS member
                WHERE member.group_id = chat_groups.id
                  AND member.user_id = chat_groups.created_by
           );

         UPDATE chat_groups
         SET owner_user_id = COALESCE((
                SELECT member.user_id
                FROM chat_group_members AS member
                WHERE member.group_id = chat_groups.id
                ORDER BY member.joined_at ASC, member.user_id ASC
                LIMIT 1
             ), 0)
         WHERE owner_user_id <= 0 OR NOT EXISTS (
                SELECT 1 FROM chat_group_members AS current_owner
                WHERE current_owner.group_id = chat_groups.id
                  AND current_owner.user_id = chat_groups.owner_user_id
           );

         UPDATE chat_group_members
         SET role = CASE
             WHEN user_id = (
                SELECT owner_user_id FROM chat_groups
                WHERE id = chat_group_members.group_id
             ) THEN 'owner'
             WHEN role = 'admin' THEN 'admin'
             ELSE 'member'
         END;

         UPDATE chat_groups
         SET updated_at = created_at
         WHERE updated_at <= 0;

         CREATE UNIQUE INDEX IF NOT EXISTS idx_chat_group_single_owner
         ON chat_group_members(group_id)
         WHERE role = 'owner';

         CREATE TRIGGER IF NOT EXISTS chat_group_member_role_insert_guard
         BEFORE INSERT ON chat_group_members
         WHEN NEW.role NOT IN ('owner', 'admin', 'member')
         BEGIN
             SELECT RAISE(ABORT, 'invalid_group_role');
         END;

         CREATE TRIGGER IF NOT EXISTS chat_group_member_role_update_guard
         BEFORE UPDATE OF role ON chat_group_members
         WHEN NEW.role NOT IN ('owner', 'admin', 'member')
         BEGIN
             SELECT RAISE(ABORT, 'invalid_group_role');
         END;",
    )?;

    tx.execute(
        "CREATE TABLE IF NOT EXISTS group_message_reactions (
            message_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            emoji TEXT NOT NULL,
            created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
            PRIMARY KEY (message_id, user_id)
        )",
        [],
    )?;

    tx.execute(
        "CREATE INDEX IF NOT EXISTS idx_group_message_reactions_message
         ON group_message_reactions(message_id, emoji)",
        [],
    )?;

    tx.commit()
}

pub fn ensure_profile_avatar_column(conn: &Connection) -> Result<()> {
    let _ = conn.execute(
        "ALTER TABLE profiles
         ADD COLUMN avatar_path TEXT NOT NULL DEFAULT ''",
        [],
    );
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn group_roles_migrate_legacy_data_idempotently() {
        let connection = Connection::open_in_memory().expect("group migration database");
        connection
            .execute_batch(
                "CREATE TABLE chat_groups (
                    id INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    created_by INTEGER NOT NULL,
                    created_at INTEGER NOT NULL
                 );
                 CREATE TABLE chat_group_members (
                    group_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    joined_at INTEGER NOT NULL,
                    PRIMARY KEY (group_id, user_id)
                 );
                 INSERT INTO chat_groups (id, name, created_by, created_at)
                 VALUES (7, 'Команда', 11, 100), (8, 'Старая группа', 99, 200);
                 INSERT INTO chat_group_members (group_id, user_id, joined_at)
                 VALUES (7, 11, 100), (7, 12, 101), (8, 21, 202), (8, 20, 201);",
            )
            .expect("legacy group fixtures");

        initialize(&connection).expect("first group migration");
        initialize(&connection).expect("second group migration");

        let owner: (i64, String) = connection
            .query_row(
                "SELECT owner_user_id, member.role
                 FROM chat_groups
                 JOIN chat_group_members AS member
                   ON member.group_id = chat_groups.id
                  AND member.user_id = chat_groups.owner_user_id
                 WHERE chat_groups.id = 7",
                [],
                |row| Ok((row.get(0)?, row.get(1)?)),
            )
            .expect("migrated owner");
        assert_eq!(owner, (11, "owner".to_string()));

        let member_role: String = connection
            .query_row(
                "SELECT role FROM chat_group_members
                 WHERE group_id = 7 AND user_id = 12",
                [],
                |row| row.get(0),
            )
            .expect("member role");
        assert_eq!(member_role, "member");

        let fallback_owner: i64 = connection
            .query_row(
                "SELECT owner_user_id FROM chat_groups WHERE id = 8",
                [],
                |row| row.get(0),
            )
            .expect("fallback owner");
        assert_eq!(fallback_owner, 20);

        let muted_until: i64 = connection
            .query_row(
                "SELECT muted_until FROM chat_group_members
                 WHERE group_id = 7 AND user_id = 12",
                [],
                |row| row.get(0),
            )
            .expect("migrated mute state");
        assert_eq!(muted_until, 0);
        let invite_nonce: String = connection
            .query_row(
                "SELECT invite_nonce FROM chat_groups WHERE id = 7",
                [],
                |row| row.get(0),
            )
            .expect("invite nonce column");
        assert!(invite_nonce.is_empty());
        let identity: (String, String) = connection
            .query_row(
                "SELECT description, avatar_path FROM chat_groups WHERE id = 7",
                [],
                |row| Ok((row.get(0)?, row.get(1)?)),
            )
            .expect("group identity columns");
        assert_eq!(identity, (String::new(), String::new()));
        assert!(connection
            .execute(
                "UPDATE chat_group_members SET role = 'invalid' WHERE group_id = 7 AND user_id = 12",
                [],
            )
            .is_err());
    }
}
