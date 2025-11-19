package com.chronie.inventorymanager.domain.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.Date

/**
 * 库存物品数据模型
 * 对应后端API和本地数据库实体
 */
@Entity(tableName = "inventory_items")
data class InventoryItem(
    @PrimaryKey
    val id: String = "",
    
    val name: String = "",
    
    val category: String = "",
    
    val quantity: Int = 0,
    
    val unit: String = "",
    
    val minQuantity: Int = 0,
    
    val description: String = "",
    
    val usageCount: Int = 0,
    
    val lastUsedAt: Date? = null,
    
    val createdAt: Date = Date(),
    
    val updatedAt: Date = Date(),
    
    val expiryDate: Date? = null,
    
    // 扩展字段
    val price: Double = 0.0,
    
    val currency: String = "",
    
    val location: String = "",
    
    val supplier: String = "",
    
    // 同步相关字段
    val isDeleted: Boolean = false,
    
    val isDirty: Boolean = false, // 表示本地有未同步的更改
    
    val syncStatus: SyncStatus = SyncStatus.SYNCED,
    
    val lastSyncedAt: Date? = null,
    
    val metadata: Map<String, String> = emptyMap(),
    
    val tags: List<String> = emptyList(),
    
    val imageUrl: String = ""
)

/**
 * 库存物品扩展函数
 */
fun InventoryItem.isExpired(): Boolean {
    return expiryDate?.before(Date()) == true
}

fun InventoryItem.isExpiringSoon(days: Int = 7): Boolean {
    val expiryDate = this.expiryDate ?: return false
    val soonDate = Date(Date().time + (days * 24 * 60 * 60 * 1000L))
    return !isExpired() && expiryDate.before(soonDate)
}

fun InventoryItem.isLowStock(): Boolean {
    return quantity <= minQuantity
}

fun InventoryItem.getStockStatus(): StockStatus {
    return when {
        isExpired() -> StockStatus.EXPIRED
        isExpiringSoon() -> StockStatus.EXPIRING_SOON
        isLowStock() -> StockStatus.LOW_STOCK
        else -> StockStatus.NORMAL
    }
}

/**
 * 库存状态枚举
 */
enum class StockStatus {
    NORMAL,        // 正常
    LOW_STOCK,     // 库存不足
    EXPIRING_SOON, // 即将过期
    EXPIRED        // 已过期
}

/**
 * 同步状态枚举
 */
enum class SyncStatus {
    SYNCED,        // 已同步
    PENDING,       // 待同步
    DELETED,       // 已删除
    CONFLICT,      // 同步冲突
    FAILED         // 同步失败
}

/**
 * 同步操作结果
 */
data class SyncResult<T>(
    val success: Boolean,
    val data: T? = null,
    val error: String? = null,
    val timestamp: Date = Date()
)

/**
 * 批量同步请求
 */
data class BatchSyncRequest(
    val items: List<InventoryItem>,
    val lastSyncTime: Date? = null,
    val deviceId: String = "",
    val appVersion: String = ""
)

/**
 * 批量同步响应
 */
data class BatchSyncResponse(
    val success: Boolean,
    val items: List<InventoryItem>? = null,
    val conflicts: List<InventoryItemConflict>? = null,
    val deletedItems: List<String>? = null,
    val lastSyncTime: Date = Date(),
    val message: String = ""
)

/**
 * 同步冲突
 */
data class InventoryItemConflict(
    val localItem: InventoryItem,
    val serverItem: InventoryItem,
    val conflictField: String,
    val resolvedValue: Any? = null
)