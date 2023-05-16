const express = require("express");
const router = new express.Router();
const CartController = require("../Controllers/CartController");


// Update cart route
router.post('/:id/cart/add', CartController.addToCart);
router.put('/:id/cart', CartController.updateCart);
router.put('/:id/cart/items', CartController.updateCartItems);
router.put('/:id/cart/:cartItemId', CartController.updateCartItemById);
router.delete('/:id/cart/all', CartController.clearUserCart);
router.delete('/:id/cart/:cartItemId', CartController.deleteCartItemById);



module.exports = router;
