(function () {
    "use strict";

    function ready(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback, { once: true });
        } else {
            callback();
        }
    }

    function t(key, fallback) {
        if (typeof window.rmT === "function") {
            var value = window.rmT(key);
            if (value && value !== key) {
                return value;
            }
        }
        return fallback;
    }

    function updateSoundToggle(button) {
        var enabled =
            typeof window.chatSoundsAreEnabled === "function"
                ? window.chatSoundsAreEnabled()
                : true;

        var state = button.querySelector(".rm-menu-row-state");
        if (state) {
            state.textContent = enabled
                ? t("menu_sound_on", "Включён")
                : t("menu_sound_off", "Выключен");
        } else {
            button.textContent = enabled
                ? t("menu_sound_on", "Звук включён")
                : t("menu_sound_off", "Звук выключен");
        }
        button.setAttribute("aria-pressed", enabled ? "true" : "false");
        button.classList.toggle("is-off", !enabled);
    }

    function updateHapticsToggle(button) {
        var enabled =
            typeof window.chatHapticsAreEnabled === "function"
                ? window.chatHapticsAreEnabled()
                : true;

        var state = button.querySelector(".rm-menu-row-state");
        if (state) {
            state.textContent = enabled
                ? t("menu_haptics_on", "Включена")
                : t("menu_haptics_off", "Выключена");
        } else {
            button.textContent = enabled
                ? t("menu_haptics_on", "Вибрация включена")
                : t("menu_haptics_off", "Вибрация выключена");
        }
        button.setAttribute("aria-pressed", enabled ? "true" : "false");
        button.classList.toggle("is-off", !enabled);
    }

    ready(function () {
        var soundToggle = document.getElementById("rm-menu-sound-toggle");
        var hapticsToggle = document.getElementById("rm-menu-haptics-toggle");
        var soundTest = document.querySelector(".rm-settings-sound-btn");

        if (soundToggle) {
            updateSoundToggle(soundToggle);

            soundToggle.addEventListener("click", function () {
                var next = !(
                    typeof window.chatSoundsAreEnabled === "function" &&
                    window.chatSoundsAreEnabled()
                );

                if (typeof window.setChatSoundsEnabled === "function") {
                    window.setChatSoundsEnabled(next);
                }

                updateSoundToggle(soundToggle);

                if (next && typeof window.playAppNotification === "function") {
                    window.playAppNotification();
                }
            });
        }

        if (hapticsToggle) {
            updateHapticsToggle(hapticsToggle);

            hapticsToggle.addEventListener("click", function () {
                var next = !(
                    typeof window.chatHapticsAreEnabled === "function" &&
                    window.chatHapticsAreEnabled()
                );

                if (typeof window.setChatHapticsEnabled === "function") {
                    window.setChatHapticsEnabled(next);
                }

                updateHapticsToggle(hapticsToggle);

                if (next && typeof window.chatHaptic === "function") {
                    window.chatHaptic("send");
                }
            });
        }

        if (soundTest) {
            soundTest.addEventListener("click", function () {
                if (typeof window.playAppNotification === "function") {
                    window.playAppNotification();
                } else if (typeof window.playNotificationSound === "function") {
                    window.playNotificationSound();
                }
            });
        }
    });
})();
