(function () {
    const root = document.getElementById("rm-steps");
    if (!root) return;

    const STORAGE_KEY = "resursmap:steps";
    const ARMED_KEY = "resursmap:steps:armed";
    const CIRC = 2 * Math.PI * 46;
    const DEFAULT_GOAL = 10000;

    const todayCount = document.getElementById("rm-step-today-count");
    const todayCaption = document.getElementById("rm-step-today-caption");
    const pctEl = document.getElementById("rm-step-pct");
    const kmEl = document.getElementById("rm-step-km");
    const ring = document.getElementById("rm-step-ring");
    const streakEl = document.getElementById("rm-step-streak");
    const bestEl = document.getElementById("rm-step-best");
    const lifeEl = document.getElementById("rm-step-life");
    const statusEl = document.getElementById("rm-step-status");
    const monthsEl = document.getElementById("rm-step-months");
    const weekEl = document.getElementById("rm-step-week");
    const logEl = document.getElementById("rm-step-log");
    const dayCard = document.getElementById("rm-step-day");
    const dayDate = document.getElementById("rm-step-day-date");
    const daySteps = document.getElementById("rm-step-day-steps");
    const dayMeta = document.getElementById("rm-step-day-meta");
    const goalForm = document.getElementById("rm-step-goal-form");
    const goalInput = document.getElementById("rm-step-goal");
    const pinBtn = document.getElementById("rm-step-pin");

    let snapshot = null;
    let localToday = localDate();
    let localCount = 0;
    let listening = false;
    let lastMag = 0;
    let peakMag = 0;
    let lastStepAt = 0;
    let syncTimer = 0;
    let pendingSync = 0;
    let motionTicks = 0;
    let wakeLock = null;
    let lastPanelAt = 0;
    let lastPanelCount = -1;

    function t(key, fallback) {
        if (window.m && typeof window.m[key] === "function") {
            try {
                return window.m[key]();
            } catch (_) {}
        }
        if (typeof window.rmT === "function") {
            var translated = window.rmT(key);
            if (translated && translated !== key) return translated;
        }
        return fallback;
    }

    function tf(key, fallback, params) {
        var template = t(key, fallback);
        return String(template).replace(/\{(\w+)\}/g, function (_, name) {
            return params && params[name] != null ? String(params[name]) : "";
        });
    }

    function localeTag() {
        try {
            return (window.__RM_I18N && window.__RM_I18N.locale) ||
                (document.documentElement.lang) ||
                "ru";
        } catch (_) {
            return "ru";
        }
    }

    function localDate() {
        const now = new Date();
        return now.getFullYear() + "-" +
            String(now.getMonth() + 1).padStart(2, "0") + "-" +
            String(now.getDate()).padStart(2, "0");
    }

    function stepWord(n) {
        const abs = Math.abs(n) % 100;
        const last = abs % 10;
        let key = "steps_word_many";
        if (!(abs > 10 && abs < 20)) {
            if (last === 1) key = "steps_word_one";
            else if (last >= 2 && last <= 4) key = "steps_word_few";
        }
        return t(key, key === "steps_word_one" ? "шаг" : "шагов");
    }

    function stepCountLabel(n) {
        return n + " " + stepWord(n);
    }

    function weekdayLabels() {
        try {
            const fmt = new Intl.DateTimeFormat(localeTag(), { weekday: "short" });
            // Monday-based week
            const base = new Date(Date.UTC(2024, 0, 1)); // Monday
            const labels = [];
            for (let i = 0; i < 7; i += 1) {
                const d = new Date(base);
                d.setUTCDate(base.getUTCDate() + i);
                labels.push(fmt.format(d));
            }
            return labels;
        } catch (_) {
            return ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        }
    }

    function humanDate(value) {
        const parts = String(value || "").split("-");
        if (parts.length !== 3) return value;
        try {
            const date = new Date(
                Number(parts[0]),
                Number(parts[1]) - 1,
                Number(parts[2])
            );
            return new Intl.DateTimeFormat(localeTag(), {
                day: "numeric",
                month: "long",
                year: "numeric"
            }).format(date);
        } catch (_) {
            return value;
        }
    }

    function km(steps) {
        return ((Number(steps) || 0) * 0.75 / 1000).toFixed(1);
    }

    function tone(steps, goal) {
        if (steps <= 0) return "none";
        if (steps >= goal) return "goal";
        if (steps >= goal * 3 / 4) return "high";
        if (steps >= goal / 2) return "mid";
        return "low";
    }

    function setStatus(text) {
        if (statusEl) statusEl.textContent = text;
    }

    function markArmed() {
        try {
            localStorage.setItem(ARMED_KEY, "1");
        } catch (_) {}
    }

    function canSenseOnThisDevice() {
        if (typeof DeviceMotionEvent === "undefined") return false;
        if (typeof DeviceMotionEvent.requestPermission === "function") return true;
        return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");
    }

    function notifyReady() {
        return "Notification" in window && Notification.permission === "granted";
    }

    function readLocal() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const data = JSON.parse(raw);
            if (data && data.date === localToday && typeof data.count === "number") {
                localCount = Math.max(0, Math.floor(data.count));
            }
        } catch (_) {}
    }

    function writeLocal() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                date: localToday,
                count: localCount,
                goal: snapshot ? snapshot.goal : DEFAULT_GOAL,
                updatedAt: Date.now()
            }));
        } catch (_) {}
    }

    function ringOffset(steps, goal) {
        const ratio = goal > 0 ? Math.min(1, steps / goal) : 0;
        return CIRC * (1 - ratio);
    }

    function dayStepsFor(date) {
        if (date === localToday) return localCount;
        if (!snapshot || !Array.isArray(snapshot.days)) return 0;
        const found = snapshot.days.find(function (day) { return day.date === date; });
        return found ? found.steps : 0;
    }

    function serverTodaySteps() {
        if (!snapshot) return 0;
        if (Array.isArray(snapshot.days)) {
            const found = snapshot.days.find(function (day) { return day.date === localToday; });
            if (found) return found.steps;
        }
        return snapshot.today === localToday ? (snapshot.today_steps || 0) : 0;
    }

    function updateLivePanel(force) {
        if (!notifyReady()) return;
        const goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        const now = Date.now();
        if (!force) {
            if (localCount === lastPanelCount && now - lastPanelAt < 15000) return;
            if (now - lastPanelAt < 4000 && Math.abs(localCount - lastPanelCount) < 12) return;
        }
        lastPanelAt = now;
        lastPanelCount = localCount;
        const pct = goal > 0 ? Math.min(999, Math.round((localCount / goal) * 100)) : 0;
        const title = localCount + " / " + goal;
        const body = tf(
            "steps_live_body",
            "{pct}% · {km} km · goal {goal}",
            { pct: pct, km: km(localCount), goal: goal }
        );
        const options = {
            body: body,
            icon: "/static/app-icon-192.png",
            badge: "/static/app-icon-192.png",
            tag: "grabit-steps-live",
            renotify: true,
            silent: true,
            data: { url: "/app/steps" }
        };
        if (navigator.serviceWorker && navigator.serviceWorker.ready) {
            navigator.serviceWorker.ready.then(function (reg) {
                return reg.showNotification(title, options);
            }).catch(function () {});
            return;
        }
        try {
            new Notification(title, options);
        } catch (_) {}
    }

    function requestPanelPermission() {
        if (!("Notification" in window)) {
            setStatus(t("steps_keep_panel", "Панель на телефоне обновляется сама"));
            return Promise.resolve(false);
        }
        if (Notification.permission === "granted") {
            updateLivePanel(true);
            setStatus(t("steps_keep_panel", "Панель на телефоне обновляется сама — сюда можно реже заходить"));
            return Promise.resolve(true);
        }
        if (Notification.permission === "denied") {
            setStatus(t("steps_need_motion", "Нужен доступ к движению телефона"));
            return Promise.resolve(false);
        }
        return Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                updateLivePanel(true);
                setStatus(t("steps_keep_panel", "Панель на телефоне обновляется сама — сюда можно реже заходить"));
                return true;
            }
            return false;
        }).catch(function () {
            return false;
        });
    }

    function applySnapshot(data) {
        if (!data || !data.ok) return;
        snapshot = data;
        if (!Array.isArray(snapshot.days)) snapshot.days = [];
        if (!Array.isArray(snapshot.log)) snapshot.log = [];
        localCount = Math.max(localCount, serverTodaySteps());
        writeLocal();
        paint();
        maybeGoalNotice();
        updateLivePanel(false);
    }

    function fillCell(button, date, steps, goal) {
        button.className = "rm-step-cell is-" + tone(steps, goal) +
            (date === localToday ? " is-today" : "") +
            (date > localToday ? " is-future" : "");
        button.setAttribute("data-date", date);
        button.title = humanDate(date) + " · " + stepCountLabel(steps);
        button.textContent = String(Number(date.slice(8, 10)));
    }

    function updateYearCalendar() {
        if (!monthsEl) return;
        const goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        monthsEl.querySelectorAll(".rm-step-month").forEach(function (article) {
            let walked = 0;
            let total = 0;
            article.querySelectorAll("button[data-date]").forEach(function (button) {
                const date = button.getAttribute("data-date");
                const steps = dayStepsFor(date);
                if (steps > 0) {
                    walked += 1;
                    total += steps;
                }
                fillCell(button, date, steps, goal);
            });
            const meta = article.querySelector("[data-month-meta]");
            if (meta) {
                meta.textContent = walked + " · " + stepCountLabel(total);
            }
            const title = article.querySelector("[data-month-title]");
            const key = article.getAttribute("data-month") || "";
            if (title && key.length >= 7) {
                try {
                    const y = Number(key.slice(0, 4));
                    const m = Number(key.slice(5, 7)) - 1;
                    title.textContent = new Intl.DateTimeFormat(localeTag(), {
                        month: "long"
                    }).format(new Date(y, m, 1));
                } catch (_) {}
            }
        });
    }

    function weekDates() {
        const today = new Date(
            Number(localToday.slice(0, 4)),
            Number(localToday.slice(5, 7)) - 1,
            Number(localToday.slice(8, 10))
        );
        const monday = new Date(today);
        monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const dateObj = new Date(monday);
            dateObj.setDate(monday.getDate() + i);
            dates.push(
                dateObj.getFullYear() + "-" +
                String(dateObj.getMonth() + 1).padStart(2, "0") + "-" +
                String(dateObj.getDate()).padStart(2, "0")
            );
        }
        return dates;
    }

    function renderWeek() {
        if (!weekEl) return;
        const goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        const dates = weekDates();
        const labels = weekdayLabels();
        const existing = weekEl.querySelectorAll(".rm-step-bead[data-date]");
        if (existing.length === 7) {
            existing.forEach(function (node, i) {
                const date = dates[i];
                const steps = dayStepsFor(date);
                node.setAttribute("data-date", date);
                node.className = "rm-step-bead is-" + tone(steps, goal) +
                    (date === localToday ? " is-today" : "");
                const em = node.querySelector("em");
                const strong = node.querySelector("strong");
                if (em) em.textContent = labels[i];
                if (strong) strong.textContent = String(steps);
            });
            return;
        }
        weekEl.innerHTML = dates.map(function (date, i) {
            const steps = dayStepsFor(date);
            return "<button type=\"button\" class=\"rm-step-bead is-" + tone(steps, goal) +
                (date === localToday ? " is-today" : "") +
                "\" data-date=\"" + date + "\"><em>" + labels[i] +
                "</em><strong>" + steps + "</strong></button>";
        }).join("");
    }

    function paint() {
        const goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        const extra = Math.max(0, localCount - serverTodaySteps());
        const pct = goal > 0 ? Math.min(999, Math.round((localCount / goal) * 100)) : 0;
        if (todayCount) todayCount.textContent = String(localCount);
        if (todayCaption) {
            todayCaption.textContent = tf("steps_of_goal", "из {goal}", { goal: goal });
        }
        if (pctEl) {
            pctEl.textContent = tf("steps_today_pct", "{pct}% сегодня", { pct: pct });
        }
        if (kmEl) kmEl.textContent = km(localCount) + " km";
        if (ring) ring.setAttribute("stroke-dashoffset", String(ringOffset(localCount, goal)));
        if (streakEl && snapshot) streakEl.textContent = String(snapshot.streak || 0);
        if (bestEl && snapshot) {
            const best = Math.max(snapshot.best_steps || 0, localCount);
            bestEl.textContent = best > 0 ? String(best) : "—";
        }
        if (lifeEl && snapshot) {
            lifeEl.textContent = String((snapshot.lifetime || 0) + extra);
        }
        if (goalInput && snapshot) goalInput.value = String(snapshot.goal);
        updateYearCalendar();
        renderWeek();
        if (!logEl) return;
        if (!snapshot || !snapshot.log.length) {
            logEl.innerHTML = "<li class=\"rm-step-empty\">" +
                t("steps_empty", "Пока пусто") + "</li>";
        } else {
            logEl.innerHTML = snapshot.log.map(function (entry) {
                return "<li><strong>+" + entry.delta + "</strong><span>" +
                    humanDate(entry.date) + "</span></li>";
            }).join("");
        }
    }

    function openDay(date) {
        if (!dayCard || !date) return;
        const steps = dayStepsFor(date);
        dayCard.classList.add("is-open");
        if (dayDate) dayDate.textContent = humanDate(date);
        if (daySteps) daySteps.textContent = stepCountLabel(steps);
        if (dayMeta) dayMeta.textContent = km(steps) + " km";
    }

    async function send(body) {
        const response = await fetch("/api/steps", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            if (response.status === 401) {
                setStatus(t("common_login", "Войти"));
            } else {
                setStatus(t("chat_history_error", "Не удалось сохранить."));
            }
            return null;
        }
        return response.json();
    }

    async function syncSensor(force) {
        if (!force && pendingSync < 8) return;
        pendingSync = 0;
        const data = await send({
            date: localToday,
            steps: localCount,
            source: "sensor"
        });
        if (data) applySnapshot(data);
    }

    function registerStep() {
        const now = Date.now();
        if (now - lastStepAt < 320) return;
        lastStepAt = now;
        localCount += 1;
        pendingSync += 1;
        writeLocal();
        paint();
        if (localCount % 25 === 0) updateLivePanel(false);
        if (localCount % 100 === 0 && navigator.vibrate) {
            navigator.vibrate(12);
        }
        if (pendingSync >= 8) syncSensor(false);
    }

    function onMotion(event) {
        const acc = event.accelerationIncludingGravity || event.acceleration;
        if (!acc) return;
        motionTicks += 1;
        const mag = Math.sqrt(
            (acc.x || 0) * (acc.x || 0) +
            (acc.y || 0) * (acc.y || 0) +
            (acc.z || 0) * (acc.z || 0)
        ) / 9.81;
        if (mag > peakMag) peakMag = mag;
        if (lastMag && peakMag > 1.22 && mag < 1.04 && lastMag >= 1.04) {
            registerStep();
            peakMag = 0;
        }
        lastMag = mag;
    }

    async function holdScreen() {
        if (!("wakeLock" in navigator) || !listening) return;
        try {
            wakeLock = await navigator.wakeLock.request("screen");
            wakeLock.addEventListener("release", function () {
                wakeLock = null;
            });
        } catch (_) {}
    }

    function startListen() {
        if (listening) return;
        window.addEventListener("devicemotion", onMotion, { passive: true });
        listening = true;
        markArmed();
        setStatus(t("steps_counting", "Считаем шаги с телефона"));
        holdScreen();
        if (!syncTimer) {
            syncTimer = window.setInterval(function () {
                syncSensor(false);
                updateLivePanel(false);
            }, 8000);
        }
        syncSensor(true);
        updateLivePanel(true);
        window.setTimeout(function () {
            if (listening && motionTicks < 4 && localCount === serverTodaySteps()) {
                setStatus(t(
                    "steps_sensor_quiet",
                    "Датчик молчит. Держите экран открытым или установите ярлык."
                ));
            }
        }, 4000);
    }

    async function requestListen() {
        if (listening) return;
        if (!canSenseOnThisDevice()) {
            setStatus(t(
                "steps_desktop",
                "На компьютере шаги не считаются. Откройте на телефоне."
            ));
            return;
        }
        try {
            if (typeof DeviceMotionEvent.requestPermission === "function") {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission !== "granted") {
                    setStatus(t("steps_need_motion", "Нужен доступ к движению телефона"));
                    return;
                }
            }
            startListen();
        } catch (_) {
            setStatus(t(
                "steps_desktop",
                "На компьютере шаги не считаются. Откройте на телефоне."
            ));
        }
    }

    function maybeGoalNotice() {
        const goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        if (localCount < goal) return;
        if (statusEl && listening) {
            setStatus(t("steps_goal_done", "Цель дня есть"));
        }
        updateLivePanel(true);
    }

    function bindClicks() {
        root.addEventListener("click", function (event) {
            const day = event.target.closest("[data-date]");
            if (day) openDay(day.getAttribute("data-date"));
        });
        if (pinBtn) {
            pinBtn.addEventListener("click", function () {
                requestPanelPermission().then(function () {
                    requestListen();
                });
            });
        }
        if (goalForm) {
            goalForm.addEventListener("submit", async function (event) {
                event.preventDefault();
                const data = await send({
                    date: localToday,
                    goal: Number(goalInput.value || DEFAULT_GOAL)
                });
                if (data) {
                    applySnapshot(data);
                    setStatus(t("steps_goal_updated", "Цель обновлена"));
                    updateLivePanel(true);
                }
            });
        }
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                syncSensor(true);
                updateLivePanel(true);
            } else if (listening) {
                holdScreen();
                syncSensor(true);
            }
        });
        document.addEventListener("freeze", function () { syncSensor(true); });
        window.addEventListener("pagehide", function () { syncSensor(true); });
        window.addEventListener("online", function () { syncSensor(true); });
    }

    async function boot() {
        if (navigator.storage && navigator.storage.persist) {
            navigator.storage.persist().catch(function () {});
        }
        readLocal();
        paint();
        bindClicks();
        try {
            const response = await fetch("/api/steps?today=" + encodeURIComponent(localToday), {
                credentials: "same-origin"
            });
            if (response.ok) {
                const data = await response.json();
                applySnapshot(data);
            }
        } catch (_) {
            setStatus(t("chat_no_network", "Нет сети"));
        }
        if (localCount > 0) syncSensor(true);
        if (notifyReady()) updateLivePanel(true);
        requestListen();
        document.addEventListener("pointerdown", function () {
            requestListen();
        }, { once: true, passive: true });
    }

    boot();
})();
