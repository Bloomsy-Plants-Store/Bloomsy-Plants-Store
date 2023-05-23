const express = require("express");
const router = new express.Router();
const OrderController = require("../Controllers/OrderController")

router.post("/:id", OrderController.addOrder);
router.get("/get-orders/:id", OrderController.getOrderByID);

module.exports = router;
