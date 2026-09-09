(function () {
    "use strict";

    if (
        !document.querySelector("[data-nav-chats-link]") &&
        !document.querySelector("[data-nav-menu-link]")
    ) {
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

    function notifySound() {
        if (typeof window.resursmapPlayNotificationSound === "function") {
            window.resursmapPlayNotificationSound();
        }
    }

    var lastNotifications = 0;
    var lastMessages = 0;
    var baselineReady = false;
    var attentionTimer = null;
    var attentionRequest = null;
    var attentionStopped = false;

    function notifyReady() {
        return "Notification" in window && Notification.permission === "granted";
    }

    function askNotifyPermission() {
        if (!("Notification" in window) || Notification.permission !== "default") {
            return;
        }
        Notification.requestPermission().then(function (permission) {
            void permission;
        }).catch(function () {});
    }

    function showSystemNotice(title, body, tag, url) {
        if (!notifyReady()) {
            return;
        }
        var options = {
            body: body || "",
            icon: "/static/app-icon-192.png",
            tag: tag || "grabit",
            data: { url: url || "/app" }
        };
        if (navigator.serviceWorker && navigator.serviceWorker.ready) {
            navigator.serviceWorker.ready.then(function (reg) {
                return reg.showNotification(title || "GRABIT", options);
            }).catch(function () {});
            return;
        }
        try {
            new Notification(title || "GRABIT", options);
        } catch (e) {}
    }

    function showNudgeNotifications(nudges) {
        if (!nudges || !nudges.length || !notifyReady()) {
            return;
        }

        nudges.forEach(function (nudge) {
            var key = "resursmap:nudge:" + String(nudge.kind || "") + ":" +
                new Date().toISOString().slice(0, 10);
            try {
                if (localStorage.getItem(key) === "1") {
                    return;
                }
                localStorage.setItem(key, "1");
            } catch (e) {}

            showSystemNotice(
                nudge.title || "GRABIT",
                nudge.body || "",
                "grabit-nudge-" + String(nudge.kind || "day"),
                nudge.href || "/app"
            );
        });
    }

    function formatCount(value) {
        var count = Number(value) || 0;

        if (count <= 0) {
            return "";
        }

        return count > 99 ? "99+" : String(count);
    }

    function setBadge(link, count) {
        if (!link) {
            return;
        }

        var badge = link.querySelector(".nav-badge");
        var label = formatCount(count);

        if (!label) {
            if (badge) {
                badge.remove();
            }

            link.classList.remove("has-attention");
            return;
        }

        if (!badge) {
            badge = document.createElement("span");
            badge.className = "nav-badge";
            link.insertBefore(badge, link.querySelector("span"));
        }

        badge.textContent = label;
        link.classList.add("has-attention");
    }

    function refreshAttention() {
        if (attentionStopped || document.hidden) {
            return Promise.resolve();
        }
        if (attentionRequest) {
            return attentionRequest;
        }

        attentionRequest = fetch("/api/account/attention-count", {
            credentials: "same-origin",
            headers: { Accept: "application/json" },
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("attention_count_failed");
                }

                return response.json();
            })
            .then(function (data) {
                var messages = Number(data.messages) || 0;
                var notifications = Number(data.notifications) || 0;
                var menuCount = notifications;

                if (baselineReady) {
                    if (notifications > lastNotifications) {
                        notifySound();
                        showSystemNotice(
                            "GRABIT",
                            t("notify_generic", "Есть новое уведомление."),
                            "grabit-inbox",
                            "/app/notifications"
                        );
                    }
                    if (messages > lastMessages) {
                        notifySound();
                        showSystemNotice(
                            t("notify_new_message", "Новое сообщение"),
                            t("notify_open_chat", "Откройте чат в GRABIT."),
                            "grabit-chat",
                            "/app/messages"
                        );
                    }
                }

                baselineReady = true;
                lastNotifications = notifications;
                lastMessages = messages;
                setBadge(document.querySelector("[data-nav-chats-link]"), messages);
                setBadge(document.querySelector("[data-nav-menu-link]"), menuCount);
                showNudgeNotifications(data.nudges);

                if (typeof window.resursmapOnAttentionCount === "function") {
                    window.resursmapOnAttentionCount(data);
                }
            })
            .catch(function () {})
            .finally(function () {
                attentionRequest = null;
            });
        return attentionRequest;
    }

    window.resursmapRefreshAttentionBadge = refreshAttention;

    function scheduleAttentionRefresh(delay) {
        window.clearTimeout(attentionTimer);
        if (attentionStopped || document.hidden) {
            return;
        }
        attentionTimer = window.setTimeout(function () {
            attentionTimer = null;
            refreshAttention().finally(function () {
                scheduleAttentionRefresh(8000);
            });
        }, delay);
    }

    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
            scheduleAttentionRefresh(0);
        } else {
            window.clearTimeout(attentionTimer);
        }
    });

    window.addEventListener("pagehide", function () {
        attentionStopped = true;
        window.clearTimeout(attentionTimer);
    }, { once: true });

    scheduleAttentionRefresh(400);
    askNotifyPermission();
    document.addEventListener("pointerdown", function () {
        askNotifyPermission();
    }, { once: true, passive: true });
})();
