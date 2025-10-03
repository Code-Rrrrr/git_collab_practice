// Menu-specific JavaScript
let cart = [];
let total = 0;

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    updateCart();
    showAddedToCart(itemName);
}

function updateCart() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.getElementById('total-amount');
    
    if (!cartCount || !cartItems || !totalAmount) return;
    
    // Update cart count
    cartCount.textContent = cart.length;
    
    // Update cart items
    cartItems.innerHTML = '';
    total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
    });
    
    // Update total
    totalAmount.textContent = total.toFixed(2);
}

function showAddedToCart(itemName) {
    // Create and show a toast notification
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = `✓ ${itemName} added to cart!`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

function toggleCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert(`Order placed! Total: $${total.toFixed(2)}\nThank you for your order!`);
    cart = [];
    updateCart();
    toggleCart();
}