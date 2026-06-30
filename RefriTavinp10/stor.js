const products = [
  {
    id: 1,
    title: "STRAWBERRY SODA",
    price: 10.98,
    discount: 15,
    image: "./arquivos img/morango.png"
  },
  {
    id: 2,
    title: "AVOCADO SODA",
    price: 10.98,
    discount: 20,
    image: "./arquivos img/abacate.png"
  },
  {
    id: 3,
    title: "ORANGE SODA",
    price: 10.98,
    discount: 10,
    image: "./arquivos img/laranja.png"
  }
];

// =======================
// LocalStorage Helpers
// =======================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// =======================
// Criar Card
// =======================
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  img.className = "product-image";

  const title = document.createElement("h3");
  title.textContent = product.title;
  title.className = "product-title";

  const price = document.createElement("div");
  price.textContent = `R$ ${product.price.toFixed(2).replace(".", ",")}`;
  price.className = "product-price";

  const discount = document.createElement("div");
  discount.textContent = `${product.discount}% OFF`;
  discount.className = "product-discount";

  const buyBtn = document.createElement("button");
  buyBtn.textContent = "Comprar agora";
  buyBtn.className = "buy-btn";

  buyBtn.addEventListener("click", () => {
    addToCart(product);
  });

  card.append(img, title, price, discount, buyBtn);
  return card;
}

// =======================
// Carrinho
// =======================
function addToCart(product) {
  const cart = getCart();

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart(cart);

  showToast(`"${product.title}" foi adicionado ao carrinho! 🛒`);
}

function getToastContainer() {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  return container;
}

function showToast(message, type = "success") {
  const container = getToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast-notification ${type}`;
  toast.innerHTML = `<span class="toast-icon">✔️</span><span>${message}</span>`;

  container.appendChild(toast);

  window.requestAnimationFrame(() => {
    toast.classList.add("visible");
  });

  setTimeout(() => {
    toast.classList.remove("visible");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    }, { once: true });
  }, 2800);
}

// =======================
// Render
// =======================
function renderProducts(list) {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = "";

  list.forEach(p => grid.appendChild(createProductCard(p)));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
});

