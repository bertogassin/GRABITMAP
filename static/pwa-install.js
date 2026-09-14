(function () {
    "use strict";

    var deferredPrompt = null;

    function ready(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback, { once: true });
        } else {
            callback();
        }
    }

    function isStandaloneMode() {
        return (
            window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone === true
        );
    }

    function isIOSDevice() {
        return /iphone|ipad|ipod/i.test(navigator.userAgent);
    }

    function assetVersion() {
        var meta = document.querySelector('meta[name="resursmap-asset-version"]');
        return meta && meta.content ? meta.content : "";
    }

    function showManualInstallHint() {
        var message = isIOSDevice()
            ? "Safari → Поделиться → На экран Домой"
            : "Откройте меню браузера ⋮ и выберите «Установить приложение»";
        var hint = document.getElementById("resursmap-install-hint");
        if (hint) {
            hint.textContent = message;
            hint.setAttribute("role", "status");
        }

        document.querySelectorAll("[data-resursmap-install-pwa]").forEach(function (button) {
            button.textContent = "Как установить";
            button.disabled = false;
            var localHint = button.parentElement &&
                button.parentElement.querySelector("[data-resursmap-install-help]");
            if (!hint && !localHint && button.parentElement) {
                localHint = document.createElement("p");
                localHint.dataset.resursmapInstallHelp = "1";
                localHint.className = "card-meta rm-pwa-hint";
                localHint.setAttribute("role", "status");
                button.insertAdjacentElement("afterend", localHint);
            }
            if (localHint) {
                localHint.textContent = message;
            }
        });
    }

    function registerServiceWorker() {
        if (!("serviceWorker" in navigator)) {
            return;
        }
        window.addEventListener("load", function () {
            navigator.serviceWorker.register(
                "/static/resursmap-sw.js?v=" + assetVersion(),
                { scope: "/" }
            ).then(function (registration) {
                if (!registration.periodicSync) {
                    return;
                }
                return registration.periodicSync.register("grabit-nudge", {
                    minInterval: 12 * 60 * 60 * 1000
                });
            }).catch(function () {});
        }, { once: true });
    }

    async function promptInstall() {
        if (isStandaloneMode()) {
            return;
        }
        if (isIOSDevice()) {
            showManualInstallHint();
            return;
        }
        if (deferredPrompt) {
            try {
                await deferredPrompt.prompt();
                await deferredPrompt.userChoice;
            } finally {
                deferredPrompt = null;
            }
            return;
        }
        showManualInstallHint();
    }

    registerServiceWorker();

    window.addEventListener("beforeinstallprompt", function (event) {
        event.preventDefault();
        deferredPrompt = event;
    });

    window.addEventListener("appinstalled", function () {
        deferredPrompt = null;
        document.querySelectorAll("[data-resursmap-install-pwa]").forEach(function (button) {
            button.textContent = "Уже скачано";
            button.disabled = true;
        });
        var panel = document.getElementById("resursmap-install-panel");
        if (panel) {
            panel.hidden = true;
        }
    });

    ready(function () {
        var buttons = document.querySelectorAll("[data-resursmap-install-pwa]");
        var panel = document.getElementById("resursmap-install-panel");

        if (isStandaloneMode()) {
            buttons.forEach(function (button) {
                button.hidden = true;
            });
            if (panel) {
                panel.hidden = true;
            }
            return;
        }

        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                promptInstall();
            });
        });
    });
})();
