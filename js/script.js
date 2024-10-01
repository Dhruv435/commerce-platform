// script.js

// ==================== Initialization ====================

// Initialize Products in localStorage if not present
// Initialize product data into localStorage (run this once)
function initializeProducts() {
  if (!localStorage.getItem("products")) {
    const initialProducts = [
      {
        id: 1,
        name: "Nike Shoes",
        price: 2999,
        description: "Comfortable running shoes",
        image: "images/nike1.jpg",
        category: "fashion",
      },
      {
        id: 2,
        name: "Puma Shoes",
        price: 3499,
        description: "Stylish sports shoes",
        image: "images/puma1.jpg",
        category: "fashion",
      },
      {
        id: 3,
        name: "Sony Headphones",
        price: 1999,
        description: "Noise-cancelling headphones",
        image: "images/sony1.jpg",
        category: "electronics",
      },
      {
        id: 4,
        name: "iPhone 12",
        price: 69999,
        description: "Apple smartphone with A14 Bionic chip",
        image: "images/iphone12.jpg",
        category: "electronics",
      },
      {
        id: 5,
        name: "Bananas",
        price: 50,
        description: "Fresh bananas - 1 dozen",
        image: "images/bananas.jpg",
        category: "groceries",
      },
    ];
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }
}

// Function to render products to the main page
function displayProducts(products) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Clear previous products

  products.forEach((product) => {
    const productElement = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}" />
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: ₹${product.price}</p>
            </div>
        `;
    productContainer.innerHTML += productElement;
  });
}

// Function to filter products based on search and category
function filterProducts() {
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();
  const selectedCategory = document.getElementById("category-dropdown").value;

  const allProducts = JSON.parse(localStorage.getItem("products"));
  let filteredProducts = allProducts;

  // Filter by category if not 'all'
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  // Filter by search term
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Display the filtered products
  displayProducts(filteredProducts);
}

// Function to display products
function displayProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear previous products

  if (products.length === 0) {
    productList.innerHTML = "<p>No products found</p>";
    return;
  }

  products.forEach((product) => {
    const productItem = `
      <div class="product-item">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: ₹${product.price}</p>
      </div>
    `;
    productList.innerHTML += productItem;
  });
}

// Initialize the page with all products on load
window.onload = function () {
  initializeProducts();
  const allProducts = JSON.parse(localStorage.getItem("products"));
  displayProducts(allProducts);
};
// style index page

const images = ["images/i2.png", "images/i3.png", "images/i4.png"];

let currentIndex = 0;
const imageElement = document.getElementById("rotating-image");

function changeImage() {
  currentIndex = (currentIndex + 1) % images.length;
  imageElement.src = images[currentIndex];
}

setInterval(changeImage, 3000);

// Array of image URLs
const imageList = ["images/i1.png", "images/i2.png", "images/i3.png"];

const imageElem = document.getElementById("changingImage");

let imgIndex = 0;

function switchImage() {
  imgIndex = (imgIndex + 1) % imageList.length;
  imageElem.src = imageList[imgIndex];
}

setInterval(switchImage, 4000);

// Array of image URLs for the second set
const imageGroup = ["images/i1.png", "images/i2.png", "images/i3.png"];

const secondImageElem = document.getElementById("changingImage2");

let secondImgIndex = 0;

function changeImageSet() {
  secondImgIndex = (secondImgIndex + 1) % imageGroup.length;
  secondImageElem.src = imageGroup[secondImgIndex];
}

setInterval(changeImageSet, 3000);

// end style index page

// Initialize Orders in localStorage if not present
function initializeOrders() {
  if (!localStorage.getItem("allOrders")) {
    localStorage.setItem("allOrders", JSON.stringify([]));
  }
}

// Load products onto the homepage
function loadProducts(filteredProducts = null) {
  const container = document.getElementById("products-container");
  if (!container) return;
  container.innerHTML = ""; // Clear previous products

  const products =
    filteredProducts || JSON.parse(localStorage.getItem("products")) || [];

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: ₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

    container.appendChild(productDiv);
  });
}

// ==================== User Authentication ====================

// Handle User Sign Up
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("signup-username").value.trim();
      const password = document.getElementById("signup-password").value.trim();

      if (username === "admin") {
        alert(
          'Username "admin" is reserved. Please choose a different username.'
        );
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if username already exists
      const userExists = users.some((user) => user.username === username);
      if (userExists) {
        alert("Username already exists. Please choose another one.");
        return;
      }

      // Add new user
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Signup successful! Please sign in.");
      window.location.href = "signin.html";
    });
  }

  // Handle User Sign In
  const signinForm = document.getElementById("signin-form");
  if (signinForm) {
    signinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("signin-username").value.trim();
      const password = document.getElementById("signin-password").value.trim();

      // Fetch users from localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        localStorage.setItem("loggedInUser", username);
        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert("Invalid credentials. Please try again.");
      }
    });
  }

  // Handle Admin Sign In
  const adminSigninForm = document.getElementById("admin-signin-form");
  if (adminSigninForm) {
    adminSigninForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const adminUsername = document
        .getElementById("admin-username")
        .value.trim();
      const adminPassword = document
        .getElementById("admin-password")
        .value.trim();

      if (adminUsername === "admin" && adminPassword === "admin") {
        localStorage.setItem("adminLoggedIn", "true");
        alert("Admin login successful!");
        window.location.href = "admin_dashboard.html";
      } else {
        alert("Invalid admin credentials.");
      }
    });
  }
});

// Handle User Logout
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "signin.html";
}

// Handle Admin Logout
function logoutAdmin() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin_signin.html";
}

// ==================== Access Control ====================

// Enforce access control on protected pages
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  const userProtectedPages = [
    "user.html",
    "cart.html",
    "bag.html",
    "orders.html",
  ];
  const adminProtectedPages = [
    "admin_dashboard.html",
    "admin_add_product.html",
    "admin_view_orders.html",
  ];

  const loggedInUser = localStorage.getItem("loggedInUser");
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  // Redirect users trying to access admin pages without admin privileges
  if (adminProtectedPages.includes(currentPage) && !isAdminLoggedIn) {
    alert("Access denied. Please log in as admin.");
    window.location.href = "admin_signin.html";
  }

  // Redirect admins trying to access user pages without user privileges
  if (
    userProtectedPages.includes(currentPage) &&
    !loggedInUser &&
    !isAdminLoggedIn
  ) {
    alert("Access denied. Please log in as a user.");
    window.location.href = "signin.html";
  }

  // If a user is logged in, adjust navigation links accordingly
  if (loggedInUser) {
    // Hide Sign In and Sign Up links
    const signinLink = document.querySelector('a[href="signin.html"]');
    const signupLink = document.querySelector('a[href="signup.html"]');
    if (signinLink) signinLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";

    // Show Profile and Logout links
    const profileLink = document.querySelector('a[href="user.html"]');
    const logoutButton = document.createElement("a");
    logoutButton.href = "#";
    logoutButton.textContent = "Logout";
    logoutButton.style.cursor = "pointer";
    logoutButton.addEventListener("click");

    if (profileLink && !document.querySelector("#logout-user")) {
      profileLink.insertAdjacentElement("afterend", logoutButton);
      logoutButton.id = "logout-user";
    }
  }

  // If admin is logged in, adjust navigation links accordingly
  if (isAdminLoggedIn) {
    // Hide Admin Sign In link
    const adminSigninLink = document.querySelector(
      'a[href="admin_signin.html"]'
    );
    if (adminSigninLink) adminSigninLink.style.display = "none";

    // Show Admin Dashboard and Logout links
    const dashboardLink = document.querySelector(
      'a[href="admin_dashboard.html"]'
    );
    const logoutAdminButton = document.createElement("a");
    logoutAdminButton.href = "#";
    logoutAdminButton.textContent = "Admin Logout";
    logoutAdminButton.style.cursor = "pointer";
    logoutAdminButton.addEventListener("click");

    if (dashboardLink && !document.querySelector("#logout-admin")) {
      dashboardLink.insertAdjacentElement("afterend", logoutAdminButton);
      logoutAdminButton.id = "logout-admin";
    }
  }
});

// ==================== Products Management ====================

// Load products on page load
window.addEventListener("load", () => {
  if (document.getElementById("products-container")) {
    loadProducts();
  }

  if (document.getElementById("cart-table-body")) {
    loadCartProducts();
  }

  if (document.getElementById("user-bag-table")) {
    loadBagProducts();
  }

  if (document.getElementById("orders-table-body")) {
    loadOrders();
  }

  if (document.getElementById("admin-products-table")) {
    loadAdminProducts();
  }

  if (document.getElementById("admin-orders-table")) {
    loadAdminOrders();
  }
});

// Add product to cart (localStorage)
function addToCart(productId) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find((p) => p.id === productId);
  if (!product) {
    alert("Product not found!");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product is already in cart
  const exists = cart.some((item) => item.id === product.id);
  if (exists) {
    alert("Product is already in your cart.");
    return;
  }

  // Add product to cart
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${product.name} has been added to your cart.`);
}

// ==================== Cart Management ====================

// Load cart products in cart.html
function loadCartProducts() {
  const cartTableBody = document.querySelector("#cart-table-body");
  if (!cartTableBody) return;
  cartTableBody.innerHTML = ""; // Clear previous cart items

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((product) => {
    const row = document.createElement("tr");

    row.innerHTML = `
             <td><input type="checkbox" class="cart-checkbox" data-id="${product.id}"></td>
             <td><img src="${product.image}" alt="${product.name}" width="50"></td>
             <td>${product.name}</td>
             <td>${product.description}</td>
             <td>₹${product.price}</td>
             <td><button onclick="removeFromCart(${product.id})">Remove</button></td>
         `;

    cartTableBody.appendChild(row);
  });

  updateTotalPrice();
}

// Remove product from cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((p) => p.id !== productId); // Remove product
  localStorage.setItem("cart", JSON.stringify(cart)); // Update cart

  loadCartProducts(); // Reload cart
}

// Update total price
function updateTotalPrice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalPriceElement = document.getElementById("total-price");

  const total = cart.reduce((sum, product) => sum + product.price, 0);
  if (totalPriceElement) {
    totalPriceElement.textContent = `₹${total}`;
  }
}

// Move selected products to bag.html
function moveToBag() {
  const selectedCheckboxes = document.querySelectorAll(
    ".cart-checkbox:checked"
  );
  if (selectedCheckboxes.length === 0) {
    alert("Please select at least one product to move to the bag.");
    return;
  }

  const selectedProducts = [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  selectedCheckboxes.forEach((checkbox) => {
    const productId = parseInt(checkbox.getAttribute("data-id"));
    const product = cart.find((p) => p.id === productId);
    if (product) {
      selectedProducts.push(product);
    }
  });

  // Save selected products to session storage for bag.html
  sessionStorage.setItem("bagProducts", JSON.stringify(selectedProducts));

  window.location.href = "bag.html"; // Navigate to bag
}

// ==================== Bag Management ====================

// Load products in bag.html
// Load products in bag.html
function loadBagProducts() {
  const bagTableBody = document.querySelector("#user-bag-table tbody");
  if (!bagTableBody) return;
  bagTableBody.innerHTML = ""; // Clear previous bag items

  const bagProducts = JSON.parse(sessionStorage.getItem("bagProducts")) || [];

  bagProducts.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" width="50"></td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>₹${product.price}</td>
            <td><button onclick="removeFromBag(${product.id})">Remove</button></td>
        `;
    bagTableBody.appendChild(row);
  });
}

// Confirm order and save to local storage
function confirmOrder() {
  const bagProducts = JSON.parse(sessionStorage.getItem("bagProducts")) || [];

  if (bagProducts.length === 0) {
    alert("Your bag is empty!");
    return;
  }

  // Get customer details
  const customerName = document.getElementById("customer-name").value.trim();
  const customerCity = document.getElementById("customer-city").value.trim();
  const customerPin = document.getElementById("customer-pin").value.trim();
  const customerAddress = document
    .getElementById("customer-address")
    .value.trim();
  const customerMobile = document
    .getElementById("customer-mobile")
    .value.trim();

  if (
    !customerName ||
    !customerCity ||
    !customerPin ||
    !customerAddress ||
    !customerMobile
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // Prepare orders data
  const orderDate = new Date().toLocaleString(); // Current date and time
  const orderDay = new Date().toLocaleString("en-US", { weekday: "long" }); // Current day

  const orders = bagProducts.map((product) => ({
    image: product.image,
    name: product.name,
    description: product.description,
    price: product.price,
    date: orderDate,
    day: orderDay,
    customerName,
    city: customerCity,
    pinCode: customerPin,
    address: customerAddress,
    mobileNumber: customerMobile,
  }));

  // Save orders to localStorage for user and admin
  let userOrders = JSON.parse(localStorage.getItem("orders")) || [];
  let allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];

  userOrders = userOrders.concat(orders);
  allOrders = allOrders.concat(orders);

  localStorage.setItem("orders", JSON.stringify(userOrders));
  localStorage.setItem("allOrders", JSON.stringify(allOrders));

  // Clear bag
  sessionStorage.removeItem("bagProducts");

  alert("Order confirmed!");

  // Redirect to orders.html
  window.location.href = "orders.html";
}

// Load confirmed orders from localStorage for user
function loadUserOrders() {
  const ordersTableBody = document.querySelector("#orders-table-body");
  if (!ordersTableBody) return;

  const confirmedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  if (confirmedOrders.length > 0) {
    ordersTableBody.innerHTML = ""; // Clear previous rows

    confirmedOrders.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>₹${item.price}</td>
                <td>${item.date}</td>
                <td>${item.day}</td>
            `;
      ordersTableBody.appendChild(row);
    });
  } else {
    ordersTableBody.innerHTML = '<tr><td colspan="6">No orders found</td></tr>';
  }
}

// Load orders in admin_view_orders.html
function loadAdminOrders() {
  const adminOrdersTableBody = document.querySelector(
    "#admin-orders-table tbody"
  );
  if (!adminOrdersTableBody) return;
  adminOrdersTableBody.innerHTML = ""; // Clear previous rows

  const allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];

  if (allOrders.length > 0) {
    allOrders.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>₹${item.price}</td>
                <td>${item.date}</td>
                <td>${item.day}</td>
                <td>${item.customerName}</td> <!-- Customer Name -->
                <td>${item.city}</td> <!-- City -->
                <td>${item.pinCode}</td> <!-- Pin Code -->
                <td>${item.address}</td> <!-- Address -->
                <td>${item.mobileNumber}</td> <!-- Mobile Number -->
            `;
      adminOrdersTableBody.appendChild(row);
    });
  } else {
    adminOrdersTableBody.innerHTML =
      '<tr><td colspan="11">No orders found</td></tr>'; // Adjust column count based on new fields
  }
}

// Clear session storage when leaving bag page
window.addEventListener("beforeunload", function () {
  if (window.location.pathname.endsWith("bag.html")) {
    sessionStorage.removeItem("bagProducts"); // Clear bag products on exit
  }
});

// Load confirmed orders from localStorage for user
function loadUserOrders() {
  const ordersTableBody = document.querySelector("#orders-table-body");
  if (!ordersTableBody) return;

  const confirmedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  if (confirmedOrders.length > 0) {
    ordersTableBody.innerHTML = ""; // Clear previous rows

    confirmedOrders.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>₹${item.price}</td>
                <td>${item.date}</td>
                <td>${item.day}</td>
            `;
      ordersTableBody.appendChild(row);
    });
  } else {
    ordersTableBody.innerHTML = '<tr><td colspan="6">No orders found</td></tr>';
  }
}

// Call this function when the page loads
window.onload = loadUserOrders;

// ==================== Admin Dashboard ====================

// Load products in admin_dashboard.html
function loadAdminProducts() {
  const adminProductsTableBody = document.querySelector(
    "#admin-products-table tbody"
  );
  if (!adminProductsTableBody) return;
  adminProductsTableBody.innerHTML = ""; // Clear previous rows

  const products = JSON.parse(localStorage.getItem("products")) || [];

  products.forEach((product) => {
    const row = document.createElement("tr");

    row.innerHTML = `
             <td>${product.id}</td>
             <td><img src="${product.image}" alt="${product.name}" width="50"></td>
             <td>${product.name}</td>
             <td>${product.description}</td>
             <td>₹${product.price}</td>
             <td><button onclick="deleteProduct(${product.id})">Delete</button></td>
         `;

    adminProductsTableBody.appendChild(row);
  });
}

// Delete product from admin dashboard
function deleteProduct(productId) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.filter((p) => p.id !== productId); // Remove product
  localStorage.setItem("products", JSON.stringify(products)); // Update products

  // Reload admin products
  loadAdminProducts();

  // Also reload products on the homepage if open
  // Note: This requires the homepage to handle real-time updates or refresh
  alert("Product deleted successfully.");
}

// ==================== Admin Add Product ====================

// Handle adding new product
document.addEventListener("DOMContentLoaded", () => {
  const addProductForm = document.getElementById("add-product-form");
  if (addProductForm) {
    addProductForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("product-name").value.trim();
      const price = parseFloat(
        document.getElementById("product-price").value.trim()
      );
      const description = document
        .getElementById("product-description")
        .value.trim();
      const category = document.getElementById("product-category").value;

      const imageInput = document.getElementById("product-image");
      const file = imageInput.files[0];

      if (!name || !price || !description || !file) {
        alert("Please fill in all fields.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (event) {
        const image = event.target.result;

        let products = JSON.parse(localStorage.getItem("products")) || [];

        // Generate new ID
        const newId =
          products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const newProduct = {
          id: newId,
          name,
          price,
          description,
          image, // Using the file data as the image
          category,
        };

        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));

        alert("Product added successfully!");
        addProductForm.reset();
      };

      // Read the uploaded file
      reader.readAsDataURL(file);
    });
  }
});

// ==================== Admin View Orders ====================

// ==================== Orders Page ====================

// Load orders in orders.html (User's Orders)
function loadUserOrders() {
  const ordersTableBody = document.querySelector("#orders-table-body");
  if (!ordersTableBody) return;

  const confirmedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  if (confirmedOrders.length > 0) {
    ordersTableBody.innerHTML = ""; // Clear previous rows

    confirmedOrders.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>₹${item.price}</td>
                <td>${item.date}</td>
                <td>${item.day}</td>
            `;
      ordersTableBody.appendChild(row);
    });
  } else {
    ordersTableBody.innerHTML = '<tr><td colspan="6">No orders found</td></tr>';
  }
}

// ==================== Products Filtering (Optional) ====================

// Example: Filter products by category (You can expand this as needed)
function filterProducts(category) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  if (category === "all") {
    loadProducts();
  } else {
    const filtered = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
    loadProducts(filtered);
  }
}

// ==================== Helper Functions ====================

// Function to check if a user is logged in
function isUserLoggedIn() {
  return localStorage.getItem("loggedInUser") !== null;
}

// Function to check if admin is logged in
function isAdminLoggedIn() {
  return localStorage.getItem("adminLoggedIn") === "true";
}

// Initialize Products and Orders on First Load
initializeProducts();
initializeOrders();

// ==================== Orders Page ====================

// Load orders in orders.html (User's Orders)
function loadUserOrders() {
  const ordersTableBody = document.querySelector("#orders-table-body");
  if (!ordersTableBody) return;

  const confirmedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  if (confirmedOrders.length > 0) {
    ordersTableBody.innerHTML = ""; // Clear previous rows

    confirmedOrders.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>₹${item.price}</td>
                <td>${item.date}</td>
                <td>${item.day}</td>
            `;
      ordersTableBody.appendChild(row);
    });
  } else {
    ordersTableBody.innerHTML = '<tr><td colspan="6">No orders found</td></tr>';
  }
}

// ==================== Products Filtering (Optional) ====================

// Example: Filter products by category (You can expand this as needed)
function filterProducts(category) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  if (category === "all") {
    loadProducts();
  } else {
    const filtered = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
    loadProducts(filtered);
  }
}
// ==================== Helper Functions ====================

// Function to check if a user is logged in
function isUserLoggedIn() {
  return localStorage.getItem("loggedInUser") !== null;
}

// Function to check if admin is logged in
function isAdminLoggedIn() {
  return localStorage.getItem("adminLoggedIn") === "true";
}

// Initialize Products and Orders on First Load
initializeProducts();
initializeOrders();
// ==================== Initialization ====================

// Initialize User Data in localStorage if not present
function initializeUserData() {
  if (!localStorage.getItem("userData")) {
    const defaultUserData = {
      username: "User", // This should be set during sign-in
      profileImage: "default-profile.png", // Default profile image
      address: "",
      mobileNumber: "",
      email: "",
      city: "",
    };
    localStorage.setItem("userData", JSON.stringify(defaultUserData));
  }
}

// Call initialization on first load
initializeUserData();

// ==================== Load User Data ====================

function loadUserData() {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  // Set Profile Image
  const profileImage = document.getElementById("profile-image");
  if (profileImage) {
    profileImage.src = userData.profileImage || "default-profile.png";
  }

  // Set Username
  const usernameDisplay = document.getElementById("username-display");
  if (usernameDisplay) {
    usernameDisplay.textContent = userData.username || "Username";
  }

  // Populate Form Fields
  document.getElementById("address").value = userData.address || "";
  document.getElementById("mobile-number").value = userData.mobileNumber || "";
  document.getElementById("email").value = userData.email || "";
  document.getElementById("city").value = userData.city || "";
}

// ==================== Handle Profile Image Upload ====================

function handleProfileImageUpload() {
  const changeImageBtn = document.getElementById("change-image-btn");
  const profileImageInput = document.getElementById("profile-image-input");
  const profileImage = document.getElementById("profile-image");

  // Trigger file input when Change Image button is clicked
  if (changeImageBtn && profileImageInput) {
    changeImageBtn.addEventListener("click", () => {
      profileImageInput.click();
    });
  }

  // Handle image file selection
  if (profileImageInput && profileImage) {
    profileImageInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profileImage.src = e.target.result;
          saveProfileImage(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file.");
      }
    });
  }
}

// Save Profile Image to localStorage
function saveProfileImage(imageData) {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  userData.profileImage = imageData;
  localStorage.setItem("userData", JSON.stringify(userData));
}

// ==================== Handle Save and Edit Functionality ====================

function handleSaveAndEdit() {
  const saveBtn = document.getElementById("save-btn");
  const editBtn = document.getElementById("edit-btn");
  const formFields = document.querySelectorAll(
    "#user-details-form input, #user-details-form textarea"
  );

  // Initially, fields are editable and Edit button is hidden
  setFieldsEditable(true);
  editBtn.style.display = "none";

  // Save Button Click
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      // Validate Form Fields
      let isValid = true;
      formFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
        }
      });

      if (!isValid) {
        alert("Please fill in all fields.");
        return;
      }

      // Save Data to localStorage
      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      userData.address = document.getElementById("address").value.trim();
      userData.mobileNumber = document
        .getElementById("mobile-number")
        .value.trim();
      userData.email = document.getElementById("email").value.trim();
      userData.city = document.getElementById("city").value.trim();
      // Assume username and profileImage are already set

      localStorage.setItem("userData", JSON.stringify(userData));

      // Disable Fields and Show Edit Button
      setFieldsEditable(false);
      saveBtn.style.display = "none";
      editBtn.style.display = "inline-block";

      alert("Details saved successfully!");
    });
  }

  // Edit Button Click
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      setFieldsEditable(true);
      saveBtn.style.display = "inline-block";
      editBtn.style.display = "none";
    });
  }

  // Function to enable or disable form fields
  function setFieldsEditable(isEditable) {
    formFields.forEach((field) => {
      field.disabled = !isEditable;
    });

    // If editable, show Change Image button; else hide it
    const changeImageBtn = document.getElementById("change-image-btn");
    if (changeImageBtn) {
      changeImageBtn.style.display = isEditable ? "inline-block" : "none";
    }
  }
}

// ==================== Handle Additional Information Sections ====================

// This part can be customized based on how you want to handle these sections.
// For demonstration, we'll add click event listeners to each info-item.

function handleAdditionalInfo() {
  const infoItems = document.querySelectorAll(".info-item");

  infoItems.forEach((item) => {
    item.addEventListener("click", () => {
      alert(`You clicked on ${item.textContent}`);
      // Implement further functionality as needed
    });
  });
}

// ==================== Initialize All Functions ====================

document.addEventListener("DOMContentLoaded", () => {
  loadUserData();
  handleProfileImageUpload();
  handleSaveAndEdit();
  handleAdditionalInfo();
});
// ==================== Load Users ====================

function loadUsers() {
  const usersTableBody = document.querySelector(
    "#admin-user-details-table tbody"
  );
  if (!usersTableBody) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length === 0) {
    usersTableBody.innerHTML = '<tr><td colspan="5">No users found.</td></tr>';
    return;
  }

  users.forEach((user) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td><img src="${user.profileImage}" alt="${user.username}"></td>
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>${user.lastLogin
        ? new Date(user.lastLogin).toLocaleString()
        : "Never"
      }</td>
            <td class="actions">
                <button class="delete-btn" onclick="deleteUser(${user.id
      })">Delete</button>
            </td>
        `;

    usersTableBody.appendChild(row);
  });
}

// ==================== Delete User ====================

function deleteUser(userId) {
  if (
    !confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    )
  ) {
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter((user) => user.id !== userId);
  localStorage.setItem("users", JSON.stringify(users));

  alert("User account deleted successfully.");

  // Reload users to reflect changes
  loadUsers();
}

// ==================== Initialize ====================

document.addEventListener("DOMContentLoaded", () => {
  loadUsers();
});

// Function to handle button clicks
function handleButtonClick(event, targetUrl) {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    event.preventDefault(); // Prevent the default link action
    alert(
      "You need to be signed in to access this feature. Redirecting to sign in page..."
    );
    window.location.href = "signin.html"; // Redirect to the sign-in page
  } else {
    // User is logged in, allow the default link action
    window.location.href = targetUrl; // Navigate to the intended page
  }
}




function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.classList.toggle("show"); // Toggle between showing and hiding the dropdown
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropdown-toggle')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
