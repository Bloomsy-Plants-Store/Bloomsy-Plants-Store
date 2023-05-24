const User = require('../Models/UsersModel');
const Product = require('../Models/ProductsModel');


// Add a product to the cart
var addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let { product_id, quantity, price } = req.body;

    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const cartItemIndex = user.cart.findIndex(item => item.product_id == product_id);
    if (cartItemIndex !== -1) {
      if (req.body.quantity) {
        const newQuantity = parseInt(req.body.quantity);
        user.cart[cartItemIndex].quantity += newQuantity;
        await user.save();
      }      
    }

    const cartItem = {
      product_id: product_id,
      quantity: quantity,
      price:price
    }
    user.cart.push(cartItem);
    await user.save();

    return res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server Error, Failed to add product to cart' });
  }
};


// update a cart item by id
var updateCartItemById = async (req, res) => {
  try {
    const user_id = req.params.id;
    if (!user_id) {
      return res.status(400).send("Bad Request: You must enter a user id");
    }

    const cartItem_id = req.params.cartItemId;
    if (!cartItem_id) {
      return res.status(400).send("Bad Request: You must enter a cart item id");
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItemIndex = user.cart.findIndex(
      (item) => item.product_id.toString() === cartItem_id
    );
    if (cartItemIndex === -1) {
      return res.status(404).json({ error: "Cart item not found in cart" });
    }

    if (req.body.quantity) {
      user.cart[cartItemIndex].quantity = req.body.quantity;
      await user.save();
    }
    return res.status(200).json({ message: "Cart item quantity updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error, Failed to update the cart" });
  }
};

// delete a cart item by id
const deleteCartItemById = async (req, res) => {
  try {
    const user_id = req.params.id;
    if (!user_id) {
      return res.status(400).send("Bad Request: You must enter a user id");
    }

    const cartItem_id = req.params.cartItemId;
    if (!cartItem_id) {
      return res.status(400).send("Bad Request: You must enter a cart item id");
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user.cart);
    const cartItemIndex = user.cart.findIndex(
      (item) => item.product_id.toString() === cartItem_id
    );
    console.log(cartItemIndex);
    if (cartItemIndex === -1) {
      return res.status(404).json({ error: "Cart item not found in user cart" });
    }
    await User.updateOne(
      { _id: user_id },
      { $pull: { cart: { product_id: cartItem_id } } }
    );

    return res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server Error, Failed to delete this item" });
  }
};

// clear user cart
const clearUserCart = async (req, res) => {
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
      { $set: { cart: [] } }
    );

    return res.status(200).json({ message: 'All Cart items deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server Error, Failed to delete this item' });
  }
};

// get cart items
const getCartItems = async(req, res) => {
  const user_id = req.params.id;
  if (!user_id) {
    return res.status(400).send("Bad Request: You must enter a user id");
  }

  try {
    const cart = await User.findById(user_id)
      .select("cart")
      .populate("cart.product_id")
      .exec();

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(400).json({ error: "Failed to get cart items" });
  }
};

module.exports = {
  addToCart,
  updateCartItemById,
  deleteCartItemById,
  clearUserCart,
  getCartItems,
};