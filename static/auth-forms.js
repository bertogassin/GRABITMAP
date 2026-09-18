(function () {
    "use strict";

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
        bindEnterSubmit: bindEnterSubmit,
        bindResendCountdown: bindResendCountdown,
    };
})();
