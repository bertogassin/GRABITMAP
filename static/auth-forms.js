(function () {
    "use strict";

    function t(key, fallback) {
        if (window.m && typeof window.m[key] === "function") {
            try {
                return window.m[key]({});
            } catch (_) {}
        }
        if (typeof window.rmT === "function") {
            var translated = window.rmT(key);
            if (translated && translated !== key) {
                return translated;
            }
        }
        return fallback;
    }

    function uniqueNodes(nodes) {
        var seen = [];
        (nodes || []).forEach(function (node) {
            if (!node || seen.indexOf(node) !== -1) {
                return;
            }
            seen.push(node);
        });
        return seen;
    }

    function bindPasswordFields(buttons, inputs) {
        buttons = uniqueNodes(buttons);
        inputs = uniqueNodes(inputs);
        if (!buttons.length || !inputs.length) {
            return;
        }

        function apply(show) {
            inputs.forEach(function (input) {
                input.type = show ? "text" : "password";
            });
            buttons.forEach(function (button) {
                button.textContent = show
                    ? t("auth_hide", "Скрыть")
                    : t("auth_show", "Показать");
                button.setAttribute(
                    "aria-label",
                    show
                        ? t("auth_hide_password", "Скрыть пароль")
                        : t("auth_show_password", "Показать пароль")
                );
            });
        }

        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                apply(inputs[0].type === "password");
            });
        });
    }

    function bindLinkedPasswordToggles(pairs) {
        var buttons = [];
        var inputs = [];
        (pairs || []).forEach(function (pair) {
            if (!pair) {
                return;
            }
            buttons.push(pair.button);
            inputs.push(pair.input);
        });
        bindPasswordFields(buttons, inputs);
    }

    function bindPasswordToggle(toggleButton, input, extraInput) {
        bindPasswordFields(
            [toggleButton],
            extraInput ? [input, extraInput] : [input]
        );
    }

    function bindEnterSubmit(inputs, submit) {
        if (!Array.isArray(inputs) || !submit) {
            return;
        }

        inputs.forEach(function (input) {
            if (!input) {
                return;
            }

            input.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    submit();
                }
            });
        });
    }

    function bindResendCountdown(button, seconds, label) {
        if (!button || seconds <= 0) {
            return;
        }

        var remaining = seconds;
        button.disabled = true;
        button.textContent = label.replace("{seconds}", String(remaining));

        var timer = window.setInterval(function () {
            remaining -= 1;

            if (remaining <= 0) {
                window.clearInterval(timer);
                button.disabled = false;
                button.textContent = label.replace("{seconds}", "0").replace(/ \(.*\)$/, "");
                return;
            }

            button.textContent = label.replace("{seconds}", String(remaining));
        }, 1000);
    }

    window.resursmapAuthForms = {
        bindPasswordToggle: bindPasswordToggle,
        bindLinkedPasswordToggles: bindLinkedPasswordToggles,
        bindEnterSubmit: bindEnterSubmit,
        bindResendCountdown: bindResendCountdown,
    };
})();
