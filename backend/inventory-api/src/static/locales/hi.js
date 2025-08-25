window.hiMessages = {
    notifications: {
        barcodeError: 'बारकोड उत्पन्न करने में विफल रहा',
        itemAdded: 'वस्तु जोड़ी गई',
        itemUpdated: 'वस्तु अपडेट की गई',
        itemDeleted: 'वस्तु हटा दी गई',
        error: 'संचालन विफल रहा। कृपया पुनः प्रयास करें',
        insufficientStock: 'स्टॉक समाप्त: {itemName}',
        itemUsedSuccessfully: '{itemName} का 1 {unit} उपयोग किया गया ({quantity} {unit} शेष)',
        itemFound: 'वस्तु पाई गई',
        itemNotFound: 'वस्तु नहीं मिली',
        barcodeScanned: 'बारकोड सफलतापूर्वक स्कैन किया गया',
        invalidImageType: 'अमान्य छवि प्रकार। कृपया एक छवि फ़ाइल चुनें।',
        processingImage: 'छवि प्रसंस्करण हो रहा है...',
        noBarcodeFound: 'छवि में कोई बारकोड नहीं मिला',
        imageProcessingError: 'छवि प्रसंस्करण में त्रुटि'
    },
    alerts: {
        lowStock: 'कम स्टॉक',
        lowStockMessage: '{item} का केवल {quantity} {unit} शेष है',
        expired: 'समय से बाहर',
        expiredMessage: '{item} {days} दिन पहले समाप्त हो गया',
        expiringSoon: 'जल्द ही समाप्त होने वाला',
        expiringSoonMessage: '{item} {days} दिनों में समाप्त होगा'
    },
    recommendations: {
        restock: '{item} का पुनः भण्डारण करें',
        restockReason: 'वर्तमान स्टॉक: {quantity} {unit} (न्यूनतम: {minQuantity} {unit})',
        popular: 'लोकप्रिय वस्तु',
        popularReason: '{item} का अक्सर उपयोग किया जाता है',
        watch: '{item} की निगरानी करें',
        watchReason: 'पिछले 30 दिनों में {count} बार उपयोग किया गया',
        consider: '{item} का पुनः भण्डारण करें',
        considerReason: '{category} में सबसे अधिक उपयोग किया जाता है ({count} बार)'
    },
    app: {
        title: 'स्मार्ट होम इन्वेंट्री'
    },
    nav: {
        inventory: 'इन्वेंट्री',
        add: 'वस्तु जोड़ें',
        analytics: 'विश्लेषण',
        purchaseList: 'खरीदारी सूची',
        menu: 'मेनू',
        language: 'भाषा'
    },
    purchaseList: {
        description: 'कम स्टॉक के आधार पर पुनः भण्डारण के लिए वस्तुएँ',
        totalItems: 'खरीदने के लिए वस्तुएँ',
        currentQuantity: 'वर्तमान मात्रा',
        minQuantity: 'न्यूनतम स्टॉक',
        suggestedQuantity: 'सुझाई गई मात्रा',
        unit: 'इकाई',
        lastUsed: 'अंतिम उपयोग',
        refresh: 'सूची अपडेट करें'
    },
    inventory: {
        title: 'इन्वेंट्री',
        search: 'वस्तुओं की खोज करें...',
        allCategories: 'सभी श्रेणियाँ',
        name: 'वस्तु',
        category: 'श्रेणी',
        quantity: 'मात्रा',
        unit: 'इकाई',
        expiryDate: 'समाप्ति तिथि',
        status: 'स्थिति',
        actions: 'कार्रवाइयाँ',
        scanBarcode: 'बारकोड स्कैन करें'
    },
    categories: {
        food: 'भोजन',
        medicine: 'दवा',
        cleaning: 'सफाई सामग्री',
        personal: 'व्यक्तिगत देखभाल',
        household: 'घरेलू सामान',
        electronics: 'इलेक्ट्रॉनिक्स'
    },
    stats: {
        totalItems: 'कुल वस्तुएँ',
        lowStock: 'कम स्टॉक',
        expiringSoon: 'जल्द ही समाप्त होने वाला',
        categories: 'श्रेणियाँ'
    },
    add: {
        title: 'वस्तु जोड़ें',
        editTitle: 'वस्तु संपादित करें',
        name: 'वस्तु का नाम',
        category: 'श्रेणी',
        quantity: 'मात्रा',
        unit: 'इकाई',
        minQuantity: 'न्यूनतम स्टॉक',
        expiryDate: 'समाप्ति तिथि',
        description: 'विवरण',
        selectCategory: 'श्रेणी का चयन करें',
        cancel: 'रद्द करें',
        save: 'सहेजें',
        update: 'अपडेट करें',
        barcode: 'बारकोड',
        barcodeType: 'बारकोड प्रकार',
        enterBarcode: 'बारकोड दर्ज करें या एक उत्पन्न करें',
        generateBarcode: 'उत्पन्न करें',
        barcodePreview: 'बारकोड पूर्वावलोकन',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'फ्रेम के भीतर बारकोड को संरेखित करें',
        positionBarcode: 'स्कैन क्षेत्र के भीतर बारकोड को स्थित करें',
        startScan: 'स्कैन शुरू करें',
        stopScan: 'स्कैन बंद करें',
        browserNotSupported: 'ब्राउज़र कैमरे की पहुंच का समर्थन नहीं करता है',
        cameraPermissionDenied: 'कैमरा अनुमति अस्वीकृत',
        noCameraFound: 'कोई कैमरा नहीं मिली',
        cameraInUse: 'कैमरा का उपयोग दूसरे अनुप्रयोग द्वारा किया जा रहा है',
        scan: 'स्कैन करें',
        orUploadImage: 'या छवि अपलोड करें',
        uploadImage: 'छवि अपलोड करें'
    },
    analytics: {
        title: 'विश्लेषण',
        smartAlerts: 'अलर्ट्स',
        smartRecommendations: 'सिफारिशें'
    },
    status: {
        normal: 'सामान्य',
        lowStock: 'कम स्टॉक',
        expiringSoon: 'जल्द ही समाप्त होने वाला',
        expired: 'समय से बाहर'
    }
};