# GRABIT Android Health Connect Stage 2

This overlay upgrades the Android app to 0.2.0 and web assets to 5.0.21.

- Health Connect remains the authoritative native step source.
- The Android app opens `https://grabitmap.com/app/steps` in an HTTPS-only WebView.
- The WebView uses the existing GRABIT account session and `/api/steps` endpoint.
- The browser accelerometer fallback is disabled when the native bridge is present.
- External links leave the WebView and open in the system browser.

After applying the overlay, run the existing Rust/frontend checks and let the Android GitHub Actions workflow build the debug APK.
