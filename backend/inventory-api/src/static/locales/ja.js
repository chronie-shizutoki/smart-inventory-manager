window.jaMessages = {
    alerts: {
        lowStock: '残少警告',
        lowStockMessage: '{item}の在庫が残り{quantity}{unit}です',
        expired: '期限切れ',
        expiredMessage: '{item}は{days}日前に期限切れとなりました',
        expiringSoon: '期限間近警告',
        expiringSoonMessage: '{item}の有効期限はあと{days}日です'
    },
    recommendations: {
        restock: '{item}を補充してください',
        restockReason: '現在の在庫{quantity}{unit}（最低在庫{minQuantity}{unit}を下回っています）',
        popular: '人気アイテム',
        popularReason: '{item}は現在大人気アイテムです',
        watch: '{item}を要チェック',
        watchReason: '過去30日間で{count}回使用されています',
        consider: '{item}の補充を推奨',
        considerReason: '{category}カテゴリで最多使用（{count}回）'
    },
    app: {
        title: 'スマート家庭在庫管理'
    },
    nav: {
        inventory: '在庫管理',
        add: 'アイテム追加',
        analytics: '分析ダッシュボード',
        purchaseList: '買い物リスト',
        menu: 'メニュー',
        language: '言語設定'
    },
    purchaseList: {
        description: '在庫不足アイテムに基づく購入リスト',
        totalItems: '購入対象アイテム数',
        currentQuantity: '現在の数量',
        minQuantity: '最低在庫量',
        suggestedQuantity: '推奨購入量',
        unit: '単位',
        lastUsed: '最終使用日',
        refresh: 'リスト更新'
    },
    inventory: {
        title: '在庫一覧',
        search: 'アイテム検索...',
        allCategories: 'すべてのカテゴリ',
        name: 'アイテム名',
        category: 'カテゴリ',
        quantity: '数量',
        unit: '単位',
        expiryDate: '消費期限',
        status: '状態',
        actions: '操作',
        scanBarcode: 'バーコードスキャン'
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
        totalItems: '登録アイテム数',
        lowStock: '残少アイテム',
        expiringSoon: '期限間近',
        categories: 'カテゴリ数'
    },
    add: {
        title: '新規アイテム登録',
        editTitle: 'アイテム編集',
        name: '品名',
        category: 'カテゴリ',
        quantity: '在庫数',
        unit: '単位（例：個、袋）',
        minQuantity: '最低在庫数',
        expiryDate: '消費期限',
        description: '備考',
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
        scanBarcodeMessage: 'バーコードをフレーム内に合わせてください',
        startScan: 'スキャン開始',
        stopScan: 'スキャン停止',
        browserNotSupported: 'ブラウザがカメラアクセスをサポートしていません',
        cameraPermissionDenied: 'カメラアクセス権限が拒否されました',
        noCameraFound: 'カメラが見つかりません',
        scan: 'スキャン'
    },
    analytics: {
        title: '在庫分析',
        smartAlerts: 'アラート一覧',
        smartRecommendations: 'おすすめアクション'
    },
    status: {
        normal: '正常',
        lowStock: '残少',
        expiringSoon: '期限間近',
        expired: '期限切れ'
    },
    notifications: {
        itemAdded: '新規登録完了',
        itemUpdated: '更新完了',
        itemDeleted: '削除完了',
        error: '処理に失敗しました',
        insufficientStock: '{itemName}の在庫が不足しています',
        itemUsedSuccessfully: '{itemName}を使用しました（残り：{quantity}{unit}）',
        barcodeError: 'バーコードの生成に失敗しました',
        itemFound: 'アイテムを見つけました',
        itemNotFound: 'アイテムを見つけることができませんでした',
        barcodeScanned: 'バーコードをスキャンしました'
    }
};