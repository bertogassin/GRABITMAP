//! Regression guard for the "language mixing" bug: a page rendering in the
//! visitor's detected locale everywhere except a hardcoded Russian topbar
//! or hero, because that call site passed a literal string instead of
//! `crate::i18n::t()`/`tf()`. This scans the de-hardcoded template files'
//! source text (not runtime output) for Cyrillic characters passed
//! directly as arguments to functions that render user-facing labels.
//!
//! Scope is deliberately limited to files that went through the i18n
//! cleanup: `legal.rs` (long-form ToS/privacy content) and the
//! owner/admin-only panels (`admin_administrators.rs`, `admin_dashboard.rs`,
//! `admin_security.rs`) are intentionally Russian-only by product decision
//! and are not scanned here.

use std::fs;
use std::path::Path;

const SCANNED_FILES: &[&str] = &[
    "src/web/templates/resources.rs",
    "src/web/templates/communication.rs",
    "src/web/templates/profile_account.rs",
    "src/web/templates/navigation.rs",
    "src/web/templates/common.rs",
    "src/web/templates/invite.rs",
];

/// Functions whose string-literal arguments render directly as visible
/// text. A Cyrillic character inside their argument list is a hardcoded
/// Russian literal that bypasses `crate::i18n::t()`/`tf()`, since dynamic
/// values (DB rows, user input) reach these calls as variables, not string
/// literals, and never contain source-level Cyrillic bytes.
const USER_TEXT_CALLS: &[&str] = &[
    "topbar(",
    "simple_hero(",
    "back_hero(",
    "section_head(",
    "navigation_card(",
    "back_navigation_card(",
    "back_link(",
    "empty_state_card(",
    "empty_state_card_with_actions(",
    "empty_state_action(",
    "kind_chip(",
    "guest_locked_section(",
];

fn has_cyrillic(s: &str) -> bool {
    s.chars().any(|c| ('\u{0400}'..='\u{04FF}').contains(&c))
}

/// Functions that are owner/admin-only tooling despite living in an
/// otherwise de-hardcoded file, matching the product decision to leave
/// admin surfaces in Russian. Their bodies are excluded from the scan.
const ADMIN_ONLY_FUNCTIONS: &[&str] = &["pub fn render_admin_promotion_queue"];

/// Removes each admin-only function's body (from its signature to the
/// matching closing brace, via brace-depth counting) from `content`, so
/// the scan below never sees intentionally-Russian admin-tool text.
fn strip_admin_only_functions(content: &str) -> String {
    let mut result = content.to_string();

    for marker in ADMIN_ONLY_FUNCTIONS {
        let Some(start) = result.find(marker) else {
            continue;
        };
        let bytes = result.as_bytes();
        let Some(open_brace) = result[start..].find('{').map(|p| start + p) else {
            continue;
        };

        let mut depth: i32 = 0;
        let mut i = open_brace;
        let mut end = result.len();
        while i < bytes.len() {
            match bytes[i] {
                b'{' => depth += 1,
                b'}' => {
                    depth -= 1;
                    if depth == 0 {
                        end = i + 1;
                        break;
                    }
                }
                _ => {}
            }
            i += 1;
        }

        result.replace_range(start..end, "");
    }

    result
}

/// Returns the byte span of `content[call_start..]`'s argument list,
/// i.e. from (and including) the call's opening `(` through its matching
/// closing `)`, using simple paren-depth counting. Assumes `content` is
/// valid Rust source, so parens inside string literals are rare in this
/// codebase's call sites; false widening here only makes the check
/// stricter, never blind to a real literal.
fn extract_call_args(content: &str, call_start: usize) -> &str {
    let bytes = content.as_bytes();
    let open_paren = match content[call_start..].find('(') {
        Some(p) => call_start + p,
        None => return &content[call_start..call_start],
    };

    let mut depth: i32 = 0;
    let mut i = open_paren;
    while i < bytes.len() {
        match bytes[i] {
            b'(' => depth += 1,
            b')' => {
                depth -= 1;
                if depth == 0 {
                    return &content[open_paren..=i];
                }
            }
            _ => {}
        }
        i += 1;
    }
    &content[open_paren..]
}

#[test]
fn templates_do_not_hardcode_russian_in_user_text_calls() {
    let manifest_dir = env!("CARGO_MANIFEST_DIR");
    let mut failures = Vec::new();

    for relative_path in SCANNED_FILES {
        let full_path = Path::new(manifest_dir).join(relative_path);
        let content = fs::read_to_string(&full_path)
            .unwrap_or_else(|e| panic!("failed to read {}: {e}", full_path.display()));

        // Fixture data in #[cfg(test)] modules commonly uses Russian
        // sample strings and is never rendered to a real visitor.
        let scannable = content
            .split("\n#[cfg(test)]")
            .next()
            .unwrap_or(content.as_str());
        let scannable = strip_admin_only_functions(scannable);
        let scannable = scannable.as_str();

        for call in USER_TEXT_CALLS {
            let mut search_from = 0usize;
            while let Some(found) = scannable[search_from..].find(call) {
                let call_start = search_from + found;
                let args = extract_call_args(scannable, call_start);

                if has_cyrillic(args) {
                    let line_no = scannable[..call_start].matches('\n').count() + 1;
                    failures.push(format!(
                        "{relative_path}:{line_no}: hardcoded Cyrillic literal passed to `{}` \u{2014} use crate::i18n::t()/tf() instead:\n    {}",
                        call.trim_end_matches('('),
                        args.lines().next().unwrap_or(args).trim()
                    ));
                }

                search_from = call_start + call.len();
            }
        }
    }

    assert!(
        failures.is_empty(),
        "\n\nFound hardcoded Russian text in template calls that render visible labels.\n\
         These must go through crate::i18n::t(\"key\")/tf(\"key\", ...) so the text follows\n\
         the visitor's detected locale instead of always showing Russian:\n\n{}\n",
        failures.join("\n\n")
    );
}
