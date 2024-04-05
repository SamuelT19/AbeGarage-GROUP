







// ? create a route to get all vehicles by customer

router.get ("/api/all-vehicles/:customer_id",  [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.getAllVehicles);



