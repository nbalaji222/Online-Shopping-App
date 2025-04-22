// Element refernces
const productsContainer = document.getElementById("products-container");
const cartContainer = document.getElementById("cart-container");
const feadbackElement = document.getElementById("feadback");
const totalPriceElement = document.getElementById("total-price");
const clearCartBtn = document.getElementById("clear-cart");
const sortByPriceBtn = document.getElementById("sort-by-price");

// Default products
let products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
  },
  {
    id: 3,
    name: "Tablet",
    price: 5000,
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 1000,
  },
  {
    id: 5,
    name: "Headphones",
    price: 500,
  },
];

// Empty cart
const cart = [];

// Used to reset the timer(user feadback)
let timerId;

clearCartBtn.addEventListener("click", clearCart);

sortByPriceBtn.addEventListener("click", sortByPrice);

function clearCart() {
  cart.length = 0;
  renderCartDetails();
  updateUserFeadback("Cart is cleared", "success");
}

function sortByPrice() {
  cart.sort(function (product1, product2) {
    return product1.price - product2.price;
  });
  renderCartDetails();
}

function renderProductDetails() {
  products.forEach(function (product) {
    //   <div class="product-row">
    //   <p>Laptop - Rs. 50000</p>
    //   <button>add to cart</button>
    // </div>
    // let { id, name, price } = product;
    // let productRow = `
    // <div class="product-row">
    // <p>${name} - Rs. ${price}</p>
    // <button>add to cart</button>
    // </div>
    // `;
    // productsContainer.insertAdjacentHTML("beforeend", productRow);

    let { id, name, price } = product;

    let divElement = document.createElement("div");
    divElement.className = "product-row";
    divElement.innerHTML = `
     <p>${product.name} - Rs. ${product.price}</p>
     <button onclick="addToCart(${id})">add to cart</button>
    `;
    productsContainer.appendChild(divElement);
  });
}

function renderCartDetails() {
  cartContainer.innerHTML = "";
  cart.forEach(function (product) {
    const { id, name, price } = product;
    let cartItemRow = `
    <div class="product-row">
    <p>${name} - Rs. ${price}</p>
    <button onclick="removeFromToCart(${id})">Remove</button>
    </div>`;
    cartContainer.insertAdjacentHTML("beforeend", cartItemRow);
  });

  // let totalPrice = 0;
  // for (let i = 0; i < cart.length; i++) {
  //   totalPrice = totalPrice + cart[i].price;
  // }
  const totalPrice = cart.reduce(function (acc, curProduct) {
    return acc + curProduct.price;
  }, 0);
  totalPriceElement.textContent = `Rs. ${totalPrice}`;
}

// Add to cart
function addToCart(productId) {
  const isProductAvailable = cart.some(function (product) {
    return product.id === productId;
  });
  if (isProductAvailable) {
    const productToAdd = products.find(function (product) {
      return product.id === productId;
    });
    // feadbackElement.textContent = `${productToAdd.name} is already added to the cart`;
    updateUserFeadback(
      `${productToAdd.name} is already added to the cart`,
      "error"
    );
    return;
  }
  console.log("clicked", productId);
  const productToAdd = products.find(function (product) {
    return product.id === productId;
  });
  console.log(productToAdd);
  cart.push(productToAdd);
  console.log(cart);
  renderCartDetails();

  // feadbackElement.textContent = `${name} is added to the cart`;
  updateUserFeadback(`${productToAdd.name} is added to the cart`, "success");
}

function removeFromToCart(id) {
  console.log(id);
  const product = cart.find((product) => product.id === id);
  // const updatedCart = cart.filter(function (product) {
  //   return product.id !== id;
  // });
  const productIndex = cart.findIndex(function (product) {
    return product.id === id;
  });
  cart.splice(productIndex, 1);
  updateUserFeadback(`${product.name} is removed from the cart`, "error");
  renderCartDetails();
  // console.log(updatedCart);
}

function updateUserFeadback(msg, type) {
  clearInterval(timerId);
  feadbackElement.style.display = "block";
  feadbackElement.textContent = msg;
  if (type == "success") {
    feadbackElement.style.backgroundColor = "green";
  }
  if (type == "error") {
    feadbackElement.style.backgroundColor = "red";
  }
  timerId = setTimeout(function () {
    feadbackElement.style.display = "none";
  }, 3000);
}

// Rendering products
renderProductDetails();
