use super::auth::verify_user_session;
use super::common::{csrf_rejected_response, rate_limit_retry_after, request_is_cross_site};
use crate::db::steps::{
    apply_steps, clamp_goal, date_is_allowed, load_snapshot, parse_step_date, save_goal, today_utc,
};
use crate::state::app_state::AppState;
use crate::web::templates;
use axum::{
    extract::{Query, State},
    http::{header, HeaderMap, StatusCode},
    response::{Html, IntoResponse, Response},
    Json,
};
use serde::Deserialize;
use serde_json::json;

#[derive(Debug, Default, Deserialize)]
pub struct StepsQuery {
    pub today: Option<String>,
}

#[derive(Debug, Default, Deserialize)]
pub struct StepsWriteRequest {
    pub date: Option<String>,
    pub steps: Option<i64>,
    pub add: Option<i64>,
    pub source: Option<String>,
    pub goal: Option<i64>,
}

fn snapshot_json(snapshot: &crate::db::steps::StepSnapshot) -> serde_json::Value {
    json!({
        "ok": true,
        "authenticated": true,
        "today": snapshot.today,
        "today_steps": snapshot.today_steps,
        "goal": snapshot.goal,
        "lifetime": snapshot.lifetime,
        "walked_days": snapshot.walked_days,
        "streak": snapshot.streak,
        "best_date": snapshot.best_date,
        "best_steps": snapshot.best_steps,
        "km": ((snapshot.lifetime as f64) * 0.75 / 1000.0 * 10.0).round() / 10.0,
        "days": snapshot.days.iter().map(|day| json!({
            "date": day.date,
            "steps": day.steps
        })).collect::<Vec<_>>(),
        "log": snapshot.log.iter().map(|entry| json!({
            "date": entry.date,
            "delta": entry.delta,
            "source": entry.source,
            "at": entry.created_at
        })).collect::<Vec<_>>()
    })
}

fn resolved_date(raw: Option<&str>) -> Option<String> {
    let value = raw
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .unwrap_or("");
    let date = if value.is_empty() {
        parse_step_date(&today_utc())?
    } else {
        parse_step_date(value)?
    };
    if !date_is_allowed(date) {
        return None;
    }
    Some(date.format("%Y-%m-%d").to_string())
}

pub async fn steps_page(State(state): State<AppState>, headers: HeaderMap) -> Html<String> {
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => return Html(templates::render_steps(None)),
    };

    let snapshot = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => load_snapshot(&db, user_id, &today_utc()).ok(),
        Err(_) => None,
    };

    Html(templates::render_steps(snapshot.as_ref()))
}

pub async fn api_steps_get(
    State(state): State<AppState>,
    headers: HeaderMap,
    Query(query): Query<StepsQuery>,
) -> Response {
    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => {
            return (
                StatusCode::UNAUTHORIZED,
                Json(json!({ "ok": false, "error": "login_required" })),
            )
                .into_response();
        }
    };

    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(json!({ "ok": false, "error": "db_unavailable" })),
            )
                .into_response();
        }
    };

    let today = resolved_date(query.today.as_deref()).unwrap_or_else(today_utc);

    match load_snapshot(&db, user_id, &today) {
        Ok(snapshot) => Json(snapshot_json(&snapshot)).into_response(),
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "ok": false, "error": "load_failed" })),
        )
            .into_response(),
    }
}

pub async fn api_steps_write(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(payload): Json<StepsWriteRequest>,
) -> Response {
    if request_is_cross_site(&headers) {
        return csrf_rejected_response();
    }

    let user_id = match verify_user_session(&state, &headers) {
        Some(id) => id,
        None => {
            return (
                StatusCode::UNAUTHORIZED,
                Json(json!({ "ok": false, "error": "login_required" })),
            )
                .into_response();
        }
    };

    if let Some(retry_after) = rate_limit_retry_after(&state, user_id, "steps_write", 90, 60).await {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            [(header::RETRY_AFTER, retry_after.to_string())],
            Json(json!({
                "ok": false,
                "error": "rate_limited",
                "retry_after": retry_after
            })),
        )
            .into_response();
    }

    let date = match resolved_date(payload.date.as_deref()) {
        Some(date) => date,
        None => {
            return (
                StatusCode::BAD_REQUEST,
                Json(json!({ "ok": false, "error": "bad_date" })),
            )
                .into_response();
        }
    };

    let source = match payload.source.as_deref().unwrap_or("manual") {
        "sensor" => "sensor",
        _ => "manual",
    };

    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(json!({ "ok": false, "error": "db_unavailable" })),
            )
                .into_response();
        }
    };

    if let Some(goal) = payload.goal {
        let _ = save_goal(&db, user_id, clamp_goal(goal));
    }

    if payload.steps.is_some() || payload.add.is_some() {
        if apply_steps(&db, user_id, &date, source, payload.steps, payload.add).is_err() {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "ok": false, "error": "save_failed" })),
            )
                .into_response();
        }
    }

    match load_snapshot(&db, user_id, &date) {
        Ok(mut snapshot) => {
            snapshot.today = date;
            snapshot.today_steps = snapshot
                .days
                .iter()
                .find(|day| day.date == snapshot.today)
                .map(|day| day.steps)
                .unwrap_or(0);
            snapshot.streak = crate::db::steps::walk_streak(&snapshot.days, &snapshot.today);
            Json(snapshot_json(&snapshot)).into_response()
        }
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "ok": false, "error": "load_failed" })),
        )
            .into_response(),
    }
}
