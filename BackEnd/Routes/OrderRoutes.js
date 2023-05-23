const express = require("express");
const router = new express.Router();
const OrderController = require("../Controllers/OrderController")

router.post("/:id", OrderController.addOrder);

module.exports = router;
