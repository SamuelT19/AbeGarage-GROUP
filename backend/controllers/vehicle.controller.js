//Import the vehicle service
const vehicleService = require("../services/vehicle.service");
//  Create the add vehicle controller
const createVehicle = async (req, res, next) => {
  const vehicleData = req.body;
  //check if vehicle exists
  const vehicleExists = await vehicleService.checkIfVehicleExists(vehicleData);
  //   If vehicle exists, send a response to the client
  if (vehicleExists) {
    res.status(400).json({
      error:
        "This vehicle registration number is already associated with another vehicle!",
    });
  } else {
    if (!req.body) {
      return res.status(400).json({
        error: "Please provide vehicle details!",
      });
    }
    try {
      const vehicleData = req.body;
      // Create the vehicle
      const vehicle = await vehicleService.createVehicle(vehicleData);
      if (!vehicle) {
        res.status(400).json({
          error: "Failed to add the vehicle!",
        });
      } else {
        res.status(200).json({
          succuss: "Vehicle added successfully!",
          status: "true",
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
};

module.exports = { createVehicle };
