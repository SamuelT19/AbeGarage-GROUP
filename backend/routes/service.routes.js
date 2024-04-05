const express = require("express");
// Call the router method from express to create the router
const router = express.Router();

const commonServiceController = require('../controllers/service.controller')

router.post("/api/service/add", commonServiceController.addService);

module.exports = router;
