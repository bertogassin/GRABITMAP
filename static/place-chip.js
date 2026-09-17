(function () {
    "use strict";

    var ACTIVE_KEY = "grabit-active-place";
    var RECENT_KEY = "grabit-recent-places";
    var GEO_DENIED_KEY = "grabit-geo-denied";
    var LEGACY_KEY = "resursmap-last-city";
    var searchTimer = 0;

    function ready(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn, { once: true });
        } else {
            fn();
        }
    }

    function t(key, vars) {
        if (typeof window.rmT === "function") {
            return window.rmT(key, vars);
        }
        var table = (window.resursmapI18n && window.resursmapI18n.messages) || {};
        var text = typeof table[key] === "string" ? table[key] : key;
        if (vars) {
            Object.keys(vars).forEach(function (name) {
                text = text.split("{" + name + "}").join(String(vars[name]));
            });
        }
        return text;
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "\u0026amp;")
            .replace(/</g, "\u0026lt;")
            .replace(/"/g, "\u0026quot;");
    }

    function read(storage, key, fallback) {
        try {
            var raw = storage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (e) {
            return fallback;
        }
    }

    function write(storage, key, value) {
        try {
            storage.setItem(key, JSON.stringify(value));
        } catch (e) {}
    }

    function worldPlace() {
        return { kind: "world", href: "/app", name: t("place_chip_world") };
    }

    function nearbyPlace() {
        return { kind: "nearby", href: "/app", name: t("place_chip_nearby") };
    }

    function fromPath(path) {
        path = String(path || "");
        var city = path.match(/^\/app\/map\/city\/(\d+)/);
        if (city) {
            return { kind: "city", cityId: Number(city[1]), href: "/app/map/city/" + city[1], name: "" };
        }
        var country = path.match(/^\/app\/map\/country\/(\d+)/);
        if (country) {
            return { kind: "country", countryId: Number(country[1]), href: "/app/map/country/" + country[1], name: "" };
        }
        var continent = path.match(/^\/app\/map\/continent\/(\d+)/);
        if (continent) {
            return { kind: "continent", href: "/app/map/continent/" + continent[1], name: "" };
        }
        var legacy = path.match(/^\/app\/(\d+)\/(\d+)\/(\d+)/);
        if (legacy) {
            return {
                kind: "city",
                href: "/app/" + legacy[1] + "/" + legacy[2] + "/" + legacy[3],
                name: ""
            };
        }
        return null;
    }

    function heroName() {
        var hero = document.querySelector(".hero h1");
        return hero ? String(hero.textContent || "").trim() : "";
    }

    function recents() {
        var rows = read(window.localStorage, RECENT_KEY, []);
        return Array.isArray(rows) ? rows.filter(function (row) { return row && row.href; }).slice(0, 6) : [];
    }

    function remember(place) {
        if (!place || !place.href || place.kind === "nearby") {
            return;
        }
        var rows = recents().filter(function (row) { return row.href !== place.href; });
        rows.unshift({ kind: place.kind, href: place.href, name: place.name || "", cityId: place.cityId });
        write(window.localStorage, RECENT_KEY, rows.slice(0, 6));
        if (place.kind !== "world") {
            write(window.localStorage, LEGACY_KEY, place);
        }
    }

    function active() {
        return read(window.sessionStorage, ACTIVE_KEY, null);
    }

    function setActive(place) {
        if (!place) {
            return;
        }
        write(window.sessionStorage, ACTIVE_KEY, place);
        remember(place);
        paintChip();
    }

    function resolve() {
        var urlPlace = fromPath(window.location.pathname);
        if (urlPlace) {
            urlPlace.name = heroName() || urlPlace.name;
            setActive(urlPlace);
            return urlPlace;
        }
        var params = new URLSearchParams(window.location.search || "");
        var cityId = Number(params.get("city_id") || "");
        if (cityId > 0) {
            var cityPlace = { kind: "city", cityId: cityId, href: "/app/map/city/" + cityId, name: "" };
            setActive(cityPlace);
            return cityPlace;
        }
        return active() || worldPlace();
    }

    function label(place) {
        if (!place) {
            return t("place_chip_choose");
        }
        if (place.kind === "world") {
            return t("place_chip_world");
        }
        if (place.kind === "nearby") {
            return t("place_chip_nearby");
        }
        return (place.name && String(place.name).trim()) || t("place_chip_choose");
    }

    function paintChip() {
        var node = document.getElementById("rm-place-chip-label");
        if (node) {
            node.textContent = label(resolve());
        }
    }

    function dialog() {
        return document.getElementById("rm-place-dialog");
    }

    function setStatus(text) {
        var node = document.getElementById("rm-place-status");
        if (!node) {
            return;
        }
        node.textContent = text || "";
        node.hidden = !text;
    }

    function closeDialog() {
        var box = dialog();
        if (box && box.open) {
            box.close();
        }
    }

    function onSearchPage() {
        return window.location.pathname === "/app/search";
    }

    function cityIdFromPlace(place) {
        if (!place) {
            return 0;
        }
        if (place.cityId) {
            return Number(place.cityId) || 0;
        }
        var match = String(place.href || "").match(/\/app\/map\/city\/(\d+)/);
        return match ? Number(match[1]) : 0;
    }

    function searchPageHref(place) {
        var params = new URLSearchParams(window.location.search);
        var cityId = cityIdFromPlace(place);
        if (place && place.kind === "city" && cityId > 0) {
            params.set("city_id", String(cityId));
        } else {
            params.delete("city_id");
        }
        var query = params.toString();
        return "/app/search" + (query ? "?" + query : "");
    }

    function selectPlace(place) {
        if (place && place.kind === "city") {
            var id = cityIdFromPlace(place);
            if (id > 0) {
                place.cityId = id;
            }
        }
        setActive(place);
        closeDialog();
        if (onSearchPage()) {
            if (place && place.kind !== "city" && place.kind !== "world" && place.href) {
                window.location.href = place.href;
                return;
            }
            if (place && place.kind === "city" && cityIdFromPlace(place) < 1 && place.href) {
                window.location.href = place.href;
                return;
            }
            var next = searchPageHref(place);
            if (next !== window.location.pathname + window.location.search) {
                window.location.href = next;
            }
            return;
        }
        if (place && place.href && place.href !== window.location.pathname) {
            window.location.href = place.href;
        }
    }

    function paintContinue() {
        var host = document.getElementById("rm-search-continue");
        var link = document.getElementById("rm-search-continue-link");
        if (!host || !link || !onSearchPage()) {
            return;
        }
        var params = new URLSearchParams(window.location.search);
        if (params.get("city_id") || params.get("q") || params.get("kind") || params.get("rubric")) {
            host.hidden = true;
            return;
        }
        var place = active();
        if (!place || place.kind !== "city" || cityIdFromPlace(place) < 1) {
            place = recents().filter(function (row) {
                return row && row.kind === "city" && cityIdFromPlace(row) > 0;
            })[0];
        }
        if (!place) {
            host.hidden = true;
            return;
        }
        link.textContent = t("place_continue", { name: place.name || t("place_chip_choose") });
        link.href = "/app/search?city_id=" + cityIdFromPlace(place);
        host.hidden = false;
    }

    function renderList(hostId, heading, rows) {
        var host = document.getElementById(hostId);
        if (!host) {
            return 0;
        }
        if (!rows.length) {
            host.hidden = true;
            host.innerHTML = "";
            return 0;
        }
        host.hidden = false;
        host.innerHTML = "<h3>" + escapeHtml(heading) + "</h3><ul>" + rows.map(function (row) {
            var labelText = row.name || row.href;
            if (row.subtitle) {
                labelText = labelText + " · " + row.subtitle;
            }
            return '<li><button type="button" class="rm-place-option" data-place-href="' +
                escapeHtml(row.href) + '" data-place-kind="' + escapeHtml(row.kind || "city") +
                '" data-place-name="' + escapeHtml(row.name || "") + '">' +
                escapeHtml(labelText) + "</button></li>";
        }).join("") + "</ul>";
        return rows.length;
    }

    function renderRecent(filter) {
        var query = String(filter || "").trim().toLowerCase();
        var rows = recents().filter(function (row) {
            if (!query) {
                return row.kind !== "nearby";
            }
            return String(row.name || "").toLowerCase().indexOf(query) !== -1;
        });
        return renderList("rm-place-recent", t("place_selector_recent"), rows);
    }

    function renderResults(rows) {
        return renderList("rm-place-results", t("place_selector_search"), rows);
    }

    function fetchPlaces(query) {
        if (!query || query.length < 2) {
            renderResults([]);
            return;
        }
        setStatus(t("place_selector_locating"));
        fetch("/api/geo/search?q=" + encodeURIComponent(query) + "&limit=8", {
            credentials: "same-origin",
            headers: { "Accept": "application/json" }
        }).then(function (response) {
            return response.json();
        }).then(function (body) {
            var rows = body && body.ok && Array.isArray(body.items) ? body.items : [];
            var count = renderResults(rows);
            var recentCount = renderRecent(query);
            setStatus(!count && !recentCount ? t("place_selector_no_match") : "");
        }).catch(function () {
            renderResults([]);
            var recentCount = renderRecent(query);
            setStatus(!recentCount ? t("place_selector_no_match") : "");
        });
    }

    function openDialog() {
        var box = dialog();
        if (!box || typeof box.showModal !== "function") {
            window.location.href = "/app";
            return;
        }
        setStatus("");
        renderRecent("");
        renderResults([]);
        box.showModal();
        var input = document.getElementById("rm-place-query");
        if (input) {
            input.value = "";
            input.focus();
        }
    }

    function requestNearby() {
        if (read(window.sessionStorage, GEO_DENIED_KEY, false) === true) {
            setStatus(t("place_selector_denied"));
            return;
        }
        if (!navigator.geolocation) {
            setStatus(t("place_selector_denied"));
            return;
        }
        setStatus(t("place_selector_locating"));
        navigator.geolocation.getCurrentPosition(function () {
            setStatus("");
            selectPlace(nearbyPlace());
        }, function () {
            write(window.sessionStorage, GEO_DENIED_KEY, true);
            setStatus(t("place_selector_denied"));
        }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 });
    }

    function bind() {
        var chip = document.getElementById("rm-place-chip");
        var box = dialog();
        if (!chip || !box) {
            return;
        }
        chip.addEventListener("click", function (event) {
            event.preventDefault();
            openDialog();
        });
        box.addEventListener("click", function (event) {
            if (event.target.closest("[data-place-close]")) {
                closeDialog();
                return;
            }
            if (event.target.closest("[data-place-pick='nearby']")) {
                requestNearby();
                return;
            }
            if (event.target.closest("[data-place-pick='world']")) {
                selectPlace(worldPlace());
                return;
            }
            var option = event.target.closest("[data-place-href]");
            if (option) {
                var href = option.getAttribute("data-place-href") || "";
                var picked = {
                    kind: option.getAttribute("data-place-kind") || "city",
                    href: href,
                    name: option.getAttribute("data-place-name") || ""
                };
                var cityMatch = href.match(/\/app\/map\/city\/(\d+)/);
                if (cityMatch) {
                    picked.cityId = Number(cityMatch[1]);
                }
                selectPlace(picked);
            }
        });
        var query = document.getElementById("rm-place-query");
        if (query) {
            query.addEventListener("input", function () {
                var value = String(query.value || "").trim();
                renderRecent(query.value);
                window.clearTimeout(searchTimer);
                if (value.length < 2) {
                    renderResults([]);
                    setStatus(value ? t("place_selector_no_match") : "");
                    return;
                }
                searchTimer = window.setTimeout(function () {
                    fetchPlaces(value);
                }, 180);
            });
        }
    }

    ready(function () {
        resolve();
        paintChip();
        paintContinue();
        bind();
    });
})();
