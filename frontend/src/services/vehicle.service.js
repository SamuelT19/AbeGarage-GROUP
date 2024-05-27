import { axiosBase } from "../util/Axios";

// Import from the env
const api_url = process.env.REACT_APP_API_URL;

// A function to send post request to create a new vehicle
const createVehicle = async (formData, loggedInEmployeeToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };
  const response = await axiosBase.post(`/api/vehicle/add`, formData, config);
  return response;
};

// Function to send a GET request to retrieve all vehicles by a customer ID
const getAllVehiclesBycustomer = async (customer_id, token) => {
  try {
    const response = await axiosBase.get(`/api/vehicle/all/${customer_id}`, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch vehicles: ${error.message}`);
  }
};

// Function to send a GET request to retrieve a single vehicle by its ID
const getVehicleById = async (vehicle_id, token) => {
  try {
    const response = await axiosBase.get(`/api/vehicle/single/${vehicle_id}`, {
      headers: {
        "x-access-token": token,
      },
    });
    // console.log(token);
    // console.log(response);
    return response.data.vehicle; // Return the vehicle data directly
  } catch (error) {
    console.error("Error retrieving vehicle by ID:", error);
    return null;
  }
};

// Function to send a POST request to edit a vehicle
const editVehicle = async (formData, token) => {
  try {
    const response = await axiosBase.put(`/api/vehicle/edit`, formData, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing vehicle:", error);
    return null;
  }
};

//delete vehicle
const deleteVehicleById = async (vehicle_id, token) => {
  console.log(token);
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  const response = await fetch(
    `${api_url}/api/vehicle/delete/${vehicle_id}`,
    requestOptions
  );
  //   console.log(response);
  return response.ok;
};

const vehicleService = {
  createVehicle,
  getAllVehiclesBycustomer,
  getVehicleById,
  editVehicle,
  deleteVehicleById,
};

export default vehicleService;
