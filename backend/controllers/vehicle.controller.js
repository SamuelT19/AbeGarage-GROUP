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

//implement the getAllVehicles controller
async function getAllVehicles(req, res, next) {
  //using req.params.id to get the customer_id from the route URL
  const customerId = req.params.customer_id;
  console.log(customerId);
  // Call the getAllVehicles method from the vehicle service
  const vehicles = await vehicleService.getVehiclesByCustomerId(customerId);
  if (!vehicles) {
    res.status(400).json({
      error: "Failed to get all vehicles!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: vehicles,
    });
  }
}

//implement the getVehicleById controller
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

//implement the edit vehicleById
async function editVehicleById(req, res, next) {
  const updatedVehicleData = req.body;
  //   console.log(updatedVehicleData);
  try {
    const editVehicle = await vehicleService.editVehicleById(
      updatedVehicleData
    );
    if (!editVehicle) {
      res.status(400).json({
        error: "Failed to edit vehicle!",
      });
    } else {
      res.status(200).json({
        status: "Vehicle successfully edited!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

//delete vehicle by id
async function deleteVehicleById(req, res, next) {
  const vehicleId = req.params.vehicle_id;
  try {
    const deleteVehicle = await vehicleService.deleteVehicleById(vehicleId);
    if (!deleteVehicle) {
      res.status(400).json({
        error: "Failed to delete vehicle!",
      });
    } else {
      res.status(200).json({
        status: "Vehicle successfully deleted!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  editVehicleById,
  deleteVehicleById,
};
