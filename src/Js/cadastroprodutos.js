const API_URL = "http://localhost:3000";

/* ----------------------------- FUNÇÕES AUXILIARES ----------------------------- */
function mostrarMensagem(texto, tipo = "sucesso") {
  const areaMensagem = document.getElementById("mensagem");
  areaMensagem.innerHTML = `<div class="alert ${tipo === "sucesso" ? "alert-success" : "alert-danger"}" role="alert">${texto}</div>`;
  setTimeout(() => { areaMensagem.innerHTML = ""; }, 4000);
}

function validarPrecos(precoOriginal, precoDesconto) {
  if (precoDesconto > precoOriginal) {
    mostrarMensagem("O preço com desconto não pode ser maior que o preço original!", "erro");
    return false;
  }
  return true;
}

function validarValidade(dataValidade) {
  const hoje = new Date();
  const validade = new Date(dataValidade);
  const diferencaDias = (validade - hoje) / (1000 * 60 * 60 * 24);
  if (diferencaDias < 7) {
    mostrarMensagem("A data de validade deve ser pelo menos 7 dias após a data atual!", "erro");
    return false;
  }
  return true;
}

function imagemPadraoPorCategoria(categoria) {
  const imagensPadrao = {
    padaria: "../images/padaria.png",
    mercado: "../images/mercado.png",
    hortifruti: "../images/hortifruti.png",
    doceria: "../images/doceria.png"
  };
  return imagensPadrao[categoria] || "../images/placeholder.png";
}

/* ----------------------------- CADASTRAR PRODUTO ----------------------------- */
async function criarProduto() {
  const nome = document.getElementById("nomeProduto").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const categoria = document.getElementById("categoria").value;
  const validade = document.getElementById("validade").value;
  const precoOriginal = parseFloat(document.getElementById("precoOriginal").value);
  const precoDesconto = parseFloat(document.getElementById("precoDesconto").value);

  if (!nome || !descricao || !categoria || !validade || isNaN(precoOriginal) || isNaN(precoDesconto)) {
    mostrarMensagem("Por favor, preencha todos os campos corretamente!", "erro");
    return;
  }

  if (!validarPrecos(precoOriginal, precoDesconto) || !validarValidade(validade)) return;

  const imagem = imagemPadraoPorCategoria(categoria);
  const novoProduto = { nome, descricao, categoria, validade, precoOriginal, precoDesconto, imagem };

  try {
    const response = await fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoProduto)
    });

    if (!response.ok) throw new Error("Erro ao salvar produto no servidor.");

    mostrarMensagem("Produto cadastrado com sucesso!", "sucesso");

    // Modal de confirmação
    const modalElement = document.getElementById('modalConfirmaCadastro');
    const bsModal = new bootstrap.Modal(modalElement, { keyboard: false, backdrop: 'static' });

    const btnSim = document.getElementById("btnSimCadastro");
    const btnNao = document.getElementById("btnNaoCadastro");

    btnSim.replaceWith(btnSim.cloneNode(true));
    btnNao.replaceWith(btnNao.cloneNode(true));

    const novoBtnSim = document.getElementById("btnSimCadastro");
    const novoBtnNao = document.getElementById("btnNaoCadastro");

    novoBtnSim.addEventListener("click", () => {
      bsModal.hide();
      document.querySelector("form").reset();
      document.getElementById("previewImagem").src = "../images/placeholder.png";
    });

    novoBtnNao.addEventListener("click", () => {
      bsModal.hide();
      window.location.href = "mostrarprodutos.html";
    });

    bsModal.show();

  } catch (error) {
    console.error(error);
    mostrarMensagem("Erro ao conectar ao servidor. Tente novamente.", "erro");
  }
}

/* ----------------------------- EVENTOS ----------------------------- */
document.querySelector("form").addEventListener("submit", function (evento) {
  evento.preventDefault();
  criarProduto();
});

const selectCategoria = document.getElementById("categoria");
const previewImagem = document.getElementById("previewImagem");

selectCategoria.addEventListener("change", function () {
  previewImagem.src = imagemPadraoPorCategoria(this.value);
});
