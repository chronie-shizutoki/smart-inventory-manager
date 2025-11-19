package com.chronie.inventorymanager.data.network

import com.chronie.inventorymanager.domain.model.InventoryItem
import com.chronie.inventorymanager.domain.model.StockStatistics
import retrofit2.Response
import retrofit2.http.*

/**
 * 库存API服务类
 * 处理与后端库存管理API的所有通信
 */
interface InventoryApiService {
    
    // 获取库存物品列表
    @GET("/api/items")
    suspend fun getItems(
        @Query("search") search: String = "",
        @Query("category") category: String = "",
        @Query("showExpired") showExpired: Boolean = true,
        @Query("page") page: Int = 1,
        @Query("per_page") perPage: Int = 50
    ): Response<InventoryItemsResponse>
    
    // 获取单个物品
    @GET("/api/items/{id}")
    suspend fun getItem(@Path("id") id: String): Response<SingleItemResponse>
    
    // 创建新物品
    @POST("/api/items")
    suspend fun createItem(@Body item: InventoryItem): Response<SingleItemResponse>
    
    // 更新物品
    @PUT("/api/items/{id}")
    suspend fun updateItem(@Path("id") id: String, @Body item: InventoryItem): Response<SingleItemResponse>
    
    // 删除物品
    @DELETE("/api/items/{id}")
    suspend fun deleteItem(@Path("id") id: String): Response<DeleteResponse>
    
    // 使用物品（库存-1）
    @POST("/api/items/{id}/use")
    suspend fun useItem(@Path("id") id: String): Response<SingleItemResponse>
    
    // 获取库存统计
    @GET("/api/stats")
    suspend fun getStatistics(): Response<StatisticsResponse>
    
    // 获取分类列表
    @GET("/api/categories")
    suspend fun getCategories(): Response<CategoriesResponse>
    
    // 批量操作
    @POST("/api/items/batch/use")
    suspend fun batchUseItems(@Body itemIds: List<String>): Response<BatchUseResponse>
    
    @DELETE("/api/items/batch/delete")
    suspend fun batchDeleteItems(@Body itemIds: List<String>): Response<BatchDeleteResponse>
}

/**
 * API响应数据模型
 */
data class InventoryItemsResponse(
    val success: Boolean,
    val data: List<InventoryItem>,
    val pagination: PaginationInfo
)

data class SingleItemResponse(
    val success: Boolean,
    val data: InventoryItem,
    val message: String? = null
)

data class DeleteResponse(
    val success: Boolean,
    val message: String
)

data class StatisticsResponse(
    val success: Boolean,
    val data: StockStatistics
)

data class CategoriesResponse(
    val success: Boolean,
    val data: List<String>
)

data class BatchUseResponse(
    val success: Boolean,
    val data: List<InventoryItem>,
    val message: String
)

data class BatchDeleteResponse(
    val success: Boolean,
    val message: String
)

data class PaginationInfo(
    val page: Int,
    val pages: Int,
    val per_page: Int,
    val total: Int
)