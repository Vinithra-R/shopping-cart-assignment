export default class Cart {
  constructor() {}
  initialize() {
    let self = this,
      productContainer = document.querySelector("#product"),
      cartContainer = document.querySelector(".cart-item");

    if (productContainer) {
      productContainer.addEventListener("click", function (e) {
        self.addCartItem(e);
      });
    }
    if (cartContainer) {
      cartContainer.addEventListener("click", function (e) {
        e.preventDefault();
        if (window.innerWidth > 768) {
          self.renderCartItems(true);
        } else {
          window.location.href = "/cart";
        }
      });
    }
  }

  async addCartItem(e) {
    if (window.localStorage) {
      if (e.target.classList.contains("buy-btn")) {
        let productId = e.target.getAttribute("data-product-id");
        let product = await this.fetchProducts(productId);

        if (localStorage.getItem(productId)) {
          let cartItem = JSON.parse(localStorage.getItem(productId));
          product[0].cartCount = cartItem.cartCount + 1; //add the cart item
        } else {
          product[0].cartCount = 1; // initial value
        }
        localStorage.setItem(productId, JSON.stringify(product[0]));
        if (window.innerWidth > 768) {
          this.renderCartItems(true);
        } else {
          window.location.href = "/cart";
        }
      } else if (
        e.target.classList.contains("minus") ||
        e.target.classList.contains("plus")
      ) {
        let productId = e.target.getAttribute("data-product-id");
        if (localStorage.getItem(productId)) {
          let cartItem = JSON.parse(localStorage.getItem(productId)),
            liElem = e.target.closest("li");

          if (e.target.classList.contains("plus")) cartItem.cartCount += 1; //add the cart item
          if (e.target.classList.contains("minus")) cartItem.cartCount -= 1;

          if (cartItem.cartCount == 0) {
            // remove Item
            localStorage.removeItem(productId);
            liElem.parentElement.removeChild(e.target.closest("li"));
          } else {
            localStorage.setItem(productId, JSON.stringify(cartItem));
            let countSpan = liElem.querySelector(".count"),
              totalPrice = liElem.querySelector(".total-price span");

            countSpan.innerText = cartItem.cartCount;
            totalPrice.innerText =
              Number(countSpan.getAttribute("data-price")) * cartItem.cartCount;
          }
        }
      }
      let cartDetails = this.getCartItemsAndPrice(),
        totalPriceElem = document.querySelector(
          ".checkout-btn span.total-price"
        ),
        cartCountElem = document.querySelectorAll(".cart-count");

      for (let i = 0; i < cartCountElem.length; i++) {
        cartCountElem[i].innerHTML = cartDetails.totalItem;
      }
      totalPriceElem.innerHTML = cartDetails.totalPrice;
    }
  }

  fetchProducts(id) {
    return fetch(`http://localhost:5000/product/${id}`).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("Something went wrong !");
      }
    });
  }

  renderCartItems(isPopup = false) {
    if (window.localStorage) {
      let fragment = document.createElement("template"),
        cartDetails = this.getCartItemsAndPrice(),
        template = `<div id="${isPopup ? "overlay" : ""}">
    <section class="cart-container">
      <h4 class="cart-title">
        My Cart ${(() => {
          if (cartDetails.totalItem > 0) {
            return `<span>(<span class="cart-count">${cartDetails.totalItem}</span> items)</span>`;
          } else {
            return "";
          }
        })()}
        <span class="close-btn">
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      </h4>
      <ul class="cart-items" id="custom-scroll">
        ${(() => {
          if (cartDetails.totalItem == 0) {
            return `<div class="empty-cart">
                <h4>No items in your cart</h4>
                <span>Your favourite items are just a click away</span>
                </div>`;
          } else {
            return this.renderProduct();
          }
        })()}
      </ul>
      ${(() => {
        if (cartDetails.totalItem == 0) {
          return `<a href="./product" class="shop-btn"><button >
                Start Shopping</button></a>`;
        } else {
          return `<div class="offer-image">
            <img src="images/lowest-price.png" alt="Offer Image" />
            <span> You won't find it cheaper anywhere</span>
          </div>
          <div class="promo-content">Promo code can be applied on payment page</div>
          
          <a href="./checkout" class="checkout-btn">
            <button>Proceed to Checkout <span>Rs.<span class="total-price">${cartDetails.totalPrice}</span></span>
            </button>
            </a>`;
        }
      })()}
    </section>
  </div>`;

      fragment.innerHTML = template;
      if (isPopup) document.body.appendChild(fragment.content);
      else {
        if (document.querySelector("#cart"))
          document.querySelector("#cart").appendChild(fragment.content);
      }
      this.registerCartEvents();
    }
  }

  getCartItemsAndPrice() {
    let cartItems = Object.keys(localStorage),
      totalItem = 0,
      totalPrice = 0;

    for (var i = 0; i < cartItems.length; i++) {
      // Check the localstorage user details - This is for local sample purpose
      if (cartItems[i] != "users") {
        let product = JSON.parse(localStorage.getItem(cartItems[i]));

        totalItem += product.cartCount;
        totalPrice += product.cartCount * product.price;
      }
    }

    return { totalPrice: totalPrice, totalItem: totalItem };
  }

  renderProduct() {
    let cartItems = Object.keys(localStorage),
      template = "";

    for (var i = 0; i < cartItems.length; i++) {
      // Check the localstorage user details - This is for local sample purpose
      if (cartItems[i] != "users") {
        let product = JSON.parse(localStorage.getItem(cartItems[i]));

        template += `<li>
        <img src="${product.imageURL}" alt="${product.name}" />
        <div class="product-details">
            <h4>${product.name}</h4>
            <div class="features">
                <button class="cart-icons minus" data-product-id="${
                  product.id
                }">&minus;</button>
                <span class="count" data-price="${product.price}">${
          product.cartCount
        }</span>
                <button class="cart-icons plus" data-product-id="${
                  product.id
                }">&plus;</button>                
                <span class="price">&#215; Rs.<span>${
                  product.price
                }</span></span>
                <span class="total-price">Rs. <span>${
                  product.cartCount * product.price
                }</span></span>
            </div>    
        </div>
    </li>`;
      }
    }

    return template;
  }

  registerCartEvents() {
    let self = this,
      cartItems = document.querySelector(".cart-items"),
      closeBtn = document.querySelector(".close-btn");

    if (cartItems) {
      cartItems.addEventListener("click", function (e) {
        self.addCartItem(e);
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        let cartOverlay = document.getElementById("overlay");
        document.body.removeChild(cartOverlay);
      });
    }
  }
}
