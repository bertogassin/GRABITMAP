use super::auth::verify_authenticated_user;
use super::auth::verify_user_session;
use crate::db::steps::today_local;
use crate::state::app_state::AppState;
use crate::web::templates;
use axum::{
    extract::{Path, State},
    http::HeaderMap,
    response::{Html, IntoResponse, Redirect, Response},
    Json,
};
use chrono::TimeZone;
use serde_json::json;

#[derive(Clone)]
pub struct DailyNudge {
    pub kind: &'static str,
    pub title: &'static str,
    pub message: &'static str,
    pub href: &'static str,
}

const STEP_NUDGE: DailyNudge = DailyNudge {
    kind: "step_nudge",
    title: "10 000 шагов",
    message: "Сделайте хотя бы 10 000 шагов сегодня.",
    href: "/app/steps",
};

const WORK_NUDGE: DailyNudge = DailyNudge {
    kind: "work_nudge",
    title: "Работа рядом",
    message: "Откройте карту и найдите работу на сегодня.",
    href: "/app/search?kind=work",
};

fn today_start_unix() -> i64 {
    let today = chrono::Utc::now()
        .with_timezone(&chrono_tz::Europe::Paris)
        .date_naive();
    let midnight = today.and_hms_opt(0, 0, 0).expect("midnight");
    chrono_tz::Europe::Paris
        .from_local_datetime(&midnight)
        .earliest()
        .or_else(|| chrono_tz::Europe::Paris.from_local_datetime(&midnight).latest())
        .map(|value| value.timestamp())
        .unwrap_or(0)
}

fn already_nudged_today(
    db: &rusqlite::Connection,
    user_id: i64,
    kind: &str,
    since: i64,
) -> bool {
    db.query_row(
        "SELECT EXISTS(
            SELECT 1
            FROM user_notifications
            WHERE user_id = ?1
              AND kind = ?2
              AND created_at >= ?3
         )",
        rusqlite::params![user_id, kind, since],
        |row| row.get::<_, i64>(0),
    )
    .unwrap_or(0)
        == 1
}

fn insert_nudge(db: &rusqlite::Connection, user_id: i64, nudge: &DailyNudge) -> bool {
    db.execute(
        "INSERT INTO user_notifications (
            user_id,
            resource_id,
            kind,
            title,
            message,
            is_read,
            created_at
         )
         VALUES (?1, NULL, ?2, ?3, ?4, 0, strftime('%s','now'))",
        rusqlite::params![user_id, nudge.kind, nudge.title, nudge.message],
    )
    .unwrap_or(0)
        == 1
}

pub fn ensure_daily_nudges(
    db: &rusqlite::Connection,
    user_id: i64,
) -> Vec<DailyNudge> {
    if user_id <= 0 {
        return Vec::new();
    }

    let since = today_start_unix();
    let today = today_local();
    let mut created = Vec::new();

    let _ = db.execute(
        "UPDATE user_notifications
         SET is_read = 1
         WHERE user_id = ?1
           AND kind IN ('step_nudge', 'work_nudge')
           AND is_read = 0
           AND created_at < ?2",
        rusqlite::params![user_id, since],
    );

    let steps_today: i64 = db
        .query_row(
            "SELECT step_count
             FROM user_step_days
             WHERE user_id = ?1
               AND step_date = ?2",
            rusqlite::params![user_id, today],
            |row| row.get(0),
        )
        .unwrap_or(0);

    if steps_today < 10_000 && !already_nudged_today(db, user_id, STEP_NUDGE.kind, since) {
        if insert_nudge(db, user_id, &STEP_NUDGE) {
            created.push(STEP_NUDGE);
        }
    }

    if !already_nudged_today(db, user_id, WORK_NUDGE.kind, since) {
        if insert_nudge(db, user_id, &WORK_NUDGE) {
            created.push(WORK_NUDGE);
        }
    }

    created
}

pub async fn notifications_page(State(state): State<AppState>, headers: HeaderMap) -> Html<String> {
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,

        None => {
            return Html(templates::render_notifications(vec![], false));
        }
    };

    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return Html("<h1>503</h1><p>База данных временно недоступна.</p>".to_string());
        }
    };

    let _ = ensure_daily_nudges(&db, user_id);

    let notifications: Vec<crate::web::view_models::NotificationRow> = db
        .prepare(
            "SELECT
                id,
                resource_id,
                kind,
                title,
                message,
                is_read,
                created_at
             FROM user_notifications
             WHERE user_id = ?1
               AND kind NOT IN ('contact_rejected')
             ORDER BY
                is_read ASC,
                created_at DESC,
                id DESC
             LIMIT 100",
        )
        .and_then(|mut stmt| {
            stmt.query_map(rusqlite::params![user_id], |row| {
                Ok((
                    row.get(0)?,
                    row.get(1)?,
                    row.get(2)?,
                    row.get(3)?,
                    row.get(4)?,
                    row.get(5)?,
                    row.get(6)?,
                ))
            })?
            .collect::<Result<Vec<_>, _>>()
        })
        .unwrap_or_default();

    drop(db);

    Html(templates::render_notifications(notifications, true))
}

pub async fn open_notification(
    State(state): State<AppState>,
    Path(notification_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    let Some(user_id) = verify_user_session(&state, &headers) else {
        return Redirect::temporary(&format!(
            "/login?next={}",
            urlencoding::encode(&format!("/app/notifications/{notification_id}/open"))
        ))
        .into_response();
    };

    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return Redirect::temporary("/app/notifications").into_response();
        }
    };

    let row: Option<(Option<i64>, String)> = db
        .query_row(
            "SELECT resource_id, kind
             FROM user_notifications
             WHERE id = ?1
               AND user_id = ?2
             LIMIT 1",
            rusqlite::params![notification_id, user_id],
            |row| Ok((row.get(0)?, row.get(1)?)),
        )
        .ok();

    let Some((resource_id, kind)) = row else {
        return Redirect::temporary("/app/notifications").into_response();
    };

    let _ = db.execute(
        "UPDATE user_notifications
         SET is_read = 1
         WHERE id = ?1
           AND user_id = ?2
           AND is_read = 0",
        rusqlite::params![notification_id, user_id],
    );

    let target = if let Some(resource_id) = resource_id.filter(|id| *id > 0) {
        if kind == "chat_message" {
            format!("/app/chat/{resource_id}")
        } else if kind == "group_message" {
            format!("/app/group/{resource_id}")
        } else {
            format!("/app/resource/{resource_id}")
        }
    } else if kind == "step_nudge" {
        "/app/steps".to_string()
    } else if kind == "work_nudge" {
        "/app/search?kind=work".to_string()
    } else if kind == "admin_assignment" {
        "/app/center".to_string()
    } else {
        "/app/notifications".to_string()
    };

    Redirect::temporary(&target).into_response()
}

pub async fn mark_all_notifications_read(
    State(state): State<AppState>,
    headers: HeaderMap,
) -> Response {
    let Some(user_id) = verify_user_session(&state, &headers) else {
        return Redirect::temporary("/login?next=%2Fapp%2Fnotifications").into_response();
    };

    if let Ok(db) = crate::db::pool::get_connection(&state.db_pool) {
        let _ = db.execute(
            "UPDATE user_notifications
             SET is_read = 1
             WHERE user_id = ?1
               AND is_read = 0",
            rusqlite::params![user_id],
        );
    }

    Redirect::temporary("/app/notifications").into_response()
}

pub async fn unread_count(State(state): State<AppState>, headers: HeaderMap) -> Response {
    let user = match verify_authenticated_user(&state, &headers) {
        Some(user) => user,
        None => {
            return Json(json!({
                "count": 0
            }))
            .into_response();
        }
    };

    let count = state
        .db_pool
        .get()
        .ok()
        .and_then(|conn| {
            let _ = ensure_daily_nudges(&conn, user.user_id);
            conn.query_row(
                "SELECT COUNT(*) FROM user_notifications WHERE user_id = ?1 AND is_read = 0 AND kind NOT IN ('contact_rejected')",
                rusqlite::params![user.user_id],
                |row| row.get::<_, i64>(0),
            )
            .ok()
        })
        .unwrap_or(0);

    Json(json!({ "count": count })).into_response()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::db::steps::{initialize, today_local};

    #[test]
    fn daily_nudges_insert_once_and_skip_after_goal() {
        let db = rusqlite::Connection::open_in_memory().expect("database");
        db.execute_batch(
            "CREATE TABLE user_notifications (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                resource_id INTEGER,
                kind TEXT NOT NULL,
                title TEXT NOT NULL,
                message TEXT NOT NULL,
                is_read INTEGER NOT NULL DEFAULT 0,
                created_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
             );",
        )
        .expect("notifications");
        initialize(&db).expect("steps");

        let first = ensure_daily_nudges(&db, 9);
        assert_eq!(first.len(), 2);
        let second = ensure_daily_nudges(&db, 9);
        assert!(second.is_empty());

        db.execute(
            "INSERT INTO user_step_days (user_id, step_date, step_count)
             VALUES (9, ?1, 10000)",
            rusqlite::params![today_local()],
        )
        .expect("steps row");

        let count: i64 = db
            .query_row(
                "SELECT COUNT(*) FROM user_notifications WHERE user_id = 9",
                [],
                |row| row.get(0),
            )
            .expect("count");
        assert_eq!(count, 2);
    }
}
