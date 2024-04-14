const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");

router.post("/api/order/new", orderController.createOrder);

router.get(
  "/api/order/single/:order_id",
  orderController.orderedServices
);

module.exports = router;
