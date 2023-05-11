// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const upload = require('../MiddleWares/MutlerUpload');


router.post('/upload', upload.single('jsonFile') ,productController.uploadProducts);

module.exports = router;
