window.jaMessages = {
    alerts: {
        lowStock: '在庫不足警告',
        lowStockMessage: '{item}の在庫が残り{quantity}{unit}です',
        expired: '期限切れ',
        expiredMessage: '{item}は{days}日前に期限切れになりました',
        expiringSoon: '期限間近',
        expiringSoonMessage: '{item}の有効期限はあと{days}日です'
    },
    recommendations: {
        restock: '{item}を補充してください',
        restockReason: '現在の在庫：{quantity}{unit}（最低在庫{minQuantity}{unit}を下回っています）',
        popular: '人気アイテム',
        popularReason: '{item}は現在よく使用されています',
        watch: '{item}を要確認',
        watchReason: '過去30日間で{count}回使用されました',
        consider: '{item}の補充を推奨',
        considerReason: '{category}カテゴリで最多使用（{count}回）'
    },
    app: {
        title: 'スマート家庭在庫管理'
    },
    nav: {
        inventory: '在庫一覧',
        add: 'アイテム追加',
        analytics: '分析ダッシュボード',
        purchaseList: '購入リスト',
        menu: 'メニュー',
        language: '言語'
    },
    purchaseList: {
        description: '在庫が不足しているアイテムの購入リスト',
        totalItems: '購入アイテム数',
        currentQuantity: '現在の数量',
        minQuantity: '最低在庫数量',
        suggestedQuantity: '推奨購入数量',
        unit: '単位',
        lastUsed: '最終使用日',
        refresh: '更新'
    },
    inventory: {
        title: '在庫一覧',
        search: 'アイテムを検索...',
        allCategories: 'すべてのカテゴリ',
        name: 'アイテム名',
        category: 'カテゴリ',
        quantity: '数量',
        unit: '単位',
        expiryDate: '賞味期限',
        status: 'ステータス',
        actions: '操作',
        scanBarcode: 'バーコードをスキャン'
    },
    categories: {
        food: '食品',
        medicine: '医薬品',
        cleaning: '掃除用品',
        personal: '日用品',
        household: '家庭用品',
        electronics: '電化製品'
    },
    stats: {
        totalItems: '総アイテム数',
        lowStock: '在庫不足',
        expiringSoon: '期限間近',
        categories: 'カテゴリ数'
    },
    add: {
        title: 'アイテムを追加',
        editTitle: 'アイテムを編集',
        name: '品名',
        category: 'カテゴリ',
        quantity: '数量',
        unit: '単位（例：個、袋）',
        minQuantity: '最低在庫数量',
        expiryDate: '賞味期限',
        description: '説明',
        selectCategory: '選択してください',
        cancel: 'キャンセル',
        save: '保存',
        update: '更新',
        barcode: 'バーコード',
        barcodeType: 'バーコードタイプ',
        enterBarcode: 'バーコードを入力または生成',
        generateBarcode: '生成',
        barcodePreview: 'バーコードプレビュー',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'バーコードを枠内に合わせてください',
        positionBarcode: 'バーコードを枠内に合わせてください',
        cameraInUse: 'カメラは他のアプリで使用中です',
        startScan: 'スキャン開始',
        stopScan: 'スキャン停止',
        browserNotSupported: 'このブラウザはカメラに対応していません',
        cameraPermissionDenied: 'カメラの使用許可がありません',
        noCameraFound: 'カメラが見つかりません',
        scan: 'スキャン',
        orUploadImage: 'または画像をアップロード',
        uploadImage: '画像をアップロード',
        selectImage: '画像を選択'
    },
    analytics: {
        title: '在庫分析',
        smartAlerts: 'スマートアラート',
        smartRecommendations: 'おすすめアクション'
    },
    status: {
        normal: '正常',
        lowStock: '在庫不足',
        expiringSoon: '期限間近',
        expired: '期限切れ'
    },
    notifications: {
        itemAdded: 'アイテムを追加しました',
        itemUpdated: 'アイテムを更新しました',
        itemDeleted: 'アイテムを削除しました',
        error: 'エラーが発生しました',
        insufficientStock: '{itemName}の在庫が不足しています',
        itemUsedSuccessfully: '{itemName}を使用しました（残り：{quantity}{unit}）',
        barcodeError: 'バーコードの生成に失敗しました',
        itemFound: 'アイテムが見つかりました',
        itemNotFound: 'アイテムが見つかりませんでした',
        barcodeScanned: 'バーコードをスキャンしました',
        invalidImageType: '対応していない画像形式です',
        processingImage: '画像を処理中です',
        noBarcodeFound: 'バーコードが見つかりませんでした',
        imageProcessingError: '画像処理でエラーが発生しました',
        orUploadImage: 'または画像をアップロード'
    }
};