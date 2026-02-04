// Seleção de elementos do DOM
const loginFormContainer = document.getElementById('login-form-container');
const signupFormContainer = document.getElementById('signup-form-container');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const loginMessage = document.getElementById('login-message');
const signupMessage = document.getElementById('signup-message');

// Alternar entre formulários de Login e Cadastro
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormContainer.classList.add('hidden');
    signupFormContainer.classList.remove('hidden');
    clearMessages();
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupFormContainer.classList.add('hidden');
    loginFormContainer.classList.remove('hidden');
    clearMessages();
});

// Função para limpar mensagens de feedback
function clearMessages() {
    loginMessage.textContent = '';
    loginMessage.className = 'message';
    signupMessage.textContent = '';
    signupMessage.className = 'message';
}

// Função para exibir mensagens
function displayMessage(element, text, type) {
    element.textContent = text;
    element.className = `message ${type}`;
}

// Lógica de Cadastro
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    // Recuperar usuários existentes do LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Validar se o usuário já existe
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        displayMessage(signupMessage, 'Usuário já existe!', 'error');
    } else {
        // Adicionar novo usuário
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        displayMessage(signupMessage, 'Conta criada com sucesso!', 'success');
        signupForm.reset();
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
            showLogin.click();
        }, 2000);
    }
});

// Lógica de Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Recuperar usuários do LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar credenciais
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Salvar estado de login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        
        displayMessage(loginMessage, 'Login bem-sucedido! Redirecionando...', 'success');
        
        // Redirecionar para o dashboard
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        displayMessage(loginMessage, 'Usuário ou senha incorretos!', 'error');
    }
});
