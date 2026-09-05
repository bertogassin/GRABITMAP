use axum::{routing::get, Router};

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = Router::new().route("/", get(|| async { "GRABIT — grabitmap.com" }));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await.unwrap();
    println!("GRABIT запущен на http://127.0.0.1:3000");
    
    axum::serve(listener, app).await.unwrap();
}
