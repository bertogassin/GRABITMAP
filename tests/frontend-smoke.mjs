import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const locales = ["ru","en","fr","es","zh","zh-TW","hi","ar","pt","de","ja","ko","it","tr","pl","uk","nl","vi","id","ms","th","fa","ur","bn","pa","sw","el","cs","ro","hu","sv","he"];

test("all supported locales have source and compiled messages", async () => {
  for (const locale of locales) {
    await readFile(new URL(`messages/${locale}.json`, root));
    await readFile(new URL(`static/paraglide/messages/${locale}.js`, root));
  }
});

test("RTL runtime and mobile PWA metadata are present", async () => {
  const runtime = await readFile(new URL("static/i18n-runtime.js", root), "utf8");
  const manifest = JSON.parse(await readFile(new URL("static/manifest.webmanifest", root), "utf8"));
  assert.match(runtime, /getTextDirection/);
  assert.match(runtime, /document\.documentElement\.dir/);
  assert.equal(manifest.display, "standalone");
  assert.ok(manifest.icons?.length > 0);
});

test("locale switching validates and canonicalizes locale tags", async () => {
  const runtime = await readFile(new URL("static/i18n-runtime.js", root), "utf8");
  assert.match(runtime, /normalizeLocale/);
  assert.match(runtime, /if \(!normalized\)/);
  assert.match(runtime, /zh-hant/);
});

test("service worker keeps partial shell caches and caches static responses", async () => {
  const serviceWorker = await readFile(new URL("static/resursmap-sw.js", root), "utf8");
  assert.match(serviceWorker, /Promise\.all\(STATIC_ASSETS\.map/);
  assert.match(serviceWorker, /cache\.put\(cacheKey\.toString\(\), response\.clone\(\)\)/);
  assert.match(serviceWorker, /const CACHE_PREFIX = "grabit-shell-"/);
  assert.match(serviceWorker, /key\.startsWith\(CACHE_PREFIX\)/);
  assert.match(serviceWorker, /internalNavigationTarget\(event\.notification\.data\.url, target\)/);
  assert.match(serviceWorker, /internalNavigationTarget\(nudge\.href, "\/app"\)/);
});

test("frontend navigation only accepts same-origin app hrefs", async () => {
  const [home, inbox, chat] = await Promise.all([
    readFile(new URL("static/home-explorer.js", root), "utf8"),
    readFile(new URL("static/inbox.js", root), "utf8"),
    readFile(new URL("static/chat-v2.js", root), "utf8"),
  ]);
  for (const source of [home, inbox, chat]) {
    assert.match(source, /url\.origin !== window\.location\.origin/);
    assert.match(source, /url\.pathname\.startsWith\("\/app\/"\)/);
  }
  assert.match(inbox, /escapeHtml\(href\)/);
});

test("production compose keeps Caddy in front of the private app", async () => {
  const [compose, caddy] = await Promise.all([
    readFile(new URL("docker-compose.prod.yml", root), "utf8"),
    readFile(new URL("Caddyfile", root), "utf8"),
  ]);
  const app = compose.split(/\n  caddy:\s*\n/, 1)[0];

  assert.match(compose, /\n  caddy:\s*\n/);
  assert.match(compose, /env_file:\s*\n\s*- \.env/);
  assert.match(app, /expose:\s*\n\s*- "3000"/);
  assert.doesNotMatch(app, /ports:\s*\n\s*- "3000:3000"/);
  assert.match(compose, /\.\/Caddyfile:\/etc\/caddy\/Caddyfile/);
  assert.match(caddy, /reverse_proxy grabit:3000/);
  assert.match(caddy, /lb_try_duration 15s/);
  assert.match(caddy, /health_uri \/ready/);
  assert.match(compose, /\nnetworks:\s*\n\s*app-net:/);
  assert.match(compose, /\n  caddy-data:/);
  assert.match(compose, /\n  caddy-config:/);
});

test("Docker build includes Rust compile-time locale sources", async () => {
  const dockerfile = await readFile(new URL("Dockerfile", root), "utf8");
  assert.match(dockerfile, /COPY messages \.\/messages/);
  assert.match(dockerfile, /RUN cargo build --release --locked/);
});

test("same-origin mobile sensors and microphone are permitted", async () => {
  const headers = await readFile(new URL("src/web/handlers/common.rs", root), "utf8");
  assert.match(headers, /microphone=\(self\)/);
  assert.match(headers, /accelerometer=\(self\)/);
  assert.match(headers, /gyroscope=\(self\)/);
  assert.doesNotMatch(headers, /microphone=\(\)/);
});

test("successful direct chat send clears the account-scoped draft", async () => {
  const chat = await readFile(new URL("static/chat-v2.js", root), "utf8");
  assert.match(chat, /localStorage\.removeItem\("grabit-chat-draft:" \+ scope\)/);
  assert.match(chat, /clearStoredDraft\(\)/);
  assert.match(chat, /voiceBtn\.textContent = t\("chat_voice_send", "Отправить"\)/);
});

test("chat has one active submit owner and accepts practical voice sizes", async () => {
  const [chat, media, groups] = await Promise.all([
    readFile(new URL("static/chat-v2.js", root), "utf8"),
    readFile(new URL("src/web/handlers/chat_media.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/groups.rs", root), "utf8"),
  ]);
  assert.match(chat, /if \(form\.dataset\.chatCoreReady === "1"\) \{\s*return;/);
  assert.match(chat, /voice\." \+ extension/);
  assert.match(chat, /voice_too_large/);
  assert.match(media, /MAX_VOICE_BYTES: usize = 8 \* 1024 \* 1024/);
  assert.match(groups, /bytes\.len\(\) > MAX_VOICE_BYTES/);
});

test("mobile diagnostics probes session chat microphone and motion", async () => {
  const diagnostics = await readFile(new URL("static/mobile-diagnostics.js", root), "utf8");
  assert.match(diagnostics, /grabit-mobile-diagnostic/);
  assert.match(diagnostics, /chatCoreReady/);
  assert.match(diagnostics, /getUserMedia/);
  assert.match(diagnostics, /DeviceMotionEvent\.requestPermission/);
  assert.match(diagnostics, /\/api\/account\/attention-count/);
});

test("browser i18n fallback cannot recurse and generated bare imports are not loaded", async () => {
  const [boot, common] = await Promise.all([
    readFile(new URL("static/i18n-boot.js", root), "utf8"),
    readFile(new URL("src/web/templates/common.rs", root), "utf8"),
  ]);
  assert.doesNotMatch(boot, /window\.m && typeof window\.m\[key\]/);
  assert.match(boot, /return t\(String\(key\), vars\)/);
  assert.doesNotMatch(common, /type="module" src="\{paraglide_boot_js\}"/);
  const browser = {
    resursmapI18n: { messages: { greeting: "Привет, {name}" } },
  };
  vm.runInNewContext(boot, { window: browser });
  assert.equal(browser.rmT("greeting", { name: "Амир" }), "Привет, Амир");
  assert.equal(browser.m.greeting({ name: "Амир" }), "Привет, Амир");
});

test("staged deploy keeps a ready backend during replacement", async () => {
  const deploy = await readFile(
    new URL("scripts/deploy_staged.sh", root),
    "utf8",
  );

  const start = deploy.indexOf("=== START STAGED BACKEND ===");
  const switchToStaged = deploy.indexOf("=== SWITCH TRAFFIC TO STAGED BACKEND ===");
  const replacePrimary = deploy.indexOf("=== REPLACE PRIMARY BACKEND ===");
  const switchToPrimary = deploy.indexOf("=== SWITCH TRAFFIC BACK TO PRIMARY ===");

  assert.ok(start >= 0);
  assert.ok(start < switchToStaged);
  assert.ok(switchToStaged < replacePrimary);
  assert.ok(replacePrimary < switchToPrimary);
  assert.match(deploy, /test "\$STATUS" = "healthy"/);
  assert.match(deploy, /trap cleanup EXIT/);
  assert.match(deploy, /\.backup '\$BACKUP_DIR\/votes\.db'/);
  assert.match(deploy, /PRAGMA integrity_check/);
  assert.match(deploy, /returning to staged backend/);
  assert.match(deploy, /\.Config\.Image/);
  assert.match(deploy, /docker image inspect "\$IMAGE_REF"/);
  assert.doesNotMatch(deploy, /images -q "\$APP_SERVICE"/);
  assert.doesNotMatch(deploy, /docker compose[^\n]* down/);
});

test("production monitor is independent and stateful", async () => {
  const [monitor, service, timer] = await Promise.all([
    readFile(new URL("scripts/monitor_production.sh", root), "utf8"),
    readFile(new URL("ops/systemd/grabit-monitor.service", root), "utf8"),
    readFile(new URL("ops/systemd/grabit-monitor.timer", root), "utf8"),
  ]);

  assert.match(monitor, /check_url health \/health/);
  assert.match(monitor, /check_url ready \/ready/);
  assert.match(monitor, /docker compose/);
  assert.match(monitor, /DISK_LIMIT/);
  assert.match(monitor, /MemAvailable/);
  assert.match(monitor, /previous=.*STATE_FILE/);
  assert.match(monitor, /logger -t grabit-monitor/);
  assert.doesNotMatch(monitor, /TELEGRAM|WHATSAPP|FACEBOOK/i);

  assert.match(service, /ExecStart=\/opt\/grabit\/scripts\/monitor_production\.sh/);
  assert.match(timer, /OnUnitActiveSec=1min/);
  assert.match(timer, /Persistent=true/);
});
