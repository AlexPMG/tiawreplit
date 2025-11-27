const API_URL = "http://localhost:3000/produtos"; // JSON Server
const containerProdutos = document.getElementById("listaProdutos");

// Buscar produtos do JSON Server
async function buscarProdutos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        return await response.json();
    } catch (error) {
        console.error("Falha ao carregar produtos:", error);
        return [];
    }
}

// Excluir produto com modal Bootstrap
async function excluirProduto(id) {
    // Cria o modal de confirmação dinamicamente se não existir
    let modal = document.getElementById("modalConfirmExcluir");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "modalConfirmExcluir";
        modal.classList.add("modal", "fade");
        modal.tabIndex = -1;
        modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirmar Exclusão</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    Tem certeza que deseja excluir este produto?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnCancelarExcluir">Cancelar</button>
                    <button type="button" class="btn btn-danger" id="btnConfirmarExcluir">Excluir</button>
                </div>
            </div>
        </div>`;
        document.body.appendChild(modal);
    }

    const bsModal = new bootstrap.Modal(modal, { keyboard: false, backdrop: 'static' });
    bsModal.show();

    // Botão cancelar fecha o modal
    document.getElementById("btnCancelarExcluir").onclick = () => bsModal.hide();

    // Botão confirmar realiza a exclusão
    document.getElementById("btnConfirmarExcluir").onclick = async () => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Erro ao excluir produto");
            mostrarMensagem("Produto excluído com sucesso!", "sucesso");
            mostrarProdutos(); // Atualiza a lista
            bsModal.hide();
        } catch (error) {
            mostrarMensagem("Falha ao excluir produto.", "erro");
            console.error(error);
            bsModal.hide();
        }
    };
}

// Função para criar card de produto
function criarCardProduto(produto) {
    const imgSrc = produto.imagem || "../images/placeholder.png";
    return `
    <div class="col-6 col-md-3">
        <div class="card h-100 shadow-sm">
            <img src="${imgSrc}" class="card-img-top" alt="${produto.nome}" style="height: 100%; object-fit: contain;">
            <div class="card-body d-flex flex-column justify-content-center text-center">
                <h6 class="card-title fw-bold">${produto.nome}</h6>
                <p class="mb-1 text-muted small">${produto.categoria}</p>
                <p class="mb-0 fw-bold text-success">R$ ${produto.precoDesconto.toFixed(2)}</p>
                <div class="mt-2">
                    <button class="btn btn-sm btn-warning me-1 btn-editar" data-id="${produto.id}">Editar</button>
                    <button class="btn btn-sm btn-danger btn-excluir" data-id="${produto.id}">Excluir</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Mostrar produtos e adicionar eventos
async function mostrarProdutos() {
    const produtos = await buscarProdutos();

    if (produtos.length === 0) {
        containerProdutos.innerHTML = `<div class="col-12 text-center">
            <p class="fw-bold text-muted">Nenhum produto cadastrado ainda.</p>
        </div>`;
        return;
    }

    containerProdutos.innerHTML = produtos.map(criarCardProduto).join("");

    // Adiciona listeners de forma segura
    document.querySelectorAll(".btn-editar").forEach(btn => {
        btn.addEventListener("click", () => {
            const produto = produtos.find(p => p.id == btn.dataset.id);
            abrirModalEditar(produto);
        });
    });

    document.querySelectorAll(".btn-excluir").forEach(btn => {
        btn.addEventListener("click", () => {
            excluirProduto(btn.dataset.id);
        });
    });
}

// Modal para editar produto (exemplo básico)
function abrirModalEditar(produto) {
    if (!produto) return;
    let modal = document.getElementById("modalEditarProduto");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "modalEditarProduto";
        modal.classList.add("modal", "fade");
        modal.tabIndex = -1;
        modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editar Produto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="formEditarProduto">
                        <div class="mb-3">
                            <label class="form-label">Nome:</label>
                            <input type="text" class="form-control" id="editNome">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Descrição:</label>
                            <textarea class="form-control" id="editDescricao" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Categoria:</label>
                            <select class="form-select" id="editCategoria">
                                <option value="padaria">Padaria</option>
                                <option value="mercado">Mercado</option>
                                <option value="hortifruti">Hortifruti</option>
                                <option value="doceria">Doceria</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Validade:</label>
                            <input type="date" class="form-control" id="editValidade">
                        </div>
                        <div class="row">
                            <div class="col mb-3">
                                <label class="form-label">Preço Original:</label>
                                <input type="number" step="0.01" class="form-control" id="editPrecoOriginal">
                            </div>
                            <div class="col mb-3">
                                <label class="form-label">Preço Desconto:</label>
                                <input type="number" step="0.01" class="form-control" id="editPrecoDesconto">
                            </div>
                        </div>
                        <div class="text-end">
                            <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>`;
        document.body.appendChild(modal);
    }

    // Preencher campos
    document.getElementById("editNome").value = produto.nome;
    document.getElementById("editDescricao").value = produto.descricao;
    document.getElementById("editCategoria").value = produto.categoria;
    document.getElementById("editValidade").value = produto.validade;
    document.getElementById("editPrecoOriginal").value = produto.precoOriginal;
    document.getElementById("editPrecoDesconto").value = produto.precoDesconto;

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    const form = document.getElementById("formEditarProduto");
    form.onsubmit = async (e) => {
        e.preventDefault();
        const dadosAtualizados = {
            ...produto,
            nome: document.getElementById("editNome").value,
            descricao: document.getElementById("editDescricao").value,
            categoria: document.getElementById("editCategoria").value,
            validade: document.getElementById("editValidade").value,
            precoOriginal: parseFloat(document.getElementById("editPrecoOriginal").value),
            precoDesconto: parseFloat(document.getElementById("editPrecoDesconto").value),
        };

        try {
            const response = await fetch(`${API_URL}/${produto.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosAtualizados),
            });
            if (!response.ok) throw new Error("Erro ao atualizar produto");
            mostrarMensagem("Produto atualizado com sucesso!", "sucesso");
            mostrarProdutos();
            bsModal.hide();
        } catch (err) {
            mostrarMensagem("Falha ao atualizar produto.", "erro");
            console.error(err);
        }
    };
}

// Inicializa exibição
document.addEventListener("DOMContentLoaded", mostrarProdutos);

// Mensagem
function mostrarMensagem(texto, tipo = "sucesso") {
    const areaMensagem = document.getElementById("mensagem");
    areaMensagem.innerHTML = `
        <div class="alert ${tipo === "sucesso" ? "alert-success" : "alert-danger"}" role="alert">
            ${texto}
        </div>`;
    setTimeout(() => { areaMensagem.innerHTML = ""; }, 4000);
}
