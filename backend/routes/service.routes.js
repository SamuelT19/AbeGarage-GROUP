const express = require("express");
// Call the router method from express to create the router
const router = express.Router();

const serviceController = require("../controllers/service.controller");

router.post("/api/service/common", serviceController.createServices);

router.post("/api/service/add", serviceController.addService);

router.get(
  "/api/service/single/:service_id",
  serviceController.getSingleService
);

router.put("/api/service/edit", serviceController.editService);


router.delete(
  "/api/service/delete/:service_id",
  serviceController.deleteService
);

router.get("/api/service/all", serviceController.getAllServices);
module.exports = router;
