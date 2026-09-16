#!/usr/bin/env bash
set -Eeuo pipefail

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
APP_SERVICE="${APP_SERVICE:-grabit}"
CADDY_SERVICE="${CADDY_SERVICE:-caddy}"
NEXT_NAME="grabit-next-$(date -u +%Y%m%d%H%M%S)"
ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
TEMP_STAGED_CADDY="$(mktemp)"
TEMP_PRIMARY_CADDY="$(mktemp)"
BACKUP_ROOT="${BACKUP_ROOT:-/root/grabit-backups}"
BACKUP_DIR="$BACKUP_ROOT/staged-$(date -u +%Y%m%dT%H%M%SZ)"
SWITCHED=0

cd "$ROOT_DIR"

cleanup() {
    rm -f "$TEMP_STAGED_CADDY" "$TEMP_PRIMARY_CADDY"

    if [ "$SWITCHED" -eq 0 ]; then
        docker rm -f "$NEXT_NAME" >/dev/null 2>&1 || true
    else
        echo "⚠️ Основной backend не восстановлен."
        echo "⚠️ Caddy оставлен на $NEXT_NAME; контейнер сохранён."
    fi
}
trap cleanup EXIT

test -f "$COMPOSE_FILE"
test -f Caddyfile
test -f .env
test -z "$(git status --porcelain --untracked-files=no)"

CURRENT_ID="$(docker compose -f "$COMPOSE_FILE" ps -q "$APP_SERVICE")"
CADDY_ID="$(docker compose -f "$COMPOSE_FILE" ps -q "$CADDY_SERVICE")"

test -n "$CURRENT_ID"
test -n "$CADDY_ID"

IMAGE_REF="$(docker inspect "$CURRENT_ID" --format '{{.Config.Image}}')"
test -n "$IMAGE_REF"

NETWORK="$(
    docker inspect "$CURRENT_ID" \
        --format '{{range $name, $_ := .NetworkSettings.Networks}}{{println $name}}{{end}}' |
    head -1
)"

DATA_VOLUME="$(
    docker inspect "$CURRENT_ID" \
        --format '{{range .Mounts}}{{if eq .Destination "/app/data"}}{{.Name}}{{end}}{{end}}'
)"

DATA_SOURCE="$(
    docker inspect "$CURRENT_ID" \
        --format '{{range .Mounts}}{{if eq .Destination "/app/data"}}{{.Source}}{{end}}{{end}}'
)"

test -n "$NETWORK"
test -n "$DATA_VOLUME"
test -n "$DATA_SOURCE"
test -f "$DATA_SOURCE/votes.db"

echo "=== CREATE VERIFIED BACKUP ==="
BACKUP_DIR="$BACKUP_DIR" \
DATA_SOURCE="$DATA_SOURCE" \
CURRENT_ID="$CURRENT_ID" \
IMAGE_ID="$(docker inspect "$CURRENT_ID" --format '{{.Image}}')" \
COMPOSE_FILE="$COMPOSE_FILE" \
APP_SERVICE="$APP_SERVICE" \
    "$ROOT_DIR/scripts/backup_production.sh"

echo "=== BUILD NEW IMAGE ==="
docker compose -f "$COMPOSE_FILE" build "$APP_SERVICE"

IMAGE_ID="$(docker image inspect "$IMAGE_REF" --format '{{.Id}}')"
test -n "$IMAGE_ID"

echo "=== START STAGED BACKEND ==="
docker run -d \
    --name "$NEXT_NAME" \
    --label com.grabitmap.staged=true \
    --init \
    --restart no \
    --env-file .env \
    -e PORT=3000 \
    -e PUBLIC_BASE_URL=https://grabitmap.com \
    -e GRABIT_COOKIE_SECURE=1 \
    --network "$NETWORK" \
    -v "$DATA_VOLUME:/app/data" \
    "$IMAGE_ID" >/dev/null

STATUS="starting"
for attempt in $(seq 1 60); do
    STATUS="$(
        docker inspect "$NEXT_NAME" \
            --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}'
    )"

    if [ "$STATUS" = "healthy" ]; then
        break
    fi

    if [ "$STATUS" = "unhealthy" ] || [ "$STATUS" = "exited" ]; then
        docker logs --tail=100 "$NEXT_NAME"
        exit 1
    fi

    sleep 1
done

test "$STATUS" = "healthy"

sed \
    "s/reverse_proxy grabit:3000/reverse_proxy ${NEXT_NAME}:3000/" \
    Caddyfile > "$TEMP_STAGED_CADDY"

# Git can replace a bind-mounted file's inode while the long-running Caddy
# container keeps the old inode mounted at /etc/caddy/Caddyfile. Copy both
# configs from the current worktree and reload only those explicit copies.
cp Caddyfile "$TEMP_PRIMARY_CADDY"

grep -F "reverse_proxy ${NEXT_NAME}:3000" "$TEMP_STAGED_CADDY" >/dev/null
grep -F "reverse_proxy grabit:3000" "$TEMP_PRIMARY_CADDY" >/dev/null

docker cp "$TEMP_STAGED_CADDY" "$CADDY_ID:/tmp/Caddyfile.staged"
docker cp "$TEMP_PRIMARY_CADDY" "$CADDY_ID:/tmp/Caddyfile.primary"

docker compose -f "$COMPOSE_FILE" exec -T "$CADDY_SERVICE" \
    caddy validate \
    --config /tmp/Caddyfile.staged \
    --adapter caddyfile

docker compose -f "$COMPOSE_FILE" exec -T "$CADDY_SERVICE" \
    caddy validate \
    --config /tmp/Caddyfile.primary \
    --adapter caddyfile

echo "=== SWITCH TRAFFIC TO STAGED BACKEND ==="
docker compose -f "$COMPOSE_FILE" exec -T "$CADDY_SERVICE" \
    caddy reload \
    --config /tmp/Caddyfile.staged \
    --adapter caddyfile

SWITCHED=1

curl --retry 10 --retry-delay 1 --retry-connrefused \
    -fsS https://grabitmap.com/ready >/dev/null

echo "=== REPLACE PRIMARY BACKEND ==="
docker compose -f "$COMPOSE_FILE" up \
    -d \
    --no-deps \
    --no-build \
    --wait \
    "$APP_SERVICE"

echo "=== SWITCH TRAFFIC BACK TO PRIMARY ==="
docker compose -f "$COMPOSE_FILE" exec -T "$CADDY_SERVICE" \
    caddy reload \
    --config /tmp/Caddyfile.primary \
    --adapter caddyfile

if ! curl --retry 10 --retry-delay 1 --retry-connrefused \
    -fsS https://grabitmap.com/ready >/dev/null
then
    echo "❌ Primary backend failed public readiness; returning to staged backend"

    docker compose -f "$COMPOSE_FILE" exec -T "$CADDY_SERVICE" \
        caddy reload \
        --config /tmp/Caddyfile.staged \
        --adapter caddyfile

    exit 1
fi

SWITCHED=0
docker rm -f "$NEXT_NAME" >/dev/null

echo "✅ STAGED DEPLOY COMPLETED"
