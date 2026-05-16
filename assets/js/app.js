// A. NOSSA BASE DE DADOS (JSON) ATUALIZADA COM "AVALIAÇÕES"
const data = {
    produtos: [
        { 
            id: 1, nome: "Smartphone Ultra", preco: 2500.00, categoria: "Celulares", 
            imagem: "https://tse1.mm.bing.net/th/id/OIP.RCaOvi3C_QXx33EUvGht9wHaFj?rs=1&pid=ImgDetMain&o=7&rm=3", 
            descricao: "Bateria dura 2 dias.", emEstoque: true, destaque: true,
            avaliacoes: [
                { usuario: "Carlos Andrade", nota: 5, comentario: "Aparelho excelente! A bateria realmente dura os 2 dias como prometido." },
                { usuario: "Fernanda Lima", nota: 4, comentario: "Muito rápido, mas achei um pouco pesado." }
            ]
        },
        { 
            id: 2, nome: "Notebook DevPro", preco: 4500.00, categoria: "Notebooks", 
            imagem: "https://tse3.mm.bing.net/th/id/OIP.uc-3epC0JFm-AQ2YC4kEmgHaFU?rs=1&pid=ImgDetMain&o=7&rm=3", 
            descricao: "16GB RAM e SSD.", emEstoque: true, destaque: true,
            avaliacoes: [
                { usuario: "Roberto Silva", nota: 5, comentario: "Perfeito para programar e rodar máquinas virtuais." }
            ]
        },
        { 
            id: 3, nome: "Fone Anti-Ruído", preco: 300.00, categoria: "Acessórios", 
            imagem: "https://techinsider.com.br/wp-content/uploads/2023/09/TWS-sem-fio-Bluetooth-Xiaomi-Redmi-Buds-4-Pro.jpg", 
            descricao: "Silêncio absoluto.", emEstoque: false, destaque: false,
            avaliacoes: [
                { usuario: "Marina Souza", nota: 3, comentario: "Bom, mas machuca a orelha depois de 3 horas de uso." },
                { usuario: "Lucas Mendes", nota: 5, comentario: "O cancelamento de ruído é surreal pelo preço." }
            ]
        },
        { 
            id: 4, nome: "Mouse Gamer", preco: 150.00, categoria: "Acessórios", 
            imagem: "https://tse1.mm.bing.net/th/id/OIP.A1biU9xwjcQj7dxM5MpCFwHaKp?rs=1&pid=ImgDetMain&o=7&rm=3", 
            descricao: "LEDs RGB configuráveis.", emEstoque: true, destaque: false,
            avaliacoes: []
        },
        { 
            id: 5, nome: "Console NextGen", preco: 3500.00, categoria: "Games", 
            imagem: "https://tse2.mm.bing.net/th/id/OIP.-C9exhxGDmboHhY_S629ogHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", 
            descricao: "Gráficos em 4K.", emEstoque: true, destaque: true,
            avaliacoes: [
                { usuario: "João Pedro", nota: 5, comentario: "Melhor compra do ano! Os exclusivos estão incríveis." }
            ]
        },
        { 
            id: 6, nome: "Teclado Mecânico", preco: 400.00, categoria: "Acessórios", 
            imagem: "https://tse3.mm.bing.net/th/id/OIP.H22plLMPetCCE9v9JhR_UAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", 
            descricao: "Switch Blue barulhento e tátil.", emEstoque: true, destaque: false,
            avaliacoes: [{usuario: "Mario Fabricio" , nota: 4, comentario: "Ótima construção do teclado, gostei bastante da compra"}]
        },
        { 
            id: 7, nome: "Placa de Vídeo", preco: 3970.00, categoria: "Hardware", 
            imagem: "https://tse3.mm.bing.net/th/id/OIP.Th2pLNMVrWlCMZtX1yP78AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", 
            descricao: "Placa de vídeo de alto desempenho", emEstoque: true, destaque: false,
            avaliacoes: [
                { usuario: "Vitor Hugo", nota: 4, comentario: "Roda tudo no ultra, mas esquenta bastante." }
            ]
        },
        { 
            id: 8, nome: "Smartwatch Fit", preco: 800.00, categoria: "Acessórios", 
            imagem: "https://m.media-amazon.com/images/I/81BabF31g8L._AC_.jpg", 
            descricao: "Mede batimentos e passos.", emEstoque: true, destaque: false,
            avaliacoes: [{usuario: "Ana", nota: 5, comentario: "Excelente para corrida"}]
        }
    ]
};

// B. LÓGICA DE ROTEAMENTO
document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname;
    if (page.includes('detalhes.html')) {
        carregarPaginaDetalhes();
    } else {
        carregarPaginaInicial();
    }
});

// Utilitário para formatar preço
function formatPrice(preco) {
    return `R$ ${preco.toFixed(2)}`;
}

// C. FUNÇÕES DA HOME PAGE (index.html)
function carregarPaginaInicial() {
    const carouselInner = document.getElementById('carousel-destaques');
    const productList = document.getElementById('product-list');
    
    if (!carouselInner || !productList) return;

    let htmlCarousel = '';
    let isFirst = true;

    // Renderiza Destaques e Todos os Produtos
    data.produtos.forEach(produto => {
        // 1. Carrossel de Destaques
        if (produto.destaque) {
            htmlCarousel += `
                <div class="carousel-item ${isFirst ? 'active' : ''}" style="cursor: pointer;" onclick="window.location.href='detalhes.html?id=${produto.id}'">
                    <img src="${produto.imagem}" class="d-block w-100 object-fit-contain bg-light" style="height: 400px;" alt="${produto.nome}">
                    <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-2">
                        <h5>${produto.nome}</h5>
                        <p class="mb-0 text-warning fw-bold">${formatPrice(produto.preco)}</p>
                    </div>
                </div>
            `;
            isFirst = false;
        }

        // 2. Grid de Todos os Itens
        const card = document.createElement("div");
        card.classList.add("card", "col-12", "col-md-6", "col-lg-3");
        
        card.innerHTML = `
            <h3>${produto.nome}</h3>
            <img src="${produto.imagem}" alt="${produto.nome}">
            <p><strong>Cat:</strong> ${produto.categoria}</p>
            <p><strong>${formatPrice(produto.preco)}</strong></p>
        `;

        const btnDetails = document.createElement("button");
        btnDetails.textContent = "Ver detalhes";
        // Envia o usuário para a página de detalhes passando o ID na URL
        btnDetails.addEventListener("click", () => {
            window.location.href = `detalhes.html?id=${produto.id}`;
        });

        card.appendChild(btnDetails);
        productList.appendChild(card);
    });

    carouselInner.innerHTML = htmlCarousel;
}

// D. FUNÇÕES DA PÁGINA DE DETALHES (detalhes.html)
function carregarPaginaDetalhes() {
    const urlParams = new URLSearchParams(window.location.search);
    const idProduto = parseInt(urlParams.get('id'));

    const produto = data.produtos.find(p => p.id === idProduto);

    if (produto) {
        document.getElementById('detalhe-nome').textContent = produto.nome;
        document.getElementById('detalhe-imagem').src = produto.imagem;
        document.getElementById('info-preco').innerHTML = `<strong>Preço:</strong> ${formatPrice(produto.preco)}`;
        document.getElementById('info-categoria').innerHTML = `<strong>Categoria:</strong> ${produto.categoria}`;
        document.getElementById('info-status').innerHTML = `<strong>Status:</strong> ${produto.emEstoque ? '<span class="text-success fw-bold">Em Estoque</span>' : '<span class="text-danger fw-bold">Indisponível</span>'}`;
        document.getElementById('info-descricao').innerHTML = `<strong>Descrição:</strong> ${produto.descricao}`;
        document.getElementById('info-codigo').innerHTML = `<strong>Código do Produto:</strong> #000${produto.id}`;

        // NOVA ENTIDADE SECUNDÁRIA: Avaliações de Clientes
        const containerAvaliacoes = document.getElementById('avaliacoes-container');
        
        if (produto.avaliacoes && produto.avaliacoes.length > 0) {
            let htmlAvaliacoes = '';
            
            produto.avaliacoes.forEach(avaliacao => {
                // Gera as estrelas baseado na nota (ex: nota 4 = ⭐⭐⭐⭐)
                let estrelas = '⭐'.repeat(avaliacao.nota);
                
                htmlAvaliacoes += `
                    <div class="col-md-6 mb-3">
                        <div class="card p-3 shadow-sm h-100 border-0" style="background-color: #f8f9fa;">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <strong class="text-primary">${avaliacao.usuario}</strong>
                                <span>${estrelas}</span>
                            </div>
                            <p class="mb-0 text-muted fst-italic">"${avaliacao.comentario}"</p>
                        </div>
                    </div>
                `;
            });
            containerAvaliacoes.innerHTML = htmlAvaliacoes;
        } else {
            containerAvaliacoes.innerHTML = `
                <div class="col-12 text-center p-4 bg-light rounded text-muted">
                    <p class="mb-0">Este produto ainda não possui avaliações. Seja o primeiro a avaliar!</p>
                </div>
            `;
        }
    } else {
        document.getElementById('detalhes-container').innerHTML = `<h2 class="text-danger text-center my-5">Produto não encontrado!</h2>`;
    }
}