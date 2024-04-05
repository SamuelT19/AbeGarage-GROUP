// import dbconfig
const conn = require("../config/db.config");

// A function to get all common services
async function getAllCommonServices() {
  const query = "SELECT * FROM common_services";
  const rows = await conn.query(query);
  return rows;
}

// A function to add a common service to the database
async function addCommonService(service) {
  let createdService = {};
  try {
    const query =
      "INSERT INTO common_services (service_name, service_description, service_price) VALUES (?, ?, ?)";
    const rows = await conn.query(query, [
      service.service_name,
      service.service_description,
      service.service_price,
    ]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    createdService = {
      service_id: rows.insertId,
    };
  } catch (err) {
    console.log(err);
  }
  return createdService;
}

// Export the functions for use in the controller
module.exports = {
  addCommonService,
};

// Import service service
const commonService = require("../services/service.service");

// Controller function to add a common service
async function addCommonService(req, res, next) {
  try {
    const serviceData = req.body;
    console.log(serviceData)
    const service = await commonService.addCommonService(serviceData);
    if (!service) {
      res.status(400).json({ error: "Failed to add the service" });
    } else {
      res.status(200).json({ status: "Success!", data: service });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
}

// Export the controller functions
module.exports = {
  addCommonService,
}

// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the common service controller
const commonServiceController = require("../controllers/service.controller");

// Route to add a new common service (POST request)
router.post("/api/service/add", commonServiceController.addCommonService);
// Export the router
module.exports = router