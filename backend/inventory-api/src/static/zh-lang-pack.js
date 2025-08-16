// ==UserScript==
// @name         Vue App Chinese Language Pack
// @namespace    https://staybrowser.com/
// @version      1.1
// @description  为Vue应用添加中文语言支持
// @author       Your Name
// @match        http://192.168.0.197:5000/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // 配置参数
    const config = {
        targetURL: 'http://192.168.0.197:5000',
        maxRetries: 5,
        retryInterval: 1000,
        appSelector: '#app'
    };
    
    // 中文翻译数据
    const zhTranslations = {
            notifications: {
                itemAdded: '物品已添加',
                itemUpdated: '物品已更新',
                itemDeleted: '物品已删除',
                error: '操作失败，请重试',
                insufficientStock: '库存不足: {itemName}',
                itemUsedSuccessfully: '使用了1 {unit}的{itemName} (剩余{quantity} {unit})'
            },
            alerts: {
                lowStock: '库存不足',
                lowStockMessage: '{item}仅剩{quantity} {unit}',
                expired: '已过期',
                expiredMessage: '{item}已于{days}天前过期',
                expiringSoon: '即将过期',
                expiringSoonMessage: '{item}将在{days}天后过期'
            },
            recommendations: {
                restock: '补充{item}',
                restockReason: '当前库存: {quantity} {unit} (最低: {minQuantity} {unit})',
                popular: '热门物品',
                popularReason: '{item}使用频率高',
                watch: '监控{item}',
                watchReason: '过去30天内使用了{count}次',
                consider: '考虑补充{item}',
                considerReason: '{category}类别中使用最多 ({count}次)',
                freqUseReason: '过去30天内使用了{count}次，当前库存{quantity} {unit}，建议补充',
                categoryReason: '作为{category}类别中的常用物品，过去30天内使用了{count}次'
            },
            app: {
                title: '智能家居库存管理'
            },
            nav: {
                inventory: '库存',
                add: '添加物品',
                analytics: '分析',
                purchaseList: '购物清单',
                menu: '菜单',
                language: '语言'
            },
            purchaseList: {
                description: '基于低库存的补货清单',
                totalItems: '待购物品',
                currentQuantity: '当前数量',
                minQuantity: '最低库存',
                suggestedQuantity: '建议数量',
                unit: '单位',
                lastUsed: '最后使用',
                refresh: '更新清单'
            },
            inventory: {
                title: '库存列表',
                search: '搜索物品...',
                allCategories: '全部分类',
                name: '物品',
                category: '分类',
                quantity: '数量',
                unit: '单位',
                expiryDate: '过期日期',
                status: '状态',
                actions: '操作'
            },
            categories: {
                food: '食品',
                medicine: '药品',
                cleaning: '清洁用品',
                personal: '个人护理',
                household: '家居用品',
                electronics: '电子产品'
            },
            stats: {
                totalItems: '物品总数',
                lowStock: '库存不足',
                expiringSoon: '即将过期',
                categories: '分类数量'
            },
            add: {
                title: '添加物品',
                editTitle: '编辑物品',
                name: '物品名称',
                category: '分类',
                quantity: '数量',
                unit: '单位',
                minQuantity: '最低库存',
                expiryDate: '过期日期',
                description: '描述',
                selectCategory: '选择分类',
                cancel: '取消',
                save: '保存',
                update: '更新'
            },
            analytics: {
                title: '分析',
                smartAlerts: '提醒',
                smartRecommendations: '建议'
            },
            status: {
                normal: '正常',
                lowStock: '库存不足',
                expiringSoon: '即将过期',
                expired: '已过期'
            }
        };

         // 检查当前URL是否匹配目标
    if (!window.location.href.startsWith(config.targetURL)) {
        console.warn(`[i18n] 脚本只能在 ${config.targetURL} 运行`);
        return;
    }
    
    console.log('[i18n] 开始加载中文语言包...');
    
    // 等待Vue应用初始化
    function waitForVueApp(retryCount = 0) {
        const appElement = document.querySelector(config.appSelector);
        
        if (!appElement) {
            if (retryCount < config.maxRetries) {
                console.log(`[i18n] 等待Vue应用挂载 (尝试 ${retryCount + 1}/${config.maxRetries})`);
                setTimeout(() => waitForVueApp(retryCount + 1), config.retryInterval);
            } else {
                console.error('[i18n] 错误: 未找到Vue应用根元素');
            }
            return;
        }
        
        // 尝试获取Vue应用实例
        const vueApp = appElement.__vue_app__ || 
                      (appElement.__vue__ && appElement.__vue__.appContext.app);
        
        if (!vueApp) {
            if (retryCount < config.maxRetries) {
                console.log(`[i18n] 等待Vue实例初始化 (尝试 ${retryCount + 1}/${config.maxRetries})`);
                setTimeout(() => waitForVueApp(retryCount + 1), config.retryInterval);
            } else {
                console.error('[i18n] 错误: 未找到Vue应用实例');
            }
            return;
        }
        
        // 尝试多种方式获取i18n实例
        let i18n = vueApp.config.globalProperties.$i18n;
        
        // Vue 3 Composition API 方式
        if (!i18n && vueApp._instance && vueApp._instance.proxy) {
            i18n = vueApp._instance.proxy.$i18n;
        }
        
        // 检查是否通过app.config.globalProperties注册
        if (!i18n && vueApp.config && vueApp.config.globalProperties) {
            i18n = vueApp.config.globalProperties.$i18n;
        }
        
        // 尝试直接访问全局i18n实例
        if (!i18n && window.i18n) {
            i18n = window.i18n;
        }
        
        if (!i18n) {
            console.error('[i18n] 错误: 未找到VueI18n实例');
            console.error('[i18n] 提示: 请确保Vue应用已正确配置并安装了VueI18n插件');
            return;
        }
        
        // 添加中文翻译
        addChineseLanguage(i18n);
    }
    
    // 添加中文语言支持
    function addChineseLanguage(i18n) {
        try {
            // 合并翻译而不是覆盖
            let existingZh = {};
            if (i18n.global && typeof i18n.global.getLocaleMessage === 'function') {
                existingZh = i18n.global.getLocaleMessage('zh') || {};
            } else if (typeof i18n.getLocaleMessage === 'function') {
                existingZh = i18n.getLocaleMessage('zh') || {};
            }

            const mergedTranslations = {...existingZh, ...zhTranslations};

            // 设置翻译消息
            if (i18n.global && typeof i18n.global.setLocaleMessage === 'function') {
                i18n.global.setLocaleMessage('zh', mergedTranslations);
            } else if (typeof i18n.setLocaleMessage === 'function') {
                i18n.setLocaleMessage('zh', mergedTranslations);
            }

            // 添加中文到语言选择器 (立即执行一次)
        addChineseToLanguageSelect();

        // 延迟再次执行，确保动态创建的选择器也能被处理
        setTimeout(addChineseToLanguageSelect, 1000);
        
        // 设置默认语言为中文
        if (i18n.global && typeof i18n.global.locale !== 'undefined') {
            i18n.global.locale = 'zh';
        } else if (typeof i18n.locale !== 'undefined') {
            i18n.locale = 'zh';
        } else if (typeof i18n.setLocale === 'function') {
            i18n.setLocale('zh');
        }

        // 额外检查：如果应用使用的是Vuex或其他状态管理，尝试直接更新语言状态
        if (window.store && window.store.dispatch) {
            try {
                window.store.dispatch('setLanguage', 'zh');
                console.log('[i18n] 已尝试通过store更新语言');
            } catch (e) {
                console.log('[i18n] 尝试通过store更新语言失败:', e.message);
            }
        }

            console.log('[i18n] 中文语言包已加载，当前语言已切换为中文');

            // 监听DOM变化，确保动态创建的元素也有中文选项
            const observer = new MutationObserver(addChineseToLanguageSelect);
            observer.observe(document.body, { childList: true, subtree: true });
        } catch (error) {
            console.error('[i18n] 错误: 加载中文语言包时发生异常');
            console.error(error);
        }
    }
    
    // 添加中文选项到语言选择下拉框
    function addChineseToLanguageSelect() {
        // 扩大选择器范围，匹配更多可能的语言选择器
        const selectors = [
            'select[v-model="currentLocale"]',
            'select[name="language"]',
            'select[data-i18n-lang]',
            '#language-select',
            '.language-select',
            'select[aria-label*="language"]',
            'select[aria-label*="语言"]',
            'select.bg-blue-500.text-white.border-blue-400.rounded.glass-effect',
            'select.w-full.px-3.py-2.border-gray-300.rounded-md.glass-effect'
        ];

        const selectElements = document.querySelectorAll(selectors.join(','));
        
        if (selectElements.length === 0) {
            console.log('[i18n] 未找到语言选择器元素，尝试使用其他选择器...');
            // 作为最后的备选方案，尝试匹配所有select元素
            const allSelects = document.querySelectorAll('select');
            if (allSelects.length > 0) {
                console.log(`[i18n] 找到${allSelects.length}个select元素，尝试添加中文选项到所有select元素`);
                allSelects.forEach(select => {
                    // 检查是否已有中文选项
                    let hasZhOption = false;
                    for (let i = 0; i < select.options.length; i++) {
                        if (select.options[i].value === 'zh' || select.options[i].textContent === '中文') {
                            hasZhOption = true;
                            break;
                        }
                    }
                    
                    if (!hasZhOption) {
                        const option = document.createElement('option');
                        option.value = 'zh';
                        option.textContent = '中文';
                        select.appendChild(option);
                        console.log('[i18n] 已添加中文选项到一个select元素');
                    } else {
                        console.log('[i18n] 该select元素已有中文选项');
                    }
                });
            }
            return;
        }
        
        selectElements.forEach(select => {
            // 检查是否已有中文选项
            let hasZhOption = false;
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].value === 'zh' || select.options[i].textContent === '中文') {
                    hasZhOption = true;
                    break;
                }
            }
            
            if (!hasZhOption) {
                const option = document.createElement('option');
                option.value = 'zh';
                option.textContent = '中文';
                select.appendChild(option);
                console.log('[i18n] 已添加中文选项到语言选择器');
            } else {
                console.log('[i18n] 语言选择器已有中文选项');
            }
        });
    }
    
    // 启动脚本
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        waitForVueApp();
    } else {
        document.addEventListener('DOMContentLoaded', waitForVueApp);
    }
})();