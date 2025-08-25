window.frMessages = {
    notifications: {
        barcodeError: 'Échec de la génération du code-barres',
        itemAdded: 'Article ajouté',
        itemUpdated: 'Article mis à jour',
        itemDeleted: 'Article supprimé',
        error: 'L\'opération a échoué. Veuillez réessayer.',
        insufficientStock: 'Stock insuffisant : {itemName}',
        itemUsedSuccessfully: '1 {unit} de {itemName} utilisé (reste {quantity} {unit})',
        itemFound: 'Article trouvé',
        itemNotFound: 'Article non trouvé',
        barcodeScanned: 'Code-barres scanné',
        invalidImageType: 'Type d\'image non valide. Veuillez sélectionner un fichier image.',
        processingImage: 'Traitement de l\'image en cours...',
        noBarcodeFound: 'Aucun code-barres détecté dans l\'image',
        imageProcessingError: 'Erreur lors du traitement de l\'image'
    },
    alerts: {
        lowStock: 'Stock faible',
        lowStockMessage: 'Il ne reste plus que {quantity} {unit} de {item}',
        expired: 'Expiré',
        expiredMessage: '{item} a expiré il y a {days} jours',
        expiringSoon: 'Expiration proche',
        expiringSoonMessage: '{item} expire dans {days} jours'
    },
    recommendations: {
        restock: 'Réapprovisionner {item}',
        restockReason: 'Stock actuel : {quantity} {unit} (seuil min. : {minQuantity} {unit})',
        popular: 'Article populaire',
        popularReason: '{item} est fréquemment utilisé',
        watch: 'Surveiller {item}',
        watchReason: 'Utilisé {count} fois ces 30 derniers jours',
        consider: 'Pensez à réapprovisionner {item}',
        considerReason: 'Article le plus utilisé dans {category} ({count} fois)'
    },
    app: {
        title: 'Gestionnaire Intelligent d\'Inventaire Domestique' // Alternative plus précise
    },
    nav: {
        inventory: 'Inventaire',
        add: 'Ajouter un article',
        analytics: 'Analytiques',
        purchaseList: 'Liste de courses',
        menu: 'Menu',
        language: 'Langue'
    },
    purchaseList: {
        description: 'Articles à réapprovisionner en raison d\'un stock faible',
        totalItems: 'Articles à acheter',
        currentQuantity: 'Quantité actuelle',
        minQuantity: 'Stock minimum',
        suggestedQuantity: 'Quantité suggérée',
        unit: 'Unité',
        lastUsed: 'Dernière utilisation',
        refresh: 'Actualiser la liste'
    },
    inventory: {
        title: 'Inventaire',
        search: 'Rechercher un article...',
        allCategories: 'Toutes les catégories',
        name: 'Article',
        category: 'Catégorie',
        quantity: 'Quantité',
        unit: 'Unité',
        expiryDate: 'Date d\'expiration',
        status: 'Statut',
        actions: 'Actions',
        scanBarcode: 'Scanner un code-barres'
    },
    categories: {
        food: 'Alimentation',
        medicine: 'Médicaments',
        cleaning: 'Entretien',
        personal: 'Hygiène & Soins',
        household: 'Articles ménagers',
        electronics: 'Électronique'
    },
    stats: {
        totalItems: 'Nombre total d\'articles',
        lowStock: 'Stocks faibles',
        expiringSoon: 'Expirations proches',
        categories: 'Répartition par catégorie'
    },
    add: {
        title: 'Ajouter un article',
        editTitle: 'Modifier l\'article',
        name: 'Nom de l\'article',
        category: 'Catégorie',
        quantity: 'Quantité',
        unit: 'Unité',
        minQuantity: 'Stock minimum',
        expiryDate: 'Date d\'expiration',
        description: 'Description (optionnelle)', // Ajout de (optionnelle) si le champ l'est
        selectCategory: 'Sélectionnez une catégorie',
        cancel: 'Annuler',
        save: 'Enregistrer',
        update: 'Mettre à jour',
        barcode: 'Code-barres',
        barcodeType: 'Format du code-barres',
        enterBarcode: 'Saisir ou générer un code-barres',
        generateBarcode: 'Générer',
        barcodePreview: 'Aperçu du code-barres',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Alignez le code-barres dans le cadre',
        positionBarcode: 'Positionnez le code-barres dans la zone de scan',
        startScan: 'Démarrer le scan',
        stopScan: 'Arrêter le scan',
        browserNotSupported: 'Votre navigateur ne prend pas en charge l\'accès à la caméra',
        cameraPermissionDenied: 'Accès à la caméra refusé',
        noCameraFound: 'Aucune caméra disponible',
        cameraInUse: 'La caméra est déjà utilisée par une autre application',
        scan: 'Scanner',
        orUploadImage: 'Ou importer une image',
        uploadImage: 'Importer une image'
    },
    analytics: {
        title: 'Analytiques',
        smartAlerts: 'Alertes',
        smartRecommendations: 'Recommandations'
    },
    status: {
        normal: 'Normal',
        lowStock: 'Stock faible',
        expiringSoon: 'Expiration proche',
        expired: 'Expiré'
    }
};