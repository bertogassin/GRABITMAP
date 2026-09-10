use super::admin_access::{
    load_admin_context, scope_is_authorized, valid_admin_session_public_id, AdminLevel,
    AdminPermission,
};
use super::auth::verify_user_session;
use super::common::{rate_limit_retry_after, request_is_cross_site, unix_now};
use crate::state::app_state::AppState;
use crate::web::templates::{self, OfficialGroupPlace, OfficialGroupsPage};
use axum::{
    extract::{Path, Query, State},
    http::{HeaderMap, StatusCode},
    response::{Html, IntoResponse, Redirect, Response},
};
use rusqlite::{Connection, OptionalExtension};
use serde::Deserialize;

const OFFICIAL_GROUP_MAX_MEMBERS: i64 = 250;

#[derive(Debug, Default, Deserialize)]
pub struct OfficialGroupsQuery {
    scope_type: Option<String>,
    scope_id: Option<i64>,
    q: Option<String>,
}

#[derive(Debug)]
struct ScopeLocation {
    scope_type: String,
    scope_id: i64,
    name: String,
    parent_type: String,
    parent_id: i64,
    parent_name: String,
}

fn normalized_scope(scope_type: Option<&str>, scope_id: Option<i64>) -> Option<(&str, i64)> {
    let scope_type = scope_type.unwrap_or("world");
    let scope_id = scope_id.unwrap_or(1);
    if !matches!(scope_type, "world" | "continent" | "country" | "city") || scope_id <= 0 {
        return None;
    }
    if scope_type == "world" && scope_id != 1 {
        return None;
    }
    Some((scope_type, scope_id))
}

fn load_scope(db: &Connection, scope_type: &str, scope_id: i64) -> Option<ScopeLocation> {
    match scope_type {
        "world" if scope_id == 1 => Some(ScopeLocation {
            scope_type: "world".to_string(),
            scope_id,
            name: "Весь мир".to_string(),
            parent_type: String::new(),
            parent_id: 0,
            parent_name: String::new(),
        }),
        "continent" => db
            .query_row(
                "SELECT name_ru FROM geo_continents WHERE id = ?1 AND is_active = 1",
                [scope_id],
                |row| row.get::<_, String>(0),
            )
            .ok()
            .map(|name| ScopeLocation {
                scope_type: "continent".to_string(),
                scope_id,
                name,
                parent_type: "world".to_string(),
                parent_id: 1,
                parent_name: "Весь мир".to_string(),
            }),
        "country" => db
            .query_row(
                "SELECT country.name_ru, continent.id, continent.name_ru
                 FROM geo_countries AS country
                 JOIN geo_continents AS continent ON continent.id = country.continent_id
                 WHERE country.id = ?1
                   AND country.is_active = 1
                   AND continent.is_active = 1",
                [scope_id],
                |row| {
                    Ok(ScopeLocation {
                        scope_type: "country".to_string(),
                        scope_id,
                        name: row.get(0)?,
                        parent_type: "continent".to_string(),
                        parent_id: row.get(1)?,
                        parent_name: row.get(2)?,
                    })
                },
            )
            .ok(),
        "city" => db
            .query_row(
                "SELECT city.name_ru, country.id, country.name_ru
                 FROM geo_cities AS city
                 JOIN geo_countries AS country ON country.id = city.country_id
                 JOIN geo_continents AS continent ON continent.id = country.continent_id
                 WHERE city.id = ?1
                   AND city.place_kind = 'city'
                   AND city.is_active = 1
                   AND country.is_active = 1
                   AND continent.is_active = 1",
                [scope_id],
                |row| {
                    Ok(ScopeLocation {
                        scope_type: "city".to_string(),
                        scope_id,
                        name: row.get(0)?,
                        parent_type: "country".to_string(),
                        parent_id: row.get(1)?,
                        parent_name: row.get(2)?,
                    })
                },
            )
            .ok(),
        _ => None,
    }
}

fn admin_geographic_scope_id(db: &Connection, location: &ScopeLocation) -> Option<i64> {
    let external_key = match location.scope_type.as_str() {
        "world" => "world".to_string(),
        "continent" => db
            .query_row(
                "SELECT 'continent:' || code FROM geo_continents WHERE id = ?1",
                [location.scope_id],
                |row| row.get(0),
            )
            .ok()?,
        "country" => db
            .query_row(
                "SELECT 'country:' || iso2 FROM geo_countries WHERE id = ?1",
                [location.scope_id],
                |row| row.get(0),
            )
            .ok()?,
        "city" => db
            .query_row(
                "SELECT 'city:' || stable_key FROM geo_cities WHERE id = ?1",
                [location.scope_id],
                |row| row.get(0),
            )
            .ok()?,
        _ => return None,
    };
    db.query_row(
        "SELECT id FROM geographic_scopes
         WHERE scope_type = ?1 AND external_key = ?2 AND is_active = 1",
        rusqlite::params![location.scope_type, external_key],
        |row| row.get(0),
    )
    .ok()
}

fn required_admin_level(scope_type: &str) -> Option<AdminLevel> {
    match scope_type {
        "world" => Some(AdminLevel::Owner),
        "continent" => Some(AdminLevel::Continent),
        "country" => Some(AdminLevel::Country),
        "city" => Some(AdminLevel::City),
        _ => None,
    }
}

fn can_create_official_group(
    state: &AppState,
    headers: &HeaderMap,
    db: &Connection,
    user_id: i64,
    location: &ScopeLocation,
) -> bool {
    let Some(context) = load_admin_context(state, user_id) else {
        return false;
    };
    if valid_admin_session_public_id(state, headers, user_id, context.assignment_id).is_none() {
        return false;
    }
    let Some(required_level) = required_admin_level(&location.scope_type) else {
        return false;
    };
    let Some(target_scope_id) = admin_geographic_scope_id(db, location) else {
        return false;
    };
    context.level >= required_level
        && context.has_permission(AdminPermission::GroupsManage)
        && scope_is_authorized(state, &context, target_scope_id)
}

pub(super) fn is_official_group(db: &Connection, group_id: i64) -> bool {
    group_id > 0
        && db
            .query_row(
                "SELECT 1 FROM chat_group_scopes WHERE group_id = ?1",
                [group_id],
                |_| Ok(()),
            )
            .is_ok()
}

fn official_group_location(db: &Connection, group_id: i64) -> Option<ScopeLocation> {
    let (scope_type, scope_id): (String, i64) = db
        .query_row(
            "SELECT scope_type, scope_id FROM chat_group_scopes WHERE group_id = ?1",
            [group_id],
            |row| Ok((row.get(0)?, row.get(1)?)),
        )
        .ok()?;
    load_scope(db, &scope_type, scope_id)
}

pub(super) fn can_administer_official_group(
    state: &AppState,
    headers: &HeaderMap,
    db: &Connection,
    group_id: i64,
    user_id: i64,
) -> bool {
    let Some(location) = official_group_location(db, group_id) else {
        return false;
    };
    can_create_official_group(state, headers, db, user_id, &location)
}

pub(super) fn group_management_role(
    state: &AppState,
    headers: &HeaderMap,
    db: &Connection,
    group_id: i64,
    user_id: i64,
) -> Option<String> {
    let stored_role: Option<String> = db
        .query_row(
            "SELECT role FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
            rusqlite::params![group_id, user_id],
            |row| row.get(0),
        )
        .ok();
    if !is_official_group(db, group_id) {
        return stored_role;
    }
    match stored_role.as_deref() {
        Some("owner") if can_administer_official_group(state, headers, db, group_id, user_id) => {
            Some("owner".to_string())
        }
        Some(_) => Some("member".to_string()),
        None => None,
    }
}

fn group_for_scope(db: &Connection, scope_type: &str, scope_id: i64) -> Option<(i64, i64)> {
    db.query_row(
        "SELECT scope.group_id, COUNT(member.user_id)
         FROM chat_group_scopes AS scope
         JOIN chat_groups AS group_row ON group_row.id = scope.group_id
         LEFT JOIN chat_group_members AS member ON member.group_id = scope.group_id
         WHERE scope.scope_type = ?1 AND scope.scope_id = ?2
         GROUP BY scope.group_id",
        rusqlite::params![scope_type, scope_id],
        |row| Ok((row.get(0)?, row.get(1)?)),
    )
    .optional()
    .ok()
    .flatten()
}

fn load_children(
    db: &Connection,
    location: &ScopeLocation,
    query: &str,
) -> Vec<OfficialGroupPlace> {
    let normalized_query = query.trim().to_lowercase();
    let sql = match location.scope_type.as_str() {
        "world" => {
            "SELECT 'continent', place.id, place.name_ru,
                    COALESCE(scope.group_id, 0), COUNT(member.user_id)
             FROM geo_continents AS place
             LEFT JOIN chat_group_scopes AS scope
               ON scope.scope_type = 'continent' AND scope.scope_id = place.id
             LEFT JOIN chat_group_members AS member ON member.group_id = scope.group_id
             WHERE place.is_active = 1 AND ?1 > 0
             GROUP BY place.id, place.name_ru, scope.group_id
             ORDER BY place.name_ru COLLATE NOCASE"
        }
        "continent" => {
            "SELECT 'country', place.id, place.name_ru,
                    COALESCE(scope.group_id, 0), COUNT(member.user_id)
             FROM geo_countries AS place
             LEFT JOIN chat_group_scopes AS scope
               ON scope.scope_type = 'country' AND scope.scope_id = place.id
             LEFT JOIN chat_group_members AS member ON member.group_id = scope.group_id
             WHERE place.continent_id = ?1 AND place.is_active = 1
             GROUP BY place.id, place.name_ru, scope.group_id
             ORDER BY place.name_ru COLLATE NOCASE"
        }
        "country" => {
            "SELECT 'city', place.id, place.name_ru,
                    COALESCE(scope.group_id, 0), COUNT(member.user_id)
             FROM geo_cities AS place
             LEFT JOIN chat_group_scopes AS scope
               ON scope.scope_type = 'city' AND scope.scope_id = place.id
             LEFT JOIN chat_group_members AS member ON member.group_id = scope.group_id
             WHERE place.country_id = ?1 AND place.is_active = 1
               AND place.place_kind = 'city'
             GROUP BY place.id, place.name_ru, scope.group_id
             ORDER BY place.population DESC, place.name_ru COLLATE NOCASE"
        }
        _ => return Vec::new(),
    };
    db.prepare(sql)
        .and_then(|mut statement| {
            statement
                .query_map([location.scope_id], |row| {
                    Ok(OfficialGroupPlace {
                        scope_type: row.get(0)?,
                        scope_id: row.get(1)?,
                        name: row.get(2)?,
                        group_id: row.get(3)?,
                        member_count: row.get(4)?,
                    })
                })?
                .collect::<Result<Vec<_>, _>>()
        })
        .unwrap_or_default()
        .into_iter()
        .filter(|place| {
            normalized_query.is_empty() || place.name.to_lowercase().contains(&normalized_query)
        })
        .take(100)
        .collect()
}

fn render_page(
    state: &AppState,
    headers: &HeaderMap,
    scope_type: Option<&str>,
    scope_id: Option<i64>,
    query: &str,
    error: &str,
) -> Response {
    let Some((scope_type, scope_id)) = normalized_scope(scope_type, scope_id) else {
        return StatusCode::NOT_FOUND.into_response();
    };
    if query.chars().count() > 80 || query.chars().any(char::is_control) {
        return StatusCode::BAD_REQUEST.into_response();
    }
    let db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return StatusCode::SERVICE_UNAVAILABLE.into_response(),
    };
    let Some(location) = load_scope(&db, scope_type, scope_id) else {
        return StatusCode::NOT_FOUND.into_response();
    };
    let user_id = verify_user_session(state, headers).unwrap_or(0);
    let group = group_for_scope(&db, scope_type, scope_id);
    let is_member = group.is_some_and(|(group_id, _)| {
        db.query_row(
            "SELECT 1 FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
            rusqlite::params![group_id, user_id],
            |_| Ok(()),
        )
        .is_ok()
    });
    let can_create = group.is_none()
        && user_id > 0
        && can_create_official_group(state, headers, &db, user_id, &location);
    let children = load_children(&db, &location, query);
    Html(templates::render_official_groups(OfficialGroupsPage {
        authenticated: user_id > 0,
        scope_type: &location.scope_type,
        scope_id: location.scope_id,
        name: &location.name,
        parent_type: &location.parent_type,
        parent_id: location.parent_id,
        parent_name: &location.parent_name,
        group_id: group.map_or(0, |value| value.0),
        member_count: group.map_or(0, |value| value.1),
        is_member,
        can_create,
        query,
        children,
        error,
    }))
    .into_response()
}

pub async fn official_groups_page(
    State(state): State<AppState>,
    headers: HeaderMap,
    Query(query): Query<OfficialGroupsQuery>,
) -> Response {
    render_page(
        &state,
        &headers,
        query.scope_type.as_deref(),
        query.scope_id,
        query.q.as_deref().unwrap_or(""),
        "",
    )
}

pub async fn create_official_group(
    State(state): State<AppState>,
    Path((scope_type, scope_id)): Path<(String, i64)>,
    headers: HeaderMap,
) -> Response {
    if request_is_cross_site(&headers) {
        return StatusCode::FORBIDDEN.into_response();
    }
    let Some(user_id) = verify_user_session(&state, &headers) else {
        return Redirect::to("/login?next=/app/official-groups").into_response();
    };
    if rate_limit_retry_after(&state, user_id, "official_group_create", 6, 600)
        .await
        .is_some()
    {
        return StatusCode::TOO_MANY_REQUESTS.into_response();
    }
    let mut db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return StatusCode::SERVICE_UNAVAILABLE.into_response(),
    };
    let Some((safe_type, safe_id)) = normalized_scope(Some(&scope_type), Some(scope_id)) else {
        return StatusCode::NOT_FOUND.into_response();
    };
    let Some(location) = load_scope(&db, safe_type, safe_id) else {
        return StatusCode::NOT_FOUND.into_response();
    };
    if !can_create_official_group(&state, &headers, &db, user_id, &location) {
        return StatusCode::FORBIDDEN.into_response();
    }
    let Some(admin_context) = load_admin_context(&state, user_id) else {
        return StatusCode::FORBIDDEN.into_response();
    };
    let now = unix_now();
    let transaction = match db.transaction() {
        Ok(transaction) => transaction,
        Err(_) => return StatusCode::SERVICE_UNAVAILABLE.into_response(),
    };
    let name = format!("GRABIT · {}", location.name);
    if transaction
        .execute(
            "INSERT INTO chat_groups (name, created_by, created_at, owner_user_id, updated_at)
             SELECT ?1, ?2, ?3, ?2, ?3
             WHERE NOT EXISTS (
                 SELECT 1 FROM chat_group_scopes WHERE scope_type = ?4 AND scope_id = ?5
             )",
            rusqlite::params![name, user_id, now, safe_type, safe_id],
        )
        .ok()
        != Some(1)
    {
        return Redirect::to(&format!(
            "/app/official-groups?scope_type={safe_type}&scope_id={safe_id}"
        ))
        .into_response();
    }
    let group_id = transaction.last_insert_rowid();
    let saved = transaction.execute(
        "INSERT INTO chat_group_members (group_id, user_id, joined_at, role)
         VALUES (?1, ?2, ?3, 'owner')",
        rusqlite::params![group_id, user_id, now],
    );
    let bound = transaction.execute(
        "INSERT INTO chat_group_scopes (group_id, scope_type, scope_id, created_at)
         VALUES (?1, ?2, ?3, ?4)",
        rusqlite::params![group_id, safe_type, safe_id, now],
    );
    let audited = transaction.execute(
        "INSERT INTO chat_official_group_governance_events (
            group_id, action, actor_user_id, admin_assignment_id,
            previous_owner_user_id, new_owner_user_id, created_at
         ) VALUES (?1, 'created', ?2, ?3, 0, ?2, ?4)",
        rusqlite::params![group_id, user_id, admin_context.assignment_id, now],
    );
    if saved.is_err() || bound.is_err() || audited.is_err() || transaction.commit().is_err() {
        return StatusCode::CONFLICT.into_response();
    }
    Redirect::to(&format!("/app/group/{group_id}")).into_response()
}

pub async fn claim_official_group_control(
    State(state): State<AppState>,
    Path(group_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    let target = format!("/app/group/{group_id}/members");
    if request_is_cross_site(&headers) {
        return StatusCode::FORBIDDEN.into_response();
    }
    let Some(user_id) = verify_user_session(&state, &headers) else {
        return Redirect::to("/login?next=/app/messages").into_response();
    };
    if rate_limit_retry_after(&state, user_id, "official_group_control", 6, 600)
        .await
        .is_some()
    {
        return StatusCode::TOO_MANY_REQUESTS.into_response();
    }
    let mut db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return StatusCode::SERVICE_UNAVAILABLE.into_response(),
    };
    if !is_official_group(&db, group_id)
        || !can_administer_official_group(&state, &headers, &db, group_id, user_id)
    {
        return StatusCode::FORBIDDEN.into_response();
    }
    let Some(admin_context) = load_admin_context(&state, user_id) else {
        return StatusCode::FORBIDDEN.into_response();
    };
    let transaction = match db.transaction() {
        Ok(transaction) => transaction,
        Err(_) => return StatusCode::SERVICE_UNAVAILABLE.into_response(),
    };
    let is_member = transaction
        .query_row(
            "SELECT 1 FROM chat_group_members WHERE group_id = ?1 AND user_id = ?2",
            rusqlite::params![group_id, user_id],
            |_| Ok(()),
        )
        .is_ok();
    if !is_member {
        return StatusCode::FORBIDDEN.into_response();
    }
    let previous_owner: i64 = transaction
        .query_row(
            "SELECT owner_user_id FROM chat_groups WHERE id = ?1",
            [group_id],
            |row| row.get(0),
        )
        .unwrap_or(0);
    if previous_owner == user_id {
        return Redirect::to(&target).into_response();
    }
    let now = unix_now();
    let demoted = transaction.execute(
        "UPDATE chat_group_members SET role = 'member'
         WHERE group_id = ?1 AND role = 'owner'",
        [group_id],
    );
    let promoted = transaction.execute(
        "UPDATE chat_group_members SET role = 'owner'
         WHERE group_id = ?1 AND user_id = ?2",
        rusqlite::params![group_id, user_id],
    );
    let group_updated = transaction.execute(
        "UPDATE chat_groups
         SET owner_user_id = ?1, invite_nonce = '', updated_at = ?2
         WHERE id = ?3",
        rusqlite::params![user_id, now, group_id],
    );
    let audited = transaction.execute(
        "INSERT INTO chat_official_group_governance_events (
            group_id, action, actor_user_id, admin_assignment_id,
            previous_owner_user_id, new_owner_user_id, created_at
         ) VALUES (?1, 'control_claimed', ?2, ?3, ?4, ?2, ?5)",
        rusqlite::params![
            group_id,
            user_id,
            admin_context.assignment_id,
            previous_owner,
            now
        ],
    );
    if demoted.is_err()
        || promoted.ok() != Some(1)
        || group_updated.ok() != Some(1)
        || audited.is_err()
        || transaction.commit().is_err()
    {
        return StatusCode::CONFLICT.into_response();
    }
    Redirect::to(&target).into_response()
}

pub async fn join_official_group(
    State(state): State<AppState>,
    Path((scope_type, scope_id)): Path<(String, i64)>,
    headers: HeaderMap,
) -> Response {
    if request_is_cross_site(&headers) {
        return StatusCode::FORBIDDEN.into_response();
    }
    let Some(user_id) = verify_user_session(&state, &headers) else {
        return Redirect::to("/login?next=/app/official-groups").into_response();
    };
    if rate_limit_retry_after(&state, user_id, "official_group_join", 12, 600)
        .await
        .is_some()
    {
        return StatusCode::TOO_MANY_REQUESTS.into_response();
    }
    let Some((safe_type, safe_id)) = normalized_scope(Some(&scope_type), Some(scope_id)) else {
        return StatusCode::NOT_FOUND.into_response();
    };
    let mut db = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(db) => db,
        Err(_) => return StatusCode::SERVICE_UNAVAILABLE.into_response(),
    };
    if load_scope(&db, safe_type, safe_id).is_none() {
        return StatusCode::NOT_FOUND.into_response();
    }
    let transaction = match db.transaction() {
        Ok(transaction) => transaction,
        Err(_) => return StatusCode::SERVICE_UNAVAILABLE.into_response(),
    };
    let group_id: Option<i64> = transaction
        .query_row(
            "SELECT scope.group_id
             FROM chat_group_scopes AS scope
             JOIN chat_groups AS group_row ON group_row.id = scope.group_id
             WHERE scope.scope_type = ?1 AND scope.scope_id = ?2
               AND (SELECT COUNT(*) FROM chat_group_members WHERE group_id = scope.group_id) < ?3",
            rusqlite::params![safe_type, safe_id, OFFICIAL_GROUP_MAX_MEMBERS],
            |row| row.get(0),
        )
        .optional()
        .ok()
        .flatten();
    let Some(group_id) = group_id else {
        return StatusCode::CONFLICT.into_response();
    };
    if transaction
        .execute(
            "INSERT OR IGNORE INTO chat_group_members (group_id, user_id, joined_at, role)
             VALUES (?1, ?2, ?3, 'member')",
            rusqlite::params![group_id, user_id, unix_now()],
        )
        .is_err()
        || transaction.commit().is_err()
    {
        return StatusCode::CONFLICT.into_response();
    }
    Redirect::to(&format!("/app/group/{group_id}")).into_response()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn official_scope_input_is_strict() {
        assert_eq!(normalized_scope(None, None), Some(("world", 1)));
        assert_eq!(normalized_scope(Some("city"), Some(42)), Some(("city", 42)));
        assert_eq!(normalized_scope(Some("world"), Some(2)), None);
        assert_eq!(normalized_scope(Some("group"), Some(1)), None);
        assert_eq!(normalized_scope(Some("city"), Some(0)), None);
    }

    #[test]
    fn official_scope_requires_matching_admin_level() {
        assert_eq!(required_admin_level("world"), Some(AdminLevel::Owner));
        assert_eq!(
            required_admin_level("continent"),
            Some(AdminLevel::Continent)
        );
        assert_eq!(required_admin_level("country"), Some(AdminLevel::Country));
        assert_eq!(required_admin_level("city"), Some(AdminLevel::City));
        assert_eq!(required_admin_level("group"), None);
    }
}
