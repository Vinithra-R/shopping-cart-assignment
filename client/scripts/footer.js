export default class Footer {
  constructor() {}
  render() {
    let fragment = document.createElement("template"),
      parentElement = document.querySelector("#footer"),
      template = `<span class="container">
        Copyright &copy; 2011-2018 Sabka Bazaar Grocery Supplies Pvt Ltd
    </span>`;

    fragment.innerHTML = template;
    parentElement.appendChild(fragment.content);
  }
}
