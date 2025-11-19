package com.chronie.inventorymanager.domain.usecase

import com.chronie.inventorymanager.data.repository.InventoryRepository
import com.chronie.inventorymanager.domain.model.InventoryItem
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/**
 * 使用库存物品用例（减少库存数量）
 */
class UseInventoryItemUseCase(
    private val repository: InventoryRepository = InventoryRepository()
) {
    suspend fun execute(item: InventoryItem) = withContext(Dispatchers.IO) {
        // 更新使用次数和最后使用时间
        val updatedItem = item.copy(
            quantity = maxOf(0, item.quantity - 1),
            usageCount = item.usageCount + 1
            // lastUsedAt会在repository中设置
        )
        repository.updateItem(updatedItem)
    }
}