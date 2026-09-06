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

    function isTelegramBrowser() {
        return /telegram/i.test(navigator.userAgent);
    }

    function assetVersion() {
        var meta = document.querySelector('meta[name="resursmap-asset-version"]');
        return meta && meta.content ? meta.content : "";
    }

    function registerServiceWorker() {
        if (!("serviceWorker" in navigator)) {
            return;
        }
        window.addEventListener("load", function () {
            navigator.serviceWorker.register(
                "/static/resursmap-sw.js?v=" + assetVersion(),
                { scope: "/" }
            ).catch(function () {});
        }, { once: true });
    }

    async function promptInstall() {
        if (isStandaloneMode()) {
            return;
        }
        if (isIOSDevice()) {
            window.alert(
                "На iPhone:\n\n" +
                "1. Safari → Поделиться.\n" +
                "2. «На экран Домой».\n" +
                "3. «Добавить»."
            );
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
        if (isTelegramBrowser()) {
            window.alert("Откройте в Chrome, затем снова нажмите «Скачать приложение».");
            return;
        }
        window.alert("Меню браузера ⋮ → «Установить приложение» или «Добавить на главный экран».");
    }

    registerServiceWorker();

    window.addEventListener("beforeinstallprompt", function (event) {
        event.preventDefault();
        deferredPrompt = event;
    });

    window.addEventListener("appinstalled", function () {
        deferredPrompt = null;
        document.querySelectorAll("#resursmap-install-pwa").forEach(function (button) {
            button.textContent = "Уже скачано";
            button.disabled = true;
        });
        var panel = document.getElementById("resursmap-install-panel");
        if (panel) {
            panel.hidden = true;
        }
    });

    ready(function () {
        var button = document.getElementById("resursmap-install-pwa");
        var panel = document.getElementById("resursmap-install-panel");

        if (isStandaloneMode()) {
            if (button) {
                button.hidden = true;
            }
            if (panel) {
                panel.hidden = true;
            }
            return;
        }

        if (!button) {
            return;
        }

        button.addEventListener("click", function () {
            promptInstall();
        });
    });
})();
