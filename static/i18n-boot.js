(function () {
    "use strict";

    function messages() {
        return (window.resursmapI18n && window.resursmapI18n.messages) || {};
    }

    function t(key, vars) {
        if (window.m && typeof window.m[key] === "function") {
            return window.m[key](vars || {});
        }
        var text = messages()[key];
        if (typeof text !== "string") {
            text = key;
        }
        if (vars) {
            Object.keys(vars).forEach(function (name) {
                text = text.split("{" + name + "}").join(String(vars[name]));
            });
        }
        return text;
    }

    window.rmT = t;
    if (!window.m) {
        window.m = new Proxy({}, {
            get: function (_, key) {
                return function (vars) {
                    return t(String(key), vars);
                };
            }
        });
    }
})();
