use crate::state::app_state::AppState;
use axum::{
    extract::{Query, State},
    Json,
};
use serde::Deserialize;
use serde_json::{json, Value};

const QUERY_MAX_CHARS: usize = 80;

#[derive(Debug, Deserialize)]
pub struct GeoSearchQuery {
    q: Option<String>,
    limit: Option<i64>,
}

fn normalize_query(value: Option<&str>) -> Result<String, Json<Value>> {
    let raw = value.unwrap_or("").trim();
    if raw.chars().count() > QUERY_MAX_CHARS || raw.chars().any(char::is_control) {
        return Err(Json(json!({"ok": false, "error": "invalid_query"})));
    }
    Ok(raw.to_string())
}

pub async fn api_geo_search(
    State(state): State<AppState>,
    Query(query): Query<GeoSearchQuery>,
) -> Json<Value> {
    let q = match normalize_query(query.q.as_deref()) {
        Ok(value) => value,
        Err(response) => return response,
    };
    let limit = query.limit.unwrap_or(10).clamp(1, 20);
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return Json(json!({"ok": false, "error": "database_unavailable"})),
    };
    match crate::db::geo_search::search_places(&db, &q, limit) {
        Ok(hits) => Json(json!({
            "ok": true,
            "items": hits.iter().map(|hit| json!({
                "kind": hit.kind,
                "id": hit.id,
                "name": hit.name,
                "subtitle": hit.subtitle,
                "href": hit.href
            })).collect::<Vec<_>>()
        })),
        Err(_) => Json(json!({"ok": false, "error": "search_failed"})),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn query_is_trimmed_and_rejects_control_characters() {
        assert_eq!(normalize_query(Some("  Nice  ")).unwrap(), "Nice");
        assert!(normalize_query(Some("Nice\u{0007}")).is_err());
        assert!(normalize_query(Some(&"x".repeat(81))).is_err());
    }

    #[test]
    fn json_contract_omits_private_fields() {
        let source = include_str!("geo_search.rs");
        assert!(source.contains("hit.href"));
        assert!(!source.contains("hit.cards"));
        assert!(source.contains("hit.kind"));
    }
}
