package com.chronie.inventorymanager.domain.model

/**
 * 库存统计数据模型
 * 对应后端API返回的统计数据
 */
data class StockStatistics(
    val totalItems: Int,           // 总物品数
    val lowStockItems: Int,        // 库存不足物品数
    val expiringSoonItems: Int,    // 即将过期物品数
    val expiredItems: Int,         // 已过期物品数
    val categories: Int            // 分类数量
)

/**
 * 搜索和筛选条件
 */
data class InventorySearchFilter(
    val searchQuery: String = "",
    val category: String = "",
    val showExpired: Boolean = true,
    val statusFilter: StatusFilter = StatusFilter.ALL
)

/**
 * 状态筛选枚举
 */
enum class StatusFilter(val resourceKey: String) {
    ALL("statistics_all"),
    NORMAL("statistics_normal"),
    LOW_STOCK("statistics_lowstock"),
    EXPIRING_SOON("statistics_expiringsoon"),
    EXPIRED("statistics_expired")
}

/**
 * 库存操作类型
 */
enum class InventoryActionType {
    USE_ONE,      // 使用一个
    EDIT,         // 编辑
    DELETE,       // 删除
    ADJUST_STOCK  // 调整库存
}