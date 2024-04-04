// A function to delete a common service from the database
async function deleteCommonService(serviceId) {
    try {
      if (!serviceId) {
        throw new Error("Service ID is undefined or null");
      }
  
      const query = "DELETE FROM common_services WHERE service_id = ?";
      const rows = await conn.query(query, [serviceId]);
      console.log(rows);
      if (rows.affectedRows !== 1) {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
    return true;
  }
  // Route to delete a common service by ID (DELETE request)
router.delete("/api/service/delete/:service_id", commonServiceController.deleteCommonService);
// Controller function to delete a common service
async function deleteCommonService(req, res, next) {
    try {
      const serviceId = req.params.service_id; // Ensure correct parameter name
      if (!serviceId) {
        throw new Error("Service ID is undefined or null");
      }
      const success = await commonService.deleteCommonService(serviceId);
      if (!success) {
        res.status(400).json({ error: "Failed to delete the common service" });
      } else {
        res.status(200).json({ status: "Success!", message: "Common service deleted successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Something went wrong" });
    }
  }
  