window.viMessages = {
    notifications: {
        barcodeError: 'Không thể tạo mã vạch',
        itemAdded: 'Đã thêm mặt hàng',
        itemUpdated: 'Đã cập nhật mặt hàng',
        itemDeleted: 'Đã xóa mặt hàng',
        error: 'Thao tác thất bại. Vui lòng thử lại',
        insufficientStock: 'Đã hết hàng: {itemName}',
        itemUsedSuccessfully: 'Đã sử dụng 1 {unit} {itemName} (còn lại {quantity} {unit})',
        itemFound: 'Đã tìm thấy mặt hàng',
        itemNotFound: 'Không tìm thấy mặt hàng',
        barcodeScanned: 'Quét mã vạch thành công',
        invalidImageType: 'Định dạng hình ảnh không hợp lệ. Vui lòng chọn tệp hình ảnh.',
        processingImage: 'Đang xử lý hình ảnh...',
        noBarcodeFound: 'Không tìm thấy mã vạch trong hình ảnh',
        imageProcessingError: 'Lỗi xử lý hình ảnh'
    },
    alerts: {
        lowStock: 'Cảnh báo tồn kho thấp',
        lowStockMessage: '{item} chỉ còn {quantity} {unit}',
        expired: 'Mặt hàng đã hết hạn',
        expiredMessage: '{item} đã hết hạn {days} ngày trước',
        expiringSoon: 'Mặt hàng sắp hết hạn',
        expiringSoonMessage: '{item} sẽ hết hạn trong {days} ngày'
    },
    recommendations: {
        restock: 'Cần nhập thêm {item}',
        restockReason: 'Tồn kho hiện tại: {quantity} {unit} (mức tối thiểu: {minQuantity} {unit})',
        popular: 'Mặt hàng phổ biến',
        popularReason: '{item} được sử dụng thường xuyên',
        watch: 'Theo dõi {item}',
        watchReason: 'Đã sử dụng {count} lần trong 30 ngày qua',
        consider: 'Cân nhắc nhập thêm {item}',
        considerReason: 'Được sử dụng nhiều nhất trong danh mục {category} ({count} lần)'
    },
    app: {
        title: 'Kho Thông Minh'
    },
    nav: {
        inventory: 'Tồn kho',
        add: 'Thêm mặt hàng',
        analytics: 'Phân tích',
        purchaseList: 'Danh sách mua hàng',
        menu: 'Menu',
        language: 'Ngôn ngữ'
    },
    purchaseList: {
        description: 'Các mặt hàng cần bổ sung dựa trên mức tồn kho thấp',
        totalItems: 'Tổng số mặt hàng cần mua',
        currentQuantity: 'Số lượng hiện tại',
        minQuantity: 'Mức tối thiểu',
        suggestedQuantity: 'Đề xuất mua',
        unit: 'Đơn vị',
        lastUsed: 'Lần dùng cuối',
        refresh: 'Làm mới'
    },
    inventory: {
        title: 'Kho hàng',
        search: 'Tìm kiếm mặt hàng...',
        allCategories: 'Tất cả danh mục',
        name: 'Tên mặt hàng',
        category: 'Danh mục',
        quantity: 'Số lượng',
        unit: 'Đơn vị',
        expiryDate: 'Ngày hết hạn',
        status: 'Trạng thái',
        actions: 'Thao tác',
        scanBarcode: 'Quét mã vạch'
    },
    categories: {
        food: 'Thực phẩm',
        medicine: 'Thuốc',
        cleaning: 'Vệ sinh',
        personal: 'Cá nhân',
        household: 'Gia dụng',
        electronics: 'Điện tử'
    },
    stats: {
        totalItems: 'Tổng số mặt hàng',
        lowStock: 'Tồn kho thấp',
        expiringSoon: 'Sắp hết hạn',
        categories: 'Danh mục'
    },
    add: {
        title: 'Thêm mặt hàng',
        editTitle: 'Sửa mặt hàng',
        name: 'Tên mặt hàng',
        category: 'Danh mục',
        quantity: 'Số lượng',
        unit: 'Đơn vị',
        minQuantity: 'Tồn kho tối thiểu',
        expiryDate: 'Ngày hết hạn',
        description: 'Mô tả',
        selectCategory: 'Chọn danh mục',
        cancel: 'Hủy',
        save: 'Lưu',
        update: 'Cập nhật',
        barcode: 'Mã vạch',
        barcodeType: 'Loại mã vạch',
        enterBarcode: 'Nhập hoặc tạo mã vạch',
        generateBarcode: 'Tạo mã',
        barcodePreview: 'Xem trước mã vạch',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Căn chỉnh mã vạch vào khung quét',
        positionBarcode: 'Đặt mã vạch vào vùng quét',
        startScan: 'Bắt đầu quét',
        stopScan: 'Dừng quét',
        browserNotSupported: 'Trình duyệt không hỗ trợ camera',
        cameraPermissionDenied: 'Từ chối quyền truy cập camera',
        noCameraFound: 'Không tìm thấy camera',
        cameraInUse: 'Camera đang được sử dụng',
        scan: 'Quét',
        orUploadImage: 'hoặc tải ảnh lên',
        uploadImage: 'Tải ảnh lên'
    },
    analytics: {
        title: 'Phân tích',
        smartAlerts: 'Cảnh báo thông minh',
        smartRecommendations: 'Gợi ý thông minh'
    },
    status: {
        normal: 'Bình thường',
        lowStock: 'Tồn kho thấp',
        expiringSoon: 'Sắp hết hạn',
        expired: 'Hết hạn'
    }
};