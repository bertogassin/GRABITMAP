use crate::db::pool::DbPool;
use rusqlite::{params, Connection, TransactionBehavior};
use std::time::Duration;

pub const FREE_CAMPAIGN_END: i64 = 1_830_297_599;
const PROMOTION_SECONDS: i64 = 30 * 24 * 60 * 60;
const RENEWAL_WINDOW_SECONDS: i64 = 7 * 24 * 60 * 60;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ActivationOutcome {
    Activated(i64),
    AlreadyActive(i64),
}

pub fn expire_at(connection: &Connection, now: i64) -> rusqlite::Result<usize> {
    connection.execute(
        "UPDATE resource_internal_promotions
         SET status = 'expired'
         WHERE status = 'active'
           AND ends_at <= ?1",
        params![now],
    )?;

    connection.execute(
        "UPDATE resources
         SET is_premium = 0
         WHERE internal_promotion_until > 0
           AND internal_promotion_until <= ?1",
        params![now],
    )
}

pub fn activate(
    connection: &mut Connection,
    resource_id: i64,
    user_id: i64,
    client_id: &str,
    now: i64,
) -> Result<ActivationOutcome, String> {
    if now > FREE_CAMPAIGN_END {
        return Err("free_campaign_ended".to_string());
    }

    let transaction = connection
        .transaction_with_behavior(TransactionBehavior::Immediate)
        .map_err(|_| "promotion_busy".to_string())?;

    let row: Option<(String, i64, i64)> = transaction
        .query_row(
            "SELECT moderation_status,
                    is_active,
                    COALESCE(internal_promotion_until, 0)
             FROM resources
             WHERE id = ?1
               AND client_id = ?2
             LIMIT 1",
            params![resource_id, client_id],
            |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?)),
        )
        .ok();

    let Some((moderation_status, is_active, current_until)) = row else {
        return Err("resource_not_found".to_string());
    };

    if moderation_status != "approved" || is_active != 1 {
        return Err("resource_not_eligible".to_string());
    }

    if current_until > now + RENEWAL_WINDOW_SECONDS {
        return Ok(ActivationOutcome::AlreadyActive(current_until));
    }

    let starts_at = current_until.max(now);
    let ends_at = starts_at.saturating_add(PROMOTION_SECONDS);

    transaction
        .execute(
            "UPDATE resources
             SET is_premium = 1,
                 internal_promotion_until = ?2
             WHERE id = ?1",
            params![resource_id, ends_at],
        )
        .map_err(|_| "promotion_update_failed".to_string())?;

    transaction
        .execute(
            "INSERT INTO resource_internal_promotions (
                resource_id,
                requester_user_id,
                starts_at,
                ends_at,
                discount_percent,
                price_minor,
                status,
                created_at
             ) VALUES (?1, ?2, ?3, ?4, 100, 0, 'active', ?5)",
            params![resource_id, user_id, starts_at, ends_at, now],
        )
        .map_err(|_| "promotion_audit_failed".to_string())?;

    transaction
        .execute(
            "INSERT INTO user_notifications (
                user_id, resource_id, kind, title, message, is_read, created_at
             ) VALUES (
                ?1, ?2, 'internal_promotion_activated',
                'Продвижение включено',
                'Объявление поднято внутри GRABIT на 30 дней. Скидка 100%.',
                0, ?3
             )",
            params![user_id, resource_id, now],
        )
        .map_err(|_| "promotion_notification_failed".to_string())?;

    transaction
        .commit()
        .map_err(|_| "promotion_commit_failed".to_string())?;

    Ok(ActivationOutcome::Activated(ends_at))
}

pub fn spawn_expiry_worker(pool: DbPool) {
    tokio::spawn(async move {
        loop {
            if let Ok(connection) = pool.get() {
                let _ = expire_at(&connection, chrono::Utc::now().timestamp());
            }

            tokio::time::sleep(Duration::from_secs(3_600)).await;
        }
    });
}

pub fn format_until(timestamp: i64) -> String {
    chrono::DateTime::from_timestamp(timestamp, 0)
        .map(|value| value.format("%d.%m.%Y").to_string())
        .unwrap_or_else(|| "неизвестно".to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn connection() -> Connection {
        let connection = Connection::open_in_memory().expect("memory db");
        connection
            .execute_batch(
                "PRAGMA foreign_keys = ON;
                 CREATE TABLE users (id INTEGER PRIMARY KEY);
                 CREATE TABLE resources (
                    id INTEGER PRIMARY KEY,
                    client_id TEXT NOT NULL,
                    moderation_status TEXT NOT NULL,
                    is_active INTEGER NOT NULL,
                    is_premium INTEGER NOT NULL DEFAULT 0,
                    internal_promotion_until INTEGER NOT NULL DEFAULT 0
                 );
                 CREATE TABLE user_notifications (
                    id INTEGER PRIMARY KEY,
                    user_id INTEGER NOT NULL,
                    resource_id INTEGER NOT NULL,
                    kind TEXT NOT NULL,
                    title TEXT NOT NULL,
                    message TEXT NOT NULL,
                    is_read INTEGER NOT NULL,
                    created_at INTEGER NOT NULL
                 );
                 CREATE TABLE resource_internal_promotions (
                    id INTEGER PRIMARY KEY,
                    resource_id INTEGER NOT NULL,
                    requester_user_id INTEGER NOT NULL,
                    starts_at INTEGER NOT NULL,
                    ends_at INTEGER NOT NULL,
                    discount_percent INTEGER NOT NULL,
                    price_minor INTEGER NOT NULL,
                    status TEXT NOT NULL,
                    created_at INTEGER NOT NULL,
                    FOREIGN KEY(resource_id) REFERENCES resources(id),
                    FOREIGN KEY(requester_user_id) REFERENCES users(id)
                 );
                 INSERT INTO users(id) VALUES (7);
                 INSERT INTO resources(
                    id, client_id, moderation_status, is_active
                 ) VALUES (9, 'owner-client', 'approved', 1);",
            )
            .expect("schema");
        connection
    }

    #[test]
    fn free_activation_is_audited_for_thirty_days() {
        let mut connection = connection();
        let now = 1_800_000_000;

        let outcome =
            activate(&mut connection, 9, 7, "owner-client", now).expect("promotion activation");
        assert_eq!(
            outcome,
            ActivationOutcome::Activated(now + PROMOTION_SECONDS)
        );

        let row: (i64, i64, i64, i64) = connection
            .query_row(
                "SELECT r.is_premium, r.internal_promotion_until,
                        p.discount_percent, p.price_minor
                 FROM resources r
                 JOIN resource_internal_promotions p ON p.resource_id = r.id
                 WHERE r.id = 9",
                [],
                |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?)),
            )
            .expect("audit row");
        assert_eq!(row, (1, now + PROMOTION_SECONDS, 100, 0));
    }

    #[test]
    fn active_promotion_cannot_be_stacked_early() {
        let mut connection = connection();
        let now = 1_800_000_000;
        activate(&mut connection, 9, 7, "owner-client", now).expect("first activation");

        let outcome = activate(&mut connection, 9, 7, "owner-client", now + 60)
            .expect("idempotent activation");
        assert_eq!(
            outcome,
            ActivationOutcome::AlreadyActive(now + PROMOTION_SECONDS)
        );

        let count: i64 = connection
            .query_row(
                "SELECT COUNT(*) FROM resource_internal_promotions",
                [],
                |row| row.get(0),
            )
            .expect("audit count");
        assert_eq!(count, 1);
    }

    #[test]
    fn expiry_removes_only_campaign_premium() {
        let connection = connection();
        connection
            .execute(
                "INSERT INTO resource_internal_promotions (
                    resource_id, requester_user_id, starts_at, ends_at,
                    discount_percent, price_minor, status, created_at
                 ) VALUES (9, 7, 1, 100, 100, 0, 'active', 1)",
                [],
            )
            .expect("promotion fixture");
        connection
            .execute(
                "UPDATE resources
                 SET is_premium = 1, internal_promotion_until = 100
                 WHERE id = 9",
                [],
            )
            .expect("expired fixture");

        assert_eq!(expire_at(&connection, 101).expect("expiry"), 1);
        let premium: i64 = connection
            .query_row("SELECT is_premium FROM resources WHERE id = 9", [], |row| {
                row.get(0)
            })
            .expect("premium state");
        assert_eq!(premium, 0);

        let status: String = connection
            .query_row(
                "SELECT status FROM resource_internal_promotions WHERE resource_id = 9",
                [],
                |row| row.get(0),
            )
            .expect("promotion status");
        assert_eq!(status, "expired");
    }
}
