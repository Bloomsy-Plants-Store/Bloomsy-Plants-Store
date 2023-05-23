const User = require('../Models/UsersModel');
const Product = require('../Models/ProductsModel');
const mongoose = require('mongoose');

// var addOrder = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const order = req.body;
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const stockReduced = await reduceStockNoOfItems(order.products);
//     if (!stockReduced.success) {
//       return res.status(400).json({ error: stockReduced.error });
//     }

//     await User.updateOne(
//       { _id: id },
//       { $push: { "orders": order } }
//     );

//     return res.status(200).json({ message: 'Order added successfully' });
//   } catch (error) {
//     return res.status(500).json({ error: 'Server Error, Failed to add Order' });
//   }
// };

// var reduceStockNoOfItems = async (products) => {
//   try {
//     console.log(products)
//     for (const product of products) {
//       const { product_id, quantity } = product;

//       const existingProduct = await Product.findById(product_id);
//       if (!existingProduct) {
//         return { success: false, error: 'Product not found' };
//       }

//       const itemsinStock = existingProduct.itemsinStock;
//       if (itemsinStock < quantity) {
//         return { success: false, error: 'Insufficient stock' };
//       }

//       const updatedItemsinStock = itemsinStock - quantity;
//       await Product.updateOne(
//         { _id: product_id },
//         { $set: { itemsinStock: updatedItemsinStock } }
//       );
//     }
//     return { success: true, message: 'Stock quantities reduced successfully' };
//   } catch (error) {
//     console.log(error);
//     return { success: false, error: error.message };
//   }
// };

var addOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const id = req.params.id;
    const order = req.body;
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
    console.log(error)
    return res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  addOrder,
  getOrderByID
};

