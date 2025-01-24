const env = require("dotenv");
env.config();
const mongoose = require("mongoose");
const products = require("./products/index");
const Product = require("./db/model");

const uri = process.env.MONGODB;

const connect = async () => {
  try {
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection successful");
      });

    const results = await Product.find();
    return results;
  } catch (error) {
    console.error("Database connection error:", error);
  }
  mongoose.connection.close();
};

// connect();
const updateproducts = async () => {
  for (const products of products) {
    try {
      await model.updateOne({ imgId: products.imgId });
      console.log(`Updated product with imgId: ${products.imgId}`);
    } catch (error) {
      console.error("Error updating product with", error);
    }
  }
  mongoose.connection.close();
};

const sortProduct = async () => {
  await connect();
  let sortedProducts = await Product.find();
  return sortedProducts;
};

// console.log(sortProduct());

module.exports = { connect, sortProduct };
