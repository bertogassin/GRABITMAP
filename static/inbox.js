(function () {
    "use strict";

    function ready(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback, { once: true });
        } else {
            callback();
        }
    }

    ready(function () {
        var list = document.getElementById("chat-dialog-list");

        if (!list || list.dataset.inboxLive !== "1") {
            return;
        }

        var caption = document.getElementById("inbox-unread-caption");
        var liveBadge = document.getElementById("inbox-live-badge");
        var fetching = false;
        var pollTimer = null;
        var syncTimer = null;
        var socket = null;
        var retryTimer = null;
        var heartbeatTimer = null;
        var retryAttempt = 0;
        var stopped = false;
        var lastSnapshot = "";
        var activeTyping = Object.create(null);
        var typingTimers = Object.create(null);

        function escapeHtml(value) {
            return String(value || "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;");
        }

        function typingPreviewHtml() {
            return (
                '<span class="chat-dialog-typing">' +
                '<span class="chat-typing-dots" aria-hidden="true">' +
                "<i></i><i></i><i></i></span>" +
                t("chat_typing", "печатает…") +
                "</span>"
            );
        }

        function setLiveState(online) {
            if (!liveBadge) {
                return;
            }

            liveBadge.hidden = false;
            liveBadge.dataset.state = online ? "online" : "offline";
            liveBadge.textContent = online ? t("chat_link_ok", "связь") : t("chat_link_off", "нет");
        }

        function conversationKey(conversation) {
            return [
                conversation.is_group ? "g" : "d",
                conversation.group_id || conversation.other_user_id,
                conversation.updated_at,
                conversation.unread_count,
                conversation.last_message,
                conversation.last_time,
                conversation.has_avatar ? "1" : "0",
            ].join("|");
        }

        var MESSAGE_ICON =
            '<svg class="icon" viewBox="0 0 24 24"><path d="M21 11.5c0 4.7-4 8.5-9 8.5-1 0-2-.2-2.9-.5L4 21l1.5-4.5C4.5 15.4 3 13.6 3 11.5 3 6.8 7 3 12 3s9 3.8 9 8.5Z"/></svg>';
        var USERS_ICON =
            '<svg class="icon" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
        var CHEVRON_ICON =
            '<svg class="icon small-icon" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>';

        function renderConversation(conversation) {
            var userId = String(conversation.other_user_id || "").trim();
            var groupId = String(conversation.group_id || "").trim();
            var isGroup = Boolean(conversation.is_group);
            var href = String(conversation.href || "").trim() ||
                (isGroup && groupId
                    ? "/app/group/" + encodeURIComponent(groupId)
                    : "/app/chat/" + encodeURIComponent(userId));
            var username = String(conversation.username || "").trim();
            var usernameHtml = !isGroup && username
                ? '<div class="card-meta rm-dialog-username">@'
                  + escapeHtml(username)
                  + "</div>"
                : "";
            var unreadHtml =
                Number(conversation.unread_count) > 0
                    ? '<span class="chat-dialog-unread">'
                      + escapeHtml(conversation.unread_count)
                      + "</span>"
                    : "";
            var lastTime = conversation.last_time
                ? '<div class="chat-dialog-time">'
                  + escapeHtml(conversation.last_time)
                  + "</div>"
                : '<div class="chat-dialog-time"></div>';
            var previewText = !isGroup && activeTyping[userId]
                ? typingPreviewHtml()
                : escapeHtml(
                    conversation.last_message || (isGroup ? t("chat_new_group_preview", "Новая группа") : t("chat_new_dialog", "Новый диалог"))
                );
            var fallbackAvatar = isGroup ? USERS_ICON : MESSAGE_ICON;
            var avatarHtml = !isGroup && conversation.has_avatar && userId
                ? '<img class="rm-me-avatar-img" src="/api/avatars/'
                  + encodeURIComponent(userId)
                  + '" alt="" onerror=\'this.onerror=null;var p=this.parentNode;this.remove();if(p)p.insertAdjacentHTML("beforeend",'
                  + JSON.stringify(MESSAGE_ICON)
                  + ');\'>'
                : fallbackAvatar;

            return (
                '<a href="'
                + href
                + '#chat-end" class="card chat-dialog-card" data-other-user-id="'
                + escapeHtml(userId)
                + '" data-group-id="'
                + escapeHtml(groupId)
                + '" data-kind="'
                + (isGroup ? "group" : "dm")
                + '"><div class="card-icon chat-dialog-avatar">'
                + avatarHtml
                + '</div><div class="card-content"><div class="card-title">'
                + escapeHtml(conversation.display_name)
                + "</div>"
                + usernameHtml
                + '<div class="card-meta chat-dialog-preview">'
                + previewText
                + '</div></div><div class="chat-dialog-side">'
                + lastTime
                + unreadHtml
                + '<div class="card-arrow">'
                + CHEVRON_ICON
                + "</div></div></a>"
            );
        }

        function unreadCaption(totalUnread) {
            var n = Number(totalUnread || 0);
            if (n <= 0) {
                return t("chat_all_read", "Все прочитано");
            }
            if (n % 10 === 1 && n % 100 !== 11) {
                return n + " непрочитанное";
            }
            return n + " непрочитанных";
        }

        function renderEmptyState() {
            return (
                '<div class="card rm-empty-state"><div class="card-content"><div class="card-title">Нет диалогов</div><div class="card-meta">Откройте профиль участника, чтобы начать диалог, или создайте группу.</div><div class="rm-empty-state-actions"><a class="rm-empty-action ui-button" href="/app/search">Найти участников</a><a class="rm-empty-action ui-button" href="/app/groups/new">Создать группу</a></div></div></div>'
            );
        }

        function updateDialogTyping(userId, active) {
            if (active) {
                activeTyping[userId] = true;
            } else {
                delete activeTyping[userId];
            }

            var card = list.querySelector(
                '.chat-dialog-card[data-other-user-id="' + userId + '"]'
            );

            if (!card) {
                return;
            }

            var preview = card.querySelector(".chat-dialog-preview");

            if (!preview) {
                return;
            }

            if (active) {
                if (!preview.dataset.savedPreview) {
                    preview.dataset.savedPreview = preview.innerHTML;
                }

                preview.innerHTML = typingPreviewHtml();
                preview.classList.add("is-typing");
                card.classList.add("is-peer-typing");
                return;
            }

            preview.classList.remove("is-typing");
            card.classList.remove("is-peer-typing");

            if (preview.dataset.savedPreview) {
                preview.innerHTML = preview.dataset.savedPreview;
                delete preview.dataset.savedPreview;
            }
        }

        function markTyping(userId) {
            updateDialogTyping(userId, true);

            if (typingTimers[userId]) {
                window.clearTimeout(typingTimers[userId]);
            }

            typingTimers[userId] = window.setTimeout(function () {
                typingTimers[userId] = null;
                updateDialogTyping(userId, false);
            }, 5200);
        }

        function stopTyping(userId) {
            if (typingTimers[userId]) {
                window.clearTimeout(typingTimers[userId]);
                typingTimers[userId] = null;
            }

            updateDialogTyping(userId, false);
        }

        function applySnapshot(data) {
            var conversations = Array.isArray(data.conversations)
                ? data.conversations
                : [];
            var snapshot = conversations.map(conversationKey).join("\n");

            if (snapshot === lastSnapshot) {
                return;
            }

            lastSnapshot = snapshot;

            if (caption) {
                caption.textContent = unreadCaption(data.total_unread);
            }

            if (typeof window.resursmapRefreshAttentionBadge === "function") {
                window.resursmapRefreshAttentionBadge();
            }

            if (!conversations.length) {
                list.innerHTML = renderEmptyState();
                return;
            }

            list.innerHTML = conversations.map(renderConversation).join("");
        }

        async function refreshInbox() {
            if (fetching || stopped) {
                return;
            }

            fetching = true;

            try {
                var response = await fetch("/api/chat/conversations", {
                    credentials: "same-origin",
                    cache: "no-store",
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (response.status === 401) {
                    window.location.href =
                        "/login?next=" + encodeURIComponent("/app/messages");
                    return;
                }

                var data = await response.json();

                if (!response.ok || !data.ok) {
                    setLiveState(false);
                    return;
                }

                applySnapshot(data);
            } catch (_) {
                setLiveState(false);
            } finally {
                fetching = false;
            }
        }

        function scheduleSync() {
            window.clearTimeout(syncTimer);

            syncTimer = window.setTimeout(function () {
                syncTimer = null;
                refreshInbox();
            }, 350);
        }

        function websocketUrl() {
            var scheme =
                window.location.protocol === "https:" ? "wss:" : "ws:";

            return (
                scheme + "//" + window.location.host + "/api/chat/realtime"
            );
        }

        function clearSocketTimers() {
            window.clearTimeout(retryTimer);
            window.clearInterval(heartbeatTimer);
            retryTimer = null;
            heartbeatTimer = null;
        }

        function scheduleReconnect() {
            if (stopped || retryTimer) {
                return;
            }

            var delay = Math.min(1000 * Math.pow(2, retryAttempt), 15000);
            retryAttempt = Math.min(retryAttempt + 1, 4);

            retryTimer = window.setTimeout(function () {
                retryTimer = null;
                connectRealtime();
            }, delay);
        }

        function handleTypingPayload(payload) {
            if (
                !payload ||
                payload.type !== "typing_event" ||
                !payload.event
            ) {
                return;
            }

            var event = payload.event;
            var actorId = String(event.actor_user_id || "").trim();

            if (!actorId) {
                return;
            }

            if (event.kind === "typing.start") {
                markTyping(actorId);
            } else if (event.kind === "typing.stop") {
                stopTyping(actorId);
            }
        }

        function connectRealtime() {
            if (stopped || !window.WebSocket) {
                setLiveState(false);
                return;
            }

            clearSocketTimers();

            if (
                socket &&
                (socket.readyState === WebSocket.OPEN ||
                    socket.readyState === WebSocket.CONNECTING)
            ) {
                return;
            }

            try {
                socket = new WebSocket(websocketUrl());
            } catch (_) {
                setLiveState(false);
                scheduleReconnect();
                return;
            }

            socket.addEventListener("open", function () {
                retryAttempt = 0;
                setLiveState(true);

                heartbeatTimer = window.setInterval(function () {
                    if (!socket || socket.readyState !== WebSocket.OPEN) {
                        return;
                    }

                    socket.send(JSON.stringify({ type: "ping" }));
                }, 20000);
            });

            socket.addEventListener("message", function (event) {
                var payload;

                try {
                    payload = JSON.parse(event.data);
                } catch (_) {
                    return;
                }

                handleTypingPayload(payload);

                if (
                    payload.type === "chat_event" ||
                    payload.type === "sync_required" ||
                    payload.type === "ready"
                ) {
                    scheduleSync();
                    if (typeof window.resursmapRefreshAttentionBadge === "function") {
                        window.resursmapRefreshAttentionBadge();
                    }
                }
            });

            socket.addEventListener("close", function () {
                clearSocketTimers();
                socket = null;
                setLiveState(false);

                if (!stopped) {
                    scheduleReconnect();
                }
            });

            socket.addEventListener("error", function () {
                setLiveState(false);
            });
        }

        function startPollingFallback() {
            window.clearInterval(pollTimer);

            // WebSocket gives immediate updates, but it must never
            // disable the reliable fallback. Mobile networks can keep a
            // socket formally open after realtime events stop arriving.
            pollTimer = window.setInterval(function () {
                refreshInbox();
            }, 5000);
        }

        window.addEventListener("visibilitychange", function () {
            if (document.visibilityState === "visible") {
                refreshInbox();
            }
        });

        window.addEventListener("pagehide", function () {
            stopped = true;
            window.clearInterval(pollTimer);
            window.clearTimeout(syncTimer);
            clearSocketTimers();

            Object.keys(typingTimers).forEach(function (userId) {
                window.clearTimeout(typingTimers[userId]);
            });

            if (socket) {
                socket.close();
                socket = null;
            }
        });

        refreshInbox();
        connectRealtime();
        startPollingFallback();
    });
})();
