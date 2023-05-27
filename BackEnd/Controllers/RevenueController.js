const User = require('../Models/UsersModel');

const countTotalOrders = async (req, res) => {
  try {
    const pipeline = [
      { $unwind: "$orders" }, // Unwind the orders array
      { $group: { _id: null, totalOrders: { $sum: 1 } } } // Group by null to count all orders
    ];

    const result = await User.aggregate(pipeline);

    if (result.length > 0) {
      return res.status(200).json({ message: result[0].totalOrders});
      
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error counting total orders:", error);
    return res.status(400).json({ message: "Error counting total orders "})
    throw error;
  }
};

const countTotalRevenue = async (req, res) => {
    try {
      const pipeline = [
        { $unwind: "$orders" }, // Unwind the orders array
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$orders.total_price" }
          }
        } 
      ];
  
      const result = await User.aggregate(pipeline);
  
      if (result.length > 0) {
        return res.status(200).json({ totalRevenue: result[0].totalRevenue });
      } else {
        return res.status(200).json({ totalRevenue: 0 });
      }
    } catch (error) {
      console.error("Error counting total revenue:", error);
      return res.status(400).json({ message: "Error counting total revenue" });
    }
  };
  
module.exports = {
    countTotalOrders,
    countTotalRevenue
  };