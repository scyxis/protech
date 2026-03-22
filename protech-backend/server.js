const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API ProTech funcionando! 🚀' });
});

// Rota de cadastro
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos campos obrigatórios' });
    }
    
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret');
    
    res.json({ 
      message: 'Cadastro realizado!',
      token,
      user: { name, email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota de login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret');
    
    res.json({ 
      message: 'Login realizado!',
      token,
      user: { name: email.split('@')[0], email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;