// import axios from util
import { axiosBase } from "../util/Axios";

// Import from the env
const api_url = process.env.REACT_APP_API_URL;

// A function to send post request to create a new customer

const createCustomer = async (formData, loggedInEmployeeToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };

  try {
    const response = await axiosBase.post(
      `${api_url}/api/customer/add`,
      formData,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    // Handle error here
    console.log(error.message);
    throw error;
  }
};
// A function to send get request to get all customers
const getAllCustomer = async (token) => {
  // console.log(token);
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await axiosBase.get(
    `${api_url}/api/customer/all`,requestOptions
  );
  console.log(response);
  return response;
};

// A function to send get request to get customer by id
const getCustomerById = async (customer_id, token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  const response = await axiosBase.get(
    `${api_url}/api/customer/${customer_id}`,
    requestOptions
  );
  console.log(response);
  return response;
};

///api/customers/edit/:customer_id

const updateCustomerById = async (formData, token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  const response = await axiosBase.put(
    `${api_url}/api/customer/edit`,
    // Reversed the arguments order
    formData,
    requestOptions
  );
  console.log(response);
  return response;
};
//   console.log(response);
//   return response;
// };

// Export all the functions
const customerService = {
  createCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomerById,
};
export default customerService;
