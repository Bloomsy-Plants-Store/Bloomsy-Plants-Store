const User = require('../Models/UsersModel');
const Product = require('../Models/ProductsModel');
const mongoose = require('mongoose');


var addOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const id = req.params.id;
    const order = req.body;
    order.status = 'pending';
    const user = await User.findById(id).session(session);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
   }

    const stockReduced = await reduceStockNoOfItems(order.products, session);
    if (!stockReduced.success) {
      return res.status(400).json({ error: stockReduced.error });
    }

    await User.updateOne(
      { _id: id },
      { $push: { orders: order } }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: 'Order added successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ error: 'Server Error, Failed to add Order' });
  }
};

var reduceStockNoOfItems = async (products, session) => {
  try {
    for (const product of products) {
      const { product_id, quantity } = product;
      const existingProduct = await Product.findById(product_id).session(session);

      if (!existingProduct) {
        return { success: false, error: 'Product not found' };
      }

      const itemsinStock = existingProduct.itemsinStock;
      if (itemsinStock < quantity) {
        return { success: false, error: 'Insufficient stock' };
      }
      const updatedItemsinStock = itemsinStock - quantity;
      await Product.updateOne(
        { _id: product_id },
        { $set: { itemsinStock: updatedItemsinStock } }
      ).session(session);
    }

    return { success: true, message: 'Stock quantities reduced successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};


var getOrderByID = async(req,res)=>{
  try {
    let id = req.params.id;
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
   }
    return res.status(200).json({ orders: user.orders });
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' });
  }
}



const CancelOrder = async (req, res) => {
  const userId = req.params.id;
  const { orderId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const order = user.orders.find((o) => o._id.toString() === orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = "canceled";
    order.total_price = 0
    await user.save();

    res.status(200).json({ message: "Order canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};



var ConfirmOrder = async (req, res) => {
  const userId = req.body.userID;
  const orderId  = req.body.orderID;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const order = user.orders.find((o) => o._id.toString() === orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = "confirmed";
    await user.save();

    res.status(200).json({ message: "Order confirmed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }

};


var DeliverOrder = async (req, res) => {
  const userId = req.body.userID;
  const orderId  = req.body.orderID;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const order = user.orders.find((o) => o._id.toString() === orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = "delivered";
    await user.save();

    res.status(200).json({ message: "Order delivered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

var getOrderForAllUser = async (req, res) => {
  try {
    const users = await User.find();
    const pendingOrders = [];

    users.forEach(user => {
      user.orders.forEach(order => {
          const orderWithUserName = {
            _id: order._id,
            userName: user.name,
            total: order.total_price,
            userId : user._id,
            status: order.status
          };
          pendingOrders.push(orderWithUserName);

      });
    });

    res.status(200).json(pendingOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}



module.exports = {
  ConfirmOrder,
  addOrder,
  getOrderByID,
  CancelOrder,
  DeliverOrder,
  getOrderForAllUser
};

