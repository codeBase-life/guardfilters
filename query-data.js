const Product = require("./db/model");

const pagination_data = async () => {
  try {
    const total_products = await Product.countDocuments();
    return total_products;
  } catch (error) {
    console.error("Error querying data:", error);
  }
};

const fetchPaginatedProducts = async (skip, limit, sortOptions) => {
  try {
    const products = await Product.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    return products;
  } catch (error) {
    console.log("fetching products", error);
  }
};

const getProductByTitle = async (title) => {
  try {
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

const rightLeftProducts = async () => {
  console.log("inside right left products");

  try {
    const sorted = await Product.find();
    return sorted;
  } catch (error) {
    console.log("error to get right left products", error);
  }
};

const filterItems = async () => {
  try {
    const filtertype = await Product.distinct("filtertype");
    const model = await Product.distinct("model");
    const year = await Product.distinct("year");
    const make = await Product.distinct("make");
    return { filtertype, model, year, make };
  } catch (error) {
    console.error("error while fetching filteritems", error);
  }
};

const searchProducts = async (query) => {
  try {
    const searchResults = await Product.find({
      title: { $regex: query, $options: "i" },
    });
    return searchResults;
  } catch (error) {
    console.error("Search error:", error);
  }
};

module.exports = {
  pagination_data,
  fetchPaginatedProducts,
  getProductByTitle,
  rightLeftProducts,
  filterItems,
  searchProducts,
};
