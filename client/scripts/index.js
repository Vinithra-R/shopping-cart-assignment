import Header from "./header.js";
import Footer from "./footer.js";
import Categories from "./categories.js";
import Banner from "./banner.js";
import Products from "./products.js";
import Cart from "./cart.js";
import User from "./user.js";

window.addEventListener("DOMContentLoaded", function () {
  loadHeader();
  if (document.querySelector(".cart-page") == null) {
    loadFooter();
  }
  if (document.querySelector(".home-page")) {
    loadBanner();
    loadCategories();
  }
  if (document.querySelector(".product-page")) loadProducts();
  if (document.querySelector(".cart-page")) loadCart();
  if (
    document.querySelector(".register-page") ||
    document.querySelector(".login-page")
  )
    loadUser();
});

function loadHeader() {
  let header = new Header();
  header.render();
}

function loadFooter() {
  let footer = new Footer();
  footer.render();
}

function loadCategories() {
  let categories = new Categories();
  categories.render();
}

function loadBanner() {
  let banner = new Banner();
  banner.render();
}

function loadProducts() {
  let products = new Products();
  products.render();
}

function loadCart() {
  let cart = new Cart();
  cart.renderCartItems(false);
}
function loadUser() {
  let user = new User();
  if (document.querySelector(".register-page")) user.renderRegister();
  if (document.querySelector(".login-page")) user.renderLogin();
}
