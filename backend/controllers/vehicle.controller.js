//getVehicleById controller 
async function getVehicleById(req, res, next) {
  const vehicleId = req.params.vehicle_id; // Using req.params.id to get the vehicle_id from the route URL
  try {
    const vehicle = await vehicleService.getVehicleById(vehicleId);
    if (vehicle.length <= 0) {
      res.status(400).json({
        error: "Failed to get the vehicle!",
      });
    } else {
      res.status(200).json({
        status: "success",
        vehicle,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}
module.exports = {getVehicleById};