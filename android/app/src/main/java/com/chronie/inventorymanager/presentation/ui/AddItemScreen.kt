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
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.onClick
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.selected
import androidx.compose.material3.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.DatePicker
import androidx.compose.material3.DatePickerDialog
import androidx.compose.material3.DatePickerDefaults
import androidx.compose.material3.rememberDatePickerState
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chronie.inventorymanager.R
import com.chronie.inventorymanager.domain.model.InventoryItem
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
// 移除未使用的导入
import androidx.compose.runtime.LaunchedEffect
import com.chronie.inventorymanager.presentation.viewmodel.AddItemViewModel
import com.chronie.inventorymanager.utils.CategoryNameConverter
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale
import android.widget.Toast
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
    // 使用CompositionLocal来获取当前主题状态
    val currentTheme = MaterialTheme.colorScheme
    val isLightTheme = !androidx.compose.foundation.isSystemInDarkTheme()
    // 使用基本颜色值
    
    // 响应式主题监听器
    DisposableEffect(isLightTheme) {
        // 当主题变化时可以在这里执行一些清理或初始化操作
        onDispose {
            // 清理资源（如果需要）
        }
    }
    
    val context = LocalContext.current
    
    // 表单状态
    var name by remember { mutableStateOf("") }
    var category by remember { mutableStateOf("") }
    var categoryDisplayName by remember { mutableStateOf("") } // 用于显示的中文名称
    var quantity by remember { mutableStateOf("") }
    var minStock by remember { mutableStateOf("") }
    var quantityValue by remember { mutableStateOf("0") }
    var minStockValue by remember { mutableStateOf("0") }
    var unit by remember { mutableStateOf("") }
    var expiryDate by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    
    // 表单验证状态
    var nameError by remember { mutableStateOf<String?>(null) }
    var categoryError by remember { mutableStateOf<String?>(null) }
    var quantityError by remember { mutableStateOf<String?>(null) }
    var minStockError by remember { mutableStateOf<String?>(null) }
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
            // 显示成功Toast消息，包含物品名称
            val successMessage = "${name.trim()} 添加成功！"
            Toast.makeText(context, successMessage, Toast.LENGTH_LONG).show()
            
            // 重置表单
            viewModel.resetForm()
            
            // 清除成功状态
            viewModel.clearSuccess()
            
            // 延迟导航返回，给用户时间看到成功提示
            kotlinx.coroutines.delay(1500)
            onNavigateBack()
        }
    }

    // 黑白主题主背景效果
    val backgroundBrush = Brush.verticalGradient(
        colors = when {
            isLightTheme -> listOf(
                Color.White,
                Color(0xFFF5F5F5),
                Color.White
            )
            else -> listOf(
                Color.Black,
                Color(0xFF1A1A1A),
                Color.Black
            )
        }
    )
    
    // 表单容器液态玻璃效果 - 使用更适合主题的渐变
    val containerBrush = Brush.verticalGradient(
        colors = listOf(
            if (isLightTheme) Color(0xFFF5F5F5) else Color(0xFF2A2A2A),
            if (isLightTheme) Color(0xFFE8E8E8) else Color(0xFF333333)
        ),
        startY = 0f,
        endY = 300f
    )
    
    // 使用Column替代Scaffold避免标题栏占位
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(backgroundBrush)
            .padding(start = 16.dp, top = 16.dp, end = 16.dp) // 只设置水平和顶部padding，移除底部padding
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
                // 移除了标题区域
                
                // 添加更多错误处理的Toast提示
                // 物品名称
                GlassTextField(
                    value = name,
                    onValueChange = { 
                        name = it
                        // 实时清除错误状态
                        nameError = null
                    },
                    label = stringResource(R.string.add_name),
                    placeholder = "",
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
                        // 实时清除错误状态
                        categoryError = null
                    },
                    label = stringResource(R.string.add_category),
                    placeholder = "",
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
                            // 实时清除错误状态
                            quantityError = null
                        }
                    },
                    label = stringResource(R.string.add_quantity),
                    placeholder = "",
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
                            // 实时清除错误状态
                            minStockError = null
                        }
                    },
                    label = stringResource(R.string.add_minquantity),
                    placeholder = "",
                    leadingIcon = Icons.Default.ShoppingCart,
                    errorMessage = minStockError,
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
                    placeholder = "",
                    leadingIcon = Icons.Default.FormatColorFill,
                    keyboardOptions = KeyboardOptions(
                        imeAction = ImeAction.Next
                    )
                )
                
                // 到期日期 - 支持直接文字输入
                GlassDateField(
                    label = stringResource(R.string.add_expirydate),
                    value = expiryDate,
                    onValueChange = { 
                        expiryDate = it
                        // 实时清除错误状态
                        dateError = null
                    },
                    isError = dateError != null,
                    errorMessage = dateError.orEmpty(),
                    modifier = Modifier.fillMaxWidth()
                )
                
                // 描述
                GlassTextField(
                    value = description,
                    onValueChange = { description = it },
                    label = stringResource(R.string.add_description),
                    placeholder = "",
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
        
        // 自定义错误消息
        val nameTooShortError = "名称至少需要2个字符"
        val invalidQuantityError = "请输入有效的数量"
        val negativeQuantityError = "数量不能为负数"
        val invalidMinStockError = "请输入有效的最小库存数量"
        val negativeMinStockError = "最小库存不能为负数"
        val invalidDateFormatError = "日期格式无效，请使用 YYYY-MM-DD、YYYY/MM/DD 等常见格式"
        val pastDateError = "到期日期不能早于今天"
        
        GlassSaveButton(
            onClick = {
                // 清除所有错误状态
                    nameError = null
                    categoryError = null
                    quantityError = null
                    minStockError = null
                    dateError = null
                    
                    // 表单验证
                    var hasError = false
                    
                    // 名称验证
                    if (name.isBlank()) {
                        nameError = nameRequired
                        hasError = true
                    } else if (name.trim().length < 2) {
                        nameError = nameTooShortError
                        hasError = true
                    }
                    
                    // 分类验证
                    if (category.isBlank() || categoryDisplayName.isBlank()) {
                        categoryError = categoryRequired
                        hasError = true
                    }
                    
                    // 数量验证
                    if (quantity.isBlank()) {
                        quantityError = quantityRequired
                        hasError = true
                    } else {
                        val quantityValue = quantity.trim().toIntOrNull()
                        if (quantityValue == null) {
                            quantityError = invalidQuantityError
                            hasError = true
                        } else if (quantityValue < 0) {
                            quantityError = negativeQuantityError
                            hasError = true
                        }
                    }
                    
                    // 最小库存验证（如果填写了的话）
                    if (minStock.isNotBlank()) {
                        val minStockValue = minStock.trim().toIntOrNull()
                        if (minStockValue == null) {
                            minStockError = invalidMinStockError
                            hasError = true
                        } else if (minStockValue < 0) {
                            minStockError = negativeMinStockError
                            hasError = true
                        }
                    }
                    
                    // 日期验证（如果填写了的话）
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
                                dateError = invalidDateFormatError
                                hasError = true
                            } else {
                                // 检查日期是否早于今天
                                val today = Calendar.getInstance().apply {
                                    set(Calendar.HOUR_OF_DAY, 0)
                                    set(Calendar.MINUTE, 0)
                                    set(Calendar.SECOND, 0)
                                    set(Calendar.MILLISECOND, 0)
                                }.time
                                
                                if (parsedDate.before(today)) {
                                    dateError = pastDateError
                                    hasError = true
                                }
                            }
                        } catch (e: Exception) {
                        dateError = invalidDateFormatError
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
                            quantity = quantityValue?.toIntOrNull() ?: 0,
                            unit = unit.trim(),
                            description = description.trim(),
                            expiryDate = parsedDate,
                            minQuantity = minStockValue?.toIntOrNull() ?: 0,
                            createdAt = Date(),
                            updatedAt = Date()
                        )
                        
                        // 保存到数据库，通过ViewModel处理成功状态
                        viewModel.addItem(inventoryItem)
                        
                        // 不再直接导航返回，而是通过成功状态处理
                        
                    } catch (e: Exception) {
                        // 数据库操作或其他错误，提供更友好的错误信息
                        val errorMessage = if (e.message.isNullOrEmpty()) {
                            "保存失败，请稍后重试"
                        } else {
                            "保存失败：${e.message}"
                        }
                        Toast.makeText(context, errorMessage, Toast.LENGTH_LONG).show()
                    }
                }
            },
            text = saveText,
            modifier = Modifier.fillMaxWidth()
        )
    }
    
    // Toast会自动显示在屏幕上，无需额外的UI组件
    // Toast通知已优化，包含详细的成功信息和友好的错误提示
    
}

/** 液态玻璃标题区域 */
@Composable
fun GlassTitleSection(
    title: String,
    subtitle: String,
    modifier: Modifier = Modifier
) {
    val isLightTheme = !androidx.compose.foundation.isSystemInDarkTheme()
    // 使用基本颜色值
    val textSecondaryColor = if (isLightTheme) Color.Gray else Color.LightGray
    
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
                color = if (isLightTheme) Color.Black else Color.White
            )
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = subtitle,
            style = androidx.compose.material3.Typography().bodyMedium.copy(
                color = textSecondaryColor
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
    // 使用基本颜色值
    
    val containerBrush = Brush.verticalGradient(
          colors = listOf(
              if (isLightTheme) Color(0xFFF5F5F5) else Color(0xFF2A2A2A),
              if (isLightTheme) Color(0xFFE8E8E8) else Color(0xFF333333)
          ),
          startY = 0f,
          endY = 300f // 增加渐变范围使效果更明显
    )
    
    // 黑白主题的阴影效果
    val shadowColor = if (isLightTheme) {
        Color.Black.copy(alpha = 0.1f)
    } else {
        Color.White.copy(alpha = 0.1f)
    }
    
    Box(
        modifier = modifier
            .fillMaxWidth()
            .shadow(
                elevation = 12.dp,
                spotColor = shadowColor,
                ambientColor = shadowColor.copy(alpha = 0.7f)
            )
            .background(containerBrush, RoundedCornerShape(20.dp))
            .border(
                    width = 1.dp,
                    brush = Brush.horizontalGradient(
                        colors = listOf(
                            if (isLightTheme) Color.Gray.copy(alpha = 0.4f) else Color.White.copy(alpha = 0.2f),
                            if (isLightTheme) Color.Gray.copy(alpha = 0.2f) else Color.White.copy(alpha = 0.1f),
                            if (isLightTheme) Color.Gray.copy(alpha = 0.4f) else Color.White.copy(alpha = 0.2f)
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
    // 使用基本颜色值
    
    val buttonBrush = Brush.verticalGradient(
        colors = listOf(
            if (isLightTheme) Color.Black else Color.White,
            if (isLightTheme) Color.Gray else Color.Gray
        )
    )
    
    Button(
        onClick = onClick,
        modifier = modifier
            .height(56.dp),
        shape = RoundedCornerShape(16.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = Color.Transparent,
            contentColor = Color.White
        )
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
                    fontSize = 16.sp,
                    color = if (isLightTheme) Color.White else Color.Black
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
    // 直接使用基本颜色值而非getGlassColors
    val glassTopColor = if (isLightTheme) Color(0xFFF0F0F0) else Color(0xFF2A2A2A)
    val glassBottomColor = if (isLightTheme) Color(0xFFE0E0E0) else Color(0xFF333333)
    
    // 液态玻璃效果 - 根据主题调整透明度
    val glassBrush = Brush.verticalGradient(
        colors = listOf(
            glassTopColor.copy(alpha = if (isLightTheme) 0.85f else 0.75f),
            glassBottomColor.copy(alpha = if (isLightTheme) 0.9f else 0.8f)
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
                    color = if (isLightTheme) Color.Gray.copy(alpha = 0.3f) else Color.White.copy(alpha = 0.1f),
                    shape = RoundedCornerShape(16.dp)
                )
                .padding(1.dp)
        ) {
            OutlinedTextField(
                    value = value,
                    onValueChange = onValueChange,
                    label = { Text(label, color = if (isLightTheme) Color.Black else Color.White) },
                    placeholder = { Text(placeholder, color = if (isLightTheme) Color.Gray else Color.Gray.copy(alpha = 0.7f)) },
                    leadingIcon = if (leadingIcon != null) {
                        { Icon(leadingIcon, contentDescription = null, tint = if (isLightTheme) Color.Black else Color.White) }
                    } else null,
                    isError = errorMessage != null,
                    singleLine = singleLine,
                    keyboardOptions = keyboardOptions,
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.Transparent),
                    textStyle = TextStyle(color = if (isLightTheme) Color.Black else Color.White),
                    colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = if (errorMessage != null) MaterialTheme.colorScheme.error else Color.Transparent,
                    unfocusedBorderColor = if (errorMessage != null) MaterialTheme.colorScheme.error else Color.Transparent,
                    disabledBorderColor = Color.Transparent,
                    focusedLabelColor = if (errorMessage != null) MaterialTheme.colorScheme.error else if (isLightTheme) Color.Black else Color.White,
                    unfocusedLabelColor = if (errorMessage != null) MaterialTheme.colorScheme.error else if (isLightTheme) Color.Gray else Color.Gray.copy(alpha = 0.7f)
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
    // 直接使用基本颜色值而非getGlassColors
    val glassTopColor = if (isLightTheme) Color(0xFFF0F0F0) else Color(0xFF2A2A2A)
    val glassBottomColor = if (isLightTheme) Color(0xFFE0E0E0) else Color(0xFF333333)
    
    // 液态玻璃效果 - 根据主题调整透明度
    val glassBrush = Brush.verticalGradient(
        colors = listOf(
            glassTopColor.copy(alpha = if (isLightTheme) 0.85f else 0.75f),
            glassBottomColor.copy(alpha = if (isLightTheme) 0.9f else 0.8f)
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
                    color = if (isLightTheme) Color.Gray.copy(alpha = 0.3f) else Color.White.copy(alpha = 0.1f),
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
                    label = { Text(label, color = if (isLightTheme) Color.Black else Color.White) },
                    placeholder = { Text(placeholder, color = if (isLightTheme) Color.Gray else Color.Gray.copy(alpha = 0.7f)) },
                    leadingIcon = if (leadingIcon != null) {
                        { Icon(leadingIcon, contentDescription = null, tint = if (isLightTheme) Color.Black else Color.White) }
                    } else null,
                    trailingIcon = {
                        ExposedDropdownMenuDefaults.TrailingIcon(
                            expanded = expanded
                        )
                    },
                    isError = errorMessage != null,
                    readOnly = true,
                    modifier = Modifier
                        .fillMaxWidth()
                        .menuAnchor()
                        .background(Color.Transparent),
                    textStyle = TextStyle(color = if (isLightTheme) Color.Black else Color.White),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color.Transparent,
                        unfocusedBorderColor = Color.Transparent,
                        disabledBorderColor = Color.Transparent,
                        focusedLabelColor = if (isLightTheme) Color.Black else Color.White,
                        unfocusedLabelColor = if (isLightTheme) Color.Gray else Color.Gray.copy(alpha = 0.7f),
                        cursorColor = if (isLightTheme) Color.Black else Color.White,
                        focusedTrailingIconColor = if (isLightTheme) Color.Black else Color.White,
                        unfocusedTrailingIconColor = if (isLightTheme) Color.Gray else Color.Gray.copy(alpha = 0.5f),
                        focusedLeadingIconColor = if (isLightTheme) Color.Black else Color.White,
                        unfocusedLeadingIconColor = if (isLightTheme) Color.Gray else Color.Gray.copy(alpha = 0.5f)
                    )
                )
                
                ExposedDropdownMenu(
                    expanded = expanded,
                    onDismissRequest = { expanded = false },
                    modifier = Modifier
                        .background(
                            color = glassTopColor.copy(alpha = 0.95f),
                            shape = RoundedCornerShape(12.dp)
                        )
                        .border(
                            width = 1.dp,
                            color = if (isLightTheme) Color.Gray.copy(alpha = 0.3f) else Color.White.copy(alpha = 0.1f),
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

/** 液态玻璃风格日期输入组件 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GlassDateField(
    label: String,
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    isError: Boolean = false,
    errorMessage: String = ""
) {
    val showDatePicker = remember {
        mutableStateOf(false)
    }
    
    // 基础颜色配置
    val textColor = if (isError) Color.Red else Color.Black
    
    Column(modifier = modifier) {
        // 可点击的日期输入组件
        Box(modifier = Modifier
            .fillMaxWidth()
            .height(56.dp)
            .border(1.dp, textColor, RoundedCornerShape(12.dp))
            .clickable {
                showDatePicker.value = true
            }
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = if (value.isNotEmpty()) value else label,
                    color = textColor
                )
                Icon(
                    imageVector = Icons.Default.CalendarToday,
                    contentDescription = "Calendar",
                    tint = textColor
                )
            }
        }
        
        // 错误信息
        if (isError && errorMessage.isNotEmpty()) {
            Text(
                text = errorMessage,
                color = Color.Red,
                fontSize = 12.sp,
                modifier = Modifier.padding(start = 16.dp, top = 4.dp)
            )
        }
    }
    
    // 日期选择对话框
    if (showDatePicker.value) {
        val datePickerState = rememberDatePickerState()
        
        DatePickerDialog(
            onDismissRequest = { showDatePicker.value = false },
            confirmButton = {
                TextButton(onClick = {
                    datePickerState.selectedDateMillis?.let {
                        val date = Instant.ofEpochMilli(it)
                            .atZone(ZoneOffset.UTC)
                            .toLocalDate()
                        val formattedDate = date.format(DateTimeFormatter.ISO_LOCAL_DATE)
                        onValueChange(formattedDate)
                    }
                    showDatePicker.value = false
                }) {
                    Text("确定")
                }
            },
            dismissButton = {
                TextButton(onClick = {
                    showDatePicker.value = false
                }) {
                    Text("取消")
                }
            }
        ) {
            DatePicker(state = datePickerState)
        }
    }
}