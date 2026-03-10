document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION ---
    const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbxhiYX4fHNzKTwt7eU0rZdnLqrTMTNcMRhPuY-YISnq5nshKsyOhL7CtNzT_x1Kw8DD/exec';
    const WHATSAPP_NUMBER = '573043037526';

    // --- ELEMENT SELECTORS ---
    let cartContainer, cartFab, closeCartBtn, cartBackdrop;
    let addToCartButtons = [];
    let cartItemsContainer, cartTotalElement, cartFabCount, sendOrderBtn;

    // Form inputs
    let clientNameInput, clientAddressInput, clientNeighborhoodInput, clientNotesInput;

    // --- STATE ---
    let cart = [];
    let products = [];

    // --- DATA FETCHING ---
    /**
     * Fetches products from Google Apps Script / Google Sheets
     */
    const fetchProducts = async () => {
        try {
            // Add a small loading indicator if needed (optional)
            const response = await fetch(GAS_API_URL);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            if (Array.isArray(data)) {
                products = data;
                window.__EMP_PRODUCTS__ = products;
                renderProducts();
            } else {
                console.error("Data is not an array:", data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            // Fallback: try to use local products if they exist as a global variable
            if (window.__EMP_PRODUCTS__ && window.__EMP_PRODUCTS__.length > 0) {
                products = window.__EMP_PRODUCTS__;
            } else {
                products = [];
            }
            renderProducts();
        }
    };

    // --- CART LOGIC ---

    const addToCart = (id, name, price) => {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        saveCart();
        renderCart();
    };

    const updateQuantity = (id, change) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(id);
            } else {
                saveCart();
                renderCart();
            }
        }
    };

    const removeFromCart = (id) => {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
    };

    const saveCart = () => {
        localStorage.setItem('empastelaoCart', JSON.stringify(cart));
    };

    const loadCart = () => {
        const savedCart = localStorage.getItem('empastelaoCart');
        if (savedCart) {
            try {
                cart = JSON.parse(savedCart);
            } catch (e) {
                cart = [];
            }
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // --- UI RENDERING ---

    const renderProducts = () => {
        const target = document.getElementById('products-render-target') || document.querySelector('main.container, .container');
        if (!target) return;

        // Limpiar contenido previo dinámico
        target.innerHTML = '';

        // Grid container
        const grid = document.createElement('div');
        grid.className = 'products-grid';

        // Filtrar y mostrar productos activos
        const activeProducts = products.filter(p => p.activo !== false);

        if (activeProducts.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; opacity: 0.6;">No hay productos disponibles actualmente.</p>';
        } else {
            activeProducts.forEach(p => {
                grid.appendChild(createCardElement(p));
            });
        }

        target.appendChild(grid);

        ensureCartUI();
        bindAddToCartEvents();
        renderCart();
    };

    const isVideoURL = (url) => {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
        const lowerUrl = url.toLowerCase();
        return videoExtensions.some(ext => lowerUrl.includes(ext)) || lowerUrl.includes('drive.google.com/file/d/') && lowerUrl.includes('/view');
    };

    const createCardElement = (p) => {
        const card = document.createElement('article');
        card.className = 'combo-card';
        card.dataset.id = p.id;
        card.dataset.name = p.nombre;
        card.dataset.price = p.precio;

        // Media element (Image or Video)
        let media;
        if (isVideoURL(p.imagen)) {
            media = document.createElement('video');
            media.src = p.imagen;
            media.muted = true;
            media.loop = true;
            media.playsInline = true;
            media.autoplay = true; // Auto-play by default for menu items
            media.setAttribute('muted', ''); // Safari fix
        } else {
            media = document.createElement('img');
            media.src = p.imagen || 'img/placeholder.png';
            media.alt = p.nombre;
            media.loading = 'lazy';
        }

        const title = document.createElement('div'); title.className = 'title'; title.textContent = p.nombre;
        const desc = document.createElement('div'); desc.className = 'desc'; desc.textContent = p.descripcion;
        const actions = document.createElement('div'); actions.className = 'card-actions';
        const price = document.createElement('div'); price.className = 'price';
        price.textContent = `$${(parseFloat(p.precio) || 0).toLocaleString('es-CO')}`;

        const btn = document.createElement('button');
        btn.className = 'add-to-cart-btn';
        btn.type = 'button';
        btn.textContent = 'Agregar';

        if (p.destacado === true || p.destacado === "true") {
            const badge = document.createElement('div');
            badge.className = 'badge-hot';
            badge.textContent = '🔥 Favorito';
            card.appendChild(badge);
        }

        actions.appendChild(price); actions.appendChild(btn);
        card.appendChild(media); card.appendChild(title); card.appendChild(desc); card.appendChild(actions);
        return card;
    };

    const bindAddToCartEvents = () => {
        const buttons = document.querySelectorAll('.add-to-cart-btn');
        buttons.forEach(button => {
            button.onclick = (e) => {
                const card = e.target.closest('.combo-card');
                if (card) {
                    const id = card.dataset.id;
                    const name = card.dataset.name;
                    const price = parseFloat(card.dataset.price);
                    const img = card.querySelector('img');
                    if (price >= 0) {
                        animateToCart(img, () => addToCart(id, name, price));
                    }
                }
            };
        });
    };

    const ensureCartUI = () => {
        if (!document.getElementById('cart-fab')) {
            const fab = document.createElement('button'); fab.id = 'cart-fab'; fab.className = 'cart-fab';
            fab.innerHTML = '<span class="icon">🛒</span><span id="cart-fab-count" class="count">0</span>';
            document.body.appendChild(fab);
            fab.onclick = openCart;
        }

        if (!document.getElementById('cart-backdrop')) {
            const bd = document.createElement('div'); bd.id = 'cart-backdrop'; bd.className = 'cart-backdrop';
            document.body.appendChild(bd);
            bd.onclick = closeCart;
        }

        if (!document.getElementById('cart-container')) {
            const panel = document.createElement('aside'); panel.id = 'cart-container'; panel.className = 'cart-panel';
            panel.innerHTML = `
                <div class="cart-header">
                    <button id="close-cart-btn">×</button>
                    <h3>Tu Pedido</h3>
                </div>
                <div id="cart-items" class="cart-items"></div>
                <div class="cart-form">
                    <input id="client-name" type="text" placeholder="Tu Nombre *">
                    <input id="client-address" type="text" placeholder="Dirección *">
                    <input id="client-neighborhood" type="text" placeholder="Barrio *">
                    <textarea id="client-notes" placeholder="Notas opcionales (Ej: Sin cebolla)"></textarea>
                </div>
                <div class="cart-footer">
                    <div class="cart-summary">Total: <strong id="cart-total">$0</strong></div>
                    <button id="send-order-btn" class="btn-primary" style="width:100%">Enviar Pedido por WhatsApp</button>
                </div>
            `;
            document.body.appendChild(panel);

            document.getElementById('close-cart-btn').onclick = closeCart;
            document.getElementById('send-order-btn').onclick = handleSendOrder;

            clientNameInput = document.getElementById('client-name');
            clientAddressInput = document.getElementById('client-address');
            clientNeighborhoodInput = document.getElementById('client-neighborhood');
            clientNotesInput = document.getElementById('client-notes');

            cartContainer = document.getElementById('cart-container');
            cartItemsContainer = document.getElementById('cart-items');
            cartTotalElement = document.getElementById('cart-total');
            cartFabCount = document.getElementById('cart-fab-count');
        }
    };

    const animateToCart = (imgEl, onComplete) => {
        if (!imgEl) { onComplete(); return; }
        const fab = document.getElementById('cart-fab');
        if (!fab) { onComplete(); return; }

        const rectImg = imgEl.getBoundingClientRect();
        const rectFab = fab.getBoundingClientRect();
        const clone = imgEl.cloneNode(true);

        clone.style.position = 'fixed';
        clone.style.left = rectImg.left + 'px';
        clone.style.top = rectImg.top + 'px';
        clone.style.width = rectImg.width + 'px';
        clone.style.height = rectImg.height + 'px';
        clone.style.zIndex = 9999;
        clone.style.borderRadius = '50%';
        clone.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s';
        document.body.appendChild(clone);

        const dx = (rectFab.left + rectFab.width / 2) - (rectImg.left + rectImg.width / 2);
        const dy = (rectFab.top + rectFab.height / 2) - (rectImg.top + rectImg.height / 2);

        requestAnimationFrame(() => {
            clone.style.transform = `translate(${dx}px, ${dy}px) scale(0.1)`;
            clone.style.opacity = '0.4';
        });

        setTimeout(() => {
            if (document.body.contains(clone)) document.body.removeChild(clone);
            onComplete();
        }, 600);
    };

    const renderCart = () => {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center;padding:20px;opacity:0.6;">El carrito está vacío</p>';
        } else {
            cart.forEach(item => {
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price-unit">$${item.price.toLocaleString('es-CO')} c/u</div>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="window.updateQty('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="window.updateQty('${item.id}', 1)">+</button>
                    </div>
                `;
                cartItemsContainer.appendChild(div);
            });
        }

        const total = calculateTotal();
        cartTotalElement.textContent = `$${total.toLocaleString('es-CO')}`;
        if (cartFabCount) {
            const count = cart.reduce((s, i) => s + i.quantity, 0);
            cartFabCount.textContent = count;
            cartFabCount.style.display = count > 0 ? 'flex' : 'none';
        }
    };

    window.updateQty = (id, delta) => {
        updateQuantity(id, delta);
    };

    const openCart = () => {
        cartContainer?.classList.add('open');
        document.getElementById('cart-backdrop')?.classList.add('open');
    };

    const closeCart = () => {
        cartContainer?.classList.remove('open');
        document.getElementById('cart-backdrop')?.classList.remove('open');
    };

    const handleSendOrder = () => {
        if (cart.length === 0) return alert('¡Tu carrito está vacío!');

        const name = clientNameInput.value.trim();
        const addr = clientAddressInput.value.trim();
        const neigh = clientNeighborhoodInput.value.trim();

        if (!name || !addr || !neigh) return alert('Por favor, completa los campos obligatorios (*)');

        let message = `*🥟 PEDIDO EL EMPASTELAO *\n\n`;
        message += `👤 *Cliente:* ${name}\n`;
        message += `📍 *Dirección:* ${addr}\n`;
        message += `🏘️ *Barrio:* ${neigh}\n`;
        if (clientNotesInput.value.trim()) message += `📝 *Notas:* ${clientNotesInput.value}\n`;

        message += `\n🛒 *Productos:*\n`;
        cart.forEach(i => {
            message += `• ${i.name} x${i.quantity} ($${(i.price * i.quantity).toLocaleString('es-CO')})\n`;
        });

        message += `\n💰 *TOTAL: $${calculateTotal().toLocaleString('es-CO')}*`;
        message += `\n\n_¡Muchas gracias por tu pedido!_`;

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    // --- INITIALIZATION ---
    loadCart();
    fetchProducts();
});