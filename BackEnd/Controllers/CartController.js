const User = require("../Models/UsersModel");

var updateCart = async (req, res) => {
    try {
      console.log(req.params);  
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.cart = req.body.cart;
      await user.save();
      console.log(user.cart);
      return res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Server Error, Failed to update the cart' });
    }
}


var updateCartItemById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const cartItemIndex = user.cart.findIndex((item) => item.product_id.toString() === req.params.productId);
      if (cartItemIndex === -1) {
        return res.status(404).json({ error: 'Product not found in cart' });
      }

      if (req.body.quantity) {
        user.cart[cartItemIndex].quantity = req.body.quantity;
      }

      if (req.params.productId) {
        user.cart[cartItemIndex].product_id = req.params.productId;
      }

      await user.save();
      console.log(user.cart);
      return res.status(200).json({ message: 'Cart item quantity updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Server Error, Failed to update the cart' });
    }
};

var updateCartItems = async (req, res) => {
    try {
      const updates = req.body.products_updates; 
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      for (const update of updates) {
        const { cartItemId, quantity, productId } = update;
        const cartItemIndex = user.cart.findIndex((item) => item.product_id.toString() === cartItemId.toString());

        if (cartItemIndex === -1) {
          return res.status(404).json({ error: `Cart item with ID ${cartItemId} not found` });
        }
        if (quantity !== undefined) {
          user.cart[cartItemIndex].quantity = quantity;
        }
        if (productId !== undefined) {
          user.cart[cartItemIndex].product_id = productId;
        }
      }
      await user.save();
      console.log(user.cart);
      return res.status(200).json({ message: 'Cart items updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Server Error, Failed to update the cart' });
    }
};
  

module.exports = {
    updateCart,
    updateCartItemById,
    updateCartItems
};