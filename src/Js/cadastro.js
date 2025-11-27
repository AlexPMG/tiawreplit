document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formCadastro');
  const msgCadastro = document.getElementById('msgCadastro');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const celularRaw = document.getElementById('celular').value;
    const celular = (celularRaw || '').replace(/\D/g, '').trim();
    const documentoRaw = document.getElementById('documento').value;
    const cpfcnpj = (documentoRaw || '').replace(/\D/g, '').trim();
    const tipo = document.getElementById('tipo').value;
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const termos = document.getElementById('termos').checked;

    msgCadastro.innerHTML = '';
    msgCadastro.className = 'mt-3 text-center fw-bold';

    // ===== VALIDAÇÕES =====
    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/;
    if (!nome || nome.length < 2 || !nomeRegex.test(nome)) {
      msgCadastro.innerHTML = " O nome deve ter pelo menos 2 letras e não pode conter números.";
      msgCadastro.classList.add('text-warning');
      return;
    }

    if (!/^\d{11}$/.test(celular)) {
      msgCadastro.innerHTML = " O celular deve conter exatamente 11 números (somente dígitos).";
      msgCadastro.classList.add('text-warning');
      return;
    }

    if (!(cpfcnpj.length === 11 || cpfcnpj.length === 14) || !/^\d{11,14}$/.test(cpfcnpj)) {
      msgCadastro.innerHTML = " O CPF/CNPJ deve conter apenas números (11 para CPF, 14 para CNPJ).";
      msgCadastro.classList.add('text-warning');
      return;
    }

    if (!tipo) {
      msgCadastro.innerHTML = " Selecione o tipo de usuário (comprador ou vendedor).";
      msgCadastro.classList.add('text-warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      msgCadastro.innerHTML = " Digite um e-mail válido.";
      msgCadastro.classList.add('text-warning');
      return;
    }

    if (!senha || senha.length < 5) {
      msgCadastro.innerHTML = " A senha deve ter pelo menos 5 caracteres.";
      msgCadastro.classList.add('text-warning');
      return;
    }

    if (!endereco || endereco.length < 10) {
      msgCadastro.innerHTML = " Digite um endereço válido (mín. 10 caracteres).";
      msgCadastro.classList.add('text-warning');
      return;
    }

    if (!termos) {
      msgCadastro.innerHTML = " Você deve aceitar os Termos e Condições.";
      msgCadastro.classList.add('text-warning');
      return;
    }

    // ===== SALVANDO NO JSON SERVER =====
    try {
      // 1️⃣ Verifica se já existe um e-mail igual
      const response = await fetch('http://localhost:3000/usuarios');
      const usuarios = await response.json();

      const existe = usuarios.some(u => String(u.Email || '').trim().toLowerCase() === email.toLowerCase());
      if (existe) {
        msgCadastro.innerHTML = ' O email já está em uso. Por favor, escolha outro.';
        msgCadastro.classList.add('text-danger');
        return;
      }

      // 2️⃣ Monta o objeto a ser enviado
      const payload = {
        Nome: nome,
        Celular: celular,
        CPF_CNPJ: cpfcnpj,
        Tipo: tipo,
        Email: email,
        Senha: senha,
        Endereco: endereco,
        Carrinho: { ID: null }
      };

      // 3️⃣ Envia com método POST
      const res = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Erro ao cadastrar usuário');

      msgCadastro.innerHTML = ' Cadastro realizado com sucesso! Redirecionando para o login...';
      msgCadastro.classList.remove('text-warning');
      msgCadastro.classList.add('text-success');

      form.reset();
      setTimeout(() => { window.location.href = 'login.html'; }, 1500);

    } catch (error) {
      console.error(error);
      msgCadastro.innerHTML = ' Ocorreu um erro ao salvar os dados.';
      msgCadastro.classList.add('text-danger');
    }
  });
});
