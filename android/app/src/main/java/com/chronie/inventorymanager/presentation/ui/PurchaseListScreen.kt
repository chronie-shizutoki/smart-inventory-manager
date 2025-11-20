package com.chronie.inventorymanager.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Refresh

import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.chronie.inventorymanager.R
import com.chronie.inventorymanager.data.network.InventoryApiService
import com.chronie.inventorymanager.data.repository.ApiFactory
import com.chronie.inventorymanager.presentation.viewmodel.PurchaseListViewModel
import com.chronie.inventorymanager.presentation.viewmodel.PurchaseListViewModelFactory
import com.chronie.inventorymanager.presentation.viewmodel.PurchaseListUiState
import com.chronie.inventorymanager.utils.CategoryNameConverter
import com.smartinventory.models.PurchaseListItem
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PurchaseListScreen(
    navController: NavController? = null,
    inventoryApiService: InventoryApiService? = null
) {
    // 创建 ViewModel Factory，提供所需的 InventoryApiService 依赖
    val viewModelFactory = remember {
        PurchaseListViewModelFactory(
            inventoryApiService ?: ApiFactory.create()
        )
    }
    
    val viewModel: PurchaseListViewModel = viewModel(factory = viewModelFactory)
    val context = LocalContext.current
    
    val uiState by viewModel.uiState.collectAsState()
    val isRefreshing by viewModel.isRefreshing.collectAsState()
    val purchaseList by viewModel.purchaseList.collectAsState()
    val scope = rememberCoroutineScope()
    
    // 刷新列表
    fun refreshList() {
        scope.launch {
            viewModel.refreshList()
        }
    }
    
    Scaffold {
        Column(
            modifier = Modifier
                .fillMaxSize()
        ) {
            // 刷新按钮行
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 2.dp),
                horizontalArrangement = Arrangement.End
            ) {
                IconButton(
                    onClick = { refreshList() },
                    enabled = !isRefreshing
                ) {
                    Icon(
                        imageVector = Icons.Default.Refresh,
                        contentDescription = stringResource(R.string.purchaselist_refresh),
                        tint = if (isRefreshing) {
                            MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f)
                        } else {
                            MaterialTheme.colorScheme.onSurface
                        }
                    )
                }
            }
            // 采购物品列表
            when (uiState) {
                is PurchaseListUiState.Loading -> {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            CircularProgressIndicator()
                            Spacer(modifier = Modifier.height(16.dp))
                            Text("Loading...")
                        }
                    }
                }
                
                is PurchaseListUiState.Error -> {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Text(
                                text = "Network Error",
                                style = MaterialTheme.typography.titleMedium,
                                color = MaterialTheme.colorScheme.error
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                text = (uiState as PurchaseListUiState.Error).message,
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                textAlign = TextAlign.Center
                            )
                            Spacer(modifier = Modifier.height(16.dp))
                            Button(
                                onClick = { refreshList() }
                            ) {
                                Text("重试")
                            }
                        }
                    }
                }
                
                is PurchaseListUiState.Empty -> {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Icon(
                                imageVector = Icons.Default.Info,
                                contentDescription = null,
                                modifier = Modifier.size(64.dp),
                                tint = MaterialTheme.colorScheme.primary
                            )
                            Spacer(modifier = Modifier.height(16.dp))
                            Text(
                                text = "No purchase items at the moment",
                                style = MaterialTheme.typography.titleMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                text = "All items are sufficiently stocked",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
                
                is PurchaseListUiState.Success -> {
                    if (purchaseList.isEmpty()) {
                        Box(
                            modifier = Modifier.fillMaxSize(),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "Empty State",
                                style = MaterialTheme.typography.bodyLarge,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    } else {
                        LazyColumn(
                            modifier = Modifier.fillMaxSize(),
                            contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
                            verticalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            items(purchaseList) { item ->
                                PurchaseListItemCard(
                                    item = item,
                                    onRefresh = { refreshList() }
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}



/**
 * 采购清单项目卡片
 */
@Composable
fun PurchaseListItemCard(
    item: PurchaseListItem,
    onRefresh: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            // 头部信息
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(
                    modifier = Modifier.weight(1f)
                ) {
                    Text(
                        text = item.name,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = CategoryNameConverter.getDisplayName(item.category),
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
                
                // 状态指示器
                if (item.isCriticallyLow()) {
                    Surface(
                        color = MaterialTheme.colorScheme.errorContainer,
                        tonalElevation = 1.dp,
                        shape = MaterialTheme.shapes.small,
                        modifier = Modifier.padding(start = 8.dp)
                    ) {
                        Text(
                            text = "紧急",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onErrorContainer,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }
                }
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // 数量信息
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                QuantityInfo(
                    label = "当前数量",
                    value = "${item.currentQuantity}${item.unit}",
                    color = if (item.currentQuantity == 0) {
                        MaterialTheme.colorScheme.error
                    } else {
                        MaterialTheme.colorScheme.onSurface
                    }
                )
                
                QuantityInfo(
                    label = "最低库存",
                    value = "${item.minQuantity}${item.unit}",
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                
                QuantityInfo(
                    label = "建议采购",
                    value = "${item.suggestedQuantity}${item.unit}",
                    color = MaterialTheme.colorScheme.primary,
                    isHighlighted = true
                )
            }
            
            // 最后使用时间
            if (item.lastUsedAt != null) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                        text = "Last used: ${item.lastUsedAt}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
            }
        }
    }
}

/**
 * 数量信息项
 */
@Composable
fun QuantityInfo(
    label: String,
    value: String,
    color: Color,
    isHighlighted: Boolean = false
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        if (isHighlighted) {
            Surface(
                color = MaterialTheme.colorScheme.primaryContainer,
                tonalElevation = 1.dp,
                shape = MaterialTheme.shapes.small,
                modifier = Modifier
                    .clip(MaterialTheme.shapes.small)
                    .padding(4.dp)
            ) {
                Text(
                    text = value,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onPrimaryContainer,
                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                )
            }
        } else {
            Text(
                text = value,
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Medium,
                color = color
            )
        }
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}