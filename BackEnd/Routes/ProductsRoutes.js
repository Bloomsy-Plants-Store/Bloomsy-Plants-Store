const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductController');


// Get All Products
router.get('/', ProductController.getAllProducts);
router.get('/bestSelling', ProductController.getBestSellingProducts);
router.get('/topRating', ProductController.getTopRatingProducts);

// Get Specific Product By ID
router.get("/:id",ProductController.getProductByID);

// update product
router.put("/update/:id",ProductController.updateProduct);

// Delete Product 
router.delete("/:id", ProductController.deleteProduct);
router.post('/store', ProductController.storeProducts);
router.get('/:category', ProductController.getProductsByCategory);


module.exports = router;

