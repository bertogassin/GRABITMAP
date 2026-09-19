use super::common::{back_link, bottom_nav, escape_html, page_document, simple_hero, topbar};

pub fn invite_path(public_id: &str, to: &str) -> String {
    let id = urlencoding::encode(public_id.trim());
    match to {
        "chat" | "work" => format!("/app/join/{id}?to={to}"),
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
    <div class="card-title">{title}</div>
    <div class="card-meta">{body}</div>
    <div class="rm-invite-actions">
        <button type="button" class="ui-button" data-share data-share-title="{chat_share_title}" data-share-text="{chat_share_text}" data-share-url="{chat}" data-share-status="rm-invite-status">{chat_label}</button>
        <button type="button" class="ui-button" data-share data-share-title="{work_share_title}" data-share-text="{work_share_text}" data-share-url="{work}" data-share-status="rm-invite-status">{work_label}</button>
    </div>
    <p id="rm-invite-status" class="rm-invite-status-message" role="status"></p>
</section>"#,
        title = crate::i18n::t("invite_friend_title"),
        body = crate::i18n::t("invite_friend_body"),
        chat_share_title = escape_html(&crate::i18n::t("invite_chat_share_title")),
        chat_share_text = escape_html(&crate::i18n::t("invite_chat_share_text")),
        chat = escape_html(&invite_path(public_id, "chat")),
        chat_label = crate::i18n::t("common_chat"),
        work_share_title = escape_html(&crate::i18n::t("invite_work_share_title")),
        work_share_text = escape_html(&crate::i18n::t("invite_work_share_text")),
        work = escape_html(&invite_path(public_id, "work")),
        work_label = crate::i18n::t("common_work"),
    )
}

pub fn render_invite_landing(name: &str, public_id: &str, to: &str) -> String {
    let next = invite_path(public_id, to);
    let next_q = urlencoding::encode(&next);
    let title = match to {
        "chat" => crate::i18n::t("friend_invites_chat"),
        "work" => crate::i18n::t("friend_invites_work"),
        _ => crate::i18n::t("friend_invites_generic"),
    };
    let lead = match to {
        "chat" => crate::i18n::t("invite_chat_lead"),
        "work" => crate::i18n::t("invite_work_lead"),
        _ => crate::i18n::t("invite_generic_lead"),
    };
    let who = if name.trim().is_empty() {
        crate::i18n::t("member_fallback_name")
    } else {
        name.trim().to_string()
    };

    let body = format!(
        r#"{topbar}
{back}
{hero}
<article class="card rm-document-card">
    <p>{invited_by}</p>
    <div class="rm-invite-actions">
        <a class="ui-button" href="/login?next={next}">{login}</a>
        <a class="ui-button" href="/register?next={next}">{register}</a>
    </div>
</article>"#,
        topbar = topbar(&crate::i18n::t("invite_topbar_title"), "user"),
        back = back_link("/app", &crate::i18n::t("common_to_map"), "arrow-left"),
        hero = simple_hero("user", "GRABIT", &title, &lead),
        invited_by = crate::i18n::tf(
            "invited_by_label",
            &[("who", &format!("<strong>{}</strong>", escape_html(&who)))]
        ),
        next = next_q,
        login = crate::i18n::t("common_login"),
        register = crate::i18n::t("common_register"),
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn invite_links_stay_inside_app() {
        assert_eq!(invite_path("abc123", "retired"), "/app/join/abc123");
        let html = render_invite_landing("Анна", "abc123", "chat");
        assert!(html.contains("/login?next="));
        assert!(html.contains("/register?next="));
        assert!(html.contains("Анна"));
        assert_eq!(html.matches("<style").count(), 1);
        assert!(html.contains(".rm-invite-actions {"));
        assert!(html.contains(".rm-invite-card {"));
        assert!(!html.contains(".rm-invite-actions{"));
        assert!(!html.contains(".rm-invite-card{"));
        assert!(html.contains("class=\"card rm-document-card\""));
        assert!(!html.contains("style="));
        let share = invite_share_block("abc123");
        assert!(share.contains("/app/join/abc123?to=chat"));
        assert!(share.contains("/app/join/abc123?to=work"));
        assert!(share.contains("Пригласить друга"));
    }
}
