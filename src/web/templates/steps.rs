use super::common::{
    back_link, bottom_nav, escape_html, guest_locked_section, page_document, ru_count,
    static_asset, topbar,
};
use crate::db::steps::{StepDay, StepLogEntry, StepSnapshot};
use chrono::{Datelike, Duration, NaiveDate};
use std::collections::HashMap;

fn weekdays() -> [String; 7] {
    // Prefer short labels from Intl via JS; SSR uses compact Latin for layout stability.
    let locale = crate::i18n::locale();
    if matches!(locale, "ru" | "uk" | "be") {
        [
            "Пн".into(),
            "Вт".into(),
            "Ср".into(),
            "Чт".into(),
            "Пт".into(),
            "Сб".into(),
            "Вс".into(),
        ]
    } else {
        [
            "Mo".into(),
            "Tu".into(),
            "We".into(),
            "Th".into(),
            "Fr".into(),
            "Sa".into(),
            "Su".into(),
        ]
    }
}

fn month_title(year: i32, month: u32) -> String {
    let locale = crate::i18n::locale();
    if matches!(locale, "ru" | "uk" | "be") {
        const MONTHS: [&str; 12] = [
            "январь",
            "февраль",
            "март",
            "апрель",
            "май",
            "июнь",
            "июль",
            "август",
            "сентябрь",
            "октябрь",
            "ноябрь",
            "декабрь",
        ];
        MONTHS[(month as usize - 1).min(11)].to_string()
    } else {
        format!("{year}-{month:02}")
    }
}

fn format_human_date(value: &str) -> String {
    match NaiveDate::parse_from_str(value, "%Y-%m-%d") {
        Ok(date) => format!(
            "{} {} {}",
            date.day(),
            month_title(date.year(), date.month()),
            date.year()
        ),
        Err(_) => value.to_string(),
    }
}

fn day_tone(steps: i64, goal: i64) -> &'static str {
    if steps <= 0 {
        "none"
    } else if steps >= goal {
        "goal"
    } else if steps >= goal * 3 / 4 {
        "high"
    } else if steps >= goal / 2 {
        "mid"
    } else {
        "low"
    }
}

fn weekday_monday(date: NaiveDate) -> u32 {
    date.weekday().num_days_from_monday()
}

fn month_card(year: i32, month: u32, today: &str, goal: i64, by_date: &HashMap<&str, i64>) -> String {
    let start = match NaiveDate::from_ymd_opt(year, month, 1) {
        Some(date) => date,
        None => return String::new(),
    };
    let next = if month == 12 {
        NaiveDate::from_ymd_opt(year + 1, 1, 1)
    } else {
        NaiveDate::from_ymd_opt(year, month + 1, 1)
    };
    let end = match next {
        Some(date) => date - Duration::days(1),
        None => return String::new(),
    };

    let pad = weekday_monday(start);
    let mut cells = String::new();
    for _ in 0..pad {
        cells.push_str(r#"<span class="rm-step-cell is-pad" aria-hidden="true"></span>"#);
    }

    let mut month_total = 0i64;
    let mut walked = 0i64;
    let mut cursor = start;
    while cursor <= end {
        let key = cursor.format("%Y-%m-%d").to_string();
        let steps = by_date.get(key.as_str()).copied().unwrap_or(0);
        if steps > 0 {
            walked += 1;
            month_total += steps;
        }
        let tone = day_tone(steps, goal);
        let today_class = if key == today { " is-today" } else { "" };
        let future_class = if key.as_str() > today { " is-future" } else { "" };
        cells.push_str(&format!(
            r#"<button type="button" class="rm-step-cell is-{tone}{today_class}{future_class}" data-date="{date}" title="{title}">{day}</button>"#,
            tone = tone,
            today_class = today_class,
            future_class = future_class,
            date = escape_html(&key),
            title = escape_html(&format!(
                "{} · {}",
                format_human_date(&key),
                ru_count(steps, "шаг", "шага", "шагов")
            )),
            day = cursor.day(),
        ));
        cursor += Duration::days(1);
    }

    let weekday_row = weekdays()
        .iter()
        .map(|day| format!(r#"<span>{}</span>"#, escape_html(day)))
        .collect::<Vec<_>>()
        .join("");
    let month_key = format!("{year}-{:02}", month);
    let open = if today.starts_with(&month_key) {
        " open"
    } else {
        ""
    };

    format!(
        r#"<details class="rm-step-month" data-month="{month_key}"{open}>
    <summary class="rm-step-month-head">
        <strong data-month-title="{month_key}">{title}</strong>
        <small data-month-meta="{month_key}">{walked} · {total}</small>
    </summary>
    <div class="rm-step-weekdays">{weekdays}</div>
    <div class="rm-step-grid" data-month-grid="{month_key}">{cells}</div>
</details>"#,
        month_key = escape_html(&month_key),
        open = open,
        title = escape_html(&month_title(year, month)),
        walked = ru_count(walked, "день", "дня", "дней"),
        total = ru_count(month_total, "шаг", "шага", "шагов"),
        weekdays = weekday_row,
        cells = cells,
    )
}

fn render_months(snapshot: &StepSnapshot) -> String {
    let today = match NaiveDate::parse_from_str(&snapshot.today, "%Y-%m-%d") {
        Ok(date) => date,
        Err(_) => return String::new(),
    };
    let by_date: HashMap<&str, i64> = snapshot
        .days
        .iter()
        .map(|day| (day.date.as_str(), day.steps))
        .collect();
    let year = today.year();
    let months = (1..=12)
        .map(|month| month_card(year, month, &snapshot.today, snapshot.goal, &by_date))
        .collect::<Vec<_>>()
        .join("");

    format!(
        r#"<div class="rm-step-year" data-year="{year}">
    <div class="rm-step-year-grid">{months}</div>
</div>"#,
        year = year,
        months = months,
    )
}

fn render_week(days: &[StepDay], today: &str, goal: i64) -> String {
    let today_date = match NaiveDate::parse_from_str(today, "%Y-%m-%d") {
        Ok(date) => date,
        Err(_) => return String::new(),
    };
    let monday = today_date - Duration::days(i64::from(weekday_monday(today_date)));
    let by_date: HashMap<&str, i64> = days
        .iter()
        .map(|day| (day.date.as_str(), day.steps))
        .collect();
    let labels = weekdays();

    (0..7)
        .map(|offset| {
            let date = monday + Duration::days(offset);
            let key = date.format("%Y-%m-%d").to_string();
            let steps = by_date.get(key.as_str()).copied().unwrap_or(0);
            let tone = day_tone(steps, goal);
            let today_class = if key == today { " is-today" } else { "" };
            format!(
                r#"<button type="button" class="rm-step-bead is-{tone}{today_class}" data-date="{date}">
    <em>{label}</em>
    <strong>{steps}</strong>
</button>"#,
                tone = tone,
                today_class = today_class,
                date = escape_html(&key),
                label = escape_html(&labels[offset as usize]),
                steps = steps,
            )
        })
        .collect::<Vec<_>>()
        .join("")
}

fn render_log(entries: &[StepLogEntry]) -> String {
    if entries.is_empty() {
        return format!(
            r#"<p class="rm-step-empty">{}</p>"#,
            escape_html(&crate::i18n::t("steps_empty"))
        );
    }

    entries
        .iter()
        .map(|entry| {
            format!(
                r#"<li>
    <strong>+{delta}</strong>
    <span>{date}</span>
</li>"#,
                delta = entry.delta,
                date = escape_html(&format_human_date(&entry.date)),
            )
        })
        .collect::<Vec<_>>()
        .join("")
}

fn steps_style() -> &'static str {
    r#"<style>
.rm-steps {
    display:grid;
    gap:12px;
    margin-top:8px;
}
.rm-step-toolbar {
    display:flex;
    flex-wrap:wrap;
    gap:8px;
    align-items:center;
}
.rm-step-toolbar .ui-button,
.rm-step-toolbar .rm-pwa-install-btn {
    flex:1 1 140px;
    min-height:40px;
    margin:0;
    font-size:14px;
}
.rm-step-today {
    display:grid;
    gap:12px;
    padding:14px;
    border:1px solid var(--line);
    border-radius:18px;
    background:
        radial-gradient(120% 80% at 10% 0%, rgba(232,204,150,.14), transparent 55%),
        var(--bg-soft);
}
.rm-step-hero {
    display:grid;
    grid-template-columns:112px 1fr;
    gap:12px;
    align-items:center;
}
.rm-step-ring {
    position:relative;
    width:112px;
    height:112px;
}
.rm-step-ring svg { width:100%; height:100%; transform:rotate(-90deg); }
.rm-step-ring-track { fill:none; stroke:var(--line); stroke-width:9; }
.rm-step-ring-value {
    fill:none;
    stroke:var(--gold);
    stroke-width:9;
    stroke-linecap:round;
    transition:stroke-dashoffset .35s ease;
}
.rm-step-ring-copy {
    position:absolute;
    inset:0;
    display:grid;
    place-content:center;
    text-align:center;
    gap:0;
}
.rm-step-ring-copy strong {
    font-size:22px;
    line-height:1;
    letter-spacing:-.04em;
    font-variant-numeric:tabular-nums;
}
.rm-step-ring-copy small {
    color:var(--muted);
    font-size:11px;
}
.rm-step-hero-copy { display:grid; gap:4px; min-width:0; }
.rm-step-hero-copy .rm-step-pct {
    font-size:28px;
    line-height:1.05;
    letter-spacing:-.04em;
    font-weight:800;
    font-variant-numeric:tabular-nums;
}
.rm-step-hero-copy .rm-step-km {
    color:var(--muted);
    font-size:13px;
}
.rm-step-stats {
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:8px;
}
.rm-step-stat {
    display:grid;
    gap:2px;
    padding:8px;
    border-radius:12px;
    background:color-mix(in srgb, var(--bg) 70%, transparent);
    border:1px solid var(--line);
    text-align:center;
}
.rm-step-stat strong {
    font-size:15px;
    font-variant-numeric:tabular-nums;
}
.rm-step-stat small {
    color:var(--muted);
    font-size:11px;
}
.rm-step-goal {
    display:grid;
    grid-template-columns:auto 1fr auto;
    gap:8px;
    align-items:center;
}
.rm-step-goal label {
    color:var(--muted);
    font-size:13px;
}
.rm-step-goal input {
    width:100%;
    min-width:0;
    border:1px solid var(--line);
    background:transparent;
    color:var(--text);
    border-radius:12px;
    padding:8px 10px;
    font:inherit;
}
.rm-step-goal button {
    min-width:52px;
}
.rm-step-hint {
    margin:0;
    color:var(--muted);
    font-size:12px;
    line-height:1.4;
}
.rm-step-week {
    display:grid;
    grid-template-columns:repeat(7,minmax(0,1fr));
    gap:6px;
}
.rm-step-bead {
    display:grid;
    gap:2px;
    padding:8px 2px;
    border:1px solid var(--line);
    border-radius:12px;
    background:var(--bg-soft);
    color:var(--text);
    font:inherit;
}
.rm-step-bead em {
    font-style:normal;
    color:var(--muted);
    font-size:10px;
}
.rm-step-bead strong {
    font-size:12px;
    font-variant-numeric:tabular-nums;
}
.rm-step-bead.is-today,
.rm-step-cell.is-today { box-shadow:0 0 0 2px var(--gold); }
.rm-step-bead.is-goal,
.rm-step-cell.is-goal { background:rgba(232,204,150,.28); }
.rm-step-bead.is-high,
.rm-step-cell.is-high { background:rgba(232,204,150,.18); }
.rm-step-bead.is-mid,
.rm-step-cell.is-mid { background:rgba(232,204,150,.10); }
.rm-step-bead.is-low,
.rm-step-cell.is-low { background:rgba(232,204,150,.05); }
.rm-step-block {
    border:1px solid var(--line);
    border-radius:16px;
    background:var(--bg-soft);
    padding:10px;
}
.rm-step-block > summary {
    list-style:none;
    cursor:pointer;
    display:flex;
    justify-content:space-between;
    gap:10px;
    align-items:baseline;
    font-weight:700;
}
.rm-step-block > summary::-webkit-details-marker { display:none; }
.rm-step-block > summary small {
    color:var(--muted);
    font-weight:500;
    font-size:12px;
}
.rm-step-block[open] > summary { margin-bottom:10px; }
.rm-step-year-grid {
    display:grid;
    gap:8px;
}
.rm-step-month {
    border:1px solid var(--line);
    border-radius:12px;
    padding:8px;
    background:color-mix(in srgb, var(--bg) 55%, transparent);
}
.rm-step-month-head {
    list-style:none;
    cursor:pointer;
    display:flex;
    justify-content:space-between;
    gap:8px;
    align-items:baseline;
}
.rm-step-month-head::-webkit-details-marker { display:none; }
.rm-step-month-head small { color:var(--muted); font-size:11px; }
.rm-step-month[open] .rm-step-month-head { margin-bottom:8px; }
.rm-step-weekdays,
.rm-step-grid {
    display:grid;
    grid-template-columns:repeat(7,1fr);
    gap:2px;
}
.rm-step-weekdays {
    margin-bottom:3px;
    color:var(--muted);
    font-size:9px;
    text-align:center;
}
.rm-step-cell {
    min-height:24px;
    aspect-ratio:1;
    display:grid;
    place-content:center;
    border:1px solid var(--line);
    border-radius:6px;
    background:transparent;
    color:var(--text);
    font:inherit;
    font-size:10px;
    font-weight:700;
}
.rm-step-cell.is-future { opacity:.35; }
.rm-step-cell.is-pad { border:0; }
.rm-step-log {
    list-style:none;
    margin:0;
    padding:0;
    display:grid;
    gap:8px;
    max-height:180px;
    overflow:auto;
}
.rm-step-log li {
    display:flex;
    justify-content:space-between;
    gap:10px;
    padding-bottom:8px;
    border-bottom:1px solid var(--line);
    font-size:13px;
}
.rm-step-log span { color:var(--muted); }
.rm-step-empty { margin:0; color:var(--muted); font-size:13px; }
.rm-step-day {
    display:none;
    gap:4px;
    padding:10px 12px;
    border:1px solid var(--line);
    border-radius:14px;
    background:var(--bg-soft);
}
.rm-step-day.is-open { display:grid; }
.rm-step-day strong { font-size:18px; }
.rm-step-section-label {
    margin:0 0 8px;
    font-size:13px;
    font-weight:700;
}
@media (max-width: 380px) {
    .rm-step-hero { grid-template-columns:96px 1fr; }
    .rm-step-ring { width:96px; height:96px; }
    .rm-step-hero-copy .rm-step-pct { font-size:24px; }
}
html.light-theme .rm-step-bead.is-goal,
html.light-theme .rm-step-cell.is-goal,
body.light-theme .rm-step-bead.is-goal,
body.light-theme .rm-step-cell.is-goal { background:rgba(165,118,31,.22); }
html.light-theme .rm-step-bead.is-high,
html.light-theme .rm-step-cell.is-high,
body.light-theme .rm-step-bead.is-high,
body.light-theme .rm-step-cell.is-high { background:rgba(165,118,31,.14); }
html.light-theme .rm-step-bead.is-mid,
html.light-theme .rm-step-cell.is-mid,
body.light-theme .rm-step-bead.is-mid,
body.light-theme .rm-step-cell.is-mid { background:rgba(165,118,31,.08); }
</style>"#
}

fn ring_offset(steps: i64, goal: i64) -> f64 {
    let circ = 2.0 * std::f64::consts::PI * 46.0;
    let ratio = if goal <= 0 {
        0.0
    } else {
        (steps as f64 / goal as f64).clamp(0.0, 1.0)
    };
    circ * (1.0 - ratio)
}

fn authenticated_body(snapshot: &StepSnapshot) -> String {
    let circ = 2.0 * std::f64::consts::PI * 46.0;
    let pct = if snapshot.goal > 0 {
        ((snapshot.today_steps as f64 / snapshot.goal as f64) * 100.0)
            .clamp(0.0, 999.0)
            .round() as i64
    } else {
        0
    };
    let km = (snapshot.today_steps as f64 * 0.75 / 1000.0).max(0.0);
    format!(
        r#"<section class="rm-steps" id="rm-steps" data-today="{today}" data-goal="{goal}">
    <div class="rm-step-toolbar">
        {back}
        <button id="rm-step-pin" type="button" class="ui-button">{pin}</button>
        <button id="resursmap-install-pwa" type="button" class="ui-button rm-pwa-install-btn rm-pwa-home-btn">{install}</button>
    </div>

    <article class="rm-step-today">
        <div class="rm-step-hero">
            <div class="rm-step-ring" aria-hidden="true">
                <svg viewBox="0 0 112 112">
                    <circle class="rm-step-ring-track" cx="56" cy="56" r="46"></circle>
                    <circle id="rm-step-ring" class="rm-step-ring-value" cx="56" cy="56" r="46"
                        stroke-dasharray="{circ:.1}" stroke-dashoffset="{offset:.1}"></circle>
                </svg>
                <div class="rm-step-ring-copy">
                    <strong id="rm-step-today-count">{today_steps}</strong>
                    <small id="rm-step-today-caption">{of_goal}</small>
                </div>
            </div>
            <div class="rm-step-hero-copy">
                <div class="rm-step-pct" id="rm-step-pct">{pct_label}</div>
                <div class="rm-step-km" id="rm-step-km">{km_label}</div>
                <p class="rm-step-hint" id="rm-step-status">{status}</p>
            </div>
        </div>
        <div class="rm-step-stats">
            <div class="rm-step-stat"><strong id="rm-step-streak">{streak}</strong><small>{streak_label}</small></div>
            <div class="rm-step-stat"><strong id="rm-step-best">{best}</strong><small>{best_label}</small></div>
            <div class="rm-step-stat"><strong id="rm-step-life">{life}</strong><small>{life_label}</small></div>
        </div>
        <form class="rm-step-goal" id="rm-step-goal-form">
            <label for="rm-step-goal">{goal_label}</label>
            <input id="rm-step-goal" type="number" min="1000" max="50000" value="{goal}" inputmode="numeric">
            <button type="submit" class="ui-button rm-step-add-btn">{ok}</button>
        </form>
    </article>

    <section>
        <p class="rm-step-section-label">{week_label}</p>
        <div class="rm-step-week" id="rm-step-week">{week}</div>
    </section>

    <article class="rm-step-day" id="rm-step-day">
        <small id="rm-step-day-date"></small>
        <strong id="rm-step-day-steps">0</strong>
        <p class="rm-step-hint" id="rm-step-day-meta"></p>
    </article>

    <details class="rm-step-block" open>
        <summary>
            <span>{year_label} {year}</span>
            <small>{year_hint}</small>
        </summary>
        <div class="rm-step-months" id="rm-step-months">{months}</div>
    </details>

    <details class="rm-step-block">
        <summary>
            <span>{log_label}</span>
        </summary>
        <ul class="rm-step-log" id="rm-step-log">{log}</ul>
    </details>
</section>"#,
        today = escape_html(&snapshot.today),
        goal = snapshot.goal,
        back = back_link("/app/me", &crate::i18n::t("common_profile"), "arrow-left"),
        pin = escape_html(&crate::i18n::t("steps_pin")),
        install = escape_html(&crate::i18n::t("steps_install")),
        circ = circ,
        offset = ring_offset(snapshot.today_steps, snapshot.goal),
        today_steps = snapshot.today_steps,
        of_goal = escape_html(&crate::i18n::tf(
            "steps_of_goal",
            &[("goal", &snapshot.goal.to_string())],
        )),
        pct_label = escape_html(&crate::i18n::tf(
            "steps_today_pct",
            &[("pct", &pct.to_string())],
        )),
        km_label = format!("{km:.1} km"),
        status = escape_html(&crate::i18n::t("steps_keep_panel")),
        streak = snapshot.streak,
        best = if snapshot.best_steps > 0 {
            snapshot.best_steps.to_string()
        } else {
            "—".to_string()
        },
        life = snapshot.lifetime,
        streak_label = escape_html(&crate::i18n::t("steps_streak")),
        best_label = escape_html(&crate::i18n::t("steps_best")),
        life_label = escape_html(&crate::i18n::t("steps_life")),
        goal_label = escape_html(&crate::i18n::t("steps_goal_label")),
        ok = escape_html(&crate::i18n::t("steps_ok")),
        week_label = escape_html(&crate::i18n::t("steps_week")),
        week = render_week(&snapshot.days, &snapshot.today, snapshot.goal),
        year_label = escape_html(&crate::i18n::t("steps_year")),
        year = NaiveDate::parse_from_str(&snapshot.today, "%Y-%m-%d")
            .map(|d| d.year())
            .unwrap_or(2026),
        year_hint = escape_html(&crate::i18n::t("steps_year_hint")),
        months = render_months(snapshot),
        log_label = escape_html(&crate::i18n::t("steps_log")),
        log = render_log(&snapshot.log),
    )
}

pub fn render_steps(snapshot: Option<&StepSnapshot>, invite_public_id: &str) -> String {
    let content = match snapshot {
        Some(snapshot) => authenticated_body(snapshot),
        None => guest_locked_section(&crate::i18n::t("steps_title"), "/app/steps"),
    };
    let _ = invite_public_id;

    let main_html = format!(
        r#"{topbar}

{content}"#,
        topbar = topbar(&crate::i18n::t("steps_title"), "footprints"),
        content = content,
    );

    let body_after = if snapshot.is_some() {
        format!(
            r#"<script src="{src}" defer></script>"#,
            src = static_asset("pedometer.js")
        )
    } else {
        String::new()
    };

    page_document(
        &format!("{} · GRABIT", crate::i18n::t("steps_title")),
        steps_style(),
        "",
        &main_html,
        &bottom_nav("menu"),
        &body_after,
    )
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::db::steps::StepSnapshot;

    fn empty_snapshot() -> StepSnapshot {
        StepSnapshot {
            today: "2026-09-06".into(),
            today_steps: 0,
            goal: 10000,
            lifetime: 0,
            walked_days: 0,
            streak: 0,
            best_date: String::new(),
            best_steps: 0,
            days: vec![StepDay {
                date: "2026-09-06".into(),
                steps: 0,
            }],
            log: vec![],
        }
    }

    #[test]
    fn guest_sees_lock() {
        let html = render_steps(None, "");
        assert!(html.contains("Нужен аккаунт") || html.contains("Account"));
        assert!(html.contains("/login?next="));
    }

    #[test]
    fn album_and_controls_render() {
        let html = render_steps(Some(&empty_snapshot()), "abc123");
        assert!(!html.contains("/app/join/"));
        assert!(html.contains("data-year=\"2026\"") || html.contains("2026"));
        assert!(html.contains("data-month=\"2026-01\""));
        assert!(html.contains("data-month=\"2026-09\""));
        assert!(html.contains("data-month=\"2026-12\""));
        assert!(!html.contains("Считать шаги"));
        assert!(!html.contains("data-add"));
        assert!(!html.contains("Свои шаги"));
        assert!(!html.contains("2025"));
        assert!(html.contains("/static/pedometer.js"));
        assert!(html.contains("resursmap-install-pwa"));
        assert!(html.contains("rm-step-pin"));
        assert!(html.contains("rm-step-hero"));
    }
}
