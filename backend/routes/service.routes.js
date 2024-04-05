
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