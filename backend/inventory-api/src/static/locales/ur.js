window.urMessages = {
    notifications: {
        barcodeError: 'بارکوڈ بنانے میں خرابی',
        itemAdded: 'آئٹم کامیابی سے شامل ہو گیا',
        itemUpdated: 'آئٹم کامیابی سے اپ ڈیٹ ہو گیا',
        itemDeleted: 'آئٹم کامیابی سے حذف ہو گیا',
        error: 'عمل ناکام ہوا۔ براہ کرم دوبارہ کوشش کریں',
        insufficientStock: 'اسٹاک ناکافی ہے: {itemName}',
        itemUsedSuccessfully: '{itemName} کا 1 {unit} استعمال ہو گیا (بقیہ: {quantity} {unit})',
        itemFound: 'آئٹم موجود ہے',
        itemNotFound: 'آئٹم موجود نہیں ہے',
        barcodeScanned: 'بارکوڈ کامیابی سے اسکین ہو گیا',
        invalidImageType: 'غلط تصویری فارمیٹ۔ براہ کرم ایک درست تصویری فائل منتخب کریں۔',
        processingImage: 'تصویر پروسیس ہو رہی ہے...',
        noBarcodeFound: 'تصویر میں کوئی بارکوڈ نہیں ملا',
        imageProcessingError: 'تصویر پروسیس کرنے میں ناکامی'
    },
    alerts: {
        lowStock: 'کم اسٹاک کی انتباہ',
        lowStockMessage: '{item} کے صرف {quantity} {unit} باقی ہیں',
        expired: 'میعاد ختم ہونے والا آئٹم',
        expiredMessage: '{item} کی میعاد {days} دن پہلے ختم ہو چکی ہے',
        expiringSoon: 'جلد میعاد ختم ہونے والا',
        expiringSoonMessage: '{item} کی میعاد {days} دنوں میں ختم ہو جائے گی'
    },
    recommendations: {
        restock: '{item} کو دوبارہ اسٹاک کریں',
        restockReason: 'موجودہ اسٹاک: {quantity} {unit} (کم از کم: {minQuantity} {unit})',
        popular: 'مقبول آئٹم',
        popularReason: '{item} اکثر استعمال ہوتا ہے',
        watch: '{item} پر نظر رکھیں',
        watchReason: 'پچھلے 30 دنوں میں {count} بار استعمال ہوا',
        consider: '{item} کو دوبارہ اسٹاک کرنے کا سوچیں',
        considerReason: '{category} میں سب سے زیادہ استعمال ہونے والا آئٹم ({count} بار)'
    },
    app: {
        title: 'ہوشمند گھریلو انوینٹری'
    },
    nav: {
        inventory: 'انوینٹری',
        add: 'نیا آئٹم شامل کریں',
        analytics: 'تجزیات',
        purchaseList: 'خریداری کی فہرست',
        menu: 'مینو',
        language: 'زبان'
    },
    purchaseList: {
        description: 'موجودہ انوینٹری کی سطح کی بنیاد پر دوبارہ اسٹاک کے لیے آئٹمز',
        totalItems: 'خریدنا ہوں گے (کل آئٹمز)',
        currentQuantity: 'موجودہ مقدار',
        minQuantity: 'کم از کم اسٹاک',
        suggestedQuantity: 'تجویز کردہ مقدار',
        unit: 'اکائی',
        lastUsed: 'آخری استعمال',
        refresh: 'تازہ کریں'
    },
    inventory: {
        title: 'انوینٹری',
        search: 'آئٹمز تلاش کریں...',
        allCategories: 'تمام زمرے',
        name: 'نام',
        category: 'زمرہ',
        quantity: 'مقدار',
        unit: 'اکائی',
        expiryDate: 'ختم ہونے کی تاریخ',
        status: 'حالت',
        actions: 'اعمال',
        scanBarcode: 'بارکوڈ اسکین کریں'
    },
    categories: {
        food: 'کھانا',
        medicine: 'ادویات',
        cleaning: 'صفائی',
        personal: 'ذاتی نگہداشت',
        household: 'گھریلو سامان',
        electronics: 'الیکٹرانکس'
    },
    stats: {
        totalItems: 'کل آئٹمز',
        lowStock: 'کم اسٹاک',
        expiringSoon: 'جلد ختم ہونے والے',
        categories: 'زمرے'
    },
    add: {
        title: 'نیا آئٹم شامل کریں',
        editTitle: 'آئٹم میں ترمیم کریں',
        name: 'آئٹم کا نام',
        category: 'زمرہ',
        quantity: 'مقدار',
        unit: 'اکائی',
        minQuantity: 'کم از کم اسٹاک',
        expiryDate: 'ختم ہونے کی تاریخ',
        description: 'تفصیل',
        selectCategory: 'زمرہ منتخب کریں',
        cancel: 'منسوخ کریں',
        save: 'محفوظ کریں',
        update: 'اپ ڈیٹ کریں',
        barcode: 'بارکوڈ',
        barcodeType: 'بارکوڈ کی قسم',
        enterBarcode: 'بارکوڈ درج کریں یا بنائیں',
        generateBarcode: 'بارکوڈ بنائیں',
        barcodePreview: 'بارکوڈ پیش نظارہ',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'فریم کے اندر بارکوڈ کو درست کریں',
        positionBarcode: 'بارکوڈ کو اسکین ایریا میں رکھیں',
        startScan: 'اسکین شروع کریں',
        stopScan: 'اسکین بند کریں',
        browserNotSupported: 'آپ کے براؤزر میں کیمرے کی سپورٹ نہیں ہے',
        cameraPermissionDenied: 'کیمرے کی اجازت نہیں دی گئی',
        noCameraFound: 'کیمرہ نہیں ملا',
        cameraInUse: 'کیمرہ فی الحال کسی دوسری ایپلیکیشن کے زیر استعمال ہے',
        scan: 'اسکین کریں',
        orUploadImage: 'یا تصویر اپ لوڈ کریں',
        uploadImage: 'تصویر اپ لوڈ کریں'
    },
    analytics: {
        title: 'تجزیات',
        smartAlerts: 'ہوشمند انتباہات',
        smartRecommendations: 'ہوشمند تجاویز'
    },
    status: {
        normal: 'نارمل',
        lowStock: 'کم اسٹاک',
        expiringSoon: 'جلد ختم ہونے والا',
        expired: 'ختم شدہ'
    }
};