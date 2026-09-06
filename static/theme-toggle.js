// Переключатель темы ResursMap — работает в любом месте
(function() {
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

    function setButtonLabels(isLight) {
        var label = isLight
            ? t("menu_theme_light", "Сейчас светлая")
            : t("menu_theme_dark", "Сейчас тёмная");
        var labels = document.querySelectorAll(".theme-toggle-label");
        for (var i = 0; i < labels.length; i++) {
            labels[i].textContent = label;
        }
    }

    function applyTheme(isLight) {
        document.documentElement.classList.toggle("light-theme", isLight);
        document.body.classList.toggle("light-theme", isLight);
        document.documentElement.style.colorScheme = isLight ? "light" : "dark";

        var meta = themeColorMeta();
        if (meta) {
            meta.setAttribute("content", isLight ? "#f4f1ea" : "#080a0d");
        }

        setButtonLabels(isLight);
    }

    function savedIsLight() {
        try {
            return localStorage.getItem("resursmap-theme") === "light";
        } catch (e) {
            return false;
        }
    }

    applyTheme(savedIsLight());

    document.addEventListener("click", function(event) {
        var btn = event.target.closest(".theme-toggle-btn");
        if (!btn) return;

        event.preventDefault();

        var isLight = !document.body.classList.contains("light-theme");

        try {
            localStorage.setItem("resursmap-theme", isLight ? "light" : "dark");
        } catch (e) {}

        applyTheme(isLight);
    });

    document.addEventListener("DOMContentLoaded", function() {
        applyTheme(savedIsLight());
    });
})();
