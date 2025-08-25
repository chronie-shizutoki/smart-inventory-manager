window.hiMessages = {
    notifications: {
        barcodeError: 'बारकोड जेनरेट नहीं हो पाया',
        itemAdded: 'आइटम जोड़ा गया',
        itemUpdated: 'आइटम अपडेट किया गया',
        itemDeleted: 'आइटम हटाया गया',
        error: 'ऑपरेशन विफल। कृपया पुनः प्रयास करें',
        insufficientStock: 'स्टॉक खत्म: {itemName}',
        itemUsedSuccessfully: '{itemName} का 1 {unit} इस्तेमाल किया गया ({quantity} {unit} बाकी)',
        itemFound: 'आइटम मिल गया',
        itemNotFound: 'आइटम नहीं मिला',
        barcodeScanned: 'बारकोड स्कैन सफल रहा',
        invalidImageType: 'अमान्य इमेज प्रकार। कृपया कोई इमेज फाइल चुनें।',
        processingImage: 'इमेज प्रोसेस हो रही है...',
        noBarcodeFound: 'इमेज में कोई बारकोड नहीं मिला',
        imageProcessingError: 'इमेज प्रोसेसिंग में त्रुटि'
    },
    alerts: {
        lowStock: 'स्टॉक कम',
        lowStockMessage: '{item} का सिर्फ {quantity} {unit} बचा है',
        expired: 'एक्सपायर्ड',
        expiredMessage: '{item} {days} दिन पहले एक्सपायर हो गया',
        expiringSoon: 'जल्द एक्सपायर होने वाला',
        expiringSoonMessage: '{item} {days} दिनों में एक्सपायर हो जाएगा'
    },
    recommendations: {
        restock: '{item} रिस्टॉक करें',
        restockReason: 'मौजूदा स्टॉक: {quantity} {unit} (न्यूनतम: {minQuantity} {unit})',
        popular: 'लोकप्रिय आइटम',
        popularReason: '{item} का अक्सर इस्तेमाल होता है',
        watch: '{item} पर नज़र रखें',
        watchReason: 'पिछले 30 दिनों में {count} बार इस्तेमाल किया गया',
        consider: '{item} रिस्टॉक करने पर विचार करें',
        considerReason: '{category} में सबसे ज़्यादा इस्तेमाल ({count} बार)'
    },
    app: {
        title: 'स्मार्ट होम इन्वेंटरी'
    },
    nav: {
        inventory: 'इन्वेंटरी',
        add: 'आइटम जोड़ें',
        analytics: 'एनालिटिक्स',
        purchaseList: 'खरीदारी सूची',
        menu: 'मेन्यू',
        language: 'भाषा'
    },
    purchaseList: {
        description: 'कम स्टॉक के आधार पर रिस्टॉक के लिए सुझाई गई आइटम्स',
        totalItems: 'खरीदने के लिए आइटम्स',
        currentQuantity: 'मौजूदा मात्रा',
        minQuantity: 'न्यूनतम स्टॉक',
        suggestedQuantity: 'सुझाई गई मात्रा',
        unit: 'यूनिट',
        lastUsed: 'आखिरी बार इस्तेमाल',
        refresh: 'सूची ताज़ा करें'
    },
    inventory: {
        title: 'इन्वेंटरी',
        search: 'आइटम्स में खोजें...',
        allCategories: 'सभी कैटेगरीज़',
        name: 'आइटम',
        category: 'कैटेगरी',
        quantity: 'मात्रा',
        unit: 'यूनिट',
        expiryDate: 'एक्सपायरी डेट',
        status: 'स्थिति',
        actions: 'एक्शन्स',
        scanBarcode: 'बारकोड स्कैन करें'
    },
    categories: {
        food: 'खाना',
        medicine: 'दवाई',
        cleaning: 'सफ़ाई का सामान',
        personal: 'पर्सनल केयर',
        household: 'घरेलू सामान',
        electronics: 'इलेक्ट्रॉनिक्स'
    },
    stats: {
        totalItems: 'कुल आइटम्स',
        lowStock: 'कम स्टॉक',
        expiringSoon: 'जल्द एक्सपायर होने वाले',
        categories: 'कैटेगरीज़'
    },
    add: {
        title: 'आइटम जोड़ें',
        editTitle: 'आइटम एडिट करें',
        name: 'आइटम का नाम',
        category: 'कैटेगरी',
        quantity: 'मात्रा',
        unit: 'यूनिट',
        minQuantity: 'न्यूनतम स्टॉक',
        expiryDate: 'एक्सपायरी डेट',
        description: 'विवरण',
        selectCategory: 'कैटेगरी चुनें',
        cancel: 'कैंसल',
        save: 'सेव',
        update: 'अपडेट',
        barcode: 'बारकोड',
        barcodeType: 'बारकोड टाइप',
        enterBarcode: 'बारकोड डालें या जेनरेट करें',
        generateBarcode: 'जेनरेट करें',
        barcodePreview: 'बारकोड प्रीव्यू',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'बारकोड को फ्रेम के अंदर रखें',
        positionBarcode: 'बारकोड को स्कैन एरिया के अंदर रखें',
        startScan: 'स्कैन शुरू करें',
        stopScan: 'स्कैन रोकें',
        browserNotSupported: 'ब्राउज़र कैमरा एक्सेस सपोर्ट नहीं करता',
        cameraPermissionDenied: 'कैमरा परमिशन डिनाइड',
        noCameraFound: 'कोई कैमरा नहीं मिला',
        cameraInUse: 'कैमरा दूसरे ऐप्लिकेशन द्वारा इस्तेमाल में है',
        scan: 'स्कैन',
        orUploadImage: 'या इमेज अपलोड करें',
        uploadImage: 'इमेज अपलोड करें'
    },
    analytics: {
        title: 'एनालिटिक्स',
        smartAlerts: 'स्मार्ट अलर्ट्स',
        smartRecommendations: 'स्मार्ट सिफारिशें'
    },
    status: {
        normal: 'नॉर्मल',
        lowStock: 'कम स्टॉक',
        expiringSoon: 'जल्द एक्सपायर',
        expired: 'एक्सपायर्ड'
    }
};