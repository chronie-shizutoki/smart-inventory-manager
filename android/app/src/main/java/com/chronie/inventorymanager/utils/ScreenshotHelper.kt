package com.chronie.inventorymanager.utils

import android.content.ContentValues
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import android.view.View
import android.widget.Toast
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.asAndroidBitmap
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.toSize
import com.smartinventory.models.PurchaseListItem
import java.io.File
import java.io.FileOutputStream
import java.text.SimpleDateFormat
import java.util.*

object ScreenshotHelper {
    
    fun saveBitmapToGallery(context: Context, bitmap: Bitmap): Boolean {
        val timestamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(Date())
        val fileName = "purchase_list_$timestamp.png"
        
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val contentValues = ContentValues().apply {
                put(MediaStore.Images.Media.DISPLAY_NAME, fileName)
                put(MediaStore.Images.Media.MIME_TYPE, "image/png")
                put(MediaStore.Images.Media.RELATIVE_PATH, Environment.DIRECTORY_PICTURES + "/SmartInventory")
                put(MediaStore.Images.Media.IS_PENDING, 1)
            }
            
            val resolver = context.contentResolver
            val uri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, contentValues)
            
            uri?.let {
                try {
                    val outputStream = resolver.openOutputStream(it)
                    outputStream?.use { stream ->
                        bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)
                    }
                    contentValues.clear()
                    contentValues.put(MediaStore.Images.Media.IS_PENDING, 0)
                    resolver.update(it, contentValues, null, null)
                    true
                } catch (e: Exception) {
                    e.printStackTrace()
                    false
                }
            } ?: false
        } else {
            val directory = File(
                Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES),
                "SmartInventory"
            )
            if (!directory.exists()) {
                directory.mkdirs()
            }
            
            val file = File(directory, fileName)
            try {
                val outputStream = FileOutputStream(file)
                outputStream.use { stream ->
                    bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)
                }
                true
            } catch (e: Exception) {
                e.printStackTrace()
                false
            }
        }
    }
    
    fun shareBitmap(context: Context, bitmap: Bitmap) {
        val cachePath = File(context.externalCacheDir, "share_images")
        cachePath.mkdirs()
        
        val timestamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(Date())
        val file = File(cachePath, "purchase_list_$timestamp.png")
        
        try {
            val outputStream = FileOutputStream(file)
            outputStream.use { stream ->
                bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)
            }
            
            val uri = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                androidx.core.content.FileProvider.getUriForFile(
                    context,
                    "${context.packageName}.fileprovider",
                    file
                )
            } else {
                Uri.fromFile(file)
            }
            
            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "image/png"
                putExtra(Intent.EXTRA_STREAM, uri)
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            }
            
            context.startActivity(Intent.createChooser(shareIntent, "Share Image"))
        } catch (e: Exception) {
            e.printStackTrace()
            Toast.makeText(context, "Failed to share image", Toast.LENGTH_SHORT).show()
        }
    }
    
    fun createLongScreenshot(
        context: Context,
        purchaseList: List<PurchaseListItem>,
        title: String,
        isLightTheme: Boolean
    ): Bitmap? {
        val paint = Paint().apply {
            color = if (isLightTheme) Color.WHITE else Color.BLACK
            textSize = 48f
            isAntiAlias = true
        }
        
        val itemPaint = Paint().apply {
            color = if (isLightTheme) Color.BLACK else Color.WHITE
            textSize = 36f
            isAntiAlias = true
        }
        
        val detailPaint = Paint().apply {
            color = if (isLightTheme) Color.GRAY else Color.LTGRAY
            textSize = 32f
            isAntiAlias = true
        }
        
        val titleHeight = 100f
        val itemHeight = 200f
        val padding = 40f
        val totalHeight = titleHeight + (purchaseList.size * itemHeight) + padding * 2
        val width = 1080f
        
        val bitmap = Bitmap.createBitmap(width.toInt(), totalHeight.toInt(), Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        
        canvas.drawColor(if (isLightTheme) Color.WHITE else Color.BLACK)
        
        canvas.drawText(title, padding, titleHeight - 30f, paint)
        
        canvas.drawLine(padding, titleHeight, width - padding, titleHeight, paint)
        
        purchaseList.forEachIndexed { index, item ->
            val yOffset = titleHeight + padding + (index * itemHeight)
            
            canvas.drawText(item.name, padding, yOffset + 60f, itemPaint)
            
            canvas.drawText(
                "${context.getString(context.resources.getIdentifier("purchaselist_currentquantity", "string", context.packageName))}: ${item.currentQuantity}${item.unit}",
                padding,
                yOffset + 110f,
                detailPaint
            )
            
            canvas.drawText(
                "${context.getString(context.resources.getIdentifier("purchaselist_minquantity", "string", context.packageName))}: ${item.minQuantity}${item.unit}",
                padding + 400f,
                yOffset + 110f,
                detailPaint
            )
            
            canvas.drawText(
                "${context.getString(context.resources.getIdentifier("purchaselist_suggestedquantity", "string", context.packageName))}: ${item.suggestedQuantity}${item.unit}",
                padding + 800f,
                yOffset + 110f,
                detailPaint
            )
            
            canvas.drawText(
                context.getString(context.resources.getIdentifier("inventory_category", "string", context.packageName)) + ": ${item.category}",
                padding,
                yOffset + 160f,
                detailPaint
            )
            
            if (index < purchaseList.size - 1) {
                canvas.drawLine(padding, yOffset + itemHeight, width - padding, yOffset + itemHeight, detailPaint)
            }
        }
        
        return bitmap
    }
}