require("dotenv").config();
const mongoose = require("mongoose");
const model = require("./db/model");

const uri = process.env.MONGODB;

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

const sortProduct = async (query, sortField, sortOrder) => {
  let sortedProducts = await model.find(query).sort({ [sortField]: sortOrder });
  return sortedProducts;
};

module.exports = { connect, sortProduct };
