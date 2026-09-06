use chrono::{Duration, NaiveDate, Utc};
use rusqlite::{Connection, OptionalExtension, Result};

pub const DEFAULT_GOAL: i64 = 10_000;
const MIN_GOAL: i64 = 1_000;
const MAX_GOAL: i64 = 50_000;
const MAX_DAY_STEPS: i64 = 200_000;
#[allow(dead_code)]
const MAX_ADD: i64 = 50_000;

#[derive(Clone, Debug)]
pub struct StepDay {
    pub date: String,
    pub steps: i64,
}

#[derive(Clone, Debug)]
#[allow(dead_code)]
pub struct StepLogEntry {
    pub date: String,
    pub delta: i64,
    pub source: String,
    pub created_at: i64,
}

#[derive(Clone, Debug)]
pub struct StepSnapshot {
    pub today: String,
    pub today_steps: i64,
    pub goal: i64,
    pub lifetime: i64,
    pub walked_days: i64,
    pub streak: i64,
    pub best_date: String,
    pub best_steps: i64,
    pub days: Vec<StepDay>,
    #[allow(dead_code)]
    pub log: Vec<StepLogEntry>,
}

pub fn initialize(conn: &Connection) -> Result<()> {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS user_step_days (
            user_id INTEGER NOT NULL,
            step_date TEXT NOT NULL,
            step_count INTEGER NOT NULL DEFAULT 0,
            updated_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
            PRIMARY KEY (user_id, step_date)
        )",
        [],
    )?;

    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_user_step_days_user
         ON user_step_days(user_id, step_date DESC)",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS user_step_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            step_date TEXT NOT NULL,
            delta INTEGER NOT NULL,
            source TEXT NOT NULL,
            created_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
        )",
        [],
    )?;

    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_user_step_log_user
         ON user_step_log(user_id, created_at DESC)",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS user_step_prefs (
            user_id INTEGER PRIMARY KEY,
            daily_goal INTEGER NOT NULL DEFAULT 10000,
            updated_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
        )",
        [],
    )?;

    Ok(())
}

pub fn parse_step_date(value: &str) -> Option<NaiveDate> {
    let value = value.trim();
    if value.len() != 10 || value.as_bytes().get(4) != Some(&b'-') || value.as_bytes().get(7) != Some(&b'-') {
        return None;
    }
    NaiveDate::parse_from_str(value, "%Y-%m-%d").ok()
}

pub fn date_is_allowed(date: NaiveDate) -> bool {
    let today = Utc::now().date_naive();
    let earliest = today - Duration::days(365 * 40);
    let latest = today + Duration::days(1);
    date >= earliest && date <= latest
}

pub fn today_local() -> String {
    Utc::now()
        .with_timezone(&chrono_tz::Europe::Paris)
        .date_naive()
        .format("%Y-%m-%d")
        .to_string()
}

pub fn clamp_goal(goal: i64) -> i64 {
    goal.clamp(MIN_GOAL, MAX_GOAL)
}

pub fn clamp_day_steps(steps: i64) -> i64 {
    steps.clamp(0, MAX_DAY_STEPS)
}

#[allow(dead_code)]
pub fn valid_add(delta: i64) -> bool {
    delta > 0 && delta <= MAX_ADD
}

pub fn walk_streak(days: &[StepDay], today: &str) -> i64 {
    if days.is_empty() {
        return 0;
    }

    let mut by_date = std::collections::HashSet::new();
    for day in days {
        if day.steps > 0 {
            by_date.insert(day.date.as_str());
        }
    }

    let Ok(mut cursor) = NaiveDate::parse_from_str(today, "%Y-%m-%d") else {
        return 0;
    };

    if !by_date.contains(today) {
        cursor -= Duration::days(1);
    }

    let mut streak = 0;
    loop {
        let key = cursor.format("%Y-%m-%d").to_string();
        if !by_date.contains(key.as_str()) {
            break;
        }
        streak += 1;
        cursor -= Duration::days(1);
        if streak > 20_000 {
            break;
        }
    }
    streak
}

pub fn load_snapshot(conn: &Connection, user_id: i64, today: &str) -> Result<StepSnapshot> {
    let goal: i64 = conn
        .query_row(
            "SELECT daily_goal FROM user_step_prefs WHERE user_id = ?1",
            [user_id],
            |row| row.get(0),
        )
        .optional()?
        .unwrap_or(DEFAULT_GOAL);

    let (lifetime, walked_days, best_steps): (i64, i64, i64) = conn.query_row(
        "SELECT COALESCE(SUM(step_count), 0),
                COALESCE(SUM(CASE WHEN step_count > 0 THEN 1 ELSE 0 END), 0),
                COALESCE(MAX(step_count), 0)
         FROM user_step_days
         WHERE user_id = ?1",
        [user_id],
        |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?)),
    )?;
    let best_date = if best_steps > 0 {
        conn.query_row(
            "SELECT step_date FROM user_step_days
             WHERE user_id = ?1 AND step_count = ?2
             ORDER BY step_date DESC LIMIT 1",
            rusqlite::params![user_id, best_steps],
            |row| row.get(0),
        )
        .unwrap_or_default()
    } else {
        String::new()
    };

    // Keep enough recent days for week + streak; lifetime/best come from aggregates.
    let days: Vec<StepDay> = conn
        .prepare(
            "SELECT step_date, step_count
             FROM user_step_days
             WHERE user_id = ?1
             ORDER BY step_date DESC
             LIMIT 120",
        )
        .and_then(|mut stmt| {
            stmt.query_map([user_id], |row| {
                Ok(StepDay {
                    date: row.get(0)?,
                    steps: row.get(1)?,
                })
            })?
            .collect::<Result<Vec<_>, _>>()
        })?;

    let today_steps = days
        .iter()
        .find(|day| day.date == today)
        .map(|day| day.steps)
        .unwrap_or(0);

    Ok(StepSnapshot {
        today: today.to_string(),
        today_steps,
        goal: clamp_goal(goal),
        lifetime,
        walked_days,
        streak: walk_streak(&days, today),
        best_date,
        best_steps,
        days,
        log: Vec::new(),
    })
}

pub fn save_goal(conn: &Connection, user_id: i64, goal: i64) -> Result<i64> {
    let goal = clamp_goal(goal);
    conn.execute(
        "INSERT INTO user_step_prefs (user_id, daily_goal, updated_at)
         VALUES (?1, ?2, strftime('%s','now'))
         ON CONFLICT(user_id) DO UPDATE SET
            daily_goal = excluded.daily_goal,
            updated_at = excluded.updated_at",
        rusqlite::params![user_id, goal],
    )?;
    Ok(goal)
}

pub fn apply_steps(
    conn: &Connection,
    user_id: i64,
    date: &str,
    source: &str,
    absolute: Option<i64>,
    _add: Option<i64>,
) -> Result<(i64, i64)> {
    let current: i64 = conn
        .query_row(
            "SELECT step_count FROM user_step_days WHERE user_id = ?1 AND step_date = ?2",
            rusqlite::params![user_id, date],
            |row| row.get(0),
        )
        .optional()?
        .unwrap_or(0);

    let (next, delta, log_delta) = match source {
        "manual" => {
            return Ok((current, 0));
        }
        _ => {
            let absolute = absolute
                .map(clamp_day_steps)
                .unwrap_or(current);
            let next = current.max(absolute);
            let applied = next - current;
            let log_delta = if applied >= 200 { applied } else { 0 };
            (next, applied, log_delta)
        }
    };

    if delta <= 0 {
        return Ok((current, 0));
    }

    conn.execute(
        "INSERT INTO user_step_days (user_id, step_date, step_count, updated_at)
         VALUES (?1, ?2, ?3, strftime('%s','now'))
         ON CONFLICT(user_id, step_date) DO UPDATE SET
            step_count = excluded.step_count,
            updated_at = excluded.updated_at",
        rusqlite::params![user_id, date, next],
    )?;

    if log_delta > 0 {
        conn.execute(
            "INSERT INTO user_step_log (user_id, step_date, delta, source, created_at)
             VALUES (?1, ?2, ?3, ?4, strftime('%s','now'))",
            rusqlite::params![user_id, date, log_delta, source],
        )?;
    }

    Ok((next, delta))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn date_format_and_window() {
        let date = parse_step_date("2026-09-06").unwrap();
        assert!(date_is_allowed(date));
        assert!(parse_step_date("26-9-6").is_none());
        assert!(!date_is_allowed(NaiveDate::from_ymd_opt(1900, 1, 1).unwrap()));
    }

    #[test]
    fn streak_skips_empty_today() {
        let days = vec![
            StepDay {
                date: "2026-09-06".into(),
                steps: 0,
            },
            StepDay {
                date: "2026-09-05".into(),
                steps: 1200,
            },
            StepDay {
                date: "2026-09-04".into(),
                steps: 800,
            },
            StepDay {
                date: "2026-09-02".into(),
                steps: 400,
            },
        ];
        assert_eq!(walk_streak(&days, "2026-09-06"), 2);
    }

    #[test]
    fn manual_adds_are_ignored_and_sensor_never_lowers() {
        let conn = Connection::open_in_memory().unwrap();
        initialize(&conn).unwrap();
        assert!(valid_add(500));
        let (count, delta) = apply_steps(&conn, 1, "2026-09-06", "manual", None, Some(500)).unwrap();
        assert_eq!((count, delta), (0, 0));
        let (count, delta) =
            apply_steps(&conn, 1, "2026-09-06", "sensor", Some(500), None).unwrap();
        assert_eq!((count, delta), (500, 500));
        let (count, delta) =
            apply_steps(&conn, 1, "2026-09-06", "sensor", Some(120), None).unwrap();
        assert_eq!((count, delta), (500, 0));
        let (count, delta) =
            apply_steps(&conn, 1, "2026-09-06", "sensor", Some(900), None).unwrap();
        assert_eq!((count, delta), (900, 400));
    }
}
