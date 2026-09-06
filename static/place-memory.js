(function () {
    "use strict";

    var CITY_KEY = "resursmap-last-city";
    var SEARCH_KEY = "resursmap-recent-searches";

    function ready(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback, { once: true });
        } else {
            callback();
        }
    }

    function cityNameFromPage(path) {
        if (
            !/^\/app\/map\/city\/\d+\/?$/.test(path) &&
            !/^\/app\/\d+\/\d+\/\d+\/?$/.test(path)
        ) {
            return "";
        }

        var hero = document.querySelector(".hero h1");
        return hero ? String(hero.textContent || "").trim() : "";
    }

    function cityFromPath(path) {
        var name = cityNameFromPage(path);
        var geo = String(path || "").match(/^\/app\/map\/city\/(\d+)(?:\/|$)/);
        if (geo) {
            return {
                cityId: Number(geo[1]),
                href: "/app/map/city/" + geo[1],
                addHref: "/app/add/city/" + geo[1],
                name: name,
            };
        }

        var match = String(path || "").match(/^\/app\/(\d+)\/(\d+)\/(\d+)(?:\/|$)/);
        if (!match) {
            return null;
        }

        return {
            ci: Number(match[1]),
            si: Number(match[2]),
            zi: Number(match[3]),
            href: "/app/" + match[1] + "/" + match[2] + "/" + match[3],
            addHref: "/app/add",
            name: name,
        };
    }

    function saveCity(city) {
        if (!city) {
            return;
        }

        var previous = loadCity();
        if (
            (!city.name || !String(city.name).trim()) &&
            previous &&
            previous.name &&
            ((city.cityId && previous.cityId === city.cityId) ||
                previous.href === city.href)
        ) {
            city.name = previous.name;
        }

        try {
            localStorage.setItem(CITY_KEY, JSON.stringify(city));
        } catch (e) {}

        if (
            Number.isInteger(city.ci) &&
            Number.isInteger(city.si) &&
            Number.isInteger(city.zi)
        ) {
            document.cookie =
                "rm_last_city=" +
                city.ci +
                "." +
                city.si +
                "." +
                city.zi +
                "; Path=/; Max-Age=31536000; SameSite=Lax";
        }
    }

    function loadCity() {
        try {
            return JSON.parse(localStorage.getItem(CITY_KEY) || "null");
        } catch (e) {
            return null;
        }
    }

    function loadSearches() {
        try {
            var rows = JSON.parse(localStorage.getItem(SEARCH_KEY) || "[]");
            return Array.isArray(rows) ? rows.slice(0, 6) : [];
        } catch (e) {
            return [];
        }
    }

    function saveSearch(entry) {
        if (!entry || (!entry.q && !entry.kind && !entry.rubric)) {
            return;
        }

        var rows = loadSearches().filter(function (row) {
            return row.href !== entry.href;
        });
        rows.unshift(entry);

        try {
            localStorage.setItem(SEARCH_KEY, JSON.stringify(rows.slice(0, 6)));
        } catch (e) {}
    }

    function renderRecent() {
        var host = document.getElementById("rm-recent-searches");
        if (!host) {
            return;
        }

        var rows = loadSearches();
        var city = loadCity();
        var html = "";

        if (city && city.href) {
            var cityLabel = (city.name && String(city.name).trim()) || "Последний город";
            html +=
                '<a class="rm-kind-chip" href="' +
                escapeHtml(city.href) +
                '">' +
                escapeHtml(cityLabel) +
                "</a>";
        }

        rows.forEach(function (row) {
            if (!row.href || !row.label) {
                return;
            }

            html +=
                '<a class="rm-kind-chip" href="' +
                row.href +
                '">' +
                row.label +
                "</a>";
        });

        host.innerHTML = html;
        host.hidden = !html;
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;");
    }

    function renderHomeLastCity() {
        var host = document.getElementById("rm-last-city-home");
        if (!host) {
            return;
        }

        var city = loadCity();
        if (!city || !city.href) {
            host.hidden = true;
            host.innerHTML = "";
            return;
        }

        var title = city.name ? String(city.name).trim() : "";
        host.innerHTML =
            '<a class="card" href="' +
            escapeHtml(city.href) +
            '">' +
            '<div class="card-icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-4.4 7-10.2A7 7 0 0 0 5 10.8C5 16.6 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.4"/></svg></div>' +
            '<div class="card-content">' +
            '<div class="card-title">' +
            escapeHtml(title || "Последний город") +
            "</div>" +
            '<div class="card-meta">Продолжить этот город</div>' +
            "</div>" +
            '<div class="card-arrow"><svg class="icon small-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></div>' +
            "</a>";
        host.hidden = false;
    }

    ready(function () {
        saveCity(cityFromPath(window.location.pathname));
        renderHomeLastCity();

        var params = new URLSearchParams(window.location.search || "");
        if (window.location.pathname === "/app/search") {
            var q = (params.get("q") || "").trim();
            var kind = (params.get("kind") || "").trim();
            var rubric = (params.get("rubric") || "").trim();
            var href = "/app/search" + (window.location.search || "");
            var label = q || rubric || kind;

            if (label) {
                saveSearch({
                    q: q,
                    kind: kind,
                    rubric: rubric,
                    href: href,
                    label: label,
                });
            }

            renderRecent();
        }

        var addLinks = document.querySelectorAll("[data-add-listing], a[href=\"/app/add\"]");
        var lastCity = loadCity();
        for (var i = 0; i < addLinks.length; i++) {
            addLinks[i].setAttribute(
                "href",
                lastCity && lastCity.addHref ? lastCity.addHref : "/app/add"
            );
        }
    });
})();
