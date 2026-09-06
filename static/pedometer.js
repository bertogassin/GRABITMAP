(function () {
    const root = document.getElementById("rm-steps");
    if (!root) return;

    const STORAGE_KEY = "resursmap:steps";
    const LISTEN_KEY = "resursmap:steps-listen";
    const CIRC = 2 * Math.PI * 78;
    const DEFAULT_GOAL = 10000;
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
    const listenBtn = document.getElementById("rm-step-listen");
    const logEl = document.getElementById("rm-step-log");
    const dayCard = document.getElementById("rm-step-day");
    const dayDate = document.getElementById("rm-step-day-date");
    const daySteps = document.getElementById("rm-step-day-steps");
    const dayMeta = document.getElementById("rm-step-day-meta");
    const addForm = document.getElementById("rm-step-add-form");
    const addInput = document.getElementById("rm-step-add-input");
    const goalForm = document.getElementById("rm-step-goal-form");
    const goalInput = document.getElementById("rm-step-goal");

    let snapshot = null;
    let localToday = localDate();
    let localCount = 0;
    let listening = false;
    let lastMag = 0;
    let lastStepAt = 0;
    let syncTimer = 0;
    let pendingSync = 0;
    let wakeLock = null;

    function localDate() {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return now.getFullYear() + "-" + month + "-" + day;
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
        const month = Number(parts[1]) - 1;
        return Number(parts[2]) + " " + (MONTHS[month] || "") + " " + parts[0];
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

    function listenWanted() {
        try {
            return localStorage.getItem(LISTEN_KEY) === "1";
        } catch (e) {
            return false;
        }
    }

    function setListenWanted(on) {
        try {
            if (on) localStorage.setItem(LISTEN_KEY, "1");
            else localStorage.removeItem(LISTEN_KEY);
        } catch (e) {}
    }

    function ringOffset(steps, goal) {
        const ratio = goal > 0 ? Math.min(1, steps / goal) : 0;
        return CIRC * (1 - ratio);
    }

    function dayStepsFor(date) {
        if (!snapshot || !snapshot.days) return 0;
        const found = snapshot.days.find(function (day) { return day.date === date; });
        return found ? found.steps : 0;
    }

    function applySnapshot(data) {
        if (!data || !data.ok) return;
        snapshot = data;
        const today = data.days.find(function (day) { return day.date === localToday; });
        const serverToday = today ? today.steps : (data.today === localToday ? data.today_steps : 0);
        localCount = Math.max(localCount, serverToday);
        writeLocal();
        paint();
        maybeGoalNotice();
    }

    function paint() {
        const goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        if (todayCount) todayCount.textContent = String(localCount);
        if (todayCaption) todayCaption.textContent = "из " + goal + " сегодня";
        if (ring) ring.setAttribute("stroke-dashoffset", String(ringOffset(localCount, goal)));
        if (streakEl && snapshot) streakEl.textContent = String(snapshot.streak);
        if (bestEl && snapshot) bestEl.textContent = snapshot.best_steps > 0 ? String(snapshot.best_steps) : "—";
        if (lifeEl && snapshot) {
            lifeEl.textContent = ruCount(snapshot.lifetime, "шаг", "шага", "шагов");
        }
        if (goalInput && snapshot) goalInput.value = String(snapshot.goal);
        if (!snapshot) return;

        root.querySelectorAll("[data-date]").forEach(function (node) {
            const date = node.getAttribute("data-date");
            const steps = date === localToday ? localCount : dayStepsFor(date);
            const strong = node.querySelector("strong");
            if (strong) strong.textContent = String(steps);
            node.classList.remove("is-none", "is-low", "is-mid", "is-high", "is-goal");
            node.classList.add("is-" + tone(steps, goal));
        });

        if (!logEl) return;
        if (!snapshot.log.length) {
            logEl.innerHTML = "<li class=\"rm-step-empty\">Пока пусто</li>";
        } else {
            logEl.innerHTML = snapshot.log.map(function (entry) {
                const source = entry.source === "sensor" ? "телефон" : "вручную";
                return "<li><strong>+" + entry.delta + "</strong><span>" +
                    humanDate(entry.date) + " · " + source + "</span></li>";
            }).join("");
        }
    }

    function openDay(date) {
        if (!dayCard || !date) return;
        const steps = date === localToday ? localCount : dayStepsFor(date);
        dayCard.classList.add("is-open");
        if (dayDate) dayDate.textContent = humanDate(date);
        if (daySteps) daySteps.textContent = ruCount(steps, "шаг", "шага", "шагов");
        if (dayMeta) {
            dayMeta.textContent = km(steps) + " км";
        }
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
        if (!force && pendingSync < 20) return;
        pendingSync = 0;
        const data = await send({
            date: localToday,
            steps: localCount,
            source: "sensor"
        });
        if (data) applySnapshot(data);
    }

    async function addManual(delta) {
        const value = Math.floor(Number(delta) || 0);
        if (value < 1) return;
        const previous = localCount;
        localCount += value;
        writeLocal();
        paint();
        const data = await send({
            date: localToday,
            add: value,
            source: "manual"
        });
        if (data) {
            applySnapshot(data);
            return;
        }
        localCount = previous;
        writeLocal();
        paint();
    }

    function onMotion(event) {
        const acc = event.accelerationIncludingGravity || event.acceleration;
        if (!acc) return;
        const mag = Math.sqrt(
            (acc.x || 0) * (acc.x || 0) +
            (acc.y || 0) * (acc.y || 0) +
            (acc.z || 0) * (acc.z || 0)
        ) / 9.81;
        if (lastMag && mag > 1.18 && lastMag < 1.18) {
            const now = Date.now();
            if (now - lastStepAt >= 280) {
                lastStepAt = now;
                localCount += 1;
                pendingSync += 1;
                writeLocal();
                paint();
                if (localCount % 100 === 0 && navigator.vibrate) {
                    navigator.vibrate(12);
                }
                if (pendingSync >= 20) syncSensor(false);
            }
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

    function releaseScreen() {
        if (wakeLock) {
            wakeLock.release().catch(function () {});
            wakeLock = null;
        }
    }

    function startListen() {
        if (listening) return;
        window.addEventListener("devicemotion", onMotion, { passive: true });
        listening = true;
        setListenWanted(true);
        if (listenBtn) {
            listenBtn.classList.add("is-on");
            listenBtn.textContent = "Стоп";
        }
        setStatus("Считаем шаги.");
        holdScreen();
        syncTimer = window.setInterval(function () { syncSensor(false); }, 8000);
        syncSensor(true);
    }

    function stopListen() {
        window.removeEventListener("devicemotion", onMotion);
        listening = false;
        setListenWanted(false);
        if (listenBtn) {
            listenBtn.classList.remove("is-on");
            listenBtn.textContent = "Считать шаги";
        }
        setStatus("Счёт остановлен.");
        window.clearInterval(syncTimer);
        releaseScreen();
        syncSensor(true);
    }

    async function requestListen() {
        if (listening) {
            stopListen();
            return;
        }
        try {
            if (typeof DeviceMotionEvent !== "undefined" &&
                typeof DeviceMotionEvent.requestPermission === "function") {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission !== "granted") {
                    setStatus("Нет доступа к датчику. Добавляйте шаги кнопками.");
                    return;
                }
            }
            startListen();
        } catch (e) {
            setStatus("Датчик недоступен. Добавляйте шаги кнопками.");
        }
    }

    function maybeGoalNotice() {
        if (localCount < DEFAULT_GOAL) return;
        if (statusEl && listening) {
            setStatus("Цель 10 000 есть. Можно искать работу.");
        }
    }

    function bindClicks() {
        root.addEventListener("click", function (event) {
            const chip = event.target.closest("[data-add]");
            if (chip) {
                addManual(chip.getAttribute("data-add"));
                return;
            }
            const day = event.target.closest("[data-date]");
            if (day) openDay(day.getAttribute("data-date"));
        });
        if (listenBtn) listenBtn.addEventListener("click", requestListen);
        if (addForm) {
            addForm.addEventListener("submit", function (event) {
                event.preventDefault();
                addManual(addInput.value);
                addInput.value = "";
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
        window.addEventListener("pagehide", function () { syncSensor(true); });
        window.addEventListener("online", function () { syncSensor(true); });
    }

    async function boot() {
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
        } catch (e) {
            setStatus("Нет сети. Шаги пока на этом телефоне.");
        }
        if (localCount > 0) syncSensor(true);
        if (listenWanted()) {
            requestListen();
        } else {
            setStatus("Нажмите «Считать шаги».");
        }
    }

    boot();
})();
