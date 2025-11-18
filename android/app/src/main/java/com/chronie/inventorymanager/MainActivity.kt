package com.chronie.inventorymanager

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
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

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SmartInventoryManagerTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    LanguageContextProvider { 
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
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { 
                    Text(stringResource(id = R.string.app_name))
                }
            )
        },
        bottomBar = {
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
        modifier = modifier
            .fillMaxSize()
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
            Text("Inventory Screen")
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
            Text("Add Item Screen")
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
            Text("Purchase List Screen")
        }
    }
}

// 菜单页面
@Composable
fun MenuScreen() {
    val navController = rememberNavController()
    
    SettingsScreen(
        onNavigateBack = {
            navController.popBackStack()
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