(function () {
    "use strict";

    function ready(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback, { once: true });
        } else {
            callback();
        }
    }

    function internalHref(value, fallback) {
        try {
            var url = new URL(String(value || ""), window.location.origin);
            if (url.origin !== window.location.origin || !url.pathname.startsWith("/app/")) {
                return fallback;
            }
            return url.pathname + url.search + url.hash;
        } catch (_) {
            return fallback;
        }
    }

    ready(function () {
        var list = document.getElementById("chat-dialog-list");

        if (!list || list.dataset.inboxLive !== "1") {
            return;
        }

        function t(key, fallback, params) {
            if (window.m && typeof window.m[key] === "function") {
                try {
                    return window.m[key](params || {});
                } catch (_) {}
            }
            if (typeof window.rmT === "function") {
                var translated = window.rmT(key, params);
                if (translated && translated !== key) {
                    return translated;
                }
            }
            if (!params) {
                return fallback;
            }
            return String(fallback).replace(/\{(\w+)\}/g, function (_, name) {
                return params[name] != null ? String(params[name]) : "";
            });
        }

        function tf(key, fallback, params) {
            return t(key, fallback, params);
        }

        var caption = document.getElementById("inbox-unread-caption");
        var liveBadge = document.getElementById("inbox-live-badge");
        var searchInput = document.getElementById("inbox-search-input");
        var fetching = false;
        var pollTimer = null;
        var syncTimer = null;
        var socket = null;
        var retryTimer = null;
        var heartbeatTimer = null;
        var retryAttempt = 0;
        var viewerUserId = String(list.dataset.viewerUserId || "").trim();
        var inboxView = list.dataset.inboxView === "archived" ? "archived" : "active";
        var cursorKey = "resursmap:inbox-event-cursor:" + viewerUserId;
        var shareListingValue = new URLSearchParams(
            window.location.search
        ).get("share");
        var shareListingId = /^[1-9][0-9]{0,18}$/.test(
            String(shareListingValue || "")
        )
            ? String(shareListingValue)
            : "";
        var lastEventId = 0;
        try {
            lastEventId = Number(window.localStorage.getItem(cursorKey)) || 0;
        } catch (_) {}

        function rememberEventCursor(value) {
            var cursor = Number(value);
            if (!Number.isSafeInteger(cursor) || cursor <= lastEventId) return;
            lastEventId = cursor;
            try {
                window.localStorage.setItem(cursorKey, String(cursor));
            } catch (_) {}
        }
        var stopped = false;
        var suspended = document.visibilityState === "hidden";
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

        function typingPreviewHtml(actorName) {
            var name = String(actorName || "").trim();
            return (
                '<span class="chat-dialog-typing">' +
                '<span class="chat-typing-dots" aria-hidden="true">' +
                "<i></i><i></i><i></i></span>" +
                (name ? escapeHtml(name) + " · " : "") +
                t("chat_typing", "печатает…") +
                "</span>"
            );
        }

        function typingNames(typingKey) {
            var actors = activeTyping[typingKey] || {};
            return Object.values(actors).filter(Boolean).slice(0, 2).join(", ");
        }

        function setLiveState(online) {
            if (!liveBadge) {
                return;
            }

            liveBadge.hidden = false;
            liveBadge.removeAttribute("aria-hidden");
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
                conversation.pinned_at || 0,
                conversation.archived_at || 0,
                conversation.muted_until || 0,
            ].join("|");
        }

        var MESSAGE_ICON =
            '<svg class="icon" viewBox="0 0 24 24"><path d="M21 11.5c0 4.7-4 8.5-9 8.5-1 0-2-.2-2.9-.5L4 21l1.5-4.5C4.5 15.4 3 13.6 3 11.5 3 6.8 7 3 12 3s9 3.8 9 8.5Z"/></svg>';
        var USERS_ICON =
            '<svg class="icon" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
        var CHEVRON_ICON =
            '<svg class="icon small-icon" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>';

        function preferenceControls(conversation, isGroup, targetId) {
            var pinned = Number(conversation.pinned_at || 0) > 0;
            var muted = Number(conversation.muted_until || 0) > Date.now() / 1000;
            var kind = isGroup ? "group" : "direct";
            var action = "/app/chat-preference/" + kind + "/" + encodeURIComponent(targetId);
            function control(value, label, symbol) {
                return '<form method="post" action="' + escapeHtml(action) + '">' +
                    '<input type="hidden" name="action" value="' + value + '">' +
                    '<input type="hidden" name="return_view" value="' + inboxView + '">' +
                    '<button type="submit" title="' + label + '" aria-label="' + label + '">' + symbol + '</button></form>';
            }
            return '<div class="chat-dialog-controls" aria-label="Действия с чатом">' +
                control(pinned ? "unpin" : "pin", pinned ? "Открепить" : "Закрепить", pinned ? "★" : "☆") +
                control(muted ? "unmute" : "mute", muted ? "Включить уведомления" : "Отключить уведомления", muted ? "🔕" : "🔔") +
                control(inboxView === "archived" ? "unarchive" : "archive", inboxView === "archived" ? "Вернуть из архива" : "В архив", inboxView === "archived" ? "↩" : "▣") +
                "</div>";
        }

        function formatConversationTime(timestamp) {
            var value = Number(timestamp || 0);
            var date = new Date(value * 1000);
            if (!Number.isFinite(value) || value <= 0 || Number.isNaN(date.getTime())) {
                return "";
            }

            var now = new Date();
            var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var days = Math.round((today.getTime() - target.getTime()) / 86400000);
            var locale = document.documentElement.lang || navigator.language || "en";

            if (days === 0) {
                return new Intl.DateTimeFormat(locale, {
                    hour: "2-digit",
                    minute: "2-digit",
                }).format(date);
            }
            if (days > 0 && days < 7) {
                return new Intl.DateTimeFormat(locale, {
                    weekday: "short",
                }).format(date);
            }
            return new Intl.DateTimeFormat(locale, {
                day: "2-digit",
                month: "2-digit",
            }).format(date);
        }

        function renderConversation(conversation) {
            var userId = String(conversation.other_user_id || "").trim();
            var groupId = String(conversation.group_id || "").trim();
            var isGroup = Boolean(conversation.is_group);
            var fallbackHref = isGroup && groupId
                    ? "/app/group/" + encodeURIComponent(groupId)
                    : "/app/chat/" + encodeURIComponent(userId);
            var href = internalHref(conversation.href, fallbackHref);
            if (shareListingId) {
                var shareUrl = new URL(href, window.location.origin);
                shareUrl.searchParams.set("share", shareListingId);
                href = shareUrl.pathname + shareUrl.search + shareUrl.hash;
            }
            var username = String(conversation.username || "").trim();
            var usernameHtml = !isGroup && username
                ? '<div class="card-meta rm-dialog-username">@'
                  + escapeHtml(username)
                  + "</div>"
                : "";
            var unreadCount = Math.max(0, Number(conversation.unread_count) || 0);
            var unreadHtml =
                unreadCount > 0
                    ? '<span class="chat-dialog-unread" aria-label="'
                      + escapeHtml(unreadCaption(unreadCount))
                      + '">'
                      + escapeHtml(unreadCount > 99 ? "99+" : unreadCount)
                      + "</span>"
                    : "";
            var formattedTime = formatConversationTime(conversation.updated_at);
            var lastTime = formattedTime
                ? '<div class="chat-dialog-time">'
                  + escapeHtml(formattedTime)
                  + "</div>"
                : '<div class="chat-dialog-time"></div>';
            var typingKey = (isGroup ? "g:" : "d:") + (isGroup ? groupId : userId);
            var previewText = activeTyping[typingKey]
                ? typingPreviewHtml(isGroup ? typingNames(typingKey) : "")
                : escapeHtml(
                    conversation.last_message || (isGroup ? t("chat_new_group_preview", "Новая группа") : t("chat_new_dialog", "Новый диалог"))
                );
            var fallbackAvatar = isGroup ? USERS_ICON : MESSAGE_ICON;
            var avatarHtml = isGroup && conversation.has_avatar && groupId
                ? '<img class="rm-me-avatar-img" src="/api/group/'
                  + encodeURIComponent(groupId)
                  + '/avatar" alt="" onerror=\'this.onerror=null;var p=this.parentNode;this.remove();if(p)p.insertAdjacentHTML("beforeend",'
                  + JSON.stringify(USERS_ICON)
                  + ');\'>'
                : !isGroup && conversation.has_avatar && userId
                ? '<img class="rm-me-avatar-img" src="/api/avatars/'
                  + encodeURIComponent(userId)
                  + '" alt="" onerror=\'this.onerror=null;var p=this.parentNode;this.remove();if(p)p.insertAdjacentHTML("beforeend",'
                  + JSON.stringify(MESSAGE_ICON)
                  + ');\'>'
                : fallbackAvatar;

            return (
                '<article class="chat-dialog-entry" data-inbox-entry><a href="'
                + escapeHtml(href)
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
                + preferenceControls(conversation, isGroup, isGroup ? groupId : userId)
                + "</article>"
            );
        }

        function unreadCaption(totalUnread) {
            var n = Number(totalUnread || 0);
            if (n <= 0) {
                return t("chat_all_read", "Все прочитано");
            }
            if (n % 10 === 1 && n % 100 !== 11) {
                return tf("inbox_unread_one", "{n} непрочитанное", { n: n });
            }
            return tf("inbox_unread_many", "{n} непрочитанных", { n: n });
        }

        function renderEmptyState() {
            return (
                '<div class="card rm-empty-state"><div class="card-content"><div class="card-title">' +
                t("inbox_empty_title", "Нет диалогов") +
                '</div><div class="card-meta">' +
                t(
                    "inbox_empty_body",
                    "Откройте профиль участника, чтобы начать диалог, или создайте группу."
                ) +
                '</div><div class="rm-empty-state-actions"><a class="rm-empty-action ui-button" href="/app/search">' +
                t("inbox_find_people", "Найти участников") +
                '</a><a class="rm-empty-action ui-button" href="/app/groups/new">' +
                t("chat_new_group", "Создать группу") +
                "</a></div></div></div>"
            );
        }

        function applyInboxFilter() {
            if (!searchInput) {
                return;
            }
            var query = String(searchInput.value || "")
                .trim()
                .toLocaleLowerCase();

            list.querySelectorAll(".chat-dialog-entry").forEach(function (entry) {
                var searchable = String(entry.textContent || "").toLocaleLowerCase();
                entry.hidden = Boolean(query) && !searchable.includes(query);
            });
        }

        function updateDialogTyping(kind, targetId, actorId, active, actorName) {
            var typingKey = kind + ":" + targetId;
            if (active) {
                activeTyping[typingKey] = activeTyping[typingKey] || Object.create(null);
                activeTyping[typingKey][actorId] = String(actorName || "");
            } else if (activeTyping[typingKey]) {
                delete activeTyping[typingKey][actorId];
            }
            if (activeTyping[typingKey] && Object.keys(activeTyping[typingKey]).length === 0) {
                delete activeTyping[typingKey];
            }

            var selector = kind === "g"
                ? '.chat-dialog-card[data-group-id="' + targetId + '"]'
                : '.chat-dialog-card[data-other-user-id="' + targetId + '"]';
            var card = list.querySelector(selector);

            if (!card) {
                return;
            }

            var preview = card.querySelector(".chat-dialog-preview");

            if (!preview) {
                return;
            }

            if (activeTyping[typingKey]) {
                if (!preview.dataset.savedPreview) {
                    preview.dataset.savedPreview = preview.innerHTML;
                }

                preview.innerHTML = typingPreviewHtml(kind === "g" ? typingNames(typingKey) : "");
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

        function markTyping(kind, targetId, actorId, actorName) {
            var typingKey = kind + ":" + targetId;
            var timerKey = typingKey + ":" + actorId;
            updateDialogTyping(kind, targetId, actorId, true, actorName);

            if (typingTimers[timerKey]) {
                window.clearTimeout(typingTimers[timerKey]);
            }

            typingTimers[timerKey] = window.setTimeout(function () {
                typingTimers[timerKey] = null;
                updateDialogTyping(kind, targetId, actorId, false, "");
            }, 5200);
        }

        function stopTyping(kind, targetId, actorId) {
            var typingKey = kind + ":" + targetId;
            var timerKey = typingKey + ":" + actorId;
            if (typingTimers[timerKey]) {
                window.clearTimeout(typingTimers[timerKey]);
                typingTimers[timerKey] = null;
            }

            updateDialogTyping(kind, targetId, actorId, false, "");
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
            applyInboxFilter();
        }

        async function refreshInbox() {
            if (fetching || stopped || suspended) {
                return;
            }

            fetching = true;

            try {
                var response = await fetch(
                    "/api/chat/conversations" + (inboxView === "archived" ? "?view=archived" : ""), {
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
                scheme + "//" + window.location.host + "/api/chat/realtime?last_event_id=" +
                encodeURIComponent(String(lastEventId))
            );
        }

        function clearSocketTimers() {
            window.clearTimeout(retryTimer);
            window.clearInterval(heartbeatTimer);
            retryTimer = null;
            heartbeatTimer = null;
        }

        function scheduleReconnect() {
            if (stopped || suspended || retryTimer) {
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
            var groupId = String(event.group_id || "").trim();

            if (!actorId) {
                return;
            }
            var kind = groupId ? "g" : "d";
            var targetId = groupId || actorId;
            var actorName = groupId ? String(event.actor_name || "").trim() : "";

            if (event.kind === "typing.start") {
                markTyping(kind, targetId, actorId, actorName);
            } else if (event.kind === "typing.stop") {
                stopTyping(kind, targetId, actorId);
            }
        }

        function connectRealtime() {
            if (stopped || suspended || !window.WebSocket) {
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

            var currentSocket;
            try {
                currentSocket = new WebSocket(websocketUrl());
                socket = currentSocket;
            } catch (_) {
                setLiveState(false);
                scheduleReconnect();
                return;
            }

            currentSocket.addEventListener("open", function () {
                if (socket !== currentSocket || suspended || stopped) {
                    currentSocket.close();
                    return;
                }
                retryAttempt = 0;
                setLiveState(true);

                heartbeatTimer = window.setInterval(function () {
                    if (socket !== currentSocket || currentSocket.readyState !== WebSocket.OPEN) {
                        return;
                    }

                    currentSocket.send(JSON.stringify({ type: "ping" }));
                }, 20000);
            });

            currentSocket.addEventListener("message", function (event) {
                if (socket !== currentSocket || suspended || stopped) {
                    return;
                }
                var payload;

                try {
                    payload = JSON.parse(event.data);
                } catch (_) {
                    return;
                }
                if (payload.event && Number(payload.event.event_id) > lastEventId) {
                    rememberEventCursor(payload.event.event_id);
                }
                if (payload.type === "sync_required") {
                    rememberEventCursor(payload.after_event_id);
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

            currentSocket.addEventListener("close", function () {
                if (socket !== currentSocket) {
                    return;
                }
                clearSocketTimers();
                socket = null;
                setLiveState(false);

                if (!stopped && !suspended) {
                    scheduleReconnect();
                }
            });

            currentSocket.addEventListener("error", function () {
                if (socket !== currentSocket) {
                    return;
                }
                setLiveState(false);
            });
        }

        function startPollingFallback() {
            window.clearInterval(pollTimer);

            if (stopped || suspended) {
                return;
            }

            // WebSocket gives immediate updates, but it must never
            // disable the reliable fallback. Mobile networks can keep a
            // socket formally open after realtime events stop arriving.
            pollTimer = window.setInterval(function () {
                refreshInbox();
            }, 5000);
        }

        window.addEventListener("visibilitychange", function () {
            if (document.visibilityState === "visible") {
                suspended = false;
                refreshInbox();
                connectRealtime();
                startPollingFallback();
            } else {
                suspended = true;
                window.clearInterval(pollTimer);
                window.clearTimeout(syncTimer);
                clearSocketTimers();
                if (socket) {
                    socket.close();
                    socket = null;
                }
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
        if (searchInput) {
            searchInput.addEventListener("input", applyInboxFilter);
        }
        connectRealtime();
        startPollingFallback();
    });
})();
