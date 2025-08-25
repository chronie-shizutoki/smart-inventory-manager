window.bnMessages = {
    notifications: {
        barcodeError: 'বারকোড তৈরি করতে ব্যর্থ',
        itemAdded: 'আইটেম যোগ করা হয়েছে',
        itemUpdated: 'আইটেম আপডেট করা হয়েছে',
        itemDeleted: 'আইটেম মুছে ফেলা হয়েছে',
        error: 'অপারেশন ব্যর্থ। অনুগ্রহ করে পুনরায় চেষ্টা করুন',
        insufficientStock: 'স্টকের অভাব: {itemName}',
        itemUsedSuccessfully: '{itemName} 1 {unit} ব্যবহার করা হয়েছে ({quantity} {unit} বাকি আছে)',
        itemFound: 'আইটেম খুঁজে পাওয়া গেছে',
        itemNotFound: 'আইটেম খুঁজে পাওয়া যায়নি',
        barcodeScanned: 'বারকোড সফলভাবে স্ক্যান করা হয়েছে',
        invalidImageType: 'অবৈধ চিত্রের ধরন। অনুগ্রহ করে একটি চিত্র ফাইল নির্বাচন করুন।',
        processingImage: 'চিত্র প্রসেসিং হচ্ছে...',
        noBarcodeFound: 'চিত্রে কোনো বারকোড পাওয়া যায়নি',
        imageProcessingError: 'চিত্র প্রসেসিংয়ের সময় ত্রুটি'
    },
    alerts: {
        lowStock: 'কম স্টক',
        lowStockMessage: '{item} থেকে মাত্র {quantity} {unit} বাকি আছে',
        expired: 'মেয়াদ শেষ',
        expiredMessage: '{item} {days} দিন আগে মেয়াদ শেষ হয়েছে',
        expiringSoon: 'শীঘ্রই মেয়াদ শেষ হবে',
        expiringSoonMessage: '{item} {days} দিনের মধ্যে মেয়াদ শেষ হবে'
    },
    recommendations: {
        restock: '{item} পুনরায় স্টক করুন',
        restockReason: 'বর্তমান স্টক: {quantity} {unit} (ন্যূনতম: {minQuantity} {unit})',
        popular: 'জনপ্রিয় আইটেম',
        popularReason: '{item} বারবার ব্যবহার করা হয়',
        watch: '{item} পর্যবেক্ষণ করুন',
        watchReason: 'অত过往 30 দিনে {count} বার ব্যবহার করা হয়েছে',
        consider: '{item} পুনরায় স্টক করার কথা বিবেচনা করুন',
        considerReason: '{category} বিভাগে সবচেয়ে বেশি ব্যবহার করা হয় ({count} বার)'
    },
    app: {
        title: 'স্মার্ট হোম ইনভেন্টরি'
    },
    nav: {
        inventory: 'ইনভেন্টরি',
        add: 'আইটেম যোগ করুন',
        analytics: 'বিশ্লেষণ',
        purchaseList: 'কেনাকাটা তালিকা',
        menu: 'মেনু',
        language: 'ভাষা'
    },
    purchaseList: {
        description: 'কম স্টকের উপর ভিত্তি করে পুনরায় স্টক করার জন্য আইটেম',
        totalItems: 'কেনার জন্য আইটেম',
        currentQuantity: 'বর্তমান পরিমাণ',
        minQuantity: 'ন্যূনতম স্টক',
        suggestedQuantity: 'প্রস্তাবিত পরিমাণ',
        unit: 'একক',
        lastUsed: 'শেষ ব্যবহার',
        refresh: 'তালিকা রিফ্রেশ করুন'
    },
    inventory: {
        title: 'ইনভেন্টরি',
        search: 'আইটেম অনুসন্ধান করুন...',
        allCategories: 'সমস্ত শ্রেণী',
        name: 'আইটেম',
        category: 'শ্রেণী',
        quantity: 'পরিমাণ',
        unit: 'একক',
        expiryDate: 'মেয়াদ শেষের তারিখ',
        status: 'স্ট্যাটাস',
        actions: 'অ্যাকশন',
        scanBarcode: 'বারকোড স্ক্যান করুন'
    },
    categories: {
        food: 'খাদ্য',
        medicine: 'ওষুধ',
        cleaning: 'পরিষ্কার করার পদার্থ',
        personal: 'ব্যক্তিগত যত্ন',
        household: 'ਘরের প্রয়োজনীয় বস্তু',
        electronics: 'ইলেকট্রনিক্স'
    },
    stats: {
        totalItems: 'মোট আইটেম',
        lowStock: 'কম স্টক',
        expiringSoon: 'শীঘ্রই মেয়াদ শেষ হবে',
        categories: 'শ্রেণীবিভাগ'
    },
    add: {
        title: 'আইটেম যোগ করুন',
        editTitle: 'আইটেম সম্পাদনা করুন',
        name: 'আইটেমের নাম',
        category: 'শ্রেণী',
        quantity: 'পরিমাণ',
        unit: 'একক',
        minQuantity: 'ন্যূনতম স্টক',
        expiryDate: 'মেয়াদ শেষের তারিখ',
        description: 'বিবরণ',
        selectCategory: 'শ্রেণী নির্বাচন করুন',
        cancel: 'বাতিল করুন',
        save: 'সংরক্ষণ করুন',
        update: 'আপডেট করুন',
        barcode: 'বারকোড',
        barcodeType: 'বারকোডের ধরন',
        enterBarcode: 'বারকোড প্রবেশ করান বা নতুন একটি তৈরি করুন',
        generateBarcode: 'তৈরি করুন',
        barcodePreview: 'বারকোড প্রাকদর্শন',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'ফ্রেমের মধ্যে বারকোড সারিবদ্ধ করুন',
        positionBarcode: 'স্ক্যান অঞ্চলের মধ্যে বারকোড অবস্থান করুন',
        startScan: 'স্ক্যান শুরু করুন',
        stopScan: 'স্ক্যান বন্ধ করুন',
        browserNotSupported: 'ব্রাউজার ক্যামেরা অ্যাক্সেস সমর্থন করে না',
        cameraPermissionDenied: 'ক্যামেরার অনুমতি অস্বীকার করা হয়েছে',
        noCameraFound: 'কোনো ক্যামেরা পাওয়া যায়নি',
        cameraInUse: 'ক্যামেরা অন্যান্য অ্যাপ্লিকেশন দ্বারা ব্যবহার করা হচ্ছে',
        scan: 'স্ক্যান করুন',
        orUploadImage: 'অথবা চিত্র আপলোড করুন',
        uploadImage: 'চিত্র আপলোড করুন'
    },
    analytics: {
        title: 'বিশ্লেষণ',
        smartAlerts: 'স্মার্ট অ্যালার্ট',
        smartRecommendations: 'স্মার্ট সুপারিশ'
    },
    status: {
        normal: 'সাধারণ',
        lowStock: 'কম স্টক',
        expiringSoon: 'শীঘ্রই মেয়াদ শেষ হবে',
        expired: 'মেয়াদ শেষ'
    }
};