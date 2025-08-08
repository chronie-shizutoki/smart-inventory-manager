// 多语言配置
const messages = {
    zh: {
        alerts: {
            lowStock: '库存不足',
            lowStockMessage: '{item} 库存仅剩 {quantity} {unit}',
            expired: '物品已过期',
            expiredMessage: '{item} 已过期 {days} 天',
            expiringSoon: '即将过期',
            expiringSoonMessage: '{item} 将在 {days} 天后过期'
        },
        recommendations: {
            restock: '建议补充 {item}',
            restockReason: '当前库存 {quantity} {unit}，低于最低库存 {minQuantity} {unit}',
            popular: '热门物品推荐',
            popularReason: '{item} 是当前最受欢迎的物品之一',
            watch: '关注 {item}',
            watchReason: '{item} 在过去 30 天内被使用了 {count} 次',
            consider: '考虑补充 {item}',
            considerReason: '{item} 是 {category} 类别中最常用的物品，已被使用 {count} 次'
        },
        app: {
            title: '智能家庭库存管理'
        },
        nav: {
            inventory: '库存管理',
            add: '添加物品',
            analytics: '智能分析',
            menu: '菜单',
            language: '语言'
        },
        inventory: {
            title: '库存列表',
            search: '搜索物品...',
            allCategories: '所有分类',
            name: '物品名称',
            category: '分类',
            quantity: '数量',
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
            totalItems: '总物品数',
            lowStock: '库存不足',
            expiringSoon: '即将过期',
            categories: '分类数量'
        },
        add: {
            title: '添加新物品',
            editTitle: '编辑物品',
            name: '物品名称',
            category: '分类',
            quantity: '数量',
            unit: '单位',
            minQuantity: '最低库存',
            expiryDate: '过期日期',
            description: '描述',
            selectCategory: '请选择分类',
            cancel: '取消',
            save: '保存',
            update: '更新'
        },
        analytics: {
            title: '智能分析',
            smartAlerts: '智能提醒',
            smartRecommendations: '智能推荐'
        },
        status: {
            normal: '正常',
            lowStock: '库存不足',
            expiringSoon: '即将过期',
            expired: '已过期'
        },
        notifications: {
            itemAdded: '物品添加成功',
            itemUpdated: '物品更新成功',
            itemDeleted: '物品删除成功',
            error: '操作失败，请重试'
        }
    },
    en: {
        alerts: {
            lowStock: 'Low Stock',
            lowStockMessage: '{item} only has {quantity} {unit} left',
            expired: 'Item Expired',
            expiredMessage: '{item} expired {days} days ago',
            expiringSoon: 'Expiring Soon',
            expiringSoonMessage: '{item} will expire in {days} days'
        },
        recommendations: {
            restock: 'Recommend replenishing {item}',
            restockReason: 'Current stock {quantity} {unit}, below minimum stock {minQuantity} {unit}',
            popular: 'Popular Item Recommendation',
            popularReason: '{item} is one of the most popular items currently',
            watch: 'Watch {item}',
            watchReason: '{item} has been used {count} times in the past 30 days',
            consider: 'Consider replenishing {item}',
            considerReason: '{item} is the most used item in {category} category, used {count} times'
        },
        app: {
            title: 'Smart Home Inventory Manager'
        },
        nav: {
            inventory: 'Inventory',
            add: 'Add Item',
            analytics: 'Analytics',
            menu: 'Menu',
            language: 'Language'
        },
        inventory: {
            title: 'Inventory List',
            search: 'Search items...',
            allCategories: 'All Categories',
            name: 'Item Name',
            category: 'Category',
            quantity: 'Quantity',
            expiryDate: 'Expiry Date',
            status: 'Status',
            actions: 'Actions'
        },
        categories: {
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
            title: 'Add New Item',
            editTitle: 'Edit Item',
            name: 'Item Name',
            category: 'Category',
            quantity: 'Quantity',
            unit: 'Unit',
            minQuantity: 'Minimum Stock',
            expiryDate: 'Expiry Date',
            description: 'Description',
            selectCategory: 'Select Category',
            cancel: 'Cancel',
            save: 'Save',
            update: 'Update'
        },
        analytics: {
            title: 'Smart Analytics',
            smartAlerts: 'Smart Alerts',
            smartRecommendations: 'Smart Recommendations'
        },
        status: {
            normal: 'Normal',
            lowStock: 'Low Stock',
            expiringSoon: 'Expiring Soon',
            expired: 'Expired'
        },
        notifications: {
            itemAdded: 'Item added successfully',
            itemUpdated: 'Item updated successfully',
            itemDeleted: 'Item deleted successfully',
            error: 'Operation failed, please try again'
        }
    },
    ja: {
        alerts: {
            lowStock: '在庫不足',
            lowStockMessage: '{item} の在庫は残り {quantity} {unit} です',
            expired: 'アイテムの有効期限切れ',
            expiredMessage: '{item} の有効期限が {days} 日前に切れました',
            expiringSoon: '期限切れ間近',
            expiringSoonMessage: '{item} の有効期限は {days} 日後に切れます'
        },
        recommendations: {
            restock: '{item}の補充を推奨',
            restockReason: '現在の在庫 {quantity} {unit}、最低在庫 {minQuantity} {unit} を下回っています',
            popular: '人気アイテム推奨',
            popularReason: '{item} は現在最も人気のあるアイテムの一つです',
            watch: '{item}に注目',
            watchReason: '{item} は過去30日間で {count} 回使用されました',
            consider: '{item}の補充を検討',
            considerReason: '{item} は {category} カテゴリで最もよく使用されているアイテムで、{count} 回使用されました'
        },
        app: {
            title: 'スマート家庭在庫管理'
        },
        nav: {
            inventory: '在庫管理',
            add: 'アイテム追加',
            analytics: 'スマート分析',
            menu: 'メニュー',
            language: '言語'
        },
        inventory: {
            title: '在庫リスト',
            search: 'アイテムを検索...',
            allCategories: '全カテゴリ',
            name: 'アイテム名',
            category: 'カテゴリ',
            quantity: '数量',
            expiryDate: '有効期限',
            status: 'ステータス',
            actions: '操作'
        },
        categories: {
            food: '食品',
            medicine: '薬品',
            cleaning: '清掃用品',
            personal: 'パーソナルケア',
            household: '家庭用品',
            electronics: '電子機器'
        },
        stats: {
            totalItems: '総アイテム数',
            lowStock: '在庫不足',
            expiringSoon: '期限切れ間近',
            categories: 'カテゴリ数'
        },
        add: {
            title: '新しいアイテムを追加',
            editTitle: 'アイテムを編集',
            name: 'アイテム名',
            category: 'カテゴリ',
            quantity: '数量',
            unit: '単位',
            minQuantity: '最小在庫',
            expiryDate: '有効期限',
            description: '説明',
            selectCategory: 'カテゴリを選択',
            cancel: 'キャンセル',
            save: '保存',
            update: '更新'
        },
        analytics: {
            title: 'スマート分析',
            smartAlerts: 'スマートアラート',
            smartRecommendations: 'スマート推奨'
        },
        status: {
            normal: '正常',
            lowStock: '在庫不足',
            expiringSoon: '期限切れ間近',
            expired: '期限切れ'
        },
        notifications: {
            itemAdded: 'アイテムが正常に追加されました',
            itemUpdated: 'アイテムが正常に更新されました',
            itemDeleted: 'アイテムが正常に削除されました',
            error: '操作に失敗しました。再試行してください'
        }
    }
};

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
                    // 确保消息存在，如果不存在则显示默认消息
                    const message = result.message || '物品使用记录已更新';
                    this.showNotification(message, 'success');
                    return true;
                }
            } catch (error) {
                console.error('Failed to record item usage:', error);
                this.showNotification('error', '记录物品使用情况失败');
            }
            return false;
        },

        // 格式化日期
        formatDate(dateString) {
            if (!dateString) return '-';
            const date = new Date(dateString);
            return date.toLocaleDateString(this.currentLocale === 'zh' ? 'zh-CN' : this.currentLocale);
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

