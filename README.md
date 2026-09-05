# GRABIT

**GRABIT** (grabitmap.com) — карта работы, людей и объявлений.

Стек: Rust + Axum + SQLite.

## Запуск

1. Скопируйте `.env.example` в `.env` и задайте `ADMIN_KEY`.
2. Для локального HTTP без HTTPS установите `GRABIT_COOKIE_SECURE=0`.
3. Запустите сервер:

```bash
cargo run
```

4. Откройте http://127.0.0.1:3000/app
