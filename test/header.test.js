import Header from "../client/scripts/header.js";

describe("Header TestCases", () => {
  it("Should load the header content", () => {
    let templete = '<header id="header"></header>';
    document.body.innerHTML = templete;

    var header = new Header();
    header.render();

    assert.equal(document.querySelector("#header").childElementCount, 1);
  });
});
