import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
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

test("background chat polling pauses without overlapping requests", async () => {
  const [badge, inbox, chat] = await Promise.all([
    readFile(new URL("static/nav-badge.js", root), "utf8"),
    readFile(new URL("static/inbox.js", root), "utf8"),
    readFile(new URL("static/chat-v2.js", root), "utf8"),
  ]);

  assert.match(badge, /if \(attentionRequest\)/);
  assert.match(badge, /attentionStopped \|\| document\.hidden/);
  assert.doesNotMatch(badge, /setInterval\(refreshAttention/);
  assert.match(inbox, /stopped \|\| suspended/);
  assert.match(inbox, /document\.visibilityState === "hidden"/);
  assert.match(chat, /document\.visibilityState === "hidden"/);
  assert.match(inbox, /socket !== currentSocket/);
  assert.match(chat, /socket !== currentSocket/);
});

test("inbox state is account scoped and dates follow the browser locale", async () => {
  const [inbox, template] = await Promise.all([
    readFile(new URL("static/inbox.js", root), "utf8"),
    readFile(new URL("src/web/templates/communication.rs", root), "utf8"),
  ]);

  assert.match(template, /data-viewer-user-id="\{viewer_user_id\}"/);
  assert.match(inbox, /inbox-event-cursor:" \+ viewerUserId/);
  assert.match(inbox, /new Intl\.DateTimeFormat\(locale/);
  assert.match(inbox, /unreadCount > 99 \? "99\+" : unreadCount/);
  assert.match(template, /id="inbox-search-input"/);
  assert.match(inbox, /function applyInboxFilter\(\)/);
  assert.doesNotMatch(template, /fn ru_weekday_short/);
  assert.match(template, /"__image__" => crate::i18n::t\("chat_photo"\)/);
  assert.match(template, /"__voice__" => crate::i18n::t\("chat_voice"\)/);
});

test("chat separates transport health from peer presence", async () => {
  const chat = await readFile(new URL("static/chat-v2.js", root), "utf8");
  assert.match(chat, /peerState\.hidden = true/);
  assert.match(chat, /syncHeaderPresence\(\)/);
  assert.doesNotMatch(chat, /peerState\.hidden = false/);
});

test("mobile chat composer keeps media, text, and send in one action row", async () => {
  const [template, css, chat] = await Promise.all([
    readFile(new URL("src/web/templates/communication.rs", root), "utf8"),
    readFile(new URL("static/chat-v2.css", root), "utf8"),
    readFile(new URL("static/chat-v2.js", root), "utf8"),
  ]);

  assert.match(template, /class="chat-action-label">Голос<\/span>/);
  assert.match(template, /class="chat-action-label">Фото<\/span>/);
  assert.match(template, /class="chat-action-label">Отправить<\/span>/);
  assert.match(css, /grid-template-columns:\s*44px 44px minmax\(0, 1fr\) 48px/);
  assert.match(chat, /labelAction\(send, "chat_send_action", "Отправить"\)/);
  assert.match(chat, /labelAction\(imageBtn, "chat_photo", "Фото"\)/);
  assert.match(chat, /labelAction\(voiceBtn, "chat_voice", "Голосовое"\)/);
  assert.match(chat, /setMediaSending\(true\)/);
  assert.match(chat, /mediaErrorCopy\("image", code\)/);
  assert.match(chat, /mediaErrorCopy\("voice", code\)/);
});

test("chat photo viewer is isolated, keyboard accessible, and downloadable", async () => {
  const [chat, css] = await Promise.all([
    readFile(new URL("static/chat-v2.js", root), "utf8"),
    readFile(new URL("static/chat-v2.css", root), "utf8"),
  ]);

  assert.match(chat, /function lightboxText\(key, fallback\)/);
  assert.match(chat, /function safeMediaUrl\(value\)/);
  assert.match(chat, /chat-lightbox-download/);
  assert.match(chat, /event\.key === "Enter" \|\| event\.key === " "/);
  assert.doesNotMatch(chat, /classList\.contains\("chat-lightbox-image"\)/);
  assert.match(css, /\.chat-lightbox-actions/);
});

test("chat preserves reading position and reveals quoted history", async () => {
  const [chat, styles, template] = await Promise.all([
    readFile(new URL("static/chat-v2.js", root), "utf8"),
    readFile(new URL("static/chat-v2.css", root), "utf8"),
    readFile(new URL("src/web/templates/communication.rs", root), "utf8"),
  ]);

  assert.match(chat, /else if \(incomingCount > 0\)/);
  assert.match(chat, /markUnreadBelow\(firstIncomingRow, incomingCount\)/);
  assert.doesNotMatch(chat, /shouldStick \|\| incomingCount > 0/);
  assert.match(chat, /window\.resursmapRevealChatMessage = async function/);
  assert.match(chat, /await loadOlderMessages\(\)/);
  assert.match(chat, /firstMessageId >= previousFirstId/);
  assert.match(chat, /chat_reply_unavailable/);
  assert.match(styles, /\.chat-scroll-unread/);
  assert.match(styles, /\.chat-unread-divider/);
  assert.match(template, /id="chat-scroll-unread"/);
});

test("chat actions preserve media and work consistently in groups", async () => {
  const [chat, groups, chatApi, template] = await Promise.all([
    readFile(new URL("static/chat-v2.js", root), "utf8"),
    readFile(new URL("src/web/handlers/groups.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/chat_api.rs", root), "utf8"),
    readFile(new URL("src/web/templates/communication.rs", root), "utf8"),
  ]);

  assert.match(chat, /var currentTarget = isGroup/);
  assert.match(chat, /candidate !== currentTarget/);
  assert.match(chat, /attachment_kind:\s*row\.dataset\.attachmentKind/);
  assert.match(chat, /reactions: Array\.from\(/);
  assert.doesNotMatch(chat, /messageCache\.set\(id, message\);\s*renderMessage\(message\);/);
  assert.match(chat, /reply_sender_name/);
  assert.match(chat, /replyHeading\.textContent = t\("chat_reply_label"/);
  assert.match(chat, /forwardHeading\.textContent = t\("chat_forward"/);
  assert.match(chat, /\.catch\(reportActionError\)/);
  assert.match(chat, /Number\(message\.deleted_at\) > 0\s*\? \[\]/);
  assert.match(groups, /"message": message_json\(&message, user_id\)/);
  assert.match(groups, /reply_sender_name = names\.get/);
  assert.match(chatApi, /message_content_can_be_edited/);
  assert.match(template, /data-reply-sender-name/);
  assert.match(template, /data-attachment-kind/);
  assert.match(template, /if deleted \|\| message\.reactions\.is_empty\(\)/);
});

test("chat media survives offline sends and retries without duplicates", async () => {
  const [chat, media] = await Promise.all([
    readFile(new URL("static/chat-v2.js", root), "utf8"),
    readFile(new URL("src/web/handlers/chat_media.rs", root), "utf8"),
  ]);

  assert.match(chat, /MEDIA_DB_NAME = "grabit-chat-media-outbox"/);
  assert.match(chat, /window\.indexedDB\.open/);
  assert.match(chat, /mediaOutboxWrite\(item\)/);
  assert.match(chat, /mediaOutboxLoad\(\)/);
  assert.match(chat, /mediaOutboxDelete\(item\.clientMessageId\)/);
  assert.match(chat, /formData\.append\("client_message_id", item\.clientMessageId\)/);
  assert.match(chat, /item\.state = "failed"/);
  assert.match(chat, /flushMediaQueue\(\)/);
  assert.doesNotMatch(chat, /фото нельзя отправить офлайн/iu);
  assert.doesNotMatch(chat, /голосовое нельзя отправить офлайн/iu);
  assert.match(media, /INSERT OR IGNORE INTO messages/);
  assert.match(media, /media_retries_keep_one_message_per_client_id/);
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
  assert.match(
    app,
    /\/var\/lib\/grabit-monitor:\/run\/grabit-monitor:ro/,
  );
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
  assert.match(chat, /field \+ "\." \+ extension/);
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

test("core browser and chat flows do not depend on Telegram", async () => {
  const [common, pwa, chatApi, chatMedia, telegramAdapter] = await Promise.all([
    readFile(new URL("src/web/handlers/common.rs", root), "utf8"),
    readFile(new URL("static/pwa-install.js", root), "utf8"),
    readFile(new URL("src/web/handlers/chat_api.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/chat_media.rs", root), "utf8"),
    readFile(new URL("src/telegram_notify.rs", root), "utf8"),
  ]);

  assert.doesNotMatch(
    common,
    /\|\s*"https:\/\/(?:t\.me|telegram\.)/,
  );
  assert.doesNotMatch(pwa, /isTelegramBrowser|\/telegram\/i/);
  assert.doesNotMatch(chatApi, /notify_telegram_user|should_notify_telegram/);
  assert.doesNotMatch(chatMedia, /notify_telegram_user|should_notify_telegram/);
  assert.doesNotMatch(telegramAdapter, /notify_telegram_user/);
  assert.match(telegramAdapter, /publish_to_telegram_group/);
});

test("public resources use one universal share flow", async () => {
  const [share, common, resources] = await Promise.all([
    readFile(new URL("static/share.js", root), "utf8"),
    readFile(new URL("src/web/templates/common.rs", root), "utf8"),
    readFile(new URL("src/web/templates/resources.rs", root), "utf8"),
  ]);

  assert.match(share, /navigator\.share/);
  assert.match(share, /navigator\.clipboard/);
  assert.match(share, /data-share-source-title/);
  assert.match(share, /\[title, text, url\]/);
  assert.match(common, /fn share_button/);
  assert.match(common, /data-share-scope/);
  assert.match(resources, /data-share-url="\/app\/listing\/\{id\}"/);
  assert.doesNotMatch(
    share,
    /https?:\/\/(?:t\.me|telegram\.)|\btelegram\b|\bwhatsapp\b|\bfacebook\b/i,
  );
});

test("universal sharing creates a branded image with a safe fallback", async () => {
  const share = await readFile(new URL("static/share.js", root), "utf8");

  assert.match(share, /canvas\.width = 1200/);
  assert.match(share, /canvas\.height = 630/);
  assert.match(share, /grabit-mascot-v2\.png/);
  assert.match(share, /new File\(\[bytes\], "grabit-listing\.png"/);
  assert.match(share, /navigator\.canShare\(cardPayload\)/);
  assert.match(share, /\{ title: title, text: text, url: url \}/);
  assert.doesNotMatch(share, /https:\/\/api\.|TELEGRAM_BOT_TOKEN/);
});

test("listing links become safe cards in direct and group chats", async () => {
  const [chat, inbox, routes, preview, template] = await Promise.all([
    readFile(new URL("static/chat-v2.js", root), "utf8"),
    readFile(new URL("static/inbox.js", root), "utf8"),
    readFile(new URL("src/web/routes/resources.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/listing_preview.rs", root), "utf8"),
    readFile(new URL("src/web/templates/communication.rs", root), "utf8"),
  ]);

  assert.match(routes, /\/api\/listing\/\{id\}\/preview/);
  assert.match(routes, /\/app\/listing\/\{id\}/);
  assert.match(preview, /moderation_status = 'approved'/);
  assert.match(preview, /is_active = 1/);
  assert.match(preview, /grabit-share-cover\.png/);
  assert.match(chat, /chat-listing-card/);
  assert.match(chat, /chat-listing-cover/);
  assert.match(chat, /\/api\/listing\//);
  assert.match(chat, /URLSearchParams\(window\.location\.search\)\.get\("share"\)/);
  assert.match(inbox, /shareUrl\.searchParams\.set\("share", shareListingId\)/);
  assert.match(template, /chat-share-notice/);
  assert.doesNotMatch(chat, /fetch\(\s*listing\.url/);
});

test("group management preserves ownership and limits privileged actions", async () => {
  const [migration, handlers, routes, template, common] = await Promise.all([
    readFile(new URL("src/db/chat_groups.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/groups.rs", root), "utf8"),
    readFile(new URL("src/web/routes/communication.rs", root), "utf8"),
    readFile(new URL("src/web/templates/communication.rs", root), "utf8"),
    readFile(new URL("src/web/templates/common.rs", root), "utf8"),
  ]);

  assert.match(migration, /owner_user_id INTEGER NOT NULL DEFAULT 0/);
  assert.match(migration, /role TEXT NOT NULL DEFAULT 'member'/);
  assert.match(migration, /idx_chat_group_single_owner/);
  assert.match(handlers, /const MAX_GROUP_MEMBERS: i64 = 250/);
  assert.match(handlers, /fn role_can_manage_members/);
  assert.match(handlers, /fn transfer_group_owner/);
  assert.match(handlers, /GROUP_ROLE_OWNER/);
  assert.match(routes, /members\/\{member_id\}\/role/);
  assert.match(routes, /members\/\{member_id\}\/owner/);
  assert.match(routes, /members\/\{member_id\}\/remove/);
  assert.match(template, /Владелец/);
  assert.match(template, /Администратор/);
  assert.match(template, /rm-group-member-search/);
  assert.match(template, /form\[data-confirm\]/);
  assert.match(common, /rm-group-member--managed/);
});

test("inbox organization is account scoped and controls notifications", async () => {
  const [schema, handler, chat, api, groups, media, template, inbox, routes] = await Promise.all([
    readFile(new URL("src/db/chat_preferences.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/chat_preferences.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/chat.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/chat_api.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/groups.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/chat_media.rs", root), "utf8"),
    readFile(new URL("src/web/templates/communication.rs", root), "utf8"),
    readFile(new URL("static/inbox.js", root), "utf8"),
    readFile(new URL("src/web/routes/communication.rs", root), "utf8"),
  ]);

  assert.match(schema, /PRIMARY KEY \(user_id, chat_kind, target_id\)/);
  assert.match(schema, /pinned_at INTEGER NOT NULL DEFAULT 0/);
  assert.match(schema, /archived_at INTEGER NOT NULL DEFAULT 0/);
  assert.match(schema, /muted_until INTEGER NOT NULL DEFAULT 0/);
  assert.match(handler, /fn target_is_accessible/);
  assert.match(handler, /"pin"/);
  assert.match(handler, /"archive"/);
  assert.match(handler, /"mute"/);
  assert.match(chat, /fn organize_conversations/);
  assert.match(api, /conversation\.pinned_at/);
  assert.match(groups, /preference\.muted_until/);
  assert.match(media, /notifications_muted/);
  assert.match(template, /inbox-views/);
  assert.match(template, /chat-dialog-controls/);
  assert.match(inbox, /preferenceControls/);
  assert.match(inbox, /dataset\.inboxView/);
  assert.match(routes, /chat-preference\/\{kind\}\/\{target_id\}/);
});

test("chat search is authorized, bounded, and navigates to results", async () => {
  const [handler, routes, template, search, chat] = await Promise.all([
    readFile(new URL("src/web/handlers/chat_search.rs", root), "utf8"),
    readFile(new URL("src/web/routes/communication.rs", root), "utf8"),
    readFile(new URL("src/web/templates/communication.rs", root), "utf8"),
    readFile(new URL("static/chat-search.js", root), "utf8"),
    readFile(new URL("static/chat-v2.js", root), "utf8"),
  ]);

  assert.match(handler, /verify_user_session/);
  assert.match(handler, /SEARCH_SCAN_LIMIT: i64 = 2_000/);
  assert.match(handler, /SEARCH_RESULT_LIMIT: usize = 50/);
  assert.match(handler, /chat_group_members/);
  assert.match(handler, /deleted_at = 0/);
  assert.match(handler, /to_lowercase\(\)\.contains/);
  assert.match(routes, /api\/chat\/\{other_user_id\}\/search/);
  assert.match(routes, /api\/group\/\{group_id\}\/search/);
  assert.match(template, /chat-search-panel/);
  assert.match(template, /chat-search\.js/);
  assert.match(search, /AbortController/);
  assert.match(search, /textContent = String\(item\.message/);
  assert.match(search, /resursmapRevealChatMessage/);
  assert.match(chat, /window\.resursmapRevealChatMessage/);
  assert.doesNotMatch(search, /innerHTML\s*=\s*item\./);
});

test("group typing is membership scoped and names the active participant", async () => {
  const [state, realtime, chat, inbox] = await Promise.all([
    readFile(new URL("src/state/app_state.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/chat_realtime.rs", root), "utf8"),
    readFile(new URL("static/chat-v2.js", root), "utf8"),
    readFile(new URL("static/inbox.js", root), "utf8"),
  ]);

  assert.match(state, /pub fn publish_group_typing_event/);
  assert.match(state, /member_ids\.contains\(&actor_user_id\)/);
  assert.match(state, /group-typing:\{actor_user_id\}:\{group_id\}/);
  assert.match(state, /actor_name: String/);
  assert.match(realtime, /chat_group_members AS member/);
  assert.match(realtime, /direct_typing_is_allowed/);
  assert.match(realtime, /users_are_blocked/);
  assert.match(realtime, /LIMIT 251/);
  assert.match(chat, /group_id: groupId/);
  assert.match(chat, /updateGroupTyping/);
  assert.match(chat, /peerTypingName/);
  assert.match(inbox, /event\.group_id/);
  assert.match(inbox, /typingPreviewHtml\(actorName\)/);
});

test("group receipts separate partial delivery from read by everyone", async () => {
  const [groups, chat] = await Promise.all([
    readFile(new URL("src/web/handlers/groups.rs", root), "utf8"),
    readFile(new URL("static/chat-v2.js", root), "utf8"),
  ]);

  assert.match(groups, /MIN\(last_read_message_id\)/);
  assert.match(groups, /recipient_count > 0/);
  assert.match(groups, /peer_delivered_through_id/);
  assert.match(chat, /function applyReceiptCursors/);
  assert.match(chat, /peer_delivered_through_id/);
  assert.match(chat, /payload\.event\.group_id/);
});

test("group invites are signed, revocable, expiring, and capacity bounded", async () => {
  const [database, handlers, routes, template] = await Promise.all([
    readFile(new URL("src/db/chat_groups.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/groups.rs", root), "utf8"),
    readFile(new URL("src/web/routes/communication.rs", root), "utf8"),
    readFile(new URL("src/web/templates/communication.rs", root), "utf8"),
  ]);

  assert.match(database, /invite_nonce TEXT NOT NULL DEFAULT ''/);
  assert.match(handlers, /HmacSha256/);
  assert.match(handlers, /GROUP_INVITE_LIFETIME_SECONDS/);
  assert.match(handlers, /mac\.verify_slice/);
  assert.match(handlers, /member_count >= MAX_GROUP_MEMBERS/);
  assert.match(handlers, /SET invite_nonce = ''/);
  assert.match(routes, /\/app\/group-invite\/\{token\}/);
  assert.match(template, /data-share-title="GRABIT · группа"/);
  assert.match(template, /history\.replaceState/);
});

test("group identity supports private avatars and bounded descriptions", async () => {
  const [database, handlers, routes, template, inbox] = await Promise.all([
    readFile(new URL("src/db/chat_groups.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/groups.rs", root), "utf8"),
    readFile(new URL("src/web/routes/communication.rs", root), "utf8"),
    readFile(new URL("src/web/templates/communication.rs", root), "utf8"),
    readFile(new URL("static/inbox.js", root), "utf8"),
  ]);

  assert.match(database, /description TEXT NOT NULL DEFAULT ''/);
  assert.match(database, /avatar_path TEXT NOT NULL DEFAULT ''/);
  assert.match(handlers, /MAX_GROUP_AVATAR_BYTES/);
  assert.match(handlers, /detect_image\(&bytes\)/);
  assert.match(handlers, /role_can_manage_members/);
  assert.match(handlers, /is_member\(&db, group_id, user_id\)/);
  assert.match(routes, /\/api\/group\/\{group_id\}\/avatar/);
  assert.match(template, /name="description" maxlength="500"/);
  assert.match(template, /name="image" accept="image\/jpeg,image\/png,image\/webp"/);
  assert.match(inbox, /conversation\.has_avatar && groupId/);
});

test("pinned messages are scoped, authorized, and reveal their source", async () => {
  const [database, handlers, routes, chat, css] = await Promise.all([
    readFile(new URL("src/db/chat_pins.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/chat_pins.rs", root), "utf8"),
    readFile(new URL("src/web/routes/communication.rs", root), "utf8"),
    readFile(new URL("static/chat-v2.js", root), "utf8"),
    readFile(new URL("static/chat-v2.css", root), "utf8"),
  ]);

  assert.match(database, /PRIMARY KEY \(chat_kind, target_id\)/);
  assert.match(database, /CHECK \(chat_kind IN \('direct', 'group'\)\)/);
  assert.match(handlers, /request_is_cross_site/);
  assert.match(handlers, /can_manage_group_pins/);
  assert.match(handlers, /message\.conversation_id = \?2/);
  assert.match(handlers, /message\.group_id = \?2/);
  assert.match(routes, /\/api\/chat\/\{other_user_id\}\/pinned/);
  assert.match(routes, /\/api\/group\/\{group_id\}\/pinned/);
  assert.match(chat, /function loadPinned/);
  assert.match(chat, /resursmapRevealChatMessage\(pinnedMessageId\)/);
  assert.match(chat, /data-chat-action="pin"/);
  assert.match(css, /\.chat-pinned-banner\[hidden\]/);
});

test("group moderation limits senders and preserves role hierarchy", async () => {
  const [database, handlers, routes, template, chat] = await Promise.all([
    readFile(new URL("src/db/chat_groups.rs", root), "utf8"),
    readFile(new URL("src/web/handlers/groups.rs", root), "utf8"),
    readFile(new URL("src/web/routes/communication.rs", root), "utf8"),
    readFile(new URL("src/web/templates/communication.rs", root), "utf8"),
    readFile(new URL("static/chat-v2.js", root), "utf8"),
  ]);

  assert.match(database, /ADD COLUMN muted_until INTEGER NOT NULL DEFAULT 0/);
  assert.match(database, /idx_chat_group_members_mute/);
  assert.match(handlers, /fn role_can_moderate_message/);
  assert.match(handlers, /"error": "member_muted"/);
  assert.match(handlers, /group_message_delete/);
  assert.match(handlers, /chat_kind = 'group'/);
  assert.match(routes, /members\/\{member_id\}\/mute/);
  assert.match(template, /name="seconds"/);
  assert.match(template, /Не может писать/);
  assert.match(chat, /!mine && !\(isGroup && canManagePins\)/);
});

test("user-facing copy no longer calls listings resources", async () => {
  const visibleFiles = [
    "static/share.js",
    "src/web/handlers/admin.rs",
    "src/web/handlers/group_helper.rs",
    ...(
      await readdir(new URL("messages", root))
    ).filter((name) => name.endsWith(".json")).map((name) => `messages/${name}`),
  ];
  const contents = await Promise.all(
    visibleFiles.map((name) => readFile(new URL(name, root), "utf8")),
  );

  for (const content of contents) {
    assert.doesNotMatch(content, /ресурс(?:ы|а|ов|ом|у|ами|ах)?/iu);
  }
});

test("new promotions are free and internal until 2028", async () => {
  const [handler, template, promotions, main] = await Promise.all([
    readFile(new URL("src/web/handlers/resource_promotions.rs", root), "utf8"),
    readFile(new URL("src/web/templates/resources.rs", root), "utf8"),
    readFile(new URL("src/internal_promotions.rs", root), "utf8"),
    readFile(new URL("src/main.rs", root), "utf8"),
  ]);

  assert.match(handler, /internal_promotions::activate/);
  assert.match(handler, /internal_promotion_request/);
  assert.match(template, /100% скидка до 2028 года/);
  assert.match(template, /Карта и платёж не требуются/);
  assert.match(promotions, /discount_percent.*100/s);
  assert.match(promotions, /price_minor.*0/s);
  assert.match(promotions, /RENEWAL_WINDOW_SECONDS/);
  assert.match(promotions, /spawn_expiry_worker/);
  assert.match(main, /internal_promotions::spawn_expiry_worker/);
});

test("owner center uses the modern shell and install help is non-blocking", async () => {
  const dashboard = await readFile("src/web/templates/admin_dashboard.rs", "utf8");
  const navigation = await readFile("src/web/templates/navigation.rs", "utf8");
  const install = await readFile("static/pwa-install.js", "utf8");

  assert.match(dashboard, /admin-orbit--outer/);
  assert.match(dashboard, /bottom_nav\("menu"\)/);
  assert.match(navigation, /data-owner-center-entry/);
  assert.match(navigation, /admin_level == 5/);
  assert.doesNotMatch(install, /window\.alert/);
  assert.match(install, /showManualInstallHint/);
});
