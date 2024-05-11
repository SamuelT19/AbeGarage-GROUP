// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the employee controller
const employeeController = require("../controllers/employee.controller");
// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the add employee request on post
router.post(
  "/api/employee/add",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.createEmployee
);
// Create a route to handle the get all employees request on get
router.get(
  "/api/employee/all",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getAllEmployees
);

// Create a route to handle the delete by id
router.delete(
  "/api/employee/:employee_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.deleteEmployeeById
);

// Create a route to handle the get employee by ID request on get
router.get(
  "/api/employee/:employee_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getEmployeeById
);
// Create a route to handle the edit employee request on post
router.post(
  "/api/employee/edit",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.editEmployee
);

// Export the router
module.exports = router;
