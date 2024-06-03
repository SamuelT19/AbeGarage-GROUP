//import the express module
const express = require("express");
//create a new router
const router = express.Router();
//import authMiddleware
const authMiddleware = require("../middlewares/auth.middleware");
//import the vehicle controller
const vehicleController = require("../controllers/vehicle.controller");

//create a route to add a new vehicle
router.post(
  "/api/vehicle/add",
  
  vehicleController.createVehicle
);
//[authMiddleware.verifyToken, authMiddleware.isAdmin],
// Create a route to handle the get vehicle by ID request on get
router.get(
  "/api/vehicle/single/:vehicle_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.getVehicleById
);
// Route to delete a vehicle by its ID
router.delete(
  "/api/vehicle/delete/:vehicle_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.deleteVehicle
);

// Create a route to handle the editVehicle request on editVehicle
router.put(
  "/api/vehicle/edit",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.editVehicleById
);

// create a route to get all vehicles by customer
router.get(
  "/api/vehicle/all/:customer_id",
 
  vehicleController.getAllVehicles
);
// [authMiddleware.verifyToken, authMiddleware.isAdmin],

module.exports = router;
