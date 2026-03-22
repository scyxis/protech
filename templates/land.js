/* ============================================ */
// PRO TECH - JAVASCRIPT COMPLETO
/* ============================================ */

(function() {
    'use strict';

    // ============================================
    // BASE DE DADOS
    // ============================================
    const servicesData = [
        // iPhone
        { device: 'celular', service: 'tela', brand: 'iphone', name: 'Troca de Tela - iPhone 11', desc: 'Tela LCD original com garantia.', price: 'R$ 299', time: '2h', badge: 'iPhone' },
        { device: 'celular', service: 'tela', brand: 'iphone', name: 'Troca de Tela - iPhone 12', desc: 'Tela Super Retina XDR.', price: 'R$ 399', time: '2h', badge: 'iPhone' },
        { device: 'celular', service: 'tela', brand: 'iphone', name: 'Troca de Tela - iPhone 13', desc: 'Tela OLED de alta qualidade.', price: 'R$ 449', time: '2h', badge: 'iPhone' },
        { device: 'celular', service: 'bateria', brand: 'iphone', name: 'Bateria - iPhone 11', desc: 'Bateria original Apple.', price: 'R$ 199', time: '1h', badge: 'iPhone' },
        { device: 'celular', service: 'bateria', brand: 'iphone', name: 'Bateria - iPhone 12', desc: 'Bateria de alta capacidade.', price: 'R$ 229', time: '1h', badge: 'iPhone' },
        { device: 'celular', service: 'pelicula', brand: 'iphone', name: 'Película de Vidro - iPhone', desc: 'Vidro temperado 9H.', price: 'R$ 49', time: '15min', badge: 'iPhone' },
        
        // Samsung
        { device: 'celular', service: 'tela', brand: 'samsung', name: 'Troca de Tela - Samsung S21', desc: 'Tela Dynamic AMOLED.', price: 'R$ 349', time: '2h', badge: 'Samsung' },
        { device: 'celular', service: 'tela', brand: 'samsung', name: 'Troca de Tela - Samsung A系列', desc: 'Tela LCD original.', price: 'R$ 249', time: '2h', badge: 'Samsung' },
        { device: 'celular', service: 'bateria', brand: 'samsung', name: 'Bateria - Samsung S系列', desc: 'Bateria original.', price: 'R$ 179', time: '1h', badge: 'Samsung' },
        { device: 'celular', service: 'pelicula', brand: 'samsung', name: 'Película de Vidro - Samsung', desc: 'Proteção para tela curva.', price: 'R$ 59', time: '15min', badge: 'Samsung' },
        
        // Xiaomi
        { device: 'celular', service: 'tela', brand: 'xiaomi', name: 'Troca de Tela - Xiaomi Redmi', desc: 'Tela LCD original.', price: 'R$ 239', time: '2h', badge: 'Xiaomi' },
        { device: 'celular', service: 'bateria', brand: 'xiaomi', name: 'Bateria - Xiaomi', desc: 'Alta capacidade.', price: 'R$ 149', time: '1h', badge: 'Xiaomi' },
        { device: 'celular', service: 'pelicula', brand: 'xiaomi', name: 'Película - Xiaomi', desc: 'Proteção completa.', price: 'R$ 45', time: '15min', badge: 'Xiaomi' },
        
        // Motorola
        { device: 'celular', service: 'tela', brand: 'motorola', name: 'Troca de Tela - Motorola', desc: 'Tela LCD.', price: 'R$ 219', time: '2h', badge: 'Motorola' },
        { device: 'celular', service: 'bateria', brand: 'motorola', name: 'Bateria - Motorola', desc: 'Bateria original.', price: 'R$ 139', time: '1h', badge: 'Motorola' },
        
        // Dell
        { device: 'computador', service: 'software', brand: 'dell', name: 'Formatação - Dell Inspiron', desc: 'Formatação completa.', price: 'R$ 149', time: '3h', badge: 'Dell' },
        { device: 'computador', service: 'bateria', brand: 'dell', name: 'Bateria - Dell', desc: 'Bateria original.', price: 'R$ 349', time: '1h', badge: 'Dell' },
        { device: 'computador', service: 'tela', brand: 'dell', name: 'Troca de Tela - Dell Notebook', desc: 'Tela LCD/LED original.', price: 'R$ 399', time: '2h', badge: 'Dell' },
        
        // HP
        { device: 'computador', service: 'software', brand: 'hp', name: 'Formatação - HP Pavilion', desc: 'Formatação e backup.', price: 'R$ 159', time: '3h', badge: 'HP' },
        { device: 'computador', service: 'bateria', brand: 'hp', name: 'Bateria - HP', desc: 'Bateria original.', price: 'R$ 329', time: '1h', badge: 'HP' },
        
        // Tablets
        { device: 'tablet', service: 'tela', brand: 'samsung', name: 'Troca de Tela - Samsung Tab', desc: 'Tela para tablet.', price: 'R$ 399', time: '2h', badge: 'Samsung Tablet' },
        { device: 'tablet', service: 'tela', brand: 'iphone', name: 'Troca de Tela - iPad', desc: 'Tela original iPad.', price: 'R$ 499', time: '2h', badge: 'iPad' },
        { device: 'tablet', service: 'bateria', brand: 'iphone', name: 'Bateria - iPad', desc: 'Bateria original Apple.', price: 'R$ 349', time: '1.5h', badge: 'iPad' },
        { device: 'tablet', service: 'pelicula', brand: 'iphone', name: 'Película para iPad', desc: 'Película de vidro.', price: 'R$ 89', time: '20min', badge: 'iPad' }
    ];

    // ============================================
    // FUNÇÕES DE FILTRO
    // ============================================
    function renderCards(filteredData) {
        const grid = document.getElementById('servicesGrid');
        if (!grid) return;
        
        if (!filteredData || filteredData.length === 0) {
            grid.innerHTML = `<div class="no-results-message"><div class="no-results-icon">🔍</div><h3>Nenhum serviço encontrado</h3><p>Tente remover alguns filtros.</p><button class="clear-filters-btn-small" onclick="clearAllFiltersGlobal()">Limpar todos</button></div>`;
            return;
        }
        
        grid.innerHTML = filteredData.map(service => `
            <div class="card">
                <div class="card-badge">${service.badge}</div>
                <h3>${service.name}</h3>
                <p>${service.desc}</p>
                <div class="card-footer"><span class="price">${service.price}</span><span class="duration">⏱️ ${service.time}</span></div>
            </div>
        `).join('');
    }

    function updateCounters() {
        const counts = { celular:0, tablet:0, computador:0, tela:0, bateria:0, conector:0, software:0, camera:0, pelicula:0, iphone:0, samsung:0, xiaomi:0, motorola:0, dell:0, hp:0 };
        servicesData.forEach(s => { if(counts[s.device]!==undefined) counts[s.device]++; if(counts[s.service]!==undefined) counts[s.service]++; if(counts[s.brand]!==undefined) counts[s.brand]++; });
        Object.keys(counts).forEach(key => { let el = document.getElementById(`count-${key}`); if(el) el.textContent = counts[key]; });
    }

    function getSelectedFilters() {
        return {
            devices: Array.from(document.querySelectorAll('.filter-checkbox[data-type="device"]:checked')).map(cb => cb.value),
            services: Array.from(document.querySelectorAll('.filter-checkbox[data-type="service"]:checked')).map(cb => cb.value),
            brands: Array.from(document.querySelectorAll('.filter-checkbox[data-type="brand"]:checked')).map(cb => cb.value)
        };
    }

    function filterServices() {
        const { devices, services, brands } = getSelectedFilters();
        let filtered = servicesData;
        if(devices.length) filtered = filtered.filter(s => devices.includes(s.device));
        if(services.length) filtered = filtered.filter(s => services.includes(s.service));
        if(brands.length) filtered = filtered.filter(s => brands.includes(s.brand));
        renderCards(filtered);
        updateActiveFilters(devices, services, brands);
        updateFilterBadges(devices.length, services.length, brands.length);
        updateMobileTriggerBadge();
        return filtered;
    }

    function updateActiveFilters(devices, services, brands) {
        const container = document.getElementById('activeFilters');
        if(!container) return;
        const names = { celular:'📱 Celular', tablet:'📟 Tablet', computador:'💻 Computador', tela:'🖥️ Tela', bateria:'🔋 Bateria', conector:'⚡ Conector', software:'💻 Software', camera:'📸 Câmera', pelicula:'🔮 Película', iphone:'🍎 iPhone', samsung:'📱 Samsung', xiaomi:'📲 Xiaomi', motorola:'📱 Motorola', dell:'💻 Dell', hp:'💻 HP' };
        const all = [...devices, ...services, ...brands];
        if(all.length === 0) { container.innerHTML = '<span class="no-active-filters">✨ Nenhum filtro aplicado</span>'; return; }
        container.innerHTML = `<span>Filtros:</span> ${all.map(f => `<span class="active-filter-tag">${names[f]||f}<button onclick="removeFilter('${f}')">✕</button></span>`).join('')}<button class="clear-all-tags" onclick="clearAllFiltersGlobal()">Limpar todos</button>`;
    }

    function updateFilterBadges(d,s,b) {
        document.getElementById('deviceBadge') && (document.getElementById('deviceBadge').textContent = d);
        document.getElementById('serviceBadge') && (document.getElementById('serviceBadge').textContent = s);
        document.getElementById('brandBadge') && (document.getElementById('brandBadge').textContent = b);
    }

    function updateMobileTriggerBadge() {
        const badge = document.getElementById('mobileTriggerBadge');
        if(!badge) return;
        const count = document.querySelectorAll('.filter-checkbox:checked').length;
        if(count > 0) { badge.textContent = count; badge.classList.add('active'); }
        else { badge.classList.remove('active'); }
    }

    window.removeFilter = function(value) {
        let cb = document.querySelector(`.filter-checkbox[value="${value}"]`);
        if(cb) { cb.checked = false; filterServices(); }
    };

    window.clearAllFiltersGlobal = function() {
        document.querySelectorAll('.filter-checkbox:checked').forEach(cb => cb.checked = false);
        filterServices();
    };

    // ============================================
    // TOGGLE FILTROS DESKTOP
    // ============================================
    let filtersCollapsed = false;
    const filtersWrapper = document.getElementById('filtersWrapper');
    const toggleBtn = document.getElementById('toggleFiltersBtn');
    if(toggleBtn && filtersWrapper) {
        toggleBtn.addEventListener('click', function() {
            filtersCollapsed = !filtersCollapsed;
            if(filtersCollapsed) {
                filtersWrapper.classList.add('collapsed');
                toggleBtn.innerHTML = '<span>🔍</span><span>Mostrar Filtros</span><span>▼</span>';
            } else {
                filtersWrapper.classList.remove('collapsed');
                toggleBtn.innerHTML = '<span>🔍</span><span>Ocultar Filtros</span><span>▲</span>';
            }
        });
    }

    // ============================================
    // FILTROS MOBILE
    // ============================================
    const mobileTrigger = document.getElementById('mobileFilterTrigger');
    const mobileModal = document.getElementById('mobileFiltersModal');
    const closeMobile = document.getElementById('closeMobileFiltersBtn');
    const mobileOverlay = document.getElementById('mobileFiltersOverlay');
    const applyBtn = document.getElementById('mobileApplyFiltersBtn');
    const mobileClearBtn = document.getElementById('mobileClearFiltersBtn');

    function syncMobileToDesktop() {
        document.querySelectorAll('.mobile-filter-checkbox').forEach(mob => {
            let desktop = document.querySelector(`.filter-checkbox[value="${mob.value}"]`);
            if(desktop) desktop.checked = mob.checked;
        });
    }

    function syncDesktopToMobile() {
        document.querySelectorAll('.filter-checkbox').forEach(desk => {
            let mobile = document.querySelector(`.mobile-filter-checkbox[value="${desk.value}"]`);
            if(mobile) mobile.checked = desk.checked;
        });
        updateMobileBadges();
    }

    function updateMobileBadges() {
        let d = document.querySelectorAll('.mobile-filter-checkbox[data-type="device"]:checked').length;
        let s = document.querySelectorAll('.mobile-filter-checkbox[data-type="service"]:checked').length;
        let b = document.querySelectorAll('.mobile-filter-checkbox[data-type="brand"]:checked').length;
        document.getElementById('mobileDeviceBadge') && (document.getElementById('mobileDeviceBadge').textContent = d);
        document.getElementById('mobileServiceBadge') && (document.getElementById('mobileServiceBadge').textContent = s);
        document.getElementById('mobileBrandBadge') && (document.getElementById('mobileBrandBadge').textContent = b);
    }

    function updateMobileCounts() {
        const counts = { celular:0, tablet:0, computador:0, tela:0, bateria:0, conector:0, software:0, camera:0, pelicula:0, iphone:0, samsung:0, xiaomi:0, motorola:0, dell:0, hp:0 };
        servicesData.forEach(s => { if(counts[s.device]!==undefined) counts[s.device]++; if(counts[s.service]!==undefined) counts[s.service]++; if(counts[s.brand]!==undefined) counts[s.brand]++; });
        Object.keys(counts).forEach(key => { let el = document.getElementById(`mobile-count-${key}`); if(el) el.textContent = counts[key]; });
    }

    if(mobileTrigger && mobileModal) {
        mobileTrigger.addEventListener('click', () => {
            syncDesktopToMobile();
            mobileModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    if(closeMobile) closeMobile.addEventListener('click', () => { mobileModal.classList.remove('active'); document.body.style.overflow = ''; });
    if(mobileOverlay) mobileOverlay.addEventListener('click', () => { mobileModal.classList.remove('active'); document.body.style.overflow = ''; });
    if(applyBtn) applyBtn.addEventListener('click', () => { syncMobileToDesktop(); filterServices(); mobileModal.classList.remove('active'); document.body.style.overflow = ''; });
    if(mobileClearBtn) mobileClearBtn.addEventListener('click', () => { document.querySelectorAll('.mobile-filter-checkbox:checked').forEach(cb => cb.checked = false); syncMobileToDesktop(); filterServices(); updateMobileBadges(); });
    
    document.querySelectorAll('.mobile-filter-checkbox').forEach(cb => { cb.addEventListener('change', updateMobileBadges); });

    // ============================================
    // EVENTOS E INICIALIZAÇÃO
    // ============================================
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.addEventListener('change', filterServices));
    document.getElementById('clearFiltersBtn')?.addEventListener('click', clearAllFiltersGlobal);
    
    updateCounters();
    updateMobileCounts();
    renderCards(servicesData);
    
    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            let href = this.getAttribute('href');
            if(href === '#') return;
            let target = document.querySelector(href);
            if(target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
    
    // Partículas
    const canvas = document.getElementById('particles');
    if(canvas) {
        let ctx = canvas.getContext('2d');
        let particles = [];
        function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        function createParticles() {
            let count = window.innerWidth < 768 ? 40 : 80;
            particles = [];
            for(let i=0;i<count;i++) particles.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*3+1, vx:(Math.random()-0.5)*0.5, vy:(Math.random()-0.5)*0.3, op:Math.random()*0.4+0.1 });
        }
        function draw() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            particles.forEach(p => { ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle = `rgba(79,163,255,${p.op})`; ctx.fill(); p.x+=p.vx; p.y+=p.vy; if(p.x<0) p.x=canvas.width; if(p.x>canvas.width) p.x=0; if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0; });
            requestAnimationFrame(draw);
        }
        resize(); createParticles(); draw();
        window.addEventListener('resize', () => { resize(); createParticles(); });
    }
    
    // Slider
    let slides = document.querySelectorAll('.slide');
    if(slides.length) { let current = 0; setInterval(() => { slides[current].classList.remove('active'); current = (current+1)%slides.length; slides[current].classList.add('active'); }, 5000); }
    
    console.log('✅ Site inicializado com sucesso!');
})();

const API_URL = 'http://localhost:3000/api';

// Verificar se usuário está logado
function isAuthenticated() {
  const token = localStorage.getItem('protech_token');
  return !!token;
}

// Obter dados do usuário logado
async function getCurrentUser() {
  const token = localStorage.getItem('protech_token');
  if (!token) return null;
  
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
}

// Atualizar menu do usuário no header
function updateUserMenu() {
  const user = JSON.parse(localStorage.getItem('protech_user'));
  const userMenu = document.getElementById('userMenuContainer');
  const authButtons = document.getElementById('authButtons');
  const avatarName = document.getElementById('avatarName');

  if (user && userMenu) {
    userMenu.style.display = 'block';
    if (authButtons) authButtons.style.display = 'none';
    if (avatarName) avatarName.textContent = user.name.split(' ')[0];
  } else if (userMenu) {
    userMenu.style.display = 'none';
    if (authButtons) authButtons.style.display = 'flex';
  }
}

// Logout
function logoutUser() {
  localStorage.removeItem('protech_token');
  localStorage.removeItem('protech_user');
  window.location.href = 'index.html';
}

// Inicializar menu do usuário
document.addEventListener('DOMContentLoaded', () => {
  updateUserMenu();
  
  // Dropdown do usuário
  const userAvatar = document.getElementById('userAvatar');
  const userMenuContainer = document.getElementById('userMenuContainer');
  
  if (userAvatar && userMenuContainer) {
    userAvatar.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenuContainer.classList.toggle('active');
    });
    
    document.addEventListener('click', () => {
      userMenuContainer.classList.remove('active');
    });
  }
  
  // Botão de logout
  const logoutBtn = document.getElementById('dropdownLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutUser);
  }
});

// Função para contratar um serviço (quando clicar no botão "Contratar")
async function contratarServico(servicoId, nome, preco, dispositivo) {
  const token = localStorage.getItem('protech_token');
  
  if (!token) {
    window.location.href = 'login.html';
    return false;
  }
  
  try {
    const response = await fetch(`${API_URL}/users/manutencoes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ servicoId, nome, preco, dispositivo })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Erro ao contratar serviço:', error);
    return false;
  }
}