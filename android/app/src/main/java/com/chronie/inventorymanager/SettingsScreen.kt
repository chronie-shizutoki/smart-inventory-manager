package com.chronie.inventorymanager

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material3.*
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
    Surface(
        modifier = modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
        ) {
            // 设置界面标题栏
            SettingsTopBar(onNavigateBack = onNavigateBack)
            
            // 设置选项内容
            SettingsContent(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            )
        }
    }
}

/**
 * 设置界面的标题栏
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun SettingsTopBar(
    onNavigateBack: () -> Unit
) {
    Surface(
        color = MaterialTheme.colorScheme.surface,
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = onNavigateBack,
                modifier = Modifier.padding(end = 12.dp)
            ) {
                Icon(
                     imageVector = Icons.Default.ArrowBack,
                     contentDescription = "<"
                 )
            }
            Text(
                text = stringResource(R.string.nav_menu),
                style = MaterialTheme.typography.headlineSmall.copy(
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
            )
        }
    }
}

/**
 * 设置界面的主要内容
 */
@Composable
private fun SettingsContent(
    modifier: Modifier = Modifier
) {
    val scrollState = rememberScrollState()
    
    Column(
        modifier = modifier.verticalScroll(scrollState),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // 语言设置组
        SettingsGroup(
            title = stringResource(R.string.nav_menu),
            items = listOf(
                SettingsItem(
                    title = stringResource(R.string.nav_language),
                    subtitle = stringResource(R.string.nav_language),
                    icon = Icons.Default.Menu,
                    content = { LanguageSetting() }
                )
            )
        )
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
    val currentLanguage = languageContext.currentLanguage
    val languages = LanguageManager.supportedLanguages
    
    LanguageDropdown(
        selectedLanguage = currentLanguage,
        languages = languages,
        onLanguageChanged = { newLanguage ->
            languageContext.changeLanguage(newLanguage)
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
    val glassBackground = rememberCanvasBackdrop {
        val radius = 12.dp.toPx()
        
        // 绘制半透明的背景
        drawRoundRect(
            color = Color.White.copy(alpha = 0.15f),
            cornerRadius = androidx.compose.ui.geometry.CornerRadius(radius)
        )
        
        // 绘制渐变效果
        drawRoundRect(
            brush = Brush.verticalGradient(
                colors = listOf(
                    Color.White.copy(alpha = 0.3f),
                    Color.White.copy(alpha = 0.1f)
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
                Icon(
                    imageVector = Icons.Default.Menu,
                    contentDescription = "Language",
                    tint = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(12.dp))
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
        
        // 下拉菜单
        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false },
            modifier = Modifier
                .fillMaxWidth(0.8f)
                .padding(top = 8.dp)
        ) {
            languages.forEach { language ->
                DropdownMenuItem(
                    onClick = {
                        onLanguageChanged(language)
                        expanded = false
                    },
                    text = {
                        Text(
                            text = language.name,
                            color = MaterialTheme.colorScheme.onSurface,
                            style = MaterialTheme.typography.bodyMedium
                        )
                    }
                )
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