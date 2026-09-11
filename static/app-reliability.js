(function () {
    "use strict";

    var submittingForms = new WeakSet();

    function label(key, fallback) {
        if (typeof window.rmT === "function") {
            var translated = window.rmT(key);
            if (translated && translated !== key) return translated;
        }
        return fallback;
    }

    function liveRegion() {
        var region = document.getElementById("rm-connectivity-status");
        if (region) return region;
        region = document.createElement("div");
        region.id = "rm-connectivity-status";
        region.className = "rm-connectivity-status";
        region.setAttribute("role", "status");
        region.setAttribute("aria-live", "polite");
        region.hidden = true;
        document.body.appendChild(region);
        return region;
    }

    function announceConnectivity(online) {
        var region = liveRegion();
        region.textContent = online
            ? label("network_restored", "Связь восстановлена")
            : label("network_lost", "Нет сети. Проверьте подключение.");
        region.classList.toggle("is-offline", !online);
        region.hidden = false;
        window.clearTimeout(region._hideTimer);
        if (online) {
            region._hideTimer = window.setTimeout(function () {
                region.hidden = true;
            }, 3500);
        }
    }

    document.addEventListener("submit", function (event) {
        var form = event.target;
        if (!(form instanceof HTMLFormElement)) return;
        if ((form.method || "get").toLowerCase() !== "post") return;
        if (event.defaultPrevented || !form.checkValidity()) return;

        if (submittingForms.has(form)) {
            event.preventDefault();
            return;
        }

        submittingForms.add(form);
        form.dataset.submitting = "true";
        form.setAttribute("aria-busy", "true");
        var submitter = event.submitter;
        if (submitter) {
            submitter.classList.add("is-submitting");
            submitter.setAttribute("aria-disabled", "true");
        }
    });

    window.addEventListener("pageshow", function () {
        document.querySelectorAll("form[data-submitting='true']").forEach(function (form) {
            submittingForms.delete(form);
            delete form.dataset.submitting;
            form.removeAttribute("aria-busy");
            form.querySelectorAll(".is-submitting").forEach(function (button) {
                button.classList.remove("is-submitting");
                button.removeAttribute("aria-disabled");
            });
        });
    });

    window.addEventListener("offline", function () {
        announceConnectivity(false);
    });
    window.addEventListener("online", function () {
        announceConnectivity(true);
    });
})();
