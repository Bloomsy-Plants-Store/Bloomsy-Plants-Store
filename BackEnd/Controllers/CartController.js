const User = require("../Models/UsersModel");

var updateCart = async (req, res) => {
  try {
    const user_id = req.params.id;
    if (!user_id) {
      return res.status(400).send("Bad Request: You must enter a user id");
    }
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.cart = req.body.cart;
    await user.save();
    console.log(user.cart);
    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    return res
      .status(500).json({ error: "Server Error, Failed to update the cart" });
  }
};

var updateCartItemById = async (req, res) => {
  try {
    const user_id = req.params.id;
    if (!user_id) {
      return res.status(400).send("Bad Request: You must enter a user id");
    }
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const cartItem_id = req.params.cartItemId;
    if (!cartItem_id) {
      return res.status(400).send("Bad Request: You must enter a cart item id");
    }
    const cartItemIndex = user.cart.findIndex(
      (item) => item.product_id.toString() === cartItem_id
    );
    if (cartItemIndex === -1) {
      return res.status(404).json({ error: "Cart item not found in cart" });
    }

    if (req.body.quantity) {
      user.cart[cartItemIndex].quantity = req.body.quantity;
    }
    await user.save();
    return res
      .status(200)
      .json({ message: "Cart item quantity updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server Error, Failed to update the cart" });
  }
};

var updateCartItems = async (req, res) => {
  try {
    const user_id = req.params.id;
    if (!user_id) {
      return res.status(400).send("Bad Request: You must enter a user id");
    }
    const updates = req.body.products_updates;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    for (const update of updates) {
      const { cartItemId, quantity, productId } = update;
      const cartItemIndex = user.cart.findIndex(
        (item) => item.product_id.toString() === productId
      );

      if (cartItemIndex === -1) {
        return res.status(404).json({ error: `Cart item with this iD not found` });
      }
      if (quantity !== undefined) {
        user.cart[cartItemIndex].quantity = quantity;
      }
    }
    await user.save();
    console.log(user.cart);
    return res.status(200).json({ message: "Cart items updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server Error, Failed to update the cart" });
  }
};

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

module.exports = {
  updateCart,
  updateCartItemById,
  updateCartItems,
  deleteCartItemById,
};



























// this is in case using produt_id instead of cart_id

// var updateCartItemByProductId = async (req, res) => {
// try {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     return res.status(404).json({ error: 'User not found' });
//   }
//   const cartItemIndex = user.cart.findIndex((item) => item._id.toString() === req.params.cartItemId);
//   if (cartItemIndex === -1) {
//     return res.status(404).json({ error: 'Cart item not found in cart' });
//   }

//   if (req.body.quantity) {
//     user.cart[cartItemIndex].quantity = req.body.quantity;
//   }

//   if (req.body.productId) {
//     user.cart[cartItemIndex].product_id = req.body.productId;
//   }
//   console.log(user.cart[cartItemIndex].product_id);
//   await user.save();
//   console.log(user.cart);
//   return res.status(200).json({ message: 'Cart item quantity updated successfully' });
// } catch (error) {
//   console.log(error)
//   return res.status(500).json({ error: 'Server Error, Failed to update the cart' });
// }
// };

// var updateCartItemsbyProductIds = async (req, res) => {
// try {
//   const updates = req.body.products_updates;
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     return res.status(404).json({ error: 'User not found' });
//   }
//   for (const update of updates) {
//     const { cartItemId, quantity, productId } = update;
//     const cartItemIndex = user.cart.findIndex((item) => item._id.toString() === cartItemId);

//     if (cartItemIndex === -1) {
//       return res.status(404).json({ error: `Cart item with ID ${cartItemId} not found` });
//     }
//     if (quantity !== undefined) {
//       user.cart[cartItemIndex].quantity = quantity;
//     }
//     if (productId !== undefined) {
//       user.cart[cartItemIndex].product_id = productId;
//     }
//   }
//   await user.save();
//   console.log(user.cart);
//   return res.status(200).json({ message: 'Cart items updated successfully' });
// } catch (error) {
//   return res.status(500).json({ error: 'Server Error, Failed to update the cart' });
// }
// };
