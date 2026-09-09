(function () {
    "use strict";

    function wrapLines(context, value, maxWidth, maxLines) {
        var words = String(value || "").replace(/\s+/g, " ").trim().split(" ");
        var lines = [];
        var current = "";

        words.forEach(function (word) {
            var candidate = current ? current + " " + word : word;
            if (context.measureText(candidate).width <= maxWidth) {
                current = candidate;
                return;
            }
            if (current && lines.length < maxLines) {
                lines.push(current);
            }
            current = word;
        });

        if (current && lines.length < maxLines) {
            lines.push(current);
        }

        if (words.length && lines.length === maxLines) {
            var last = lines[maxLines - 1];
            while (last.length && context.measureText(last + "…").width > maxWidth) {
                last = last.slice(0, -1);
            }
            lines[maxLines - 1] = last + (last === current ? "" : "…");
        }

        return lines;
    }

    function cardFile(title, text, url) {
        if (typeof File !== "function") {
            return null;
        }

        var canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 630;
        var context = canvas.getContext("2d");
        if (!context) {
            return null;
        }

        var background = context.createLinearGradient(0, 0, 1200, 630);
        background.addColorStop(0, "#07140f");
        background.addColorStop(0.55, "#10261d");
        background.addColorStop(1, "#19392b");
        context.fillStyle = background;
        context.fillRect(0, 0, 1200, 630);

        context.fillStyle = "rgba(85, 232, 160, 0.10)";
        context.beginPath();
        context.arc(1070, 80, 260, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = "rgba(255, 255, 255, 0.04)";
        context.beginPath();
        context.arc(80, 650, 310, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = "#62e0ad";
        context.font = "800 28px system-ui, sans-serif";
        context.fillText("GRABIT", 72, 78);
        context.fillStyle = "rgba(255,255,255,.70)";
        context.font = "600 20px system-ui, sans-serif";
        context.fillText("ЛЮДИ · РАБОТА · УСЛУГИ · РЕСУРСЫ", 72, 112);

        context.fillStyle = "#ffffff";
        context.font = "800 58px system-ui, sans-serif";
        wrapLines(context, title, 1020, 3).forEach(function (line, index) {
            context.fillText(line, 72, 205 + index * 70);
        });

        context.fillStyle = "rgba(255,255,255,.76)";
        context.font = "400 30px system-ui, sans-serif";
        wrapLines(context, text, 1020, 3).forEach(function (line, index) {
            context.fillText(line, 72, 425 + index * 42);
        });

        context.fillStyle = "#62e0ad";
        context.font = "700 24px system-ui, sans-serif";
        context.fillText(new URL(url).host, 72, 575);
        context.fillStyle = "rgba(255,255,255,.55)";
        context.font = "500 20px system-ui, sans-serif";
        context.textAlign = "right";
        context.fillText("Открыть полную информацию по ссылке", 1128, 575);

        var dataUrl = canvas.toDataURL("image/png");
        var encoded = dataUrl.split(",")[1];
        var binary = atob(encoded);
        var bytes = new Uint8Array(binary.length);
        for (var index = 0; index < binary.length; index += 1) {
            bytes[index] = binary.charCodeAt(index);
        }

        return new File([bytes], "grabit-card.png", { type: "image/png" });
    }

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
            var file = null;
            try {
                file = cardFile(title, text, url);
            } catch (error) {
                file = null;
            }
            var cardPayload = file ? {
                files: [file],
                title: title,
                text: [text, url].filter(Boolean).join("\n\n"),
            } : null;
            var sharePayload = cardPayload && navigator.canShare && navigator.canShare(cardPayload)
                ? cardPayload
                : { title: title, text: text, url: url };

            navigator
                .share(sharePayload)
                .then(function () {
                    done(cardPayload === sharePayload ? "Карточка отправлена" : "Отправлено");
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
