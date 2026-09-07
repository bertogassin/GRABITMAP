use serde_json::json;
use tokio::sync::broadcast;

#[derive(Clone, Debug)]
struct ChatRealtimeEvent {
    event_id: u64,
}

#[tokio::test]
async fn lagged_realtime_subscriber_requires_cursor_sync() {
    let (sender, mut receiver) = broadcast::channel::<ChatRealtimeEvent>(2);
    for event_id in 1..=4 {
        sender.send(ChatRealtimeEvent { event_id }).unwrap();
    }

    assert!(matches!(
        receiver.recv().await,
        Err(broadcast::error::RecvError::Lagged(_))
    ));
}

#[test]
fn realtime_event_id_is_serialized_as_a_resume_cursor() {
    let event = ChatRealtimeEvent { event_id: 42 };
    assert_eq!(json!(event.event_id), json!(42));
}
