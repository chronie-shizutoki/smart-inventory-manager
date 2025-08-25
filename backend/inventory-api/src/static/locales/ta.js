window.taMessages = {
    notifications: {
        barcodeError: 'பார்கோடு உருவாக்கத்தில் பிழை', // More common word for "Error"
        itemAdded: 'பொருள் சேர்க்கப்பட்டது', // "Item" is more commonly translated as பொருள்
        itemUpdated: 'பொருள் புதுப்பிக்கப்பட்டது',
        itemDeleted: ' பொருள் நீக்கப்பட்டது',
        error: 'செயல் தோல்வியடைந்தது. தயவு செய்து மீண்டும் முயற்சிக்கவும்.', // Added punctuation
        insufficientStock: 'போதிய பங்கு இல்லை: {itemName}', // More accurate translation for "Insufficient Stock"
        itemUsedSuccessfully: '{itemName} 1 {unit} பயன்படுத்தப்பட்டது (மீதம் {quantity} {unit})', // More natural phrasing
        itemFound: 'பொருள் கண்டறியப்பட்டது',
        itemNotFound: 'பொருள் கண்டறியப்படவில்லை',
        barcodeScanned: 'பார்கோடு வெற்றிகரமாக ஸ்கேன் செய்யப்பட்டது', // Corrected spelling
        invalidImageType: 'செல்லாத பட வகை. தயவு செய்து ஒரு படக் கோப்பைத் தேர்ந்தெடுக்கவும்.', // More natural phrasing
        processingImage: 'படம் செயலாக்கப்படுகிறது...', // More natural phrasing
        noBarcodeFound: 'படத்தில் பார்கோடு எதுவும் காணப்படவில்லை', // More natural phrasing
        imageProcessingError: 'பட செயலாக்கத்தில் பிழை'
    },
    alerts: {
        lowStock: 'குறைந்த பங்கு', // Using consistent term for "Stock"
        lowStockMessage: '{item} இல் {quantity} {unit} மட்டுமே மீதம் உள்ளது', // More natural phrasing
        expired: 'காலாவதியானது',
        expiredMessage: '{item} {days} நாட்களுக்கு முன்பு காலாவதியானது', // More natural phrasing
        expiringSoon: 'விரைவில் காலாவதியாகும்',
        expiringSoonMessage: '{item} {days} நாட்களில் காலாவதியாகும்' // More natural phrasing
    },
    recommendations: {
        restock: '{item} - மீள் சேமிப்பு செய்ய பரிந்துரைக்கப்படுகிறது', // Clearer recommendation
        restockReason: 'தற்போதைய பங்கு: {quantity} {unit} (குறைந்தபட்ச அளவு: {minQuantity} {unit})', // Using consistent term for "Stock"
        popular: 'பிரபலமான பொருள்',
        popularReason: 'இந்த {item} அடிக்கடி பயன்படுத்தப்படுகிறது', // Slightly more natural
        watch: '{item} - கண்காணிக்க பரிந்துரைக்கப்படுகிறது', // Clearer recommendation
        watchReason: 'கடந்த 30 நாட்களில் {count} முறை பயன்படுத்தப்பட்டது',
        consider: '{item} - மீள் சேமிப்பு செய்ய பரிந்துரைக்கப்படுகிறது', // Reused restock translation for consistency
        considerReason: '{category} வகையில் அதிகமாக பயன்படுத்தப்படும் பொருள் ({count} முறை)' // More natural phrasing
    },
    app: {
        title: 'ஸ்மார்ட் வீட்டு இருப்பு மேலாண்மை' // "Inventory Management" is more accurate
    },
    nav: {
        inventory: 'இருப்பு', // Short and common for "Inventory"
        add: 'பொருள் சேர்',
        analytics: 'பகுப்பாய்வு',
        purchaseList: 'வாங்கும் பட்டியல்', // More common term for "Purchase"
        menu: 'பட்டி',
        language: 'மொழி'
    },
    purchaseList: {
        description: 'குறைந்த பங்கு அடிப்படையில் மீள் சேமிப்பு செய்ய வேண்டிய பொருட்கள்', // More accurate
        totalItems: 'வாங்க வேண்டிய மொத்த பொருட்கள்', // Corrected translation
        currentQuantity: 'தற்போதைய அளவு',
        minQuantity: 'குறைந்தபட்ச அளவு',
        suggestedQuantity: 'பரிந்துரைக்கப்பட்ட அளவு',
        unit: 'அலகு',
        lastUsed: 'கடைசியாக பயன்படுத்திய தேதி', // Added "Date" for clarity
        refresh: 'பட்டியலைப் புதுப்பிக்கவும்'
    },
    inventory: {
        title: 'இருப்பு',
        search: 'பொருட்களை தேடு...',
        allCategories: 'அனைத்து வகைகளும்',
        name: 'பொருள்',
        category: 'வகை',
        quantity: 'அளவு',
        unit: 'அலகு',
        expiryDate: 'காலாவதி தேதி',
        status: 'நிலை',
        actions: 'செயல்கள்',
        scanBarcode: 'பார்கோடு ஸ்கேன் செய்'
    },
    categories: {
        food: 'உணவு',
        medicine: 'மருந்து',
        cleaning: 'சுத்தம் செய்யும் பொருட்கள்',
        personal: 'தனிப்பட்ட பராமரிப்பு',
        household: 'வீட்டு உபயோக பொருட்கள்', // More common term
        electronics: 'மின்னணு பொருட்கள்' // More common term
    },
    stats: {
        totalItems: 'மொத்த பொருட்கள்',
        lowStock: 'குறைந்த பங்கு',
        expiringSoon: 'விரைவில் காலாவதியாகும்',
        categories: 'வகைகள்'
    },
    add: {
        title: 'பொருள் சேர்',
        editTitle: 'பொருளை திருத்து', // More common word for "Edit"
        name: 'பொருளின் பெயர்',
        category: 'வகை',
        quantity: 'அளவு',
        unit: 'அலகு',
        minQuantity: 'குறைந்தபட்ச அளவு',
        expiryDate: 'காலாவதி தேதி',
        description: 'விளக்கம்',
        selectCategory: 'வகையை தேர்ந்தெடுக்கவும்',
        cancel: 'ரத்து செய்',
        save: 'சேமி',
        update: 'புதுப்பிக்கவும்',
        barcode: 'பார்கோடு',
        barcodeType: 'பார்கோடு வகை',
        enterBarcode: 'பார்கோடு உள்ளிடவும் அல்லது புதிதாக உருவாக்கவும்',
        generateBarcode: 'பார்கோடு உருவாக்கு',
        barcodePreview: 'பார்கோடு தோரணை',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'பார்கோடை சட்டத்திற்குள் வைக்கவும்', // More intuitive instruction
        positionBarcode: 'ஸ்கேன் பகுதிக்குள் பார்கோட்டை நிலைநிறுத்தவும்',
        startScan: 'ஸ்கேன் தொடங்கு',
        stopScan: 'ஸ்கேன் நிறுத்து',
        browserNotSupported: 'உலாவி கேமரா அணுகலை ஆதரிக்காது',
        cameraPermissionDenied: 'கேமரா அனுமதி மறுக்கப்பட்டது',
        noCameraFound: 'கேமரா எதுவும் காணப்படவில்லை',
        cameraInUse: 'கேமரா பிற செயலிகளால் பயன்படுத்தப்படுகிறது', // Slightly more natural
        scan: 'ஸ்கேன் செய்',
        orUploadImage: 'அல்லது படத்தை பதிவேற்று', // Corrected word
        uploadImage: 'படத்தை பதிவேற்று' // Corrected word
    },
    analytics: {
        title: 'பகுப்பாய்வு',
        smartAlerts: 'ஸ்மார்ட் எச்சரிக்கைகள்',
        smartRecommendations: 'ஸ்மார்ட் பரிந்துரைகள்'
    },
    status: {
        normal: 'இயல்பான', // More natural adjective
        lowStock: 'குறைந்த பங்கு',
        expiringSoon: 'விரைவில் காலாவதியாகும்',
        expired: 'காலாவதியானது'
    }
};