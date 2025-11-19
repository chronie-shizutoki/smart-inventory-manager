package com.chronie.inventorymanager.domain.usecase

import com.chronie.inventorymanager.data.repository.InventoryRepository
import com.chronie.inventorymanager.domain.model.InventoryItem
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/**
 * 获取库存物品列表用例
 */
class GetInventoryItemsUseCase(
    private val repository: InventoryRepository = InventoryRepository()
) {
    suspend fun execute(): List<InventoryItem> = withContext(Dispatchers.IO) {
        repository.getAllItems()
    }
}