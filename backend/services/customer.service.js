const { v4: uuidv4 } = require("uuid");
const conn = require("../config/db.config");

async function checkIfCustomerExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

async function addCustomer(customer) {
  const customer_hash = uuidv4();
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

module.exports = { addCustomer, checkIfCustomerExists };
