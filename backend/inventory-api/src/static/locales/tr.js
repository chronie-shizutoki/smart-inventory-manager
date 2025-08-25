window.trMessages = {
    notifications: {
        barcodeError: 'Barkod oluşturulamadı',
        itemAdded: 'Ürün eklendi',
        itemUpdated: 'Ürün güncellendi',
        itemDeleted: 'Ürün silindi',
        error: 'İşlem başarısız oldu. Lütfen tekrar deneyin',
        insufficientStock: 'Stok tükeniyor: {itemName}',
        itemUsedSuccessfully: '{itemName} 1 {unit} kullanıldı ({quantity} {unit} kaldı)',
        itemFound: 'Ürün bulundu',
        itemNotFound: 'Ürün bulunamadı',
        barcodeScanned: 'Barkod başarıyla tarandı',
        invalidImageType: 'Geçersiz resim türü. Lütfen bir resim dosyası seçin.',
        processingImage: 'Resim işleniyor...',
        noBarcodeFound: 'Resimde barkod bulunamadı',
        imageProcessingError: 'Resim işlenirken hata oluştu'
    },
    alerts: {
        lowStock: 'Düşük Stok',
        lowStockMessage: '{item} stokundan sadece {quantity} {unit} kaldı',
        expired: 'Süresi Dolmuş',
        expiredMessage: '{item} {days} gün önce son kullanma tarihini geçti',
        expiringSoon: 'Yakında Son Kullanma Tarihi Geliyor',
        expiringSoonMessage: '{item} {days} gün içinde son kullanma tarihine ulaşacak'
    },
    recommendations: {
        restock: '{item} yeniden tedarik edin',
        restockReason: 'Mevcut stok: {quantity} {unit} (minimum: {minQuantity} {unit})',
        popular: 'Popüler Ürün',
        popularReason: '{item} sık kullanılıyor',
        watch: '{item} takip edin',
        watchReason: 'Son 30 günde {count} kez kullanıldı',
        consider: '{item} yeniden tedarik etmek için düşünün',
        considerReason: '{category} kategorisinde en çok kullanılan ürün ({count} kez)'
    },
    app: {
        title: 'Akıllı Ev Envanteri'
    },
    nav: {
        inventory: 'Envanter',
        add: 'Ürün Ekle',
        analytics: 'Analitik',
        purchaseList: 'Alışveriş Listesi',
        menu: 'Menü',
        language: 'Dil'
    },
    purchaseList: {
        description: 'Düşük stok durumuna göre yenilenmesi gereken ürünler',
        totalItems: 'Satın Alınacak Ürünler',
        currentQuantity: 'Mevcut Miktar',
        minQuantity: 'Minimum Stok',
        suggestedQuantity: 'Önerilen Miktar',
        unit: 'Birim',
        lastUsed: 'Son Kullanım',
        refresh: 'Listeyi Yenile'
    },
    inventory: {
        title: 'Envanter',
        search: 'Ürün ara...',
        allCategories: 'Tüm Kategoriler',
        name: 'Ürün',
        category: 'Kategori',
        quantity: 'Miktar',
        unit: 'Birim',
        expiryDate: 'Son Kullanma Tarihi',
        status: 'Durum',
        actions: 'Eylemler',
        scanBarcode: 'Barkod Tara'
    },
    categories: {
        food: 'Yiyecek',
        medicine: 'İlaç',
        cleaning: 'Temizlik Malzemesi',
        personal: 'Kişisel Bakım',
        household: 'Ev Aletleri',
        electronics: 'Elektronik'
    },
    stats: {
        totalItems: 'Toplam Ürün',
        lowStock: 'Düşük Stok',
        expiringSoon: 'Yakında Son Kullanma Tarihi',
        categories: 'Kategoriler'
    },
    add: {
        title: 'Ürün Ekle',
        editTitle: 'Ürünü Düzenle',
        name: 'Ürün Adı',
        category: 'Kategori',
        quantity: 'Miktar',
        unit: 'Birim',
        minQuantity: 'Minimum Stok',
        expiryDate: 'Son Kullanma Tarihi',
        description: 'Açıklama',
        selectCategory: 'Kategori Seç',
        cancel: 'İptal',
        save: 'Kaydet',
        update: 'Güncelle',
        barcode: 'Barkod',
        barcodeType: 'Barkod Türü',
        enterBarcode: 'Barkodu girin veya yeni bir tane oluşturun',
        generateBarcode: 'Oluştur',
        barcodePreview: 'Barkod Önizlemesi',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Barkodu çerçevenin içine yerleştirin',
        positionBarcode: 'Barkodu tarama alanının içine yerleştirin',
        startScan: 'Tarama Başlat',
        stopScan: 'Tarama Durdur',
        browserNotSupported: 'Tarayıcı kamera erişimini desteklemiyor',
        cameraPermissionDenied: 'Kamera izni reddedildi',
        noCameraFound: 'Kamera bulunamadı',
        cameraInUse: 'Kamera başka bir uygulama tarafından kullanılıyor',
        scan: 'Tara',
        orUploadImage: 'veya resim yükleyin',
        uploadImage: 'Resim Yükle'
    },
    analytics: {
        title: 'Analitik',
        smartAlerts: 'Uyarılar',
        smartRecommendations: 'Öneriler'
    },
    status: {
        normal: 'Normal',
        lowStock: 'Düşük Stok',
        expiringSoon: 'Yakında Son Kullanma Tarihi',
        expired: 'Süresi Dolmuş'
    }
};