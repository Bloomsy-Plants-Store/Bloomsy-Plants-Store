const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const upload = require('../MiddleWares/MutlerUpload');

// mutler upload
router.post('/upload', upload.single('jsonFile') ,ProductController.uploadProducts);


// get all products
router.get('/', ProductController.getAllProducts);
router.get('/bestSelling', ProductController.getBestSellingProducts);
router.get('/topRating', ProductController.getTopRatingProducts);
router.get('/:category', ProductController.getProductsByCategory);


module.exports = router;

