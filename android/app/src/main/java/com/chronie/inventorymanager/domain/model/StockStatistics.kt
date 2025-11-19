package com.chronie.inventorymanager.domain.model

import com.chronie.inventorymanager.R

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
enum class StatusFilter(val displayNameRes: Int) {
    ALL(R.string.statistics_all),
    NORMAL(R.string.statistics_normal),
    LOW_STOCK(R.string.statistics_lowstock),
    EXPIRING_SOON(R.string.statistics_expiringsoon),
    EXPIRED(R.string.statistics_expired)
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

/**
 * 排序枚举
 */
enum class SortOption(val displayNameRes: Int) {
    NAME_ASC(R.string.sort_name_asc),
    NAME_DESC(R.string.sort_name_desc),
    QUANTITY_ASC(R.string.sort_quantity_asc),
    QUANTITY_DESC(R.string.sort_quantity_desc),
    DATE_ADDED_ASC(R.string.sort_date_added_asc),
    DATE_ADDED_DESC(R.string.sort_date_added_desc),
    EXPIRY_DATE_ASC(R.string.sort_expiry_date_asc),
    EXPIRY_DATE_DESC(R.string.sort_expiry_date_desc),
    UPDATED_AT_ASC(R.string.sort_updated_at_asc),
    UPDATED_AT_DESC(R.string.sort_updated_at_desc)
}

/**
 * 统一筛选条件
 */
data class UnifiedFilter(
    val selectedCategories: List<String> = emptyList(),
    val statusFilter: StatusFilter = StatusFilter.ALL,
    val sortOption: SortOption = SortOption.NAME_ASC,
    val dateRange: Pair<Long?, Long?>? = null,
    val minQuantity: Int? = null
)