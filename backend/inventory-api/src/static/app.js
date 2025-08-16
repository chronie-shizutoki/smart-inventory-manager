// 多语言配置
const messages = {
    en: {
           notifications: {
    itemAdded: 'Item added',
    itemUpdated: 'Item updated',
    itemDeleted: 'Item deleted',
    error: 'Operation failed. Please try again',
    insufficientStock: 'Out of stock: {itemName}',
    itemUsedSuccessfully: 'Used 1 {unit} of {itemName} ({quantity} {unit} left)'
},
alerts: {
    lowStock: 'Low Stock',
    lowStockMessage: 'Only {quantity} {unit} of {item} left',
    expired: 'Expired',
    expiredMessage: '{item} expired {days} days ago',
    expiringSoon: 'Expiring Soon',
    expiringSoonMessage: '{item} expires in {days} days'
},
recommendations: {
    restock: 'Restock {item}',
    restockReason: 'Current stock: {quantity} {unit} (min: {minQuantity} {unit})',
    popular: 'Popular Item',
    popularReason: '{item} is frequently used',
    watch: 'Monitor {item}',
    watchReason: 'Used {count} times in past 30 days',
    consider: 'Restock {item}',
    considerReason: 'Most used in {category} ({count} times)'
},
app: {
    title: 'Smart Home Inventory'
},
nav: {
    inventory: 'Inventory',
    add: 'Add Item',
    analytics: 'Analytics',
    purchaseList: 'Shopping List',
    menu: 'Menu',
    language: 'Language'
},
purchaseList: {
    description: 'Items to restock based on low inventory',
    totalItems: 'Items to Buy',
    currentQuantity: 'Current Qty',
    minQuantity: 'Min Stock',
    suggestedQuantity: 'Suggested Qty',
    unit: 'Unit',
    lastUsed: 'Last Used',
    refresh: 'Update List'
},
inventory: {
    title: 'Inventory',
    search: 'Search items...',
    allCategories: 'All Categories',
    name: 'Item',
    category: 'Category',
    quantity: 'Qty',
    unit: 'Unit',
    expiryDate: 'Expiry',
    status: 'Status',
    actions: 'Actions'
},
categories: { // (unchanged, already good)
    food: 'Food',
    medicine: 'Medicine',
    cleaning: 'Cleaning Supplies',
    personal: 'Personal Care',
    household: 'Household Items',
    electronics: 'Electronics'
},
stats: {
    totalItems: 'Total Items',
    lowStock: 'Low Stock',
    expiringSoon: 'Expiring Soon',
    categories: 'Categories'
},
add: {
    title: 'Add Item',
    editTitle: 'Edit Item',
    name: 'Item Name',
    category: 'Category',
    quantity: 'Quantity',
    unit: 'Unit',
    minQuantity: 'Min Stock',
    expiryDate: 'Expiry Date',
    description: 'Description',
    selectCategory: 'Select Category',
    cancel: 'Cancel',
    save: 'Save',
    update: 'Update'
},
analytics: {
    title: 'Analytics',
    smartAlerts: 'Alerts',
    smartRecommendations: 'Recommendations'
},
status: {
    normal: 'Normal',
    lowStock: 'Low Stock',
    expiringSoon: 'Expiring Soon',
    expired: 'Expired'
}
    },
    ja: {
  "alerts": {
    "lowStock": "残少警告",
    "lowStockMessage": "{item}の在庫が残り{quantity}{unit}です",
    "expired": "期限切れ",
    "expiredMessage": "{item}は{days}日前に期限切れとなりました",
    "expiringSoon": "期限間近警告",
    "expiringSoonMessage": "{item}の有効期限はあと{days}日です"
  },
  "recommendations": {
    "restock": "{item}を補充してください",
    "restockReason": "現在の在庫{quantity}{unit}（最低在庫{minQuantity}{unit}を下回っています）",
    "popular": "人気アイテム",
    "popularReason": "{item}は現在大人気アイテムです",
    "watch": "{item}を要チェック",
    "watchReason": "過去30日間で{count}回使用されています",
    "consider": "{item}の補充を推奨",
    "considerReason": "{category}カテゴリで最多使用（{count}回）"
  },
  "app": {
    "title": "スマート家庭在庫管理"
  },
  "nav": {
    "inventory": "在庫管理",
    "add": "アイテム追加",
    "analytics": "分析ダッシュボード",
    "purchaseList": "買い物リスト",
    "menu": "メニュー",
    "language": "言語設定"
  },
  "purchaseList": {
    "description": "在庫不足アイテムに基づく購入リスト",
    "totalItems": "購入対象アイテム数",
    "currentQuantity": "現在の数量",
    "minQuantity": "最低在庫量",
    "suggestedQuantity": "推奨購入量",
    "unit": "単位",
    "lastUsed": "最終使用日",
    "refresh": "リスト更新"
  },
  "inventory": {
    "title": "在庫一覧",
    "search": "アイテム検索...",
    "allCategories": "すべてのカテゴリ",
    "name": "アイテム名",
    "category": "カテゴリ",
    "quantity": "数量",
    "unit": "単位",
    "expiryDate": "消費期限",
    "status": "状態",
    "actions": "操作"
  },
  "categories": {
    "food": "食品",
    "medicine": "医薬品",
    "cleaning": "掃除用品",
    "personal": "日用品",
    "household": "家庭用品",
    "electronics": "電化製品"
  },
  "stats": {
    "totalItems": "登録アイテム数",
    "lowStock": "残少アイテム",
    "expiringSoon": "期限間近",
    "categories": "カテゴリ数"
  },
  "add": {
    "title": "新規アイテム登録",
    "editTitle": "アイテム編集",
    "name": "品名",
    "category": "カテゴリ",
    "quantity": "在庫数",
    "unit": "単位（例：個、袋）",
    "minQuantity": "最低在庫数",
    "expiryDate": "消費期限",
    "description": "備考",
    "selectCategory": "選択してください",
    "cancel": "キャンセル",
    "save": "保存",
    "update": "更新"
  },
  "analytics": {
    "title": "在庫分析",
    "smartAlerts": "アラート一覧",
    "smartRecommendations": "おすすめアクション"
  },
  "status": {
    "normal": "正常",
    "lowStock": "残少",
    "expiringSoon": "期限間近",
    "expired": "期限切れ"
  },
  "notifications": {
    "itemAdded": "新規登録完了",
    "itemUpdated": "更新完了",
    "itemDeleted": "削除完了",
    "error": "処理に失敗しました",
    "insufficientStock": "{itemName}の在庫が不足しています",
    "itemUsedSuccessfully": "{itemName}を使用しました（残り：{quantity}{unit}）"
  }
    }
}

// Vue应用配置
const { createApp } = Vue;
const { createI18n } = VueI18n;

// 创建i18n实例
// 检测系统语言
const detectSystemLanguage = () => {
    // 优先获取navigator.language
    const browserLang = navigator.language || navigator.userLanguage;
    // 提取语言代码的前两位(如'en-US' -> 'en')
    const langCode = browserLang.split('-')[0];
    // 检查是否在支持的语言列表中
    return Object.keys(messages).includes(langCode) ? langCode : 'en';
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

// 创建Vue应用
const app = createApp({

    // 添加语言切换监听
    watch: {
        currentLocale(newLocale) {
            i18n.global.locale = newLocale;
            updateDocumentTitle();
        },
        currentView(newView) {
            if (newView === 'analytics') {
                this.loadRecommendationsFromAPI();
            }
            if (newView === 'purchaseList') {
                this.loadPurchaseListFromAPI();
            }
        }
    },

    data() {
            return {
                currentView: 'inventory',
                currentLocale: i18n.global.locale,
                searchQuery: '',
                selectedCategory: '',
                editingItem: null,
                showMobileNav: false,
                
                // 表单数据
                form: {
                    name: '',
                    category: '',
                    quantity: 0,
                    unit: '',
                    minQuantity: 0,
                    expiryDate: '',
                    description: ''
                },
                
                // 分类列表
                categories: ['food', 'medicine', 'cleaning', 'personal', 'household', 'electronics'],
                
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
            localStorage.setItem('language', this.currentLocale);
            // 更新页面标题
            document.title = i18n.global.t('app.title');
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
                description: ''
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
        }
    },
    
    watch: {
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

// 使用i18n插件
app.use(i18n);

// 挂载应用
app.mount('#app');

