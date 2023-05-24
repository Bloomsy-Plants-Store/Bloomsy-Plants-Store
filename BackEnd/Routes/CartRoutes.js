const express = require("express");
const router = new express.Router();
const CartController = require("../Controllers/CartController");
const isGuest = require("../MiddleWares/isGuest")


// Update cart route
router.post('/:id/cart/add', isGuest,CartController.addToCart);
router.put('/:id/cart/:cartItemId', isGuest,CartController.updateCartItemById);
router.delete('/:id/cart/all', CartController.clearUserCart);
router.delete('/:id/cart/:cartItemId',isGuest, CartController.deleteCartItemById);
router.get('/:id/cart', CartController.getCartItems);



module.exports = router;
