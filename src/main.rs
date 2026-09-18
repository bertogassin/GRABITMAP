use std::env;

mod account_deletion;
mod catalog;
mod db;
mod geography;
mod i18n;
mod internal_promotions;
mod resource_publisher;
mod resource_screening;
mod state;
mod stripe_payments;
mod web;

use state::app_state::AppState;

fn validate_admin_key(value: Option<&str>) -> Result<String, &'static str> {
    let value = value.map(str::trim).filter(|value| !value.is_empty());

    let Some(value) = value else {
        return Err("ADMIN_KEY is required");
    };

    if value == "change-me" || value.len() < 32 {
        return Err("ADMIN_KEY must be at least 32 characters and must not use the example value");
    }

    Ok(value.to_string())
}

fn validate_stripe_configuration(
    stripe_secret: Option<&str>,
    public_base_url: Option<&str>,
) -> Result<(), &'static str> {
    let stripe_enabled = stripe_secret
        .map(str::trim)
        .is_some_and(|value| !value.is_empty());
    let public_base_url_present = public_base_url
        .map(str::trim)
        .is_some_and(|value| !value.is_empty());

    if stripe_enabled && !public_base_url_present {
        return Err("PUBLIC_BASE_URL is required when Stripe payments are enabled");
    }

    Ok(())
}

async fn shutdown_signal() {
    let ctrl_c = async {
        if let Err(error) = tokio::signal::ctrl_c().await {
            eprintln!("Не удалось установить обработчик Ctrl+C: {error}");
        }
    };

    #[cfg(unix)]
    let terminate = async {
        match tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate()) {
            Ok(mut signal) => {
                signal.recv().await;
            }
            Err(error) => {
                eprintln!("Не удалось установить обработчик SIGTERM: {error}");
                std::future::pending::<()>().await;
            }
        }
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {}
        _ = terminate => {}
    }
}

#[tokio::main]
async fn main() {
    let _ = dotenvy::dotenv();

    let admin_key_value = env::var("ADMIN_KEY").ok();
    let admin_key = validate_admin_key(admin_key_value.as_deref())
        .unwrap_or_else(|message| panic!("{message}"));

    let stripe_secret = env::var("STRIPE_SECRET_KEY").ok();
    let public_base_url = env::var("PUBLIC_BASE_URL").ok();

    validate_stripe_configuration(stripe_secret.as_deref(), public_base_url.as_deref())
        .unwrap_or_else(|message| panic!("{message}"));

    drop(db::queries::init_db().expect("Не удалось инициализировать базу данных"));

    db::owner_bootstrap::bootstrap_owner_from_env()
        .expect("Не удалось создать начального владельца из окружения");

    db::admin_v2::initialize().expect("Не удалось применить миграцию административной системы V2");

    db::geography_v2::initialize().expect("Не удалось применить миграцию Geography V2");

    db::group_geography::initialize().expect("Не удалось применить географию официальных групп");

    db::admin_geography::initialize()
        .expect("Не удалось синхронизировать административную географию");

    let db_pool = db::pool::create_pool().expect("Не удалось создать SQLite connection pool");

    let state = AppState::new(db_pool.clone(), admin_key);

    internal_promotions::spawn_expiry_worker(db_pool.clone());
    account_deletion::spawn_expiry_worker(db_pool.clone());
    db::group_member_search::spawn_backfill_worker(db_pool.clone());

    let app = web::routes::routes(state);

    let listener = tokio::net::TcpListener::bind(format!(
        "0.0.0.0:{}",
        env::var("PORT")
            .ok()
            .and_then(|value| value.parse::<u16>().ok())
            .unwrap_or(3000)
    ))
    .await
    .expect("Не удалось открыть HTTP порт");

    println!(
        "GRABIT запущен на http://0.0.0.0:{}",
        env::var("PORT").unwrap_or_else(|_| "3000".into())
    );

    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
        .expect("Ошибка HTTP сервера");
}

#[cfg(test)]
mod tests {
    use super::{validate_admin_key, validate_stripe_configuration};

    #[test]
    fn admin_key_accepts_secure_value() {
        let key = "a".repeat(32);
        assert_eq!(validate_admin_key(Some(&key)), Ok(key));
    }

    #[test]
    fn admin_key_rejects_missing_or_empty_value() {
        assert!(validate_admin_key(None).is_err());
        assert!(validate_admin_key(Some("")).is_err());
        assert!(validate_admin_key(Some("   ")).is_err());
    }

    #[test]
    fn admin_key_rejects_example_value() {
        assert!(validate_admin_key(Some("change-me")).is_err());
    }

    #[test]
    fn admin_key_rejects_short_value() {
        assert!(validate_admin_key(Some("short-secret")).is_err());
    }

    #[test]
    fn stripe_requires_public_base_url_when_enabled() {
        assert!(validate_stripe_configuration(Some("sk_test_value"), None).is_err());
        assert!(validate_stripe_configuration(Some("sk_test_value"), Some(" ")).is_err());
    }

    #[test]
    fn stripe_accepts_configured_public_base_url() {
        assert_eq!(
            validate_stripe_configuration(Some("sk_test_value"), Some("https://grabitmap.com"),),
            Ok(())
        );
    }

    #[test]
    fn stripe_without_secret_does_not_require_public_base_url() {
        assert_eq!(validate_stripe_configuration(None, None), Ok(()));
        assert_eq!(validate_stripe_configuration(Some(" "), None), Ok(()));
    }
}
