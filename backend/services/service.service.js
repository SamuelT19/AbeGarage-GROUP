
const conn = require("../config/db.config");


// check if service exists



async function checkIfServiceExists(service_name) {
 const query =
   "SELECT *  FROM common_services WHERE service_name = ?";
  
  const rows = await conn.query(query, [service_name]);
  
   
console.log(rows);
if (rows.length > 0) {
  return true;
}
return false;
}


async function addService(service) {
  // Insert service data into the database
  const query =
    "INSERT INTO common_services (service_name, service_description, service_price) VALUES (?, ?, ?)";
  const result = await conn.query(query, [
    service.service_name,
    service.service_description,
    service.service_price,
  ]);

  if (result.affectedRows !== 1) {
    throw new Error("Failed to insert service");
  }

  const service_id = result.insertId;

  // construct to the employee object to return
  createdService = {
    service_id: service_id,
  };
  return createdService
}

   


// get all service
async function getAllServices() {
  const query = "SELECT * FROM common_services";
  const rows = await conn.query(query);
  return rows;
}

// get customer by id
async function getServiceById(service_id) {
  const query = `SELECT * FROM common_services WHERE service_id =?`     
    const rows = await conn.query(query, [service_id])
  return rows;
}

// delete service by id
async function deleteServiceById(service_id) {
  // delete from common_services
  const deleteService = "DELETE FROM common_services WHERE service_id = ?";
  await conn.query(deleteService, [service_id]);

  return true;
}

// edit service

async function editService(updatedServiceData) {
  const query =
  "UPDATE common_services SET service_name = ?, service_description = ?, service_price = ? WHERE service_id = ?";
  const rows = await conn.query(query, [
    updatedServiceData.service_name,
    updatedServiceData.service_description,
    updatedServiceData.service_price,
    updatedServiceData.service_id,
  ]);
  return rows;
}

module.exports = {
  addService,
  checkIfServiceExists,
  getAllServices,
  getServiceById,
  deleteServiceById,
  editService,
};
