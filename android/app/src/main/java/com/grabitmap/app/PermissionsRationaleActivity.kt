package com.grabitmap.app

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class PermissionsRationaleActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(TextView(this).apply {
            text = "GRABIT читает только количество шагов, чтобы показать вашу активность и синхронизировать её с вашим аккаунтом."
            textSize = 18f; setPadding(48, 72, 48, 48)
        })
    }
}
