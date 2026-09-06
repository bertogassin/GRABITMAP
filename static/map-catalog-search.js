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
    function normalize(value) { return String(value || "").trim().toLocaleLowerCase(); }
    function escapeHtml(value) { return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); }
    function filterCards(grid, query) {
        if (!grid) return 0;
        var visible = 0;
        grid.querySelectorAll(".card").forEach(function (card) {
            var show = !query || normalize(card.textContent).includes(query);
            card.hidden = !show;
            if (show) visible += 1;
        });
        return visible;
    }

    document.addEventListener("DOMContentLoaded", function () {
        var input = document.getElementById("rm-city-catalog-search");
        var clear = document.getElementById("rm-city-catalog-clear");
        var categories = document.getElementById("rm-city-category-grid");
        var sectors = document.getElementById("rm-city-sector-grid");
        var results = document.getElementById("rm-city-profession-results");
        var status = document.getElementById("rm-city-catalog-status");
        if (!input || !results || !status) return;
        var cityId = input.dataset.cityId;
        var timer = 0;
        var requestId = 0;
        var locale = (document.documentElement.lang || "ru").trim() || "ru";

        async function refresh() {
            var query = normalize(input.value);
            var current = ++requestId;
            results.replaceChildren();
            var localCount = filterCards(categories, query) + filterCards(sectors, query);
            if (!query) {
                status.textContent = t(
                    "map_catalog_hint",
                    "Выберите раздел ниже или начните вводить"
                );
                return;
            }
            status.textContent = t(
                "map_catalog_searching",
                "Ищем в каталоге профессий и услуг…"
            );
            try {
                var response = await fetch("/api/professions/suggest?q=" + encodeURIComponent(query) + "&limit=200", { headers: { Accept: "application/json" } });
                var data = await response.json();
                if (current !== requestId) return;
                if (!response.ok || !data.ok || !Array.isArray(data.items)) throw new Error("catalog_failed");
                data.items.slice().sort(function (a, b) {
                    return String(a.name).localeCompare(String(b.name), locale);
                }).forEach(function (item) {
                    var link = document.createElement("a");
                    link.className = "card";
                    link.href = "/app/search?city_id=" + encodeURIComponent(cityId) + "&q=" + encodeURIComponent(item.name);
                    link.innerHTML = '<div class="card-icon">⌕</div><div class="card-content"><div class="card-title">' + escapeHtml(item.name) + '</div><div class="card-meta">' + escapeHtml(item.sector || t("map_profession_label", "Профессия")) + '</div></div><div class="card-arrow">›</div>';
                    results.appendChild(link);
                });
                var total = localCount + data.items.length;
                status.textContent = total
                    ? t("map_catalog_found", "Найдено в полном каталоге: {n}", { n: total })
                    : t("map_catalog_none", "В каталоге такого направления пока нет");
            } catch (_) {
                if (current === requestId) {
                    status.textContent = t(
                        "map_catalog_error",
                        "Не удалось открыть каталог. Попробуйте ещё раз."
                    );
                }
            }
        }

        input.addEventListener("input", function () { window.clearTimeout(timer); timer = window.setTimeout(refresh, 90); });
        if (clear) clear.addEventListener("click", function () { input.value = ""; input.focus(); refresh(); });
        refresh();
    }, { once: true });
})();
