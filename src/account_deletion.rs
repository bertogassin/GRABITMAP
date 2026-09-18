use crate::db::pool::DbPool;
use rusqlite::{params, Connection, TransactionBehavior};
use std::time::Duration;

/// How long a requested deletion stays reversible. Logging back in during
/// this window restores the account instead of requiring a fresh signup —
/// the same window a one-time email cancellation link is valid for.
pub const GRACE_PERIOD_SECONDS: i64 = 30 * 24 * 60 * 60;

fn avatar_root() -> std::path::PathBuf {
    std::path::PathBuf::from("data/avatars")
}

/// Starts the grace period: hides the account and its listings immediately
/// (`is_active = 0`), revokes every session, but keeps all personal data
/// intact so `restore_if_pending` can undo it on a later login.
///
/// Idempotent — a repeated request while one is already pending just
/// reports the existing deadline instead of restarting the clock.
pub fn request_deletion(
    connection: &mut Connection,
    user_id: i64,
    now: i64,
) -> Result<i64, String> {
    let transaction = connection
        .transaction_with_behavior(TransactionBehavior::Immediate)
        .map_err(|_| "deletion_busy".to_string())?;

    let state: Option<(i64, i64)> = transaction
        .query_row(
            "SELECT deletion_requested_at, deleted_at FROM users WHERE id = ?1",
            params![user_id],
            |row| Ok((row.get(0)?, row.get(1)?)),
        )
        .ok();

    let Some((requested_at, deleted_at)) = state else {
        return Err("user_not_found".to_string());
    };

    if deleted_at != 0 {
        return Err("already_deleted".to_string());
    }

    if requested_at != 0 {
        return Ok(requested_at + GRACE_PERIOD_SECONDS);
    }

    transaction
        .execute(
            "UPDATE users SET deletion_requested_at = ?2, is_active = 0 WHERE id = ?1",
            params![user_id, now],
        )
        .map_err(|_| "deletion_request_failed".to_string())?;

    let client_id: Option<String> = transaction
        .query_row(
            "SELECT client_id FROM profiles WHERE user_id = ?1",
            params![user_id],
            |row| row.get(0),
        )
        .ok();

    if let Some(client_id) = client_id.filter(|value| !value.is_empty()) {
        transaction
            .execute(
                "UPDATE resources
                 SET is_active = 0,
                     hidden_by_deletion_at = ?2
                 WHERE client_id = ?1
                   AND is_active = 1",
                params![client_id, now],
            )
            .map_err(|_| "deletion_hide_resources_failed".to_string())?;
    }

    transaction
        .execute(
            "UPDATE user_sessions
             SET revoked_at = ?2
             WHERE user_id = ?1
               AND revoked_at IS NULL",
            params![user_id, now],
        )
        .map_err(|_| "deletion_revoke_sessions_failed".to_string())?;

    transaction
        .commit()
        .map_err(|_| "deletion_commit_failed".to_string())?;

    Ok(now + GRACE_PERIOD_SECONDS)
}

/// Cancels a pending deletion (called right before a successful login
/// issues a new session). No-op if nothing is pending or the account was
/// already permanently anonymized.
pub fn restore_if_pending(connection: &mut Connection, user_id: i64) -> Result<bool, String> {
    let transaction = connection
        .transaction_with_behavior(TransactionBehavior::Immediate)
        .map_err(|_| "restore_busy".to_string())?;

    let state: Option<(i64, i64)> = transaction
        .query_row(
            "SELECT deletion_requested_at, deleted_at FROM users WHERE id = ?1",
            params![user_id],
            |row| Ok((row.get(0)?, row.get(1)?)),
        )
        .ok();

    let Some((requested_at, deleted_at)) = state else {
        return Ok(false);
    };

    if requested_at == 0 || deleted_at != 0 {
        return Ok(false);
    }

    transaction
        .execute(
            "UPDATE users SET deletion_requested_at = 0, is_active = 1 WHERE id = ?1",
            params![user_id],
        )
        .map_err(|_| "restore_failed".to_string())?;

    let client_id: Option<String> = transaction
        .query_row(
            "SELECT client_id FROM profiles WHERE user_id = ?1",
            params![user_id],
            |row| row.get(0),
        )
        .ok();

    if let Some(client_id) = client_id.filter(|value| !value.is_empty()) {
        transaction
            .execute(
                "UPDATE resources
                 SET is_active = 1,
                     hidden_by_deletion_at = 0
                 WHERE client_id = ?1
                   AND hidden_by_deletion_at <> 0",
                params![client_id],
            )
            .map_err(|_| "restore_resources_failed".to_string())?;
    }

    transaction
        .commit()
        .map_err(|_| "restore_commit_failed".to_string())?;

    Ok(true)
}

/// Finds every account whose grace period has lapsed and permanently
/// anonymizes it. Returns how many accounts were purged.
pub fn purge_expired(connection: &mut Connection, now: i64) -> Result<usize, String> {
    let cutoff = now - GRACE_PERIOD_SECONDS;

    let due_user_ids: Vec<i64> = {
        let mut statement = connection
            .prepare(
                "SELECT id FROM users
                 WHERE deletion_requested_at <> 0
                   AND deleted_at = 0
                   AND deletion_requested_at <= ?1",
            )
            .map_err(|_| "purge_query_failed".to_string())?;

        let rows = statement
            .query_map(params![cutoff], |row| row.get(0))
            .map_err(|_| "purge_query_failed".to_string())?
            .collect::<Result<Vec<_>, _>>()
            .map_err(|_| "purge_query_failed".to_string())?;
        rows
    };

    let mut purged = 0;

    for user_id in due_user_ids {
        if finalize_anonymization(connection, user_id, now).is_ok() {
            purged += 1;
        }
    }

    Ok(purged)
}

/// Irreversibly scrubs personal data for one account. Financial/audit
/// records (promotions, payments, moderation audit trails) are left alone
/// on purpose — only the `user_id` link remains, no free-text PII beyond
/// that was ever stored there.
fn finalize_anonymization(
    connection: &mut Connection,
    user_id: i64,
    now: i64,
) -> Result<(), String> {
    let transaction = connection
        .transaction_with_behavior(TransactionBehavior::Immediate)
        .map_err(|_| "finalize_busy".to_string())?;

    let profile: Option<(String, String)> = transaction
        .query_row(
            "SELECT client_id, COALESCE(avatar_path, '') FROM profiles WHERE user_id = ?1",
            params![user_id],
            |row| Ok((row.get(0)?, row.get(1)?)),
        )
        .ok();

    let tombstone_email = format!("deleted-{user_id}@grabit.invalid");

    transaction
        .execute(
            "UPDATE auth_identities
             SET email = ?2,
                 provider_subject = ?2,
                 password_hash = ''
             WHERE user_id = ?1
               AND provider = 'email'",
            params![user_id, tombstone_email],
        )
        .map_err(|_| "finalize_identity_failed".to_string())?;

    let mut avatar_to_remove = String::new();

    if let Some((client_id, avatar_path)) = profile.as_ref() {
        avatar_to_remove = avatar_path.clone();

        transaction
            .execute(
                "UPDATE profiles
                 SET username = '',
                     first_name = '',
                     last_name = '',
                     intent_text = '',
                     avatar_path = ''
                 WHERE user_id = ?1",
                params![user_id],
            )
            .map_err(|_| "finalize_profile_failed".to_string())?;

        if !client_id.is_empty() {
            transaction
                .execute(
                    "UPDATE resources
                     SET contact = '',
                         address = ''
                     WHERE client_id = ?1",
                    params![client_id],
                )
                .map_err(|_| "finalize_resources_failed".to_string())?;
        }
    }

    transaction
        .execute("DELETE FROM favorites WHERE user_id = ?1", params![user_id])
        .map_err(|_| "finalize_favorites_failed".to_string())?;

    transaction
        .execute(
            "DELETE FROM user_notifications WHERE user_id = ?1",
            params![user_id],
        )
        .map_err(|_| "finalize_notifications_failed".to_string())?;

    transaction
        .execute(
            "DELETE FROM contact_requests
             WHERE sender_user_id = ?1 OR receiver_user_id = ?1",
            params![user_id],
        )
        .map_err(|_| "finalize_contact_requests_failed".to_string())?;

    transaction
        .execute(
            "DELETE FROM user_blocks
             WHERE blocker_user_id = ?1 OR blocked_user_id = ?1",
            params![user_id],
        )
        .map_err(|_| "finalize_blocks_failed".to_string())?;

    // Group ownership is left alone — dropping an owner's membership row
    // would leave the group without one. Their identity is still
    // anonymized via `profiles` above.
    transaction
        .execute(
            "DELETE FROM chat_group_members
             WHERE user_id = ?1
               AND role <> 'owner'",
            params![user_id],
        )
        .map_err(|_| "finalize_group_membership_failed".to_string())?;

    transaction
        .execute(
            "UPDATE admin_assignments
             SET status = 'revoked',
                 last_change_reason = 'account_deleted',
                 updated_at = ?2
             WHERE user_id = ?1
               AND status = 'active'",
            params![user_id, now],
        )
        .map_err(|_| "finalize_admin_failed".to_string())?;

    transaction
        .execute(
            "UPDATE users SET deleted_at = ?2 WHERE id = ?1",
            params![user_id, now],
        )
        .map_err(|_| "finalize_user_failed".to_string())?;

    transaction
        .commit()
        .map_err(|_| "finalize_commit_failed".to_string())?;

    if !avatar_to_remove.is_empty() {
        let _ = std::fs::remove_file(avatar_root().join(avatar_to_remove));
    }

    Ok(())
}

pub fn format_until(timestamp: i64) -> String {
    chrono::DateTime::from_timestamp(timestamp, 0)
        .map(|value| value.format("%d.%m.%Y").to_string())
        .unwrap_or_else(|| "неизвестно".to_string())
}

pub fn spawn_expiry_worker(pool: DbPool) {
    tokio::spawn(async move {
        loop {
            if let Ok(mut connection) = pool.get() {
                let _ = purge_expired(&mut connection, chrono::Utc::now().timestamp());
            }

            tokio::time::sleep(Duration::from_secs(3_600)).await;
        }
    });
}

#[cfg(test)]
mod tests {
    use super::*;

    fn connection() -> Connection {
        let connection = Connection::open_in_memory().expect("memory db");
        connection
            .execute_batch(
                "PRAGMA foreign_keys = ON;
                 CREATE TABLE users (
                    id INTEGER PRIMARY KEY,
                    is_active INTEGER NOT NULL DEFAULT 1,
                    deletion_requested_at INTEGER NOT NULL DEFAULT 0,
                    deleted_at INTEGER NOT NULL DEFAULT 0
                 );
                 CREATE TABLE auth_identities (
                    user_id INTEGER NOT NULL,
                    provider TEXT NOT NULL,
                    provider_subject TEXT NOT NULL,
                    email TEXT NOT NULL,
                    password_hash TEXT NOT NULL
                 );
                 CREATE TABLE profiles (
                    client_id TEXT PRIMARY KEY,
                    user_id INTEGER,
                    username TEXT NOT NULL DEFAULT '',
                    first_name TEXT NOT NULL DEFAULT '',
                    last_name TEXT NOT NULL DEFAULT '',
                    intent_text TEXT NOT NULL DEFAULT '',
                    avatar_path TEXT NOT NULL DEFAULT ''
                 );
                 CREATE TABLE resources (
                    id INTEGER PRIMARY KEY,
                    client_id TEXT NOT NULL,
                    contact TEXT NOT NULL DEFAULT '',
                    address TEXT NOT NULL DEFAULT '',
                    is_active INTEGER NOT NULL DEFAULT 1,
                    hidden_by_deletion_at INTEGER NOT NULL DEFAULT 0
                 );
                 CREATE TABLE user_sessions (
                    session_public_id TEXT PRIMARY KEY,
                    user_id INTEGER NOT NULL,
                    revoked_at INTEGER
                 );
                 CREATE TABLE favorites (user_id INTEGER NOT NULL, resource_id INTEGER NOT NULL);
                 CREATE TABLE user_notifications (user_id INTEGER NOT NULL);
                 CREATE TABLE contact_requests (
                    sender_user_id INTEGER NOT NULL,
                    receiver_user_id INTEGER NOT NULL
                 );
                 CREATE TABLE user_blocks (
                    blocker_user_id INTEGER NOT NULL,
                    blocked_user_id INTEGER NOT NULL
                 );
                 CREATE TABLE chat_group_members (
                    group_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    role TEXT NOT NULL DEFAULT 'member'
                 );
                 CREATE TABLE admin_assignments (
                    user_id INTEGER NOT NULL,
                    status TEXT NOT NULL,
                    last_change_reason TEXT NOT NULL DEFAULT '',
                    updated_at INTEGER NOT NULL DEFAULT 0
                 );

                 INSERT INTO users (id) VALUES (7);
                 INSERT INTO auth_identities (user_id, provider, provider_subject, email, password_hash)
                    VALUES (7, 'email', 'amir@example.com', 'amir@example.com', 'hash');
                 INSERT INTO profiles (client_id, user_id, username, first_name, avatar_path)
                    VALUES ('user:7', 7, 'amir', 'Amir', 'avatar-7.jpg');
                 INSERT INTO resources (id, client_id, contact, address, is_active)
                    VALUES (1, 'user:7', '+33 6 00 00 00', '10 rue de Paris', 1);
                 INSERT INTO user_sessions (session_public_id, user_id, revoked_at)
                    VALUES ('sess-1', 7, NULL);
                 INSERT INTO chat_group_members (group_id, user_id, role) VALUES (1, 7, 'owner');
                 INSERT INTO chat_group_members (group_id, user_id, role) VALUES (2, 7, 'member');
                 INSERT INTO admin_assignments (user_id, status) VALUES (7, 'active');",
            )
            .expect("schema");
        connection
    }

    #[test]
    fn request_hides_account_and_revokes_sessions_without_wiping_data() {
        let mut connection = connection();
        let now = 1_800_000_000;

        let purge_at = request_deletion(&mut connection, 7, now).expect("request deletion");
        assert_eq!(purge_at, now + GRACE_PERIOD_SECONDS);

        let (is_active, requested_at): (i64, i64) = connection
            .query_row(
                "SELECT is_active, deletion_requested_at FROM users WHERE id = 7",
                [],
                |row| Ok((row.get(0)?, row.get(1)?)),
            )
            .expect("user row");
        assert_eq!((is_active, requested_at), (0, now));

        let resource_active: i64 = connection
            .query_row("SELECT is_active FROM resources WHERE id = 1", [], |row| {
                row.get(0)
            })
            .expect("resource row");
        assert_eq!(resource_active, 0);

        let revoked: Option<i64> = connection
            .query_row(
                "SELECT revoked_at FROM user_sessions WHERE session_public_id = 'sess-1'",
                [],
                |row| row.get(0),
            )
            .expect("session row");
        assert_eq!(revoked, Some(now));

        // Data is untouched during the grace period.
        let email: String = connection
            .query_row(
                "SELECT email FROM auth_identities WHERE user_id = 7",
                [],
                |row| row.get(0),
            )
            .expect("identity row");
        assert_eq!(email, "amir@example.com");
    }

    #[test]
    fn repeated_request_does_not_restart_the_clock() {
        let mut connection = connection();
        let now = 1_800_000_000;

        request_deletion(&mut connection, 7, now).expect("first request");
        let purge_at = request_deletion(&mut connection, 7, now + 3_600).expect("second request");

        assert_eq!(purge_at, now + GRACE_PERIOD_SECONDS);
    }

    #[test]
    fn restore_brings_back_exactly_what_was_hidden() {
        let mut connection = connection();
        let now = 1_800_000_000;

        request_deletion(&mut connection, 7, now).expect("request deletion");
        let restored = restore_if_pending(&mut connection, 7).expect("restore");
        assert!(restored);

        let (is_active, requested_at): (i64, i64) = connection
            .query_row(
                "SELECT is_active, deletion_requested_at FROM users WHERE id = 7",
                [],
                |row| Ok((row.get(0)?, row.get(1)?)),
            )
            .expect("user row");
        assert_eq!((is_active, requested_at), (1, 0));

        let resource_active: i64 = connection
            .query_row("SELECT is_active FROM resources WHERE id = 1", [], |row| {
                row.get(0)
            })
            .expect("resource row");
        assert_eq!(resource_active, 1);
    }

    #[test]
    fn restore_without_pending_request_is_a_no_op() {
        let mut connection = connection();
        let restored = restore_if_pending(&mut connection, 7).expect("restore");
        assert!(!restored);
    }

    #[test]
    fn purge_after_grace_period_anonymizes_everything() {
        let mut connection = connection();
        let now = 1_800_000_000;

        request_deletion(&mut connection, 7, now).expect("request deletion");

        // Still inside the window: nothing to purge yet.
        let purged = purge_expired(&mut connection, now + GRACE_PERIOD_SECONDS - 1)
            .expect("purge before deadline");
        assert_eq!(purged, 0);

        let purged =
            purge_expired(&mut connection, now + GRACE_PERIOD_SECONDS).expect("purge at deadline");
        assert_eq!(purged, 1);

        let (email, password_hash): (String, String) = connection
            .query_row(
                "SELECT email, password_hash FROM auth_identities WHERE user_id = 7",
                [],
                |row| Ok((row.get(0)?, row.get(1)?)),
            )
            .expect("identity row");
        assert_eq!(email, "deleted-7@grabit.invalid");
        assert_eq!(password_hash, "");

        let (username, avatar_path): (String, String) = connection
            .query_row(
                "SELECT username, avatar_path FROM profiles WHERE user_id = 7",
                [],
                |row| Ok((row.get(0)?, row.get(1)?)),
            )
            .expect("profile row");
        assert_eq!(username, "");
        assert_eq!(avatar_path, "");

        let (contact, address): (String, String) = connection
            .query_row(
                "SELECT contact, address FROM resources WHERE id = 1",
                [],
                |row| Ok((row.get(0)?, row.get(1)?)),
            )
            .expect("resource row");
        assert_eq!(contact, "");
        assert_eq!(address, "");

        let member_count: i64 = connection
            .query_row(
                "SELECT COUNT(*) FROM chat_group_members WHERE user_id = 7",
                [],
                |row| row.get(0),
            )
            .expect("member count");
        assert_eq!(member_count, 1, "owner membership must survive purge");

        let admin_status: String = connection
            .query_row(
                "SELECT status FROM admin_assignments WHERE user_id = 7",
                [],
                |row| row.get(0),
            )
            .expect("admin row");
        assert_eq!(admin_status, "revoked");

        let deleted_at: i64 = connection
            .query_row("SELECT deleted_at FROM users WHERE id = 7", [], |row| {
                row.get(0)
            })
            .expect("user row");
        assert_eq!(deleted_at, now + GRACE_PERIOD_SECONDS);

        // A login attempt after this point can no longer restore anything.
        let restored = restore_if_pending(&mut connection, 7).expect("restore after purge");
        assert!(!restored);
    }
}
