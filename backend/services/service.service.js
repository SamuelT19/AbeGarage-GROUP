const conn = require("../config/db.config");
async function addService(service) {
  const query =
    "INSERT INTO common_services (service_name, service_description, service_price) VALUES (?, ?, ?)";
  const rows = await conn.query(query, [
    service.service_name,
    service.service_description,
    service.service_price,
  ]);

  return rows;
}

module.exports = { addService };
