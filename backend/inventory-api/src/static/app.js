// 多语言配置
const messages = {
    ar: window.arMessages,
    bn: window.bnMessages,
    de: window.deMessages,
    en: window.enMessages,
    es: window.esMessages,
    fr: window.frMessages,
    fa: window.faMessages,
    hi: window.hiMessages,
    id: window.idMessages,
    it: window.itMessages,
    ja: window.jaMessages,
    ko: window.koMessages,
    pt: window.ptMessages,
    ru: window.ruMessages,
    ta: window.taMessages,
    th: window.thMessages,
    tr: window.trMessages,
    ur: window.urMessages,
    vi: window.viMessages,
    'zh-CN': window.zhCNMessages,
    'zh-TW': window.zhTWMessages
}

// Vue应用配置
const { createApp } = Vue;
const { createI18n } = VueI18n;

// 创建i18n实例
// 检测系统语言
const detectSystemLanguage = () => {
    // First check if a language is saved in localStorage
    const savedLang = localStorage.getItem('language');
    if (savedLang && Object.keys(messages).includes(savedLang)) {
        return savedLang;
    }

    // Then get the browser language
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Check if the full browser language is in the supported list
    if (Object.keys(messages).includes(browserLang)) {
        return browserLang;
    }

    // Extract the first two characters of the language code (e.g., 'en-US' -> 'en')
    const langCode = browserLang.split('-')[0];
    // Check if it's in the supported language list
    if (Object.keys(messages).includes(langCode)) {
        return langCode;
    }

    // Try to find language variants in the supported list
    const supportedLanguages = Object.keys(messages);
    for (const supportedLang of supportedLanguages) {
        if (supportedLang.startsWith(`${langCode}-`)) {
            return supportedLang;
        }
    }

    // Fall back to English if no match is found
    return 'en';
};

const i18n = createI18n({
    locale: detectSystemLanguage(),
    fallbackLocale: 'en',
    messages
});

// 标题国际化更新函数
function updateDocumentTitle() {
    document.title = i18n.global.t('app.title');
}

// 初始设置标题
updateDocumentTitle();

// RTL语言列表
const rtlLanguages = ['ar', 'fa', 'ur'];

// 更新文档的文本方向
function updateDocumentDirection(locale) {
    const isRtl = rtlLanguages.includes(locale);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    
    // 添加或移除RTL类，方便CSS选择器
    if (isRtl) {
        document.documentElement.classList.add('rtl');
    } else {
        document.documentElement.classList.remove('rtl');
    }
}

// 初始设置文本方向
updateDocumentDirection(i18n.global.locale);

// 创建Vue应用
const app = createApp({

    data() {
            return {
                currentView: 'inventory',
        currentLocale: i18n.global.locale,
        searchQuery: '',
        selectedCategory: '',
        editingItem: null,
        showMobileNav: false,
        // 语言选择弹窗（桌面端）
        showLocaleModal: false,
        tempLocale: i18n.global.locale,
        
        // 表单数据
            form: {
                name: '',
                category: '',
                quantity: 0,
                unit: '',
                minQuantity: 0,
                expiryDate: '',
                description: '',
                barcode: ''
            },
        
        // AI表单数据
        aiForm: {
            apiKey: '',
            images: []
        },
        
        // 控制AI记录模态框显示
        showAiRecordModal: false,
        
        // 分类列表
        categories: ['food', 'medicine', 'cleaning', 'personal', 'household', 'electronics'],
        
        // 生成的记录（临时存储）
        generatedRecords: [],
        
        // 控制生成记录确认模态框
        showConfirmGeneratedModal: false,
        
        // 控制编辑生成记录模态框
        showEditGeneratedRecordModal: false,
        
        // 当前正在编辑的生成记录
        editingGeneratedRecord: null,
        editingGeneratedRecordIndex: -1,
        
        // 库存数据
        items: [
            {
                id: 1,
                name: '牛奶',
                category: 'food',
                quantity: 2,
                unit: '瓶',
                minQuantity: 1,
                expiryDate: '2025-02-15',
                description: '全脂牛奶',
                createdAt: new Date()
            },
            {
                id: 2,
                name: '感冒药',
                category: 'medicine',
                quantity: 1,
                unit: '盒',
                minQuantity: 2,
                expiryDate: '2025-12-31',
                description: '治疗感冒症状',
                createdAt: new Date()
            },
            {
                id: 3,
                name: '洗洁精',
                category: 'cleaning',
                quantity: 1,
                unit: '瓶',
                minQuantity: 1,
                expiryDate: '2026-01-01',
                description: '厨房清洁用品',
                createdAt: new Date()
            }
        ],
        
        // 智能分析数据
        smartAlerts: [],
        smartRecommendations: [],
        // 采购清单数据
        purchaseList: [],
        
        // 通知系统
            notification: {
                show: false,
                message: '',
                type: 'success'
            }
            };
        },
    
    computed: {
        // 过滤后的物品列表
        filteredItems() {
            let filtered = this.items;
            
            // 按搜索关键词过滤
            if (this.searchQuery) {
                filtered = filtered.filter(item => 
                    item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }
            
            // 按分类过滤
            if (this.selectedCategory) {
                filtered = filtered.filter(item => item.category === this.selectedCategory);
            }
            
            return filtered;
        },
        
        // 统计数据
        totalItems() {
            return this.items.length;
        },
        
        lowStockItems() {
            return this.items.filter(item => item.quantity <= item.minQuantity).length;
        },
        
        expiringSoonItems() {
            const today = new Date();
            const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            return this.items.filter(item => {
                const expiryDate = new Date(item.expiryDate);
                return expiryDate <= sevenDaysLater && expiryDate >= today;
            }).length;
        },
        

    },
    
    methods: {
        // 切换语言
        changeLanguage() {
            // 使用全局i18n实例
            i18n.global.locale = this.currentLocale;
            this.$i18n.locale = this.currentLocale;
            localStorage.setItem('language', this.currentLocale);
            // 更新页面标题
            document.title = i18n.global.t('app.title');
            // 手动调用updateDocumentDirection确保RTL设置正确应用
            updateDocumentDirection(this.currentLocale);
        },
        // 打开/关闭语言弹窗
        openLocaleModal() {
            this.tempLocale = this.currentLocale;
            this.showLocaleModal = true;
        },
        closeLocaleModal() {
            this.showLocaleModal = false;
        },
        confirmLocaleChange() {
            this.currentLocale = this.tempLocale;
            this.changeLanguage();
            this.closeLocaleModal();
        },
        
        // 获取分类图标
        getCategoryIcon(category) {
            const icons = {
                food: 'fas fa-utensils',
                medicine: 'fas fa-pills',
                cleaning: 'fas fa-spray-can',
                personal: 'fas fa-user',
                household: 'fas fa-home',
                electronics: 'fas fa-laptop'
            };
            return icons[category] || 'fas fa-box';
        },
        
        // 从API加载智能提醒
        async loadAlertsFromAPI() {
            try {
                const response = await fetch(`/api/inventory/alerts?language=${this.currentLocale}`);
                const result = await response.json();
                if (result.success) {
                    this.smartAlerts = result.data;
                }
            } catch (error) {
                console.error('Failed to load alerts from API:', error);
            }
        },
        
        // 从API加载智能推荐
        async loadRecommendationsFromAPI() {
            try {
                const response = await fetch(`/api/inventory/recommendations?language=${this.currentLocale}`);
                const result = await response.json();
                if (result.success) {
                    this.smartRecommendations = result.data;
                }
            } catch (error) {
                console.error('Failed to load recommendations from API:', error);
            }
        },

        // 从API加载采购清单
        async loadPurchaseListFromAPI() {
            try {
                const response = await fetch('/api/inventory/items/generate-purchase-list');
                const result = await response.json();
                if (result.success) {
                    this.purchaseList = result.data;
                }
            } catch (error) {
                console.error('Failed to load purchase list from API:', error);
            }
        },
        
        // 当物品数据更新时，重新加载智能分析数据
        async refreshAnalyticsData() {
            await this.loadAlertsFromAPI();
            await this.loadRecommendationsFromAPI();
        },
        
        // 记录物品使用
        async recordItemUsage(itemId) {
            try {
                const response = await fetch(`/api/inventory/items/${itemId}/use`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                if (result.success) {
                    // 更新本地物品列表
                    const index = this.items.findIndex(item => item.id === itemId);
                    if (index !== -1) {
                        this.items[index] = result.data;
                        // 触发重新渲染
                        this.items = [...this.items];
                    }
                    console.log('API Response:', result);
                    // 处理国际化消息
                    let message;
                    if (result.message_code) {
                        message = this.$t(`notifications.${result.message_code}`, result.message_data);
                    } else {
                        message = result.message || this.$t('notifications.itemUpdated');
                    }
                    this.showNotification(message, 'success');
                    return true;
                } else {
                    // 处理错误情况
                    if (result.error_code === 'insufficientStock') {
                        // 显示库存不足的国际化消息
                        // 确保参数名称与后端返回的字段匹配
                        const message = this.$t('notifications.insufficientStock', {
                            itemName: result.error_data.item_name
                        });
                        this.showNotification(message, 'error');
                    } else {
                        // 显示通用错误消息
                        this.showNotification(this.$t('notifications.error'), 'error');
                    }
                }
            } catch (error) {
                console.error('Failed to record item usage:', error);
                this.showNotification(this.$t('notifications.error'), 'error');
            }
            return false;
        },

        // 格式化日期
        formatDate(dateString) {
            if (!dateString) return '-';
            const date = new Date(dateString);
            return date.toLocaleDateString(this.currentLocale === 'en' ? 'en-US' : this.currentLocale);
        },
        
        // 获取过期日期样式
        getExpiryClass(expiryDate) {
            if (!expiryDate) return '';
            const today = new Date();
            const expiry = new Date(expiryDate);
            const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
            
            if (daysUntilExpiry < 0) return 'text-red-600 font-bold';
            if (daysUntilExpiry <= 3) return 'text-orange-600 font-medium';
            if (daysUntilExpiry <= 7) return 'text-yellow-600';
            return '';
        },
        
        // 获取状态样式
        getStatusClass(item) {
            const today = new Date();
            const expiryDate = new Date(item.expiryDate);
            const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            
            if (daysUntilExpiry < 0) return 'bg-red-100 text-red-800';
            if (daysUntilExpiry <= 3) return 'bg-orange-100 text-orange-800';
            if (item.quantity <= item.minQuantity) return 'bg-yellow-100 text-yellow-800';
            return 'bg-green-100 text-green-800';
        },
        
        // 获取状态文本
        getStatusText(item) {
            const today = new Date();
            const expiryDate = new Date(item.expiryDate);
            const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            
            if (daysUntilExpiry < 0) return this.$t('status.expired');
            if (daysUntilExpiry <= 3) return this.$t('status.expiringSoon');
            if (item.quantity <= item.minQuantity) return this.$t('status.lowStock');
            return this.$t('status.normal');
        },
        
        // 获取提醒样式
        getAlertClass(type) {
            const classes = {
                error: 'bg-red-50 border-red-500',
                warning: 'bg-yellow-50 border-yellow-500',
                info: 'bg-blue-50 border-blue-500'
            };
            return classes[type] || classes.info;
        },
        
        // 获取提醒图标
        getAlertIcon(type) {
            const icons = {
                error: 'fas fa-exclamation-triangle text-red-500',
                warning: 'fas fa-exclamation-circle text-yellow-500',
                info: 'fas fa-info-circle text-blue-500'
            };
            return icons[type] || icons.info;
        },
        
        // 编辑物品
        editItem(item) {
            this.editingItem = item;
            this.form = { ...item };
            this.currentView = 'add';
        },
        
        // 删除物品
        async deleteItem(id) {
            if (confirm('确定要删除这个物品吗？')) {
                const success = await this.deleteItemFromAPI(id);
                if (success) {
                    this.showNotification(this.$t('notifications.itemDeleted'), 'success');
                } else {
                    this.showNotification(this.$t('notifications.error'), 'error');
                }
            }
        },
        
        // 保存物品
        async saveItem() {
            try {
                const success = await this.saveItemToAPI(this.form);
                if (success) {
                    const message = this.editingItem ? 
                        this.$t('notifications.itemUpdated') : 
                        this.$t('notifications.itemAdded');
                    this.showNotification(message, 'success');
                    this.resetForm();
                    this.currentView = 'inventory';
                } else {
                    this.showNotification(this.$t('notifications.error'), 'error');
                }
            } catch (error) {
                this.showNotification(this.$t('notifications.error'), 'error');
            }
        },
        
        // 取消编辑
        cancelEdit() {
            this.resetForm();
            this.currentView = 'inventory';
        },
        
        // 重置表单
        resetForm() {
            this.form = {
                name: '',
                category: '',
                quantity: 0,
                unit: '',
                minQuantity: 0,
                expiryDate: '',
                description: '',
                barcode: ''
            };
            this.editingItem = null;
        },
        
        // 显示通知
        showNotification(message, type = 'success') {
            this.notification = {
                show: true,
                message,
                type
            };
            
            setTimeout(() => {
                this.notification.show = false;
            }, 3000);
        },
        
        // 初始化数据
        async initializeData() {
            try {
                // 从API加载数据
                await this.loadItemsFromAPI();
                await this.loadStatsFromAPI();
                // 加载智能分析数据
                await this.refreshAnalyticsData();
            } catch (error) {
                console.error('Failed to load data from API:', error);
                // 如果API失败，从localStorage加载数据
                const savedItems = localStorage.getItem('inventoryItems');
                if (savedItems) {
                    this.items = JSON.parse(savedItems);
                }
            }
            
            // 加载语言设置
            const savedLanguage = localStorage.getItem('language');
            if (savedLanguage) {
                this.currentLocale = savedLanguage;
                this.$i18n.locale = savedLanguage;
            }
        },
        
        // 从API加载物品
        async loadItemsFromAPI() {
            try {
                const response = await fetch('/api/inventory/items');
                const result = await response.json();
                if (result.success) {
                    this.items = result.data;
                }
            } catch (error) {
                console.error('Failed to load items from API:', error);
            }
        },
        
        // 从API加载统计数据
        async loadStatsFromAPI() {
            try {
                const response = await fetch('/api/inventory/stats');
                const result = await response.json();
                if (result.success) {
                    // 更新统计数据（如果需要的话）
                }
            } catch (error) {
                console.error('Failed to load stats from API:', error);
            }
        },
        
        // 保存物品到API
        async saveItemToAPI(itemData) {
            try {
                const url = this.editingItem ? 
                    `/api/inventory/items/${this.editingItem.id}` : 
                    '/api/inventory/items';
                const method = this.editingItem ? 'PUT' : 'POST';
                
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemData)
                });
                
                const result = await response.json();
                if (result.success) {
                    // 重新加载数据
                    await this.loadItemsFromAPI();
                    // 刷新智能分析数据
                    await this.refreshAnalyticsData();
                    console.log('Item saved successfully');
                    return true;
                } else {
                    throw new Error(result.error || 'Failed to save item');
                }
            } catch (error) {
                console.error('Failed to save item to API:', error);
                return false;
            }
        },
        
        // 从API删除物品
        async deleteItemFromAPI(itemId) {
            try {
                const response = await fetch(`/api/inventory/items/${itemId}`, {
                    method: 'DELETE'
                });
                
                const result = await response.json();
                if (result.success) {
                    // 重新加载数据
                    await this.loadItemsFromAPI();
                    // 刷新智能分析数据
                    await this.refreshAnalyticsData();
                    return true;
                } else {
                    throw new Error(result.error || 'Failed to delete item');
                }
            } catch (error) {
                console.error('Failed to delete item from API:', error);
                return false;
            }
        },
        
        // 保存数据到localStorage
        saveData() {
            localStorage.setItem('inventoryItems', JSON.stringify(this.items));
        },
        
        // 移动端导航相关方法
        navigateAndClose(view) {
            this.currentView = view;
            this.showMobileNav = false;
        },

        // AI记录功能相关方法
        // 打开AI记录模态框
        openAiRecordModal() {
            // 从localStorage加载保存的API Key
            const savedApiKey = localStorage.getItem('siliconflowApiKey');
            if (savedApiKey) {
                this.aiForm.apiKey = savedApiKey;
            }
            this.showAiRecordModal = true;
            // 为关闭按钮添加事件监听
            setTimeout(() => {
                const closeBtn = document.getElementById('close-ai-modal');
                if (closeBtn) {
                    closeBtn.onclick = () => this.closeAiRecordModal();
                }
            }, 100);
        },

        // 关闭AI记录模态框
        closeAiRecordModal() {
            this.showAiRecordModal = false;
        },

        // 触发图片上传
        triggerImageUpload() {
            document.getElementById('ai-image-upload').click();
        },

        // 处理图片上传
        handleAiImageUpload(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // 检查文件类型
                if (!file.type.startsWith('image/')) {
                    this.showNotification(this.$t('notifications.invalidImageType'), 'error');
                    continue;
                }

                // 创建图片预览
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.aiForm.images.push({
                        id: Date.now() + i, // 生成唯一ID
                        file: file,
                        preview: e.target.result
                    });
                };
                reader.readAsDataURL(file);
            }
            // 重置文件输入
            event.target.value = '';
        },

        // 移除已上传的图片
        removeAiImage(index) {
            this.aiForm.images.splice(index, 1);
        },

        // 调用AI API生成记录
        async generateRecordsFromAI() {
            // 验证API Key和图片
            if (!this.aiForm.apiKey) {
                this.showNotification(this.$t('aiRecord.apiKeyRequired'), 'error');
                return;
            }

            if (this.aiForm.images.length === 0) {
                this.showNotification(this.$t('aiRecord.noImagesSelected'), 'error');
                return;
            }

            // 保存API Key到localStorage
            localStorage.setItem('siliconflowApiKey', this.aiForm.apiKey);

            // 显示加载通知
            this.showNotification(this.$t('aiRecord.generatingRecords'), 'info');

            // 创建FormData对象
            const formData = new FormData();
            formData.append('api_key', this.aiForm.apiKey);
            
            // 添加所有图片
            this.aiForm.images.forEach((image) => {
                formData.append('images', image.file);
            });

            try {
                // 发送到服务器进行AI分析
                console.log('Sending AI record generation request to /api/ai/generate-records');
                const response = await fetch('/api/ai/generate-records', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }

                const result = await response.json();
                
                if (result.success && result.records && result.records.length > 0) {
                    // 保存生成的记录到临时变量，用于确认弹窗
                    this.generatedRecords = result.records;
                    
                    // 打开确认弹窗
                    this.showConfirmGeneratedModal = true;
                    
                    // 清空表单
                    this.aiForm.images = [];
                    
                    // 关闭模态框
                    this.closeAiRecordModal();
                } else {
                    this.showNotification(
                        result.message || this.$t('aiRecord.failedToGenerate'), 
                        'error'
                    );
                }
            } catch (error) {
                console.error('Error generating records from AI:', error);
                this.showNotification(
                    error.message || this.$t('notifications.serverError'), 
                    'error'
                );
            }
        },
        
        // 确认并添加生成的记录
        async confirmAndAddGeneratedRecords() {
            try {
                // 遍历所有生成的记录
                for (const record of this.generatedRecords) {
                    // 检查是否存在相同名称的物品
                    const existingItem = this.items.find(item => 
                        item.name.toLowerCase() === record.name.toLowerCase() && 
                        item.category === record.category
                    );

                    if (existingItem) {
                        // 更新现有物品的数量
                        existingItem.quantity += record.quantity;
                        // 保存更新到API
                        await this.saveItemToAPI(existingItem);
                    } else {
                        // 创建新物品对象
                        const newItem = {
                            id: Date.now() + Math.floor(Math.random() * 1000),
                            name: record.name,
                            category: record.category,
                            quantity: record.quantity,
                            unit: record.unit || '个',
                            minQuantity: record.minQuantity || 1,
                            expiryDate: record.expiryDate,
                            description: record.description,
                            created: new Date().toISOString(),
                            updated: new Date().toISOString()
                        };
                        // 添加到本地列表
                        this.items.push(newItem);
                        // 保存到API
                        await this.saveItemToAPI(newItem);
                    }
                }
                
                // 保存到localStorage
                await this.saveData();
                
                // 关闭确认弹窗
                this.showConfirmGeneratedModal = false;
                
                // 显示成功通知
                this.showNotification(
                    `${this.$t('aiRecord.recordsGenerated')}: ${this.generatedRecords.length}`, 
                    'success'
                );
                
                // 清空生成的记录
                this.generatedRecords = [];
            } catch (error) {
                console.error('Error saving generated records:', error);
                this.showNotification(
                    error.message || this.$t('notifications.serverError'), 
                    'error'
                );
            }
        },
        
        // 取消添加生成的记录
        cancelAddGeneratedRecords() {
            this.showConfirmGeneratedModal = false;
            this.generatedRecords = [];
        },
        
        // 编辑生成的记录
        editGeneratedRecord(index) {
            // 深拷贝要编辑的记录，避免直接修改原数据
            this.editingGeneratedRecord = JSON.parse(JSON.stringify(this.generatedRecords[index]));
            this.editingGeneratedRecordIndex = index;
            
            // 打开编辑模态框
            this.showEditGeneratedRecordModal = true;
        },
        
        // 关闭编辑生成记录模态框
        closeEditGeneratedRecordModal() {
            this.showEditGeneratedRecordModal = false;
            this.editingGeneratedRecord = null;
            this.editingGeneratedRecordIndex = -1;
        },
        
        // 保存编辑后的生成记录
        saveEditedRecord() {
            if (this.editingGeneratedRecordIndex !== -1) {
                // 更新生成的记录列表中的数据
                this.generatedRecords[this.editingGeneratedRecordIndex] = {
                    ...this.editingGeneratedRecord
                };
                
                // 关闭编辑模态框
                this.closeEditGeneratedRecordModal();
                
                // 显示成功通知
                this.showNotification(this.$t('notifications.saveSuccess'), 'success');
            }
        }
    },
    
    watch: {
        // 添加语言切换监听
        currentLocale(newLocale) {
            i18n.global.locale = newLocale;
            updateDocumentTitle();
            updateDocumentDirection(newLocale); // 更新文本方向
        },
        currentView(newView) {
            if (newView === 'analytics') {
                this.loadRecommendationsFromAPI();
            }
            if (newView === 'purchaseList') {
                this.loadPurchaseListFromAPI();
            }
        },
        // 监听items变化，自动保存
        items: {
            handler() {
                this.saveData();
            },
            deep: true
        }
    },
    
    mounted() {
        this.initializeData();
        
        // 定期检查过期物品
        setInterval(() => {
            // 这里可以添加定期检查逻辑
        }, 60000); // 每分钟检查一次
    }
});

// 自定义液态玻璃下拉组件（全局注册）
const GlassSelect = {
    name: 'GlassSelect',
    props: {
        modelValue: { type: [String, Number, Array], default: '' },
        options: { type: Array, required: true }, // [{ value, label }]
        placeholder: { type: String, default: '' },
        disabled: { type: Boolean, default: false },
        multiple: { type: Boolean, default: false }
    },
    emits: ['update:modelValue', 'change'],
    data() {
        return {
            isOpen: false,
            highlightedIndex: -1,
            internalValue: this.modelValue
        };
    },
    watch: {
        modelValue(newVal) {
            this.internalValue = newVal;
        }
    },
    computed: {
        selectedLabel() {
            if (this.multiple && Array.isArray(this.internalValue)) {
                const map = new Map(this.options.map(o => [o.value, o.label]));
                const labels = this.internalValue.map(v => map.get(v)).filter(Boolean);
                return labels.length ? labels.join(', ') : '';
            }
            const found = this.options.find(o => o.value === this.internalValue);
            return found ? found.label : '';
        }
    },
    mounted() {
        this._onClickOutside = (e) => {
            if (!this.$el.contains(e.target)) {
                this.isOpen = false;
            }
        };
        document.addEventListener('click', this._onClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this._onClickOutside);
    },
    methods: {
        toggleDropdown() {
            if (this.disabled) return;
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.$nextTick(() => {
                    this.highlightedIndex = this.options.findIndex(o => o.value === this.internalValue);
                });
            }
        },
        onKeydown(e) {
            if (this.disabled) return;
            if (!this.isOpen && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                this.toggleDropdown();
                return;
            }
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.highlightedIndex = Math.min(this.options.length - 1, this.highlightedIndex + 1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.highlightedIndex = Math.max(0, this.highlightedIndex - 1);
                    break;
                case 'Enter':
                case ' ': // Space
                    e.preventDefault();
                    if (this.isOpen && this.highlightedIndex >= 0) {
                        const opt = this.options[this.highlightedIndex];
                        this.selectOption(opt);
                    } else {
                        this.toggleDropdown();
                    }
                    break;
                case 'Escape':
                    this.isOpen = false;
                    break;
                default:
                    break;
            }
        },
        selectOption(option) {
            if (this.multiple) {
                const set = new Set(Array.isArray(this.internalValue) ? this.internalValue : []);
                if (set.has(option.value)) set.delete(option.value); else set.add(option.value);
                const newVal = Array.from(set);
                this.internalValue = newVal;
                this.$emit('update:modelValue', newVal);
                this.$emit('change', newVal);
            } else {
                this.internalValue = option.value;
                this.$emit('update:modelValue', option.value);
                this.$emit('change', option.value);
                this.isOpen = false;
            }
        },
        isSelected(option) {
            if (this.multiple && Array.isArray(this.internalValue)) {
                return this.internalValue.includes(option.value);
            }
            return this.internalValue === option.value;
        }
    },
    template: `
    <div class="glass-select-wrapper" :class="[disabled ? 'opacity-60 pointer-events-none' : '']">
        <div class="glass-select-trigger glass-effect" tabindex="0" role="combobox" aria-haspopup="listbox" :aria-expanded="isOpen.toString()" @click="toggleDropdown" @keydown="onKeydown">
            <span class="glass-select-value" v-text="selectedLabel || placeholder"></span>
            <i class="fas fa-chevron-down glass-select-caret"></i>
        </div>
        <transition name="fade">
            <ul v-if="isOpen" class="glass-select-menu glass-card" role="listbox">
                <li v-for="(option, index) in options" :key="option.value" class="glass-select-option" :class="{ 'is-selected': isSelected(option), 'is-highlighted': index === highlightedIndex }" role="option" :aria-selected="isSelected(option)" @mouseenter="highlightedIndex = index" @mousedown.prevent @click="selectOption(option)">
                    <span v-text="option.label"></span>
                    <i v-if="isSelected(option)" class="fas fa-check"></i>
                </li>
            </ul>
        </transition>
    </div>
    `
};

// 追加：为应用补充选项源（语言/分类）
app.mixin({
    computed: {
        localeOptions() {
            return [
                { value: 'ar', label: 'العربية' },
                { value: 'bn', label: 'বাংলা' },
                { value: 'de', label: 'Deutsch' },
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Español' },
                { value: 'fr', label: 'Français' },
                { value: 'hi', label: 'हिन्दी' },
                { value: 'id', label: 'Bahasa Indonesia' },
                { value: 'it', label: 'Italiano' },
                { value: 'ja', label: '日本語' },
                { value: 'ko', label: '한국어' },
                { value: 'fa', label: 'فارسی' },
                { value: 'pt', label: 'Português' },
                { value: 'ru', label: 'Русский' },
                { value: 'ur', label: 'اردو' },
                { value: 'ta', label: 'தமிழ்' },
                { value: 'th', label: 'ไทย' },
                { value: 'tr', label: 'Türkçe' },
                { value: 'vi', label: 'Tiếng Việt' },
                { value: 'zh-CN', label: '简体中文' },
                { value: 'zh-TW', label: '繁體中文' }
            ];
        },
        categoryOptions() {
            if (!this.categories) return [];
            return this.categories.map(c => ({ value: c, label: this.$t('categories.' + c) }));
        }
    }
});

// 使用i18n插件与全局组件
app.use(i18n);
app.component('GlassSelect', GlassSelect);

// 挂载应用
app.mount('#app');