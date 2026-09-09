# GRABIT

**GRABIT** (grabitmap.com) — карта работы, людей и объявлений.

Стек: Rust + Axum + SQLite.

## Что умеет

- карта: континент → страна → город
- поиск по рубрикам и профессиям
- объявления
- чат
- вход по email и паролю
- админка

GRABIT — самостоятельная платформа. Аккаунты, чаты, уведомления и
веб-приложение не зависят от Telegram или другой социальной сети. Внешние
сети могут подключаться только как необязательные каналы публикации.

## Локальный запуск

1. Скопируйте `.env.example` в `.env`.
2. Задайте `ADMIN_KEY`.
3. Для HTTP без HTTPS поставьте `GRABIT_COOKIE_SECURE=0`.
4. Запустите:

```powershell
.\scripts\run_local.ps1
```

или `cargo run`.

Откройте http://127.0.0.1:3000/app

Проверка: http://127.0.0.1:3000/health должно вернуть `ok`.

Для оркестратора используйте `/ready`: он возвращает `ready` только при
доступном SQLite connection pool. `/metrics` отдаёт базовые Prometheus-метрики
пула соединений.

Если почта (`RESEND_API_KEY`) не задана, регистрация сразу входит в аккаунт. Код из письма нужен только когда почта настроена.

## Docker

```bash
docker compose up --build
```

Перед продом задайте свой `ADMIN_KEY` и `PUBLIC_BASE_URL=https://grabitmap.com`.

## Переменные

| Переменная | Зачем |
|---|---|
| `ADMIN_KEY` | обязательный секрет админки |
| `GRABIT_COOKIE_SECURE` | `0` для локального HTTP |
| `PORT` | порт, по умолчанию 3000 |
| `DATABASE_URL` | SQLite, по умолчанию `sqlite:data/votes.db` |
| `PUBLIC_BASE_URL` | публичный адрес сайта |
| `RESEND_API_KEY` | письма: код входа и сброс пароля |
| `OWNER_BOOTSTRAP_EMAIL` / `OWNER_BOOTSTRAP_PASSWORD` | первый владелец |
