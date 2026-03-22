const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  manutencoes: [{
    servicoId: String,
    nome: String,
    data: Date,
    status: {
      type: String,
      enum: ['pendente', 'em_andamento', 'concluido', 'cancelado'],
      default: 'pendente'
    },
    preco: Number,
    dispositivo: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// Criptografar senha antes de salvar
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senha
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);