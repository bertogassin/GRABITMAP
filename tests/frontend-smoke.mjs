import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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

test("stepper namespaces local state and bounds lifecycle updates", async () => {
  const pedometer = await readFile(new URL("static/pedometer.js", root), "utf8");
  assert.match(pedometer, /data-user-id/);
  assert.match(pedometer, /resursmap:steps:" \+ userNamespace/);
  assert.match(pedometer, /MAX_DAY_STEPS/);
  assert.match(pedometer, /checkMidnight/);
  assert.match(pedometer, /clearInterval\(syncTimer\)/);
  assert.match(pedometer, /__RM_STEPS_DEBUG__ === true/);
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
  const compose = await readFile(new URL("docker-compose.prod.yml", root), "utf8");
  const app = compose.split(/\n  caddy:\s*\n/, 1)[0];

  assert.match(compose, /\n  caddy:\s*\n/);
  assert.match(compose, /env_file:\s*\n\s*- \.env/);
  assert.match(app, /expose:\s*\n\s*- "3000"/);
  assert.doesNotMatch(app, /ports:\s*\n\s*- "3000:3000"/);
  assert.match(compose, /reverse_proxy grabit:3000|\.\/Caddyfile:\/etc\/caddy\/Caddyfile/);
  assert.match(compose, /\nnetworks:\s*\n\s*app-net:/);
  assert.match(compose, /\n  caddy-data:/);
  assert.match(compose, /\n  caddy-config:/);
});

test("Docker build includes Rust compile-time locale sources", async () => {
  const dockerfile = await readFile(new URL("Dockerfile", root), "utf8");
  assert.match(dockerfile, /COPY messages \.\/messages/);
  assert.match(dockerfile, /RUN cargo build --release --locked/);
});
