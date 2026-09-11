use super::common::{
    back_hero, back_link, bottom_nav, bottom_nav_with_badge, empty_state_action, empty_state_card,
    empty_state_card_with_actions, escape_html, guest_locked_section, icon, page_document,
    page_shell, ru_count, section_head, simple_hero, static_asset, topbar,
};

// ============================================================
// TASK 7.22G-C — MESSAGES LIST
// ============================================================

pub(crate) fn conversation_display_name(
    _other_user_id: i64,
    username: &str,
    first_name: &str,
    last_name: &str,
) -> String {
    let safe_username = escape_html(username);
    let safe_first_name = escape_html(first_name);
    let safe_last_name = escape_html(last_name);

    let full_name = format!("{safe_first_name} {safe_last_name}")
        .trim()
        .to_string();

    if !full_name.is_empty() {
        full_name
    } else if !safe_username.is_empty() {
        format!("@{safe_username}")
    } else {
        "Участник GRABIT".to_string()
    }
}

pub(crate) fn format_inbox_time(updated_at: i64) -> String {
    if updated_at <= 0 {
        return String::new();
    }

    let paris = chrono_tz::Europe::Paris;
    let datetime = chrono::DateTime::<chrono::Utc>::from_timestamp(updated_at, 0)
        .map(|dt| dt.with_timezone(&paris));

    let Some(dt) = datetime else {
        return String::new();
    };

    let today = chrono::Utc::now().with_timezone(&paris).date_naive();
    let date = dt.date_naive();

    if date == today {
        dt.format("%H:%M").to_string()
    } else {
        dt.format("%d.%m").to_string()
    }
}

pub(crate) fn conversation_preview_text(value: &str) -> String {
    match value {
        "__deleted__" => crate::i18n::t("chat_deleted"),
        "__image__" => crate::i18n::t("chat_photo"),
        "__voice__" => crate::i18n::t("chat_voice"),
        _ => value.to_string(),
    }
}

fn inbox_unread_caption(total_unread: i64) -> String {
    if total_unread <= 0 {
        crate::i18n::t("chat_all_read")
    } else if total_unread == 1 {
        crate::i18n::tf("inbox_unread_one", &[("n", &total_unread.to_string())])
    } else {
        crate::i18n::tf("inbox_unread_many", &[("n", &total_unread.to_string())])
    }
}

pub fn render_messages(
    authenticated: bool,
    viewer_public_id: &str,
    conversations: Vec<crate::web::view_models::ConversationRow>,
    share_listing_id: Option<i64>,
    archived: bool,
) -> String {
    let total_unread: i64 = conversations.iter().map(|c| c.unread_count).sum();

    let content = if !authenticated {
        guest_locked_section(&crate::i18n::t("chat_title"), "/app/messages")
    } else if conversations.is_empty() {
        empty_state_card_with_actions(
            &crate::i18n::t("inbox_empty_title"),
            &crate::i18n::t("inbox_empty_body"),
            &format!(
                "{}{}",
                empty_state_action("/app/search", &crate::i18n::t("inbox_find_people")),
                empty_state_action("/app/groups/new", &crate::i18n::t("chat_new_group")),
            ),
        )
    } else {
        conversations
            .iter()
            .map(|conversation| {
                let other_user_id = conversation.other_user_id;
                let other_public_id = &conversation.other_public_id;
                let username = &conversation.username;
                let first_name = &conversation.first_name;
                let last_name = &conversation.last_name;
                let last_message = &conversation.last_message;
                let unread_count = conversation.unread_count;
                let updated_at = conversation.updated_at;
                let safe_username = escape_html(username);

                let is_group = conversation.is_group;
                let group_id = conversation.group_id;
                let base_href = if is_group && group_id > 0 {
                    format!("/app/group/{group_id}")
                } else if !other_public_id.is_empty() {
                    format!("/app/chat/{}", urlencoding::encode(other_public_id))
                } else {
                    "/app/messages".to_string()
                };
                let href = match share_listing_id {
                    Some(listing_id) if listing_id > 0 => {
                        format!("{base_href}?share={listing_id}")
                    }
                    _ => base_href,
                };
                let kind = if is_group { "group" } else { "dm" };
                let display_name = if is_group && !first_name.trim().is_empty() {
                    escape_html(first_name)
                } else {
                    conversation_display_name(other_user_id, username, first_name, last_name)
                };
                let official_badge = if is_group && !conversation.group_scope_type.is_empty() {
                    let label = match conversation.group_scope_type.as_str() {
                        "world" => "Официальная группа мира",
                        "continent" => "Официальная группа континента",
                        "country" => "Официальная группа страны",
                        "city" => "Официальная группа города",
                        _ => "Официальная группа",
                    };
                    format!(
                        r#"<span class="chat-official-group" data-scope-id="{}">✓ {}</span>"#,
                        conversation.group_scope_id,
                        escape_html(label),
                    )
                } else {
                    String::new()
                };

                let safe_last_message = escape_html(&conversation_preview_text(last_message));

                let username_html = if !safe_username.is_empty() {
                    format!(
                        r#"<div class="card-meta rm-dialog-username">@{username}</div>"#,
                        username = safe_username,
                    )
                } else {
                    String::new()
                };

                let has_last_message = !safe_last_message.is_empty();

                let last_time = if has_last_message {
                    format_inbox_time(updated_at)
                } else {
                    String::new()
                };

                let last_message_html = if has_last_message {
                    safe_last_message
                } else if is_group {
                    crate::i18n::t("chat_new_group_preview")
                } else {
                    crate::i18n::t("chat_new_dialog")
                };

                let unread_html = if unread_count > 0 {
                    format!(
                        r#"<span class="chat-dialog-unread" aria-label="{label}">{count}</span>"#,
                        count = if unread_count > 99 {
                            "99+".to_string()
                        } else {
                            unread_count.to_string()
                        },
                        label = escape_html(&inbox_unread_caption(unread_count)),
                    )
                } else {
                    String::new()
                };
                let target_id = if is_group {
                    group_id.to_string()
                } else {
                    urlencoding::encode(other_public_id).into_owned()
                };
                let preference_kind = if is_group { "group" } else { "direct" };
                let return_view = if archived { "archived" } else { "active" };
                let muted = conversation.muted_until > chrono::Utc::now().timestamp();
                let controls = format!(
                    r#"<details class="chat-dialog-controls">
    <summary aria-label="Действия с чатом">{more_icon}</summary>
    <div class="chat-dialog-menu" role="menu">
    <form method="post" action="/app/chat-preference/{preference_kind}/{target_id}">
        <input type="hidden" name="action" value="{pin_action}"><input type="hidden" name="return_view" value="{return_view}">
        <button type="submit">{pin_icon}<span>{pin_label}</span></button>
    </form>
    <form method="post" action="/app/chat-preference/{preference_kind}/{target_id}">
        <input type="hidden" name="action" value="{mute_action}"><input type="hidden" name="return_view" value="{return_view}">
        <button type="submit">{mute_icon}<span>{mute_label}</span></button>
    </form>
    <form method="post" action="/app/chat-preference/{preference_kind}/{target_id}">
        <input type="hidden" name="action" value="{archive_action}"><input type="hidden" name="return_view" value="{return_view}">
        <button type="submit">{archive_icon}<span>{archive_label}</span></button>
    </form>
</div>
</details>"#,
                    more_icon = r#"<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>"#,
                    pin_action = if conversation.pinned_at > 0 { "unpin" } else { "pin" },
                    pin_label = if conversation.pinned_at > 0 { "Открепить" } else { "Закрепить" },
                    pin_icon = r#"<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 6 0-1 5 3 3v2H7v-2l3-3-1-5Z"/><path d="M12 14v6"/></svg>"#,
                    mute_action = if muted { "unmute" } else { "mute" },
                    mute_label = if muted { "Включить уведомления" } else { "Отключить уведомления" },
                    mute_icon = r#"<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>"#,
                    archive_action = if archived { "unarchive" } else { "archive" },
                    archive_label = if archived { "Вернуть из архива" } else { "В архив" },
                    archive_icon = r#"<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v13H4z"/><path d="M3 3h18v4H3z"/><path d="M9 11h6"/></svg>"#,
                );

                format!(
                    r#"
<article class="chat-dialog-entry" data-inbox-entry>
<a href="{href}#chat-end"
   class="card chat-dialog-card"
   data-other-public-id="{other_public_id}"
   data-group-id="{group_id}"
   data-kind="{kind}">

    <div class="card-icon chat-dialog-avatar">
        {avatar_html}
    </div>

    <div class="card-content">

        <div class="card-title">
            {display_name}
        </div>

        {official_badge}

        {username_html}

        <div class="card-meta chat-dialog-preview">
            {last_message}
        </div>

    </div>

    <div class="chat-dialog-side">

        <div class="chat-dialog-time">
            {last_time}
        </div>

        {unread_html}

        <div class="card-arrow">
            {arrow}
        </div>

    </div>

</a>
{controls}
</article>
"#,
                    href = href,
                    other_public_id = escape_html(other_public_id),
                    group_id = if group_id > 0 { group_id.to_string() } else { String::new() },
                    kind = kind,
                    avatar_html = if is_group && conversation.has_avatar && group_id > 0 {
                        format!(
                            r#"<img class="rm-me-avatar-img" src="/api/group/{group_id}/avatar" alt="" onerror="this.remove()">{icon}"#,
                            icon = icon("users")
                        )
                    } else if !is_group
                        && conversation.has_avatar
                        && !other_public_id.is_empty()
                    {
                        format!(
                            r#"<img class="rm-me-avatar-img" src="/api/public-avatars/{}" alt="" onerror="this.remove()">"#,
                            urlencoding::encode(other_public_id)
                        )
                    } else {
                        icon(if is_group { "users" } else { "message-circle" }).to_string()
                    },
                    display_name = display_name,
                    official_badge = official_badge,
                    username_html = username_html,
                    last_message = last_message_html,
                    last_time = last_time,
                    unread_html = unread_html,
                    arrow = icon("chevron"),
                    controls = controls,
                )
            })
            .collect::<Vec<_>>()
            .join("")
    };

    let unread_caption = inbox_unread_caption(total_unread);
    let section_head_dialogs = if authenticated {
        format!(
            r#"<div class="section-head" id="inbox-section-head">
    <div>
        <h2 class="section-title">{dialogs}</h2>
        <p class="section-caption" id="inbox-unread-caption">{unread_caption}</p>
    </div>
    <div class="inbox-head-actions">
        <a href="/app/official-groups" class="ui-button ui-button--secondary inbox-group-btn">Официальные</a>
        <a href="/app/groups/new" class="ui-button inbox-group-btn">{group}</a>
        <span class="inbox-live-badge" id="inbox-live-badge" hidden aria-hidden="true">{live}</span>
    </div>
</div>"#,
            dialogs = crate::i18n::t("chat_dialogs"),
            unread_caption = unread_caption,
            group = crate::i18n::t("chat_group"),
            live = crate::i18n::t("chat_link_ok"),
        )
    } else {
        section_head(&crate::i18n::t("chat_dialogs"), &unread_caption, None)
    };

    let list_attributes = if authenticated {
        format!(
            r#" id="chat-dialog-list" data-inbox-live="1" data-viewer-public-id="{}" data-inbox-view="{}""#,
            escape_html(viewer_public_id),
            if archived { "archived" } else { "active" },
        )
    } else {
        String::new()
    };

    let inbox_script = if authenticated {
        format!(
            r#"<script src="{inbox_js}" defer></script>"#,
            inbox_js = static_asset("inbox.js"),
        )
    } else {
        String::new()
    };

    let inbox_search = if authenticated {
        format!(
            r#"<label class="inbox-search" for="inbox-search-input">
    <span class="inbox-search-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg></span>
    <input id="inbox-search-input"
           type="search"
           autocomplete="off"
           placeholder="{placeholder}"
           aria-label="{label}">
</label>"#,
            placeholder = crate::i18n::t("search_what"),
            label = crate::i18n::t("nav_search"),
        )
    } else {
        String::new()
    };
    let inbox_views = if authenticated {
        format!(
            r#"<nav class="inbox-views" aria-label="Разделы чатов">
    <a href="/app/messages" class="{}">Активные</a>
    <a href="/app/messages?view=archived" class="{}">Архив</a>
</nav>"#,
            if archived { "" } else { "is-active" },
            if archived { "is-active" } else { "" },
        )
    } else {
        String::new()
    };

    let share_notice = match share_listing_id {
        Some(listing_id) if authenticated && listing_id > 0 => format!(
            r#"<aside class="chat-share-notice" role="status">
    <img src="{mascot}" alt="" width="72" height="44">
    <div>
        <strong>{title}</strong>
        <span>{body}</span>
    </div>
    <a href="/app/messages" aria-label="{cancel}">×</a>
</aside>"#,
            mascot = static_asset("grabit-mascot-v2.png"),
            title = crate::i18n::t("chat_share_choose_title"),
            body = crate::i18n::t("chat_share_choose_body"),
            cancel = crate::i18n::t("chat_share_cancel"),
        ),
        _ => String::new(),
    };

    let content_html = format!(
        r####"<link rel="stylesheet"
      href="{chat_css}">

{share_notice}

{section_head_dialogs}

{inbox_views}

{inbox_search}

<section class="chat-dialog-list"{list_attributes}>

    {content}

</section>

{inbox_script}"####,
        chat_css = static_asset("chat-v2.css"),
        share_notice = share_notice,
        section_head_dialogs = section_head_dialogs,
        inbox_search = inbox_search,
        inbox_views = inbox_views,
        list_attributes = list_attributes,
        content = content,
        inbox_script = inbox_script,
    );

    page_shell(
        &format!("{} · GRABIT", crate::i18n::t("chat_title")),
        &topbar(&crate::i18n::t("chat_title"), "message-circle"),
        &simple_hero(
            "message-circle",
            &crate::i18n::t("chat_title"),
            &crate::i18n::t("chat_dialogs"),
            &crate::i18n::t("chat_lead"),
        ),
        &content_html,
        &bottom_nav_with_badge("chats", total_unread),
    )
}

// ============================================================
// TASK 7.22F-E — CHAT
// ============================================================

fn chat_message_body_html(message: &crate::web::view_models::ChatMessageRow) -> String {
    if message.deleted_at > 0 {
        return format!(
            r#"<div class="chat-message-body is-deleted">{}</div>"#,
            crate::i18n::t("chat_deleted")
        );
    }

    if message.attachment_kind == "voice" && !message.attachment_url.is_empty() {
        return format!(
            r#"<div class="chat-message-body chat-message-body--voice"><div class="chat-voice-player"><audio controls preload="metadata" class="chat-voice-audio" src="{url}"></audio></div></div>"#,
            url = escape_html(&message.attachment_url),
        );
    }

    if message.attachment_kind == "image" && !message.attachment_url.is_empty() {
        let caption_html = if message.message.is_empty() {
            String::new()
        } else {
            format!(
                r#"<div class="chat-message-caption">{}</div>"#,
                escape_html(&message.message)
            )
        };

        return format!(
            r#"<div class="chat-message-body chat-message-body--image"><img class="chat-message-image" src="{url}" alt="{photo}" loading="lazy" decoding="async" role="button" tabindex="0">{caption}</div>"#,
            url = escape_html(&message.attachment_url),
            photo = crate::i18n::t("chat_photo_label"),
            caption = caption_html,
        );
    }

    format!(
        r#"<div class="chat-message-body">{}</div>"#,
        escape_html(&message.message)
    )
}

fn chat_reply_author_label(
    reply_sender_user_id: i64,
    reply_sender_name: &str,
    viewer_user_id: i64,
    other_user_id: i64,
) -> String {
    if reply_sender_user_id <= 0 {
        return crate::i18n::t("chat_message");
    }

    if reply_sender_user_id == viewer_user_id {
        crate::i18n::t("chat_you")
    } else if other_user_id <= 0 && !reply_sender_name.trim().is_empty() {
        reply_sender_name.trim().to_string()
    } else if reply_sender_user_id == other_user_id {
        crate::i18n::t("chat_peer")
    } else {
        crate::i18n::t("chat_message")
    }
}

fn render_chat_message_row(
    message: &crate::web::view_models::ChatMessageRow,
    viewer_user_id: i64,
    other_user_id: i64,
    last_date_key: &mut String,
) -> String {
    let mine = message.sender_user_id == viewer_user_id;
    let mine_attribute = if mine { "1" } else { "0" };
    let deleted = message.deleted_at > 0;
    let show_author = other_user_id <= 0 && !mine && !message.sender_name.trim().is_empty();
    let author_html = if show_author {
        format!(
            r#"<div class="chat-message-author">{}</div>"#,
            escape_html(&message.sender_name)
        )
    } else {
        String::new()
    };

    let status = if mine {
        if message.read_at > 0 {
            ("✓✓", " is-read")
        } else if message.delivered_at > 0 {
            ("✓✓", "")
        } else if message.is_read != 0 {
            ("✓✓", " is-read")
        } else {
            ("✓", "")
        }
    } else {
        ("", "")
    };

    let paris = chrono_tz::Europe::Paris;
    let datetime = chrono::DateTime::<chrono::Utc>::from_timestamp(message.created_at, 0)
        .map(|dt| dt.with_timezone(&paris));

    let chat_time = datetime
        .as_ref()
        .map(|dt| dt.format("%H:%M").to_string())
        .unwrap_or_default();

    let date_key = datetime
        .as_ref()
        .map(|dt| dt.format("%Y-%m-%d").to_string())
        .unwrap_or_default();

    let date_label = if let Some(dt) = datetime.as_ref() {
        dt.format("%d.%m.%Y").to_string()
    } else {
        String::new()
    };

    let date_separator = if !date_key.is_empty() && date_key != *last_date_key {
        *last_date_key = date_key.clone();

        format!(
            r#"
<div class="chat-date-chip-wrap">
    <span class="chat-date-chip">{date_label}</span>
</div>
"#
        )
    } else {
        String::new()
    };

    let row_class = if mine {
        "chat-message-row is-mine"
    } else {
        "chat-message-row is-theirs"
    };

    let bubble_class = if deleted {
        "chat-bubble is-deleted"
    } else {
        "chat-bubble"
    };

    let reply_html = if message.reply_to_message_id > 0 {
        let reply_preview = escape_html(&message.reply_message);
        let reply_author = escape_html(&chat_reply_author_label(
            message.reply_sender_user_id,
            &message.reply_sender_name,
            viewer_user_id,
            other_user_id,
        ));

        format!(
            r#"
        <button type="button"
                class="chat-reply-quote"
                data-target-message-id="{reply_to}">
            <strong>{reply_author}</strong>
            <span>{reply_preview}</span>
        </button>"#,
            reply_to = message.reply_to_message_id,
            reply_author = reply_author,
            reply_preview = reply_preview,
        )
    } else {
        String::new()
    };

    let edited_html = if message.edited_at > 0 && !deleted {
        format!(
            r#"<span class="chat-edited-label">{}</span>"#,
            crate::i18n::t("chat_edited")
        )
    } else {
        String::new()
    };

    let display_body = chat_message_body_html(message);
    let safe_message_text = escape_html(&message.message);
    let attachment_kind = escape_html(&message.attachment_kind);
    let attachment_url = escape_html(&message.attachment_url);

    let reactions_html = if deleted || message.reactions.is_empty() {
        String::new()
    } else {
        let pills = message
            .reactions
            .iter()
            .map(|reaction| {
                let mine_class = if reaction.mine {
                    " is-mine"
                } else {
                    ""
                };

                format!(
                    r#"<button type="button" class="chat-reaction-pill{mine_class}" data-emoji="{emoji}">{emoji} <span>{count}</span></button>"#,
                    mine_class = mine_class,
                    emoji = escape_html(&reaction.emoji),
                    count = reaction.count,
                )
            })
            .collect::<Vec<_>>()
            .join("");

        format!(r#"<div class="chat-message-reactions">{pills}</div>"#)
    };

    format!(
        r#"
{date_separator}

<div class="{row_class}"
     data-message-id="{message_id}"
     data-mine="{mine_attribute}"
     data-deleted="{deleted_flag}"
     data-edited-at="{edited_at}"
     data-reply-to="{reply_to}"
     data-reply-message="{reply_message}"
     data-reply-mine="{reply_mine}"
     data-reply-sender-name="{reply_sender_name}"
     data-sender-name="{sender_name}"
     data-read-at="{read_at}"
     data-delivered-at="{delivered_at}"
     data-created-at="{created_at}"
     data-message-text="{message_text}"
     data-client-message-id="{client_message_id}"
     data-attachment-kind="{attachment_kind}"
     data-attachment-url="{attachment_url}">

    <div class="{bubble_class}">
        <button type="button" class="chat-message-more" aria-label="{actions_aria}">⋮</button>
        {author_html}
        {reply_html}
        {display_body}
        {reactions_html}
        {edited_html}
        <div class="chat-message-meta">
            <span>{chat_time}</span>
            <span class="chat-message-status{status_class}">{status_mark}</span>
        </div>
    </div>

</div>
"#,
        row_class = row_class,
        message_id = message.id,
        mine_attribute = mine_attribute,
        deleted_flag = if deleted { "1" } else { "0" },
        edited_at = message.edited_at,
        reply_to = message.reply_to_message_id,
        reply_message = escape_html(&message.reply_message),
        reply_mine = if message.reply_sender_user_id == viewer_user_id {
            "1"
        } else {
            "0"
        },
        reply_sender_name = escape_html(&message.reply_sender_name),
        sender_name = escape_html(&message.sender_name),
        read_at = message.read_at,
        delivered_at = message.delivered_at,
        created_at = message.created_at,
        message_text = safe_message_text,
        client_message_id = escape_html(&message.client_message_id),
        bubble_class = bubble_class,
        actions_aria = crate::i18n::t("chat_actions_aria"),
        author_html = author_html,
        reply_html = reply_html,
        display_body = display_body,
        reactions_html = reactions_html,
        attachment_kind = attachment_kind,
        attachment_url = attachment_url,
        edited_html = edited_html,
        chat_time = chat_time,
        status_class = status.1,
        status_mark = status.0,
        date_separator = date_separator,
    )
}

#[allow(clippy::too_many_arguments)]
pub fn render_chat(
    authenticated: bool,
    viewer_user_id: i64,
    viewer_public_id: &str,
    other_user_id: i64,
    other_public_id: &str,
    username: &str,
    first_name: &str,
    last_name: &str,
    messages: Vec<crate::web::view_models::ChatMessageRow>,
) -> String {
    render_chat_thread(
        authenticated,
        viewer_user_id,
        viewer_public_id,
        other_user_id,
        other_public_id,
        0,
        username,
        first_name,
        last_name,
        messages,
    )
}

#[allow(clippy::too_many_arguments)]
pub fn render_group_chat(
    authenticated: bool,
    viewer_user_id: i64,
    viewer_public_id: &str,
    group_id: i64,
    group_name: &str,
    group_description: &str,
    member_count: i64,
    messages: Vec<crate::web::view_models::ChatMessageRow>,
) -> String {
    let subtitle = if group_description.trim().is_empty() {
        ru_count(member_count, "участник", "участника", "участников")
    } else {
        group_description.trim().to_string()
    };
    render_chat_thread(
        authenticated,
        viewer_user_id,
        viewer_public_id,
        0,
        "",
        group_id,
        "",
        group_name,
        &subtitle,
        messages,
    )
}

#[allow(clippy::too_many_arguments)]
fn render_chat_thread(
    authenticated: bool,
    viewer_user_id: i64,
    viewer_public_id: &str,
    other_user_id: i64,
    other_public_id: &str,
    group_id: i64,
    username: &str,
    first_name: &str,
    last_name: &str,
    messages: Vec<crate::web::view_models::ChatMessageRow>,
) -> String {
    let safe_username = escape_html(username);
    let safe_first_name = escape_html(first_name);
    let safe_last_name = escape_html(last_name);

    let full_name = format!("{} {}", safe_first_name, safe_last_name)
        .trim()
        .to_string();

    let display_name = if group_id > 0 && !safe_first_name.is_empty() {
        safe_first_name.clone()
    } else if !full_name.is_empty() {
        full_name
    } else if !safe_username.is_empty() {
        format!("@{}", safe_username)
    } else if other_user_id > 0 {
        "Участник GRABIT".to_string()
    } else {
        "Группа".to_string()
    };

    let subtitle = if group_id > 0 && !safe_last_name.is_empty() {
        safe_last_name.clone()
    } else if !safe_username.is_empty() {
        format!("@{}", safe_username)
    } else {
        "Личный диалог".to_string()
    };

    let content = if !authenticated {
        guest_locked_section(
            "Чат",
            &if group_id > 0 {
                format!("/app/group/{group_id}")
            } else if !other_public_id.is_empty() {
                format!("/app/chat/{}", urlencoding::encode(other_public_id))
            } else {
                "/app/messages".to_string()
            },
        )
    } else if group_id <= 0 && (other_user_id <= 0 || other_user_id == viewer_user_id) {
        empty_state_card("Чат недоступен", "Диалог недоступен.")
    } else {
        let first_message_id = messages.first().map(|message| message.id).unwrap_or(0);

        let last_message_id = messages.last().map(|message| message.id).unwrap_or(0);

        let may_have_older = if messages.len() >= 100 { "1" } else { "0" };

        let message_cards = if messages.is_empty() {
            r#"
<div class="chat-empty-thread">
    <div class="chat-empty-thread-icon" aria-hidden="true"></div>
    <strong>Диалог открыт</strong>
    <p>Напишите сообщение.</p>
</div>
"#
            .to_string()
        } else {
            let mut last_date_key = String::new();

            messages
                .iter()
                .map(|message| {
                    render_chat_message_row(
                        message,
                        viewer_user_id,
                        other_user_id,
                        &mut last_date_key,
                    )
                })
                .collect::<Vec<_>>()
                .join("")
        };

        let composer = r#"
<form id="chat-form"
      class="ui-form chat-composer">

    <div id="chat-reply-bar"
         class="chat-reply-bar"
         hidden>
        <div class="chat-reply-accent"></div>
        <div class="chat-reply-copy">
            <strong>Ответ</strong>
            <span id="chat-reply-text"></span>
        </div>
        <button id="chat-reply-close"
                type="button"
                aria-label="Отменить ответ">
            ×
        </button>
    </div>

    <div id="chat-forward-bar"
         class="chat-forward-bar"
         hidden>
        <div class="chat-forward-accent"></div>
        <div class="chat-reply-copy">
            <strong>Переслать</strong>
            <span id="chat-forward-text"></span>
        </div>
        <button id="chat-forward-close"
                type="button"
                aria-label="Отменить пересылку">
            ×
        </button>
    </div>

    <div class="chat-composer-main">
        <textarea id="chat-input" name="message" rows="1" maxlength="2000" required autocomplete="off" enterkeyhint="send" aria-label="Текст сообщения" placeholder="Сообщение…" class="ui-textarea chat-input"></textarea>
    </div>
    <input type="file" id="chat-image-input" accept="image/jpeg,image/png,image/webp" class="chat-file-input">
    <button id="chat-voice-btn" type="button" class="chat-voice-btn">
        <span class="chat-action-icon" aria-hidden="true">●</span>
        <span class="chat-action-label">Голос</span>
    </button>
    <button id="chat-image-btn" type="button" class="chat-image-btn">
        <span class="chat-action-icon" aria-hidden="true">▣</span>
        <span class="chat-action-label">Фото</span>
    </button>
    <button id="chat-send" type="submit" class="ui-button chat-send-button">
        <span class="chat-action-icon" aria-hidden="true">➤</span>
        <span class="chat-action-label">Отправить</span>
    </button>
    <div class="chat-composer-footer"><span id="chat-send-state">Enter — отправить · Shift+Enter — новая строка</span><span id="chat-counter">0 / 2000</span></div>
</form>
"#;

        format!(
            r#"
<link rel="stylesheet"
      href="{chat_css}">

<section class="card chat-shell">

    <section id="chat-search-panel"
             class="chat-search-panel"
             aria-label="{search_label}"
             hidden>
        <form id="chat-search-form" class="chat-search-form" role="search">
            <span class="chat-search-icon" aria-hidden="true">⌕</span>
            <input id="chat-search-input"
                   type="search"
                   minlength="2"
                   maxlength="100"
                   autocomplete="off"
                   enterkeyhint="search"
                   placeholder="{search_placeholder}"
                   aria-label="{search_label}">
            <button id="chat-search-close"
                    type="button"
                    aria-label="{close_label}">×</button>
        </form>
        <div id="chat-search-status"
             class="chat-search-status"
             aria-live="polite"></div>
        <div id="chat-search-results"
             class="chat-search-results"></div>
    </section>

    <div class="chat-history-toolbar">
        <button id="chat-load-older"
                type="button"
                class="chat-secondary-button"
                hidden>
            Загрузить предыдущие сообщения
        </button>

        <div class="chat-toolbar-status">
            <span id="chat-connection-state"
                  class="chat-connection-state">
                Подключение…
            </span>

            <span id="chat-peer-state"
                  class="chat-peer-state"
                  hidden></span>
        </div>
    </div>

    <div id="chat-messages"
         data-other-public-id="{other_public_id}"
         data-group-id="{group_id_attr}"
         data-viewer-public-id="{viewer_public_id}"
         data-first-message-id="{first_message_id}"
         data-last-message-id="{last_message_id}"
         data-may-have-older="{may_have_older}"
         aria-live="polite"
         class="chat-messages-panel">
        <div id="chat-history-start"></div>
        {message_cards}
        <div id="chat-end"></div>
    </div>

    <button id="chat-scroll-bottom"
            type="button"
            class="chat-scroll-bottom"
            hidden
            aria-label="К новым сообщениям">
        <span aria-hidden="true">↓</span>
        <span id="chat-scroll-unread"
              class="chat-scroll-unread"
              hidden></span>
    </button>

    {composer}

</section>


<script src="{chat_voice_js}" defer></script>
<script src="{chat_js}" defer></script>
<script src="{chat_search_js}" defer></script>
<script src="{chat_blocks_js}" defer></script>

"#,
            chat_css = static_asset("chat-v2.css"),
            chat_voice_js = static_asset("chat-voice-player.js"),
            chat_js = static_asset("chat-v2.js"),
            chat_search_js = static_asset("chat-search.js"),
            chat_blocks_js = static_asset("chat-blocks.js"),
            search_label = escape_html(&crate::i18n::t("nav_search")),
            search_placeholder = escape_html(&crate::i18n::t("search_what")),
            close_label = escape_html(&crate::i18n::t("chat_close")),
            other_public_id = escape_html(other_public_id),
            viewer_public_id = escape_html(viewer_public_id),
            group_id_attr = if group_id > 0 {
                group_id.to_string()
            } else {
                String::new()
            },
            first_message_id = first_message_id,
            last_message_id = last_message_id,
            may_have_older = may_have_older,
            message_cards = message_cards,
            composer = composer,
        )
    };

    let content_html = format!(
        r####"<section class="hero chat-header-premium">

    {back_link}

    <div class="chat-header-main">

        <div class="chat-avatar-ring" aria-hidden="true">
            <div class="card-icon chat-header-avatar">
                {header_avatar}
            </div>
            <span id="chat-header-presence-dot"
                  class="chat-header-presence-dot"
                  hidden></span>
        </div>

        <div class="chat-header-copy">

            <h1 class="chat-header-title">
                {display_name}
            </h1>

            <div id="chat-header-status"
                 class="chat-header-status"
                 data-default-subtitle="{subtitle}">
                {subtitle}
            </div>

        </div>

        <div class="chat-header-actions">
            <button id="chat-header-more"
                    type="button"
                    class="chat-header-more"
                    aria-label="Меню чата"
                    aria-expanded="false"
                    aria-controls="chat-header-menu">
                ⋮
            </button>
            <div id="chat-header-menu" class="chat-header-menu" hidden>
                <button id="chat-search-toggle"
                        type="button"
                        class="chat-sound-toggle">
                    {search_label}
                </button>
                <button id="chat-sound-toggle"
                        type="button"
                        class="chat-sound-toggle"
                        aria-label="Звуки чата"
                        aria-pressed="true">
                    Звук
                </button>
                <button id="chat-haptic-toggle"
                        type="button"
                        class="chat-sound-toggle chat-haptic-toggle"
                        aria-label="Вибрация чата"
                        aria-pressed="true">
                    Вибро
                </button>
                <button id="chat-block-toggle"
                        type="button"
                        class="chat-block-toggle"
                        hidden>
                    Заблокировать
                </button>
                {group_menu}
            </div>
        </div>

    </div>

</section>

{content}"####,
        back_link = back_link("/app/messages", "Назад", "arrow-left"),
        header_avatar = if other_user_id > 0 && !other_public_id.is_empty() {
            format!(
                r#"<img class="rm-me-avatar-img" src="/api/public-avatars/{public_id}" alt="" onerror="this.remove()">{icon}"#,
                public_id = urlencoding::encode(other_public_id),
                icon = icon("user")
            )
        } else if group_id > 0 {
            format!(
                r#"<img class="rm-me-avatar-img" src="/api/group/{group_id}/avatar" alt="" onerror="this.remove()">{icon}"#,
                icon = icon("users")
            )
        } else {
            icon("user").to_string()
        },
        group_menu = if group_id > 0 {
            format!(
                r#"<a href="/app/group/{group_id}/members" class="chat-sound-toggle">Управление группой</a>"#
            )
        } else {
            String::new()
        },
        search_label = escape_html(&crate::i18n::t("nav_search")),
        display_name = display_name,
        subtitle = subtitle,
        content = content,
    );

    page_document(
        "Чат · GRABIT",
        r#"<script>document.documentElement.dataset.page="chat";</script>"#,
        "",
        &format!(
            "{topbar}\n\n{content}",
            topbar = topbar("Чат", "message-circle"),
            content = content_html,
        ),
        &bottom_nav("chats"),
        "",
    )
}

#[derive(Debug, Clone)]
pub struct OfficialGroupPlace {
    pub scope_type: String,
    pub scope_id: i64,
    pub name: String,
    pub group_id: i64,
    pub member_count: i64,
}

pub struct OfficialGroupsPage<'a> {
    pub authenticated: bool,
    pub scope_type: &'a str,
    pub scope_id: i64,
    pub name: &'a str,
    pub parent_type: &'a str,
    pub parent_id: i64,
    pub parent_name: &'a str,
    pub group_id: i64,
    pub member_count: i64,
    pub is_member: bool,
    pub query: &'a str,
    pub children: Vec<OfficialGroupPlace>,
    pub error: &'a str,
}

pub fn render_official_groups(params: OfficialGroupsPage<'_>) -> String {
    let level = match params.scope_type {
        "world" => "Мир",
        "continent" => "Континент",
        "country" => "Страна",
        "city" => "Город",
        _ => "Место",
    };
    let current_href = format!(
        "/app/official-groups?scope_type={}&scope_id={}",
        params.scope_type, params.scope_id
    );
    let back = if params.parent_id > 0 {
        back_link(
            &format!(
                "/app/official-groups?scope_type={}&scope_id={}",
                params.parent_type, params.parent_id
            ),
            params.parent_name,
            "arrow-left",
        )
    } else {
        back_link("/app/messages", "Чаты", "arrow-left")
    };
    let error_html = if params.error.is_empty() {
        String::new()
    } else {
        format!(
            r#"<p class="ui-status is-error">{}</p>"#,
            escape_html(params.error)
        )
    };
    let group_card = if params.group_id > 0 && params.is_member {
        format!(
            r#"<section class="card official-group-current">
    <span class="chat-official-group">✓ Официальная группа</span>
    <h2>{name}</h2>
    <p class="card-meta">{members} участников · история доступна после вступления</p>
    <a class="ui-button" href="/app/group/{group_id}">Открыть чат</a>
</section>"#,
            name = escape_html(params.name),
            members = params.member_count,
            group_id = params.group_id,
        )
    } else if params.authenticated {
        format!(
            r#"<form method="post" action="/app/official-groups/{scope_type}/{scope_id}/join" class="card official-group-current">
    <span class="chat-official-group">✓ Официальная группа GRABIT</span>
    <h2>{name}</h2>
    <p class="card-meta">{status} · история группы доступна после вступления</p>
    <button class="ui-button" type="submit">Вступить в группу</button>
</form>"#,
            scope_type = params.scope_type,
            scope_id = params.scope_id,
            name = escape_html(params.name),
            status = if params.group_id > 0 {
                format!("{} участников", params.member_count)
            } else {
                "Готова к первому участнику".to_string()
            },
        )
    } else {
        let next = urlencoding::encode(&current_href);
        format!(
            r#"<section class="card official-group-current">
    <span class="chat-official-group">✓ Официальная группа GRABIT</span>
    <h2>{name}</h2>
    <p class="card-meta">{status}</p>
    <a class="ui-button" href="/login?next={next}">Войти и вступить</a>
</section>"#,
            name = escape_html(params.name),
            status = if params.group_id > 0 {
                format!("{} участников", params.member_count)
            } else {
                "Готова к первому участнику".to_string()
            },
        )
    };
    let search = if params.scope_type == "city" {
        String::new()
    } else {
        format!(
            r#"<form method="get" action="/app/official-groups" class="official-group-search">
    <input type="hidden" name="scope_type" value="{scope_type}">
    <input type="hidden" name="scope_id" value="{scope_id}">
    <input class="ui-input" type="search" name="q" maxlength="80" value="{query}" placeholder="Найти место" aria-label="Найти место">
    <button class="ui-button ui-button--secondary" type="submit">Найти</button>
</form>"#,
            scope_type = params.scope_type,
            scope_id = params.scope_id,
            query = escape_html(params.query),
        )
    };
    let children = if params.children.is_empty() {
        if params.scope_type == "city" {
            String::new()
        } else {
            empty_state_card(
                "Ничего не найдено",
                "Измените запрос или вернитесь уровнем выше.",
            )
        }
    } else {
        params
            .children
            .iter()
            .map(|place| {
                let status = if place.group_id > 0 {
                    format!("✓ Открыта · {} участников", place.member_count)
                } else {
                    "Готова к вступлению".to_string()
                };
                format!(
                    r#"<a class="card official-group-place" href="/app/official-groups?scope_type={scope_type}&scope_id={scope_id}">
    <span class="card-icon">{place_icon}</span>
    <span class="card-content"><strong>{name}</strong><span class="card-meta">{status}</span></span>
    <span class="card-arrow">{arrow}</span>
</a>"#,
                    scope_type = place.scope_type,
                    scope_id = place.scope_id,
                    place_icon = icon(if place.scope_type == "city" { "map-pin" } else { "globe" }),
                    name = escape_html(&place.name),
                    status = escape_html(&status),
                    arrow = icon("chevron"),
                )
            })
            .collect::<Vec<_>>()
            .join("")
    };
    let next_level = match params.scope_type {
        "world" => "Континенты",
        "continent" => "Страны",
        "country" => "Города",
        _ => "",
    };
    let directory = if next_level.is_empty() {
        String::new()
    } else {
        format!(
            r#"<section class="official-group-directory">
    <div class="section-head"><div><h2 class="section-title">{next_level}</h2><p class="section-caption">Выберите следующий уровень географии</p></div></div>
    {search}
    <div class="official-group-grid">{children}</div>
</section>"#
        )
    };
    let content = format!(
        r#"{error_html}{group_card}
<aside class="card official-group-note">
    <strong>Официальное пространство GRABIT</strong>
    <span>Группа принадлежит платформе и запускается автоматически при первом вступлении. Первый участник не получает особых прав.</span>
</aside>
{directory}"#
    );
    page_shell(
        "Официальные группы · GRABIT",
        &topbar("Группы", "users"),
        &back_hero(
            &back,
            "globe",
            level,
            params.name,
            "Мир → континент → страна → город",
        ),
        &content,
        &bottom_nav("chats"),
    )
}

pub fn render_new_group(authenticated: bool, partners: Vec<(i64, String)>, error: &str) -> String {
    let content = if !authenticated {
        guest_locked_section("Группа", "/app/groups/new")
    } else {
        let people = if partners.is_empty() {
            r#"<p class="card-meta">Сначала напишите кому-нибудь в личный чат — потом их можно добавить в группу.</p>"#.to_string()
        } else {
            partners
                .iter()
                .map(|(id, name)| {
                    format!(
                        r#"<label class="rm-group-member">
    <input type="checkbox" name="member" value="{id}">
    <span>{name}</span>
</label>"#,
                        id = id,
                        name = escape_html(name),
                    )
                })
                .collect::<Vec<_>>()
                .join("")
        };
        let error_html = if error.is_empty() {
            String::new()
        } else {
            format!(
                r#"<p class="ui-status is-error">{}</p>"#,
                escape_html(error)
            )
        };
        format!(
            r#"<form method="post" action="/app/groups" class="card rm-group-create" id="rm-group-create">
    <label class="rm-profile-field">
        <div class="rm-profile-field-label">Название группы</div>
        <input class="ui-input" name="name" maxlength="80" required placeholder="Например: соседи по двору">
    </label>
    <div class="rm-profile-field rm-profile-field--spaced">
        <div class="rm-profile-field-label">Участники</div>
        <div class="rm-group-members">{people}</div>
    </div>
    <input type="hidden" name="member_ids" id="rm-group-member-ids" value="">
    {error_html}
    <button type="submit" class="ui-button">Создать группу</button>
</form>
<script>
(function () {{
    var form = document.getElementById("rm-group-create");
    if (!form) return;
    form.addEventListener("submit", function () {{
        var ids = Array.prototype.map.call(
            form.querySelectorAll("input[name='member']:checked"),
            function (box) {{ return box.value; }}
        );
        var hidden = document.getElementById("rm-group-member-ids");
        if (hidden) hidden.value = ids.join(",");
    }});
}})();
</script>"#,
            people = people,
            error_html = error_html,
        )
    };

    page_shell(
        "Новая группа · GRABIT",
        &topbar("Группа", "users"),
        &back_hero(
            &back_link("/app/messages", "Чаты", "arrow-left"),
            "users",
            "Группа",
            "Новая группа",
            "Название и участники. Чат сразу общий.",
        ),
        &content,
        &bottom_nav("chats"),
    )
}

pub struct GroupMembersPage<'a> {
    pub viewer_user_id: i64,
    pub group_id: i64,
    pub name: &'a str,
    pub description: &'a str,
    pub viewer_role: &'a str,
    pub is_official: bool,
    pub member_count: i64,
    pub member_query: String,
    pub next_after: Option<i64>,
    pub members: Vec<(i64, String, String, i64)>,
    pub candidates: Vec<(i64, String)>,
    pub blocked_members: Vec<(i64, String)>,
    pub error: &'a str,
}

pub fn render_group_members(params: GroupMembersPage<'_>) -> String {
    let GroupMembersPage {
        viewer_user_id,
        group_id,
        name,
        description,
        viewer_role,
        is_official,
        member_count,
        member_query,
        next_after,
        members,
        candidates,
        blocked_members,
        error,
    } = params;
    let authenticated = viewer_user_id > 0;
    let content = if !authenticated {
        guest_locked_section("Группа", &format!("/app/group/{group_id}/members"))
    } else if error == "Нет доступа" {
        empty_state_card("Нет доступа", "Этой группы для вас нет.")
    } else {
        let is_owner = viewer_role == "owner";
        let can_manage = is_owner || viewer_role == "admin";
        let now = chrono::Utc::now().timestamp();
        let list = members
            .iter()
            .map(|(id, member, role, muted_until)| {
                let role_label = match role.as_str() {
                    "owner" => "Владелец",
                    "admin" => "Администратор",
                    _ => "Участник",
                };
                let you = if *id == viewer_user_id {
                    r#"<span class="rm-group-you">Вы</span>"#
                } else {
                    ""
                };
                let role_action = if !is_official
                    && is_owner
                    && *id != viewer_user_id
                    && role != "owner"
                {
                    let (next_role, label) = if role == "admin" {
                        ("member", "Сделать участником")
                    } else {
                        ("admin", "Сделать администратором")
                    };
                    format!(
                        r#"<form method="post" action="/app/group/{group_id}/members/{id}/role">
    <input type="hidden" name="role" value="{next_role}">
    <button type="submit" class="rm-group-action">{label}</button>
</form>"#
                    )
                } else {
                    String::new()
                };
                let transfer_action = if !is_official
                    && is_owner
                    && *id != viewer_user_id
                    && role != "owner"
                {
                    format!(
                        r#"<form method="post" action="/app/group/{group_id}/members/{id}/owner" data-confirm="Передать этому участнику права владельца группы?">
    <button type="submit" class="rm-group-action">Передать владение</button>
</form>"#
                    )
                } else {
                    String::new()
                };
                let can_remove = *id != viewer_user_id
                    && ((viewer_role == "owner" && role != "owner")
                        || (viewer_role == "admin" && role == "member"));
                let remove_action = if can_remove {
                    format!(
                        r#"<form method="post" action="/app/group/{group_id}/members/{id}/remove" data-confirm="Удалить участника из группы?">
    <button type="submit" class="rm-group-action rm-group-action--danger">Удалить</button>
</form>"#
                    )
                } else {
                    String::new()
                };
                let can_moderate = *id != viewer_user_id
                    && ((viewer_role == "owner" && role != "owner")
                        || (viewer_role == "admin" && role == "member"));
                let is_muted = *muted_until > now;
                let mute_action = if !can_moderate {
                    String::new()
                } else if is_muted {
                    format!(
                        r#"<form method="post" action="/app/group/{group_id}/members/{id}/mute">
    <input type="hidden" name="seconds" value="0">
    <button type="submit" class="rm-group-action">Разрешить писать</button>
</form>"#
                    )
                } else {
                    format!(
                        r#"<form method="post" action="/app/group/{group_id}/members/{id}/mute" class="rm-group-mute-form">
    <select name="seconds" class="ui-input" aria-label="Срок ограничения">
        <option value="600">10 минут</option>
        <option value="3600">1 час</option>
        <option value="86400">24 часа</option>
        <option value="604800">7 дней</option>
        <option value="2592000">30 дней</option>
    </select>
    <button type="submit" class="rm-group-action">Ограничить</button>
</form>"#
                    )
                };
                let mute_status = if is_muted {
                    r#"<span class="rm-group-you">Не может писать</span>"#
                } else {
                    ""
                };
                format!(
                    r#"<article class="rm-group-member rm-group-member--managed">
    <div class="rm-group-member-copy">
        <strong>{member}</strong>
        <div class="rm-group-member-meta"><span class="rm-group-role rm-group-role--{role}">{role_label}</span>{you}{mute_status}</div>
    </div>
    <div class="rm-group-actions">{role_action}{transfer_action}{mute_action}{remove_action}</div>
</article>"#,
                    member = escape_html(member),
                )
            })
            .collect::<Vec<_>>()
            .join("");
        let add = if is_official || !can_manage {
            String::new()
        } else if candidates.is_empty() {
            r#"<section class="card rm-group-create"><div class="rm-profile-field-label">Добавить участников</div><p class="card-meta">Все доступные собеседники уже в этой группе.</p></section>"#.to_string()
        } else {
            let boxes = candidates
                .iter()
                .map(|(id, member)| {
                    format!(
                        r#"<label class="rm-group-member"><input type="checkbox" name="member" value="{id}"><span>{}</span></label>"#,
                        escape_html(member)
                    )
                })
                .collect::<Vec<_>>()
                .join("");
            format!(
                r#"<form method="post" action="/app/group/{group_id}/members" class="card rm-group-create" id="rm-group-add">
    <div class="rm-profile-field-label">Добавить участников</div>
    <input class="ui-input" id="rm-group-member-search" type="search" placeholder="Найти по имени" autocomplete="off">
    <div class="rm-group-members">{boxes}</div>
    <input type="hidden" name="member_ids" id="rm-group-member-ids" value="">
    <button type="submit" class="ui-button">Добавить в группу</button>
</form>"#,
                boxes = boxes,
            )
        };
        let name_readonly = if is_official { "readonly" } else { "" };
        let rename = if can_manage {
            format!(
                r#"<form method="post" action="/app/group/{group_id}/settings/name" class="card rm-group-create">
    <label class="rm-profile-field">
        <div class="rm-profile-field-label">Название группы</div>
        <input class="ui-input" name="name" maxlength="80" required value="{name}" {name_readonly}>
    </label>
    <label class="rm-profile-field">
        <div class="rm-profile-field-label">Описание</div>
        <textarea class="ui-input" name="description" maxlength="500" rows="4" placeholder="О чём эта группа">{description}</textarea>
    </label>
    <button type="submit" class="ui-button ui-button--secondary">Сохранить информацию</button>
</form>"#,
                name = escape_html(name),
                description = escape_html(description),
                name_readonly = name_readonly,
            )
        } else {
            String::new()
        };
        let invite = if can_manage && !is_official {
            format!(
                r#"<section class="card rm-group-create">
    <div class="rm-profile-field-label">Приглашение в группу</div>
    <p class="card-meta">Ссылка действует 7 дней. Новая ссылка автоматически отключает предыдущую.</p>
    <div class="rm-group-invite-actions">
        <form method="post" action="/app/group/{group_id}/invite/create">
            <button type="submit" class="ui-button">Создать новую ссылку</button>
        </form>
        <form method="post" action="/app/group/{group_id}/invite/revoke" data-confirm="Отключить действующую ссылку-приглашение?">
            <button type="submit" class="ui-button ui-button--secondary">Отключить ссылку</button>
        </form>
    </div>
    <div id="rm-group-invite-ready" class="rm-group-invite-ready" hidden>
        <label class="rm-profile-field">
            <div class="rm-profile-field-label">Готовая ссылка</div>
            <input id="rm-group-invite-url" class="ui-input" readonly>
        </label>
        <button id="rm-group-invite-share" type="button" class="ui-button" data-share
                data-share-title="GRABIT · группа"
                data-share-text="Присоединяйтесь к нашей группе в GRABIT.">
            Отправить приглашение
        </button>
    </div>
</section>"#
            )
        } else {
            String::new()
        };
        let avatar = if can_manage {
            format!(
                r#"<section class="card rm-group-create">
    <div class="rm-profile-field-label">Фото группы</div>
    <div class="rm-group-avatar-preview">
        <img src="/api/group/{group_id}/avatar" alt="" onerror="this.hidden=true">
    </div>
    <form method="post" action="/app/group/{group_id}/avatar" enctype="multipart/form-data">
        <input class="ui-input" type="file" name="image" accept="image/jpeg,image/png,image/webp" required>
        <button type="submit" class="ui-button">Загрузить фото</button>
    </form>
    <form method="post" action="/app/group/{group_id}/avatar/delete" data-confirm="Удалить фото группы?">
        <button type="submit" class="ui-button ui-button--secondary">Удалить фото</button>
    </form>
</section>"#
            )
        } else {
            String::new()
        };
        let leave = if is_owner && !is_official {
            r#"<section class="card rm-group-create"><div class="rm-profile-field-label">Вы владелец группы</div><p class="card-meta">Перед выходом передайте владение другому участнику. Так группа не останется без управления.</p></section>"#.to_string()
        } else {
            format!(
                r#"<form method="post" action="/app/group/{group_id}/leave" class="card rm-group-create" data-confirm="Выйти из этой группы?">
    <button type="submit" class="ui-button ui-button--danger">Выйти из группы</button>
</form>"#
            )
        };
        let encoded_member_query = urlencoding::encode(&member_query);
        let member_search = if is_official && !can_manage {
            String::new()
        } else {
            format!(
                r#"<form method="get" action="/app/group/{group_id}/members" class="rm-group-member-search">
    <label class="rm-profile-field">
        <div class="rm-profile-field-label">Поиск участника</div>
        <input class="ui-input" type="search" name="q" maxlength="80" value="{member_query}" placeholder="Имя или логин" autocomplete="off">
    </label>
    <div class="rm-group-invite-actions">
        <button type="submit" class="ui-button ui-button--secondary">Найти</button>
        <a class="ui-button ui-button--secondary" href="/app/group/{group_id}/members">Сбросить</a>
    </div>
</form>"#,
                member_query = escape_html(&member_query),
            )
        };
        let next_members = next_after.map_or_else(String::new, |after| {
            format!(r#"<a class="ui-button ui-button--secondary" href="/app/group/{group_id}/members?q={encoded_member_query}&after={after}">Показать следующих</a>"#)
        });
        let member_count_label = if is_official {
            member_count.to_string()
        } else {
            format!("{member_count} / 250")
        };
        let empty_members = if is_official && !can_manage {
            r#"<p class="card-meta">Список участников официальной группы скрыт для защиты приватности. Вы продолжаете видеть авторов сообщений внутри чата.</p>"#
        } else if members.is_empty() {
            r#"<p class="card-meta">Участники не найдены.</p>"#
        } else {
            ""
        };
        let blocked = if !is_official || !can_manage || blocked_members.is_empty() {
            String::new()
        } else {
            let rows = blocked_members
                .iter()
                .map(|(id, member)| {
                    format!(
                        r#"<article class="rm-group-member rm-group-member--managed">
    <div class="rm-group-member-copy"><strong>{member}</strong><div class="rm-group-member-meta"><span class="rm-group-you">Доступ заблокирован</span></div></div>
    <div class="rm-group-actions"><form method="post" action="/app/group/{group_id}/members/{id}/restore" data-confirm="Восстановить возможность вступления в официальную группу?"><button type="submit" class="rm-group-action">Восстановить доступ</button></form></div>
</article>"#,
                        member = escape_html(member),
                    )
                })
                .collect::<Vec<_>>()
                .join("");
            format!(
                r#"<section class="card rm-group-create"><div class="rm-group-section-head"><div class="rm-profile-field-label">Заблокированные</div><span class="rm-group-count">{count}</span></div><div class="rm-group-members">{rows}</div></section>"#,
                count = blocked_members.len(),
            )
        };
        let governance = if !is_official {
            String::new()
        } else if can_manage {
            r#"<section class="card rm-group-create"><div class="rm-profile-field-label">Вы управляете этой территорией</div><p class="card-meta">Права действуют по вашему административному назначению. Сама официальная группа принадлежит платформе GRABIT.</p></section>"#.to_string()
        } else {
            r#"<section class="card rm-group-create"><div class="rm-profile-field-label">Официальная группа GRABIT</div><p class="card-meta">У группы нет человеческого владельца. Права управления определяются только действующим административным назначением территории.</p></section>"#.to_string()
        };
        format!(
            r#"{governance}
{rename}
{avatar}
{invite}
<section class="card rm-group-create">
    <div class="rm-group-section-head"><div class="rm-profile-field-label">Участники</div><span class="rm-group-count">{member_count_label}</span></div>
    {member_search}
    <div class="rm-group-members">{list}</div>
    {empty_members}
    {next_members}
</section>
{blocked}
{add}
{leave}
<script>
(function () {{
    var query = new URLSearchParams(window.location.search);
    var inviteToken = query.get("invite") || "";
    if (/^[A-Za-z0-9.]+$/.test(inviteToken)) {{
        var inviteUrl = new URL("/app/group-invite/" + encodeURIComponent(inviteToken), window.location.origin).href;
        var ready = document.getElementById("rm-group-invite-ready");
        var input = document.getElementById("rm-group-invite-url");
        var share = document.getElementById("rm-group-invite-share");
        if (ready && input && share) {{
            input.value = inviteUrl;
            share.setAttribute("data-share-url", inviteUrl);
            ready.hidden = false;
        }}
        window.history.replaceState(null, "", window.location.pathname);
    }}
    var addForm = document.getElementById("rm-group-add");
    if (addForm) {{
        addForm.addEventListener("submit", function () {{
            var ids = Array.prototype.map.call(addForm.querySelectorAll("input[name='member']:checked"), function (box) {{ return box.value; }});
            var hidden = document.getElementById("rm-group-member-ids");
            if (hidden) hidden.value = ids.join(",");
        }});
        var search = document.getElementById("rm-group-member-search");
        if (search) search.addEventListener("input", function () {{
            var query = search.value.trim().toLocaleLowerCase();
            addForm.querySelectorAll("label.rm-group-member").forEach(function (row) {{
                row.hidden = query !== "" && !row.textContent.toLocaleLowerCase().includes(query);
            }});
        }});
    }}
    document.querySelectorAll("form[data-confirm]").forEach(function (form) {{
        form.addEventListener("submit", function (event) {{
            if (!window.confirm(form.getAttribute("data-confirm") || "Продолжить?")) event.preventDefault();
        }});
    }});
}})();
</script>"#,
            rename = rename,
            governance = governance,
            avatar = avatar,
            invite = invite,
            member_count_label = member_count_label,
            member_search = member_search,
            empty_members = empty_members,
            next_members = next_members,
            list = list,
            blocked = blocked,
            add = add,
            leave = leave,
        )
    };

    page_shell(
        "Участники · GRABIT",
        &topbar("Группа", "users"),
        &back_hero(
            &back_link(&format!("/app/group/{group_id}"), "Чат", "arrow-left"),
            "users",
            "Группа",
            name,
            "Роли, участники и настройки группы.",
        ),
        &content,
        &bottom_nav("chats"),
    )
}

pub fn render_group_invite(
    authenticated: bool,
    token: &str,
    name: &str,
    member_count: i64,
    valid: bool,
) -> String {
    let content = if !valid {
        empty_state_card(
            "Ссылка недействительна",
            "Приглашение истекло, было отключено или группа уже заполнена.",
        )
    } else if !authenticated {
        let next = format!("/app/group-invite/{}", urlencoding::encode(token));
        format!(
            r#"<section class="card rm-group-create">
    <div class="rm-profile-field-label">{name}</div>
    <p class="card-meta">{member_count} участников · приглашение действует 7 дней</p>
    <a class="ui-button" href="/login?next={next}">Войти и присоединиться</a>
</section>"#,
            name = escape_html(name),
            next = urlencoding::encode(&next),
        )
    } else {
        format!(
            r#"<form method="post" action="/app/group-invite/{token}" class="card rm-group-create">
    <div class="rm-profile-field-label">{name}</div>
    <p class="card-meta">{member_count} участников</p>
    <button type="submit" class="ui-button">Присоединиться к группе</button>
</form>"#,
            token = escape_html(token),
            name = escape_html(name),
        )
    };

    page_shell(
        "Приглашение в группу · GRABIT",
        &topbar("Группа", "users"),
        &back_hero(
            &back_link("/app/messages", "Чаты", "arrow-left"),
            "users",
            "GRABIT",
            "Приглашение в группу",
            "Проверьте название и присоединитесь после входа.",
        ),
        &content,
        &bottom_nav("chats"),
    )
}

// ============================================================
// PROFILE
// ============================================================

#[cfg(test)]
mod communication_tests {
    use super::{conversation_display_name, conversation_preview_text};

    #[test]
    fn inbox_preview_never_exposes_internal_media_markers() {
        for marker in ["__deleted__", "__image__", "__voice__"] {
            let preview = conversation_preview_text(marker);
            assert!(!preview.is_empty());
            assert_ne!(preview, marker);
        }
        assert_eq!(conversation_preview_text("Обычный текст"), "Обычный текст");
    }

    #[test]
    fn anonymous_display_name_never_derives_from_internal_id() {
        assert_eq!(
            conversation_display_name(987_654, "", "", ""),
            "Участник GRABIT"
        );
        assert!(!conversation_display_name(987_654, "", "", "").contains("987654"));
    }
}
