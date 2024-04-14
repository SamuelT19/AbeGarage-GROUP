const serviceService = require("../services/service.service");


const createServices = async (req, res, next) => {
  try {
    const commonServices = await serviceService.createServices();
    if (!commonServices) {
      res.status(409).json({
        message: "All services already exist in the database.",
      });
    } else {
      res.status(201).json({
        message: " Common services inserted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

async function addService(req, res, next) {
  const serviceData = req.body;
  // Call the getAllEmployees method from the employee service
  const response = await serviceService.addService(serviceData);
  // console.log(employees);
  if (!response) {
    res.status(400).json({
      error: "Failed to add service!",
    });
  } else {
    res.status(200).json({
      status: "success",
    });
  }
}

const getSingleService = async (req, res) => {
  try {
    const { service_id } = req.params;
    const [singleService] = await serviceService.getSingleService(service_id);

    if (!singleService) {
      res.status(400).json({
        error: "Failed to get service info!",
      });
    } else {
      res.status(200).json({
        singleService,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const editService = async (req, res) => {
  try {
    const service = req.body;
    const updatedService = await serviceService.editService(service);
    if (!updatedService) {
      res.status(400).json({
        error: "Failed to edit service info!",
      });
    } else {
      res.status(200).json({
        message: "Service edited successfully",
        updatedService,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

async function deleteService(req, res, next) {
  try {
    const serviceId = req.params.service_id;
    if (!serviceId) {
      throw new Error("Service ID is undefined or null");
    }
    const success = await serviceService.deleteService(serviceId);
    if (!success) {
      res.status(400).json({ error: "Failed to delete the common service" });
    } else {
      res.status(200).json({
        status: "Success!",
        message: "Common service deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
}

async function getAllServices(req, res, next) {
  
  const services = await serviceService.getAllServices();
  if (!services) {
    res.status(400).json({
      error: "Failed to get all service!",
    });
  } else {
    res.status(200).json({
      status: "success",
      services,
    });
  }
}

module.exports = {
    createServices,
  addService,
  getSingleService,
  editService,
  deleteService,
  getAllServices,
};
