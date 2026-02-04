/**
 * Sistema de Autenticação e Gerenciamento de Usuários
 * Versão: 2.0
 */

class AuthManager {
  constructor() {
    this.users = this.getUsers();
    this.initializeDefaultUsers();
  }

  // Obtém todos os usuários do localStorage
  getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  // Salva usuários no localStorage
  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  // Inicializa usuários padrão se não existirem
  initializeDefaultUsers() {
    const users = this.getUsers();
    if (users.length === 0) {
      const defaultUsers = [
        {
          id: 'admin-001',
          username:'tavin.xbiueder',
          password:'sula5128',
          name: 'Tavin Xbiueder',
          email: 'tavin.xbiueder@admin.com',
          type: 'admin',
          active: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'admin-002',
          username: 'admin',
          password: 'admin123',
          name: 'Administrador',
          email: 'admin@sistema.com',
          type: 'admin',
          active: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'prof-001',
          username: 'professor',
          password: 'prof123',
          name: 'Professor Sistema',
          email: 'professor@sistema.com',
          type: 'professor',
          active: true,
          createdAt: new Date().toISOString()
        }
      ];
      
      this.users = defaultUsers;
      this.saveUsers();
    } else {
      this.users = users;
    }
  }

  // Realiza login
  login(username, password) {
    const user = this.users.find(u => 
      u.username === username && 
      u.password === password && 
      u.active
    );

    if (user) {
      // Salva dados da sessão
      localStorage.setItem('logado', 'true');
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        type: user.type
      }));

      return {
        success: true,
        message: 'Login realizado com sucesso!',
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          type: user.type
        }
      };
    }

    return {
      success: false,
      message: 'Usuário ou senha incorretos!'
    };
  }

  // Realiza logout
  logout() {
    localStorage.removeItem('logado');
    localStorage.removeItem('currentUser');
  }

  // Verifica se está logado
  isLoggedIn() {
    return localStorage.getItem('logado') === 'true';
  }

  // Obtém usuário atual
  getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  // Verifica se é administrador
  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.type === 'admin';
  }

  // Verifica se é professor
  isProfessor() {
    const user = this.getCurrentUser();
    return user && user.type === 'professor';
  }

  // Registra novo usuário (apenas admins)
  registerUser(userData) {
    if (!this.isAdmin()) {
      return {
        success: false,
        message: 'Apenas administradores podem registrar usuários!'
      };
    }

    // Verifica se usuário já existe
    const existingUser = this.users.find(u => 
      u.username === userData.username || u.email === userData.email
    );

    if (existingUser) {
      return {
        success: false,
        message: 'Usuário ou email já existe!'
      };
    }

    // Cria novo usuário
    const newUser = {
      id: `${userData.type}-${Date.now()}`,
      username: userData.username,
      password: userData.password,
      name: userData.name,
      email: userData.email,
      type: userData.type,
      active: true,
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);
    this.saveUsers();

    return {
      success: true,
      message: 'Usuário registrado com sucesso!',
      user: newUser
    };
  }

  // Lista todos os usuários (apenas admins)
  listUsers() {
    if (!this.isAdmin()) {
      return {
        success: false,
        message: 'Acesso negado!'
      };
    }

    return {
      success: true,
      users: this.users.map(u => ({
        id: u.id,
        username: u.username,
        name: u.name,
        email: u.email,
        type: u.type,
        active: u.active,
        createdAt: u.createdAt
      }))
    };
  }

  // Atualiza usuário (apenas admins)
  updateUser(userId, updateData) {
    if (!this.isAdmin()) {
      return {
        success: false,
        message: 'Acesso negado!'
      };
    }

    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return {
        success: false,
        message: 'Usuário não encontrado!'
      };
    }

    // Atualiza dados
    this.users[userIndex] = { ...this.users[userIndex], ...updateData };
    this.saveUsers();

    return {
      success: true,
      message: 'Usuário atualizado com sucesso!'
    };
  }

  // Remove usuário (apenas admins)
  deleteUser(userId) {
    if (!this.isAdmin()) {
      return {
        success: false,
        message: 'Acesso negado!'
      };
    }

    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return {
        success: false,
        message: 'Usuário não encontrado!'
      };
    }

    // Não permite deletar o próprio usuário
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      return {
        success: false,
        message: 'Você não pode deletar seu próprio usuário!'
      };
    }

    this.users.splice(userIndex, 1);
    this.saveUsers();

    return {
      success: true,
      message: 'Usuário removido com sucesso!'
    };
  }

  // Altera senha do usuário atual
  changePassword(currentPassword, newPassword) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        message: 'Usuário não logado!'
      };
    }

    const user = this.users.find(u => u.id === currentUser.id);
    if (!user || user.password !== currentPassword) {
      return {
        success: false,
        message: 'Senha atual incorreta!'
      };
    }

    user.password = newPassword;
    this.saveUsers();

    return {
      success: true,
      message: 'Senha alterada com sucesso!'
    };
  }

  // Obtém estatísticas de usuários (apenas admins)
  getUserStats() {
    if (!this.isAdmin()) {
      return {
        success: false,
        message: 'Acesso negado!'
      };
    }

    const stats = {
      total: this.users.length,
      admins: this.users.filter(u => u.type === 'admin').length,
      professores: this.users.filter(u => u.type === 'professor').length,
      ativos: this.users.filter(u => u.active).length,
      inativos: this.users.filter(u => !u.active).length
    };

    return {
      success: true,
      stats: stats
    };
  }
}

// Instância global do gerenciador de autenticação
const authManager = new AuthManager();

