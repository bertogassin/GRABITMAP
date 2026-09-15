mod account;
mod admin;
mod communication;
mod public;
mod resources;
mod system;

use crate::state::app_state::AppState;
use axum::{extract::DefaultBodyLimit, middleware, Router};

fn configured_static_directory(value: Option<String>) -> String {
    value
        .map(|value| value.trim().to_string())
        .filter(|value| !value.is_empty())
        .unwrap_or_else(|| "static".to_string())
}

pub fn routes(state: AppState) -> Router {
    let static_directory = configured_static_directory(std::env::var("STATIC_DIR").ok());

    Router::new()
        .merge(public::routes())
        .merge(account::routes())
        .merge(communication::routes())
        .merge(resources::routes())
        .merge(admin::routes())
        .merge(system::routes())
        .nest_service(
            "/static",
            tower_http::services::ServeDir::new(static_directory),
        )
        // Video uploads are still bounded again by type-specific handler limits.
        .layer(DefaultBodyLimit::max(15 * 1024 * 1024))
        .layer(middleware::from_fn(crate::web::handlers::security_headers))
        .layer(middleware::from_fn(crate::i18n::locale_middleware))
        .with_state(state)
}

#[cfg(test)]
mod tests {
    use super::configured_static_directory;

    #[test]
    fn static_directory_defaults_to_static() {
        assert_eq!(configured_static_directory(None), "static");
        assert_eq!(configured_static_directory(Some(" ".into())), "static");
    }

    #[test]
    fn static_directory_accepts_override() {
        assert_eq!(
            configured_static_directory(Some("/srv/grabit/static".into())),
            "/srv/grabit/static"
        );
    }
}
