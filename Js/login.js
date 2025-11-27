document.addEventListener("DOMContentLoaded", function () {
  const formLogin = document.getElementById("formLogin");
  const msgLogin = document.getElementById("msgLogin");

  formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    msgLogin.innerHTML = "";
    msgLogin.className = "mt-3 text-center fw-bold";

    if (!email || !senha) {
      msgLogin.innerHTML = "Preencha todos os campos.";
      msgLogin.classList.add("text-warning");
      return;
    }

    try {
      const response = await fetch(API_URL);
      const usuarios = await response.json();

      // verifica se existe o email
      const usuario = usuarios.find(u => 
        String(u.Email).trim().toLowerCase() === email.toLowerCase()
      );

      if (!usuario) {
        msgLogin.innerHTML = "Usuário não encontrado.";
        msgLogin.classList.add("text-danger");
        return;
      }

      if (usuario.Senha !== senha) {
        msgLogin.innerHTML = "Senha incorreta.";
        msgLogin.classList.add("text-danger");
        return;
      }

      // Login OK
      msgLogin.innerHTML = "Login realizado com sucesso!";
      msgLogin.classList.add("text-success");

      // salva usuário logado (opcional)
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      // redirecionamento
      setTimeout(() => {
        if (usuario.Tipo === "vendedor") {
          window.location.href = "painelVendedor.html";
        } else {
          window.location.href = "produtos.html";
        }
      }, 1200);

    } catch (error) {
      console.error(error);
      msgLogin.innerHTML = "Erro ao conectar ao servidor.";
      msgLogin.classList.add("text-danger");
    }
  });
});
