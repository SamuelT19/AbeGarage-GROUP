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

// Create the getAllCustomers controller
async function getAllCustomers(req, res, next) {
  // Call the getAllCustomers method from the customer service
  const customers = await customerService.getAllCustomers();
  if (!customers) {
    res.status(400).json({
      error: "Failed to get all customers!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: customers,
    });
  }
}

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
        customer,
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
        status: " customer successfully edited !",
        // data: editCustomer,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

// Create the deleteCustomerById controller
async function deleteCustomerById(req, res, next) {
  const customerId = req.params.customer_id; // Using req.params.id to get the customer_id from the route URL
  //log the customer id
  // console.log(customerId);

  try {
    const customer = await customerService.getCustomerById(customerId);
    console.log(customer);
    if (customer.length <= 0) {
      res.status(400).json({
        error: "Customer not found!",
      });
    } else {
      const deleteCustomer = await customerService.deleteCustomerById(
        customerId
      );

      if (!deleteCustomer) {
        res.status(400).json({
          error: "Failed to delete customer!",
        });
      } else {
        res.status(200).json({
          status: `Customer with ID ${customerId} has been deleted successfully`,
        });
      }
    }
  } catch (error) {
    next(error); // Pass any caught error to the error handler middleware
  }
}

module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  editCustomer,
  deleteCustomerById,
};
