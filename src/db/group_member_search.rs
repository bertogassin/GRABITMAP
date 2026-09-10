use rusqlite::{Connection, Result};

/// Private full-text directory used only after group membership authorization.
/// It is intentionally separate from the public profile search index.
pub fn initialize(conn: &Connection) -> Result<()> {
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

         CREATE TABLE IF NOT EXISTS chat_group_member_search_backfill (
            singleton INTEGER PRIMARY KEY CHECK(singleton = 1),
            last_group_id INTEGER NOT NULL DEFAULT 0,
            last_user_id INTEGER NOT NULL DEFAULT 0,
            processed_count INTEGER NOT NULL DEFAULT 0,
            completed INTEGER NOT NULL DEFAULT 0 CHECK(completed IN (0, 1)),
            updated_at INTEGER NOT NULL DEFAULT 0
         );
         INSERT OR IGNORE INTO chat_group_member_search_backfill(singleton)
         VALUES (1);

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

    Ok(())
}

const BACKFILL_BATCH_SIZE: i64 = 500;
const BACKFILL_PAUSE_MILLIS: u64 = 250;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct BackfillProgress {
    pub processed: usize,
    pub completed: bool,
}

pub fn backfill_batch(conn: &Connection) -> Result<BackfillProgress> {
    let tx = conn.unchecked_transaction()?;
    let (last_group_id, last_user_id, completed): (i64, i64, i64) = tx.query_row(
        "SELECT last_group_id, last_user_id, completed
         FROM chat_group_member_search_backfill WHERE singleton = 1",
        [],
        |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?)),
    )?;
    if completed != 0 {
        return Ok(BackfillProgress {
            processed: 0,
            completed: true,
        });
    }

    let rows: Vec<(i64, i64, String)> = {
        let mut statement = tx.prepare(
            "SELECT member.group_id, member.user_id,
                    trim(COALESCE(profile.username, '') || ' ' ||
                         COALESCE(profile.first_name, '') || ' ' ||
                         COALESCE(profile.last_name, '') || ' ' ||
                         CAST(member.user_id AS TEXT))
             FROM chat_group_members AS member
             JOIN profiles AS profile ON profile.user_id = member.user_id
             WHERE member.group_id > ?1
                OR (member.group_id = ?1 AND member.user_id > ?2)
             ORDER BY member.group_id ASC, member.user_id ASC
             LIMIT ?3",
        )?;
        let rows = statement
            .query_map(
                rusqlite::params![last_group_id, last_user_id, BACKFILL_BATCH_SIZE],
                |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?)),
            )?
            .collect::<Result<Vec<_>>>()?;
        rows
    };

    for (group_id, user_id, search_text) in &rows {
        tx.execute(
            "INSERT OR IGNORE INTO chat_group_member_search(group_id, user_id, search_text)
             VALUES (?1, ?2, ?3)",
            rusqlite::params![group_id, user_id, search_text],
        )?;
    }

    let batch_completed = rows.len() < BACKFILL_BATCH_SIZE as usize;
    let (next_group_id, next_user_id) = rows
        .last()
        .map(|row| (row.0, row.1))
        .unwrap_or((last_group_id, last_user_id));
    tx.execute(
        "UPDATE chat_group_member_search_backfill
         SET last_group_id = ?1, last_user_id = ?2,
             processed_count = processed_count + ?3,
             completed = ?4, updated_at = strftime('%s','now')
         WHERE singleton = 1",
        rusqlite::params![
            next_group_id,
            next_user_id,
            rows.len() as i64,
            i64::from(batch_completed)
        ],
    )?;
    tx.commit()?;
    Ok(BackfillProgress {
        processed: rows.len(),
        completed: batch_completed,
    })
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct BackfillStatus {
    pub processed_count: i64,
    pub completed: bool,
}

pub fn backfill_status(connection: &Connection) -> Result<BackfillStatus> {
    connection.query_row(
        "SELECT processed_count, completed
         FROM chat_group_member_search_backfill
         WHERE singleton = 1",
        [],
        |row| {
            Ok(BackfillStatus {
                processed_count: row.get(0)?,
                completed: row.get::<_, i64>(1)? != 0,
            })
        },
    )
}

pub fn spawn_backfill_worker(pool: crate::db::pool::DbPool) {
    tokio::spawn(async move {
        loop {
            let progress = pool
                .get()
                .ok()
                .and_then(|connection| backfill_batch(&connection).ok());
            if progress.is_some_and(|value| value.completed) {
                break;
            }
            tokio::time::sleep(std::time::Duration::from_millis(BACKFILL_PAUSE_MILLIS)).await;
        }
    });
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
    fn completed_backfill_is_a_stable_no_op() {
        let connection = database();
        initialize(&connection).expect("member search schema");

        let first = backfill_batch(&connection).expect("empty backfill");
        let second = backfill_batch(&connection).expect("completed backfill");
        let status = backfill_status(&connection).expect("backfill status");

        assert!(first.completed);
        assert_eq!(second.processed, 0);
        assert!(second.completed);
        assert_eq!(status.processed_count, 0);
        assert!(status.completed);
    }

    #[test]
    fn backfill_resumes_from_a_persisted_composite_cursor() {
        let connection = database();
        initialize(&connection).expect("migration");
        connection
            .execute_batch(
                "INSERT INTO profiles(user_id, username, first_name, last_name)
                 VALUES (10, 'first', '', ''), (20, 'second', '', '');
                 INSERT INTO chat_group_members(group_id, user_id)
                 VALUES (7, 10), (8, 20);
                 DELETE FROM chat_group_member_search;
                 UPDATE chat_group_member_search_backfill
                 SET last_group_id = 7, last_user_id = 10,
                     processed_count = 1, completed = 0
                 WHERE singleton = 1;",
            )
            .expect("interrupted migration fixture");

        let progress = backfill_batch(&connection).expect("resumed batch");
        assert_eq!(progress.processed, 1);
        assert!(progress.completed);
        let users: Vec<i64> = connection
            .prepare("SELECT user_id FROM chat_group_member_search ORDER BY user_id")
            .expect("directory query")
            .query_map([], |row| row.get(0))
            .expect("directory rows")
            .collect::<Result<Vec<_>>>()
            .expect("directory values");
        assert_eq!(users, vec![20]);
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
        let progress = backfill_batch(&connection).expect("backfill batch");
        assert_eq!(progress.processed, 1);
        assert!(progress.completed);

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
