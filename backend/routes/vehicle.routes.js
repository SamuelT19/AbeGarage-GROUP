// Create a route to handle the get vehicle by ID request on get
router.get(
  "/api/single-vehicle/:vehicle_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.getVehicleById
);