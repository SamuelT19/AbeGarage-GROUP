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
    },
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
    throw new Error(error.response.data.message);
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

const getAllOrders = async (token) => {
  try {
    const response = await axiosBase.get(`/api/order/all`, {
      headers: {
        "x-access-token": token,
      },
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

//get ordered services
const orderedServices = async (order_id) => {
  try {
    const response = await axiosBase.get(`/api/order/single/${order_id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch ordered services: ${error.message}`);
  }
};

//get order by id
const getOrderByID = async (order_id) => {
  try {
    const response = await axiosBase.get(`/api/order/single/${order_id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch order by id: ${error.message}`);
  }
};

// Update order progress
const updateOrderProgress = async (order_id, updatedOrder) => {
  try {
    const response = await axiosBase.put(
      `/api/order/status/${order_id}`,
      updatedOrder
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update order progress: ${error.message}`);
  }
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

//get orders by customer id

const getOrdersByCustomerId = async (customer_id, token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  console.log(customer_id);
  const response = await axiosBase.get(
    `${api_url}/api/order/all/${customer_id}`,
    requestOptions
  );
  console.log(response.data);
  return response.data;
};

// Export all the functions
const orderService = {
  getAllServices,
  createOrder,
  getAllOrder,
  getAllOrders,
  orderedServices,
  getOrderByID,
  updateOrderProgress,
  getOrderByOrderId,
  updateOrder,
  getOrdersByCustomerId,
};
export default orderService;
