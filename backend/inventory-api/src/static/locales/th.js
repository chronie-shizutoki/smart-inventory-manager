window.thMessages = {
    notifications: {
        barcodeError: 'สร้างบาร์โค้ดไม่สำเร็จ',
        itemAdded: 'เพิ่มรายการแล้ว',
        itemUpdated: 'อัปเดตรายการแล้ว',
        itemDeleted: 'ลบรายการแล้ว',
        error: 'การดำเนินการล้มเหลว โปรดลองอีกครั้ง',
        insufficientStock: 'สินค้าหมด: {itemName}',
        itemUsedSuccessfully: '{itemName} 1 {unit} ถูกใช้งาน ({quantity} {unit} คงเหลือ)',
        itemFound: 'พบรายการ',
        itemNotFound: 'ไม่พบรายการ',
        barcodeScanned: 'สแกนบาร์โค้ดสำเร็จ',
        invalidImageType: 'ประเภทภาพไม่ถูกต้อง โปรดเลือกไฟล์ภาพ',
        processingImage: 'กำลังประมวลผลภาพ...',
        noBarcodeFound: 'ไม่พบบาร์โค้ดในภาพ',
        imageProcessingError: 'เกิดข้อผิดพลาดในการประมวลผลภาพ'
    },
    alerts: {
        lowStock: 'สินค้าคงเหลือน้อย',
        lowStockMessage: 'เหลือเพียง {quantity} {unit} จาก {item}',
        expired: 'หมดอายุ',
        expiredMessage: '{item} หมดอายุเมื่อ {days} วันที่แล้ว',
        expiringSoon: 'ใกล้หมดอายุ',
        expiringSoonMessage: '{item} จะหมดอายุใน {days} วัน'
    },
    recommendations: {
        restock: 'สั่งซื้อ {item} ใหม่',
        restockReason: 'สินค้าคงเหลือปัจจุบัน: {quantity} {unit} (ขั้นต่ำ: {minQuantity} {unit})',
        popular: 'รายการยอดนิยม',
        popularReason: '{item} ถูกใช้บ่อย',
        watch: 'ติดตาม {item}',
        watchReason: 'ถูกใช้ {count} ครั้งใน 30 วันที่ผ่านมา',
        consider: 'พิจารณาสั่งซื้อ {item} ใหม่',
        considerReason: 'ใช้มากที่สุดในหมวด {category} ({count} ครั้ง)'
    },
    app: {
        title: 'คลังสินค้าบ้านอัจฉริยะ'
    },
    nav: {
        inventory: 'คลังสินค้า',
        add: 'เพิ่มรายการ',
        analytics: 'การวิเคราะห์',
        purchaseList: 'รายการซื้อ',
        menu: 'เมนู',
        language: 'ภาษา'
    },
    purchaseList: {
        description: 'รายการที่ต้องสั่งซื้อใหม่ตามสินค้าคงเหลือน้อย',
        totalItems: 'จำนวนรายการที่ต้องซื้อ',
        currentQuantity: 'จำนวนปัจจุบัน',
        minQuantity: 'สินค้าคงเหลือขั้นต่ำ',
        suggestedQuantity: 'จำนวนที่แนะนำ',
        unit: 'หน่วย',
        lastUsed: 'ใช้ล่าสุด',
        refresh: 'รีเฟรชรายการ'
    },
    inventory: {
        title: 'คลังสินค้า',
        search: 'ค้นหารายการ...',
        allCategories: 'หมวดหมู่ทั้งหมด',
        name: 'รายการ',
        category: 'หมวดหมู่',
        quantity: 'จำนวน',
        unit: 'หน่วย',
        expiryDate: 'วันหมดอายุ',
        status: 'สถานะ',
        actions: 'การกระทำ',
        scanBarcode: 'สแกนบาร์โค้ด'
    },
    categories: {
        food: 'อาหาร',
        medicine: 'ยา',
        cleaning: 'สิ่ง清洁',
        personal: 'การดูแลส่วนตัว',
        household: 'ครุภัณฑ์ในบ้าน',
        electronics: 'อิเล็กทรอนิกส์'
    },
    stats: {
        totalItems: 'จำนวนรายการทั้งหมด',
        lowStock: 'สินค้าคงเหลือน้อย',
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
        minQuantity: 'สินค้าคงเหลือขั้นต่ำ',
        expiryDate: 'วันหมดอายุ',
        description: 'คำอธิบาย',
        selectCategory: 'เลือกหมวดหมู่',
        cancel: 'ยกเลิก',
        save: 'บันทึก',
        update: 'อัปเดต',
        barcode: 'บาร์โค้ด',
        barcodeType: 'ประเภทบาร์โค้ด',
        enterBarcode: 'ป้อนบาร์โค้ดหรือสร้างใหม่',
        generateBarcode: 'สร้าง',
        barcodePreview: 'ตัวอย่างบาร์โค้ด',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'จัดตำแหน่งบาร์โค้ดภายในกรอบ',
        positionBarcode: 'วางบาร์โค้ดภายในพื้นที่สแกน',
        startScan: 'เริ่มสแกน',
        stopScan: 'หยุดสแกน',
        browserNotSupported: 'เบราว์เซอร์ไม่สนับสนุนการเข้าถึงกล้อง',
        cameraPermissionDenied: 'การอนุญาตกล้องถูกปฏิเสธ',
        noCameraFound: 'ไม่พบกล้อง',
        cameraInUse: 'กล้องกำลังถูกใช้โดยแอปพลิเคชันอื่น',
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
        lowStock: 'สินค้าคงเหลือน้อย',
        expiringSoon: 'ใกล้หมดอายุ',
        expired: 'หมดอายุ'
    }
};