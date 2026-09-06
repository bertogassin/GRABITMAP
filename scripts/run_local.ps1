$ErrorActionPreference = "Stop"
Set-Location (Split-Path -Parent $PSScriptRoot)

if (-not $env:ADMIN_KEY) { $env:ADMIN_KEY = "dev-local-key" }
if (-not $env:GRABIT_COOKIE_SECURE) { $env:GRABIT_COOKIE_SECURE = "0" }
if (-not $env:PORT) { $env:PORT = "3000" }
if (-not $env:PUBLIC_BASE_URL) { $env:PUBLIC_BASE_URL = "http://127.0.0.1:$($env:PORT)" }
if (-not $env:ALLOW_MOCK_PROMOTION_PAYMENT) { $env:ALLOW_MOCK_PROMOTION_PAYMENT = "1" }

$exe = Join-Path $PWD "target\debug\grabitmap.exe"
if (Test-Path $exe) {
    Write-Host "Запуск $exe"
    & $exe
    exit $LASTEXITCODE
}

Write-Host "Запуск cargo run"
cargo run
