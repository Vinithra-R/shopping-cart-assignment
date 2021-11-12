import Cart from "./cart.js";
import User from "./user.js";

export default class Header {
  constructor() {
    this.cart = new Cart();
    this.user = new User();
    this.isUserLoggedIn = User.getLoggedUser();
  }
  render() {
    let fragment = document.createElement("template"),
      parentElement = document.querySelector("#header"),
      template = this.getTemplate();

    fragment.innerHTML = template;
    parentElement.appendChild(fragment.content);
    this.cart.initialize();
    this.user.initialize();
  }
  getTemplate() {
    return `<section class="container">
        <div class="col col-6 left-menu">
        <h2 class="col-6">
            <a href="./index"><img src="images/logo.png" alt="Sabka Bazaar" /></a>
        </h2>
        <nav class="">
            <a href="./index" class="${
              window.location.pathname == "/" ? "active" : ""
            }">Home</a>
            <a href="./product" class="${
              window.location.pathname == "/product" ? "active" : ""
            }">Product</a>
        </nav>
        </div>
        <div class="col col-6 right-menu">
        <nav>
            ${
              this.isUserLoggedIn.length == 0
                ? `<a href="/login">SignIn</a>
            <a href="/register">Register</a>`
                : `<a href="#"><b>${this.isUserLoggedIn[0].firstName.toUpperCase()}</b></a>
                <a href="#" class="signout">SignOut</a>`
            }
        </nav>
        <div class="cart-item">
            <a href="#">
            <img src="images/cart.svg" alt="cart icon" width="32" height="32"/>
            <span><span class="cart-count">${
              this.cart.getCartItemsAndPrice().totalItem
            }</span> Items</span>
            </a>
        </div>
        </div>
    </section>`;
  }
}
