// variaveis, array e objetos

const products = [
    {
        id: 1,
        title: "Smartphone Samsung Galaxy A54",
        price: 1899.99,
        discount: 15,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop"
    },
    {
        id: 2,
        title: "Notebook Lenovo IdeaPad",
        price: 2999.90,
        discount: 20,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop"
    },
    {
        id: 3,
        title: "Smart TV LG 50 4K",
        price: 2299.00,
        discount: 10,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop"
    },
    {
        id: 4,
        title: "Tênis Nike Air Max",
        price: 399.99,
        discount: 25,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
        id: 5,
        title: "Fone JBL Bluetooth",
        price: 199.90,
        discount: 30,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
        id: 6,
        title: "Cadeira Gamer ThunderX3",
        price: 899.00,
        discount: 18,
        image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop"
    },
    {
        id: 7,
        title: "Console PlayStation 5",
        price: 3999.99,
        discount: 5,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop"
    },
    {
        id: 8,
        title: "Apple Watch Series 8",
        price: 2899.00,
        discount: 12,
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop"
    },
    {
        id: 9,
        title: "Tablet Samsung Galaxy Tab",
        price: 2199.90,
        discount: 15,
        image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop"
    },
    {
        id: 10,
        title: "Câmera Canon EOS Rebel",
        price: 2699.00,
        discount: 8,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop"
    },
    {
        id: 11,
        title: "Mouse Gamer Logitech",
        price: 249.90,
        discount: 20,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop"
    },
    {
        id: 12,
        title: "Teclado Mecânico RGB",
        price: 449.90,
        discount: 22,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop"
    },
    {
        id: 13,
        title: "Liquidificador Osterizer Clássico",
        price: 299.90,
        discount: 10,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_845279-MLB89861330643_082025-F.webp"
    },
    {
        id: 14,
        title: "Aspirador de Pó Robô Multilaser",
        price: 799.00,
        discount: 15,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_769853-MLA96891531352_112025-F.webp"
    },
    {
        id: 15,
        title: "Máquina de Café Expresso Nespresso",
        price: 549.99,
        discount: 20,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_684928-MLA96137920565_102025-F.webp"
    }
];

function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    // Imagem
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.classList.add("product-image");

    // Título
    const title = document.createElement("h3");
    title.textContent = product.title;
    title.classList.add("product-title");

    // Preço
    const price = document.createElement("div");
    price.textContent = `R$ ${product.price}`;
    price.classList.add("product-price");

    // Desconto
    const discount = document.createElement("div");
    discount.textContent = `${product.discount}% OFF`;
    discount.classList.add("product-discount");

    // Montagem do card
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(discount);

    return card;
}




function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = ''; // Limpa o grid antes de renderizar
    products.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
}


document.addEventListener('DOMContentLoaded', ()=>{
    renderProducts(products);
})

function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(searchTerm);
    });
    renderProducts(filteredProducts);
}

// Adicionar event listeners para a pesquisa
document.addEventListener('DOMContentLoaded', () => {
    // A função renderProducts(products) já está sendo chamada no DOMContentLoaded
    
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('search-btn');

    // Pesquisa ao digitar
    searchInput.addEventListener('input', searchProducts);

    // Pesquisa ao clicar no botão (opcional, mas bom para consistência)
    searchButton.addEventListener('click', searchProducts);
});
