const serviceService=require("../services/service.service");
async function addService(req, res, next) {

    const serviceData =  req.body;
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

module.exports ={
    addService
}
