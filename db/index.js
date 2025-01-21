const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const products = require("../products/index");
const model = require("./model");
const mongoURL =
  "mongodb+srv://rasheed:project1@cluster0.1hg3v.mongodb.net/guard_filters?retryWrites=true&w=majority&appName=Cluster0";
// console.log(mongoURL);

const databaseandProducts = async () => {
  try {
    await mongoose
      .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connected successfully");
      });

    let result = await model.insertMany(products);
    console.log(`${result.length} items inserted`);
  } catch (error) {
    console.log("faild to connect", error);
  } finally {
    mongoose.disconnect().then(() => {
      console.log("database disconnected");
    });
  }
};

databaseandProducts();
