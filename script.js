const mp = new MercadoPago('TU_PUBLIC_KEY', {
    locale: 'es-AR'
});

let cart = [];

function addToCart(productId) {
    const productElement = document.querySelector(`.product[data-id='${productId}']`);
    const product = {
        id: productElement.getAttribute('data-id'),
        name: productElement.getAttribute('data-name'),
        price: parseFloat(productElement.getAttribute('data-price')),
        quantity: 1
    };
    cart.push(product);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartElement = document.getElementById('cart');
    if (cart.length === 0) {
        cartElement.innerHTML = '<p>El carrito está vacío</p>';
        return;
    }
    let cartHTML = '';
    let total = 0;
    cart.forEach(item => {
        cartHTML += `<div class="cart-item">${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</div>`;
        total += item.price * item.quantity;
    });
    cartHTML += `<div class="cart-total">Total: $${total.toFixed(2)}</div>`;
    cartElement.innerHTML = cartHTML;
}

function checkout() {
    const orderData = {
        items: cart.map(item => ({
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: 'ARS'
        }))
    };

    fetch('checkout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        mp.checkout({
            preference: {
                id: data.preference_id
            }
        }).open();
    })
    .catch(error => console.error('Error:', error));
}
