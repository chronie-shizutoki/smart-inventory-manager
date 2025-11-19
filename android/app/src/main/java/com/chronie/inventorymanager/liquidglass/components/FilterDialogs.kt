package com.chronie.inventorymanager.liquidglass.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.foundation.border
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.ui.window.Dialog
import java.text.SimpleDateFormat
import java.util.Locale
import com.chronie.inventorymanager.R
import com.chronie.inventorymanager.domain.model.InventoryItem
import com.chronie.inventorymanager.domain.model.StockStatus
import com.chronie.inventorymanager.domain.model.StatusFilter
import com.chronie.inventorymanager.domain.model.SortOption
import com.chronie.inventorymanager.domain.model.UnifiedFilter
import com.chronie.inventorymanager.ui.theme.GlassColorScheme
import com.chronie.inventorymanager.ui.theme.GlassTypography
import com.chronie.inventorymanager.ui.theme.getGlassColors

/**
 * 分类选择对话框
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CategoryFilterDialog(
    categories: List<String>,
    selectedCategories: List<String>,
    onCategoriesSelected: (List<String>) -> Unit,
    onDismiss: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isLightTheme = !isSystemInDarkTheme()
    val colors = getGlassColors(isLightTheme)
    
    AlertDialog(
        onDismissRequest = onDismiss,
        modifier = modifier
            .background(colors.container.copy(alpha = 0.9f), RoundedCornerShape(16.dp))
    ) {
        GlassConfirmDialog(
            title = stringResource(id = R.string.inventory_category),
            content = {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(categories) { category ->
                        CategoryFilterItem(
                            category = category,
                            isSelected = selectedCategories.contains(category),
                            onSelected = { isSelected ->
                                val newSelection = if (isSelected) {
                                    selectedCategories + category
                                } else {
                                    selectedCategories - category
                                }
                                onCategoriesSelected(newSelection)
                            },
                            colors = colors
                        )
                    }
                }
            },
            confirmText = stringResource(id = R.string.add_save),
            dismissText = stringResource(id = R.string.add_cancel),
            onConfirmClick = onDismiss,
            onDismissClick = onDismiss
        )
    }
}

/**
 * 分类筛选项
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun CategoryFilterItem(
    category: String,
    isSelected: Boolean,
    onSelected: (Boolean) -> Unit,
    colors: GlassColorScheme
) {
    Surface(
        onClick = { onSelected(!isSelected) },
        modifier = Modifier
            .fillMaxWidth()
            .background(
                color = if (isSelected) colors.selectedContainer else colors.container.copy(alpha = 0.5f),
                shape = RoundedCornerShape(12.dp)
            )
            .border(
                width = if (isSelected) 1.dp else 0.dp,
                color = if (isSelected) colors.selectedBorder else Color.Transparent,
                shape = RoundedCornerShape(12.dp)
            )
            .padding(16.dp),
        tonalElevation = 0.dp
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = category,
                style = GlassTypography.bodyLarge.copy(
                    color = if (isSelected) colors.primary else colors.text,
                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                )
            )
            if (isSelected) {
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = null,
                    tint = colors.primary
                )
            }
        }
    }
}

/**
 * 物品操作对话框
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ItemActionDialog(
    item: InventoryItem,
    onUseOne: () -> Unit,
    onEdit: () -> Unit,
    onView: () -> Unit,
    onDelete: () -> Unit,
    onDismiss: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isLightTheme = !isSystemInDarkTheme()
    val colors = getGlassColors(isLightTheme)
    
    AlertDialog(
        onDismissRequest = onDismiss,
        modifier = modifier
            .background(colors.container.copy(alpha = 0.9f), RoundedCornerShape(16.dp))
    ) {
        GlassConfirmDialog(
            title = item.name,
            content = {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    // 物品基本信息
                    Text(
                        text = "",
                        style = GlassTypography.bodyMedium.copy(
                            color = colors.text.copy(alpha = 0.7f)
                        )
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    // 操作按钮组（使用图标版本）
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // 使用一个物品
                        IconActionButton(
                            icon = Icons.Default.Remove,
                            enabled = item.quantity > 0,
                            onClick = {
                                onUseOne()
                                onDismiss()
                            },
                            colors = colors,
                            modifier = Modifier.weight(1f)
                        )
                        
                        // 编辑物品
                        IconActionButton(
                            icon = Icons.Default.Edit,
                            onClick = {
                                onEdit()
                                onDismiss()
                            },
                            colors = colors,
                            modifier = Modifier.weight(1f)
                        )
                        
                        // 查看详情
                        IconActionButton(
                            icon = Icons.Default.Info,
                            onClick = {
                                onView()
                                onDismiss()
                            },
                            colors = colors,
                            modifier = Modifier.weight(1f)
                        )
                        
                        // 删除物品
                        IconActionButton(
                            icon = Icons.Default.Delete,
                            onClick = {
                                onDelete()
                                onDismiss()
                            },
                            colors = colors,
                            isDestructive = true,
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            },
            confirmText = "",
            dismissText = "",
            onConfirmClick = {},
            onDismissClick = onDismiss,
            useIconButtons = true
        )
    }
}

/**
 * 图标操作按钮组件（纯图标版本）
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun IconActionButton(
    icon: ImageVector,
    enabled: Boolean = true,
    onClick: () -> Unit,
    colors: GlassColorScheme,
    isDestructive: Boolean = false,
    modifier: Modifier = Modifier
) {
    Surface(
        onClick = onClick,
        enabled = enabled,
        modifier = modifier
            .background(
                color = when {
                    !enabled -> colors.container.copy(alpha = 0.3f)
                    isDestructive -> Color(0xFFFFEBEE).copy(alpha = 0.8f)
                    else -> colors.container.copy(alpha = 0.5f)
                },
                shape = RoundedCornerShape(12.dp)
            )
            .border(
                width = 1.dp,
                color = when {
                    !enabled -> colors.border.copy(alpha = 0.3f)
                    isDestructive -> Color(0xFFF44336).copy(alpha = 0.5f)
                    else -> colors.border.copy(alpha = 0.5f)
                },
                shape = RoundedCornerShape(12.dp)
            )
            .padding(12.dp),
        tonalElevation = 0.dp
        ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = when {
                !enabled -> colors.text.copy(alpha = 0.3f)
                isDestructive -> Color(0xFFF44336)
                else -> colors.text.copy(alpha = 0.8f)
            },
            modifier = Modifier.size(24.dp)
        )
    }
}

/**
 * 操作按钮组件（带文字版本）
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun ActionButton(
    text: String,
    icon: ImageVector,
    enabled: Boolean = true,
    onClick: () -> Unit,
    colors: GlassColorScheme,
    isDestructive: Boolean = false
) {
    Surface(
        onClick = onClick,
        enabled = enabled,
        modifier = Modifier
            .fillMaxWidth()
            .background(
                color = when {
                    !enabled -> colors.container.copy(alpha = 0.3f)
                    isDestructive -> Color(0xFFFFEBEE).copy(alpha = 0.8f)
                    else -> colors.container.copy(alpha = 0.5f)
                },
                shape = RoundedCornerShape(12.dp)
            )
            .border(
                width = 1.dp,
                color = when {
                    !enabled -> colors.border.copy(alpha = 0.3f)
                    isDestructive -> Color(0xFFF44336).copy(alpha = 0.5f)
                    else -> colors.border.copy(alpha = 0.5f)
                },
                shape = RoundedCornerShape(12.dp)
            )
            .padding(16.dp),
        tonalElevation = 0.dp
        ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = when {
                    !enabled -> colors.text.copy(alpha = 0.3f)
                    isDestructive -> Color(0xFFF44336)
                    else -> colors.text.copy(alpha = 0.8f)
                }
            )
            Spacer(modifier = Modifier.width(12.dp))
            Text(
                text = text,
                style = GlassTypography.bodyLarge.copy(
                    color = when {
                        !enabled -> colors.text.copy(alpha = 0.3f)
                        isDestructive -> Color(0xFFF44336)
                        else -> colors.text
                    },
                    fontWeight = if (isDestructive) FontWeight.Bold else FontWeight.Normal
                )
            )
        }
    }
}

/**
 * 状态筛选对话框
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StatusFilterDialog(
    selectedStatuses: List<StockStatus>,
    onStatusesSelected: (List<StockStatus>) -> Unit,
    onDismiss: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isLightTheme = !isSystemInDarkTheme()
    val colors = getGlassColors(isLightTheme)
    
    val statusOptions = listOf(
        StockStatus.NORMAL to stringResource(id = R.string.status_normal),
        StockStatus.LOW_STOCK to stringResource(id = R.string.status_lowstock),
        StockStatus.EXPIRING_SOON to stringResource(id = R.string.status_expiringsoon),
        StockStatus.EXPIRED to stringResource(id = R.string.status_expired)
    )
    
    AlertDialog(
        onDismissRequest = onDismiss,
        modifier = modifier
            .background(colors.container.copy(alpha = 0.9f), RoundedCornerShape(16.dp))
    ) {
        GlassConfirmDialog(
            title = stringResource(id = R.string.inventory_status),
            content = {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    statusOptions.forEach { (status, label) ->
                        StatusFilterItem(
                            status = status,
                            label = label,
                            isSelected = selectedStatuses.contains(status),
                            onSelected = { isSelected ->
                                val newSelection = if (isSelected) {
                                    selectedStatuses + status
                                } else {
                                    selectedStatuses - status
                                }
                                onStatusesSelected(newSelection)
                            },
                            colors = colors
                        )
                    }
                }
            },
            confirmText = stringResource(id = R.string.add_save),
            dismissText = stringResource(id = R.string.add_cancel),
            onConfirmClick = onDismiss,
            onDismissClick = onDismiss
        )
    }
}

/**
 * 状态筛选项
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun StatusFilterItem(
    status: StockStatus,
    label: String,
    isSelected: Boolean,
    onSelected: (Boolean) -> Unit,
    colors: GlassColorScheme
) {
    val statusColor = when (status) {
        StockStatus.NORMAL -> if (isSystemInDarkTheme()) Color(0xFF4CAF50) else Color(0xFF4CAF50)
        StockStatus.LOW_STOCK -> Color(0xFFFF9800)
        StockStatus.EXPIRING_SOON -> Color(0xFFFF5722)
        StockStatus.EXPIRED -> Color(0xFFF44336)
    }
    
    Surface(
        onClick = { onSelected(!isSelected) },
        modifier = Modifier
            .fillMaxWidth()
            .background(
                color = if (isSelected) colors.selectedContainer else colors.container.copy(alpha = 0.5f),
                shape = RoundedCornerShape(12.dp)
            )
            .border(
                width = if (isSelected) 1.dp else 0.dp,
                color = if (isSelected) colors.selectedBorder else Color.Transparent,
                shape = RoundedCornerShape(12.dp)
            )
            .padding(16.dp),
        tonalElevation = 0.dp
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                // 状态颜色指示器
                Box(
                    modifier = Modifier
                        .size(12.dp)
                        .background(
                            color = statusColor,
                            shape = RoundedCornerShape(6.dp)
                        )
                )
                Spacer(modifier = Modifier.width(12.dp))
                Text(
                    text = label,
                    style = GlassTypography.bodyLarge.copy(
                        color = if (isSelected) colors.primary else colors.text,
                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                    )
                )
            }
            if (isSelected) {
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = null,
                    tint = colors.primary
                )
            }
        }
    }
}

/**
 * 高级筛选对话框
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AdvancedFilterDialog(
    dateRange: Pair<Long?, Long?>,
    onDateRangeChanged: (Pair<Long?, Long?>) -> Unit,
    minQuantity: Int?,
    onMinQuantityChanged: (Int?) -> Unit,
    onDismiss: () -> Unit,
    onApplyFilters: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isLightTheme = !isSystemInDarkTheme()
    val colors = getGlassColors(isLightTheme)
    
    var tempDateRange by remember { mutableStateOf(dateRange) }
    var tempMinQuantity by remember { mutableStateOf(minQuantity) }
    
    AlertDialog(
        onDismissRequest = onDismiss,
        modifier = modifier
            .background(colors.container.copy(alpha = 0.9f), RoundedCornerShape(16.dp))
    ) {
        GlassConfirmDialog(
            title = "Advanced Filter",
            content = {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    // 数量筛选
                    Text(
                        text = stringResource(R.string.add_minquantity),
                        style = GlassTypography.bodyMedium.copy(
                            color = colors.text.copy(alpha = 0.8f)
                        )
                    )
                    OutlinedTextField(
                        value = tempMinQuantity?.toString() ?: "",
                        onValueChange = { value ->
                            tempMinQuantity = value.toIntOrNull()
                        },
                        placeholder = {
                            Text(
                                text = stringResource(R.string.add_minquantity),
                                style = GlassTypography.bodyMedium
                            )
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedTextColor = colors.text,
                            unfocusedTextColor = colors.text.copy(alpha = 0.7f),
                            focusedBorderColor = colors.selectedBorder,
                            unfocusedBorderColor = colors.border,
                            focusedLabelColor = colors.text.copy(alpha = 0.7f),
                            unfocusedLabelColor = colors.text.copy(alpha = 0.5f)
                        ),
                        textStyle = GlassTypography.bodyMedium
                    )
                }
            },
            confirmText = stringResource(id = R.string.add_save),
            dismissText = stringResource(id = R.string.add_cancel),
            onConfirmClick = {
                onDateRangeChanged(tempDateRange)
                onMinQuantityChanged(tempMinQuantity)
                onApplyFilters()
            },
            onDismissClick = onDismiss
        )
    }
}

/**
 * 排序选项对话框
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SortDialog(
    currentSort: String,
    onSortSelected: (String) -> Unit,
    onDismiss: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isLightTheme = !isSystemInDarkTheme()
    val colors = getGlassColors(isLightTheme)
    
    val sortOptions = listOf(
        "Name A-Z" to "name_asc",
        "Name Z-A" to "name_desc",
        "Quantity Asc" to "quantity_asc",
        "Quantity Desc" to "quantity_desc",
        "Date Newest" to "created_desc",
        "Date Oldest" to "created_asc"
    )
    
    AlertDialog(
        onDismissRequest = onDismiss,
        modifier = modifier
            .background(colors.container.copy(alpha = 0.9f), RoundedCornerShape(16.dp))
    ) {
        GlassConfirmDialog(
            title = "Sort By",
            content = {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    sortOptions.forEach { (label, value) ->
                        SortOptionItem(
                            label = label,
                            isSelected = currentSort == value,
                            onSelected = {
                                onSortSelected(value)
                                onDismiss()
                            },
                            colors = colors
                        )
                    }
                }
            },
            confirmText = stringResource(id = R.string.add_cancel),
            dismissText = "",
            onConfirmClick = onDismiss,
            onDismissClick = {}
        )
    }
}

/**
 * 排序选项项
 */
@Composable
private fun SortOptionItem(
    label: String,
    isSelected: Boolean,
    onSelected: () -> Unit,
    colors: GlassColorScheme
) {
    Surface(
        onClick = onSelected,
        modifier = Modifier
            .fillMaxWidth()
            .background(
                color = if (isSelected) colors.selectedContainer else colors.container.copy(alpha = 0.5f),
                shape = RoundedCornerShape(12.dp)
            )
            .border(
                width = if (isSelected) 1.dp else 0.dp,
                color = if (isSelected) colors.selectedBorder else Color.Transparent,
                shape = RoundedCornerShape(12.dp)
            )
            .padding(16.dp),
        tonalElevation = 0.dp
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = label,
                style = GlassTypography.bodyLarge.copy(
                    color = if (isSelected) colors.primary else colors.text,
                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                )
            )
            if (isSelected) {
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = null,
                    tint = colors.primary
                )
            }
        }
    }
}

/**
 * 统一筛选对话框
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun UnifiedFilterDialog(
    categories: List<String>,
    currentFilter: UnifiedFilter,
    onFilterChanged: (UnifiedFilter) -> Unit,
    onDismiss: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isLightTheme = !isSystemInDarkTheme()
    val colors = getGlassColors(isLightTheme)
    
    var tempFilter by remember { mutableStateOf(currentFilter) }
    
    AlertDialog(
        onDismissRequest = onDismiss,
        modifier = modifier
            .background(colors.container.copy(alpha = 0.9f), RoundedCornerShape(16.dp))
    ) {
        GlassConfirmDialog(
            title = stringResource(id = R.string.inventory_filter),
            content = {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    // 分类筛选
                    Text(
                        text = stringResource(id = R.string.inventory_category),
                        style = GlassTypography.bodyMedium.copy(
                            color = colors.text.copy(alpha = 0.8f),
                            fontWeight = FontWeight.Bold
                        )
                    )
                    LazyColumn(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(120.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        items(categories) { category ->
                            Surface(
                                onClick = {
                                    tempFilter = tempFilter.copy(
                                        selectedCategories = if (tempFilter.selectedCategories.contains(category)) {
                                            tempFilter.selectedCategories - category
                                        } else {
                                            tempFilter.selectedCategories + category
                                        }
                                    )
                                },
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .background(
                                        color = if (tempFilter.selectedCategories.contains(category)) 
                                            colors.selectedContainer else colors.container.copy(alpha = 0.5f),
                                        shape = RoundedCornerShape(8.dp)
                                    )
                                    .border(
                                        width = if (tempFilter.selectedCategories.contains(category)) 1.dp else 0.dp,
                                        color = if (tempFilter.selectedCategories.contains(category)) 
                                            colors.selectedBorder else Color.Transparent,
                                        shape = RoundedCornerShape(8.dp)
                                    )
                                    .padding(12.dp),
                                tonalElevation = 0.dp
                            ) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(
                                        text = category,
                                        style = GlassTypography.bodyMedium.copy(
                                            color = if (tempFilter.selectedCategories.contains(category)) 
                                                colors.primary else colors.text
                                        )
                                    )
                                    if (tempFilter.selectedCategories.contains(category)) {
                                        Icon(
                                            imageVector = Icons.Default.Check,
                                            contentDescription = null,
                                            tint = colors.primary,
                                            modifier = Modifier.size(16.dp)
                                        )
                                    }
                                }
                            }
                        }
                    }
                    
                    // 状态筛选
                    Text(
                        text = stringResource(id = R.string.inventory_status),
                        style = GlassTypography.bodyMedium.copy(
                            color = colors.text.copy(alpha = 0.8f),
                            fontWeight = FontWeight.Bold
                        )
                    )
                    LazyColumn(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(160.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        items(StatusFilter.values()) { statusFilter ->
                            Surface(
                                onClick = {
                                    tempFilter = tempFilter.copy(statusFilter = statusFilter)
                                },
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .background(
                                        color = if (tempFilter.statusFilter == statusFilter) 
                                            colors.selectedContainer else colors.container.copy(alpha = 0.5f),
                                        shape = RoundedCornerShape(8.dp)
                                    )
                                    .border(
                                        width = if (tempFilter.statusFilter == statusFilter) 1.dp else 0.dp,
                                        color = if (tempFilter.statusFilter == statusFilter) 
                                            colors.selectedBorder else Color.Transparent,
                                        shape = RoundedCornerShape(8.dp)
                                    )
                                    .padding(12.dp),
                                tonalElevation = 0.dp
                            ) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(
                                        text = statusFilter.displayName,
                                        style = GlassTypography.bodyMedium.copy(
                                            color = if (tempFilter.statusFilter == statusFilter) 
                                                colors.primary else colors.text
                                        )
                                    )
                                    if (tempFilter.statusFilter == statusFilter) {
                                        Icon(
                                            imageVector = Icons.Default.Check,
                                            contentDescription = null,
                                            tint = colors.primary,
                                            modifier = Modifier.size(16.dp)
                                        )
                                    }
                                }
                            }
                        }
                    }
                    
                    // 排序选项
                    Text(
                        text = stringResource(id = R.string.inventory_sort),
                        style = GlassTypography.bodyMedium.copy(
                            color = colors.text.copy(alpha = 0.8f),
                            fontWeight = FontWeight.Bold
                        )
                    )
                    LazyColumn(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(160.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        items(SortOption.values()) { sortOption ->
                            Surface(
                                onClick = {
                                    tempFilter = tempFilter.copy(sortOption = sortOption)
                                },
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .background(
                                        color = if (tempFilter.sortOption == sortOption) 
                                            colors.selectedContainer else colors.container.copy(alpha = 0.5f),
                                        shape = RoundedCornerShape(8.dp)
                                    )
                                    .border(
                                        width = if (tempFilter.sortOption == sortOption) 1.dp else 0.dp,
                                        color = if (tempFilter.sortOption == sortOption) 
                                            colors.selectedBorder else Color.Transparent,
                                        shape = RoundedCornerShape(8.dp)
                                    )
                                    .padding(12.dp),
                                tonalElevation = 0.dp
                            ) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(
                                        text = when (sortOption) {
                                            SortOption.NAME_ASC -> "名称 A-Z"
                                            SortOption.NAME_DESC -> "名称 Z-A"
                                            SortOption.QUANTITY_ASC -> "数量 升序"
                                            SortOption.QUANTITY_DESC -> "数量 降序"
                                            SortOption.DATE_ADDED_ASC -> "添加日期 升序"
                                            SortOption.DATE_ADDED_DESC -> "添加日期 降序"
                                            SortOption.EXPIRY_DATE_ASC -> "过期日期 近到远"
                                            SortOption.EXPIRY_DATE_DESC -> "过期日期 远到近"
                                            SortOption.UPDATED_AT_ASC -> "更新时间 旧到新"
                                            SortOption.UPDATED_AT_DESC -> "更新时间 新到旧"
                                        },
                                        style = GlassTypography.bodyMedium.copy(
                                            color = if (tempFilter.sortOption == sortOption) 
                                                colors.primary else colors.text
                                        )
                                    )
                                    if (tempFilter.sortOption == sortOption) {
                                        Icon(
                                            imageVector = Icons.Default.Check,
                                            contentDescription = null,
                                            tint = colors.primary,
                                            modifier = Modifier.size(16.dp)
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            },
            confirmText = stringResource(id = R.string.add_save),
            dismissText = stringResource(id = R.string.add_cancel),
            onConfirmClick = {
                onFilterChanged(tempFilter)
                onDismiss()
            },
            onDismissClick = onDismiss
        )
    }
}