window.ruMessages = {
    notifications: {
        barcodeError: 'Ошибка генерации штрих-кода',
        itemAdded: 'Товар добавлен',
        itemUpdated: 'Товар обновлён',
        itemDeleted: 'Товар удалён',
        error: 'Не удалось выполнить операцию. Пожалуйста, попробуйте ещё раз',
        insufficientStock: 'Нет в наличии: {itemName}',
        itemUsedSuccessfully: 'Использовано 1 {unit} {itemName} (осталось {quantity} {unit})',
        itemFound: 'Товар найден',
        itemNotFound: 'Товар не найден',
        barcodeScanned: 'Штрих-код успешно отсканирован',
        invalidImageType: 'Недопустимый формат изображения. Выберите файл изображения.',
        processingImage: 'Обрабатываем изображение...',
        noBarcodeFound: 'На изображении не найден штрих-код',
        imageProcessingError: 'Ошибка обработки изображения'
    },
    alerts: {
        lowStock: 'Низкий запас',
        lowStockMessage: 'Осталось всего {quantity} {unit} {item}',
        expired: 'Срок годности истёк',
        expiredMessage: 'Срок годности {item} истёк {days} дней назад',
        expiringSoon: 'Скоро истечёт срок годности',
        expiringSoonMessage: 'Срок годности {item} истечёт через {days} дней'
    },
    recommendations: {
        restock: 'Пополните запасы {item}',
        restockReason: 'Текущий запас: {quantity} {unit} (минимум: {minQuantity} {unit})',
        popular: 'Популярный товар',
        popularReason: '{item} часто используется',
        watch: 'Следите за {item}',
        watchReason: 'Использовался {count} раз за последние 30 дней',
        consider: 'Рекомендуем пополнить {item}',
        considerReason: 'Самый используемый в категории «{category}» ({count} раз)'
    },
    app: {
        title: 'Умный домашний склад'
    },
    nav: {
        inventory: 'Инвентарь',
        add: 'Добавить товар',
        analytics: 'Аналитика',
        purchaseList: 'Список покупок',
        menu: 'Меню',
        language: 'Язык'
    },
    purchaseList: {
        description: 'Товары для пополнения запасов на основе низкого остатка',
        totalItems: 'Товаров к покупке',
        currentQuantity: 'Текущее количество',
        minQuantity: 'Минимальный запас',
        suggestedQuantity: 'Рекомендуемое количество',
        unit: 'Единица измерения',
        lastUsed: 'Последнее использование',
        refresh: 'Обновить список'
    },
    inventory: {
        title: 'Инвентарь',
        search: 'Поиск товаров...',
        allCategories: 'Все категории',
        name: 'Название',
        category: 'Категория',
        quantity: 'Кол-во',
        unit: 'Ед.',
        expiryDate: 'Годен до',
        status: 'Статус',
        actions: 'Действия',
        scanBarcode: 'Сканировать штрих-код'
    },
    categories: {
        food: 'Продукты',
        medicine: 'Лекарства',
        cleaning: 'Чистящие средства',
        personal: 'Гигиена',
        household: 'Для дома',
        electronics: 'Электроника'
    },
    stats: {
        totalItems: 'Всего товаров',
        lowStock: 'Низкий запас',
        expiringSoon: 'Скоро истечёт',
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
        enterBarcode: 'Введите или сгенерируйте штрих-код',
        generateBarcode: 'Сгенерировать',
        barcodePreview: 'Предпросмотр штрих-кода',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Расположите штрих-код в рамке',
        positionBarcode: 'Поместите штрих-код в область сканирования',
        startScan: 'Начать сканирование',
        stopScan: 'Остановить сканирование',
        browserNotSupported: 'Браузер не поддерживает камеру',
        cameraPermissionDenied: 'Доступ к камере запрещён',
        noCameraFound: 'Камера не обнаружена',
        cameraInUse: 'Камера используется другим приложением',
        scan: 'Сканировать',
        orUploadImage: 'Или загрузите изображение',
        uploadImage: 'Загрузить изображение'
    },
    analytics: {
        title: 'Аналитика',
        smartAlerts: 'Оповещения',
        smartRecommendations: 'Рекомендации'
    },
    status: {
        normal: 'В норме',
        lowStock: 'Мало осталось',
        expiringSoon: 'Скоро истечёт',
        expired: 'Просрочен'
    }
};