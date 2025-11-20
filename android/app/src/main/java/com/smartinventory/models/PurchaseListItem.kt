package com.smartinventory.models

import com.google.gson.annotations.SerializedName

/**
 * Data class representing a purchase list item based on current inventory levels
 */
data class PurchaseListItem(
    val id: Int,
    val name: String,
    val category: String,
    @SerializedName("currentQuantity")
    val currentQuantity: Int,
    @SerializedName("minQuantity")
    val minQuantity: Int,
    @SerializedName("suggestedQuantity")
    val suggestedQuantity: Int,
    val unit: String,
    @SerializedName("lastUsedAt")
    val lastUsedAt: String?
) {
    
    /**
     * Get the category display name based on the category key
     */
    fun getCategoryDisplayName(): String {
        return when (category.lowercase()) {
            "food" -> "食品"
            "medicine" -> "药品"
            "cleaning" -> "清洁用品"
            "personal" -> "个人用品"
            "household" -> "日用品"
            "electronics" -> "电子产品"
            else -> category
        }
    }
    
    /**
     * Check if the item is critically low (quantity is 0 or very low)
     */
    fun isCriticallyLow(): Boolean {
        return currentQuantity == 0 || currentQuantity <= minQuantity / 2
    }
}