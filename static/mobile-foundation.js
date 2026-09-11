(function () {
    "use strict";

    function preventGestureZoom(event) {
        event.preventDefault();
    }

    document.addEventListener("gesturestart", preventGestureZoom, {
        passive: false,
    });
    document.addEventListener("gesturechange", preventGestureZoom, {
        passive: false,
    });
    document.addEventListener("gestureend", preventGestureZoom, {
        passive: false,
    });
    document.addEventListener("dblclick", preventGestureZoom, {
        passive: false,
    });

    window.addEventListener("pageshow", function () {
        document.documentElement.style.setProperty(
            "--rm-viewport-width",
            Math.round(window.innerWidth) + "px"
        );
    });

    function normalize(value) {
        return String(value || "")
            .toLocaleLowerCase()
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function bindLanguageFilter(form) {
        var input = form.querySelector("[data-language-filter]");
        var status = form.querySelector("[data-language-status]");
        var buttons = Array.from(form.querySelectorAll(".rm-lang-btn"));

        if (!input || !buttons.length) {
            return;
        }

        function filterLanguages() {
            var query = normalize(input.value);
            var visible = 0;

            buttons.forEach(function (button) {
                var matches = !query || normalize(button.textContent).includes(query);
                button.hidden = !matches;
                if (matches) {
                    visible += 1;
                }
            });

            if (status) {
                status.textContent = query && visible === 0
                    ? form.dataset.emptyLabel || ""
                    : "";
            }
        }

        input.addEventListener("input", filterLanguages);
        input.addEventListener("search", filterLanguages);
    }

    function ready() {
        document.querySelectorAll(".rm-lang-picker").forEach(bindLanguageFilter);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", ready, { once: true });
    } else {
        ready();
    }
})();
