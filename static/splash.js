// Заставка GRABIT — один раз. Тур возможностей — один раз после входа.
(function() {
    var path = window.location.pathname || "";
    if (path !== "/app" && !path.startsWith("/app/")) {
        return;
    }

    var TOUR_KEY = "resursmap-tour-v1";

    function assetVersion() {
        var meta = document.querySelector(
            'meta[name="resursmap-asset-version"]'
        );
        return meta && meta.content ? meta.content : "";
    }

    function hasUserCookie() {
        return /(?:^|;\s*)resursmap_user=/.test(document.cookie || "");
    }

    function storageGet(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    }

    function storageSet(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {}
    }

    function showSplash(done) {
        if (storageGet("resursmap-splash-shown") === "1") {
            done();
            return;
        }

        var splash = document.createElement("div");
        splash.id = "resursmap-splash";
        splash.style.cssText = [
            "position:fixed",
            "inset:0",
            "z-index:9999",
            "display:flex",
            "flex-direction:column",
            "align-items:center",
            "justify-content:center",
            "gap:18px",
            "background:",
            "radial-gradient(circle at 20% 0%, rgba(126,212,228,.18), transparent 42%),",
            "radial-gradient(circle at 80% 10%, rgba(232,204,150,.16), transparent 38%),",
            "linear-gradient(160deg,#080a0d,#0e1116)",
            "transition:opacity .5s ease,visibility .5s ease",
            "opacity:1",
            "visibility:visible"
        ].join(";");

        var logo = document.createElement("img");
        logo.src = "/static/app-icon.svg?v=" + assetVersion();
        logo.alt = "GRABIT";
        logo.style.cssText = [
            "width:104px",
            "height:104px",
            "border-radius:26px",
            "box-shadow:0 16px 48px rgba(0,0,0,.55),0 0 60px rgba(232,204,150,.18)",
            "animation:fadeInUp .6s ease both, pulseGlow 2.4s ease-in-out .6s infinite"
        ].join(";");

        var name = document.createElement("div");
        name.textContent = "GRABIT";
        name.style.cssText = [
            "font-size:30px",
            "font-weight:900",
            "letter-spacing:.06em",
            "background:linear-gradient(135deg,#f8f5ef,#ffe4b8)",
            "-webkit-background-clip:text",
            "background-clip:text",
            "-webkit-text-fill-color:transparent",
            "animation:fadeInUp .6s ease .2s both"
        ].join(";");

        var subtitle = document.createElement("div");
        subtitle.textContent = "Работа, люди и бизнес";
        subtitle.style.cssText = [
            "font-size:11px",
            "font-weight:800",
            "letter-spacing:.14em",
            "text-transform:uppercase",
            "color:#e8cc96",
            "animation:fadeInUp .6s ease .3s both"
        ].join(";");

        splash.appendChild(logo);
        splash.appendChild(name);
        splash.appendChild(subtitle);
        document.body.appendChild(splash);

        if (typeof window.resursmapPlaySplashSound === "function") {
            setTimeout(window.resursmapPlaySplashSound, 200);
        }

        setTimeout(function() {
            splash.style.opacity = "0";
            splash.style.visibility = "hidden";
            storageSet("resursmap-splash-shown", "1");
            setTimeout(function() {
                if (splash.parentNode) splash.parentNode.removeChild(splash);
                done();
            }, 500);
        }, 1500);
    }

    var slides = [
        {
            kicker: "Карта",
            title: "Работа рядом",
            text: "Город, рубрика, объявления. Ищите работу, людей и бизнес на карте."
        },
        {
            kicker: "Объявление",
            title: "Разместите своё",
            text: "Город, текст и готово. Другие увидят и напишут сразу."
        },
        {
            kicker: "Чат",
            title: "Пишите сразу",
            text: "Без запроса на связь. Потом можно заблокировать или удалить."
        },
        {
            kicker: "Шагомер",
            title: "10 000 шагов",
            text: "Считайте шаги на телефоне. Каждый день цель — хотя бы 10 000."
        },
        {
            kicker: "Напоминания",
            title: "Шаги и работа",
            text: "Раз в день напомним пройтись и поискать работу. Разрешите уведомления."
        }
    ];

    function showTour() {
        if (!hasUserCookie()) return;
        if (storageGet(TOUR_KEY) === "1") return;

        var index = 0;
        var overlay = document.createElement("div");
        overlay.id = "resursmap-tour";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-label", "Возможности GRABIT");
        overlay.style.cssText = [
            "position:fixed",
            "inset:0",
            "z-index:10000",
            "display:flex",
            "align-items:flex-end",
            "justify-content:center",
            "padding:18px 16px 28px",
            "background:rgba(6,8,11,.72)",
            "backdrop-filter:blur(10px)"
        ].join(";");

        var card = document.createElement("div");
        card.style.cssText = [
            "width:min(440px,100%)",
            "display:grid",
            "gap:14px",
            "padding:22px 20px 18px",
            "border-radius:22px",
            "background:linear-gradient(180deg,#141820,#0d1016)",
            "border:1px solid rgba(232,204,150,.22)",
            "box-shadow:0 20px 50px rgba(0,0,0,.45)",
            "color:#f4efe6"
        ].join(";");

        var kicker = document.createElement("div");
        kicker.style.cssText = "font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#e8cc96";

        var title = document.createElement("strong");
        title.style.cssText = "font-size:26px;line-height:1.15;letter-spacing:-.03em";

        var text = document.createElement("p");
        text.style.cssText = "margin:0;color:#c9c2b6;font-size:15px;line-height:1.45";

        var dots = document.createElement("div");
        dots.style.cssText = "display:flex;gap:6px;justify-content:center;padding-top:2px";

        var actions = document.createElement("div");
        actions.style.cssText = "display:flex;gap:10px";

        var skip = document.createElement("button");
        skip.type = "button";
        skip.textContent = "Пропустить";
        skip.style.cssText = "flex:1;min-height:46px;border:0;border-radius:14px;background:transparent;color:#c9c2b6;font-weight:800";

        var next = document.createElement("button");
        next.type = "button";
        next.style.cssText = "flex:1.4;min-height:46px;border:0;border-radius:14px;background:linear-gradient(180deg,#f0d7a2,#d7b56a);color:#2a1d08;font-weight:800";

        function paintDots() {
            dots.innerHTML = slides.map(function (_, i) {
                var on = i === index;
                return "<span style=\"width:" + (on ? "18px" : "7px") + ";height:7px;border-radius:99px;background:" +
                    (on ? "#e8cc96" : "rgba(255,255,255,.18)") + "\"></span>";
            }).join("");
        }

        function paint() {
            var slide = slides[index];
            kicker.textContent = slide.kicker;
            title.textContent = slide.title;
            text.textContent = slide.text;
            next.textContent = index === slides.length - 1 ? "Разрешить и начать" : "Дальше";
            paintDots();
        }

        function finish(askNotify) {
            storageSet(TOUR_KEY, "1");
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            if (askNotify && "Notification" in window && Notification.permission === "default") {
                Notification.requestPermission().catch(function () {});
            }
        }

        next.addEventListener("click", function () {
            if (index < slides.length - 1) {
                index += 1;
                paint();
                return;
            }
            finish(true);
        });
        skip.addEventListener("click", function () {
            finish(false);
        });

        card.appendChild(kicker);
        card.appendChild(title);
        card.appendChild(text);
        card.appendChild(dots);
        actions.appendChild(skip);
        actions.appendChild(next);
        card.appendChild(actions);
        overlay.appendChild(card);
        document.body.appendChild(overlay);
        paint();
    }

    showSplash(showTour);
})();
