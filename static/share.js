(function () {
    "use strict";

    document.addEventListener("click", function (event) {
        var button = event.target.closest("[data-share]");
        if (!button) {
            return;
        }

        event.preventDefault();

        var scope = button.closest("[data-share-scope]") || document;
        var sourceTitle = scope.querySelector("[data-share-source-title]");
        var sourceText = scope.querySelector("[data-share-source-text]");
        var title = button.getAttribute("data-share-title") ||
            (sourceTitle && sourceTitle.textContent.trim()) || document.title;
        var text = button.getAttribute("data-share-text") ||
            (sourceText && sourceText.textContent.trim()) || "";
        var url = button.getAttribute("data-share-url") || window.location.href;
        if (url.indexOf("/") === 0) {
            url = window.location.origin + url;
        }
        var status = document.getElementById(button.getAttribute("data-share-status") || "");

        function done(message) {
            if (status) {
                status.textContent = message;
            } else {
                button.textContent = message;
            }
        }

        var payload = [title, text, url].filter(Boolean).join("\n\n");

        if (navigator.share) {
            navigator
                .share({ title: title, text: text, url: url })
                .then(function () {
                    done("Отправлено");
                })
                .catch(function (error) {
                    if (!error || error.name !== "AbortError") {
                        done("Не удалось поделиться");
                    }
                });
            return;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(payload)
                .then(function () {
                    done("Ссылка скопирована");
                })
                .catch(function () {
                    done("Скопируйте адрес страницы");
                });
            return;
        }

        done("Скопируйте адрес страницы");
    });
})();
