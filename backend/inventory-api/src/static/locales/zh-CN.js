window.zhCNMessages = {
    notifications: {
        itemAdded: '物品添加成功',
        itemUpdated: '物品更新成功',
        itemDeleted: '物品删除成功',
        error: '操作失败，请稍后重试',
        insufficientStock: '库存不足：{itemName}',
        itemUsedSuccessfully: '已使用 1 {unit} {itemName}（剩余 {quantity} {unit}）'
    },
    app: {
        title: '智能家居库存管理系统'
    },
    nav: {
        inventory: '库存管理',
        add: '添加物品',
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
        refresh: '刷新清单',
        print: '打印清单'
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
        showExpired: '显示所有物品'
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
        update: '更新'
    },
    status: {
        normal: '库存正常',
        lowStock: '库存不足',
        expiringSoon: '即将过期',
        expired: '已过期'
    },
    aiRecord: {
        title: 'AI记录生成器',
        description: '使用AI从图片快速生成库存记录',
        apiKey: 'SiliconFlow API密钥',
        apiKeyRequired: '请输入API密钥',
        noImagesSelected: '请至少选择一张图片',
        apiKeyHint: '您可以从SiliconFlow控制台获取API密钥',
        uploadImages: '上传图片',
        dragDropOrClick: '拖拽文件至此处或点击上传',
        supportedFormats: '支持JPG、PNG、WebP格式（最多10张）',
        uploadedImages: '已上传图片',
        generateRecords: '生成记录',
        aiRecordButton: 'AI记录',
        generating: '正在生成记录...',
        generatingRecords: '正在生成记录，请稍候...',
        success: '记录生成成功',
        error: '记录生成失败',
        failedToGenerate: '未能生成记录，请检查您的图片和API密钥',
        recordsGenerated: '记录已生成',
        reviewAndConfirm: '请检查并确认以下生成的记录',
        noRecordsGenerated: '没有生成任何记录',
        confirmAdd: '确认添加',
        editRecord: '编辑记录'
    }
};