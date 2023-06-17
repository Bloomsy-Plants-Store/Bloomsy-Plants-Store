const express = require("express");
const router = new express.Router();
const OrderController = require("../Controllers/OrderController")

router.post("/:id", OrderController.addOrder);
router.get("/get-orders/:id", OrderController.getOrderByID);
router.post("/cancel-order/:id", OrderController.CancelOrder);
router.post("/confirm-order/:id", OrderController.ConfirmOrder);
router.post("/deliver-order/:id", OrderController.DeliverOrder);


module.exports = router;
