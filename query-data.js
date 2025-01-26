const connectDB = require("./dbConnection");
const products = require("./products/index");
const Product = require("./db/model");
const mongoose = require("mongoose");

const pagination_data = async () => {
  try {
    await connectDB();
    const total_products = await Product.countDocuments();
    return total_products;
  } catch (error) {
    console.error("Error querying data:", error);
  } finally {
    mongoose.connection.close();
  }
};

const fetchPaginatedProducts = async (skip, limit) => {
  try {
    await connectDB();
    const products = await Product.find().skip(skip).limit(limit);
    return products;
  } catch (error) {
    console.log("fetching products", error);
  }
};

const getProductByTitle = async (title) => {
  try {
    await connectDB();
    const product = await Product.findOne({ title: title });
    const related = await relatedProducts(product);
    return { product, related };
  } catch (error) {
    console.error("Error fetching product by title:", error);
  }
};

const relatedProducts = async (product) => {
  try {
    const related = await Product.find({
      filtertype: product.filtertype,
    }).limit(3);

    return related;
  } catch (error) {
    console.log("error to get related products", error);
  }
};

module.exports = { pagination_data, fetchPaginatedProducts, getProductByTitle };
