package com.chronie.inventorymanager.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*;
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.*
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chronie.inventorymanager.R
import com.chronie.inventorymanager.domain.model.InventoryItem
import com.chronie.inventorymanager.presentation.viewmodel.AddItemViewModel
import com.chronie.inventorymanager.utils.CategoryNameConverter
import com.chronie.inventorymanager.ui.theme.getGlassColors
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.SnackbarResult
import androidx.compose.material3.Snackbar
import androidx.compose.material3.SnackbarDuration
import androidx.compose.runtime.rememberCoroutineScope
import kotlinx.coroutines.launch
import java.time.LocalDateTime

/** 添加物品页面 - 完整的液态玻璃设计 */
@Composable
fun AddItemScreen(
    onNavigateBack: () -> Unit = {},
    viewModel: AddItemViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    val isLightTheme = !androidx.compose.foundation.isSystemInDarkTheme()
    val glassColors = getGlassColors(isLightTheme)
    
    // Snackbar状态管理
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()
    
    // 表单状态
    var name by remember { mutableStateOf("") }
    var category by remember { mutableStateOf("") }
    var categoryDisplayName by remember { mutableStateOf("") } // 用于显示的中文名称
    var quantity by remember { mutableStateOf("") }
    var minStock by remember { mutableStateOf("") }
    var unit by remember { mutableStateOf("") }
    var expiryDate by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    
    // 表单验证状态
    var nameError by remember { mutableStateOf<String?>(null) }
    var categoryError by remember { mutableStateOf<String?>(null) }
    var quantityError by remember { mutableStateOf<String?>(null) }
    var dateError by remember { mutableStateOf<String?>(null) }
    
    val predefinedCategories = uiState.categories
    
    LaunchedEffect(uiState.categories) {
        if (uiState.categories.isNotEmpty()) {
            category = uiState.categories.first()
        }
    }
    
    // 处理成功状态
    LaunchedEffect(uiState.isSuccess) {
        if (uiState.isSuccess) {
            // 显示成功消息
            scope.launch {
                snackbarHostState.showSnackbar(
                    message = "物品添加成功！",
                    duration = androidx.compose.material3.SnackbarDuration.Long
                )
            }
            
            // 重置表单
            viewModel.resetForm()
            
            // 清除成功状态
            viewModel.clearSuccess()
            
            // 延迟导航返回，给用户时间看到成功提示
            kotlinx.coroutines.delay(1500)
            onNavigateBack()
        }
    }

    // 液态玻璃主背景效果 - 更丰富的渐变
    val backgroundBrush = Brush.verticalGradient(
        colors = listOf(
            if (isLightTheme) Color(0xFFF8F9FF) else Color(0xFF0A0A0A),
            if (isLightTheme) Color(0xFFE8EFFF) else Color(0xFF151515),
            if (isLightTheme) Color(0xFFFAF8FF) else Color(0xFF0D0D0D)
        )
    )
    
    // 表单容器液态玻璃效果
    val containerBrush = Brush.verticalGradient(
        colors = listOf(
            glassColors.glassTop,
            glassColors.glassBottom
        )
    )
    
    // 使用Column替代Scaffold避免标题栏占位
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(backgroundBrush)
            .padding(16.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(20.dp)
    ) {
        // 表单容器卡片 - 液态玻璃效果
        GlassCardContainer(
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                verticalArrangement = Arrangement.spacedBy(20.dp)
            ) {
                // 标题区域
                GlassTitleSection(
                    title = stringResource(R.string.add_title),
                    subtitle = stringResource(R.string.add_edittitle)
                )
                
                // 物品名称
                GlassTextField(
                    value = name,
                    onValueChange = { 
                        name = it
                        nameError = null
                    },
                    label = stringResource(R.string.add_name),
                    placeholder = stringResource(R.string.add_name_placeholder),
                    leadingIcon = Icons.Default.Title,
                    errorMessage = nameError,
                    keyboardOptions = KeyboardOptions(
                        imeAction = ImeAction.Next
                    )
                )
                
                // 分类选择 - 使用CategoryNameConverter国际化
                val context = LocalContext.current
                val availableCategories = remember { CategoryNameConverter.getValidCategories() }
                
                GlassDropdownField(
                    value = categoryDisplayName, // 显示中文名称
                    onValueChange = { displayName ->
                        // 找到对应的英文键名
                        val categoryKey = availableCategories.find { key ->
                            CategoryNameConverter.getDisplayName(key, context) == displayName
                        } ?: displayName
                        
                        category = categoryKey // 存储英文键名
                        categoryDisplayName = displayName // 存储显示的中文名称
                        categoryError = null
                    },
                    label = stringResource(R.string.add_category),
                    placeholder = stringResource(R.string.add_selectcategory),
                    items = availableCategories.map { CategoryNameConverter.getDisplayName(it, context) },
                    leadingIcon = Icons.Default.Category,
                    errorMessage = categoryError
                )
                
                // 数量
                GlassTextField(
                    value = quantity,
                    onValueChange = { 
                        if (it.all { char -> char.isDigit() }) {
                            quantity = it
                            quantityError = null
                        }
                    },
                    label = stringResource(R.string.add_quantity),
                    placeholder = stringResource(R.string.add_quantity_placeholder),
                    leadingIcon = Icons.Default.Numbers,
                    errorMessage = quantityError,
                    keyboardOptions = KeyboardOptions(
                        keyboardType = KeyboardType.Number,
                        imeAction = ImeAction.Next
                    )
                )
                
                // 最小库存
                GlassTextField(
                    value = minStock,
                    onValueChange = { 
                        if (it.all { char -> char.isDigit() }) {
                            minStock = it
                        }
                    },
                    label = stringResource(R.string.add_minquantity),
                    placeholder = stringResource(R.string.add_minquantity_placeholder),
                    leadingIcon = Icons.Default.ShoppingCart,
                    keyboardOptions = KeyboardOptions(
                        keyboardType = KeyboardType.Number,
                        imeAction = ImeAction.Next
                    )
                )
                
                // 单位
                GlassTextField(
                    value = unit,
                    onValueChange = { unit = it },
                    label = stringResource(R.string.add_unit),
                    placeholder = stringResource(R.string.add_unit_placeholder),
                    leadingIcon = Icons.Default.FormatColorFill,
                    keyboardOptions = KeyboardOptions(
                        imeAction = ImeAction.Next
                    )
                )
                
                // 到期日期 - 支持直接文字输入
                GlassDateField(
                    value = expiryDate,
                    onValueChange = { expiryDate = it },
                    label = stringResource(R.string.add_expirydate),
                    placeholder = stringResource(R.string.add_expirydate_placeholder),
                    leadingIcon = Icons.Default.CalendarToday,
                    modifier = Modifier.fillMaxWidth(),
                    errorMessage = dateError
                )
                
                // 描述
                GlassTextField(
                    value = description,
                    onValueChange = { description = it },
                    label = stringResource(R.string.add_description),
                    placeholder = stringResource(R.string.add_description_placeholder),
                    leadingIcon = Icons.Default.Description,
                    singleLine = false,
                    keyboardOptions = KeyboardOptions(
                        imeAction = ImeAction.Done
                    )
                )
            }
        }
        
        // 保存按钮 - 液态玻璃按钮
        Spacer(modifier = Modifier.height(8.dp))
        
        // 预定义字符串资源
        val nameRequired = stringResource(R.string.error_name_required)
        val categoryRequired = stringResource(R.string.error_category_required) 
        val quantityRequired = stringResource(R.string.error_quantity_required)
        val saveText = stringResource(R.string.add_save)
        
        GlassSaveButton(
            onClick = {
                // 表单验证
                var hasError = false
                
                if (name.isBlank()) {
                    nameError = nameRequired
                    hasError = true
                }
                
                if (category.isBlank()) {
                    categoryError = categoryRequired
                    hasError = true
                }
                
                if (quantity.isBlank()) {
                    quantityError = quantityRequired
                    hasError = true
                }
                
                if (!hasError) {
                    // 精确验证数量格式
                    val quantityValue = quantity.trim().toIntOrNull()
                    if (quantityValue == null) {
                        quantityError = "无效的数量格式"
                        hasError = true
                    } else if (quantityValue < 0) {
                        quantityError = "数量不能为负数"
                        hasError = true
                    }
                    
                    // 精确验证最小库存格式（如果填写了的话）
                    val minStockValue = minStock.trim().toIntOrNull()
                    if (minStock.isNotBlank() && minStockValue == null) {
                        // 这里我们可以添加最小库存错误处理，或者只是忽略错误使用默认值
                    }
                    
                    // 验证日期格式（如果填写了的话）
                    dateError = null // 重置错误状态
                    var parsedDate: Date? = null
                    if (expiryDate.trim().isNotEmpty()) {
                        try {
                            // 尝试多种日期格式，增加灵活性
                            val dateFormats = listOf(
                                SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()),
                                SimpleDateFormat("yyyy/MM/dd", Locale.getDefault()),
                                SimpleDateFormat("yyyy.MM.dd", Locale.getDefault()),
                                SimpleDateFormat("MM/dd/yyyy", Locale.getDefault()),
                                SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
                            )
                            
                            parsedDate = null
                            for (format in dateFormats) {
                                try {
                                    parsedDate = format.parse(expiryDate.trim())
                                    break // 如果成功解析，跳出循环
                                } catch (e: Exception) {
                                    continue // 尝试下一个格式
                                }
                            }
                            
                            if (parsedDate == null) {
                                dateError = "日期格式无效，请使用 YYYY-MM-DD、YYYY/MM/DD 等常见格式"
                                hasError = true
                            }
                        } catch (e: Exception) {
                            dateError = "日期格式无效，请使用 YYYY-MM-DD、YYYY/MM/DD 等常见格式"
                            hasError = true
                        }
                    }
                    
                    if (!hasError) {
                        try {
                            // 创建库存物品
                            val inventoryItem = InventoryItem(
                                id = "", // 将由数据库分配
                                name = name.trim(),
                                category = category.trim(),
                                quantity = quantityValue!!,
                                unit = unit.trim(),
                                description = description.trim(),
                                expiryDate = parsedDate,
                                minQuantity = minStockValue ?: 0,
                                createdAt = Date(),
                                updatedAt = Date()
                            )
                            
                            // 保存到数据库，通过ViewModel处理成功状态
                            viewModel.addItem(inventoryItem)
                            
                            // 不再直接导航返回，而是通过成功状态处理
                            
                        } catch (e: Exception) {
                            // 数据库操作或其他错误
                            scope.launch {
                                snackbarHostState.showSnackbar(
                                    message = "保存失败：${e.message}",
                                    duration = androidx.compose.material3.SnackbarDuration.Long
                                )
                            }
                        }
                    }
                }
            },
            text = saveText,
            modifier = Modifier.fillMaxWidth()
        )
    }
    
    // Snackbar显示区域
    SnackbarHost(
        hostState = snackbarHostState,
        modifier = Modifier.fillMaxWidth()
    ) { snackbarData ->
        Box(
            modifier = Modifier.fillMaxWidth()
        ) {
            Snackbar(
                snackbarData = snackbarData,
                containerColor = glassColors.primary.copy(alpha = 0.9f),
                contentColor = Color.White,
                shape = RoundedCornerShape(12.dp)
            )
        }
    }
    
}

/** 液态玻璃标题区域 */
@Composable
fun GlassTitleSection(
    title: String,
    subtitle: String,
    modifier: Modifier = Modifier
) {
    val isLightTheme = !androidx.compose.foundation.isSystemInDarkTheme()
    val glassColors = getGlassColors(isLightTheme)
    
    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = title,
            style = androidx.compose.material3.Typography().headlineSmall.copy(
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                brush = Brush.verticalGradient(
                    colors = listOf(
                        glassColors.primary,
                        glassColors.secondary
                    )
                )
            )
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = subtitle,
            style = androidx.compose.material3.Typography().bodyMedium.copy(
                color = glassColors.textSecondary
            )
        )
    }
}

/** 液态玻璃容器卡片 */
@Composable
fun GlassCardContainer(
    modifier: Modifier = Modifier,
    content: @Composable ColumnScope.() -> Unit
) {
    val isLightTheme = !androidx.compose.foundation.isSystemInDarkTheme()
    val glassColors = getGlassColors(isLightTheme)
    
    val containerBrush = Brush.verticalGradient(
        colors = listOf(
            glassColors.glassTop,
            glassColors.glassBottom
        )
    )
    
    Box(
        modifier = modifier
            .fillMaxWidth()
            .shadow(
                elevation = 12.dp,
                spotColor = glassColors.primary.copy(alpha = 0.2f),
                ambientColor = glassColors.primary.copy(alpha = 0.1f)
            )
            .background(containerBrush, RoundedCornerShape(20.dp))
            .border(
                width = 1.dp,
                brush = Brush.horizontalGradient(
                    colors = listOf(
                        glassColors.border,
                        glassColors.border.copy(alpha = 0.5f),
                        glassColors.border
                    )
                ),
                shape = RoundedCornerShape(20.dp)
            )
            .padding(24.dp)
    ) {
        Column(content = content)
    }
}

/** 液态玻璃保存按钮 */
@Composable
fun GlassSaveButton(
    onClick: () -> Unit,
    text: String,
    modifier: Modifier = Modifier
) {
    val isLightTheme = !androidx.compose.foundation.isSystemInDarkTheme()
    val glassColors = getGlassColors(isLightTheme)
    
    val buttonBrush = Brush.verticalGradient(
        colors = listOf(
            glassColors.primary.copy(alpha = 0.9f),
            glassColors.secondary.copy(alpha = 0.9f)
        )
    )
    
    Button(
        onClick = onClick,
        modifier = modifier
            .height(56.dp)
            .shadow(
                elevation = 8.dp,
                spotColor = glassColors.primary.copy(alpha = 0.3f)
            )
            .border(
                width = 1.dp,
                brush = Brush.horizontalGradient(
                    colors = listOf(
                        glassColors.primary.copy(alpha = 0.8f),
                        glassColors.secondary.copy(alpha = 0.8f)
                    )
                ),
                shape = RoundedCornerShape(16.dp)
            ),
        colors = ButtonDefaults.buttonColors(
            containerColor = Color.Transparent,
            contentColor = Color.White
        ),
        shape = RoundedCornerShape(16.dp)
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(buttonBrush, RoundedCornerShape(16.dp)),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = text,
                style = androidx.compose.material3.Typography().labelLarge.copy(
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
            )
        }
        
    }
}

/** 改进的液态玻璃文本字段 */
@Composable
fun GlassTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    placeholder: String,
    leadingIcon: androidx.compose.ui.graphics.vector.ImageVector? = null,
    errorMessage: String? = null,
    singleLine: Boolean = true,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    modifier: Modifier = Modifier
) {
    val isLightTheme = !androidx.compose.foundation.isSystemInDarkTheme()
    val glassColors = getGlassColors(isLightTheme)
    
    // 液态玻璃效果
    val glassBrush = Brush.verticalGradient(
        colors = listOf(
            glassColors.glassTop,
            glassColors.glassBottom
        )
    )
    
    Column(modifier = modifier) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .shadow(8.dp, RoundedCornerShape(16.dp), clip = false)
                .background(glassBrush, RoundedCornerShape(16.dp))
                .border(
                    width = 1.dp,
                    brush = Brush.horizontalGradient(
                        colors = listOf(
                            glassColors.border,
                            glassColors.border.copy(alpha = 0.5f)
                        )
                    ),
                    shape = RoundedCornerShape(16.dp)
                )
                .padding(1.dp)
        ) {
            OutlinedTextField(
                value = value,
                onValueChange = onValueChange,
                label = { Text(label) },
                placeholder = { Text(placeholder) },
                leadingIcon = if (leadingIcon != null) {
                    { Icon(leadingIcon, contentDescription = null, tint = glassColors.primary) }
                } else null,
                isError = errorMessage != null,
                singleLine = singleLine,
                keyboardOptions = keyboardOptions,
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color.Transparent),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = if (errorMessage != null) MaterialTheme.colorScheme.error else Color.Transparent,
                    unfocusedBorderColor = if (errorMessage != null) MaterialTheme.colorScheme.error else Color.Transparent,
                    disabledBorderColor = Color.Transparent,
                    focusedLabelColor = glassColors.primary,
                    cursorColor = glassColors.primary,
                    focusedTrailingIconColor = glassColors.primary,
                    unfocusedTrailingIconColor = glassColors.container,
                    focusedLeadingIconColor = glassColors.primary,
                    unfocusedLeadingIconColor = glassColors.container,
                    errorBorderColor = MaterialTheme.colorScheme.error,
                    errorCursorColor = MaterialTheme.colorScheme.error,
                    errorSupportingTextColor = MaterialTheme.colorScheme.error,
                    errorLabelColor = MaterialTheme.colorScheme.error,
                    errorLeadingIconColor = MaterialTheme.colorScheme.error,
                    errorTrailingIconColor = MaterialTheme.colorScheme.error
                )
            )
        }
        
        if (errorMessage != null) {
            Text(
                text = errorMessage,
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(start = 16.dp, top = 4.dp)
            )
        }
        
        if (errorMessage != null) {
            Text(
                text = errorMessage,
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(start = 16.dp, top = 4.dp)
            )
        }
    }
}

/** 改进的液态玻璃下拉选择框 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GlassDropdownField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    placeholder: String,
    items: List<String>,
    leadingIcon: androidx.compose.ui.graphics.vector.ImageVector? = null,
    errorMessage: String? = null,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }
    val isLightTheme = !androidx.compose.foundation.isSystemInDarkTheme()
    val glassColors = getGlassColors(isLightTheme)
    
    // 液态玻璃效果
    val glassBrush = Brush.verticalGradient(
        colors = listOf(
            glassColors.glassTop,
            glassColors.glassBottom
        )
    )
    
    Column(modifier = modifier) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .shadow(8.dp, RoundedCornerShape(16.dp), clip = false)
                .background(glassBrush, RoundedCornerShape(16.dp))
                .border(
                    width = 1.dp,
                    brush = Brush.horizontalGradient(
                        colors = listOf(
                            glassColors.border,
                            glassColors.border.copy(alpha = 0.5f)
                        )
                    ),
                    shape = RoundedCornerShape(16.dp)
                )
                .padding(1.dp)
        ) {
            ExposedDropdownMenuBox(
                expanded = expanded,
                onExpandedChange = { expanded = !expanded }
            ) {
                OutlinedTextField(
                    value = value,
                    onValueChange = { onValueChange(it) },
                    label = { Text(label) },
                    placeholder = { Text(placeholder) },
                    leadingIcon = if (leadingIcon != null) {
                        { Icon(leadingIcon, contentDescription = null, tint = glassColors.primary) }
                    } else null,
                    trailingIcon = {
                        ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
                    },
                    isError = errorMessage != null,
                    readOnly = true,
                    modifier = Modifier
                        .fillMaxWidth()
                        .menuAnchor()
                        .background(Color.Transparent),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color.Transparent,
                        unfocusedBorderColor = Color.Transparent,
                        disabledBorderColor = Color.Transparent,
                        focusedLabelColor = glassColors.primary,
                        cursorColor = glassColors.primary,
                        focusedTrailingIconColor = glassColors.primary,
                        unfocusedTrailingIconColor = glassColors.container,
                        focusedLeadingIconColor = glassColors.primary,
                        unfocusedLeadingIconColor = glassColors.container
                    )
                )
                
                ExposedDropdownMenu(
                    expanded = expanded,
                    onDismissRequest = { expanded = false },
                    modifier = Modifier.background(
                        color = glassColors.container.copy(alpha = 0.9f),
                        shape = RoundedCornerShape(12.dp)
                    )
                ) {
                    items.forEach { item ->
                        DropdownMenuItem(
                            text = { Text(item) },
                            onClick = {
                                onValueChange(item)
                                expanded = false
                            }
                        )
                    }
                }
            }
        }
        
        if (errorMessage != null) {
            Text(
                text = errorMessage,
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(start = 16.dp, top = 4.dp)
            )
        }
    }
}

/** 液态玻璃日期输入框 - 支持直接文字输入 */
@Composable
fun GlassDateField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    placeholder: String,
    leadingIcon: androidx.compose.ui.graphics.vector.ImageVector? = null,
    errorMessage: String? = null,
    modifier: Modifier = Modifier
) {
    val isLightTheme = !androidx.compose.foundation.isSystemInDarkTheme()
    val glassColors = getGlassColors(isLightTheme)
    
    // 液态玻璃效果
    val glassBrush = Brush.verticalGradient(
        colors = listOf(
            glassColors.glassTop,
            glassColors.glassBottom
        )
    )
    
    Column(modifier = modifier) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .shadow(8.dp, RoundedCornerShape(16.dp), clip = false)
                .background(glassBrush, RoundedCornerShape(16.dp))
                .border(
                    width = 1.dp,
                    brush = Brush.horizontalGradient(
                        colors = listOf(
                            glassColors.border,
                            glassColors.border.copy(alpha = 0.5f)
                        )
                    ),
                    shape = RoundedCornerShape(16.dp)
                )
                .padding(1.dp)
        ) {
            OutlinedTextField(
                value = value,
                onValueChange = onValueChange,
                label = { Text(label) },
                placeholder = { Text(placeholder) },
                leadingIcon = if (leadingIcon != null) {
                    { Icon(leadingIcon, contentDescription = null, tint = glassColors.primary) }
                } else null,
                trailingIcon = {
                    Icon(
                        Icons.Default.DateRange,
                        contentDescription = null,
                        tint = glassColors.primary
                    )
                },
                isError = errorMessage != null,
                singleLine = true,
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color.Transparent),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = if (errorMessage != null) MaterialTheme.colorScheme.error else glassColors.primary,
                    unfocusedBorderColor = if (errorMessage != null) MaterialTheme.colorScheme.error else glassColors.border,
                    focusedLabelColor = glassColors.primary,
                    unfocusedLabelColor = glassColors.textSecondary,
                    focusedPlaceholderColor = glassColors.textSecondary.copy(alpha = 0.7f),
                    unfocusedPlaceholderColor = glassColors.textSecondary.copy(alpha = 0.5f),
                    cursorColor = glassColors.primary,
                    focusedSupportingTextColor = glassColors.primary,
                    unfocusedSupportingTextColor = glassColors.textSecondary,
                    focusedTrailingIconColor = glassColors.primary,
                    unfocusedTrailingIconColor = glassColors.container,
                    focusedLeadingIconColor = glassColors.primary,
                    unfocusedLeadingIconColor = glassColors.container
                ),
                textStyle = androidx.compose.material3.Typography().bodyLarge.copy(
                    color = glassColors.text
                )
            )
        }
    }
}