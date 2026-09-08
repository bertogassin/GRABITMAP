package com.grabitmap.app

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.StepsRecord
import androidx.health.connect.client.request.AggregateRequest
import androidx.health.connect.client.time.TimeRangeFilter
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch
import org.json.JSONObject
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId

class MainActivity : AppCompatActivity() {
    private lateinit var client: HealthConnectClient
    private lateinit var status: TextView
    private lateinit var webView: WebView
    private var cachedSteps = 0L
    private val appOrigin = "https://grabitmap.com"
    private val readSteps = HealthPermission.getReadPermission(StepsRecord::class)
    private val permissions = registerForActivityResult(
        PermissionController.createRequestPermissionResultContract()
    ) { granted ->
        status.text = if (readSteps in granted) getString(R.string.access_granted) else getString(R.string.access_denied)
        if (readSteps in granted) readToday(openSiteAfter = true)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val layout = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL; setPadding(48, 72, 48, 48) }
        layout.addView(TextView(this).apply { text = getString(R.string.health_title); textSize = 26f })
        status = TextView(this).apply { text = getString(R.string.checking_health_connect); textSize = 18f; setPadding(0, 32, 0, 32) }
        layout.addView(status)
        val allow = Button(this).apply { text = getString(R.string.allow_health_connect) }
        val refresh = Button(this).apply { text = getString(R.string.refresh_steps) }
        val open = Button(this).apply { text = getString(R.string.open_grabit) }
        layout.addView(allow); layout.addView(refresh); layout.addView(open); setContentView(layout)

        when (HealthConnectClient.getSdkStatus(this)) {
            HealthConnectClient.SDK_AVAILABLE -> { client = HealthConnectClient.getOrCreate(this); status.text = getString(R.string.health_connect_available) }
            HealthConnectClient.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED -> { status.text = getString(R.string.update_health_connect); allow.isEnabled = false; refresh.isEnabled = false; open.isEnabled = false }
            else -> { status.text = getString(R.string.health_connect_unavailable); allow.isEnabled = false; refresh.isEnabled = false; open.isEnabled = false }
        }
        allow.setOnClickListener { permissions.launch(setOf(readSteps)) }
        refresh.setOnClickListener { readToday() }
        open.setOnClickListener { readToday(openSiteAfter = true) }
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() { if (::webView.isInitialized && webView.canGoBack()) webView.goBack() else finish() }
        })
    }

    private fun readToday(openSiteAfter: Boolean = false) = lifecycleScope.launch {
        if (!::client.isInitialized || readSteps !in client.permissionController.getGrantedPermissions()) {
            status.text = getString(R.string.allow_steps_first)
            if (openSiteAfter) permissions.launch(setOf(readSteps))
            return@launch
        }
        runCatching {
            val zone = ZoneId.systemDefault()
            val start = LocalDate.now(zone).atStartOfDay(zone).toInstant()
            client.aggregate(AggregateRequest(setOf(StepsRecord.COUNT_TOTAL), TimeRangeFilter.between(start, Instant.now())))[StepsRecord.COUNT_TOTAL] ?: 0L
        }.onSuccess {
            cachedSteps = it
            status.text = getString(R.string.steps_today, it)
            if (openSiteAfter) openSite() else dispatchStepsToWeb()
        }.onFailure { status.text = getString(R.string.read_error, it.javaClass.simpleName) }
    }

    @SuppressLint("SetJavaScriptEnabled", "AddJavascriptInterface")
    private fun openSite() {
        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.allowFileAccess = false
            settings.allowContentAccess = false
            addJavascriptInterface(HealthBridge(), "GrabitHealth")
            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                    val uri = request.url
                    if (uri.scheme == "https" && (uri.host == "grabitmap.com" || uri.host == "www.grabitmap.com")) return false
                    startActivity(Intent(Intent.ACTION_VIEW, uri)); return true
                }
                override fun onPageFinished(view: WebView, url: String) { if (url.startsWith(appOrigin)) readToday() }
            }
        }
        setContentView(webView)
        webView.loadUrl("$appOrigin/app/steps")
    }

    private inner class HealthBridge {
        @JavascriptInterface fun requestTodaySteps() { runOnUiThread { readToday() } }
    }

    private fun dispatchStepsToWeb() {
        if (!::webView.isInitialized) return
        val payload = JSONObject().put("date", LocalDate.now(ZoneId.systemDefault()).toString()).put("steps", cachedSteps).toString()
        webView.evaluateJavascript("window.dispatchEvent(new CustomEvent('grabit-native-steps',{detail:$payload}));", null)
    }

    override fun onResume() { super.onResume(); if (::client.isInitialized) readToday() }
    override fun onDestroy() {
        if (::webView.isInitialized) { webView.removeJavascriptInterface("GrabitHealth"); webView.destroy() }
        super.onDestroy()
    }
}
