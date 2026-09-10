use rusqlite::{Connection, Result};
use std::time::Duration;

#[cfg(test)]
pub const SCOPE_WORLD: &str = "world";
#[cfg(test)]
pub const SCOPE_CONTINENT: &str = "continent";
#[cfg(test)]
pub const SCOPE_COUNTRY: &str = "country";
#[cfg(test)]
pub const SCOPE_CITY: &str = "city";

#[cfg(test)]
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct GroupScope {
    pub group_id: i64,
    pub scope_type: String,
    pub scope_id: i64,
}

pub fn initialize() -> Result<()> {
    let connection = Connection::open(crate::db::path::database_path())?;
    connection.pragma_update(None, "foreign_keys", "ON")?;
    connection.pragma_update(None, "journal_mode", "WAL")?;
    connection.pragma_update(None, "synchronous", "NORMAL")?;
    connection.busy_timeout(Duration::from_secs(5))?;
    initialize_connection(&connection)
}

pub fn initialize_connection(connection: &Connection) -> Result<()> {
    connection.execute_batch(
        "CREATE TABLE IF NOT EXISTS chat_group_scopes (
            group_id INTEGER PRIMARY KEY,
            scope_type TEXT NOT NULL
                CHECK (scope_type IN ('world', 'continent', 'country', 'city')),
            scope_id INTEGER NOT NULL CHECK (scope_id > 0),
            created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
            FOREIGN KEY(group_id) REFERENCES chat_groups(id) ON DELETE CASCADE,
            UNIQUE(scope_type, scope_id)
         );

         CREATE INDEX IF NOT EXISTS idx_chat_group_scopes_lookup
         ON chat_group_scopes(scope_type, scope_id, group_id);

         CREATE TABLE IF NOT EXISTS chat_official_group_governance_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_id INTEGER NOT NULL,
            action TEXT NOT NULL CHECK (action IN ('created', 'control_claimed')),
            actor_user_id INTEGER NOT NULL,
            admin_assignment_id INTEGER NOT NULL,
            previous_owner_user_id INTEGER NOT NULL DEFAULT 0,
            new_owner_user_id INTEGER NOT NULL,
            created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
            FOREIGN KEY(group_id) REFERENCES chat_groups(id) ON DELETE CASCADE
         );

         CREATE INDEX IF NOT EXISTS idx_official_group_governance_group
         ON chat_official_group_governance_events(group_id, created_at DESC, id DESC);

         CREATE TRIGGER IF NOT EXISTS chat_group_scope_insert_guard
         BEFORE INSERT ON chat_group_scopes
         WHEN NOT (
              (NEW.scope_type = 'world' AND NEW.scope_id = 1)
              OR (NEW.scope_type = 'continent' AND EXISTS (
                    SELECT 1 FROM geo_continents WHERE id = NEW.scope_id AND is_active = 1
              ))
              OR (NEW.scope_type = 'country' AND EXISTS (
                    SELECT 1 FROM geo_countries WHERE id = NEW.scope_id AND is_active = 1
              ))
              OR (NEW.scope_type = 'city' AND EXISTS (
                    SELECT 1 FROM geo_cities WHERE id = NEW.scope_id AND is_active = 1
              ))
         )
         BEGIN
              SELECT RAISE(ABORT, 'invalid_group_scope');
         END;

         CREATE TRIGGER IF NOT EXISTS chat_group_scope_update_guard
         BEFORE UPDATE OF scope_type, scope_id ON chat_group_scopes
         WHEN NOT (
              (NEW.scope_type = 'world' AND NEW.scope_id = 1)
              OR (NEW.scope_type = 'continent' AND EXISTS (
                    SELECT 1 FROM geo_continents WHERE id = NEW.scope_id AND is_active = 1
              ))
              OR (NEW.scope_type = 'country' AND EXISTS (
                    SELECT 1 FROM geo_countries WHERE id = NEW.scope_id AND is_active = 1
              ))
              OR (NEW.scope_type = 'city' AND EXISTS (
                    SELECT 1 FROM geo_cities WHERE id = NEW.scope_id AND is_active = 1
              ))
         )
         BEGIN
              SELECT RAISE(ABORT, 'invalid_group_scope');
         END;

         CREATE TRIGGER IF NOT EXISTS chat_group_scope_cleanup
         AFTER DELETE ON chat_groups
         BEGIN
              DELETE FROM chat_group_scopes WHERE group_id = OLD.id;
         END;",
    )
}

#[cfg(test)]
pub fn bind_group(
    connection: &Connection,
    group_id: i64,
    scope_type: &str,
    scope_id: i64,
    now: i64,
) -> Result<bool> {
    if group_id <= 0 || scope_id <= 0 {
        return Ok(false);
    }
    let changed = connection.execute(
        "INSERT INTO chat_group_scopes (group_id, scope_type, scope_id, created_at)
         SELECT ?1, ?2, ?3, ?4
         WHERE EXISTS (SELECT 1 FROM chat_groups WHERE id = ?1)
         ON CONFLICT(group_id) DO UPDATE SET
            scope_type = excluded.scope_type,
            scope_id = excluded.scope_id",
        rusqlite::params![group_id, scope_type, scope_id, now],
    )?;
    Ok(changed == 1)
}

#[cfg(test)]
pub fn scope_for_group(connection: &Connection, group_id: i64) -> Option<GroupScope> {
    connection
        .query_row(
            "SELECT group_id, scope_type, scope_id
             FROM chat_group_scopes WHERE group_id = ?1",
            rusqlite::params![group_id],
            |row| {
                Ok(GroupScope {
                    group_id: row.get(0)?,
                    scope_type: row.get(1)?,
                    scope_id: row.get(2)?,
                })
            },
        )
        .ok()
}

#[cfg(test)]
pub fn group_for_scope(connection: &Connection, scope_type: &str, scope_id: i64) -> Option<i64> {
    connection
        .query_row(
            "SELECT group_id FROM chat_group_scopes
             WHERE scope_type = ?1 AND scope_id = ?2",
            rusqlite::params![scope_type, scope_id],
            |row| row.get(0),
        )
        .ok()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn database() -> Connection {
        let connection = Connection::open_in_memory().expect("geographic group database");
        connection
            .execute_batch(
                "PRAGMA foreign_keys = ON;
                 CREATE TABLE chat_groups (id INTEGER PRIMARY KEY);
                 CREATE TABLE geo_continents (
                    id INTEGER PRIMARY KEY, is_active INTEGER NOT NULL
                 );
                 CREATE TABLE geo_countries (
                    id INTEGER PRIMARY KEY, is_active INTEGER NOT NULL
                 );
                 CREATE TABLE geo_cities (
                    id INTEGER PRIMARY KEY, is_active INTEGER NOT NULL
                 );
                 INSERT INTO chat_groups VALUES (10), (11), (12), (13), (14);
                 INSERT INTO geo_continents VALUES (2, 1);
                 INSERT INTO geo_countries VALUES (3, 1);
                 INSERT INTO geo_cities VALUES (4, 1), (5, 0);",
            )
            .expect("geographic group fixtures");
        initialize_connection(&connection).expect("scope migration");
        connection
    }

    #[test]
    fn official_scopes_are_unique_valid_and_idempotent() {
        let connection = database();
        initialize_connection(&connection).expect("repeated scope migration");

        assert!(bind_group(&connection, 10, SCOPE_WORLD, 1, 100).expect("world binding"));
        assert!(bind_group(&connection, 11, SCOPE_CONTINENT, 2, 101).expect("continent binding"));
        assert!(bind_group(&connection, 12, SCOPE_COUNTRY, 3, 102).expect("country binding"));
        assert!(bind_group(&connection, 13, SCOPE_CITY, 4, 103).expect("city binding"));

        assert_eq!(group_for_scope(&connection, SCOPE_CITY, 4), Some(13));
        assert_eq!(
            scope_for_group(&connection, 13),
            Some(GroupScope {
                group_id: 13,
                scope_type: SCOPE_CITY.to_string(),
                scope_id: 4,
            })
        );
        assert!(bind_group(&connection, 14, SCOPE_CITY, 4, 104).is_err());
        assert!(bind_group(&connection, 14, SCOPE_CITY, 5, 104).is_err());
        assert!(bind_group(&connection, 14, SCOPE_WORLD, 2, 104).is_err());
        assert!(bind_group(&connection, 99, SCOPE_CITY, 4, 104).is_ok_and(|changed| !changed));
    }

    #[test]
    fn deleting_a_group_removes_its_scope_binding() {
        let connection = database();
        bind_group(&connection, 13, SCOPE_CITY, 4, 100).expect("city binding");
        connection
            .execute(
                "INSERT INTO chat_official_group_governance_events (
                    group_id, action, actor_user_id, admin_assignment_id,
                    previous_owner_user_id, new_owner_user_id, created_at
                 ) VALUES (13, 'created', 70, 80, 0, 70, 100)",
                [],
            )
            .expect("governance audit event");
        connection
            .execute("DELETE FROM chat_groups WHERE id = 13", [])
            .expect("group deletion");
        assert_eq!(group_for_scope(&connection, SCOPE_CITY, 4), None);
        let audit_count: i64 = connection
            .query_row(
                "SELECT COUNT(*) FROM chat_official_group_governance_events WHERE group_id = 13",
                [],
                |row| row.get(0),
            )
            .expect("governance audit count");
        assert_eq!(audit_count, 0);
    }
}
