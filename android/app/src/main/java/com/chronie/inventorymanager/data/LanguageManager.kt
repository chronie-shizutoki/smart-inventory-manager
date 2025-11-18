package com.chronie.inventorymanager.data

import android.content.Context
import androidx.compose.runtime.*
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.platform.LocalContext
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
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
        
        // 通知所有监听器
        languageChangeCallbacks.forEach { callback ->
            callback(language)
        }
        
        // 这里可以添加持久化逻辑
        saveLanguagePreference(language)
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
     */
    private fun saveLanguagePreference(language: LanguageConfig) {
        // 可以使用SharedPreferences或其他持久化方式
        // 这里简化为空实现
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
    error("No LanguageContext provided!")
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
    val languageContext = remember {
        val initialLang = initialLanguage ?: LanguageManager.getDefaultLanguage()
        LanguageContext(initialLang)
    }
    
    // 提供语言上下文给子组件
    CompositionLocalProvider(LocalLanguageContext provides languageContext) {
        content()
    }
}