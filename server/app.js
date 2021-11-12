const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const categories = require("./categories/index.get.json");
const banners = require("./banners/index.get.json");
const products = require("./products/index.get.json");

//Static path expose
app.use("/static", express.static(path.resolve(__dirname, "../static")));
app.use(express.static(path.resolve(__dirname, "../static")));
app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(express.static(path.resolve(__dirname, "../client")));

// Index page
app.get("/", (req, res) => res.sendFile("index.html", { root: process.cwd() }));
app.get("/index", function (req, res) {
  res.redirect("/");
});

// Product page
app.get("/product", (req, res) =>
  res.sendFile("product.html", { root: process.cwd() })
);
// Product page
app.get("/checkout", (req, res) =>
  res.sendFile("coming-soon.html", { root: process.cwd() })
);

// Cart page
app.get("/cart", (req, res) =>
  res.sendFile("cart.html", { root: process.cwd() })
);

// login page
app.get("/login", (req, res) =>
  res.sendFile("login.html", { root: process.cwd() })
);

// Register page
app.get("/register", (req, res) =>
  res.sendFile("register.html", { root: process.cwd() })
);

// Product Page with category
app.get("/product?category=:category", (req, res) =>
  res.sendFile("product.html", {
    root: process.cwd(),
    category: req.params.category,
  })
);
// API for get the category list
app.get("/categories", (req, res) => {
  res.json(categories);
});

// API for get the banner list
app.get("/banners", (req, res) => {
  res.json(banners);
});

// API for get the product list
app.get("/products", (req, res) => {
  res.json(products);
});
// API for get the product list
app.get("/products/:category", (req, res) => {
  let getCategory = categories
    .filter((category) => category.key == req.params.category)
    .map((category) => category.id);

  if (getCategory.length > 0) {
    let categoryProducts = products.filter(
      (product) => product.category == getCategory[0]
    );
    res.json(categoryProducts);
  } else {
    res.json(products);
  }
});
// API for get the product
app.get("/product/:id", (req, res) => {
  let product = products.filter((product) => product.id == req.params.id);

  res.json(product);
});

app.get("/cart", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  fs.readFile("Index.html", (err, data) => {
    res.end(data);
  });
});

// app.listen(5000, () => console.log("Server running @ 5000"));

const port = process.env.PORT || 5000;
module.exports = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);
