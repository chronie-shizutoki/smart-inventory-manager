package com.chronie.inventorymanager

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material3.*
import androidx.compose.ui.window.Dialog
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalContext
import androidx.activity.ComponentActivity
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.chronie.inventorymanager.liquidglass.utils.GlassBackground
import com.chronie.inventorymanager.liquidglass.utils.GlassCard
import com.chronie.inventorymanager.ui.theme.getGlassColors
import com.chronie.inventorymanager.data.*
import com.chronie.inventorymanager.liquidglass.backdrop.drawBackdrop
import com.chronie.inventorymanager.liquidglass.backdrop.backdrops.rememberCanvasBackdrop
import com.chronie.inventorymanager.liquidglass.backdrop.effects.blur
import com.chronie.inventorymanager.liquidglass.backdrop.highlight.Highlight
import com.chronie.inventorymanager.liquidglass.backdrop.shadow.Shadow

/**
 * 设置界面主组件
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(
    onNavigateBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    Surface(modifier = modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
        // 使用液态玻璃背景包裹整个设置界面
        GlassBackground {
            Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
                // 顶部导航由 MainActivity 的 TopAppBar 提供，这里仅渲染内容
                Spacer(modifier = Modifier.height(12.dp))

                // 设置选项内容，放在玻璃背景内
                SettingsContent(
                    modifier = Modifier
                        .fillMaxWidth()
                )
            }
        }
    }
}

/**
 * 设置界面的标题栏
 */
// SettingsTopBar 已移除：顶部由 MainActivity 管理（显示当前页面标题）

/**
 * 设置界面的主要内容
 */
@Composable
private fun SettingsContent(
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // 使用液态玻璃卡片展示语言设置，移除多余图标/外框
        GlassCard(modifier = Modifier.fillMaxWidth(), cornerRadius = 12.dp, backgroundAlpha = 0.9f) {
            Column {
                Text(
                    text = stringResource(R.string.nav_language),
                    style = MaterialTheme.typography.titleMedium.copy(
                        fontWeight = FontWeight.SemiBold,
                        color = MaterialTheme.colorScheme.primary
                    )
                )
                Spacer(modifier = Modifier.height(8.dp))
                // 语言选择控件（已在下方实现）
                LanguageSetting()
            }
        }
    }
}

/**
 * 设置组容器
 */
@Composable
private fun SettingsGroup(
    title: String,
    items: List<SettingsItem>,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // 分组标题
        Text(
            text = title,
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.SemiBold,
                color = MaterialTheme.colorScheme.primary
            ),
            modifier = Modifier.padding(vertical = 8.dp)
        )
        
        // 分组内容
        items.forEach { item ->
            SettingsCard(item = item)
        }
    }
}

/**
 * 单个设置项
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun SettingsCard(
    item: SettingsItem,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface.copy(alpha = 0.8f)
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            // 设置项标题和图标
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = item.icon,
                    contentDescription = item.title,
                    tint = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.size(24.dp)
                )
                Spacer(modifier = Modifier.width(12.dp))
                Column(
                    modifier = Modifier.weight(1f)
                ) {
                    Text(
                        text = item.title,
                        style = MaterialTheme.typography.bodyLarge.copy(
                            fontWeight = FontWeight.Medium
                        )
                    )
                    if (item.subtitle.isNotEmpty()) {
                        Text(
                            text = item.subtitle,
                            style = MaterialTheme.typography.bodySmall.copy(
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        )
                    }
                }
            }
            
            // 设置项内容
            if (item.content != null) {
                Spacer(modifier = Modifier.height(12.dp))
                item.content()
            }
        }
    }
}

/**
 * 语言设置组件
 */
@Composable
private fun LanguageSetting() {
    val languageContext = getLanguageContext()
    val currentLanguage = getCurrentLanguage()
    val languages = LanguageManager.supportedLanguages
    val ctx = LocalContext.current
    val activity = ctx as? ComponentActivity

    LanguageDropdown(
        selectedLanguage = currentLanguage,
        languages = languages,
        onLanguageChanged = { newLanguage ->
            // 更新语言上下文
            languageContext.changeLanguage(newLanguage)

            // 尝试应用系统级 locale 更改并重启 Activity，以便 stringResource 使用新语言
            try {
                val res = ctx.resources
                val conf = res.configuration
                conf.setLocale(newLanguage.locale)
                @Suppress("DEPRECATION")
                res.updateConfiguration(conf, res.displayMetrics)
            } catch (_: Exception) {
            }
            // 保存偏好以便 Activity 重启/重新创建时保留所选语言
            try {
                ctx.getSharedPreferences("app_prefs", android.content.Context.MODE_PRIVATE)
                    .edit()
                    .putString("preferred_language", newLanguage.code)
                    .apply()
            } catch (_: Exception) {
            }
            activity?.recreate()
        }
    )
}

/**
 * 语言下拉选择组件（使用液态玻璃效果）
 */
@Composable
private fun LanguageDropdown(
    selectedLanguage: LanguageConfig,
    languages: List<LanguageConfig>,
    onLanguageChanged: (LanguageConfig) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }
    val interactionSource = remember { MutableInteractionSource() }
    
    // 液态玻璃效果的背景绘制
    // 使用系统主题判断代替对比具体颜色，避免动态主题/不同背景值导致误判
    val isLightTheme = !isSystemInDarkTheme()
    val glassColors = getGlassColors(isLightTheme)

    val glassBackground = rememberCanvasBackdrop {
        val radius = 12.dp.toPx()

        // 使用主题色绘制半透明卡片背景，适配浅/深色模式
        drawRoundRect(
            color = glassColors.cardContainer.copy(alpha = 0.85f),
            cornerRadius = androidx.compose.ui.geometry.CornerRadius(radius)
        )

        // 绘制渐变效果（基于 cardContainer 的亮度变化）
        drawRoundRect(
            brush = Brush.verticalGradient(
                colors = listOf(
                    glassColors.cardContainer.copy(alpha = 0.95f),
                    glassColors.container.copy(alpha = 0.7f)
                )
            ),
            cornerRadius = androidx.compose.ui.geometry.CornerRadius(radius)
        )
    }
    
    Box(
        modifier = modifier.fillMaxWidth()
    ) {
        // 主要的下拉按钮（带液态玻璃效果）
        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .let { base ->
                    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S) {
                        base.drawBackdrop(
                            backdrop = glassBackground,
                            shape = { RoundedCornerShape(12.dp) },
                            effects = { blur(radius = 20f) },
                            highlight = { Highlight.Default },
                            shadow = { Shadow.Default }
                        )
                    } else {
                        base.background(MaterialTheme.colorScheme.surface.copy(alpha = 0.6f))
                            .border(
                                width = 1.dp,
                                color = MaterialTheme.colorScheme.primary.copy(alpha = 0.2f),
                                shape = RoundedCornerShape(12.dp)
                            )
                    }
                }
                .clickable(
                    interactionSource = interactionSource,
                    indication = null
                ) { expanded = true },
            color = Color.Transparent
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = selectedLanguage.name,
                    modifier = Modifier.weight(1f),
                    color = MaterialTheme.colorScheme.onSurface,
                    style = MaterialTheme.typography.bodyLarge
                )
                Icon(
                    imageVector = Icons.Default.ArrowDropDown,
                    contentDescription = "Expand",
                    tint = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.size(20.dp)
                )
            }
        }
        
        // 使用自定义 Dialog + GlassCard 实现玻璃弹窗列表
        if (expanded) {
            Dialog(onDismissRequest = { expanded = false }) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth(0.92f)
                        .heightIn(max = 400.dp)
                        .padding(8.dp)
                ) {
                    GlassCard(
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp)
                        ) {
                            Text(
                                text = stringResource(R.string.nav_language),
                                style = MaterialTheme.typography.titleMedium,
                                color = MaterialTheme.colorScheme.onSurface,
                                modifier = Modifier.padding(bottom = 8.dp)
                            )
                            Box(modifier = Modifier.heightIn(max = 320.dp)) {
                                LazyColumn {
                                    items(languages) { language ->
                                        TextButton(
                                            onClick = {
                                                onLanguageChanged(language)
                                                expanded = false
                                            },
                                            modifier = Modifier.fillMaxWidth()
                                        ) {
                                            Text(
                                                text = language.name,
                                                color = MaterialTheme.colorScheme.onSurface,
                                                style = MaterialTheme.typography.bodyMedium
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}



/**
 * 设置项数据类
 */
data class SettingsItem(
    val title: String,
    val subtitle: String = "",
    val icon: ImageVector,
    val content: @Composable (() -> Unit)? = null
)