const express = require("express");
const router = express.Router();
//import order controller
const orderController = require("../controllers/order.controller");
//route for create new order
router.post("/api/order/new", orderController.createOrder);

// router.get("/api/order/single/:order_id", orderController.orderedServices);

router.get("/api/order/single/:order_id", orderController.singleOrder);

//route for get all orders
router.get("/api/order/all", orderController.getAllOrdersData);

//route for edit by id a single order
router.put("/api/order/edit", orderController.editOrder);

//router for update order status
router.put("/api/order/status/:order_id", orderController.updateOrderProgress);

// router for get all orders by customer id
router.get("/api/order/all/:customer_id", orderController.CustomerOrder);

//export router
module.exports = router;
