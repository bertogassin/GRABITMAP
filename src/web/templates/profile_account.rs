use super::common::{
    back_hero, back_link, bottom_nav, bottom_nav_with_badges, empty_state_action,
    empty_state_card_with_actions, escape_html, guest_locked_section, guest_mode_panel, icon,
    is_generic_profession_key, js_string, moderator_level_badge, navigation_card, page_document,
    page_shell, plural_count, plural_word, premium_badge_html, profession_label,
    profile_resource_card, section_head, simple_hero, topbar, verified_badge_html,
};

pub struct RenderMeParams<'a> {
    pub authenticated: bool,
    pub username: &'a str,
    pub first_name: &'a str,
    pub last_name: &'a str,
    pub resources_count: i64,
    pub approved_count: i64,
    pub pending_count: i64,
    pub rejected_count: i64,
    pub favorites_count: i64,
    pub unread_notifications_count: i64,
    pub unread_messages_count: i64,
    pub moderator_level: i64,
    pub intent_text: &'a str,
    pub intent_until: i64,
    pub category: &'a str,
    pub home_continent_index: i64,
    pub home_country_index: i64,
    pub home_city_index: i64,
    pub user_sessions: Vec<crate::web::view_models::UserSessionRow>,
    pub invite_public_id: &'a str,
    pub has_avatar: bool,
}

fn home_city_select_html(continent: i64, country: i64, city: i64) -> String {
    let world_data = crate::geography::world();
    let mut options = format!(
        r#"<option value="">{}</option>"#,
        crate::i18n::t("city_not_specified")
    );

    for (ci, (continent_name, countries)) in world_data.iter().enumerate() {
        let ci = ci as i64;
        options.push_str(&format!(
            r#"<optgroup label="{}">"#,
            escape_html(continent_name)
        ));

        for (si, (country_name, cities)) in countries.iter().enumerate() {
            let si = si as i64;
            for (zi, city_name) in cities.iter().enumerate() {
                let zi = zi as i64;
                let selected = if continent == ci && country == si && city == zi {
                    " selected"
                } else {
                    ""
                };
                options.push_str(&format!(
                    r#"<option value="{ci}:{si}:{zi}"{selected}>{} · {}</option>"#,
                    escape_html(city_name),
                    escape_html(country_name),
                ));
            }
        }

        options.push_str("</optgroup>");
    }

    format!(
        r#"
    <label class="rm-profile-field rm-profile-field--spaced">
        <div class="rm-profile-field-label">
            {field_label}
        </div>
        <select id="profile-home-city" class="ui-select">
            {options}
        </select>
        <div class="card-meta">
            {hint}
        </div>
    </label>
"#,
        field_label = crate::i18n::t("field_home_city"),
        options = options,
        hint = crate::i18n::t("home_city_hint"),
    )
}

fn session_device_label(user_agent: &str) -> String {
    let agent = user_agent.to_lowercase();

    if agent.contains("telegram") {
        "Telegram".to_string()
    } else if agent.contains("android") {
        "Android".to_string()
    } else if agent.contains("iphone") || agent.contains("ipad") {
        "iPhone / iPad".to_string()
    } else if agent.contains("windows") {
        "Windows".to_string()
    } else if agent.contains("mac os") || agent.contains("macintosh") {
        "Mac".to_string()
    } else {
        crate::i18n::t("device_browser")
    }
}

fn render_user_sessions_panel(sessions: &[crate::web::view_models::UserSessionRow]) -> String {
    if sessions.is_empty() {
        return String::new();
    }

    let rows = sessions
        .iter()
        .map(|session| {
            let device = session_device_label(&session.user_agent);
            let ip = if session.ip_address.is_empty() {
                crate::i18n::t("ip_unknown")
            } else {
                escape_html(&session.ip_address)
            };
            let current = if session.is_current {
                format!(r#"<span class="rm-session-current">{}</span>"#, crate::i18n::t("this_device_tag"))
            } else {
                String::new()
            };
            let revoke_form = if session.is_current {
                String::new()
            } else {
                format!(
                    r#"<form method="post" action="/app/sessions/revoke" class="rm-session-form">
    <input type="hidden" name="session_public_id" value="{session_id}">
    <button type="submit" class="ui-button rm-session-revoke-btn">
        {label}
    </button>
</form>"#,
                    session_id = escape_html(&session.session_public_id),
                    label = crate::i18n::t("end_session_button"),
                )
            };

            format!(
                r#"<div class="rm-session-row">
    <div>
        <strong>{device}</strong>
        <div class="card-meta rm-session-ip">{ip}</div>
        {current}
    </div>
    {revoke_form}
</div>"#,
                device = device,
                ip = ip,
                current = current,
                revoke_form = revoke_form,
            )
        })
        .collect::<Vec<_>>()
        .join("");

    format!(
        r#"<section class="rm-sessions-panel">
    <div class="card-title rm-sessions-title">
        {title}
    </div>
    <div class="card-meta rm-sessions-copy">
        {copy}
    </div>
    {rows}
    <form method="post" action="/app/sessions/revoke-others" class="rm-sessions-revoke-all">
        <button type="submit" class="ui-button rm-sessions-revoke-all-btn">
            {logout_others}
        </button>
    </form>
</section>"#,
        title = crate::i18n::t("active_sessions_title"),
        copy = crate::i18n::t("active_sessions_copy"),
        rows = rows,
        logout_others = crate::i18n::t("logout_other_devices_button"),
    )
}

fn render_change_password_section() -> String {
    format!(
        r#"<details class="card">
    <summary class="rm-profile-section-title">{title}</summary>
    <div class="rm-danger-zone-body">
        <form method="post" action="/app/account/password" class="rm-danger-zone-form">
            <label class="rm-auth-label" for="current-password-input">{current_label}</label>
            <input id="current-password-input" name="current_password" type="password"
                   class="ui-input rm-auth-input" autocomplete="current-password" required>

            <label class="rm-auth-label" for="new-password-input">{new_label}</label>
            <input id="new-password-input" name="new_password" type="password"
                   class="ui-input rm-auth-input" autocomplete="new-password" minlength="8" required>

            <label class="rm-auth-label" for="new-password-confirm-input">{confirm_label}</label>
            <input id="new-password-confirm-input" name="new_password_confirm" type="password"
                   class="ui-input rm-auth-input" autocomplete="new-password" minlength="8" required>

            <button type="submit" class="ui-button">{title}</button>
        </form>
    </div>
</details>"#,
        title = crate::i18n::t("change_password_action"),
        current_label = crate::i18n::t("current_password_label"),
        new_label = crate::i18n::t("new_password_label"),
        confirm_label = crate::i18n::t("confirm_new_password_label"),
    )
}

fn render_account_danger_zone() -> String {
    format!(
        r#"<details class="card rm-danger-zone">
    <summary class="rm-danger-zone-summary">{title}</summary>
    <div class="rm-danger-zone-body">
        <p class="card-meta">
            {warning}
        </p>
        <form method="post" action="/app/account/delete" class="rm-danger-zone-form">
            <label class="rm-auth-label" for="delete-password-input">{password_label}</label>
            <input id="delete-password-input"
                   name="password"
                   type="password"
                   class="ui-input rm-auth-input"
                   autocomplete="current-password"
                   required>
            <button type="submit" class="ui-button rm-session-revoke-btn">
                {title}
            </button>
        </form>
    </div>
</details>"#,
        title = crate::i18n::t("delete_account_action"),
        warning = crate::i18n::t("delete_account_warning"),
        password_label = crate::i18n::t("auth_password"),
    )
}

fn count_badge(count: i64) -> String {
    if count <= 0 {
        return String::new();
    }

    format!(r#"<span class="rm-command-badge">{count}</span>"#)
}

pub fn render_me(params: RenderMeParams<'_>) -> String {
    let RenderMeParams {
        authenticated,
        username,
        first_name,
        last_name,
        resources_count,
        approved_count,
        pending_count,
        rejected_count,
        favorites_count,
        unread_notifications_count,
        unread_messages_count,
        moderator_level,
        intent_text,
        intent_until,
        category,
        home_continent_index,
        home_country_index,
        home_city_index,
        user_sessions,
        invite_public_id,
        has_avatar,
    } = params;
    let safe_username = escape_html(username);
    let safe_first_name = escape_html(first_name);
    let safe_last_name = escape_html(last_name);
    let safe_intent_text = escape_html(intent_text);
    let safe_category = crate::catalog::resolve(category)
        .map(|rubric| escape_html(rubric.label))
        .unwrap_or_default();

    let intent_status_text = if safe_intent_text.is_empty() {
        crate::i18n::t("status_not_set")
    } else if intent_until > 0 {
        safe_intent_text.to_string()
    } else {
        safe_intent_text.clone()
    };

    let full_name = format!("{} {}", safe_first_name, safe_last_name,)
        .trim()
        .to_string();

    let display_name = if !full_name.is_empty() {
        full_name
    } else if !safe_username.is_empty() {
        format!("@{}", safe_username)
    } else if authenticated {
        crate::i18n::t("user_fallback_label")
    } else {
        crate::i18n::t("guest_fallback_label")
    };

    let moderator_badge = if moderator_level > 0 {
        moderator_level_badge(moderator_level)
    } else {
        String::new()
    };

    let username_html = if !safe_username.is_empty() {
        format!(r#"<div class="rm-me-username">@{}</div>"#, safe_username)
    } else if authenticated {
        format!(r#"<div class="rm-me-username rm-me-username--guest">{}</div>"#, crate::i18n::t("account_label"))
    } else {
        String::new()
    };

    let telegram_id_html = if authenticated && !invite_public_id.is_empty() {
        format!(
            r#"<div class="rm-me-account-id">{} · {}</div>"#,
            crate::i18n::t("account_number_label"),
            escape_html(invite_public_id)
        )
    } else {
        String::new()
    };

    let account_header = if authenticated {
        format!(
            r#"
<div class="card rm-me-account-card">

    <div class="rm-me-account-row">

        <div class="rm-me-avatar">
            {avatar_html}
        </div>

        <div class="rm-me-name-wrap">

            <div class="rm-me-name">
                {display_name}
            </div>

            {username_html}
            {moderator_badge}

            {telegram_id_html}

        </div>

    </div>

</div>
"#,
            avatar_html = if has_avatar {
                format!(
                    r#"<img class="rm-me-avatar-img" src="/api/public-avatars/{}" alt="">"#,
                    urlencoding::encode(invite_public_id)
                )
            } else {
                icon("user").to_string()
            },
            display_name = display_name,
            username_html = username_html,
            telegram_id_html = telegram_id_html,
            moderator_badge = moderator_badge,
        )
    } else {
        format!(
            "{}{}",
            guest_mode_panel("/app/me"),
            navigation_card(
                "/app/search",
                "search",
                &crate::i18n::t("search_first_title"),
                &crate::i18n::t("search_first_body"),
            ),
        )
    };

    let account_header = if authenticated {
        format!(
            r#"{account_header}
<form method="post"
      action="/app/logout"
      class="rm-me-logout-form">
    <button type="submit"
            class="ui-button rm-me-logout-btn">
        {logout_button}
    </button>
</form>
{sessions_panel}
{password_section}
{danger_zone}"#,
            logout_button = crate::i18n::t("logout_button"),
            account_header = account_header,
            sessions_panel = render_user_sessions_panel(&user_sessions),
            password_section = render_change_password_section(),
            danger_zone = render_account_danger_zone(),
        )
    } else {
        account_header
    };

    let statistics = if authenticated {
        format!(
            r#"
<div class="rm-me-stats">

    <div class="card rm-me-stat-card">
        <div class="rm-me-stat-value">
            {resources_count}
        </div>
        <div class="card-meta rm-me-stat-meta">
            {my_resources_label}
        </div>
    </div>

    <div class="card rm-me-stat-card">
        <div class="rm-me-stat-value">
            {favorites_count}
        </div>
        <div class="card-meta rm-me-stat-meta">
            {favorites_label}
        </div>
    </div>

    <div class="card rm-me-stat-card">
        <div class="rm-me-stat-value rm-me-stat-value--md rm-me-stat-value--ok">
            {approved_count}
        </div>
        <div class="card-meta rm-me-stat-meta">
            {approved_label}
        </div>
    </div>

    <div class="card rm-me-stat-card">
        <div class="rm-me-stat-value rm-me-stat-value--md rm-me-stat-value--warn">
            {pending_count}
        </div>
        <div class="card-meta rm-me-stat-meta">
            {pending_label}
        </div>
    </div>

</div>

<div class="card rm-me-rejected-row">

    <div class="card-content">
        <div class="card-title rm-me-rejected-title">
            {rejected_label}
        </div>

        <div class="card-meta rm-me-rejected-copy">
            {rejected_hint}
        </div>
    </div>

    <div class="rm-me-rejected-count">
        {rejected_count}
    </div>

</div>
"#,
            resources_count = resources_count,
            my_resources_label = crate::i18n::t("my_resources_title"),
            favorites_count = favorites_count,
            favorites_label = crate::i18n::t("common_favorites"),
            approved_count = approved_count,
            approved_label = crate::i18n::t("approved_label"),
            pending_count = pending_count,
            pending_label = crate::i18n::t("moderation_pending_title"),
            rejected_label = crate::i18n::t("rejected_label"),
            rejected_hint = crate::i18n::t("rejected_hint"),
            rejected_count = rejected_count,
        )
    } else {
        String::new()
    };

    let personal_center = if authenticated {
        let attention_count = pending_count
            .saturating_add(rejected_count)
            .saturating_add(unread_notifications_count)
            .saturating_add(unread_messages_count);

        let availability_class = "available";
        let availability_text = crate::i18n::t("available_now_label");

        let category_text = crate::catalog::resolve(category)
            .map(|rubric| rubric.label.to_string())
            .unwrap_or_else(|| crate::i18n::t("no_direction_label"));

        let admin_navigation = if moderator_level > 0 {
            let (title, description, level_label) = if moderator_level == 5 {
                (
                    crate::i18n::t("owner_center_title"),
                    crate::i18n::t("owner_center_desc"),
                    crate::i18n::t("owner_level_label"),
                )
            } else {
                (
                    crate::i18n::t("admin_center_title"),
                    crate::i18n::t("admin_center_desc"),
                    crate::i18n::tf("admin_level_label", &[("level", &moderator_level.to_string())]),
                )
            };

            format!(
                r#"<a class="rm-command-card rm-admin-command"
                       href="/app/center" data-owner-center-entry>
                    <span class="rm-command-icon">{}</span>
                    <span class="rm-command-copy">
                        <strong>{title}</strong>
                        <small>{description}</small>
                    </span>
                    <span class="rm-command-badge">{level_label}</span>
                    <span class="rm-command-arrow">{}</span>
                </a>"#,
                icon("shield"),
                icon("chevron"),
                title = title,
                description = description,
                level_label = level_label,
            )
        } else {
            String::new()
        };

        format!(
            r#"
<style id="resursmap-personal-center-v1">
.rm-personal-center {{
    --center-gold: var(--emphasis);
    --center-green: var(--success);
    --center-blue: var(--info);
    --center-red: var(--danger);
    position:relative;
    overflow:hidden;
    margin-bottom:24px;
    padding:24px;
    border:1px solid rgba(var(--text-rgb),.30);
    border-radius:26px;
    background: transparent;
    box-shadow:
        0 24px 68px rgba(0,0,0,.30),
        0 0 48px rgba(var(--text-rgb),.06);
}}
.rm-personal-center::after {{
    content:"";
    position:absolute;
    width:230px;
    height:230px;
    top:-145px;
    right:-115px;
    border:1px solid rgba(var(--text-rgb),.17);
    border-radius:50%;
    box-shadow:
        0 0 0 35px rgba(var(--text-rgb),.025),
        0 0 0 72px rgba(119,87,185,.025);
    pointer-events:none;
}}
.rm-center-kicker {{
    position:relative;
    z-index:1;
    color:var(--center-gold);
    font-size:10px;
    font-weight:950;
    letter-spacing:.18em;
}}
.rm-center-heading {{
    position:relative;
    z-index:1;
    margin:10px 0 7px;
    font-size:clamp(27px,7vw,43px);
    line-height:1;
    letter-spacing:-.04em;
}}
.rm-center-subtitle {{
    position:relative;
    z-index:1;
    max-width:620px;
    margin:0;
    color:var(--muted);
    font-size:13px;
    line-height:1.6;
}}
.rm-center-status {{
    position:relative;
    z-index:1;
    display:flex;
    flex-wrap:wrap;
    gap:8px;
    margin-top:17px;
}}
.rm-status-pill {{
    min-height:30px;
    display:inline-flex;
    align-items:center;
    gap:7px;
    padding:0 11px;
    border:1px solid var(--line);
    border-radius:999px;
    color:var(--muted);
    background:transparent;
    font-size:10px;
    font-weight:850;
}}
.rm-status-pill::before {{
    content:"";
    width:7px;
    height:7px;
    border-radius:50%;
    background:var(--center-red);
}}
.rm-status-pill.available::before {{
    background:var(--center-green);
    box-shadow:0 0 12px rgba(98,224,173,.55);
}}
.rm-status-pill.private::before {{
    background:var(--center-red);
}}
.rm-center-metrics {{
    position:relative;
    z-index:1;
    display:grid;
    grid-template-columns:repeat(4,minmax(0,1fr));
    gap:9px;
    margin-top:20px;
}}
.rm-center-metric {{
    min-width:0;
    padding:14px;
    border:1px solid var(--line);
    border-radius:16px;
    background: transparent;
}}
.rm-center-metric strong {{
    display:block;
    font-size:23px;
    line-height:1;
    color:var(--emphasis-light);
    text-shadow:0 0 24px rgba(var(--text-rgb),.12);
}}
.rm-center-metric span {{
    display:block;
    margin-top:7px;
    color:var(--muted);
    font-size:10px;
}}
.rm-command-section {{
    margin-bottom:24px;
}}
.rm-command-title {{
    display:flex;
    justify-content:space-between;
    align-items:end;
    gap:12px;
    margin-bottom:11px;
}}
.rm-command-title h2 {{
    margin:0;
    font-size:21px;
}}
.rm-command-title span {{
    color:var(--muted);
    font-size:11px;
}}
.rm-command-grid {{
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:10px;
}}
.rm-command-card {{
    min-width:0;
    min-height:90px;
    display:flex;
    align-items:center;
    gap:12px;
    padding:15px;
    border:1px solid rgba(255,255,255,.08);
    border-radius:18px;
    color:var(--text);
    background: transparent;
    text-decoration:none;
    transition:
        transform .18s ease,
        border-color .18s ease;
}}
.rm-command-card:hover {{
    transform:translateY(-3px);
    border-color:rgba(var(--text-rgb),.36);
    background: transparent;
    box-shadow:
        0 14px 36px rgba(0,0,0,.24),
        0 0 32px rgba(var(--text-rgb),.08);
}}
.rm-command-icon {{
    flex:0 0 43px;
    height:43px;
    display:grid;
    place-items:center;
    border:1px solid rgba(var(--text-rgb),.28);
    border-radius:14px;
    color:var(--center-gold);
    background:
        radial-gradient(circle at 30% 20%, rgba(255,228,184,.14), transparent 55%),
        rgba(var(--text-rgb),.09);
    box-shadow:inset 0 1px 0 rgba(255,255,255,.06);
}}
.rm-command-icon svg {{
    width:20px;
    height:20px;
}}
.rm-command-copy {{
    min-width:0;
    flex:1;
}}
.rm-command-copy strong,
.rm-command-copy small {{
    display:block;
}}
.rm-command-copy strong {{
    overflow-wrap:anywhere;
    font-size:14px;
}}
.rm-command-copy small {{
    margin-top:5px;
    color:var(--muted);
    font-size:10px;
    line-height:1.4;
}}
.rm-command-arrow {{
    flex:0 0 auto;
    color:var(--muted);
}}
.rm-command-arrow svg {{
    width:17px;
    height:17px;
}}
.rm-command-badge {{
    min-width:25px;
    height:25px;
    display:grid;
    place-items:center;
    padding:0 7px;
    border:1px solid rgba(var(--text-rgb),.32);
    border-radius:999px;
    color:var(--center-gold);
    background:rgba(var(--text-rgb),.09);
    font-size:10px;
    font-weight:950;
}}
.rm-admin-command {{
    border-color:rgba(var(--text-rgb),.24);
    background: transparent;
}}
.rm-future-panel {{
    margin-bottom:24px;
    padding:18px;
    border:1px dashed rgba(var(--text-rgb),.22);
    border-radius:19px;
    background: transparent;
}}
.rm-future-panel strong {{
    display:block;
    color:var(--center-gold);
    font-size:14px;
}}
.rm-future-panel p {{
    margin:7px 0 0;
    color:var(--muted);
    font-size:11px;
    line-height:1.55;
}}
@media (max-width:680px) {{
    .rm-personal-center {{
        padding:20px;
    }}
    .rm-center-metrics {{
        grid-template-columns:repeat(2,minmax(0,1fr));
    }}
    .rm-command-grid {{
        grid-template-columns:1fr;
    }}
}}
@media (max-width:390px) {{
    .rm-center-metric {{
        padding:12px;
    }}
    .rm-command-card {{
        min-height:82px;
    }}
}}
@media (prefers-reduced-motion:reduce) {{
    .rm-command-card {{
        transition:none;
    }}
}}
:root[data-theme="light"] .rm-command-icon {{
    background:rgba(var(--text-rgb),.08);
}}
</style>

<section class="rm-personal-center">
    <h1 class="rm-center-heading">
        {overview_heading}
    </h1>

    <p class="rm-center-subtitle">
        {overview_subtitle}
    </p>

    <div class="rm-center-status">
        <span class="rm-status-pill {availability_class}">
            {availability_text}
        </span>
        <span class="rm-status-pill">
            {category_text}
        </span>
    </div>

    <div class="rm-center-metrics">
        <div class="rm-center-metric">
            <strong>{resources_count}</strong>
            <span>{resources_word}</span>
        </div>
        <div class="rm-center-metric">
            <strong>{approved_count}</strong>
            <span>{metric_published}</span>
        </div>
        <div class="rm-center-metric">
            <strong>{favorites_count}</strong>
            <span>{metric_in_favorites}</span>
        </div>
        <div class="rm-center-metric attention">
            <strong>{attention_count}</strong>
            <span>{metric_needs_attention}</span>
        </div>
    </div>
</section>

<section class="rm-command-section">
    <div class="rm-command-title">
        <h2>{my_directions_heading}</h2>
        <span>{real_account_sections}</span>
    </div>

    <div class="rm-command-grid">
        <a class="rm-command-card"
           href="/app/add">
            <span class="rm-command-icon">
                {plus_icon}
            </span>
            <span class="rm-command-copy">
                <strong>{add_resource_label}</strong>
                <small>
                    {add_resource_hint}
                </small>
            </span>
            <span class="rm-command-arrow">
                {arrow}
            </span>
        </a>

        <a class="rm-command-card"
           href="/app/my-resources">
            <span class="rm-command-icon">
                {resources_icon}
            </span>
            <span class="rm-command-copy">
                <strong>{my_resources_label}</strong>
                <small>
                    {resources_summary}
                </small>
            </span>
            <span class="rm-command-arrow">
                {arrow}
            </span>
        </a>

        <a class="rm-command-card"
           href="/app/favorites">
            <span class="rm-command-icon">
                {favorites_icon}
            </span>
            <span class="rm-command-copy">
                <strong>{favorites_label}</strong>
                <small>
                    {saved_resources_count}
                </small>
            </span>
            <span class="rm-command-arrow">
                {arrow}
            </span>
        </a>

        <a class="rm-command-card"
           href="/app/notifications">
            <span class="rm-command-icon">
                {notifications_icon}
            </span>
            <span class="rm-command-copy">
                <strong>{notifications_label}</strong>
                <small>
                    {notifications_desc}
                </small>
            </span>
            {notifications_badge}
            <span class="rm-command-arrow">
                {arrow}
            </span>
        </a>

        <a class="rm-command-card"
           href="/app/search">
            <span class="rm-command-icon">
                {search_icon}
            </span>
            <span class="rm-command-copy">
                <strong>{find_opportunities_title}</strong>
                <small>
                    {find_opportunities_desc}
                </small>
            </span>
            <span class="rm-command-arrow">
                {arrow}
            </span>
        </a>

        {admin_navigation}
    </div>
</section>


"#,
            overview_heading = crate::i18n::t("overview_heading"),
            overview_subtitle = crate::i18n::t("overview_subtitle"),
            availability_class = availability_class,
            availability_text = availability_text,
            category_text = category_text,
            resources_count = resources_count,
            resources_word = plural_word(resources_count, "count_resource_one", "count_resource_few", "count_resource_many"),
            metric_published = crate::i18n::t("metric_published"),
            metric_in_favorites = crate::i18n::t("metric_in_favorites"),
            metric_needs_attention = crate::i18n::t("metric_needs_attention"),
            my_directions_heading = crate::i18n::t("my_directions_heading"),
            real_account_sections = crate::i18n::t("real_account_sections"),
            add_resource_label = crate::i18n::t("resource_add_action"),
            add_resource_hint = crate::i18n::t("add_resource_last_city_hint"),
            my_resources_label = crate::i18n::t("my_resources_title"),
            resources_summary = crate::i18n::tf(
                "my_resources_command_summary",
                &[
                    ("approved", &approved_count.to_string()),
                    ("pending", &pending_count.to_string()),
                    ("rejected", &rejected_count.to_string()),
                ],
            ),
            favorites_label = crate::i18n::t("common_favorites"),
            saved_resources_count = crate::i18n::tf("saved_resources_count", &[("n", &favorites_count.to_string())]),
            notifications_label = crate::i18n::t("notifications_title"),
            notifications_desc = crate::i18n::t("notifications_command_desc"),
            find_opportunities_title = crate::i18n::t("find_opportunities_title"),
            find_opportunities_desc = crate::i18n::t("find_opportunities_desc"),
            approved_count = approved_count,
            favorites_count = favorites_count,
            attention_count = attention_count,
            resources_icon = icon("map"),
            plus_icon = icon("plus"),
            favorites_icon = icon("heart"),
            notifications_icon = icon("bell"),
            search_icon = icon("search"),
            arrow = icon("chevron"),
            notifications_badge = count_badge(unread_notifications_count),
            admin_navigation = admin_navigation,
        )
    } else {
        String::new()
    };

    let content_html = format!(
        r####"{personal_center}

{account_header}

{invite}


{statistics}


<section class="card rm-profile-section">

    <div class="rm-profile-section-head">

        <div>
            <div class="card-title rm-profile-section-title">
                {my_status_title}
            </div>

            <div class="card-meta rm-profile-section-copy">
                {my_status_desc}
            </div>
        </div>

    </div>


    <div class="rm-profile-intent-box">

        <div class="rm-profile-avatar-status">
            <label class="rm-me-avatar rm-me-avatar--upload" title="{profile_photo_title}">
                {status_avatar}
                <input id="rm-avatar-input" type="file" accept="image/jpeg,image/png,image/webp" class="chat-file-input">
            </label>
            <div>
                <div class="rm-profile-intent-kicker">
                    {now_kicker}
                </div>
                <div id="intent-current" class="rm-profile-intent-text">
                    {intent_status_text}
                </div>
                <button type="button" id="rm-avatar-btn" class="ui-button rm-avatar-btn">{avatar_upload_button}</button>
                <div id="rm-avatar-status" class="card-meta"></div>
            </div>
        </div>

    </div>





    <div class="rm-profile-settings-block">
        <div class="rm-profile-settings-kicker">
            {settings_kicker}
        </div>

        <a href="/app/menu"
           class="ui-button rm-profile-settings-link">
            {settings_link}
        </a>

        {language_picker}
    </div>


    <label class="rm-profile-field">

        <div class="rm-profile-field-label">
            {field_intent}
        </div>

        <textarea
            id="profile-intent"
            maxlength="300"
            rows="4"
            placeholder="{intent_placeholder}"
         class="ui-textarea">{safe_intent_text}</textarea>

    </label>


    <label class="rm-profile-field rm-profile-field--spaced">

        <div class="rm-profile-field-label">
            {field_profession}
        </div>

        <input
            id="profile-category"
            type="text"
            list="profile-profession-suggestions"
            maxlength="80"
            value="{safe_category}"
            placeholder="{profession_placeholder}"
            autocomplete="off"
         class="ui-input">

        <datalist id="profile-profession-suggestions"></datalist>

        <div class="card-meta rm-profile-profession-help">
            {profession_help}
        </div>

    </label>

    {home_city_select}

    <label class="rm-profile-field rm-profile-field--spaced">

        <div class="rm-profile-field-label">
            {field_duration}
        </div>

        <select id="profile-duration" class="ui-select">
            <option value="0">
                {duration_none}
            </option>

            <option value="1">
                {duration_1d}
            </option>

            <option value="3">
                {duration_3d}
            </option>

            <option value="7" selected>
                {duration_7d}
            </option>

            <option value="30">
                {duration_30d}
            </option>
        </select>

    </label>


    <button
        id="profile-save"
        type="button"
     class="ui-button rm-profile-save-btn">
        {save_status_button}
    </button>


    <div id="profile-save-status" class="ui-status rm-profile-save-status">
    </div>

</section>"####,
        account_header = account_header,
        invite = super::invite::invite_share_block(invite_public_id),
        statistics = statistics,
        my_status_title = crate::i18n::t("my_status_title"),
        my_status_desc = crate::i18n::t("my_status_desc"),
        profile_photo_title = crate::i18n::t("profile_photo_title"),
        now_kicker = crate::i18n::t("now_kicker"),
        avatar_upload_button = crate::i18n::t("avatar_upload_button"),
        settings_kicker = crate::i18n::t("profile_settings"),
        settings_link = crate::i18n::t("profile_settings_sound"),
        language_picker = crate::i18n::language_picker_html("/app/me"),
        intent_status_text = intent_status_text,
        status_avatar = if has_avatar {
            format!(
                r#"<img class="rm-me-avatar-img" src="/api/public-avatars/{}" alt="">"#,
                urlencoding::encode(invite_public_id)
            )
        } else {
            icon("user").to_string()
        },
        field_intent = crate::i18n::t("field_intent"),
        intent_placeholder = crate::i18n::t("intent_placeholder"),
        safe_intent_text = safe_intent_text,
        field_profession = crate::i18n::t("field_profession"),
        profession_placeholder = crate::i18n::t("profession_placeholder"),
        safe_category = safe_category,
        profession_help = crate::i18n::t("profession_help"),
        home_city_select =
            home_city_select_html(home_continent_index, home_country_index, home_city_index,),
        field_duration = crate::i18n::t("field_duration"),
        duration_none = crate::i18n::t("duration_none"),
        duration_1d = crate::i18n::t("duration_1d"),
        duration_3d = crate::i18n::t("duration_3d"),
        duration_7d = crate::i18n::t("duration_7d"),
        duration_30d = crate::i18n::t("duration_30d"),
        save_status_button = crate::i18n::t("save_status_button"),
    );

    let profile_i18n_script = format!(
        r#"<script>window.__profileI18n={{invalidCategory:{invalid_category},invalidIntent:{invalid_intent},invalidDuration:{invalid_duration},loginRequired:{login_required},rateLimited:{rate_limited},saveFailedLater:{save_failed_later},saveFailed:{save_failed},saving:{saving},statusSaved:{status_saved},statusNotSet:{status_not_set},connectionError:{connection_error},photoTooBig:{photo_too_big},compressingPhoto:{compressing_photo},photoOver8mb:{photo_over_8mb},savingPhoto:{saving_photo},photoUpdated:{photo_updated},photoSaveFailed:{photo_save_failed}}};</script>"#,
        invalid_category = js_string("js_invalid_category"),
        invalid_intent = js_string("js_invalid_intent"),
        invalid_duration = js_string("js_invalid_duration"),
        login_required = js_string("js_login_required"),
        rate_limited = js_string("js_rate_limited"),
        save_failed_later = js_string("js_save_failed_later"),
        save_failed = js_string("js_save_failed"),
        saving = js_string("status_saving"),
        status_saved = js_string("js_status_saved"),
        status_not_set = js_string("status_not_set"),
        connection_error = js_string("error_connection"),
        photo_too_big = js_string("chat_photo_too_big"),
        compressing_photo = js_string("chat_compressing_photo"),
        photo_over_8mb = js_string("chat_photo_over_8mb"),
        saving_photo = js_string("js_saving_photo"),
        photo_updated = js_string("js_photo_updated"),
        photo_save_failed = js_string("js_photo_save_failed"),
    );

    let body_after_html = profile_i18n_script + r####"
<script>
(function () {
    "use strict";

    const DRAFT_KEY = "rm_profile_draft";

    const saveButton =
        document.getElementById("profile-save");

    const intent =
        document.getElementById("profile-intent");

    const categoryInput =
        document.getElementById(
            "profile-category"
        );

    const homeCity =
        document.getElementById(
            "profile-home-city"
        );

    const duration =
        document.getElementById(
            "profile-duration"
        );

    const status =
        document.getElementById(
            "profile-save-status"
        );

    const current =
        document.getElementById(
            "intent-current"
        );

    if (
        !saveButton ||
        !intent ||
        !categoryInput ||
        !duration
    ) {
        return;
    }

    function profileErrorText(code) {
        switch (code) {
            case "invalid_category":
                return window.__profileI18n.invalidCategory;
            case "invalid_intent":
                return window.__profileI18n.invalidIntent;
            case "invalid_duration":
                return window.__profileI18n.invalidDuration;
            case "login_required":
                return window.__profileI18n.loginRequired;
            case "rate_limited":
                return window.__profileI18n.rateLimited;
            case "database_error":
            case "database_unavailable":
                return window.__profileI18n.saveFailedLater;
            default:
                return window.__profileI18n.saveFailed;
        }
    }

    function collectDraft() {
        return {
            intent: intent.value,
            category: categoryInput.value,
            home_city: homeCity ? homeCity.value : "",
            duration: duration.value
        };
    }

    function persistDraft() {
        try {
            localStorage.setItem(
                DRAFT_KEY,
                JSON.stringify(collectDraft())
            );
        } catch (_) {}
    }

    function restoreDraft() {
        try {
            const raw = localStorage.getItem(DRAFT_KEY);
            if (!raw) {
                return;
            }

            const draft = JSON.parse(raw);
            if (typeof draft.intent === "string") {
                intent.value = draft.intent;
            }
            if (typeof draft.category === "string") {
                categoryInput.value = draft.category;
            }
            if (homeCity && typeof draft.home_city === "string") {
                homeCity.value = draft.home_city;
            }
            if (typeof draft.duration === "string") {
                duration.value = draft.duration;
            }
        } catch (_) {}
    }

    restoreDraft();

    intent.addEventListener("input", persistDraft);
    categoryInput.addEventListener("change", persistDraft);
    duration.addEventListener("change", persistDraft);
    if (homeCity) {
        homeCity.addEventListener("change", persistDraft);
    }
    window.addEventListener("beforeunload", persistDraft);

    const professionList =
        document.getElementById("profile-profession-suggestions");
    let professionTimer = 0;
    let professionRequest = 0;

    async function loadProfessionSuggestions() {
        const requestId = ++professionRequest;
        const query = categoryInput.value.trim();

        try {
            const response = await fetch(
                "/api/professions/suggest?q=" +
                encodeURIComponent(query) +
                "&limit=20",
                { headers: { "Accept": "application/json" } }
            );
            const data = await response.json();

            if (
                requestId !== professionRequest ||
                !professionList ||
                !data.ok ||
                !Array.isArray(data.items)
            ) {
                return;
            }

            professionList.replaceChildren();
            data.items.forEach(function (item) {
                const option = document.createElement("option");
                option.value = item.name || "";
                option.label = [item.sector, item.name_fr, item.name_en]
                    .filter(Boolean)
                    .join(" · ");
                professionList.appendChild(option);
            });
        } catch (_) {
            // Свободный ввод остаётся доступен без подсказок.
        }
    }

    categoryInput.addEventListener("input", function () {
        persistDraft();
        window.clearTimeout(professionTimer);
        professionTimer = window.setTimeout(loadProfessionSuggestions, 180);
    });
    categoryInput.addEventListener("focus", loadProfessionSuggestions);

    saveButton.addEventListener(
        "click",
        async function () {
            saveButton.disabled = true;
            persistDraft();

            if (status) {
                status.textContent = window.__profileI18n.saving;
            }

            try {
                const response = await fetch(
                    "/api/profile",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            intent_text:
                                intent.value.trim(),
                            duration_days:
                                Number(duration.value),
                            category:
                                categoryInput.value.trim(),
                            home_city:
                                homeCity
                                    ? homeCity.value.trim()
                                    : ""
                        })
                    }
                );

                const data = await response.json();

                if (response.status === 401 || data.error === "login_required") {
                    window.location.href =
                        "/login?next=" + encodeURIComponent("/app/me");
                    return;
                }

                if (!response.ok || !data.ok) {
                    if (status) {
                        status.textContent =
                            profileErrorText(data.error);
                    }

                    return;
                }

                try {
                    localStorage.removeItem(DRAFT_KEY);
                } catch (_) {}

                if (current) {
                    current.textContent =
                        data.intent_text ||
                        window.__profileI18n.statusNotSet;
                }

                if (status) {
                    status.textContent =
                        window.__profileI18n.statusSaved;
                }
            } catch (_) {
                if (status) {
                    status.textContent =
                        window.__profileI18n.connectionError;
                }
            } finally {
                saveButton.disabled = false;
            }
        }
    );

    var avatarInput = document.getElementById("rm-avatar-input");
    var avatarBtn = document.getElementById("rm-avatar-btn");
    var avatarStatus = document.getElementById("rm-avatar-status");
    if (avatarBtn && avatarInput) {
        avatarBtn.addEventListener("click", function () {
            avatarInput.click();
        });
        avatarInput.addEventListener("change", function () {
            var file = avatarInput.files && avatarInput.files[0];
            avatarInput.value = "";
            if (!file) return;
            if (file.size > 20 * 1024 * 1024) {
                if (avatarStatus) avatarStatus.textContent = window.__profileI18n.photoTooBig;
                return;
            }
            function compressAvatar(source) {
                return new Promise(function (resolve) {
                    var url = URL.createObjectURL(source);
                    var img = new Image();
                    img.onload = function () {
                        URL.revokeObjectURL(url);
                        var w = img.naturalWidth || img.width || 0;
                        var h = img.naturalHeight || img.height || 0;
                        var edge = Math.max(w, h);
                        var scale = edge > 720 ? 720 / edge : 1;
                        var canvas = document.createElement("canvas");
                        canvas.width = Math.max(1, Math.round(w * scale));
                        canvas.height = Math.max(1, Math.round(h * scale));
                        var ctx = canvas.getContext("2d");
                        if (!ctx) { resolve(source); return; }
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        canvas.toBlob(function (blob) {
                            resolve(blob ? new File([blob], "avatar.jpg", { type: "image/jpeg" }) : source);
                        }, "image/jpeg", 0.84);
                    };
                    img.onerror = function () { URL.revokeObjectURL(url); resolve(source); };
                    img.src = url;
                });
            }
            if (avatarStatus) avatarStatus.textContent = window.__profileI18n.compressingPhoto;
            compressAvatar(file).then(function (ready) {
            if (ready.size > 8 * 1024 * 1024) {
                if (avatarStatus) avatarStatus.textContent = window.__profileI18n.photoOver8mb;
                return;
            }
            var data = new FormData();
            data.append("image", ready, "avatar.jpg");
            if (avatarStatus) avatarStatus.textContent = window.__profileI18n.savingPhoto;
            return fetch("/api/profile/avatar", {
                method: "POST",
                body: data,
                credentials: "same-origin"
            }).then(function (res) {
                return res.json().then(function (body) {
                    return { res: res, body: body };
                });
            }).then(function (pack) {
                if (!pack.res.ok || !pack.body || !pack.body.ok) {
                    throw new Error("avatar_failed");
                }
                document.querySelectorAll(".rm-me-avatar-img, .rm-me-avatar svg, .rm-me-avatar .icon").forEach(function () {});
                var imgs = document.querySelectorAll(".rm-me-avatar");
                imgs.forEach(function (box) {
                    var img = box.querySelector("img.rm-me-avatar-img");
                    if (!img) {
                        img = document.createElement("img");
                        img.className = "rm-me-avatar-img";
                        img.alt = "";
                        box.insertBefore(img, box.firstChild);
                        Array.prototype.slice.call(box.querySelectorAll("svg")).forEach(function (svg) {
                            if (!svg.closest("label") || svg.parentElement === box) {
                                svg.remove();
                            }
                        });
                    }
                    img.src = pack.body.url + "?t=" + Date.now();
                });
                if (avatarStatus) avatarStatus.textContent = window.__profileI18n.photoUpdated;
            });
            }).catch(function () {
                if (avatarStatus) avatarStatus.textContent = window.__profileI18n.photoSaveFailed;
            });
        });
    }
})();
</script>"####;

    let main_html = format!(
        "{topbar}\n\n{hero}\n\n{content}",
        topbar = topbar(&crate::i18n::t("common_profile"), "user"),
        hero = simple_hero(
            "user",
            "GRABIT",
            &crate::i18n::t("common_profile"),
            &crate::i18n::t("profile_hero_copy"),
        ),
        content = content_html,
    );

    page_document(
        &format!("{} · GRABIT", crate::i18n::t("common_profile")),
        "",
        "",
        &main_html,
        &bottom_nav_with_badges("menu", unread_messages_count, unread_notifications_count),
        &body_after_html,
    )
}

// ============================================================
// USER NOTIFICATIONS
// ============================================================

pub fn render_notifications(
    notifications: Vec<crate::web::view_models::NotificationRow>,
    authenticated: bool,
) -> String {
    let cards = if !authenticated {
        guest_locked_section(&crate::i18n::t("notifications_title"), "/app/notifications")
    } else if notifications.is_empty() {
        empty_state_card_with_actions(
            &crate::i18n::t("notifications_empty_title"),
            &crate::i18n::t("notifications_empty_body"),
            &format!(
                "{}{}",
                empty_state_action("/app/my-resources", &crate::i18n::t("my_resources_title")),
                empty_state_action("/app/add", &crate::i18n::t("resource_add_action")),
            ),
        )
    } else {
        notifications
            .iter()
            .map(
                |(notification_id, _resource_id, kind, title, message, is_read, _created_at)| {
                    let safe_title = escape_html(title);

                    let safe_message = escape_html(message);

                    let (icon_html, card_class, icon_class) = match kind.as_str() {
                        "resource_approved" => (
                            icon("check"),
                            "rm-notif-card--approved",
                            "rm-notif-icon--approved",
                        ),
                        "resource_rejected" => (
                            icon("x"),
                            "rm-notif-card--rejected",
                            "rm-notif-icon--rejected",
                        ),
                        "promotion_published" => (
                            icon("star"),
                            "rm-notif-card--approved",
                            "rm-notif-icon--approved",
                        ),
                        "promotion_moderation" => (
                            icon("clock"),
                            "rm-notif-card--contact",
                            "rm-notif-icon--contact",
                        ),
                        "promotion_publish_failed" => (
                            icon("alert-triangle"),
                            "rm-notif-card--rejected",
                            "rm-notif-icon--rejected",
                        ),
                        "promotion_rejected" => (
                            icon("x"),
                            "rm-notif-card--rejected",
                            "rm-notif-icon--rejected",
                        ),
                        "admin_assignment" => (
                            icon("shield"),
                            "rm-notif-card--contact",
                            "rm-notif-icon--contact",
                        ),
                        "work_nudge" => (
                            icon("search"),
                            "rm-notif-card--approved",
                            "rm-notif-icon--approved",
                        ),
                        _ => (icon("bell"), "", "rm-notif-icon--default"),
                    };

                    let unread_badge = if *is_read == 0 {
                        format!(r#"<span class="rm-notif-new">{}</span>"#, crate::i18n::t("new_badge_label"))
                    } else {
                        String::new()
                    };

                    format!(
                        r#"
<a href="/app/notifications/{notification_id}/open" class="card rm-notif-card {card_class}">
    <div class="rm-notif-layout">
        <div class="rm-notif-icon {icon_class}">{icon_html}</div>
        <div class="rm-notif-body">
            <div class="rm-notif-head">
                <div class="card-title">{title}</div>
                {unread_badge}
            </div>
            <div class="card-meta rm-notif-message">{message}</div>
            <span class="rm-notif-action rm-notif-action--gold">{open_label}</span>
        </div>
    </div>
</a>
"#,
                        notification_id = notification_id,
                        card_class = card_class,
                        icon_class = icon_class,
                        icon_html = icon_html,
                        title = safe_title,
                        message = safe_message,
                        unread_badge = unread_badge,
                        open_label = crate::i18n::t("common_open"),
                    )
                },
            )
            .collect::<Vec<_>>()
            .join("")
    };

    let mark_all_html = if authenticated
        && notifications
            .iter()
            .any(|(_, _, _, _, _, is_read, _)| *is_read == 0)
    {
        format!(
            r#"<div class="rm-notif-toolbar">
    <a href="/app/notifications/read-all" class="rm-notif-read-all">{}</a>
</div>"#,
            crate::i18n::t("mark_all_read_link")
        )
    } else {
        String::new()
    };

    let content = format!(
        r#"{mark_all}
<section>
    {cards}
</section>"#,
        mark_all = mark_all_html,
        cards = cards,
    );

    page_shell(
        &format!("{} · GRABIT", crate::i18n::t("notifications_title")),
        &topbar(&crate::i18n::t("notifications_title"), "bell"),
        &back_hero(
            &back_link("/app/me", &crate::i18n::t("common_profile"), "arrow-left"),
            "user",
            &crate::i18n::t("notifications_title"),
            &crate::i18n::t("notifications_center_title"),
            &crate::i18n::t("notifications_center_copy"),
        ),
        &content,
        &bottom_nav("menu"),
    )
}

// ============================================================
// CATEGORY
// ============================================================

pub struct RenderPublicUserProfileParams<'a> {
    pub public_id: &'a str,
    pub username: &'a str,
    pub first_name: &'a str,
    pub last_name: &'a str,
    pub intent_text: &'a str,
    pub category: &'a str,
    pub chat_user_id: Option<i64>,
    pub resources: Vec<crate::web::view_models::PublicProfileResourceRow>,
    pub has_avatar: bool,
}

pub fn render_public_user_profile(params: RenderPublicUserProfileParams<'_>) -> String {
    let RenderPublicUserProfileParams {
        public_id,
        username,
        first_name,
        last_name,
        intent_text,
        category,
        chat_user_id,
        resources,
        has_avatar,
    } = params;
    let profession = {
        if is_generic_profession_key(category) {
            crate::i18n::t("specialist")
        } else {
            let label = profession_label(category);
            if label.is_empty() {
                crate::i18n::t("specialist")
            } else {
                label
            }
        }
    };
    let hero_full_name = format!("{} {}", first_name.trim(), last_name.trim(),)
        .trim()
        .to_string();

    let person_name = if !hero_full_name.is_empty() {
        hero_full_name
    } else if !username.trim().is_empty() {
        format!("@{}", username.trim())
    } else {
        String::new()
    };

    let safe_username = escape_html(username);
    let safe_first_name = escape_html(first_name);
    let safe_last_name = escape_html(last_name);
    let safe_intent = escape_html(intent_text);

    let full_name = format!("{} {}", safe_first_name, safe_last_name)
        .trim()
        .to_string();

    let display_name = profession.clone();
    let person_line = if !full_name.is_empty() {
        full_name
    } else if !safe_username.is_empty() {
        format!("@{}", safe_username)
    } else {
        person_name
    };

    let contact_html = String::new();

    let write_label = crate::i18n::t("common_write");
    let share_label = crate::i18n::t("common_share");
    let share_text = crate::i18n::t("profile_share_text");
    let internal_contact_html = if chat_user_id.is_some() && !public_id.is_empty() {
        format!(
            r#"
<section class="card rm-public-section">

    <div class="rm-public-kicker">
        {write_label}
    </div>

    <div class="card-meta rm-public-copy">
        {write_hint}
    </div>

    <a href="/app/chat/{public_id}" class="rm-public-chat-link">
        {write_label}
    </a>
    <button type="button" class="ui-button" data-share data-share-title="GRABIT" data-share-text="{share_text}" data-share-url="/app/join/{public_id}" data-share-status="share-status">{share_label}</button>
    <div id="share-status" class="ui-status"></div>

</section>
"#,
            public_id = escape_html(public_id),
            write_label = escape_html(&write_label),
            write_hint = escape_html(&crate::i18n::t("profile_write_hint")),
            share_label = escape_html(&share_label),
            share_text = escape_html(&share_text),
        )
    } else {
        format!(
            r#"
<section class="card rm-public-section">

    <div class="rm-public-kicker">
        {write_label}
    </div>

    <div class="card-meta rm-public-copy">
        {login_hint}
    </div>

    <a href="/login?next=/app/user/{public_id}" class="rm-public-chat-link">
        {login_write}
    </a>
    <button type="button" class="ui-button" data-share data-share-title="GRABIT" data-share-text="{share_text}" data-share-url="/app/join/{public_id}" data-share-status="share-status">{share_label}</button>
    <div id="share-status" class="ui-status"></div>

</section>
"#,
            public_id = escape_html(public_id),
            write_label = escape_html(&write_label),
            login_hint = escape_html(&crate::i18n::t("profile_write_login_hint")),
            login_write = escape_html(&crate::i18n::t("profile_login_write")),
            share_label = escape_html(&share_label),
            share_text = escape_html(&share_text),
        )
    };

    let intent_html = if safe_intent.is_empty() {
        String::new()
    } else {
        format!(
            r#"
<section class="card rm-public-section rm-public-section--intent">

    <div class="rm-public-kicker">
        {kicker}
    </div>

    <div class="rm-public-intent-body">{intent}</div>

</section>
"#,
            kicker = crate::i18n::t("current_status_kicker"),
            intent = safe_intent
        )
    };

    let resource_count = resources.len();

    let cards = if resources.is_empty() {
        empty_state_card_with_actions(
            &crate::i18n::t("resource_empty_people_title"),
            &crate::i18n::t("profile_no_resources_body"),
            &empty_state_action("/app/search", &crate::i18n::t("back_to_search_action")),
        )
    } else {
        resources
            .iter()
            .map(
                |(id, title, category, description, rating, votes, verified, premium)| {
                    let title = escape_html(title);
                    let category = escape_html(category);
                    let description = escape_html(description);

                    let verified_badge = if *verified != 0 {
                        verified_badge_html(true)
                    } else {
                        String::new()
                    };

                    let premium_badge = if *premium != 0 {
                        premium_badge_html("compact")
                    } else {
                        String::new()
                    };

                    profile_resource_card(super::common::ProfileResourceCardParams {
                        href: &format!("/app/listing/{}", id),
                        icon_name: "map-pin",
                        title: &title,
                        category: &category,
                        description: &description,
                        address: None,
                        rating: *rating,
                        votes: *votes,
                        premium_badge_html: &premium_badge,
                        verified_badge_html: &verified_badge,
                    })
                },
            )
            .collect::<Vec<_>>()
            .join("")
    };

    let section_head_resources = section_head(
        &crate::i18n::t("member_resources_heading"),
        &crate::i18n::t("member_resources_subcaption"),
        None,
    );

    let main_html = format!(
        r####"<section class="card rm-public-profile-card">

    <div class="rm-public-profile-row">

        <div class="rm-me-avatar">
            {profile_avatar}
        </div>

        <div class="rm-me-name-wrap">

            <div class="rm-public-name">
                {display_name}
            </div>

            <div class="card-meta rm-public-resource-meta">
                {person_line}
            </div>

            <div class="card-meta rm-public-resource-meta">
                {resource_word}
            </div>

        </div>

    </div>

    {contact_html}

</section>


{intent_html}

{internal_contact_html}


{section_head_resources}


<section>
    {cards}
</section>"####,
        profile_avatar = if has_avatar && !public_id.is_empty() {
            format!(
                r#"<img class="rm-me-avatar-img" src="/api/public-avatars/{}" alt="">"#,
                urlencoding::encode(public_id)
            )
        } else {
            icon("user").to_string()
        },
        display_name = display_name,
        person_line = if person_line.is_empty() {
            String::new()
        } else {
            person_line.clone()
        },
        resource_word = plural_count(
            resource_count as i64,
            "count_resource_one",
            "count_resource_few",
            "count_resource_many"
        ),
        contact_html = contact_html,
        intent_html = intent_html,
        internal_contact_html = internal_contact_html,
        section_head_resources = section_head_resources,
        cards = cards,
    );

    page_document(
        &format!("{} · GRABIT", display_name),
        r#"<meta name="robots" content="noindex, nofollow">"#,
        "",
        &format!(
            "{topbar}\n\n{hero}\n\n{content}",
            topbar = topbar(&crate::i18n::t("map_profession_label"), "user"),
            hero = back_hero(
                &back_link("/app/search", &crate::i18n::t("common_back"), "arrow-left",),
                "user",
                &crate::i18n::t("map_profession_label"),
                &profession,
                &if person_line.is_empty() {
                    crate::i18n::t("profession_hero_fallback_copy")
                } else {
                    person_line.clone()
                },
            ),
            content = main_html,
        ),
        &bottom_nav("explore"),
        "",
    )
}

pub fn render_public_user_not_found() -> String {
    let back_to_map = navigation_card("/app", "map", &crate::i18n::t("back_to_cities"), "");

    let content = format!(
        r#"<section>
    {back_to_map}
</section>"#,
        back_to_map = back_to_map,
    );

    page_shell(
        &format!("{} · GRABIT", crate::i18n::t("profile_not_found_title")),
        "",
        &simple_hero(
            "alert-triangle",
            "GRABIT",
            &crate::i18n::t("profile_not_found_title"),
            &crate::i18n::t("profile_not_found_copy"),
        ),
        &content,
        "",
    )
}

// ============================================================
// ПРОФИЛЬ РЕСУРСА
// ============================================================

pub fn render_favorites(
    resources: Vec<crate::web::view_models::FavoriteResourceRow>,
    authenticated: bool,
) -> String {
    let cards = if !authenticated {
        guest_locked_section(&crate::i18n::t("common_favorites"), "/app/favorites")
    } else if resources.is_empty() {
        empty_state_card_with_actions(
            &crate::i18n::t("favorites_empty_title"),
            &crate::i18n::t("favorites_empty_body"),
            &format!(
                "{}{}",
                empty_state_action("/app/search", &crate::i18n::t("find_resources_action")),
                empty_state_action("/app", &crate::i18n::t("to_map_action")),
            ),
        )
    } else {
        resources
            .iter()
            .map(
                |(id, title, category, description, address, rating, votes, verified, premium)| {
                    let premium_badge = if *premium != 0 {
                        premium_badge_html("compact")
                    } else {
                        String::new()
                    };

                    let verified_badge = if *verified != 0 {
                        verified_badge_html(true)
                    } else {
                        String::new()
                    };

                    profile_resource_card(super::common::ProfileResourceCardParams {
                        href: &format!("/app/listing/{}", id),
                        icon_name: "heart",
                        title,
                        category,
                        description,
                        address: Some(address.as_str()),
                        rating: *rating,
                        votes: *votes,
                        premium_badge_html: &premium_badge,
                        verified_badge_html: &verified_badge,
                    })
                },
            )
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
        &format!("{} · GRABIT", crate::i18n::t("common_favorites")),
        &topbar(&crate::i18n::t("common_favorites"), "heart"),
        &back_hero(
            &back_link("/app/me", &crate::i18n::t("common_profile"), "arrow-left"),
            "heart",
            &crate::i18n::t("common_favorites"),
            &crate::i18n::t("saved_resources_title"),
            &crate::i18n::t("favorites_hero_copy"),
        ),
        &content,
        &bottom_nav("menu"),
    )
}

#[cfg(test)]
mod personal_center_tests {
    use super::*;

    fn params(authenticated: bool) -> RenderMeParams<'static> {
        RenderMeParams {
            authenticated,
            username: "captain",
            first_name: "Amir",
            last_name: "",
            resources_count: 7,
            approved_count: 4,
            pending_count: 2,
            rejected_count: 1,
            favorites_count: 3,
            unread_notifications_count: 5,
            unread_messages_count: 6,
            moderator_level: 0,
            intent_text: "Ищу партнёров",
            intent_until: 0,
            category: "Бизнес",
            home_continent_index: -1,
            home_country_index: -1,
            home_city_index: -1,
            user_sessions: vec![],
            invite_public_id: "abc123",
            has_avatar: false,
        }
    }

    #[test]
    fn personal_center_is_rendered_for_authenticated_user() {
        let html = render_me(params(true));

        assert!(html.contains("Обзор"));
        assert!(html.contains("/app/my-resources"));
        assert!(!html.contains("/app/contact-requests"));
        assert!(html.contains("/app/favorites"));
        assert!(html.contains("/app/notifications"));
        assert!(html.contains("Реальные разделы аккаунта"));
        assert!(html.contains("data-nav-chats-link"));
        assert!(html.contains(r#"<span class="nav-badge">6</span>"#));
        assert!(html.contains("data-nav-profile-link"));
        assert!(html.contains("/app/join/abc123?to=chat"));
        assert!(html.contains("/app/join/abc123?to=work"));
        assert!(html.contains(r#"<span class="nav-badge">5</span>"#));
    }

    #[test]
    fn personal_center_uses_only_public_avatar_routes() {
        let mut input = params(true);
        input.has_avatar = true;
        let html = render_me(input);

        assert!(html.contains("/api/public-avatars/abc123"));
        assert!(!html.contains("/api/avatars/"));
    }

    #[test]
    fn personal_center_is_hidden_from_guest() {
        let html = render_me(params(false));

        assert!(!html.contains("RESURSMAP · PERSONAL COMMAND"));
        assert!(html.contains("Войдите в аккаунт"));
    }

    #[test]
    fn owner_profile_exposes_protected_center_entry() {
        let mut owner = params(true);
        owner.moderator_level = 5;

        let html = render_me(owner);
        assert!(html.contains("data-owner-center-entry"));
        assert!(html.contains("Центр владельца"));
        assert!(html.contains("ВЛАДЕЛЕЦ · УРОВЕНЬ 5"));
        assert!(html.contains("/app/center"));

        let regular = render_me(params(true));
        assert!(!regular.contains("data-owner-center-entry"));
    }

    #[test]
    fn personal_center_escapes_profile_data() {
        let mut unsafe_params = params(true);

        unsafe_params.category = "<script>alert(1)</script>";

        let html = render_me(unsafe_params);

        assert!(!html.contains("<script>alert(1)</script>"));
        assert!(!html.contains("&lt;script&gt;alert(1)&lt;/script&gt;"));
        assert!(html.contains("Направление не выбрано"));
    }

    #[test]
    fn public_profile_leads_with_profession() {
        let html = render_public_user_profile(RenderPublicUserProfileParams {
            public_id: "abc",
            username: "ivan",
            first_name: "Иван",
            last_name: "Петров",
            intent_text: "",
            category: "security",
            chat_user_id: None,
            resources: vec![],
            has_avatar: false,
        });

        let profession = html.find("Охрана").expect("profession");
        let name = html.find("Иван").expect("name");
        assert!(profession < name);
        assert!(html.contains("Профессия"));
        assert!(html.contains("noindex"));
    }
}
