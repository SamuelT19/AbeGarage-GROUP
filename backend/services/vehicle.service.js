//import db connection
const conn = require("../config/db.config");

// A function to check if vehicle exists in the database
async function checkIfVehicleExists(vehicleData) {
  console.log(vehicleData);
  const query =
    "SELECT * FROM customer_vehicle_info  WHERE  vehicle_serial = ? ";
  const rows = await conn.query(query, [vehicleData.vehicle_serial]);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new vehicle by customer id
async function createVehicle(vehicleData) {
  // Initialize the vehicle data
  const {
    customer_id,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
  } = vehicleData;

  try {
    // Construct the SQL query
    const query = `
      INSERT INTO customer_vehicle_info 
        (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute the query
    const result = await conn.query(query, [
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    ]);

    // Check if the query was successful
    if (result.affectedRows === 1) {
      // Vehicle successfully added to the database
      return { success: true };
    } else {
      // Handle the case where no rows were affected (e.g., query failed)
      return { success: false, error: "Failed to add vehicle" };
    }
  } catch (error) {
    // Handle any errors that occurred during the execution of the function
    console.error("Error creating vehicle:", error);
    return { success: false, error: "Internal server error" };
  }
}

// Function to retrieve all vehicles for a single customer
async function getAllVehicles(customerId) {
  const query = `SELECT *
  FROM customer_vehicle_info cvi
  INNER JOIN customer_identifier ci ON ci.customer_id = cvi.customer_id
  WHERE cvi.customer_id = ?`;

  try {
    const results = await conn.query(query, [customerId]);
    console.log(results); // Handle the retrieved vehicles as needed
    return results;
  } catch (error) {
    console.error("Error retrieving vehicles from the database:", error);
    throw error;
  }
}

// get vehicle by id
async function getVehicleById(vehicle_id) {
  const query = `
    SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?
  `;
  const rows = await conn.query(query, [vehicle_id]);
  return rows;
}

// Function to delete a vehicle by its ID
async function deleteVehicle(vehicleId) {
  try {
    // Check if the vehicleId is defined
    if (!vehicleId) {
      throw new Error("Vehicle ID must be provided");
    }

    // Execute the DELETE query
    const result = await conn.query(
      "DELETE FROM customer_vehicle_info WHERE vehicle_id = ?",
      [vehicleId]
    );
    // Check if the query was successful
    return result.affectedRows === 1;
  } catch (error) {
    // Handle any errors
    console.error("Error deleting vehicle:", error);
    throw error;
  }
}

//edit vehicle by id
async function editVehicleById(vehicleData) {
  const {
    vehicle_id,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
  } = vehicleData;

  try {
    // Construct the SQL query
    const query = `
      UPDATE customer_vehicle_info 
      SET vehicle_year = ?, vehicle_make = ?, vehicle_model = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ?
      WHERE vehicle_id = ?`;

    // Execute the query
    const result = await conn.query(query, [
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
      vehicle_id,
    ]);

    // Check if the query was successful
    if (result.affectedRows === 1) {
      // Vehicle successfully updated in the database
      return { success: true };
    } else {
      // Handle the case where no rows were affected (e.g., query failed)
      return { success: false, error: "Failed to update vehicle" };
    }
  } catch (error) {
    // Handle any errors that occurred during the execution of the function
    console.error("Error updating vehicle:", error);
    return { success: false, error: "Internal server error" };
  }
}

// Export the vehicle service
module.exports = {
  checkIfVehicleExists,
  createVehicle,
  getVehicleById,
  deleteVehicle,
  editVehicleById,
  getAllVehicles,
};
