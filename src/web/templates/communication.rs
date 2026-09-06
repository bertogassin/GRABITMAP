use super::common::{
    back_hero, back_link, bottom_nav, bottom_nav_with_badge, empty_state_action, empty_state_card,
    empty_state_card_with_actions, escape_html, guest_locked_section, icon, page_document,
    page_shell, ru_count, section_head, simple_hero, static_asset, topbar,
};

// ============================================================
// TASK 7.22G-C — MESSAGES LIST
// ============================================================

pub(crate) fn conversation_display_name(
    other_user_id: i64,
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
        format!("Участник · {:06}", other_user_id.rem_euclid(1_000_000))
    }
}

pub(crate) fn format_inbox_time(updated_at: i64) -> String {
    use chrono::Datelike;

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
    } else if date == today - chrono::Duration::days(1) {
        "Вчера".to_string()
    } else if today.signed_duration_since(date).num_days() < 7 {
        ru_weekday_short(dt.weekday())
    } else {
        dt.format("%d.%m").to_string()
    }
}

fn ru_weekday_short(weekday: chrono::Weekday) -> String {
    match weekday {
        chrono::Weekday::Mon => "пн",
        chrono::Weekday::Tue => "вт",
        chrono::Weekday::Wed => "ср",
        chrono::Weekday::Thu => "чт",
        chrono::Weekday::Fri => "пт",
        chrono::Weekday::Sat => "сб",
        chrono::Weekday::Sun => "вс",
    }
    .to_string()
}

fn inbox_unread_caption(total_unread: i64) -> String {
    if total_unread <= 0 {
        "Все прочитано".to_string()
    } else {
        ru_count(total_unread, "непрочитанное", "непрочитанных", "непрочитанных")
    }
}

pub fn render_messages(
    authenticated: bool,
    conversations: Vec<crate::web::view_models::ConversationRow>,
) -> String {
    let total_unread: i64 = conversations.iter().map(|c| c.unread_count).sum();

    let content = if !authenticated {
        guest_locked_section("Сообщения", "/app/messages")
    } else if conversations.is_empty() {
        empty_state_card_with_actions(
            "Нет диалогов",
            "Откройте профиль участника, чтобы начать диалог, или создайте группу.",
            &format!(
                "{}{}",
                empty_state_action("/app/search", "Найти участников"),
                empty_state_action("/app/groups/new", "Создать группу"),
            ),
        )
    } else {
        conversations
            .iter()
            .map(|conversation| {
                let other_user_id = conversation.other_user_id;
                let username = &conversation.username;
                let first_name = &conversation.first_name;
                let last_name = &conversation.last_name;
                let last_message = &conversation.last_message;
                let unread_count = conversation.unread_count;
                let updated_at = conversation.updated_at;
                let safe_username = escape_html(username);

                let is_group = conversation.is_group;
                let group_id = conversation.group_id;
                let href = if is_group && group_id > 0 {
                    format!("/app/group/{group_id}")
                } else {
                    format!("/app/chat/{other_user_id}")
                };
                let kind = if is_group { "group" } else { "dm" };
                let display_name = if is_group && !first_name.trim().is_empty() {
                    escape_html(first_name)
                } else {
                    conversation_display_name(other_user_id, username, first_name, last_name)
                };

                let safe_last_message = escape_html(last_message);

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
                    "Новая группа".to_string()
                } else {
                    "Новый диалог".to_string()
                };

                let unread_html = if unread_count > 0 {
                    format!(
                        r#"<span class="chat-dialog-unread">{count}</span>"#,
                        count = unread_count,
                    )
                } else {
                    String::new()
                };

                format!(
                    r#"
<a href="{href}#chat-end"
   class="card chat-dialog-card"
   data-other-user-id="{other_user_id}"
   data-group-id="{group_id}"
   data-kind="{kind}">

    <div class="card-icon chat-dialog-avatar">
        {avatar_html}
    </div>

    <div class="card-content">

        <div class="card-title">
            {display_name}
        </div>

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
"#,
                    href = href,
                    other_user_id = other_user_id,
                    group_id = if group_id > 0 { group_id.to_string() } else { String::new() },
                    kind = kind,
                    avatar_html = if !is_group && conversation.has_avatar && other_user_id > 0 {
                        format!(
                            r#"<img class="rm-me-avatar-img" src="/api/avatars/{other_user_id}" alt="" onerror="this.remove()">"#
                        )
                    } else {
                        icon(if is_group { "users" } else { "message-circle" }).to_string()
                    },
                    display_name = display_name,
                    username_html = username_html,
                    last_message = last_message_html,
                    last_time = last_time,
                    unread_html = unread_html,
                    arrow = icon("chevron"),
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
        <a href="/app/groups/new" class="ui-button inbox-group-btn">{group}</a>
        <span class="inbox-live-badge" id="inbox-live-badge" hidden aria-hidden="true">связь</span>
    </div>
</div>"#,
            dialogs = crate::i18n::t("chat_dialogs"),
            unread_caption = unread_caption,
            group = crate::i18n::t("chat_group"),
        )
    } else {
        section_head(&crate::i18n::t("chat_dialogs"), &unread_caption, None)
    };

    let list_attributes = if authenticated {
        r#" id="chat-dialog-list" data-inbox-live="1""#
    } else {
        ""
    };

    let inbox_script = if authenticated {
        format!(
            r#"<script src="{inbox_js}" defer></script>"#,
            inbox_js = static_asset("inbox.js"),
        )
    } else {
        String::new()
    };

    let content_html = format!(
        r####"<link rel="stylesheet"
      href="{chat_css}">

{section_head_dialogs}


<section class="chat-dialog-list"{list_attributes}>

    {content}

</section>

{inbox_script}"####,
        chat_css = static_asset("chat-v2.css"),
        section_head_dialogs = section_head_dialogs,
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
        return r#"<div class="chat-message-body is-deleted">Сообщение удалено</div>"#.to_string();
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
            r#"<div class="chat-message-body chat-message-body--image"><img class="chat-message-image" src="{url}" alt="Фото" loading="lazy" decoding="async" role="button" tabindex="0">{caption}</div>"#,
            url = escape_html(&message.attachment_url),
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
    viewer_user_id: i64,
    other_user_id: i64,
) -> &'static str {
    if reply_sender_user_id <= 0 {
        return "Сообщение";
    }

    if reply_sender_user_id == viewer_user_id {
        "Вы"
    } else if reply_sender_user_id == other_user_id {
        "Собеседник"
    } else {
        "Сообщение"
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
        let date = dt.date_naive();
        let today = chrono::Utc::now().with_timezone(&paris).date_naive();

        if date == today {
            "Сегодня".to_string()
        } else if date == today - chrono::Duration::days(1) {
            "Вчера".to_string()
        } else {
            dt.format("%d.%m.%Y").to_string()
        }
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
        let reply_author =
            chat_reply_author_label(message.reply_sender_user_id, viewer_user_id, other_user_id);

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
        r#"<span class="chat-edited-label">изменено</span>"#.to_string()
    } else {
        String::new()
    };

    let display_body = chat_message_body_html(message);
    let safe_message_text = escape_html(&message.message);
    let attachment_kind = escape_html(&message.attachment_kind);
    let attachment_url = escape_html(&message.attachment_url);

    let reactions_html = if message.reactions.is_empty() {
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
     data-reply-sender="{reply_sender}"
     data-read-at="{read_at}"
     data-delivered-at="{delivered_at}"
     data-created-at="{created_at}"
     data-message-text="{message_text}"
     data-attachment-kind="{attachment_kind}"
     data-attachment-url="{attachment_url}">

    <div class="{bubble_class}">
        <button type="button" class="chat-message-more" aria-label="Действия с сообщением">⋮</button>
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
        reply_sender = message.reply_sender_user_id,
        read_at = message.read_at,
        delivered_at = message.delivered_at,
        created_at = message.created_at,
        message_text = safe_message_text,
        bubble_class = bubble_class,
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
    other_user_id: i64,
    username: &str,
    first_name: &str,
    last_name: &str,
    messages: Vec<crate::web::view_models::ChatMessageRow>,
) -> String {
    render_chat_thread(
        authenticated,
        viewer_user_id,
        other_user_id,
        0,
        username,
        first_name,
        last_name,
        messages,
    )
}

pub fn render_group_chat(
    authenticated: bool,
    viewer_user_id: i64,
    group_id: i64,
    group_name: &str,
    member_count: i64,
    messages: Vec<crate::web::view_models::ChatMessageRow>,
) -> String {
    render_chat_thread(
        authenticated,
        viewer_user_id,
        0,
        group_id,
        "",
        group_name,
        &ru_count(member_count, "участник", "участника", "участников"),
        messages,
    )
}

fn render_chat_thread(
    authenticated: bool,
    viewer_user_id: i64,
    other_user_id: i64,
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
        format!("Участник · {:06}", other_user_id.rem_euclid(1_000_000))
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
            } else {
                format!("/app/chat/{other_user_id}")
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
    <button id="chat-voice-btn" type="button" class="chat-voice-btn">Голос</button>
    <button id="chat-image-btn" type="button" class="chat-image-btn">Фото</button>
    <button id="chat-send" type="submit" class="ui-button chat-send-button">Отправить</button>
    <div class="chat-composer-footer"><span id="chat-send-state">Enter — отправить · Shift+Enter — новая строка</span><span id="chat-counter">0 / 2000</span></div>
</form>
"#;

        format!(
            r#"
<link rel="stylesheet"
      href="{chat_css}">

<section class="card chat-shell">

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
         data-other-user-id="{other_user_id}"
         data-group-id="{group_id_attr}"
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
        ↓
    </button>

    {composer}

</section>


<script src="{chat_voice_js}" defer></script>
<script src="{chat_js}" defer></script>
<script src="{chat_blocks_js}" defer></script>

"#,
            chat_css = static_asset("chat-v2.css"),
            chat_voice_js = static_asset("chat-voice-player.js"),
            chat_js = static_asset("chat-v2.js"),
            chat_blocks_js = static_asset("chat-blocks.js"),
            other_user_id = other_user_id,
            group_id_attr = if group_id > 0 { group_id.to_string() } else { String::new() },
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
        header_avatar = if other_user_id > 0 {
            format!(
                r#"<img class="rm-me-avatar-img" src="/api/avatars/{other_user_id}" alt="" onerror="this.remove()">{icon}"#,
                icon = icon("user")
            )
        } else if group_id > 0 {
            icon("users").to_string()
        } else {
            icon("user").to_string()
        },
        group_menu = if group_id > 0 {
            format!(
                r#"<a href="/app/group/{group_id}/members" class="chat-sound-toggle">Участники</a>
                <form method="post" action="/app/group/{group_id}/leave">
                    <button type="submit" class="chat-block-toggle">Выйти</button>
                </form>"#
            )
        } else {
            String::new()
        },
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

pub fn render_new_group(
    authenticated: bool,
    partners: Vec<(i64, String)>,
    error: &str,
) -> String {
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

pub fn render_group_members(
    authenticated: bool,
    group_id: i64,
    name: &str,
    members: Vec<(i64, String)>,
    candidates: Vec<(i64, String)>,
    error: &str,
) -> String {
    let content = if !authenticated {
        guest_locked_section("Группа", &format!("/app/group/{group_id}/members"))
    } else if error == "Нет доступа" {
        empty_state_card("Нет доступа", "Этой группы для вас нет.")
    } else {
        let list = members
            .iter()
            .map(|(_id, member)| {
                format!(
                    r#"<div class="rm-group-member"><span>{}</span></div>"#,
                    escape_html(member)
                )
            })
            .collect::<Vec<_>>()
            .join("");
        let add = if candidates.is_empty() {
            String::new()
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
    <div class="rm-profile-field-label">Добавить</div>
    <div class="rm-group-members">{boxes}</div>
    <input type="hidden" name="member_ids" id="rm-group-member-ids" value="">
    <button type="submit" class="ui-button">Добавить в группу</button>
</form>
<script>
(function () {{
    var form = document.getElementById("rm-group-add");
    if (!form) return;
    form.addEventListener("submit", function () {{
        var ids = Array.prototype.map.call(form.querySelectorAll("input[name='member']:checked"), function (box) {{ return box.value; }});
        var hidden = document.getElementById("rm-group-member-ids");
        if (hidden) hidden.value = ids.join(",");
    }});
}})();
</script>"#,
                boxes = boxes,
            )
        };
        format!(
            r#"<section class="card rm-group-create">
    <div class="rm-profile-field-label">Сейчас в группе</div>
    <div class="rm-group-members">{list}</div>
</section>
{add}
<form method="post" action="/app/group/{group_id}/leave" class="card rm-group-create">
    <button type="submit" class="ui-button">Выйти из группы</button>
</form>"#,
            list = list,
            add = add,
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
            "Кто в группе и кого добавить.",
        ),
        &content,
        &bottom_nav("chats"),
    )
}

// ============================================================
// PROFILE
// ============================================================
