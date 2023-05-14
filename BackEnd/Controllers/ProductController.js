
const productModel = require('../Models/ProductsModel');
const multer = require('multer');



//multer
// Set storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

  // Create instance of Multer and specify image upload settings
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB max file size
  }).array('imageUrl', 3); // specify field name for single file upload





  var uploadProducts = async (req, res) => {
    try {
      let file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded." });
      }
      let products = require("../uploads/" + file.originalname);
      await productModel.insertMany(products);
      res.send({ message: `${products.length} products added successfully.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add products." });
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
};



var storeProducts = async function (req, res) {
    try {
        await upload(req, res, function(err) {
          if (err) {
            // Handle error
            console.log(err);
            return res.status(500).send("Error uploading file");
          } else {

              //map req.file to git file name
              let filenames = req.files.map(file => file.filename);

            // Save product details to database
              let product = new productModel({
                  name: req.body.name,
                  price: req.body.price,
                  category: req.body.category,
                  rate: 0,
                  reviews_num: 0,
                  discount: req.body.discount,
                  bestSelling: false,
                  description: req.body.description,
                  itemsinStock: req.body.itemsinStock,
                  imageUrl: filenames,
              });
              product.save();
            return res.status(200).json({ message: "Product Upload Successfully " });
          }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
};



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
};

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

var getProductByID = async (req, res) => {
  try {
    let product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(400).send("There is No Product With this ID !");
    }
    return res.status(200).json({ data: product });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error, Failed to get the product !");
  }
};

var deleteProduct = async (req, res) => {
  try {
    let product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ message: "There is No Product With this ID" });
    } else {
      await productModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Deleted Successfully..." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error, Failed to delete the product!");
  }
};

var getProductsByCategory = async (req, res) => {
    try {
        let category = req.params.category;
        if (!category) {
            return res.status(400).send("Bad Request: You must enter a category of data");
        }
        let Products = await productModel.find({
            category: { $in: [category] }
        }).lean();
        if (!Products) {
            return res.status(404).send("No Data Found");
        }
        return res.status(200).json({ data: Products });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
};

module.exports = {
  getAllProducts,
  getBestSellingProducts,
  getTopRatingProducts,
  uploadProducts,
  getProductByID,
  deleteProduct,
  storeProducts,
  getProductsByCategory
};


