#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="${GRABIT_ROOT:-/opt/grabit}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
PUBLIC_URL="${MONITOR_PUBLIC_URL:-https://grabitmap.com}"
STATE_DIR="${MONITOR_STATE_DIR:-/var/lib/grabit-monitor}"
STATE_FILE="$STATE_DIR/current"
LOCK_FILE="$STATE_DIR/lock"
DISK_LIMIT="${MONITOR_DISK_LIMIT:-85}"
TIMEOUT="${MONITOR_TIMEOUT:-15}"

cd "$ROOT_DIR"
mkdir -p "$STATE_DIR"
chmod 700 "$STATE_DIR"

exec 9>"$LOCK_FILE"
flock -n 9 || exit 0

problems=()

check_url() {
    local name="$1"
    local path="$2"
    local result code duration

    result="$(
        curl --max-time "$TIMEOUT" -sS -o /dev/null \
            -w '%{http_code} %{time_total}' \
            "$PUBLIC_URL$path" 2>/dev/null || true
    )"
    read -r code duration <<< "$result"

    if [ "$code" != "200" ]; then
        problems+=("$name=http_${code:-unreachable}")
    elif awk -v value="${duration:-99}" 'BEGIN { exit !(value > 2) }'; then
        problems+=("$name=slow_${duration}s")
    fi
}

check_url health /health
check_url ready /ready

APP_ID="$(docker compose -f "$COMPOSE_FILE" ps -q grabit 2>/dev/null || true)"
CADDY_ID="$(docker compose -f "$COMPOSE_FILE" ps -q caddy 2>/dev/null || true)"

APP_HEALTH="$(
    docker inspect "$APP_ID" \
        --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' \
        2>/dev/null || echo missing
)"
CADDY_STATE="$(
    docker inspect "$CADDY_ID" \
        --format '{{.State.Status}}' \
        2>/dev/null || echo missing
)"

[ "$APP_HEALTH" = "healthy" ] ||
    problems+=("grabit=$APP_HEALTH")

[ "$CADDY_STATE" = "running" ] ||
    problems+=("caddy=$CADDY_STATE")

DISK_USED="$(df -P / | awk 'NR == 2 {gsub(/%/, "", $5); print $5}')"
[ "$DISK_USED" -lt "$DISK_LIMIT" ] ||
    problems+=("disk=${DISK_USED}%")

AVAILABLE_KB="$(awk '/MemAvailable:/ {print $2}' /proc/meminfo)"
TOTAL_KB="$(awk '/MemTotal:/ {print $2}' /proc/meminfo)"
MEMORY_AVAILABLE="$((AVAILABLE_KB * 100 / TOTAL_KB))"

[ "$MEMORY_AVAILABLE" -ge 10 ] ||
    problems+=("memory_available=${MEMORY_AVAILABLE}%")

if [ "${#problems[@]}" -eq 0 ]; then
    status="healthy"
    details="all_checks_passed"
else
    status="failed"
    details="$(IFS=,; echo "${problems[*]}")"
fi

previous="$(awk -F= '/^status=/{print $2}' "$STATE_FILE" 2>/dev/null || echo unknown)"
timestamp="$(date -u +'%Y-%m-%dT%H:%M:%SZ')"

{
    echo "status=$status"
    echo "checked_at=$timestamp"
    echo "details=$details"
    echo "disk_used_percent=$DISK_USED"
    echo "memory_available_percent=$MEMORY_AVAILABLE"
} > "$STATE_FILE"

chmod 600 "$STATE_FILE"

echo "$timestamp status=$status details=$details"

if [ "$status" != "$previous" ]; then
    logger -t grabit-monitor \
        "state_change previous=$previous current=$status details=$details"
fi
