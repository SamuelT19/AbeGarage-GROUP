//import db connection
const conn = require("../config/db.config");

// A function to check if vehicle exists in the database
async function checkIfVehicleExists(vehicleData) {
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
    return true;
  }
}

// Function to retrieve all vehicles for a single customer
async function getAllVehicles(customerId) {
  const query = `SELECT *
  FROM customer_vehicle_info cvi
  INNER JOIN customer_identifier ci ON ci.customer_id = cvi.customer_id
  WHERE cvi.customer_id = ?`;

  const results = await conn.query(query, [customerId]);
  console.log(results); // Handle the retrieved vehicles as needed
  return results;
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
  if (result.affectedRows === 1) return result;
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

  // Construct the SQL query
  const query = `
      UPDATE customer_vehicle_info 
      SET 
        ${vehicle_year != null ? "vehicle_year = ?," : ""}
        ${vehicle_make != null ? "vehicle_make = ?," : ""}
        ${vehicle_model != null ? "vehicle_model = ?," : ""}
        ${vehicle_type != null ? "vehicle_type = ?," : ""}
        ${vehicle_mileage != null ? "vehicle_mileage = ?," : ""}
        ${vehicle_tag != null ? "vehicle_tag = ?," : ""}
        ${vehicle_serial != null ? "vehicle_serial = ?," : ""}
        ${vehicle_color != null ? "vehicle_color = ?" : ""}
      WHERE vehicle_id = ?`;

  // Prepare parameters for the query
  const queryParams = [
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
    vehicle_id,
  ].filter((param) => param !== undefined);

  // Execute the query
  const result = await conn.query(query, queryParams);

  // Check if the query was successful
  if (result.affectedRows === 1) {
    // Vehicle successfully updated in the database
    return result;
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
