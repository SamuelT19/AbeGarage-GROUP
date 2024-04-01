const customerService = require("../services/customer.service");

async function addCustomer(req, res, next) {
  // Check if customer email already exists in the database
  const customerExists = await customerService.checkIfCustomerExists(
    req.body.customer_email
  );
  // If customer exists, send a response to the client
  if (customerExists) {
    res.status(400).json({
      error: "This email address is already associated with another customer!",
    });
  } else {
    try {
      const customerData = req.body;
      // Create the customer
      const customer = await customerService.addCustomer(customerData);
      if (!customer) {
        res.status(400).json({
          error: "Failed to add the customer!",
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}

module.exports = { addCustomer };
