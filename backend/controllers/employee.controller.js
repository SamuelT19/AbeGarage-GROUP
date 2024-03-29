// Import the employee service
const employeeService = require("../services/employee.service");
// Create the add employee controller
async function createEmployee(req, res, next) {
  // console.log(req.headers);

  // Check if employee email already exists in the database
  const employeeExists = await employeeService.checkIfEmployeeExists(
    req.body.employee_email
  );
  // If employee exists, send a response to the client
  if (employeeExists) {
    res.status(400).json({
      error: "This email address is already associated with another employee!",
    });
  } else {
    try {
      const employeeData = req.body;
      // Create the employee
      const employee = await employeeService.createEmployee(employeeData);
      if (!employee) {
        res.status(400).json({
          error: "Failed to add the employee!",
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}

// Create the getAllEmployees controller
async function getAllEmployees(req, res, next) {
  // Call the getAllEmployees method from the employee service
  const employees = await employeeService.getAllEmployees();
  // console.log(employees);
  if (!employees) {
    res.status(400).json({
      error: "Failed to get all employees!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employees,
    });
  }
}

//delete employee

async function deleteEmployeeById(req, res, next) {
  const employeeId = req.params.employee_id; // Using req.params.id to get the employee_id from the route URL
  try {
    const deleteEmployee = await employeeService.deleteEmployeeById(employeeId);

    if (!deleteEmployee) {
      res.status(400).json({
        error: "Failed to delete employee!",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: deleteEmployee,
      });
    }
  } catch (error) {
    next(error); // Pass any caught error to the error handler middleware
  }
}

// Export the createEmployee controller
module.exports = {
  createEmployee,
  getAllEmployees,
  deleteEmployeeById,
};
