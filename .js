document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    const button = event.target;
    const gridItem = button.closest('.grid-item');
    const itemName = gridItem.querySelector('.name') ? gridItem.querySelector('.name').innerText : 'Unnamed Item';
    const itemPrice = gridItem.querySelector('.price').innerText.replace('$', '');
    const itemImage = gridItem.querySelector('img').src;

    const cartItems = document.querySelector('.cart-items');
    const cartItemNames = cartItems.querySelectorAll('.item-name');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === itemName) {
            const quantityInput = cartItemNames[i].closest('.cart-item').querySelector('.item-quantity input');
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateCartTotal();
            return;
        }
    }

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <img src="${itemImage}" alt="${itemName}">
        <div class="item-details">
            <div class="item-name">${itemName}</div>
            <div class="item-price">$${itemPrice}</div>
        </div>
        <div class="item-quantity">
            <button class="quantity-decrease">-</button>
            <input type="number" value="1" min="1">
            <button class="quantity-increase">+</button>
        </div>
    `;
    cartItems.appendChild(cartItem);

    cartItem.querySelector('.quantity-decrease').addEventListener('click', () => {
        const quantityInput = cartItem.querySelector('input');
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            updateCartTotal();
        }
    });

    cartItem.querySelector('.quantity-increase').addEventListener('click', () => {
        const quantityInput = cartItem.querySelector('input');
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateCartTotal();
    });

    cartItem.querySelector('input').addEventListener('change', updateCartTotal);

    updateCartTotal();
}

function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    cartItems.forEach(cartItem => {
        const priceElement = cartItem.querySelector('.item-price');
        const quantityElement = cartItem.querySelector('input');
        const price = parseFloat(priceElement.innerText.replace('$', ''));
        const quantity = quantityElement.value;
        total += price * quantity;
    });
    document.querySelector('.total-price').innerText = total.toFixed(2);
}