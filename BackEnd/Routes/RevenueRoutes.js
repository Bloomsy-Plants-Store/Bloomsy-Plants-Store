const express = require("express");
const router = new express.Router();
const RevenueController = require("../Controllers/RevenueController");

router.get("/total-orders", RevenueController.countTotalOrders);
router.get("/revenue", RevenueController.countTotalRevenue);

module.exports = router;