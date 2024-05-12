import { axiosBase } from "../util/Axios";

// get all orders
const getAllOrders = async (token) => {
  try {
    const response = await axiosBase.get(`/api/order/all`, {
      headers: {
        "x-access-token": token,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

//export all functions

const orderService = {
  getAllOrders,
};

export default orderService;
