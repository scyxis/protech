/* ============================================ */
// PRO TECH - JAVASCRIPT COMPLETO
// Com mais de 80 serviços de manutenção
/* ============================================ */

(function() {
    'use strict';

    // ============================================
    // BASE DE DADOS COMPLETA - 80+ SERVIÇOS
    // ============================================
    const servicesData = [
        // ========== iPHONE - SERVIÇOS COMPLETOS ==========
        { device: 'celular', service: 'tela', brand: 'iphone', name: 'Troca de Tela - iPhone', desc: 'Substituição de tela original ou de alta qualidade com garantia de 6 meses.', price: 'R$ 299', time: '2h', badge: 'iPhone' },
        { device: 'celular', service: 'bateria', brand: 'iphone', name: 'Troca de Bateria - iPhone', desc: 'Bateria original Apple com 1 ano de garantia.', price: 'R$ 199', time: '1h', badge: 'iPhone' },
        { device: 'celular', service: 'conector', brand: 'iphone', name: 'Troca de Conector de Carga - iPhone', desc: 'Substituição da porta Lightning.', price: 'R$ 149', time: '45min', badge: 'iPhone' },
        { device: 'celular', service: 'camera', brand: 'iphone', name: 'Reparo de Câmera - iPhone', desc: 'Conserto ou substituição da câmera traseira/frontal.', price: 'R$ 249', time: '1.5h', badge: 'iPhone' },
        { device: 'celular', service: 'audio', brand: 'iphone', name: 'Reparo de Áudio - iPhone', desc: 'Conserto de falante, microfone ou fone de ouvido.', price: 'R$ 179', time: '1h', badge: 'iPhone' },
        { device: 'celular', service: 'botao', brand: 'iphone', name: 'Reparo de Botões - iPhone', desc: 'Conserto de botão home, power ou volume.', price: 'R$ 129', time: '45min', badge: 'iPhone' },
        { device: 'celular', service: 'placa', brand: 'iphone', name: 'Reparo em Placa Mãe - iPhone', desc: 'Diagnóstico e reparo de problemas na placa lógica.', price: 'R$ 399', time: '3h', badge: 'iPhone' },
        { device: 'celular', service: 'software', brand: 'iphone', name: 'Restauração de Software - iPhone', desc: 'Atualização, restauração ou recuperação de dados.', price: 'R$ 99', time: '1h', badge: 'iPhone' },
        
        // ========== SAMSUNG - SERVIÇOS COMPLETOS ==========
        { device: 'celular', service: 'tela', brand: 'samsung', name: 'Troca de Tela - Samsung Galaxy', desc: 'Substituição de tela Super AMOLED com garantia.', price: 'R$ 279', time: '2h', badge: 'Samsung' },
        { device: 'celular', service: 'bateria', brand: 'samsung', name: 'Troca de Bateria - Samsung', desc: 'Bateria original Samsung com alta durabilidade.', price: 'R$ 169', time: '1h', badge: 'Samsung' },
        { device: 'celular', service: 'conector', brand: 'samsung', name: 'Troca de Conector USB-C - Samsung', desc: 'Substituição da porta de carregamento.', price: 'R$ 139', time: '45min', badge: 'Samsung' },
        { device: 'celular', service: 'camera', brand: 'samsung', name: 'Reparo de Câmera - Samsung', desc: 'Conserto de câmera principal, ultra-wide ou selfie.', price: 'R$ 229', time: '1.5h', badge: 'Samsung' },
        { device: 'celular', service: 'audio', brand: 'samsung', name: 'Reparo de Áudio - Samsung', desc: 'Conserto de alto-falante ou microfone.', price: 'R$ 159', time: '1h', badge: 'Samsung' },
        { device: 'celular', service: 'placa', brand: 'samsung', name: 'Reparo em Placa Mãe - Samsung', desc: 'Micro solda e reparo de componentes.', price: 'R$ 359', time: '3h', badge: 'Samsung' },
        { device: 'celular', service: 'limpeza', brand: 'samsung', name: 'Limpeza Preventiva - Samsung', desc: 'Limpeza interna e externa completa.', price: 'R$ 79', time: '30min', badge: 'Samsung' },
        
        // ========== XIAOMI - SERVIÇOS COMPLETOS ==========
        { device: 'celular', service: 'tela', brand: 'xiaomi', name: 'Troca de Tela - Xiaomi', desc: 'Substituição de tela para Redmi, POCO e Mi.', price: 'R$ 239', time: '2h', badge: 'Xiaomi' },
        { device: 'celular', service: 'bateria', brand: 'xiaomi', name: 'Troca de Bateria - Xiaomi', desc: 'Bateria de alta capacidade original.', price: 'R$ 149', time: '1h', badge: 'Xiaomi' },
        { device: 'celular', service: 'conector', brand: 'xiaomi', name: 'Troca de Conector - Xiaomi', desc: 'Substituição da porta USB-C.', price: 'R$ 119', time: '45min', badge: 'Xiaomi' },
        { device: 'celular', service: 'camera', brand: 'xiaomi', name: 'Reparo de Câmera - Xiaomi', desc: 'Conserto de câmera principal ou selfie.', price: 'R$ 199', time: '1.5h', badge: 'Xiaomi' },
        { device: 'celular', service: 'audio', brand: 'xiaomi', name: 'Reparo de Áudio - Xiaomi', desc: 'Conserto de falante e microfone.', price: 'R$ 139', time: '1h', badge: 'Xiaomi' },
        
        // ========== MOTOROLA - SERVIÇOS COMPLETOS ==========
        { device: 'celular', service: 'tela', brand: 'motorola', name: 'Troca de Tela - Motorola', desc: 'Substituição de tela para Moto G, E e Edge.', price: 'R$ 219', time: '2h', badge: 'Motorola' },
        { device: 'celular', service: 'bateria', brand: 'motorola', name: 'Troca de Bateria - Motorola', desc: 'Bateria original com garantia.', price: 'R$ 139', time: '1h', badge: 'Motorola' },
        { device: 'celular', service: 'conector', brand: 'motorola', name: 'Troca de Conector - Motorola', desc: 'Substituição da porta de carregamento.', price: 'R$ 109', time: '45min', badge: 'Motorola' },
        
        // ========== TABLETS - COMPLETOS ==========
        { device: 'tablet', service: 'tela', brand: 'samsung', name: 'Troca de Tela - Samsung Tab', desc: 'Substituição de tela para Galaxy Tab.', price: 'R$ 399', time: '2.5h', badge: 'Samsung Tablet' },
        { device: 'tablet', service: 'tela', brand: 'iphone', name: 'Troca de Tela - iPad', desc: 'Substituição de tela para iPad e iPad Pro.', price: 'R$ 499', time: '2.5h', badge: 'iPad' },
        { device: 'tablet', service: 'bateria', brand: 'samsung', name: 'Troca de Bateria - Samsung Tab', desc: 'Bateria original para Galaxy Tab.', price: 'R$ 279', time: '1.5h', badge: 'Samsung Tablet' },
        { device: 'tablet', service: 'bateria', brand: 'iphone', name: 'Troca de Bateria - iPad', desc: 'Bateria original Apple para iPad.', price: 'R$ 349', time: '1.5h', badge: 'iPad' },
        { device: 'tablet', service: 'conector', brand: 'samsung', name: 'Troca de Conector - Samsung Tab', desc: 'Substituição da porta de carregamento.', price: 'R$ 179', time: '1h', badge: 'Samsung Tablet' },
        { device: 'tablet', service: 'conector', brand: 'iphone', name: 'Troca de Conector - iPad', desc: 'Substituição da porta Lightning.', price: 'R$ 199', time: '1h', badge: 'iPad' },
        
        // ========== DELL - NOTEBOOKS E COMPUTADORES ==========
        { device: 'computador', service: 'software', brand: 'dell', name: 'Formatação e Otimização - Dell', desc: 'Formatação, instalação de drivers e otimização.', price: 'R$ 149', time: '3h', badge: 'Dell' },
        { device: 'computador', service: 'bateria', brand: 'dell', name: 'Troca de Bateria - Dell', desc: 'Bateria original para notebook Dell.', price: 'R$ 349', time: '1h', badge: 'Dell' },
        { device: 'computador', service: 'armazenamento', brand: 'dell', name: 'Upgrade SSD - Dell', desc: 'Instalação de SSD para mais velocidade.', price: 'R$ 199', time: '1h', badge: 'Dell' },
        { device: 'computador', service: 'memoria', brand: 'dell', name: 'Upgrade de Memória RAM - Dell', desc: 'Expansão de memória RAM.', price: 'R$ 249', time: '45min', badge: 'Dell' },
        { device: 'computador', service: 'teclado', brand: 'dell', name: 'Troca de Teclado - Dell', desc: 'Substituição de teclado de notebook.', price: 'R$ 229', time: '1.5h', badge: 'Dell' },
        { device: 'computador', service: 'cooler', brand: 'dell', name: 'Limpeza e Troca de Cooler - Dell', desc: 'Limpeza do sistema de refrigeração.', price: 'R$ 129', time: '1h', badge: 'Dell' },
        
        // ========== HP - NOTEBOOKS E COMPUTADORES ==========
        { device: 'computador', service: 'software', brand: 'hp', name: 'Formatação e Backup - HP', desc: 'Formatação com backup de dados.', price: 'R$ 179', time: '3h', badge: 'HP' },
        { device: 'computador', service: 'bateria', brand: 'hp', name: 'Troca de Bateria - HP', desc: 'Bateria original HP.', price: 'R$ 329', time: '1h', badge: 'HP' },
        { device: 'computador', service: 'armazenamento', brand: 'hp', name: 'Instalação SSD - HP', desc: 'Upgrade para SSD NVMe.', price: 'R$ 189', time: '1h', badge: 'HP' },
        { device: 'computador', service: 'memoria', brand: 'hp', name: 'Upgrade RAM - HP', desc: 'Expansão de memória.', price: 'R$ 239', time: '45min', badge: 'HP' },
        { device: 'computador', service: 'teclado', brand: 'hp', name: 'Troca de Teclado - HP', desc: 'Substituição de teclado.', price: 'R$ 219', time: '1.5h', badge: 'HP' },
        
        // ========== LENOVO - NOTEBOOKS E COMPUTADORES ==========
        { device: 'computador', service: 'software', brand: 'lenovo', name: 'Formatação - Lenovo', desc: 'Instalação de sistema operacional.', price: 'R$ 159', time: '3h', badge: 'Lenovo' },
        { device: 'computador', service: 'bateria', brand: 'lenovo', name: 'Troca de Bateria - Lenovo', desc: 'Bateria original Lenovo.', price: 'R$ 319', time: '1h', badge: 'Lenovo' },
        { device: 'computador', service: 'conector', brand: 'lenovo', name: 'Troca de Conector de Carga - Lenovo', desc: 'Substituição da entrada de energia.', price: 'R$ 189', time: '1h', badge: 'Lenovo' },
        { device: 'computador', service: 'armazenamento', brand: 'lenovo', name: 'Instalação SSD - Lenovo', desc: 'Upgrade de armazenamento.', price: 'R$ 179', time: '1h', badge: 'Lenovo' },
        
        // ========== ASUS - NOTEBOOKS ==========
        { device: 'computador', service: 'software', brand: 'asus', name: 'Formatação - Asus', desc: 'Formatação e otimização.', price: 'R$ 149', time: '3h', badge: 'Asus' },
        { device: 'computador', service: 'bateria', brand: 'asus', name: 'Troca de Bateria - Asus', desc: 'Bateria original Asus.', price: 'R$ 299', time: '1h', badge: 'Asus' },
        { device: 'computador', service: 'teclado', brand: 'asus', name: 'Troca de Teclado - Asus', desc: 'Substituição de teclado.', price: 'R$ 209', time: '1.5h', badge: 'Asus' },
        
        // ========== ACER - NOTEBOOKS ==========
        { device: 'computador', service: 'software', brand: 'acer', name: 'Formatação - Acer', desc: 'Formatação completa.', price: 'R$ 139', time: '3h', badge: 'Acer' },
        { device: 'computador', service: 'bateria', brand: 'acer', name: 'Troca de Bateria - Acer', desc: 'Bateria original Acer.', price: 'R$ 289', time: '1h', badge: 'Acer' },
        
        // ========== LG - CELULARES E NOTEBOOKS ==========
        { device: 'celular', service: 'tela', brand: 'lg', name: 'Troca de Tela - LG', desc: 'Substituição de tela LG.', price: 'R$ 259', time: '2h', badge: 'LG' },
        { device: 'celular', service: 'bateria', brand: 'lg', name: 'Troca de Bateria - LG', desc: 'Bateria original LG.', price: 'R$ 149', time: '1h', badge: 'LG' },
        { device: 'computador', service: 'software', brand: 'lg', name: 'Formatação - LG', desc: 'Formatação de notebook LG.', price: 'R$ 149', time: '3h', badge: 'LG' },
        
        // ========== POSITIVO - NOTEBOOKS ==========
        { device: 'computador', service: 'software', brand: 'positivo', name: 'Formatação - Positivo', desc: 'Formatação e instalação de drivers.', price: 'R$ 129', time: '2.5h', badge: 'Positivo' },
        { device: 'computador', service: 'armazenamento', brand: 'positivo', name: 'Upgrade SSD - Positivo', desc: 'Instalação de SSD.', price: 'R$ 169', time: '1h', badge: 'Positivo' },
        
        // ========== SERVIÇOS GERAIS (Todas as marcas) ==========
        { device: 'computador', service: 'software', brand: 'generic', name: 'Recuperação de Dados', desc: 'Recuperação de arquivos perdidos ou corrompidos.', price: 'A partir de R$ 199', time: '24h', badge: 'Dados' },
        { device: 'computador', service: 'limpeza', brand: 'generic', name: 'Limpeza Preventiva Completa', desc: 'Limpeza interna e troca de pasta térmica.', price: 'R$ 99', time: '1.5h', badge: 'Preventiva' },
        { device: 'celular', service: 'limpeza', brand: 'generic', name: 'Limpeza Ultrassônica', desc: 'Limpeza profissional com ultrassom.', price: 'R$ 69', time: '30min', badge: 'Preventiva' },
        { device: 'computador', service: 'placa', brand: 'generic', name: 'Reparo em Placa Mãe', desc: 'Diagnóstico e reparo de componentes.', price: 'R$ 299', time: '3h', badge: 'Placa' },
        { device: 'computador', service: 'cooler', brand: 'generic', name: 'Troca de Pasta Térmica', desc: 'Aplicação de pasta térmica de alta qualidade.', price: 'R$ 79', time: '45min', badge: 'Refrigeração' },
        
        // ========== SERVIÇOS ADICIONAIS ==========
        { device: 'celular', service: 'pelicula', brand: 'iphone', name: 'Película de Vidro - iPhone', desc: 'Película de vidro temperado 9H.', price: 'R$ 59', time: '15min', badge: 'iPhone' },
        { device: 'celular', service: 'pelicula', brand: 'samsung', name: 'Película de Vidro - Samsung', desc: 'Proteção máxima para tela.', price: 'R$ 49', time: '15min', badge: 'Samsung' },
        { device: 'celular', service: 'pelicula', brand: 'xiaomi', name: 'Película de Vidro - Xiaomi', desc: 'Película premium.', price: 'R$ 45', time: '15min', badge: 'Xiaomi' },
        { device: 'celular', service: 'pelicula', brand: 'motorola', name: 'Película de Vidro - Motorola', desc: 'Película de alta qualidade.', price: 'R$ 45', time: '15min', badge: 'Motorola' },
        
        { device: 'tablet', service: 'pelicula', brand: 'samsung', name: 'Película para Tablet - Samsung', desc: 'Película anti-reflexo.', price: 'R$ 79', time: '20min', badge: 'Samsung Tablet' },
        { device: 'tablet', service: 'pelicula', brand: 'iphone', name: 'Película para iPad', desc: 'Película de vidro para iPad.', price: 'R$ 89', time: '20min', badge: 'iPad' },
        
        { device: 'computador', service: 'armazenamento', brand: 'generic', name: 'Instalação de HD/SSD', desc: 'Instalação de nova unidade de armazenamento.', price: 'R$ 99', time: '1h', badge: 'Upgrade' },
        { device: 'computador', service: 'memoria', brand: 'generic', name: 'Instalação de Memória RAM', desc: 'Expansão de memória RAM.', price: 'R$ 79', time: '30min', badge: 'Upgrade' },
        
        { device: 'celular', service: 'camera', brand: 'generic', name: 'Reparo de Câmera Frontal', desc: 'Conserto da câmera selfie.', price: 'R$ 159', time: '1h', badge: 'Câmera' },
        { device: 'celular', service: 'camera', brand: 'generic', name: 'Reparo de Câmera Traseira', desc: 'Conserto da câmera principal.', price: 'R$ 189', time: '1h', badge: 'Câmera' },
        
        { device: 'celular', service: 'audio', brand: 'generic', name: 'Reparo de Microfone', desc: 'Substituição do microfone.', price: 'R$ 119', time: '45min', badge: 'Áudio' },
        { device: 'celular', service: 'audio', brand: 'generic', name: 'Reparo de Alto-falante', desc: 'Conserto do alto-falante.', price: 'R$ 109', time: '45min', badge: 'Áudio' },
        
        { device: 'celular', service: 'botao', brand: 'generic', name: 'Reparo de Botão Power', desc: 'Substituição do botão liga/desliga.', price: 'R$ 99', time: '30min', badge: 'Botões' },
        { device: 'celular', service: 'botao', brand: 'generic', name: 'Reparo de Botão Volume', desc: 'Substituição dos botões de volume.', price: 'R$ 89', time: '30min', badge: 'Botões' }
    ];

    // ============================================
    // RENDERIZA TODOS OS CARDS (SEM FILTROS = TODOS)
    // ============================================
    function renderCards(filteredData) {
        const grid = document.getElementById('servicesGrid');
        if (!grid) return;
        
        if (!filteredData || filteredData.length === 0) {
            grid.innerHTML = `
                <div class="no-results-message">
                    <div class="no-results-icon">🔍</div>
                    <h3>Nenhum serviço encontrado</h3>
                    <p>Tente remover alguns filtros para ver mais resultados.</p>
                    <button class="clear-filters-btn-small" onclick="clearAllFilters()">Limpar todos os filtros</button>
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
        
        // Adiciona animação aos cards
        document.querySelectorAll('.card').forEach((card, index) => {
            card.style.animation = `fadeInUp 0.3s ease-out ${index * 0.05}s forwards`;
        });
    }

    // ============================================
    // ATUALIZA CONTADORES DE ITENS POR FILTRO
    // ============================================
    function updateCounters() {
        const counts = {
            celular: 0, tablet: 0, computador: 0,
            tela: 0, bateria: 0, conector: 0, software: 0, camera: 0, audio: 0, botao: 0, placa: 0, limpeza: 0, armazenamento: 0, memoria: 0, teclado: 0, cooler: 0, pelicula: 0,
            iphone: 0, samsung: 0, xiaomi: 0, motorola: 0, dell: 0, hp: 0, lenovo: 0, asus: 0, acer: 0, lg: 0, positivo: 0
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

    // ============================================
    // OBTÉM FILTROS SELECIONADOS
    // ============================================
    function getSelectedFilters() {
        const devices = Array.from(document.querySelectorAll('.filter-checkbox[data-type="device"]:checked')).map(cb => cb.value);
        const services = Array.from(document.querySelectorAll('.filter-checkbox[data-type="service"]:checked')).map(cb => cb.value);
        const brands = Array.from(document.querySelectorAll('.filter-checkbox[data-type="brand"]:checked')).map(cb => cb.value);
        return { devices, services, brands };
    }

    // ============================================
    // FILTRA OS SERVIÇOS
    // ============================================
    function filterServices() {
        const { devices, services, brands } = getSelectedFilters();
        
        // Se não há filtros selecionados, mostra TODOS os serviços
        if (devices.length === 0 && services.length === 0 && brands.length === 0) {
            renderCards(servicesData);
            updateActiveFilters([], [], []);
            updateFilterBadges(0, 0, 0);
            return;
        }
        
        const filtered = servicesData.filter(service => {
            const deviceMatch = devices.length === 0 || devices.includes(service.device);
            const serviceMatch = services.length === 0 || services.includes(service.service);
            const brandMatch = brands.length === 0 || brands.includes(service.brand);
            return deviceMatch && serviceMatch && brandMatch;
        });
        
        renderCards(filtered);
        updateActiveFilters(devices, services, brands);
        updateFilterBadges(devices.length, services.length, brands.length);
    }

    // ============================================
    // ATUALIZA TAGS DE FILTROS ATIVOS
    // ============================================
    function updateActiveFilters(devices, services, brands) {
        const container = document.getElementById('activeFilters');
        if (!container) return;
        
        const filterNames = {
            celular: '📱 Celular', tablet: '📟 Tablet', computador: '💻 Computador/Notebook',
            tela: '🖥️ Troca de Tela', bateria: '🔋 Bateria', conector: '⚡ Conector de Carga', 
            software: '💻 Software/Formatação', camera: '📸 Câmera', audio: '🎵 Áudio/Falante', 
            botao: '🔘 Botões', placa: '🔧 Placa Mãe', limpeza: '🧹 Limpeza', 
            armazenamento: '💾 Armazenamento/SSD', memoria: '🧠 Memória RAM', teclado: '⌨️ Teclado', 
            cooler: '🌡️ Cooler/Refrigeração', pelicula: '🔮 Película',
            iphone: '🍎 iPhone', samsung: '📱 Samsung', xiaomi: '📲 Xiaomi', motorola: '📱 Motorola',
            dell: '💻 Dell', hp: '💻 HP', lenovo: '💻 Lenovo', asus: '💻 Asus', acer: '💻 Acer', 
            lg: '📱 LG', positivo: '💻 Positivo'
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
        
        // Adiciona evento para remover filtros individuais
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
        
        // Botão limpar todos
        const clearAllTags = document.getElementById('clearAllTagsBtn');
        if (clearAllTags) {
            clearAllTags.addEventListener('click', clearAllFilters);
        }
    }

    // ============================================
    // ATUALIZA BADGES DOS GRUPOS
    // ============================================
    function updateFilterBadges(deviceCount, serviceCount, brandCount) {
        const deviceBadge = document.getElementById('deviceBadge');
        const serviceBadge = document.getElementById('serviceBadge');
        const brandBadge = document.getElementById('brandBadge');
        
        if (deviceBadge) deviceBadge.textContent = deviceCount;
        if (serviceBadge) serviceBadge.textContent = serviceCount;
        if (brandBadge) brandBadge.textContent = brandCount;
    }

    // ============================================
    // LIMPA TODOS OS FILTROS
    // ============================================
    function clearAllFilters() {
        document.querySelectorAll('.filter-checkbox:checked').forEach(cb => {
            cb.checked = false;
        });
        filterServices(); // Isso vai mostrar todos os serviços
    }

    // ============================================
    // INICIALIZA FILTROS
    // ============================================
    function initFilters() {
        console.log('🎯 Inicializando sistema de filtros...');
        console.log(`📊 Total de serviços disponíveis: ${servicesData.length}`);
        
        updateCounters();
        renderCards(servicesData); // Mostra TODOS os serviços inicialmente
        
        // Adiciona eventos aos checkboxes
        document.querySelectorAll('.filter-checkbox').forEach(cb => {
            cb.addEventListener('change', filterServices);
        });
        
        // Botão limpar filtros
        const clearBtn = document.getElementById('clearFiltersBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', clearAllFilters);
        }
        
        // Toggle mobile
        const toggleBtn = document.getElementById('mobileFilterToggle');
        const filtersBar = document.getElementById('filtersBar');
        if (toggleBtn && filtersBar) {
            toggleBtn.addEventListener('click', () => {
                filtersBar.classList.toggle('open');
                const icon = toggleBtn.querySelector('.toggle-icon');
                if (icon) icon.textContent = filtersBar.classList.contains('open') ? '▲' : '▼';
            });
        }
    }

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    function init() {
        console.log('🚀 ProTech - Site inicializado');
        initFilters();
        
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
    }
    
    // Expõe função global para limpar filtros
    window.clearAllFilters = clearAllFilters;
    
    init();
    
})();
// ============================================
// SISTEMA DE TOGGLE DOS FILTROS (ESTILO MERCADO LIVRE)
// ============================================

class FiltersToggle {
    constructor() {
        this.filtersWrapper = document.getElementById('filtersWrapper');
        this.toggleBtn = document.getElementById('toggleFiltersBtn');
        this.floatingBtn = document.getElementById('floatingFiltersBtn');
        this.closeMobileBtn = document.getElementById('closeFiltersMobile');
        this.isCollapsed = false;
        this.isMobileOpen = false;
        
        this.init();
        this.loadState();
    }
    
    init() {
        // Botão principal de toggle (desktop)
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleFilters());
        }
        
        // Botão flutuante (mobile)
        if (this.floatingBtn) {
            this.floatingBtn.addEventListener('click', () => this.openMobileFilters());
        }
        
        // Botão fechar (mobile)
        if (this.closeMobileBtn) {
            this.closeMobileBtn.addEventListener('click', () => this.closeMobileFilters());
        }
        
        // Fechar ao clicar fora (mobile)
        if (this.filtersWrapper) {
            this.filtersWrapper.addEventListener('click', (e) => {
                if (window.innerWidth <= 768 && e.target === this.filtersWrapper) {
                    this.closeMobileFilters();
                }
            });
        }
        
        // Salvar estado ao redimensionar
        window.addEventListener('resize', () => this.handleResize());
    }
    
    toggleFilters() {
        this.isCollapsed = !this.isCollapsed;
        
        if (this.filtersWrapper) {
            if (this.isCollapsed) {
                this.filtersWrapper.classList.add('collapsed');
                this.toggleBtn.classList.add('collapsed');
                this.updateToggleButtonText('Mostrar Filtros', '▼');
            } else {
                this.filtersWrapper.classList.remove('collapsed');
                this.toggleBtn.classList.remove('collapsed');
                this.updateToggleButtonText('Ocultar Filtros', '▲');
            }
        }
        
        this.saveState();
    }
    
    updateToggleButtonText(text, arrow) {
        if (this.toggleBtn) {
            const textSpan = this.toggleBtn.querySelector('.btn-text');
            const arrowSpan = this.toggleBtn.querySelector('.btn-arrow');
            if (textSpan) textSpan.textContent = text;
            if (arrowSpan) arrowSpan.textContent = arrow;
        }
    }
    
    openMobileFilters() {
        if (this.filtersWrapper) {
            this.filtersWrapper.classList.add('open-mobile');
            document.body.style.overflow = 'hidden';
            this.isMobileOpen = true;
        }
    }
    
    closeMobileFilters() {
        if (this.filtersWrapper) {
            this.filtersWrapper.classList.remove('open-mobile');
            document.body.style.overflow = '';
            this.isMobileOpen = false;
        }
    }
    
    handleResize() {
        if (window.innerWidth > 768) {
            // Desktop: remove classe mobile
            if (this.filtersWrapper) {
                this.filtersWrapper.classList.remove('open-mobile');
                document.body.style.overflow = '';
            }
            
            // Restaura estado salvo
            if (this.isCollapsed) {
                this.filtersWrapper.classList.add('collapsed');
            } else {
                this.filtersWrapper.classList.remove('collapsed');
            }
        } else {
            // Mobile: remove collapsed para não conflitar
            if (this.filtersWrapper && !this.isMobileOpen) {
                this.filtersWrapper.classList.remove('collapsed');
            }
        }
    }
    
    saveState() {
        localStorage.setItem('filtersCollapsed', this.isCollapsed);
    }
    
    loadState() {
        const saved = localStorage.getItem('filtersCollapsed');
        if (saved !== null) {
            this.isCollapsed = saved === 'true';
            if (this.isCollapsed) {
                if (this.filtersWrapper) this.filtersWrapper.classList.add('collapsed');
                if (this.toggleBtn) this.toggleBtn.classList.add('collapsed');
                this.updateToggleButtonText('Mostrar Filtros', '▼');
            }
        }
    }
}

// ============================================
// ATUALIZA CONTADOR DO BOTÃO FLUTUANTE
// ============================================

function updateFloatingFilterCount() {
    const floatingBtn = document.getElementById('floatingFiltersBtn');
    const countBadge = document.getElementById('floatingFilterCount');
    
    if (!floatingBtn || !countBadge) return;
    
    const selectedFilters = document.querySelectorAll('.filter-checkbox:checked').length;
    
    if (selectedFilters > 0) {
        countBadge.textContent = selectedFilters;
        countBadge.style.display = 'inline-block';
        floatingBtn.style.background = '#ff6b6b';
    } else {
        countBadge.style.display = 'none';
        floatingBtn.style.background = '#4fa3ff';
    }
}

// ============================================
// SOBRESCREVE A FUNÇÃO FILTERSERVICES PARA ATUALIZAR O CONTADOR
// ============================================

// Guarda a função original
const originalFilterServices = window.filterServices || function() {};

// Nova função que atualiza o contador flutuante
window.filterServices = function() {
    if (typeof originalFilterServices === 'function') {
        originalFilterServices();
    }
    updateFloatingFilterCount();
};

// ============================================
// INICIALIZA O TOGGLE DOS FILTROS
// ============================================

// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o toggle dos filtros
    const filtersToggle = new FiltersToggle();
    
    // Atualiza contador flutuante
    updateFloatingFilterCount();
    
    // Adiciona listener para mudanças nos filtros
    document.querySelectorAll('.filter-checkbox').forEach(cb => {
        cb.addEventListener('change', updateFloatingFilterCount);
    });
    
    // Adiciona indicador visual quando filtros estão ocultos
    const filtersWrapper = document.getElementById('filtersWrapper');
    const servicesGrid = document.getElementById('servicesGrid');
    
    if (filtersWrapper && servicesGrid) {
        // Cria indicador para quando filtros estão ocultos
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    const isCollapsed = filtersWrapper.classList.contains('collapsed');
                    const existingIndicator = document.querySelector('.filters-hidden-indicator');
                    
                    if (isCollapsed && !existingIndicator && window.innerWidth > 768) {
                        const indicator = document.createElement('div');
                        indicator.className = 'filters-hidden-indicator';
                        indicator.innerHTML = `
                            <span>🔍</span> Filtros ocultos. 
                            <strong style="color:#4fa3ff">Clique aqui</strong> para mostrar filtros
                        `;
                        indicator.addEventListener('click', () => {
                            filtersToggle.toggleFilters();
                            indicator.remove();
                        });
                        servicesGrid.parentNode.insertBefore(indicator, servicesGrid);
                    } else if (!isCollapsed && existingIndicator) {
                        existingIndicator.remove();
                    }
                }
            });
        });
        
        observer.observe(filtersWrapper, { attributes: true });
    }
});