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
    if (!vehicleData) {
      return res.status(400).json({
        error: "Please provide vehicle details!",
      });
    }
    try {
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

//Create the get all vehicles controller
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
      vehicles,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

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
// Delete vehicle controller
async function deleteVehicle(req, res, next) {
  try {
    // Extract vehicle ID from request parameters
    const vehicleId = req.params.vehicle_id;

    // Call the service function to delete the vehicle
    const deleted = await vehicleService.deleteVehicle(vehicleId);

    // Check if the vehicle was deleted successfully
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "No vehicle found with the provided ID." });
    }

    // Vehicle successfully deleted
    return res.status(200).json({ message: "Vehicle deleted successfully." });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: error.message });
  }
}

async function editVehicleById(req, res, next) {
  const vehicle = req.body;
  try {
    const updatedVehicle = await vehicleService.editVehicleById(vehicle);
    if (!updatedVehicle) {
      res.status(400).json({
        error: "Failed to edit vehicle info!",
      });
    } else {
      res.status(200).json({
        message: "Vehicle data updated successfully",
        updatedVehicle,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "something went wrong!",
    });
  }
}
// Export the delete vehicle controller
module.exports = {
  createVehicle,
  deleteVehicle,
  getVehicleById,
  editVehicleById,
  getAllVehicles,
};
