/*
  MI DULCE MOMENTO
  Editá los productos, precios y datos de contacto en este archivo.
  Las rutas de imágenes son relativas a la carpeta principal del sitio.
*/

const WHATSAPP_NUMBER = "5490000000000"; // Reemplazar por el número real, con código de país y sin + ni espacios.
const INSTAGRAM_URL = "https://instagram.com/"; // Reemplazar por el perfil real.
const EMAIL_ADDRESS = "micorreo@ejemplo.com"; // Reemplazar por el correo real.

const products = [
  {
    id: 1,
    name: "Alfajor chocolate y café",
    category: "alfajores",
    description: "Chocolate intenso con un toque de café.",
    price: 0,
    priceLabel: "Consultar precio",
    image: "img/productos/alfajor-chocolate-cafe.jpg",
    badge: "Favorito"
  },
  {
    id: 2,
    name: "Alfajor clásico",
    category: "alfajores",
    description: "Una combinación clásica para cualquier momento.",
    price: 0,
    priceLabel: "Consultar precio",
    image: "img/productos/alfajor-clasico.jpg",
    badge: ""
  },
  {
    id: 3,
    name: "Torta personalizada",
    category: "tortas",
    description: "Una torta especial para celebrar a tu manera.",
    price: 0,
    priceLabel: "Consultar precio",
    image: "img/productos/torta-personalizada.jpg",
    badge: "Por encargo"
  },
  {
    id: 4,
    name: "Selva negra",
    category: "tortas",
    description: "Una opción clásica para compartir en buena compañía.",
    price: 0,
    priceLabel: "Consultar precio",
    image: "img/productos/selva-negra.jpg",
    badge: ""
  },
  {
    id: 5,
    name: "Porción dulce",
    category: "porciones",
    description: "Un gustito dulce para acompañar tu día.",
    price: 0,
    priceLabel: "Consultar precio",
    image: "img/productos/porcion-dulce.jpg",
    badge: ""
  },
  {
    id: 6,
    name: "Bizcochuelo",
    category: "tortas",
    description: "Ideal para una merienda o para compartir.",
    price: 0,
    priceLabel: "Consultar precio",
    image: "img/productos/bizcochuelo.jpg",
    badge: ""
  },
  {
    id: 7,
    name: "Caja de alfajores",
    category: "alfajores",
    description: "Un detalle dulce para regalar o llevar a una reunión.",
    price: 0,
    priceLabel: "Consultar precio",
    image: "img/productos/caja-alfajores.jpg",
    badge: "Para regalar"
  },
  {
    id: 8,
    name: "Porción de torta",
    category: "porciones",
    description: "Tu torta favorita, en una porción para disfrutar.",
    price: 0,
    priceLabel: "Consultar precio",
    image: "img/productos/porcion-torta.jpg",
    badge: ""
  }
];

const productGrid = document.querySelector("#product-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const cart = new Map();

function formatPrice(product) {
  if (typeof product.price === "number" && product.price > 0) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0
    }).format(product.price);
  }
  return product.priceLabel || "Consultar precio";
}

function renderProducts(filter = "todos") {
  const visibleProducts = filter === "todos"
    ? products
    : products.filter(product => product.category === filter);

  if (!visibleProducts.length) {
    productGrid.innerHTML = '<p class="empty-products">Pronto vamos a sumar más delicias.</p>';
    return;
  }

  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-photo">
        <img src="${product.image}" alt="${product.name}" loading="lazy"
          onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
      </div>
      <div class="product-info">
        <span class="product-meta">${categoryLabel(product.category)}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-bottom">
          <span class="product-price">${formatPrice(product)}</span>
          <button class="add-button" type="button" aria-label="Agregar ${product.name} al pedido" data-add="${product.id}">+</button>
        </div>
      </div>
    </article>
  `).join("");
}

function categoryLabel(category) {
  const labels = {
    alfajores: "Alfajores",
    tortas: "Tortas",
    porciones: "Porciones"
  };
  return labels[category] || category;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const product = products.find(item => item.id === Number(button.dataset.add));
  if (!product) return;
  cart.set(product.id, (cart.get(product.id) || 0) + 1);
  const quantity = cart.get(product.id);
  button.textContent = "✓";
  button.setAttribute("aria-label", `${product.name} agregado. Cantidad: ${quantity}`);
  window.setTimeout(() => {
    button.textContent = "+";
    button.setAttribute("aria-label", `Agregar ${product.name} al pedido`);
  }, 900);
  showOrderPrompt();
});

function showOrderPrompt() {
  let prompt = document.querySelector("#order-prompt");
  if (!prompt) {
    prompt = document.createElement("div");
    prompt.id = "order-prompt";
    prompt.className = "order-prompt";
    prompt.innerHTML = '<span id="order-count"></span><button type="button" id="send-order">Preparar pedido ↗</button><button type="button" id="clear-order" aria-label="Vaciar pedido">×</button>';
    document.body.appendChild(prompt);
    document.querySelector("#send-order").addEventListener("click", sendOrder);
    document.querySelector("#clear-order").addEventListener("click", () => {
      cart.clear();
      prompt.remove();
    });
  }
  const totalItems = [...cart.values()].reduce((sum, quantity) => sum + quantity, 0);
  document.querySelector("#order-count").textContent = `${totalItems} producto${totalItems === 1 ? "" : "s"} en tu pedido`;
}

function sendOrder() {
  if (cart.size === 0) return;
  const lines = [...cart.entries()].map(([id, quantity]) => {
    const product = products.find(item => item.id === id);
    return `• ${product.name} x ${quantity}`;
  });
  const message = `¡Hola! Quiero consultar por este pedido de Mi Dulce Momento:\n\n${lines.join("\n")}\n\n¿Me pasan disponibilidad y precio?`;
  openWhatsApp(message);
}

function openWhatsApp(message) {
  if (WHATSAPP_NUMBER === "5490000000000") {
    alert("Antes de recibir pedidos, agregá tu número real de WhatsApp en js/script.js (variable WHATSAPP_NUMBER).");
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelector("#contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("#nombre").value.trim();
  const topic = document.querySelector("#consulta").value;
  const message = document.querySelector("#mensaje").value.trim();
  const fullMessage = `¡Hola! Soy ${name}.\nConsulta: ${topic}.\n${message}`;
  openWhatsApp(fullMessage);
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#whatsapp-link").href = `https://wa.me/${WHATSAPP_NUMBER}`;
document.querySelector("#instagram-link").href = INSTAGRAM_URL;
document.querySelector("#email-link").href = `mailto:${EMAIL_ADDRESS}`;

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  });
});

renderProducts();
