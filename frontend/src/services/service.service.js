import { axiosBase } from "../util/Axios";

const api_url = process.env.REACT_APP_API_URL;

const addService = async (serviceData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };
  try {
    const response = await axiosBase.post(
      `${api_url}/api/service/add`,
      serviceData,
      requestOptions
    );
    if (response.status !== 200) {
      throw new Error(`Failed to add service: ${response.statusText}`);
    }
    console.log(response);
    return response;
  } catch (error) {
    // Handle error here
    console.log(error.message);
    throw error;
  }
};

const getAllServices = async (token) => {
  try {
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
    if (response.status !== 200) {
      throw new Error(`Failed to fetch services: ${response.statusText}`);
    }
    console.log(response.data); // Logging data here
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Failed to fetch services");
  }
};

const deleteServiceById = async (service_id, token) => {
  console.log(token);
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/service/delete/${service_id}`,
    requestOptions
  );
  return response.ok;
};

const serviceService = {
  addService,
  getAllServices,
  deleteServiceById,
};

export default serviceService;
