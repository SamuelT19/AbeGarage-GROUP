 // import dbconfig
const conn = require("../config/db.config");

// A function to get all common services
async function getAllCommonServices() {
  const query = "SELECT * FROM common_services";
  const rows = await conn.query(query);
  return rows;
}

// A function to add a common service to the database
async function addCommonService(service) {
  let createdService = {};
  try {
    const query = "INSERT INTO common_services (service_name, service_description, service_price) VALUES (?, ?, ?)";
    const rows = await conn.query(query, [service.service_name, service.service_description, service.service_price]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    createdService = {
      service_id: rows.insertId
    };
  } catch (err) {
    console.log(err);
  }
  return createdService;
}

// Export the functions for use in the controller
module.exports = {
  addCommonService,
};