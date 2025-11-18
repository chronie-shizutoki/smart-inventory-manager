package com.chronie.inventorymanager.data.network

import com.chronie.inventorymanager.domain.model.BatchSyncRequest
import com.chronie.inventorymanager.domain.model.BatchSyncResponse
import com.chronie.inventorymanager.domain.model.InventoryItem
import retrofit2.Response
import retrofit2.http.*

/**
 * 库存管理API接口定义
 * 处理所有与后端API的通信
 */
interface InventoryApi {
    
    // 基础CRUD操作
    @GET("api/items")
    suspend fun getAllItems(): Response<List<InventoryItem>>
    
    @GET("api/items/{id}")
    suspend fun getItemById(@Path("id") id: String): Response<InventoryItem>
    
    @POST("api/items")
    suspend fun createItem(@Body item: InventoryItem): Response<InventoryItem>
    
    @PUT("api/items/{id}")
    suspend fun updateItem(@Path("id") id: String, @Body item: InventoryItem): Response<InventoryItem>
    
    @DELETE("api/items/{id}")
    suspend fun deleteItem(@Path("id") id: String): Response<Unit>
    
    // 查询操作
    @GET("api/items/category/{category}")
    suspend fun getItemsByCategory(@Path("category") category: String): Response<List<InventoryItem>>
    
    @GET("api/items/search")
    suspend fun searchItems(@Query("query") query: String): Response<List<InventoryItem>>
    
    @GET("api/items/low-stock")
    suspend fun getLowStockItems(): Response<List<InventoryItem>>
    
    @GET("api/items/location/{location}")
    suspend fun getItemsByLocation(@Path("location") location: String): Response<List<InventoryItem>>
    
    // 同步相关操作
    @POST("api/items/{id}/sync")
    suspend fun syncItem(@Path("id") id: String, @Body syncData: Map<String, Any>): Response<InventoryItem>
    
    @POST("api/sync/bulk")
    suspend fun bulkSync(@Body request: BatchSyncRequest): Response<BatchSyncResponse>
    
    @GET("api/sync/last-sync")
    suspend fun getLastSyncTime(): Response<Map<String, String>>
    
    @GET("api/sync/status")
    suspend fun getSyncStatus(): Response<Map<String, Any>>
    
    // 批量操作
    @POST("api/items/batch/create")
    suspend fun batchCreateItems(@Body items: List<InventoryItem>): Response<List<InventoryItem>>
    
    @PUT("api/items/batch/update")
    suspend fun batchUpdateItems(@Body items: List<InventoryItem>): Response<List<InventoryItem>>
    
    @DELETE("api/items/batch/delete")
    suspend fun batchDeleteItems(@Body itemIds: List<String>): Response<Unit>
    
    // 统计和报告
    @GET("api/statistics/overview")
    suspend fun getStatisticsOverview(): Response<Map<String, Any>>
    
    @GET("api/items/export")
    suspend fun exportItems(@Query("format") format: String = "json"): Response<Map<String, Any>>
    
    @POST("api/items/import")
    suspend fun importItems(@Body data: Map<String, Any>): Response<Map<String, Any>>
    
    // 库存操作
    @POST("api/items/{id}/adjust-stock")
    suspend fun adjustStock(
        @Path("id") id: String, 
        @Body adjustment: StockAdjustmentRequest
    ): Response<InventoryItem>
    
    @POST("api/items/{id}/transfer")
    suspend fun transferStock(
        @Path("id") id: String, 
        @Body transfer: StockTransferRequest
    ): Response<InventoryItem>
}

/**
 * 库存调整请求
 */
data class StockAdjustmentRequest(
    val adjustmentType: String, // "INCREASE" 或 "DECREASE"
    val quantity: Int,
    val reason: String = "",
    val notes: String = ""
)

/**
 * 库存转移请求
 */
data class StockTransferRequest(
    val fromLocation: String,
    val toLocation: String,
    val quantity: Int,
    val reason: String = "",
    val transferDate: String = ""
)