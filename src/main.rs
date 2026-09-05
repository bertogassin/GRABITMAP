use std::env;

mod catalog;
mod db;
mod geography;
mod resource_publisher;
mod resource_screening;
mod state;
mod stripe_payments;
mod telegram_groups;
mod telegram_notify;
mod web;

use state::app_state::AppState;

#[tokio::main]
async fn main() {
    let _ = dotenvy::dotenv();

    validate_configuration();

    drop(db::queries::init_db().expect("Не удалось инициализировать базу данных"));

    db::owner_bootstrap::bootstrap_owner_from_env()
        .expect("Не удалось создать начального владельца из окружения");

    db::admin_v2::initialize().expect("Не удалось применить миграцию административной системы V2");

    db::geography_v2::initialize().expect("Не удалось применить миграцию Geography V2");

    db::admin_geography::initialize()
        .expect("Не удалось синхронизировать административную географию");

    let db_pool = db::pool::create_pool().expect("Не удалось создать SQLite connection pool");

    let bot_token = env::var("TELEGRAM_BOT_TOKEN")
        .ok()
        .map(|value| value.trim().to_string())
        .filter(|value| !value.is_empty());

    let admin_key = env::var("ADMIN_KEY").expect("ADMIN_KEY не задан");

    let state = AppState::new(db_pool.clone(), bot_token.clone(), admin_key);

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
        .await
        .expect("Ошибка HTTP сервера");
}

fn validate_configuration() {
    let admin_key = env::var("ADMIN_KEY")
        .ok()
        .map(|value| value.trim().to_string())
        .filter(|value| !value.is_empty());

    match admin_key {
        Some(value) if value != "change-me" && value.len() >= 32 => {}
        Some(_) => {
            eprintln!(
                "ADMIN_KEY must be at least 32 characters and must not use the example value"
            );
            std::process::exit(1);
        }
        None => {
            eprintln!("ADMIN_KEY is required");
            std::process::exit(1);
        }
    }

    if env::var("STRIPE_SECRET_KEY")
        .ok()
        .is_some_and(|value| !value.trim().is_empty())
        && env::var("PUBLIC_BASE_URL")
            .ok()
            .map(|value| value.trim().is_empty())
            .unwrap_or(true)
    {
        eprintln!("PUBLIC_BASE_URL is required when Stripe payments are enabled");
        std::process::exit(1);
    }
}
