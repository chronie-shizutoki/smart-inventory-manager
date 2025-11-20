package com.chronie.inventorymanager.utils

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import com.chronie.inventorymanager.R

/**
 * 分类名称国际化转换工具
 * 将英文分类键名转换为本地化的显示名称
 */
object CategoryNameConverter {
    
    // 英文分类键名到中文显示名称的映射
    private val categoryDisplayNameMap = mapOf(
        "food" to "食品",
        "medicine" to "药品", 
        "cleaning" to "清洁用品",
        "personal" to "个人护理",
        "household" to "家居用品",
        "electronics" to "电子产品"
    )
    
    // 预定义的显示名称列表，用于下拉选择
    val predefinedCategories = listOf("food", "medicine", "cleaning", "personal", "household", "electronics")
    
    /**
     * 将分类键名转换为本地化显示名称
     * @param category 分类键名 (如: "food", "medicine"等)
     * @param context 应用上下文
     * @return 本地化的分类显示名称
     */
    fun getDisplayName(category: String, context: Context? = null): String {
        val normalizedCategory = category.trim()
        
        // 首先尝试通过上下文从资源获取中文名称
        context?.let { ctx ->
            // 使用预定义的分类键名
            val resourceId: Int = try {
                when (normalizedCategory.lowercase()) {
                    "food" -> R.string.categories_food
                    "medicine" -> R.string.categories_medicine
                    "cleaning" -> R.string.categories_cleaning
                    "personal" -> R.string.categories_personal
                    "household" -> R.string.categories_household
                    "electronics" -> R.string.categories_electronics
                    else -> 0
                }
            } catch (e: Exception) {
                0
            }
            
            if (resourceId != 0) {
                return try {
                    ctx.getString(resourceId)
                } catch (e: Exception) {
                    // 如果获取失败，使用映射的显示名称
                    categoryDisplayNameMap[normalizedCategory.lowercase()] 
                        ?: normalizedCategory.replaceFirstChar { if (it.isLowerCase()) it.titlecase() else it.toString() }
                }
            }
        }
        
        // 如果没有context或无法获取本地化字符串，返回映射的显示名称或默认处理
        return categoryDisplayNameMap[normalizedCategory.lowercase()] 
            ?: normalizedCategory.replaceFirstChar { if (it.isLowerCase()) it.titlecase() else it.toString() }
    }
    
    /**
     * 在Compose环境中获取显示名称
     * @param category 分类键名
     * @return 本地化的分类显示名称
     */
    @Composable
    fun getDisplayNameComposable(category: String): String {
        return getDisplayName(category, LocalContext.current)
    }
    
    /**
     * 获取所有可用分类的显示名称列表
     * @param context 应用上下文
     * @return 分类键名到显示名称的映射
     */
    fun getAllCategoryDisplayNames(context: Context): Map<String, String> {
        return predefinedCategories.associateWith { key ->
            getDisplayName(key, context)
        }
    }
    
    /**
     * 检查分类键名是否有效
     * @param category 分类键名
     * @return 是否为有效的分类键名
     */
    fun isValidCategory(category: String): Boolean {
        return predefinedCategories.contains(category.lowercase())
    }
    
    /**
     * 获取分类键名列表
     * @return 所有支持的分类键名列表
     */
    fun getValidCategories(): List<String> {
        return predefinedCategories
    }
    
    /**
     * 将显示名称转换回分类键名
     * @param displayName 显示名称
     * @param context 应用上下文
     * @return 对应的分类键名，如果找不到则返回原值
     */
    fun getCategoryKeyFromDisplayName(displayName: String, context: Context): String {
        predefinedCategories.forEach { key ->
            if (getDisplayName(key, context) == displayName) {
                return key
            }
        }
        return displayName
    }
}