/**
 * ADMIN LOGIC - EL EMPASTELAO
 */

const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbxhiYX4fHNzKTwt7eU0rZdnLqrTMTNcMRhPuY-YISnq5nshKsyOhL7CtNzT_x1Kw8DD/exec';
const ADMIN_TOKEN = 'empastelao2024'; // Contraseña simple para el demo

let allProducts = [];

// --- AUTH ---
function checkAuth() {
    const pass = document.getElementById('admin-pass').value;
    if (pass === ADMIN_TOKEN) {
        document.getElementById('login-overlay').style.display = 'none';
        sessionStorage.setItem('isAdmin', 'true');
        loadProducts();
    } else {
        alert('Contraseña incorrecta');
    }
}

function logout() {
    sessionStorage.removeItem('isAdmin');
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isAdmin') === 'true') {
        document.getElementById('login-overlay').style.display = 'none';
        loadProducts();
    }
});

// --- DATA LOADING ---
async function loadProducts() {
    try {
        const response = await fetch(GAS_API_URL);
        allProducts = await response.json();
        renderTable();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function renderTable() {
    const tbody = document.getElementById('admin-products-list');
    tbody.innerHTML = '';

    allProducts.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.imagen}" class="prod-img" onerror="this.src='img/placeholder.png'"></td>
            <td><strong>${p.nombre}</strong></td>
            <td>$${parseFloat(p.precio).toLocaleString('es-CO')}</td>
            <td><span class="status-badge ${p.activo ? 'status-active' : 'status-inactive'}">${p.activo ? 'Activo' : 'Inactivo'}</span></td>
            <td class="actions">
                <button class="btn-edit" onclick="editProduct('${p.id}')">✏️</button>
                <button class="btn-delete" onclick="deleteProduct('${p.id}')">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- MODAL & FORM ---
function openModal(id = null) {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    form.reset();

    if (id) {
        document.getElementById('modal-title').textContent = 'Editar Producto';
        const p = allProducts.find(prod => prod.id === id);
        if (p) {
            document.getElementById('prod-id').value = p.id;
            document.getElementById('prod-nombre').value = p.nombre;
            document.getElementById('prod-desc').value = p.descripcion;
            document.getElementById('prod-precio').value = p.precio;
            document.getElementById('prod-imagen').value = p.imagen;
            document.getElementById('modal-img-preview').src = p.imagen || 'img/placeholder.png';
            document.getElementById('prod-destacado').value = p.destacado.toString();
            document.getElementById('prod-activo').value = p.activo.toString();
        }
    } else {
        document.getElementById('modal-title').textContent = 'Nuevo Producto';
        document.getElementById('prod-id').value = 'prod-' + Date.now();
        document.getElementById('modal-img-preview').src = 'img/placeholder.png';
    }

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('active');
}

// --- UPLOAD ---
async function handleFileUpload(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const base64 = e.target.result;
        try {
            const btn = document.getElementById('btn-upload-trigger');
            if (btn) btn.textContent = 'Subiendo...';

            console.log("Enviando imagen a GAS:", GAS_API_URL);

            const response = await fetch(GAS_API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'uploadImage',
                    base64: base64,
                    fileName: `prod_${Date.now()}_${file.name}`
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP Error ${response.status}: ${errorText}`);
            }

            const result = await response.json();
            if (result.status === 'success') {
                const imgUrl = result.url;
                document.getElementById('prod-imagen').value = imgUrl;

                // Actualizar preview con un pequeño "cache buster" para forzar recarga
                const preview = document.getElementById('modal-img-preview');
                preview.src = imgUrl;

                alert('¡Imagen subida con éxito! Ya puedes verla en la vista previa.');
            } else {
                alert('Error de GAS: ' + result.message);
            }
            if (btn) btn.textContent = 'Subir Foto';
        } catch (error) {
            alert('Error al subir imagen. Revisa la consola para más detalles.');
            console.error('Upload Error Trace:', error);
            const btn = document.getElementById('btn-upload-trigger');
            if (btn) btn.textContent = 'Subir Foto';
        }
    };
    reader.readAsDataURL(file);
}

// --- CRUD OPS ---
document.getElementById('product-form').onsubmit = async (e) => {
    e.preventDefault();

    const productData = {
        action: 'updateProduct',
        id: document.getElementById('prod-id').value,
        nombre: document.getElementById('prod-nombre').value,
        descripcion: document.getElementById('prod-desc').value,
        precio: parseFloat(document.getElementById('prod-precio').value),
        imagen: document.getElementById('prod-imagen').value,
        destacado: document.getElementById('prod-destacado').value === 'true',
        activo: document.getElementById('prod-activo').value === 'true'
    };

    try {
        const response = await fetch(GAS_API_URL, {
            method: 'POST',
            body: JSON.stringify(productData)
        });
        const result = await response.json();
        if (result.status === 'success') {
            alert('¡Guardado con éxito!');
            closeModal();
            loadProducts();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        alert('Error al conectar con el servidor');
    }
};

window.editProduct = openModal;

async function deleteProduct(id) {
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return;

    try {
        const response = await fetch(GAS_API_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'deleteProduct', id: id })
        });
        const result = await response.json();
        if (result.status === 'success') {
            loadProducts();
        }
    } catch (error) {
        alert('Error al eliminar');
    }
}
