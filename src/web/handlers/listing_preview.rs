use crate::state::app_state::AppState;
use axum::{
    extract::{Path, State},
    http::{header, HeaderValue, StatusCode},
    response::{IntoResponse, Response},
    Json,
};
use rusqlite::OptionalExtension;
use serde::Serialize;
use serde_json::json;

#[derive(Debug, Serialize, PartialEq, Eq)]
struct ListingPreview {
    id: i64,
    title: String,
    description: String,
    address: String,
    rubric: String,
    listing_type: String,
    verified: bool,
    premium: bool,
    image_url: String,
    url: String,
}

fn load_public_listing_preview(
    connection: &rusqlite::Connection,
    listing_id: i64,
) -> rusqlite::Result<Option<ListingPreview>> {
    if listing_id <= 0 {
        return Ok(None);
    }

    connection
        .query_row(
            "SELECT
                id,
                title,
                description,
                address,
                COALESCE(rubric, ''),
                COALESCE(listing_type, 'general'),
                is_verified,
                is_premium
             FROM resources
             WHERE id = ?1
               AND is_active = 1
               AND moderation_status = 'approved'
             LIMIT 1",
            rusqlite::params![listing_id],
            |row| {
                let id: i64 = row.get(0)?;
                let rubric_key: String = row.get(4)?;

                Ok(ListingPreview {
                    id,
                    title: row.get(1)?,
                    description: row.get(2)?,
                    address: row.get(3)?,
                    rubric: crate::catalog::label_for(&rubric_key),
                    listing_type: row.get(5)?,
                    verified: row.get::<_, i64>(6)? != 0,
                    premium: row.get::<_, i64>(7)? != 0,
                    image_url: format!(
                        "/static/grabit-share-cover.png?v={}",
                        crate::web::templates::STATIC_ASSET_VERSION
                    ),
                    url: format!("/app/listing/{id}"),
                })
            },
        )
        .optional()
}

pub async fn api_listing_preview(
    State(state): State<AppState>,
    Path(listing_id): Path<i64>,
) -> Response {
    let connection = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(connection) => connection,
        Err(_) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(json!({"ok": false, "error": "database_unavailable"})),
            )
                .into_response();
        }
    };

    match load_public_listing_preview(&connection, listing_id) {
        Ok(Some(listing)) => {
            let mut response = Json(json!({"ok": true, "listing": listing})).into_response();
            response.headers_mut().insert(
                header::CACHE_CONTROL,
                HeaderValue::from_static("public, max-age=60, stale-while-revalidate=300"),
            );
            response
        }
        Ok(None) => (
            StatusCode::NOT_FOUND,
            Json(json!({"ok": false, "error": "listing_not_found"})),
        )
            .into_response(),
        Err(_) => (
            StatusCode::SERVICE_UNAVAILABLE,
            Json(json!({"ok": false, "error": "database_unavailable"})),
        )
            .into_response(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn database() -> rusqlite::Connection {
        let connection = rusqlite::Connection::open_in_memory().expect("database");
        connection
            .execute_batch(
                "CREATE TABLE resources (
                    id INTEGER PRIMARY KEY,
                    title TEXT NOT NULL,
                    description TEXT NOT NULL,
                    address TEXT NOT NULL,
                    rubric TEXT NOT NULL DEFAULT '',
                    listing_type TEXT NOT NULL DEFAULT 'general',
                    is_verified INTEGER NOT NULL DEFAULT 0,
                    is_premium INTEGER NOT NULL DEFAULT 0,
                    is_active INTEGER NOT NULL DEFAULT 1,
                    moderation_status TEXT NOT NULL DEFAULT 'pending'
                );",
            )
            .expect("schema");
        connection
    }

    #[test]
    fn preview_exposes_only_active_approved_listings() {
        let connection = database();
        connection
            .execute(
                "INSERT INTO resources (
                    id, title, description, address, rubric, listing_type,
                    is_verified, is_premium, is_active, moderation_status
                 ) VALUES
                    (1, 'Охрана', 'Ночная смена', 'Ницца', 'security', 'seeker', 1, 0, 1, 'approved'),
                    (2, 'Черновик', 'Скрыто', 'Ницца', 'security', 'offer', 0, 0, 1, 'pending'),
                    (3, 'Удалено', 'Скрыто', 'Ницца', 'security', 'offer', 0, 0, 0, 'approved')",
                [],
            )
            .expect("fixtures");

        let preview = load_public_listing_preview(&connection, 1)
            .expect("query")
            .expect("public listing");

        assert_eq!(preview.title, "Охрана");
        assert_eq!(preview.rubric, "Охрана");
        assert_eq!(preview.url, "/app/listing/1");
        assert_eq!(
            preview.image_url,
            format!(
                "/static/grabit-share-cover.png?v={}",
                crate::web::templates::STATIC_ASSET_VERSION
            )
        );
        assert!(preview.verified);
        assert!(load_public_listing_preview(&connection, 2)
            .expect("pending query")
            .is_none());
        assert!(load_public_listing_preview(&connection, 3)
            .expect("inactive query")
            .is_none());
    }
}
