const mongoose = require("mongoose");
const Product = require('../Models/ProductsModel');

const cartItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 },
  price : {type:Number,default:1}
});


// check product exists in the products collection first
cartItemSchema.pre('save', async function (next) {
  try {
    const product = await Product.findById(this.product_id);
    if (!product) {
      throw new Error('Product not found');
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = cartItemSchema; 