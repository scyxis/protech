/* ============================================ */
// PRO TECH - JAVASCRIPT COMPLETO CORRIGIDO
// Com filtros funcionando, toggle e limpar filtros
/* ============================================ */

(function() {
    'use strict';

    // ============================================
    // BASE DE DADOS COMPLETA
    // ============================================
    const servicesData = [
        // iPhone - Tela
        { device: 'celular', service: 'tela', brand: 'iphone', name: 'Troca de Tela - iPhone 11', desc: 'Tela LCD original com garantia de 6 meses.', price: 'R$ 299', time: '2h', badge: 'iPhone' },
        { device: 'celular', service: 'tela', brand: 'iphone', name: 'Troca de Tela - iPhone 12', desc: 'Tela Super Retina XDR original.', price: 'R$ 399', time: '2h', badge: 'iPhone' },
        { device: 'celular', service: 'tela', brand: 'iphone', name: 'Troca de Tela - iPhone 13', desc: 'Tela OLED de alta qualidade.', price: 'R$ 449', time: '2h', badge: 'iPhone' },
        { device: 'celular', service: 'tela', brand: 'iphone', name: 'Troca de Tela - iPhone 14', desc: 'Tela original Apple.', price: 'R$ 499', time: '2h', badge: 'iPhone' },
        
        // iPhone - Bateria
        { device: 'celular', service: 'bateria', brand: 'iphone', name: 'Bateria - iPhone 11', desc: 'Bateria original Apple com 1 ano de garantia.', price: 'R$ 199', time: '1h', badge: 'iPhone' },
        { device: 'celular', service: 'bateria', brand: 'iphone', name: 'Bateria - iPhone 12', desc: 'Bateria de alta capacidade.', price: 'R$ 229', time: '1h', badge: 'iPhone' },
        { device: 'celular', service: 'bateria', brand: 'iphone', name: 'Bateria - iPhone 13', desc: 'Bateria original Apple.', price: 'R$ 249', time: '1h', badge: 'iPhone' },
        
        // iPhone - Película
        { device: 'celular', service: 'pelicula', brand: 'iphone', name: 'Película de Vidro - iPhone 11', desc: 'Vidro temperado 9H, proteção contra impactos.', price: 'R$ 49', time: '15min', badge: 'iPhone' },
        { device: 'celular', service: 'pelicula', brand: 'iphone', name: 'Película de Vidro - iPhone 12', desc: 'Película com proteção de bordas.', price: 'R$ 59', time: '15min', badge: 'iPhone' },
        { device: 'celular', service: 'pelicula', brand: 'iphone', name: 'Película de Vidro - iPhone 13/14', desc: 'Película premium anti-impressão.', price: 'R$ 69', time: '15min', badge: 'iPhone' },
        
        // Samsung - Tela
        { device: 'celular', service: 'tela', brand: 'samsung', name: 'Troca de Tela - Samsung Galaxy S21', desc: 'Tela Dynamic AMOLED original.', price: 'R$ 349', time: '2h', badge: 'Samsung' },
        { device: 'celular', service: 'tela', brand: 'samsung', name: 'Troca de Tela - Samsung Galaxy S22', desc: 'Tela Super AMOLED com garantia.', price: 'R$ 399', time: '2h', badge: 'Samsung' },
        { device: 'celular', service: 'tela', brand: 'samsung', name: 'Troca de Tela - Samsung Galaxy A系列', desc: 'Tela LCD de alta qualidade.', price: 'R$ 249', time: '2h', badge: 'Samsung' },
        
        // Samsung - Bateria
        { device: 'celular', service: 'bateria', brand: 'samsung', name: 'Bateria - Samsung Galaxy S21', desc: 'Bateria original Samsung.', price: 'R$ 179', time: '1h', badge: 'Samsung' },
        { device: 'celular', service: 'bateria', brand: 'samsung', name: 'Bateria - Samsung Galaxy A系列', desc: 'Bateria de alta capacidade.', price: 'R$ 149', time: '1h', badge: 'Samsung' },
        
        // Samsung - Película
        { device: 'celular', service: 'pelicula', brand: 'samsung', name: 'Película de Vidro - Samsung S系列', desc: 'Película com proteção de bordas curvas.', price: 'R$ 59', time: '15min', badge: 'Samsung' },
        { device: 'celular', service: 'pelicula', brand: 'samsung', name: 'Película de Hidrogel - Samsung', desc: 'Auto regeneração, proteção total.', price: 'R$ 79', time: '20min', badge: 'Samsung' },
        
        // Xiaomi - Tela e Bateria
        { device: 'celular', service: 'tela', brand: 'xiaomi', name: 'Troca de Tela - Xiaomi Redmi Note', desc: 'Tela LCD original.', price: 'R$ 239', time: '2h', badge: 'Xiaomi' },
        { device: 'celular', service: 'bateria', brand: 'xiaomi', name: 'Bateria - Xiaomi Redmi', desc: 'Bateria de alta capacidade.', price: 'R$ 149', time: '1h', badge: 'Xiaomi' },
        { device: 'celular', service: 'pelicula', brand: 'xiaomi', name: 'Película de Vidro - Xiaomi', desc: 'Proteção completa para tela.', price: 'R$ 45', time: '15min', badge: 'Xiaomi' },
        
        // Motorola
        { device: 'celular', service: 'tela', brand: 'motorola', name: 'Troca de Tela - Motorola Moto G', desc: 'Tela LCD original.', price: 'R$ 219', time: '2h', badge: 'Motorola' },
        { device: 'celular', service: 'bateria', brand: 'motorola', name: 'Bateria - Motorola Moto G', desc: 'Bateria original.', price: 'R$ 139', time: '1h', badge: 'Motorola' },
        { device: 'celular', service: 'pelicula', brand: 'motorola', name: 'Película - Motorola', desc: 'Película de vidro temperado.', price: 'R$ 45', time: '15min', badge: 'Motorola' },
        
        // Dell - Notebooks
        { device: 'computador', service: 'software', brand: 'dell', name: 'Formatação - Dell Inspiron', desc: 'Formatação completa com instalação de drivers.', price: 'R$ 149', time: '3h', badge: 'Dell' },
        { device: 'computador', service: 'bateria', brand: 'dell', name: 'Bateria - Dell Inspiron', desc: 'Bateria original Dell.', price: 'R$ 349', time: '1h', badge: 'Dell' },
        { device: 'computador', service: 'tela', brand: 'dell', name: 'Troca de Tela - Dell Notebook', desc: 'Tela LCD/LED original.', price: 'R$ 399', time: '2h', badge: 'Dell' },
        
        // HP
        { device: 'computador', service: 'software', brand: 'hp', name: 'Formatação - HP Pavilion', desc: 'Formatação e otimização.', price: 'R$ 159', time: '3h', badge: 'HP' },
        { device: 'computador', service: 'bateria', brand: 'hp', name: 'Bateria - HP', desc: 'Bateria original HP.', price: 'R$ 329', time: '1h', badge: 'HP' },
        
        // Tablets
        { device: 'tablet', service: 'tela', brand: 'samsung', name: 'Troca de Tela - Samsung Tab', desc: 'Tela para Galaxy Tab A e S.', price: 'R$ 399', time: '2h', badge: 'Samsung Tablet' },
        { device: 'tablet', service: 'tela', brand: 'iphone', name: 'Troca de Tela - iPad', desc: 'Tela original para iPad.', price: 'R$ 499', time: '2h', badge: 'iPad' },
        { device: 'tablet', service: 'bateria', brand: 'iphone', name: 'Bateria - iPad', desc: 'Bateria original Apple.', price: 'R$ 349', time: '1.5h', badge: 'iPad' },
        { device: 'tablet', service: 'pelicula', brand: 'iphone', name: 'Película para iPad', desc: 'Película de vidro para iPad.', price: 'R$ 89', time: '20min', badge: 'iPad' }
    ];

    // ============================================
    // FUNÇÕES PRINCIPAIS
    // ============================================
    
    let filtersToggleInstance = null;

    function renderCards(filteredData) {
        const grid = document.getElementById('servicesGrid');
        if (!grid) return;
        
        if (!filteredData || filteredData.length === 0) {
            grid.innerHTML = `
                <div class="no-results-message">
                    <div class="no-results-icon">🔍</div>
                    <h3>Nenhum serviço encontrado</h3>
                    <p>Tente remover alguns filtros para ver mais resultados.</p>
                    <button class="clear-filters-btn-small" onclick="window.clearAllFilters()">Limpar todos os filtros</button>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = filteredData.map(service => `
            <div class="card" data-device="${service.device}" data-service="${service.service}" data-brand="${service.brand}">
                <div class="card-badge">${service.badge}</div>
                <h3>${service.name}</h3>
                <p>${service.desc}</p>
                <div class="card-footer">
                    <span class="price">${service.price}</span>
                    <span class="duration">⏱️ ${service.time}</span>
                </div>
            </div>
        `).join('');
    }

    function updateCounters() {
        const counts = {
            celular: 0, tablet: 0, computador: 0,
            tela: 0, bateria: 0, conector: 0, software: 0, camera: 0, pelicula: 0,
            iphone: 0, samsung: 0, xiaomi: 0, motorola: 0, dell: 0, hp: 0
        };
        
        servicesData.forEach(service => {
            if (counts[service.device] !== undefined) counts[service.device]++;
            if (counts[service.service] !== undefined) counts[service.service]++;
            if (counts[service.brand] !== undefined) counts[service.brand]++;
        });
        
        Object.keys(counts).forEach(key => {
            const el = document.getElementById(`count-${key}`);
            if (el) el.textContent = counts[key];
        });
    }

    function getSelectedFilters() {
        const devices = Array.from(document.querySelectorAll('.filter-checkbox[data-type="device"]:checked')).map(cb => cb.value);
        const services = Array.from(document.querySelectorAll('.filter-checkbox[data-type="service"]:checked')).map(cb => cb.value);
        const brands = Array.from(document.querySelectorAll('.filter-checkbox[data-type="brand"]:checked')).map(cb => cb.value);
        return { devices, services, brands };
    }

    function filterServices() {
        const { devices, services, brands } = getSelectedFilters();
        
        let filtered = servicesData;
        
        if (devices.length > 0) {
            filtered = filtered.filter(service => devices.includes(service.device));
        }
        if (services.length > 0) {
            filtered = filtered.filter(service => services.includes(service.service));
        }
        if (brands.length > 0) {
            filtered = filtered.filter(service => brands.includes(service.brand));
        }
        
        renderCards(filtered);
        updateActiveFilters(devices, services, brands);
        updateFilterBadges(devices.length, services.length, brands.length);
        updateFloatingFilterCount();
        
        return filtered;
    }

    function updateActiveFilters(devices, services, brands) {
        const container = document.getElementById('activeFilters');
        if (!container) return;
        
        const filterNames = {
            celular: '📱 Celular', tablet: '📟 Tablet', computador: '💻 Computador',
            tela: '🖥️ Troca de Tela', bateria: '🔋 Bateria', conector: '⚡ Conector', 
            software: '💻 Software', camera: '📸 Câmera', pelicula: '🔮 Película',
            iphone: '🍎 iPhone', samsung: '📱 Samsung', xiaomi: '📲 Xiaomi', 
            motorola: '📱 Motorola', dell: '💻 Dell', hp: '💻 HP'
        };
        
        const allFilters = [...devices, ...services, ...brands];
        
        if (allFilters.length === 0) {
            container.innerHTML = '<span class="no-active-filters">✨ Nenhum filtro aplicado - Mostrando todos os serviços</span>';
            return;
        }
        
        container.innerHTML = `
            <span class="active-filters-label">Filtros aplicados:</span>
            ${allFilters.map(filter => `
                <span class="active-filter-tag" data-filter="${filter}">
                    ${filterNames[filter] || filter}
                    <button class="remove-filter" data-filter="${filter}">✕</button>
                </span>
            `).join('')}
            <button class="clear-all-tags" id="clearAllTagsBtn">Limpar todos</button>
        `;
        
        document.querySelectorAll('.remove-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterValue = btn.dataset.filter;
                const checkbox = document.querySelector(`.filter-checkbox[value="${filterValue}"]`);
                if (checkbox) {
                    checkbox.checked = false;
                    filterServices();
                }
            });
        });
        
        const clearAllTags = document.getElementById('clearAllTagsBtn');
        if (clearAllTags) {
            clearAllTags.addEventListener('click', clearAllFilters);
        }
    }

    function updateFilterBadges(deviceCount, serviceCount, brandCount) {
        const deviceBadge = document.getElementById('deviceBadge');
        const serviceBadge = document.getElementById('serviceBadge');
        const brandBadge = document.getElementById('brandBadge');
        
        if (deviceBadge) deviceBadge.textContent = deviceCount;
        if (serviceBadge) serviceBadge.textContent = serviceCount;
        if (brandBadge) brandBadge.textContent = brandCount;
    }

    function updateFloatingFilterCount() {
        const floatingBtn = document.getElementById('floatingFiltersBtn');
        const countBadge = document.getElementById('floatingFilterCount');
        
        if (!floatingBtn || !countBadge) return;
        
        const selectedFilters = document.querySelectorAll('.filter-checkbox:checked').length;
        
        if (selectedFilters > 0) {
            countBadge.textContent = selectedFilters;
            countBadge.style.display = 'inline-block';
        } else {
            countBadge.style.display = 'none';
        }
    }

    function clearAllFilters() {
        document.querySelectorAll('.filter-checkbox:checked').forEach(cb => {
            cb.checked = false;
        });
        filterServices();
    }

    // ============================================
    // TOGGLE DOS FILTROS
    // ============================================
    
    class FiltersToggle {
        constructor() {
            this.filtersWrapper = document.getElementById('filtersWrapper');
            this.toggleBtn = document.getElementById('toggleFiltersBtn');
            this.floatingBtn = document.getElementById('floatingFiltersBtn');
            this.closeMobileBtn = document.getElementById('closeFiltersMobile');
            this.isCollapsed = false;
            
            this.init();
        }
        
        init() {
            if (this.toggleBtn) {
                this.toggleBtn.addEventListener('click', () => this.toggleFilters());
            }
            
            if (this.floatingBtn) {
                this.floatingBtn.addEventListener('click', () => this.openMobileFilters());
            }
            
            if (this.closeMobileBtn) {
                this.closeMobileBtn.addEventListener('click', () => this.closeMobileFilters());
            }
            
            if (this.filtersWrapper) {
                this.filtersWrapper.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768 && e.target === this.filtersWrapper) {
                        this.closeMobileFilters();
                    }
                });
            }
        }
        
        toggleFilters() {
            this.isCollapsed = !this.isCollapsed;
            
            if (this.filtersWrapper) {
                if (this.isCollapsed) {
                    this.filtersWrapper.classList.add('collapsed');
                    if (this.toggleBtn) {
                        this.toggleBtn.classList.add('collapsed');
                        const textSpan = this.toggleBtn.querySelector('.btn-text');
                        const arrowSpan = this.toggleBtn.querySelector('.btn-arrow');
                        if (textSpan) textSpan.textContent = 'Mostrar Filtros';
                        if (arrowSpan) arrowSpan.textContent = '▼';
                    }
                } else {
                    this.filtersWrapper.classList.remove('collapsed');
                    if (this.toggleBtn) {
                        this.toggleBtn.classList.remove('collapsed');
                        const textSpan = this.toggleBtn.querySelector('.btn-text');
                        const arrowSpan = this.toggleBtn.querySelector('.btn-arrow');
                        if (textSpan) textSpan.textContent = 'Ocultar Filtros';
                        if (arrowSpan) arrowSpan.textContent = '▲';
                    }
                }
            }
        }
        
        openMobileFilters() {
            if (this.filtersWrapper) {
                this.filtersWrapper.classList.add('open-mobile');
                document.body.style.overflow = 'hidden';
            }
        }
        
        closeMobileFilters() {
            if (this.filtersWrapper) {
                this.filtersWrapper.classList.remove('open-mobile');
                document.body.style.overflow = '';
            }
        }
    }

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    
    function init() {
        console.log('🚀 ProTech - Inicializando...');
        
        updateCounters();
        renderCards(servicesData);
        
        document.querySelectorAll('.filter-checkbox').forEach(cb => {
            cb.addEventListener('change', filterServices);
        });
        
        const clearBtn = document.getElementById('clearFiltersBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', clearAllFilters);
        }
        
        filtersToggleInstance = new FiltersToggle();
        
        // Scroll suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        // Formulários
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const button = form.querySelector('button');
                const originalText = button.textContent;
                button.disabled = true;
                button.textContent = 'Processando...';
                
                setTimeout(() => {
                    button.textContent = '✓ Enviado!';
                    button.style.background = '#2ecc71';
                    form.reset();
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = '';
                        button.disabled = false;
                    }, 2000);
                }, 1000);
            });
        });
        
        console.log('✅ Sistema inicializado com sucesso!');
    }
    
    window.clearAllFilters = clearAllFilters;
    window.filterServices = filterServices;
    
    init();
    
})();
// ============================================
// SISTEMA DE FILTROS MOBILE
// ============================================

class MobileFilters {
    constructor() {
        this.modal = document.getElementById('mobileFiltersModal');
        this.openBtn = document.getElementById('floatingFiltersBtn');
        this.closeBtn = document.getElementById('closeMobileFiltersBtn');
        this.overlay = document.getElementById('mobileFiltersOverlay');
        this.applyBtn = document.getElementById('mobileApplyFiltersBtn');
        this.clearBtn = document.getElementById('mobileClearFiltersBtn');
        
        this.desktopCheckboxes = document.querySelectorAll('.filter-checkbox');
        this.mobileCheckboxes = document.querySelectorAll('.mobile-filter-checkbox');
        
        this.init();
    }
    
    init() {
        // Abrir modal
        if (this.openBtn) {
            this.openBtn.addEventListener('click', () => this.open());
        }
        
        // Fechar modal
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }
        
        // Aplicar filtros
        if (this.applyBtn) {
            this.applyBtn.addEventListener('click', () => this.applyFilters());
        }
        
        // Limpar filtros
        if (this.clearBtn) {
            this.clearBtn.addEventListener('click', () => this.clearFilters());
        }
        
        // Sincronizar checkboxes mobile com desktop
        this.syncCheckboxes();
        
        // Atualizar contadores mobile
        this.updateMobileCounters();
    }
    
    open() {
        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.syncFromDesktop();
        }
    }
    
    close() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    syncCheckboxes() {
        // Quando marcar/desmarcar no mobile, sincroniza com desktop
        this.mobileCheckboxes.forEach(mobileCb => {
            mobileCb.addEventListener('change', () => {
                const value = mobileCb.value;
                const desktopCb = document.querySelector(`.filter-checkbox[value="${value}"]`);
                if (desktopCb) {
                    desktopCb.checked = mobileCb.checked;
                }
                this.updateMobileCounters();
            });
        });
    }
    
    syncFromDesktop() {
        // Sincroniza do desktop para mobile ao abrir o modal
        this.desktopCheckboxes.forEach(desktopCb => {
            const value = desktopCb.value;
            const mobileCb = document.querySelector(`.mobile-filter-checkbox[value="${value}"]`);
            if (mobileCb) {
                mobileCb.checked = desktopCb.checked;
            }
        });
        this.updateMobileCounters();
    }
    
    applyFilters() {
        // Aplica os filtros selecionados no mobile
        this.desktopCheckboxes.forEach(desktopCb => {
            const value = desktopCb.value;
            const mobileCb = document.querySelector(`.mobile-filter-checkbox[value="${value}"]`);
            if (mobileCb) {
                desktopCb.checked = mobileCb.checked;
            }
        });
        
        // Dispara o filtro
        if (typeof window.filterServices === 'function') {
            window.filterServices();
        }
        
        this.updateMobileCounters();
        this.close();
    }
    
    clearFilters() {
        // Limpa todos os filtros no mobile
        this.mobileCheckboxes.forEach(cb => {
            cb.checked = false;
        });
        
        this.desktopCheckboxes.forEach(cb => {
            cb.checked = false;
        });
        
        if (typeof window.filterServices === 'function') {
            window.filterServices();
        }
        
        this.updateMobileCounters();
    }
    
    updateMobileCounters() {
        // Conta quantos filtros estão ativos
        const selectedCount = Array.from(this.mobileCheckboxes).filter(cb => cb.checked).length;
        
        // Atualiza badges dos grupos
        const devicesSelected = Array.from(document.querySelectorAll('.mobile-filter-checkbox[data-type="device"]:checked')).length;
        const servicesSelected = Array.from(document.querySelectorAll('.mobile-filter-checkbox[data-type="service"]:checked')).length;
        const brandsSelected = Array.from(document.querySelectorAll('.mobile-filter-checkbox[data-type="brand"]:checked')).length;
        
        const deviceBadge = document.getElementById('mobileDeviceBadge');
        const serviceBadge = document.getElementById('mobileServiceBadge');
        const brandBadge = document.getElementById('mobileBrandBadge');
        
        if (deviceBadge) deviceBadge.textContent = devicesSelected;
        if (serviceBadge) serviceBadge.textContent = servicesSelected;
        if (brandBadge) brandBadge.textContent = brandsSelected;
        
        // Atualiza contador do botão flutuante
        const floatingCount = document.getElementById('floatingFilterCount');
        if (floatingCount) {
            if (selectedCount > 0) {
                floatingCount.textContent = selectedCount;
                floatingCount.style.display = 'inline-block';
            } else {
                floatingCount.style.display = 'none';
            }
        }
    }
}

// ============================================
// ATUALIZA CONTADORES MOBILE
// ============================================

function updateMobileItemCounts() {
    const counts = {
        celular: 0, tablet: 0, computador: 0,
        tela: 0, bateria: 0, conector: 0, software: 0, camera: 0, pelicula: 0,
        iphone: 0, samsung: 0, xiaomi: 0, motorola: 0, dell: 0, hp: 0
    };
    
    if (typeof servicesData !== 'undefined') {
        servicesData.forEach(service => {
            if (counts[service.device] !== undefined) counts[service.device]++;
            if (counts[service.service] !== undefined) counts[service.service]++;
            if (counts[service.brand] !== undefined) counts[service.brand]++;
        });
    }
    
    Object.keys(counts).forEach(key => {
        const mobileEl = document.getElementById(`mobile-count-${key}`);
        if (mobileEl) mobileEl.textContent = counts[key];
    });
}

// ============================================
// INICIALIZAÇÃO DO MOBILE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa filtros mobile
    const mobileFilters = new MobileFilters();
    
    // Atualiza contadores mobile
    updateMobileItemCounts();
    
    // Expõe globalmente
    window.mobileFilters = mobileFilters;
    
    console.log('?? Sistema de filtros mobile inicializado');
});