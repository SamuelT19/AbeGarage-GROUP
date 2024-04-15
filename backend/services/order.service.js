const { query, withTransaction } = require("../config/db.config");
const { v4: uuidv4 } = require("uuid");

// with suucess validation

// function to fetch all orders with related information
async function getAllOrders() {
  const sql = `
        SELECT 
            o.order_id,
            o.employee_id,
            o.customer_id,
            o.vehicle_id,
            o.order_date,
            o.active_order,
            o.order_hash,
            os.order_status,
            v.vehicle_year,
            v.vehicle_make,
            v.vehicle_model,
            v.vehicle_tag,
            cin.customer_first_name,
            cin.customer_last_name,
            cid.customer_email,
            cid.customer_phone_number,
            e.employee_first_name,
            e.employee_last_name,
            e.employee_phone
        FROM 
            orders o
        JOIN 
            order_status os ON o.order_id = os.order_id
        JOIN 
            customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
        JOIN 
            customer_identifier cid ON o.customer_id = cid.customer_id
        JOIN 
            customer_info cin ON o.customer_id = cin.customer_id
        JOIN 
            employee_info e ON o.employee_id = e.employee_id;
    `;
  const rows = await query(sql);

  // Organize the fetched data into separate objects for each order
  const ordersData = rows.map((row) => {
    return {
      order: {
        order_id: row.order_id,
        employee_id: row.employee_id,
        customer_id: row.customer_id,
        vehicle_id: row.vehicle_id,
        order_date: row.order_date,
        active_order: row.active_order,
        order_hash: row.order_hash,
        order_status: row.order_status,
      },
      vehicle: {
        vehicle_id: row.vehicle_id,
        vehicle_year: row.vehicle_year,
        vehicle_make: row.vehicle_make,
        vehicle_model: row.vehicle_model,
        vehicle_tag: row.vehicle_tag,
      },
      customer: {
        customer_id: row.customer_id,
        customer_first_name: row.customer_first_name,
        customer_last_name: row.customer_last_name,
        customer_email: row.customer_email,
        customer_phone_number: row.customer_phone_number,
      },
      employee: {
        employee_id: row.employee_id,
        employee_first_name: row.employee_first_name,
        employee_last_name: row.employee_last_name,
        employee_phone: row.employee_phone,
      },
    };
  });

  return ordersData;
}

//edit order service
const editOrder = async (orderData) => {
  try {
    let success = false;
    await withTransaction(async (connection) => {
      const order_id = orderData.order_id;
      console.log(order_id);

      // Update orders table
      const query1 = `UPDATE orders SET active_order = ? WHERE order_id = ?`;
      const rows1 = await connection.execute(query1, [
        orderData.active_order,
        order_id,
      ]);
      console.log(rows1);
      if (rows1.affectedRows !== 1) {
        throw new Error("Failed to update active_order in orders table");
      }

      // Update order_info table
      const query2 = `UPDATE order_info SET order_total_price = ?, estimated_completion_date = ?, completion_date = ?,
additional_request = ?, additional_requests_completed = ? WHERE order_id = ?`;
      const rows2 = await connection.execute(query2, [
        orderData.order_total_price,
        orderData.estimated_completion_date,
        orderData.completion_date,
        orderData.additional_request,
        orderData.additional_requests_completed,
        order_id,
      ]);
      console.log(rows2);
      if (rows2.affectedRows !== 1) {
        throw new Error("Failed to update order_info table");
      }

      // Update order_status table
      const query3 = `UPDATE order_status SET order_status = ? WHERE order_id = ?`;
      const rows3 = await connection.execute(query3, [
        orderData.order_status,
        order_id,
      ]);
      console.log(rows3);
      if (rows3.affectedRows !== 1) {
        throw new Error("Failed to update order_status table");
      }

      // Update order_services table
      if (orderData.order_services && orderData.order_services.length > 0) {
        for (const service of orderData.order_services) {
          const updateServiceQuery = `UPDATE order_services SET service_completed = ? WHERE order_id = ? AND service_id = ?`;
          const rows4 = await connection.execute(updateServiceQuery, [
            service.service_completed,
            order_id,
            service.service_id,
          ]);

          console.log(rows4);
          if (!rows4.affectedRows) {
            throw new Error("Failed to update order_services table");
          }
        }
      }

      success = true;
    });
    return success; // Return true if everything is successful
  } catch (error) {
    console.log("Transaction error:", error);
    throw error; // Throw the error to trigger the rollback
  }
};

module.exports = {
  getAllOrders,
  editOrder,
};
