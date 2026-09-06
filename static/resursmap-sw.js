"use strict";

const CACHE_VERSION = "grabit-shell-v5.0.8";

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

function swT(key) {
    var dict = {
        ru: {
            notify_new_message: "Новое сообщение",
            notify_open_chat: "Откройте чат в GRABIT.",
            notify_generic: "Есть новое уведомление.",
            pwa_updated: "GRABIT обновлён",
            pwa_open_app_steps: "Откройте приложение. Шагомер на панели — сразу считать шаги."
        },
        en: {
            notify_new_message: "New message",
            notify_open_chat: "Open the chat in GRABIT.",
            notify_generic: "You have a new notification.",
            pwa_updated: "GRABIT updated",
            pwa_open_app_steps: "Open the app. Pedometer is on the panel — start counting steps."
        },
        uk: {
            notify_new_message: "Нове повідомлення",
            notify_open_chat: "Відкрийте чат у GRABIT.",
            notify_generic: "Є нове сповіщення.",
            pwa_updated: "GRABIT оновлено",
            pwa_open_app_steps: "Відкрийте застосунок. Крокомір на панелі — одразу рахувати кроки."
        }
    };
    var locale = "ru";
    try {
        var match = (self.__grabitLang || "").toString();
        if (match) {
            locale = match;
        }
    } catch (_) {}
    var table = dict[locale] || dict.en;
    return table[key] || dict.en[key] || key;
}

function refreshSwLang() {
    if (!self.cookieStore || typeof self.cookieStore.get !== "function") {
        return Promise.resolve();
    }
    return self.cookieStore.get("resursmap_lang").then(function (cookie) {
        self.__grabitLang = cookie && cookie.value ? cookie.value : "ru";
    }).catch(function () {
        self.__grabitLang = "ru";
    });
}

refreshSwLang();

self.addEventListener("activate", function (event) {
    event.waitUntil(
        refreshSwLang().then(function () {
            return caches.keys()
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
                return self.registration.showNotification(swT("pwa_updated"), {
                    body: swT("pwa_open_app_steps"),
                    icon: "/static/app-icon-192.png",
                    tag: "grabit-update",
                    data: { url: "/app" }
                }).catch(function () {});
            });
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
    return refreshSwLang().then(function () {
        return fetch("/api/account/attention-count", {
            credentials: "include",
            headers: { Accept: "application/json" }
        });
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
            tasks.push(self.registration.showNotification(swT("notify_new_message"), {
                body: swT("notify_open_chat"),
                icon: "/static/app-icon-192.png",
                tag: "grabit-chat",
                data: { url: "/app/messages" }
            }));
        } else if (notifications > 0) {
            tasks.push(self.registration.showNotification("GRABIT", {
                body: swT("notify_generic"),
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
