const mongoose = require("mongoose");
const cartSchema = require("./CartModel");

const orderSchema = new mongoose.Schema({
  products:[cartSchema],
  total_price: { type: Number, default: 1 },
});


module.exports = orderSchema;
