const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/protech';

console.log('🔍 Testando MongoDB Local...');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ CONEXÃO BEM-SUCEDIDA!');
    console.log('🎉 MongoDB Local está funcionando!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ ERRO:', err.message);
    console.log('\n🔧 Para usar MongoDB local:');
    console.log('1. Baixe e instale o MongoDB Community');
    console.log('2. Execute: "C:\\Program Files\\MongoDB\\Server\\7.0\\bin\\mongod.exe"');
    console.log('3. Ou use MongoDB Atlas (conexão online)');
    process.exit(1);
  });