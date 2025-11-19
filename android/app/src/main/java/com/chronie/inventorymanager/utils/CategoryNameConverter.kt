package com.chronie.inventorymanager.utils

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

/**
 * 分类名称国际化转换工具
 * 将英文分类键名转换为本地化的显示名称
 */
object CategoryNameConverter {
    
    private val categoryDisplayNameMap = mapOf(
        "food" to "Food",
        "medicine" to "Medicine", 
        "cleaning" to "Cleaning Supplies",
        "personal" to "Personal Care",
        "household" to "Household Items",
        "electronics" to "Electronics"
    )
    
    /**
     * 将分类键名转换为本地化显示名称
     * @param category 分类键名 (如: "food", "medicine"等)
     * @param context 应用上下文
     * @return 本地化的分类显示名称
     */
    fun getDisplayName(category: String, context: Context? = null): String {
        // 如果提供了context，通过资源名称获取本地化字符串
        context?.let { ctx ->
            // 通过资源名称动态获取字符串资源ID
            val resourceId: Int = try {
                ctx.resources.getIdentifier(
                    "categories_${category.lowercase()}",
                    "string",
                    ctx.packageName
                )
            } catch (e: Exception) {
                0
            }
            
            if (resourceId != 0) {
                return ctx.getString(resourceId)
            }
        }
        
        // 如果没有context或无法获取本地化字符串，返回映射的显示名称或默认处理
        return categoryDisplayNameMap[category.lowercase()] 
            ?: category.replaceFirstChar { if (it.isLowerCase()) it.titlecase() else it.toString() }
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
        return categoryDisplayNameMap.mapValues { (key, _) ->
            getDisplayName(key, context)
        }
    }
    
    /**
     * 检查分类键名是否有效
     * @param category 分类键名
     * @return 是否为有效的分类键名
     */
    fun isValidCategory(category: String): Boolean {
        return categoryDisplayNameMap.containsKey(category.lowercase())
    }
    
    /**
     * 获取分类键名列表
     * @return 所有支持的分类键名列表
     */
    fun getValidCategories(): List<String> {
        return categoryDisplayNameMap.keys.toList()
    }
}