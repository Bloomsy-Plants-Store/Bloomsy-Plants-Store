
const productModel = require('../Models/ProductsModel');
const MutlerUpload = require('../MiddleWares/MutlerUpload');
const config = require('../config.json');
const userModel = require('../Models/UsersModel');

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

var updateProduct = async (req, res) => {
  try {
     MutlerUpload.uploadProduct(req, res, async function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send("Error uploading file");
      } else {
          
        let product = await productModel.findById(req.params.id);
        if (!product) {
          return res.status(400).send("There is No Product With this ID !");
        }

        let updatedProduct = req.body;
        
        if(req.files){
          let images = req.files;
          images.forEach(img => {
            product["imageUrl"].push(config.CLOUD_PATH + img.filename)
          });
        }
        
        Object.keys(updatedProduct).forEach(key => {
          if (key in product) {
            if(key == "category"){
               product[key] =updatedProduct[key];
            }else{
              product[key] = updatedProduct[key];
            }
          }
        });
        await product.save();
        return res.status(200).json({ updatedProduct: product });
      }
    })
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error, Failed to update the product !");
  }
}

var storeProducts = async function (req, res) {
  try {
    await MutlerUpload.uploadProduct(req, res, async function (err) {
      if (err) {
        return res.status(500).send("Error uploading file");
      } else {
        let filenames = await req.files.map(file => config.CLOUD_PATH + file.filename)
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
          imageUrl: filenames
        });
        await product.save();
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
var getProductsByPrice=async (req, res) => {
  try {
    const objectQueryParam = req.query.object;
    // Parse the query parameter value back into an object
    const priceObject = JSON.parse(objectQueryParam);
    console.log(priceObject)
    if (!objectQueryParam) {
      return res.status(400).send("Bad Request: You must enter a price ");
    }

    let Products = await productModel.find({
      price: { $gte: priceObject.min, $lte: priceObject.max }
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

const getEachCategory = async (req, res) => {
  try {
    const result = await productModel.aggregate([
      {
        $unwind: "$category" //$unwind stage is used to create a separate document for each element within the category arra
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]).exec();

    return res.status(200).json({ data: result });
  } catch (err) {
    console.error('Error retrieving category information:', err);
    res.status(500).send('An error occurred while retrieving category information');
  }
};

module.exports = {
  getAllProducts,
  getBestSellingProducts,
  getTopRatingProducts,
  getProductByID,
  deleteProduct,
  storeProducts,
  getProductsByCategory,
  updateProduct,
  getProductsByPrice,
  getEachCategory
};


