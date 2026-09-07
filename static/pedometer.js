(function () {
    "use strict";

    var root = document.getElementById("rm-steps");
    if (!root) return;

    var userKey = String(root.dataset.userKey || "").trim();
    var STORAGE_KEY = "grabit:steps:" + (userKey || "anonymous");
    var CIRC = 2 * Math.PI * 46;
    var DEFAULT_GOAL = 10000;
    var MIN_STEP_GAP_MS = 280;
    var SYNC_EVERY = 5;
    var PANEL_EVERY = 20;

    var todayCount = document.getElementById("rm-step-today-count");
    var todayCaption = document.getElementById("rm-step-today-caption");
    var pctEl = document.getElementById("rm-step-pct");
    var kmEl = document.getElementById("rm-step-km");
    var ring = document.getElementById("rm-step-ring");
    var streakEl = document.getElementById("rm-step-streak");
    var bestEl = document.getElementById("rm-step-best");
    var lifeEl = document.getElementById("rm-step-life");
    var statusEl = document.getElementById("rm-step-status");
    var weekEl = document.getElementById("rm-step-week");
    var dayCard = document.getElementById("rm-step-day");
    var dayDate = document.getElementById("rm-step-day-date");
    var daySteps = document.getElementById("rm-step-day-steps");
    var dayMeta = document.getElementById("rm-step-day-meta");
    var sensorLabel = document.getElementById("rm-step-sensor-label");

    var snapshot = null;
    var localToday = localDate();
    var localCount = 0;
    var listening = false;
    var gravityMag = 1;
    var motionPeak = 0;
    var motionFloor = 0.035;
    var motionMean = 0;
    var lastStepAt = 0;
    var syncTimer = 0;
    var pendingSync = 0;
    var motionTicks = 0;
    var wakeLock = null;
    var lastPanelAt = 0;
    var lastPanelCount = -1;

    function t(key, fallback, params) {
        if (window.m && typeof window.m[key] === "function") {
            try {
                return window.m[key](params || {});
            } catch (_) {}
        }
        if (typeof window.rmT === "function") {
            var translated = window.rmT(key, params);
            if (translated && translated !== key) return translated;
        }
        if (!params) return fallback;
        return String(fallback).replace(/\{(\w+)\}/g, function (_, name) {
            return params[name] != null ? String(params[name]) : "";
        });
    }

    function localeTag() {
        try {
            return (
                (window.__RM_I18N && window.__RM_I18N.locale) ||
                document.documentElement.lang ||
                "ru"
            );
        } catch (_) {
            return "ru";
        }
    }

    function localDate() {
        var now = new Date();
        return (
            now.getFullYear() +
            "-" +
            String(now.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(now.getDate()).padStart(2, "0")
        );
    }

    function stepWord(n) {
        var abs = Math.abs(n) % 100;
        var last = abs % 10;
        var key = "steps_word_many";
        if (!(abs > 10 && abs < 20)) {
            if (last === 1) key = "steps_word_one";
            else if (last >= 2 && last <= 4) key = "steps_word_few";
        }
        return t(key, key === "steps_word_one" ? "шаг" : "шагов");
    }

    function weekdayLabels() {
        try {
            var fmt = new Intl.DateTimeFormat(localeTag(), { weekday: "short" });
            var base = new Date(Date.UTC(2024, 0, 1));
            var labels = [];
            for (var i = 0; i < 7; i += 1) {
                var d = new Date(base);
                d.setUTCDate(base.getUTCDate() + i);
                labels.push(fmt.format(d));
            }
            return labels;
        } catch (_) {
            return ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        }
    }

    function humanDate(value) {
        var parts = String(value || "").split("-");
        if (parts.length !== 3) return value;
        try {
            return new Intl.DateTimeFormat(localeTag(), {
                day: "numeric",
                month: "long",
                year: "numeric",
            }).format(
                new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
            );
        } catch (_) {
            return value;
        }
    }

    function km(steps) {
        return (((Number(steps) || 0) * 0.75) / 1000).toFixed(1);
    }

    function tone(steps, goal) {
        if (steps <= 0) return "none";
        if (steps >= goal) return "goal";
        if (steps >= (goal * 3) / 4) return "high";
        if (steps >= goal / 2) return "mid";
        return "low";
    }

    function setStatus(text) {
        if (statusEl) statusEl.textContent = text;
    }

    function paintListeningState() {
        root.classList.toggle("is-listening", listening);
        if (sensorLabel) {
            sensorLabel.textContent = listening
                ? t("steps_sensor_active", "Датчик активен")
                : t("steps_sensor_ready", "Готов к запуску");
        }
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
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            var data = JSON.parse(raw);
            if (data && data.date === localToday && typeof data.count === "number") {
                localCount = Math.max(0, Math.floor(data.count));
            }
        } catch (_) {}
    }

    function writeLocal() {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    date: localToday,
                    count: localCount,
                    goal: snapshot ? snapshot.goal : DEFAULT_GOAL,
                    updatedAt: Date.now(),
                })
            );
        } catch (_) {}
    }

    function ringOffset(steps, goal) {
        var ratio = goal > 0 ? Math.min(1, steps / goal) : 0;
        return CIRC * (1 - ratio);
    }

    function dayStepsFor(date) {
        if (date === localToday) return localCount;
        if (!snapshot || !Array.isArray(snapshot.days)) return 0;
        var found = snapshot.days.find(function (day) {
            return day.date === date;
        });
        return found ? found.steps : 0;
    }

    function serverTodaySteps() {
        if (!snapshot) return 0;
        if (Array.isArray(snapshot.days)) {
            var found = snapshot.days.find(function (day) {
                return day.date === localToday;
            });
            if (found) return found.steps;
        }
        return snapshot.today === localToday ? snapshot.today_steps || 0 : 0;
    }

    function updateLivePanel(force) {
        if (!notifyReady()) return;
        var goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        var now = Date.now();
        if (!force) {
            if (localCount === lastPanelCount && now - lastPanelAt < 12000) return;
            if (now - lastPanelAt < 3000 && Math.abs(localCount - lastPanelCount) < 8) {
                return;
            }
        }
        lastPanelAt = now;
        lastPanelCount = localCount;
        var pct = goal > 0 ? Math.min(999, Math.round((localCount / goal) * 100)) : 0;
        var title = localCount + " / " + goal;
        var body = t("steps_live_body", "{pct}% · {km} км · цель {goal}", {
            pct: pct,
            km: km(localCount),
            goal: goal,
        });
        var options = {
            body: body,
            icon: "/static/app-icon-192.png",
            badge: "/static/app-icon-192.png",
            tag: "grabit-steps-live",
            renotify: true,
            silent: true,
            data: { url: "/app/steps" },
        };
        if (navigator.serviceWorker && navigator.serviceWorker.ready) {
            navigator.serviceWorker.ready
                .then(function (reg) {
                    return reg.showNotification(title, options);
                })
                .catch(function () {});
            return;
        }
        try {
            new Notification(title, options);
        } catch (_) {}
    }

    function applySnapshot(data) {
        if (!data || !data.ok) return;
        snapshot = data;
        if (!Array.isArray(snapshot.days)) snapshot.days = [];
        localCount = Math.max(localCount, serverTodaySteps());
        writeLocal();
        paint();
        if (localCount >= (snapshot.goal || DEFAULT_GOAL) && listening) {
            setStatus(t("steps_goal_done", "Цель дня есть"));
        }
        updateLivePanel(false);
    }

    function weekDates() {
        var today = new Date(
            Number(localToday.slice(0, 4)),
            Number(localToday.slice(5, 7)) - 1,
            Number(localToday.slice(8, 10))
        );
        var monday = new Date(today);
        monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
        var dates = [];
        for (var i = 0; i < 7; i += 1) {
            var dateObj = new Date(monday);
            dateObj.setDate(monday.getDate() + i);
            dates.push(
                dateObj.getFullYear() +
                    "-" +
                    String(dateObj.getMonth() + 1).padStart(2, "0") +
                    "-" +
                    String(dateObj.getDate()).padStart(2, "0")
            );
        }
        return dates;
    }

    function renderWeek() {
        if (!weekEl) return;
        var goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        var dates = weekDates();
        var labels = weekdayLabels();
        var existing = weekEl.querySelectorAll(".rm-step-bead[data-date]");
        if (existing.length === 7) {
            existing.forEach(function (node, i) {
                var date = dates[i];
                var steps = dayStepsFor(date);
                node.setAttribute("data-date", date);
                node.className =
                    "rm-step-bead is-" +
                    tone(steps, goal) +
                    (date === localToday ? " is-today" : "");
                var em = node.querySelector("em");
                var strong = node.querySelector("strong");
                if (em) em.textContent = labels[i];
                if (strong) strong.textContent = String(steps);
            });
            return;
        }
        weekEl.innerHTML = dates
            .map(function (date, i) {
                var steps = dayStepsFor(date);
                return (
                    '<button type="button" class="rm-step-bead is-' +
                    tone(steps, goal) +
                    (date === localToday ? " is-today" : "") +
                    '" data-date="' +
                    date +
                    '"><em>' +
                    labels[i] +
                    "</em><strong>" +
                    steps +
                    "</strong></button>"
                );
            })
            .join("");
    }

    function paint() {
        var goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        var extra = Math.max(0, localCount - serverTodaySteps());
        var pct = goal > 0 ? Math.min(999, Math.round((localCount / goal) * 100)) : 0;
        if (todayCount) todayCount.textContent = String(localCount);
        if (todayCaption) {
            todayCaption.textContent = t("steps_of_goal", "из {goal}", { goal: goal });
        }
        if (pctEl) {
            pctEl.textContent = t("steps_today_pct", "{pct}% сегодня", { pct: pct });
        }
        if (kmEl) kmEl.textContent = km(localCount) + " km";
        if (ring) ring.setAttribute("stroke-dashoffset", String(ringOffset(localCount, goal)));
        if (streakEl && snapshot) streakEl.textContent = String(snapshot.streak || 0);
        if (bestEl && snapshot) {
            var best = Math.max(snapshot.best_steps || 0, localCount);
            bestEl.textContent = best > 0 ? String(best) : "—";
        }
        if (lifeEl && snapshot) {
            lifeEl.textContent = String((snapshot.lifetime || 0) + extra);
        }
        renderWeek();
    }

    function openDay(date) {
        if (!dayCard || !date) return;
        var steps = dayStepsFor(date);
        dayCard.classList.add("is-open");
        if (dayDate) dayDate.textContent = humanDate(date);
        if (daySteps) daySteps.textContent = steps + " " + stepWord(steps);
        if (dayMeta) dayMeta.textContent = km(steps) + " km";
    }

    async function send(body) {
        try {
            var response = await fetch("/api/steps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "same-origin",
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                if (response.status === 401) {
                    setStatus(t("common_login", "Войти"));
                } else if (response.status === 429) {
                    setStatus(
                        t("common_too_many_requests", "Слишком много запросов")
                    );
                } else {
                    setStatus(t("steps_save_failed", "Не удалось сохранить шаги"));
                }
                return null;
            }
            return await response.json();
        } catch (_) {
            setStatus(t("chat_no_network", "Нет сети"));
            return null;
        }
    }

    async function syncSensor(force) {
        if (!force && pendingSync < SYNC_EVERY) return;
        pendingSync = 0;
        var data = await send({
            date: localToday,
            steps: localCount,
            source: "sensor",
        });
        if (data) applySnapshot(data);
    }

    function registerStep() {
        var now = Date.now();
        if (now - lastStepAt < MIN_STEP_GAP_MS) return;
        lastStepAt = now;
        localCount += 1;
        pendingSync += 1;
        writeLocal();
        paint();
        var ringShell = ring ? ring.closest(".rm-step-ring") : null;
        if (ringShell) {
            ringShell.classList.remove("is-step");
            void ringShell.offsetWidth;
            ringShell.classList.add("is-step");
        }
        if (localCount % PANEL_EVERY === 0) updateLivePanel(false);
        if (localCount % 100 === 0 && navigator.vibrate) {
            navigator.vibrate(10);
        }
        if (pendingSync >= SYNC_EVERY) syncSensor(false);
        var goal = snapshot ? snapshot.goal : DEFAULT_GOAL;
        if (localCount === goal) {
            setStatus(t("steps_goal_done", "Цель дня есть"));
            updateLivePanel(true);
        }
    }

    function onMotion(event) {
        var acc = event.accelerationIncludingGravity || event.acceleration;
        if (!acc) return;
        motionTicks += 1;
        var mag =
            Math.sqrt(
                (acc.x || 0) * (acc.x || 0) +
                    (acc.y || 0) * (acc.y || 0) +
                    (acc.z || 0) * (acc.z || 0)
            ) / 9.81;

        // Separate gravity and device orientation from the short pulse made
        // by a step. The adaptive threshold works for a phone held in a hand,
        // pocket or bag instead of expecting one fixed acceleration value.
        gravityMag = gravityMag * 0.9 + mag * 0.1;
        var motion = Math.abs(mag - gravityMag);
        motionMean = motionMean * 0.97 + motion * 0.03;
        var trigger = Math.max(0.055, Math.min(0.22, motionMean * 2.15));
        var release = Math.max(motionFloor, trigger * 0.48);

        // Ignore impacts too strong to be a normal walking step.
        if (motion > 1.7) {
            motionPeak = 0;
            return;
        }
        if (motion > motionPeak) motionPeak = motion;
        if (motionPeak >= trigger && motion <= release) {
            registerStep();
            motionPeak = 0;
        }
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
        motionTicks = 0;
        paintListeningState();
        setStatus(t("steps_counting", "Считаем шаги с телефона"));
        holdScreen();
        if (!syncTimer) {
            syncTimer = window.setInterval(function () {
                syncSensor(true);
                updateLivePanel(false);
            }, 6000);
        }
        syncSensor(true);
        updateLivePanel(true);
        window.setTimeout(function () {
            if (listening && motionTicks < 3 && localCount === serverTodaySteps()) {
                setStatus(
                    t(
                        "steps_sensor_quiet",
                        "Датчик молчит. Держите экран открытым и походите с телефоном."
                    )
                );
            }
        }, 5000);
    }

    async function requestListen() {
        if (listening) return;
        if (!canSenseOnThisDevice()) {
            setStatus(
                t(
                    "steps_desktop",
                    "На компьютере шаги не считаются. Откройте на телефоне."
                )
            );
            return;
        }
        try {
            if (typeof DeviceMotionEvent.requestPermission === "function") {
                var permission = await DeviceMotionEvent.requestPermission();
                if (permission !== "granted") {
                    setStatus(
                        t("steps_need_motion", "Нужен доступ к движению телефона")
                    );
                    return;
                }
            }
            startListen();
        } catch (_) {
            setStatus(
                t(
                    "steps_desktop",
                    "На компьютере шаги не считаются. Откройте на телефоне."
                )
            );
        }
    }

    function bindClicks() {
        root.addEventListener("click", function (event) {
            var day = event.target.closest("[data-date]");
            if (day) openDay(day.getAttribute("data-date"));
        });
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                syncSensor(true);
                updateLivePanel(true);
            } else if (listening) {
                holdScreen();
                syncSensor(true);
            }
        });
        window.addEventListener("pagehide", function () {
            syncSensor(true);
        });
        window.addEventListener("online", function () {
            syncSensor(true);
        });
    }

    async function boot() {
        if (navigator.storage && navigator.storage.persist) {
            navigator.storage.persist().catch(function () {});
        }
        readLocal();
        paint();
        paintListeningState();
        bindClicks();
        try {
            var response = await fetch(
                "/api/steps?today=" + encodeURIComponent(localToday),
                { credentials: "same-origin" }
            );
            if (response.ok) {
                applySnapshot(await response.json());
            }
        } catch (_) {
            setStatus(t("chat_no_network", "Нет сети"));
        }
        if (localCount > 0) syncSensor(true);
        if (notifyReady()) updateLivePanel(true);
        if (typeof DeviceMotionEvent !== "undefined" &&
            typeof DeviceMotionEvent.requestPermission === "function") {
            setStatus(t("steps_need_motion", "Коснитесь экрана для доступа к движению"));
            document.addEventListener("pointerdown", requestListen, {
                once: true,
                passive: true,
            });
        } else {
            requestListen();
        }
    }

    boot();
})();
