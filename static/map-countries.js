(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        var input = document.getElementById("rm-map-country-search");
        var clear = document.getElementById("rm-map-country-clear");
        var grid = document.getElementById("rm-map-country-grid");
        var status = document.getElementById("rm-map-country-status");
        if (!input || !grid || !status) return;

        function cards() {
            return Array.prototype.slice.call(grid.querySelectorAll("a.card"));
        }

        function titleOf(card) {
            var title = card.querySelector(".card-title");
            return title ? title.textContent.trim().toLowerCase() : "";
        }

        function refresh() {
            var query = input.value.trim().toLowerCase();
            var shown = 0;
            cards().forEach(function (card) {
                var match = !query || titleOf(card).indexOf(query) !== -1;
                card.hidden = !match;
                if (match) shown += 1;
            });
            if (!query) {
                status.textContent = "Страны по алфавиту · начните вводить для поиска";
            } else if (shown) {
                status.textContent = "Найдено: " + shown;
            } else {
                status.textContent = "Страна не найдена на этом континенте";
            }
        }

        input.addEventListener("input", refresh);
        if (clear) {
            clear.addEventListener("click", function () {
                input.value = "";
                input.focus();
                refresh();
            });
        }
        refresh();
    }, { once: true });
})();
