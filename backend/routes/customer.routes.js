// Import necessary modules
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Create a route to handle the add customer request on post
router.post(
  "/api/customer/add",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.addCustomer
);
// Create a route to handle the get all customers request on get
router.get(
  "/api/customer/all",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.getAllCustomers
);
// Create a route to handle the get customer by ID request on get

router.get(
  "/api/customer/:customer_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.getCustomerById
);

// Create a route to handle the edit customer request on post
router.put(
  "/api/customer/edit",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.editCustomer
);
// Create a route to handle the delete customer request on delete
router.delete(
  "/api/customer/delete/:customer_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.deleteCustomerById
);

// Export the router
module.exports = router;
