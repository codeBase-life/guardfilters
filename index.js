require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const connectDB = require("./dbConnection");
const {
  pagination_data,
  fetchPaginatedProducts,
  getProductByTitle,
  rightLeftProducts,
} = require("./query-data");
const { log } = require("console");

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "views")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

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
  const { sort } = req.query;

  let sortOptions = {};
  if (sort === "popularity") {
    sortOptions = { make: 1 };
  } else if (sort === "latest") {
    sortOptions = { make: -1 };
  } else if (sort === "high-to-low") {
    sortOptions = { model: -1 };
  } else if (sort === "low-to-high") {
    sortOptions = { model: 1 };
  }

  // const sortedProducts = await sorting(sortOptions);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  const pagination_count = await pagination_data();
  const paginatedProducts = await fetchPaginatedProducts(
    skip,
    limit,
    sortOptions
  );
  const totalPages = Math.ceil(pagination_count / limit);

  try {
    res.render("index", {
      content: "filters-family",
      productsSorted: paginatedProducts,
      totalPages,
      currentPage: page,
      totalProducts: pagination_count,
      currentLimit: limit,
      sortProduct: sort || "latest",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Error fetching products");
  }
});

app.get("/product", async (req, res) => {
  const title = req.query.title;
  if (!title) {
    return res.status(400).send("Title query parameter is required");
  }
  const { product, related } = await getProductByTitle(title);

  if (!product) {
    return res.status(404).send("Product not found");
  }
  res.render("index", {
    content: "product",
    product: product || "Product not found",
    relatedProduct: related || "no related products",
    currentProduct: product,
    rightLeftProducts: (await rightLeftProducts()) || "no related products",
  });
  return; // Ensure the function exits after sending the response
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
