window.zhTWMessages = {
    notifications: {
        itemAdded: '物品新增成功',
        itemUpdated: '物品更新成功',
        itemDeleted: '物品刪除成功',
        error: '操作失敗，請稍後重試',
        insufficientStock: '庫存不足：{itemName}',
        itemUsedSuccessfully: '已使用 1 {unit} {itemName}（剩餘 {quantity} {unit}）'
    },
    app: {
        title: '智慧家居庫存管理系統'
    },
    nav: {
        inventory: '庫存管理',
        add: '新增物品',
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
        refresh: '重新整理清單',
        print: '列印清單'
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
        showExpired: '顯示不只已過期的物品'
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
        update: '更新'
    },
    status: {
        normal: '庫存正常',
        lowStock: '庫存不足',
        expiringSoon: '即將到期',
        expired: '已過期'
    },
    aiRecord: {
        title: 'AI紀錄生成器',
        description: '使用AI從圖片快速生成庫存紀錄',
        apiKey: 'SiliconFlow API金鑰',
        apiKeyRequired: '請輸入API金鑰',
        noImagesSelected: '請至少選擇一張圖片',
        apiKeyHint: '您可以從SiliconFlow控制台取得API金鑰',
        uploadImages: '上傳圖片',
        dragDropOrClick: '拖拽檔案至此處或點擊上傳',
        supportedFormats: '支援JPG、PNG、WebP格式（最多10張）',
        uploadedImages: '已上傳圖片',
        generateRecords: '生成紀錄',
        aiRecordButton: 'AI紀錄/顯示多紀錄添加弹窗（生成/取得完成後點擊）',
        generating: '正在生成紀錄...',
        generatingRecords: '正在生成紀錄，請稍候...',
        success: '紀錄生成成功',
        error: '紀錄生成失敗',
        failedToGenerate: '未能生成紀錄，請檢查您的圖片和API金鑰',
        recordsGenerated: '紀錄已生成',
        reviewAndConfirm: '請檢查並確認以下生成的紀錄',
        noRecordsGenerated: '沒有生成任何紀錄',
        confirmAdd: '確認添加',
        editRecord: '編輯紀錄'
    },
    expense: {
        fetchData: '從家庭記帳本取得最近7天的消費資料以更新庫存',
        fetchingData: '正在取得資料，請稍候...',
        dataFetched: '資料成功取得',
        noValidData: '沒有有效的資料'
    }
};