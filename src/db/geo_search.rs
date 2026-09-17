use rusqlite::{params, Connection, OptionalExtension, Result};

const MAX_SCAN_CANDIDATES: i64 = 40;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct GeoSearchHit {
    pub kind: String,
    pub id: i64,
    pub name: String,
    pub subtitle: String,
    pub href: String,
    pub cards: i64,
}

pub fn ensure_geo_search(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        r#"
        CREATE VIRTUAL TABLE IF NOT EXISTS geo_search_fts USING fts5(
            search_text,
            kind UNINDEXED,
            place_id UNINDEXED,
            tokenize = 'unicode61 remove_diacritics 2',
            prefix = '2 3 4'
        );
        "#,
    )?;

    let indexed = conn
        .query_row("SELECT COUNT(*) FROM geo_search_fts", [], |row| {
            row.get::<_, i64>(0)
        })
        .unwrap_or(0);
    let expected = expected_place_count(conn)?;
    if indexed != expected {
        rebuild_geo_search(conn)?;
    }
    Ok(())
}

fn expected_place_count(conn: &Connection) -> Result<i64> {
    let cities = conn.query_row(
        "SELECT COUNT(*) FROM geo_cities WHERE is_active = 1 AND place_kind = 'city'",
        [],
        |row| row.get::<_, i64>(0),
    )?;
    let countries = conn.query_row(
        "SELECT COUNT(*) FROM geo_countries WHERE is_active = 1",
        [],
        |row| row.get::<_, i64>(0),
    )?;
    Ok(cities + countries)
}

fn rebuild_geo_search(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        r#"
        DROP TABLE IF EXISTS geo_search_fts;
        CREATE VIRTUAL TABLE geo_search_fts USING fts5(
            search_text,
            kind UNINDEXED,
            place_id UNINDEXED,
            tokenize = 'unicode61 remove_diacritics 2',
            prefix = '2 3 4'
        );
        "#,
    )?;
    conn.execute(
        r#"
        INSERT INTO geo_search_fts(search_text, kind, place_id)
        SELECT
            trim(
                city.name_ru || ' ' ||
                city.name_native || ' ' ||
                city.name_ascii || ' ' ||
                city.stable_key || ' ' ||
                country.name_ru || ' ' ||
                country.iso2 || ' ' ||
                country.iso3
            ),
            'city',
            city.id
        FROM geo_cities AS city
        JOIN geo_countries AS country
          ON country.id = city.country_id
        WHERE city.is_active = 1
          AND city.place_kind = 'city'
          AND country.is_active = 1
        "#,
        [],
    )?;
    conn.execute(
        r#"
        INSERT INTO geo_search_fts(search_text, kind, place_id)
        SELECT
            trim(country.name_ru || ' ' || country.iso2 || ' ' || country.iso3),
            'country',
            country.id
        FROM geo_countries AS country
        WHERE country.is_active = 1
        "#,
        [],
    )?;
    Ok(())
}

pub fn fts_match_query(raw: &str) -> Option<String> {
    let terms: Vec<String> = raw
        .split_whitespace()
        .map(|term| {
            term.chars()
                .filter(|ch| ch.is_alphanumeric())
                .collect::<String>()
        })
        .filter(|term| term.chars().count() >= 2)
        .map(|term| format!("{term}*"))
        .collect();
    if terms.is_empty() {
        None
    } else {
        Some(terms.join(" "))
    }
}

pub fn search_places(conn: &Connection, query: &str, limit: i64) -> Result<Vec<GeoSearchHit>> {
    let Some(match_query) = fts_match_query(query) else {
        return Ok(Vec::new());
    };
    let limit = limit.clamp(1, 20);
    ensure_geo_search(conn)?;

    let mut statement = conn.prepare(
        "SELECT kind, place_id
         FROM geo_search_fts
         WHERE geo_search_fts MATCH ?1
         LIMIT ?2",
    )?;
    let candidates = statement
        .query_map(params![match_query, MAX_SCAN_CANDIDATES], |row| {
            Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?))
        })?
        .collect::<Result<Vec<_>, _>>()?;

    let mut hits = Vec::new();
    for (kind, id) in candidates {
        if let Some(hit) = hydrate_hit(conn, &kind, id)? {
            hits.push(hit);
        }
    }

    hits.sort_by(|left, right| {
        left.cards
            .cmp(&right.cards)
            .reverse()
            .then_with(|| exactness(query, left).cmp(&exactness(query, right)))
            .then_with(|| left.name.to_lowercase().cmp(&right.name.to_lowercase()))
    });
    hits.truncate(limit as usize);
    Ok(hits)
}

fn exactness(query: &str, hit: &GeoSearchHit) -> u8 {
    let needle = query.trim().to_lowercase();
    let name = hit.name.to_lowercase();
    if name == needle {
        0
    } else if name.starts_with(&needle) {
        1
    } else {
        2
    }
}

fn hydrate_hit(conn: &Connection, kind: &str, id: i64) -> Result<Option<GeoSearchHit>> {
    match kind {
        "city" => conn
            .query_row(
                "SELECT city.name_ru,
                        country.name_ru,
                        (
                            SELECT COUNT(*)
                            FROM resources
                            WHERE city_id = city.id
                              AND moderation_status = 'approved'
                              AND is_active = 1
                        )
                 FROM geo_cities AS city
                 JOIN geo_countries AS country
                   ON country.id = city.country_id
                 WHERE city.id = ?1
                   AND city.is_active = 1
                   AND city.place_kind = 'city'
                   AND country.is_active = 1",
                [id],
                |row| {
                    Ok(GeoSearchHit {
                        kind: "city".into(),
                        id,
                        name: row.get(0)?,
                        subtitle: row.get(1)?,
                        href: format!("/app/map/city/{id}"),
                        cards: row.get(2)?,
                    })
                },
            )
            .optional(),
        "country" => conn
            .query_row(
                "SELECT country.name_ru,
                        continent.name_ru,
                        (
                            SELECT COUNT(*)
                            FROM resources AS resource
                            JOIN geo_cities AS city
                              ON city.id = resource.city_id
                            WHERE city.country_id = country.id
                              AND resource.moderation_status = 'approved'
                              AND resource.is_active = 1
                        )
                 FROM geo_countries AS country
                 JOIN geo_continents AS continent
                   ON continent.id = country.continent_id
                 WHERE country.id = ?1
                   AND country.is_active = 1
                   AND continent.is_active = 1",
                [id],
                |row| {
                    Ok(GeoSearchHit {
                        kind: "country".into(),
                        id,
                        name: row.get(0)?,
                        subtitle: row.get(1)?,
                        href: format!("/app/map/country/{id}"),
                        cards: row.get(2)?,
                    })
                },
            )
            .optional(),
        _ => Ok(None),
    }
}

pub fn explain_search_plan(conn: &Connection, query: &str) -> Result<Vec<String>> {
    let Some(match_query) = fts_match_query(query) else {
        return Ok(Vec::new());
    };
    ensure_geo_search(conn)?;
    let mut statement = conn.prepare(
        "EXPLAIN QUERY PLAN
         SELECT kind, place_id
         FROM geo_search_fts
         WHERE geo_search_fts MATCH ?1
         LIMIT 40",
    )?;
    let rows = statement.query_map(params![match_query], |row| row.get::<_, String>(3))?;
    rows.collect::<Result<Vec<_>, _>>()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::db::geography_v2::initialize_connection;

    fn test_db() -> Connection {
        let mut connection = Connection::open_in_memory().expect("memory");
        connection
            .execute_batch(
                r#"
                PRAGMA foreign_keys = ON;
                CREATE TABLE resources (
                    id INTEGER PRIMARY KEY,
                    continent_index INTEGER NOT NULL DEFAULT 0,
                    country_index INTEGER NOT NULL DEFAULT 0,
                    city_index INTEGER NOT NULL DEFAULT 0,
                    city_id INTEGER,
                    moderation_status TEXT NOT NULL DEFAULT 'pending',
                    is_active INTEGER NOT NULL DEFAULT 1
                );
                CREATE TABLE city_publication_targets (
                    id INTEGER PRIMARY KEY,
                    continent_index INTEGER NOT NULL DEFAULT 0,
                    country_index INTEGER NOT NULL DEFAULT 0,
                    city_index INTEGER NOT NULL DEFAULT 0,
                    city_name TEXT NOT NULL DEFAULT '',
                    target_name TEXT NOT NULL DEFAULT '',
                    telegram_chat_id INTEGER NOT NULL DEFAULT 0,
                    target_kind TEXT NOT NULL DEFAULT 'group',
                    is_active INTEGER NOT NULL DEFAULT 0
                );
                "#,
            )
            .expect("base");
        initialize_connection(&mut connection).expect("geography");
        ensure_geo_search(&connection).expect("fts");
        connection
    }

    #[test]
    fn empty_and_tiny_queries_do_not_scan() {
        assert_eq!(fts_match_query("  a  "), None);
        assert_eq!(fts_match_query(""), None);
        assert!(search_places(&test_db(), "x", 10).unwrap().is_empty());
    }

    #[test]
    fn unicode_query_finds_nice() {
        let hits = search_places(&test_db(), "Ницц", 10).expect("search");
        assert!(
            hits.iter()
                .any(|hit| hit.kind == "city" && hit.name == "Ницца"),
            "{hits:?}"
        );
        let ascii = search_places(&test_db(), "Nice", 10).expect("ascii");
        assert!(ascii.iter().any(|hit| hit.href.contains("/app/map/city/")));
    }

    #[test]
    fn rtl_native_name_is_searchable() {
        let connection = test_db();
        let country_id = connection
            .query_row(
                "SELECT id FROM geo_countries WHERE iso2 = 'SA' AND is_active = 1",
                [],
                |row| row.get::<_, i64>(0),
            )
            .expect("saudi arabia");
        connection
            .execute(
                "INSERT INTO geo_cities (
                    country_id, stable_key, name_ru, name_native, name_ascii,
                    is_active, place_kind
                 ) VALUES (?1, 'SA-RTL-TEST', 'Эр-Рияд', 'الرياض', 'Ar Riyad', 1, 'city')",
                [country_id],
            )
            .expect("insert rtl city");
        rebuild_geo_search(&connection).expect("rebuild");
        let hits = search_places(&connection, "الريا", 10).expect("rtl search");
        assert!(hits.iter().any(|hit| hit.name == "Эр-Рияд"), "{hits:?}");
    }

    #[test]
    fn fts_plan_uses_virtual_table() {
        let plan = explain_search_plan(&test_db(), "Paris").expect("plan");
        let joined = plan.join("\n").to_lowercase();
        assert!(
            joined.contains("virtual table") || joined.contains("geo_search_fts"),
            "{plan:?}"
        );
        assert!(!joined.contains("scan geo_cities"));
    }

    #[test]
    fn results_omit_user_and_admin_identifiers() {
        let hits = search_places(&test_db(), "Франц", 10).expect("search");
        let blob = format!("{hits:?}");
        assert!(!blob.contains("user_id"));
        assert!(!blob.contains("assignment"));
        assert!(!blob.contains("telegram"));
        assert!(hits.iter().any(|hit| hit.kind == "country"));
    }

    #[test]
    fn cities_with_listings_rank_first() {
        let connection = test_db();
        let nice_id = connection
            .query_row(
                "SELECT id FROM geo_cities WHERE stable_key = 'FR-NICE'",
                [],
                |row| row.get::<_, i64>(0),
            )
            .expect("nice");
        connection
            .execute(
                "INSERT INTO resources (city_id, moderation_status, is_active)
                 VALUES (?1, 'approved', 1)",
                [nice_id],
            )
            .expect("listing");
        let hits = search_places(&connection, "Nice", 10).expect("search");
        assert_eq!(hits[0].name, "Ницца");
    }
}
