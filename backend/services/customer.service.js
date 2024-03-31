//import query from '../db/db-connection';
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");

// get customer by id - get customer info and customer identifier
async function getCustomerById(customerId) {
  const query = `
    SELECT customer_info.*, customer_identifier.customer_email, customer_identifier.customer_phone_number, customer_identifier.customer_added_date, customer_identifier.customer_hash
    FROM customer_info
    
    LEFT JOIN customer_identifier ON customer_info.customer_id = customer_identifier.customer_id
    WHERE customer_info.customer_id = ?
  `;
  const rows = await conn.query(query, [customerId]);
  return rows;
}
async function editCustomer(updatedCustomerData) {
  const query =
    "UPDATE customer_info SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ? WHERE customer_id = ?";
  const rows = await conn.query(query, [
    updatedCustomerData.customer_first_name,
    updatedCustomerData.customer_last_name,
    updatedCustomerData.active_customer_status,
    updatedCustomerData.customer_id,
  ]);
  return rows;
}

//export the module
module.exports = {
  getCustomerById,
  editCustomer,
};
