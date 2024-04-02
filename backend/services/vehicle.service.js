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


// Export the vehicle service
module.exports = {
  checkIfVehicleExists,
  createVehicle,
 
};
