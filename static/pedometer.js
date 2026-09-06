(function () {
    const root = document.getElementById("rm-steps");
    if (!root) return;

    const STORAGE_KEY = "resursmap:steps";
    const CIRC = 2 * Math.PI * 78;
    const DEFAULT_GOAL = 10000;
    const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const MONTHS = [
        "январь", "февраль", "март", "апрель", "май", "июнь",
        "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"
    ];

    const todayCount = document.getElementById("rm-step-today-count");
    const todayCaption = document.getElementById("rm-step-today-caption");
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
    const monthPrev = document.getElementById("rm-step-month-prev");
    const monthNext = document.getElementById("rm-step-month-next");
    const monthLabel = document.getElementById("rm-step-month-label");
    const monthMeta = document.getElementById("rm-step-month-meta");
    const monthGrid = document.getElementById("rm-step-month-grid");

    let snapshot = null;
    let localToday = localDate();
    let viewMonth = localToday.slice(0, 7);
    let localCount = 0;
    let listening = false;
    let lastMag = 0;
    let peakMag = 0;
    let lastStepAt = 0;
    let syncTimer = 0;
    let pendingSync = 0;
    let motionTicks = 0;
    let wakeLock = null;

    function localDate() {
        const now = new Date();
        return now.getFullYear() + "-" +
            String(now.getMonth() + 1).padStart(2, "0") + "-" +
            String(now.getDate()).padStart(2, "0");
    }

    function shiftMonth(key, delta) {
        const year = Number(key.slice(0, 4));
        const month = Number(key.slice(5, 7)) + delta;
        const date = new Date(year, month - 1, 1);
        return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0");
    }

    function ruCount(n, one, few, many) {
        const abs = Math.abs(n) % 100;
        const last = abs % 10;
        let word = many;
        if (abs > 10 && abs < 20) word = many;
        else if (last === 1) word = one;
        else if (last >= 2 && last <= 4) word = few;
        return n + " " + word;
    }

    function humanDate(value) {
        const parts = String(value || "").split("-");
        if (parts.length !== 3) return value;
        return Number(parts[2]) + " " + (MONTHS[Number(parts[1]) - 1] || "") + " " + parts[0];
    }

    function km(steps) {
        return ((Number(steps) || 0) * 0.75 / 1000).toFixed(1);
    }

    function tone(steps, goal) {
        if (steps <= 0) return "none";
        if (steps >= goal) return "goal";
        if (steps >= goal * 3 / 4) return "high";
        if (steps >= goal / 3) return "mid";
        return "low";
    }

    function setStatus(text) {
        if (statusEl) statusEl.textContent = text;
    }

    function canSenseOnThisDevice() {
        if (typeof DeviceMotionEvent === "undefined") return false;
        if (typeof DeviceMotionEvent.requestPermission === "function") return true;
        return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");
    }

    function readLocal() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const data = JSON.parse(raw);
            if (data && data.date === localToday && typeof data.count === "number") {
                localCount = Math.max(0, Math.floor(data.count));
            }
        } catch (e) {}
    }

    function writeLocal() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                date: localToday,
                count: localCount
            }));
        } catch (e) {}
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

    function monthHasSteps(key) {
        if (!snapshot || !Array.isArray(snapshot.days)) return false;
        return snapshot.days.some(function (day) {
            return day.steps > 0 && String(day.date).slice(0, 7) === key;
        });
    }

    function canOpenMonth(key) {
        const thisMonth = localToday.slice(0, 7);
        const yearStart = localToday.slice(0, 4) + "-01";
        if (key > thisMonth) return false;
        if (key >= yearStart) return true;
        return monthHasSteps(key);
    }

    function previousOpenMonth(key) {
        let cursor = shiftMonth(key, -1);
        for (let i = 0; i < 48; i++) {
            if (canOpenMonth(cursor)) return cursor;
            if (monthHasSteps(cursor)) return cursor;
            cursor = shiftMonth(cursor, -1);
        }
        return "";
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
    }

    function fillCell(button, date, steps, goal) {
        button.className = "rm-step-cell is-" + tone(steps, goal) +
            (date === localToday ? " is-today" : "") +
            (date > localToday ? " is-future" : "");
        button.setAttribute("data-date", date);
        button.title = humanDate(date) + " · " + ruCount(steps, "шаг", "шага", "шагов");
        button.textContent = String(Number(date.slice(8, 10)));
    }

    function renderMonth(key) {
        if (!monthGrid || !monthLabel || !monthMeta) return;
        const goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        const year = Number(key.slice(0, 4));
        const month = Number(key.slice(5, 7));
        const first = new Date(year, month - 1, 1);
        const pad = (first.getDay() + 6) % 7;
        const lastDay = new Date(year, month, 0).getDate();
        let walked = 0;
        let total = 0;
        let html = "";
        for (let i = 0; i < pad; i++) {
            html += "<span class=\"rm-step-cell is-pad\" aria-hidden=\"true\"></span>";
        }
        for (let day = 1; day <= lastDay; day++) {
            const date = key + "-" + String(day).padStart(2, "0");
            const steps = dayStepsFor(date);
            if (steps > 0) {
                walked += 1;
                total += steps;
            }
            html += "<button type=\"button\" class=\"rm-step-cell\"></button>";
        }
        monthGrid.innerHTML = html;
        const buttons = monthGrid.querySelectorAll("button");
        buttons.forEach(function (button, index) {
            const day = index + 1;
            const date = key + "-" + String(day).padStart(2, "0");
            fillCell(button, date, dayStepsFor(date), goal);
        });
        monthLabel.textContent = (MONTHS[month - 1] || "") + " " + year;
        monthMeta.textContent = ruCount(walked, "день", "дня", "дней") + " · " +
            ruCount(total, "шаг", "шага", "шагов");
        if (monthsEl) {
            const article = monthsEl.querySelector(".rm-step-month");
            if (article) article.setAttribute("data-month", key);
        }
        if (monthPrev) monthPrev.disabled = !previousOpenMonth(key);
        if (monthNext) monthNext.disabled = key >= localToday.slice(0, 7);
    }

    function updateOpenMonth() {
        if (!monthGrid) return;
        const article = monthsEl && monthsEl.querySelector(".rm-step-month");
        const key = (article && article.getAttribute("data-month")) || viewMonth;
        if (key !== viewMonth) {
            renderMonth(viewMonth);
            return;
        }
        const goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        let walked = 0;
        let total = 0;
        monthGrid.querySelectorAll("button[data-date]").forEach(function (button) {
            const date = button.getAttribute("data-date");
            const steps = dayStepsFor(date);
            if (steps > 0) {
                walked += 1;
                total += steps;
            }
            fillCell(button, date, steps, goal);
        });
        if (monthMeta) {
            monthMeta.textContent = ruCount(walked, "день", "дня", "дней") + " · " +
                ruCount(total, "шаг", "шага", "шагов");
        }
        if (monthPrev) monthPrev.disabled = !previousOpenMonth(viewMonth);
        if (monthNext) monthNext.disabled = viewMonth >= localToday.slice(0, 7);
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
        const existing = weekEl.querySelectorAll(".rm-step-bead[data-date]");
        if (existing.length === 7) {
            existing.forEach(function (node, i) {
                const date = dates[i];
                const steps = dayStepsFor(date);
                node.setAttribute("data-date", date);
                node.className = "rm-step-bead is-" + tone(steps, goal) +
                    (date === localToday ? " is-today" : "");
                const strong = node.querySelector("strong");
                if (strong) strong.textContent = String(steps);
            });
            return;
        }
        weekEl.innerHTML = dates.map(function (date, i) {
            const steps = dayStepsFor(date);
            return "<button type=\"button\" class=\"rm-step-bead is-" + tone(steps, goal) +
                (date === localToday ? " is-today" : "") +
                "\" data-date=\"" + date + "\"><em>" + WEEKDAYS[i] +
                "</em><strong>" + steps + "</strong></button>";
        }).join("");
    }

    function paint(fullCalendar) {
        const goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        const extra = Math.max(0, localCount - serverTodaySteps());
        if (todayCount) todayCount.textContent = String(localCount);
        if (todayCaption) todayCaption.textContent = "из " + goal + " сегодня";
        if (ring) ring.setAttribute("stroke-dashoffset", String(ringOffset(localCount, goal)));
        if (streakEl && snapshot) streakEl.textContent = String(snapshot.streak || 0);
        if (bestEl && snapshot) {
            const best = Math.max(snapshot.best_steps || 0, localCount);
            bestEl.textContent = best > 0 ? String(best) : "—";
        }
        if (lifeEl && snapshot) {
            lifeEl.textContent = ruCount((snapshot.lifetime || 0) + extra, "шаг", "шага", "шагов");
        }
        if (goalInput && snapshot) goalInput.value = String(snapshot.goal);
        if (fullCalendar || !monthGrid || !monthGrid.querySelector("button[data-date]")) {
            renderMonth(viewMonth);
        } else {
            updateOpenMonth();
        }
        renderWeek();
        if (!logEl) return;
        if (!snapshot || !snapshot.log.length) {
            logEl.innerHTML = "<li class=\"rm-step-empty\">Пока пусто</li>";
        } else {
            logEl.innerHTML = snapshot.log.map(function (entry) {
                return "<li><strong>+" + entry.delta + "</strong><span>" +
                    humanDate(entry.date) + " · телефон</span></li>";
            }).join("");
        }
    }

    function openDay(date) {
        if (!dayCard || !date) return;
        const steps = dayStepsFor(date);
        dayCard.classList.add("is-open");
        if (dayDate) dayDate.textContent = humanDate(date);
        if (daySteps) daySteps.textContent = ruCount(steps, "шаг", "шага", "шагов");
        if (dayMeta) dayMeta.textContent = km(steps) + " км";
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
                setStatus("Войдите, чтобы сохранить шаги.");
            } else {
                setStatus("Не удалось сохранить.");
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
        paint(false);
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
        } catch (e) {}
    }

    function startListen() {
        if (listening) return;
        window.addEventListener("devicemotion", onMotion, { passive: true });
        listening = true;
        setStatus("Считаем шаги с телефона. Оставьте страницу открытой.");
        holdScreen();
        if (!syncTimer) {
            syncTimer = window.setInterval(function () { syncSensor(false); }, 8000);
        }
        syncSensor(true);
        window.setTimeout(function () {
            if (listening && motionTicks < 4 && localCount === serverTodaySteps()) {
                setStatus("Датчик молчит. Откройте шагомер на телефоне и не блокируйте экран.");
            }
        }, 4000);
    }

    async function requestListen() {
        if (listening) return;
        if (!canSenseOnThisDevice()) {
            setStatus("На компьютере шаги не считаются. Откройте шагомер на телефоне.");
            return;
        }
        try {
            if (typeof DeviceMotionEvent.requestPermission === "function") {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission !== "granted") {
                    setStatus("Нужен доступ к движению телефона.");
                    return;
                }
            }
            startListen();
        } catch (e) {
            setStatus("Датчик недоступен. Откройте шагомер на телефоне.");
        }
    }

    function maybeGoalNotice() {
        const goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        if (localCount < goal) return;
        if (statusEl && listening) {
            setStatus("Цель дня есть. Можно искать работу.");
        }
    }

    function bindClicks() {
        root.addEventListener("click", function (event) {
            const nav = event.target.closest(".rm-step-month-nav");
            if (nav) {
                event.preventDefault();
                if (nav.id === "rm-step-month-prev") {
                    const prev = previousOpenMonth(viewMonth);
                    if (prev) {
                        viewMonth = prev;
                        renderMonth(viewMonth);
                    }
                } else if (nav.id === "rm-step-month-next") {
                    const next = shiftMonth(viewMonth, 1);
                    if (canOpenMonth(next)) {
                        viewMonth = next;
                        renderMonth(viewMonth);
                    }
                }
                return;
            }
            const day = event.target.closest("[data-date]");
            if (day) openDay(day.getAttribute("data-date"));
        });
        if (goalForm) {
            goalForm.addEventListener("submit", async function (event) {
                event.preventDefault();
                const data = await send({
                    date: localToday,
                    goal: Number(goalInput.value || DEFAULT_GOAL)
                });
                if (data) {
                    applySnapshot(data);
                    setStatus("Цель обновлена.");
                }
            });
        }
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                syncSensor(true);
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
        paint(true);
        bindClicks();
        try {
            const response = await fetch("/api/steps?today=" + encodeURIComponent(localToday), {
                credentials: "same-origin"
            });
            if (response.ok) {
                const data = await response.json();
                applySnapshot(data);
            }
        } catch (e) {
            setStatus("Нет сети. Шаги пока на этом телефоне.");
        }
        if (localCount > 0) syncSensor(true);
        requestListen();
        document.addEventListener("pointerdown", function () {
            requestListen();
        }, { once: true, passive: true });
    }

    boot();
})();
