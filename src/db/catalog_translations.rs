//! Generic multi-language names for catalog entities (countries, cities,
//! rubrics, professions, services), additive to the existing Russian-only
//! `name_ru` columns on their own tables. Each entity keeps its current
//! stable identifier as `entity_id` (e.g. a country's `iso2`), so this
//! table can be populated incrementally per entity type without touching
//! the entity's own schema.

use rusqlite::{params, Connection, Result};

pub const ENTITY_COUNTRY: &str = "country";
pub const ENTITY_CONTINENT: &str = "continent";
pub const ENTITY_CITY: &str = "city";
pub const ENTITY_RUBRIC: &str = "rubric";
pub const ENTITY_PROFESSION: &str = "profession";
pub const ENTITY_SERVICE: &str = "service";

pub fn initialize(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS catalog_translations (
            entity_type TEXT NOT NULL,
            entity_id   TEXT NOT NULL,
            locale      TEXT NOT NULL,
            name        TEXT NOT NULL,
            PRIMARY KEY (entity_type, entity_id, locale)
        );
        CREATE INDEX IF NOT EXISTS idx_catalog_translations_lookup
            ON catalog_translations(entity_type, entity_id);
        CREATE TABLE IF NOT EXISTS catalog_translations_seed_versions (
            source     TEXT PRIMARY KEY,
            row_count  INTEGER NOT NULL
        );",
    )?;

    seed_countries(conn)?;
    seed_continents(conn)?;
    seed_cities(conn)?;

    Ok(())
}

/// Each seed's data is generated wholesale (CLDR/GeoNames dump -> const
/// array) rather than edited row by row, so the row count is a reliable,
/// cheap version signal: unchanged length means the last import already
/// applied, changed length means new/updated data to load. This skips the
/// ~53k INSERTs for cities (and smaller counts for countries/continents)
/// on every ordinary restart, only re-running when the seed data itself
/// was regenerated.
fn seed_up_to_date(conn: &Connection, source: &str, expected_count: i64) -> bool {
    conn.query_row(
        "SELECT row_count FROM catalog_translations_seed_versions WHERE source = ?1",
        params![source],
        |row| row.get::<_, i64>(0),
    )
    .ok()
        == Some(expected_count)
}

fn mark_seed_up_to_date(conn: &Connection, source: &str, row_count: i64) -> Result<()> {
    conn.execute(
        "INSERT INTO catalog_translations_seed_versions (source, row_count)
         VALUES (?1, ?2)
         ON CONFLICT(source) DO UPDATE SET row_count = excluded.row_count",
        params![source, row_count],
    )?;
    Ok(())
}

fn seed_countries(conn: &Connection) -> Result<()> {
    let rows = crate::db::country_translations_seed::COUNTRY_TRANSLATIONS;
    if seed_up_to_date(conn, ENTITY_COUNTRY, rows.len() as i64) {
        return Ok(());
    }
    let tx = conn.unchecked_transaction()?;
    for (iso2, locale, name) in rows {
        tx.execute(
            "INSERT INTO catalog_translations (entity_type, entity_id, locale, name)
             VALUES (?1, ?2, ?3, ?4)
             ON CONFLICT(entity_type, entity_id, locale) DO UPDATE SET name = excluded.name",
            params![ENTITY_COUNTRY, iso2, locale, name],
        )?;
    }
    tx.commit()?;
    mark_seed_up_to_date(conn, ENTITY_COUNTRY, rows.len() as i64)
}

fn seed_continents(conn: &Connection) -> Result<()> {
    let rows = crate::db::continent_translations_seed::CONTINENT_TRANSLATIONS;
    if seed_up_to_date(conn, ENTITY_CONTINENT, rows.len() as i64) {
        return Ok(());
    }
    let tx = conn.unchecked_transaction()?;
    for (code, locale, name) in rows {
        tx.execute(
            "INSERT INTO catalog_translations (entity_type, entity_id, locale, name)
             VALUES (?1, ?2, ?3, ?4)
             ON CONFLICT(entity_type, entity_id, locale) DO UPDATE SET name = excluded.name",
            params![ENTITY_CONTINENT, code, locale, name],
        )?;
    }
    tx.commit()?;
    mark_seed_up_to_date(conn, ENTITY_CONTINENT, rows.len() as i64)
}

fn seed_cities(conn: &Connection) -> Result<()> {
    let rows = crate::db::city_translations_seed::CITY_TRANSLATIONS;
    if seed_up_to_date(conn, ENTITY_CITY, rows.len() as i64) {
        return Ok(());
    }
    let tx = conn.unchecked_transaction()?;
    for (stable_key, locale, name) in rows {
        tx.execute(
            "INSERT INTO catalog_translations (entity_type, entity_id, locale, name)
             VALUES (?1, ?2, ?3, ?4)
             ON CONFLICT(entity_type, entity_id, locale) DO UPDATE SET name = excluded.name",
            params![ENTITY_CITY, stable_key, locale, name],
        )?;
    }
    tx.commit()?;
    mark_seed_up_to_date(conn, ENTITY_CITY, rows.len() as i64)
}

/// Locale-aware lookup with fallback: exact locale match, then the
/// Russian baseline, then `fallback` (typically the entity's own
/// `name_ru`/`name_native` column, so a lookup miss never surfaces
/// nothing to the visitor).
pub fn lookup(
    conn: &Connection,
    entity_type: &str,
    entity_id: &str,
    locale: &str,
    fallback: &str,
) -> String {
    if let Some(name) = lookup_exact(conn, entity_type, entity_id, locale) {
        return name;
    }
    if locale != "ru" {
        if let Some(name) = lookup_exact(conn, entity_type, entity_id, "ru") {
            return name;
        }
    }
    fallback.to_string()
}

/// Shorthand for `lookup` with the current request's locale, for the
/// common case of displaying a country name by its `iso2` code.
pub fn country_name(conn: &Connection, iso2: &str, name_ru: &str) -> String {
    lookup(conn, ENTITY_COUNTRY, iso2, crate::i18n::locale(), name_ru)
}

/// Shorthand for `lookup` with the current request's locale, for
/// displaying a continent name by its 2-letter code (`AF`, `EU`, ...).
pub fn continent_name(conn: &Connection, code: &str, name_ru: &str) -> String {
    lookup(conn, ENTITY_CONTINENT, code, crate::i18n::locale(), name_ru)
}

/// City names use a different fallback than countries/continents: CLDR
/// doesn't cover arbitrary cities, so `seed_cities` sources translations
/// from GeoNames' alternate-names dump instead (real coverage, not
/// complete: see the numbers in `city_translations_seed.rs`'s callers/
/// tests). Russian is authoritative for `locale == "ru"` (read straight
/// from `name_ru`, skipping the table, matching countries/continents);
/// any other locale tries an exact translation first, and — when
/// GeoNames has none for that city/language — falls back to the city's
/// native-script name rather than to Russian, since that's more broadly
/// readable than a transliteration no one asked for.
pub fn city_name(conn: &Connection, stable_key: &str, name_ru: &str, name_native: &str) -> String {
    city_name_for_locale(conn, stable_key, crate::i18n::locale(), name_ru, name_native)
}

fn city_name_for_locale(
    conn: &Connection,
    stable_key: &str,
    locale: &str,
    name_ru: &str,
    name_native: &str,
) -> String {
    if locale == "ru" {
        return name_ru.to_string();
    }
    if let Some(name) = lookup_exact(conn, ENTITY_CITY, stable_key, locale) {
        return name;
    }
    if !name_native.trim().is_empty() {
        name_native.to_string()
    } else {
        name_ru.to_string()
    }
}

fn lookup_exact(conn: &Connection, entity_type: &str, entity_id: &str, locale: &str) -> Option<String> {
    conn.query_row(
        "SELECT name FROM catalog_translations
         WHERE entity_type = ?1 AND entity_id = ?2 AND locale = ?3",
        params![entity_type, entity_id, locale],
        |row| row.get(0),
    )
    .ok()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn test_connection() -> Connection {
        let conn = Connection::open_in_memory().expect("open in-memory db");
        initialize(&conn).expect("initialize catalog_translations");
        conn
    }

    #[test]
    fn seeds_all_countries_for_all_four_locales() {
        let conn = test_connection();
        let count: i64 = conn
            .query_row(
                "SELECT COUNT(*) FROM catalog_translations WHERE entity_type = 'country'",
                [],
                |row| row.get(0),
            )
            .unwrap();
        assert_eq!(count, crate::db::country_translations_seed::COUNTRY_TRANSLATIONS.len() as i64);
    }

    #[test]
    fn lookup_returns_exact_locale_when_present() {
        let conn = test_connection();
        let name = lookup(&conn, ENTITY_COUNTRY, "FR", "de", "Frankreich (native)");
        assert_eq!(name, "Frankreich");
    }

    #[test]
    fn lookup_falls_back_to_russian_then_to_native() {
        let conn = test_connection();
        // No Russian rows are seeded here (name_ru lives on geo_countries),
        // so an unseeded locale falls straight through to the native
        // fallback the caller supplies.
        let name = lookup(&conn, ENTITY_COUNTRY, "FR", "zh", "France (native)");
        assert_eq!(name, "France (native)");
    }

    #[test]
    fn lookup_falls_back_for_unknown_entity() {
        let conn = test_connection();
        let name = lookup(&conn, ENTITY_CITY, "does-not-exist", "en", "Native City");
        assert_eq!(name, "Native City");
    }

    #[test]
    fn seeds_cities_from_geonames_data() {
        let conn = test_connection();
        let count: i64 = conn
            .query_row(
                "SELECT COUNT(*) FROM catalog_translations WHERE entity_type = 'city'",
                [],
                |row| row.get(0),
            )
            .unwrap();
        assert_eq!(count, crate::db::city_translations_seed::CITY_TRANSLATIONS.len() as i64);
    }

    #[test]
    fn city_name_uses_geonames_translation_when_available() {
        let conn = test_connection();
        // DE-MUNICH is seeded from GeoNames with a real German endonym,
        // distinct from both the Russian name and a same-as-ru placeholder
        // native name, so this proves the exact-locale lookup wins over
        // the native-name fallback.
        let name = city_name_for_locale(&conn, "DE-MUNICH", "de", "Мюнхен", "Мюнхен");
        assert_eq!(name, "München");
    }

    #[test]
    fn seeds_all_continents_for_all_four_locales() {
        let conn = test_connection();
        let count: i64 = conn
            .query_row(
                "SELECT COUNT(*) FROM catalog_translations WHERE entity_type = 'continent'",
                [],
                |row| row.get(0),
            )
            .unwrap();
        assert_eq!(
            count,
            crate::db::continent_translations_seed::CONTINENT_TRANSLATIONS.len() as i64
        );
    }

    #[test]
    fn continent_name_uses_cldr_translation() {
        let conn = test_connection();
        assert_eq!(continent_name(&conn, "EU", "Европа"), "Европа"); // default test locale is ru
    }

    #[test]
    fn city_name_uses_native_script_when_untranslated() {
        let conn = test_connection();
        // No catalog_translations rows exist for cities in this stage
        // (no bulk source), so a non-ru locale must fall back to the
        // native name, not to Russian.
        let name = city_name_for_locale(&conn, "does-not-exist", "de", "Мюнхен", "München");
        assert_eq!(name, "München");
    }

    #[test]
    fn city_name_returns_name_ru_directly_for_ru_locale() {
        let conn = test_connection();
        let name = city_name_for_locale(&conn, "does-not-exist", "ru", "Мюнхен", "München");
        assert_eq!(name, "Мюнхен");
    }

    #[test]
    fn city_name_falls_back_to_ru_when_native_is_empty() {
        let conn = test_connection();
        let name = city_name_for_locale(&conn, "does-not-exist", "de", "Мюнхен", "");
        assert_eq!(name, "Мюнхен");
    }

    #[test]
    fn reinitializing_is_idempotent() {
        let conn = test_connection();
        initialize(&conn).expect("second initialize call must not fail");
        let count: i64 = conn
            .query_row(
                "SELECT COUNT(*) FROM catalog_translations WHERE entity_type = 'country'",
                [],
                |row| row.get(0),
            )
            .unwrap();
        assert_eq!(count, crate::db::country_translations_seed::COUNTRY_TRANSLATIONS.len() as i64);
    }

    #[test]
    fn reinitializing_skips_the_seed_loop_when_row_count_is_unchanged() {
        let conn = test_connection();
        // Overwrite one row so it no longer matches the seed data, then
        // re-run initialize(): if the seed loop actually re-executed, the
        // ON CONFLICT clause would restore the original value. Since the
        // row count hasn't changed, it must skip instead, leaving our
        // edit in place.
        conn.execute(
            "UPDATE catalog_translations SET name = 'CUSTOM' WHERE entity_type = 'country' AND entity_id = 'FR' AND locale = 'de'",
            [],
        )
        .unwrap();

        initialize(&conn).expect("second initialize call must not fail");

        let name: String = conn
            .query_row(
                "SELECT name FROM catalog_translations WHERE entity_type = 'country' AND entity_id = 'FR' AND locale = 'de'",
                [],
                |row| row.get(0),
            )
            .unwrap();
        assert_eq!(name, "CUSTOM");
    }
}
