package com.chronie.inventorymanager.presentation.ui

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.foundation.*
import androidx.compose.foundation.interaction.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.draw.*
import androidx.compose.ui.geometry.*
import androidx.compose.ui.graphics.*
import androidx.compose.ui.graphics.drawscope.*
import androidx.compose.ui.platform.*
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.*
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.*
import androidx.compose.ui.unit.*
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chronie.inventorymanager.R
import com.chronie.inventorymanager.domain.model.InventoryItem
import com.chronie.inventorymanager.presentation.viewmodel.AddItemViewModel
import com.chronie.inventorymanager.utils.CategoryNameConverter
import java.text.SimpleDateFormat
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException
import java.util.*
import android.widget.Toast
import android.util.Log
import kotlinx.coroutines.launch
import kotlin.math.sin
import kotlin.random.Random

/**
 * 灵动液态玻璃效果的数据类
 */
data class GlassColorScheme(
    val primary: Color,
    val secondary: Color,
    val background: Color,
    val card: Color,
    val border: Color,
    val text: Color,
    val error: Color,
    val success: Color,
    val highlight: Color
)

/**
 * 动画液体效果的数据类
 */
data class FluidAnimationState(
    val offset: Float,
    val height: Float,
    val frequency: Float
)

/**
 * 灵动液态玻璃效果的颜色配置
 */
@Composable
private fun getGlassColorScheme(isLightTheme: Boolean): GlassColorScheme {
    return if (isLightTheme) {
        GlassColorScheme(
            primary = Color(0xFF4A90E2),
            secondary = Color(0xFF50E3C2),
            background = Color(0xFFF8F9FF),
            card = Color(0xFFF0F4FF).copy(alpha = 0.8f),
            border = Color(0xFFD1D9FF).copy(alpha = 0.5f),
            text = Color(0xFF1A237E),
            error = Color(0xFFE57373),
            success = Color(0xFF81C784),
            highlight = Color(0xFF90CAF9)
        )
    } else {
        GlassColorScheme(
            primary = Color(0xFF5BA0FF),
            secondary = Color(0xFF4DD0E1),
            background = Color(0xFF0A102E),
            card = Color(0xFF141B3D).copy(alpha = 0.8f),
            border = Color(0xFF2D3B7D).copy(alpha = 0.5f),
            text = Color(0xFFE8F0FE),
            error = Color(0xFFEF5350),
            success = Color(0xFF66BB6A),
            highlight = Color(0xFF64B5F6)
        )
    }
}

/**
 * 创建灵动液态玻璃效果的渐变背景
 */
@Composable
private fun createFluidGradientBrush(colorScheme: GlassColorScheme): Brush {
    return Brush.linearGradient(
        colors = listOf(
            colorScheme.background,
            colorScheme.primary.copy(alpha = 0.05f),
            colorScheme.secondary.copy(alpha = 0.05f),
            colorScheme.background
        ),
        start = Offset(0f, 0f),
        end = Offset(Float.MAX_VALUE, Float.MAX_VALUE)
    )
}

/**
 * 生成动态液体波纹效果的路径
 */
private fun createFluidWavePath(width: Float, height: Float, offset: Float): Path {
    val path = Path()
    path.moveTo(0f, height / 2)
    
    for (x in 0 until width.toInt() step 5) {
        val y = height / 2 + (sin((x + offset) * 0.02f) * 5f)
        path.lineTo(x.toFloat(), y)
    }
    
    path.lineTo(width, height)
    path.lineTo(0f, height)
    path.close()
    return path
}

/**
 * 主要的添加物品屏幕
 */
@Composable
fun AddItemScreen(
    navigateBack: () -> Unit,
    viewModel: AddItemViewModel = viewModel()
) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()
    
    // 主题和颜色方案
    val isLightTheme = MaterialTheme.colorScheme.background == Color.White
    val colorScheme = getGlassColorScheme(isLightTheme)
    
    // 创建更自然流畅的液体动画效果
    val animationOffset by animateFloatAsState(
        targetValue = 1000f,
        animationSpec = infiniteRepeatable(
            animation = keyframes {
                durationMillis = 10000
                // 平滑的波浪运动，带有速度变化
                0f at 0 with CubicBezierEasing(0.3f, 0.1f, 0.7f, 0.9f)
                250f at 2500 with CubicBezierEasing(0.1f, 0.3f, 0.9f, 0.7f)
                500f at 5000 with CubicBezierEasing(0.3f, 0.1f, 0.7f, 0.9f)
                750f at 7500 with CubicBezierEasing(0.1f, 0.3f, 0.9f, 0.7f)
                1000f at 10000 with CubicBezierEasing(0.3f, 0.1f, 0.7f, 0.9f)
            },
            repeatMode = RepeatMode.Reverse
        )
    )
    
    // 使用更自然的液体效果参数计算
    // 添加两个不同相位的正弦波来模拟更复杂的液体流动
    val phase1 = animationOffset * 0.01f
    val phase2 = animationOffset * 0.008f + 1.57f // 90度相位差
    
    // 组合波浪高度，使其更加自然和不规则
    val waveHeight = 5f + 
                    (kotlin.math.sin(phase1) * 1.5f + 
                     kotlin.math.sin(phase2) * 1f).toFloat()
    
    // 使用更平滑的频率变化
    val frequencyVariation = (kotlin.math.sin(animationOffset * 0.003f) * 0.03f).toFloat()
    val waveFrequency = (0.1f + frequencyVariation).coerceIn(0.07f, 0.13f)
    
    val animationState = FluidAnimationState(offset = animationOffset, height = waveHeight, frequency = waveFrequency)
    
    // 表单状态和验证状态
    val (itemName, setItemName) = remember { mutableStateOf("") }
    val (category, setCategory) = remember { mutableStateOf("") }
    val (quantity, setQuantity) = remember { mutableStateOf("") }
    val (minStock, setMinStock) = remember { mutableStateOf("") }
    val (unit, setUnit) = remember { mutableStateOf("") }
    val (expiryDate, setExpiryDate) = remember { mutableStateOf("") }
    val (description, setDescription) = remember { mutableStateOf("") }
    
    // 验证状态
    val (nameError, setNameError) = remember { mutableStateOf("") }
    val (categoryError, setCategoryError) = remember { mutableStateOf("") }
    val (quantityError, setQuantityError) = remember { mutableStateOf("") }
    val (minStockError, setMinStockError) = remember { mutableStateOf("") }
    val (unitError, setUnitError) = remember { mutableStateOf("") }
    val (expiryDateError, setExpiryDateError) = remember { mutableStateOf("") }
    
    // 表单状态管理
    val formScrollState = rememberScrollState()
    var formSubmitting by remember { mutableStateOf(false) }
    
    // 防抖定时器 - 使用remember直接存储Job对象，而不是mutableStateOf
    var nameDebounceTimer by remember { mutableStateOf<kotlinx.coroutines.Job?>(null) }
    var quantityDebounceTimer by remember { mutableStateOf<kotlinx.coroutines.Job?>(null) }
    var minStockDebounceTimer by remember { mutableStateOf<kotlinx.coroutines.Job?>(null) }
    var unitDebounceTimer by remember { mutableStateOf<kotlinx.coroutines.Job?>(null) }
    var expiryDateDebounceTimer by remember { mutableStateOf<kotlinx.coroutines.Job?>(null) }
    
    // 下拉框状态
    val (expanded, setExpanded) = remember { mutableStateOf(false) }
    val (datePickerVisible, setDatePickerVisible) = remember { mutableStateOf(false) }
    
    // 可用分类列表
    val categories = CategoryNameConverter.getValidCategories()
    
    // 背景渐变
    val backgroundBrush = createFluidGradientBrush(colorScheme)
    
    // 日期格式化
    val dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
    
    // 日期选择处理
    fun handleDateSelected(selectedDate: LocalDate) {
        setExpiryDate(dateFormatter.format(selectedDate))
        setDatePickerVisible(false)
    }
    
    // 实时验证单个字段
    fun validateField(fieldName: String, value: String) {
        when (fieldName) {
            "itemName" -> {
                if (value.isBlank()) {
                     setNameError("Item name cannot be empty")
                  } else if (value.length > 100) {
                     setNameError("Item name cannot exceed 100 characters")
                } else {
                    setNameError("")
                }
            }
            "category" -> {
                if (value.isBlank()) {
                 setCategoryError("Please select a category")
                } else {
                    setCategoryError("")
                }
            }
            "quantity" -> {
                if (value.isBlank()) {
                    setQuantityError("请输入当前数量")
                } else {
                    val quantityValue = value.toIntOrNull()
                    if (quantityValue == null) {
                        setQuantityError("数量必须是整数")
                    } else if (quantityValue < 0) {
                        setQuantityError("数量不能为负数")
                    } else if (quantityValue > 999999) {
                        setQuantityError("数量不能超过999,999")
                    } else {
                        setQuantityError("")
                    }
                }
            }
            "minStock" -> {
                if (value.isBlank()) {
                    setMinStockError("") // 允许空，设为默认值0
                } else {
                    val minStockValue = value.toIntOrNull()
                    if (minStockValue == null) {
                        setMinStockError("最低库存必须是整数")
                    } else if (minStockValue < 0) {
                        setMinStockError("最低库存不能为负数")
                    } else if (minStockValue > 999999) {
                        setMinStockError("最低库存不能超过999,999")
                    } else {
                        setMinStockError("")
                    }
                }
            }
            "unit" -> {
                if (value.isBlank()) {
                    setUnitError("请输入计量单位")
                } else if (value.length > 20) {
                    setUnitError("计量单位不能超过20个字符")
                } else {
                    setUnitError("")
                }
            }
            "expiryDate" -> {
                if (value.isBlank()) {
                    setExpiryDateError("") // 允许空
                } else {
                    try {
                        val date = LocalDate.parse(value)
                        val today = LocalDate.now()
                        if (date.isBefore(today)) {
                            setExpiryDateError("过期日期不能早于今天")
                        } else if (date.isAfter(today.plusYears(10))) {
                            setExpiryDateError("过期日期不能超过10年")
                        } else {
                            setExpiryDateError("")
                        }
                    } catch (e: Exception) {
                        setExpiryDateError("请输入有效的日期格式 (YYYY-MM-DD)")
                    }
                }
            }
        }
    }
    
    // 表单验证函数 - 简化版，只验证必要字段
    fun validateForm(): Boolean {
        var isValid = true
        
        // 名称验证
        if (itemName.isBlank()) {
             setNameError("Item name cannot be empty")
             isValid = false
        } else if (itemName.length > 100) {
             setNameError("Item name cannot exceed 100 characters")
             isValid = false
        } else {
            setNameError("")
        }
        
        // 分类验证
        if (category.isBlank()) {
             setCategoryError("Please select a category")
             isValid = false
        } else {
            setCategoryError("")
        }
        
        // 数量验证 - 改为Int验证，与InventoryItem构造函数一致
        if (quantity.isBlank()) {
            setQuantityError("请输入当前数量")
            isValid = false
        } else {
            val quantityValue = quantity.toIntOrNull()
            if (quantityValue == null) {
                setQuantityError("数量必须是整数")
                isValid = false
            } else if (quantityValue < 0) {
                setQuantityError("数量不能为负数")
                isValid = false
            } else if (quantityValue > 999999) {
                setQuantityError("数量不能超过999,999")
                isValid = false
            } else {
                setQuantityError("")
            }
        }
        
        // 最低库存验证 - 改为Int验证，与InventoryItem构造函数一致
        // 不再强制要求，默认可以为0
        if (minStock.isBlank()) {
            setMinStock("0") // 设为默认值0
            setMinStockError("")
        } else {
            val minStockValue = minStock.toIntOrNull()
            if (minStockValue == null) {
                setMinStockError("最低库存必须是整数")
                isValid = false
            } else if (minStockValue < 0) {
                setMinStockError("最低库存不能为负数")
                isValid = false
            } else if (minStockValue > 999999) {
                setMinStockError("最低库存不能超过999,999")
                isValid = false
            } else {
                setMinStockError("")
            }
        }
        
        // 单位验证
        if (unit.isBlank()) {
            setUnitError("请输入计量单位")
            isValid = false
        } else if (unit.length > 20) {
            setUnitError("计量单位不能超过20个字符")
            isValid = false
        } else {
            setUnitError("")
        }
        
        // 过期日期验证（如果有输入）
        if (expiryDate.isNotBlank()) {
            try {
                val date = LocalDate.parse(expiryDate)
                val today = LocalDate.now()
                if (date.isBefore(today)) {
                    setExpiryDateError("过期日期不能早于今天")
                    isValid = false
                } else if (date.isAfter(today.plusYears(10))) {
                    setExpiryDateError("过期日期不能超过10年")
                    isValid = false
                } else {
                    setExpiryDateError("")
                }
            } catch (e: Exception) {
                setExpiryDateError("请输入有效的日期格式 (YYYY-MM-DD)")
                isValid = false
            }
        } else {
            setExpiryDateError("")
        }
        
        // 如果有错误，滚动到第一个错误字段 - 在协程中调用animateScrollTo
        if (!isValid) {
            coroutineScope.launch {
                // 优先检查必填字段的错误
                formScrollState.animateScrollTo(0) // 滚动到表单顶部
            }
        }
        
        return isValid
    }
    
    // 保存物品函数 - 统一版，优化错误处理和用户体验
    fun saveItem() {
        // 防止重复提交
        if (formSubmitting) return
        
        // 执行表单验证
        if (!validateForm()) return
        
        // 设置提交状态为加载中
        formSubmitting = true
        
        try {
            // 构造物品数据 - 与验证逻辑保持一致
            val inventoryItem = InventoryItem(
                id = UUID.randomUUID().toString(),
                name = itemName.trim(),
                category = category,
                quantity = quantity.toInt(),
                minQuantity = minStock.toInt(),
                unit = unit.trim(),
                expiryDate = if (expiryDate.isNotBlank()) {
                    Date.from(LocalDate.parse(expiryDate).atStartOfDay(ZoneId.systemDefault()).toInstant())
                } else {
                    null
                },
                description = description.trim(),
                createdAt = Date.from(Instant.now()),
                updatedAt = Date.from(Instant.now())
            )
            
            // 添加物品
            viewModel.addItem(inventoryItem)
            
            // 显示成功消息
            Toast.makeText(
                  context,
                  "Item added successfully",
                  Toast.LENGTH_SHORT
            ).show()
            
            // 延迟导航，让用户看到成功消息
            coroutineScope.launch {
                kotlinx.coroutines.delay(500)
                // 重置表单 - 保留分类和单位，提高用户体验
                setItemName("")
                // setCategory("") - 保留上次选择的分类
                setQuantity("")
                setMinStock("")
                // setUnit("") - 保留上次使用的单位
                setExpiryDate("")
                setDescription("")
                
                // 导航回库存管理页面
                navigateBack()
            }
        } catch (e: NumberFormatException) {
            // 数量格式错误 - 应该已经被validateForm捕获，但为了安全保留
            Toast.makeText(
                  context,
                  "Please check if the quantity format is correct",
                  Toast.LENGTH_LONG
            ).show()
        } catch (e: IllegalArgumentException) {
            // 参数有效性错误
            Toast.makeText(
                  context,
                  "Invalid input parameters: ${e.message}",
                  Toast.LENGTH_LONG
            ).show()
        } catch (e: Exception) {
            // 其他未预期错误
            Toast.makeText(
                  context,
                  "Failed to add item: ${e.message}",
                  Toast.LENGTH_LONG
            ).show()
            // 可以添加日志记录
            Log.e("AddItemScreen", "保存物品失败", e)
        } finally {
            // 无论成功失败，都重置提交状态
            formSubmitting = false
        }
    }
    
    // 主布局
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(backgroundBrush)
            .verticalScroll(rememberScrollState())
    ) {
        // 装饰性液体波纹
        Canvas(
            modifier = Modifier
                .fillMaxSize()
                .alpha(0.05f)
        ) {
              val wavePath = createFluidWavePath(
                  size.width,
                  size.height,
                  animationState.offset
              )
            drawPath(
                path = wavePath,
                brush = Brush.linearGradient(
                    colors = listOf(
                        colorScheme.primary,
                        colorScheme.secondary
                    )
                )
            )
        }
        
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            // 返回按钮
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp),
                horizontalArrangement = Arrangement.Start
            ) {
                IconButton(
                    onClick = navigateBack,
                    modifier = Modifier
                        .size(40.dp)
                        .background(
                            color = colorScheme.card,
                            shape = RoundedCornerShape(12.dp)
                        )
                        .border(
                            width = 1.dp,
                            color = colorScheme.border,
                            shape = RoundedCornerShape(12.dp)
                        )
                ) {
                    Icon(
                        imageVector = Icons.Default.ArrowBack,
                        contentDescription = "返回",
                        tint = colorScheme.primary
                    )
                }
            }
            
            // 页面标题
            AnimatedTitle(text = "添加物品", colorScheme = colorScheme)
            
            // 主要内容区域
            Spacer(modifier = Modifier.height(24.dp))
            
            // 表单卡片
            GlassFormCard(
                colorScheme = colorScheme,
                animationState = animationState
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp)
                ) {
                    // 物品名称输入框
                    FluidGlassTextField(
                    value = itemName,
                    onValueChange = { newValue ->
                        setItemName(newValue)
                        // 防抖验证
                        nameDebounceTimer?.cancel()
                        nameDebounceTimer = coroutineScope.launch {
                            kotlinx.coroutines.delay(300)
                            validateField("itemName", newValue)
                        }
                    },
                    label = "Item Name",
                    icon = Icons.Default.Title,
                    error = nameError,
                    colorScheme = colorScheme
                )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    // 物品类别下拉框
                    FluidGlassDropdownField(
                    value = category,
                    onValueChange = { newValue ->
                        setCategory(newValue)
                        // 立即验证分类字段
                        validateField("category", newValue)
                    },
                    label = "Category",
                    icon = Icons.Default.Category,
                    items = categories,
                    expanded = expanded,
                    onExpandedChange = setExpanded,
                    error = categoryError,
                    colorScheme = colorScheme
                )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    // 当前数量输入框
                    FluidGlassTextField(
                    value = quantity,
                    onValueChange = { newValue ->
                        setQuantity(newValue)
                        // 只允许输入数字
                        if (newValue.isEmpty() || newValue.matches(Regex("\\d+"))) {
                            // 防抖验证
                            quantityDebounceTimer?.cancel()
                            quantityDebounceTimer = coroutineScope.launch {
                                kotlinx.coroutines.delay(300)
                                validateField("quantity", newValue)
                            }
                        }
                    },
                    label = "Current Quantity",
                    icon = Icons.Default.Numbers,
                    error = quantityError,
                    keyboardOptions = KeyboardOptions.Default.copy(
                        keyboardType = KeyboardType.Decimal
                    ),
                    colorScheme = colorScheme
                )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    // 最低库存输入框
                    FluidGlassTextField(
                    value = minStock,
                    onValueChange = { newValue ->
                        setMinStock(newValue)
                        // 只允许输入数字
                        if (newValue.isEmpty() || newValue.matches(Regex("\\d+"))) {
                            // 防抖验证
                            minStockDebounceTimer?.cancel()
                            minStockDebounceTimer = coroutineScope.launch {
                                kotlinx.coroutines.delay(300)
                                validateField("minStock", newValue)
                            }
                        }
                    },
                    label = "Minimum Stock",
                    icon = Icons.Default.ShoppingCart,
                    error = minStockError,
                    keyboardOptions = KeyboardOptions.Default.copy(
                        keyboardType = KeyboardType.Decimal
                    ),
                    colorScheme = colorScheme
                )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    // 计量单位输入框
                    FluidGlassTextField(
                    value = unit,
                    onValueChange = { newValue ->
                        setUnit(newValue)
                        // 防抖验证
                        unitDebounceTimer?.cancel()
                        unitDebounceTimer = coroutineScope.launch {
                            kotlinx.coroutines.delay(300)
                            validateField("unit", newValue)
                        }
                    },
                    label = "Unit of Measure",
                    icon = Icons.Default.SettingsSystemDaydream,
                    error = unitError,
                    colorScheme = colorScheme
                )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    // 过期日期选择器
                    FluidGlassDateField(
                    value = expiryDate,
                    onValueChange = { newValue ->
                        setExpiryDate(newValue)
                        // 立即验证日期字段
                        validateField("expiryDate", newValue)
                    },
                    label = "Expiry Date",
                    icon = Icons.Default.CalendarMonth,
                    error = expiryDateError,
                    isVisible = datePickerVisible,
                    onVisibleChange = setDatePickerVisible,
                    onDateSelected = { selectedDate ->
                        setExpiryDate(dateFormatter.format(selectedDate))
                        setDatePickerVisible(false)
                    },
                    colorScheme = colorScheme
                )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    // 物品描述输入框
                    FluidGlassTextField(
                        value = description,
                        onValueChange = setDescription,
                        label = "Description",
                        icon = Icons.Default.Description,
                        maxLines = 3,
                        colorScheme = colorScheme
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(32.dp))
            
            // 保存按钮
            FluidGlassSaveButton(
                    onClick = { saveItem() },
                    colorScheme = colorScheme,
                    animationState = animationState,
                    isLoading = formSubmitting
                )
            
            Spacer(modifier = Modifier.height(48.dp))
        }
    }
}

/**
 * 动画标题组件
 */
@Composable
private fun AnimatedTitle(
    text: String,
    colorScheme: GlassColorScheme
) {
    // 对于一次性动画，使用简单的animateFloatAsState
    // 使用remember来存储一个标志，表示动画是否开始
    val hasAnimated = remember {
        mutableStateOf(false)
    }
    
    // 当组件首次组合时启动动画
    LaunchedEffect(Unit) {
        hasAnimated.value = true
    }
    
    // 根据hasAnimated的值来决定目标值
    val animatedOffset by animateFloatAsState(
        targetValue = if (hasAnimated.value) 0f else 20f,
        animationSpec = tween(
            durationMillis = 800,
            easing = EaseOutCubic
        )
    )
    
    // 获取像素密度用于单位转换
    val density = LocalDensity.current
    
    Text(
         text = text,
        style = TextStyle(
            fontSize = 32.sp,
            fontWeight = FontWeight.Bold,
            color = colorScheme.text
        ),
        modifier = Modifier
            .offset(y = density.run { animatedOffset.toDp() })
            .alpha(1f - (animatedOffset * 0.05f).coerceIn(0f, 1f))
    )
}

/**
 * 玻璃表单卡片组件
 */
@Composable
private fun GlassFormCard(
    colorScheme: GlassColorScheme,
    animationState: FluidAnimationState,
    content: @Composable () -> Unit
) {
    val animatedCornerRadius by animateFloatAsState(
        targetValue = 24f + sin(animationState.offset * 0.005f) * 2f,
        animationSpec = tween(300, easing = EaseInOutCubic)
    )
    
    Box(modifier = Modifier.fillMaxWidth()) {
        // 卡片阴影效果
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(300.dp)
                .padding(8.dp)
                .background(
                    color = colorScheme.primary.copy(alpha = 0.1f),
                    shape = RoundedCornerShape(animatedCornerRadius)
                )
                .blur(16.dp)
        )
        
        // 主要卡片内容
        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(animatedCornerRadius))
                .border(
                    width = 1.dp,
                    color = colorScheme.border,
                    shape = RoundedCornerShape(animatedCornerRadius)
                ),
            color = colorScheme.card,
            contentColor = colorScheme.text
        ) {
            content()
        }
        
        // 动态光效
        Canvas(
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp)
                .align(Alignment.TopStart)
                .clip(RoundedCornerShape(animatedCornerRadius))
        ) {
            val shimmerBrush = Brush.linearGradient(
                colors = listOf(
                    Color.Transparent,
                    colorScheme.primary.copy(alpha = 0.2f),
                    Color.Transparent
                ),
                start = Offset(-size.width, 0f),
                end = Offset(size.width, 0f)
            )
            
            // 计算闪烁偏移位置
            val shimmerOffset = animationState.offset % (size.width * 2) - size.width
            
            // 使用rotate和translate转换坐标系
            withTransform({
                rotate(-15f)
                translate(shimmerOffset, 0f)
            }) {
                drawRect(
                    brush = shimmerBrush,
                    alpha = 0.5f,
                    size = size
                )
            }
        }
    }
}

/**
 * 灵动液态玻璃风格的文本输入框
 */
@Composable
private fun FluidGlassTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    icon: ImageVector,
    error: String = "",
    maxLines: Int = 1,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    colorScheme: GlassColorScheme
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isFocused by interactionSource.collectIsFocusedAsState()
    
    val animatedCornerRadius by animateFloatAsState(
        targetValue = if (isFocused) 20f else 16f,
        animationSpec = tween(300, easing = EaseInOutCubic)
    )
    
    val borderColor by animateColorAsState(
        targetValue = if (error.isNotEmpty()) {
            colorScheme.error
        } else if (isFocused) {
            colorScheme.primary
        } else {
            colorScheme.border
        },
        animationSpec = tween(300, easing = EaseInOutCubic)
    )
    
    Column {
        TextField(
            value = value,
            onValueChange = onValueChange,
            label = {
                Text(
                    text = label,
                    style = TextStyle(
                        color = if (error.isNotEmpty()) colorScheme.error else colorScheme.text
                    )
                )
            },
            leadingIcon = {
                Icon(
                    imageVector = icon,
                    contentDescription = label,
                    tint = if (error.isNotEmpty()) colorScheme.error else colorScheme.primary
                )
            },
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    color = colorScheme.card,
                    shape = RoundedCornerShape(animatedCornerRadius)
                )
                .border(
                    width = 1.5.dp,
                    color = borderColor,
                    shape = RoundedCornerShape(animatedCornerRadius)
                ),
            shape = RoundedCornerShape(animatedCornerRadius),
            colors = TextFieldDefaults.colors(
                focusedContainerColor = colorScheme.card,
                unfocusedContainerColor = colorScheme.card,
                focusedIndicatorColor = Color.Transparent,
                unfocusedIndicatorColor = Color.Transparent,
                disabledIndicatorColor = Color.Transparent,
                errorIndicatorColor = Color.Transparent,
                focusedTextColor = colorScheme.text,
                unfocusedTextColor = colorScheme.text.copy(alpha = 0.8f)
            ),
            interactionSource = interactionSource,
            maxLines = maxLines,
            keyboardOptions = keyboardOptions,
            isError = error.isNotEmpty()
        )
        
        if (error.isNotEmpty()) {
            Text(
                text = error,
                style = TextStyle(
                    fontSize = 12.sp,
                    color = colorScheme.error
                ),
                modifier = Modifier.padding(top = 4.dp, start = 8.dp)
            )
        }
    }
}

/**
 * 灵动液态玻璃风格的下拉框组件
 */
@Composable
private fun FluidGlassDropdownField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    icon: ImageVector,
    items: List<String>,
    expanded: Boolean,
    onExpandedChange: (Boolean) -> Unit,
    error: String = "",
    colorScheme: GlassColorScheme
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isFocused by interactionSource.collectIsFocusedAsState()
    
    val animatedCornerRadius by animateFloatAsState(
        targetValue = if (isFocused || expanded) 20f else 16f,
        animationSpec = tween(300, easing = EaseInOutCubic)
    )
    
    val borderColor by animateColorAsState(
        targetValue = if (error.isNotEmpty()) {
            colorScheme.error
        } else if (isFocused || expanded) {
            colorScheme.primary
        } else {
            colorScheme.border
        },
        animationSpec = tween(300, easing = EaseInOutCubic)
    )
    
    Column {
        ExposedDropdownMenuBox(
            expanded = expanded,
            onExpandedChange = onExpandedChange,
            modifier = Modifier.fillMaxWidth()
        ) {
            TextField(
                value = value,
                onValueChange = { /* 下拉框不可直接输入 */ },
                label = {
                    Text(
                        text = label,
                        style = TextStyle(
                            color = if (error.isNotEmpty()) colorScheme.error else colorScheme.text
                        )
                    )
                },
                leadingIcon = {
                    Icon(
                        imageVector = icon,
                        contentDescription = label,
                        tint = if (error.isNotEmpty()) colorScheme.error else colorScheme.primary
                    )
                },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
                modifier = Modifier
                    .fillMaxWidth()
                    .menuAnchor()
                    .background(
                        color = colorScheme.card,
                        shape = RoundedCornerShape(animatedCornerRadius)
                    )
                    .border(
                        width = 1.5.dp,
                        color = borderColor,
                        shape = RoundedCornerShape(animatedCornerRadius)
                    ),
                shape = RoundedCornerShape(animatedCornerRadius),
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = colorScheme.card,
                    unfocusedContainerColor = colorScheme.card,
                    focusedIndicatorColor = Color.Transparent,
                    unfocusedIndicatorColor = Color.Transparent,
                    disabledIndicatorColor = Color.Transparent,
                    errorIndicatorColor = Color.Transparent,
                    focusedTextColor = colorScheme.text,
                    unfocusedTextColor = colorScheme.text.copy(alpha = 0.8f)
                ),
                interactionSource = interactionSource,
                readOnly = true,
                isError = error.isNotEmpty()
            )
            
            ExposedDropdownMenu(
                expanded = expanded,
                onDismissRequest = { onExpandedChange(false) },
                modifier = Modifier
                    .background(colorScheme.card)
                    .border(
                        width = 1.dp,
                        color = colorScheme.border,
                        shape = RoundedCornerShape(16.dp)
                    )
                    .width(IntrinsicSize.Max)
            ) {
                items.forEachIndexed { index, selectionOption ->
                    DropdownMenuItem(
                        text = { Text(text = selectionOption, color = colorScheme.text) },
                        onClick = {
                            onValueChange(selectionOption)
                            onExpandedChange(false)
                        },
                        modifier = Modifier
                            .background(
                                color = if (value == selectionOption) {
                                    colorScheme.highlight.copy(alpha = 0.3f)
                                } else {
                                    Color.Transparent
                                }
                            )
                    )
                }
            }
        }
        
        if (error.isNotEmpty()) {
            Text(
                text = error,
                style = TextStyle(
                    fontSize = 12.sp,
                    color = colorScheme.error
                ),
                modifier = Modifier.padding(top = 4.dp, start = 8.dp)
            )
        }
    }
}

/**
 * 灵动液态玻璃风格的日期选择字段组件
 */
@Composable
private fun FluidGlassDateField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    icon: ImageVector,
    error: String = "",
    isVisible: Boolean,
    onVisibleChange: (Boolean) -> Unit,
    onDateSelected: (LocalDate) -> Unit,
    colorScheme: GlassColorScheme
) {
    // 最简单的日期选择对话框
    if (isVisible) {
        Dialog(onDismissRequest = { onVisibleChange(false) }) {
            Column(
                modifier = Modifier
                    .background(Color.White)
                    .padding(16.dp)
            ) {
                Text("Select Date")
                
                val today = LocalDate.now()
                val dateStr = today.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
                
                Row {
                    Button(onClick = { onVisibleChange(false) }) {
                        Text("Cancel")
                    }
                    
                    Button(onClick = { 
                        onValueChange(dateStr)
                        onDateSelected(today)
                        onVisibleChange(false)
                    }) {
                        Text("OK")
                    }
                }
            }
        }
    }
    
    // 最简单的日期输入框，使用正确的Material3参数
    TextField(
        value = value,
        onValueChange = {},
        label = { Text(label) },
        readOnly = true,
        modifier = Modifier.clickable { onVisibleChange(true) }
    )
}

// 简单的保存按钮组件
@Composable
private fun FluidGlassSaveButton(
    onClick: () -> Unit,
    colorScheme: GlassColorScheme,
    animationState: FluidAnimationState,
    isLoading: Boolean = false
) {
    Button(
        onClick = onClick,
        enabled = !isLoading,
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(
            text = if (isLoading) "Saving..." else "Save"
        )
    }
}

// DatePicker相关的类已被移除，使用Material3的Dialog组件实现