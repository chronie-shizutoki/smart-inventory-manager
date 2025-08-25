window.thMessages = {
    notifications: {
        barcodeError: 'สร้างบาร์โค้ดไม่สำเร็จ',
        itemAdded: 'เพิ่มรายการเรียบร้อยแล้ว',
        itemUpdated: 'อัปเดตรายการเรียบร้อยแล้ว',
        itemDeleted: 'ลบรายการเรียบร้อยแล้ว',
        error: 'การดำเนินการล้มเหลว กรุณาลองอีกครั้ง',
        insufficientStock: 'สต็อกไม่เพียงพอ: {itemName}',
        itemUsedSuccessfully: 'ใช้ {itemName} ไป 1 {unit} เรียบร้อยแล้ว (เหลือ {quantity} {unit})',
        itemFound: 'พบรายการ',
        itemNotFound: 'ไม่พบรายการ',
        barcodeScanned: 'สแกนบาร์โค้ดเรียบร้อยแล้ว',
        invalidImageType: 'ประเภทไฟล์ภาพไม่ถูกต้อง กรุณาเลือกไฟล์ภาพ',
        processingImage: 'กำลังประมวลผลภาพ...',
        noBarcodeFound: 'ไม่พบบาร์โค้ดในภาพ',
        imageProcessingError: 'เกิดข้อผิดพลาดในการประมวลผลภาพ'
    },
    alerts: {
        lowStock: 'สินค้าหมดเร็ว',
        lowStockMessage: '{item} เหลือเพียง {quantity} {unit}',
        expired: 'สินค้าหมดอายุ',
        expiredMessage: '{item} หมดอายุเมื่อ {days} วันที่แล้ว',
        expiringSoon: 'สินค้าใกล้หมดอายุ',
        expiringSoonMessage: '{item} จะหมดอายุในอีก {days} วัน'
    },
    recommendations: {
        restock: 'ควรสั่งซื้อ {item} เพิ่ม',
        restockReason: 'สต็อกปัจจุบัน: {quantity} {unit} (ขั้นต่ำ: {minQuantity} {unit})',
        popular: 'สินค้ายอดนิยม',
        popularReason: '{item} ถูกใช้งานบ่อย',
        watch: 'ควรติดตาม {item}',
        watchReason: 'ถูกใช้งาน {count} ครั้งใน 30 วันที่ผ่านมา',
        consider: 'พิจารณาสั่งซื้อ {item} เพิ่ม',
        considerReason: 'ใช้งานมากที่สุดในหมวด {category} ({count} ครั้ง)'
    },
    app: {
        title: 'ระบบจัดการคลังสินค้าในบ้านอัจฉริยะ'
    },
    nav: {
        inventory: 'คลังสินค้า',
        add: 'เพิ่มรายการ',
        analytics: 'วิเคราะห์',
        purchaseList: 'รายการซื้อ',
        menu: 'เมนู',
        language: 'ภาษา'
    },
    purchaseList: {
        description: 'รายการสินค้าที่ควรสั่งซื้อเพิ่มเนื่องจากสต็อกเหลือน้อย',
        totalItems: 'จำนวนรายการที่ต้องซื้อ',
        currentQuantity: 'จำนวนปัจจุบัน',
        minQuantity: 'จำนวนขั้นต่ำ',
        suggestedQuantity: 'จำนวนที่แนะนำ',
        unit: 'หน่วย',
        lastUsed: 'ใช้งานล่าสุด',
        refresh: 'รีเฟรชรายการ'
    },
    inventory: {
        title: 'คลังสินค้า',
        search: 'ค้นหารายการ...',
        allCategories: 'ทั้งหมด',
        name: 'ชื่อรายการ',
        category: 'หมวดหมู่',
        quantity: 'จำนวน',
        unit: 'หน่วย',
        expiryDate: 'วันหมดอายุ',
        status: 'สถานะ',
        actions: 'การดำเนินการ',
        scanBarcode: 'สแกนบาร์โค้ด'
    },
    categories: {
        food: 'อาหาร',
        medicine: 'ยา',
        cleaning: 'ผลิตภัณฑ์ทำความสะอาด',
        personal: 'ของใช้ส่วนตัว',
        household: 'เครื่องใช้ในครัวเรือน',
        electronics: 'อิเล็กทรอนิกส์'
    },
    stats: {
        totalItems: 'รายการทั้งหมด',
        lowStock: 'สต็อกต่ำ',
        expiringSoon: 'ใกล้หมดอายุ',
        categories: 'หมวดหมู่'
    },
    add: {
        title: 'เพิ่มรายการ',
        editTitle: 'แก้ไขรายการ',
        name: 'ชื่อรายการ',
        category: 'หมวดหมู่',
        quantity: 'จำนวน',
        unit: 'หน่วย',
        minQuantity: 'จำนวนขั้นต่ำ',
        expiryDate: 'วันหมดอายุ',
        description: 'คำอธิบาย',
        selectCategory: 'เลือกหมวดหมู่',
        cancel: 'ยกเลิก',
        save: 'บันทึก',
        update: 'อัปเดต',
        barcode: 'บาร์โค้ด',
        barcodeType: 'ประเภทบาร์โค้ด',
        enterBarcode: 'ป้อนหรือสร้างบาร์โค้ด',
        generateBarcode: 'สร้าง',
        barcodePreview: 'ตัวอย่างบาร์โค้ด',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'จัดบาร์โค้ดภายในกรอบ',
        positionBarcode: 'วางบาร์โค้ดในพื้นที่สแกน',
        startScan: 'เริ่มสแกน',
        stopScan: 'หยุดสแกน',
        browserNotSupported: 'เบราว์เซอร์ไม่รองรับการใช้งานกล้อง',
        cameraPermissionDenied: 'ไม่ได้อนุญาตให้ใช้งานกล้อง',
        noCameraFound: 'ไม่พบกล้อง',
        cameraInUse: 'กล้องถูกใช้งานโดยแอปอื่นอยู่',
        scan: 'สแกน',
        orUploadImage: 'หรืออัปโหลดภาพ',
        uploadImage: 'อัปโหลดภาพ'
    },
    analytics: {
        title: 'การวิเคราะห์',
        smartAlerts: 'การแจ้งเตือนอัจฉริยะ',
        smartRecommendations: 'คำแนะนำอัจฉริยะ'
    },
    status: {
        normal: 'ปกติ',
        lowStock: 'สต็อกต่ำ',
        expiringSoon: 'ใกล้หมดอายุ',
        expired: 'หมดอายุ'
    }
};