(function () {
    "use strict";

    var dialog = document.getElementById("rm-global-search-dialog");
    if (!dialog) {
        return;
    }

    var input = dialog.querySelector('input[name="q"]');
    var closeButton = dialog.querySelector("[data-global-search-close]");
    var openers = document.querySelectorAll("[data-global-search-open]");
    var returnFocus = null;

    function openSearch(opener) {
        if (typeof dialog.showModal !== "function") {
            return false;
        }
        returnFocus = opener || document.activeElement;
        if (!dialog.open) {
            dialog.showModal();
        }
        window.requestAnimationFrame(function () {
            if (input) {
                input.focus();
                input.select();
            }
        });
        return true;
    }

    for (var i = 0; i < openers.length; i++) {
        openers[i].addEventListener("click", function (event) {
            if (openSearch(event.currentTarget)) {
                event.preventDefault();
            }
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            dialog.close();
        });
    }

    dialog.addEventListener("click", function (event) {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    dialog.addEventListener("close", function () {
        if (returnFocus && typeof returnFocus.focus === "function") {
            returnFocus.focus();
        }
        returnFocus = null;
    });

    document.addEventListener("keydown", function (event) {
        var target = event.target;
        var tag = target && target.tagName ? target.tagName.toLowerCase() : "";
        var isEditing = tag === "input" || tag === "textarea" || tag === "select" ||
            (target && target.isContentEditable);
        if (event.key === "/" && !event.altKey && !event.ctrlKey && !event.metaKey &&
            !event.shiftKey && !isEditing && openers.length > 0 && openSearch(openers[0])) {
            event.preventDefault();
        }
    });
}());
