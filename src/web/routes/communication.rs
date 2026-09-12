use super::super::handlers::{
    add_group_members, api_chat_block, api_chat_block_status, api_chat_conversations,
    api_chat_delete, api_chat_edit, api_chat_media, api_chat_messages, api_chat_peer, api_chat_pin,
    api_chat_pinned, api_chat_react, api_chat_realtime, api_chat_search, api_chat_send,
    api_chat_send_image, api_chat_send_voice, api_chat_unblock, api_group_delete, api_group_edit,
    api_group_media, api_group_messages, api_group_pin, api_group_pinned, api_group_react,
    api_group_search, api_group_send, api_group_send_image, api_group_send_voice,
    api_start_direct_chat, chat_page, contact_requests_page, create_group, create_group_invite,
    delete_group, delete_group_avatar, get_group_avatar, group_chat_page, group_invite_page,
    group_members_page, join_group_invite, join_official_group, leave_group, messages_page,
    new_group_page, official_groups_page, remove_group_member, rename_group, restore_group_member,
    retired_contact_decision, revoke_group_invite, set_group_avatar, transfer_group_ownership,
    update_chat_preference, update_group_member_mute, update_group_member_role,
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
        .route("/app/chat/{other_user_route}", get(chat_page))
        .route(
            "/app/chat-preference/{kind}/{target_id}",
            post(update_chat_preference),
        )
        .route("/app/groups/new", get(new_group_page))
        .route("/app/groups", post(create_group))
        .route("/app/official-groups", get(official_groups_page))
        .route(
            "/app/official-groups/{scope_type}/{scope_id}/join",
            post(join_official_group),
        )
        .route(
            "/app/group-invite/{token}",
            get(group_invite_page).post(join_group_invite),
        )
        .route("/app/group/{group_id}", get(group_chat_page))
        .route("/app/group/{group_id}/members", get(group_members_page))
        .route("/app/group/{group_id}/members", post(add_group_members))
        .route("/app/group/{group_id}/delete", post(delete_group))
        .route("/app/group/{group_id}/settings/name", post(rename_group))
        .route("/app/group/{group_id}/avatar", post(set_group_avatar))
        .route(
            "/app/group/{group_id}/avatar/delete",
            post(delete_group_avatar),
        )
        .route(
            "/app/group/{group_id}/invite/create",
            post(create_group_invite),
        )
        .route(
            "/app/group/{group_id}/invite/revoke",
            post(revoke_group_invite),
        )
        .route(
            "/app/group/{group_id}/members/{member_id}/role",
            post(update_group_member_role),
        )
        .route(
            "/app/group/{group_id}/members/{member_id}/mute",
            post(update_group_member_mute),
        )
        .route(
            "/app/group/{group_id}/members/{member_id}/owner",
            post(transfer_group_ownership),
        )
        .route(
            "/app/group/{group_id}/members/{member_id}/remove",
            post(remove_group_member),
        )
        .route(
            "/app/group/{group_id}/members/{member_id}/restore",
            post(restore_group_member),
        )
        .route("/app/group/{group_id}/leave", post(leave_group))
        .route("/api/group/{group_id}/messages", get(api_group_messages))
        .route("/api/group/{group_id}/pinned", get(api_group_pinned))
        .route("/api/group/{group_id}/avatar", get(get_group_avatar))
        .route("/api/group/{group_id}/search", get(api_group_search))
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
        .route(
            "/api/group/{group_id}/messages/{message_id}/pin",
            post(api_group_pin),
        )
        .route("/api/chat/conversations", get(api_chat_conversations))
        .route(
            "/api/chat/{other_user_route}/messages",
            get(api_chat_messages),
        )
        .route("/api/chat/{other_user_route}/pinned", get(api_chat_pinned))
        .route("/api/chat/{other_user_route}/search", get(api_chat_search))
        .route("/api/chat/{other_user_route}/peer", get(api_chat_peer))
        .route("/api/chat/realtime", get(api_chat_realtime))
        .route("/api/chat/{other_user_route}/send", post(api_chat_send))
        .route(
            "/api/chat/{other_user_route}/send-image",
            post(api_chat_send_image),
        )
        .route(
            "/api/chat/{other_user_route}/send-voice",
            post(api_chat_send_voice),
        )
        .route("/api/chat/media/{message_id}", get(api_chat_media))
        .route(
            "/api/chat/{other_user_route}/block",
            get(api_chat_block_status).post(api_chat_block),
        )
        .route(
            "/api/chat/{other_user_route}/unblock",
            post(api_chat_unblock),
        )
        .route(
            "/api/chat/{other_user_route}/messages/{message_id}/edit",
            post(api_chat_edit),
        )
        .route(
            "/api/chat/{other_user_route}/messages/{message_id}/delete",
            post(api_chat_delete),
        )
        .route(
            "/api/chat/{other_user_route}/messages/{message_id}/react",
            post(api_chat_react),
        )
        .route(
            "/api/chat/{other_user_route}/messages/{message_id}/pin",
            post(api_chat_pin),
        )
        .route("/api/contact/request", post(api_start_direct_chat))
}
