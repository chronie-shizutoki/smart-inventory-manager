window.trMessages = {
    notifications: {
        barcodeError: 'Barkod oluşturulamadı',
        itemAdded: 'Ürün eklendi',
        itemUpdated: 'Ürün güncellendi',
        itemDeleted: 'Ürün silindi',
        error: 'İşlem başarısız oldu. Lütfen tekrar deneyiniz',
        insufficientStock: 'Yetersiz Stok: {itemName}',
        itemUsedSuccessfully: '{itemName} ürününden 1 {unit} kullanıldı ({quantity} {unit} kaldı)',
        itemFound: 'Ürün bulundu',
        itemNotFound: 'Ürün bulunamadı',
        barcodeScanned: 'Barkod başarıyla taranıldı',
        invalidImageType: 'Geçersiz resim formatı. Lütfen bir resim dosyası seçiniz.',
        processingImage: 'Resim işleniyor...',
        noBarcodeFound: 'Resimde barkod bulunamadı',
        imageProcessingError: 'Resim işleme sırasında hata oluştu'
    },
    alerts: {
        lowStock: 'Düşük Stok',
        lowStockMessage: '{item} stokunda yalnızca {quantity} {unit} kaldı',
        expired: 'Süresi Doldu',
        expiredMessage: '{item} ürününün son kullanma tarihi {days} gün önce geçti',
        expiringSoon: 'Son Kullanma Tarihi Yaklaşıyor',
        expiringSoonMessage: '{item} ürününün son kullanma tarihine {days} gün kaldı'
    },
    recommendations: {
        restock: '{item} ürününü tedarik edin',
        restockReason: 'Mevcut stok: {quantity} {unit} (Minimum: {minQuantity} {unit})',
        popular: 'Popüler Ürün',
        popularReason: '{item} sıklıkla kullanılıyor',
        watch: '{item} ürününü izleyin',
        watchReason: 'Son 30 günde {count} kez kullanıldı',
        consider: '{item} ürününü tedarik etmeyi değerlendirin',
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
        description: 'Düşük stok seviyesine göre yenilenmesi önerilen ürünler',
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
        actions: 'İşlemler',
        scanBarcode: 'Barkod Tara'
    },
    categories: {
        food: 'Yiyecek',
        medicine: 'İlaç',
        cleaning: 'Temizlik Malzemesi',
        personal: 'Kişisel Bakım',
        household: 'Ev Eşyaları',
        electronics: 'Elektronik'
    },
    stats: {
        totalItems: 'Toplam Ürün',
        lowStock: 'Düşük Stok',
        expiringSoon: 'Yaklaşan Son Kullanma Tarihi',
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
        selectCategory: 'Kategori Seçiniz',
        cancel: 'İptal',
        save: 'Kaydet',
        update: 'Güncelle',
        barcode: 'Barkod',
        barcodeType: 'Barkod Türü',
        enterBarcode: 'Barkodu girin veya yeni oluşturun',
        generateBarcode: 'Oluştur',
        barcodePreview: 'Barkod Önizleme',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Barkodu çerçeve içine yerleştirin',
        positionBarcode: 'Barkodu tarayıcı alanına yerleştirin',
        startScan: 'Tarayıcıyı Başlat',
        stopScan: 'Tarayıcıyı Durdur',
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
        smartAlerts: 'Akıllı Uyarılar',
        smartRecommendations: 'Akıllı Öneriler'
    },
    status: {
        normal: 'Normal',
        lowStock: 'Düşük Stok',
        expiringSoon: 'Yaklaşan Son Kullanma Tarihi',
        expired: 'Süresi Dolmuş'
    }
};