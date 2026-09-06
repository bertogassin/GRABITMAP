(function () {
    "use strict";

    function t(key, fallback, params) {
        if (window.m && typeof window.m[key] === "function") {
            try {
                return window.m[key](params || {});
            } catch (_) {}
        }
        if (typeof window.rmT === "function") {
            var translated = window.rmT(key, params);
            if (translated && translated !== key) return translated;
        }
        if (!params) return fallback;
        return String(fallback).replace(/\{(\w+)\}/g, function (_, name) {
            return params[name] != null ? String(params[name]) : "";
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        var input = document.getElementById("rm-map-country-search");
        var clear = document.getElementById("rm-map-country-clear");
        var grid = document.getElementById("rm-map-country-grid");
        var status = document.getElementById("rm-map-country-status");
        if (!input || !grid || !status) return;

        function cards() {
            return Array.prototype.slice.call(grid.querySelectorAll("a.card"));
        }

        function titleOf(card) {
            var title = card.querySelector(".card-title");
            return title ? title.textContent.trim().toLowerCase() : "";
        }

        function refresh() {
            var query = input.value.trim().toLowerCase();
            var shown = 0;
            cards().forEach(function (card) {
                var match = !query || titleOf(card).indexOf(query) !== -1;
                card.hidden = !match;
                if (match) shown += 1;
            });
            if (!query) {
                status.textContent = "";
            } else if (shown) {
                status.textContent = t("map_found_n", "Найдено: {n}", { n: shown });
            } else {
                status.textContent = t(
                    "map_country_not_found",
                    "Страна не найдена на этом континенте"
                );
            }
        }

        input.addEventListener("input", refresh);
        if (clear) {
            clear.addEventListener("click", function () {
                input.value = "";
                input.focus();
                refresh();
            });
        }
        refresh();
    }, { once: true });
})();
