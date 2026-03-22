const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==================== MODELO DO USUÁRIO ====================
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  manutencoes: [{
    servicoId: String,
    nome: String,
    data: { type: Date, default: Date.now },
    status: { type: String, default: 'pendente' },
    preco: Number,
    dispositivo: String
  }],
  createdAt: { type: Date, default: Date.now }
});

// Criptografar senha antes de salvar
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar senha
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

// ==================== CONEXÃO COM MONGODB ====================
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/protech';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => {
    console.error('❌ Erro ao conectar MongoDB:', err.message);
    console.log('💡 Dica: Certifique-se que o MongoDB está rodando ou use MongoDB Atlas');
  });

// ==================== ROTAS ====================

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API ProTech funcionando! 🚀' });
});

// Cadastro
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validar dados
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Senha deve ter no mínimo 6 caracteres' });
    }
    
    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    
    // Criar novo usuário
    const user = new User({ name, email, password });
    await user.save();
    
    // Gerar token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret_key_temporaria',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuário
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }
    
    // Verificar senha
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }
    
    // Gerar token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret_key_temporaria',
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

// Middleware para autenticação
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_temporaria');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

// Obter dados do usuário logado
app.get('/api/users/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
});

// Adicionar manutenção
app.post('/api/users/manutencoes', authMiddleware, async (req, res) => {
  try {
    const { servicoId, nome, preco, dispositivo } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    user.manutencoes.push({
      servicoId,
      nome,
      preco,
      dispositivo,
      data: new Date(),
      status: 'pendente'
    });
    
    await user.save();
    res.json({ message: 'Manutenção adicionada com sucesso', manutencoes: user.manutencoes });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar manutenção' });
  }
});

// Listar manutenções do usuário
app.get('/api/users/manutencoes', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('manutencoes');
    res.json(user.manutencoes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar manutenções' });
  }
});

// ==================== INICIAR SERVIDOR ====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${3000}`);
  console.log(`📝 Rotas disponíveis:`);
  console.log(`   POST   /api/auth/register - Cadastro`);
  console.log(`   POST   /api/auth/login    - Login`);
  console.log(`   GET    /api/users/me      - Dados do usuário`);
  console.log(`   GET    /api/users/manutencoes - Manutenções`);
  console.log(`   POST   /api/users/manutencoes - Adicionar manutenção`);
});