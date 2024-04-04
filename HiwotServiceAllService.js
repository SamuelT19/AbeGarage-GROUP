// get all service
async function getAllServices() {
  const query = "SELECT * FROM common_services";
  const rows = await conn.query(query);
  return rows;
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

// Create a route to handle to get all service on get
router.get("/api/service", serviceController.getAllServices);