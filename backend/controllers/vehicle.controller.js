// Create the get all vehicles controller
async function getAllVehicles(req, res, next) {
    const customerId = req.params.customer_id;
  try {
    // Call the getAllVehicles method from the vehicle service
    const vehicles = await vehicleService.getAllVehicles(customerId);
    if (!vehicles) {
      return res.status(400).json({
        error: "Failed to get all vehicles!",
      });
    }
    // Success response
    res.status(200).json({
      status: "success",
      data: vehicles,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}
