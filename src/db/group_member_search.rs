use rusqlite::{Connection, Result};

/// Private full-text directory used only after group membership authorization.
/// It is intentionally separate from the public profile search index.
pub fn initialize(conn: &Connection) -> Result<()> {
    let fts_existed = conn
        .prepare("SELECT 1 FROM chat_group_member_search_fts LIMIT 1")
        .is_ok();

    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS chat_group_member_search (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            search_text TEXT NOT NULL DEFAULT '',
            UNIQUE(group_id, user_id)
         );
         CREATE INDEX IF NOT EXISTS idx_chat_group_member_search_lookup
         ON chat_group_member_search(group_id, user_id);

         CREATE VIRTUAL TABLE IF NOT EXISTS chat_group_member_search_fts USING fts5(
            search_text,
            tokenize = 'unicode61'
         );

         CREATE TRIGGER IF NOT EXISTS chat_group_member_search_fts_ai
         AFTER INSERT ON chat_group_member_search
         BEGIN
            INSERT INTO chat_group_member_search_fts(rowid, search_text)
            VALUES (NEW.id, NEW.search_text);
         END;

         CREATE TRIGGER IF NOT EXISTS chat_group_member_search_fts_ad
         AFTER DELETE ON chat_group_member_search
         BEGIN
            DELETE FROM chat_group_member_search_fts WHERE rowid = OLD.id;
         END;

         CREATE TRIGGER IF NOT EXISTS chat_group_member_search_fts_au
         AFTER UPDATE OF search_text ON chat_group_member_search
         BEGIN
            DELETE FROM chat_group_member_search_fts WHERE rowid = OLD.id;
            INSERT INTO chat_group_member_search_fts(rowid, search_text)
            VALUES (NEW.id, NEW.search_text);
         END;

         CREATE TRIGGER IF NOT EXISTS chat_group_member_search_member_ai
         AFTER INSERT ON chat_group_members
         BEGIN
            INSERT OR IGNORE INTO chat_group_member_search(group_id, user_id, search_text)
            SELECT NEW.group_id, NEW.user_id,
                   trim(COALESCE(username, '') || ' ' || COALESCE(first_name, '') || ' ' ||
                        COALESCE(last_name, '') || ' ' || CAST(NEW.user_id AS TEXT))
            FROM profiles WHERE user_id = NEW.user_id;
         END;

         CREATE TRIGGER IF NOT EXISTS chat_group_member_search_member_ad
         AFTER DELETE ON chat_group_members
         BEGIN
            DELETE FROM chat_group_member_search
            WHERE group_id = OLD.group_id AND user_id = OLD.user_id;
         END;

         CREATE TRIGGER IF NOT EXISTS chat_group_member_search_profile_ai
         AFTER INSERT ON profiles WHEN NEW.user_id IS NOT NULL
         BEGIN
            INSERT OR IGNORE INTO chat_group_member_search(group_id, user_id, search_text)
            SELECT member.group_id, NEW.user_id,
                   trim(COALESCE(NEW.username, '') || ' ' || COALESCE(NEW.first_name, '') || ' ' ||
                        COALESCE(NEW.last_name, '') || ' ' || CAST(NEW.user_id AS TEXT))
            FROM chat_group_members AS member WHERE member.user_id = NEW.user_id;
         END;

         CREATE TRIGGER IF NOT EXISTS chat_group_member_search_profile_au
         AFTER UPDATE OF username, first_name, last_name, user_id ON profiles
         WHEN NEW.user_id IS NOT NULL
         BEGIN
            UPDATE chat_group_member_search
            SET search_text = trim(COALESCE(NEW.username, '') || ' ' ||
                                   COALESCE(NEW.first_name, '') || ' ' ||
                                   COALESCE(NEW.last_name, '') || ' ' ||
                                   CAST(NEW.user_id AS TEXT))
            WHERE user_id = NEW.user_id;
         END;

         CREATE TRIGGER IF NOT EXISTS chat_group_member_search_profile_ad
         AFTER DELETE ON profiles WHEN OLD.user_id IS NOT NULL
         BEGIN
            UPDATE chat_group_member_search
            SET search_text = CAST(OLD.user_id AS TEXT)
            WHERE user_id = OLD.user_id;
         END;",
    )?;

    conn.execute(
        "DELETE FROM chat_group_member_search
         WHERE NOT EXISTS (
            SELECT 1 FROM chat_group_members AS member
            WHERE member.group_id = chat_group_member_search.group_id
              AND member.user_id = chat_group_member_search.user_id
         )",
        [],
    )?;
    conn.execute(
        "INSERT OR IGNORE INTO chat_group_member_search(group_id, user_id, search_text)
         SELECT member.group_id, member.user_id,
                trim(COALESCE(profile.username, '') || ' ' || COALESCE(profile.first_name, '') ||
                     ' ' || COALESCE(profile.last_name, '') || ' ' || CAST(member.user_id AS TEXT))
         FROM chat_group_members AS member
         JOIN profiles AS profile ON profile.user_id = member.user_id",
        [],
    )?;
    if !fts_existed {
        conn.execute("DELETE FROM chat_group_member_search_fts", [])?;
        conn.execute(
            "INSERT INTO chat_group_member_search_fts(rowid, search_text)
             SELECT id, search_text FROM chat_group_member_search",
            [],
        )?;
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn database() -> Connection {
        let connection = Connection::open_in_memory().expect("member search database");
        connection
            .execute_batch(
                "CREATE TABLE profiles (
                    user_id INTEGER UNIQUE,
                    username TEXT NOT NULL DEFAULT '',
                    first_name TEXT NOT NULL DEFAULT '',
                    last_name TEXT NOT NULL DEFAULT ''
                 );
                 CREATE TABLE chat_group_members (
                    group_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    PRIMARY KEY(group_id, user_id)
                 );",
            )
            .expect("source schema");
        connection
    }

    #[test]
    fn private_index_backfills_updates_and_removes_members_idempotently() {
        let connection = database();
        connection
            .execute_batch(
                "INSERT INTO profiles(user_id, username, first_name, last_name)
                 VALUES (10, 'amir', 'Амир', 'Албаков');
                 INSERT INTO chat_group_members(group_id, user_id) VALUES (7, 10);",
            )
            .expect("fixtures");

        initialize(&connection).expect("first migration");
        initialize(&connection).expect("second migration");

        let found: i64 = connection
            .query_row(
                "SELECT directory.user_id
                 FROM chat_group_member_search_fts AS search
                 JOIN chat_group_member_search AS directory ON directory.id = search.rowid
                 WHERE search.search_text MATCH '\"амир\"*' AND directory.group_id = 7",
                [],
                |row| row.get(0),
            )
            .expect("unicode search");
        assert_eq!(found, 10);

        connection
            .execute(
                "UPDATE profiles SET first_name = 'Мансур' WHERE user_id = 10",
                [],
            )
            .expect("profile update");
        let found: i64 = connection
            .query_row(
                "SELECT COUNT(*) FROM chat_group_member_search_fts
                 WHERE search_text MATCH '\"мансур\"*'",
                [],
                |row| row.get(0),
            )
            .expect("updated search");
        assert_eq!(found, 1);

        connection
            .execute(
                "DELETE FROM chat_group_members WHERE group_id = 7 AND user_id = 10",
                [],
            )
            .expect("membership delete");
        let remaining: i64 = connection
            .query_row("SELECT COUNT(*) FROM chat_group_member_search", [], |row| {
                row.get(0)
            })
            .expect("remaining directory rows");
        assert_eq!(remaining, 0);
    }
}
