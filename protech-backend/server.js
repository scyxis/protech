const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Criar banco SQLite (o arquivo será criado automaticamente)
const db = new Database('protech.db');
console.log('📁 Banco de dados: protech.db');

// Criar tabela de usuários
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    manutencoes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('✅ Tabela "users" pronta!');

// Rota de teste
app.get('/', (req, res) => {
  const count = db.prepare('SELECT COUNT(*) as total FROM users').get();
  res.json({ 
    message: 'API ProTech com SQLite! 🚀',
    usuarios: count.total,
    database: 'SQLite'
  });
});

// ==================== ROTAS DE AUTENTICAÇÃO ====================

// Cadastro
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos campos são obrigatórios' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
    }
    
    // Verificar se email já existe
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    
    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Inserir usuário
    const result = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(name, email, hashedPassword);
    
    // Gerar token JWT
    const token = jwt.sign(
      { userId: result.lastInsertRowid, email },
      process.env.JWT_SECRET || 'protech_secret_2024',
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Cadastro realizado com sucesso!',
      token,
      user: { id: result.lastInsertRowid, name, email }
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    
    // Buscar usuário
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    
    // Verificar senha
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    
    // Gerar token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'protech_secret_2024',
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Login realizado com sucesso!',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== MIDDLEWARE DE AUTENTICAÇÃO ====================

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'protech_secret_2024');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// ==================== ROTAS PROTEGIDAS ====================

// Dados do usuário logado
app.get('/api/users/me', authMiddleware, (req, res) => {
  try {
    const user = db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar manutenções do usuário
app.get('/api/users/manutencoes', authMiddleware, (req, res) => {
  try {
    const user = db.prepare('SELECT manutencoes FROM users WHERE id = ?').get(req.userId);
    const manutencoes = user?.manutencoes ? JSON.parse(user.manutencoes) : [];
    res.json(manutencoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Adicionar manutenção
app.post('/api/users/manutencoes', authMiddleware, async (req, res) => {
  try {
    const { servicoId, nome, preco, dispositivo } = req.body;
    
    // Buscar manutenções atuais
    const user = db.prepare('SELECT manutencoes FROM users WHERE id = ?').get(req.userId);
    let manutencoes = user?.manutencoes ? JSON.parse(user.manutencoes) : [];
    
    // Adicionar nova manutenção
    manutencoes.push({
      servicoId,
      nome,
      preco,
      dispositivo,
      data: new Date().toISOString(),
      status: 'pendente'
    });
    
    // Salvar de volta
    db.prepare('UPDATE users SET manutencoes = ? WHERE id = ?').run(JSON.stringify(manutencoes), req.userId);
    
    res.json({ message: 'Manutenção adicionada!', manutencoes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ROTAS ADMIN ====================

// Listar todos usuários (admin)
app.get('/api/admin/users', authMiddleware, (req, res) => {
  try {
    const users = db.prepare('SELECT id, name, email, created_at FROM users').all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Excluir usuário
app.delete('/api/admin/users/:id', authMiddleware, (req, res) => {
  try {
    const result = db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário excluído com sucesso' });
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
  console.log(`   GET    /api/admin/users       - Listar usuários (admin)`);
  console.log(`\n💡 Use Ctrl+C para parar\n`);
});

module.exports = app;