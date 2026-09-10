use super::auth::verify_user_session;
use super::common::request_is_cross_site;
use super::user_blocks::users_are_blocked;
use crate::state::app_state::AppState;
use axum::{
    extract::{
        ws::{Message, WebSocket},
        Query, State, WebSocketUpgrade,
    },
    http::{HeaderMap, StatusCode},
    response::{IntoResponse, Response},
    Json,
};
use serde::Deserialize;
use serde_json::json;
use tokio::sync::broadcast;

#[derive(Debug, Deserialize)]
struct ClientFrame {
    #[serde(rename = "type")]
    frame_type: String,
    other_user_id: Option<String>,
    group_id: Option<String>,
}

#[derive(Debug, Deserialize)]
pub(crate) struct RealtimeQuery {
    last_event_id: Option<u64>,
}

fn parse_other_user_id(value: Option<&str>) -> Option<i64> {
    let raw = value?.trim();
    if raw.is_empty() || !raw.bytes().all(|byte| byte.is_ascii_digit()) {
        return None;
    }

    raw.parse::<i64>().ok().filter(|id| *id > 0)
}

fn direct_typing_is_allowed(
    connection: &rusqlite::Connection,
    user_id: i64,
    other_user_id: i64,
) -> bool {
    if user_id <= 0
        || other_user_id <= 0
        || user_id == other_user_id
        || users_are_blocked(connection, user_id, other_user_id)
    {
        return false;
    }
    let (first, second) = if user_id < other_user_id {
        (user_id, other_user_id)
    } else {
        (other_user_id, user_id)
    };
    connection
        .query_row(
            "SELECT 1 FROM conversations
             WHERE user1_id = ?1 AND user2_id = ?2 LIMIT 1",
            rusqlite::params![first, second],
            |_| Ok(()),
        )
        .is_ok()
}

fn user_is_group_member(state: &AppState, user_id: i64, group_id: i64) -> bool {
    if user_id <= 0 || group_id <= 0 {
        return false;
    }
    crate::db::pool::get_connection(&state.db_pool)
        .ok()
        .is_some_and(|connection| {
            connection
                .query_row(
                    "SELECT 1 FROM chat_group_members
                     WHERE group_id = ?1 AND user_id = ?2",
                    rusqlite::params![group_id, user_id],
                    |_| Ok(()),
                )
                .is_ok()
        })
}

fn handle_client_frame(state: &AppState, user_id: i64, text: &str) -> bool {
    let frame = match serde_json::from_str::<ClientFrame>(text) {
        Ok(frame) => frame,
        Err(_) => return false,
    };

    match frame.frame_type.as_str() {
        "ping" => true,
        "typing.start" | "typing.stop" => {
            if let Some(other_user_id) = parse_other_user_id(frame.other_user_id.as_deref()) {
                let connection = crate::db::pool::get_connection(&state.db_pool);
                if connection.as_ref().is_ok_and(|connection| {
                    direct_typing_is_allowed(connection, user_id, other_user_id)
                }) {
                    let _ = state.publish_typing_event(&frame.frame_type, user_id, other_user_id);
                }
                return false;
            }
            let Some(group_id) = parse_other_user_id(frame.group_id.as_deref()) else {
                return false;
            };
            let connection = match crate::db::pool::get_connection(&state.db_pool) {
                Ok(connection) => connection,
                Err(_) => return false,
            };
            let actor_name = connection
                .query_row(
                    "SELECT COALESCE(
                        NULLIF(trim(COALESCE(p.first_name, '') || ' ' || COALESCE(p.last_name, '')), ''),
                        NULLIF('@' || COALESCE(p.username, ''), '@'),
                        'Участник'
                     )
                     FROM chat_group_members AS member
                     LEFT JOIN profiles AS p ON p.user_id = member.user_id
                     WHERE member.group_id = ?1 AND member.user_id = ?2",
                    rusqlite::params![group_id, user_id],
                    |row| row.get::<_, String>(0),
                )
                .ok();
            let Some(actor_name) = actor_name else {
                return false;
            };
            if super::official_groups::is_official_group(&connection, group_id) {
                let _ = state.publish_membership_scoped_group_typing_event(
                    &frame.frame_type,
                    user_id,
                    group_id,
                    &actor_name,
                );
            } else {
                let member_ids = connection
                    .prepare("SELECT user_id FROM chat_group_members WHERE group_id = ?1")
                    .and_then(|mut statement| {
                        statement
                            .query_map(rusqlite::params![group_id], |row| row.get::<_, i64>(0))?
                            .collect::<Result<Vec<_>, _>>()
                    })
                    .unwrap_or_default();
                let _ = state.publish_group_typing_event(
                    &frame.frame_type,
                    user_id,
                    group_id,
                    &member_ids,
                    &actor_name,
                );
            }
            false
        }
        _ => false,
    }
}

pub async fn api_chat_realtime(
    State(state): State<AppState>,
    headers: HeaderMap,
    websocket: WebSocketUpgrade,
    Query(query): Query<RealtimeQuery>,
) -> Response {
    if request_is_cross_site(&headers) {
        return (
            StatusCode::FORBIDDEN,
            Json(json!({
                "ok": false,
                "error": "cross_site_request_rejected"
            })),
        )
            .into_response();
    }

    let user_id = match verify_user_session(&state, &headers) {
        Some(user_id) => user_id,
        None => {
            return (
                StatusCode::UNAUTHORIZED,
                Json(json!({
                    "ok": false,
                    "error": "login_required"
                })),
            )
                .into_response();
        }
    };

    websocket
        .on_upgrade(move |socket| {
            chat_socket(socket, state, user_id, query.last_event_id.unwrap_or(0))
        })
        .into_response()
}

async fn send_json(socket: &mut WebSocket, value: serde_json::Value) -> bool {
    socket
        .send(Message::Text(value.to_string().into()))
        .await
        .is_ok()
}

async fn chat_socket(mut socket: WebSocket, state: AppState, user_id: i64, last_event_id: u64) {
    let mut events = state.chat_events.subscribe();
    let mut typing_events = state.chat_typing_events.subscribe();

    if !send_json(
        &mut socket,
        json!({
            "type": "ready",
            "protocol": "resursmap.chat.v5",
            "user_id": user_id.to_string()
        }),
    )
    .await
    {
        return;
    }
    if last_event_id > 0
        && !send_json(
            &mut socket,
            json!({"type": "sync_required", "after_event_id": last_event_id}),
        )
        .await
    {
        return;
    }

    loop {
        tokio::select! {
            incoming = socket.recv() => {
                match incoming {
                    Some(Ok(Message::Text(text))) => {
                        if handle_client_frame(&state, user_id, text.as_str())
                            && !send_json(
                                &mut socket,
                                json!({
                                    "type": "pong"
                                }),
                            )
                            .await
                        {
                            break;
                        }
                    }

                    Some(Ok(Message::Ping(payload))) => {
                        if socket
                            .send(Message::Pong(payload))
                            .await
                            .is_err()
                        {
                            break;
                        }
                    }

                    Some(Ok(Message::Close(_))) |
                    Some(Err(_)) |
                    None => {
                        break;
                    }

                    _ => {}
                }
            }

            event = events.recv() => {
                match event {
                    Ok(event) => {
                        if !(event.includes_user(user_id)
                            || event.membership_scoped
                                && user_is_group_member(&state, user_id, event.group_id))
                        {
                            continue;
                        }

                        if !send_json(
                            &mut socket,
                            json!({
                                "type": "chat_event",
                                "event": event
                            }),
                        )
                        .await
                        {
                            break;
                        }
                    }

                    Err(broadcast::error::RecvError::Lagged(_)) => {
                        if !send_json(
                            &mut socket,
                            json!({"type": "sync_required"}),
                        )
                        .await
                        {
                            break;
                        }
                    }

                    Err(broadcast::error::RecvError::Closed) => {
                        break;
                    }
                }
            }

            typing = typing_events.recv() => {
                match typing {
                    Ok(event) => {
                        if event.actor_user_id == user_id
                            || !(event.is_visible_to(user_id)
                                || event.membership_scoped
                                    && user_is_group_member(&state, user_id, event.group_id))
                        {
                            continue;
                        }

                        if !send_json(
                            &mut socket,
                            json!({
                                "type": "typing_event",
                                "event": event
                            }),
                        )
                        .await
                        {
                            break;
                        }
                    }

                    Err(broadcast::error::RecvError::Lagged(_)) => {}

                    Err(broadcast::error::RecvError::Closed) => {
                        break;
                    }
                }
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::{direct_typing_is_allowed, parse_other_user_id, ClientFrame};

    #[test]
    fn other_user_id_parser_is_strict() {
        assert_eq!(parse_other_user_id(Some("42")), Some(42));
        assert_eq!(parse_other_user_id(Some(" 7 ")), Some(7));
        assert_eq!(parse_other_user_id(Some("0")), None);
        assert_eq!(parse_other_user_id(Some("-1")), None);
        assert_eq!(parse_other_user_id(Some("abc")), None);
    }

    #[test]
    fn client_frame_parses_typing() {
        let frame: ClientFrame =
            serde_json::from_str(r#"{"type":"typing.start","other_user_id":"18"}"#)
                .expect("typing frame");

        assert_eq!(frame.frame_type, "typing.start");
        assert_eq!(frame.other_user_id.as_deref(), Some("18"));
        assert!(frame.group_id.is_none());
    }

    #[test]
    fn client_frame_parses_group_typing() {
        let frame: ClientFrame = serde_json::from_str(r#"{"type":"typing.start","group_id":"44"}"#)
            .expect("group typing frame");

        assert_eq!(frame.frame_type, "typing.start");
        assert_eq!(frame.group_id.as_deref(), Some("44"));
        assert!(frame.other_user_id.is_none());
    }

    #[test]
    fn direct_typing_requires_a_conversation_and_respects_blocks() {
        let connection = rusqlite::Connection::open_in_memory().expect("typing database");
        connection
            .execute_batch(
                "CREATE TABLE conversations (
                    id INTEGER PRIMARY KEY, user1_id INTEGER NOT NULL, user2_id INTEGER NOT NULL
                 );
                 CREATE TABLE user_blocks (
                    blocker_user_id INTEGER NOT NULL, blocked_user_id INTEGER NOT NULL
                 );
                 INSERT INTO conversations (id, user1_id, user2_id) VALUES (1, 3, 9);",
            )
            .expect("typing fixtures");

        assert!(direct_typing_is_allowed(&connection, 3, 9));
        assert!(!direct_typing_is_allowed(&connection, 3, 12));
        connection
            .execute(
                "INSERT INTO user_blocks (blocker_user_id, blocked_user_id) VALUES (9, 3)",
                [],
            )
            .expect("block fixture");
        assert!(!direct_typing_is_allowed(&connection, 3, 9));
    }

    #[test]
    fn realtime_protocol_name_is_stable() {
        assert_eq!("resursmap.chat.v5", "resursmap.chat.v5");
    }
}
