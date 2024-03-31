// Create the getCustomerById controller
async function getCustomerById(req, res, next) {
  const customerId = req.params.customer_id; // Using req.params.id to get the customer_id from the route URL
  try {
    const customer = await customerService.getCustomerById(customerId);
    if (customer.length <= 0) {
      res.status(400).json({
        error: "Failed to get the customer!",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: customer,
      });
    }
  } catch (error) {
    console.log(err);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

// Create the editCustomer controller
async function editCustomer(req, res, next) {
  const updatedCustomerData = req.body;

  console.log(updatedCustomerData);

  try {
    const editCustomer = await customerService.editCustomer(
      updatedCustomerData
    );
    if (!editCustomer) {
      res.status(400).json({
        error: "Failed to edit customer!",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: editCustomer,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = {
  getCustomerById,
  editCustomer,
};
