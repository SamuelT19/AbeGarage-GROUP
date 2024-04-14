const { query, withTransaction } = require("../config/db.config");
const { v4: uuidv4 } = require("uuid");

const createOrder = async (orderData) => {
  try {
    let success = false;
    await withTransaction(async (connection) => {
      const order_hash = uuidv4();

      const query1 =
        "INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES (?,?,?,?,?)";
      const [rows1] = await connection.execute(query1, [
        orderData.employee_id,
        orderData.customer_id,
        orderData.vehicle_id,
        orderData.active_order,
        order_hash,
      ]);
      if (rows1.affectedRows !== 1) {
        throw new Error("Failed to insert into orders table");
      }

      const order_id = rows1.insertId;

      // Insert into the order_services table
        const orderServicesValues = orderData.order_services
          .map(
            (service) =>
              `(${order_id}, ${service.service_id}, ${service.service_completed})`
          )
          .join(",");
        const orderServicesQuery = `INSERT INTO order_services (order_id, service_id, service_completed) VALUES ${orderServicesValues}`;
        const [orderServicesRows] = await connection.execute(
          orderServicesQuery
        );

        if (
          orderServicesRows.affectedRows !== orderData.order_services.length
        ) {
          throw new Error("Failed to insert into order_services table");
        }

      // Insert into the order_info table
      const query4 =
        "INSERT INTO order_info (order_id, order_total_price, estimated_completion_date, completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed) VALUES (?,?,?,?,?,?,?,?) ";
      const [rows4] = await connection.execute(query4, [
        order_id,
        orderData.order_total_price,
        orderData.estimated_completion_date,
        orderData.completion_date,
        orderData.additional_request,
        orderData.notes_for_internal_use,
        orderData.notes_for_customer,
        orderData.additional_requests_completed,
      ]);

      if (rows4.affectedRows !== 1) {
        throw new Error("Failed to insert into order_info table");
      }

      // Insert into the order_status table
      
      const orderStatusQuery =
        "INSERT INTO order_status (order_id, order_status) VALUES (?, ?)";
      const [orderStatusRows] = await connection.execute(orderStatusQuery, [
        order_id,
        orderData.order_status,
      ]);

      if (orderStatusRows.affectedRows !== 1) {
        throw new Error("Failed to insert into order_status table");
      }

      // If everything executed successfully, set success flag to true
      success = true;
    });

    return success;
  } catch (error) {
    console.log("Transaction error:", error);
    return false; // Return false in case of error
  }
};

const orderedServices = async (order_id) => {
  const sql =
    "SELECT * FROM order_services JOIN common_services ON order_services.service_id = common_services.service_id WHERE order_services.order_id = ?";
  const rows = await query(sql, [order_id]);
  console.log(rows);
  return rows;
};

const getVehicleByOrderId = async (order_id) => {
  const sql =
    "SELECT * FROM orders JOIN customer_vehicle_info ON customer_vehicle_info.vehicle_id = orders.vehicle_id JOIN customer_identifier ON customer_identifier.customer_id = orders.customer_id JOIN customer_info ON customer_info.customer_id = customer_identifier.customer_id  WHERE orders.order_id = ?";
  const rows = await query(sql, [order_id]);
  return rows;
};

module.exports = {
  createOrder,
  orderedServices,
  getVehicleByOrderId,
};