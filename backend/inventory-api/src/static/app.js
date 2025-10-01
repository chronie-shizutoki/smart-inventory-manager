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

// 更新条形码扫描模态框的翻译
function updateScannerModalTranslations() {
    const modal = document.getElementById('barcode-scanner-modal');
    if (!modal) return;

    // 更新模态框中的翻译文本
    const scanMessage = modal.querySelector('h3');
    if (scanMessage) scanMessage.textContent = i18n.global.t('add.scanBarcodeMessage');

    const positionMessage = modal.querySelector('.text-sm.opacity-90');
    if (positionMessage) positionMessage.textContent = i18n.global.t('add.positionBarcode');

    const orUploadText = modal.querySelector('.text-sm.mb-3.opacity-80');
    if (orUploadText) orUploadText.textContent = i18n.global.t('add.orUploadImage');

    const uploadButton = modal.querySelector('#barcode-image-upload + label');
    if (uploadButton) {
        const icon = uploadButton.querySelector('i');
        uploadButton.textContent = i18n.global.t('add.uploadImage');
        if (icon) uploadButton.prepend(icon);
    }

    // 更新输入框的placeholder翻译
    const inputElements = document.querySelectorAll('input[aria-label*="输入条形码或生成一个"]');
    inputElements.forEach(input => {
        input.placeholder = i18n.global.t('add.enterBarcode');
        input.setAttribute('aria-label', i18n.global.t('add.enterBarcode'));
    });

    // 确保label元素的翻译正确
    const labelElement = document.querySelector('label[for="barcode-image-upload"]');
    if (labelElement) {
        const icon = labelElement.querySelector('i');
        labelElement.textContent = i18n.global.t('add.uploadImage');
        if (icon) labelElement.prepend(icon);
    }
}

// 初始设置标题
updateDocumentTitle();
// 初始更新模态框翻译
updateScannerModalTranslations();

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
        barcodeType: 'ean13', // 默认条形码类型
        
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
        },
        
        // 扫描目的
        scanPurpose: 'locate' // 默认扫描目的为定位物品
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
            // 清除条形码预览
            const barcodeElement = document.getElementById('barcode');
            if (barcodeElement) {
                barcodeElement.innerHTML = '';
            }
        },

        // 生成条形码
        generateBarcode() {
            // 根据不同类型生成条形码
            let barcodeValue;
            if (this.barcodeType === 'ean13') {
                barcodeValue = this.generateEAN13();
            } else if (this.barcodeType === 'upca') {
                barcodeValue = this.generateUPCA();
            } else {
                barcodeValue = this.generateEAN13(); // 默认生成EAN13
            }

            this.form.barcode = barcodeValue;
            this.renderBarcode();
        },

        // 生成EAN-13条形码
        generateEAN13() {
            // 生成12位随机数字
            let code = '';
            for (let i = 0; i < 12; i++) {
                code += Math.floor(Math.random() * 10);
            }

            // 计算校验位
            let sum = 0;
            for (let i = 0; i < 12; i++) {
                if (i % 2 === 0) {
                    sum += parseInt(code.charAt(i)) * 1;
                } else {
                    sum += parseInt(code.charAt(i)) * 3;
                }
            }
            const checkDigit = (10 - (sum % 10)) % 10;
            return code + checkDigit;
        },

        // 生成UPC-A条形码
        generateUPCA() {
            // 生成11位随机数字
            let code = '';
            for (let i = 0; i < 11; i++) {
                code += Math.floor(Math.random() * 10);
            }

            // 计算校验位
            let sum = 0;
            for (let i = 0; i < 11; i++) {
                if (i % 2 === 0) {
                    sum += parseInt(code.charAt(i)) * 3;
                } else {
                    sum += parseInt(code.charAt(i)) * 1;
                }
            }
            const checkDigit = (10 - (sum % 10)) % 10;
            return code + checkDigit;
        },

        // 渲染条形码
        renderBarcode() {
            if (this.form.barcode) {
                try {
                    const barcodeElement = document.getElementById('barcode');
                    if (barcodeElement) {
                        barcodeElement.innerHTML = '';
                        
                        // 检测是否为深色模式
                        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                        
                        // 根据模式设置不同的颜色
                        const barcodeColor = isDarkMode ? '#ffffff' : '#000000';
                        const textColor = isDarkMode ? '#ffffff' : '#000000';
                        
                        // 渲染条形码
                        JsBarcode(barcodeElement, this.form.barcode, {
                            format: this.barcodeType === 'ean13' ? 'EAN13' : 'UPC',
                            width: 2,
                            height: 100,
                            displayValue: true,
                            lineColor: barcodeColor,
                            textColor: textColor,
                            margin: 0,
                            background: undefined // 不设置背景色，使其真正透明
                        });
                        
                        // 确保SVG元素本身没有fill属性或设置为none
                        const svgElement = barcodeElement.querySelector('svg');
                        if (svgElement) {
                            svgElement.setAttribute('fill', 'none');
                            svgElement.style.backgroundColor = 'transparent';
                        }
                        
                        // 动态设置容器背景颜色以匹配深色模式
                        const barcodeContainer = barcodeElement.parentElement;
                        if (barcodeContainer) {
                            if (isDarkMode) {
                                barcodeContainer.classList.remove('bg-white');
                                barcodeContainer.classList.add('bg-gray-800', 'bg-opacity-70');
                            } else {
                                barcodeContainer.classList.remove('bg-gray-800', 'bg-opacity-70');
                                barcodeContainer.classList.add('bg-white');
                            }
                        }
                    }
                } catch (error) {
                    console.error('Failed to render barcode:', error);
                    this.showNotification(this.$t('notifications.barcodeError'), 'error');
                }
            }
        },

        // 打开条形码扫描模态框
        scanBarcode() {
            const modal = document.getElementById('barcode-scanner-modal');
            if (modal) {
                modal.classList.add('show');
                // 设置扫描目的为定位物品
                this.scanPurpose = 'locate';
                // 打开时更新翻译
                updateScannerModalTranslations();
                this.startScanner();
            }
        },

        // 打开编辑界面的条形码扫描
        scanBarcodeForForm() {
            const modal = document.getElementById('barcode-scanner-modal');
            if (modal) {
                modal.classList.add('show');
                // 设置扫描目的为填充表单
                this.scanPurpose = 'form';
                // 打开时更新翻译
                updateScannerModalTranslations();
                this.startScanner();
            }
        },

        // 关闭条形码扫描模态框
        closeScanner() {
            const modal = document.getElementById('barcode-scanner-modal');
            if (modal) {
                modal.classList.remove('show');
                this.stopScanner();
            }
        },

        // 初始化扫描器事件
        initScannerEvents() {
            const closeBtn = document.getElementById('close-scanner');

            if (closeBtn) {
                closeBtn.onclick = () => this.closeScanner();
            }
        },

        // 启动扫描器
        startScanner() {
            const scannerView = document.getElementById('scanner-view');

            if (!scannerView) return;

            // 检查浏览器兼容性
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.error('getUserMedia is not supported in this browser');
                this.showNotification(this.$t('notifications.barcodeError') + ': ' + this.$t('add.browserNotSupported'), 'error');
                return;
            }

            // 额外检查以确保getUserMedia可用
            if (typeof navigator.mediaDevices.getUserMedia !== 'function') {
                console.error('getUserMedia is not a function');
                this.showNotification(this.$t('notifications.barcodeError') + ': ' + this.$t('add.browserNotSupported'), 'error');
                return;
            }

            // 申请摄像头权限
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                .then(stream => {
                    try {
                        Quagga.init({
                            inputStream: {
                                name: 'Live',
                                type: 'LiveStream',
                                target: scannerView,
                                constraints: {
                                    facingMode: 'environment'
                                }
                            },
                            decoder: {
                                readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'upc_reader', 'upc_e_reader'],
                                debug: {
                                    showCanvas: false,
                                    showPatches: false,
                                    showFoundPatches: false,
                                    showSkeleton: false,
                                    showLabels: false,
                                    showPatchLabels: false,
                                    showRemainingPatchLabels: false,
                                    boxFromPatches: { x: 0, y: 0, width: 0, height: 0 }
                                }
                            },
                            locate: true
                        }, (err) => {
                            if (err) {
                                console.error('Failed to initialize Quagga:', err);
                                this.showNotification(this.$t('notifications.barcodeError') + ': ' + err.message, 'error');
                                return;
                            }

                            Quagga.start();

                            // 设置结果事件监听器
                            Quagga.onDetected(this.handleScanResult.bind(this));
                        });
                    } catch (error) {
                        console.error('Error initializing scanner:', error);
                        this.showNotification(this.$t('notifications.barcodeError') + ': ' + error.message, 'error');
                    }
                })
                .catch(error => {
                    console.error('Camera permission error:', error);
                    if (error.name === 'NotAllowedError') {
                        this.showNotification(this.$t('notifications.barcodeError') + ': ' + this.$t('add.cameraPermissionDenied'), 'error');
                    } else if (error.name === 'NotFoundError') {
                        this.showNotification(this.$t('notifications.barcodeError') + ': ' + this.$t('add.noCameraFound'), 'error');
                    } else if (error.name === 'NotReadableError') {
                        this.showNotification(this.$t('notifications.barcodeError') + ': ' + this.$t('add.cameraInUse'), 'error');
                    } else {
                        this.showNotification(this.$t('notifications.barcodeError') + ': ' + error.message, 'error');
                    }
                });

            // 权限申请和初始化已在上方完成
            // 此处代码已被移至权限申请成功的回调函数中
                  // 所有初始化代码已移至权限申请成功的回调函数中
        },

        // 停止扫描器
        stopScanner() {
            if (Quagga && Quagga.stop) {
                try {
                    Quagga.stop();
                } catch (error) {
                    console.error('Failed to stop scanner:', error);
                }
            }
        },

        // 处理扫描结果
        handleScanResult(result) {
            if (result && result.codeResult && result.codeResult.code) {
                const barcodeValue = result.codeResult.code;
                console.log('Barcode scanned:', barcodeValue);
                
                if (this.scanPurpose === 'form') {
                    // 表单扫描: 填充表单并渲染条形码
                    this.form.barcode = barcodeValue;
                    this.renderBarcode();
                    this.showNotification(this.$t('notifications.barcodeScanned'), 'success');
                } else if (this.scanPurpose === 'locate') {
                    // 定位扫描: 直接定位物品
                    this.locateItemByBarcode(barcodeValue);
                }
                
                this.closeScanner();
            }
        },

        // 初始化文件上传事件监听
        initImageUploadListener() {
            const fileInput = document.getElementById('barcode-image-upload');
            if (fileInput) {
                fileInput.addEventListener('change', this.handleImageUpload.bind(this));
            }
        },

        // 处理图像上传
        handleImageUpload(event) {
            console.log('handleImageUpload function called');
            console.log('Event:', event);
            console.log('Image upload event triggered');
            const file = event.target.files[0];
            if (!file) return;

            // 检查文件类型
            if (!file.type.startsWith('image/')) {
                this.showNotification(this.$t('notifications.invalidImageType'), 'error');
                return;
            }

            // 显示加载通知
            this.showNotification(this.$t('notifications.processingImage'), 'info');

            // 创建FormData对象
            const formData = new FormData();
            formData.append('image', file);

            // 发送到服务器识别条形码
            console.log('Sending barcode recognition request to /api/barcode/recognize');
            console.log('File:', file);
            console.log('Form data has image:', formData.has('image'));
            console.log('Initiating fetch request to /api/barcode/recognize');
            fetch('/api/barcode/recognize', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    console.log('Response headers:', response.headers);
                    return response.json()
                        .then(errorData => {
                            console.log('Error data:', errorData);
                            throw new Error(errorData.message || 'Server error');
                        })
                }
                return response.json();
            })
            .then(result => {
                if (result.success && result.barcode) {
                    const barcodeValue = result.barcode;
                    console.log('Barcode recognized from image:', barcodeValue);

                    if (this.scanPurpose === 'form') {
                        // 表单扫描: 填充表单并渲染条形码
                        this.form.barcode = barcodeValue;
                        this.renderBarcode();
                        this.showNotification(this.$t('notifications.barcodeScanned'), 'success');
                    } else if (this.scanPurpose === 'locate') {
                        // 定位扫描: 直接定位物品
                        this.locateItemByBarcode(barcodeValue);
                    }
                } else {
                    this.showNotification(this.$t('notifications.noBarcodeFound'), 'error');
                }
                this.closeScanner();
            })
            .catch(error => {
                console.error('Error recognizing barcode from image:', error);
                this.showNotification(error.message || this.$t('notifications.serverError'), 'error');
                this.closeScanner();
            });

            // 重置文件输入
            event.target.value = '';
        },

        // 通过条形码定位物品
        locateItemByBarcode(barcode) {
            // 切换到库存列表视图
            this.currentView = 'inventory';
            
            // 查找匹配的物品
            const matchedItem = this.items.find(item => item.barcode === barcode);
            
            if (matchedItem) {
                // 滚动到匹配的物品
                setTimeout(() => {
                    const element = document.getElementById(`item-${matchedItem.id}`);
                    if (element) {
                        // 添加高亮效果
                        element.classList.add('bg-yellow-100');
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // 3秒后移除高亮效果
                        setTimeout(() => {
                            element.classList.remove('bg-yellow-100');
                        }, 3000);
                    }
                }, 500);
                
                this.showNotification(`${this.$t('notifications.itemFound')}: ${matchedItem.name}`, 'success');
            } else {
                this.showNotification(`${this.$t('notifications.itemNotFound')}: ${barcode}`, 'warning');
            }
        },

        // 初始化扫描器事件（页面加载时）
        initScanModal() {
            // 为关闭按钮添加事件监听
            const closeBtn = document.getElementById('close-scanner');
            if (closeBtn) {
                closeBtn.onclick = () => this.closeScanner();
            }
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
                    console.log('Item saved successfully with barcode:', itemData.barcode);
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
                            barcode: record.barcode,
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
            updateScannerModalTranslations(); // 语言切换时更新模态框翻译
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
        this.initScannerEvents(); // 初始化扫描器事件
        // 延迟初始化图像上传监听，确保DOM已经加载完成
        setTimeout(() => {
            this.initImageUploadListener(); // 初始化图像上传监听
        }, 100);
        
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

