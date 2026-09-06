(function () {
    "use strict";

    if (
        !document.querySelector("[data-nav-chats-link]") &&
        !document.querySelector("[data-nav-menu-link]")
    ) {
        return;
    }

    function notifySound() {
        if (typeof window.resursmapPlayNotificationSound === "function") {
            window.resursmapPlayNotificationSound();
        }
    }

    var lastNotifications = 0;

    function showNudgeNotifications(nudges) {
        if (!nudges || !nudges.length || !("Notification" in window)) {
            return;
        }
        if (Notification.permission !== "granted") {
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

            try {
                new Notification(nudge.title || "GRABIT", {
                    body: nudge.body || "",
                    icon: "/static/app-icon.svg"
                });
            } catch (e) {}
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
        return fetch("/api/account/attention-count", {
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

                if (notifications > lastNotifications && lastNotifications > 0) {
                    notifySound();
                }

                lastNotifications = notifications;
                setBadge(document.querySelector("[data-nav-chats-link]"), messages);
                setBadge(document.querySelector("[data-nav-menu-link]"), menuCount);
                showNudgeNotifications(data.nudges);

                if (typeof window.resursmapOnAttentionCount === "function") {
                    window.resursmapOnAttentionCount(data);
                }
            })
            .catch(function () {});
    }

    window.resursmapRefreshAttentionBadge = refreshAttention;

    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
            refreshAttention();
        }
    });

    setInterval(refreshAttention, 8000);
    setTimeout(refreshAttention, 400);
})();
