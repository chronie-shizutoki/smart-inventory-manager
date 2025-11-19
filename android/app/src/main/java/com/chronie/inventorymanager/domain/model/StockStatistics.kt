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
enum class StatusFilter(val displayName: String) {
    ALL("全部"),
    NORMAL("正常"),
    LOW_STOCK("库存不足"),
    EXPIRING_SOON("即将过期"),
    EXPIRED("已过期")
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
enum class SortOption(val displayName: String) {
    NAME_ASC("名称 A-Z"),
    NAME_DESC("名称 Z-A"),
    QUANTITY_ASC("数量升序"),
    QUANTITY_DESC("数量降序"),
    DATE_ADDED_ASC("添加日期升序"),
    DATE_ADDED_DESC("添加日期降序"),
    EXPIRY_DATE_ASC("过期日期升序"),
    EXPIRY_DATE_DESC("过期日期降序"),
    UPDATED_AT_ASC("更新时间升序"),
    UPDATED_AT_DESC("更新时间降序")
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