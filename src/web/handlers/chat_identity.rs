use rusqlite::{Connection, OptionalExtension};

pub(super) const MAX_PUBLIC_ID_LENGTH: usize = 64;

pub(super) fn public_id_is_valid(value: &str) -> bool {
    !value.is_empty()
        && value.len() <= MAX_PUBLIC_ID_LENGTH
        && value
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || byte == b'-' || byte == b'_')
}

pub(super) fn active_user_id_by_public_id(connection: &Connection, public_id: &str) -> Option<i64> {
    let public_id = public_id.trim();

    if !public_id_is_valid(public_id) {
        return None;
    }

    connection
        .query_row(
            "SELECT profile.user_id
             FROM profiles AS profile
             JOIN users AS user
               ON user.id = profile.user_id
              AND user.is_active = 1
             WHERE profile.public_id = ?1
             LIMIT 1",
            rusqlite::params![public_id],
            |row| row.get(0),
        )
        .optional()
        .ok()
        .flatten()
}

pub(super) fn active_user_id_by_chat_route(
    connection: &Connection,
    route_key: &str,
) -> Option<i64> {
    let route_key = route_key.trim();

    if let Some(user_id) = active_user_id_by_public_id(connection, route_key) {
        return Some(user_id);
    }

    let legacy_user_id = route_key.parse::<i64>().ok().filter(|value| *value > 0)?;

    connection
        .query_row(
            "SELECT id
             FROM users
             WHERE id = ?1
               AND is_active = 1
             LIMIT 1",
            rusqlite::params![legacy_user_id],
            |row| row.get(0),
        )
        .optional()
        .ok()
        .flatten()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn identity_database() -> Connection {
        let connection = Connection::open_in_memory().expect("identity database");

        connection
            .execute_batch(
                "CREATE TABLE users (
                    id INTEGER PRIMARY KEY,
                    is_active INTEGER NOT NULL
                );

                CREATE TABLE profiles (
                    user_id INTEGER NOT NULL,
                    public_id TEXT NOT NULL
                );

                INSERT INTO users (id, is_active)
                VALUES (7, 1), (8, 0);

                INSERT INTO profiles (user_id, public_id)
                VALUES
                    (7, 'f57ceb83b834b7aa4e0d694c11894014'),
                    (8, 'disabled-user');",
            )
            .expect("identity schema");

        connection
    }

    #[test]
    fn public_identifier_policy_rejects_unsafe_values() {
        assert!(public_id_is_valid("f57ceb83b834b7aa4e0d694c11894014"));
        assert!(public_id_is_valid("member_A-42"));
        assert!(!public_id_is_valid(""));
        assert!(!public_id_is_valid("../owner"));
        assert!(!public_id_is_valid("user id"));
        assert!(!public_id_is_valid(&"a".repeat(65)));
    }

    #[test]
    fn chat_route_prefers_public_id_and_supports_legacy_numeric_links() {
        let connection = identity_database();

        assert_eq!(
            active_user_id_by_chat_route(&connection, "f57ceb83b834b7aa4e0d694c11894014"),
            Some(7)
        );
        assert_eq!(active_user_id_by_chat_route(&connection, "7"), Some(7));
        assert_eq!(active_user_id_by_chat_route(&connection, "8"), None);
        assert_eq!(active_user_id_by_chat_route(&connection, "../owner"), None);
    }

    #[test]
    fn public_identifier_resolves_only_active_users() {
        let connection = identity_database();

        assert_eq!(
            active_user_id_by_public_id(&connection, "f57ceb83b834b7aa4e0d694c11894014"),
            Some(7)
        );
        assert_eq!(
            active_user_id_by_public_id(&connection, "disabled-user"),
            None
        );
        assert_eq!(active_user_id_by_public_id(&connection, "../owner"), None);
    }
}
