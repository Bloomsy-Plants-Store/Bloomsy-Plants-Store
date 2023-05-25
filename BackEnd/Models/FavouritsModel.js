const mongoose = require("mongoose");
const Product = require('../Models/ProductsModel');

const favouriteItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});



module.exports = favouriteItemSchema; 