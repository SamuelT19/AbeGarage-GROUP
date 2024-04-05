// get vehicle by id
async function getVehicleById(vehicle_id) {
  const query = `
    SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?
  `;
  const rows = await conn.query(query, [vehicle_id]);
  return rows;
}
module.exports={getVehicleById};