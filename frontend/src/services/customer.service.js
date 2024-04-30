// customer.service.js
import { axiosBase } from "../util/Axios";

const getCustomerById = async (customer_id, token) => {
  try {
    const response = await axiosBase.get(`/api/customer/${customer_id}`, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error retrieving customer by ID:", error);
    throw new Error("Failed to retrieve customer information");
  }
};

const customerService = {
  getCustomerById, // Export the getCustomerById function
};

export default customerService;
