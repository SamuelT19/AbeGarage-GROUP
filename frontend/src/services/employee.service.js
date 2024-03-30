// Import from the env
const api_url = process.env.REACT_APP_API_URL;

// A function to send post request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  console.log(requestOptions);
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
};

// A function to send get request to get all employees
const getAllEmployees = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/employees`, requestOptions);
  return response;
};

// A function to send get request to get a single employee it is get request
const getEmployeeById = async (id, token) => {
  const requestOptions = {
    method: "GET",
      const response = await fetch(`${api_url}/api/employee/${id}`, requestOptions);
  return response;
};

//* A function to send delete request to delete an employee
const deleteEmployee = async (employeeId, token) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  const response = await fetch(
    `${api_url}/api/employee/${employeeId}`,
    requestOptions
  );
  console.log(response);
  return response;
};
// *End of function to delete an employee

// Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,

};
export default employeeService;
