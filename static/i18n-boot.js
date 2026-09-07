(function () {
    "use strict";

    function messages() {
        return (window.resursmapI18n && window.resursmapI18n.messages) || {};
    }

    function t(key, vars) {
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
                    // Translate directly from the server-provided table.
                    // Calling window.m from t() would call this proxy again
                    // and recurse until the browser stack is exhausted.
                    return t(String(key), vars);
                };
            }
        });
    }
})();
