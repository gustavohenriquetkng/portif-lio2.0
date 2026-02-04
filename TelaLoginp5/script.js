// Array com 3 usuários
const usuarios = [
    { id: 1, usuario: "gustavo", senha: "12345" },
    { id: 2, usuario: "admin", senha: "admin123" },
    { id: 3, usuario: "visitante", senha: "senha123" }
];

// Função de login
function logar() {
    const userInput = document.getElementById("usuario").value;
    const senhaInput = document.getElementById("senha").value;

    // Procura usuário no array
    const user = usuarios.find(u => u.usuario === userInput && u.senha === senhaInput);

    if (user) {
        alert(`Login bem-sucedido! Bem-vindo, ${user.usuario}`);

        // 🔥 Redireciona para a página inicial
        window.location.href = "inicial.html";

    } else {
        alert("Usuário ou senha incorretos!");
    }
}
