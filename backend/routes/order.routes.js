const express = require("express");
const router = express.Router();
//import order controller
const orderController = require("../controllers/order.controller");
//route for create new order
router.post("/api/order/new", orderController.createOrder);

router.get("/api/order/single/:order_id", orderController.orderedServices);

//route for get all orders
router.get("/api/orders/all", orderController.getAllOrdersData);

//route for edit by id a single order
router.put("/api/order/edit", orderController.editOrder);

//export router
module.exports = router;
