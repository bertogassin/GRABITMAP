// Переключатель темы GRABIT — чёрно-белая тема с data-theme на :root.
// По умолчанию следует prefers-color-scheme; явный выбор пользователя
// хранится в localStorage и всегда побеждает системную настройку.
(function() {
    var STORAGE_KEY = "resursmap-theme";

    function themeColorMeta() {
        return document.querySelector('meta[name="theme-color"]');
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

    function storedTheme() {
        try {
            var value = localStorage.getItem(STORAGE_KEY);
            return value === "light" || value === "dark" ? value : null;
        } catch (e) {
            return null;
        }
    }

    function systemPrefersLight() {
        return Boolean(window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches);
    }

    function effectiveTheme() {
        return storedTheme() || (systemPrefersLight() ? "light" : "dark");
    }

    function setButtonLabels(isLight) {
        var label = isLight
            ? t("menu_theme_light", "Сейчас светлая")
            : t("menu_theme_dark", "Сейчас тёмная");
        var labels = document.querySelectorAll(".theme-toggle-label");
        for (var i = 0; i < labels.length; i++) {
            labels[i].textContent = label;
        }
    }

    function applyTheme(theme) {
        var isLight = theme === "light";
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.style.colorScheme = theme;

        var meta = themeColorMeta();
        if (meta) {
            meta.setAttribute("content", isLight ? "#ffffff" : "#000000");
        }

        setButtonLabels(isLight);
    }

    applyTheme(effectiveTheme());

    document.addEventListener("click", function(event) {
        var btn = event.target.closest(".theme-toggle-btn");
        if (!btn) return;

        event.preventDefault();

        var next = effectiveTheme() === "light" ? "dark" : "light";

        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch (e) {}

        applyTheme(next);
    });

    document.addEventListener("DOMContentLoaded", function() {
        applyTheme(effectiveTheme());
    });
})();
