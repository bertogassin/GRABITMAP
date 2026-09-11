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
        var history = document.getElementById("chat-messages");
        var toggle = document.getElementById("chat-search-toggle");
        var panel = document.getElementById("chat-search-panel");
        var form = document.getElementById("chat-search-form");
        var input = document.getElementById("chat-search-input");
        var close = document.getElementById("chat-search-close");
        var status = document.getElementById("chat-search-status");
        var results = document.getElementById("chat-search-results");

        if (!history || !toggle || !panel || !form || !input || !close || !status || !results) {
            return;
        }

        var otherPublicId = String(history.dataset.otherPublicId || "").trim();
        var otherUserRoute = otherPublicId;
        var groupId = String(history.dataset.groupId || "").trim();
        var isGroup = /^[1-9][0-9]{0,18}$/.test(groupId);
        var targetIsValid = isGroup
            ? /^[1-9][0-9]{0,18}$/.test(groupId)
            : /^[A-Za-z0-9_-]{1,64}$/.test(otherUserRoute);

        if (!targetIsValid) {
            toggle.hidden = true;
            return;
        }

        var timer = null;
        var controller = null;
        var requestNumber = 0;

        function t(key, fallback) {
            if (window.m && typeof window.m[key] === "function") {
                try {
                    return window.m[key]({});
                } catch (_) {
                    // Use the shared translator or fallback.
                }
            }
            if (typeof window.rmT === "function") {
                var translated = window.rmT(key);
                if (translated && translated !== key) {
                    return translated;
                }
            }
            return fallback;
        }

        function endpoint(query) {
            var base = isGroup
                ? "/api/group/" + groupId + "/search"
                : "/api/chat/" + encodeURIComponent(otherUserRoute) + "/search";
            return base + "?q=" + encodeURIComponent(query);
        }

        function formatTime(timestamp) {
            var value = Number(timestamp || 0);
            if (!Number.isFinite(value) || value <= 0) {
                return "";
            }
            try {
                return new Intl.DateTimeFormat(document.documentElement.lang || undefined, {
                    dateStyle: "medium",
                    timeStyle: "short"
                }).format(new Date(value * 1000));
            } catch (_) {
                return new Date(value * 1000).toLocaleString();
            }
        }

        function clearResults() {
            results.replaceChildren();
        }

        function render(items) {
            clearResults();
            status.textContent = items.length ? String(items.length) : "0";

            items.forEach(function (item) {
                var id = Number(item.id || 0);
                if (!Number.isSafeInteger(id) || id <= 0) {
                    return;
                }
                var button = document.createElement("button");
                button.type = "button";
                button.className = "chat-search-result";
                button.dataset.messageId = String(id);

                var meta = document.createElement("span");
                meta.className = "chat-search-result-meta";
                var author = item.is_mine
                    ? t("chat_you", "Вы")
                    : String(item.sender_name || t("chat_peer", "Собеседник"));
                meta.textContent = [author, formatTime(item.created_at)].filter(Boolean).join(" · ");

                var message = document.createElement("span");
                message.className = "chat-search-result-message";
                message.textContent = String(item.message || "");

                button.appendChild(meta);
                button.appendChild(message);
                results.appendChild(button);
            });
        }

        async function search() {
            var query = input.value.trim();
            if (Array.from(query).length < 2) {
                if (controller) {
                    controller.abort();
                    controller = null;
                }
                clearResults();
                status.textContent = "";
                return;
            }

            if (controller) {
                controller.abort();
            }
            controller = new AbortController();
            var currentRequest = ++requestNumber;
            status.textContent = t("chat_loading", "Загрузка…");

            try {
                var response = await fetch(endpoint(query), {
                    credentials: "same-origin",
                    headers: { Accept: "application/json" },
                    signal: controller.signal
                });
                var data = await response.json();
                if (!response.ok || !data.ok) {
                    throw new Error(String(data.error || "search_failed"));
                }
                if (currentRequest === requestNumber) {
                    render(Array.isArray(data.results) ? data.results : []);
                }
            } catch (error) {
                if (error && error.name === "AbortError") {
                    return;
                }
                if (currentRequest === requestNumber) {
                    clearResults();
                    status.textContent = t("chat_history_error", "Не удалось загрузить историю");
                }
            }
        }

        function scheduleSearch() {
            window.clearTimeout(timer);
            timer = window.setTimeout(search, 250);
        }

        function openPanel() {
            panel.hidden = false;
            toggle.setAttribute("aria-pressed", "true");
            var menu = document.getElementById("chat-header-menu");
            var more = document.getElementById("chat-header-more");
            if (menu) {
                menu.hidden = true;
            }
            if (more) {
                more.setAttribute("aria-expanded", "false");
            }
            input.focus();
        }

        function closePanel() {
            panel.hidden = true;
            toggle.setAttribute("aria-pressed", "false");
            if (controller) {
                controller.abort();
                controller = null;
            }
            input.value = "";
            clearResults();
            status.textContent = "";
        }

        toggle.setAttribute("aria-pressed", "false");
        toggle.addEventListener("click", openPanel);
        close.addEventListener("click", closePanel);
        input.addEventListener("input", scheduleSearch);
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            window.clearTimeout(timer);
            search();
        });
        results.addEventListener("click", async function (event) {
            var button = event.target.closest(".chat-search-result");
            if (!button || !results.contains(button)) {
                return;
            }
            var messageId = Number(button.dataset.messageId || 0);
            if (typeof window.resursmapRevealChatMessage !== "function") {
                return;
            }
            button.disabled = true;
            var found = await window.resursmapRevealChatMessage(messageId);
            button.disabled = false;
            if (found) {
                closePanel();
            }
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && !panel.hidden) {
                closePanel();
                toggle.focus();
            }
        });
    });
})();
