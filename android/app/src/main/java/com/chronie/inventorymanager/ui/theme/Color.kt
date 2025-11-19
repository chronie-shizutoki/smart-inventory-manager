package com.chronie.inventorymanager.ui.theme

import androidx.compose.ui.graphics.Color
import androidx.compose.runtime.Composable
import androidx.compose.foundation.isSystemInDarkTheme

// 基础颜色 - 保持原有定义
val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)

// 液态玻璃主题颜色
// 液态玻璃主题颜色
object GlassColors {
    // 浅色模式
    val LightTheme =
            GlassColorScheme(
                    primary = Color(0xFF0088FF),
                    secondary = Color(0xFF6C5CE7),
                    accent = Color(0xFF00D4AA),
                    container = Color(0xFFFAFAFA).copy(0.6f),
                    cardContainer = Color(0xFFFFFFFF).copy(0.4f),
                    selectedContainer = Color(0xFF0088FF).copy(0.1f),
                    border = Color(0xFFE0E0E0).copy(0.3f),
                    selectedBorder = Color(0xFF0088FF),
                    text = Color(0xFF1A1A2E),
                    textSecondary = Color(0xFF666666),
                    alpha = 0.8f,
                    success = Color(0xFF4CAF50),
                    warning = Color(0xFFFF9800),
                    error = Color(0xFFF44336),
                    info = Color(0xFF2196F3)
            )

    // 深色模式
    val DarkTheme =
            GlassColorScheme(
                    primary = Color(0xFF0091FF),
                    secondary = Color(0xFF8E7CC3),
                    accent = Color(0xFF00D4AA),
                    container = Color(0xFF121212).copy(0.6f),
                    cardContainer = Color(0xFF1E1E1E).copy(0.4f),
                    selectedContainer = Color(0xFF0091FF).copy(0.1f),
                    border = Color(0xFF404040).copy(0.3f),
                    selectedBorder = Color(0xFF0091FF),
                    text = Color(0xFFE0E0E0),
                    textSecondary = Color(0xFFB0B0B0),
                    alpha = 0.85f,
                    success = Color(0xFF4CAF50),
                    warning = Color(0xFFFF9800),
                    error = Color(0xFFF44336),
                    info = Color(0xFF2196F3)
            )
}

// 渐变色定义
object GlassGradient {
    // 主背景渐变
    val primaryBackground = listOf(Color(0xFF667eea) to 0f, Color(0xFF764ba2) to 1f)

    // 玻璃卡片渐变
    val glassCard = listOf(Color(0xFFFFFFFF).copy(0.1f) to 0f, Color(0xFFFFFFFF).copy(0.05f) to 1f)

    // 深色模式玻璃卡片
    val glassCardDark =
            listOf(Color(0xFF1E1E1E).copy(0.8f) to 0f, Color(0xFF121212).copy(0.6f) to 1f)
}

// 字体颜色配置
object GlassTypography {
    // 标题
    val titleLarge = androidx.compose.material3.Typography().titleLarge
    val titleMedium = androidx.compose.material3.Typography().titleMedium
    val titleSmall = androidx.compose.material3.Typography().titleSmall

    // 正文
    val bodyLarge = androidx.compose.material3.Typography().bodyLarge
    val bodyMedium = androidx.compose.material3.Typography().bodyMedium
    val bodySmall = androidx.compose.material3.Typography().bodySmall

    // 标签
    val labelLarge = androidx.compose.material3.Typography().labelLarge
    val labelMedium = androidx.compose.material3.Typography().labelMedium
    val labelSmall = androidx.compose.material3.Typography().labelSmall

    // 标题
    val headlineSmall = androidx.compose.material3.Typography().headlineSmall
    val headlineMedium = androidx.compose.material3.Typography().headlineMedium
    val headlineLarge = androidx.compose.material3.Typography().headlineLarge
}

/** 获取液态玻璃颜色主题 */
data class GlassColorScheme(
        val primary: Color,
        val secondary: Color,
        val accent: Color,
        val container: Color,
        val cardContainer: Color,
        val selectedContainer: Color,
        val border: Color,
        val selectedBorder: Color,
        val text: Color,
        val textSecondary: Color,
        val alpha: Float,
        val success: Color,
        val warning: Color,
        val error: Color,
        val info: Color
)

/** 根据主题获取液态玻璃颜色方案 */
fun getGlassColors(isLightTheme: Boolean): GlassColorScheme {
    return if (isLightTheme) {
        GlassColors.LightTheme
    } else {
        GlassColors.DarkTheme
    }
}

/** 根据Compose主题获取液态玻璃颜色方案 */
@Composable
fun getGlassColors(): GlassColorScheme {
    val isLightTheme = !isSystemInDarkTheme()
    return getGlassColors(isLightTheme)
}
