function cadastrar() {
    var nome = document.getElementById("novoNome").value;
    var senha = document.getElementById("novaSenha").value;

    if (!nome || !senha) {
        window.alert("Por favor, preencha todos os campos.");
        return;
    }

    const normalUser = JSON.parse(localStorage.getItem("normalUser")) || [];

    // Verifica se o usuário já está cadastrado
    if (normalUser.find(user => user.nome === nome)) {
        window.alert("[ERRO] Este nome de usuário já está cadastrado.");
        return;
    }

    // Cadastra o novo usuário
    normalUser.push({ nome: nome, senha: senha });
    localStorage.setItem("normalUser", JSON.stringify(normalUser));

    window.alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html"; // Redireciona para a página de login após o cadastro
}

