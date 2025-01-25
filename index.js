require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./dbConnection");
const { pagination_data, fetchPaginatedProducts } = require("./query-data");
const { log } = require("console");

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "views")));

const port = process.env.PORT || 3000;

// Connect to the database once when the server starts
// connectDB();

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/our-company", (req, res) => {
  res.render("index", {
    content: "our-company",
  });
});
app.get("/find-dealer", (req, res) => {
  res.render("index", {
    content: "find-dealer",
  });
});

app.get("/certification-awards", (req, res) => {
  res.render("index", {
    content: "certification-awards",
  });
});

app.get("/csr", (req, res) => {
  res.render("index", {
    content: "csr",
  });
});
app.get("/our-catalogue", (req, res) => {
  res.render("index", {
    content: "our-catalogue",
  });
});
app.get("/contact-us", (req, res) => {
  res.render("index", {
    content: "contact-us",
  });
});

app.get("/filters-family", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;
  const pagination_count = await pagination_data();
  const paginatedProducts = await fetchPaginatedProducts(skip, limit);
  const totalPages = Math.ceil(pagination_count / limit);
  // console.log("paginatedproducts length", paginatedProducts.length);
  // console.log("total pages", totalPages);
  // console.log("page", page);

  try {
    res.render("index", {
      content: "filters-family",
      productsSorted: paginatedProducts,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Error fetching products");
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
