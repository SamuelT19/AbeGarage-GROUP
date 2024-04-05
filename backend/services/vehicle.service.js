// Function to retrieve all vehicles for a single customer
async function getAllVehicles(customerId) {
  const query = `SELECT *
  FROM customer_vehicle_info cvi
  INNER JOIN customer_identifier ci ON ci.customer_id = cvi.customer_id
  WHERE cvi.customer_id = ?`;
  try {
    const results = await conn.query(query, [customerId]);
    console.log ( results); // Handle the retrieved vehicles as needed
    return results;
  } catch (error) {
    console.error('Error retrieving vehicles from the database:', error);
    throw error;
  }
}
