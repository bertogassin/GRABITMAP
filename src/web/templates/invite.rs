use super::common::{back_link, bottom_nav, escape_html, page_document, simple_hero, topbar};

pub fn invite_path(public_id: &str, to: &str) -> String {
    let id = urlencoding::encode(public_id.trim());
    match to {
        "steps" | "chat" | "work" => format!("/app/join/{id}?to={to}"),
        _ => format!("/app/join/{id}"),
    }
}

pub fn invite_share_block(public_id: &str) -> String {
    let public_id = public_id.trim();
    if public_id.is_empty() {
        return String::new();
    }

    format!(
        r#"<section class="card rm-invite-card">
    <div class="card-title">Пригласить друга</div>
    <div class="card-meta">Одна ссылка. После входа он сразу пишет вам и может открыть шагомер или работу.</div>
    <div class="rm-invite-actions">
        <button type="button" class="ui-button" data-share data-share-title="GRABIT · шагомер" data-share-text="Считаем шаги в GRABIT. Цель — 10 000. Заходи по моей ссылке." data-share-url="{steps}" data-share-status="rm-invite-status">Шагомер</button>
        <button type="button" class="ui-button" data-share data-share-title="GRABIT · написать" data-share-text="Напиши мне в GRABIT. Чат сразу, без заявки." data-share-url="{chat}" data-share-status="rm-invite-status">Чат</button>
        <button type="button" class="ui-button" data-share data-share-title="GRABIT · работа" data-share-text="Ищем работу рядом в GRABIT. Заходи по ссылке." data-share-url="{work}" data-share-status="rm-invite-status">Работа</button>
    </div>
    <p id="rm-invite-status" class="rm-step-hint" role="status"></p>
</section>"#,
        steps = escape_html(&invite_path(public_id, "steps")),
        chat = escape_html(&invite_path(public_id, "chat")),
        work = escape_html(&invite_path(public_id, "work")),
    )
}

pub fn render_invite_landing(name: &str, public_id: &str, to: &str) -> String {
    let next = invite_path(public_id, to);
    let next_q = urlencoding::encode(&next);
    let title = match to {
        "steps" => "Друг зовёт в шагомер",
        "chat" => "Друг зовёт в чат",
        "work" => "Друг зовёт к работе",
        _ => "Друг зовёт в GRABIT",
    };
    let lead = match to {
        "steps" => "Цель дня — 10 000 шагов. Войдите и шагомер откроется, а чат с другом будет уже на месте.",
        "chat" => "Напишите сразу. Потом можно заблокировать или удалить.",
        "work" => "После входа откроется поиск работы, и вы сразу сможете написать другу.",
        _ => "Шагомер, чат и работа рядом. Войдите — и вы уже у друга.",
    };
    let who = if name.trim().is_empty() {
        "Участник GRABIT".to_string()
    } else {
        name.trim().to_string()
    };

    let body = format!(
        r#"{topbar}
{back}
{hero}
<article class="card" style="padding:18px 16px;display:grid;gap:12px">
    <p>Вас зовёт <strong>{who}</strong>.</p>
    <div class="rm-invite-actions">
        <a class="ui-button" href="/login?next={next}">Войти</a>
        <a class="ui-button" href="/register?next={next}">Регистрация</a>
    </div>
</article>"#,
        topbar = topbar("Приглашение", "user"),
        back = back_link("/app", "К карте", "arrow-left"),
        hero = simple_hero("user", "GRABIT", title, lead),
        who = escape_html(&who),
        next = next_q,
    );

    page_document(
        &format!("{title} · GRABIT"),
        r#"<style>
.rm-invite-actions{display:flex;flex-wrap:wrap;gap:8px}
.rm-invite-card{padding:16px;display:grid;gap:10px}
</style>"#,
        "",
        &body,
        &bottom_nav("menu"),
        "",
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn invite_links_stay_inside_app() {
        assert_eq!(
            invite_path("abc123", "steps"),
            "/app/join/abc123?to=steps"
        );
        let html = render_invite_landing("Анна", "abc123", "chat");
        assert!(html.contains("/login?next="));
        assert!(html.contains("/register?next="));
        assert!(html.contains("Анна"));
        let share = invite_share_block("abc123");
        assert!(share.contains("/app/join/abc123?to=steps"));
        assert!(share.contains("Пригласить друга"));
    }
}
