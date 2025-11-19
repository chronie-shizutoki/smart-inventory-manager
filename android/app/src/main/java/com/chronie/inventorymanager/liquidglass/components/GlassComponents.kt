package com.chronie.inventorymanager.liquidglass.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.*
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import com.chronie.inventorymanager.R
import com.chronie.inventorymanager.domain.model.InventoryItem
import com.chronie.inventorymanager.domain.model.StatusFilter
import com.chronie.inventorymanager.domain.model.StockStatus
import com.chronie.inventorymanager.domain.model.getStockStatus
import com.chronie.inventorymanager.domain.model.isExpired
import com.chronie.inventorymanager.domain.model.isExpiringSoon
import com.chronie.inventorymanager.liquidglass.backdrop.backdrops.rememberCanvasBackdrop
import com.chronie.inventorymanager.liquidglass.backdrop.drawBackdrop
import com.chronie.inventorymanager.ui.theme.GlassTypography
import com.chronie.inventorymanager.ui.theme.getGlassColors
import java.text.SimpleDateFormat
import java.util.*

/** 液态玻璃搜索框 */
@Composable
fun GlassSearchBar(
        value: String,
        onValueChange: (String) -> Unit,
        placeholder: String,
        modifier: Modifier = Modifier
) {
        val isLightTheme = !isSystemInDarkTheme()
        val colors = getGlassColors(isLightTheme)
        val backdrop = rememberCanvasBackdrop {
                drawRoundRect(
                        color = colors.container,
                        cornerRadius = androidx.compose.ui.geometry.CornerRadius(16f, 16f)
                )
        }

        Box(
                modifier =
                        modifier
                                .drawBackdrop(
                                        backdrop = backdrop,
                                        shape = { RoundedCornerShape(16.dp) },
                                        effects = {}
                                )
                                .alpha(colors.alpha)
        ) {
                BasicTextField(
                        value = value,
                        onValueChange = onValueChange,
                        textStyle = GlassTypography.bodyMedium.copy(color = colors.text),
                        modifier =
                                Modifier.fillMaxWidth()
                                        .padding(horizontal = 16.dp, vertical = 12.dp),
                        decorationBox = { innerTextField ->
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                        Icon(
                                                imageVector = Icons.Default.Search,
                                                contentDescription =
                                                        stringResource(R.string.inventory_search),
                                                modifier = Modifier.size(20.dp),
                                                tint = colors.text.copy(alpha = 0.6f)
                                        )
                                        Spacer(modifier = Modifier.width(12.dp))
                                        Box(modifier = Modifier.weight(1f)) {
                                                if (value.isEmpty()) {
                                                        Text(
                                                                text = placeholder,
                                                                style =
                                                                        GlassTypography.bodyMedium
                                                                                .copy(
                                                                                        color =
                                                                                                colors.text
                                                                                                        .copy(
                                                                                                                alpha =
                                                                                                                        0.6f
                                                                                                        )
                                                                                )
                                                        )
                                                }
                                                innerTextField()
                                        }
                                        if (value.isNotEmpty()) {
                                                IconButton(
                                                        onClick = { onValueChange("") },
                                                        modifier = Modifier.size(20.dp)
                                                ) {
                                                        Icon(
                                                                imageVector = Icons.Default.Close,
                                                                contentDescription = null,
                                                                tint =
                                                                        colors.text.copy(
                                                                                alpha = 0.6f
                                                                        )
                                                        )
                                                }
                                        }
                                }
                        },
                        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
                        keyboardActions = KeyboardActions(onSearch = { /* Handle search */})
                )
        }
}

/** 液态玻璃筛选器 */
@Composable
fun GlassFilterChip(
        text: String,
        isSelected: Boolean,
        onSelected: (Boolean) -> Unit,
        modifier: Modifier = Modifier,
        icon: ImageVector? = null
) {
        val isLightTheme = !isSystemInDarkTheme()
        val colors = getGlassColors(isLightTheme)

        Box(
                modifier =
                        modifier.background(
                                        color =
                                                if (isSelected) colors.selectedContainer
                                                else colors.container,
                                        shape = RoundedCornerShape(20.dp)
                                )
                                .border(
                                        width = if (isSelected) 1.dp else 0.dp,
                                        color =
                                                if (isSelected) colors.selectedBorder
                                                else Color.Transparent,
                                        shape = RoundedCornerShape(20.dp)
                                )
                                .clickable { onSelected(!isSelected) }
                                .padding(horizontal = 16.dp, vertical = 8.dp),
                contentAlignment = Alignment.Center
        ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                        if (icon != null) {
                                Icon(
                                        imageVector = icon,
                                        contentDescription = null,
                                        modifier = Modifier.size(16.dp),
                                        tint =
                                                if (isSelected) colors.primary
                                                else colors.text.copy(alpha = 0.7f)
                                )
                                Spacer(modifier = Modifier.width(6.dp))
                        }
                        Text(
                                text = text,
                                style =
                                        GlassTypography.labelMedium.copy(
                                                color =
                                                        if (isSelected) colors.primary
                                                        else colors.text.copy(alpha = 0.7f)
                                        )
                        )
                }
        }
}

/** 液态玻璃统计卡片 */
@Composable
fun GlassStatsCard(
        title: String,
        value: String,
        icon: ImageVector,
        iconTint: Color,
        modifier: Modifier = Modifier,
        trend: String? = null
) {
        val isLightTheme = !isSystemInDarkTheme()
        val colors = getGlassColors(isLightTheme)
        val backdrop = rememberCanvasBackdrop {
                drawRoundRect(
                        color = colors.cardContainer,
                        cornerRadius = androidx.compose.ui.geometry.CornerRadius(16f, 16f)
                )
        }

        Box(
                modifier =
                        modifier
                                .drawBackdrop(
                                        backdrop = backdrop,
                                        shape = { RoundedCornerShape(16.dp) },
                                        effects = {}
                                )
                                .alpha(colors.alpha)
                                .padding(16.dp),
                contentAlignment = Alignment.Center
        ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                                modifier =
                                        Modifier.size(48.dp)
                                                .background(
                                                        color = iconTint.copy(alpha = 0.2f),
                                                        shape = RoundedCornerShape(12.dp)
                                                ),
                                contentAlignment = Alignment.Center
                        ) {
                                Icon(
                                        imageVector = icon,
                                        contentDescription = title,
                                        modifier = Modifier.size(24.dp),
                                        tint = iconTint
                                )
                        }
                        Spacer(modifier = Modifier.width(16.dp))
                        Column {
                                Text(
                                        text = title,
                                        style =
                                                GlassTypography.bodySmall.copy(
                                                        color = colors.text.copy(alpha = 0.7f)
                                                )
                                )
                                Text(
                                        text = value,
                                        style =
                                                GlassTypography.headlineSmall.copy(
                                                        color = colors.text,
                                                        fontWeight = FontWeight.Bold
                                                )
                                )
                                if (trend != null) {
                                        Text(
                                                text = trend,
                                                style =
                                                        GlassTypography.bodySmall.copy(
                                                                color =
                                                                        colors.text.copy(
                                                                                alpha = 0.6f
                                                                        )
                                                        )
                                        )
                                }
                        }
                }
        }
}

/** 液态玻璃库存物品卡片 */
@Composable
fun GlassInventoryItemCard(
        item: InventoryItem,
        onUse: () -> Unit,
        onEdit: () -> Unit,
        onView: () -> Unit,
        onDelete: () -> Unit,
        modifier: Modifier = Modifier
) {
        val isLightTheme = !isSystemInDarkTheme()
        val colors = getGlassColors(isLightTheme)
        val backdrop = rememberCanvasBackdrop {
                drawRoundRect(
                        color = colors.cardContainer,
                        cornerRadius = androidx.compose.ui.geometry.CornerRadius(16f, 16f)
                )
        }

        val status = item.getStockStatus()
        val statusColor =
                when (status) {
                        StockStatus.NORMAL ->
                                if (isLightTheme) Color(0xFF4CAF50) else Color(0xFF4CAF50)
                        StockStatus.LOW_STOCK -> Color(0xFFFF9800)
                        StockStatus.EXPIRING_SOON -> Color(0xFFFF5722)
                        StockStatus.EXPIRED -> Color(0xFFF44336)
                }

        Box(
                modifier =
                        modifier
                                .drawBackdrop(
                                        backdrop = backdrop,
                                        shape = { RoundedCornerShape(16.dp) },
                                        effects = {}
                                )
                                .alpha(colors.alpha)
                                .padding(16.dp),
                contentAlignment = Alignment.Center
        ) {
                Column {
                        // 顶部状态栏
                        Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                        ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                        Text(
                                                text = item.name,
                                                style =
                                                        GlassTypography.titleMedium.copy(
                                                                color = colors.text,
                                                                fontWeight = FontWeight.Bold
                                                        )
                                        )
                                        Spacer(modifier = Modifier.width(8.dp))
                                        // 状态指示器
                                        Box(
                                                modifier =
                                                        Modifier.size(8.dp)
                                                                .background(
                                                                        color = statusColor,
                                                                        shape =
                                                                                RoundedCornerShape(
                                                                                        4.dp
                                                                                )
                                                                )
                                        )
                                }

                                Row {
                                        IconButton(onClick = onUse, enabled = item.quantity > 0) {
                                                Icon(
                                                        imageVector = Icons.Default.Remove,
                                                        contentDescription = null,
                                                        tint =
                                                                if (item.quantity > 0) colors.text
                                                                else colors.text.copy(alpha = 0.5f)
                                                )
                                        }
                                        IconButton(onClick = onView) {
                                                Icon(
                                                        imageVector = Icons.Default.Info,
                                                        contentDescription = null,
                                                        tint = colors.text
                                                )
                                        }
                                        IconButton(onClick = onEdit) {
                                                Icon(
                                                        imageVector = Icons.Default.Edit,
                                                        contentDescription = null,
                                                        tint = colors.text
                                                )
                                        }
                                        IconButton(onClick = onDelete) {
                                                Icon(
                                                        imageVector = Icons.Default.Delete,
                                                        contentDescription = null,
                                                        tint = colors.text
                                                )
                                        }
                                }
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        // 详细信息
                        Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                                Column {
                                        Text(
                                                text =
                                                        stringResource(id = R.string.add_category) +
                                                                ": " +
                                                                item.category,
                                                style =
                                                        GlassTypography.bodySmall.copy(
                                                                color =
                                                                        colors.text.copy(
                                                                                alpha = 0.7f
                                                                        )
                                                        )
                                        )
                                        Text(
                                                text =
                                                        stringResource(id = R.string.add_unit) +
                                                                ": " +
                                                                item.unit,
                                                style =
                                                        GlassTypography.bodySmall.copy(
                                                                color =
                                                                        colors.text.copy(
                                                                                alpha = 0.7f
                                                                        )
                                                        )
                                        )
                                }
                                Column {
                                        Text(
                                                text =
                                                        stringResource(id = R.string.add_quantity) +
                                                                ": " +
                                                                item.quantity,
                                                style =
                                                        GlassTypography.titleMedium.copy(
                                                                color = colors.text,
                                                                fontWeight = FontWeight.Bold
                                                        )
                                        )
                                        Text(
                                                text =
                                                        stringResource(
                                                                id = R.string.add_minquantity
                                                        ) + ": " + item.minQuantity,
                                                style =
                                                        GlassTypography.bodySmall.copy(
                                                                color =
                                                                        colors.text.copy(
                                                                                alpha = 0.6f
                                                                        )
                                                        )
                                        )
                                }
                        }

                        // 过期日期和使用次数
                        Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                                item.expiryDate?.let { expiry ->
                                        val isExpired = item.isExpired()
                                        val isExpiringSoon = item.isExpiringSoon()
                                        Text(
                                                text =
                                                        stringResource(
                                                                id = R.string.add_expirydate
                                                        ) +
                                                                ": " +
                                                                SimpleDateFormat(
                                                                                "yyyy-MM-dd",
                                                                                Locale.getDefault()
                                                                        )
                                                                        .format(expiry),
                                                style =
                                                        GlassTypography.bodySmall.copy(
                                                                color =
                                                                        when {
                                                                                isExpired ->
                                                                                        Color(
                                                                                                0xFFF44336
                                                                                        )
                                                                                isExpiringSoon ->
                                                                                        Color(
                                                                                                0xFFFF5722
                                                                                        )
                                                                                else ->
                                                                                        colors.text
                                                                                                .copy(
                                                                                                        alpha =
                                                                                                                0.7f
                                                                                                )
                                                                        }
                                                        )
                                        )
                                }
                                Text(
                                        text =
                                                stringResource(R.string.purchaselist_lastused) +
                                                        ": ${item.usageCount}",
                                        style =
                                                GlassTypography.bodySmall.copy(
                                                        color = colors.text.copy(alpha = 0.6f)
                                                )
                                )
                        }

                        // 描述
                        if (item.description.isNotEmpty()) {
                                Spacer(modifier = Modifier.height(8.dp))
                                Text(
                                        text = item.description,
                                        style =
                                                GlassTypography.bodySmall.copy(
                                                        color = colors.text.copy(alpha = 0.6f)
                                                ),
                                        maxLines = 2
                                )
                        }
                }
        }
}

/** 液态玻璃筛选栏 */
@Composable
fun GlassFilterBar(
        categories: List<String>,
        selectedCategory: String,
        onCategorySelected: (String) -> Unit,
        statusFilter: StatusFilter,
        onStatusFilterChanged: (StatusFilter) -> Unit,
        modifier: Modifier = Modifier
) {
        LazyColumn(
                modifier = modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
        ) {
                item { Spacer(modifier = Modifier.height(8.dp)) }

                // 分类筛选
                item {
                        Text(
                                text = stringResource(R.string.inventory_category),
                                style = GlassTypography.labelLarge.copy(color = Color.Gray),
                                modifier = Modifier.padding(horizontal = 16.dp)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                }

                item {
                        LazyRow(
                                contentPadding = PaddingValues(horizontal = 16.dp),
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                                items(listOf("") + categories) { category ->
                                        GlassFilterChip(
                                                text =
                                                        if (category.isEmpty())
                                                                stringResource(
                                                                        R.string
                                                                                .inventory_allcategories
                                                                )
                                                        else category,
                                                isSelected = selectedCategory == category,
                                                onSelected = { onCategorySelected(category) },
                                                icon =
                                                        if (category.isEmpty()) Icons.Default.List
                                                        else Icons.Default.Category
                                        )
                                }
                        }
                }

                item { Spacer(modifier = Modifier.height(16.dp)) }

                // 状态筛选
                item {
                        Text(
                                text = stringResource(R.string.inventory_status),
                                style = GlassTypography.labelLarge.copy(color = Color.Gray),
                                modifier = Modifier.padding(horizontal = 16.dp)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                }

                item {
                        LazyRow(
                                contentPadding = PaddingValues(horizontal = 16.dp),
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                                items(StatusFilter.values().toList()) { filter ->
                                        val icon =
                                                when (filter) {
                                                        StatusFilter.ALL -> Icons.Default.List
                                                        StatusFilter.NORMAL ->
                                                                Icons.Default.CheckCircle
                                                        StatusFilter.LOW_STOCK ->
                                                                Icons.Default.Warning
                                                        StatusFilter.EXPIRING_SOON ->
                                                                Icons.Default.Schedule
                                                        StatusFilter.EXPIRED -> Icons.Default.Error
                                                }

                                        GlassFilterChip(
                                                text =
                                                        when (filter) {
                                                                StatusFilter.ALL ->
                                                                        stringResource(
                                                                                R.string
                                                                                        .inventory_showexpired
                                                                        )
                                                                StatusFilter.NORMAL ->
                                                                        stringResource(
                                                                                R.string
                                                                                        .status_normal
                                                                        )
                                                                StatusFilter.LOW_STOCK ->
                                                                        stringResource(
                                                                                R.string
                                                                                        .status_lowstock
                                                                        )
                                                                StatusFilter.EXPIRING_SOON ->
                                                                        stringResource(
                                                                                R.string
                                                                                        .status_expiringsoon
                                                                        )
                                                                StatusFilter.EXPIRED ->
                                                                        stringResource(
                                                                                R.string
                                                                                        .status_expired
                                                                        )
                                                        },
                                                isSelected = statusFilter == filter,
                                                onSelected = { onStatusFilterChanged(filter) },
                                                icon = icon
                                        )
                                }
                        }
                }

                item { Spacer(modifier = Modifier.height(8.dp)) }
        }
}

/** 液态玻璃确认对话框 */
@Composable
fun GlassConfirmDialog(
        title: String,
        message: String? = null,
        content: @Composable (() -> Unit)? = null,
        confirmText: String? = null,
        cancelText: String? = null,
        dismissText: String? = null, // 用于内容对话框的兼容
        onConfirm: (() -> Unit)? = null, // 改名为onConfirmClick以保持一致
        onConfirmClick: (() -> Unit)? = null,
        onCancel: (() -> Unit)? = null,
        onDismissClick: (() -> Unit)? = null,
        isVisible: Boolean = true,
        useIconButtons: Boolean = false // 控制是否使用图标按钮
) {
        if (!isVisible) return

        val finalConfirmText = confirmText ?: stringResource(R.string.add_save)
        val finalCancelText = cancelText ?: stringResource(R.string.add_cancel)

        // 为了兼容旧版本和新版本
        val onConfirmClickFinal = onConfirmClick ?: onConfirm ?: {}
        val onDismissClickFinal = onDismissClick ?: onCancel ?: {}

        val isLightTheme = !isSystemInDarkTheme()
        val colors = getGlassColors(isLightTheme)
        val backdrop = rememberCanvasBackdrop {
                drawRoundRect(
                        color = colors.cardContainer,
                        cornerRadius = androidx.compose.ui.geometry.CornerRadius(20f, 20f)
                )
        }

        Box(
                modifier =
                        Modifier.fillMaxSize()
                                .background(
                                        color = Color.Black.copy(alpha = 0.5f),
                                        shape = RoundedCornerShape(16.dp)
                                )
                                .padding(32.dp),
                contentAlignment = Alignment.Center
        ) {
                Box(
                        modifier =
                                Modifier
                                        .drawBackdrop(
                                                backdrop = backdrop,
                                                shape = { RoundedCornerShape(20.dp) },
                                                effects = {}
                                        )
                                        .alpha(colors.alpha)
                                        .padding(24.dp),
                        contentAlignment = Alignment.Center
                ) {
                        Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                modifier = Modifier.fillMaxWidth()
                        ) {
                                Text(
                                        text = title,
                                        style =
                                                GlassTypography.titleLarge.copy(
                                                        color = colors.text,
                                                        fontWeight = FontWeight.Bold
                                                ),
                                        modifier = Modifier.padding(bottom = 12.dp)
                                )

                                // 根据是否提供content显示内容
                                when {
                                        content != null -> {
                                                content()
                                        }
                                        message != null -> {
                                                Text(
                                                        text = message,
                                                        style =
                                                                GlassTypography.bodyMedium.copy(
                                                                        color =
                                                                                colors.text.copy(
                                                                                        alpha = 0.8f
                                                                                )
                                                                ),
                                                        modifier = Modifier.padding(bottom = 24.dp)
                                                )
                                        }
                                        else -> {
                                                Text(
                                                        text =
                                                                stringResource(
                                                                        R.string
                                                                                .airecord_norecordsgenerated
                                                                ),
                                                        style =
                                                                GlassTypography.bodyMedium.copy(
                                                                        color =
                                                                                colors.text.copy(
                                                                                        alpha = 0.5f
                                                                                )
                                                                ),
                                                        modifier = Modifier.padding(bottom = 24.dp)
                                                )
                                        }
                                }

                                // 按钮区域
                                Row(
                                        horizontalArrangement = Arrangement.spacedBy(16.dp),
                                        verticalAlignment = Alignment.CenterVertically
                                ) {
                                        if (useIconButtons) {
                                                // 取消按钮（×）
                                                IconButton(
                                                        onClick = { onDismissClickFinal() },
                                                        modifier =
                                                                Modifier.background(
                                                                                color =
                                                                                        colors.container,
                                                                                shape =
                                                                                        RoundedCornerShape(
                                                                                                12.dp
                                                                                        )
                                                                        )
                                                                        .padding(8.dp)
                                                ) {
                                                        Icon(
                                                                imageVector = Icons.Default.Close,
                                                                contentDescription =
                                                                        finalCancelText,
                                                                tint = colors.text
                                                        )
                                                }

                                                Spacer(modifier = Modifier.width(16.dp))

                                                // 确认按钮（√）
                                                IconButton(
                                                        onClick = { onConfirmClickFinal() },
                                                        modifier =
                                                                Modifier.background(
                                                                                color =
                                                                                        Color(
                                                                                                0xFFF44336
                                                                                        ),
                                                                                shape =
                                                                                        RoundedCornerShape(
                                                                                                12.dp
                                                                                        )
                                                                        )
                                                                        .padding(8.dp)
                                                ) {
                                                        Icon(
                                                                imageVector = Icons.Default.Check,
                                                                contentDescription =
                                                                        finalConfirmText,
                                                                tint = Color.White
                                                        )
                                                }
                                        } else {
                                                // 传统文本按钮
                                                Button(
                                                        onClick = { onDismissClickFinal() },
                                                        colors =
                                                                ButtonDefaults.buttonColors(
                                                                        containerColor =
                                                                                colors.container
                                                                ),
                                                        shape = RoundedCornerShape(12.dp),
                                                        modifier = Modifier.weight(1f)
                                                ) {
                                                        Text(
                                                                text =
                                                                        if (dismissText != null)
                                                                                dismissText
                                                                        else finalCancelText,
                                                                style =
                                                                        GlassTypography.labelLarge
                                                                                .copy(
                                                                                        color =
                                                                                                colors.text
                                                                                )
                                                        )
                                                }

                                                Button(
                                                        onClick = { onConfirmClickFinal() },
                                                        colors =
                                                                ButtonDefaults.buttonColors(
                                                                        containerColor =
                                                                                Color(0xFFF44336)
                                                                ),
                                                        shape = RoundedCornerShape(12.dp),
                                                        modifier = Modifier.weight(1f)
                                                ) {
                                                        Text(
                                                                text = finalConfirmText,
                                                                style =
                                                                        GlassTypography.labelLarge
                                                                                .copy(
                                                                                        color =
                                                                                                Color.White
                                                                                )
                                                        )
                                                }
                                        }
                                }
                        }
                }
        }
}
