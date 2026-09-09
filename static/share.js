(function () {
    "use strict";

    function t(key, fallback) {
        var messages = window.resursmapI18n && window.resursmapI18n.messages;
        return messages && typeof messages[key] === "string"
            ? messages[key]
            : fallback;
    }

    var mascotPromise = null;

    function loadMascot() {
        if (mascotPromise) {
            return mascotPromise;
        }
        mascotPromise = new Promise(function (resolve, reject) {
            var image = new Image();
            image.onload = function () { resolve(image); };
            image.onerror = reject;
            image.src = "/static/grabit-mascot-v2.png";
        });
        return mascotPromise;
    }

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
            return Promise.resolve(null);
        }

        return loadMascot().catch(function () { return null; }).then(function (mascot) {
            var canvas = document.createElement("canvas");
            canvas.width = 1200;
            canvas.height = 630;
            var context = canvas.getContext("2d");
            if (!context) {
                return null;
            }

            var background = context.createLinearGradient(0, 0, 1200, 630);
            background.addColorStop(0, "#080a0d");
            background.addColorStop(0.58, "#111720");
            background.addColorStop(1, "#1c222c");
            context.fillStyle = background;
            context.fillRect(0, 0, 1200, 630);

            context.fillStyle = "rgba(245, 166, 35, 0.12)";
            context.beginPath();
            context.arc(1080, 70, 260, 0, Math.PI * 2);
            context.fill();
            context.strokeStyle = "rgba(245, 166, 35, 0.26)";
            context.lineWidth = 2;
            context.strokeRect(28, 28, 1144, 574);

            context.fillStyle = "#f5a623";
            context.font = "900 34px system-ui, sans-serif";
            context.fillText("GRABIT", 72, 78);
            context.fillStyle = "rgba(255,255,255,.72)";
            context.font = "600 20px system-ui, sans-serif";
            context.fillText(t("share_tagline", "PEOPLE · WORK · SERVICES · BUSINESS"), 72, 112);
            if (mascot) {
                context.drawImage(mascot, 850, 44, 280, 168);
            }

            context.fillStyle = "#ffffff";
            context.font = "800 58px system-ui, sans-serif";
            wrapLines(context, title, 1020, 3).forEach(function (line, index) {
                context.fillText(line, 72, 235 + index * 70);
            });

            context.fillStyle = "rgba(255,255,255,.76)";
            context.font = "400 30px system-ui, sans-serif";
            wrapLines(context, text, 1020, 2).forEach(function (line, index) {
                context.fillText(line, 72, 458 + index * 42);
            });

            context.fillStyle = "#f5a623";
            context.font = "700 24px system-ui, sans-serif";
            context.fillText(new URL(url).host, 72, 565);
            context.fillStyle = "rgba(255,255,255,.58)";
            context.font = "500 20px system-ui, sans-serif";
            context.textAlign = "right";
            context.fillText(t("share_open_details", "Open full details"), 1128, 565);

            var dataUrl = canvas.toDataURL("image/png");
            var encoded = dataUrl.split(",")[1];
            var binary = atob(encoded);
            var bytes = new Uint8Array(binary.length);
            for (var index = 0; index < binary.length; index += 1) {
                bytes[index] = binary.charCodeAt(index);
            }

            return new File([bytes], "grabit-listing.png", { type: "image/png" });
        });
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
            cardFile(title, text, url)
                .then(function (file) {
                    var cardPayload = file ? {
                        files: [file],
                        title: title,
                        text: [text, url].filter(Boolean).join("\n\n"),
                    } : null;
                    var sharePayload = cardPayload && navigator.canShare && navigator.canShare(cardPayload)
                        ? cardPayload
                        : { title: title, text: text, url: url };
                    return navigator.share(sharePayload).then(function () {
                        done(cardPayload === sharePayload
                            ? t("share_card_sent", "Card sent")
                            : t("share_sent", "Sent"));
                    });
                })
                .catch(function (error) {
                    if (!error || error.name !== "AbortError") {
                        done(t("share_failed", "Could not share"));
                    }
                });
            return;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(payload)
                .then(function () {
                    done(t("share_link_copied", "Link copied"));
                })
                .catch(function () {
                    done(t("share_copy_address", "Copy the page address"));
                });
            return;
        }

        done(t("share_copy_address", "Copy the page address"));
    });
})();
