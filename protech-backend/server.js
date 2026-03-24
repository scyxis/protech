const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ==================== CONEXÃO POSTGRESQL ====================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Criar tabelas
async function initDatabase() {
  try {
    // Tabela de usuários
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Tabela de manutenções
    await pool.query(`
      CREATE TABLE IF NOT EXISTS manutencoes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        servico_id INTEGER,
        nome VARCHAR(255) NOT NULL,
        dispositivo VARCHAR(255),
        preco VARCHAR(50),
        status VARCHAR(50) DEFAULT 'pendente',
        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data_pagamento TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Tabelas criadas/verificadas!');
    
    // Criar admin se não existir
    const adminExists = await pool.query('SELECT id FROM users WHERE email = $1', ['admin@protech.com']);
    if (adminExists.rows.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
        ['Administrador', 'admin@protech.com', hashedPassword, 'admin']
      );
      console.log('✅ Usuário admin criado!');
      console.log('📧 Email: admin@protech.com');
      console.log('🔑 Senha: admin123');
    }
    
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
  }
}

initDatabase();

// ==================== ROTA DE TESTE ====================
app.get('/', (req, res) => {
  res.json({ 
    message: 'API ProTech com PostgreSQL! 🚀',
    database: 'PostgreSQL'
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
    
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role',
      [name, email, hashedPassword]
    );
    
    const user = result.rows[0];
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'protech_secret_2024',
      { expiresIn: '30d' }
    );
    
    res.json({
      message: 'Cadastro realizado com sucesso!',
      token,
      user
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    
    if (!valid) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'protech_secret_2024',
      { expiresIn: '30d' }
    );
    
    res.json({
      message: 'Login realizado com sucesso!',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== MIDDLEWARES ====================

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'protech_secret_2024');
    req.userId = decoded.userId;
    req.userRole = decoded.role;
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

app.get('/api/users/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [req.userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/manutencoes', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM manutencoes WHERE user_id = $1 ORDER BY created_at DESC', [req.userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users/manutencoes', authMiddleware, async (req, res) => {
  try {
    const { servicoId, nome, dispositivo, preco, status } = req.body;
    
    const result = await pool.query(
      `INSERT INTO manutencoes (user_id, servico_id, nome, dispositivo, preco, status) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.userId, servicoId, nome, dispositivo, preco, status || 'pendente']
    );
    
    res.json({ message: 'Manutenção adicionada!', manutencao: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/manutencoes/:id/pagar', authMiddleware, async (req, res) => {
  try {
    const manutencaoId = parseInt(req.params.id);
    
    const result = await pool.query(
      `UPDATE manutencoes SET status = 'pago', data_pagamento = CURRENT_TIMESTAMP 
       WHERE id = $1 AND user_id = $2 RETURNING *`,
      [manutencaoId, req.userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Manutenção não encontrada' });
    }
    
    res.json({ message: 'Pagamento realizado!', manutencao: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ROTAS DO TÉCNICO (VÊ TODAS AS MANUTENÇÕES) ====================

app.get('/api/tecnico/ordens', authMiddleware, tecnicoMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT m.*, u.name as cliente_nome, u.email as cliente_email 
      FROM manutencoes m
      JOIN users u ON m.user_id = u.id
      ORDER BY m.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/tecnico/ordens/:id', authMiddleware, tecnicoMiddleware, async (req, res) => {
  try {
    const ordemId = parseInt(req.params.id);
    const { status } = req.body;
    
    const result = await pool.query(
      `UPDATE manutencoes SET status = $1 WHERE id = $2 RETURNING *`,
      [status, ordemId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ordem não encontrada' });
    }
    
    res.json({ message: 'Ordem atualizada', ordem: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ROTAS DO ADMIN ====================

app.get('/api/admin/usuarios', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/usuarios/:id/role', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'tecnico', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Papel inválido' });
    }
    
    const result = await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING *',
      [role, req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json({ message: 'Papel atualizado com sucesso', user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await pool.query('SELECT COUNT(*) as total FROM users');
    const tecnicos = await pool.query('SELECT COUNT(*) as total FROM users WHERE role = $1', ['tecnico']);
    const admins = await pool.query('SELECT COUNT(*) as total FROM users WHERE role = $1', ['admin']);
    const totalOrdens = await pool.query('SELECT COUNT(*) as total FROM manutencoes');
    
    res.json({
      totalUsuarios: parseInt(totalUsers.rows[0].total),
      totalTecnicos: parseInt(tecnicos.rows[0].total),
      totalAdmins: parseInt(admins.rows[0].total),
      totalOrdens: parseInt(totalOrdens.rows[0].total)
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
  console.log(`   GET    /api/tecnico/ordens    - Todas ordens (técnico/admin)`);
  console.log(`   GET    /api/admin/usuarios    - Listar usuários (admin)`);
  console.log(`   PUT    /api/admin/usuarios/:id/role - Alterar papel (admin)`);
  console.log(`\n💡 Use Ctrl+C para parar\n`);
});

module.exports = app;