package com.chronie.inventorymanager

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.TileMode
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.chronie.inventorymanager.ui.theme.SmartInventoryManagerTheme
import com.kyant.backdrop.Backdrop
import com.kyant.backdrop.BackdropEffectScope
import com.kyant.backdrop.backdrops.LayerBackdrop
import com.kyant.backdrop.backdrops.rememberBackdrop
import com.kyant.backdrop.backdrops.rememberLayerBackdrop
import com.kyant.backdrop.drawBackdrop
import com.kyant.backdrop.effects.blur
import com.kyant.backdrop.effects.lens
import com.kyant.backdrop.backdrops.layerBackdrop
import androidx.compose.ui.unit.dp
import com.kyant.capsule.ContinuousCapsule
// import androidx.compose.material.icons.filled.Home

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SmartInventoryManagerTheme {
                SmartInventoryManagerApp()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SmartInventoryManagerApp() {
    val navController = rememberNavController()
    var selectedIndex by rememberSaveable { mutableIntStateOf(0) }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { 
                    Text("智能库存管理") 
                }
            )
        },
        bottomBar = {
            // 使用毛玻璃效果的底部导航栏
            LiquidGlassBottomNavigation(
                selectedIndex = selectedIndex,
                onItemSelected = { index ->
                    selectedIndex = index
                    val route = when (index) {
                        0 -> "inventory"
                        1 -> "add"
                        2 -> "purchaselist"
                        else -> "menu"
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
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = "inventory",
            modifier = Modifier.padding(innerPadding)
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
                MenuScreen()
            }
        }
    }
}

// 库存页面
@Composable
fun InventoryScreen() {
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text("库存管理页面")
        }
    }
}

// 添加物品页面
@Composable
fun AddItemScreen() {
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text("添加物品页面")
        }
    }
}

// 采购清单页面
@Composable
fun PurchaseListScreen() {
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text("采购清单页面")
        }
    }
}

// 菜单页面
@Composable
fun MenuScreen() {
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text("菜单页面")
        }
    }
}

@Composable
fun LiquidGlassBottomNavigation(
    selectedIndex: Int,
    onItemSelected: (Int) -> Unit
) {
    // 创建backdrop和layer实例
    val tabsBackdrop = rememberLayerBackdrop()
    
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .height(80.dp)
            .padding(horizontal = 16.dp, vertical = 8.dp)
            .layerBackdrop(tabsBackdrop)
            .drawBackdrop(
                backdrop = tabsBackdrop,
                shape = { ContinuousCapsule },
                effects = {
                    // 透镜折射效果，模拟真实玻璃
                    lens(
                        refractionHeight = 24f,
                        refractionAmount = 0.3f,
                        depthEffect = true,
                        chromaticAberration = true
                    )
                    // 适度模糊背景
                    blur(radius = 8f)
                },
                onDrawSurface = {
                    // 背景渐变
                    drawRect(
                        Brush.verticalGradient(
                            colors = listOf(
                                Color.White.copy(alpha = 0.1f),
                                Color.White.copy(alpha = 0.05f)
                            )
                        )
                    )
                }
            ),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceEvenly
    ) {
        // 库存页面
        NavigationBarItem(
            icon = { 
                Icon(
                    Icons.Default.Home,
                    contentDescription = "库存",
                    tint = if (selectedIndex == 0) MaterialTheme.colorScheme.primary else Color.White
                ) 
            },
            label = { 
                Text(
                    "库存",
                    color = if (selectedIndex == 0) MaterialTheme.colorScheme.primary else Color.White
                ) 
            },
            selected = selectedIndex == 0,
            onClick = { onItemSelected(0) }
        )
        
        // 添加物品页面
        NavigationBarItem(
            icon = { 
                Icon(
                    Icons.Default.Add,
                    contentDescription = "添加",
                    tint = if (selectedIndex == 1) MaterialTheme.colorScheme.primary else Color.White
                ) 
            },
            label = { 
                Text(
                    "添加",
                    color = if (selectedIndex == 1) MaterialTheme.colorScheme.primary else Color.White
                ) 
            },
            selected = selectedIndex == 1,
            onClick = { onItemSelected(1) }
        )
        
        // 采购清单页面
        NavigationBarItem(
            icon = { 
                Icon(
                    Icons.Default.ShoppingCart,
                    contentDescription = "采购清单",
                    tint = if (selectedIndex == 2) MaterialTheme.colorScheme.primary else Color.White
                ) 
            },
            label = { 
                Text(
                    "采购清单",
                    color = if (selectedIndex == 2) MaterialTheme.colorScheme.primary else Color.White
                ) 
            },
            selected = selectedIndex == 2,
            onClick = { onItemSelected(2) }
        )
        
        // 菜单页面
        NavigationBarItem(
            icon = { 
                Icon(
                    Icons.Default.Menu,
                    contentDescription = "菜单",
                    tint = if (selectedIndex == 3) MaterialTheme.colorScheme.primary else Color.White
                ) 
            },
            label = { 
                Text(
                    "菜单",
                    color = if (selectedIndex == 3) MaterialTheme.colorScheme.primary else Color.White
                ) 
            },
            selected = selectedIndex == 3,
            onClick = { onItemSelected(3) }
        )
    }
}

@Preview(showBackground = true)
@Composable
fun SmartInventoryManagerAppPreview() {
    SmartInventoryManagerTheme {
        SmartInventoryManagerApp()
    }
}