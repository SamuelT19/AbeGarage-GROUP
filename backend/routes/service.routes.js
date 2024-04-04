// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the service controller
const serviceController = require("../controllers/service.controller");
// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the add service request on post
router.post("/api/service", serviceController.addService);
//[authMiddleware.verifyToken, authMiddleware.isAdmin],

// Create a route to handle to get all service on get
router.get("/api/service", serviceController.getAllServices);
// Create a route to handle to get  service by service id on get
router.get("/api/service/:service_id", serviceController.getServiceById);

// Create a route to handle to update  service by service id on put
router.put("/api/service/:service_id", serviceController.editService);


// Create a route to handle to delete  service by service id on delete
router.delete("/api/service/:service_id", serviceController.deleteServiceById);


// Export the router
module.exports = router;
