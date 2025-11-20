package com.chronie.inventorymanager.presentation.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.CalendarToday
import androidx.compose.material.icons.filled.Category
import androidx.compose.material.icons.filled.Description
import androidx.compose.material.icons.filled.FormatColorFill
import androidx.compose.material.icons.filled.LocalOffer
import androidx.compose.material.icons.filled.Numbers
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.Title
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
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
import com.chronie.inventorymanager.ui.theme.getGlassColors
import java.text.SimpleDateFormat
import java.util.*

/** 添加物品页面 */
@Composable
fun AddItemScreen(
    onNavigateBack: () -> Unit = {},
    viewModel: AddItemViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    val context = LocalContext.current
    val isLightTheme = true // 临时修复
    val glassColors = getGlassColors(isLightTheme)
    
    // 表单状态
    var name by remember { mutableStateOf("") }
    var category by remember { mutableStateOf("") }
    var quantity by remember { mutableStateOf("") }
    var minStock by remember { mutableStateOf("") }
    var unit by remember { mutableStateOf("") }
    var price by remember { mutableStateOf("") }
    var expiryDate by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    
    // 表单验证状态
    var nameError by remember { mutableStateOf<String?>(null) }
    var categoryError by remember { mutableStateOf<String?>(null) }
    var quantityError by remember { mutableStateOf<String?>(null) }
    
    val predefinedCategories = uiState.categories
    
    LaunchedEffect(uiState.categories) {
        if (uiState.categories.isNotEmpty()) {
            category = uiState.categories.first()
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // 返回按钮
        IconButton(
            onClick = onNavigateBack,
            modifier = Modifier.align(Alignment.TopStart)
        ) {
            Icon(
                imageVector = Icons.Default.ArrowBack,
                contentDescription = "Back"
            )
        }
        
        // 表单内容
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 56.dp, bottom = 80.dp)
                .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // 标题
            Text(
                text = "Add Item",
                style = MaterialTheme.typography.headlineSmall.copy(
                    fontWeight = FontWeight.Bold,
                    fontSize = 24.sp
                ),
                modifier = Modifier.padding(vertical = 16.dp)
            )
            
            // 物品名称
            GlassTextField(
                value = name,
                onValueChange = { 
                    name = it
                    nameError = null
                },
                label = "Item Name",
                placeholder = "Enter item name",
                leadingIcon = Icons.Default.Title,
                error = nameError,
                keyboardOptions = KeyboardOptions(
                    imeAction = ImeAction.Next
                )
            )
            
            // 分类选择
            GlassDropdownField(
                value = category,
                onValueChange = { 
                    category = it
                    categoryError = null
                },
                label = "Category",
                placeholder = "Select category",
                items = predefinedCategories,
                leadingIcon = Icons.Default.Category,
                error = categoryError
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
                label = "Quantity",
                placeholder = "Enter quantity",
                leadingIcon = Icons.Default.Numbers,
                error = quantityError,
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
                label = "Min Quantity",
                placeholder = "Enter min quantity",
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
                label = "Unit",
                placeholder = "Enter unit",
                leadingIcon = Icons.Default.FormatColorFill,
                keyboardOptions = KeyboardOptions(
                    imeAction = ImeAction.Next
                )
            )
            
            // 价格
            GlassTextField(
                value = price,
                onValueChange = { 
                    if (it.isEmpty() || it.matches(Regex("^\\d*\\.?\\d*$"))) {
                        price = it
                    }
                },
                label = "Price",
                placeholder = "Enter price",
                leadingIcon = Icons.Default.LocalOffer,
                keyboardOptions = KeyboardOptions(
                    keyboardType = KeyboardType.Decimal,
                    imeAction = ImeAction.Next
                )
            )
            
            // 到期日期
            GlassDateField(
                value = expiryDate,
                onValueChange = { expiryDate = it },
                label = "Expiry Date",
                placeholder = "Select expiry date",
                leadingIcon = Icons.Default.CalendarToday
            )
            
            // 描述
            GlassTextField(
                value = description,
                onValueChange = { description = it },
                label = "Description",
                placeholder = "Enter description",
                leadingIcon = Icons.Default.Description,
                singleLine = false,
                keyboardOptions = KeyboardOptions(
                    imeAction = ImeAction.Done
                )
            )
        }
        
        // 保存按钮
        Button(
            onClick = {
                // 表单验证
                var hasError = false
                
                if (name.isBlank()) {
                    nameError = "Name is required"
                    hasError = true
                }
                
                if (category.isBlank()) {
                    categoryError = "Category is required"
                    hasError = true
                }
                
                if (quantity.isBlank() || quantity.toIntOrNull() == null) {
                    quantityError = "Valid quantity is required"
                    hasError = true
                }
                
                if (!hasError) {
                    val item = InventoryItem(
                        id = "", // 将由服务器生成
                        name = name.trim(),
                        category = category.trim(),
                        quantity = quantity.toInt(),
                        unit = unit.trim().ifBlank { "pieces" },
                        minQuantity = minStock.toIntOrNull() ?: 0,
                        price = price.toDoubleOrNull() ?: 0.0,
                        expiryDate = if (expiryDate.isNotBlank()) {
                            SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).parse(expiryDate)
                        } else null,
                        description = description.trim(),
                        updatedAt = Date(),
                        createdAt = Date()
                    )
                    
                    viewModel.addItem(item)
                    onNavigateBack()
                }
            },
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            enabled = !uiState.isLoading
        ) {
            if (uiState.isLoading) {
                CircularProgressIndicator(
                    color = MaterialTheme.colorScheme.onPrimary,
                    modifier = Modifier.size(16.dp)
                )
            } else {
                Text("Save")
            }
        }
    }
}

/** 液态玻璃文本输入框 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GlassTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    placeholder: String,
    leadingIcon: androidx.compose.ui.graphics.vector.ImageVector? = null,
    error: String? = null,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    singleLine: Boolean = true,
    modifier: Modifier = Modifier
) {
    val isLightTheme = true // 临时修复isSystemInDarkTheme问题
    val glassColors = getGlassColors(isLightTheme)
    
    Column(modifier = modifier) {
        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            label = { Text(label) },
            placeholder = { Text(placeholder) },
            leadingIcon = if (leadingIcon != null) {
                { Icon(leadingIcon, contentDescription = null) }
            } else null,
            isError = error != null,
            singleLine = singleLine,
            keyboardOptions = keyboardOptions,
            modifier = Modifier.fillMaxWidth(),
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = glassColors.primary,
                unfocusedBorderColor = glassColors.container,
                focusedLabelColor = glassColors.primary,
                cursorColor = glassColors.primary
            )
        )
        
        if (error != null) {
            Text(
                text = error,
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(start = 16.dp, top = 4.dp)
            )
        }
    }
}

/** 液态玻璃下拉选择框 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GlassDropdownField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    placeholder: String,
    items: List<String>,
    leadingIcon: androidx.compose.ui.graphics.vector.ImageVector? = null,
    error: String? = null,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }
    val glassColors = getGlassColors(true)
    
    Column(modifier = modifier) {
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
                    { Icon(leadingIcon, contentDescription = null) }
                } else null,
                trailingIcon = {
                    ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
                },
                isError = error != null,
                readOnly = true,
                modifier = Modifier
                    .fillMaxWidth()
                    .menuAnchor(),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = glassColors.primary,
                    unfocusedBorderColor = glassColors.container,
                    focusedLabelColor = glassColors.primary,
                    cursorColor = glassColors.primary
                )
            )
            
            ExposedDropdownMenu(
                expanded = expanded,
                onDismissRequest = { expanded = false }
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
        
        if (error != null) {
            Text(
                text = error,
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(start = 16.dp, top = 4.dp)
            )
        }
    }
}

/** 液态玻璃日期选择框 */
@Composable
fun GlassDateField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    placeholder: String,
    leadingIcon: androidx.compose.ui.graphics.vector.ImageVector? = null,
    modifier: Modifier = Modifier
) {
    var showDatePicker by remember { mutableStateOf(false) }
    val context = LocalContext.current
    
    if (showDatePicker) {
        val datePickerDialog = android.app.DatePickerDialog(
            context,
            { _, year, month, dayOfMonth ->
                val dateString = String.format("%04d-%02d-%02d", year, month + 1, dayOfMonth)
                onValueChange(dateString)
                showDatePicker = false
            },
            Calendar.getInstance().get(Calendar.YEAR),
            Calendar.getInstance().get(Calendar.MONTH),
            Calendar.getInstance().get(Calendar.DAY_OF_MONTH)
        )
        
        LaunchedEffect(showDatePicker) {
            if (showDatePicker) {
                datePickerDialog.show()
            }
        }
    }
    
    GlassTextField(
        value = value,
        onValueChange = { /* 禁用手动输入 */ },
        label = label,
        placeholder = placeholder,
        leadingIcon = leadingIcon,
        singleLine = true,
        modifier = modifier.then(Modifier.clickable { showDatePicker = true })
    )
}