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
  const employee_id = req.params.employee_id; // Using req.params.id to get the employee_id from the route URL
  try {
    const deleteEmployee = await employeeService.deleteEmployeeById(
      employee_id
    );

    if (!deleteEmployee) {
      res.status(400).json({
        error: "Failed to delete employee!",
      });
    } else {
      res.status(200).json({
        status: "success",
      });
    }
  } catch (error) {
    next(error); // Pass any caught error to the error handler middleware
  }
}
async function getEmployeeById(req, res, next) {
  const employee_id = req.params.employee_id;
  const [employee] = await employeeService.getEmployeeById(employee_id);
  if (!employee) {
    res.status(400).json({
      error: "Failed to get employee info!",
    });
  } else {
    res.status(200).json({
      employee,
    });
  }
}

async function editEmployee(req, res, next) {
  const employee = req.body;
  const updatedEmployee = await employeeService.editEmployee(employee);
  if (!updatedEmployee) {
    res.status(400).json({
      error: "Failed to edit employee info!",
    });
  } else {
    res.status(200).json({
      message: "Employee data updated successfully",
      updatedEmployee,
    });
  }
}
// Export the createEmployee controller
module.exports = {
  createEmployee,
  getAllEmployees,
  deleteEmployeeById,
  getEmployeeById,
  editEmployee,
};
