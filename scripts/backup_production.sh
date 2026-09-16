#!/usr/bin/env bash
set -Eeuo pipefail

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
APP_SERVICE="${APP_SERVICE:-grabit}"
BACKUP_ROOT="${BACKUP_ROOT:-/root/grabit-backups}"
BACKUP_DIR="${BACKUP_DIR:-$BACKUP_ROOT/manual-$(date -u +%Y%m%dT%H%M%SZ)}"
ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
CURRENT_ID="${CURRENT_ID:-}"
DATA_SOURCE="${DATA_SOURCE:-}"
IMAGE_ID="${IMAGE_ID:-}"

cd "$ROOT_DIR"

case "$BACKUP_ROOT" in
    /*) ;;
    *)
        echo "BACKUP_ROOT must be absolute." >&2
        exit 2
        ;;
esac

test "$BACKUP_ROOT" != "/"
test "$BACKUP_DIR" != "$BACKUP_ROOT"
case "$BACKUP_DIR" in
    "$BACKUP_ROOT"/*) ;;
    *)
        echo "Backup directory must be inside BACKUP_ROOT." >&2
        exit 2
        ;;
esac
case "$BACKUP_DIR" in
    *"'"*)
        echo "Backup directory cannot contain a single quote." >&2
        exit 2
        ;;
esac

command -v docker >/dev/null
command -v find >/dev/null
command -v git >/dev/null
command -v install >/dev/null
command -v sha256sum >/dev/null
command -v sqlite3 >/dev/null
command -v stat >/dev/null
command -v tar >/dev/null
command -v xargs >/dev/null

test -f "$COMPOSE_FILE"
test -f Caddyfile
test -f .env

if [ -z "$CURRENT_ID" ]; then
    CURRENT_ID="$(docker compose -f "$COMPOSE_FILE" ps -q "$APP_SERVICE")"
fi
test -n "$CURRENT_ID"

if [ -z "$DATA_SOURCE" ]; then
    DATA_SOURCE="$(
        docker inspect "$CURRENT_ID" \
            --format '{{range .Mounts}}{{if eq .Destination "/app/data"}}{{.Source}}{{end}}{{end}}'
    )"
fi
test -n "$DATA_SOURCE"
test "$DATA_SOURCE" != "/"
case "$DATA_SOURCE" in
    /*) ;;
    *)
        echo "Production data source must be absolute." >&2
        exit 2
        ;;
esac
test -d "$DATA_SOURCE"
test -f "$DATA_SOURCE/votes.db"

if [ -z "$IMAGE_ID" ]; then
    IMAGE_ID="$(docker inspect "$CURRENT_ID" --format '{{.Image}}')"
fi
test -n "$IMAGE_ID"

mkdir -p "$BACKUP_ROOT"
chmod 700 "$BACKUP_ROOT"
mkdir "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"

echo "=== BACK UP SQLITE DATABASE ==="
sqlite3 "$DATA_SOURCE/votes.db" ".backup '$BACKUP_DIR/votes.db'"
test "$(sqlite3 "$BACKUP_DIR/votes.db" 'PRAGMA integrity_check;')" = "ok"

echo "=== BACK UP USER FILES ==="
tar \
    --one-file-system \
    --exclude='./votes.db' \
    --exclude='./votes.db-wal' \
    --exclude='./votes.db-shm' \
    --exclude='./votes.db-journal' \
    --exclude='./chat-media/.quarantine' \
    -C "$DATA_SOURCE" \
    -cf "$BACKUP_DIR/data-files.tar" \
    .
tar -tf "$BACKUP_DIR/data-files.tar" >/dev/null

echo "=== BACK UP PRODUCTION CONFIGURATION ==="
install -m 600 .env "$BACKUP_DIR/production.env"
install -m 600 Caddyfile "$BACKUP_DIR/Caddyfile"
install -m 600 "$COMPOSE_FILE" "$BACKUP_DIR/docker-compose.prod.yml"

CREATED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
GIT_COMMIT="$(git rev-parse HEAD)"
GIT_TREE="$(git rev-parse HEAD^{tree})"
TRACKED_CHANGES="$(git status --porcelain --untracked-files=no | awk 'END { print NR + 0 }')"
DATA_FILE_COUNT="$(tar -tf "$BACKUP_DIR/data-files.tar" | awk '!/\/$/ { count += 1 } END { print count + 0 }')"
DATABASE_BYTES="$(stat -c '%s' "$BACKUP_DIR/votes.db")"
DATA_ARCHIVE_BYTES="$(stat -c '%s' "$BACKUP_DIR/data-files.tar")"

{
    echo "backup_format=1"
    echo "created_at=$CREATED_AT"
    echo "git_commit=$GIT_COMMIT"
    echo "git_tree=$GIT_TREE"
    echo "tracked_changes=$TRACKED_CHANGES"
    echo "image_id=$IMAGE_ID"
    echo "database_integrity=ok"
    echo "database_bytes=$DATABASE_BYTES"
    echo "data_file_count=$DATA_FILE_COUNT"
    echo "data_archive_bytes=$DATA_ARCHIVE_BYTES"
} > "$BACKUP_DIR/MANIFEST"

chmod 600 "$BACKUP_DIR/votes.db" \
    "$BACKUP_DIR/data-files.tar" \
    "$BACKUP_DIR/MANIFEST"

(
    cd "$BACKUP_DIR"
    find . -maxdepth 1 -type f \
        ! -name SHA256SUMS \
        ! -name COMPLETE \
        -print0 \
        | LC_ALL=C sort -z \
        | xargs -0 sha256sum > SHA256SUMS
)
chmod 600 "$BACKUP_DIR/SHA256SUMS"

REQUIRE_COMPLETE=0 "$ROOT_DIR/scripts/verify_production_backup.sh" "$BACKUP_DIR"
install -m 600 /dev/null "$BACKUP_DIR/COMPLETE"

echo "BACKUP=$BACKUP_DIR"
echo "DATA_FILES=$DATA_FILE_COUNT"
echo "✅ VERIFIED PRODUCTION BACKUP COMPLETED"
