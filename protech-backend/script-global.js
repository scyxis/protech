// ============================================
// SCRIPT GLOBAL - SINCRONIZAÇÃO EM TEMPO REAL
// ============================================

const API_URL = 'https://protech-rt8q.onrender.com/api';

// Evento para notificar mudanças
const PRO_TECH_EVENTS = {
  USER_CREATED: 'protech_user_created',
  USER_UPDATED: 'protech_user_updated',
  USER_DELETED: 'protech_user_deleted',
  ORDER_CREATED: 'protech_order_created',
  ORDER_UPDATED: 'protech_order_updated',
  ORDER_DELETED: 'protech_order_deleted',
  PAYMENT_COMPLETED: 'protech_payment_completed',
  CART_UPDATED: 'protech_cart_updated'
};

// Função para disparar evento global
function emitGlobalEvent(eventName, data) {
  const event = new CustomEvent(eventName, { detail: data });
  window.dispatchEvent(event);
  console.log(`📡 Evento disparado: ${eventName}`, data);
}

// Função para buscar dados atualizados do backend
async function fetchUpdatedData(endpoint) {
  const token = localStorage.getItem('protech_token');
  if (!token) return null;
  
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
  return null;
}

// ============================================
// FUNÇÕES DE SINCRONIZAÇÃO
// ============================================

// Sincronizar usuários
async function syncUsers() {
  const users = await fetchUpdatedData('admin/usuarios');
  if (users) {
    localStorage.setItem('protech_users_cache', JSON.stringify(users));
    emitGlobalEvent(PRO_TECH_EVENTS.USER_UPDATED, users);
  }
  return users;
}

// Sincronizar ordens
async function syncOrders() {
  const ordens = await fetchUpdatedData('tecnico/ordens');
  if (ordens) {
    localStorage.setItem('protech_ordens_cache', JSON.stringify(ordens));
    emitGlobalEvent(PRO_TECH_EVENTS.ORDER_UPDATED, ordens);
  }
  return ordens;
}

// Sincronizar manutenções do usuário
async function syncUserMaintenances() {
  const manutencoes = await fetchUpdatedData('users/manutencoes');
  if (manutencoes) {
    localStorage.setItem('protech_manutencoes_cache', JSON.stringify(manutencoes));
    emitGlobalEvent(PRO_TECH_EVENTS.ORDER_UPDATED, manutencoes);
  }
  return manutencoes;
}

// ============================================
// FUNÇÕES DE AÇÕES QUE DISPARAM EVENTOS
// ============================================

// Criar nova manutenção (contratar serviço)
async function criarManutencao(servico, quantidade = 1) {
  const token = localStorage.getItem('protech_token');
  if (!token) {
    showToast('🔒 Faça login para contratar', true);
    return false;
  }
  
  let sucessos = 0;
  
  for (let i = 0; i < quantidade; i++) {
    const manutencao = {
      servicoId: servico.id,
      nome: servico.name,
      dispositivo: servico.device,
      preco: servico.price,
      status: 'pendente',
      data: new Date().toISOString()
    };
    
    try {
      const response = await fetch(`${API_URL}/users/manutencoes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(manutencao)
      });
      
      if (response.ok) {
        sucessos++;
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  }
  
  if (sucessos > 0) {
    // Disparar evento de ordem criada
    emitGlobalEvent(PRO_TECH_EVENTS.ORDER_CREATED, { servico, quantidade: sucessos });
    // Sincronizar dados
    await syncUserMaintenances();
    await syncOrders();
    return true;
  }
  return false;
}

// Atualizar status da ordem
async function atualizarStatusOrdem(ordemId, novoStatus) {
  const token = localStorage.getItem('protech_token');
  if (!token) return false;
  
  try {
    const response = await fetch(`${API_URL}/tecnico/ordens/${ordemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: novoStatus })
    });
    
    if (response.ok) {
      emitGlobalEvent(PRO_TECH_EVENTS.ORDER_UPDATED, { ordemId, status: novoStatus });
      await syncOrders();
      await syncUserMaintenances();
      return true;
    }
  } catch (error) {
    console.error('Erro:', error);
  }
  return false;
}

// Realizar pagamento
async function realizarPagamento(manutencaoId) {
  const token = localStorage.getItem('protech_token');
  if (!token) return false;
  
  try {
    const response = await fetch(`${API_URL}/users/manutencoes/${manutencaoId}/pagar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      emitGlobalEvent(PRO_TECH_EVENTS.PAYMENT_COMPLETED, { manutencaoId });
      await syncUserMaintenances();
      await syncOrders();
      return true;
    }
  } catch (error) {
    console.error('Erro:', error);
  }
  return false;
}

// Criar novo usuário (cadastro)
async function criarUsuario(name, email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      emitGlobalEvent(PRO_TECH_EVENTS.USER_CREATED, data.user);
      await syncUsers();
      return data;
    }
  } catch (error) {
    console.error('Erro:', error);
  }
  return null;
}

// Atualizar papel do usuário (admin)
async function atualizarPapelUsuario(userId, novaRole) {
  const token = localStorage.getItem('protech_token');
  if (!token) return false;
  
  try {
    const response = await fetch(`${API_URL}/admin/usuarios/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ role: novaRole })
    });
    
    if (response.ok) {
      emitGlobalEvent(PRO_TECH_EVENTS.USER_UPDATED, { userId, role: novaRole });
      await syncUsers();
      return true;
    }
  } catch (error) {
    console.error('Erro:', error);
  }
  return false;
}

// Excluir usuário
async function excluirUsuario(userId) {
  const token = localStorage.getItem('protech_token');
  if (!token) return false;
  
  try {
    const response = await fetch(`${API_URL}/admin/usuarios/${userId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.ok) {
      emitGlobalEvent(PRO_TECH_EVENTS.USER_DELETED, { userId });
      await syncUsers();
      return true;
    }
  } catch (error) {
    console.error('Erro:', error);
  }
  return false;
}

// Excluir ordem
async function excluirOrdem(ordemId) {
  const token = localStorage.getItem('protech_token');
  if (!token) return false;
  
  try {
    const response = await fetch(`${API_URL}/admin/ordens/${ordemId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.ok) {
      emitGlobalEvent(PRO_TECH_EVENTS.ORDER_DELETED, { ordemId });
      await syncOrders();
      await syncUserMaintenances();
      return true;
    }
  } catch (error) {
    console.error('Erro:', error);
  }
  return false;
}

// ============================================
// INICIALIZAÇÃO DOS LISTENERS GLOBAIS
// ============================================

function initGlobalSync() {
  console.log('🔄 Sistema de sincronização global iniciado');
  
  // Ouvir eventos de usuário
  window.addEventListener(PRO_TECH_EVENTS.USER_CREATED, (e) => {
    console.log('👤 Novo usuário criado:', e.detail);
    // Atualizar dashboard se estiver visível
    if (window.location.pathname.includes('admin')) {
      if (typeof carregarUsuarios === 'function') carregarUsuarios();
      if (typeof carregarEstatisticas === 'function') carregarEstatisticas();
    }
  });
  
  window.addEventListener(PRO_TECH_EVENTS.USER_UPDATED, (e) => {
    console.log('👤 Usuário atualizado:', e.detail);
    if (window.location.pathname.includes('admin')) {
      if (typeof carregarUsuarios === 'function') carregarUsuarios();
    }
  });
  
  window.addEventListener(PRO_TECH_EVENTS.USER_DELETED, (e) => {
    console.log('🗑️ Usuário excluído:', e.detail);
    if (window.location.pathname.includes('admin')) {
      if (typeof carregarUsuarios === 'function') carregarUsuarios();
      if (typeof carregarEstatisticas === 'function') carregarEstatisticas();
    }
  });
  
  // Ouvir eventos de ordens
  window.addEventListener(PRO_TECH_EVENTS.ORDER_CREATED, (e) => {
    console.log('📦 Nova ordem criada:', e.detail);
    // Atualizar todas as páginas relevantes
    if (window.location.pathname.includes('tecnico') || window.location.pathname.includes('admin')) {
      if (typeof carregarOrdens === 'function') carregarOrdens();
    }
    if (window.location.pathname.includes('manutencoes')) {
      if (typeof carregarManutencoes === 'function') carregarManutencoes();
    }
    if (typeof carregarEstatisticas === 'function') carregarEstatisticas();
  });
  
  window.addEventListener(PRO_TECH_EVENTS.ORDER_UPDATED, (e) => {
    console.log('📦 Ordem atualizada:', e.detail);
    if (window.location.pathname.includes('tecnico') || window.location.pathname.includes('admin')) {
      if (typeof carregarOrdens === 'function') carregarOrdens();
    }
    if (window.location.pathname.includes('manutencoes')) {
      if (typeof carregarManutencoes === 'function') carregarManutencoes();
    }
  });
  
  window.addEventListener(PRO_TECH_EVENTS.ORDER_DELETED, (e) => {
    console.log('🗑️ Ordem excluída:', e.detail);
    if (window.location.pathname.includes('tecnico') || window.location.pathname.includes('admin')) {
      if (typeof carregarOrdens === 'function') carregarOrdens();
    }
    if (typeof carregarEstatisticas === 'function') carregarEstatisticas();
  });
  
  window.addEventListener(PRO_TECH_EVENTS.PAYMENT_COMPLETED, (e) => {
    console.log('💳 Pagamento realizado:', e.detail);
    if (window.location.pathname.includes('manutencoes')) {
      if (typeof carregarManutencoes === 'function') carregarManutencoes();
    }
    if (window.location.pathname.includes('tecnico') || window.location.pathname.includes('admin')) {
      if (typeof carregarOrdens === 'function') carregarOrdens();
    }
    if (typeof carregarEstatisticas === 'function') carregarEstatisticas();
  });
  
  // Carregar dados iniciais em cache
  if (localStorage.getItem('protech_token')) {
    syncUsers();
    syncOrders();
    syncUserMaintenances();
  }
}

// Inicializar quando a página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobalSync);
} else {
  initGlobalSync();
}