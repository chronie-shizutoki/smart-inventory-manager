package com.chronie.inventorymanager.domain.usecase

import com.chronie.inventorymanager.data.repository.InventoryRepository
import com.chronie.inventorymanager.domain.model.StockStatistics
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/**
 * 获取库存统计数据用例
 */
class GetStatisticsUseCase(
    private val repository: InventoryRepository = InventoryRepository()
) {
    suspend fun execute(): StockStatistics = withContext(Dispatchers.IO) {
        repository.getStatistics()
    }
}