use super::super::handlers::{
    add_group_members, api_chat_block, api_chat_block_status, api_chat_conversations,
    api_chat_delete, api_chat_edit, api_chat_media, api_chat_messages, api_chat_peer,
    api_chat_react, api_chat_realtime, api_chat_send, api_chat_send_image, api_chat_send_voice,
    api_chat_unblock, api_group_delete, api_group_edit, api_group_media, api_group_messages,
    api_group_react, api_group_send, api_group_send_image, api_group_send_voice,
    api_start_direct_chat, chat_page, contact_requests_page, create_group, group_chat_page,
    group_members_page, leave_group, messages_page, new_group_page, remove_group_member,
    rename_group, retired_contact_decision, transfer_group_ownership, update_chat_preference,
    update_group_member_role,
};
use crate::state::app_state::AppState;
use axum::{
    response::Redirect,
    routing::{get, post},
    Router,
};

pub(super) fn routes() -> Router<AppState> {
    Router::new()
        .route("/app/contact-requests", get(contact_requests_page))
        .route("/app/messages", get(messages_page))
        .route(
            "/app/chats",
            get(|| async { Redirect::to("/app/messages") }),
        )
        .route(
            "/app/contact-request/{id}/accept",
            get(retired_contact_decision).post(retired_contact_decision),
        )
        .route(
            "/app/contact-request/{id}/reject",
            get(retired_contact_decision).post(retired_contact_decision),
        )
        .route("/app/chat/{other_user_id}", get(chat_page))
        .route(
            "/app/chat-preference/{kind}/{target_id}",
            post(update_chat_preference),
        )
        .route("/app/groups/new", get(new_group_page))
        .route("/app/groups", post(create_group))
        .route("/app/group/{group_id}", get(group_chat_page))
        .route("/app/group/{group_id}/members", get(group_members_page))
        .route("/app/group/{group_id}/members", post(add_group_members))
        .route("/app/group/{group_id}/settings/name", post(rename_group))
        .route(
            "/app/group/{group_id}/members/{member_id}/role",
            post(update_group_member_role),
        )
        .route(
            "/app/group/{group_id}/members/{member_id}/owner",
            post(transfer_group_ownership),
        )
        .route(
            "/app/group/{group_id}/members/{member_id}/remove",
            post(remove_group_member),
        )
        .route("/app/group/{group_id}/leave", post(leave_group))
        .route("/api/group/{group_id}/messages", get(api_group_messages))
        .route("/api/group/{group_id}/send", post(api_group_send))
        .route(
            "/api/group/{group_id}/send-image",
            post(api_group_send_image),
        )
        .route(
            "/api/group/{group_id}/send-voice",
            post(api_group_send_voice),
        )
        .route("/api/group/media/{message_id}", get(api_group_media))
        .route(
            "/api/group/{group_id}/messages/{message_id}/edit",
            post(api_group_edit),
        )
        .route(
            "/api/group/{group_id}/messages/{message_id}/delete",
            post(api_group_delete),
        )
        .route(
            "/api/group/{group_id}/messages/{message_id}/react",
            post(api_group_react),
        )
        .route("/api/chat/conversations", get(api_chat_conversations))
        .route("/api/chat/{other_user_id}/messages", get(api_chat_messages))
        .route("/api/chat/{other_user_id}/peer", get(api_chat_peer))
        .route("/api/chat/realtime", get(api_chat_realtime))
        .route("/api/chat/{other_user_id}/send", post(api_chat_send))
        .route(
            "/api/chat/{other_user_id}/send-image",
            post(api_chat_send_image),
        )
        .route(
            "/api/chat/{other_user_id}/send-voice",
            post(api_chat_send_voice),
        )
        .route("/api/chat/media/{message_id}", get(api_chat_media))
        .route(
            "/api/chat/{other_user_id}/block",
            get(api_chat_block_status).post(api_chat_block),
        )
        .route("/api/chat/{other_user_id}/unblock", post(api_chat_unblock))
        .route(
            "/api/chat/{other_user_id}/messages/{message_id}/edit",
            post(api_chat_edit),
        )
        .route(
            "/api/chat/{other_user_id}/messages/{message_id}/delete",
            post(api_chat_delete),
        )
        .route(
            "/api/chat/{other_user_id}/messages/{message_id}/react",
            post(api_chat_react),
        )
        .route("/api/contact/request", post(api_start_direct_chat))
}
