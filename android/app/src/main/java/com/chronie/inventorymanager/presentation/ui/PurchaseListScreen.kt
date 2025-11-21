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
import com.chronie.inventorymanager.liquidglass.utils.GlassContainer
import com.chronie.inventorymanager.presentation.viewmodel.PurchaseListViewModel
import com.chronie.inventorymanager.presentation.viewmodel.PurchaseListViewModelFactory
import com.chronie.inventorymanager.presentation.viewmodel.PurchaseListUiState
import com.chronie.inventorymanager.ui.theme.getGlassColors
import com.chronie.inventorymanager.utils.CategoryNameConverter
import java.text.SimpleDateFormat
import java.util.*
import com.smartinventory.models.PurchaseListItem
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
/**
 * 格式化ISO8601日期字符串，仅保留日期部分
 * @param dateString ISO8601格式的日期字符串
 * @return 格式化后的日期字符串
 */
@Composable
fun formatDate(dateString: String?): String {
    // 处理空值情况
    if (dateString.isNullOrEmpty()) {
        return "-"
    }
    
    return try {
        // 尝试多种常见日期格式
        val formats = listOf(
            SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault()),
            SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault()),
            SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault()),
            SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
        )
        
        formats.forEach { format ->
            format.timeZone = TimeZone.getTimeZone("UTC")
            try {
                val date = format.parse(dateString)
                if (date != null) {
                    // 使用系统默认日期格式，自动适配用户设备日期显示偏好
                    val outputFormat = SimpleDateFormat.getDateInstance(SimpleDateFormat.SHORT, Locale.getDefault())
                    outputFormat.timeZone = TimeZone.getDefault() // 使用设备时区
                    return outputFormat.format(date)
                }
            } catch (e: Exception) {
                // 当前格式解析失败，尝试下一个格式
            }
        }
        
        // 如果所有格式都解析失败，返回格式化后的日期字符串
        "-"
    } catch (e: Exception) {
        // 捕获任何其他异常
        "-"
    }
}

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
    val isLightTheme = MaterialTheme.colorScheme.background == Color.White
    val glassColors = getGlassColors(isLightTheme)
    
    val uiState by viewModel.uiState.collectAsState()
    val isRefreshing by viewModel.isRefreshing.collectAsState()
    val purchaseList by viewModel.purchaseList.collectAsState()
    val scope = rememberCoroutineScope()
    
    // 直接在需要的地方使用scope.launch，不再定义单独的函数
    
    // 移除Scaffold，避免额外的布局占位和padding问题
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
                    onClick = { 
                        scope.launch {
                            viewModel.refreshList()
                        }
                    },
                    enabled = !isRefreshing
                ) {
                    Icon(
                        imageVector = Icons.Default.Refresh,
                        contentDescription = stringResource(R.string.purchaselist_refresh),
                        tint = glassColors.text
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
                            CircularProgressIndicator(color = glassColors.primary)
                            Spacer(modifier = Modifier.height(16.dp))
                            Text("Loading...", color = glassColors.text)
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
                                color = glassColors.error
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                text = (uiState as PurchaseListUiState.Error).message,
                                style = MaterialTheme.typography.bodyMedium,
                                color = glassColors.textSecondary,
                                textAlign = TextAlign.Center
                            )
                            Spacer(modifier = Modifier.height(16.dp))
                            Button(
                                onClick = { 
                                    scope.launch {
                                        viewModel.refreshList()
                                    }
                                },
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = glassColors.primary,
                                    contentColor = Color.White
                                )
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
                        GlassContainer(modifier = Modifier.fillMaxWidth(), backgroundAlpha = 0.3f, enableBlur = true) {
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                modifier = Modifier.padding(32.dp)
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Info,
                                    contentDescription = null,
                                    modifier = Modifier.size(64.dp),
                                    tint = glassColors.primary
                                )
                                Spacer(modifier = Modifier.height(16.dp))
                                Text(
                                    text = "No purchase items at the moment",
                                    style = MaterialTheme.typography.titleMedium,
                                    color = glassColors.textSecondary
                                )
                                Spacer(modifier = Modifier.height(8.dp))
                                Text(
                                    text = "All items are sufficiently stocked",
                                    style = MaterialTheme.typography.bodyMedium,
                                    color = glassColors.textSecondary
                                )
                            }
                        }
                    }
                }
                
                is PurchaseListUiState.Success -> {
                    if (purchaseList.isEmpty()) {
                        Box(
                            modifier = Modifier.fillMaxSize(),
                            contentAlignment = Alignment.Center
                        ) {
                            GlassContainer(modifier = Modifier.fillMaxWidth(), backgroundAlpha = 0.3f, enableBlur = true) {
                                Text(
                                    text = "Empty State",
                                    style = MaterialTheme.typography.bodyLarge,
                                    color = glassColors.textSecondary,
                                    modifier = Modifier.padding(32.dp)
                                )
                            }
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
                                    onRefresh = { 
                                        scope.launch {
                                            viewModel.refreshList()
                                        }
                                    }
                                )
                            }
                            // 底部占位项，用于适应底部导航栏高度
                            item {
                                Spacer(modifier = Modifier.height(80.dp))
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
    val isLightTheme = MaterialTheme.colorScheme.background == Color.White
    val glassColors = getGlassColors(isLightTheme)
    
    GlassContainer(modifier = Modifier.fillMaxWidth(), backgroundAlpha = 0.4f, enableBlur = true) {
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
                        fontWeight = FontWeight.Bold,
                        color = if (isLightTheme) Color.Black else glassColors.text
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = CategoryNameConverter.getDisplayNameComposable(item.category),
                        style = MaterialTheme.typography.bodySmall,
                        color = glassColors.primary
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // 数量信息
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                QuantityInfo(
                    label = stringResource(R.string.purchaselist_currentquantity),
                    value = "${item.currentQuantity}${item.unit}",
                    color = if (item.currentQuantity == 0) {
                        glassColors.error
                    } else {
                        glassColors.text
                    }
                )
                
                QuantityInfo(
                    label = stringResource(R.string.purchaselist_minquantity),
                    value = "${item.minQuantity}${item.unit}",
                    color = glassColors.textSecondary
                )
                
                QuantityInfo(
                    label = stringResource(R.string.purchaselist_suggestedquantity),
                    value = "${item.suggestedQuantity}${item.unit}",
                    color = glassColors.primary,
                    isHighlighted = true
                )
            }
            
            // 最后使用时间
            if (item.lastUsedAt != null) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                        text = stringResource(R.string.purchaselist_lastused) + ": ${formatDate(item.lastUsedAt)}",
                        style = MaterialTheme.typography.bodySmall,
                        color = if (isLightTheme) Color.Black else glassColors.textSecondary
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
    val isLightTheme = MaterialTheme.colorScheme.background == Color.White
    val glassColors = getGlassColors(isLightTheme)
    
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        if (isHighlighted) {
            GlassContainer(
                modifier = Modifier.padding(4.dp),
                backgroundAlpha = 0.5f,
                enableBlur = true
            ) {
                Text(
                    text = value,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold,
                    color = glassColors.primary,
                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                )
            }
        } else {
            Text(
                text = value,
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Medium,
                color = if (isLightTheme) Color.Black else color
            )
        }
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall,
            color = if (isLightTheme) Color.Black else glassColors.textSecondary
        )
    }
}