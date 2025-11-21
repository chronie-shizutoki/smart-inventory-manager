package com.chronie.inventorymanager.data

import android.content.Context
import android.os.Build
import android.content.res.Configuration
import androidx.compose.runtime.*
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.platform.LocalContext
import java.util.Locale

/**
 * 语言配置数据类
 */
data class LanguageConfig(
    val code: String,           // 语言代码，如 "zh", "en"
    val name: String,           // 显示名称，如 "中文 (简体)"
    val locale: Locale          // 对应的Locale对象
)

/**
 * 语言上下文管理类
 */
class LanguageContext(
    private val context: Context,
    initialLanguage: LanguageConfig
) {
    // 当前选中的语言
    var currentLanguage by mutableStateOf(initialLanguage)
        private set
    
    // 语言改变时的回调
    private val languageChangeCallbacks = mutableListOf<(LanguageConfig) -> Unit>()
    
    /**
     * 改变当前语言
     */
    fun changeLanguage(language: LanguageConfig) {
        val oldLanguage = currentLanguage
        currentLanguage = language
        
        // 应用语言设置到应用资源配置
        applyLanguageToResources(language)
        
        // 通知所有监听器
        languageChangeCallbacks.forEach { callback ->
            callback(language)
        }
        
        // 保存语言偏好
        saveLanguagePreference(language)
    }
    
    /**
     * 应用语言设置到应用资源配置
     */
    private fun applyLanguageToResources(language: LanguageConfig) {
        try {
            android.util.Log.d("LanguageContext", "Applying language: ${language.code}")
            
            val resources = context.resources
            val configuration = resources.configuration
            
            // 记录当前配置
            android.util.Log.d("LanguageContext", "Current locale: ${configuration.locale}")
            
            // 设置Locale
            configuration.setLocale(language.locale)
            
            // 对于Android N及以上，使用正确的API
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                android.util.Log.d("LanguageContext", "Using N+ API for language change")
                val newConfig = Configuration(configuration)
                context.createConfigurationContext(newConfig)
                // 同时更新应用上下文配置
                @Suppress("DEPRECATION")
                resources.updateConfiguration(newConfig, resources.displayMetrics)
            } else {
                // 旧版本API
                @Suppress("DEPRECATION")
                resources.updateConfiguration(configuration, resources.displayMetrics)
            }
            
            android.util.Log.d("LanguageContext", "Language applied successfully: ${language.code}")
        } catch (e: Exception) {
            android.util.Log.e("LanguageContext", "Failed to apply language to resources: ${e.message}", e)
        }
    }
    
    /**
     * 添加语言改变监听器
     */
    fun addLanguageChangeListener(callback: (LanguageConfig) -> Unit) {
        languageChangeCallbacks.add(callback)
    }
    
    /**
     * 移除语言改变监听器
     */
    fun removeLanguageChangeListener(callback: (LanguageConfig) -> Unit) {
        languageChangeCallbacks.remove(callback)
    }
    
    /**
     * 保存语言偏好设置到本地存储
     * 使用try-catch确保保存过程不会导致应用崩溃
     */
    private fun saveLanguagePreference(language: LanguageConfig) {
        try {
            val prefs = context.getSharedPreferences("app_prefs", Context.MODE_PRIVATE)
            prefs.edit()
                .putString("preferred_language", language.code)
                .apply()
        } catch (e: Exception) {
            // 捕获所有异常，确保不会因为保存语言偏好而导致应用崩溃
            android.util.Log.e("LanguageContext", "Failed to save language preference: ${e.message}", e)
        }
    }
}

/**
 * 语言管理器
 */
object LanguageManager {
    // 支持的语言列表
    val supportedLanguages = listOf(
        LanguageConfig("ar", "العربية (Arabic)", Locale.forLanguageTag("ar")),
        LanguageConfig("bn", "বাংলা (Bengali)", Locale.forLanguageTag("bn")),
        LanguageConfig("de", "Deutsch (German)", Locale.forLanguageTag("de")),
        LanguageConfig("en", "English", Locale.forLanguageTag("en")),
        LanguageConfig("es", "Español (Spanish)", Locale.forLanguageTag("es")),
        LanguageConfig("fr", "Français (French)", Locale.forLanguageTag("fr")),
        LanguageConfig("hi", "हिन्दी (Hindi)", Locale.forLanguageTag("hi")),
        LanguageConfig("id", "Bahasa Indonesia (Indonesian)", Locale.forLanguageTag("id")),
        LanguageConfig("it", "Italiano (Italian)", Locale.forLanguageTag("it")),
        LanguageConfig("ja", "日本語 (Japanese)", Locale.forLanguageTag("ja")),
        LanguageConfig("ko", "한국어 (Korean)", Locale.forLanguageTag("ko")),
        LanguageConfig("fa", "فارسی (Persian)", Locale.forLanguageTag("fa")),
        LanguageConfig("pt", "Português (Portuguese)", Locale.forLanguageTag("pt")),
        LanguageConfig("ru", "Русский (Russian)", Locale.forLanguageTag("ru")),
        LanguageConfig("ta", "தமிழ் (Tamil)", Locale.forLanguageTag("ta")),
        LanguageConfig("th", "ไทย (Thai)", Locale.forLanguageTag("th")),
        LanguageConfig("tr", "Türkçe (Turkish)", Locale.forLanguageTag("tr")),
        LanguageConfig("ur", "اردو (Urdu)", Locale.forLanguageTag("ur")),
        LanguageConfig("vi", "Tiếng Việt (Vietnamese)", Locale.forLanguageTag("vi")),
        LanguageConfig("zh", "中文 (简体) (Chinese Simplified)", Locale.forLanguageTag("zh")),
        LanguageConfig("zh-TW", "中文 (繁體) (Chinese Traditional)", Locale.forLanguageTag("zh-TW"))
    )
    
    /**
     * 根据语言代码获取语言配置
     */
    fun getLanguageByCode(code: String): LanguageConfig? {
        return supportedLanguages.find { it.code == code }
    }
    
    /**
     * 获取默认语言（英语）
     */
    fun getDefaultLanguage(): LanguageConfig {
        return supportedLanguages.find { it.code == "en" } ?: supportedLanguages.first()
    }
    
    /**
     * 根据Locale获取语言配置
     */
    fun getLanguageByLocale(locale: Locale): LanguageConfig? {
        val languageCode = if (locale.toString() == "zh_TW") "zh-TW" else locale.language
        return supportedLanguages.find { it.code == languageCode }
    }
}

/**
 * CompositionLocal用于在Compose中访问语言上下文
 */
val LocalLanguageContext = staticCompositionLocalOf<LanguageContext> {
    error("No LanguageContext provided")
}

/**
 * 扩展函数：获取语言上下文
 */
@Composable
fun getLanguageContext(): LanguageContext {
    return LocalLanguageContext.current
}

/**
 * 扩展函数：获取当前语言
 */
@Composable
fun getCurrentLanguage(): LanguageConfig {
    return getLanguageContext().currentLanguage
}

/**
 * 语言上下文Provider组件
 */
@Composable
fun LanguageContextProvider(
    initialLanguage: LanguageConfig? = null,
    content: @Composable () -> Unit
) {
    val ctx = LocalContext.current

    val languageContext = remember(ctx, initialLanguage) {
        // 创建语言上下文
        android.util.Log.d("LanguageProvider", "Initializing language context")
        
        // 先确定要使用的语言，再创建LanguageContext
        val languageToUse = try {
            // 优先使用传入的initialLanguage
            if (initialLanguage != null) {
                android.util.Log.d("LanguageProvider", "Using initialLanguage: ${initialLanguage.code}")
                // 当使用initialLanguage时，也将其保存到SharedPreferences中
                try {
                    val prefs = ctx.getSharedPreferences("app_prefs", Context.MODE_PRIVATE)
                    prefs.edit()
                        .putString("preferred_language", initialLanguage.code)
                        .apply()
                    android.util.Log.d("LanguageProvider", "Saved initialLanguage to SharedPreferences: ${initialLanguage.code}")
                } catch (e: Exception) {
                    android.util.Log.e("LanguageProvider", "Failed to save initialLanguage to SharedPreferences: ${e.message}", e)
                }
                initialLanguage
            } else {
                // 从SharedPreferences中读取保存的语言偏好
                val sharedPrefs = ctx.getSharedPreferences("app_prefs", Context.MODE_PRIVATE)
                val savedLanguageCode = sharedPrefs.getString("preferred_language", null)
                android.util.Log.d("LanguageProvider", "Saved language code from SharedPreferences: $savedLanguageCode")
                
                if (savedLanguageCode != null) {
                    val foundLanguage = LanguageManager.getLanguageByCode(savedLanguageCode)
                    if (foundLanguage != null) {
                        android.util.Log.d("LanguageProvider", "Using saved language from SharedPreferences: $savedLanguageCode")
                        foundLanguage
                    } else {
                        android.util.Log.w("LanguageProvider", "Saved language code '$savedLanguageCode' not found, using default")
                        LanguageManager.getDefaultLanguage()
                    }
                } else {
                    try {
                        // 根据系统Locale尝试选取匹配语言，否则使用默认
                        val sys = ctx.resources.configuration.locale ?: Locale.getDefault()
                        android.util.Log.d("LanguageProvider", "No saved language, using system locale: $sys")
                        val systemLanguage = LanguageManager.getLanguageByLocale(sys)
                        if (systemLanguage != null) {
                            android.util.Log.d("LanguageProvider", "Found matching language for system locale: ${systemLanguage.code}")
                            systemLanguage
                        } else {
                            android.util.Log.d("LanguageProvider", "No matching language found for system locale, using default")
                            LanguageManager.getDefaultLanguage()
                        }
                    } catch (e: Exception) {
                        android.util.Log.e("LanguageProvider", "Failed to get system locale: ${e.message}", e)
                        LanguageManager.getDefaultLanguage()
                    }
                }
            }
        } catch (e: Exception) {
            android.util.Log.e("LanguageProvider", "Failed to determine language to use: ${e.message}", e)
            LanguageManager.getDefaultLanguage()
        }
        
        android.util.Log.d("LanguageProvider", "Final language to use: ${languageToUse.code}")
        
        // 使用确定的语言直接创建LanguageContext
        val languageCtx = LanguageContext(ctx, languageToUse)
        
        // 确保语言设置被应用
        try {
            languageCtx.changeLanguage(languageToUse)
        } catch (e: Exception) {
            android.util.Log.e("LanguageProvider", "Failed to apply language: ${e.message}", e)
        }
        
        languageCtx
    }

    // 提供语言上下文给子组件
    CompositionLocalProvider(LocalLanguageContext provides languageContext) {
        content()
    }
}