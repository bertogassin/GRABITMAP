use super::common::{back_link, bottom_nav, escape_html, page_document, simple_hero, topbar};

fn legal_article(paragraphs: &[&str]) -> String {
    paragraphs
        .iter()
        .map(|text| format!("<p>{}</p>", escape_html(text)))
        .collect::<Vec<_>>()
        .join("")
}

fn render_legal(title: &str, lead: &str, paragraphs: &[&str]) -> String {
    let body = format!(
        r#"{topbar}
{back}
{hero}
<article class="card" style="padding:18px 16px;display:grid;gap:12px;line-height:1.5">
{article}
</article>"#,
        topbar = topbar(title, "shield"),
        back = back_link("/app", "К карте", "arrow-left"),
        hero = simple_hero("shield", "GRABIT", title, lead),
        article = legal_article(paragraphs),
    );

    page_document(
        &format!("{title} · GRABIT"),
        "",
        "",
        &body,
        &bottom_nav("menu"),
        "",
    )
}

pub fn render_rules() -> String {
    render_legal(
        "Правила",
        "Как пользоваться картой работы, людей и бизнеса.",
        &[
            "GRABIT — площадка объявлений и чата. Пишите сразу. Потом можно заблокировать человека или удалить сообщение.",
            "Размещайте только правду: работу, услуги и людей, которые есть. Чужие данные, спам и обман запрещены.",
            "Объявление проходит проверку. Мы можем скрыть или отклонить его, если оно нарушает правила.",
            "Оценки и жалобы нужны, чтобы другим было проще выбрать. Не накручивайте их.",
            "Если что-то сломалось или кто-то нарушает правила, напишите из профиля или через жалобу на объявлении.",
        ],
    )
}

pub fn render_privacy() -> String {
    render_legal(
        "Политика",
        "Какие данные нужны, чтобы сайт работал.",
        &[
            "Для входа храним почту и пароль. Сессия держится в cookie браузера. Пароль в открытом виде не пишем.",
            "В аккаунте остаются профиль, объявления, избранное, чат и настройки. Это нужно, чтобы после обновления страницы всё было на месте.",
            "Если включена почта, шлём код входа и сброс пароля. Telegram не обязателен.",
            "Уведомления о сообщениях и важных событиях приходят на телефон только с вашего разрешения.",
            "Данные не продаём. Показываем объявления и статусы модерации тем, кому это нужно для работы сервиса.",
            "Выйти и закрыть другие сессии можно в профиле. Чтобы убрать объявление — удалите или скройте его там же.",
        ],
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rules_and_privacy_are_public() {
        let rules = render_rules();
        assert!(rules.contains("Правила"));
        assert!(rules.contains("Пишите сразу"));
        let privacy = render_privacy();
        assert!(privacy.contains("Политика"));
        assert!(privacy.contains("почту"));
        assert!(privacy.contains("/privacy") || privacy.contains("GRABIT"));
    }
}
