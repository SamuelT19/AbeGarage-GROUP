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
  "/api/add-vehicle",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.createVehicle
);

//create a route to get all vehicles
router.get(
  "/api/all-vehicles/:customer_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.getAllVehicles
);

//create a route to get a vehicle by its ID
router.get(
  "/api/singel-vehicel/:vehicle_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.getVehicleById
);

//create a route to edit a vehicle
router.put(
  "/api/edit-vehicle",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.editVehicleById
);

//create a route to delete a vehicle
router.delete(
  "/api/delete-vehicle/:vehicle_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.deleteVehicleById
);

module.exports = router;
