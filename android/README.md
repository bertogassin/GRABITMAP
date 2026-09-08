# GRABIT Android Health Connect — Stage 1

Native Android foundation for package `com.grabitmap.app`.

This stage reads the current day's real step aggregate from Health Connect. It does not yet send health data to the GRABIT server. Server pairing is intentionally deferred until the APK is built and verified on a real device.

## Build

Open this directory in Android Studio, use JDK 17, sync Gradle, then build the debug APK.

## Device test

1. Install the APK on Android 9+.
2. Tap **Разрешить Health Connect**.
3. Grant access to steps.
4. Tap **Обновить шаги**.

Android 14+ includes Health Connect in the system. Earlier supported Android versions may require the Health Connect app.
