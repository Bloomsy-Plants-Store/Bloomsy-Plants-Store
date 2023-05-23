const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductController');
const userPermissions = require('../MiddleWares/UserMWPermissions')


// Get All Products
router.get('/', ProductController.getAllProducts);
router.get('/bestSelling', ProductController.getBestSellingProducts);
router.get('/topRating', ProductController.getTopRatingProducts);

// Get Specific Product By ID
router.get("/:id",ProductController.getProductByID);

// update product
router.put("/update/:id", userPermissions,ProductController.updateProduct);

// Delete Product 
router.delete("/:id",  userPermissions,ProductController.deleteProduct);
router.post('/store', userPermissions,ProductController.storeProducts);
router.get('/:category', ProductController.getProductsByCategory);


module.exports = router;

