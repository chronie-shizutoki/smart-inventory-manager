window.zhTWMessages = {
    notifications: {
        barcodeError: '條碼產生失敗',
        itemAdded: '物品新增成功',
        itemUpdated: '物品更新成功',
        itemDeleted: '物品刪除成功',
        error: '操作失敗，請稍後重試',
        insufficientStock: '庫存不足：{itemName}',
        itemUsedSuccessfully: '已使用 1 {unit} {itemName}（剩餘 {quantity} {unit}）',
        itemFound: '物品尋找成功',
        itemNotFound: '未找到該物品',
        barcodeScanned: '條碼掃描成功',
        invalidImageType: '圖片格式無效，請選擇圖片檔案',
        processingImage: '圖片處理中...',
        noBarcodeFound: '未識別到圖片中的條碼',
        imageProcessingError: '圖片處理出錯'
    },
    alerts: {
        lowStock: '庫存預警',
        lowStockMessage: '{item} 庫存僅剩 {quantity} {unit}',
        expired: '物品已過期',
        expiredMessage: '{item} 已過期 {days} 天',
        expiringSoon: '即將過期',
        expiringSoonMessage: '{item} 將在 {days} 天後過期'
    },
    recommendations: {
        restock: '建議補充 {item}',
        restockReason: '目前庫存：{quantity} {unit}（安全存量：{minQuantity} {unit}）',
        popular: '常用物品',
        popularReason: '{item} 使用頻率較高',
        watch: '關注 {item}',
        watchReason: '近 30 天使用 {count} 次',
        consider: '建議考慮補充 {item}',
        considerReason: '在「{category}」類別中使用最多（{count} 次）'
    },
    app: {
        title: '智慧家居庫存管理系統'
    },
    nav: {
        inventory: '庫存管理',
        add: '新增物品',
        analytics: '數據分析',
        purchaseList: '採購清單',
        menu: '選單',
        language: '語言設定'
    },
    purchaseList: {
        description: '根據庫存狀態生成的智能補貨清單',
        totalItems: '待採購物品',
        currentQuantity: '目前數量',
        minQuantity: '安全存量',
        suggestedQuantity: '建議採購量',
        unit: '單位',
        lastUsed: '最後使用時間',
        refresh: '重新整理清單'
    },
    inventory: {
        title: '庫存清單',
        search: '搜尋物品名稱...',
        allCategories: '全部分類',
        name: '物品名稱',
        category: '物品類別',
        quantity: '庫存數量',
        unit: '單位',
        expiryDate: '有效期限',
        status: '狀態',
        actions: '操作',
        scanBarcode: '掃碼辨識'
    },
    categories: {
        food: '食品',
        medicine: '藥品',
        cleaning: '清潔用品',
        personal: '個人護理',
        household: '家居用品',
        electronics: '電子產品'
    },
    stats: {
        totalItems: '物品總數',
        lowStock: '低庫存預警',
        expiringSoon: '即將到期物品',
        categories: '分類統計'
    },
    add: {
        title: '新增物品',
        editTitle: '編輯物品資訊',
        name: '物品名稱',
        category: '物品類別',
        quantity: '目前數量',
        unit: '計量單位',
        minQuantity: '安全存量',
        expiryDate: '有效期限',
        description: '物品描述',
        selectCategory: '選擇類別',
        cancel: '取消',
        save: '儲存',
        update: '更新',
        barcode: '條碼',
        barcodeType: '條碼類型',
        enterBarcode: '輸入或產生條碼',
        generateBarcode: '產生條碼',
        barcodePreview: '條碼預覽',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: '請將條碼置於掃描框內',
        positionBarcode: '對準條碼至掃描區域',
        startScan: '開始掃描',
        stopScan: '停止掃描',
        browserNotSupported: '目前瀏覽器不支援相機存取',
        cameraPermissionDenied: '相機權限未開啟',
        noCameraFound: '未偵測到相機裝置',
        cameraInUse: '相機被其他程式占用',
        scan: '掃描辨識',
        orUploadImage: '或上傳圖片',
        uploadImage: '上傳圖片'
    },
    analytics: {
        title: '數據分析',
        smartAlerts: '智能提醒',
        smartRecommendations: '個人化推薦'
    },
    status: {
        normal: '庫存正常',
        lowStock: '庫存不足',
        expiringSoon: '即將到期',
        expired: '已過期'
    }
};