window.ptMessages = {
    notifications: {
        barcodeError: 'Falha ao gerar código de barras',
        itemAdded: 'Item adicionado',
        itemUpdated: 'Item atualizado',
        itemDeleted: 'Item excluído',
        error: 'Operação falhou. Por favor, tente novamente',
        insufficientStock: 'Sem estoque: {itemName}',
        itemUsedSuccessfully: 'Usado 1 {unit} de {itemName} ({quantity} {unit} restantes)',
        itemFound: 'Item encontrado',
        itemNotFound: 'Item não encontrado',
        barcodeScanned: 'Código de barras escaneado com sucesso',
        invalidImageType: 'Tipo de imagem inválido. Selecione um arquivo de imagem.',
        processingImage: 'Processando imagem...',
        noBarcodeFound: 'Nenhum código de barras encontrado na imagem',
        imageProcessingError: 'Erro ao processar imagem'
    },
    alerts: {
        lowStock: 'Estoque baixo',
        lowStockMessage: 'Apenas {quantity} {unit} de {item} restantes',
        expired: 'Expirado',
        expiredMessage: '{item} expirou há {days} dias',
        expiringSoon: 'Expirando em breve',
        expiringSoonMessage: '{item} expira em {days} dias'
    },
    recommendations: {
        restock: 'Reabastecer {item}',
        restockReason: 'Estoque atual: {quantity} {unit} (mín: {minQuantity} {unit})',
        popular: 'Item popular',
        popularReason: '{item} é frequentemente usado',
        watch: 'Monitorar {item}',
        watchReason: 'Usado {count} vezes nos últimos 30 dias',
        consider: 'Reabastecer {item}',
        considerReason: 'Mais usado em {category} ({count} vezes)'
    },
    app: {
        title: 'Controle de Estoque Inteligente'
    },
    nav: {
        inventory: 'Estoque',
        add: 'Adicionar Item',
        analytics: 'Análises',
        purchaseList: 'Lista de Compras',
        menu: 'Menu',
        language: 'Idioma'
    },
    purchaseList: {
        description: 'Itens para reabastecer com base no baixo estoque',
        totalItems: 'Itens para Comprar',
        currentQuantity: 'Qtde Atual',
        minQuantity: 'Estoque Mínimo',
        suggestedQuantity: 'Qtde Sugerida',
        unit: 'Unidade',
        lastUsed: 'Último Uso',
        refresh: 'Atualizar Lista'
    },
    inventory: {
        title: 'Estoque',
        search: 'Pesquisar itens...',
        allCategories: 'Todas as Categorias',
        name: 'Item',
        category: 'Categoria',
        quantity: 'Qtde',
        unit: 'Unidade',
        expiryDate: 'Validade',
        status: 'Status',
        actions: 'Ações',
        scanBarcode: 'Escanear Código de Barras'
    },
    categories: {
        food: 'Alimentos',
        medicine: 'Medicamentos',
        cleaning: 'Produtos de Limpeza',
        personal: 'Cuidados Pessoais',
        household: 'Itens Domésticos',
        electronics: 'Eletrônicos'
    },
    stats: {
        totalItems: 'Total de Itens',
        lowStock: 'Estoque Baixo',
        expiringSoon: 'Expirando em Breve',
        categories: 'Categorias'
    },
    add: {
        title: 'Adicionar Item',
        editTitle: 'Editar Item',
        name: 'Nome do Item',
        category: 'Categoria',
        quantity: 'Quantidade',
        unit: 'Unidade',
        minQuantity: 'Estoque Mínimo',
        expiryDate: 'Data de Validade',
        description: 'Descrição',
        selectCategory: 'Selecionar Categoria',
        cancel: 'Cancelar',
        save: 'Salvar',
        update: 'Atualizar',
        barcode: 'Código de Barras',
        barcodeType: 'Tipo de Código de Barras',
        enterBarcode: 'Digite o código de barras ou gere um',
        generateBarcode: 'Gerar',
        barcodePreview: 'Pré-visualização do Código de Barras',
        ean13: 'EAN-13',
        upca: 'UPC-A',
        scanBarcodeMessage: 'Alinhe o código de barras dentro do quadro',
        positionBarcode: 'Posicione o código de barras dentro da área de varredura',
        startScan: 'Iniciar Varredura',
        stopScan: 'Parar Varredura',
        browserNotSupported: 'Navegador não suporta acesso à câmera',
        cameraPermissionDenied: 'Permissão de câmera negada',
        noCameraFound: 'Nenhuma câmera encontrada',
        cameraInUse: 'Câmera está em uso por outro aplicativo',
        scan: 'Escanear',
        orUploadImage: 'Ou faça upload de imagem',
        uploadImage: 'Enviar Imagem'
    },
    analytics: {
        title: 'Análises',
        smartAlerts: 'Alertas',
        smartRecommendations: 'Recomendações'
    },
    status: {
        normal: 'Normal',
        lowStock: 'Estoque Baixo',
        expiringSoon: 'Expirando em Breve',
        expired: 'Expirado'
    }
};