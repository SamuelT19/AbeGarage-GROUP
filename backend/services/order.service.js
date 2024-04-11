const { query, withTransaction } = require("../config/db.config");
const { v4: uuidv4 } = require("uuid");


const createOrder = async (orderData) => {
  try {
    await withTransaction(async () => {
      const order_hash = uuidv4();

      const query1 =
        "INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES (?,?,?,?,?)";
      const rows1 = await query(query1, [
        orderData.employee_id,
        orderData.customer_id,
        orderData.vehicle_id,
        orderData.active_order,
        order_hash,
      ]);
      if (rows1.affectedRows !== 1) {
        return false;
      }

      const order_id = rows1.insertId;

      // Insert into the order_services table
      if (orderData.order_services && orderData.order_services.length > 0) {
        const orderServicesValues = orderData.order_services
          .map(
            (service) =>
              `(${order_id}, ${service.service_id}, ${service.service_completed})`
          )
          .join(",");
        const orderServicesQuery = `INSERT INTO order_services (order_id, service_id, service_completed) VALUES ${orderServicesValues}`;
        const orderServicesRows = await query(orderServicesQuery);

        if (
          orderServicesRows.affectedRows !== orderData.order_services.length
        ) {
          console.log("Failed to insert into order_services table");
          return false;
        }
      }

      const query4 =
        "INSERT INTO order_info (order_id, order_total_price, estimated_completion_date, completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed) VALUES (?,?,?,?,?,?,?,?) ";
      const rows4 = await query(query4, [
        order_id,
        orderData.order_total_price,
        orderData.estimated_completion_date,
        orderData.completion_date,
        orderData.additional_request,
        orderData.notes_for_internal_use,
        orderData.notes_for_customer,
        orderData.additional_requests_completed,
      ]);

      // Insert into the order_status table
      if (orderData.order_status) {
        const orderStatusQuery =
          "INSERT INTO order_status (order_id, order_status) VALUES (?, ?)";
        const orderStatusRows = await query(orderStatusQuery, [
          order_id,
          orderData.order_status,
        ]);

        if (orderStatusRows.affectedRows !== 1) {
          console.log("Failed to insert into order_status table");
          return false;
        }
      }
    });
      return true;
      
  } catch (error) {
    console.log("Transaction error:", error);
  }
};

module.exports = {
    createOrder
}
