window.enMessages = {
    notifications: {
        barcodeError: 'Barcode generation failed',
        itemAdded: 'Item added successfully',
        itemUpdated: 'Item updated successfully',
        itemDeleted: 'Item deleted successfully',
        error: 'Operation failed. Please try again',
        insufficientStock: 'Insufficient stock: {itemName}',
        itemUsedSuccessfully: 'Used 1 {unit} of {itemName} ({quantity} {unit} remaining)',
        itemFound: 'Item found',
        itemNotFound: 'Item not found',
        barcodeScanned: 'Barcode scanned successfully',
        invalidImageType: 'Invalid image format. Please select a valid image file.',
        processingImage: 'Processing image...',
        noBarcodeFound: 'No barcode detected in the image',
        imageProcessingError: 'Failed to process image'
    },
    alerts: {
        lowStock: 'Low Stock Alert',
        lowStockMessage: 'Only {quantity} {unit} of {item} remaining',
        expired: 'Expired Item',
        expiredMessage: '{item} expired {days} days ago',
        expiringSoon: 'Expiring Soon',
        expiringSoonMessage: '{item} will expire in {days} days'
    },
    recommendations: {
        restock: 'Restock {item}',
        restockReason: 'Current stock: {quantity} {unit} (minimum: {minQuantity} {unit})',
        popular: 'Popular Item',
        popularReason: '{item} is frequently used',
        watch: 'Monitor {item}',
        watchReason: 'Used {count} times in the past 30 days',
        freqUseReason: 'Used {count} times in the past 30 days (current stock: {quantity} {unit})',
        consider: 'Restock {item}',
        considerReason: 'Most used item in {category} ({count} times)'
    },
    app: {
        title: 'Smart Home Inventory'
    },
    nav: {
        inventory: 'Inventory',
        add: 'Add Item',
        analytics: 'Analytics',
        purchaseList: 'Shopping List',
        menu: 'Menu',
        language: 'Language'
    },
    purchaseList: {
        description: 'Items to restock based on current inventory levels',
        totalItems: 'Items to Purchase',
        currentQuantity: 'Current Qty',
        minQuantity: 'Min Stock',
        suggestedQuantity: 'Suggested Qty',
        unit: 'Unit',
        lastUsed: 'Last Used',
        refresh: 'Refresh List'
    },
    inventory: {
        title: 'Inventory',
        search: 'Search items...',
        allCategories: 'All Categories',
        name: 'Item Name',
        category: 'Category',
        quantity: 'Quantity',
        unit: 'Unit',
        expiryDate: 'Expiry Date',
        status: 'Status',
        actions: 'Actions',
        scanBarcode: 'Scan Barcode'
    },
    categories: {
        food: 'Food',
        medicine: 'Medicine',
        cleaning: 'Cleaning Supplies',
        personal: 'Personal Care',
        household: 'Household Items',
        electronics: 'Electronics'
    },
    stats: {
        totalItems: 'Total Items',
        lowStock: 'Low Stock',
        expiringSoon: 'Expiring Soon',
        categories: 'Categories'
    },
    add: {
        title: 'Add New Item',
        editTitle: 'Edit Item',
        name: 'Item Name',
        category: 'Category',
        quantity: 'Quantity',
        unit: 'Unit',
        minQuantity: 'Minimum Stock',
        expiryDate: 'Expiry Date',
        description: 'Description',
        selectCategory: 'Select Category',
        cancel: 'Cancel',
        save: 'Save',
        update: 'Update',
        barcode: 'Barcode',
        barcodeType: 'Barcode Type',
        enterBarcode: 'Enter barcode or generate one',
        generateBarcode: 'Generate',
        barcodePreview: 'Barcode Preview',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Align barcode within the frame',
        positionBarcode: 'Position barcode within the scan area',
        startScan: 'Start Scan',
        stopScan: 'Stop Scan',
        browserNotSupported: 'Browser does not support camera access',
        cameraPermissionDenied: 'Camera permission denied',
        noCameraFound: 'No camera detected',
        cameraInUse: 'Camera is currently in use by another application',
        scan: 'Scan',
        orUploadImage: 'Or upload an image',
        uploadImage: 'Upload Image'
    },
    analytics: {
        title: 'Analytics',
        smartAlerts: 'Alerts',
        smartRecommendations: 'Recommendations'
    },
    status: {
        normal: 'Normal',
        lowStock: 'Low Stock',
        expiringSoon: 'Expiring Soon',
        expired: 'Expired'
    },
    aiRecord: {
        title: 'AI Record Generator',
        description: 'Generate inventory records from images using AI',
        apiKey: 'SiliconFlow API Key',
        apiKeyHint: 'You can get your API key from SiliconFlow console',
        uploadImages: 'Upload Images',
        dragDropOrClick: 'Drag & drop files or click to upload',
        supportedFormats: 'Supports JPG, PNG, WebP (max 10 images)',
        uploadedImages: 'Uploaded Images',
        generateRecords: 'Generate Records',
        aiRecordButton: 'AI Record',
        generating: 'Generating records...',
        success: 'Records generated successfully',
        error: 'Failed to generate records'
    }
};