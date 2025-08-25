window.arMessages = {
    notifications: {
        barcodeError: 'فشل في إنشاء الرمز الشريطي',
        itemAdded: 'تمت إضافة العنصر',
        itemUpdated: 'تم تحديث العنصر',
        itemDeleted: 'تم حذف العنصر',
        error: 'فشلت العملية. يرجى المحاولة مرة أخرى',
        insufficientStock: 'غير متوفر في المخزون: {itemName}',
        itemUsedSuccessfully: 'استخدم 1 {unit} من {itemName} (تبقى {quantity} {unit})',
        itemFound: 'تم العثور على العنصر',
        itemNotFound: 'لم يتم العثور على العنصر',
        barcodeScanned: 'تم مسح الرمز الشريطي بنجاح',
        invalidImageType: 'نوع صورة غير صالح. يرجى اختيار ملف صورة.',
        processingImage: 'جاري معالجة الصورة...',
        noBarcodeFound: 'لم يتم العثور على رمز شريطي في الصورة',
        imageProcessingError: 'خطأ عند معالجة الصورة'
    },
    alerts: {
        lowStock: 'منخفض التخزين',
        lowStockMessage: 'تبقى فقط {quantity} {unit} من {item}',
        expired: 'منتهى الصلاحية',
        expiredMessage: 'انتهت صلاحية {item} منذ {days} أيام',
        expiringSoon: 'تنتهي الصلاحية قريبًا',
        expiringSoonMessage: 'تنتهي صلاحية {item} بعد {days} أيام'
    },
    recommendations: {
        restock: 'إعادة تعبئة {item}',
        restockReason: 'المخزون الحالي: {quantity} {unit} (الحد الأدنى: {minQuantity} {unit})',
        popular: 'عنصر Популяр',
        popularReason: 'يتم استخدام {item} بانتظام',
        watch: 'مراقبة {item}',
        watchReason: 'تم استخدامه {count} مرة في الـ30 يوم الماضي',
        consider: 'إعادة تعبئة {item}',
        considerReason: 'الأكثر استخدامًا في {category} ({count} مرة)'
    },
    app: {
        title: 'إدارة مخزون المنزل الذكية'
    },
    nav: {
        inventory: 'المخزون',
        add: 'إضافة عنصر',
        analytics: 'التحليلات',
        purchaseList: 'قائمة التسوق',
        menu: 'القائمة',
        language: 'اللغة'
    },
    purchaseList: {
        description: 'العناصر التي تحتاج إلى إعادة تعبئة بناءً على مخزون منخفض',
        totalItems: 'العناصر التي تحتاج إلى شراء',
        currentQuantity: 'الكمية الحالية',
        minQuantity: 'الحد الأدنى للمخزون',
        suggestedQuantity: 'الكمية المقترحة',
        unit: 'الوحدة',
        lastUsed: 'آخر استخدام',
        refresh: 'تحديث القائمة'
    },
    inventory: {
        title: 'المخزون',
        search: 'البحث عن عناصر...',
        allCategories: 'جميع الفئات',
        name: 'العنصر',
        category: 'الفئة',
        quantity: 'الكمية',
        unit: 'الوحدة',
        expiryDate: 'تاريخ الانتهاء',
        status: 'الحالة',
        actions: 'الإجراءات',
        scanBarcode: 'مسح الرمز الشريطي'
    },
    categories: {
        food: 'الطعام',
        medicine: 'الدواء',
        cleaning: 'محصولات التنظيف',
        personal: 'العناية الشخصية',
        household: 'منتجات المنزل',
        electronics: 'الإلكترونيات'
    },
    stats: {
        totalItems: 'إجمالي العناصر',
        lowStock: 'منخفض التخزين',
        expiringSoon: 'تنتهي الصلاحية قريبًا',
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
        barcode: 'الرمز الشريطي',
        barcodeType: 'نوع الرمز الشريطي',
        enterBarcode: 'أدخل الرمز الشريطي أو إنشئ واحدًا',
        generateBarcode: 'إنشاء',
        barcodePreview: 'معاينة الرمز الشريطي',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'محاذاة الرمز الشريطي داخل الإطار',
        positionBarcode: 'وضع الرمز الشريطي داخل منطقة المسح',
        startScan: 'بدء المسح',
        stopScan: 'إيقاف المسح',
        browserNotSupported: 'لا يدعم المتصفح الوصول إلى الكاميرا',
        cameraPermissionDenied: 'تم رفض إذن الكاميرا',
        noCameraFound: 'لم يتم العثور على كاميرا',
        cameraInUse: 'تستخدم الكاميرا بواسطة تطبيق آخر',
        scan: 'مسح',
        orUploadImage: 'أو رفع صورة',
        uploadImage: 'رفع صورة'
    },
    analytics: {
        title: 'التحليلات',
        smartAlerts: 'التنبيهات',
        smartRecommendations: 'الاقتراحات'
    },
    status: {
        normal: 'طبيعي',
        lowStock: 'منخفض التخزين',
        expiringSoon: 'تنتهي الصلاحية قريبًا',
        expired: 'منتهى الصلاحية'
    }
};