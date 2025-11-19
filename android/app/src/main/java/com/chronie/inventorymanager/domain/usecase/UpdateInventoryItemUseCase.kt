package com.chronie.inventorymanager.domain.usecase

import com.chronie.inventorymanager.data.repository.InventoryRepository
import com.chronie.inventorymanager.domain.model.InventoryItem
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/**
 * 更新库存物品用例
 */
class UpdateInventoryItemUseCase(
    private val repository: InventoryRepository = InventoryRepository()
) {
    suspend fun execute(item: InventoryItem) = withContext(Dispatchers.IO) {
        repository.updateItem(item)
    }
}