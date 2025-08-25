window.zhCNMessages = {
    notifications: {
        barcodeError: '条形码生成失败',
        itemAdded: '物品添加成功',
        itemUpdated: '物品更新成功',
        itemDeleted: '物品删除成功',
        error: '操作失败，请稍后重试',
        insufficientStock: '库存不足：{itemName}',
        itemUsedSuccessfully: '已使用 1 {unit} {itemName}（剩余 {quantity} {unit}）',
        itemFound: '物品查找成功',
        itemNotFound: '未找到该物品',
        barcodeScanned: '条形码扫描成功',
        invalidImageType: '图片格式无效，请选择图片文件',
        processingImage: '图片处理中...',
        noBarcodeFound: '未识别到图片中的条形码',
        imageProcessingError: '图片处理出错'
    },
    alerts: {
        lowStock: '库存预警',
        lowStockMessage: '{item} 库存仅剩 {quantity} {unit}',
        expired: '物品已过期',
        expiredMessage: '{item} 已过期 {days} 天',
        expiringSoon: '即将过期',
        expiringSoonMessage: '{item} 将在 {days} 天后过期'
    },
    recommendations: {
        restock: '建议补充 {item}',
        restockReason: '当前库存：{quantity} {unit}（最低存量：{minQuantity} {unit}）',
        popular: '常用物品',
        popularReason: '{item} 使用频率较高',
        watch: '关注 {item}',
        watchReason: '近 30 天使用 {count} 次',
        consider: '建议考虑补充 {item}',
        considerReason: '在「{category}」类别中使用最多（{count} 次）'
    },
    app: {
        title: '智能家居库存管理系统'
    },
    nav: {
        inventory: '库存管理',
        add: '添加物品',
        analytics: '数据分析',
        purchaseList: '采购清单',
        menu: '菜单',
        language: '语言设置'
    },
    purchaseList: {
        description: '根据库存状态生成的智能补货清单',
        totalItems: '待采购物品',
        currentQuantity: '当前数量',
        minQuantity: '最低存量',
        suggestedQuantity: '建议补货量',
        unit: '单位',
        lastUsed: '最后使用时间',
        refresh: '刷新清单'
    },
    inventory: {
        title: '库存清单',
        search: '搜索物品名称...',
        allCategories: '全部类别',
        name: '物品名称',
        category: '物品类别',
        quantity: '库存数量',
        unit: '单位',
        expiryDate: '过期日期',
        status: '状态',
        actions: '操作',
        scanBarcode: '扫码识别'
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
        lowStock: '低库存预警',
        expiringSoon: '临期物品',
        categories: '分类统计'
    },
    add: {
        title: '新增物品',
        editTitle: '编辑物品信息',
        name: '物品名称',
        category: '物品类别',
        quantity: '当前数量',
        unit: '计量单位',
        minQuantity: '最低存量',
        expiryDate: '过期日期',
        description: '物品描述',
        selectCategory: '选择类别',
        cancel: '取消',
        save: '保存',
        update: '更新',
        barcode: '条形码',
        barcodeType: '条码类型',
        enterBarcode: '输入或生成条形码',
        generateBarcode: '生成条码',
        barcodePreview: '条码预览',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: '请将条形码置于扫描框内',
        positionBarcode: '对准条形码至扫描区域',
        startScan: '开始扫描',
        stopScan: '停止扫描',
        browserNotSupported: '当前浏览器不支持摄像头访问',
        cameraPermissionDenied: '摄像头权限未开启',
        noCameraFound: '未检测到摄像头设备',
        cameraInUse: '摄像头被其他程序占用',
        scan: '扫描识别',
        orUploadImage: '或上传图片',
        uploadImage: '上传图片'
    },
    analytics: {
        title: '数据分析',
        smartAlerts: '智能提醒',
        smartRecommendations: '个性化推荐'
    },
    status: {
        normal: '库存正常',
        lowStock: '库存不足',
        expiringSoon: '即将过期',
        expired: '已过期'
    }
};