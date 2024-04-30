// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
// A function to check if employee exists in the database
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new employee
async function createEmployee(employee) {
  let createdEmployee = {};
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);
    // Insert the email in to the employee table
    const query =
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
    const rows = await conn.query(query, [
      employee.employee_email,
      employee.active_employee,
    ]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the employee id from the insert
    const employee_id = rows.insertId;
    // Insert the remaining data in to the employee_info, employee_pass, and employee_role tables
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);
    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    const rows3 = await conn.query(query3, [employee_id, hashedPassword]);
    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    const rows4 = await conn.query(query4, [
      employee_id,
      employee.company_role_id,
    ]);
    // construct to the employee object to return
    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the employee object
  return createdEmployee;
}
// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await conn.query(query, [employee_email]);
  return rows;
}
// A function to get all employees
async function getAllEmployees() {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 10";
  const rows = await conn.query(query);
  return rows;
}

// A function to get employee by ID to get single employee
async function getEmployeeById(employee_id) {
  const query =
    "SELECT employee.employee_email, employee.active_employee,employee_info.employee_first_name, employee_info.employee_last_name, employee_info.employee_phone,company_roles.company_role_id FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id WHERE employee.employee_id = ?";
  const rows = await conn.query(query, [employee_id]);
  return rows;
}


// A function to delete employee by id
async function deleteEmployeeById(employee_id) {
  await conn.query("DELETE FROM employee_info WHERE employee_id = ?", [
    employee_id,
  ]);
  await conn.query("DELETE FROM employee_pass WHERE employee_id = ?", [
    employee_id,
  ]);
  await conn.query("DELETE FROM employee_role WHERE employee_id = ?", [
    employee_id,
  ]);

  await conn.query("DELETE FROM employee WHERE employee_id = ?", [employee_id]);
  return true;
}

const editEmployee = async (employee) => {
  console.log(employee);
  let updatedEmployee = {};

  const salt = await bcrypt.genSalt(10);
  if (employee.employee_password.length > 2) {
     var hashedPassword = employee?.employee_password
    ? await bcrypt.hash(employee?.employee_password, salt)
    : null;
  }
 

  if (employee.employee_email || employee.active_employee) {
    const employeeQuery = `
        UPDATE employee
        SET 
          ${employee.employee_email ? "employee_email = ?," : ""}
          ${employee.active_employee ? "active_employee = ?" : ""}
        WHERE
          employee_id = ?
      `;
    const queryParams = [
      employee.employee_email,
      employee.active_employee,
      employee.employee_id,
    ].filter((param) => param !== undefined);

    await conn.query(employeeQuery, queryParams);
  }

  if (employee.employee_phone) {
    const employeeInfoQuery = `
        UPDATE employee_info
        SET 
          employee_phone = ?
        WHERE
          employee_id = ?
      `;
    const queryParams = [employee.employee_phone, employee.employee_id];

    await conn.query(employeeInfoQuery, queryParams);
  }

  if (hashedPassword) {
    const employeePassQuery = `
        UPDATE employee_pass
        SET 
          employee_password_hashed = ?
        WHERE
          employee_id = ?
      `;
    await conn.query(employeePassQuery, [hashedPassword, employee.employee_id]);
  }

  if (employee.company_role_id) {
    const employeeRoleQuery = `
        UPDATE employee_role
        SET 
          company_role_id = ?
        WHERE
          employee_id = ?
      `;
    await conn.query(employeeRoleQuery, [
      employee.company_role_id,
      employee.employee_id,
    ]);
  }

  updatedEmployee = {
    employee_id: employee.employee_id,
    employee_email: employee.employee_email,
    employee_phone: employee.employee_phone,
    active_employee: employee.active_employee,
    company_role_id: employee.company_role_id,
  };
  return updatedEmployee;
};

// Export the functions for use in the controller
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  editEmployee,
};

