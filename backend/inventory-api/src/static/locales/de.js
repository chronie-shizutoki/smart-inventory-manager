window.deMessages = {
    notifications: {
        barcodeError: 'Fehler beim Erstellen des Barcodes',
        itemAdded: 'Artikel erfolgreich hinzugefügt',
        itemUpdated: 'Artikel erfolgreich aktualisiert',
        itemDeleted: 'Artikel erfolgreich gelöscht',
        error: 'Aktion fehlgeschlagen. Bitte erneut versuchen',
        insufficientStock: 'Nicht vorrätig: {itemName}',
        itemUsedSuccessfully: '1 {unit} von {itemName} verwendet ({quantity} {unit} verbleiben)',
        itemFound: 'Artikel gefunden',
        itemNotFound: 'Artikel nicht gefunden',
        barcodeScanned: 'Barcode erfolgreich gescannt',
        invalidImageType: 'Ungültiger Dateityp. Bitte wählen Sie ein Bild aus.',
        processingImage: 'Bild wird verarbeitet...',
        noBarcodeFound: 'Kein Barcode im Bild erkannt',
        imageProcessingError: 'Fehler beim Verarbeiten des Bildes'
    },
    alerts: {
        lowStock: 'Warnung: Niedriger Lagerbestand',
        lowStockMessage: 'Nur noch {quantity} {unit} von {item} verfügbar',
        expired: 'Produkt abgelaufen',
        expiredMessage: '{item} ist seit {days} Tagen abgelaufen',
        expiringSoon: 'Produkt läuft bald ab',
        expiringSoonMessage: '{item} läuft in {days} Tagen ab'
    },
    recommendations: {
        restock: '{item} nachbestellen',
        restockReason: 'Aktueller Bestand: {quantity} {unit} (Mindestbestand: {minQuantity} {unit})',
        popular: 'Beliebtes Produkt',
        popularReason: '{item} wird häufig verwendet',
        watch: '{item} im Auge behalten',
        watchReason: 'In den letzten 30 Tagen {count}-mal verwendet',
        consider: '{item} nachbestellen',
        considerReason: 'Häufigstes Produkt in {category} ({count}-mal verwendet)'
    },
    app: {
        title: 'Smart Home Inventar'
    },
    nav: {
        inventory: 'Bestand',
        add: 'Hinzufügen',
        analytics: 'Analysen',
        purchaseList: 'Einkaufsliste',
        menu: 'Menü',
        language: 'Sprache'
    },
    purchaseList: {
        description: 'Artikel, die aufgrund niedrigen Lagerbestands nachbestellt werden sollten',
        totalItems: 'Artikel auf der Liste',
        currentQuantity: 'Aktuell',
        minQuantity: 'Mindestbestand',
        suggestedQuantity: 'Empfohlene Menge',
        unit: 'Einheit',
        lastUsed: 'Zuletzt verwendet',
        refresh: 'Aktualisieren'
    },
    inventory: {
        title: 'Inventar',
        search: 'Suchen...',
        allCategories: 'Alle Kategorien',
        name: 'Artikel',
        category: 'Kategorie',
        quantity: 'Menge',
        unit: 'Einheit',
        expiryDate: 'Haltbarkeit',
        status: 'Status',
        actions: 'Aktionen',
        scanBarcode: 'Barcode scannen'
    },
    categories: {
        food: 'Lebensmittel',
        medicine: 'Medikamente',
        cleaning: 'Reinigung',
        personal: 'Körperpflege',
        household: 'Haushalt',
        electronics: 'Elektronik'
    },
    stats: {
        totalItems: 'Gesamtanzahl',
        lowStock: 'Geringer Bestand',
        expiringSoon: 'Läuft bald ab',
        categories: 'Nach Kategorie'
    },
    add: {
        title: 'Neuer Artikel',
        editTitle: 'Artikel bearbeiten',
        name: 'Produktname',
        category: 'Kategorie',
        quantity: 'Menge',
        unit: 'Einheit',
        minQuantity: 'Mindestbestand',
        expiryDate: 'Ablaufdatum',
        description: 'Beschreibung (optional)',
        selectCategory: 'Bitte wählen',
        cancel: 'Abbrechen',
        save: 'Speichern',
        update: 'Übernehmen',
        barcode: 'Barcode',
        barcodeType: 'Typ',
        enterBarcode: 'Barcode eingeben oder generieren',
        generateBarcode: 'Generieren',
        barcodePreview: 'Vorschau',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Barcode im Rahmen positionieren',
        positionBarcode: 'Barcode in den Scanbereich halten',
        startScan: 'Starten',
        stopScan: 'Stoppen',
        browserNotSupported: 'Kamerazugriff nicht unterstützt',
        cameraPermissionDenied: 'Kamerazugriff verweigert',
        noCameraFound: 'Keine Kamera gefunden',
        cameraInUse: 'Kamera bereits in Verwendung',
        scan: 'Scannen',
        orUploadImage: 'Oder Bild hochladen',
        uploadImage: 'Bild auswählen'
    },
    analytics: {
        title: 'Analysen',
        smartAlerts: 'Benachrichtigungen',
        smartRecommendations: 'Empfehlungen'
    },
    status: {
        normal: 'Okay',
        lowStock: 'Wenig',
        expiringSoon: 'Läuft ab',
        expired: 'Abgelaufen'
    }
};