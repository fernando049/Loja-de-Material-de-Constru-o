// 1. Exibir/Ocultar Descrição dos Produtos
const verDetalhesLinks = document.querySelectorAll('.ver-detalhes');

verDetalhesLinks.forEach(link => {
    const descricao = link.nextElementSibling;

    link.addEventListener('mouseover', () => {
        descricao.style.display = 'block';
        const linkRect = link.getBoundingClientRect();
        descricao.style.top = (linkRect.bottom + window.scrollY) + 'px';
        descricao.style.left = linkRect.left + 'px';
    });

    link.addEventListener('mouseout', () => {
        descricao.style.display = 'none';
    });
});

// Atualiza a contagem de itens no carrinho
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
}

// Adiciona um item ao carrinho e redireciona para a página do carrinho
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Redireciona para a página do carrinho após adicionar o item
    window.location.href = 'carrinho.html';
}

// Exibe os itens no carrinho na página de carrinho
function showCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItemsElement.innerHTML = ''; // Limpa a lista de itens
    let totalPrice = 0;

    cart.forEach((item, index) => {
        // Cria um elemento de lista para cada item
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <p>${item.name}</p>
            <p>Preço: R$ ${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        cartItemsElement.appendChild(listItem);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Exibe uma mensagem se o carrinho estiver vazio
    const emptyCartElement = document.getElementById('empty-cart');
    emptyCartElement.style.display = cart.length === 0 ? 'block' : 'none';
}

// Remove um item do carrinho
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove o item pelo índice
    localStorage.setItem('cart', JSON.stringify(cart));
    showCartItems();
    updateCartCount();
}

// Inicializa a contagem do carrinho e exibe os itens se estiver na página do carrinho
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Se estiver na página do carrinho, exibe os itens
    if (document.getElementById('cart-items')) {
        showCartItems();
    }

    // Evento para adicionar itens ao carrinho
    const addToCartButtons = document.querySelectorAll('.adicionar-carrinho');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = {
                name: button.dataset.name, // Nome do produto
                price: parseFloat(button.dataset.price) // Preço do produto
            };
            addToCart(item);
        });
    });
});
