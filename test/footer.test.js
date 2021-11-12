import Footer from "../client/scripts/footer.js";

describe("Footer TestCases", () => {
  it("Should load the footer content", () => {
    let templete = '<footer id="footer"></footer>';
    document.body.innerHTML = templete;

    var footer = new Footer();
    footer.render();

    assert.equal(document.querySelector("#footer").childElementCount, 1);
  });
});
