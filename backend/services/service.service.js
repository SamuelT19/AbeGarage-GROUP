const conn = require("../config/db.config");
async function addService(service) {
  const checkquery =
    "SELECT service_name FROM common_services WHERE service_name = ?";
  const [check] = await conn.query(checkquery, [service.service_name]);
  if (check) {
    return;
  }

  const query =
    "INSERT INTO common_services (service_name, service_description, service_price) VALUES (?, ?, ?)";
  const rows = await conn.query(query, [
    service.service_name,
    service.service_description,
    service.service_price,
  ]);

  return rows;
}

const getSingleService = async (service_id) => {
  const query = "SELECT * FROM common_services WHERE service_id = ?";
  const row = await conn.query(query, [service_id]);
  return row;
};

const editService = async (service) => {
  let updatedService = {};

  if (
    service.service_name ||
    service.service_description ||
    service.service_price
  ) {
    const serviceQuery = `
        UPDATE common_services
        SET 
          ${service.service_name ? "service_name = ?," : ""}
          ${service.service_description ? "service_description = ?," : ""}
          ${service.service_price ? "service_price = ?" : ""}
        WHERE
          service_id = ?
      `;
    const queryParams = [
      service.service_name,
      service.service_description,
      service.service_price,
      service.service_id,
    ].filter((param) => param !== undefined && param !== "");

    const rows = await conn.query(serviceQuery, queryParams);
    if (rows) {
      updatedService = {
        service_name: service.service_name,
        service_description: service.service_description,
        service_price: service.service_price,
      };
    }
  }
  return updatedService;
};



async function deleteService(serviceId) {
  const query = "DELETE FROM common_services WHERE service_id = ?";
  const rows = await conn.query(query, [serviceId]);

  return true;
}

module.exports = { addService, getSingleService, editService, deleteService };
