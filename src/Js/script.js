const API_URL = "http://localhost:3000";

/* ----------------------------- BUSCAR DADOS ----------------------------- */

async function buscarDados() {
    try {
        const response = await fetch(`${API_URL}/produtos`);
        if (!response.ok) {
            throw new Error(`Erro HTTP ao buscar produtos: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Falha ao carregar produtos do JSON Server:", error);

        try {
            const response = await fetch('../Js/produtos.json');
            if (!response.ok) throw new Error('Fallback também falhou');
            return await response.json();
        } catch (fallbackError) {
            console.error("Falha CRÍTICA ao carregar produtos:", fallbackError);
            return null;
        }
    }
}

/* ------------------------ SALVAR PRODUTO DETALHES ----------------------- */

function verDetalhes(produto) {
    localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
    window.location.href = "detalhesproduto.html";
}

/* ---------------------- FAVORITAÇÃO POR PESSOA --------------------------- */
/* Cada pessoa só pode favoritar 1 vez cada produto */

function carregarFavoritos() {
    return JSON.parse(localStorage.getItem("favoritos")) || {};
}

function salvarFavoritos(favs) {
    localStorage.setItem("favoritos", JSON.stringify(favs));
}

function configurarFavoritar() {
    const botoesFav = document.querySelectorAll(".btn-favoritar");
    const favoritos = carregarFavoritos();

    botoesFav.forEach(btn => {
        const id = btn.dataset.id;

        // Verifica se já está favoritado
        const jaFavoritou = favoritos[id] === true;

        btn.textContent = jaFavoritou ? "⭐ Favoritado (Desfazer)" : "⭐ Favoritar";

        btn.addEventListener("click", () => {
            if (favoritos[id]) {
                // Desfavoritar
                delete favoritos[id];
                btn.textContent = "⭐ Favoritar";
            } else {
                // Favoritar apenas 1 vez por pessoa
                favoritos[id] = true;
                btn.textContent = "⭐ Favoritado (Desfazer)";
            }

            salvarFavoritos(favoritos);
            atualizarRanking(favoritos);
        });
    });
}

/* -------------------------- RANKING DE FAVORITOS ------------------------- */

function atualizarRanking(favoritos) {
    const lista = document.getElementById("ranking-favoritos");
    if (!lista) return;

    // Converte para lista de {id}
    const ids = Object.keys(favoritos);

    lista.innerHTML = ids.length === 0
        ? "<li>Ninguém favoritou ainda</li>"
        : ids.map(id => `<li>Produto #${id} — ⭐ 1 favorito</li>`).join("");
}

/* ----------------------------- MONTAR PAGINA ----------------------------- */

function montarPaginaHome(dadosParaRenderizar) {
    const containerLista = document.getElementById('lista-produtos');
    const noResultsDiv = document.getElementById('noResults');
    if (!containerLista || !noResultsDiv) return;

    if (dadosParaRenderizar.length === 0) {
        containerLista.innerHTML = '';
        noResultsDiv.style.display = 'block';
        return;
    }

    noResultsDiv.style.display = 'none';
    containerLista.innerHTML = dadosParaRenderizar.map(item => {
        const caminhoImagem = `../images/${item.imagem}`;

        return `
            <div class="col-12 col-md-6 col-lg-3 mb-4">
                <div class="card h-100">
                    <img src="${caminhoImagem}" class="card-img-top" alt="${item.nome}" style="height: 200px; object-fit: contain; padding: 10px;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${item.nome}</h5>
                        <h6><s>R$ ${item.PrecoOriginal.toFixed(2)}</s></h6>
                        <h5><strong>R$ ${item.PrecoComDesconto.toFixed(2)}</strong></h5>
                        <h6 style="color:#6d1e0d"><strong>${item.DataValidade}</strong></h6>

                        <button class="btn btn-warning mb-2 btn-favoritar" data-id="${item.id}">
                            ⭐ Favoritar
                        </button>

                        <button onclick="verDetalhes(${JSON.stringify(item).replace(/"/g, '&quot;')})" 
                                style="background-color: #6d1e0d; border-color: white;" 
                                class="btn btn-primary mt-auto">
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    configurarFavoritar();
}

/* ----------------------- CONVERSÃO DE DATA ------------------------ */

function converterData(dataString) {
    const [dia, mes, ano] = dataString.split('/');
    return new Date(ano, mes - 1, dia);
}

/* ------------------------- INICIO DO SISTEMA ------------------------- */

document.addEventListener('DOMContentLoaded', async () => {

    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) loadingDiv.style.display = 'block';

    const dados = await buscarDados();
    if (loadingDiv) loadingDiv.style.display = 'none';

    if (!dados) {
        document.getElementById('lista-produtos').innerHTML =
            '<div class="alert alert-danger text-center">Erro ao carregar produtos.</div>';
        return;
    }

    const filtroCategoria = document.getElementById('categoryFilter');
    const btnMaisProximos = document.getElementById('btnMaisProximos');
    const btnMostrarTodos = document.getElementById('btnMostrarTodos');

    /* Criar categorias no SELECT */
    const categorias = [...new Set(dados.map(item => item.categoria))];

    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        filtroCategoria.appendChild(option);
    });

    /* FILTRO POR CATEGORIA */
    filtroCategoria.addEventListener('change', () => {
        const categoriaSelecionada = filtroCategoria.value;
        const filtrados = categoriaSelecionada === 'todos'
            ? dados
            : dados.filter(item => item.categoria === categoriaSelecionada);

        montarPaginaHome(filtrados);
    });

    /* PRODUTOS MAIS PRÓXIMOS DE VENCER */
    if (btnMaisProximos) {
        btnMaisProximos.addEventListener('click', () => {
            const ordenados = [...dados].sort((a, b) => {
                return converterData(a.DataValidade) - converterData(b.DataValidade);
            });

            montarPaginaHome(ordenados.slice(0, 10));
            btnMaisProximos.style.display = 'none';
            btnMostrarTodos.style.display = 'inline-block';
        });
    }

    /* MOSTRAR TODOS */
    if (btnMostrarTodos) {
        btnMostrarTodos.addEventListener('click', () => {
            montarPaginaHome(dados);
            btnMostrarTodos.style.display = 'none';
            btnMaisProximos.style.display = 'inline-block';
        });
    }

    /* ATUALIZAR RANKING AO CARREGAR */
    atualizarRanking(carregarFavoritos());

    /* MOSTRAR TODOS AO INICIAR */
    montarPaginaHome(dados);
});

/* Tornar função global */
window.verDetalhes = verDetalhes;
