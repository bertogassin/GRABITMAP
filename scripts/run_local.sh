#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

export ADMIN_KEY="${ADMIN_KEY:-dev-local-key}"
export GRABIT_COOKIE_SECURE="${GRABIT_COOKIE_SECURE:-0}"
export PORT="${PORT:-3000}"
export PUBLIC_BASE_URL="${PUBLIC_BASE_URL:-http://127.0.0.1:${PORT}}"
export ALLOW_MOCK_PROMOTION_PAYMENT="${ALLOW_MOCK_PROMOTION_PAYMENT:-1}"

if [[ -x target/debug/grabitmap ]]; then
  exec ./target/debug/grabitmap
fi

exec cargo run
