

// Proteção de acesso: Verificar se o usuário está logado
        document.addEventListener('DOMContentLoaded', () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            const currentUser = localStorage.getItem('currentUser');

            if (isLoggedIn !== 'true') {
                // Se não estiver logado, redireciona para a página de login
                alert('Acesso negado! Por favor, faça login.');
                window.location.href = 'index.html';
            } else {
                // Exibe o nome do usuário logado
                document.getElementById('user-display').textContent = currentUser;
            }
        });

        // Função de Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            // Remove o estado de login
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            
            // Redireciona para a página de login
            window.location.href = 'login.html';
        });



