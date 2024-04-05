const conn = require("../config/db.config");
async function addService(service) {
  const query =
    "INSERT INTO common_services (service_name, service_description, service_price) VALUES (?, ?, ?)";
  const rows = await conn.query(query, [
    service.service_name,
    service.service_description,
    service.service_price,
  ]);

  return rows;
}

module.exports = { addService };



const express = require("express");
// Call the router method from express to create the router
const router = express.Router();

const commonServiceController = require("../controllers/service.controller");

router.post("/api/service/add", commonServiceController.addService);

module.exports = router;


const serviceService = require("../services/service.service");
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

module.exports = {
  addService,
};
