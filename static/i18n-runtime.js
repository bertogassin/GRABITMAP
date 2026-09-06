import * as messages from "./paraglide/messages.js";
import { getLocale, setLocale, getTextDirection } from "./paraglide/runtime.js";

window.m = messages;
window.rmGetLocale = getLocale;
window.rmGetTextDirection = getTextDirection;
document.documentElement.dir = getTextDirection();
window.rmSetLocale = function (locale) {
    document.documentElement.lang = locale;
    document.documentElement.dir = getTextDirection(locale);
    return setLocale(locale, { reload: true });
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
