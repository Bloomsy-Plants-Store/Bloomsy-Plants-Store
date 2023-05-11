
const productModel = require('../Models/ProductsModel');


var uploadProducts = async (req, res) => {
  try {
    let file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    let products = require("../uploads/" + file.originalname);
    await productModel.insertMany(products);
    res.send({ message: `${products.length} products added successfully.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add products.' });
  }
};


var getAllProducts = async (req, res) => {
    try {
        //lean() is a method that is used to retrieve documents from MongoDB as plain JavaScript objects instead of Mongoose model instances.
        //Faster to create than model instances, and they consume less memory.
        let AllProducts = await productModel.find().lean();
        if (!AllProducts) {
            return res.status(400).send("No Data Found");
        }
        return res.status(200).json({ data: AllProducts });
    } catch (err) {
        console.log(err);
    }
}
var getBestSellingProducts = async (req, res) => {
    try {
        let query = productModel.find({ bestSelling: true });
        if (req.query.limit) {
            //The second argument to parseInt() is the base of the number system to use. In this case, we are using base 10 (decimal). This ensures that the function correctly interprets the value as a decimal number
            const limit = parseInt(req.query.limit, 10);
            if (!isNaN(limit)) {
                query = query.limit(limit);
            }
        }
        let BestSellingProducts = await query.lean();
        if (!BestSellingProducts) {
            return res.status(400).send("No Data Found");
        }
        return res.status(200).json({ data: BestSellingProducts });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
}

var getTopRatingProducts = async (req, res) => {
    try {
        let query = productModel.find().sort({ rating: -1 });
        if (req.query.limit) {
            //The second argument to parseInt() is the base of the number system to use. In this case, we are using base 10 (decimal). This ensures that the function correctly interprets the value as a decimal number
            const limit = parseInt(req.query.limit, 10);
            if (!isNaN(limit)) {
                query = query.limit(limit);
            }
        }
        let TopRatingProducts = await query.lean();
        if (!TopRatingProducts) {
            return res.status(400).send("No Data Found");
        }
        return res.status(200).json({ data: TopRatingProducts });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
};

module.exports = { getAllProducts, getBestSellingProducts, getTopRatingProducts, uploadProducts };
