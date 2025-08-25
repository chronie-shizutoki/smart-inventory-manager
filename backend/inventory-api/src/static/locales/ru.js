window.ruMessages = {
    notifications: {
        barcodeError: 'Ошибка при генерации штрих-кода',
        itemAdded: 'Товар добавлен',
        itemUpdated: 'Товар обновлен',
        itemDeleted: 'Товар удален',
        error: 'Операция не удалась. Пожалуйста, повторите попытку',
        insufficientStock: 'Нет в наличии: {itemName}',
        itemUsedSuccessfully: 'Использовано 1 {unit} из {itemName} (осталось {quantity} {unit})',
        itemFound: 'Товар найден',
        itemNotFound: 'Товар не найден',
        barcodeScanned: 'Штрих-код успешно просканирован',
        invalidImageType: 'Неверный тип изображения. Пожалуйста, выберите файл изображения.',
        processingImage: 'Обработка изображения...',
        noBarcodeFound: 'Штрих-код не найден на изображении',
        imageProcessingError: 'Ошибка при обработке изображения'
    },
    alerts: {
        lowStock: 'Низкий запас',
        lowStockMessage: 'Осталось только {quantity} {unit} из {item}',
        expired: 'Срок годности истек',
        expiredMessage: '{item} истек {days} дней назад',
        expiringSoon: 'Срок годности истекает скоро',
        expiringSoonMessage: '{item} истекает через {days} дней'
    },
    recommendations: {
        restock: 'Пополнить запас {item}',
        restockReason: 'Текущий запас: {quantity} {unit} (минимум: {minQuantity} {unit})',
        popular: 'Популярный товар',
        popularReason: '{item} часто используется',
        watch: 'Отслеживать {item}',
        watchReason: 'Использовался {count} раз за последние 30 дней',
        consider: 'Пополнить запас {item}',
        considerReason: 'Самый часто используемый в категории {category} ({count} раз)'
    },
    app: {
        title: 'Умное домашнее хранение'
    },
    nav: {
        inventory: 'Склад',
        add: 'Добавить товар',
        analytics: 'Аналитика',
        purchaseList: 'Список покупок',
        menu: 'Меню',
        language: 'Язык'
    },
    purchaseList: {
        description: 'Товары для пополнения запасов на основе низких запасов',
        totalItems: 'Товары для покупки',
        currentQuantity: 'Текущее количество',
        minQuantity: 'Минимальный запас',
        suggestedQuantity: 'Рекомендуемое количество',
        unit: 'Единица измерения',
        lastUsed: 'Последнее использование',
        refresh: 'Обновить список'
    },
    inventory: {
        title: 'Склад',
        search: 'Поиск товаров...',
        allCategories: 'Все категории',
        name: 'Товар',
        category: 'Категория',
        quantity: 'Кол-во',
        unit: 'Ед.',
        expiryDate: 'Срок годности',
        status: 'Статус',
        actions: 'Действия',
        scanBarcode: 'Сканировать штрих-код'
    },
    categories: {
        food: 'Еда',
        medicine: 'Медикаменты',
        cleaning: 'Моющие средства',
        personal: 'Личная гигиена',
        household: 'Домашние товары',
        electronics: 'Электроника'
    },
    stats: {
        totalItems: 'Общее количество товаров',
        lowStock: 'Низкий запас',
        expiringSoon: 'Срок годности истекает скоро',
        categories: 'Категории'
    },
    add: {
        title: 'Добавить товар',
        editTitle: 'Редактировать товар',
        name: 'Название товара',
        category: 'Категория',
        quantity: 'Количество',
        unit: 'Единица измерения',
        minQuantity: 'Минимальный запас',
        expiryDate: 'Срок годности',
        description: 'Описание',
        selectCategory: 'Выберите категорию',
        cancel: 'Отмена',
        save: 'Сохранить',
        update: 'Обновить',
        barcode: 'Штрих-код',
        barcodeType: 'Тип штрих-кода',
        enterBarcode: 'Введите штрих-код или сгенерируйте его',
        generateBarcode: 'Сгенерировать',
        barcodePreview: 'Предпросмотр штрих-кода',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Выровняйте штрих-код в рамке',
        positionBarcode: 'Поместите штрих-код в область сканирования',
        startScan: 'Начать сканирование',
        stopScan: 'Остановить сканирование',
        browserNotSupported: 'Браузер не поддерживает доступ к камере',
        cameraPermissionDenied: 'Доступ к камере запрещен',
        noCameraFound: 'Камера не найдена',
        cameraInUse: 'Камера используется другой программой',
        scan: 'Сканировать',
        orUploadImage: 'Или загрузить изображение',
        uploadImage: 'Загрузить изображение'
    },
    analytics: {
        title: 'Аналитика',
        smartAlerts: 'Оповещения',
        smartRecommendations: 'Рекомендации'
    },
    status: {
        normal: 'Нормальный',
        lowStock: 'Низкий запас',
        expiringSoon: 'Срок годности истекает скоро',
        expired: 'Срок годности истек'
    }
};