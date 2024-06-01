// import axios from util
import { axiosBase } from "../util/Axios";

// Import from the env
const api_url = process.env.REACT_APP_API_URL;

// A function to send  to get all services
const getAllServices = async (token) => {
  // console.log(token);
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    }
  };
  const response = await axiosBase.get(
    `${api_url}/api/service/all`,
    requestOptions
  );
  console.log(response);
  return response;
};


const createOrder = async (orderData, loggedInEmployeeToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };

  try {
    const response = await axiosBase.post(
      `${api_url}/api/order/new`,
      orderData,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message );
  }
};


// A function to send get request to get all Orders
const getAllOrder = async (token) => {
  // console.log(token);
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await axiosBase.get(
    `${api_url}/api/order/all`,
    requestOptions
  );
  console.log(response);
  return response;
};

// A function to send get request to get order by order id
const getOrderByOrderId = async (order_id, token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  const response = await axiosBase.get(
    `${api_url}/api/order/single/${order_id}`,
    requestOptions
  );
  console.log(response);
  return response;
};

const updateOrder = async (formData, token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  const response = await axiosBase.put(
    `${api_url}/api/order/edit`,
  
    formData,
    requestOptions
  );
  console.log(response);
  return response;
};


// Export all the functions
const orderService = {
  getAllServices,
  createOrder,
  getAllOrder,
  getOrderByOrderId,
  updateOrder,
};
export default orderService;
