require("dotenv").config();
const mongoose = require("mongoose");
const product = require("./products/index");
const model = require("./db/model");

const uri = process.env.MONGODB;

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");

    //  updating products
    // updateproducts();
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

const updateproducts = async () => {
  for (const products of product) {
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
  let sortedProducts = await model.find();
  return sortedProducts;
};

module.exports = { connect, sortProduct };
