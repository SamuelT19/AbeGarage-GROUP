
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