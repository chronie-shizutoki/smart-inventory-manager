window.esMessages = {
    notifications: {
        barcodeError: 'Error al generar el código de barras',
        itemAdded: '¡Artículo añadido!',
        itemUpdated: '¡Artículo actualizado!',
        itemDeleted: '¡Artículo eliminado!',
        error: 'Error en la operación. Por favor, inténtelo de nuevo.',
        insufficientStock: 'Stock insuficiente: {itemName}',
        itemUsedSuccessfully: 'Se usó 1 {unit} de {itemName} ({quantity} {unit} restantes)',
        itemFound: 'Artículo encontrado',
        itemNotFound: 'Artículo no encontrado',
        barcodeScanned: 'Código de barras escaneado correctamente',
        invalidImageType: 'Tipo de imagen no válido. Por favor, seleccione un archivo de imagen.',
        processingImage: 'Procesando imagen...',
        noBarcodeFound: 'No se encontró ningún código de barras en la imagen',
        imageProcessingError: 'Error al procesar la imagen'
    },
    alerts: {
        lowStock: 'Stock bajo',
        lowStockMessage: 'Solo quedan {quantity} {unit} de {item}',
        expired: 'Caducado',
        expiredMessage: '{item} caducó hace {days} días',
        expiringSoon: 'Próximo a caducar',
        expiringSoonMessage: '{item} caduca en {days} días'
    },
    recommendations: {
        restock: 'Reabastecer {item}',
        restockReason: 'Stock actual: {quantity} {unit} (mínimo: {minQuantity} {unit})',
        popular: 'Artículo popular',
        popularReason: '{item} se utiliza frecuentemente',
        watch: 'Vigilar {item}',
        watchReason: 'Usado {count} veces en los últimos 30 días',
        consider: 'Considere reabastecer {item}',
        considerReason: 'El más usado en {category} ({count} veces)'
    },
    app: {
        title: 'Inventario Inteligente para el Hogar' // (Perfecto)
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
        description: 'Artículos para reabastecer basados en el stock bajo',
        totalItems: 'Artículos para comprar',
        currentQuantity: 'Cantidad actual',
        minQuantity: 'Stock mínimo',
        suggestedQuantity: 'Cantidad sugerida',
        unit: 'Unidad',
        lastUsed: 'Último uso',
        refresh: 'Actualizar lista'
    },
    inventory: {
        title: 'Inventario',
        search: 'Buscar artículos...',
        allCategories: 'Todas las categorías',
        name: 'Artículo',
        category: 'Categoría',
        quantity: 'Cant.',
        unit: 'Unidad',
        expiryDate: 'Caducidad', // Más común para productos
        status: 'Estado',
        actions: 'Acciones',
        scanBarcode: 'Escanear código de barras'
    },
    categories: {
        food: 'Alimentos',
        medicine: 'Medicamentos',
        cleaning: 'Productos de limpieza',
        personal: 'Cuidado personal',
        household: 'Artículos del hogar',
        electronics: 'Electrónica' // Forma más común para la categoría
    },
    stats: {
        totalItems: 'Total de artículos',
        lowStock: 'Stock bajo',
        expiringSoon: 'Próximo a caducar',
        categories: 'Categorías'
    },
    add: {
        title: 'Añadir artículo',
        editTitle: 'Editar artículo',
        name: 'Nombre del artículo',
        category: 'Categoría',
        quantity: 'Cantidad',
        unit: 'Unidad',
        minQuantity: 'Stock mínimo',
        expiryDate: 'Fecha de caducidad',
        description: 'Descripción (opcional)', // Añadido "(opcional)" si no es obligatorio
        selectCategory: 'Seleccionar categoría',
        cancel: 'Cancelar',
        save: 'Guardar',
        update: 'Actualizar',
        barcode: 'Código de barras',
        barcodeType: 'Tipo de código de barras',
        enterBarcode: 'Introduzca el código de barras o genere uno',
        generateBarcode: 'Generar',
        barcodePreview: 'Vista previa del código de barras',
        ean13: 'EAN-13', // Los estándares de código de barras no se traducen
        upca: 'UPC-A', // Los estándares de código de barras no se traducen
        scanBarcodeMessage: 'Alinee el código de barras dentro del marco',
        positionBarcode: 'Coloque el código de barras dentro del área de escaneo',
        startScan: 'Comenzar escaneo',
        stopScan: 'Detener escaneo',
        browserNotSupported: 'Su navegador no admite el acceso a la cámara',
        cameraPermissionDenied: 'Permiso de cámara denegado',
        noCameraFound: 'No se encontró ninguna cámara',
        cameraInUse: 'La cámara está siendo utilizada por otra aplicación',
        scan: 'Escanear',
        orUploadImage: 'O subir una imagen',
        uploadImage: 'Subir imagen'
    },
    analytics: {
        title: 'Análisis',
        smartAlerts: 'Alertas Inteligentes',
        smartRecommendations: 'Recomendaciones'
    },
    status: {
        normal: 'Normal',
        lowStock: 'Stock bajo',
        expiringSoon: 'Próximo a caducar',
        expired: 'Caducado'
    }
};