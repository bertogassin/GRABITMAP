(function () {
    "use strict";

    var DISMISS_KEY = "grabit-pwa-dismissed-until-v1";
    var VISIT_KEY = "grabit-pwa-app-visits-v1";
    var DISMISS_MS = 30 * 24 * 60 * 60 * 1000;
    var deferredPrompt = null;
    var installPrompt = null;
    var installPromptAction = null;
    var installPromptCopy = null;
    var engagementReady = false;
    var timeReady = false;

    function ready(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback, { once: true });
        } else {
            callback();
        }
    }

    function t(key) {
        if (typeof window.rmT === "function") {
            return window.rmT(key);
        }
        return key;
    }

    function isStandaloneMode() {
        return (
            window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone === true
        );
    }

    function isIOSDevice() {
        return (
            /iphone|ipad|ipod/i.test(navigator.userAgent) ||
            (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
        );
    }

    function isMobileLike() {
        return window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;
    }

    function isAppPath() {
        return window.location.pathname === "/app" ||
            window.location.pathname.indexOf("/app/") === 0;
    }

    function assetVersion() {
        var meta = document.querySelector('meta[name="resursmap-asset-version"]');
        return meta && meta.content ? meta.content : "";
    }

    function readStoredNumber(key) {
        try {
            return Number(window.localStorage.getItem(key) || "0") || 0;
        } catch (_) {
            return 0;
        }
    }

    function storeNumber(key, value) {
        try {
            window.localStorage.setItem(key, String(value));
        } catch (_) {}
    }

    function isDismissed() {
        return readStoredNumber(DISMISS_KEY) > Date.now();
    }

    function dismissForLater() {
        storeNumber(DISMISS_KEY, Date.now() + DISMISS_MS);
        hideInstallPrompt();
    }

    function manualInstallMessage() {
        var steps = isIOSDevice() ? "Safari · ↗ · +" : "⋮ · +";
        return steps + " · " + t("menu_install_hint");
    }

    function createInstallPrompt() {
        if (installPrompt || !document.body) {
            return;
        }

        var root = document.createElement("aside");
        root.id = "grabit-install-prompt";
        root.className = "rm-pwa-prompt";
        root.hidden = true;
        root.setAttribute("role", "dialog");
        root.setAttribute("aria-labelledby", "grabit-install-prompt-title");

        var icon = document.createElement("img");
        icon.className = "rm-pwa-prompt-icon";
        icon.src = "/static/app-icon-192.png";
        icon.alt = "";
        icon.width = 52;
        icon.height = 52;

        var copy = document.createElement("div");
        copy.className = "rm-pwa-prompt-copy";

        var title = document.createElement("strong");
        title.id = "grabit-install-prompt-title";
        title.className = "rm-pwa-prompt-title";
        title.textContent = t("map_download_app");

        var description = document.createElement("span");
        description.className = "rm-pwa-prompt-description";
        description.textContent = t("menu_install_hint");
        copy.append(title, description);

        var close = document.createElement("button");
        close.type = "button";
        close.className = "rm-pwa-prompt-close";
        close.textContent = "×";
        close.setAttribute("aria-label", t("chat_close"));
        close.addEventListener("click", dismissForLater);

        var heading = document.createElement("div");
        heading.className = "rm-pwa-prompt-heading";
        heading.append(icon, copy, close);

        var action = document.createElement("button");
        action.type = "button";
        action.className = "ui-button rm-pwa-prompt-action";
        action.textContent = t("menu_download");
        action.addEventListener("click", function () {
            promptInstall();
        });

        root.append(heading, action);
        document.body.appendChild(root);
        installPrompt = root;
        installPromptAction = action;
        installPromptCopy = description;
    }

    function hideInstallPrompt() {
        if (installPrompt) {
            installPrompt.hidden = true;
        }
    }

    function showManualInstallHint() {
        var message = manualInstallMessage();
        var hint = document.getElementById("resursmap-install-hint");
        if (hint) {
            hint.textContent = message;
            hint.setAttribute("role", "status");
        }

        document.querySelectorAll("[data-resursmap-install-pwa]").forEach(function (button) {
            button.textContent = t("menu_install_hint");
            button.disabled = true;
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

        createInstallPrompt();
        if (installPromptCopy) {
            installPromptCopy.textContent = message;
        }
        if (installPromptAction) {
            installPromptAction.hidden = true;
        }
        if (installPrompt) {
            installPrompt.hidden = false;
        }
    }

    function canShowInstallPrompt() {
        return (
            isAppPath() &&
            isMobileLike() &&
            !isStandaloneMode() &&
            !isDismissed() &&
            engagementReady &&
            timeReady &&
            (isIOSDevice() || deferredPrompt !== null)
        );
    }

    function maybeShowInstallPrompt() {
        if (!canShowInstallPrompt()) {
            return;
        }
        createInstallPrompt();
        if (installPromptAction) {
            installPromptAction.hidden = false;
        }
        if (installPromptCopy) {
            installPromptCopy.textContent = t("menu_install_hint");
        }
        if (installPrompt) {
            installPrompt.hidden = false;
        }
    }

    function armRespectfulPrompt() {
        var visits = Math.min(readStoredNumber(VISIT_KEY) + 1, 20);
        storeNumber(VISIT_KEY, visits);
        engagementReady = visits >= 2;

        document.addEventListener("pointerup", function () {
            engagementReady = true;
            maybeShowInstallPrompt();
        }, { once: true, passive: true });

        window.setTimeout(function () {
            timeReady = true;
            maybeShowInstallPrompt();
        }, 4500);
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
            hideInstallPrompt();
            return;
        }
        if (isIOSDevice()) {
            showManualInstallHint();
            return;
        }
        if (!deferredPrompt) {
            showManualInstallHint();
            return;
        }

        var activePrompt = deferredPrompt;
        deferredPrompt = null;
        try {
            await activePrompt.prompt();
            var choice = await activePrompt.userChoice;
            if (choice && choice.outcome === "dismissed") {
                dismissForLater();
            } else {
                hideInstallPrompt();
            }
        } catch (_) {
            showManualInstallHint();
        }
    }

    registerServiceWorker();

    window.addEventListener("beforeinstallprompt", function (event) {
        event.preventDefault();
        deferredPrompt = event;
        maybeShowInstallPrompt();
    });

    window.addEventListener("appinstalled", function () {
        deferredPrompt = null;
        hideInstallPrompt();
        document.querySelectorAll("[data-resursmap-install-pwa]").forEach(function (button) {
            button.textContent = t("pwa_installed");
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
            button.addEventListener("click", promptInstall);
        });

        createInstallPrompt();
        armRespectfulPrompt();
    });
})();
