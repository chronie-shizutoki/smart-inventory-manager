window.bnMessages = {
    notifications: {
        barcodeError: 'বারকোড তৈরিতে ব্যর্থ',
        itemAdded: 'আইটেম যোগ করা হয়েছে',
        itemUpdated: 'আইটেম হালনাগাদ করা হয়েছে', // 'আপডেট' is common, but 'হালনাগাদ' is a more formal Bengali equivalent.
        itemDeleted: 'আইটেম মুছে ফেলা হয়েছে',
        error: 'ক্রটি ঘটেছে। দয়া করে আবার চেষ্টা করুন', // More natural phrasing for an error.
        insufficientStock: 'স্টক অপর্যাপ্ত: {itemName}',
        itemUsedSuccessfully: '{itemName} এর ১ {unit} ব্যবহার করা হয়েছে ({quantity} {unit} অবশিষ্ট আছে)', // Restructured for better flow.
        itemFound: 'আইটেম পাওয়া গেছে',
        itemNotFound: 'আইটেম পাওয়া যায়নি',
        barcodeScanned: 'বারকোড সফলভাবে স্ক্যান করা হয়েছে',
        invalidImageType: 'অবৈধ ছবির ফরম্যাট। দয়া করে একটি ছবির ফাইল নির্বাচন করুন।', // 'চিত্র' is formal, 'ছবি' is more common.
        processingImage: 'ছবি প্রক্রিয়াকরণ হচ্ছে...', // 'প্রসেসিং' is commonly understood, but 'প্রক্রিয়াকরণ' is the proper term.
        noBarcodeFound: 'ছবিতে কোন বারকোড পাওয়া যায়নি',
        imageProcessingError: 'ছবি প্রক্রিয়াকরণের সময় একটি ত্রুটি ঘটেছে' // More complete phrasing.
    },
    alerts: {
        lowStock: 'স্টক কম',
        lowStockMessage: '{item} এর মাত্র {quantity} {unit} অবশিষ্ট আছে',
        expired: 'মেয়াদোত্তীর্ণ',
        expiredMessage: '{item} এর মেয়াদ {days} দিন前に শেষ হয়েছে',
        expiringSoon: 'শীঘ্রই মেয়াদ শেষ',
        expiringSoonMessage: '{item} এর মেয়াদ {days} দিনের মধ্যে শেষ হবে'
    },
    recommendations: {
        restock: '{item} পুনঃস্টক করুন',
        restockReason: 'বর্তমান স্টক: {quantity} {unit} (ন্যূনতম স্টক: {minQuantity} {unit})', // Added 'স্টক' for clarity.
        popular: 'জনপ্রিয় আইটেম',
        popularReason: 'এই আইটেমটি ({item}) ঘনঘন ব্যবহার করা হয়', // Clarified the sentence.
        watch: '{item} এর ব্যবহার নজর রাখুন', // More actionable.
        watchReason: 'গত ৩০ দিনে {count} বার ব্যবহার করা হয়েছে', // Corrected "অত过往" to "গত".
        consider: '{item} পুনরায় স্টক করার বিষয়টি বিবেচনা করুন',
        considerReason: '{category} বিভাগে সর্বাধিক ব্যবহৃত আইটেম ({count} বার)' // More natural phrasing.
    },
    app: {
        title: 'স্মার্ট হোম ইনভেন্টরি'
    },
    nav: {
        inventory: 'ইনভেন্টরি',
        add: 'নতুন আইটেম',
        analytics: 'বিশ্লেষণ',
        purchaseList: 'ক্রয়ের তালিকা', // More accurate than 'কেনাকাটা তালিকা' which is a shopping list.
        menu: 'মেনু',
        language: 'ভাষা'
    },
    purchaseList: {
        description: 'স্বল্প স্টক থাকা আইটেমগুলির পুনঃস্থাপনের তালিকা', // Improved description.
        totalItems: 'মোট ক্রয়할 আইটেম',
        currentQuantity: 'বর্তমান পরিমাণ',
        minQuantity: 'ন্যূনতম স্টক',
        suggestedQuantity: 'প্রস্তাবিত ক্রয় পরিমাণ', // Added 'ক্রয়' for context.
        unit: 'একক',
        lastUsed: 'সর্বশেষ ব্যবহার',
        refresh: 'তালিকা রিফ্রেশ করুন'
    },
    inventory: {
        title: 'ইনভেন্টরি',
        search: 'আইটেম খুঁজুন...',
        allCategories: 'সব বিভাগ',
        name: 'আইটেমের নাম', // Added 'নাম' for clarity.
        category: 'বিভাগ',
        quantity: 'পরিমাণ',
        unit: 'একক',
        expiryDate: 'মেয়াদ শেষের তারিখ',
        status: 'স্থিতি', // 'স্ট্যাটাস' is common, but 'স্থিতি' is a good Bengali alternative.
        actions: 'ক্রিয়া',
        scanBarcode: 'বারকোড স্ক্যান করুন'
    },
    categories: {
        food: 'খাদ্য',
        medicine: 'ওষুধ',
        cleaning: 'পরিষ্কারকের সামগ্রী', // More precise than 'পদার্থ'.
        personal: 'ব্যক্তিগত পরিচর্যা', // More common term for 'personal care'.
        household: 'গৃহস্থালির সামগ্রী', // Corrected the typo and used a common term.
        electronics: 'ইলেকট্রনিক্স'
    },
    stats: {
        totalItems: 'মোট আইটেম',
        lowStock: 'স্বল্প স্টক',
        expiringSoon: 'শীঘ্রই মেয়াদ শেষ',
        categories: 'বিভাগসমূহ'
    },
    add: {
        title: 'নতুন আইটেম যোগ করুন',
        editTitle: 'আইটেম সম্পাদনা করুন',
        name: 'আইটেমের নাম',
        category: 'বিভাগ',
        quantity: 'পরিমাণ',
        unit: 'একক',
        minQuantity: 'ন্যূনতম স্টক',
        expiryDate: 'মেয়াদ শেষের তারিখ',
        description: 'বিবরণ',
        selectCategory: 'একটি বিভাগ নির্বাচন করুন',
        cancel: 'বাতিল',
        save: 'সংরক্ষণ',
        update: 'হালনাগাদ',
        barcode: 'বারকোড',
        barcodeType: 'বারকোডের ধরন',
        enterBarcode: 'বারকোড লিখুন বা জেনারেট করুন',
        generateBarcode: 'জেনারেট করুন', // Using the common transliteration.
        barcodePreview: 'বারকোড প্রিভিউ',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'বারকোডটি ফ্রেমের মধ্যে রাখুন',
        positionBarcode: 'স্ক্যান এরিয়ায় বারকোডটি রাখুন',
        startScan: 'স্ক্যান শুরু করুন',
        stopScan: 'স্ক্যান বন্ধ করুন',
        browserNotSupported: 'আপনার ব্রাউজার ক্যামেরা সাপোর্ট করে না',
        cameraPermissionDenied: 'ক্যামেরা এক্সেসের অনুমতি প্রদান করা হয়নি',
        noCameraFound: 'কোনো ক্যামেরা পাওয়া যায়নি',
        cameraInUse: 'ক্যামেরাটি অন্য অ্যাপ দ্বারা ব্যবহৃত হচ্ছে',
        scan: 'স্ক্যান',
        orUploadImage: 'বা একটি ছবি আপলোড করুন',
        uploadImage: 'ছবি আপলোড'
    },
    analytics: {
        title: 'বিশ্লেষণ',
        smartAlerts: 'স্মার্ট সতর্কতা', // 'অ্যালার্ট' is common, but 'সতর্কতা' is the translation.
        smartRecommendations: 'স্মার্ট সুপারিশ'
    },
    status: {
        normal: 'স্বাভাবিক',
        lowStock: 'স্টক কম',
        expiringSoon: 'মেয়াদ শেষ হওয়ার পথে', // More descriptive.
        expired: 'মেয়াদোত্তীর্ণ'
    }
};