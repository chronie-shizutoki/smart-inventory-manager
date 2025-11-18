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
    val id: String,
    
    val name: String,
    
    val description: String = "",
    
    val category: String,
    
    val quantity: Int,
    
    val minQuantity: Int = 0,
    
    val maxQuantity: Int = 0,
    
    val price: Double = 0.0,
    
    val currency: String = "CNY",
    
    val unit: String = "个",
    
    val location: String = "",
    
    val supplier: String = "",
    
    val lastUpdated: Date = Date(),
    
    val createdAt: Date = Date(),
    
    // 同步相关字段
    val isDeleted: Boolean = false,
    
    val isDirty: Boolean = false, // 表示本地有未同步的更改
    
    val syncStatus: SyncStatus = SyncStatus.SYNCED,
    
    val lastSyncedAt: Date? = null,
    
    // 扩展字段
    val metadata: Map<String, String> = emptyMap(),
    
    val tags: List<String> = emptyList(),
    
    val imageUrl: String = "",
    
    val barcode: String = "",
    
    val sku: String = ""
)

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