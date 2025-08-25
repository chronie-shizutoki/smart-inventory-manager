window.deMessages = {
    notifications: {
        barcodeError: 'Fehler beim Generieren des Barcodes',
        itemAdded: 'Artikel hinzugefügt',
        itemUpdated: 'Artikel aktualisiert',
        itemDeleted: 'Artikel gelöscht',
        error: 'Vorgang fehlgeschlagen. Bitte versuchen Sie es erneut',
        insufficientStock: 'Nicht auf Lager: {itemName}',
        itemUsedSuccessfully: '1 {unit} von {itemName} verwendet ({quantity} {unit} verbleibend)',
        itemFound: 'Artikel gefunden',
        itemNotFound: 'Artikel nicht gefunden',
        barcodeScanned: 'Barcode erfolgreich gescannt',
        invalidImageType: 'Ungültiger Bildtyp. Bitte wählen Sie eine Bilddatei.',
        processingImage: 'Verarbeite Bild...',
        noBarcodeFound: 'Kein Barcode im Bild gefunden',
        imageProcessingError: 'Fehler bei der Bildverarbeitung'
    },
    alerts: {
        lowStock: 'Niedriger Lagerbestand',
        lowStockMessage: 'Nur noch {quantity} {unit} von {item} verfügbar',
        expired: 'Abgelaufen',
        expiredMessage: '{item} ist vor {days} Tagen abgelaufen',
        expiringSoon: 'Bald abgelaufen',
        expiringSoonMessage: '{item} läuft in {days} Tagen ab'
    },
    recommendations: {
        restock: '{item} nachbestellen',
        restockReason: 'Aktueller Lagerbestand: {quantity} {unit} (Min.: {minQuantity} {unit})',
        popular: 'Beliebter Artikel',
        popularReason: '{item} wird häufig verwendet',
        watch: '{item} überwachen',
        watchReason: 'In den letzten 30 Tagen {count} Mal verwendet',
        consider: '{item} nachbestellen',
        considerReason: 'Am häufigsten in {category} verwendet ({count} Mal)'
    },
    app: {
        title: 'Smart Home Inventar'
    },
    nav: {
        inventory: 'Inventar',
        add: 'Artikel hinzufügen',
        analytics: 'Analyse',
        purchaseList: 'Einkaufsliste',
        menu: 'Menü',
        language: 'Sprache'
    },
    purchaseList: {
        description: 'Artikel zum Nachbestellen basierend auf niedrigem Lagerbestand',
        totalItems: 'Zu kaufende Artikel',
        currentQuantity: 'Aktuelle Menge',
        minQuantity: 'Min. Lager',
        suggestedQuantity: 'Empfohlene Menge',
        unit: 'Einheit',
        lastUsed: 'Letztes Mal verwendet',
        refresh: 'Liste aktualisieren'
    },
    inventory: {
        title: 'Inventar',
        search: 'Artikel suchen...',
        allCategories: 'Alle Kategorien',
        name: 'Artikel',
        category: 'Kategorie',
        quantity: 'Menge',
        unit: 'Einheit',
        expiryDate: 'Ablaufdatum',
        status: 'Status',
        actions: 'Aktionen',
        scanBarcode: 'Barcode scannen'
    },
    categories: {
        food: 'Lebensmittel',
        medicine: 'Medikamente',
        cleaning: 'Reinigungsmittel',
        personal: 'Körperpflege',
        household: 'Haushaltsartikel',
        electronics: 'Elektronik'
    },
    stats: {
        totalItems: 'Gesamtanzahl Artikel',
        lowStock: 'Niedriger Lagerbestand',
        expiringSoon: 'Bald abgelaufen',
        categories: 'Kategorien'
    },
    add: {
        title: 'Artikel hinzufügen',
        editTitle: 'Artikel bearbeiten',
        name: 'Artikelname',
        category: 'Kategorie',
        quantity: 'Menge',
        unit: 'Einheit',
        minQuantity: 'Minimaler Lagerbestand',
        expiryDate: 'Ablaufdatum',
        description: 'Beschreibung',
        selectCategory: 'Kategorie auswählen',
        cancel: 'Abbrechen',
        save: 'Speichern',
        update: 'Aktualisieren',
        barcode: 'Barcode',
        barcodeType: 'Barcode-Typ',
        enterBarcode: 'Barcode eingeben oder einen generieren',
        generateBarcode: 'Generieren',
        barcodePreview: 'Barcode-Vorschau',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Barcode im Rahmen ausrichten',
        positionBarcode: 'Barcode in den Scanbereich positionieren',
        startScan: 'Scan starten',
        stopScan: 'Scan stoppen',
        browserNotSupported: 'Browser unterstützt keinen Kamerazugriff',
        cameraPermissionDenied: 'Kameraberechtigung verweigert',
        noCameraFound: 'Keine Kamera gefunden',
        cameraInUse: 'Kamera wird von einer anderen Anwendung verwendet',
        scan: 'Scannen',
        orUploadImage: 'Oder Bild hochladen',
        uploadImage: 'Bild hochladen'
    },
    analytics: {
        title: 'Analyse',
        smartAlerts: 'Benachrichtigungen',
        smartRecommendations: 'Empfehlungen'
    },
    status: {
        normal: 'Normal',
        lowStock: 'Niedriger Lagerbestand',
        expiringSoon: 'Bald abgelaufen',
        expired: 'Abgelaufen'
    }
};