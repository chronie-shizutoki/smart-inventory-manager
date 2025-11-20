package com.smartinventory.models

import com.google.gson.annotations.SerializedName

/**
 * API response for purchase list data
 */
data class PurchaseListResponse(
    val success: Boolean,
    val data: List<PurchaseListItem>?,
    val error: String?
)