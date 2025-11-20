package com.chronie.inventorymanager.domain.usecase

import com.chronie.inventorymanager.domain.model.InventoryItem
import com.chronie.inventorymanager.data.repository.InventoryRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/** 添加库存物品用例 */
class AddInventoryItemUseCase(
    private val repository: InventoryRepository = InventoryRepository()
) {
    
    suspend fun execute(item: InventoryItem): InventoryItem = withContext(Dispatchers.IO) {
        repository.createItem(item)
    }
}