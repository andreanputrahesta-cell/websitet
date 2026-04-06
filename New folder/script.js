// ================= KONFIGURASI TERJEMAHAN =================
const translations = {
    id: {
        "nav-home": "Beranda", "nav-products": "Produk",
        "hero-title": "Koleksi Gadget & Aksesoris Terbaru",
        "hero-desc": "Temukan produk impianmu dengan harga terbaik dan kualitas terjamin.",
        "hero-btn": "Lihat Produk", "prod-title": "Produk Unggulan",
        "admin-title": "Panel Kontrol Admin", "form-name": "Nama Produk",
        "form-desc": "Deskripsi Singkat",
        "form-price": "Harga (Rp)", "form-img": "URL Gambar", "form-submit": "Tambah Produk Baru",
        "cart-title": "Keranjang Saya", "cart-empty": "Keranjang Anda masih kosong.",
        "cart-total": "Total:", "cart-checkout": "Pesan lewat WhatsApp",
        "credit-text": "Contoh website buatan <strong>Andrean Putra Hesta</strong> yang dibuat melalui kodingan HTML, CSS, dan JS.",
        "add-to-cart": "Tambah ke Keranjang"
    },
    en: {
        "nav-home": "Home", "nav-products": "Products",
        "hero-title": "Latest Gadget & Accessories Collection",
        "hero-desc": "Find your dream products with the best prices and guaranteed quality.",
        "hero-btn": "View Products", "prod-title": "Featured Products",
        "admin-title": "Admin Control Panel", "form-name": "Product Name",
        "form-desc": "Short Description",
        "form-price": "Price (IDR)", "form-img": "Image URL", "form-submit": "Add New Product",
        "cart-title": "My Cart", "cart-empty": "Your cart is still empty.",
        "cart-total": "Total:", "cart-checkout": "Order via WhatsApp",
        "credit-text": "Example website created by <strong>Andrean Putra Hesta</strong> built through HTML, CSS, and JS coding.",
        "add-to-cart": "Add to Cart"
    }
};

let currentLang = 'id';
const ADMIN_PASSWORD = "admin123"; // SANDI ADMIN MASIH SAMA

// ================= DATA PRODUK =================
let products = [
    { id: 1, name: "Headphone Harman Kardon", desc_id: "Suara studio yang sangat jernih dan bass yang mendalam.", desc_en: "Crystal clear studio sound and deep bass experience.", price: 2500000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500" },
    { id: 2, name: "Smartwatch Series 7", desc_id: "Layar lengkung AMOLED yang elegan dengan pelacak kesehatan lengkap.", desc_en: "Elegant AMOLED curved display with complete health tracker.", price: 3800000, img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=500" },
    { id: 3, name: "Kamera Mirrorless Sony", desc_id: "Kamera andalan fotografer dengan autofokus super cepat.", desc_en: "Photographer's flagship camera with super fast autofocus.", price: 15000000, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500" },
    { id: 4, name: "Speaker Bluetooth JBL", desc_id: "Tahan air dan awet hingga 12 jam. Cocok untuk pesta outdoor.", desc_en: "Waterproof and lasts up to 12 hours. Perfect for outdoor parties.", price: 1200000, img: "https://images.unsplash.com/photo-1593121925328-369cc8459c08?q=80&w=500" }
];

let cart = [];

// ================= FUNGSI UTAMA =================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    switchLanguage('id');

    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('prodName').value;
        const desc = document.getElementById('prodDesc').value;
        const price = parseInt(document.getElementById('prodPrice').value);
        const img = document.getElementById('prodImg').value;
        
        products.push({ id: products.length + 1, name, desc_id: desc, desc_en: desc, price, img });
        renderProducts();
        productForm.reset();
        alert(currentLang === 'id' ? 'Produk berhasil ditambahkan!' : 'Product added successfully!');
    });
});

// ================= FITUR ADMIN BARU =================
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('inputSandi').value = ''; // Reset inputan
}

function prosesLogin() {
    const sandiInput = document.getElementById('inputSandi').value;
    
    if (sandiInput === ADMIN_PASSWORD) {
        alert(currentLang === 'id' ? 'Login Berhasil!' : 'Login Successful!');
        document.getElementById('adminPanel').style.display = 'block'; // Munculkan panel
        document.getElementById('adminBtn').style.display = 'none'; // Sembunyikan tombol login
        closeLoginModal(); // Tutup kotaknya
        document.getElementById('adminPanel').scrollIntoView({ behavior: 'smooth' }); // Langsung geser ke panel
    } else {
        alert(currentLang === 'id' ? 'Sandi Salah!' : 'Wrong Password!');
    }
}

function logoutAdmin() {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminBtn').style.display = 'inline-block';
    alert(currentLang === 'id' ? 'Anda telah keluar dari mode admin.' : 'You have logged out from admin mode.');
}

// ================= FITUR LAINNYA =================
function switchLanguage(lang) {
    currentLang = lang;
    document.getElementById('lang-id').classList.toggle('active', lang === 'id');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) { element.innerHTML = translations[lang][key]; }
    });
    renderProducts();
    updateCart();
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productDesc = currentLang === 'id' ? product.desc_id : product.desc_en;
        productsGrid.innerHTML += `
            <div class="product-card">
                <div class="product-img"><img src="${product.img}" alt="${product.name}"></div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="desc">${productDesc}</p> 
                    <p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>
                    <button class="btn-add-cart" onclick="addToCart('${product.name}', ${product.price})">${translations[currentLang]['add-to-cart']}</button>
                </div>
            </div>
        `;
    });
}

function toggleCart() { document.getElementById('cartSidebar').classList.toggle('active'); }

function addToCart(name, price) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) { cart[itemIndex].quantity += 1; } 
    else { cart.push({ name, price, quantity: 1 }); }
    updateCart();
    if (!document.getElementById('cartSidebar').classList.contains('active')) { document.getElementById('cartSidebar').classList.add('active'); }
}

function changeQuantity(index, action) {
    if (action === 'plus') { cart[index].quantity += 1; } 
    else if (action === 'minus') {
        cart[index].quantity -= 1;
        if (cart[index].quantity === 0) { cart.splice(index, 1); }
    }
    updateCart();
}

function removeFromCart(index) { cart.splice(index, 1); updateCart(); }

function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartCount = document.getElementById('cart-count');
    const totalAmount = document.getElementById('totalAmount');
    cartItemsDiv.innerHTML = '';
    let total = 0; let itemCount = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `<p style="text-align:center; color:#999; margin-top:30px;">${translations[currentLang]['cart-empty']}</p>`;
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            itemCount += item.quantity;
            cartItemsDiv.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <small>Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</small>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <div class="cart-quantity-control">
                            <button class="btn-qty" onclick="changeQuantity(${index}, 'minus')">-</button>
                            <span class="qty-number">${item.quantity}</span>
                            <button class="btn-qty" onclick="changeQuantity(${index}, 'plus')">+</button>
                        </div>
                        <button class="btn-remove-item" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        });
    }
    cartCount.innerText = itemCount;
    totalAmount.innerText = 'Rp ' + total.toLocaleString('id-ID');
}

function checkout() {
    if (cart.length === 0) { alert('Keranjang kosong!'); return; }
    let phone = "628xxxxxxxxxx"; // Ganti nomor di sini
    let totalHarga = 0;
    let message = `Halo Toko Keren, saya mau pesan:\n\n`;
    cart.forEach(item => { 
        message += `- ${item.name} (${item.quantity}x)\n`;
        totalHarga += item.price * item.quantity;
    });
    message += `\n*Total Keseluruhan:* Rp ${totalHarga.toLocaleString('id-ID')}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}