(function () {
    "use strict";

    function ready(callback) {
        if (document.readyState === "loading") {
            document.addEventListener(
                "DOMContentLoaded",
                callback,
                { once: true }
            );
        } else {
            callback();
        }
    }

    function confirmBlockUser() {
        return new Promise(function (resolve) {
            var overlay = document.createElement("div");
            overlay.className = "chat-confirm-overlay";
            overlay.innerHTML =
                '<button type="button" class="chat-confirm-backdrop" aria-label="Отмена"></button>' +
                '<section class="chat-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="chat-confirm-title">' +
                    '<h2 id="chat-confirm-title">Заблокировать пользователя?</h2>' +
                    '<p>Он больше не сможет отправлять вам сообщения. Старый диалог сохранится.</p>' +
                    '<div class="chat-confirm-actions">' +
                        '<button type="button" data-confirm-cancel>Отмена</button>' +
                        '<button type="button" class="is-danger" data-confirm-accept>Заблокировать</button>' +
                    '</div>' +
                '</section>';

            function finish(accepted) {
                document.removeEventListener("keydown", onKeyDown);
                overlay.remove();
                resolve(accepted);
            }

            function onKeyDown(event) {
                if (event.key === "Escape") {
                    finish(false);
                }
            }

            overlay.querySelector(".chat-confirm-backdrop").addEventListener("click", function () {
                finish(false);
            });
            overlay.querySelector("[data-confirm-cancel]").addEventListener("click", function () {
                finish(false);
            });
            overlay.querySelector("[data-confirm-accept]").addEventListener("click", function () {
                finish(true);
            });
            document.addEventListener("keydown", onKeyDown);
            document.body.appendChild(overlay);
            overlay.querySelector("[data-confirm-cancel]").focus();
        });
    }

    ready(function () {
        var history =
            document.getElementById("chat-messages");
        var form =
            document.getElementById("chat-form");
        var input =
            document.getElementById("chat-input");
        var send =
            document.getElementById("chat-send");
        var toggle =
            document.getElementById("chat-block-toggle");
        var sendState =
            document.getElementById("chat-send-state");

        if (!history || !form || !input || !send || !toggle) {
            return;
        }

        var otherPublicId = String(
            history.dataset.otherPublicId || ""
        ).trim();
        var otherUserRoute = otherPublicId;

        if (
            !otherUserRoute ||
            !/^[A-Za-z0-9_-]{1,64}$/.test(otherUserRoute)
        ) {
            return;
        }

        var state = {
            blocked: false,
            blockedByMe: false,
            busy: false,
            error: ""
        };

        function applyState() {
            form.classList.toggle(
                "is-chat-blocked",
                state.blocked
            );

            input.disabled = state.blocked;
            send.disabled = state.blocked;
            var imageBtn = document.getElementById("chat-image-btn");
            var voiceBtn = document.getElementById("chat-voice-btn");
            if (imageBtn) {
                imageBtn.disabled = state.blocked;
            }
            if (voiceBtn) {
                voiceBtn.disabled = state.blocked;
            }

            toggle.hidden = false;
            toggle.disabled = state.busy;

            var toggleLabel = toggle.querySelector(
                ".chat-header-menu-label"
            );
            if (state.blockedByMe) {
                if (toggleLabel) {
                    toggleLabel.textContent = "Разблокировать";
                }
                toggle.classList.add("is-unblock");
            } else {
                if (toggleLabel) {
                    toggleLabel.textContent = "Заблокировать";
                }
                toggle.classList.remove("is-unblock");
            }

            if (sendState) {
                sendState.textContent = state.error || (state.blocked
                    ? "Обмен сообщениями недоступен"
                    : "Enter — отправить · Shift+Enter — новая строка");
                sendState.classList.toggle("is-error", Boolean(state.error));
            }
        }

        async function request(url, method) {
            var response = await fetch(url, {
                method: method || "GET",
                headers: {
                    "Accept": "application/json"
                },
                credentials: "same-origin"
            });

            var data = await response.json().catch(function () {
                return {
                    ok: false,
                    error: "invalid_response"
                };
            });

            if (!response.ok || !data.ok) {
                throw new Error(
                    data.error || "request_failed"
                );
            }

            return data;
        }

        async function refresh() {
            try {
                var data = await request(
                    "/api/chat/" +
                    encodeURIComponent(otherUserRoute) +
                    "/block"
                );

                state.blocked = Boolean(data.blocked);
                state.blockedByMe =
                    Boolean(data.blocked_by_me);

                applyState();
            } catch (_) {
                // Серверная и SQLite-защита продолжают работать.
            }
        }

        toggle.addEventListener("click", async function () {
            if (state.busy) {
                return;
            }

            if (!state.blockedByMe) {
                var confirmed = await confirmBlockUser();

                if (!confirmed) {
                    return;
                }
            }

            state.busy = true;
            applyState();

            try {
                state.error = "";
                var endpoint = state.blockedByMe
                    ? "/api/chat/" +
                        encodeURIComponent(otherUserRoute) +
                        "/unblock"
                    : "/api/chat/" +
                        encodeURIComponent(otherUserRoute) +
                        "/block";

                var data = await request(
                    endpoint,
                    "POST"
                );

                state.blocked = Boolean(data.blocked);
                state.blockedByMe =
                    Boolean(data.blocked_by_me);
            } catch (_) {
                state.error = "Не удалось изменить блокировку. Попробуйте ещё раз.";
                window.setTimeout(function () {
                    if (state.error) {
                        state.error = "";
                        applyState();
                    }
                }, 4000);
            }

            state.busy = false;
            applyState();
        });

        document.addEventListener("resursmap:chat-block-update", function () {
            refresh();
        });

        refresh();
    });
})();
