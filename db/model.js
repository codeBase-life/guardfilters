const mongoose = require("mongoose");

const productShema = new mongoose.Schema({
  title: String,
  description: String,
  make: String,
  model: String,
  filtertype: String,
  year: Number,
  partno: String,
  oemno: String,
  imgId: String,
  imageUrl: String,
});
module.exports = mongoose.model("Product", productShema);
