function cadastrar() {
    var nome = document.getElementById("novoNome").value;
    var senha = document.getElementById("novaSenha").value;

    if (!nome || !senha) {
        window.alert("Por favor, preencha todos os campos.");
        return;
    }

    const normalUser = JSON.parse(localStorage.getItem("normalUser")) || [];

    // Verifica se o usu�rio j� est� cadastrado
    if (normalUser.find(user => user.nome === nome)) {
        window.alert("[ERRO] Este nome de usu�rio j� est� cadastrado.");
        return;
    }

    // Cadastra o novo usu�rio
    normalUser.push({ nome: nome, senha: senha });
    localStorage.setItem("normalUser", JSON.stringify(normalUser));

    window.alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html"; // Redireciona para a p�gina de login ap�s o cadastro
}

