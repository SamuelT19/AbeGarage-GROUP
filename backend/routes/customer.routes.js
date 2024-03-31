//import express
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the customer controller
const customerController = require("../controllers/customer.controller");
// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");

// Create a route to handle the get customer by ID request on get
router.get(
  "/api/customer/:customer_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.getCustomerById
);
// Create a route to handle the edit customer request on post
router.put(
  "/api/edit-customer",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.editCustomer
);

// Export the router
module.exports = router;
