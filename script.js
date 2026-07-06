/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (document.getElementById('cart-items')) {
        renderCart(cartItems);
    }
});

function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
    renderCart(cart);
}

function renderCart(cartItems) {
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartList || !cartTotal) return;
    cartList.innerHTML = '';
    let total = 0;
    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeFromCart(index);
        li.appendChild(removeBtn);
        cartList.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = total;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(cart);
}

function makePayment() {
    const upiId = document.getElementById('upi-id').value.trim();
    if (!upiId) {
        alert('Please enter your UPI ID');
        return;
    }
    alert(`Payment successful using UPI ID: ${upiId}`);
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}