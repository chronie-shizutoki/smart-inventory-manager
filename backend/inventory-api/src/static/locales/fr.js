window.frMessages = {
    notifications: {
        barcodeError: 'Échec de génération du code-barres',
        itemAdded: 'Article ajouté',
        itemUpdated: 'Article mis à jour',
        itemDeleted: 'Article supprimé',
        error: 'Opération échouée. Veuillez réessayer',
        insufficientStock: 'Stock épuisé : {itemName}',
        itemUsedSuccessfully: '1 {unit} de {itemName} utilisé (reste {quantity} {unit})',
        itemFound: 'Article trouvé',
        itemNotFound: 'Article non trouvé',
        barcodeScanned: 'Code-barres scanné avec succès',
        invalidImageType: 'Type d\'image invalide. Veuillez sélectionner un fichier image.',
        processingImage: 'Traitement de l\'image...',
        noBarcodeFound: 'Aucun code-barres trouvé dans l\'image',
        imageProcessingError: 'Erreur lors du traitement de l\'image'
    },
    alerts: {
        lowStock: 'Stock bas',
        lowStockMessage: 'Il ne reste que {quantity} {unit} de {item}',
        expired: 'Expiré',
        expiredMessage: '{item} a expiré il y a {days} jours',
        expiringSoon: 'Expiration prochaine',
        expiringSoonMessage: '{item} expire dans {days} jours'
    },
    recommendations: {
        restock: 'Réapprovisionner {item}',
        restockReason: 'Stock actuel : {quantity} {unit} (min : {minQuantity} {unit})',
        popular: 'Article populaire',
        popularReason: '{item} est fréquemment utilisé',
        watch: 'Surveiller {item}',
        watchReason: 'Utilisé {count} fois dans les 30 derniers jours',
        consider: 'Réapprovisionner {item}',
        considerReason: 'Le plus utilisé dans {category} ({count} fois)'
    },
    app: {
        title: 'Inventaire Intelligent Maison'
    },
    nav: {
        inventory: 'Inventaire',
        add: 'Ajouter un Article',
        analytics: 'Analyse',
        purchaseList: 'Liste de Courses',
        menu: 'Menu',
        language: 'Langue'
    },
    purchaseList: {
        description: 'Articles à réapprovisionner en fonction des stocks bas',
        totalItems: 'Articles à Acheter',
        currentQuantity: 'Quantité Actuelle',
        minQuantity: 'Stock Min.',
        suggestedQuantity: 'Quantité Sug.',
        unit: 'Unité',
        lastUsed: 'Dernier Utilisation',
        refresh: 'Mettre à Jour la Liste'
    },
    inventory: {
        title: 'Inventaire',
        search: 'Rechercher des articles...',
        allCategories: 'Toutes les Catégories',
        name: 'Article',
        category: 'Catégorie',
        quantity: 'Qtité',
        unit: 'Unité',
        expiryDate: 'Date d\'Expiration',
        status: 'Statut',
        actions: 'Actions',
        scanBarcode: 'Scanner un Code-barres'
    },
    categories: {
        food: 'Aliments',
        medicine: 'Médicaments',
        cleaning: 'Produits de Nettoyage',
        personal: 'Soins Personnels',
        household: 'Articles Ménagers',
        electronics: 'Électronique'
    },
    stats: {
        totalItems: 'Total des Articles',
        lowStock: 'Stocks Bas',
        expiringSoon: 'Prochaines Expirations',
        categories: 'Catégories'
    },
    add: {
        title: 'Ajouter un Article',
        editTitle: 'Modifier un Article',
        name: 'Nom de l\'Article',
        category: 'Catégorie',
        quantity: 'Quantité',
        unit: 'Unité',
        minQuantity: 'Stock Minimum',
        expiryDate: 'Date d\'Expiration',
        description: 'Description',
        selectCategory: 'Sélectionner une Catégorie',
        cancel: 'Annuler',
        save: 'Enregistrer',
        update: 'Mettre à Jour',
        barcode: 'Code-barres',
        barcodeType: 'Type de Code-barres',
        enterBarcode: 'Entrez un code-barres ou en générez un',
        generateBarcode: 'Générer',
        barcodePreview: 'Aperçu du Code-barres',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Aligner le code-barres dans le cadre',
        positionBarcode: 'Positionner le code-barres dans la zone de scan',
        startScan: 'Démarrer le Scan',
        stopScan: 'Arrêter le Scan',
        browserNotSupported: 'Le navigateur ne prend pas en charge l\'accès à la caméra',
        cameraPermissionDenied: 'Permission de caméra refusée',
        noCameraFound: 'Aucune caméra trouvée',
        cameraInUse: 'La caméra est utilisée par une autre application',
        scan: 'Scanner',
        orUploadImage: 'Ou télécharger une image',
        uploadImage: 'Télécharger une Image'
    },
    analytics: {
        title: 'Analyse',
        smartAlerts: 'Alertes',
        smartRecommendations: 'Recommandations'
    },
    status: {
        normal: 'Normal',
        lowStock: 'Stock Bas',
        expiringSoon: 'Expiration Prochaine',
        expired: 'Expiré'
    }
};