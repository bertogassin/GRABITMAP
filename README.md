# GRABIT

**GRABIT** (grabitmap.com) — карта работы, людей и объявлений.

Стек: Rust + Axum + SQLite.

## Локальный запуск

1. Установите Rust stable.
2. Скопируйте `.env.example` в `.env`.
3. Замените `ADMIN_KEY` на случайную строку длиной не менее 32 символов.
4. Для локального HTTP без HTTPS установите `GRABIT_COOKIE_SECURE=0`.
5. Запустите сервер:

```bash
cargo run --release
```

Откройте http://127.0.0.1:3000/app. Проверка доступности: http://127.0.0.1:3000/health.

## Production

Скопируйте значения окружения из `.env.example` в секреты хостинга. Для платежей
задайте `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` и публичный HTTPS-адрес
в `PUBLIC_BASE_URL`. Не включайте `ALLOW_MOCK_PROMOTION_PAYMENT` в production.

Приложению нужны права записи в каталог базы данных и `MEDIA_DIR`. Базовые
значения — `data/votes.db` и `data/chat-media`; оба пути можно заменить
переменными окружения. Перед обновлением сохраняйте файл SQLite вместе с
файлами медиа. Миграции применяются автоматически при старте.

Запуск:

```bash
cargo run --release
```

Рекомендуется размещать приложение за HTTPS reverse proxy и направлять
`/health` на health-check. Порт задаётся переменной `PORT` (по умолчанию 3000).

## Основные переменные окружения

Полный список находится в `.env.example`. Обязательна только `ADMIN_KEY`;
почта владельца, Telegram и Stripe являются дополнительными интеграциями.
`STATIC_DIR` и `MEDIA_DIR` позволяют использовать смонтированные persistent
volumes в контейнерных и облачных окружениях.
