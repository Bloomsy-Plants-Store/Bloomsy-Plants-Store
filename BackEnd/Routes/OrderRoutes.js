const express = require("express");
const router = new express.Router();
const OrderController = require("../Controllers/OrderController")


router.post("/confirm-order", OrderController.ConfirmOrder);
router.post("/deliver-order", OrderController.DeliverOrder);
router.post("/:id", OrderController.addOrder);
router.get("/get-pending-orders", OrderController.getOrderForAllUser);
router.post("/cancel-order/:id", OrderController.CancelOrder);
router.get("/get-orders/:id", OrderController.getOrderByID);

module.exports = router;
