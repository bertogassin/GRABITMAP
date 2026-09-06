"use strict";

const CACHE_VERSION = "grabit-shell-v5.0.1";

const STATIC_ASSETS = [
    "/static/manifest.webmanifest",
    "/static/map-catalog-search.js",
    "/static/map-countries.js",
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
                var stale = keys.filter(function (key) {
                    return (
                        (
                            key.startsWith("resursmap-shell-") ||
                            key.startsWith("grabit-shell-")
                        ) &&
                        key !== CACHE_VERSION
                    );
                });
                return Promise.all(stale.map(function (key) {
                    return caches.delete(key);
                })).then(function () {
                    return stale.length;
                });
            })
            .then(function (replaced) {
                return self.clients.claim().then(function () {
                    return replaced;
                });
            })
            .then(function (replaced) {
                if (!replaced) {
                    return;
                }
                return self.registration.showNotification("GRABIT обновлён", {
                    body: "Откройте приложение. Шагомер на панели — сразу считать шаги.",
                    icon: "/static/app-icon-192.png",
                    tag: "grabit-update",
                    data: { url: "/app" }
                }).catch(function () {});
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
    var target = "/app";
    if (event.action === "open-steps") {
        target = "/app/steps";
    } else if (event.notification && event.notification.data && event.notification.data.url) {
        target = event.notification.data.url;
    }
    event.waitUntil(
        self.clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(function (clients) {
            for (var i = 0; i < clients.length; i += 1) {
                if (clients[i].url && clients[i].url.indexOf(target) !== -1 && "focus" in clients[i]) {
                    return clients[i].focus();
                }
            }
            for (var j = 0; j < clients.length; j += 1) {
                if ("navigate" in clients[j]) {
                    return clients[j].navigate(target).then(function (client) {
                        return client && client.focus ? client.focus() : client;
                    });
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow(target);
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
        if (!data) {
            return;
        }
        var tasks = [];
        var messages = Number(data.messages) || 0;
        var notifications = Number(data.notifications) || 0;
        if (messages > 0) {
            tasks.push(self.registration.showNotification("Новое сообщение", {
                body: "Откройте чат в GRABIT.",
                icon: "/static/app-icon-192.png",
                tag: "grabit-chat",
                data: { url: "/app/messages" }
            }));
        } else if (notifications > 0) {
            tasks.push(self.registration.showNotification("GRABIT", {
                body: "Есть новое уведомление.",
                icon: "/static/app-icon-192.png",
                tag: "grabit-inbox",
                data: { url: "/app/notifications" }
            }));
        }
        var nudges = data.nudges;
        if (nudges && nudges.length) {
            nudges.forEach(function (nudge) {
                tasks.push(self.registration.showNotification(nudge.title || "GRABIT", {
                    body: nudge.body || "",
                    icon: "/static/app-icon-192.png",
                    tag: "grabit-nudge-" + String(nudge.kind || "day"),
                    data: { url: nudge.href || "/app" }
                }));
            });
        }
        if (!tasks.length) {
            return;
        }
        return Promise.all(tasks);
    }).catch(function () {});
}
