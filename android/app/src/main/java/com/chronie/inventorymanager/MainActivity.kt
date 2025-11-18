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
import androidx.compose.ui.unit.dp

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
                    Text("Smart Inventory Manager") 
                }
            )
        },
        bottomBar = {
            // 使用简化版本的底部导航栏进行调试
            NavigationBar {
                NavigationBarItem(
                    icon = { 
                        Icon(
                            Icons.Default.Home,
                            contentDescription = "Inventory"
                        ) 
                    },
                    label = { Text("Inventory") },
                    selected = selectedIndex == 0,
                    onClick = { 
                        selectedIndex = 0
                        navController.navigate("inventory") {
                            popUpTo(navController.graph.findStartDestination().id) {
                                saveState = true
                            }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                )
                
                NavigationBarItem(
                    icon = { 
                        Icon(
                            Icons.Default.Add,
                            contentDescription = "Add"
                        ) 
                    },
                    label = { Text("Add") },
                    selected = selectedIndex == 1,
                    onClick = { 
                        selectedIndex = 1
                        navController.navigate("add") {
                            popUpTo(navController.graph.findStartDestination().id) {
                                saveState = true
                            }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                )
                
                NavigationBarItem(
                    icon = { 
                        Icon(
                            Icons.Default.ShoppingCart,
                            contentDescription = "Purchase List"
                        ) 
                    },
                    label = { Text("Purchase") },
                    selected = selectedIndex == 2,
                    onClick = { 
                        selectedIndex = 2
                        navController.navigate("purchaselist") {
                            popUpTo(navController.graph.findStartDestination().id) {
                                saveState = true
                            }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                )
                
                NavigationBarItem(
                    icon = { 
                        Icon(
                            Icons.Default.Menu,
                            contentDescription = "Menu"
                        ) 
                    },
                    label = { Text("Menu") },
                    selected = selectedIndex == 3,
                    onClick = { 
                        selectedIndex = 3
                        navController.navigate("menu") {
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
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text("Menu Screen")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun SmartInventoryManagerAppPreview() {
    SmartInventoryManagerTheme {
        SmartInventoryManagerApp()
    }
}