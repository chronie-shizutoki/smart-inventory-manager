window.viMessages = {
    notifications: {
        barcodeError: 'Không thể tạo mã vạch',
        itemAdded: 'Đã thêm mặt hàng',
        itemUpdated: 'Đã cập nhật mặt hàng',
        itemDeleted: 'Đã xóa mặt hàng',
        error: 'Thao tác thất bại. Vui lòng thử lại',
        insufficientStock: 'Hết hàng: {itemName}',
        itemUsedSuccessfully: '{itemName} 1 {unit} đã được sử dụng ({quantity} {unit} còn lại)',
        itemFound: 'Tìm thấy mặt hàng',
        itemNotFound: 'Không tìm thấy mặt hàng',
        barcodeScanned: 'Quét mã vạch thành công',
        invalidImageType: 'Loại hình ảnh không hợp lệ. Vui lòng chọn file hình ảnh.',
        processingImage: 'Đang xử lý hình ảnh...',
        noBarcodeFound: 'Không tìm thấy mã vạch trên hình ảnh',
        imageProcessingError: 'Lỗi trong quá trình xử lý hình ảnh'
    },
    alerts: {
        lowStock: 'Hàng tồn thấp',
        lowStockMessage: 'Chỉ còn {quantity} {unit} của {item}',
        expired: 'Hết hạn',
        expiredMessage: '{item} đã hết hạn từ {days} ngày trước',
        expiringSoon: 'Sắp hết hạn',
        expiringSoonMessage: '{item} sẽ hết hạn trong {days} ngày'
    },
    recommendations: {
        restock: 'Nhập thêm {item}',
        restockReason: 'Kho hiện tại: {quantity} {unit} (tối thiểu: {minQuantity} {unit})',
        popular: 'Mặt hàng phổ biến',
        popularReason: '{item} được sử dụng thường xuyên',
        watch: 'Theo dõi {item}',
        watchReason: 'Được sử dụng {count} lần trong 30 ngày qua',
        consider: 'Xem xét nhập thêm {item}',
        considerReason: 'Sử dụng nhiều nhất trong danh mục {category} ({count} lần)'
    },
    app: {
        title: 'Kho Hàng Nhà Thông Minh'
    },
    nav: {
        inventory: 'Kho Hàng',
        add: 'Thêm Mặt Hàng',
        analytics: 'Phân Tích',
        purchaseList: 'Danh Sách Mua Hàng',
        menu: 'Menu',
        language: 'Ngôn Ngữ'
    },
    purchaseList: {
        description: 'Mặt hàng cần nhập thêm dựa trên kho thấp',
        totalItems: 'Số mặt hàng cần mua',
        currentQuantity: 'Số lượng hiện tại',
        minQuantity: 'Kho tối thiểu',
        suggestedQuantity: 'Số lượng đề xuất',
        unit: 'Đơn vị',
        lastUsed: 'Lần sử dụng cuối',
        refresh: 'Làm mới danh sách'
    },
    inventory: {
        title: 'Kho Hàng',
        search: 'Tìm kiếm mặt hàng...',
        allCategories: 'Tất cả danh mục',
        name: 'Mặt Hàng',
        category: 'Danh Mục',
        quantity: 'Số Lượng',
        unit: 'Đơn Vị',
        expiryDate: 'Ngày Hết Hạn',
        status: 'Trạng Thái',
        actions: 'Hành Động',
        scanBarcode: 'Quét Mã Vạch'
    },
    categories: {
        food: 'Thực Phẩm',
        medicine: 'Thuốc',
        cleaning: 'Dụng Cụ Dọn Dẹp',
        personal: 'Chăm Sóc Cá Nhân',
        household: 'Đồ Gia Dụng',
        electronics: 'Điện Tử'
    },
    stats: {
        totalItems: 'Tổng Số Mặt Hàng',
        lowStock: 'Hàng Tồn Thấp',
        expiringSoon: 'Sắp Hết Hạn',
        categories: 'Danh Mục'
    },
    add: {
        title: 'Thêm Mặt Hàng',
        editTitle: 'Chỉnh Sửa Mặt Hàng',
        name: 'Tên Mặt Hàng',
        category: 'Danh Mục',
        quantity: 'Số Lượng',
        unit: 'Đơn Vị',
        minQuantity: 'Kho Tối Thiểu',
        expiryDate: 'Ngày Hết Hạn',
        description: 'Mô Tả',
        selectCategory: 'Chọn Danh Mục',
        cancel: 'Hủy',
        save: 'Lưu',
        update: 'Cập Nhật',
        barcode: 'Mã Vạch',
        barcodeType: 'Loại Mã Vạch',
        enterBarcode: 'Nhập mã vạch hoặc tạo mới',
        generateBarcode: 'Tạo',
        barcodePreview: 'Xem Trước Mã Vạch',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Căn chỉnh mã vạch bên trong khung',
        positionBarcode: 'Đặt mã vạch bên trong khu vực quét',
        startScan: 'Bắt Đầu Quét',
        stopScan: 'Dừng Quét',
        browserNotSupported: 'Trình duyệt không hỗ trợ truy cập camera',
        cameraPermissionDenied: 'Quyền truy cập camera bị từ chối',
        noCameraFound: 'Không tìm thấy camera',
        cameraInUse: 'Camera đang được sử dụng bởi ứng dụng khác',
        scan: 'Quét',
        orUploadImage: 'hoặc tải lên hình ảnh',
        uploadImage: 'Tải Lên Hình Ảnh'
    },
    analytics: {
        title: 'Phân Tích',
        smartAlerts: 'Cảnh Báo Thông Minh',
        smartRecommendations: 'Khuyến Nghị Thông Minh'
    },
    status: {
        normal: 'Bình Thường',
        lowStock: 'Hàng Tồn Thấp',
        expiringSoon: 'Sắp Hết Hạn',
        expired: 'Hết Hạn'
    }
};