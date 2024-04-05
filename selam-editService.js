//service .js
const updateService = async (service_Id, service_Name, service_Description, service_price) => {
    try {
      const query = 'UPDATE common_services SET service_name = ?, service_description = ? ,service_price =? WHERE service_id = ?';
      const rows = await conn.query(query, [service_Name, service_Description, service_price ,service_Id]);
  
      if (rows.affectedRows === 1) {
        return { success: true };
      } else {
        return { success: false, error: "Failed to update service" };
      }
    } catch (error) {
      console.error("Error updating service:", error);
      return { success: false, error: "Internal server error" };
    }
  };
  //controller.js
  const editService = async (req, res) => {
    const service_Id = req.params.service_id;
    const { service_name, service_description,service_price } = req.body;
    try {
      await updateService(service_Id, service_name, service_description ,service_price);
      res.status(200).json({ message: 'Service updated successfully' });
    } catch (error) {
      console.error('Error editing service:', error);
      res.status(500).json({ message: 'Failed to edit service' });
    }
  };
  //route .js
  //create a route to edit a service
router.put(
    "/api/edit-service/:service_id",
    [authMiddleware.verifyToken, authMiddleware.isAdmin],
    serviceController.editService
  );