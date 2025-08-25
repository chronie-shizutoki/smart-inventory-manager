window.esMessages = {
    notifications: {
        barcodeError: 'Error al generar código de barras',
        itemAdded: 'Artículo añadido',
        itemUpdated: 'Artículo actualizado',
        itemDeleted: 'Artículo eliminado',
        error: 'Operación fallida. Inténtelo de nuevo',
        insufficientStock: 'Sin existencias: {itemName}',
        itemUsedSuccessfully: 'Usado 1 {unit} de {itemName} (quedan {quantity} {unit})',
        itemFound: 'Artículo encontrado',
        itemNotFound: 'Artículo no encontrado',
        barcodeScanned: 'Código de barras escaneado con éxito',
        invalidImageType: 'Tipo de imagen inválido. Seleccione un archivo de imagen.',
        processingImage: 'Procesando imagen...',
        noBarcodeFound: 'No se encontró código de barras en la imagen',
        imageProcessingError: 'Error al procesar la imagen'
    },
    alerts: {
        lowStock: 'Stock bajo',
        lowStockMessage: 'Quedan solo {quantity} {unit} de {item}',
        expired: 'Vencido',
        expiredMessage: '{item} venció hace {days} días',
        expiringSoon: 'Próximo a vencer',
        expiringSoonMessage: '{item} vence en {days} días'
    },
    recommendations: {
        restock: 'Reabastecer {item}',
        restockReason: 'Stock actual: {quantity} {unit} (mínimo: {minQuantity} {unit})',
        popular: 'Artículo popular',
        popularReason: '{item} se usa con frecuencia',
        watch: 'Monitorizar {item}',
        watchReason: 'Usado {count} veces en los últimos 30 días',
        consider: 'Reabastecer {item}',
        considerReason: 'Más usado en {category} ({count} veces)'
    },
    app: {
        title: 'Inventario Inteligente para el Hogar'
    },
    nav: {
        inventory: 'Inventario',
        add: 'Añadir Artículo',
        analytics: 'Análisis',
        purchaseList: 'Lista de Compra',
        menu: 'Menú',
        language: 'Idioma'
    },
    purchaseList: {
        description: 'Artículos para reabastecer basados en el inventario bajo',
        totalItems: 'Artículos para Comprar',
        currentQuantity: 'Cantidad Actual',
        minQuantity: 'Stock Mínimo',
        suggestedQuantity: 'Cantidad Sugerida',
        unit: 'Unidad',
        lastUsed: 'Último Uso',
        refresh: 'Actualizar Lista'
    },
    inventory: {
        title: 'Inventario',
        search: 'Buscar artículos...',
        allCategories: 'Todas las Categorías',
        name: 'Artículo',
        category: 'Categoría',
        quantity: 'Cant.',
        unit: 'Unidad',
        expiryDate: 'Vencimiento',
        status: 'Estado',
        actions: 'Acciones',
        scanBarcode: 'Escanear Código de Barras'
    },
    categories: {
        food: 'Alimentos',
        medicine: 'Medicamentos',
        cleaning: 'Productos de Limpieza',
        personal: 'Cuidado Personal',
        household: 'Artículos del Hogar',
        electronics: 'Electrónicos'
    },
    stats: {
        totalItems: 'Total de Artículos',
        lowStock: 'Stock Bajo',
        expiringSoon: 'Próximo a Vencer',
        categories: 'Categorías'
    },
    add: {
        title: 'Añadir Artículo',
        editTitle: 'Editar Artículo',
        name: 'Nombre del Artículo',
        category: 'Categoría',
        quantity: 'Cantidad',
        unit: 'Unidad',
        minQuantity: 'Stock Mínimo',
        expiryDate: 'Fecha de Vencimiento',
        description: 'Descripción',
        selectCategory: 'Seleccionar Categoría',
        cancel: 'Cancelar',
        save: 'Guardar',
        update: 'Actualizar',
        barcode: 'Código de Barras',
        barcodeType: 'Tipo de Código de Barras',
        enterBarcode: 'Introducir código de barras o generar uno',
        generateBarcode: 'Generar',
        barcodePreview: 'Vista Previa del Código de Barras',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Alinear el código de barras dentro del marco',
        positionBarcode: 'Posicionar el código de barras dentro del área de escaneo',
        startScan: 'Iniciar Escaneo',
        stopScan: 'Detener Escaneo',
        browserNotSupported: 'El navegador no admite el acceso a la cámara',
        cameraPermissionDenied: 'Permiso de cámara denegado',
        noCameraFound: 'No se encontró cámara',
        cameraInUse: 'La cámara está en uso por otra aplicación',
        scan: 'Escanear',
        orUploadImage: 'O subir imagen',
        uploadImage: 'Subir Imagen'
    },
    analytics: {
        title: 'Análisis',
        smartAlerts: 'Alertas',
        smartRecommendations: 'Recomendaciones'
    },
    status: {
        normal: 'Normal',
        lowStock: 'Stock Bajo',
        expiringSoon: 'Próximo a Vencer',
        expired: 'Vencido'
    }
};