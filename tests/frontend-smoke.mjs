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
});
