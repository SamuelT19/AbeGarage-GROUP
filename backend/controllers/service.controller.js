const serviceService = require("../services/service.service");

async function addService(req, res, next) {

// Check if service  already exists in the database
  const serviceExists = await serviceService.checkIfServiceExists(
    req.body.service_name
  );
  // If employee exists, send a response to the client
  if (serviceExists) {
    res.status(400).json({
      error: "This service is already exists!",
    });
  } else {
    try {
      const serviceData = req.body;
      // Create the service
      const service = await serviceService.addService(serviceData);

      if (!service) {
        return res.status(400).json({
          error: "Failed to add service!",
        });
      }

      return res.status(200).json({
        status: "true",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Something went wrong!",
      });
    }
  }
}
// Create the getAllServices controller
async function getAllServices(req, res, next) {
  // Call the getAllServices method from the service
  const services = await serviceService.getAllServices();
  if (!services) {
    res.status(400).json({
      error: "Failed to get all service!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: services,
    });
  }
}

//  Create the getServiceById controller
async function getServiceById(req, res, next) {
  const service_id = req.params.service_id; // Using req.params.id to get the service_id from the route URL
  try {
    // Call the getServiceById method from the service
    const service = await serviceService.getServiceById(service_id);
    if (service.length <= 0) {
      res.status(400).json({
        error: "Failed to get the service!",
      });
    } else {
      res.status(200).json({
        status: "success",
        service,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

//  Create the editService controller
async function editService(req, res, next) {
  const updatedServiceData = req.body;

  console.log(updatedServiceData);
   //call editService from service
  try {
    const editService = await serviceService.editService(
      updatedServiceData
    );
    if (!editService) {
      res.status(400).json({
        error: "Failed to edit service!",
      });
    } else {
      res.status(200).json({
        status: " service successfully edited !",
      
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

//  Create the deleteCustomerById controller
async function deleteServiceById(req, res) {
  const service_id = req.params.service_id; // Using req.params.id to get the service_id from the route URL

   const service = await serviceService.getServiceById(service_id);
    console.log(service);
    if (service.length <= 0) {
      res.status(400).json({
        error: "service not found!",
      });
    } else {
      const deleteService = await serviceService.deleteServiceById(
        service_id
      );

      if (!deleteService) {
        res.status(400).json({
          error: "Failed to delete service!",
        });
      } else {
        res.status(200).json({
          status: ` service ID ${service_id} has been deleted successfully`,
        });
      }
    
  } 
}

module.exports = {
  addService,
  getAllServices,
  getServiceById,
  deleteServiceById,
  editService,
};
