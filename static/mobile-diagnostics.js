(function () {
    "use strict";

    var params = new URLSearchParams(window.location.search);
    if (params.has("diagnostic")) {
        try { sessionStorage.setItem("grabit-mobile-diagnostic", "1"); } catch (_) {}
    }
    var active = params.has("diagnostic");
    try { active = active || sessionStorage.getItem("grabit-mobile-diagnostic") === "1"; } catch (_) {}
    if (!active) return;

    var runtimeErrors = [];
    window.addEventListener("error", function (event) {
        runtimeErrors.push("JS: " + (event.message || "unknown") +
            (event.filename ? " @ " + event.filename.split("/").pop() + ":" + event.lineno : ""));
    });
    window.addEventListener("unhandledrejection", function (event) {
        var reason = event.reason;
        runtimeErrors.push("Promise: " + (reason && reason.message ? reason.message : String(reason || "unknown")));
    });

    function add(list, name, ok, detail) {
        var line = document.createElement("li");
        line.textContent = (ok ? "✅ " : "❌ ") + name + ": " + detail;
        line.style.color = ok ? "#b9f6ca" : "#ffb4ab";
        list.appendChild(line);
    }

    async function responseStatus(url) {
        try {
            var response = await fetch(url, {
                credentials: "same-origin",
                cache: "no-store",
                headers: { "Accept": "application/json" }
            });
            var data = await response.json().catch(function () { return null; });
            return { ok: response.ok, detail: "HTTP " + response.status +
                (data && data.error ? " · " + data.error : "") };
        } catch (error) {
            return { ok: false, detail: error && error.message ? error.message : "network_error" };
        }
    }

    function localDate() {
        var now = new Date();
        return now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") +
            "-" + String(now.getDate()).padStart(2, "0");
    }

    function motionProbe() {
        return new Promise(async function (resolve) {
            var count = 0;
            function onMotion() { count += 1; }
            try {
                if (typeof DeviceMotionEvent !== "undefined" &&
                    typeof DeviceMotionEvent.requestPermission === "function") {
                    var permission = await DeviceMotionEvent.requestPermission();
                    if (permission !== "granted") {
                        resolve({ ok: false, detail: "permission=" + permission });
                        return;
                    }
                }
                window.addEventListener("devicemotion", onMotion, { passive: true });
                window.setTimeout(function () {
                    window.removeEventListener("devicemotion", onMotion);
                    resolve({ ok: count > 0, detail: count + " событий за 3 сек." });
                }, 3000);
            } catch (error) {
                resolve({ ok: false, detail: error && error.name ? error.name : "motion_error" });
            }
        });
    }

    async function microphoneProbe() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            return { ok: false, detail: "getUserMedia отсутствует" };
        }
        try {
            var stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(function (track) { track.stop(); });
            return { ok: true, detail: "доступ получен" };
        } catch (error) {
            return { ok: false, detail: error && error.name ? error.name : "microphone_error" };
        }
    }

    function render() {
        var panel = document.createElement("section");
        panel.id = "grabit-mobile-diagnostics";
        panel.style.cssText = "position:fixed;z-index:2147483647;left:10px;right:10px;bottom:10px;max-height:72vh;overflow:auto;background:#101722;color:#fff;border:1px solid #62748a;border-radius:16px;padding:14px;font:14px/1.45 system-ui;box-shadow:0 12px 40px #000b";
        panel.innerHTML = '<strong style="font-size:16px">Диагностика GRABIT</strong>' +
            '<p style="margin:6px 0 10px">Нажмите кнопку и разрешите микрофон.</p>' +
            '<button type="button" data-run style="padding:10px 14px;border:0;border-radius:10px;font-weight:700">Проверить телефон</button> ' +
            '<button type="button" data-close style="padding:10px 14px;border:0;border-radius:10px">Закрыть</button>' +
            '<ol data-results style="padding-left:22px;margin:12px 0 0"></ol>';
        document.body.appendChild(panel);

        panel.querySelector("[data-close]").addEventListener("click", function () {
            try { sessionStorage.removeItem("grabit-mobile-diagnostic"); } catch (_) {}
            panel.remove();
        });
        panel.querySelector("[data-run]").addEventListener("click", async function (event) {
            event.currentTarget.disabled = true;
            var list = panel.querySelector("[data-results]");
            list.innerHTML = "";
            var version = document.querySelector('meta[name="resursmap-asset-version"]');
            add(list, "Версия", !!version, version ? version.content : "не найдена");
            add(list, "HTTPS", window.isSecureContext, window.isSecureContext ? "да" : "нет");
            add(list, "JavaScript", runtimeErrors.length === 0,
                runtimeErrors.length ? runtimeErrors.join(" | ") : "ошибок запуска нет");
            var session = await responseStatus("/api/steps?today=" + encodeURIComponent(localDate()));
            add(list, "Сессия/API", session.ok, session.detail);
            var form = document.getElementById("chat-form");
            add(list, "Страница чата", !!form, form ? "форма найдена" : "откройте конкретный диалог");
            if (form) {
                add(list, "Ядро чата", form.dataset.chatCoreReady === "1",
                    "chatCoreReady=" + (form.dataset.chatCoreReady || "нет"));
                var history = document.getElementById("chat-messages");
                var other = history ? String(history.dataset.otherUserId || "") : "";
                var group = history ? String(history.dataset.groupId || "") : "";
                var url = group ? "/api/group/" + group + "/messages?limit=1" :
                    (other ? "/api/chat/" + other + "/messages?limit=1&mark_read=0" : "");
                if (url) {
                    var chatApi = await responseStatus(url);
                    add(list, "API чата", chatApi.ok, chatApi.detail);
                }
            }
            var microphone = await microphoneProbe();
            add(list, "Микрофон", microphone.ok, microphone.detail);
            var motion = await motionProbe();
            add(list, "Датчик движения", motion.ok, motion.detail);
            event.currentTarget.disabled = false;
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", render, { once: true });
    } else {
        render();
    }
})();
