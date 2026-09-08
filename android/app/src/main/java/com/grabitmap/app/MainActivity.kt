package com.grabitmap.app

import android.os.Bundle
import android.widget.*
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.StepsRecord
import androidx.health.connect.client.request.AggregateRequest
import androidx.health.connect.client.time.TimeRangeFilter
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch
import java.time.LocalDate
import java.time.ZoneId

class MainActivity : AppCompatActivity() {
    private lateinit var client: HealthConnectClient
    private lateinit var status: TextView
    private val readSteps = HealthPermission.getReadPermission(StepsRecord::class)
    private val permissions = registerForActivityResult(
        HealthConnectClient.createRequestPermissionResultContract()
    ) { granted -> status.text = if (readSteps in granted) "Доступ получен" else "Доступ к шагам не предоставлен" }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val layout = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL; setPadding(48, 72, 48, 48) }
        layout.addView(TextView(this).apply { text = "GRABIT · Health Connect"; textSize = 26f })
        status = TextView(this).apply { text = "Проверяем Health Connect…"; textSize = 18f; setPadding(0, 32, 0, 32) }
        layout.addView(status)
        val allow = Button(this).apply { text = "Разрешить Health Connect" }
        val refresh = Button(this).apply { text = "Обновить шаги" }
        layout.addView(allow); layout.addView(refresh); setContentView(layout)

        when (HealthConnectClient.getSdkStatus(this)) {
            HealthConnectClient.SDK_AVAILABLE -> { client = HealthConnectClient.getOrCreate(this); status.text = "Health Connect доступен" }
            HealthConnectClient.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED -> { status.text = "Обновите Health Connect"; allow.isEnabled = false; refresh.isEnabled = false }
            else -> { status.text = "Health Connect недоступен"; allow.isEnabled = false; refresh.isEnabled = false }
        }
        allow.setOnClickListener { permissions.launch(setOf(readSteps)) }
        refresh.setOnClickListener { readToday() }
    }

    private fun readToday() = lifecycleScope.launch {
        if (!::client.isInitialized || readSteps !in client.permissionController.getGrantedPermissions()) {
            status.text = "Сначала разрешите чтение шагов"; return@launch
        }
        runCatching {
            val zone = ZoneId.systemDefault()
            val start = LocalDate.now(zone).atStartOfDay(zone).toInstant()
            client.aggregate(AggregateRequest(setOf(StepsRecord.COUNT_TOTAL), TimeRangeFilter.between(start, java.time.Instant.now())))[StepsRecord.COUNT_TOTAL] ?: 0L
        }.onSuccess { status.text = "Сегодня: $it шагов" }
         .onFailure { status.text = "Ошибка: ${it.javaClass.simpleName}" }
    }
}
