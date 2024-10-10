function cadastro() {
    window.location.href = "cadastro.html";
}

function login() {
    var nome = document.getElementById("nome").value;
    var senha = document.getElementById("senha").value;

    // Valida��o dos campos
    if (!nome || !senha) {
        window.alert("Por favor, preencha todos os campos.");
        return;
    }

    const userAdmin = "admin";
    const passAdmin = "admin123";
    const normalUser = JSON.parse(localStorage.getItem("normalUser")) || [];

    // Verifica��o do usu�rio e senha
    if (nome === userAdmin && senha === passAdmin) {
        window.alert("Login bem-sucedido como administrador!");
        window.location.href = "pagina_admin.html";

    } else if (nome === normalUser && senha === passNormal) {
        window.alert("Login bem-sucedido como usu�rio!");
        window.location.href = "pagina_usuario.html";

    }
    else {
        // Mensagem de erro se o usu�rio ou senha estiverem incorretos
        window.alert("[ERRO] O usu�rio ou a senha n�o correspondem aos nossos registros.");
    }
}

function listarUsuarios() {
    const normalUser = JSON.parse(localStorage.getItem("normalUser")) || [];

    if (normalUser.length === 0) {
        console.log("Nenhum usu�rio cadastrado.");
        return;
    }

    console.log("Usu�rios cadastrados:");
    normalUser.forEach(user => {
        console.log(`Nome: ${user.nome}`);
    });
}

/* usu�rios cadastrados:
    user   senha
    Lucas  lucas123
    Leo    leo123

*/
