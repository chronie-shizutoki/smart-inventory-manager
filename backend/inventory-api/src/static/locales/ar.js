window.arMessages = {
    notifications: {
        barcodeError: 'فشل إنشاء الباركود',
        itemAdded: 'تمت إضافة العنصر بنجاح',
        itemUpdated: 'تم تحديث العنصر بنجاح',
        itemDeleted: 'تم حذف العنصر بنجاح',
        error: 'فشلت العملية، يرجى المحاولة مرة أخرى',
        insufficientStock: 'العنصر غير متوفر في المخزون: {itemName}',
        itemUsedSuccessfully: 'تم استخدام 1 {unit} من {itemName} (المتبقي: {quantity} {unit})',
        itemFound: 'تم العثور على العنصر',
        itemNotFound: 'العنصر غير موجود',
        barcodeScanned: 'تم مسح الباركود بنجاح',
        invalidImageType: 'نوع الصورة غير مدعوم. يرجى اختيار ملف صورة مناسب.',
        processingImage: 'جاري معالجة الصورة...',
        noBarcodeFound: 'لم يتم العثور على باركود في الصورة',
        imageProcessingError: 'حدث خطأ أثناء معالجة الصورة'
    },
    alerts: {
        lowStock: 'منخفض المخزون',
        lowStockMessage: 'لم يتبق سوى {quantity} {unit} من {item}',
        expired: 'منتهي الصلاحية',
        expiredMessage: 'انتهت صلاحية {item} منذ {days} يوم',
        expiringSoon: 'صلاحية قريبة الانتهاء',
        expiringSoonMessage: 'صلاحية {item} تنتهي بعد {days} يوم'
    },
    recommendations: {
        restock: 'إعادة تخزين {item}',
        restockReason: 'المخزون الحالي: {quantity} {unit} (الحد الأدنى: {minQuantity} {unit})',
        popular: 'عنصر شائع',
        popularReason: 'يتم استخدام {item} بشكل متكرر',
        watch: 'مراقبة {item}',
        watchReason: 'تم استخدامه {count} مرة خلال آخر 30 يوم',
        consider: 'فكر في إعادة تخزين {item}',
        considerReason: 'الأكثر استخدامًا في فئة {category} ({count} مرة)'
    },
    app: {
        title: 'نظام إدارة المخزون المنزلي الذكي'
    },
    nav: {
        inventory: 'المخزون',
        add: 'إضافة عنصر',
        analytics: 'التقارير والتحليلات',
        purchaseList: 'قائمة التسوق',
        menu: 'القائمة',
        language: 'اللغة'
    },
    purchaseList: {
        description: 'عناصر تحتاج لإعادة التخزين بناءً على مستويات المخزون المنخفضة',
        totalItems: 'العناصر المطلوبة للشراء',
        currentQuantity: 'الكمية الحالية',
        minQuantity: 'الحد الأدنى للمخزون',
        suggestedQuantity: 'الكمية المقترحة',
        unit: 'الوحدة',
        lastUsed: 'آخر استخدام',
        refresh: 'تحديث القائمة'
    },
    inventory: {
        title: 'المخزون',
        search: 'بحث في العناصر...',
        allCategories: 'جميع الفئات',
        name: 'اسم العنصر',
        category: 'الفئة',
        quantity: 'الكمية',
        unit: 'الوحدة',
        expiryDate: 'تاريخ الانتهاء',
        status: 'الحالة',
        actions: 'الإجراءات',
        scanBarcode: 'مسح الباركود'
    },
    categories: {
        food: 'أغذية',
        medicine: 'أدوية',
        cleaning: 'منتجات تنظيف',
        personal: 'العناية الشخصية',
        household: 'أدوات منزلية',
        electronics: 'إلكترونيات'
    },
    stats: {
        totalItems: 'إجمالي العناصر',
        lowStock: 'منخفض المخزون',
        expiringSoon: 'قريب الانتهاء',
        categories: 'الفئات'
    },
    add: {
        title: 'إضافة عنصر',
        editTitle: 'تعديل العنصر',
        name: 'اسم العنصر',
        category: 'الفئة',
        quantity: 'الكمية',
        unit: 'الوحدة',
        minQuantity: 'الحد الأدنى للمخزون',
        expiryDate: 'تاريخ الانتهاء',
        description: 'الوصف',
        selectCategory: 'اختر الفئة',
        cancel: 'إلغاء',
        save: 'حفظ',
        update: 'تحديث',
        barcode: 'الباركود',
        barcodeType: 'نوع الباركود',
        enterBarcode: 'أدخل الباركود أو أنشئ واحدًا',
        generateBarcode: 'إنشاء باركود',
        barcodePreview: 'معاينة الباركود',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'ضَع الباركود داخل الإطار',
        positionBarcode: 'ضع الباركود داخل منطقة المسح',
        startScan: 'بدء المسح',
        stopScan: 'إيقاف المسح',
        browserNotSupported: 'المتصفح لا يدعم الوصول إلى الكاميرا',
        cameraPermissionDenied: 'تم رفض الإذن للوصول إلى الكاميرا',
        noCameraFound: 'لم يتم العثور على كاميرا',
        cameraInUse: 'الكاميرا قيد الاستخدام من قبل تطبيق آخر',
        scan: 'مسح',
        orUploadImage: 'أو رفع صورة',
        uploadImage: 'رفع صورة'
    },
    analytics: {
        title: 'التقارير والتحليلات',
        smartAlerts: 'التنبيهات',
        smartRecommendations: 'التوصيات الذكية'
    },
    status: {
        normal: 'طبيعي',
        lowStock: 'منخفض المخزون',
        expiringSoon: 'قريب الانتهاء',
        expired: 'منتهي الصلاحية'
    }
};