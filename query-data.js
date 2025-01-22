require("dotenv").config();

const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = connect;
