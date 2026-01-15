document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENT SELECTORS ---
    const cartContainer = document.getElementById('cart-container');
    const cartFab = document.getElementById('cart-fab');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartFabCount = document.getElementById('cart-fab-count');
    const sendOrderBtn = document.getElementById('send-order-btn');

    // Form inputs
    const clientNameInput = document.getElementById('client-name');
    const clientAddressInput = document.getElementById('client-address');
    const clientNeighborhoodInput = document.getElementById('client-neighborhood');
    const clientNotesInput = document.getElementById('client-notes');

    // --- STATE ---
    let cart = [];
    const WHATSAPP_NUMBER = '573043037526'; // As specified in the requirements

    // --- CART LOGIC ---

    /**
     * Parses a price string (e.g., "$12K", "6000") into a number.
     * @param {string} priceString The string to parse.
     * @returns {number} The parsed price as a number.
     */
    const parsePrice = (priceString) => {
        if (!priceString || typeof priceString !== 'string') return 0;
        const cleanedString = priceString.replace(/\$/g, '').replace(/\s/g, '').toLowerCase();
        if (cleanedString.includes('k')) {
            return parseFloat(cleanedString.replace('k', '')) * 1000;
        }
        return parseFloat(cleanedString) || 0;
    };

    /**
     * Adds an item to the cart or increments its quantity.
     * @param {string} id - The product ID.
     * @param {string} name - The product name.
     * @param {number} price - The product price.
     */
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

    /**
     * Updates the quantity of an item in the cart.
     * @param {string} id - The product ID.
     * @param {number} change - The amount to change the quantity by (e.g., 1 or -1).
     */
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

    /**
     * Removes an item completely from the cart.
     * @param {string} id - The product ID.
     */
    const removeFromCart = (id) => {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
    };

    /**
     * Saves the current cart to localStorage.
     */
    const saveCart = () => {
        localStorage.setItem('empastelaoCart', JSON.stringify(cart));
    };

    /**
     * Loads the cart from localStorage.
     */
    const loadCart = () => {
        const savedCart = localStorage.getItem('empastelaoCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    };

    /**
     * Calculates the total price of all items in the cart.
     * @returns {number} The total price.
     */
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // --- UI RENDERING ---

    /**
     * Renders all items in the cart UI.
     */
    const renderCart = () => {
        cartItemsContainer.innerHTML = ''; // Clear previous items

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty-message">Tu pedido está vacío.</p>';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" data-id="${item.id}" data-change="-1">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" data-id="${item.id}" data-change="1">+</button>
                    </div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toLocaleString('es-CO')}</div>
                    <button class="cart-item-remove" data-id="${item.id}">&times;</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        const total = calculateTotal();
        cartTotalElement.textContent = `$${total.toLocaleString('es-CO')}`;
        updateCartFAB();
    };

    /**
     * Updates the item count on the floating cart button.
     */
    const updateCartFAB = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartFabCount.textContent = totalItems;
        if (totalItems > 0) {
            cartFabCount.classList.add('visible');
        } else {
            cartFabCount.classList.remove('visible');
        }
    };

    /**
     * Opens the cart side panel.
     */
    const openCart = () => {
        cartContainer.classList.add('open');
        cartBackdrop.classList.add('open');
    };

    /**
     * Closes the cart side panel.
     */
    const closeCart = () => {
        cartContainer.classList.remove('open');
        cartBackdrop.classList.remove('open');
    };

    // --- FORM & ORDER LOGIC ---

    /**
     * Validates the customer data form.
     * @returns {boolean} - True if the form is valid, false otherwise.
     */
    const validateForm = () => {
        let isValid = true;
        
        [clientNameInput, clientAddressInput, clientNeighborhoodInput].forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('invalid');
                isValid = false;
            } else {
                input.classList.remove('invalid');
            }
        });

        return isValid;
    };
    
    /**
     * Generates the formatted WhatsApp message.
     * @returns {string} - The URL-encoded message.
     */
    const generateWhatsAppMessage = () => {
        const name = clientNameInput.value.trim();
        const address = clientAddressInput.value.trim();
        const neighborhood = clientNeighborhoodInput.value.trim();
        const notes = clientNotesInput.value.trim();

        let message = '📦 PEDIDO DE COMIDA\n\n';
        message += '👤 *Cliente:*\n';
        message += `Nombre: ${name}\n`;
        message += `Dirección: ${address}\n`;
        message += `Barrio: ${neighborhood}\n\n`;
        
        if (notes) {
            message += '📝 *Notas adicionales:*\n';
            message += `${notes}\n\n`;
        }

message += '🍽️ *Pedido:*\n';

cart.forEach(item => {
            const subtotal = (item.price * item.quantity).toLocaleString('es-CO');
            message += `- ${item.name} x${item.quantity} — $${subtotal}\n`;
        });
        message += '\n';

        const total = calculateTotal().toLocaleString('es-CO');
        message += `💰 *Total: $${total}*\n\n`;
        message += 'Pedido listo para preparación y entrega a domicilio.';

        return encodeURIComponent(message);
    };

    /**
     * Handles the final order submission.
     */
    const handleSendOrder = () => {
        if (cart.length === 0) {
            alert('Tu pedido está vacío. Agrega algunos productos antes de enviar.');
            return;
        }

        if (validateForm()) {
            const message = generateWhatsAppMessage();
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        } else {
            alert('Por favor, completa todos los campos obligatorios (*) en tus datos.');
        }
    };


    // --- EVENT LISTENERS ---

    cartFab.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartBackdrop.addEventListener('click', closeCart);
    sendOrderBtn.addEventListener('click', handleSendOrder);

    // Event delegation for Add to Cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.combo-card');
            if (card) {
                const id = card.dataset.id;
                const name = card.dataset.name;
                const price = parseFloat(card.dataset.price);
                
                if (price > 0) {
                    addToCart(id, name, price);
                }
            }
        });
    });

    // Event delegation for cart item interactions (quantity, remove)
    cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const id = target.dataset.id;

        if (target.classList.contains('quantity-btn')) {
            const change = parseInt(target.dataset.change, 10);
            updateQuantity(id, change);
        }

        if (target.classList.contains('cart-item-remove')) {
            removeFromCart(id);
        }
    });
    
    // Remove validation styles on input
    [clientNameInput, clientAddressInput, clientNeighborhoodInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.remove('invalid');
            }
        });
    });

    // --- INITIALIZATION ---
    loadCart();
    renderCart();
});