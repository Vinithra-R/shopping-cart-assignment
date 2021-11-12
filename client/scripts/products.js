export default class Products {
  constructor() {
    const queryString = window.location.search,
      urlParams = new URLSearchParams(queryString),
      categoryParam = urlParams.get("category")
        ? urlParams.get("category")
        : "";
    this.categoryParam = categoryParam;
  }

  render() {
    this.displayProductList();
  }

  async displayProductList() {
    let products = await this.displayProducts();

    this.renderCategoryList(products[0]);
    this.renderProductList(products[1]);
    this.registerProductEvents();
  }

  async displayProducts() {
    let urls = [
      "http://localhost:5000/categories",
      "http://localhost:5000/products/" + this.categoryParam,
    ];
    const texts = await Promise.all(
      urls.map(async (url) => {
        const resp = await fetch(url);
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Something went wrong !");
        }
      })
    );

    return texts;
  }

  registerProductEvents() {
    let parentElementXs = document.querySelector("#category-xs");
    if (parentElementXs) {
      parentElementXs.addEventListener("change", function (e) {
        let product = document.querySelector("#product");
        while (product.firstChild) {
          product.removeChild(product.lastChild);
        }
        reRenderProduct(e.target.value);
      });
    }
  }

  async reRenderProduct(categoryParam) {
    let products = await fetchProducts(categoryParam);

    renderProductList(products);
  }

  fetchProducts(categoryParam) {
    return fetch("http://localhost:5000/products/" + categoryParam).then(
      (res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("Something went wrong !");
        }
      }
    );
  }
  /**
   * Function is used to display the category item
   *
   * @param {Object} categories The category list
   */
  renderCategoryList(categories) {
    let fragment = document.createDocumentFragment(),
      fragmentXs = document.createDocumentFragment(),
      parentElement = document.querySelector("#category"),
      parentElementXs = document.querySelector("#category-xs");

    // Based on the order sort the array list
    categories.sort((a, b) => a.order - b.order);

    for (const category of categories) {
      if (category.enabled) {
        const item = document.createElement("li"),
          template = `<a href="product?category=${category.key}">${category.name}</a>`,
          option = document.createElement("option");

        option.value = category.key;
        option.innerText = category.name;
        item.innerHTML = template;

        //Add active Class
        if (this.categoryParam == category.key) {
          item.classList.add("active");
          option.selected = true;
        }
        fragmentXs.appendChild(option);
        fragment.appendChild(item);
      }
    }
    parentElement.appendChild(fragment);
    parentElementXs.appendChild(fragmentXs);
  }

  renderProductList(products) {
    let fragment = document.createDocumentFragment(),
      parentElement = document.querySelector("#product");

    for (const product of products) {
      const item = document.createElement("li"),
        template = `<h4>${product.name}</h4>
        <div class="product-details">  
          <img src="${product.imageURL}" alt="${product.name}" />
          <div class="desc">${product.description}</div>
          <div class="desc-xs">
            <span class="short-desc">${product.description}</span>
            <button class="buy-btn" data-product-id="${product.id}">Buy Now @ Rs ${product.price}</button>
          </div>
        </div>
        <div class="features">
          <span>MRP Rs.${product.price}</span>
          <button class="buy-btn" data-product-id="${product.id}">Buy Now</button>
        </div>
        <div class="features-sm">
          <button class="buy-btn" data-product-id="${product.id}">Buy Now @ Rs ${product.price}</button>
        </div>`;

      item.innerHTML = template;
      parentElement.classList.remove("product-empty");
      fragment.appendChild(item);
    }
    if (products.length == 0) {
      let emptyNode = document.createElement("span");
      emptyNode.className = "product-empty";
      emptyNode.innerText = "No Result Found";
      parentElement.appendChild(emptyNode);
      parentElement.classList.add("product-empty");
    }
    parentElement.appendChild(fragment);
  }
}
