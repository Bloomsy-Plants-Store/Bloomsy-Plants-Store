const express = require("express");
const router = new express.Router();
const ProductController = require("../Controllers/ProductController");



// get all products
router.get('/', ProductController.getAllProducts);
router.get('/bestSelling', ProductController.getBestSellingProducts);
router.get('/topRating', ProductController.getTopRatingProducts);


module.exports = router;

