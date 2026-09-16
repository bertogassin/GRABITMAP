#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_DIR="${1:-}"
REQUIRE_COMPLETE="${REQUIRE_COMPLETE:-1}"

if [ -z "$BACKUP_DIR" ] || [ ! -d "$BACKUP_DIR" ]; then
    echo "Usage: $0 /absolute/path/to/backup" >&2
    exit 2
fi

case "$BACKUP_DIR" in
    /*) ;;
    *)
        echo "Backup path must be absolute." >&2
        exit 2
        ;;
esac

command -v sha256sum >/dev/null
command -v sqlite3 >/dev/null
command -v tar >/dev/null

test -f "$BACKUP_DIR/votes.db"
test -f "$BACKUP_DIR/data-files.tar"
test -f "$BACKUP_DIR/production.env"
test -f "$BACKUP_DIR/Caddyfile"
test -f "$BACKUP_DIR/docker-compose.prod.yml"
test -f "$BACKUP_DIR/MANIFEST"
test -f "$BACKUP_DIR/SHA256SUMS"

if [ "$REQUIRE_COMPLETE" = "1" ]; then
    test -f "$BACKUP_DIR/COMPLETE"
fi

(
    cd "$BACKUP_DIR"
    sha256sum -c SHA256SUMS >/dev/null
)

test "$(sqlite3 "$BACKUP_DIR/votes.db" 'PRAGMA integrity_check;')" = "ok"
tar -tf "$BACKUP_DIR/data-files.tar" >/dev/null

echo "BACKUP_VERIFIED=$BACKUP_DIR"
echo "DATABASE_INTEGRITY=ok"
echo "CHECKSUMS=ok"
echo "DATA_ARCHIVE=ok"
