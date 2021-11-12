export default class Categories {
  constructor() {}
  render() {
    this.displayCategories();
  }
  /**
   * Function is used to display the categories
   */
  async displayCategories() {
    let categories = await this.fetchCategories();

    this.renderCategoryList(categories);
  }
  /**
   * Function is used to fetch the categories from API request
   */
  fetchCategories() {
    return fetch("http://localhost:5000/categories").then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("Something went wrong !");
      }
    });
  }

  /**
   * Function is used to display the category item
   *
   * @param {Object} categories The category list
   */
  renderCategoryList(categories) {
    let fragment = document.createDocumentFragment(),
      parentElement = document.querySelector("#category");

    // Based on the order sort the array list
    categories.sort((a, b) => a.order - b.order);

    for (const category of categories) {
      if (category.enabled) {
        const item = document.createElement("li"),
          template = `<div class="col col-3 col-s-4">
              <img src="${category.imageUrl}" alt="${category.name}" />
          </div>
          <div class="col col-8 col-s-7 offer-details">
              <h2 class="title">${category.name}</h2>
              <span class="desc">${category.description}</span>
              <button class="button"><a href="product?category=${category.key}">Explore ${category.key}</a></button>
          </div>`;

        item.innerHTML = template;
        fragment.appendChild(item);
      }
    }
    parentElement.appendChild(fragment);
  }
}
