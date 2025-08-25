window.faMessages = {
    notifications: {
        barcodeError: 'بارکد ایجاد نشد',
        itemAdded: 'آیتم با موفقیت افزوده شد',
        itemUpdated: 'آیتم با موفقیت به‌روزرسانی شد',
        itemDeleted: 'آیتم با موفقیت حذف شد',
        error: 'عملیات ناموفق بود. لطفاً مجدداً تلاش کنید',
        insufficientStock: 'موجودی ناکافی: {itemName}',
        itemUsedSuccessfully: '1 {unit} از {itemName} استفاده شد (موجودی: {quantity} {unit})',
        itemFound: 'آیتم یافت شد',
        itemNotFound: 'آیتم یافت نشد',
        barcodeScanned: 'بارکد با موفقیت اسکن شد',
        invalidImageType: 'فرمت تصویر نامعتبر است. لطفاً یک فایل تصویری معتبر انتخاب کنید.',
        processingImage: 'در حال پردازش تصویر...',
        noBarcodeFound: 'هیچ بارکدی در تصویر شناسایی نشد',
        imageProcessingError: 'خطا در پردازش تصویر'
    },
    alerts: {
        lowStock: 'هشدار کمبود موجودی',
        lowStockMessage: 'فقط {quantity} {unit} از {item} باقی مانده است',
        expired: 'آیتم منقضی‌شده',
        expiredMessage: '{item}، {days} روز پیش منقضی شده است',
        expiringSoon: 'انقضای نزدیک',
        expiringSoonMessage: '{item} طی {days} روز آینده منقضی می‌شود'
    },
    recommendations: {
        restock: 'زمان replenish {item} فرا رسیده است',
        restockReason: 'موجودی فعلی: {quantity} {unit} (حداقل موردنیاز: {minQuantity} {unit})',
        popular: 'آیتم پراستفاده',
        popularReason: '{item} به طور مکرر استفاده می‌شود',
        watch: 'پیگیری {item}',
        watchReason: 'در 30 روز گذشته {count} بار استفاده شده است',
        consider: 'در نظر بگیرید: replenish {item}',
        considerReason: 'پرکاربردترین آیتم در دسته‌ی {category} ({count} بار استفاده)'
    },
    app: {
        title: 'سامانه‌ی مدیریت موجودی خانه'
    },
    nav: {
        inventory: 'موجودی',
        add: 'افزودن آیتم',
        analytics: 'تحلیل و آمار',
        purchaseList: 'لیست خرید',
        menu: 'منو',
        language: 'زبان'
    },
    purchaseList: {
        description: 'آیتم‌هایی که بر اساس سطح موجودی فعلی نیاز به replenish دارند',
        totalItems: 'تعداد کل آیتم‌ها',
        currentQuantity: 'مقدار فعلی',
        minQuantity: 'حداقل موجودی',
        suggestedQuantity: 'مقدار پیشنهادی',
        unit: 'واحد',
        lastUsed: 'آخرین استفاده',
        refresh: 'بروزرسانی لیست'
    },
    inventory: {
        title: 'انباره',
        search: 'جستجو among آیتم‌ها...',
        allCategories: 'همه‌ی دسته‌ها',
        name: 'نام آیتم',
        category: 'دسته‌بندی',
        quantity: 'مقدار',
        unit: 'واحد',
        expiryDate: 'تاریخ انقضا',
        status: 'وضعیت',
        actions: 'عملیات',
        scanBarcode: 'اسکن بارکد'
    },
    categories: {
        food: 'خوراکی',
        medicine: 'دارو',
        cleaning: 'شوینده',
        personal: 'لوازم شخصی',
        household: 'لوازم خانگی',
        electronics: 'لوازم الکترونیکی'
    },
    stats: {
        totalItems: 'کل آیتم‌ها',
        lowStock: 'کم‌موجودی',
        expiringSoon: 'نزدیک به انقضا',
        categories: 'دسته‌بندی‌ها'
    },
    add: {
        title: 'افزودن آیتم جدید',
        editTitle: 'ویرایش آیتم',
        name: 'نام آیتم',
        category: 'دسته‌بندی',
        quantity: 'مقدار',
        unit: 'واحد',
        minQuantity: 'حداقل موجودی',
        expiryDate: 'تاریخ انقضا',
        description: 'توضیحات',
        selectCategory: 'انتخاب دسته',
        cancel: 'لغو',
        save: 'ذخیره',
        update: 'اعمال تغییرات',
        barcode: 'بارکد',
        barcodeType: 'نوع بارکد',
        enterBarcode: 'بارکد را وارد یا ایجاد کنید',
        generateBarcode: 'ایجاد بارکد',
        barcodePreview: 'پیش‌نمایش بارکد',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'بارکد را در کادر مقابل دوربین قرار دهید',
        positionBarcode: 'بارکد را در محدوده‌ی اسکن قرار دهید',
        startScan: 'شروع اسکن',
        stopScan: 'توقف اسکن',
        browserNotSupported: 'مرورگر شما از دسترسی به دوربین پشتیبانی نمی‌کند',
        cameraPermissionDenied: 'دسترسی به دوربین رد شد',
        noCameraFound: 'دوربینی یافت نشد',
        cameraInUse: 'دوربین توسط برنامه‌ی دیگری در حال استفاده است',
        scan: 'اسکن',
        orUploadImage: 'یا تصویر بارکد را بارگذاری کنید',
        uploadImage: 'بارگذاری تصویر'
    },
    analytics: {
        title: 'تجزیه و تحلیل',
        smartAlerts: 'هشدارهای هوشمند',
        smartRecommendations: 'توصیه‌های هوشمند'
    },
    status: {
        normal: 'طبیعی',
        lowStock: 'کم‌موجودی',
        expiringSoon: 'نزدیک انقضا',
        expired: 'منقضی‌شده'
    }
};