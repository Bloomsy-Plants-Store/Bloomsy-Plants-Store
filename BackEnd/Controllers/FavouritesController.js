const User = require('../Models/UsersModel');
const Product = require('../Models/ProductsModel');


// Add a product to the Favourites
var addToFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    let { product_id } = req.body;
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const FavouritesItemIndex = user.favourites.findIndex(item => item.product_id == product_id);
    if (FavouritesItemIndex !== -1) {
      return res.status(404).json({ error: 'Product already exists in the Favourites' });
    }

    const favouritesItem = {
      product_id: product_id,
    }
    user.favourites.push(favouritesItem);
    await user.save();
    return res.status(200).json({ message: 'Product added to Favourites successfully' });
  } catch (error) {
    return res.status(500).json({ error});
  }
};



// delete a Favourites item by id
const deleteFavouritesItemById = async (req, res) => {
  try {
    const user_id = req.params.id;
    if (!user_id) {
      return res.status(400).send("Bad Request: You must enter a user id");
    }

    const favouritesItem_id = req.params.favouritesItemId;
    if (!favouritesItem_id) {
      return res.status(400).send("Bad Request: You must enter a Favourites item id");
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const favouritesItemIndex = user.favourites.findIndex(
      (item) => item.product_id.toString() === favouritesItem_id
    );
    if (favouritesItemIndex === -1) {
      return res.status(404).json({ error: "Favourites item not found in user Favourites" });
    }
    await User.updateOne(
      { _id: user_id },
      { $pull: { favourites: { product_id: favouritesItem_id } } }
    );

    return res.status(200).json({ message: "Favourites item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server Error, Failed to delete this item" });
  }
};

// clear user Favourites
const clearUserFavourites = async (req, res) => {
  try {
    const user_id = req.params.id;
    if (!user_id) {
      return res.status(400).send("Bad Request: You must enter a user id");
    }
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await User.updateOne(
      { _id: user_id },
      { $set: { favourites: [] } }
    );

    return res.status(200).json({ message: 'All Favourites items deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server Error, Failed to delete this item' });
  }
};

// get Favourites items
const getFavouritesItems = async(req, res) => {
  const user_id = req.params.id;
  if (!user_id) {
    return res.status(400).send("Bad Request: You must enter a user id");
  }

  try {
    const favourites = await User.findById(user_id)
      .select("favourites")
      .populate("favourites.product_id")
      .exec();

    return res.status(200).json(favourites);
  } catch (err) {
    return res.status(400).json({ error: "Failed to get Favourites items" });
  }
}

  const checkProductInFavourites = async (req, res) => {
    try {
      const user_id = req.params.id;
      if (!user_id) {
        return res.status(400).send("Bad Request: You must enter a user id");
      }
  
      const product_id = req.params.product_id;
      if (!product_id) {
        return res.status(400).send("Bad Request: You must enter a product id");
      }
  
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const foundProduct = user.favourites.find(item => item.product_id.toString() === product_id);
      if (foundProduct) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      return res.status(500).json({ error: "Server Error, Failed to check product in favorites" });
    }
  };
  


module.exports = {
  addToFavourites,
  deleteFavouritesItemById,
  clearUserFavourites,
  getFavouritesItems,
  checkProductInFavourites
};