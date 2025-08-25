window.ptMessages = {
    notifications: {
        barcodeError: 'Falha ao gerar código de barras',
        itemAdded: 'Item adicionado',
        itemUpdated: 'Item atualizado',
        itemDeleted: 'Item excluído',
        error: 'Falha na operação. Tente novamente',
        insufficientStock: 'Estoque insuficiente: {itemName}',
        itemUsedSuccessfully: 'Utilizado 1 {unit} de {itemName} ({quantity} {unit} restantes)',
        itemFound: 'Item encontrado',
        itemNotFound: 'Item não encontrado',
        barcodeScanned: 'Código de barras escaneado',
        invalidImageType: 'Tipo de imagem inválido. Selecione um arquivo de imagem.',
        processingImage: 'Processando imagem...',
        noBarcodeFound: 'Nenhum código de barras encontrado na imagem',
        imageProcessingError: 'Erro no processamento da imagem'
    },
    alerts: {
        lowStock: 'Estoque baixo',
        lowStockMessage: 'Apenas {quantity} {unit} de {item} restantes',
        expired: 'Expirado',
        expiredMessage: '{item} expirou há {days} dias',
        expiringSoon: 'A expirar em breve',
        expiringSoonMessage: '{item} expira em {days} dias'
    },
    recommendations: {
        restock: 'Reabastecer {item}',
        restockReason: 'Estoque atual: {quantity} {unit} (mín: {minQuantity} {unit})',
        popular: 'Item popular',
        popularReason: '{item} é utilizado frequentemente',
        watch: 'Monitorizar {item}',
        watchReason: 'Utilizado {count} vezes nos últimos 30 dias',
        consider: 'Reabastecer {item}',
        considerReason: 'Mais utilizado em {category} ({count} vezes)'
    },
    app: {
        title: 'Gestão Inteligente de Stock'
    },
    nav: {
        inventory: 'Inventário',
        add: 'Adicionar Item',
        analytics: 'Análises',
        purchaseList: 'Lista de Compras',
        menu: 'Menu',
        language: 'Idioma'
    },
    purchaseList: {
        description: 'Itens para reabastecer com base no stock baixo',
        totalItems: 'Itens para Comprar',
        currentQuantity: 'Quantidade Atual',
        minQuantity: 'Stock Mínimo',
        suggestedQuantity: 'Quantidade Sugerida',
        unit: 'Unidade',
        lastUsed: 'Última Utilização',
        refresh: 'Atualizar Lista'
    },
    inventory: {
        title: 'Inventário',
        search: 'Pesquisar itens...',
        allCategories: 'Todas as Categorias',
        name: 'Item',
        category: 'Categoria',
        quantity: 'Quantidade',
        unit: 'Unidade',
        expiryDate: 'Validade',
        status: 'Estado',
        actions: 'Ações',
        scanBarcode: 'Ler Código de Barras'
    },
    categories: {
        food: 'Alimentação',
        medicine: 'Medicamentos',
        cleaning: 'Limpeza',
        personal: 'Higiene Pessoal',
        household: 'Artigos Domésticos',
        electronics: 'Eletrónicos'
    },
    stats: {
        totalItems: 'Total de Itens',
        lowStock: 'Stock Baixo',
        expiringSoon: 'A Expirar Brevemente',
        categories: 'Categorias'
    },
    add: {
        title: 'Adicionar Item',
        editTitle: 'Editar Item',
        name: 'Nome do Item',
        category: 'Categoria',
        quantity: 'Quantidade',
        unit: 'Unidade',
        minQuantity: 'Stock Mínimo',
        expiryDate: 'Data de Validade',
        description: 'Descrição',
        selectCategory: 'Selecionar Categoria',
        cancel: 'Cancelar',
        save: 'Guardar',
        update: 'Atualizar',
        barcode: 'Código de Barras',
        barcodeType: 'Tipo de Código de Barras',
        enterBarcode: 'Introduza o código de barras ou gere um',
        generateBarcode: 'Gerar',
        barcodePreview: 'Pré-visualização do Código de Barras',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Posicione o código de barras no quadro',
        positionBarcode: 'Posicione o código de barras na área de leitura',
        startScan: 'Iniciar Leitura',
        stopScan: 'Parar Leitura',
        browserNotSupported: 'Navegador não suporta acesso à câmara',
        cameraPermissionDenied: 'Permissão de câmara negada',
        noCameraFound: 'Nenhuma câmara encontrada',
        cameraInUse: 'Câmara está a ser utilizada por outra aplicação',
        scan: 'Ler',
        orUploadImage: 'Ou carregue uma imagem',
        uploadImage: 'Carregar Imagem'
    },
    analytics: {
        title: 'Análises',
        smartAlerts: 'Alertas',
        smartRecommendations: 'Recomendações'
    },
    status: {
        normal: 'Normal',
        lowStock: 'Stock Baixo',
        expiringSoon: 'A Expirar Brevemente',
        expired: 'Expirado'
    }
};