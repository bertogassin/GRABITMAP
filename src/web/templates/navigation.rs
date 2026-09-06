use super::common::{
    back_navigation_card, bottom_nav, empty_state_action, empty_state_card_with_actions,
    escape_html, guest_mode_hint, icon, is_generic_profession_key, ru_count, ru_plural,
    intent_kind_chips, kind_chip, navigation_card, page_document, page_shell, premium_badge_html,
    profession_label, resource_listing_label, resource_result_card, search_form_hero,
    search_people_cards, section_head, simple_hero, static_asset, topbar, verified_badge_html,
};
use crate::geography::world;
use std::collections::BTreeMap;

fn search_page_href(q: &str, kind: &str, rubric: Option<&str>, city_id: Option<i64>) -> String {
    let mut href = String::from("/app/search?");
    let mut parts = Vec::new();
    if !q.trim().is_empty() {
        parts.push(format!("q={}", urlencoding::encode(q.trim())));
    }
    if !kind.trim().is_empty() {
        parts.push(format!("kind={}", urlencoding::encode(kind.trim())));
    }
    if let Some(rubric) = rubric.filter(|value| !value.is_empty()) {
        parts.push(format!("rubric={}", urlencoding::encode(rubric)));
    }
    if let Some(city_id) = city_id.filter(|value| *value > 0) {
        parts.push(format!("city_id={city_id}"));
    }
    href.push_str(&parts.join("&"));
    if href.ends_with('?') {
        href.pop();
    }
    href
}

fn search_rubric_chips(
    q: &str,
    kind: &str,
    active: Option<&crate::catalog::Rubric>,
    city_id: Option<i64>,
) -> String {
    let filter_kind = match kind {
        "business" => Some(crate::catalog::RubricKind::Business),
        "work" | "workers" => Some(crate::catalog::RubricKind::Work),
        _ => active.map(|rubric| rubric.kind),
    };
    let Some(filter_kind) = filter_kind else {
        return String::new();
    };

    let mut chips = String::from(r#"<nav class="rm-kind-chips" aria-label="Рубрика">"#);
    chips.push_str(&kind_chip(
        active.is_none(),
        &search_page_href(q, kind, None, city_id),
        "Все",
    ));
    for rubric in crate::catalog::by_kind(filter_kind) {
        chips.push_str(&kind_chip(
            active.is_some_and(|item| item.id == rubric.id),
            &search_page_href(q, kind, Some(rubric.id), city_id),
            rubric.label,
        ));
    }
    chips.push_str("</nav>");
    chips
}

fn is_intent_category(key: &str) -> bool {
    matches!(
        key.trim().to_ascii_lowercase().as_str(),
        "work" | "job" | "jobs" | "business" | "services" | "service" | "community"
    )
}

fn json_string_literal(value: &str) -> String {
    let mut out = String::from('"');

    for ch in value.chars() {
        match ch {
            '\\' => out.push_str("\\\\"),
            '"' => out.push_str("\\\""),
            '\n' => out.push_str("\\n"),
            '\r' => out.push_str("\\r"),
            '\t' => out.push_str("\\t"),
            c if c.is_control() => {}
            c => out.push(c),
        }
    }

    out.push('"');
    out
}

fn push_explore_entry(
    parts: &mut Vec<String>,
    kind: &str,
    label: &str,
    subtitle: &str,
    href: &str,
) {
    parts.push(format!(
        "{{\"k\":{},\"l\":{},\"s\":{},\"h\":{},\"q\":{}}}",
        json_string_literal(kind),
        json_string_literal(label),
        json_string_literal(subtitle),
        json_string_literal(href),
        json_string_literal(label),
    ));
}

fn build_home_explore_index(
    resource_categories: &[(String, i64)],
    people_categories: &[(String, i64)],
) -> String {
    let mut parts = Vec::new();
    let world_data = world();

    for (ci, (continent, countries)) in world_data.iter().enumerate() {
        push_explore_entry(
            &mut parts,
            "continent",
            continent,
            &crate::i18n::t("map_continent"),
            &format!("/app/{ci}"),
        );

        for (si, (country, cities)) in countries.iter().enumerate() {
            push_explore_entry(
                &mut parts,
                "country",
                country,
                &crate::i18n::tf("map_country_dot", &[("continent", continent)]),
                &format!("/app/{ci}/{si}"),
            );

            for (zi, city) in cities.iter().enumerate() {
                push_explore_entry(
                    &mut parts,
                    "city",
                    city,
                    &crate::i18n::tf("map_city_dot", &[("country", country)]),
                    &format!("/app/{ci}/{si}/{zi}"),
                );
            }
        }
    }

    let mut counts: BTreeMap<String, i64> = BTreeMap::new();
    for (category, count) in resource_categories.iter().chain(people_categories.iter()) {
        let key = crate::catalog::resolve(category)
            .map(|rubric| rubric.id.to_string())
            .unwrap_or_else(|| category.trim().to_string());

        if key.is_empty() || is_intent_category(&key) {
            continue;
        }

        *counts.entry(key).or_insert(0) += count;
    }

    push_explore_entry(
        &mut parts,
        "work",
        "Работа",
        "Вакансии и предложения работы",
        "/app/search?kind=work",
    );
    push_explore_entry(
        &mut parts,
        "workers",
        "Работники",
        "Профессии и объявления тех, кто ищет работу",
        "/app/search?kind=workers",
    );
    push_explore_entry(
        &mut parts,
        "business",
        "Бизнес",
        "Компании и предложения",
        "/app/search?kind=business",
    );

    for rubric in crate::catalog::all() {
        let count = counts.get(rubric.id).copied().unwrap_or(0);
        let subtitle = match rubric.kind {
            crate::catalog::RubricKind::Work => {
                if count > 0 {
                    format!("Работа · {count}")
                } else {
                    "Работа и работники".to_string()
                }
            }
            crate::catalog::RubricKind::Business => {
                if count > 0 {
                    format!("Бизнес · {count}")
                } else {
                    "Бизнес".to_string()
                }
            }
        };
        let href = format!("/app/search?rubric={}", urlencoding::encode(rubric.id));

        parts.push(format!(
            "{{\"k\":{},\"l\":{},\"s\":{},\"h\":{},\"q\":{}}}",
            json_string_literal("profession"),
            json_string_literal(rubric.label),
            json_string_literal(&subtitle),
            json_string_literal(&href),
            json_string_literal(&format!("{} {}", rubric.label, rubric.aliases.join(" "))),
        ));
    }

    format!("[{}]", parts.join(","))
}

// ============================================================
// LUCIDE SVG
// ============================================================

pub fn render_geo_root(
    users_count: i64,
    online_count: i64,
    resources_count: i64,
    continents: Vec<(i64, String, i64)>,
    guest_mode: bool,
) -> String {
    let cards = continents
        .iter()
        .map(|(id, name, countries)| {
            navigation_card(
                &format!("/app/map/continent/{id}"),
                "globe",
                name,
                &if crate::i18n::locale() == "ru" {
                    ru_count(*countries, "страна", "страны", "стран")
                } else {
                    crate::i18n::tf(
                        "map_n_countries",
                        &[("n", &countries.to_string())],
                    )
                },
            )
        })
        .collect::<Vec<_>>()
        .join("");
    let guest_hint = if guest_mode {
        guest_mode_hint("/app")
    } else {
        String::new()
    };
    let users_word = if crate::i18n::locale() == "ru" {
        ru_plural(users_count, "участник", "участника", "участников").to_string()
    } else {
        crate::i18n::t("map_stat_members")
    };
    let resources_word = if crate::i18n::locale() == "ru" {
        ru_plural(
            resources_count,
            "объявление",
            "объявления",
            "объявлений",
        )
        .to_string()
    } else {
        crate::i18n::t("map_stat_listings")
    };
    let online_label = crate::i18n::t("common_online_short");
    let hero = format!(
        r#"<section class="hero rm-map-hero">
    <div class="eyebrow">{logo} GRABIT</div>
    <h1>{map_global_title}</h1>
    <p>{map_global_lead}</p>
    <button id="resursmap-install-pwa"
            type="button"
            class="ui-button rm-pwa-home-btn">
        {map_download_app}
    </button>
    {guest_hint}
    <div class="rm-map-stats">
        <div><strong>{users_count}</strong><span>{users_word}</span></div>
        <div><strong>{online_count}</strong><span>{online_label}</span></div>
        <div><strong>{resources_count}</strong><span>{resources_word}</span></div>
    </div>
</section>"#,
        logo = icon("globe"),
        map_global_title = crate::i18n::t("map_global_title"),
        map_global_lead = crate::i18n::t("map_global_lead"),
        map_download_app = crate::i18n::t("map_download_app"),
    );
    let content = format!(
        r#"<div id="rm-last-city-home" class="grid rm-continue-home" hidden></div>{head}<div class="grid rm-map-grid">{cards}</div>"#,
        head = section_head(
            &crate::i18n::t("map_continents"),
            &crate::i18n::t("map_regions_lead"),
            None,
        ),
    );
    let styles = r#"<style>
.rm-map-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:20px}
.rm-map-stats div{padding:12px 6px;border:1px solid rgba(232,204,150,.22);border-radius:15px;text-align:center;background:rgba(255,255,255,.025)}
.rm-map-stats strong,.rm-map-stats span{display:block}.rm-map-stats strong{color:var(--gold-light);font-size:21px}.rm-map-stats span{margin-top:4px;color:var(--muted);font-size:9px;text-transform:uppercase}
.rm-map-grid{align-items:stretch}
.rm-continue-home{margin-bottom:14px}
.rm-continue-chips{margin-top:10px}
.rm-continue-card{padding:16px;display:grid;gap:10px}
</style>"#;
    page_document(
        &format!("GRABIT · {}", crate::i18n::t("map_global_title")),
        styles,
        "",
        &format!(
            "{}{}{}",
            topbar(&crate::i18n::t("map_title"), "globe"),
            hero,
            content
        ),
        &bottom_nav("map"),
        "",
    )
}

pub fn render_geo_continent(
    _continent_id: i64,
    name: &str,
    countries: Vec<(i64, String, i64)>,
) -> String {
    let cards = countries
        .iter()
        .map(|(id, country, cities)| {
            navigation_card(
                &format!("/app/map/country/{id}"),
                "building",
                country,
                &if crate::i18n::locale() == "ru" {
                    ru_count(*cities, "город", "города", "городов")
                } else {
                    crate::i18n::tf("map_n_cities", &[("n", &cities.to_string())])
                },
            )
        })
        .collect::<Vec<_>>()
        .join("");
    let country_search = format!(
        r#"<div class="search rm-catalog-search"><span aria-hidden="true">{icon}</span><input id="rm-map-country-search" type="search" autocomplete="off" placeholder="{placeholder}"><button id="rm-map-country-clear" type="button" aria-label="{clear}">×</button></div>"#,
        icon = icon("search"),
        placeholder = crate::i18n::t("map_find_country"),
        clear = crate::i18n::t("map_clear_search"),
    );
    let countries_caption = if crate::i18n::locale() == "ru" {
        ru_count(countries.len() as i64, "страна", "страны", "стран")
    } else {
        crate::i18n::tf(
            "map_n_countries",
            &[("n", &countries.len().to_string())],
        )
    };
    let content = format!(
        r#"{back}{head}{search}<div class="grid" id="rm-map-country-grid">{cards}</div><div class="rm-catalog-search-status" id="rm-map-country-status" aria-live="polite"></div><script src="{script}" defer></script>"#,
        back = back_navigation_card(
            "/app",
            &crate::i18n::t("map_all_continents"),
            &crate::i18n::t("map_back_to_map"),
        ),
        head = section_head(
            &crate::i18n::t("map_countries"),
            &countries_caption,
            Some(22)
        ),
        search = country_search,
        script = static_asset("map-countries.js"),
    );
    page_shell(
        name,
        &topbar(&crate::i18n::t("map_title"), "globe"),
        &simple_hero(
            "globe",
            &crate::i18n::t("map_continent"),
            name,
            &crate::i18n::t("map_pick_country"),
        ),
        &content,
        &bottom_nav("map"),
    )
}

pub fn render_geo_country(
    country_id: i64,
    country: &str,
    continent_id: i64,
    continent: &str,
    cities: Vec<(i64, String)>,
    total: i64,
) -> String {
    let cards = cities
        .iter()
        .map(|(id, city)| navigation_card(&format!("/app/map/city/{id}"), "map-pin", city, country))
        .collect::<Vec<_>>()
        .join("");
    let more = if cities.len() < total as usize {
        format!(
            r#"<button type="button" class="ui-button rm-map-more" id="rm-map-more" data-country-id="{country_id}" data-offset="{}">{}</button>"#,
            cities.len(),
            crate::i18n::t("map_more_cities"),
        )
    } else {
        String::new()
    };
    let city_search = format!(
        r#"<div class="search rm-catalog-search"><span aria-hidden="true">{icon}</span><input id="rm-map-city-search" type="search" autocomplete="off" placeholder="{placeholder}" data-country-id="{country_id}"><button id="rm-map-city-clear" type="button" aria-label="{clear}">×</button></div>"#,
        icon = icon("search"),
        placeholder = crate::i18n::t("map_find_city"),
        clear = crate::i18n::t("map_clear_search"),
    );
    let cities_caption = if crate::i18n::locale() == "ru" {
        ru_count(total, "город", "города", "городов")
    } else {
        crate::i18n::tf("map_n_cities", &[("n", &total.to_string())])
    };
    let content = format!(
        r#"{back}{head}{search}<div class="grid" id="rm-map-city-grid">{cards}</div>{more}<div class="rm-catalog-search-status" id="rm-map-city-status" aria-live="polite"></div><script src="{script}" defer></script>"#,
        back = back_navigation_card(
            &format!("/app/map/continent/{continent_id}"),
            continent,
            &crate::i18n::t("map_back_to_countries"),
        ),
        head = section_head(
            &crate::i18n::t("map_cities"),
            &cities_caption,
            Some(22)
        ),
        search = city_search,
        script = static_asset("map-cities.js"),
    );
    page_shell(
        country,
        &topbar(&crate::i18n::t("map_title"), "globe"),
        &simple_hero(
            "building",
            continent,
            country,
            &crate::i18n::t("map_city_pick_lead"),
        ),
        &content,
        &bottom_nav("map"),
    )
}

pub fn render_geo_city(
    city_id: i64,
    city: &str,
    country_id: i64,
    country: &str,
    _continent_id: i64,
    continent: &str,
    sectors: Vec<(String, String, i64)>,
) -> String {
    let category = |title: &str, subtitle: &str, query: &str, icon_name: &str| {
        navigation_card(
            &format!(
                "/app/search?city_id={city_id}&q={}",
                urlencoding::encode(query)
            ),
            icon_name,
            title,
            subtitle,
        )
    };
    let sector_cards = sectors
        .iter()
        .map(|(key, name, count)| {
            navigation_card(
                &format!(
                    "/app/map/city/{city_id}/sector/{}",
                    urlencoding::encode(key)
                ),
                "briefcase",
                name,
                &ru_count(*count, "профессия", "профессии", "профессий"),
            )
        })
        .collect::<Vec<_>>()
        .join("");
    let catalog_search = format!(
        r#"<div class="search rm-catalog-search"><span aria-hidden="true">{icon}</span><input id="rm-city-catalog-search" type="search" autocomplete="off" placeholder="{placeholder}" data-city-id="{city_id}"><button id="rm-city-catalog-clear" type="button" aria-label="{clear}">×</button></div>"#,
        icon = icon("search"),
        placeholder = crate::i18n::t("map_find_in_city"),
        clear = crate::i18n::t("map_clear_search"),
    );
    let content = format!(
        r#"{back}{search}{search_status}{section_head}{add}<div class="grid" id="rm-city-category-grid">{work}{services}{business}{housing}{transport}{education}{help}{other}</div>{profession_head}<div class="grid" id="rm-city-sector-grid">{sector_cards}</div><div class="grid" id="rm-city-profession-results"></div><script src="{catalog_script}" defer></script>"#,
        back = back_navigation_card(
            &format!("/app/map/country/{country_id}"),
            country,
            &crate::i18n::t("map_back_to_cities"),
        ),
        search = catalog_search,
        search_status = r#"<div class="rm-catalog-search-status" id="rm-city-catalog-status" aria-live="polite"></div>"#,
        add = format!(
            r#"<div class="rm-city-add">{action}</div>"#,
            action = empty_state_action(
                &format!("/app/add/city/{city_id}"),
                &crate::i18n::t("menu_add_card"),
            ),
        ),
        section_head = section_head(
            &crate::i18n::t("map_need_title"),
            &crate::i18n::t("map_need_lead"),
            Some(22)
        ),
        work = category("Работа", "Вакансии и поиск работы", "работа", "briefcase"),
        services = category(
            "Услуги",
            "Ищу специалиста или предлагаю услугу",
            "услуги",
            "user"
        ),
        business = category(
            "Бизнес",
            "Компании, партнёры и сотрудничество",
            "бизнес",
            "building"
        ),
        housing = category(
            "Жильё",
            "Сниму, сдам, куплю или продам",
            "жильё",
            "building"
        ),
        transport = category(
            "Транспорт",
            "Куплю, продам, аренда и перевозки",
            "транспорт",
            "map"
        ),
        education = category(
            "Обучение",
            "Курсы, преподаватели и ученики",
            "обучение",
            "briefcase"
        ),
        help = category("Помощь", "Нужна помощь или могу помочь", "помощь", "heart"),
        other = category(
            "Другое",
            "Остальные предложения и запросы",
            "другое",
            "menu"
        ),
        profession_head = section_head(
            &crate::i18n::t("map_professions"),
            &crate::i18n::t("map_professions_lead"),
            Some(28)
        ),
        catalog_script = static_asset("map-catalog-search.js"),
    );
    page_shell(
        city,
        &topbar(&crate::i18n::t("map_title"), "globe"),
        &simple_hero(
            "map-pin",
            &format!("{continent} · {country}"),
            city,
            &crate::i18n::t("map_city_all_directions"),
        ),
        &content,
        &bottom_nav("map"),
    )
}

pub fn render_geo_professions(
    city_id: i64,
    city: &str,
    country: &str,
    sector: &str,
    professions: Vec<(String, String)>,
) -> String {
    let cards = professions
        .iter()
        .map(|(_, profession)| {
            navigation_card(
                &format!(
                    "/app/search?city_id={city_id}&q={}",
                    urlencoding::encode(profession)
                ),
                "user",
                profession,
                &crate::i18n::t("map_seek_or_offer"),
            )
        })
        .collect::<Vec<_>>()
        .join("");
    let content = format!(
        r#"{back}{head}<div class="grid">{cards}</div>"#,
        back = back_navigation_card(
            &format!("/app/map/city/{city_id}"),
            city,
            &crate::i18n::t("map_back_to_sections"),
        ),
        head = section_head(
            &crate::i18n::t("map_professions"),
            &if crate::i18n::locale() == "ru" {
                ru_count(
                    professions.len() as i64,
                    "профессия",
                    "профессии",
                    "профессий",
                )
            } else {
                crate::i18n::tf(
                    "map_n_professions",
                    &[("n", &professions.len().to_string())],
                )
            },
            Some(22)
        ),
    );
    page_shell(
        sector,
        &topbar(&crate::i18n::t("map_title"), "globe"),
        &simple_hero(
            "briefcase",
            country,
            sector,
            &crate::i18n::t("map_pick_profession"),
        ),
        &content,
        &bottom_nav("map"),
    )
}

pub fn render_continents(
    users_count: i64,
    online_count: i64,
    resources_count: i64,
    _categories: Vec<(String, i64)>,
    people_by_category: Vec<(String, i64)>,
    guest_mode: bool,
) -> String {
    let w = world();
    let mut cards = String::new();

    for (ci, (continent, countries)) in w.iter().enumerate() {
        for (si, country) in countries.keys().enumerate() {
            cards.push_str(&navigation_card(
                &format!("/app/{}/{}", ci, si),
                "building",
                country,
                &crate::i18n::tf(
                    "map_country_dot",
                    &[("continent", continent)],
                ),
            ));
        }
    }

    let section_head_countries = section_head(
        &crate::i18n::t("map_countries"),
        &crate::i18n::t("map_pick_country"),
        None,
    );

    let head_extra = r####"<style id="resursmap-home-layout-v1">
    .rm-home-section {
        margin-top:18px;
    }

    .rm-guest-hint {
        margin-top:12px;
        padding:10px 12px;
        border-radius:14px;
        border:1px solid rgba(224,196,138,.24);
        background:linear-gradient(135deg, rgba(224,196,138,.10), rgba(114,196,212,.06));
        color:var(--muted);
        font-size:13px;
        line-height:1.5;
        box-shadow:0 0 24px rgba(224,196,138,.06);
    }

    .rm-stats-row {
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:10px;
        margin-top:22px;
        position:relative;
        z-index:2;
    }

    .rm-stat {
        min-width:0;
        padding:14px 10px;
        border-radius:16px;
        border:1px solid rgba(232,204,150,.24);
        background:
            linear-gradient(145deg, rgba(232,204,150,.12), rgba(126,212,228,.06));
        box-shadow:
            inset 0 1px 0 rgba(255,255,255,.07),
            0 10px 28px rgba(0,0,0,.20);
        text-align:center;
    }

    .rm-stat strong {
        display:block;
        font-size:clamp(18px,4vw,24px);
        font-weight:850;
        letter-spacing:-.03em;
        color:var(--gold-light);
        line-height:1;
    }

    .rm-stat-online strong {
        color:var(--success);
        text-shadow:0 0 20px rgba(111,232,184,.35);
    }

    .rm-stat span {
        display:block;
        margin-top:6px;
        color:var(--muted);
        font-size:10px;
        font-weight:700;
        letter-spacing:.04em;
        text-transform:uppercase;
    }

    .rm-home-explorer {
        margin-top:20px;
        padding:16px 16px 14px;
        border:1px solid rgba(232,204,150,.28);
        background:
            radial-gradient(circle at 100% 0%, rgba(126,212,228,.10), transparent 42%),
            radial-gradient(circle at 0% 100%, rgba(232,204,150,.08), transparent 40%),
            rgba(255,255,255,.02);
        box-shadow:
            0 18px 44px rgba(0,0,0,.24),
            inset 0 1px 0 rgba(255,255,255,.06);
    }

    .rm-home-explorer-head {
        margin-bottom:12px;
    }

    .rm-home-explorer-title {
        font-size:16px;
        line-height:1.25;
    }

    .rm-home-explorer-copy {
        margin-top:4px;
        color:var(--muted);
        font-size:12px;
        line-height:1.45;
    }

    .rm-home-explorer-field {
        display:grid;
        grid-template-columns:auto 1fr auto;
        align-items:center;
        gap:10px;
        padding:4px 4px 4px 14px;
        border-radius:16px;
        border:1px solid rgba(232,204,150,.32);
        background:rgba(0,0,0,.18);
        transition:
            border-color .18s ease,
            box-shadow .18s ease;
    }

    .rm-home-explorer-field:focus-within {
        border-color:rgba(232,204,150,.55);
        box-shadow:0 0 0 4px rgba(232,204,150,.10);
    }

    .rm-home-explorer-icon {
        color:var(--gold-light);
        font-size:16px;
        line-height:1;
    }

    .rm-home-explorer-input {
        width:100%;
        min-height:44px;
        border:0;
        outline:none;
        background:transparent;
        color:var(--text);
        font:inherit;
        font-size:15px;
    }

    .rm-home-explorer-input::placeholder {
        color:var(--muted);
    }

    .rm-home-explorer-clear {
        width:36px;
        height:36px;
        border:0;
        border-radius:12px;
        background:rgba(255,255,255,.06);
        color:var(--muted);
        font-size:18px;
        cursor:pointer;
    }

    .rm-home-explorer-results {
        display:grid;
        gap:8px;
        margin-top:10px;
        max-height:min(52vh, 420px);
        overflow:auto;
    }

    .rm-explore-hit {
        display:grid;
        grid-template-columns:auto 1fr;
        gap:12px;
        align-items:center;
        padding:11px 12px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,.06);
        background:rgba(255,255,255,.03);
        text-decoration:none;
        color:inherit;
        transition:
            transform .16s ease,
            border-color .16s ease,
            background .16s ease;
    }

    .rm-explore-hit:hover,
    .rm-explore-hit.is-active {
        transform:translateY(-1px);
        border-color:rgba(232,204,150,.34);
        background:rgba(232,204,150,.08);
    }

    .rm-explore-hit-icon {
        width:34px;
        height:34px;
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius:11px;
        background:rgba(232,204,150,.10);
        font-size:16px;
    }

    .rm-explore-hit-body strong {
        display:block;
        font-size:14px;
        line-height:1.25;
    }

    .rm-explore-hit-body small {
        display:block;
        margin-top:2px;
        color:var(--muted);
        font-size:11px;
        line-height:1.35;
    }

    .rm-explore-empty {
        padding:12px;
        border-radius:12px;
        color:var(--muted);
        font-size:13px;
        text-align:center;
    }

    .rm-home-explorer .rm-kind-chips {
        margin:12px 0 0;
    }

    @media (min-width: 860px) {
        main.page {
            max-width:1180px;
        }
    }

    @media (max-width: 620px) {
        .rm-stats-row {
            grid-template-columns:repeat(3,minmax(0,1fr));
            gap:8px;
        }

        .rm-stat {
            padding:12px 6px;
        }

        .rm-stat span {
            font-size:9px;
        }
    }

    html.light-theme .rm-stat,
    body.light-theme .rm-stat {
        background:#fff;
        box-shadow:0 8px 20px rgba(26,29,33,.06);
    }

    html.light-theme .rm-home-explorer,
    body.light-theme .rm-home-explorer {
        background:#fff;
    }

    html.light-theme .rm-home-explorer-clear,
    body.light-theme .rm-home-explorer-clear {
        background:rgba(26,29,33,.06);
        color:var(--text);
    }

    html.light-theme .rm-explore-hit,
    body.light-theme .rm-explore-hit {
        background:#fff;
        border-color:rgba(26,29,33,.10);
    }

    html.light-theme .rm-guest-hint,
    body.light-theme .rm-guest-hint {
        background:rgba(165,118,31,.08);
        border-color:rgba(165,118,31,.22);
    }
</style>"####;

    let body_before_main = r####""####;

    let guest_hint = if guest_mode {
        guest_mode_hint("/app")
    } else {
        String::new()
    };

    let explore_index = build_home_explore_index(&_categories, &people_by_category);

    let hero = format!(
        r#"<section class="hero">
    <div class="eyebrow">
        {globe_icon}
        GRABIT
    </div>

    <h1>{map_cities_professions}</h1>

    <p>{map_home_lead}</p>

    <button id="resursmap-install-pwa"
            type="button"
            class="ui-button rm-pwa-home-btn">
        {map_download_app}
    </button>

    {guest_hint}

    <section class="rm-home-explorer card" id="rm-home-explorer">
        <div class="rm-home-explorer-head">
            <div class="card-title rm-home-explorer-title">
                {search_title}
            </div>
            <div class="card-meta rm-home-explorer-copy">
                {map_explorer_copy}
            </div>
        </div>

        <div class="rm-home-explorer-field">
            <span class="rm-home-explorer-icon" aria-hidden="true">⌕</span>
            <input id="rm-home-explorer-input"
                   class="rm-home-explorer-input"
                   type="search"
                   inputmode="search"
                   autocomplete="off"
                   autocapitalize="off"
                   spellcheck="false"
                   placeholder="{map_explorer_placeholder}"
                   aria-label="{map_explorer_aria}">
            <button id="rm-home-explorer-clear"
                    class="rm-home-explorer-clear"
                    type="button"
                    hidden
                    aria-label="{common_clear}">×</button>
        </div>

        <div id="rm-home-explorer-results"
             class="rm-home-explorer-results"
             hidden></div>

        {kind_chips}
    </section>

    <div class="rm-stats-row">
        <div class="rm-stat">
            <strong>{users_count}</strong>
            <span>{users_word}</span>
        </div>
        <div class="rm-stat rm-stat-online">
            <strong>{online_count}</strong>
            <span>{online_label}</span>
        </div>
        <div class="rm-stat">
            <strong>{resources_count}</strong>
            <span>{resources_word}</span>
        </div>
    </div>
</section>"#,
        globe_icon = icon("globe"),
        guest_hint = guest_hint,
        map_cities_professions = crate::i18n::t("map_cities_professions"),
        map_home_lead = crate::i18n::t("map_home_lead"),
        map_download_app = crate::i18n::t("map_download_app"),
        search_title = crate::i18n::t("search_title"),
        map_explorer_copy = crate::i18n::t("map_explorer_copy"),
        map_explorer_placeholder = crate::i18n::t("map_explorer_placeholder"),
        map_explorer_aria = crate::i18n::t("map_explorer_aria"),
        common_clear = crate::i18n::t("common_clear"),
        online_label = crate::i18n::t("common_online_short"),
        users_word = if crate::i18n::locale() == "ru" {
            ru_plural(users_count, "участник", "участника", "участников").to_string()
        } else {
            crate::i18n::t("map_stat_members")
        },
        resources_word = if crate::i18n::locale() == "ru" {
            ru_plural(
                resources_count,
                "объявление",
                "объявления",
                "объявлений",
            )
            .to_string()
        } else {
            crate::i18n::t("map_stat_listings")
        },
        kind_chips = intent_kind_chips(
            "",
            false,
            "/app/search",
            "/app/search?kind=work",
            "/app/search?kind=workers",
            "/app/search?kind=business",
        ),
        users_count = users_count,
        online_count = online_count,
        resources_count = resources_count,
    );

    let main_html = format!(
        r####"
{topbar}

{hero}

{section_head_countries}

<div class="grid">
    {cards}
</div>
"####,
        topbar = topbar(&crate::i18n::t("map_cities"), "globe"),
        hero = hero,
        cards = cards,
    );

    let body_after = format!(
        r#"<script type="application/json" id="rm-home-explore-data">{explore_index}</script>
<script src="{home_explorer_js}" defer></script>"#,
        explore_index = explore_index,
        home_explorer_js = static_asset("home-explorer.js"),
    );

    page_document(
        "GRABIT",
        head_extra,
        body_before_main,
        &main_html,
        &bottom_nav("map"),
        &body_after,
    )
}

// ============================================================
// CONTINENT
// ============================================================

pub fn render_continent(ci: usize) -> String {
    let w = world();

    if let Some((name, countries)) = w.iter().nth(ci) {
        let mut cards = String::new();

        for (si, country) in countries.keys().enumerate() {
            cards.push_str(&navigation_card(
                &format!("/app/{}/{}", ci, si),
                "building",
                country,
                &crate::i18n::t("map_open_cities"),
            ));
        }

        let section_head_countries = section_head(
            &crate::i18n::t("map_countries"),
            &crate::i18n::tf(
                "map_countries_available",
                &[("n", &countries.len().to_string())],
            ),
            None,
        );

        let content = format!(
            r#"
{section_head_countries}

<div class="grid">
    {cards}
</div>
"#,
            section_head_countries = section_head_countries,
            cards = cards,
        );

        return page_shell(
            name,
            &topbar(&crate::i18n::t("map_cities"), "globe"),
            &simple_hero(
                "map",
                &crate::i18n::t("map_region"),
                name,
                &crate::i18n::t("map_pick_country_cities"),
            ),
            &content,
            &bottom_nav("map"),
        );
    }

    render_continents(0, 0, 0, Vec::new(), Vec::new(), false)
}

// ============================================================
// COUNTRY
// ============================================================

pub fn render_country(ci: usize, si: usize) -> String {
    let w = world();

    if let Some((cname, countries)) = w.iter().nth(ci) {
        if let Some((country, cities)) = countries.iter().nth(si) {
            let mut cards = String::new();

            for (zi, city) in cities.iter().enumerate() {
                cards.push_str(&navigation_card(
                    &format!("/app/{}/{}/{}", ci, si, zi),
                    "map-pin",
                    city,
                    country,
                ));
            }

            let section_head_cities =
                section_head(
                    "Города",
                    &ru_count(cities.len() as i64, "город", "города", "городов"),
                    None,
                );

            let content = format!(
                r#"
{section_head_cities}

<div class="grid">
    {cards}
</div>
"#,
                section_head_cities = section_head_cities,
                cards = cards,
            );

            return page_shell(
                country,
                &topbar(&crate::i18n::t("map_cities"), "globe"),
                &simple_hero(
                    "map-pin",
                    cname,
                    country,
                    &crate::i18n::t("map_city_pick_lead"),
                ),
                &content,
                &bottom_nav("map"),
            );
        }
    }

    render_continents(0, 0, 0, Vec::new(), Vec::new(), false)
}

// ============================================================
// CITY
// ============================================================

pub fn render_city(ci: usize, si: usize, zi: usize) -> String {
    let w = world();

    if let Some((_cname, countries)) = w.iter().nth(ci) {
        if let Some((country, cities)) = countries.iter().nth(si) {
            if let Some(city) = cities.get(zi) {
                let section_head_sections = section_head("Разделы", "Выберите направление", None);

                let content = format!(
                    r#"
{section_head_sections}

<div class="grid">

    {all_card}

    {work_card}

    {workers_card}

    {business_card}

</div>
"#,
                    section_head_sections = section_head_sections,
                    all_card = navigation_card(
                        &format!("/app/{}/{}/{}/all", ci, si, zi),
                        "globe",
                        "Все объявления",
                        "Все публикации города",
                    ),
                    work_card = navigation_card(
                        &format!("/app/{}/{}/{}/cat/work?type=offer", ci, si, zi),
                        "briefcase",
                        "Работа",
                        "Вакансии рядом",
                    ),
                    workers_card = navigation_card(
                        &format!("/app/{}/{}/{}/cat/work?type=seeker", ci, si, zi),
                        "user",
                        "Работники",
                        "Профессии и кто ищет работу",
                    ),
                    business_card = navigation_card(
                        &format!("/app/{}/{}/{}/cat/business", ci, si, zi),
                        "building",
                        "Бизнес",
                        "Компании рядом",
                    ),
                );

                return page_shell(
                    city,
                    &topbar(&crate::i18n::t("map_cities"), "globe"),
                    &simple_hero(
                        "map-pin",
                        country,
                        city,
                        &crate::i18n::t("map_home_lead"),
                    ),
                    &content,
                    &bottom_nav("map"),
                );
            }
        }
    }

    render_continents(0, 0, 0, Vec::new(), Vec::new(), false)
}

// ============================================================
// SEARCH
// ============================================================

pub fn render_search(
    q: &str,
    kind: &str,
    rubric: &str,
    resources: Vec<crate::web::view_models::SearchResourceRow>,
    people: Vec<crate::web::view_models::SearchPersonRow>,
    guest_mode: bool,
    city_id: Option<i64>,
    city_name: Option<&str>,
    city_geo_ids: &BTreeMap<(usize, usize, usize), i64>,
) -> String {
    let guest_hint = if guest_mode {
        guest_mode_hint("/app/search")
    } else {
        String::new()
    };
    let world_data = world();

    let query_lower = q.trim().to_lowercase();

    let mut location_results = String::new();
    let mut location_count = 0usize;

    if !query_lower.is_empty() {
        for (ci, (continent, countries)) in world_data.iter().enumerate() {
            if continent.to_lowercase().contains(&query_lower) {
                location_count += 1;

                location_results.push_str(&navigation_card(
                    &format!("/app/{ci}"),
                    "globe",
                    continent,
                    &crate::i18n::t("map_continent"),
                ));
            }

            for (si, (country, cities)) in countries.iter().enumerate() {
                let country_match = country.to_lowercase().contains(&query_lower);

                if country_match {
                    location_count += 1;

                    location_results.push_str(&navigation_card(
                        &format!("/app/{}/{}", ci, si),
                        "building",
                        country,
                        &crate::i18n::tf(
                            "map_country_dot",
                            &[("continent", continent)],
                        ),
                    ));
                }

                for (zi, city) in cities.iter().enumerate() {
                    if city.to_lowercase().contains(&query_lower) {
                        location_count += 1;
                        let href = city_geo_ids
                            .get(&(ci, si, zi))
                            .map(|id| format!("/app/map/city/{id}"))
                            .unwrap_or_else(|| format!("/app/{}/{}/{}", ci, si, zi));

                        location_results.push_str(&navigation_card(
                            &href,
                            "map-pin",
                            city,
                            &crate::i18n::tf("map_city_dot", &[("country", country)]),
                        ));
                    }
                }
            }
        }
    }

    let kind = kind.trim();
    let rubric = rubric.trim();
    let active_rubric = crate::catalog::by_id(rubric);
    let search_href = |kind_value: &str, rubric_value: Option<&str>| -> String {
        search_page_href(q, kind_value, rubric_value, city_id)
    };
    let kind_chips = intent_kind_chips(
        kind,
        true,
        &search_href("", active_rubric.map(|item| item.id)),
        &search_href("work", active_rubric.map(|item| item.id)),
        &search_href("workers", active_rubric.map(|item| item.id)),
        &search_href("business", active_rubric.map(|item| item.id)),
    );
    let rubric_chips = search_rubric_chips(q, kind, active_rubric, city_id);

    let people_count = people.len();
    let people_section = if people.is_empty() {
        String::new()
    } else {
        format!(
            r#"
{people_head}

<section>
    {people_cards}
</section>
"#,
            people_head = section_head(
                "По профессии",
                &format!("Найдено: {}", people_count),
                Some(24),
            ),
            people_cards = search_people_cards(&people),
        )
    };

    let result_count = resources.len();
    let city_label = city_name
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .or(Some("этот город").filter(|_| city_id.is_some()));

    let has_criteria =
        !q.trim().is_empty() || !kind.is_empty() || active_rubric.is_some() || city_id.is_some();
    let results = if !has_criteria {
        String::new()
    } else if resources.is_empty() && people.is_empty() && location_results.is_empty() {
        let empty_query = if !q.trim().is_empty() {
            q
        } else if let Some(rubric) = active_rubric {
            rubric.label
        } else if let Some(name) = city_label {
            name
        } else {
            match kind {
                "work" => "работа",
                "workers" => "работники",
                "business" => "бизнес",
                _ => q,
            }
        };
        let empty_copy = if city_id.is_some() && q.trim().is_empty() && active_rubric.is_none() {
            format!(
                "В городе «{}» пока нет объявлений.",
                escape_html(city_label.unwrap_or("этот город"))
            )
        } else {
            format!(
                "По запросу «{}» пока ничего не найдено.",
                escape_html(empty_query)
            )
        };
        empty_state_card_with_actions(
            "Ничего не найдено",
            &format!(
                "{empty_copy} Можно сменить город или добавить объявление.",
                empty_copy = empty_copy
            ),
            &format!(
                "{}{}",
                empty_state_action("/app", "Другой город"),
                empty_state_action(
                    &city_id
                        .map(|id| format!("/app/add/city/{id}"))
                        .unwrap_or_else(|| "/app/add".to_string()),
                    "Добавить объявление",
                ),
            ),
        )
    } else if resources.is_empty() {
        empty_state_card_with_actions(
            "Объявлений нет",
            "Есть участники или города по этому запросу, но объявлений пока нет.",
            &empty_state_action(
                &city_id
                    .map(|id| format!("/app/add/city/{id}"))
                    .unwrap_or_else(|| "/app/add".to_string()),
                "Добавить объявление",
            ),
        )
    } else {
        resources
            .iter()
            .map(
                |(
                    id,
                    title,
                    category,
                    description,
                    address,
                    rating,
                    votes,
                    verified,
                    premium,
                    ci,
                    si,
                    zi,
                    listing_type,
                    rubric,
                    owner_user_id,
                )| {
                    let location = world_data
                        .iter()
                        .nth(*ci)
                        .and_then(|(_, countries)| {
                            countries.iter().nth(*si).and_then(|(country, cities)| {
                                cities
                                    .get(*zi)
                                    .map(|city| format!("{} · {}", city, country))
                            })
                        })
                        .unwrap_or_else(|| "Местоположение не указано".to_string());

                    let category_line = {
                        let base = if is_generic_profession_key(rubric) {
                            profession_label(category)
                        } else {
                            profession_label(rubric)
                        };
                        match listing_type.as_str() {
                            "seeker" | "offer" => {
                                format!("{} · {}", base, resource_listing_label(listing_type))
                            }
                            _ => base,
                        }
                    };

                    let description_preview = {
                        let trimmed = description.trim();
                        let mut chars = trimmed.chars();
                        let preview: String = chars.by_ref().take(140).collect();
                        if chars.next().is_some() {
                            format!("{preview}…")
                        } else {
                            preview
                        }
                    };

                    let premium_badge = if *premium != 0 {
                        premium_badge_html("default")
                    } else { String::new() };

                    let verified_badge = if *verified != 0 {
                        verified_badge_html(true)
                    } else { String::new() };

                    let write_href = if *owner_user_id > 0 {
                        format!("/app/chat/{owner_user_id}")
                    } else {
                        String::new()
                    };

                    resource_result_card(crate::web::templates::common::ResourceResultCardParams {
                        href: &format!("/app/resource/{}", id),
                        title_html: &escape_html(title),
                        category_html: &escape_html(&category_line),
                        description_html: &escape_html(&description_preview),
                        rating: *rating,
                        votes: *votes,
                        location_html: &escape_html(&location),
                        address_html: &escape_html(address),
                        premium_badge_html: &premium_badge,
                        verified_badge_html: &verified_badge,
                        write_href: &write_href,
                    })
                },
            )
            .collect::<Vec<_>>()
            .join("")
    };

    let location_section = if q.trim().is_empty() || location_results.is_empty() || !kind.is_empty()
    {
        String::new()
    } else {
        format!(
            r#"
{location_head}

<section>
    {location_results}
</section>
"#,
            location_head =
                section_head("Места", &format!("Найдено: {}", location_count), Some(24),),
            location_results = location_results,
        )
    };

    let result_header = if resources.is_empty() {
        String::new()
    } else {
        section_head(
            match kind {
                "work" => "Вакансии",
                "workers" => "Объявления",
                "business" => "Бизнес",
                _ => "Объявления",
            },
            &format!("Найдено: {}", result_count),
            Some(24),
        )
    };

    let suggestions = if !has_criteria {
        let mut chips = String::from(
            r#"<nav class="rm-kind-chips" id="rm-recent-searches" hidden aria-label="Недавние поиски"></nav>
<nav class="rm-kind-chips" aria-label="Частые рубрики">"#,
        );

        for rubric in crate::catalog::all().iter().take(12) {
            chips.push_str(&kind_chip(
                false,
                &search_page_href("", "", Some(rubric.id), city_id),
                rubric.label,
            ));
        }

        chips.push_str("</nav>");

        format!(
            r#"
<section class="card rm-search-suggest">
    <div class="card-title">С чего начать</div>
    <div class="card-meta">Выберите рубрику или откройте недавний поиск.</div>
    {chips}
</section>
"#,
            chips = chips,
        )
    } else {
        String::new()
    };

    let listings_block = if result_header.is_empty() && results.is_empty() {
        String::new()
    } else {
        format!(
            r#"
{result_header}

<section>
    {results}
</section>
"#,
            result_header = result_header,
            results = results,
        )
    };

    let content = format!(
        r#"
{location_section}

{suggestions}

{listings_block}

{people_section}
"#,
        location_section = location_section,
        suggestions = suggestions,
        listings_block = listings_block,
        people_section = people_section,
    );

    let city_chip = match (city_id.filter(|value| *value > 0), city_label) {
        (Some(_), Some(name)) => format!(
            r#"<nav class="rm-kind-chips" aria-label="Город">{}</nav>"#,
            kind_chip(
                true,
                &search_page_href(q, kind, active_rubric.map(|item| item.id), None),
                &format!("{name} · сбросить"),
            )
        ),
        _ => String::new(),
    };
    let hero_extra = format!("{guest_hint}{kind_chips}{city_chip}{rubric_chips}");

    page_shell(
        "Поиск · GRABIT",
        &topbar("Поиск", "search"),
        &search_form_hero(
            "Поиск",
            match (kind, active_rubric) {
                (_, Some(rubric)) => rubric.label,
                ("work", _) => "Найти работу",
                ("workers", _) => "Найти работников",
                ("business", _) => "Найти бизнес",
                _ => "Найти рядом",
            },
            if let Some(rubric) = active_rubric {
                match rubric.kind {
                    crate::catalog::RubricKind::Work => {
                        "Вакансии и специалисты из единого справочника."
                    }
                    crate::catalog::RubricKind::Business => {
                        "Компании и предложения из единого справочника."
                    }
                }
            } else {
                "Работа, работники, бизнес, город или профессия."
            },
            q,
            "Например: электрик, город, вакансия...",
            kind,
            city_id,
            &hero_extra,
        ),
        &content,
        &bottom_nav("search"),
    )
}

pub fn render_menu(invite_public_id: &str) -> String {
    let content = format!(
        r#"        <section>
    {section_head_settings}

    <div id="rm-continue-menu" class="grid" hidden></div>

    {invite}

    <div class="grid">
        {profile_card}
        {steps_card}
        {add_card}
    </div>

    <section id="resursmap-install-panel"
             class="card rm-pwa-panel rm-pwa-panel--compact">

        <div class="rm-pwa-compact-row">
            <div class="rm-pwa-compact-copy">
                <div class="card-title rm-pwa-compact-title">
                    {menu_app}
                </div>
                <div id="resursmap-install-hint"
                     class="card-meta rm-pwa-hint">
                    {menu_install_hint}
                </div>
            </div>

            <button id="resursmap-install-pwa"
                    type="button"
                    class="ui-button rm-pwa-install-btn">
                {menu_download}
            </button>
        </div>
    </section>

    <div class="card rm-settings-card">
        <div class="rm-menu-list">
            <button id="rm-menu-sound-toggle"
                    type="button"
                    class="rm-menu-row rm-settings-toggle-btn">
                <span class="rm-menu-row-icon">{volume_icon}</span>
                <span class="rm-menu-row-copy">
                    <strong>{menu_sound}</strong>
                    <small class="rm-menu-row-state">{menu_sound_on}</small>
                </span>
            </button>

            <button id="rm-menu-haptics-toggle"
                    type="button"
                    class="rm-menu-row rm-settings-toggle-btn">
                <span class="rm-menu-row-icon">{phone_icon}</span>
                <span class="rm-menu-row-copy">
                    <strong>{menu_haptics}</strong>
                    <small class="rm-menu-row-state">{menu_haptics_on}</small>
                </span>
            </button>

            <button class="rm-menu-row sound-test-btn rm-settings-sound-btn"
                    type="button">
                <span class="rm-menu-row-icon">{play_icon}</span>
                <span class="rm-menu-row-copy">
                    <strong>{menu_sound_test}</strong>
                    <small class="rm-menu-row-state">{menu_sound_test_hint}</small>
                </span>
            </button>

            <button class="theme-toggle-btn rm-menu-row rm-settings-theme-btn" type="button">
                <span class="rm-menu-row-icon">{sun_icon}</span>
                <span class="rm-menu-row-copy">
                    <strong>{menu_theme}</strong>
                    <small class="theme-toggle-label">{menu_theme_dark}</small>
                </span>
            </button>

        </div>
        {language_picker}
    </div>
</section>"#,
        section_head_settings = section_head(
            &crate::i18n::t("menu_title"),
            &crate::i18n::t("menu_section_caption"),
            None
        ),
        profile_card = navigation_card(
            "/app/me",
            "user",
            &crate::i18n::t("menu_profile_card"),
            &crate::i18n::t("menu_profile_meta")
        ),
        steps_card = navigation_card(
            "/app/steps",
            "footprints",
            &crate::i18n::t("menu_steps_card"),
            &crate::i18n::t("menu_steps_meta")
        ),
        add_card = navigation_card(
            "/app/add",
            "plus",
            &crate::i18n::t("menu_add_card"),
            &crate::i18n::t("menu_add_meta")
        ),
        language_picker = crate::i18n::language_picker_html("/app/menu"),
        menu_app = crate::i18n::t("menu_app"),
        menu_install_hint = crate::i18n::t("menu_install_hint"),
        menu_download = crate::i18n::t("menu_download"),
        menu_sound = crate::i18n::t("menu_sound"),
        menu_sound_on = crate::i18n::t("menu_sound_on"),
        menu_haptics = crate::i18n::t("menu_haptics"),
        menu_haptics_on = crate::i18n::t("menu_haptics_on"),
        menu_sound_test = crate::i18n::t("menu_sound_test"),
        menu_sound_test_hint = crate::i18n::t("menu_sound_test_hint"),
        menu_theme = crate::i18n::t("menu_theme"),
        menu_theme_dark = crate::i18n::t("menu_theme_dark"),
        invite = super::invite::invite_share_block(invite_public_id),
        volume_icon = icon("volume"),
        phone_icon = icon("smartphone"),
        play_icon = icon("play"),
        sun_icon = icon("sun"),
    );

    let main_html = format!(
        r#"{topbar}

{hero}

{content}"#,
        topbar = topbar(&crate::i18n::t("menu_title"), "menu"),
        hero = simple_hero(
            "sliders",
            "GRABIT",
            &crate::i18n::t("menu_title"),
            &crate::i18n::t("menu_lead"),
        ),
        content = content,
    );

    let body_after = format!(
        r#"<script src="{menu_settings_js}" defer></script>"#,
        menu_settings_js = super::common::static_asset("menu-settings.js"),
    );

    page_document(
        &format!("{} · GRABIT", crate::i18n::t("menu_title")),
        "",
        "",
        &main_html,
        &bottom_nav("menu"),
        &body_after,
    )
}

#[cfg(test)]
mod search_catalog_tests {
    use super::*;

    #[test]
    fn search_page_shows_rubric_chips_for_active_profession() {
        let html = render_search(
            "",
            "",
            "security",
            Vec::new(),
            Vec::new(),
            false,
            None,
            None,
            &BTreeMap::new(),
        );

        assert!(html.contains("aria-label=\"Рубрика\""));
        assert!(html.contains("Охрана"));
        assert!(html.contains("rubric=security"));
        assert!(html.contains("Электрик"));
    }

    #[test]
    fn empty_search_has_no_rubric_chips() {
        let html = render_search(
            "",
            "",
            "",
            Vec::new(),
            Vec::new(),
            false,
            None,
            None,
            &BTreeMap::new(),
        );

        assert!(!html.contains("aria-label=\"Рубрика\""));
    }

    #[test]
    fn city_filter_shows_chip_and_empty_state() {
        let html = render_search(
            "",
            "",
            "",
            Vec::new(),
            Vec::new(),
            false,
            Some(7),
            Some("Лион"),
            &BTreeMap::new(),
        );

        assert!(html.contains("aria-label=\"Город\""));
        assert!(html.contains("Лион · сбросить"));
        assert!(html.contains("В городе «Лион» пока нет объявлений."));
        assert!(html.contains("href=\"/app/add/city/7\""));
        assert!(html.contains("name=\"city_id\""));
        assert!(html.contains("value=\"7\""));
    }

    #[test]
    fn search_city_cards_prefer_geo_map_links() {
        let mut ids = BTreeMap::new();
        ids.insert((0, 0, 0), 99);
        let city = world()
            .first_key_value()
            .and_then(|(_, countries)| countries.first_key_value())
            .and_then(|(_, cities)| cities.first())
            .copied()
            .unwrap_or("");

        if city.is_empty() {
            return;
        }

        let html = render_search(
            city,
            "",
            "",
            Vec::new(),
            Vec::new(),
            false,
            None,
            None,
            &ids,
        );

        assert!(html.contains("/app/map/city/99"));
        assert!(!html.contains("/app/0/0/0\""));
    }

    #[test]
    fn menu_and_home_keep_continue_hosts() {
        let menu = render_menu("abc123");
        assert!(menu.contains("id=\"rm-continue-menu\""));
        assert!(menu.contains("/app/join/abc123?to=steps"));
        assert!(menu.contains("theme-toggle-btn"));
        assert!(menu.contains("data-nav-map-link"));
        assert!(menu.contains("data-nav-search-link"));

        let home = render_geo_root(1, 1, 1, vec![(1, "Европа".to_string(), 3)], false);
        assert!(home.contains("id=\"rm-last-city-home\""));
        assert!(home.contains("data-nav-map-link"));
    }

    #[test]
    fn continent_has_country_search_like_cities() {
        let html = render_geo_continent(
            1,
            "Европа",
            vec![(7, "Франция".to_string(), 12)],
        );
        assert!(html.contains("id=\"rm-map-country-search\""));
        assert!(html.contains("Найти страну"));
        assert!(html.contains("/app/map/country/7"));
        assert!(html.contains("Франция"));
        assert!(html.contains("/static/map-countries.js"));
    }

    #[test]
    fn menu_has_working_theme_toggle() {
        let html = render_menu("");
        assert!(html.contains("theme-toggle-btn"));
        assert!(html.contains("<strong>День и ночь</strong>"));
        assert!(html.contains("<strong>Звук</strong>"));
        assert!(html.contains("rm-lang-picker"));
        assert!(html.contains("name=\"locale\""));
        assert!(html.contains("value=\"zh-TW\""));
        assert!(html.contains("/app/locale"));
    }
}
