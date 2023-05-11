
const Product = require('../Models/ProductsModel');

var uploadProducts = async (req, res) => {
  try {
    let file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    let products = require("../uploads/" + file.originalname);
    await Product.insertMany(products);
    res.send({ message: `${products.length} products added successfully.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add products.' });
  }
};

module.exports = {
  uploadProducts
};
