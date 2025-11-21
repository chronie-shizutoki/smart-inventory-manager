package com.chronie.inventorymanager

import android.os.Bundle
import android.content.res.Configuration
import android.os.Build
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding

import androidx.compose.ui.res.stringResource
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.chronie.inventorymanager.ui.theme.SmartInventoryManagerTheme
import com.chronie.inventorymanager.liquidglass.LiquidBottomTabs
import com.chronie.inventorymanager.liquidglass.TabItemData
import androidx.compose.ui.unit.dp
import com.chronie.inventorymanager.SettingsScreen
import com.chronie.inventorymanager.data.*
import com.chronie.inventorymanager.presentation.ui.InventoryScreen
import com.chronie.inventorymanager.presentation.ui.AddItemScreen
import com.chronie.inventorymanager.presentation.ui.PurchaseListScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        android.util.Log.d("MainActivity", "Starting language initialization")
        
        // 应用启动时，在UI初始化前先尝试应用保存的语言偏好
        try {
            android.util.Log.d("MainActivity", "Attempting to get language preferences")
            val sharedPrefs = getSharedPreferences("app_prefs", MODE_PRIVATE)
            val savedLanguageCode = sharedPrefs.getString("preferred_language", null)
            
            android.util.Log.d("MainActivity", "Saved language code from SharedPreferences: $savedLanguageCode")
            
            if (savedLanguageCode != null) {
                android.util.Log.d("MainActivity", "Attempting to apply saved language: $savedLanguageCode")
                
                // 使用LanguageManager获取正确的LanguageConfig对象
                val languageConfig = LanguageManager.getLanguageByCode(savedLanguageCode)
                
                if (languageConfig != null) {
                    android.util.Log.d("MainActivity", "Found language config: ${languageConfig.code}")
                    
                    // 获取当前配置
                    val resources = resources
                    val configuration = resources.configuration
                    
                    // 使用正确的Locale对象
                    val locale = languageConfig.locale
                    android.util.Log.d("MainActivity", "Setting locale to: $locale")
                    
                    // 应用Locale设置
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                        // Android 4.2及以上
                        configuration.setLocale(locale)
                    } else {
                        // 旧版本Android
                        @Suppress("DEPRECATION")
                        configuration.locale = locale
                    }
                    
                    // 更新配置
                    @Suppress("DEPRECATION")
                    resources.updateConfiguration(configuration, resources.displayMetrics)
                    
                    // 对于Android N及以上，还需要更新Context
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                        android.util.Log.d("MainActivity", "Using N+ API for language change")
                        val context = createConfigurationContext(configuration)
                        // 将更新后的Context资源应用到当前Activity
                        resources.updateConfiguration(context.resources.configuration, context.resources.displayMetrics)
                    }
                } else {
                    android.util.Log.w("MainActivity", "Language not found for code: $savedLanguageCode")
                }
                
                android.util.Log.d("MainActivity", "Language set successfully in onCreate")
                
                // 验证语言设置是否生效
                val currentLocale = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                    resources.configuration.locales.get(0)
                } else {
                    @Suppress("DEPRECATION")
                    resources.configuration.locale
                }
                android.util.Log.d("MainActivity", "Current locale after setting: $currentLocale")
            } else {
                android.util.Log.d("MainActivity", "No saved language preference found")
            }
        } catch (e: Exception) {
            android.util.Log.e("MainActivity", "Failed to set language from preferences: ${e.message}", e)
            // 初始化语言偏好失败时静默处理，继续使用默认语言
        }
        
        setContent {
            SmartInventoryManagerTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    // 从SharedPreferences读取保存的语言偏好
                    val savedLanguage = remember {
                        try {
                            val sharedPrefs = getSharedPreferences("app_prefs", MODE_PRIVATE)
                            val savedLanguageCode = sharedPrefs.getString("preferred_language", null)
                            if (savedLanguageCode != null) {
                                LanguageManager.getLanguageByCode(savedLanguageCode)
                            } else {
                                null
                            }
                        } catch (e: Exception) {
                            null
                        }
                    }
                    
                    LanguageContextProvider(initialLanguage = savedLanguage) { 
                        SmartInventoryManagerApp()
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SmartInventoryManagerApp() {
    val navController = rememberNavController()
    var selectedIndex by rememberSaveable { mutableIntStateOf(0) }
    
    // 移除Scaffold，直接使用Box作为根组件，避免任何默认的padding或占位
    Column(modifier = Modifier.fillMaxSize()) {
        // 顶部应用栏
        TopAppBar(
            title = {
                val title = when (selectedIndex) {
                    0 -> stringResource(id = R.string.nav_inventory)
                    1 -> stringResource(id = R.string.nav_add)
                    2 -> stringResource(id = R.string.nav_purchaselist)
                    3 -> stringResource(id = R.string.nav_menu)
                    else -> stringResource(id = R.string.app_name)
                }
                Text(title)
            }
        )
        
        // 主内容区域
        // 使用Box来容纳内容和悬浮的导航栏
        Box(modifier = Modifier.fillMaxSize()) {
            // 主内容区域：允许内容完全填充整个屏幕，包括导航栏所在区域
            NavHost(
                navController = navController,
                startDestination = "inventory",
                modifier = Modifier.fillMaxSize() // 让内容可以填充整个屏幕，包括导航栏区域
            ) {
                composable("inventory") {
                    InventoryScreen()
                }
                composable("add") {
                    AddItemScreen()
                }
                composable("purchaselist") {
                    PurchaseListScreen()
                }
                composable("menu") {
                    MenuScreen(navController)
                }
            }
            
            // 悬浮导航栏：放置在内容上方，实现完全悬浮效果
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .align(Alignment.BottomCenter)
                    .padding(bottom = 20.dp) // 离屏幕底部的距离
            ) {
                LiquidBottomNavigation(
                    selectedIndex = selectedIndex,
                    onTabSelected = { index ->
                        selectedIndex = index
                        val route = when (index) {
                            0 -> "inventory"
                            1 -> "add"
                            2 -> "purchaselist"
                            3 -> "menu"
                            else -> "inventory"
                        }
                        navController.navigate(route) {
                            popUpTo(navController.graph.findStartDestination().id) {
                                saveState = true
                            }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                )
            }
        }
    }
}

@Composable
fun LiquidBottomNavigation(
    selectedIndex: Int,
    onTabSelected: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    val tabs = listOf(
        BottomNavItem(stringResource(id = R.string.nav_inventory), Icons.Default.Home),
        BottomNavItem(stringResource(id = R.string.nav_add), Icons.Default.Add),
        BottomNavItem(stringResource(id = R.string.nav_purchaselist), Icons.Default.ShoppingCart),
        BottomNavItem(stringResource(id = R.string.nav_menu), Icons.Default.Menu)
    )
    
    LiquidBottomTabs(
        // 不要在 bottomBar 中使用 fillMaxSize()，会撑满 Scaffold 可用高度并遮盖主内容
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        selectedIndex = selectedIndex,
        onTabSelected = onTabSelected,
        items = tabs.map { item ->
            TabItemData(
                icon = item.icon,
                label = item.label
            )
        }
    )
}

data class BottomNavItem(
    val label: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector
)

// 库存页面 - 已在 InventoryScreen.kt 中实现

// 添加物品页面
@Composable
fun AddItemScreen() {
    com.chronie.inventorymanager.presentation.ui.AddItemScreen(
        navigateBack = {
            // Navigation is handled by the bottom navigation
        }
    )
}

// 采购清单页面
@Composable
fun PurchaseListScreen() {
    com.chronie.inventorymanager.presentation.ui.PurchaseListScreen()
}

// 菜单页面
@Composable
fun MenuScreen(navController: androidx.navigation.NavController) {
    SettingsScreen(
        onNavigateBack = {
            navController.navigateUp()
        }
    )
}

@Preview(showBackground = true)
@Composable
fun SmartInventoryManagerAppPreview() {
    SmartInventoryManagerTheme {
        SmartInventoryManagerApp()
    }
}