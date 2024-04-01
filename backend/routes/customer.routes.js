// Import necessary modules
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
// const authMiddleware = require("../middlewares/auth.middleware");

// Create a route to handle the add customer request on post
router.post(
  "/api/customers",
  // Assuming you only need token verification
  customerController.addCustomer
);

// Export the router
module.exports = router;
