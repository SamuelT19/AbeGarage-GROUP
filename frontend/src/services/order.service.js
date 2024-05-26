import { axiosBase } from "../util/Axios";

// get all orders
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

//get orere by id
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
      `/api/order/${order_id}`,
      updatedOrder
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update order progress: ${error.message}`);
  }
};
//export all functions

const orderService = {
  getAllOrders,
  orderedServices,
  getOrderByID,
};

export default orderService;
