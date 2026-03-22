const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ==================== BANCO DE DADOS ====================
const db = new Database('protech.db');
console.log('📁 Banco de dados: protech.db');

// Criar tabela de usuários
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    manutencoes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Adicionar coluna role se não existir
try {
  db.exec(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'`);
  console.log('✅ Coluna role adicionada');
} catch (e) {
  console.log('ℹ️ Coluna role já existe');
}

console.log('✅ Banco de dados pronto!');

// ==================== CRIAR ADMIN AUTOMATICAMENTE ====================
async function criarAdminSeNaoExistir() {
  try {
    const email = 'admin@protech.com';
    const password = 'admin123';
    const name = 'Administrador';
    
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    
    if (!existing) {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run(name, email, hashedPassword, 'admin');
      console.log('✅ Usuário admin criado automaticamente!');
      console.log('📧 Email: admin@protech.com');
      console.log('🔑 Senha: admin123');
    } else {
      console.log('ℹ️ Usuário admin já existe');
    }
  } catch (error) {
    console.error('Erro ao criar admin:', error);
  }
}

// Chamar a função
criarAdminSeNaoExistir();

// ==================== ROTA DE TESTE ====================
app.get('/', (req, res) => {
  const count = db.prepare('SELECT COUNT(*) as total FROM users').get();
  res.json({ 
    message: 'API ProTech com SQLite! 🚀',
    usuarios: count.total,
    database: 'SQLite'
  });
});

// ==================== AUTENTICAÇÃO ====================

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos campos são obrigatórios' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
    }
    
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(name, email, hashedPassword);
    
    const token = jwt.sign(
      { userId: result.lastInsertRowid, email, role: 'user' },
      process.env.JWT_SECRET || 'protech_secret_2024',
      { expiresIn: '30d' }
    );
    
    res.json({
      message: 'Cadastro realizado com sucesso!',
      token,
      user: { id: result.lastInsertRowid, name, email, role: 'user' }
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Tentativa login:', email);
    
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user) {
      console.log('Usuário não encontrado');
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    
    const valid = await bcrypt.compare(password, user.password);
    console.log('Senha válida:', valid);
    
    if (!valid) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role || 'user' },
      process.env.JWT_SECRET || 'protech_secret_2024',
      { expiresIn: '30d' }
    );
    
    res.json({
      message: 'Login realizado com sucesso!',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role || 'user' }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== MIDDLEWARES ====================

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'protech_secret_2024');
    req.userId = decoded.userId;
    req.userRole = decoded.role || 'user';
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

const tecnicoMiddleware = (req, res, next) => {
  if (req.userRole === 'tecnico' || req.userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Acesso negado. Apenas técnicos e administradores.' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
  }
};

// ==================== ROTAS DO USUÁRIO ====================

app.get('/api/users/me', authMiddleware, (req, res) => {
  try {
    const user = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(req.userId);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/manutencoes', authMiddleware, (req, res) => {
  try {
    const user = db.prepare('SELECT manutencoes FROM users WHERE id = ?').get(req.userId);
    const manutencoes = user?.manutencoes ? JSON.parse(user.manutencoes) : [];
    res.json(manutencoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users/manutencoes', authMiddleware, (req, res) => {
  try {
    const { servicoId, nome, dispositivo, preco, status, data } = req.body;
    
    const user = db.prepare('SELECT manutencoes FROM users WHERE id = ?').get(req.userId);
    let manutencoes = user?.manutencoes ? JSON.parse(user.manutencoes) : [];
    
    const novaManutencao = {
      id: Date.now(),
      servicoId,
      nome,
      dispositivo,
      preco,
      status: status || 'pendente',
      data: data || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    manutencoes.push(novaManutencao);
    db.prepare('UPDATE users SET manutencoes = ? WHERE id = ?').run(JSON.stringify(manutencoes), req.userId);
    
    res.json({ message: 'Manutenção adicionada!', manutencao: novaManutencao });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/manutencoes/:id/pagar', authMiddleware, (req, res) => {
  try {
    const manutencaoId = parseInt(req.params.id);
    
    const user = db.prepare('SELECT manutencoes FROM users WHERE id = ?').get(req.userId);
    let manutencoes = user?.manutencoes ? JSON.parse(user.manutencoes) : [];
    
    const index = manutencoes.findIndex(m => m.id === manutencaoId);
    if (index === -1) return res.status(404).json({ error: 'Manutenção não encontrada' });
    
    manutencoes[index].status = 'pago';
    manutencoes[index].dataPagamento = new Date().toISOString();
    
    db.prepare('UPDATE users SET manutencoes = ? WHERE id = ?').run(JSON.stringify(manutencoes), req.userId);
    
    res.json({ message: 'Pagamento realizado!', manutencao: manutencoes[index] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ROTAS DO TÉCNICO ====================

app.get('/api/tecnico/ordens', authMiddleware, tecnicoMiddleware, (req, res) => {
  try {
    const users = db.prepare('SELECT id, name, email, manutencoes FROM users').all();
    const todasOrdens = [];
    
    users.forEach(user => {
      const manutencoes = user.manutencoes ? JSON.parse(user.manutencoes) : [];
      manutencoes.forEach(ordem => {
        todasOrdens.push({
          ...ordem,
          clienteId: user.id,
          clienteNome: user.name,
          clienteEmail: user.email
        });
      });
    });
    
    res.json(todasOrdens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/tecnico/ordens/:id', authMiddleware, tecnicoMiddleware, (req, res) => {
  try {
    const ordemId = parseInt(req.params.id);
    const { status } = req.body;
    
    const users = db.prepare('SELECT id, manutencoes FROM users').all();
    
    for (const user of users) {
      let manutencoes = user.manutencoes ? JSON.parse(user.manutencoes) : [];
      const index = manutencoes.findIndex(m => m.id === ordemId);
      
      if (index !== -1) {
        manutencoes[index].status = status;
        manutencoes[index].dataAtualizacao = new Date().toISOString();
        db.prepare('UPDATE users SET manutencoes = ? WHERE id = ?').run(JSON.stringify(manutencoes), user.id);
        res.json({ message: 'Ordem atualizada', ordem: manutencoes[index] });
        return;
      }
    }
    
    res.status(404).json({ error: 'Ordem não encontrada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ROTAS DO ADMIN ====================

app.get('/api/admin/usuarios', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const users = db.prepare('SELECT id, name, email, role, created_at FROM users').all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/usuarios/:id/role', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'tecnico', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Papel inválido' });
    }
    
    const result = db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ message: 'Papel atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/stats', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const totalUsers = db.prepare('SELECT COUNT(*) as total FROM users').get();
    const tecnicos = db.prepare('SELECT COUNT(*) as total FROM users WHERE role = "tecnico"').get();
    const admins = db.prepare('SELECT COUNT(*) as total FROM users WHERE role = "admin"').get();
    
    res.json({
      totalUsuarios: totalUsers.total,
      totalTecnicos: tecnicos.total,
      totalAdmins: admins.total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== INICIAR SERVIDOR ====================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor ProTech rodando!`);
  console.log(`📡 http://localhost:${PORT}`);
  console.log(`\n📝 Rotas disponíveis:`);
  console.log(`   POST   /api/auth/register     - Cadastro`);
  console.log(`   POST   /api/auth/login        - Login`);
  console.log(`   GET    /api/users/me          - Meus dados`);
  console.log(`   GET    /api/users/manutencoes - Minhas manutenções`);
  console.log(`   POST   /api/users/manutencoes - Adicionar manutenção`);
  console.log(`   GET    /api/tecnico/ordens    - Todas ordens (técnico)`);
  console.log(`   GET    /api/admin/usuarios    - Listar usuários (admin)`);
  console.log(`\n💡 Use Ctrl+C para parar\n`);
});
// ==================== ROTA PARA CRIAR ADMIN (apenas para setup) ====================
app.post('/api/setup/create-admin', async (req, res) => {
  try {
    const { secret } = req.body;
    
    // Chave secreta para segurança (mude para algo mais seguro)
    const SETUP_SECRET = 'protech_admin_setup_2024';
    
    if (secret !== SETUP_SECRET) {
      return res.status(401).json({ error: 'Chave secreta inválida' });
    }
    
    const email = 'admin@protech.com';
    const password = 'admin123';
    const name = 'Administrador';
    
    // Verificar se já existe
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    if (existing) {
      db.prepare('UPDATE users SET password = ?, role = ?, name = ? WHERE email = ?').run(hashedPassword, 'admin', name, email);
      res.json({ message: '✅ Usuário admin atualizado!', email, password });
    } else {
      db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run(name, email, hashedPassword, 'admin');
      res.json({ message: '✅ Usuário admin criado!', email, password });
    }
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = app;