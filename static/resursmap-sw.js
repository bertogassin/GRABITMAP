"use strict";

const CACHE_VERSION = "grabit-shell-v4.9.92";

const STATIC_ASSETS = [
    "/static/manifest.webmanifest",
    "/static/map-catalog-search.js",
    "/static/app-icon.svg",
    "/static/app-icon-192.png",
    "/static/app-icon-512.png",
    "/static/apple-touch-icon.png",
    "/static/nav-badge.js",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                return cache.addAll(STATIC_ASSETS);
            })
            .then(function () {
                return self.skipWaiting();
            })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (keys) {
                return Promise.all(
                    keys
                        .filter(function (key) {
                            return (
                                (
                                    key.startsWith("resursmap-shell-") ||
                                    key.startsWith("grabit-shell-")
                                ) &&
                                key !== CACHE_VERSION
                            );
                        })
                        .map(function (key) {
                            return caches.delete(key);
                        })
                );
            })
            .then(function () {
                return self.clients.claim();
            })
    );
});

self.addEventListener("fetch", function (event) {
    const request = event.request;
    const url = new URL(request.url);

    if (
        request.method !== "GET" ||
        url.origin !== self.location.origin ||
        url.pathname.startsWith("/api/") ||
        url.pathname.startsWith("/app/")
    ) {
        return;
    }

    if (url.pathname.startsWith("/static/")) {
        event.respondWith(
            fetch(request).catch(function () {
                return caches.match(request, {
                    ignoreSearch: true
                });
            })
        );
    }
});

self.addEventListener("periodicsync", function (event) {
    if (event.tag !== "grabit-nudge") {
        return;
    }
    event.waitUntil(remindIfNeeded());
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(function (clients) {
            for (var i = 0; i < clients.length; i += 1) {
                if (clients[i].url && "focus" in clients[i]) {
                    return clients[i].focus();
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow("/app");
            }
            return undefined;
        })
    );
});

function remindIfNeeded() {
    return fetch("/api/account/attention-count", {
        credentials: "include",
        headers: { Accept: "application/json" }
    }).then(function (response) {
        if (!response.ok) {
            return;
        }
        return response.json();
    }).then(function (data) {
        var nudges = data && data.nudges;
        if (!nudges || !nudges.length) {
            return;
        }
        return Promise.all(nudges.map(function (nudge) {
            return self.registration.showNotification(nudge.title || "GRABIT", {
                body: nudge.body || "",
                icon: "/static/app-icon-192.png",
                tag: "grabit-nudge-" + String(nudge.kind || "day")
            });
        }));
    }).catch(function () {});
}
