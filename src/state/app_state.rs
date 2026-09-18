use crate::db::pool::DbPool;
use serde::Serialize;
use std::{
    collections::{HashMap, VecDeque},
    sync::{
        atomic::{AtomicU64, Ordering},
        Arc, Mutex as StdMutex,
    },
};
use tokio::sync::{broadcast, Mutex};

const TYPING_RATE_MAX_KEYS: usize = 16_384;
const TYPING_RATE_STALE_AFTER_SECONDS: i64 = 60;

fn typing_rate_allows_at(
    rate_limits: &mut HashMap<String, i64>,
    rate_key: String,
    now: i64,
    max_keys: usize,
    stale_after_seconds: i64,
) -> bool {
    if let Some(last_sent) = rate_limits.get(&rate_key) {
        if now.saturating_sub(*last_sent) < 2 {
            return false;
        }

        rate_limits.insert(rate_key, now);
        return true;
    }

    if rate_limits.len() >= max_keys {
        rate_limits.retain(|_, last_sent| now.saturating_sub(*last_sent) <= stale_after_seconds);
    }

    if rate_limits.len() >= max_keys {
        return false;
    }

    rate_limits.insert(rate_key, now);
    true
}

// Realtime cursors are persisted by browsers.  Starting the in-memory
// counter at zero would let a process restart reuse old cursor values and
// cause clients to suppress valid events as duplicates.
fn initial_realtime_sequence() -> u64 {
    let millis = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|duration| duration.as_millis().min(u64::MAX as u128) as u64)
        .unwrap_or(0);

    // Leave room for many events in the same millisecond while staying below
    // JavaScript's safe integer limit for current epoch timestamps.
    millis.saturating_mul(1_024)
}

fn serialize_realtime_user_id<S>(value: &i64, serializer: S) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
{
    serializer.serialize_str(&value.to_string())
}

#[derive(Clone, Debug, Serialize)]
pub struct ChatRealtimeEvent {
    pub event_id: u64,
    pub kind: String,
    pub conversation_id: i64,
    pub message_id: i64,
    #[serde(serialize_with = "serialize_realtime_user_id")]
    pub user1_id: i64,
    #[serde(serialize_with = "serialize_realtime_user_id")]
    pub user2_id: i64,
    pub group_id: i64,
    #[serde(skip_serializing)]
    pub member_ids: Vec<String>,
    #[serde(skip_serializing)]
    pub membership_scoped: bool,
}

impl ChatRealtimeEvent {
    pub fn includes_user(&self, user_id: i64) -> bool {
        if self.group_id > 0 {
            if self.membership_scoped {
                return false;
            }
            let needle = user_id.to_string();
            return self.member_ids.iter().any(|id| id == &needle);
        }
        self.user1_id == user_id || self.user2_id == user_id
    }
}

#[derive(Clone, Debug, Serialize)]
pub struct ChatTypingEvent {
    pub event_id: u64,
    pub kind: String,
    #[serde(serialize_with = "serialize_realtime_user_id")]
    pub actor_user_id: i64,
    #[serde(serialize_with = "serialize_realtime_user_id")]
    pub other_user_id: i64,
    #[serde(serialize_with = "serialize_realtime_user_id")]
    pub user1_id: i64,
    #[serde(serialize_with = "serialize_realtime_user_id")]
    pub user2_id: i64,
    pub group_id: i64,
    #[serde(skip_serializing)]
    pub member_ids: Vec<String>,
    #[serde(skip_serializing)]
    pub membership_scoped: bool,
    pub actor_name: String,
}

impl ChatTypingEvent {
    pub fn includes_user(&self, user_id: i64) -> bool {
        if self.group_id > 0 {
            if self.membership_scoped {
                return false;
            }
            let needle = user_id.to_string();
            return self.member_ids.iter().any(|id| id == &needle);
        }
        self.user1_id == user_id || self.user2_id == user_id
    }

    pub fn is_visible_to(&self, viewer_user_id: i64) -> bool {
        self.includes_user(viewer_user_id) && self.actor_user_id != viewer_user_id
    }
}

#[derive(Clone)]
pub struct AppState {
    // Новый SQLite connection pool.
    pub db_pool: DbPool,

    pub admin_key: String,

    // Быстрый process-local rate limiter.
    //
    // Ключ:
    //     "<action>:<internal_user_id>"
    //
    // Значение:
    //     timestamps последних запросов в sliding window.
    //
    // Это не бизнес-данные, поэтому хранить limiter в SQLite
    // специально не нужно.
    pub rate_limits: Arc<Mutex<HashMap<String, VecDeque<i64>>>>,

    // Chat V4 realtime bus.
    //
    // Событие публикуется только после успешной записи в SQLite.
    // Каждый WebSocket фильтрует события по внутреннему user_id.
    pub chat_events: broadcast::Sender<ChatRealtimeEvent>,
    pub chat_event_sequence: Arc<AtomicU64>,

    // Chat V5 typing bus (ephemeral, process-local).
    pub chat_typing_events: broadcast::Sender<ChatTypingEvent>,
    pub chat_typing_sequence: Arc<AtomicU64>,
    pub chat_typing_rate: Arc<StdMutex<HashMap<String, i64>>>,

    // Bounds how many CPU-heavy Office ZIP validations
    // (decompression, see chat_media::validate_office_zip) can run at
    // once, independent of `spawn_blocking`'s own thread pool size.
    // `tokio::time::timeout` on the caller side does NOT cancel an
    // already-running blocking task — this semaphore is what actually
    // keeps a burst of concurrent DOCX/XLSX uploads from saturating CPU
    // on the small production host. Owned by AppState (constructed once,
    // shared via Arc, never per-request) rather than created ad hoc.
    pub office_zip_validation_slots: Arc<tokio::sync::Semaphore>,
}

impl AppState {
    fn typing_rate_allows(&self, rate_key: String) -> bool {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|duration| duration.as_secs() as i64)
            .unwrap_or(0);
        let mut rate_limits = match self.chat_typing_rate.lock() {
            Ok(rate_limits) => rate_limits,
            Err(_) => return false,
        };
        typing_rate_allows_at(
            &mut rate_limits,
            rate_key,
            now,
            TYPING_RATE_MAX_KEYS,
            TYPING_RATE_STALE_AFTER_SECONDS,
        )
    }

    pub fn new(db_pool: DbPool, admin_key: String) -> Self {
        let (chat_events, _) = broadcast::channel(2_048);
        let (chat_typing_events, _) = broadcast::channel(1_024);
        let initial_sequence = initial_realtime_sequence();

        Self {
            db_pool,
            admin_key,
            rate_limits: Arc::new(Mutex::new(HashMap::new())),
            chat_events,
            chat_event_sequence: Arc::new(AtomicU64::new(initial_sequence)),
            chat_typing_events,
            chat_typing_sequence: Arc::new(AtomicU64::new(initial_sequence)),
            chat_typing_rate: Arc::new(StdMutex::new(HashMap::new())),
            // One heavy validation at a time on the current small host.
            // `try_acquire_owned` rejects excess work instead of creating
            // an unbounded queue, while ordinary photo/video traffic never
            // uses this semaphore.
            office_zip_validation_slots: Arc::new(tokio::sync::Semaphore::new(1)),
        }
    }

    pub fn publish_chat_event(
        &self,
        kind: &str,
        conversation_id: i64,
        message_id: i64,
        current_user_id: i64,
        other_user_id: i64,
    ) {
        if conversation_id <= 0
            || message_id <= 0
            || current_user_id <= 0
            || other_user_id <= 0
            || current_user_id == other_user_id
        {
            return;
        }

        let (user1_id, user2_id) = if current_user_id < other_user_id {
            (current_user_id, other_user_id)
        } else {
            (other_user_id, current_user_id)
        };

        let event_id = self
            .chat_event_sequence
            .fetch_add(1, Ordering::Relaxed)
            .saturating_add(1);

        let _ = self.chat_events.send(ChatRealtimeEvent {
            event_id,
            kind: kind.to_string(),
            conversation_id,
            message_id,
            user1_id,
            user2_id,
            group_id: 0,
            member_ids: Vec::new(),
            membership_scoped: false,
        });
    }

    pub fn publish_group_chat_event(
        &self,
        kind: &str,
        group_id: i64,
        message_id: i64,
        member_ids: &[i64],
    ) {
        if group_id <= 0 || message_id <= 0 || member_ids.is_empty() {
            return;
        }

        let event_id = self
            .chat_event_sequence
            .fetch_add(1, Ordering::Relaxed)
            .saturating_add(1);

        let _ = self.chat_events.send(ChatRealtimeEvent {
            event_id,
            kind: kind.to_string(),
            conversation_id: 0,
            message_id,
            user1_id: 0,
            user2_id: 0,
            group_id,
            member_ids: member_ids.iter().map(|id| id.to_string()).collect(),
            membership_scoped: false,
        });
    }

    pub fn publish_membership_scoped_group_chat_event(
        &self,
        kind: &str,
        group_id: i64,
        message_id: i64,
    ) {
        if group_id <= 0 || message_id <= 0 {
            return;
        }
        let event_id = self
            .chat_event_sequence
            .fetch_add(1, Ordering::Relaxed)
            .saturating_add(1);
        let _ = self.chat_events.send(ChatRealtimeEvent {
            event_id,
            kind: kind.to_string(),
            conversation_id: 0,
            message_id,
            user1_id: 0,
            user2_id: 0,
            group_id,
            member_ids: Vec::new(),
            membership_scoped: true,
        });
    }

    pub fn publish_typing_event(&self, kind: &str, actor_user_id: i64, other_user_id: i64) -> bool {
        if actor_user_id <= 0
            || other_user_id <= 0
            || actor_user_id == other_user_id
            || (kind != "typing.start" && kind != "typing.stop")
        {
            return false;
        }

        let rate_key = format!("typing:{actor_user_id}:{other_user_id}");
        if !self.typing_rate_allows(rate_key) {
            return false;
        }

        let (user1_id, user2_id) = if actor_user_id < other_user_id {
            (actor_user_id, other_user_id)
        } else {
            (other_user_id, actor_user_id)
        };

        let event_id = self
            .chat_typing_sequence
            .fetch_add(1, Ordering::Relaxed)
            .saturating_add(1);

        let _ = self.chat_typing_events.send(ChatTypingEvent {
            event_id,
            kind: kind.to_string(),
            actor_user_id,
            other_user_id,
            user1_id,
            user2_id,
            group_id: 0,
            member_ids: Vec::new(),
            membership_scoped: false,
            actor_name: String::new(),
        });

        true
    }

    pub fn publish_group_typing_event(
        &self,
        kind: &str,
        actor_user_id: i64,
        group_id: i64,
        member_ids: &[i64],
        actor_name: &str,
    ) -> bool {
        if actor_user_id <= 0
            || group_id <= 0
            || member_ids.is_empty()
            || !member_ids.contains(&actor_user_id)
            || (kind != "typing.start" && kind != "typing.stop")
        {
            return false;
        }
        if !self.typing_rate_allows(format!("group-typing:{actor_user_id}:{group_id}")) {
            return false;
        }
        let event_id = self
            .chat_typing_sequence
            .fetch_add(1, Ordering::Relaxed)
            .saturating_add(1);
        let actor_name: String = actor_name.trim().chars().take(80).collect();
        let _ = self.chat_typing_events.send(ChatTypingEvent {
            event_id,
            kind: kind.to_string(),
            actor_user_id,
            other_user_id: 0,
            user1_id: 0,
            user2_id: 0,
            group_id,
            member_ids: member_ids.iter().map(|id| id.to_string()).collect(),
            membership_scoped: false,
            actor_name,
        });
        true
    }

    pub fn publish_membership_scoped_group_typing_event(
        &self,
        kind: &str,
        actor_user_id: i64,
        group_id: i64,
        actor_name: &str,
    ) -> bool {
        if actor_user_id <= 0
            || group_id <= 0
            || (kind != "typing.start" && kind != "typing.stop")
            || !self.typing_rate_allows(format!("group-typing:{actor_user_id}:{group_id}"))
        {
            return false;
        }
        let event_id = self
            .chat_typing_sequence
            .fetch_add(1, Ordering::Relaxed)
            .saturating_add(1);
        let actor_name: String = actor_name.trim().chars().take(80).collect();
        let _ = self.chat_typing_events.send(ChatTypingEvent {
            event_id,
            kind: kind.to_string(),
            actor_user_id,
            other_user_id: 0,
            user1_id: 0,
            user2_id: 0,
            group_id,
            member_ids: Vec::new(),
            membership_scoped: true,
            actor_name,
        });
        true
    }
}

#[cfg(test)]
mod tests {
    use super::{
        initial_realtime_sequence, typing_rate_allows_at, ChatRealtimeEvent, ChatTypingEvent,
    };
    use std::collections::HashMap;

    #[test]
    fn typing_rate_prunes_stale_keys_at_capacity() {
        let now = 10_000;
        let mut limits = HashMap::from([
            ("old-a".to_string(), now - 100),
            ("old-b".to_string(), now - 90),
        ]);

        assert!(typing_rate_allows_at(
            &mut limits,
            "new".to_string(),
            now,
            2,
            60
        ));
        assert_eq!(limits, HashMap::from([("new".to_string(), now)]));
    }

    #[test]
    fn typing_rate_rejects_new_keys_when_capacity_is_fresh() {
        let now = 10_000;
        let mut limits = HashMap::from([
            ("fresh-a".to_string(), now - 1),
            ("fresh-b".to_string(), now - 2),
        ]);

        assert!(!typing_rate_allows_at(
            &mut limits,
            "new".to_string(),
            now,
            2,
            60
        ));
        assert_eq!(limits.len(), 2);
    }

    #[test]
    fn typing_rate_preserves_existing_throttle_behavior() {
        let mut limits = HashMap::new();

        assert!(typing_rate_allows_at(
            &mut limits,
            "chat:1:2".to_string(),
            100,
            2,
            60
        ));
        assert!(!typing_rate_allows_at(
            &mut limits,
            "chat:1:2".to_string(),
            101,
            2,
            60
        ));
        assert!(typing_rate_allows_at(
            &mut limits,
            "chat:1:2".to_string(),
            102,
            2,
            60
        ));
    }

    #[test]
    fn realtime_sequence_is_monotonic_and_javascript_safe() {
        let sequence = initial_realtime_sequence();
        assert!(sequence > 0);
        assert!(sequence < 9_007_199_254_740_991);
    }

    #[test]
    fn typing_event_is_hidden_from_actor() {
        let event = ChatTypingEvent {
            event_id: 1,
            kind: "typing.start".to_string(),
            actor_user_id: 3,
            other_user_id: 9,
            user1_id: 3,
            user2_id: 9,
            group_id: 0,
            member_ids: Vec::new(),
            membership_scoped: false,
            actor_name: String::new(),
        };

        assert!(event.is_visible_to(9));
        assert!(!event.is_visible_to(3));
        assert!(!event.is_visible_to(4));
    }

    #[test]
    fn realtime_user_ids_serialize_without_javascript_rounding() {
        let event = ChatTypingEvent {
            event_id: 1,
            kind: "typing.start".to_string(),
            actor_user_id: 4_000_000_000_000_000_007,
            other_user_id: 4_000_000_000_000_000_009,
            user1_id: 4_000_000_000_000_000_007,
            user2_id: 4_000_000_000_000_000_009,
            group_id: 0,
            member_ids: Vec::new(),
            membership_scoped: false,
            actor_name: String::new(),
        };

        let value = serde_json::to_value(event).expect("serialize typing event");

        assert_eq!(value["actor_user_id"], "4000000000000000007");
        assert_eq!(value["other_user_id"], "4000000000000000009");
    }

    #[test]
    fn group_typing_event_is_visible_only_to_other_members() {
        let event = ChatTypingEvent {
            event_id: 2,
            kind: "typing.start".to_string(),
            actor_user_id: 3,
            other_user_id: 0,
            user1_id: 0,
            user2_id: 0,
            group_id: 44,
            member_ids: vec!["3".into(), "9".into(), "12".into()],
            membership_scoped: false,
            actor_name: "Амир".to_string(),
        };

        assert!(!event.is_visible_to(3));
        assert!(event.is_visible_to(9));
        assert!(event.is_visible_to(12));
        assert!(!event.is_visible_to(18));

        let value = serde_json::to_value(event).expect("serialize group typing event");
        assert!(value.get("member_ids").is_none());
        assert_eq!(value["actor_name"], "Амир");
    }

    #[test]
    fn realtime_event_scope_is_strict() {
        let event = ChatRealtimeEvent {
            event_id: 1,
            kind: "message.created".to_string(),
            conversation_id: 8,
            message_id: 42,
            user1_id: 3,
            user2_id: 9,
            group_id: 0,
            member_ids: Vec::new(),
            membership_scoped: false,
        };

        assert!(event.includes_user(3));
        assert!(event.includes_user(9));
        assert!(!event.includes_user(4));

        let group = ChatRealtimeEvent {
            event_id: 2,
            kind: "message.created".to_string(),
            conversation_id: 0,
            message_id: 9,
            user1_id: 0,
            user2_id: 0,
            group_id: 4,
            member_ids: vec!["3".into(), "9".into(), "12".into()],
            membership_scoped: false,
        };
        assert!(group.includes_user(12));
        assert!(!group.includes_user(8));

        let official_group = ChatRealtimeEvent {
            event_id: 3,
            kind: "message.created".to_string(),
            conversation_id: 0,
            message_id: 10,
            user1_id: 0,
            user2_id: 0,
            group_id: 5,
            member_ids: Vec::new(),
            membership_scoped: true,
        };
        assert!(!official_group.includes_user(12));
        let value = serde_json::to_value(official_group).expect("serialize official event");
        assert!(value.get("member_ids").is_none());
        assert!(value.get("membership_scoped").is_none());
    }
}
