(function () {
    "use strict";

    var PLACE_KEY = "resursmap-last-city";
    var SEARCH_KEY = "resursmap-recent-searches";
    var LISTING_KEY = "resursmap-last-listing";
    var DRAFT_KEY = "resursmap:listing-draft";

    function ready(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback, { once: true });
        } else {
            callback();
        }
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;");
    }

    function heroName() {
        var hero = document.querySelector(".hero h1");
        return hero ? String(hero.textContent || "").trim() : "";
    }

    function keepName(next, previous) {
        if (next.name && String(next.name).trim()) {
            return next;
        }
        if (
            previous &&
            previous.name &&
            ((next.cityId && previous.cityId === next.cityId) ||
                previous.href === next.href)
        ) {
            next.name = previous.name;
        }
        return next;
    }

    function placeFromPath(path) {
        path = String(path || "");
        var name = heroName();

        var sector = path.match(/^\/app\/map\/city\/(\d+)\/sector\/([^/]+)\/?$/);
        if (sector) {
            return {
                kind: "sector",
                cityId: Number(sector[1]),
                href: "/app/map/city/" + sector[1] + "/sector/" + sector[2],
                addHref: "/app/add/city/" + sector[1],
                name: name
            };
        }

        var geoCity = path.match(/^\/app\/map\/city\/(\d+)\/?$/);
        if (geoCity) {
            return {
                kind: "city",
                cityId: Number(geoCity[1]),
                href: "/app/map/city/" + geoCity[1],
                addHref: "/app/add/city/" + geoCity[1],
                name: name
            };
        }

        var geoCountry = path.match(/^\/app\/map\/country\/(\d+)\/?$/);
        if (geoCountry) {
            return {
                kind: "country",
                href: "/app/map/country/" + geoCountry[1],
                addHref: "/app/add",
                name: name
            };
        }

        var geoContinent = path.match(/^\/app\/map\/continent\/(\d+)\/?$/);
        if (geoContinent) {
            return {
                kind: "continent",
                href: "/app/map/continent/" + geoContinent[1],
                addHref: "/app/add",
                name: name
            };
        }

        var legacyCity = path.match(/^\/app\/(\d+)\/(\d+)\/(\d+)(?:\/|$)/);
        if (legacyCity) {
            return {
                kind: "city",
                ci: Number(legacyCity[1]),
                si: Number(legacyCity[2]),
                zi: Number(legacyCity[3]),
                href: "/app/" + legacyCity[1] + "/" + legacyCity[2] + "/" + legacyCity[3],
                addHref: "/app/add",
                name: name
            };
        }

        var legacyCountry = path.match(/^\/app\/(\d+)\/(\d+)\/?$/);
        if (legacyCountry) {
            return {
                kind: "country",
                href: "/app/" + legacyCountry[1] + "/" + legacyCountry[2],
                addHref: "/app/add",
                name: name
            };
        }

        var legacyContinent = path.match(/^\/app\/(\d+)\/?$/);
        if (legacyContinent) {
            return {
                kind: "continent",
                href: "/app/" + legacyContinent[1],
                addHref: "/app/add",
                name: name
            };
        }

        return null;
    }

    function listingFromPath(path) {
        var match = String(path || "").match(/^\/app\/resource\/(\d+)\/?$/);
        if (!match) {
            return null;
        }
        return {
            href: "/app/resource/" + match[1],
            label: heroName() || "Объявление"
        };
    }

    function savePlace(place) {
        if (!place || !place.href) {
            return;
        }

        place = keepName(place, loadPlace());

        try {
            localStorage.setItem(PLACE_KEY, JSON.stringify(place));
        } catch (e) {}

        if (
            Number.isInteger(place.ci) &&
            Number.isInteger(place.si) &&
            Number.isInteger(place.zi)
        ) {
            document.cookie =
                "rm_last_city=" +
                place.ci +
                "." +
                place.si +
                "." +
                place.zi +
                "; Path=/; Max-Age=31536000; SameSite=Lax";
        }
    }

    function loadPlace() {
        try {
            return JSON.parse(localStorage.getItem(PLACE_KEY) || "null");
        } catch (e) {
            return null;
        }
    }

    function saveListing(entry) {
        if (!entry || !entry.href) {
            return;
        }
        try {
            localStorage.setItem(LISTING_KEY, JSON.stringify(entry));
        } catch (e) {}
    }

    function loadListing() {
        try {
            var row = JSON.parse(localStorage.getItem(LISTING_KEY) || "null");
            return row && row.href ? row : null;
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

    function placeMeta(place) {
        if (!place) {
            return "Продолжить";
        }
        if (place.kind === "country") {
            return "Продолжить эту страну";
        }
        if (place.kind === "continent") {
            return "Продолжить этот континент";
        }
        return "Продолжить это место";
    }

    function chip(href, label) {
        return (
            '<a class="rm-kind-chip" href="' +
            escapeHtml(href) +
            '">' +
            escapeHtml(label) +
            "</a>"
        );
    }

    function continueChips(includePlace) {
        var html = "";
        var place = loadPlace();
        var listing = loadListing();
        var searches = loadSearches();

        if (includePlace && place && place.href) {
            html += chip(
                place.href,
                (place.name && String(place.name).trim()) || "Последнее место"
            );
        }

        if (listing && listing.href) {
            html += chip(
                listing.href,
                (listing.label && String(listing.label).trim()) || "Объявление"
            );
        }

        searches.forEach(function (row) {
            if (!row.href || !row.label) {
                return;
            }
            html += chip(row.href, row.label);
        });

        return html;
    }

    function renderRecent() {
        var host = document.getElementById("rm-recent-searches");
        if (!host) {
            return;
        }

        var html = continueChips(true);
        host.innerHTML = html;
        host.hidden = !html;
    }

    function renderHomeLastCity() {
        var host = document.getElementById("rm-last-city-home");
        if (!host) {
            return;
        }

        var place = loadPlace();
        var chips = continueChips(false);
        if (!place || !place.href) {
            if (!chips) {
                host.hidden = true;
                host.innerHTML = "";
                return;
            }
            host.innerHTML =
                '<section class="card rm-continue-card">' +
                '<div class="card-title">Продолжить</div>' +
                '<nav class="rm-kind-chips">' +
                chips +
                "</nav></section>";
            host.hidden = false;
            return;
        }

        var title = place.name ? String(place.name).trim() : "";
        host.innerHTML =
            '<a class="card" href="' +
            escapeHtml(place.href) +
            '">' +
            '<div class="card-icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-4.4 7-10.2A7 7 0 0 0 5 10.8C5 16.6 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.4"/></svg></div>' +
            '<div class="card-content">' +
            '<div class="card-title">' +
            escapeHtml(title || "Последнее место") +
            "</div>" +
            '<div class="card-meta">' +
            escapeHtml(placeMeta(place)) +
            "</div>" +
            "</div>" +
            '<div class="card-arrow"><svg class="icon small-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></div>' +
            "</a>" +
            (chips
                ? '<nav class="rm-kind-chips rm-continue-chips">' + chips + "</nav>"
                : "");
        host.hidden = false;
    }

    function renderMenuContinue() {
        var host = document.getElementById("rm-continue-menu");
        if (!host) {
            return;
        }

        var place = loadPlace();
        var chips = continueChips(true);
        if (!place && !chips) {
            host.hidden = true;
            host.innerHTML = "";
            return;
        }

        host.innerHTML =
            '<section class="card rm-continue-card">' +
            '<div class="card-title">Продолжить</div>' +
            '<div class="card-meta">Последнее место, поиск и объявление</div>' +
            (chips ? '<nav class="rm-kind-chips">' + chips + "</nav>" : "") +
            "</section>";
        host.hidden = false;
    }

    function applyNavMemory() {
        var place = loadPlace();
        var mapLink = document.querySelector(".bottom-nav a[data-nav-map-link]");
        var here = String(window.location.pathname || "").replace(/\/$/, "") || "/";
        if (mapLink && place && place.href && here !== "/app") {
            mapLink.setAttribute("href", place.href);
        }

        var lastSearch = loadSearches()[0];
        var searchLink = document.querySelector(".bottom-nav a[data-nav-search-link]");
        if (searchLink && lastSearch && lastSearch.href && here !== "/app/search") {
            searchLink.setAttribute("href", lastSearch.href);
        }
    }

    function prefillSearch() {
        var input = document.querySelector('form.search input[name="q"]');
        if (!input || input.value.trim()) {
            return;
        }
        var last = loadSearches()[0];
        if (last && last.q) {
            input.value = last.q;
        }
    }

    function bindAddLinks() {
        var addLinks = document.querySelectorAll(
            '[data-add-listing], a[href="/app/add"]'
        );
        var lastPlace = loadPlace();
        for (var i = 0; i < addLinks.length; i++) {
            addLinks[i].setAttribute(
                "href",
                lastPlace && lastPlace.addHref ? lastPlace.addHref : "/app/add"
            );
        }
    }

    function bindListingDraft() {
        var path = String(window.location.pathname || "");
        if (/\/app\/resource\/\d+\/edit/.test(path)) {
            return;
        }
        if (path.indexOf("/app/add") === -1 && path.indexOf("/add") === -1) {
            return;
        }

        var form = document.querySelector("form.ui-form-stack");
        if (!form) {
            return;
        }
        var title = form.querySelector('[name="title"]');
        var description = form.querySelector('[name="description"]');
        if (!title || !description) {
            return;
        }

        var contact = form.querySelector('[name="contact"]');
        var address = form.querySelector('[name="address"]');

        try {
            var draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
            if (draft) {
                if (!title.value && draft.title) {
                    title.value = draft.title;
                }
                if (!description.value && draft.description) {
                    description.value = draft.description;
                }
                if (contact && !contact.value && draft.contact) {
                    contact.value = draft.contact;
                }
                if (address && !address.value && draft.address) {
                    address.value = draft.address;
                }
            }
        } catch (e) {}

        function persist() {
            try {
                localStorage.setItem(
                    DRAFT_KEY,
                    JSON.stringify({
                        title: title.value,
                        description: description.value,
                        contact: contact ? contact.value : "",
                        address: address ? address.value : ""
                    })
                );
            } catch (e) {}
        }

        form.addEventListener("input", persist);
        form.addEventListener("submit", function () {
            try {
                localStorage.removeItem(DRAFT_KEY);
            } catch (e) {}
        });
    }

    ready(function () {
        savePlace(placeFromPath(window.location.pathname));
        saveListing(listingFromPath(window.location.pathname));

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
                    label: label
                });
            }

            prefillSearch();
            renderRecent();
        }

        renderHomeLastCity();
        renderMenuContinue();
        applyNavMemory();
        bindAddLinks();
        bindListingDraft();
    });
})();
