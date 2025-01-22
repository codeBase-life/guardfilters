require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const connection = require("./query-data");

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "views")));

const port = process.env.PORT || 3000;
connection();
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

app.get("/filters-family", (req, res) => {
  res.render("index", {
    content: "filters-family",
  });
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
