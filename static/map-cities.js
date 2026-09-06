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

    function escapeHtml(value) {
        return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    function cityCard(item) {
        var link = document.createElement("a");
        link.className = "card";
        link.href = item.href;
        link.innerHTML =
            '<div class="card-icon"><svg class="icon" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg></div><div class="card-content"><div class="card-title">' +
            escapeHtml(item.name) +
            '</div><div class="card-meta">' +
            escapeHtml(t("map_city_label", "Город")) +
            '</div></div><div class="card-arrow">›</div>';
        return link;
    }

    async function requestCities(countryId, query, offset) {
        var url = "/api/map/countries/" + encodeURIComponent(countryId) + "/cities?offset=" + encodeURIComponent(String(offset || 0)) + "&q=" + encodeURIComponent(query || "");
        var response = await fetch(url, { headers: { Accept: "application/json" } });
        var data = await response.json();
        if (!response.ok || !data.ok || !Array.isArray(data.items)) throw new Error("load_failed");
        return data;
    }

    document.addEventListener("DOMContentLoaded", function () {
        var input = document.getElementById("rm-map-city-search");
        var clear = document.getElementById("rm-map-city-clear");
        var grid = document.getElementById("rm-map-city-grid");
        var button = document.getElementById("rm-map-more");
        var status = document.getElementById("rm-map-city-status");
        if (!input || !grid || !status) return;
        var countryId = input.dataset.countryId;
        var timer = 0;
        var requestId = 0;
        var moreLabel = button
            ? (button.textContent || t("map_more_cities", "Показать следующие города")).trim()
            : t("map_more_cities", "Показать следующие города");

        function render(data, append) {
            if (!append) grid.replaceChildren();
            data.items.forEach(function (item) { grid.appendChild(cityCard(item)); });
            if (button) {
                button.dataset.offset = String(data.next_offset || 0);
                button.hidden = !data.has_more;
                button.disabled = false;
                button.textContent = moreLabel;
            }
            status.textContent = data.items.length
                ? ""
                : t("map_city_not_found", "Город не найден в этой стране");
        }

        async function refresh(append) {
            var current = ++requestId;
            var query = input.value.trim();
            var offset = append && button ? Number(button.dataset.offset || 0) : 0;
            if (button) button.disabled = true;
            status.textContent = "";
            try {
                var data = await requestCities(countryId, query, offset);
                if (current === requestId) render(data, append);
            } catch (_) {
                if (current !== requestId) return;
                status.textContent = t(
                    "map_cities_load_error",
                    "Не удалось загрузить города. Попробуйте ещё раз."
                );
                if (button) button.disabled = false;
            }
        }

        input.addEventListener("input", function () {
            window.clearTimeout(timer);
            timer = window.setTimeout(function () { refresh(false); }, 90);
        });
        if (clear) clear.addEventListener("click", function () { input.value = ""; input.focus(); refresh(false); });
        if (button) button.addEventListener("click", function () { refresh(true); });
        if (!input.value.trim()) {
            status.textContent = "";
        }
    }, { once: true });
})();
