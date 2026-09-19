use super::common::{
    back_hero, back_link, bottom_nav, empty_state_action, empty_state_card_with_actions,
    error_status_html, escape_html, guest_locked_section, icon, is_generic_profession_key,
    js_string, kind_chip, my_resource_moderation_badge, navigation_card, page_document,
    page_shell, plural_count, premium_badge_html, profession_label, resource_card_link_class,
    resource_detail_section_class, resource_listing_label, search_people_cards, section_head,
    share_button, topbar, verified_badge_html,
};

pub struct RenderCategoryParams<'a> {
    pub ci: usize,
    pub si: usize,
    pub zi: usize,
    pub category: &'a str,
    pub listing_type: Option<&'a str>,
    pub active_rubric: Option<&'a str>,
    pub sort: &'a str,
    pub resources: Vec<crate::web::view_models::CategoryResourceRow>,
    pub people: Vec<crate::web::view_models::SearchPersonRow>,
}

fn category_list_href(
    ci: usize,
    si: usize,
    zi: usize,
    category: &str,
    listing_type: Option<&str>,
    rubric: Option<&str>,
    sort: &str,
) -> String {
    let base = if category.eq_ignore_ascii_case("all") {
        format!("/app/{ci}/{si}/{zi}/all")
    } else {
        format!("/app/{ci}/{si}/{zi}/cat/{}", urlencoding::encode(category))
    };
    let mut parts = Vec::new();
    match listing_type {
        Some("seeker") => parts.push("type=seeker".to_string()),
        Some("offer") => parts.push("type=offer".to_string()),
        _ => {}
    }
    if let Some(rubric) = rubric {
        parts.push(format!("rubric={}", urlencoding::encode(rubric)));
    }
    if sort == "new" {
        parts.push("sort=new".to_string());
    }
    if parts.is_empty() {
        base
    } else {
        format!("{base}?{}", parts.join("&"))
    }
}

pub fn render_category(params: RenderCategoryParams<'_>) -> String {
    let RenderCategoryParams {
        ci,
        si,
        zi,
        category,
        listing_type,
        active_rubric,
        sort,
        resources,
        people,
    } = params;
    let city_url = format!("/app/{}/{}/{}", ci, si, zi);
    let category_url = urlencoding::encode(category);
    let type_query = match listing_type {
        Some("seeker") => "type=seeker",
        Some("offer") => "type=offer",
        _ => "",
    };
    let add_url = if category.eq_ignore_ascii_case("all") {
        city_url.clone()
    } else {
        let mut href = format!("/app/{ci}/{si}/{zi}/cat/{category_url}/add");
        let mut parts = Vec::new();
        if !type_query.is_empty() {
            parts.push(type_query.to_string());
        }
        if let Some(rubric) = active_rubric {
            parts.push(format!("rubric={}", urlencoding::encode(rubric)));
        }
        if !parts.is_empty() {
            href.push('?');
            href.push_str(&parts.join("&"));
        }
        href
    };
    let cards = if resources.is_empty() {
        if people.is_empty() {
            empty_state_card_with_actions(
                &crate::i18n::t("resource_empty_title"),
                &(if category.eq_ignore_ascii_case("all") {
                    crate::i18n::t("resource_empty_all_body")
                } else if listing_type == Some("seeker") {
                    crate::i18n::t("resource_empty_seeker_body")
                } else {
                    crate::i18n::t("resource_empty_default_body")
                }),
                &empty_state_action(
                    &add_url,
                    &(if category.eq_ignore_ascii_case("all") {
                        crate::i18n::t("resource_empty_all_action")
                    } else {
                        crate::i18n::t("common_add")
                    }),
                ),
            )
        } else {
            empty_state_card_with_actions(
                &crate::i18n::t("resource_empty_people_title"),
                &crate::i18n::t("resource_empty_people_body"),
                &empty_state_action(&add_url, &crate::i18n::t("resource_add_action")),
            )
        }
    } else {
        resources
            .iter()
            .map(
                |(
                    id,
                    title,
                    description,
                    _contact,
                    address,
                    rating,
                    votes,
                    verified,
                    premium,
                    row_listing_type,
                    row_rubric,
                    owner_public_id,
                    owner_user_id,
                )| {
                    let safe_title = escape_html(title);
                    let safe_description = escape_html(description);
                    let safe_address = escape_html(address);
                    let listing_label = {
                        let mut parts = Vec::new();
                        if listing_type.is_none() {
                            parts.push(resource_listing_label(row_listing_type).to_string());
                        }
                        if !is_generic_profession_key(row_rubric) {
                            let rubric_label = profession_label(row_rubric);
                            if !rubric_label.is_empty() {
                                parts.push(rubric_label);
                            }
                        }
                        if parts.is_empty() {
                            String::new()
                        } else {
                            format!(
                                r#"<div class="card-meta">{}</div>"#,
                                escape_html(&parts.join(" · "))
                            )
                        }
                    };

                    let verified_badge = if *verified != 0 {
                        verified_badge_html(false)
                    } else {
                        String::new()
                    };

                    let premium_badge = if *premium != 0 {
                        premium_badge_html("default")
                    } else {
                        String::new()
                    };

                    let card_class = resource_card_link_class(*premium != 0);
                    let premium_shine = if *premium != 0 {
                        r#"<div class="rm-resource-card-shine"></div>"#
                    } else {
                        ""
                    };

                    let write_href = if *owner_user_id > 0 && !owner_public_id.is_empty() {
                        format!("/app/chat/{}", urlencoding::encode(owner_public_id))
                    } else {
                        String::new()
                    };
                    let write_html = if write_href.is_empty() {
                        String::new()
                    } else {
                        format!(
                            r#"<a href="{href}" class="rm-person-write">{write}</a>"#,
                            href = escape_html(&write_href),
                            write = crate::i18n::t("common_write"),
                        )
                    };
                    let resource_href = format!("/app/listing/{id}");
                    let share_html = share_button(&resource_href, &crate::i18n::t("common_share"));

                    format!(
                        r#"
                    <div class="{card_class} card--listing" data-share-scope>
                        {premium_shine}
                        <a href="/app/listing/{id}" class="rm-person-main">
                        <div class="card-icon">{map_icon}</div>

                        <div class="card-content">

                            <div class="rm-resource-title-row">
                                <div class="card-title" data-share-source-title>
                                    {title}
                                </div>
                                {premium_badge}
                            </div>

                            {listing_label}

                            <div class="card-meta" data-share-source-text>
                                {description}
                            </div>

                            <div class="card-meta">
                                {rating_label} {rating:.1} · {votes}
                            </div>

                            <div class="card-meta">
                                {address}
                            </div>

                            <div class="rm-resource-verified-row">
                                {verified_badge}
                            </div>

                        </div>

                        <div class="card-arrow">›</div>
                        </a>
                        {write_html}
                        {share_html}
                    </div>
                    "#,
                        id = id,
                        card_class = card_class,
                        premium_shine = premium_shine,
                        map_icon = icon("map-pin"),
                        title = safe_title,
                        premium_badge = premium_badge,
                        listing_label = listing_label,
                        description = safe_description,
                        rating_label = crate::i18n::t("rating_label"),
                        rating = rating,
                        votes = plural_count(*votes, "count_vote_one", "count_vote_few", "count_vote_many"),
                        address = safe_address,
                        verified_badge = verified_badge,
                        write_html = write_html,
                        share_html = share_html,
                    )
                },
            )
            .collect::<Vec<_>>()
            .join("")
    };

    let count = resources.len();
    let people_count = people.len();
    let people_section = if people.is_empty() {
        String::new()
    } else {
        format!(
            r#"{head}
<div>{cards}</div>"#,
            head = section_head(
                &crate::i18n::t("resource_people_section_title"),
                &crate::i18n::tf("resource_found_count", &[("n", &people_count.to_string())]),
                None,
            ),
            cards = search_people_cards(&people),
        )
    };

    let work_chips = if category.eq_ignore_ascii_case("work") {
        format!(
            r#"<nav class="rm-kind-chips" aria-label="{aria}">
    {work}{workers}
</nav>"#,
            aria = crate::i18n::t("aria_what_to_search"),
            work = kind_chip(
                listing_type == Some("offer"),
                &category_list_href(ci, si, zi, category, Some("offer"), active_rubric, sort),
                &crate::i18n::t("common_work"),
            ),
            workers = kind_chip(
                listing_type == Some("seeker"),
                &category_list_href(ci, si, zi, category, Some("seeker"), active_rubric, sort),
                &crate::i18n::t("common_workers"),
            ),
        )
    } else {
        String::new()
    };

    let rubric_chips = if category.eq_ignore_ascii_case("all") {
        String::new()
    } else {
        let rubric_kind = if category.eq_ignore_ascii_case("work") {
            crate::catalog::RubricKind::Work
        } else {
            crate::catalog::RubricKind::Business
        };
        let mut chips = format!(
            r#"<nav class="rm-kind-chips" aria-label="{aria}">"#,
            aria = crate::i18n::t("aria_rubric")
        );
        chips.push_str(&kind_chip(
            active_rubric.is_none(),
            &category_list_href(ci, si, zi, category, listing_type, None, sort),
            &crate::i18n::t("common_all"),
        ));
        for rubric in crate::catalog::by_kind(rubric_kind) {
            chips.push_str(&kind_chip(
                active_rubric == Some(rubric.id),
                &category_list_href(ci, si, zi, category, listing_type, Some(rubric.id), sort),
                rubric.label,
            ));
        }
        chips.push_str("</nav>");
        chips
    };

    let sort_chips = format!(
        r#"<nav class="rm-kind-chips" aria-label="{aria}">
    {rating}{newest}
</nav>"#,
        aria = crate::i18n::t("aria_sort"),
        rating = kind_chip(
            sort != "new",
            &category_list_href(ci, si, zi, category, listing_type, active_rubric, "rating"),
            &crate::i18n::t("sort_by_rating"),
        ),
        newest = kind_chip(
            sort == "new",
            &category_list_href(ci, si, zi, category, listing_type, active_rubric, "new"),
            &crate::i18n::t("sort_newest"),
        ),
    );

    let section_head_resources = if resources.is_empty() {
        String::new()
    } else {
        section_head(
            &crate::i18n::t("resources_section_title"),
            &crate::i18n::tf("resource_found_count", &[("n", &count.to_string())]),
            None,
        )
    };

    let content = format!(
        r####"{work_chips}

{rubric_chips}

{sort_chips}

{section_head_resources}

<div>
    {cards}
</div>

{people_section}"####,
        work_chips = work_chips,
        rubric_chips = rubric_chips,
        sort_chips = sort_chips,
        section_head_resources = section_head_resources,
        cards = cards,
        people_section = people_section,
    );

    let heading = if let Some(rubric) = active_rubric.and_then(crate::catalog::by_id) {
        rubric.label.to_string()
    } else {
        match (category.to_ascii_lowercase().as_str(), listing_type) {
            ("all", _) => crate::i18n::t("category_all_title"),
            ("work", Some("offer")) => crate::i18n::t("common_work"),
            ("work", Some("seeker")) => crate::i18n::t("common_workers"),
            ("work", _) => crate::i18n::t("common_work"),
            ("business" | "services", _) => crate::i18n::t("common_business"),
            _ => category.to_string(),
        }
    };
    let heading_copy = if category.eq_ignore_ascii_case("all") {
        crate::i18n::t("category_all_copy")
    } else {
        match listing_type {
            Some("offer") => crate::i18n::t("category_offer_copy"),
            Some("seeker") => crate::i18n::t("category_seeker_copy"),
            _ => crate::i18n::t("category_default_copy"),
        }
    };

    page_shell(
        &format!("{} · GRABIT", heading),
        &topbar(&crate::i18n::t("nav_category"), "globe"),
        &back_hero(
            &back_link(&city_url, &crate::i18n::t("back_to_city"), "chevron"),
            "map",
            &crate::i18n::t("category_eyebrow"),
            &heading,
            &heading_copy,
        ),
        &content,
        &bottom_nav("map"),
    )
}

// ============================================================
// ADD RESOURCE
// ============================================================

// ============================================================
// PUBLIC USER PROFILE
// ============================================================

pub struct RenderResourceProfileParams<'a> {
    pub id: i64,
    pub title: &'a str,
    pub description: &'a str,
    pub contact: &'a str,
    pub address: &'a str,
    pub rating: f64,
    pub votes: i64,
    pub premium: i64,
    pub verified: i64,
    pub category: &'a str,
    pub listing_type: &'a str,
    pub continent_index: i64,
    pub country_index: i64,
    pub city_index: i64,
    pub city_id: Option<i64>,
    pub _created_at: i64,
    pub owner_public_id: &'a str,
    pub owner_user_id: i64,
    pub rubric: &'a str,
    pub owner_preview: bool,
    pub moderation_status: &'a str,
    pub is_active: i64,
    pub viewer_score: i64,
    pub viewer_favorite: bool,
}

fn listing_meta_description(description: &str) -> String {
    let normalized = description.split_whitespace().collect::<Vec<_>>().join(" ");
    let mut result: String = normalized.chars().take(180).collect();
    if normalized.chars().count() > 180 {
        result.push('…');
    }
    result
}

fn listing_share_meta(id: i64, title: &str, description: &str, owner_preview: bool) -> String {
    if owner_preview {
        return r#"<meta name="robots" content="noindex, nofollow">"#.to_string();
    }

    let base = crate::stripe_payments::public_base_url();
    let url = format!("{base}/app/listing/{id}");
    let image = format!("{base}/static/grabit-share-cover.png");
    let safe_title = escape_html(title);
    let safe_description = escape_html(&listing_meta_description(description));
    let safe_url = escape_html(&url);
    let safe_image = escape_html(&image);

    format!(
        r#"<link rel="canonical" href="{safe_url}">
<meta name="description" content="{safe_description}">
<meta property="og:site_name" content="GRABIT">
<meta property="og:type" content="article">
<meta property="og:title" content="{safe_title}">
<meta property="og:description" content="{safe_description}">
<meta property="og:url" content="{safe_url}">
<meta property="og:image" content="{safe_image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{safe_title}">
<meta name="twitter:description" content="{safe_description}">
<meta name="twitter:image" content="{safe_image}">"#,
    )
}

pub fn render_resource_profile(params: RenderResourceProfileParams<'_>) -> String {
    let RenderResourceProfileParams {
        id,
        title,
        description,
        contact,
        address,
        rating,
        votes,
        premium,
        verified,
        category,
        listing_type,
        continent_index,
        country_index,
        city_index,
        city_id,
        _created_at,
        owner_public_id,
        owner_user_id,
        rubric,
        owner_preview,
        moderation_status,
        is_active,
        viewer_score,
        viewer_favorite,
    } = params;
    let safe_description = escape_html(description);
    let safe_contact = escape_html(contact);
    let safe_address = escape_html(address);

    let premium_badge = if premium != 0 {
        premium_badge_html("default")
    } else {
        String::new()
    };

    let verified_badge = if verified != 0 {
        verified_badge_html(false)
    } else {
        String::new()
    };

    let listing_label = resource_listing_label(listing_type);
    let rubric_label = if crate::catalog::by_id(rubric).is_some() {
        profession_label(rubric)
    } else {
        profession_label(category)
    };
    let category_url = urlencoding::encode(category);
    let type_query = match listing_type.trim() {
        "seeker" => "?type=seeker",
        "offer" => "?type=offer",
        _ => "",
    };
    let (back_url, back_label) = if owner_preview {
        ("/app/my-resources".to_string(), crate::i18n::t("my_resources_title"))
    } else if continent_index >= 0 && country_index >= 0 && city_index >= 0 {
        (
            format!(
                "/app/{continent_index}/{country_index}/{city_index}/cat/{category_url}{type_query}"
            ),
            crate::i18n::t("back_to_category"),
        )
    } else if let Some(city_id) = city_id {
        (format!("/app/map/city/{city_id}"), crate::i18n::t("back_to_city"))
    } else {
        ("/app".to_string(), crate::i18n::t("back_to_cities"))
    };
    let moderation_banner = if !owner_preview {
        String::new()
    } else if moderation_status == "rejected" {
        format!(
            r#"<section class="card rm-resource-moderation-banner">
    <div class="card-title">{title}</div>
    <div class="card-meta">{body}</div>
    <a href="/app/resource/{id}/edit" class="ui-button rm-auth-button">{edit}</a>
</section>"#,
            title = crate::i18n::t("moderation_rejected_title"),
            body = crate::i18n::t("moderation_rejected_body"),
            edit = crate::i18n::t("common_edit"),
            id = id,
        )
    } else if is_active == 0 {
        format!(
            r#"<section class="card rm-resource-moderation-banner">
    <div class="card-title">{title}</div>
    <div class="card-meta">{body}</div>
</section>"#,
            title = crate::i18n::t("moderation_hidden_title"),
            body = crate::i18n::t("moderation_hidden_body"),
        )
    } else {
        format!(
            r#"<section class="card rm-resource-moderation-banner">
    <div class="card-title">{title}</div>
    <div class="card-meta">{body}</div>
</section>"#,
            title = crate::i18n::t("moderation_pending_title"),
            body = crate::i18n::t("moderation_pending_body"),
        )
    };

    let hero_description = format!(
        r#"<span class="rm-resource-hero-badges">
            {premium_badge}
            {verified_badge}
        </span>

        <span class="rm-resource-listing-label">{listing_label}</span>

        <span id="rating-summary" class="rm-resource-rating-summary">
            {rating_label} <strong>{rating:.1}</strong> · {votes}
        </span>"#,
        premium_badge = premium_badge,
        verified_badge = verified_badge,
        listing_label = listing_label,
        rating_label = crate::i18n::t("rating_label"),
        rating = rating,
        votes = plural_count(votes, "count_vote_one", "count_vote_few", "count_vote_many"),
    );
    let favorite_label = if viewer_favorite {
        crate::i18n::t("favorite_added_label")
    } else {
        crate::i18n::t("favorite_action_label")
    };
    let stars_html = (1..=5)
        .map(|score| {
            let glyph = if score <= viewer_score { "★" } else { "☆" };
            format!(
                r#"<button type="button" data-score="{score}" class="ui-button rm-resource-star-btn">{glyph}</button>"#
            )
        })
        .collect::<String>();
    let public_actions_html = if owner_preview {
        String::new()
    } else {
        format!(
            r#"<button
        id="favorite-button"
        type="button"
        class="ui-button rm-resource-favorite-btn">
        {favorite_label}
    </button>

    <button
        type="button"
        class="ui-button"
        data-share
        data-share-title="{share_title}"
        data-share-text="{share_text}"
        data-share-url="/app/listing/{id}"
        data-share-status="share-status">
        {share_external}
    </button>

    <a class="ui-button rm-share-internal"
       href="/app/messages?share={id}">
        {share_internal}
    </a>
    <div id="share-status" class="ui-status"></div>
    <div id="favorite-status" class="ui-status rm-resource-favorite-status"></div>

    <div class="rm-resource-report-inline">
        <div class="rm-resource-report-label">{report_label}</div>
        <div class="rm-report-chips">
            <button type="button" class="rm-report-chip" data-reason="Спам">{reason_spam}</button>
            <button type="button" class="rm-report-chip" data-reason="Обман">{reason_scam}</button>
            <button type="button" class="rm-report-chip" data-reason="Оскорбление">{reason_insult}</button>
            <button type="button" class="rm-report-chip" data-reason="Другая причина">{reason_other}</button>
        </div>
        <div id="report-status" class="ui-status rm-resource-report-status"></div>
    </div>

    <div class="rm-resource-rating-block">
        <div class="rm-resource-rating-kicker">{rate_prompt}</div>
        <div id="rating-stars" class="rm-resource-stars">
            {stars_html}
        </div>
        <div id="vote-status" class="ui-status rm-resource-vote-status"></div>
    </div>"#,
            favorite_label = favorite_label,
            stars_html = stars_html,
            share_title = escape_html(title),
            share_text = escape_html(&format!("{listing_label} · {rubric_label}")),
            share_external = crate::i18n::t("share_external"),
            report_label = crate::i18n::t("report_label"),
            reason_spam = crate::i18n::t("report_reason_spam"),
            reason_scam = crate::i18n::t("report_reason_scam"),
            reason_insult = crate::i18n::t("report_reason_insult"),
            reason_other = crate::i18n::t("report_reason_other"),
            rate_prompt = crate::i18n::t("rate_prompt_label"),
            share_internal = crate::i18n::t("share_internal"),
            id = id,
        )
    };

    let detail_section_class = resource_detail_section_class(premium != 0);

    let contact_clean = contact.trim();

    let contact_href = if contact_clean.starts_with('@') {
        format!("https://t.me/{}", contact_clean.trim_start_matches('@'))
    } else if contact_clean.starts_with("http://") || contact_clean.starts_with("https://") {
        contact_clean.to_string()
    } else {
        let phone: String = contact_clean
            .chars()
            .filter(|c| c.is_ascii_digit() || *c == '+')
            .collect();

        format!("tel:{}", phone)
    };

    let owner_profile_html = if owner_public_id.trim().is_empty() {
        String::new()
    } else {
        format!(
            r#"
<section class="card rm-resource-owner-card">

    <div class="card-icon rm-resource-owner-icon">
        {owner_icon}
    </div>

    <div class="card-content rm-resource-owner-content">

        <div class="rm-resource-owner-kicker">
            {author_label}
        </div>

        <div class="card-title">
            {author_profile_title}
        </div>

        <div class="card-meta rm-resource-owner-meta">
            {author_profile_meta}
        </div>

    </div>

    <a href="/app/user/{public_id}" class="rm-resource-owner-link">
        {profile_label}
    </a>
    {write_html}

</section>
"#,
            owner_icon = icon("user"),
            author_label = crate::i18n::t("resource_author_label"),
            author_profile_title = crate::i18n::t("resource_author_profile_title"),
            author_profile_meta = crate::i18n::t("resource_author_profile_meta"),
            profile_label = crate::i18n::t("common_profile"),
            public_id = urlencoding::encode(owner_public_id),
            write_html = if owner_user_id > 0 && !owner_preview {
                format!(
                    r#"<a href="/app/chat/{public_id}" class="rm-resource-owner-link">{write}</a>"#,
                    public_id = urlencoding::encode(owner_public_id),
                    write = crate::i18n::t("common_write"),
                )
            } else {
                String::new()
            },
        )
    };

    let map_query = urlencoding::encode(address.trim());

    let map_href = format!(
        "https://www.google.com/maps/search/?api=1&query={}",
        map_query
    );

    let safe_contact_href = escape_html(&contact_href);
    let safe_map_href = escape_html(&map_href);
    let write_href = if owner_user_id > 0 && !owner_preview && !owner_public_id.is_empty() {
        format!("/app/chat/{}", urlencoding::encode(owner_public_id))
    } else {
        String::new()
    };
    let external_label = if contact_clean.starts_with('@') {
        "Telegram".to_string()
    } else if contact_clean.starts_with("http://") || contact_clean.starts_with("https://") {
        crate::i18n::t("contact_type_website")
    } else if contact_clean
        .chars()
        .any(|c| c.is_ascii_digit() || c == '+')
    {
        crate::i18n::t("contact_type_call")
    } else {
        crate::i18n::t("contact_type_contact")
    };
    let primary_contact = if !write_href.is_empty() {
        format!(
            r#"<a href="{href}" class="rm-resource-contact-btn rm-resource-contact-btn--gold">{write}</a>"#,
            href = escape_html(&write_href),
            write = crate::i18n::t("common_write"),
        )
    } else if !contact_clean.is_empty() {
        format!(
            r#"<a href="{href}" class="rm-resource-contact-btn rm-resource-contact-btn--gold">{label}</a>"#,
            href = safe_contact_href,
            label = external_label,
        )
    } else {
        String::new()
    };
    let extra_contact = if !write_href.is_empty() && !contact_clean.is_empty() {
        format!(
            r#"<a href="{href}" class="rm-resource-contact-btn rm-resource-contact-btn--neutral">{label}</a>"#,
            href = safe_contact_href,
            label = external_label,
        )
    } else {
        String::new()
    };

    let main_html = format!(
        r####"{moderation_banner}
<section>
{public_actions}
</section>

<section class="{detail_section_class}">

    <div class="rm-resource-section-kicker">
        {about_label}
    </div>

    <div class="rm-resource-description">
        {description}
    </div>

</section>

{owner_profile_html}

<section class="card rm-resource-section">

    <div class="rm-resource-section-kicker rm-resource-section-kicker--contacts">
        {contacts_label}
    </div>

    <div class="card-meta rm-resource-contact-line">
        {address}
    </div>

    <div class="card-meta rm-resource-contact-line rm-resource-contact-line--last">
        {contact}
    </div>

    <div class="rm-resource-contact-actions">

        {primary_contact}
        {extra_contact}

        <a href="{map_href}"
           target="_blank"
           rel="noopener noreferrer"
           class="rm-resource-contact-btn rm-resource-contact-btn--neutral">
            {on_map_label}
        </a>

    </div>

</section>

<section class="card rm-resource-section">

    <div class="rm-resource-section-kicker rm-resource-section-kicker--contacts">
        {id_label}
    </div>

    <div class="rm-resource-id-value">
        #{id}
    </div>

</section>"####,
        moderation_banner = moderation_banner,
        public_actions = public_actions_html,
        about_label = crate::i18n::t("resource_about_label"),
        description = safe_description,
        owner_profile_html = owner_profile_html,
        contacts_label = crate::i18n::t("common_contacts"),
        address = safe_address,
        contact = safe_contact,
        primary_contact = primary_contact,
        extra_contact = extra_contact,
        map_href = safe_map_href,
        on_map_label = crate::i18n::t("open_on_map_label"),
        id_label = crate::i18n::t("resource_id_label"),
        detail_section_class = detail_section_class,
        id = id,
    );

    let body_after = if owner_preview {
        String::new()
    } else {
        format!(
            r####"<script>
(function () {{
    const resourceId = {id};
    const isRuLocale = {is_ru};
    const L = {{
        favAdded: {fav_added_label},
        favAction: {fav_action_label},
        saving: {status_saving},
        favAddedStatus: {favorite_added_status},
        favRemovedStatus: {favorite_removed_status},
        favError: {favorite_error_status},
        connError: {error_connection},
        sending: {status_sending},
        reportSent: {report_sent_status},
        reportError: {report_error_status},
        voteError: {vote_error_status},
        voteSaved: {vote_saved_status},
        ratingLabel: {rating_label},
        voteOne: {vote_one},
        voteFew: {vote_few},
        voteMany: {vote_many}
    }};

    function pluralVotes(n) {{
        if (isRuLocale) {{
            const abs = Math.abs(n) % 100;
            const last = abs % 10;
            let word = L.voteMany;
            if (abs > 10 && abs < 20) word = L.voteMany;
            else if (last === 1) word = L.voteOne;
            else if (last >= 2 && last <= 4) word = L.voteFew;
            return n + " " + word;
        }}
        return n + " " + (Math.abs(n) === 1 ? L.voteOne : L.voteMany);
    }}

    const favoriteButton =
        document.getElementById("favorite-button");

    const favoriteStatus =
        document.getElementById("favorite-status");

    function renderFavorite(value) {{
        if (!favoriteButton) return;

        favoriteButton.textContent =
            value
                ? L.favAdded
                : L.favAction;
    }}

    async function responseData(response) {{
        if (response.status === 401) {{
            window.location.href =
                "/login?next=" + encodeURIComponent("/app/resource/" + resourceId);
            return null;
        }}
        if (!response.ok) {{
            throw new Error("request_failed");
        }}
        return response.json();
    }}

    if (favoriteButton) {{
        favoriteButton.addEventListener("click", async () => {{
            favoriteButton.disabled = true;

            if (favoriteStatus) {{
                favoriteStatus.textContent = L.saving;
            }}

            try {{
                const response = await fetch(
                    `/api/resource/${{resourceId}}/favorite`,
                    {{
                        method: "POST"
                    }}
                );

                const data = await responseData(response);
                if (!data) return;

                if (data.ok) {{
                    renderFavorite(Boolean(data.favorite));

                    if (favoriteStatus) {{
                        favoriteStatus.textContent =
                            data.favorite
                                ? L.favAddedStatus
                                : L.favRemovedStatus;
                    }}
                }} else if (favoriteStatus) {{
                    favoriteStatus.textContent = L.favError;
                }}
            }} catch (_) {{
                if (favoriteStatus) {{
                    favoriteStatus.textContent =
                        L.connError;
                }}
            }}

            favoriteButton.disabled = false;
        }});
    }}

    const reportStatus =
        document.getElementById("report-status");
    const reportChips = Array.from(
        document.querySelectorAll(".rm-report-chip")
    );

    reportChips.forEach((chip) => {{
        chip.addEventListener("click", async () => {{
            const reason = String(chip.dataset.reason || "").trim();
            if (reason.length < 3) {{
                return;
            }}

            reportChips.forEach((item) => {{ item.disabled = true; }});
            if (reportStatus) {{
                reportStatus.textContent = L.sending;
            }}

            try {{
                const response = await fetch(
                    `/api/resource/${{resourceId}}/report`,
                    {{
                        method: "POST",
                        headers: {{
                            "Content-Type": "application/json"
                        }},
                        body: JSON.stringify({{ reason: reason }})
                    }}
                );

                const data = await responseData(response);
                if (!data) return;
                if (reportStatus) {{
                    reportStatus.textContent = data.ok
                        ? L.reportSent
                        : L.reportError;
                }}
            }} catch (_) {{
                if (reportStatus) {{
                    reportStatus.textContent = L.connError;
                }}
            }}

            reportChips.forEach((item) => {{ item.disabled = false; }});
        }});
    }});
    const stars = Array.from(
        document.querySelectorAll("#rating-stars button")
    );

    const status = document.getElementById("vote-status");
    const summary = document.getElementById("rating-summary");
    if (!status) {{
        return;
    }}

    let savedScore = {viewer_score};

    function paint(score) {{
        stars.forEach((star) => {{
            const value = Number(star.dataset.score);
            star.textContent = value <= score ? "★" : "☆";
        }});
    }}

    paint(savedScore);

    stars.forEach((star) => {{
        star.addEventListener("mouseenter", () => {{
            paint(Number(star.dataset.score));
        }});

        star.addEventListener("mouseleave", () => {{
            paint(savedScore);
        }});

        star.addEventListener("click", async () => {{
            const score = Number(star.dataset.score);

            status.textContent = L.saving;
            stars.forEach((item) => {{ item.disabled = true; }});

            try {{
                const response = await fetch(
                    `/api/resource/${{resourceId}}/vote`,
                    {{
                        method: "POST",
                        headers: {{
                            "Content-Type": "application/json"
                        }},
                        body: JSON.stringify({{ score: score }})
                    }}
                );

                const data = await responseData(response);
                if (!data) return;

                if (!data.ok) {{
                    status.textContent = L.voteError;
                    return;
                }}

                savedScore = score;
                paint(score);

                if (summary) {{
                    summary.innerHTML =
                        `${{L.ratingLabel}} <strong>${{Number(data.rating).toFixed(1)}}</strong> · ${{pluralVotes(Number(data.votes) || 0)}}`;
                }}

                status.textContent = L.voteSaved;
            }} catch (_) {{
                status.textContent = L.connError;
            }} finally {{
                stars.forEach((item) => {{ item.disabled = false; }});
            }}
        }});
    }});
}})();
</script>"####,
            id = id,
            is_ru = crate::i18n::locale() == "ru",
            fav_added_label = js_string("favorite_added_label"),
            fav_action_label = js_string("favorite_action_label"),
            status_saving = js_string("status_saving"),
            favorite_added_status = js_string("favorite_added_status"),
            favorite_removed_status = js_string("favorite_removed_status"),
            favorite_error_status = js_string("favorite_error_status"),
            error_connection = js_string("error_connection"),
            status_sending = js_string("status_sending"),
            report_sent_status = js_string("report_sent_status"),
            report_error_status = js_string("report_error_status"),
            vote_error_status = js_string("vote_error_status"),
            vote_saved_status = js_string("vote_saved_status"),
            rating_label = js_string("rating_label"),
            vote_one = js_string("count_vote_one"),
            vote_few = js_string("count_vote_few"),
            vote_many = js_string("count_vote_many"),
            viewer_score = viewer_score.clamp(0, 5),
        )
    };

    page_document(
        &format!("{} · GRABIT", title),
        &listing_share_meta(id, title, description, owner_preview),
        "",
        &format!(
            "{topbar}\n\n{hero}\n\n{content}",
            topbar = topbar(&crate::i18n::t("common_listing"), "map"),
            hero = back_hero(
                &back_link(&back_url, &back_label, "arrow-left"),
                "map-pin",
                &rubric_label,
                title,
                &hero_description,
            ),
            content = main_html,
        ),
        &bottom_nav(if owner_preview { "menu" } else { "map" }),
        &body_after,
    )
}

pub fn render_internal_promotion(
    resource_id: i64,
    title: &str,
    category: &str,
    description: &str,
    address: &str,
    active_until: i64,
    now: i64,
) -> String {
    let currently_active = active_until > now;
    let renewal_open = !currently_active || active_until <= now + 7 * 24 * 60 * 60;
    let state_html = if currently_active {
        format!(
            r#"<div class="card rm-promo-pending rm-promo-published">
    <div class="card-title">{title}</div>
    <div class="card-meta rm-promo-pending-copy">{body}</div>
</div>"#,
            title = crate::i18n::t("promo_active_title"),
            body = crate::i18n::tf(
                "promo_active_until",
                &[("date", &escape_html(&crate::internal_promotions::format_until(active_until)))]
            ),
        )
    } else {
        String::new()
    };
    let action_html = if renewal_open {
        format!(
            r#"<form method="post"
      action="/app/resource/{resource_id}/promote/request"
      class="ui-form rm-promo-form">
    <input type="hidden" name="target_id" value="0">
    <button type="submit" class="ui-button rm-promo-submit">
        {label}
    </button>
</form>"#,
            label = if currently_active {
                crate::i18n::t("promo_renew_button")
            } else {
                crate::i18n::t("promo_start_button")
            },
        )
    } else {
        format!(
            r#"<div class="card rm-promo-pending">
    <div class="card-title">{title}</div>
    <div class="card-meta rm-promo-pending-copy">
        {body}
    </div>
</div>"#,
            title = crate::i18n::t("promo_not_yet_title"),
            body = crate::i18n::t("promo_not_yet_body"),
        )
    };

    let content = format!(
        r#"<section class="card rm-promo-preview">
    <div class="rm-promo-preview-head">{preview_kicker}</div>
    <div class="rm-promo-preview-body">
        <div class="rm-promo-preview-category">{category}</div>
        <h2 class="rm-promo-preview-title">{title}</h2>
        <div class="rm-promo-preview-text">{description}</div>
        <div class="rm-promo-preview-address">{address}</div>
        <div class="rm-promo-preview-footer">{preview_footer}</div>
        <div class="rm-promo-preview-domain">grabitmap.com</div>
    </div>
</section>

<section class="card rm-promo-target-card">
    <div class="card-title">{discount_title}</div>
    <div class="card-meta rm-promo-target-copy">
        {discount_body}
    </div>
    <div class="card-meta rm-promo-target-note">
        {discount_note}
    </div>
</section>

{state_html}
{action_html}"#,
        preview_kicker = crate::i18n::t("promo_preview_kicker"),
        category = escape_html(category),
        title = escape_html(title),
        description = escape_html(description),
        address = escape_html(address),
        preview_footer = crate::i18n::t("promo_preview_footer"),
        discount_title = crate::i18n::t("promo_discount_title"),
        discount_body = crate::i18n::t("promo_discount_body"),
        discount_note = crate::i18n::t("promo_discount_note"),
    );

    page_shell(
        &format!("{} · GRABIT", crate::i18n::t("promo_title")),
        &topbar(&crate::i18n::t("promo_title"), "map-pin"),
        &back_hero(
            &back_link(
                &format!("/app/resource/{resource_id}"),
                &crate::i18n::t("common_listing"),
                "arrow-left",
            ),
            "map-pin",
            &crate::i18n::t("promo_eyebrow"),
            &crate::i18n::t("promo_hero_title"),
            &crate::i18n::t("promo_hero_copy"),
        ),
        &content,
        "",
    )
}

pub fn render_promotion_payment(
    resource_id: i64,
    request_id: i64,
    price_label: &str,
    bot_note: &str,
    bot_reason: Option<&str>,
    stripe_enabled: bool,
    mock_allowed: bool,
) -> String {
    let price = escape_html(price_label);
    let note = escape_html(bot_note);
    let reason_html = bot_reason
        .filter(|value| !value.trim().is_empty())
        .map(|value| {
            format!(
                r#"<div class="card-meta rm-promo-bot-reason">{}</div>"#,
                crate::i18n::tf("promo_bot_reason_label", &[("reason", &escape_html(value))])
            )
        })
        .unwrap_or_default();

    let (payment_form, payment_footnote) = if stripe_enabled {
        (
            format!(
                r#"<form method="post"
          action="/app/resource/{resource_id}/promote/pay/{request_id}"
          class="ui-form rm-promo-form">
        <button type="submit" class="ui-button rm-promo-submit">
            {label}
        </button>
    </form>"#,
                resource_id = resource_id,
                request_id = request_id,
                label = crate::i18n::tf("promo_pay_stripe_button", &[("price", &price)]),
            ),
            crate::i18n::t("promo_pay_stripe_note"),
        )
    } else if mock_allowed {
        (
            format!(
                r#"<form method="post"
          action="/app/resource/{resource_id}/promote/pay/{request_id}"
          class="ui-form rm-promo-form">
        <button type="submit" class="ui-button rm-promo-submit">
            {label}
        </button>
    </form>"#,
                resource_id = resource_id,
                request_id = request_id,
                label = crate::i18n::tf("promo_pay_mock_button", &[("price", &price)]),
            ),
            crate::i18n::t("promo_pay_mock_note"),
        )
    } else {
        (
            format!(
                r#"<div class="card-meta rm-promo-payment-unavailable">
        {}
    </div>"#,
                crate::i18n::t("promo_pay_unavailable")
            ),
            crate::i18n::t("promo_pay_unavailable_note"),
        )
    };

    let content = format!(
        r#"
<section class="card rm-promo-payment-card">
    <div class="card-title">{pay_title}</div>
    <div class="card-meta rm-promo-price-note">
        {pay_amount_prefix} <strong>{price}</strong>
    </div>
    <div class="card-meta">{note}</div>
    {reason_html}
    {payment_form}
    <div class="card-meta rm-promo-payment-footnote">
        {payment_footnote}
    </div>
</section>
"#,
        pay_title = crate::i18n::t("promo_pay_title"),
        pay_amount_prefix = crate::i18n::t("promo_pay_amount_prefix"),
        price = price,
        note = note,
        reason_html = reason_html,
        payment_form = payment_form,
        payment_footnote = escape_html(&payment_footnote),
    );

    page_shell(
        &format!("{} · GRABIT", crate::i18n::t("payment_title")),
        &topbar(&crate::i18n::t("payment_title"), "credit-card"),
        &back_hero(
            &back_link(
                &format!("/app/resource/{resource_id}/promote"),
                &crate::i18n::t("common_back"),
                "arrow-left",
            ),
            "credit-card",
            &crate::i18n::t("promo_title"),
            &crate::i18n::t("payment_title"),
            &crate::i18n::t("promo_pay_hero_copy"),
        ),
        &content,
        "",
    )
}

#[allow(clippy::type_complexity)]
pub fn render_admin_promotion_queue(
    rows: &[(i64, i64, String, String, String, String, String, i64)],
    notice: Option<&str>,
) -> String {
    fn listing_kind(raw: &str) -> &'static str {
        match raw.trim() {
            "seeker" => "Ищу работу",
            "offer" => "Предложение",
            _ => "Объявление",
        }
    }

    let cards = if rows.is_empty() {
        r#"<div class="card"><div class="card-meta">Нет оплаченных заявок, ожидающих модерации.</div></div>"#
            .to_string()
    } else {
        rows.iter()
            .map(
                |(
                    request_id,
                    resource_id,
                    title,
                    category,
                    listing_type,
                    bot_status,
                    bot_reason,
                    _created_at,
                )| {
                    let safe_title = escape_html(title);
                    let safe_category = escape_html(category);
                    let kind = escape_html(listing_kind(listing_type));
                    let safe_reason = escape_html(bot_reason);
                    format!(
                        r#"
<section class="card rm-admin-promo-card">
    <div class="card-title">{safe_title}</div>
    <div class="card-meta">{kind} · {safe_category} · ID {resource_id}</div>
    <div class="card-meta">Проверка бота: {bot_status}{reason}</div>
    <div class="rm-admin-promo-actions">
        <form method="post" action="/app/admin/promotion/{request_id}/approve">
            <button type="submit" class="ui-button">Одобрить и опубликовать</button>
        </form>
        <form method="post" action="/app/admin/promotion/{request_id}/reject">
            <button type="submit" class="ui-button rm-admin-reject-btn">Отклонить и вернуть оплату</button>
        </form>
    </div>
</section>
"#,
                        safe_title = safe_title,
                        kind = kind,
                        safe_category = safe_category,
                        resource_id = resource_id,
                        bot_status = escape_html(bot_status),
                        reason = if safe_reason.is_empty() {
                            String::new()
                        } else {
                            format!(" · {safe_reason}")
                        },
                        request_id = request_id,
                    )
                },
            )
            .collect::<Vec<_>>()
            .join("")
    };

    let notice_html = notice
        .filter(|value| !value.trim().is_empty())
        .map(|value| {
            format!(
                r#"<div class="card rm-admin-promo-notice" role="status">{}</div>"#,
                escape_html(value)
            )
        })
        .unwrap_or_default();

    page_shell(
        "Продвижение · Админ",
        &topbar("Продвижение", "megaphone"),
        &format!(
            r#"<section class="hero"><h1>Очередь продвижения</h1><p>Оплаченные заявки, требующие решения администратора.</p></section>{notice_html}"#,
            notice_html = notice_html,
        ),
        &cards,
        "",
    )
}

// ============================================================
// МОИ РЕСУРСЫ
// ============================================================

pub fn render_my_resources(
    client_id: &str,
    resources: Vec<crate::web::view_models::MyResourceRow>,
) -> String {
    let cards = if client_id.is_empty() {
        guest_locked_section(&crate::i18n::t("my_resources_title"), "/app/my-resources")
    } else if resources.is_empty() {
        empty_state_card_with_actions(
            &crate::i18n::t("my_resources_empty_title"),
            &crate::i18n::t("my_resources_empty_body"),
            &format!(
                "{}{}",
                empty_state_action("/app/add", &crate::i18n::t("resource_add_action")),
                empty_state_action("/app", &crate::i18n::t("open_cities_action")),
            ),
        )
    } else {
        resources
            .iter()
            .map(|(
                id,
                title,
                category,
                description,
                rating,
                votes,
                _verified,
                premium,
                moderation_status,
                rejection_reason,
                is_active,
                listing_type,
                row_rubric,
            )| {
                let safe_title = escape_html(title);
                let safe_description = escape_html(description);
                let safe_rejection_reason = escape_html(rejection_reason);
                let category_label = if !is_generic_profession_key(row_rubric) {
                    let rubric_label = profession_label(row_rubric);
                    if rubric_label.is_empty() {
                        profession_label(category)
                    } else {
                        rubric_label
                    }
                } else {
                    profession_label(category)
                };
                let category_line = format!(
                    "{} · {}",
                    resource_listing_label(listing_type),
                    escape_html(&category_label)
                );

                let premium_badge = if *premium != 0 {
                    premium_badge_html("compact")
                } else { String::new() };

                let moderation_badge =
                    my_resource_moderation_badge(*is_active, moderation_status);

                let hidden_html =
                    if *is_active == 0
                        && moderation_status != "rejected"
                    {
                        format!(
                            r#"<div class="rm-my-resource-note rm-my-resource-note--hidden"><strong>{lead}</strong> {body}</div>"#,
                            lead = crate::i18n::t("my_resource_hidden_lead"),
                            body = crate::i18n::t("my_resource_hidden_body"),
                        )
                    } else {
                        String::new()
                    };

                let promotion_button =
                    if moderation_status == "approved"
                        && *is_active == 1
                    {
                        format!(
                            r#"<a href="/app/resource/{id}/promote" class="rm-my-resource-action rm-my-resource-action--gold">{label}</a>"#,
                            id = id,
                            label = crate::i18n::t("promo_button_short"),
                        )
                    } else {
                        String::new()
                    };

                let rejection_html =
                    if moderation_status == "rejected"
                        && !rejection_reason.trim().is_empty()
                    {
                        format!(
                            r#"<div class="rm-my-resource-note rm-my-resource-note--rejected"><strong>{label}</strong> {reason}</div>"#,
                            label = crate::i18n::t("rejection_reason_label"),
                            reason = safe_rejection_reason
                        )
                    } else {
                        String::new()
                    };

                format!(
                    r#"
                    <article class="card rm-my-resource-card">

                        <div class="rm-my-resource-layout">

                            <div class="card-icon rm-my-resource-icon">
                                {icon}
                            </div>

                            <div class="rm-my-resource-body">

                                <div class="rm-my-resource-head">
                                    <div class="rm-my-resource-title-wrap">
                                        <div class="card-title rm-my-resource-title">
                                            {title}
                                        </div>

                                        <div class="card-meta rm-my-resource-category">
                                            {category}
                                        </div>
                                    </div>

                                    <div class="rm-my-resource-rating">
                                        {rating_label} {rating:.1} · {votes}
                                    </div>
                                </div>

                                <div class="card-meta rm-my-resource-desc">
                                    {description}
                                </div>

                                <div class="rm-my-resource-badges">
                                    {premium_badge}
                                    {moderation_badge}
                                </div>

                                {rejection_html}
                                {hidden_html}

                                <div class="rm-my-resource-actions">

                                    <a href="/app/resource/{id}/edit"
                                       class="rm-my-resource-action rm-my-resource-action--edit">
                                        {edit_icon} {edit_label}
                                    </a>

                                    {promotion_button}

                                    <a href="/app/listing/{id}"
                                       class="rm-my-resource-action rm-my-resource-action--neutral">
                                        {open_label}
                                    </a>

                                </div>
                            </div>
                        </div>

                    </article>
                    "#,
                    id = id,
                    icon = icon("map-pin"),
                    edit_icon = icon("edit"),
                    edit_label = crate::i18n::t("common_edit"),
                    open_label = crate::i18n::t("common_open"),
                    title = safe_title,
                    category = category_line,
                    description = safe_description,
                    rating_label = crate::i18n::t("rating_label"),
                    rating = rating,
                    votes = plural_count(*votes, "count_vote_one", "count_vote_few", "count_vote_many"),
                    premium_badge = premium_badge,
                    moderation_badge = moderation_badge,
                    rejection_html = rejection_html,
                    hidden_html = hidden_html,
                    promotion_button = promotion_button,
                )
            })
            .collect::<Vec<_>>()
            .join("")
    };

    let content = format!(
        r#"<section>
    {cards}
</section>"#,
        cards = cards,
    );

    page_shell(
        &format!("{} · GRABIT", crate::i18n::t("my_resources_title")),
        &topbar(&crate::i18n::t("my_resources_title"), "map"),
        &back_hero(
            &back_link("/app/me", &crate::i18n::t("common_profile"), "arrow-left"),
            "user",
            &crate::i18n::t("management_eyebrow"),
            &crate::i18n::t("my_resources_title"),
            &crate::i18n::t("my_resources_hero_copy"),
        ),
        &content,
        &bottom_nav("menu"),
    )
}

pub struct RenderEditResourceParams<'a> {
    pub id: i64,
    pub title: &'a str,
    pub description: &'a str,
    pub contact: &'a str,
    pub address: &'a str,
    pub category: &'a str,
    pub listing_type: &'a str,
    pub rubric: &'a str,
}

pub fn render_edit_resource(params: RenderEditResourceParams<'_>) -> String {
    let RenderEditResourceParams {
        id,
        title,
        description,
        contact,
        address,
        category,
        listing_type,
        rubric,
    } = params;
    let safe_title = escape_html(title);
    let safe_description = escape_html(description);
    let safe_contact = escape_html(contact);
    let safe_address = escape_html(address);
    let listing_type_field = if crate::catalog::by_id(rubric)
        .map(|item| item.kind == crate::catalog::RubricKind::Work)
        .unwrap_or_else(|| category.eq_ignore_ascii_case("work"))
    {
        let offer_selected = if listing_type != "seeker" {
            " selected"
        } else {
            ""
        };
        let seeker_selected = if listing_type == "seeker" {
            " selected"
        } else {
            ""
        };

        format!(
            r#"
    <label class="ui-field">
        <span class="ui-field-label">{field_label}</span>
        <select name="listing_type" class="ui-input">
            <option value="offer"{offer_selected}>{offer_label}</option>
            <option value="seeker"{seeker_selected}>{seeker_label}</option>
        </select>
    </label>
"#,
            field_label = crate::i18n::t("field_listing_type"),
            offer_selected = offer_selected,
            offer_label = crate::i18n::t("common_offer"),
            seeker_selected = seeker_selected,
            seeker_label = crate::i18n::t("common_seeker"),
        )
    } else {
        String::new()
    };
    let rubric_field = rubric_select_html(
        rubric,
        if category.eq_ignore_ascii_case("work") {
            Some(crate::catalog::RubricKind::Work)
        } else {
            Some(crate::catalog::RubricKind::Business)
        },
    );
    let content = format!(
        r####"<form method="post"
      action="/app/resource/{id}/edit"
      class="ui-form ui-form-stack">

    {rubric_field}

    {listing_type_field}

    <label class="ui-field">
        <span class="ui-field-label">{title_label}</span>
        <input
            name="title"
            required
            maxlength="120"
            value="{title}"
            class="ui-input">
    </label>

    <label class="ui-field">
        <span class="ui-field-label">{description_label}</span>
        <textarea
            name="description"
            required
            maxlength="1000"
            rows="6"
            class="ui-textarea">{description}</textarea>
    </label>

    <label class="ui-field">
        <span class="ui-field-label">{contact_label}</span>
        <input
            name="contact"
            maxlength="120"
            value="{contact}"
            class="ui-input">
    </label>

    <label class="ui-field">
        <span class="ui-field-label">{address_label}</span>
        <input
            name="address"
            maxlength="250"
            value="{address}"
            class="ui-input">
    </label>

    <button type="submit" class="ui-button rm-auth-button">
        {save_label}
    </button>

    <div class="ui-form-note">
        {resave_note}
    </div>

</form>"####,
        id = id,
        listing_type_field = listing_type_field,
        rubric_field = rubric_field,
        title_label = crate::i18n::t("field_title"),
        title = safe_title,
        description_label = crate::i18n::t("field_description"),
        description = safe_description,
        contact_label = crate::i18n::t("field_contact"),
        contact = safe_contact,
        address_label = crate::i18n::t("field_address"),
        address = safe_address,
        save_label = crate::i18n::t("save_changes_button"),
        resave_note = crate::i18n::t("edit_resave_note"),
    );

    page_shell(
        &format!("{} · GRABIT", crate::i18n::t("edit_resource_title")),
        &topbar(&crate::i18n::t("edit_title"), "map"),
        &back_hero(
            &back_link(
                &format!("/app/listing/{}", id),
                &crate::i18n::t("back_to_listing"),
                "arrow-left",
            ),
            "edit",
            &crate::i18n::t("edit_title"),
            &crate::i18n::t("edit_resource_title"),
            &crate::i18n::tf("rubric_prefix_label", &[("rubric", &profession_label(rubric))]),
        ),
        &content,
        &bottom_nav("menu"),
    )
}

pub fn render_add_rubric_picker(
    ci: usize,
    si: usize,
    zi: usize,
    category: &str,
    listing_type: Option<&str>,
) -> String {
    let category_url = urlencoding::encode(category);
    let back_url = match listing_type {
        Some("seeker") => format!("/app/{ci}/{si}/{zi}/cat/{category_url}?type=seeker"),
        Some("offer") => format!("/app/{ci}/{si}/{zi}/cat/{category_url}?type=offer"),
        _ => format!("/app/{ci}/{si}/{zi}/cat/{category_url}"),
    };
    let rubric_kind = if category.eq_ignore_ascii_case("work") {
        crate::catalog::RubricKind::Work
    } else {
        crate::catalog::RubricKind::Business
    };
    let type_query = match listing_type {
        Some("seeker") => "type=seeker&",
        Some("offer") => "type=offer&",
        _ => "",
    };
    let mut cards = String::new();
    for rubric in crate::catalog::by_kind(rubric_kind) {
        cards.push_str(&navigation_card(
            &format!(
                "/app/{ci}/{si}/{zi}/cat/{category_url}/add?{type_query}rubric={}",
                urlencoding::encode(rubric.id)
            ),
            if rubric_kind == crate::catalog::RubricKind::Work {
                "briefcase"
            } else {
                "building"
            },
            rubric.label,
            &crate::i18n::t("rubric_pick_hint"),
        ));
    }

    let heading = match listing_type {
        Some("seeker") => crate::i18n::t("add_heading_seeker"),
        Some("offer") => crate::i18n::t("add_heading_offer"),
        _ => crate::i18n::t("add_heading_default"),
    };

    page_shell(
        &format!("{} · GRABIT", crate::i18n::t("rubric_picker_title")),
        &topbar(&crate::i18n::t("new_resource_title"), "globe"),
        &back_hero(
            &back_link(&back_url, &crate::i18n::t("common_back"), "chevron"),
            "map",
            &crate::i18n::t("rubric_first_eyebrow"),
            &heading,
            &crate::i18n::t("rubric_picker_copy"),
        ),
        &format!(r#"<div class="grid">{cards}</div>"#, cards = cards),
        &bottom_nav("map"),
    )
}

fn rubric_select_html(selected: &str, kind: Option<crate::catalog::RubricKind>) -> String {
    let mut options = format!(
        r#"<option value="">{}</option>"#,
        crate::i18n::t("select_placeholder")
    );
    let work_group_label = crate::i18n::t("rubric_group_work");
    let business_group_label = crate::i18n::t("common_business");
    let groups = match kind {
        Some(crate::catalog::RubricKind::Work) => {
            vec![(crate::catalog::RubricKind::Work, work_group_label.as_str())]
        }
        Some(crate::catalog::RubricKind::Business) => {
            vec![(crate::catalog::RubricKind::Business, business_group_label.as_str())]
        }
        None => vec![
            (crate::catalog::RubricKind::Work, work_group_label.as_str()),
            (crate::catalog::RubricKind::Business, business_group_label.as_str()),
        ],
    };

    for (group_kind, group_label) in groups {
        options.push_str(&format!(
            r#"<optgroup label="{}">"#,
            escape_html(group_label)
        ));
        for rubric in crate::catalog::by_kind(group_kind) {
            let selected_attr = if selected == rubric.id {
                " selected"
            } else {
                ""
            };
            options.push_str(&format!(
                r#"<option value="{id}"{selected_attr}>{label}</option>"#,
                id = escape_html(rubric.id),
                selected_attr = selected_attr,
                label = escape_html(rubric.label),
            ));
        }
        options.push_str("</optgroup>");
    }

    format!(
        r#"
    <label class="ui-field">
        <span class="ui-field-label">{field_label}</span>
        <select name="rubric" required class="ui-input">
            {options}
        </select>
    </label>
"#,
        field_label = crate::i18n::t("field_rubric"),
        options = options,
    )
}

pub struct AddResourceDraft<'a> {
    pub title: &'a str,
    pub description: &'a str,
    pub contact: &'a str,
    pub address: &'a str,
}

#[allow(clippy::too_many_arguments)]
pub fn render_add_resource(
    ci: usize,
    si: usize,
    zi: usize,
    category: &str,
    listing_type: Option<&str>,
    rubric: &crate::catalog::Rubric,
    draft: Option<AddResourceDraft<'_>>,
    error: Option<&str>,
) -> String {
    let category_url = urlencoding::encode(category);
    let picker_url = match listing_type {
        Some("seeker") => format!("/app/{ci}/{si}/{zi}/cat/{category_url}/add?type=seeker"),
        Some("offer") => format!("/app/{ci}/{si}/{zi}/cat/{category_url}/add?type=offer"),
        _ => format!("/app/{ci}/{si}/{zi}/cat/{category_url}/add"),
    };
    let listing_hidden = match listing_type {
        Some("seeker") => r#"<input type="hidden" name="listing_type" value="seeker">"#,
        Some("offer") => r#"<input type="hidden" name="listing_type" value="offer">"#,
        _ => "",
    };
    let heading = match listing_type {
        Some("seeker") => crate::i18n::t("common_seeker"),
        Some("offer") => crate::i18n::t("resource_form_heading_offer"),
        _ => crate::i18n::t("new_resource_title"),
    };

    let error_html = error
        .filter(|value| !value.trim().is_empty())
        .map(error_status_html)
        .unwrap_or_default();
    let title_value = draft.as_ref().map(|value| value.title).unwrap_or("");
    let description_value = draft.as_ref().map(|value| value.description).unwrap_or("");
    let contact_value = draft.as_ref().map(|value| value.contact).unwrap_or("");
    let address_value = draft.as_ref().map(|value| value.address).unwrap_or("");

    let content = format!(
        r####"{error_html}
<form method="post"
      action="/app/{ci}/{si}/{zi}/cat/{category_url}/add"
      class="ui-form ui-form-stack">

    {listing_hidden}
    <input type="hidden" name="rubric" value="{rubric_id}">

    <div class="ui-field">
        <span class="ui-field-label">{rubric_field_label}</span>
        <div class="card-title">{rubric_label}</div>
        <a class="card-meta" href="{picker_url}">{change_rubric_label}</a>
    </div>

    <label class="ui-field">
        <span class="ui-field-label">{title_label}</span>
        <input
            name="title"
            required
            maxlength="120"
            placeholder="{title_placeholder}"
            class="ui-input"
            value="{title_value}">
    </label>

    <label class="ui-field">
        <span class="ui-field-label">{description_label}</span>
        <textarea
            name="description"
            required
            maxlength="1000"
            rows="5"
            placeholder="{description_placeholder}"
            class="ui-textarea">{description_value}</textarea>
    </label>

    <label class="ui-field">
        <span class="ui-field-label">{contact_label}</span>
        <input
            name="contact"
            required
            maxlength="120"
            placeholder="{contact_placeholder}"
            class="ui-input"
            value="{contact_value}">
    </label>

    <label class="ui-field">
        <span class="ui-field-label">{address_label}</span>
        <input
            name="address"
            maxlength="200"
            placeholder="{address_placeholder}"
            class="ui-input"
            value="{address_value}">
    </label>

    <button type="submit" class="ui-button rm-auth-button">
        {publish_label}
    </button>

</form>"####,
        error_html = error_html,
        ci = ci,
        si = si,
        zi = zi,
        category_url = category_url,
        listing_hidden = listing_hidden,
        rubric_id = escape_html(rubric.id),
        rubric_field_label = crate::i18n::t("field_rubric"),
        rubric_label = escape_html(rubric.label),
        picker_url = escape_html(&picker_url),
        change_rubric_label = crate::i18n::t("change_rubric_action"),
        title_label = crate::i18n::t("field_title"),
        title_placeholder = escape_html(&crate::i18n::t("placeholder_title")),
        title_value = escape_html(title_value),
        description_label = crate::i18n::t("field_description"),
        description_placeholder = escape_html(&crate::i18n::t("placeholder_description")),
        description_value = escape_html(description_value),
        contact_label = crate::i18n::t("field_contact"),
        contact_placeholder = escape_html(&crate::i18n::t("placeholder_contact")),
        contact_value = escape_html(contact_value),
        address_label = crate::i18n::t("field_address"),
        address_placeholder = escape_html(&crate::i18n::t("placeholder_address")),
        address_value = escape_html(address_value),
        publish_label = crate::i18n::t("publish_button"),
    );

    page_document(
        &format!("{} · GRABIT", crate::i18n::t("add_resource_page_title")),
        "",
        "",
        &format!(
            "{topbar}\n\n{hero}\n\n{content}",
            topbar = topbar(&crate::i18n::t("new_resource_title"), "globe"),
            hero = back_hero(
                &back_link(&picker_url, &crate::i18n::t("back_to_rubrics"), "chevron"),
                "briefcase",
                &heading,
                rubric.label,
                &crate::i18n::t("add_resource_hero_copy"),
            ),
            content = content,
        ),
        &bottom_nav("map"),
        "",
    )
}

#[cfg(test)]
mod catalog_publish_tests {
    use super::*;

    #[test]
    fn add_flow_starts_with_fixed_work_rubrics() {
        let html = render_add_rubric_picker(0, 0, 0, "work", Some("offer"));

        assert!(html.contains("Охрана"));
        assert!(html.contains("rubric=security"));
        assert!(html.contains("Какая вакансия?"));
    }

    #[test]
    fn add_form_locks_selected_rubric() {
        let rubric = crate::catalog::by_id("security").expect("security rubric");
        let html = render_add_resource(0, 0, 0, "work", Some("offer"), rubric, None, None);

        assert!(html.contains(r#"name="rubric""#));
        assert!(html.contains("security"));
        assert!(html.contains("Охрана"));
        assert!(html.contains("Изменить рубрику"));
    }

    #[test]
    fn owner_preview_explains_pending_and_hides_public_actions() {
        let html = render_resource_profile(RenderResourceProfileParams {
            id: 7,
            title: "Охранник в Ницце",
            description: "Ночная смена",
            contact: "@owner",
            address: "Nice",
            rating: 0.0,
            votes: 0,
            premium: 0,
            verified: 0,
            category: "work",
            listing_type: "seeker",
            continent_index: 0,
            country_index: 0,
            city_index: 0,
            city_id: Some(13),
            _created_at: 0,
            owner_public_id: "abc",
            owner_user_id: 0,
            rubric: "security",
            owner_preview: true,
            moderation_status: "pending",
            is_active: 1,
            viewer_score: 0,
            viewer_favorite: false,
        });

        assert!(html.contains("На проверке"));
        assert!(html.contains("Другие участники это объявление пока не видят"));
        assert!(html.contains("/app/my-resources"));
        // Check element ids rather than translated text or CSS class names:
        // the full i18n message table (all locale strings) and the shared
        // stylesheet (all class rules) are always embedded on the page, so
        // both would appear here regardless of whether this markup renders.
        assert!(!html.contains("id=\"favorite-button\""));
        assert!(!html.contains("id=\"report-status\""));
        assert!(html.contains("noindex"));
    }

    #[test]
    fn public_listing_has_external_and_internal_share_metadata() {
        let html = render_resource_profile(RenderResourceProfileParams {
            id: 7,
            title: "Охранник в Ницце",
            description: "Ночная смена",
            contact: "@owner",
            address: "Nice",
            rating: 0.0,
            votes: 0,
            premium: 0,
            verified: 1,
            category: "work",
            listing_type: "seeker",
            continent_index: 0,
            country_index: 0,
            city_index: 0,
            city_id: Some(13),
            _created_at: 0,
            owner_public_id: "abc",
            owner_user_id: 9,
            rubric: "security",
            owner_preview: false,
            moderation_status: "approved",
            is_active: 1,
            viewer_score: 0,
            viewer_favorite: false,
        });

        assert!(html.contains("property=\"og:title\" content=\"Охранник в Ницце\""));
        assert!(html.contains("property=\"og:image\""));
        assert!(html.contains("/app/messages?share=7"));
        assert!(html.contains("data-share-url=\"/app/listing/7\""));
    }
}
