import { axiosBase } from "../util/Axios";

// Import from the env
const api_url = process.env.REACT_APP_API_URL;

// A function to send post request to create a new employee 
const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    },
    body: JSON.stringify(formData)
  };
  console.log(requestOptions);
  const response = await fetch(`${api_url}/api/employee/add`, requestOptions);
  return response;
}

// A function to send get request to get all employees
const getAllEmployees = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/employee/all`, requestOptions);
  return response;
};

//* A function to send delete request to delete an employee
const deleteEmployee = async (employee_id, token) => {
  console.log(token);
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  const response = await fetch(
    `${api_url}/api/employee/${employee_id}`,
    requestOptions
  );
  console.log(response);
  return response.ok;
};

// *End of function to delete an employee


// A function to send get request to get a single employee it is get request
const getEmployeeById = async (employee_id, token) => {
  
    const response = await axiosBase.get(`/api/employee/${employee_id}`, {
      headers: {
        "x-access-token": token,
      },
    });
  console.log(response);
    return response;
}; 
  
const editEmployee = async (formData, token) => {
  const response = await axiosBase.post(`/api/employee/edit`, formData, {
    headers: {
      "x-access-token": token,
    },
  });
  console.log(response);
  return response;
};

// Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  editEmployee,
};
export default employeeService;
