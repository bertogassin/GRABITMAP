use super::common::{
    back_hero, back_link, bottom_nav, escape_html, guest_locked_section, page_document, ru_count,
    static_asset, topbar,
};
use crate::db::steps::{StepDay, StepLogEntry, StepSnapshot};
use chrono::{Datelike, Duration, NaiveDate};
use std::collections::HashMap;

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

const WEEKDAYS: [&str; 7] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

fn format_human_date(value: &str) -> String {
    match NaiveDate::parse_from_str(value, "%Y-%m-%d") {
        Ok(date) => format!(
            "{} {} {}",
            date.day(),
            MONTHS[(date.month0() as usize).min(11)],
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
    } else if steps >= goal / 3 {
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
        cells.push_str(&format!(
            r#"<button type="button" class="rm-step-cell is-{tone}{today_class}" data-date="{date}" title="{title}">{day}</button>"#,
            tone = tone,
            today_class = today_class,
            date = escape_html(&key),
            title = escape_html(&format!("{} · {}", format_human_date(&key), ru_count(steps, "шаг", "шага", "шагов"))),
            day = cursor.day(),
        ));
        cursor += Duration::days(1);
    }

    let weekday_row = WEEKDAYS
        .iter()
        .map(|day| format!(r#"<span>{day}</span>"#))
        .collect::<Vec<_>>()
        .join("");

    format!(
        r#"<article class="card rm-step-month">
    <header class="rm-step-month-head">
        <strong>{title}</strong>
        <small>{walked} · {total}</small>
    </header>
    <div class="rm-step-weekdays">{weekdays}</div>
    <div class="rm-step-grid">{cells}</div>
</article>"#,
        title = escape_html(&format!("{} {}", MONTHS[(month as usize - 1).min(11)], year)),
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

    let mut months: Vec<(i32, u32)> = vec![(today.year(), today.month())];
    for day in &snapshot.days {
        if day.steps <= 0 {
            continue;
        }
        let Some(date) = NaiveDate::parse_from_str(&day.date, "%Y-%m-%d").ok() else {
            continue;
        };
        let key = (date.year(), date.month());
        if !months.contains(&key) {
            months.push(key);
        }
    }
    months.sort_by(|a, b| b.cmp(a));

    months
        .into_iter()
        .map(|(year, month)| month_card(year, month, &snapshot.today, snapshot.goal, &by_date))
        .collect::<Vec<_>>()
        .join("")
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
                label = WEEKDAYS[offset as usize],
                steps = steps,
            )
        })
        .collect::<Vec<_>>()
        .join("")
}

fn render_log(entries: &[StepLogEntry]) -> String {
    if entries.is_empty() {
        return r#"<p class="rm-step-empty">Пока пусто</p>"#
            .to_string();
    }

    entries
        .iter()
        .map(|entry| {
            let source = if entry.source == "sensor" {
                "телефон"
            } else {
                "вручную"
            };
            format!(
                r#"<li>
    <strong>+{delta}</strong>
    <span>{date} · {source}</span>
</li>"#,
                delta = entry.delta,
                date = escape_html(&format_human_date(&entry.date)),
                source = source,
            )
        })
        .collect::<Vec<_>>()
        .join("")
}

fn steps_style() -> &'static str {
    r#"<style>
.rm-steps { display:grid; gap:16px; }
.rm-step-today {
    display:grid;
    gap:16px;
    justify-items:center;
    text-align:center;
    padding:22px 18px 20px;
}
.rm-step-ring {
    position:relative;
    width:196px;
    height:196px;
}
.rm-step-ring svg { width:100%; height:100%; transform:rotate(-90deg); }
.rm-step-ring-track { fill:none; stroke:var(--line); stroke-width:10; }
.rm-step-ring-value {
    fill:none;
    stroke:var(--gold);
    stroke-width:10;
    stroke-linecap:round;
    transition:stroke-dashoffset .4s ease;
}
.rm-step-ring-copy {
    position:absolute;
    inset:0;
    display:grid;
    place-content:center;
    gap:2px;
}
.rm-step-ring-copy strong {
    font-size:34px;
    line-height:1;
    letter-spacing:-.03em;
}
.rm-step-ring-copy small { color:var(--muted); font-size:13px; }
.rm-step-stats {
    width:100%;
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:10px;
}
.rm-step-stat {
    display:grid;
    gap:4px;
    padding:10px 8px;
    border:1px solid var(--line);
    border-radius:14px;
    background:var(--bg-soft);
}
.rm-step-stat strong { font-size:16px; }
.rm-step-stat small { color:var(--muted); font-size:12px; }
.rm-step-actions { width:100%; display:grid; gap:10px; }
.rm-step-listen,
.rm-step-chips { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; }
.rm-step-chip,
.rm-step-listen-btn,
.rm-step-add-btn {
    border:1px solid var(--line);
    background:var(--bg-soft);
    color:var(--text);
    border-radius:999px;
    padding:8px 14px;
    font:inherit;
    font-weight:700;
}
.rm-step-listen-btn.is-on {
    background:var(--gold);
    color:var(--on-gold);
    border-color:transparent;
}
.rm-step-add {
    display:flex;
    gap:8px;
}
.rm-step-add input {
    flex:1;
    min-width:0;
    border:1px solid var(--line);
    background:transparent;
    color:var(--text);
    border-radius:14px;
    padding:10px 12px;
    font:inherit;
}
.rm-step-hint { margin:0; color:var(--muted); font-size:13px; line-height:1.45; }
.rm-step-week {
    display:grid;
    grid-template-columns:repeat(7,1fr);
    gap:8px;
}
.rm-step-bead {
    display:grid;
    gap:4px;
    padding:10px 4px;
    border:1px solid var(--line);
    border-radius:16px;
    background:var(--bg-soft);
    color:var(--text);
    font:inherit;
}
.rm-step-bead em { font-style:normal; color:var(--muted); font-size:11px; }
.rm-step-bead strong { font-size:13px; }
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
.rm-step-goal {
    display:flex;
    gap:8px;
    align-items:center;
}
.rm-step-goal input {
    width:96px;
    border:1px solid var(--line);
    background:transparent;
    color:var(--text);
    border-radius:12px;
    padding:8px 10px;
    font:inherit;
}
.rm-step-months { display:grid; gap:14px; }
.rm-step-month { padding:16px; }
.rm-step-month-head {
    display:flex;
    justify-content:space-between;
    gap:12px;
    align-items:baseline;
    margin-bottom:12px;
}
.rm-step-month-head small { color:var(--muted); }
.rm-step-weekdays,
.rm-step-grid {
    display:grid;
    grid-template-columns:repeat(7,1fr);
    gap:6px;
}
.rm-step-weekdays {
    margin-bottom:6px;
    color:var(--muted);
    font-size:11px;
    text-align:center;
}
.rm-step-cell {
    aspect-ratio:1;
    border:1px solid var(--line);
    border-radius:10px;
    background:transparent;
    color:var(--text);
    font:inherit;
    font-size:12px;
    font-weight:700;
}
.rm-step-cell.is-pad { border:0; }
.rm-step-log { list-style:none; margin:0; padding:0; display:grid; gap:10px; }
.rm-step-log li {
    display:flex;
    justify-content:space-between;
    gap:12px;
    padding-bottom:10px;
    border-bottom:1px solid var(--line);
}
.rm-step-log span { color:var(--muted); }
.rm-step-empty { margin:0; color:var(--muted); }
.rm-step-day {
    display:none;
    gap:6px;
}
.rm-step-day.is-open { display:grid; }
.rm-step-day strong { font-size:22px; }
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
    let circ = 2.0 * std::f64::consts::PI * 78.0;
    let ratio = if goal <= 0 {
        0.0
    } else {
        (steps as f64 / goal as f64).clamp(0.0, 1.0)
    };
    circ * (1.0 - ratio)
}

fn authenticated_body(snapshot: &StepSnapshot) -> String {
    let circ = 2.0 * std::f64::consts::PI * 78.0;
    format!(
        r#"<section class="rm-steps" id="rm-steps" data-today="{today}" data-goal="{goal}">
    <article class="card rm-step-today">
        <div class="rm-step-ring" aria-hidden="true">
            <svg viewBox="0 0 180 180">
                <circle class="rm-step-ring-track" cx="90" cy="90" r="78"></circle>
                <circle id="rm-step-ring" class="rm-step-ring-value" cx="90" cy="90" r="78"
                    stroke-dasharray="{circ:.1}" stroke-dashoffset="{offset:.1}"></circle>
            </svg>
            <div class="rm-step-ring-copy">
                <strong id="rm-step-today-count">{today_steps}</strong>
                <small id="rm-step-today-caption">из {goal} сегодня</small>
            </div>
        </div>
        <div class="rm-step-stats">
            <div class="rm-step-stat"><strong id="rm-step-streak">{streak}</strong><small>серия дней</small></div>
            <div class="rm-step-stat"><strong id="rm-step-best">{best}</strong><small>лучший день</small></div>
            <div class="rm-step-stat"><strong id="rm-step-life">{life}</strong><small>вся тропа</small></div>
        </div>
        <p class="rm-step-hint" id="rm-step-status">Нажмите «Считать шаги».</p>
        <div class="rm-step-actions">
            <div class="rm-step-listen">
                <button type="button" class="rm-step-listen-btn" id="rm-step-listen">Считать шаги</button>
            </div>
            <div class="rm-step-chips">
                <button type="button" class="rm-step-chip" data-add="100">+100</button>
                <button type="button" class="rm-step-chip" data-add="250">+250</button>
                <button type="button" class="rm-step-chip" data-add="500">+500</button>
                <button type="button" class="rm-step-chip" data-add="1000">+1000</button>
            </div>
            <form class="rm-step-add" id="rm-step-add-form">
                <input id="rm-step-add-input" type="number" min="1" max="50000" inputmode="numeric" placeholder="Свои шаги">
                <button type="submit" class="ui-button rm-step-add-btn">Добавить</button>
            </form>
            <form class="rm-step-goal" id="rm-step-goal-form">
                <label for="rm-step-goal">Цель дня</label>
                <input id="rm-step-goal" type="number" min="1000" max="50000" value="{goal}">
                <button type="submit" class="ui-button rm-step-add-btn">Ок</button>
            </form>
        </div>
    </article>

    <section>
        {week_head}
        <div class="rm-step-week" id="rm-step-week">{week}</div>
    </section>

    <article class="card rm-step-day" id="rm-step-day">
        <small id="rm-step-day-date">День</small>
        <strong id="rm-step-day-steps">0</strong>
        <p class="rm-step-hint" id="rm-step-day-meta"></p>
    </article>

    <section>
        {path_head}
        <div class="rm-step-months" id="rm-step-months">{months}</div>
    </section>

    <section class="card" style="padding:16px">
        {log_head}
        <ul class="rm-step-log" id="rm-step-log">{log}</ul>
    </section>
</section>"#,
        today = escape_html(&snapshot.today),
        goal = snapshot.goal,
        circ = circ,
        offset = ring_offset(snapshot.today_steps, snapshot.goal),
        today_steps = snapshot.today_steps,
        streak = snapshot.streak,
        best = if snapshot.best_steps > 0 {
            snapshot.best_steps.to_string()
        } else {
            "—".to_string()
        },
        life = ru_count(snapshot.lifetime, "шаг", "шага", "шагов"),
        week_head = super::common::section_head("Неделя", "", None),
        week = render_week(&snapshot.days, &snapshot.today, snapshot.goal),
        path_head = super::common::section_head(
            "Месяц",
            "",
            Some(24),
        ),
        months = render_months(snapshot),
        log_head = super::common::section_head(
            "Лента",
            "",
            None,
        ),
        log = render_log(&snapshot.log),
    )
}

pub fn render_steps(snapshot: Option<&StepSnapshot>) -> String {
    let content = match snapshot {
        Some(snapshot) => authenticated_body(snapshot),
        None => guest_locked_section("Шагомер", "/app/steps"),
    };

    let main_html = format!(
        r#"{topbar}

{hero}

{content}"#,
        topbar = topbar("Шагомер", "footprints"),
        hero = back_hero(
            &back_link("/app/me", "Профиль", "arrow-left"),
            "footprints",
            "Тропа",
            "Шагомер",
            "Цель дня — 10 000 шагов.",
        ),
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
        "Шагомер · GRABIT",
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
        let html = render_steps(None);
        assert!(html.contains("Нужен аккаунт"));
        assert!(html.contains("/login?next="));
        assert!(html.contains("Шагомер"));
    }

    #[test]
    fn album_and_controls_render() {
        let html = render_steps(Some(&empty_snapshot()));
        assert!(html.contains("Месяц"));
        assert!(html.contains("Считать шаги"));
        assert!(html.contains("сентябр"));
        assert!(!html.contains("август"));
        assert!(!html.contains("2025"));
        assert!(html.contains("/static/pedometer.js"));
    }
}
