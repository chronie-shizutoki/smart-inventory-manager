window.enMessages = {
    notifications: {
        itemAdded: 'Item added successfully',
        itemUpdated: 'Item updated successfully',
        itemDeleted: 'Item deleted successfully',
        error: 'Operation failed. Please try again',
        insufficientStock: 'Insufficient stock: {itemName}',
        itemUsedSuccessfully: 'Used 1 {unit} of {itemName} ({quantity} {unit} remaining)',
        confirmDelete: 'Are you sure you want to delete this item?'
    },
    app: {
        title: 'Smart Home Inventory'
    },
    nav: {
        inventory: 'Inventory',
        add: 'Add Item',
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
        refresh: 'Refresh List',
        print: 'Print List'
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
        showExpired: 'Show Not-Only-Expired Items'
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
        update: 'Update'
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
        apiKeyRequired: 'Please enter API key',
        noImagesSelected: 'Please select at least one image',
        apiKeyHint: 'You can get your API key from SiliconFlow console.\nDue to security risks, we no longer provide API key storage functionality.',
        uploadImages: 'Upload Images',
        dragDropOrClick: 'Drag & drop files or click to upload',
        supportedFormats: 'Supports JPG, PNG, WebP (max 10 images)',
        uploadedImages: 'Uploaded Images',
        generateRecords: 'Generate Records',
        aiRecordButton: 'AI Record',
        generating: 'Generating records...',
        generatingRecords: 'Generating records, please wait...',
        success: 'Records generated successfully',
        error: 'Failed to generate records',
        failedToGenerate: 'Failed to generate records, please check your images and API key',
        recordsGenerated: 'Records Generated',
        reviewAndConfirm: 'Please review and confirm the following generated records',
        noRecordsGenerated: 'No records generated',
        confirmAdd: 'Confirm Add',
        editRecord: 'Edit Record'
    },
    expense: {
        fetchData: 'Recent expense from HFT',
        fetchingData: 'Fetching data, please wait...',
        dataFetched: 'Data fetched successfully',
        noValidData: 'No valid expense data found'
    }
};