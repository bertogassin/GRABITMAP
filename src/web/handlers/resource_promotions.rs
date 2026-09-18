use super::auth::verify_authenticated_user;
use super::common::{rate_limit_retry_after, request_is_cross_site, unix_now};
use super::types::PromotionRequestForm;
use crate::internal_promotions::{self, ActivationOutcome, FREE_CAMPAIGN_END};
use crate::resource_publisher::{
    finalize_paid_promotion, mark_promotion_paid_with_reference, store_checkout_session_id,
    try_publish_promotion, PromotionFinalizeOutcome,
};
use crate::state::app_state::AppState;
use crate::stripe_payments::{
    checkout_session_is_paid, checkout_session_payment_reference, checkout_session_request_id,
    checkout_session_user_id, create_promotion_checkout_session, fetch_checkout_session,
    mock_promotion_payment_allowed, promotion_payment_available, refund_promotion_payment,
    stripe_configured, verify_webhook_signature,
};
use crate::web::handlers::admin::is_resource_moderation_session;
use crate::web::handlers::admin::moderation_scope_filter;
use crate::web::templates;
use axum::{
    body::Bytes,
    extract::{Form, Path, Query, State},
    http::{header, HeaderMap, StatusCode},
    response::{Html, IntoResponse, Redirect, Response},
};
use serde::Deserialize;

struct PromotionResource {
    id: i64,
    category: String,
    title: String,
    description: String,
    address: String,
    moderation_status: String,
    is_active: i64,
}

fn resource_is_eligible(moderation_status: &str, is_active: i64) -> bool {
    moderation_status == "approved" && is_active == 1
}

fn load_owned_resource(
    connection: &rusqlite::Connection,
    resource_id: i64,
    owner_client_id: &str,
) -> Option<PromotionResource> {
    connection
        .query_row(
            "SELECT
                id,
                category,
                title,
                description,
                address,
                moderation_status,
                is_active
             FROM resources
             WHERE id = ?1
               AND client_id = ?2
             LIMIT 1",
            rusqlite::params![resource_id, owner_client_id,],
            |row| {
                Ok(PromotionResource {
                    id: row.get(0)?,
                    category: row.get(1)?,
                    title: row.get(2)?,
                    description: row.get(3)?,
                    address: row.get(4)?,
                    moderation_status: row.get(5)?,
                    is_active: row.get(6)?,
                })
            },
        )
        .ok()
}

fn status_response(
    title: &str,
    eyebrow: &str,
    heading: &str,
    description: &str,
    resource_id: i64,
) -> Response {
    Html(templates::status_page(
        title,
        eyebrow,
        heading,
        description,
        &templates::navigation_card(
            &format!("/app/resource/{resource_id}"),
            "map-pin",
            "Вернуться к объявлению",
            "Страница объявления",
        ),
    ))
    .into_response()
}

fn finalize_status_response(
    resource_id: i64,
    outcome: PromotionFinalizeOutcome,
    publish_error: Option<&str>,
) -> Response {
    match outcome {
        PromotionFinalizeOutcome::AlreadyPublished | PromotionFinalizeOutcome::Published => {
            status_response(
                "Опубликовано · GRABIT",
                "✓ GRABIT",
                "Объявление опубликовано",
                "Платёж принят, объявление отправлено в городскую группу.",
                resource_id,
            )
        }
        PromotionFinalizeOutcome::AwaitingModeration => {
            if let Some(error) = publish_error {
                status_response(
                    "Публикация · GRABIT",
                    "⚠ GRABIT",
                    "Оплата принята, публикация отложена",
                    &format!(
                        "Оплата прошла успешно, но отправка в группу временно недоступна ({error}). Администратор поможет завершить публикацию."
                    ),
                    resource_id,
                )
            } else {
                status_response(
                    "Модерация · GRABIT",
                    "✓ GRABIT",
                    "Оплата принята",
                    "Заявка передана администратору. После проверки объявление будет опубликовано в группе.",
                    resource_id,
                )
            }
        }
    }
}

async fn complete_paid_promotion(
    state: &AppState,
    resource_id: i64,
    request_id: i64,
    user_id: i64,
    payment_reference: &str,
) -> Response {
    let paid = match mark_promotion_paid_with_reference(
        &state.db_pool,
        request_id,
        user_id,
        payment_reference,
    ) {
        Ok(paid) => paid,
        Err(_) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                "Не удалось подтвердить оплату",
            )
                .into_response();
        }
    };

    if !paid {
        match finalize_paid_promotion(state, request_id, user_id, false).await {
            Ok(outcome) => return finalize_status_response(resource_id, outcome, None),
            Err(_) => {
                return status_response(
                    "Оплата · GRABIT",
                    "⚠ GRABIT",
                    "Оплата уже подтверждена",
                    "Повторная оплата не требуется.",
                    resource_id,
                );
            }
        }
    }

    match finalize_paid_promotion(state, request_id, user_id, true).await {
        Ok(outcome) => finalize_status_response(resource_id, outcome, None),
        Err(error) => finalize_status_response(
            resource_id,
            PromotionFinalizeOutcome::AwaitingModeration,
            Some(&error),
        ),
    }
}

pub async fn resource_promotion_page(
    State(state): State<AppState>,
    Path(resource_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    let authenticated = match verify_authenticated_user(&state, &headers) {
        Some(user) => user,
        None => return Redirect::temporary("/login?next=/app/my-resources").into_response(),
    };

    let connection = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(connection) => connection,
        Err(_) => {
            return (StatusCode::SERVICE_UNAVAILABLE, "Сервис недоступен").into_response();
        }
    };

    let Some(resource) = load_owned_resource(&connection, resource_id, &authenticated.client_id)
    else {
        return status_response(
            "Продвижение · GRABIT",
            "⚠ Доступ",
            "Нет доступа",
            "Продвигать объявление может только его владелец.",
            resource_id,
        );
    };

    if !resource_is_eligible(&resource.moderation_status, resource.is_active) {
        return status_response(
            "Продвижение · GRABIT",
            "Модерация",
            "Продвижение недоступно",
            "Сначала объявление должно быть одобрено и опубликовано.",
            resource_id,
        );
    }

    let active_until: i64 = connection
        .query_row(
            "SELECT COALESCE(internal_promotion_until, 0) FROM resources WHERE id = ?1",
            rusqlite::params![resource_id],
            |row| row.get(0),
        )
        .unwrap_or(0);

    Html(templates::render_internal_promotion(
        resource.id,
        &resource.title,
        &resource.category,
        &resource.description,
        &resource.address,
        active_until,
        unix_now(),
    ))
    .into_response()
}

pub async fn request_resource_promotion(
    State(state): State<AppState>,
    Path(resource_id): Path<i64>,
    headers: HeaderMap,
    Form(_form): Form<PromotionRequestForm>,
) -> Response {
    if request_is_cross_site(&headers) {
        return (StatusCode::FORBIDDEN, "Запрос отклонён").into_response();
    }

    let authenticated = match verify_authenticated_user(&state, &headers) {
        Some(user) => user,
        None => return (StatusCode::UNAUTHORIZED, "Требуется вход").into_response(),
    };

    if let Some(retry_after) = rate_limit_retry_after(
        &state,
        authenticated.user_id,
        "internal_promotion_request",
        5,
        3_600,
    )
    .await
    {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            [(header::RETRY_AFTER, retry_after.to_string())],
            "Слишком много запросов. Повторите попытку позже.",
        )
            .into_response();
    }

    if unix_now() > FREE_CAMPAIGN_END {
        return status_response(
            "Продвижение · GRABIT",
            "Акция завершена",
            "Автоматическая оплата не включена",
            "Бесплатная акция завершилась. Новые условия появятся только после решения владельца GRABIT.",
            resource_id,
        );
    }

    let mut connection = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(connection) => connection,
        Err(_) => return (StatusCode::SERVICE_UNAVAILABLE, "Сервис недоступен").into_response(),
    };

    match internal_promotions::activate(
        &mut connection,
        resource_id,
        authenticated.user_id,
        &authenticated.client_id,
        unix_now(),
    ) {
        Ok(ActivationOutcome::Activated(until)) => status_response(
            "Продвижение включено · GRABIT",
            "100% скидка",
            "Объявление поднято на 30 дней",
            &format!(
                "Внутреннее продвижение GRABIT активно до {}. Оплата не требуется.",
                internal_promotions::format_until(until)
            ),
            resource_id,
        ),
        Ok(ActivationOutcome::AlreadyActive(until)) => status_response(
            "Продвижение активно · GRABIT",
            "✓ GRABIT",
            "Объявление уже продвигается",
            &format!(
                "Продвижение действует до {}. Продлить его можно в последние 7 дней.",
                internal_promotions::format_until(until)
            ),
            resource_id,
        ),
        Err(error) => status_response(
            "Продвижение · GRABIT",
            "⚠ GRABIT",
            "Не удалось включить продвижение",
            &format!("Запрос не выполнен ({error})."),
            resource_id,
        ),
    }
}

pub async fn promotion_payment_page(
    State(state): State<AppState>,
    Path((resource_id, request_id)): Path<(i64, i64)>,
    headers: HeaderMap,
) -> Response {
    let authenticated = match verify_authenticated_user(&state, &headers) {
        Some(user) => user,
        None => {
            return Redirect::temporary(&format!(
                "/login?next={}",
                urlencoding::encode(&format!(
                    "/app/resource/{resource_id}/promote/pay/{request_id}"
                ))
            ))
            .into_response();
        }
    };

    let connection = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(connection) => connection,
        Err(_) => {
            return status_response(
                "Оплата · GRABIT",
                "⚠ GRABIT",
                "Сервис недоступен",
                "Повторите попытку позже.",
                resource_id,
            );
        }
    };

    let row: Option<(String, String, String, i64)> = connection
        .query_row(
            "SELECT pr.payment_status,
                    pr.bot_check_status,
                    COALESCE(pr.bot_check_reason, ''),
                    pr.price_minor
             FROM resource_promotion_requests pr
             JOIN resources r ON r.id = pr.resource_id
             WHERE pr.id = ?1
               AND pr.resource_id = ?2
               AND pr.requester_user_id = ?3
             LIMIT 1",
            rusqlite::params![request_id, resource_id, authenticated.user_id],
            |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?)),
        )
        .ok();

    drop(connection);

    let Some((payment_status, bot_status, bot_reason, price_minor)) = row else {
        return status_response(
            "Оплата · GRABIT",
            "⚠ Доступ",
            "Заявка не найдена",
            "Проверьте ссылку или создайте новую заявку.",
            resource_id,
        );
    };

    if payment_status == "paid" {
        return status_response(
            "Оплата · GRABIT",
            "✓ GRABIT",
            "Оплата уже подтверждена",
            if bot_status == "passed" {
                "Объявление будет опубликовано в группе автоматически после проверки системы."
            } else {
                "Заявка передана администратору для модерации перед публикацией в группе."
            },
            resource_id,
        );
    }

    if !promotion_payment_available() {
        return status_response(
            "Оплата · GRABIT",
            "⚠ GRABIT",
            "Оплата недоступна",
            "Платёжный сервис не настроен. Обратитесь к администратору.",
            resource_id,
        );
    }

    let price_label = format!("{:.2} €", price_minor as f64 / 100.0);
    let bot_note = if bot_status == "passed" {
        "Автопроверка пройдена: после оплаты публикация в группе выполняется сразу."
    } else {
        "Автопроверка не пройдена: после оплаты заявка уйдёт администратору, затем — в группу."
    };

    Html(templates::render_promotion_payment(
        resource_id,
        request_id,
        &price_label,
        bot_note,
        if bot_reason.trim().is_empty() {
            None
        } else {
            Some(bot_reason.as_str())
        },
        stripe_configured(),
        mock_promotion_payment_allowed(),
    ))
    .into_response()
}

pub async fn confirm_promotion_payment(
    State(state): State<AppState>,
    Path((resource_id, request_id)): Path<(i64, i64)>,
    headers: HeaderMap,
) -> Response {
    if request_is_cross_site(&headers) {
        return (StatusCode::FORBIDDEN, "Запрос отклонён").into_response();
    }

    let authenticated = match verify_authenticated_user(&state, &headers) {
        Some(user) => user,
        None => return (StatusCode::UNAUTHORIZED, "Требуется вход").into_response(),
    };

    if stripe_configured() {
        let connection = match crate::db::pool::get_connection(&state.db_pool) {
            Ok(connection) => connection,
            Err(_) => {
                return (StatusCode::SERVICE_UNAVAILABLE, "Сервис недоступен").into_response();
            }
        };

        let row: Option<(i64, String)> = connection
            .query_row(
                "SELECT pr.price_minor, r.title
                 FROM resource_promotion_requests pr
                 JOIN resources r ON r.id = pr.resource_id
                 WHERE pr.id = ?1
                   AND pr.resource_id = ?2
                   AND pr.requester_user_id = ?3
                   AND pr.payment_status = 'pending'
                 LIMIT 1",
                rusqlite::params![request_id, resource_id, authenticated.user_id],
                |row| Ok((row.get(0)?, row.get(1)?)),
            )
            .ok();
        drop(connection);

        let Some((price_minor, title)) = row else {
            return status_response(
                "Оплата · GRABIT",
                "⚠ GRABIT",
                "Оплата недоступна",
                "Заявка не найдена или уже оплачена.",
                resource_id,
            );
        };

        let product_name = format!("GRABIT · {}", title.trim());
        let session = match create_promotion_checkout_session(
            resource_id,
            request_id,
            authenticated.user_id,
            price_minor,
            "EUR",
            &product_name,
        )
        .await
        {
            Ok(session) => session,
            Err(error) => {
                return status_response(
                    "Оплата · GRABIT",
                    "⚠ Stripe",
                    "Не удалось создать оплату",
                    &format!("Платёжный сервис временно недоступен ({error})."),
                    resource_id,
                );
            }
        };

        let _ = store_checkout_session_id(
            &state.db_pool,
            request_id,
            authenticated.user_id,
            &session.id,
        );

        return Redirect::temporary(&session.url).into_response();
    }

    if !mock_promotion_payment_allowed() {
        return status_response(
            "Оплата · GRABIT",
            "⚠ GRABIT",
            "Оплата недоступна",
            "Платёжный сервис не настроен. Обратитесь к администратору GRABIT.",
            resource_id,
        );
    }

    complete_paid_promotion(
        &state,
        resource_id,
        request_id,
        authenticated.user_id,
        "dev_mock_payment",
    )
    .await
}

#[derive(Debug, Deserialize)]
pub struct PromotionPaidQuery {
    session_id: Option<String>,
}

pub async fn promotion_payment_return(
    State(state): State<AppState>,
    Path((resource_id, request_id)): Path<(i64, i64)>,
    Query(query): Query<PromotionPaidQuery>,
    headers: HeaderMap,
) -> Response {
    let authenticated = match verify_authenticated_user(&state, &headers) {
        Some(user) => user,
        None => {
            return Redirect::temporary(&format!(
                "/login?next={}",
                urlencoding::encode(&format!(
                    "/app/resource/{resource_id}/promote/paid/{request_id}"
                ))
            ))
            .into_response();
        }
    };

    let Some(session_id) = query
        .session_id
        .as_deref()
        .map(str::trim)
        .filter(|value| !value.is_empty())
    else {
        return status_response(
            "Оплата · GRABIT",
            "⚠ GRABIT",
            "Сессия оплаты не найдена",
            "Вернитесь на страницу оплаты и повторите попытку.",
            resource_id,
        );
    };

    let session = match fetch_checkout_session(session_id).await {
        Ok(session) => session,
        Err(error) => {
            return status_response(
                "Оплата · GRABIT",
                "⚠ Stripe",
                "Не удалось проверить оплату",
                &format!("Stripe вернул ошибку ({error})."),
                resource_id,
            );
        }
    };

    if checkout_session_request_id(&session) != Some(request_id) {
        return status_response(
            "Оплата · GRABIT",
            "⚠ GRABIT",
            "Неверная сессия оплаты",
            "Платёж не соответствует этой заявке.",
            resource_id,
        );
    }

    if checkout_session_user_id(&session) != Some(authenticated.user_id) {
        return (StatusCode::FORBIDDEN, "Нет доступа к этой оплате").into_response();
    }

    if !checkout_session_is_paid(&session) {
        return status_response(
            "Оплата · GRABIT",
            "⚠ GRABIT",
            "Оплата ещё не подтверждена",
            "Дождитесь завершения платежа в Stripe или повторите попытку.",
            resource_id,
        );
    }

    complete_paid_promotion(
        &state,
        resource_id,
        request_id,
        authenticated.user_id,
        &checkout_session_payment_reference(&session),
    )
    .await
}

pub async fn stripe_promotion_webhook(
    State(state): State<AppState>,
    headers: HeaderMap,
    body: Bytes,
) -> Response {
    let secret = match crate::stripe_payments::stripe_webhook_secret() {
        Some(secret) => secret,
        None => return StatusCode::NOT_FOUND.into_response(),
    };

    let signature = headers
        .get("stripe-signature")
        .and_then(|value| value.to_str().ok())
        .unwrap_or_default();

    if !verify_webhook_signature(body.as_ref(), signature, &secret) {
        return StatusCode::BAD_REQUEST.into_response();
    }

    let payload: serde_json::Value = match serde_json::from_slice(body.as_ref()) {
        Ok(value) => value,
        Err(_) => return StatusCode::BAD_REQUEST.into_response(),
    };

    if payload.get("type").and_then(|value| value.as_str()) != Some("checkout.session.completed") {
        return StatusCode::OK.into_response();
    }

    let session = match payload.get("data").and_then(|data| data.get("object")) {
        Some(session) => session.clone(),
        None => return StatusCode::BAD_REQUEST.into_response(),
    };

    if !checkout_session_is_paid(&session) {
        return StatusCode::OK.into_response();
    }

    let Some(request_id) = checkout_session_request_id(&session) else {
        return StatusCode::OK.into_response();
    };

    let user_id = checkout_session_user_id(&session).unwrap_or(0);
    let payment_reference = checkout_session_payment_reference(&session);

    let paid =
        mark_promotion_paid_with_reference(&state.db_pool, request_id, user_id, &payment_reference)
            .unwrap_or(false);

    let _ = finalize_paid_promotion(&state, request_id, user_id, paid).await;

    StatusCode::OK.into_response()
}

#[derive(Debug, Default, Deserialize)]
pub struct AdminPromotionQuery {
    error: Option<String>,
    published: Option<String>,
}

#[allow(clippy::type_complexity)]
pub async fn admin_promotion_queue(
    State(state): State<AppState>,
    headers: HeaderMap,
    Query(query): Query<AdminPromotionQuery>,
) -> Response {
    if !is_resource_moderation_session(&state, &headers) {
        return Redirect::temporary("/login?next=%2Fapp%2Fadmin%2Fpromotions").into_response();
    }

    let connection = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(connection) => connection,
        Err(_) => {
            return Html("<h1>503</h1><p>База данных недоступна.</p>".to_string()).into_response();
        }
    };

    let scope_filter = moderation_scope_filter(&state, &headers).replace("resources.", "r.");

    let rows: Vec<(i64, i64, String, String, String, String, String, i64)> = connection
        .prepare(&format!(
            "SELECT
                pr.id,
                pr.resource_id,
                r.title,
                r.category,
                COALESCE(r.listing_type, 'general'),
                pr.bot_check_status,
                COALESCE(pr.bot_check_reason, ''),
                pr.created_at
             FROM resource_promotion_requests pr
             JOIN resources r ON r.id = pr.resource_id
             WHERE pr.payment_status = 'paid'
               AND pr.status IN ('pending', 'failed')
               {scope_filter}
             ORDER BY pr.created_at ASC, pr.id ASC
             LIMIT 100"
        ))
        .and_then(|mut stmt| {
            stmt.query_map([], |row| {
                Ok((
                    row.get(0)?,
                    row.get(1)?,
                    row.get(2)?,
                    row.get(3)?,
                    row.get(4)?,
                    row.get(5)?,
                    row.get(6)?,
                    row.get(7)?,
                ))
            })?
            .collect::<Result<Vec<_>, _>>()
        })
        .unwrap_or_default();

    drop(connection);

    let notice = if query.published.as_deref() == Some("1") {
        Some("Объявление опубликовано в группе.".to_string())
    } else {
        query
            .error
            .as_ref()
            .map(|value| value.trim())
            .filter(|value| !value.is_empty())
            .map(|error| format!("Ошибка: {error}"))
    };

    Html(templates::render_admin_promotion_queue(
        &rows,
        notice.as_deref(),
    ))
    .into_response()
}

pub async fn admin_approve_promotion(
    State(state): State<AppState>,
    Path(request_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    if request_is_cross_site(&headers) {
        return (StatusCode::FORBIDDEN, "Запрос отклонён").into_response();
    }
    if !is_resource_moderation_session(&state, &headers) {
        return (StatusCode::FORBIDDEN, "Недостаточно прав").into_response();
    }

    let connection = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(connection) => connection,
        Err(_) => return (StatusCode::SERVICE_UNAVAILABLE, "DB error").into_response(),
    };

    let now = unix_now();
    let scope_filter = moderation_scope_filter(&state, &headers).replace("resources.", "r.");
    let updated = connection.execute(
        &format!(
            "UPDATE resource_promotion_requests
         SET status = 'approved',
             updated_at = ?2
         WHERE id = ?1
           AND payment_status = 'paid'
           AND status IN ('pending', 'failed')
           AND EXISTS (
               SELECT 1 FROM resources AS r
               WHERE r.id = resource_promotion_requests.resource_id
                 {scope_filter}
           )"
        ),
        rusqlite::params![request_id, now],
    );
    drop(connection);

    if updated.unwrap_or(0) != 1 {
        return Redirect::temporary("/app/admin/promotions").into_response();
    }

    match try_publish_promotion(&state, request_id, 0).await {
        Ok(()) => Redirect::temporary("/app/admin/promotions?published=1").into_response(),
        Err(error) => Redirect::temporary(&format!(
            "/app/admin/promotions?error={}",
            urlencoding::encode(&error)
        ))
        .into_response(),
    }
}

pub async fn admin_reject_promotion(
    State(state): State<AppState>,
    Path(request_id): Path<i64>,
    headers: HeaderMap,
) -> Response {
    if request_is_cross_site(&headers) {
        return (StatusCode::FORBIDDEN, "Запрос отклонён").into_response();
    }
    if !is_resource_moderation_session(&state, &headers) {
        return (StatusCode::FORBIDDEN, "Недостаточно прав").into_response();
    }

    let connection = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(connection) => connection,
        Err(_) => return (StatusCode::SERVICE_UNAVAILABLE, "DB error").into_response(),
    };

    let scope_filter = moderation_scope_filter(&state, &headers).replace("resources.", "r.");
    let row: Option<(i64, i64, String, String, String)> = connection
        .query_row(
            &format!(
                "SELECT pr.requester_user_id,
                    pr.resource_id,
                    r.title,
                    pr.payment_status,
                    COALESCE(pr.stripe_payment_reference, '')
             FROM resource_promotion_requests pr
             JOIN resources r ON r.id = pr.resource_id
             WHERE pr.id = ?1
               AND pr.status IN ('pending', 'failed')
               {scope_filter}
             LIMIT 1"
            ),
            rusqlite::params![request_id],
            |row| {
                Ok((
                    row.get(0)?,
                    row.get(1)?,
                    row.get(2)?,
                    row.get(3)?,
                    row.get(4)?,
                ))
            },
        )
        .ok();

    let Some((user_id, resource_id, title, payment_status, payment_reference)) = row else {
        return Redirect::temporary("/app/admin/promotions").into_response();
    };

    if payment_status == "paid" {
        if let Err(error) = refund_promotion_payment(&payment_reference).await {
            return Redirect::temporary(&format!(
                "/app/admin/promotions?error={}",
                urlencoding::encode(&error)
            ))
            .into_response();
        }
    }

    let _ = connection.execute(
        "UPDATE resource_promotion_requests
         SET status = 'rejected',
             payment_status = CASE
                 WHEN ?2 = 'paid' THEN 'refunded'
                 ELSE payment_status
             END,
             updated_at = strftime('%s','now')
         WHERE id = ?1
           AND status IN ('pending', 'failed')",
        rusqlite::params![request_id, payment_status],
    );

    let message = if payment_status == "paid" {
        format!(
            "Заявка на публикацию «{}» отклонена. Оплата будет возвращена.",
            title.trim()
        )
    } else {
        format!(
            "Заявка на публикацию «{}» отклонена администратором.",
            title.trim()
        )
    };

    let _ = connection.execute(
        "INSERT INTO user_notifications (
            user_id,
            resource_id,
            kind,
            title,
            message,
            is_read,
            created_at
         )
         VALUES (
            ?1,
            ?2,
            'promotion_rejected',
            'Продвижение отклонено',
            ?3,
            0,
            strftime('%s','now')
         )",
        rusqlite::params![user_id, resource_id, message],
    );

    Redirect::temporary("/app/admin/promotions").into_response()
}

pub async fn retry_promotion_publish(
    State(state): State<AppState>,
    Path((resource_id, request_id)): Path<(i64, i64)>,
    headers: HeaderMap,
) -> Response {
    if request_is_cross_site(&headers) {
        return (StatusCode::FORBIDDEN, "Запрос отклонён").into_response();
    }

    let authenticated = match verify_authenticated_user(&state, &headers) {
        Some(user) => user,
        None => return (StatusCode::UNAUTHORIZED, "Требуется вход").into_response(),
    };

    let connection = match crate::db::pool::get_connection(&state.db_pool) {
        Ok(connection) => connection,
        Err(_) => {
            return (StatusCode::SERVICE_UNAVAILABLE, "Сервис недоступен").into_response();
        }
    };

    let row: Option<(String, String, String)> = connection
        .query_row(
            "SELECT pr.status, pr.payment_status, COALESCE(pr.bot_check_status, 'unknown')
             FROM resource_promotion_requests pr
             JOIN resources r ON r.id = pr.resource_id
             WHERE pr.id = ?1
               AND pr.resource_id = ?2
               AND pr.requester_user_id = ?3
               AND r.client_id = ?4
             LIMIT 1",
            rusqlite::params![
                request_id,
                resource_id,
                authenticated.user_id,
                authenticated.client_id,
            ],
            |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?)),
        )
        .ok();
    drop(connection);

    let Some((status, payment_status, bot_status)) = row else {
        return status_response(
            "Продвижение · GRABIT",
            "⚠ Доступ",
            "Заявка не найдена",
            "Проверьте ссылку или создайте новую заявку.",
            resource_id,
        );
    };

    if payment_status != "paid" || status != "failed" || bot_status != "passed" {
        return status_response(
            "Продвижение · GRABIT",
            "⚠ GRABIT",
            "Повтор недоступен",
            "Повторная отправка доступна только для оплаченных заявок с пройденной автопроверкой.",
            resource_id,
        );
    }

    match try_publish_promotion(&state, request_id, authenticated.user_id).await {
        Ok(()) => status_response(
            "Опубликовано · GRABIT",
            "✓ GRABIT",
            "Объявление опубликовано",
            "Объявление опубликовано в городской группе.",
            resource_id,
        ),
        Err(error) => status_response(
            "Публикация · GRABIT",
            "⚠ GRABIT",
            "Публикация не удалась",
            &format!(
                "Повторная отправка не удалась ({error}). Попробуйте позже или обратитесь к администратору."
            ),
            resource_id,
        ),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn only_approved_active_resource_is_eligible() {
        assert!(resource_is_eligible("approved", 1));
        assert!(!resource_is_eligible("pending", 1));
        assert!(!resource_is_eligible("rejected", 1));
        assert!(!resource_is_eligible("approved", 0));
    }
}
