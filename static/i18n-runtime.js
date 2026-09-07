import * as messages from "./paraglide/messages.js";
import { getLocale, locales, setLocale, getTextDirection } from "./paraglide/runtime.js";

window.m = messages;
window.rmGetLocale = getLocale;
window.rmGetTextDirection = getTextDirection;
function normalizeLocale(value) {
    if (typeof value !== "string") {
        return null;
    }
    var candidate = value.trim();
    var exact = locales.find(function (locale) {
        return locale.toLowerCase() === candidate.toLowerCase();
    });
    if (exact) {
        return exact;
    }
    var lower = candidate.toLowerCase();
    if (lower === "zh-hant" || lower === "zh-hk" || lower === "zh-mo") {
        return "zh-TW";
    }
    var base = lower.split(/[-_]/)[0];
    return locales.find(function (locale) {
        return locale.toLowerCase() === base;
    }) || null;
}

var initialLocale = normalizeLocale(getLocale()) || "ru";
document.documentElement.lang = initialLocale;
document.documentElement.dir = getTextDirection(initialLocale);
window.rmSetLocale = function (locale) {
    var normalized = normalizeLocale(locale);
    if (!normalized) {
        return;
    }
    document.documentElement.lang = normalized;
    document.documentElement.dir = getTextDirection(normalized);
    return setLocale(normalized, { reload: true });
};

window.rmT = function (key, vars) {
    var fn = messages[key];
    if (typeof fn === "function") {
        return fn(vars || {});
    }
    var table = (window.resursmapI18n && window.resursmapI18n.messages) || {};
    var text = table[key];
    if (typeof text !== "string") {
        return key;
    }
    if (vars) {
        Object.keys(vars).forEach(function (name) {
            text = text.split("{" + name + "}").join(String(vars[name]));
        });
    }
    return text;
};

document.querySelectorAll("[data-i18n]").forEach(function (node) {
    node.textContent = window.rmT(node.getAttribute("data-i18n"));
});
