function cadastro() {
    window.location.href = "cadastro.html";
}

function login() {
    var nome = document.getElementById("nome").value;
    var senha = document.getElementById("senha").value;

    // Validação dos campos
    if (!nome || !senha) {
        window.alert("Por favor, preencha todos os campos.");
        return;
    }

    const userAdmin = "admin";
    const passAdmin = "admin123";
    const normalUser = JSON.parse(localStorage.getItem("normalUser")) || [];

    // Verificação do usuário e senha
    if (nome === userAdmin && senha === passAdmin) {
        window.alert("Login bem-sucedido como administrador!");
        window.location.href = "pagina_admin.html";

    } else if (nome === normalUser && senha === passNormal) {
        window.alert("Login bem-sucedido como usuário!");
        window.location.href = "pagina_usuario.html";

    }
    else {
        // Mensagem de erro se o usuário ou senha estiverem incorretos
        window.alert("[ERRO] O usuário ou a senha não correspondem aos nossos registros.");
    }
}

function listarUsuarios() {
    const normalUser = JSON.parse(localStorage.getItem("normalUser")) || [];

    if (normalUser.length === 0) {
        console.log("Nenhum usuário cadastrado.");
        return;
    }

    console.log("Usuários cadastrados:");
    normalUser.forEach(user => {
        console.log(`Nome: ${user.nome}`);
    });
}

/* usuários cadastrados:
    user   senha
    Lucas  lucas123
    Leo    leo123

*/
