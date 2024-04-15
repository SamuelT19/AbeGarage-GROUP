const { v4: uuidv4 } = require("uuid");
const conn = require("../config/db.config");
// Check if customer exists
async function checkIfCustomerExists(email) {
  const query = "SELECT * FROM customer_identifier WHERE customer_email = ? ";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}
// Add customer
async function addCustomer(customer) {
  const customer_hash = uuidv4();
  console.log(customer_hash);
  try {
    // Insert customer data into the database
    const query =
      "INSERT INTO customer_identifier (customer_email, customer_phone_number,customer_hash) VALUES (?, ?,?)";
    const result = await conn.query(query, [
      customer.customer_email,
      customer.customer_phone_number,
      customer_hash,
    ]);

    if (result.affectedRows !== 1) {
      throw new Error("Failed to insert customer identifier");
    }

    const customer_id = result.insertId;

    // Insert customer info into customer_info table
    const queryInfo =
      "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)";
    const resultInfo = await conn.query(queryInfo, [
      customer_id,
      customer.customer_first_name,
      customer.customer_last_name,
      1,
    ]);

    if (resultInfo.affectedRows !== 1) {
      throw new Error("Failed to insert customer info");
    }

    return {
      customer_id: customer_id,
    };
  } catch (err) {
    console.error(err);
    return false;
  }
}

// get all customers
async function getAllCustomers() {
  const query =
    "SELECT * FROM customer_info JOIN customer_identifier ON customer_info.customer_id = customer_identifier.customer_id";

  const rows = await conn.query(query);
  return rows;
}

// get customer by id
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

// delete customer by id
async function deleteCustomerById(customerId) {
  // delete from customer_info
  const deleteCustomerInfo = "DELETE FROM customer_info WHERE customer_id = ?";
  await conn.query(deleteCustomerInfo, [customerId]);

  const deleteCustomerIdentifier =
    "DELETE FROM customer_identifier WHERE customer_id = ?";
  await conn.query(deleteCustomerIdentifier, [customerId]);

  return true;
}

// edit customer
async function editCustomer(updatedCustomerData) {
  if (
    updatedCustomerData.customer_first_name ||
    updatedCustomerData.customer_last_name ||
    updatedCustomerData.active_customer_status
  ) {
    const query = `UPDATE customer_info SET
  ${updatedCustomerData.customer_first_name ? "customer_first_name = ?," : ""} 
  ${updatedCustomerData.customer_last_name ? "customer_last_name = ?," : ""}
  ${
    updatedCustomerData.active_customer_status
      ? "active_customer_status = ?"
      : ""
  }
   WHERE customer_id = ? `;

    const queryParams = [
      updatedCustomerData.customer_first_name,
      updatedCustomerData.customer_last_name,
      updatedCustomerData.active_customer_status,
      updatedCustomerData.customer_id,
    ].filter((param) => param !== undefined);

    const rows = await conn.query(query, queryParams);
    return rows;
  }
}

module.exports = {
  addCustomer,
  checkIfCustomerExists,
  getAllCustomers,
  getCustomerById,
  deleteCustomerById,
  editCustomer,
};
