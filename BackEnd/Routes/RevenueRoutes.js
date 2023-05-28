const express = require("express");
const router = new express.Router();
const RevenueController = require("../Controllers/RevenueController");

router.get("/total-orders", RevenueController.countTotalOrders);
router.get("/revenue", RevenueController.countTotalRevenue);
router.get("/total-users", RevenueController.getTotalUserCount);

module.exports = router;