use axum::{
    extract::Request,
    http::{header, HeaderMap, HeaderValue},
    middleware::Next,
    response::{IntoResponse, Redirect, Response},
    Form,
};
use serde::Deserialize;
use serde_json::Value;
use std::collections::HashMap;
use std::sync::OnceLock;

pub const COOKIE: &str = "resursmap_lang";
pub const BASE_LOCALE: &str = "ru";
pub const LOCALES: &[&str] = &[
    "ru", "en", "fr", "es", "zh", "zh-TW", "hi", "ar", "pt", "de", "ja", "ko", "it", "tr", "pl",
    "uk", "nl", "vi", "id", "ms", "th", "fa", "ur", "bn", "pa", "sw", "el", "cs", "ro", "hu", "sv",
    "he",
];
const RTL: &[&str] = &["ar", "fa", "ur", "he"];

const RAW_MESSAGES: &[(&str, &str)] = &[
    ("ru", include_str!("../messages/ru.json")),
    ("en", include_str!("../messages/en.json")),
    ("fr", include_str!("../messages/fr.json")),
    ("es", include_str!("../messages/es.json")),
    ("zh", include_str!("../messages/zh.json")),
    ("zh-TW", include_str!("../messages/zh-TW.json")),
    ("hi", include_str!("../messages/hi.json")),
    ("ar", include_str!("../messages/ar.json")),
    ("pt", include_str!("../messages/pt.json")),
    ("de", include_str!("../messages/de.json")),
    ("ja", include_str!("../messages/ja.json")),
    ("ko", include_str!("../messages/ko.json")),
    ("it", include_str!("../messages/it.json")),
    ("tr", include_str!("../messages/tr.json")),
    ("pl", include_str!("../messages/pl.json")),
    ("uk", include_str!("../messages/uk.json")),
    ("nl", include_str!("../messages/nl.json")),
    ("vi", include_str!("../messages/vi.json")),
    ("id", include_str!("../messages/id.json")),
    ("ms", include_str!("../messages/ms.json")),
    ("th", include_str!("../messages/th.json")),
    ("fa", include_str!("../messages/fa.json")),
    ("ur", include_str!("../messages/ur.json")),
    ("bn", include_str!("../messages/bn.json")),
    ("pa", include_str!("../messages/pa.json")),
    ("sw", include_str!("../messages/sw.json")),
    ("el", include_str!("../messages/el.json")),
    ("cs", include_str!("../messages/cs.json")),
    ("ro", include_str!("../messages/ro.json")),
    ("hu", include_str!("../messages/hu.json")),
    ("sv", include_str!("../messages/sv.json")),
    ("he", include_str!("../messages/he.json")),
];

tokio::task_local! {
    static LOCALE: &'static str;
}

fn tables() -> &'static HashMap<&'static str, HashMap<String, String>> {
    static TABLES: OnceLock<HashMap<&'static str, HashMap<String, String>>> = OnceLock::new();
    TABLES.get_or_init(|| {
        let mut all = HashMap::new();
        for (locale, raw) in RAW_MESSAGES {
            let cleaned = raw.strip_prefix('\u{feff}').unwrap_or(raw);
            let parsed: HashMap<String, Value> = serde_json::from_str(cleaned).unwrap_or_default();
            all.insert(
                *locale,
                parsed
                    .into_iter()
                    .filter_map(|(key, value)| value.as_str().map(|text| (key, text.to_string())))
                    .collect(),
            );
        }
        all
    })
}

pub fn canonicalize(value: &str) -> Option<&'static str> {
    let trimmed = value.trim();
    if let Some(found) = LOCALES
        .iter()
        .copied()
        .find(|item| item.eq_ignore_ascii_case(trimmed))
    {
        return Some(found);
    }
    let lower = trimmed.to_ascii_lowercase();
    if lower == "zh-hant" || lower == "zh-hk" || lower == "zh-mo" {
        return Some("zh-TW");
    }
    if lower.starts_with("zh") {
        return Some("zh");
    }
    let base = lower.split(['-', '_']).next().unwrap_or(&lower);
    LOCALES
        .iter()
        .copied()
        .find(|item| item.eq_ignore_ascii_case(base))
}

pub fn is_rtl(locale: &str) -> bool {
    RTL.contains(&locale)
}

pub fn locale() -> &'static str {
    LOCALE.try_with(|value| *value).unwrap_or(BASE_LOCALE)
}

pub fn dir() -> &'static str {
    if is_rtl(locale()) {
        "rtl"
    } else {
        "ltr"
    }
}

pub fn locale_native_name(code: &str) -> &'static str {
    match code {
        "en" => "English",
        "fr" => "Français",
        "ru" => "Русский",
        "es" => "Español",
        "zh" => "中文",
        "zh-TW" => "中文（繁體）",
        "hi" => "हिन्दी",
        "ar" => "العربية",
        "pt" => "Português",
        "de" => "Deutsch",
        "ja" => "日本語",
        "ko" => "한국어",
        "it" => "Italiano",
        "tr" => "Türkçe",
        "pl" => "Polski",
        "uk" => "Українська",
        "nl" => "Nederlands",
        "vi" => "Tiếng Việt",
        "id" => "Bahasa Indonesia",
        "ms" => "Bahasa Melayu",
        "th" => "ไทย",
        "fa" => "فارسی",
        "ur" => "اردو",
        "bn" => "বাংলা",
        "pa" => "ਪੰਜਾਬੀ",
        "sw" => "Kiswahili",
        "el" => "Ελληνικά",
        "cs" => "Čeština",
        "ro" => "Română",
        "hu" => "Magyar",
        "sv" => "Svenska",
        "he" => "עברית",
        _ => "Language",
    }
}

fn lookup<'a>(locale: &'a str, key: &str) -> Option<&'a str> {
    tables()
        .get(locale)
        .and_then(|table| table.get(key))
        .map(String::as_str)
}

pub fn t(key: &str) -> String {
    lookup(locale(), key)
        .or_else(|| lookup(BASE_LOCALE, key))
        .unwrap_or(key)
        .to_string()
}

pub fn tf(key: &str, pairs: &[(&str, &str)]) -> String {
    let mut value = t(key);
    for (name, replacement) in pairs {
        value = value.replace(&format!("{{{name}}}"), replacement);
    }
    value
}

pub fn messages_json() -> String {
    let table = tables().get(locale()).or_else(|| tables().get(BASE_LOCALE));
    serde_json::to_string(table.unwrap_or(&HashMap::new())).unwrap_or_else(|_| "{}".into())
}

pub fn detect(headers: &HeaderMap) -> &'static str {
    if let Some(cookie) = headers
        .get(header::COOKIE)
        .and_then(|value| value.to_str().ok())
    {
        for part in cookie.split(';') {
            if let Some(value) = part.trim().strip_prefix("resursmap_lang=") {
                if let Some(locale) = canonicalize(value) {
                    return locale;
                }
            }
        }
    }
    if let Some(raw) = headers
        .get(header::ACCEPT_LANGUAGE)
        .and_then(|value| value.to_str().ok())
    {
        let mut ranked = raw
            .split(',')
            .filter_map(|item| {
                let item = item.trim();
                let mut bits = item.split(';');
                let tag = bits.next()?.trim();
                let q = bits
                    .find_map(|bit| bit.trim().strip_prefix("q="))
                    .and_then(|value| value.parse::<f32>().ok())
                    .unwrap_or(1.0);
                Some((tag, q))
            })
            .collect::<Vec<_>>();
        ranked.sort_by(|a, b| b.1.partial_cmp(&a.1).unwrap_or(std::cmp::Ordering::Equal));
        for (tag, _) in ranked {
            if let Some(locale) = canonicalize(tag) {
                return locale;
            }
        }
    }
    BASE_LOCALE
}

pub async fn locale_middleware(request: Request, next: Next) -> Response {
    LOCALE
        .scope(detect(request.headers()), next.run(request))
        .await
}

fn escape_attr(value: &str) -> String {
    value
        .replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
}

pub fn language_picker_html(next_path: &str) -> String {
    let current = locale();
    let next = if next_path.starts_with('/') && !next_path.starts_with("//") {
        next_path
    } else {
        "/app/menu"
    };
    let mut buttons = String::new();
    for code in LOCALES {
        let selected = if *code == current { " is-selected" } else { "" };
        let pressed = if *code == current { "true" } else { "false" };
        buttons.push_str(&format!(
            r#"<button type="submit" name="locale" value="{code}" class="rm-lang-btn{selected}" lang="{code}" aria-pressed="{pressed}"><span>{name}</span><small>{code}</small></button>"#,
            code = escape_attr(code),
            selected = selected,
            pressed = pressed,
            name = escape_attr(locale_native_name(code)),
        ));
    }
    format!(
        r#"<form class="rm-lang-picker" method="post" action="/app/locale" aria-label="{label}">
            <input type="hidden" name="next" value="{next}">
            <div class="rm-lang-head">
                <strong>{title}</strong>
                <small>{hint}</small>
            </div>
            <div class="rm-lang-grid">{buttons}</div>
        </form>"#,
        label = escape_attr(&t("menu_language")),
        next = escape_attr(next),
        title = escape_attr(&t("menu_language")),
        hint = escape_attr(&t("menu_language_hint")),
        buttons = buttons,
    )
}

fn cookie_flags() -> &'static str {
    match std::env::var("GRABIT_COOKIE_SECURE")
        .or_else(|_| std::env::var("RESURSMAP_COOKIE_SECURE"))
        .as_deref()
    {
        Ok("0") | Ok("false") | Ok("False") => "SameSite=Lax",
        _ => "Secure; SameSite=Lax",
    }
}

#[derive(Debug, Deserialize)]
pub struct LocaleForm {
    pub locale: String,
    #[serde(default)]
    pub next: String,
}

pub async fn set_locale(headers: HeaderMap, Form(form): Form<LocaleForm>) -> Response {
    let locale = canonicalize(&form.locale).unwrap_or(BASE_LOCALE);
    let next = form.next.trim();
    let target = if next.starts_with('/') && !next.starts_with("//") {
        next.to_string()
    } else {
        headers
            .get(header::REFERER)
            .and_then(|value| value.to_str().ok())
            .and_then(|referer| {
                url::Url::parse(referer)
                    .ok()
                    .map(|url| url.path().to_string())
            })
            .filter(|path| path.starts_with('/'))
            .unwrap_or_else(|| "/app/menu".to_string())
    };
    let mut response = Redirect::to(&target).into_response();
    if let Ok(value) = HeaderValue::from_str(&format!(
        "{COOKIE}={locale}; Path=/; Max-Age=31536000; {}",
        cookie_flags()
    )) {
        response.headers_mut().append(header::SET_COOKIE, value);
    }
    response
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn nav_chats_differs_in_english() {
        assert_eq!(lookup("ru", "nav_chats"), Some("Чаты"));
        assert_eq!(lookup("en", "nav_chats"), Some("Chats"));
        assert!(lookup("ar", "nav_chats").is_some());
        assert_eq!(LOCALES.len(), 32);
    }
}
