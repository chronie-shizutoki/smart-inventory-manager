window.taMessages = {
    notifications: {
        barcodeError: 'பார்கோடு உருவாக்கத்தில் குற்றம்',
        itemAdded: 'உருப்படி சேர்க்கப்பட்டது',
        itemUpdated: 'உருப்படி புதுப்பிக்கப்பட்டது',
        itemDeleted: 'உருப்படி நீக்கப்பட்டது',
        error: 'செயல் தோல்வியடைந்தது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்',
        insufficientStock: 'சங்கிலியை முடிந்துவிட்டது: {itemName}',
        itemUsedSuccessfully: '{itemName} 1 {unit} பயன்படுத்தப்பட்டது ({quantity} {unit} மீதமுள்ளவை)',
        itemFound: 'உருப்படி கண்டறியப்பட்டது',
        itemNotFound: 'உருப்படி கண்டறிய முடியவில்லை',
        barcodeScanned: 'பார்கோடு வெற்றிகரமாக ஸ்கேன் செய்யப்பட்டது',
        invalidImageType: 'செல்லுபடியற்ற பட வகை. தயவுசெய்து ஒரு பட கோப்பைத் தேர்வுசெய்க.',
        processingImage: 'பட செயலாக்கம் நடைபெறுகிறது...',
        noBarcodeFound: 'படத்தில் பார்கோடு எதுவும் கண்டறியப்படவில்லை',
        imageProcessingError: 'பட செயலாக்கத்தில் பிழை'
    },
    alerts: {
        lowStock: 'குறைந்த ஸ்டாக்',
        lowStockMessage: '{item} இலிருந்து மাত్రమ் {quantity} {unit} மீதமுள்ளவை',
        expired: 'காலம் நிறைந்துவிட்டது',
        expiredMessage: '{item} {days} நாட்களுக்கு முன்பு காலம் நிறைந்துவிட்டது',
        expiringSoon: '곧 காலம் நிறையும்',
        expiringSoonMessage: '{item} {days} நாட்களுக்குள் காலம் நிறையும்'
    },
    recommendations: {
        restock: '{item} மீட்டெடுக்கவும்',
        restockReason: 'தற்போதைய ஸ்டாக்: {quantity} {unit} (சிறிய அளவு: {minQuantity} {unit})',
        popular: 'பிரபலமான உருப்படி',
        popularReason: '{item} அடிக்கடி பயன்படுத்தப்படுகிறது',
        watch: '{item} கண்காணிக்கவும்',
        watchReason: 'கடந்த 30 நாட்களில் {count} முறை பயன்படுத்தப்பட்டது',
        consider: '{item} மீட்டெடுக்க பரிந்துரைக்கப்படுகிறது',
        considerReason: '{category} வகையில் மிகவும் பயன்படுத்தப்படுகிறது ({count} முறை)'
    },
    app: {
        title: 'ஸ்மார்ட் ஹோம் சரக்கு நிலக்கை'
    },
    nav: {
        inventory: 'சரக்கு நிலக்கை',
        add: 'உருப்படி சேர்க்க',
        analytics: ' பகுப்பாய்வு',
        purchaseList: 'கொள்முதல் பட்டியல்',
        menu: 'மெனு',
        language: 'மொழி'
    },
    purchaseList: {
        description: 'குறைந்த ஸ்டாக்கின் அடிப்படையில் மீட்டெடுக்க வேண்டிய உருப்படிகள்',
        totalItems: '采購할 항목',
        currentQuantity: 'தற்போதைய அளவு',
        minQuantity: 'சிறிய அளவு ஸ்டாக்',
        suggestedQuantity: ' பரிந்துரைக்கப்பட்ட அளவு',
        unit: 'அலகு',
        lastUsed: 'கடைசி பயன்பாடு',
        refresh: 'பட்டியலை புதுப்பிக்கவும்'
    },
    inventory: {
        title: 'சரக்கு நிலக்கை',
        search: 'உருப்படிகளை தேடுங்கள்...',
        allCategories: 'அனைத்து வகைகளும்',
        name: 'உருப்படி',
        category: 'வகை',
        quantity: 'அளவு',
        unit: 'அலகு',
        expiryDate: 'காலாவதி தேதி',
        status: 'நிலை',
        actions: 'செயல்கள்',
        scanBarcode: 'பார்கோடு ஸ்கேன் செய்யுங்கள்'
    },
    categories: {
        food: 'உணவு',
        medicine: 'மருந்து',
        cleaning: 'சுத்தம் செய்யும் பொருட்கள்',
        personal: 'தனிப்பட்ட பராமரிப்பு',
        household: 'வீட்டு உபகரணங்கள்',
        electronics: 'எலெக்ட்ரானிக்ஸ்'
    },
    stats: {
        totalItems: 'மொத்த உருப்படிகள்',
        lowStock: 'குறைந்த ஸ்டாக்',
        expiringSoon: '곧 காலம் நிறையும்',
        categories: 'வகைகள்'
    },
    add: {
        title: 'உருப்படி சேர்க்க',
        editTitle: 'உருப்படி சửa chữaு செய்யுங்கள்',
        name: 'உருப்படியின் பெயர்',
        category: 'வகை',
        quantity: 'அளவு',
        unit: 'அலகு',
        minQuantity: 'சிறிய அளவு ஸ்டாக்',
        expiryDate: 'காலாவதி தேதி',
        description: 'விளக்கம்',
        selectCategory: 'வகையைத் தேர்வுசெய்க',
        cancel: 'ரத்து செய்யுங்கள்',
        save: 'சேமிக்கவும்',
        update: 'புதுப்பிக்கவும்',
        barcode: 'பார்கோடு',
        barcodeType: 'பார்கோடு வகை',
        enterBarcode: 'பார்கோடு உள்ளிடவும் அல்லது புதிதாக உருவாக்கவும்',
        generateBarcode: 'உருவாக்கவும்',
        barcodePreview: 'பார்கோடு முன்னோட்டம்',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'பிரேமின் உள்ளே பார்கோட்டை சீரமைக்கவும்',
        positionBarcode: 'ஸ்கேன் பகுதியின் உள்ளே பார்கோட்டை நிலைநிறுத்தவும்',
        startScan: 'ஸ்கேன் தொடங்கவும்',
        stopScan: 'ஸ்கேன் நிறுத்தவும்',
        browserNotSupported: 'உலாவி கேமரா அணுகலை ஆதரிக்கவில்லை',
        cameraPermissionDenied: 'கேமரா அனுமதி மறுக்கப்பட்டது',
        noCameraFound: 'கேமரா எதுவும் கண்டறியப்படவில்லை',
        cameraInUse: 'கேமரா மற்ற பயன்பாடுகளால் பயன்படுத்தப்படுகிறது',
        scan: 'ஸ்கேன் செய்யுங்கள்',
        orUploadImage: 'அல்லது பட আপ్లோடு செய்யுங்கள்',
        uploadImage: 'பட আপ్లோடு செய்யுங்கள்'
    },
    analytics: {
        title: 'பகுப்பாய்வு',
        smartAlerts: 'ஸ்மார்ட் எச்சரிக்கைகள்',
        smartRecommendations: 'ஸ்மார்ட் பரிந்துரைகள்'
    },
    status: {
        normal: 'சாதாரணமானது',
        lowStock: 'குறைந்த ஸ்டாக்',
        expiringSoon: '곧 காலம் நிறையும்',
        expired: 'காலம் நிறைந்துவிட்டது'
    }
};