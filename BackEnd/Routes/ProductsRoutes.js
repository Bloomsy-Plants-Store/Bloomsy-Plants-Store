const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductController');
const userPermissions = require('../MiddleWares/UserMWPermissions');


// Get All Products
router.get('/', ProductController.getAllProducts);
router.get('/bestSelling', ProductController.getBestSellingProducts);
router.get('/topRating', ProductController.getTopRatingProducts);

// Get Specific Product By ID
router.get("/:id",ProductController.getProductByID);

// update product
router.put("/update/:id",ProductController.updateProduct);

// Delete Product 
router.get('/filter/product-price', ProductController.getProductsByPrice);
router.delete("/:id",userPermissions,ProductController.deleteProduct);
router.post('/store',userPermissions,ProductController.storeProducts);
router.get('/product-category/:category', ProductController.getProductsByCategory);
router.get('/All/Categories/Count', ProductController.getEachCategory);

module.exports = router;

