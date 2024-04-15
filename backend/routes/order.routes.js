const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");

router.post("/api/order/new", orderController.createOrder);

router.get("/api/orders/all", orderController.getAllOrders);

router.put("/api/order/edit/:order_id", orderController.updateOrder)

module.exports = router;
