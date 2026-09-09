use std::env;

mod catalog;
mod db;
mod geography;
mod i18n;
mod internal_promotions;
mod resource_publisher;
mod resource_screening;
mod state;
mod stripe_payments;
mod telegram_groups;
mod telegram_notify;
mod web;

use state::app_state::AppState;

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

    internal_promotions::spawn_expiry_worker(db_pool.clone());

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
