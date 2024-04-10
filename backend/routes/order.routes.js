const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");

router.post("/api/order/new", orderController.createOrder);

module.exports = router;
