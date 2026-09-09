"use strict";

const CACHE_PREFIX = "grabit-shell-";
const LEGACY_CACHE_PREFIX = "resursmap-shell-";
const CACHE_VERSION = CACHE_PREFIX + "v5.0.31";

const STATIC_ASSETS = [
    "/static/manifest.webmanifest",
    "/static/map-catalog-search.js",
    "/static/map-countries.js",
    "/static/app-icon.svg",
    "/static/app-icon-192.png",
    "/static/app-icon-512.png",
    "/static/apple-touch-icon.png",
    "/static/nav-badge.js",
    "/static/i18n-boot.js",
    "/static/i18n-runtime.js",
    "/static/paraglide/messages.js",
    "/static/paraglide/runtime.js",
    "/static/paraglide/messages/_index.js",
    "/static/paraglide/messages/ru.js",
    "/static/paraglide/messages/en.js",
    "/static/paraglide/messages/fr.js",
    "/static/paraglide/messages/es.js",
    "/static/paraglide/messages/zh.js",
    "/static/paraglide/messages/zh-TW.js",
    "/static/paraglide/messages/hi.js",
    "/static/paraglide/messages/ar.js",
    "/static/paraglide/messages/pt.js",
    "/static/paraglide/messages/de.js",
    "/static/paraglide/messages/ja.js",
    "/static/paraglide/messages/ko.js",
    "/static/paraglide/messages/it.js",
    "/static/paraglide/messages/tr.js",
    "/static/paraglide/messages/pl.js",
    "/static/paraglide/messages/uk.js",
    "/static/paraglide/messages/nl.js",
    "/static/paraglide/messages/vi.js",
    "/static/paraglide/messages/id.js",
    "/static/paraglide/messages/ms.js",
    "/static/paraglide/messages/th.js",
    "/static/paraglide/messages/fa.js",
    "/static/paraglide/messages/ur.js",
    "/static/paraglide/messages/bn.js",
    "/static/paraglide/messages/pa.js",
    "/static/paraglide/messages/sw.js",
    "/static/paraglide/messages/el.js",
    "/static/paraglide/messages/cs.js",
    "/static/paraglide/messages/ro.js",
    "/static/paraglide/messages/hu.js",
    "/static/paraglide/messages/sv.js",
    "/static/paraglide/messages/he.js",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                // A single unavailable asset must not prevent the shell from
                // installing; successful assets still provide useful offline
                // behavior and missing assets can be fetched on demand.
                return Promise.all(STATIC_ASSETS.map(function (asset) {
                    return cache.add(asset).catch(function () {});
                }));
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
            pwa_updated: "GRABIT обновлён"
        },
        en: {
            notify_new_message: "New message",
            notify_open_chat: "Open the chat in GRABIT.",
            notify_generic: "You have a new notification.",
            pwa_updated: "GRABIT updated"
        },
        uk: {
            notify_new_message: "Нове повідомлення",
            notify_open_chat: "Відкрийте чат у GRABIT.",
            notify_generic: "Є нове сповіщення.",
            pwa_updated: "GRABIT оновлено"
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

function internalNavigationTarget(value, fallback) {
    try {
        var target = new URL(String(value || ""), self.location.origin);
        if (target.origin !== self.location.origin || !target.pathname.startsWith("/app/")) {
            return fallback;
        }
        return target.pathname + target.search + target.hash;
    } catch (_) {
        return fallback;
    }
}

self.addEventListener("activate", function (event) {
    event.waitUntil(
        refreshSwLang().then(function () {
            return caches.keys()
            .then(function (keys) {
                var stale = keys.filter(function (key) {
                    return (
                        (key.startsWith(CACHE_PREFIX) || key.startsWith(LEGACY_CACHE_PREFIX)) &&
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
                    body: swT("notify_generic"),
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
        var cacheKey = new URL(request.url);
        cacheKey.search = "";
        event.respondWith(
            fetch(request).then(function (response) {
                if (response.ok) {
                    caches.open(CACHE_VERSION).then(function (cache) {
                        return cache.put(cacheKey.toString(), response.clone());
                    }).catch(function () {});
                }
                return response;
            }).catch(function () {
                return caches.match(cacheKey.toString());
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
    if (event.notification && event.notification.data && event.notification.data.url) {
        target = internalNavigationTarget(event.notification.data.url, target);
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
                    data: { url: internalNavigationTarget(nudge.href, "/app") }
                }));
            });
        }
        if (!tasks.length) {
            return;
        }
        return Promise.all(tasks);
    }).catch(function () {});
}
