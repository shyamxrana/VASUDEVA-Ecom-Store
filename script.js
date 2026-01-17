// Product Data
const products = [
  {
    id: 1,
    name: "Heritage Silk Kurta",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "men",
    badge: "Bestseller",
    rating: 4.5,
    description: "Handcrafted silk kurta with traditional embroidery.",
  },
  {
    id: 2,
    name: "Embroidered Chiffon Saree",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "women",
    badge: "Bestseller",
    rating: 5,
    description: "Elegant chiffon saree with intricate zari work.",
  },
  {
    id: 3,
    name: "Designer Sherwani",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "men",
    badge: "Limited",
    rating: 4,
    description: "Royal sherwani with hand-embellished motifs.",
  },
  {
    id: 4,
    name: "Heritage Print Dress",
    price: 159,
    image:
      "https://i.pinimg.com/736x/7e/91/9e/7e919ecddbb24f851166d31c0b079fc0.jpg",
    category: "women",
    badge: "New",
    rating: 4.5,
    description: "Contemporary dress with traditional block prints.",
  },
  {
    id: 5,
    name: "Cotton Nehru Jacket",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "men",
    badge: "Popular",
    rating: 4,
    description: "Lightweight cotton jacket with mandarin collar.",
  },
  {
    id: 6,
    name: "Silk Anarkali Suit",
    price: 279,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "women",
    badge: "Bestseller",
    rating: 5,
    description: "Flowy Anarkali suit with delicate embroidery.",
  },
  {
    id: 7,
    name: "Linen Kurta Set",
    price: 149,
    image:
      "https://i.pinimg.com/736x/97/3c/63/973c63421a8805612d790ad1a64cf5d9.jpg",
    category: "men",
    badge: "Eco",
    rating: 4.5,
    description: "Sustainable linen kurta with matching trousers.",
  },
  {
    id: 8,
    name: "Banarasi Silk Lehenga",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "women",
    badge: "Premium",
    rating: 5,
    description: "Luxurious Banarasi silk lehenga for special occasions.",
  },
];

// Cart State
let cart = JSON.parse(localStorage.getItem("vasudeva_cart")) || [];

// DOM Elements
const cartModal = document.getElementById("cartModal");
const overlay = document.getElementById("overlay");
const cartIcon = document.getElementById("cartIcon");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartFooter = document.getElementById("cartFooter");
const emptyCart = document.getElementById("emptyCart");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const notification = document.getElementById("notification");
const notificationText = document.getElementById("notification-text");
const productGrid = document.getElementById("productGrid");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProducts();
  renderCartItems();

  // Mobile menu toggle
  document.querySelector(".hamburger").addEventListener("click", () => {
    const navLinks = document.querySelector(".nav-links");
    const headerIcons = document.querySelector(".header-icons");

    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
      headerIcons.style.display = "none";
    } else {
      navLinks.style.display = "flex";
      headerIcons.style.display = "flex";

      // Adjust for mobile layout
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "100%";
      navLinks.style.left = "0";
      navLinks.style.width = "100%";
      navLinks.style.backgroundColor = "var(--primary-white)";
      navLinks.style.padding = "20px";
      navLinks.style.boxShadow = "0 5px 10px var(--shadow)";

      headerIcons.style.position = "absolute";
      headerIcons.style.top = "calc(100% + 180px)";
      headerIcons.style.left = "0";
      headerIcons.style.width = "100%";
      headerIcons.style.justifyContent = "center";
      headerIcons.style.backgroundColor = "var(--primary-white)";
      headerIcons.style.padding = "20px";
      headerIcons.style.boxShadow = "0 5px 10px var(--shadow)";
    }
  });

  // Cart toggle
  cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    openCart();
  });

  closeCart.addEventListener("click", () => {
    closeCartModal();
  });

  overlay.addEventListener("click", () => {
    closeCartModal();
  });

  // Newsletter form
  document.getElementById("newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.querySelector(".newsletter-input").value;
    showNotification(`Thank you for subscribing with ${email}!`);
    e.target.reset();
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navLinks = document.querySelector(".nav-links");
        const headerIcons = document.querySelector(".header-icons");

        if (window.innerWidth <= 768) {
          navLinks.style.display = "none";
          headerIcons.style.display = "none";
        }
      }
    });
  });
});

// Render Products
function renderProducts() {
  productGrid.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.dataset.id = product.id;

    const ratingStars = getRatingStars(product.rating);

    productCard.innerHTML = `
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.name}">
                        ${
                          product.badge
                            ? `<div class="product-badge">${product.badge}</div>`
                            : ""
                        }
                        <div class="product-actions">
                            <button class="action-btn wishlist-btn" data-id="${
                              product.id
                            }">
                                <i class="far fa-heart"></i>
                            </button>
                            <button class="action-btn view-btn" data-id="${
                              product.id
                            }">
                                <i class="far fa-eye"></i>
                            </button>
                        </div>
                        <button class="quick-add" data-id="${
                          product.id
                        }">Add to Cart</button>
                    </div>
                    <div class="product-content">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">$${product.price}</div>
                        <div class="product-rating">
                            ${ratingStars}
                        </div>
                    </div>
                `;

    productGrid.appendChild(productCard);
  });

  // Add event listeners to Add to Cart buttons
  document.querySelectorAll(".quick-add").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      addToCart(productId);
    });
  });

  // Add event listeners to wishlist buttons
  document.querySelectorAll(".wishlist-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.closest("button").dataset.id);
      toggleWishlist(productId);
    });
  });
}

// Get Rating Stars
function getRatingStars(rating) {
  let stars = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

// Cart Functions
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  if (!product) return;

  // Check if product already in cart
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  // Update localStorage
  localStorage.setItem("vasudeva_cart", JSON.stringify(cart));

  // Update UI
  updateCartCount();
  renderCartItems();
  showNotification(`${product.name} added to cart!`);

  // Open cart on mobile
  if (window.innerWidth <= 768) {
    openCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);

  // Update localStorage
  localStorage.setItem("vasudeva_cart", JSON.stringify(cart));

  // Update UI
  updateCartCount();
  renderCartItems();
  showNotification("Item removed from cart");
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    removeFromCart(productId);
    return;
  }

  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = newQuantity;

    // Update localStorage
    localStorage.setItem("vasudeva_cart", JSON.stringify(cart));

    // Update UI
    updateCartCount();
    renderCartItems();
  }
}

function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function renderCartItems() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartFooter.style.display = "none";
    return;
  }

  emptyCart.style.display = "none";
  cartFooter.style.display = "block";

  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <div class="cart-item-price">$${item.price}</div>
                        <div class="cart-item-controls">
                            <div class="quantity-controls">
                                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn increase" data-id="${item.id}">+</button>
                            </div>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;

    cartItems.appendChild(cartItem);
  });

  // Update total
  cartTotal.textContent = `$${total.toFixed(2)}`;

  // Add event listeners to cart controls
  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      const item = cart.find((item) => item.id === productId);
      if (item) {
        updateQuantity(productId, item.quantity - 1);
      }
    });
  });

  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      const item = cart.find((item) => item.id === productId);
      if (item) {
        updateQuantity(productId, item.quantity + 1);
      }
    });
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.closest("button").dataset.id);
      removeFromCart(productId);
    });
  });
}

function openCart() {
  cartModal.classList.add("open");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartModal() {
  cartModal.classList.remove("open");
  overlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

function showNotification(message) {
  notificationText.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

function toggleWishlist(productId) {
  // In a real application, this would connect to a backend
  showNotification("Added to wishlist");

  // Toggle heart icon
  const heartIcon = document.querySelector(
    `.wishlist-btn[data-id="${productId}"] i`
  );
  if (heartIcon.classList.contains("far")) {
    heartIcon.classList.remove("far");
    heartIcon.classList.add("fas");
    heartIcon.style.color = "var(--error)";
  } else {
    heartIcon.classList.remove("fas");
    heartIcon.classList.add("far");
    heartIcon.style.color = "";
  }
}

// Close cart with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cartModal.classList.contains("open")) {
    closeCartModal();
  }
});
