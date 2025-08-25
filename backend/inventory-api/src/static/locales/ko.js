window.koMessages = {
    notifications: {
        barcodeError: '바코드 생성 실패',
        itemAdded: '품목이 성공적으로 추가되었습니다',
        itemUpdated: '품목이 성공적으로 수정되었습니다', // '업데이트'보다 '수정'이 더 자연스러움
        itemDeleted: '품목이 성공적으로 삭제되었습니다',
        error: '작업을 완료할 수 없습니다. 다시 시도해 주세요.', // 실패 원인을 더 일반적으로 표현
        insufficientStock: '재고 부족: {itemName}',
        itemUsedSuccessfully: '{itemName} 1{unit} 사용 (잔여 수량: {quantity}{unit})', // 공백 제거, '남은'->'잔여'
        itemFound: '품목을 찾았습니다',
        itemNotFound: '품목을 찾을 수 없습니다',
        barcodeScanned: '바코드 스캔 완료',
        invalidImageType: '지원되지 않는 이미지 형식입니다. 유효한 이미지 파일을 선택해 주세요.', // '잘못된'->'지원되지 않는'
        processingImage: '이미지를 처리하는 중...',
        noBarcodeFound: '이미지에서 바코드를 찾을 수 없습니다', // '감지'->'찾을 수'
        imageProcessingError: '이미지 처리 실패'
    },
    alerts: {
        lowStock: '재고 부족 경고',
        lowStockMessage: '{item}의 잔여 수량: {quantity}{unit}', // 공백 제거, '남은'->'잔여'
        expired: '유통기한 만료 품목',
        expiredMessage: '{item}의 유통기한이 {days}일 전에 만료되었습니다', // 어순 수정
        expiringSoon: '유통기한 임박',
        expiringSoonMessage: '{item}의 유통기한이 {days}일 후에 만료됩니다' // 어순 수정
    },
    recommendations: {
        restock: '{item} 재입고 필요',
        restockReason: '현재 재고: {quantity}{unit} (최소 권장 수량: {minQuantity}{unit})', // 공백 제거, 설명 추가
        popular: '인기 품목',
        popularReason: '{item}의 사용 빈도가 높습니다',
        watch: '{item} 사용량 확인', // '모니터링'보다 '확인'이 더 부드러움
        watchReason: '최근 30일 동안 {count}회 사용됨',
        consider: '{item} 재입고 고려',
        considerReason: '{category} 카테고리 내 최다 사용 품목 ({count}회)' // 어순 수정
    },
    app: {
        title: '스마트 홈 인벤토리'
    },
    nav: {
        inventory: '인벤토리',
        add: '품목 추가',
        analytics: '분석',
        purchaseList: '구매 목록', // '쇼핑'->'구매'
        menu: '메뉴',
        language: '언어'
    },
    purchaseList: {
        description: '현재 재고 수준을 기준으로 재입고가 필요한 품목 목록입니다', // 문장 구조 개선
        totalItems: '총 구매 품목 수',
        currentQuantity: '현재 수량',
        minQuantity: '최소 재고량',
        suggestedQuantity: '권장 구매 수량', // 명확성 추가
        unit: '단위',
        lastUsed: '최종 사용일', // '마지막'->'최종'
        refresh: '목록 새로고침'
    },
    inventory: {
        title: '인벤토리',
        search: '품목명 검색...', // '품목 검색'->'품목명 검색'
        allCategories: '전체 카테고리',
        name: '품목명',
        category: '카테고리',
        quantity: '수량',
        unit: '단위',
        expiryDate: '유통기한',
        status: '상태',
        actions: '관리', // '작업'->'관리'
        scanBarcode: '바코드 스캔'
    },
    categories: {
        food: '식품',
        medicine: '의약품',
        cleaning: '청소용품',
        personal: '개인용품',
        household: '생활용품', // '가정용품'->'생활용품'
        electronics: '전자기기' // '전자제품'->'전자기기'
    },
    stats: {
        totalItems: '총 품목 수',
        lowStock: '재고 부족',
        expiringSoon: '유통기한 임박',
        categories: '카테고리 별 현황'
    },
    add: {
        title: '새 품목 추가',
        editTitle: '품목 수정',
        name: '품목명',
        category: '카테고리',
        quantity: '수량',
        unit: '단위',
        minQuantity: '최소 재고량',
        expiryDate: '유통기한',
        description: '비고', // '설명'->'비고' (인벤토리 컨텍스트에 더 적합)
        selectCategory: '카테고리 선택',
        cancel: '취소',
        save: '저장',
        update: '수정', // '업데이트'->'수정'
        barcode: '바코드',
        barcodeType: '바코드 형식',
        enterBarcode: '바코드 입력 또는 생성',
        generateBarcode: '바코드 생성',
        barcodePreview: '바코드 미리보기',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: '바코드를 프레임 안에 위치시켜 주세요',
        positionBarcode: '스캔 영역에 바코드를 맞춰주세요',
        startScan: '스캔 시작',
        stopScan: '스캔 중지',
        browserNotSupported: '브라우저에서 카메라 접근을 지원하지 않습니다',
        cameraPermissionDenied: '카메라 사용 권한이 거부되었습니다',
        noCameraFound: '사용 가능한 카메라를 찾을 수 없습니다',
        cameraInUse: '카메라가 다른 애플리케이션에서 사용 중입니다',
        scan: '스캔',
        orUploadImage: '또는 이미지 업로드',
        uploadImage: '이미지 업로드'
    },
    analytics: {
        title: '분석',
        smartAlerts: '스마트 알림',
        smartRecommendations: '스마트 추천'
    },
    status: {
        normal: '정상',
        lowStock: '재고 부족',
        expiringSoon: '유통기한 임박',
        expired: '만료됨' // '유통기한 만료'->'만료됨' (간결함)
    }
};