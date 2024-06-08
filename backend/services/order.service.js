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
      const [orderServicesRows] = await connection.execute(orderServicesQuery);

      if (orderServicesRows.affectedRows !== orderData.order_services.length) {
        throw new Error("Failed to insert into order_services table");
      }

      // Insert into the order_info table
      const query4 =
        "INSERT INTO order_info (order_id, order_total_price, estimated_completion_date, completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed, additional_request_price) VALUES (?,?,?,?,?,?,?,?,?) ";
      const [rows4] = await connection.execute(query4, [
        order_id,
        orderData.order_total_price,
        orderData.estimated_completion_date,
        orderData.completion_date,
        orderData.additional_request,
        orderData.notes_for_internal_use,
        orderData.notes_for_customer,
        orderData.additional_requests_completed,
        orderData.additional_request_price,
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

const getOrderByID = async (order_id) => {
  const sql = `
    SELECT o.*, oi.*, os.* FROM orders o LEFT JOIN order_info oi ON o.order_id = oi.order_id
    LEFT JOIN order_status os ON o.order_id = os.order_id
    WHERE o.order_id = ?
  `;
  const rows = await query(sql, [order_id]);
  console.log(rows);
  return rows; // Return the first row or null if no rows found
};

const getVehicleByOrderId = async (order_id) => {
  const sql =
    "SELECT * FROM orders JOIN customer_vehicle_info ON customer_vehicle_info.vehicle_id = orders.vehicle_id JOIN customer_identifier ON customer_identifier.customer_id = orders.customer_id JOIN customer_info ON customer_info.customer_id = customer_identifier.customer_id  WHERE orders.order_id = ?";
  const rows = await query(sql, [order_id]);
  console.log(rows);
  return rows;
};

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
      if (orderData.active_order) {
        const query1 = `UPDATE orders SET ${
          orderData.active_order ? "active_order = ?" : ""
        } WHERE order_id = ?`;
        const [rows1] = await connection.execute(query1, [
          orderData.active_order,
          order_id,
        ]);
        console.log(rows1);
        if (!rows1) {
          throw new Error("Failed to update active_order in orders table");
        }
      }

      // Update order_info table
      if (
        orderData.order_total_price ||
        orderData.estimated_completion_date ||
        // orderData.completion_date ||
        orderData.additional_request ||
        orderData.notes_for_internal_use ||
        orderData.notes_for_customer ||
        orderData.additional_requests_completed ||
        orderData.additional_request_price
      ) {
        const query2 = `UPDATE order_info SET
              order_total_price = ?,
              estimated_completion_date = ?,
              additional_request = ?,
              notes_for_internal_use = ?,
              notes_for_customer = ?,
              additional_requests_completed = ?,
              additional_request_price = ?
              WHERE order_id = ?`;

        const [rows2] = await connection.execute(query2, [
          orderData.order_total_price,
          orderData.estimated_completion_date,
          // orderData.completion_date,
          orderData.additional_request || "",
          orderData.notes_for_internal_use,
          orderData.notes_for_customer,
          orderData.additional_requests_completed,
          orderData.additional_request_price || 0,
          order_id,
        ]);
        console.log(rows2);
        if (!rows2) {
          throw new Error("Failed to update order_info table");
        }
      }

      // Update order_status table
      if (orderData.order_status) {
        const query3 = `UPDATE order_status SET 
      ${orderData.order_status ? "order_status = ?" : ""} WHERE order_id = ?`;
        const [rows3] = await connection.execute(query3, [
          orderData.order_status,
          order_id,
        ]);
        console.log(rows3);
        if (!rows3) {
          throw new Error("Failed to update order_status table");
        }
      }

      // Update order_services table
      if (orderData.order_services && orderData.order_services.length > 0) {
        for (const service of orderData.order_services) {
          if (service.service_completed) {
            const updateServiceQuery = `UPDATE order_services SET 
             ${
               service.service_completed ? "service_completed = ?" : ""
             } WHERE order_id = ? AND service_id = ?`;
            const [rows4] = await connection.execute(updateServiceQuery, [
              service.service_completed,
              order_id,
              service.service_id,
            ]);

            console.log(rows4);
            if (!rows4) {
              throw new Error("Failed to update order_services table");
            }
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
// Update order progress in the order_status table

const updateOrderProgress = async (order_id, orderData) => {
  try {
    await withTransaction(async (connection) => {
      // Update order_status in the order_status table
      const query1 =
        "UPDATE order_status SET order_status = ? WHERE order_id = ?";
      const [rows1] = await connection.execute(query1, [
        orderData.order_status,
        order_id,
      ]);
      if (rows1.affectedRows === 0) {
        throw new Error("Failed to update order_status table");
      }

      // Update services in the order_services table
      for (const service of orderData.order_services) {
        if (
          service.service_completed !== undefined &&
          service.order_service_id
        ) {
          const updateServiceQuery =
            "UPDATE order_services SET service_completed = ? WHERE order_service_id = ?";
          const [rows2] = await connection.execute(updateServiceQuery, [
            service.service_completed,
            service.order_service_id,
          ]);
          if (rows2.affectedRows === 0) {
            throw new Error(
              `Failed to update service with id ${service.order_service_id} in order_services table`
            );
          }
        }
      }

      // Update additional_requests_completed in the order_info table
      const query3 =
        "UPDATE order_info SET additional_requests_completed = ? WHERE order_id = ?";
      const [rows3] = await connection.execute(query3, [
        orderData.additional_requests_completed,
        order_id,
      ]);
      if (rows3.affectedRows === 0) {
        throw new Error(
          "Failed to update additional_requests_completed in order_info table"
        );
      }
    });

    return { message: "Order progress updated successfully" };
  } catch (error) {
    console.error("Error updating order progress:", error);
    throw new Error(`Failed to update order progress: ${error.message}`);
  }
};

const getOrdersByCustomerId = async (customer_id) => {
  const sql = `
    SELECT 
      o.order_id,
      ci.customer_id,
      oi.completion_date,
      cvi.vehicle_make,
      cvi.vehicle_model,
      os.order_status
    FROM 
      order_info oi
    JOIN 
      orders o ON oi.order_id = o.order_id
    JOIN 
      customer_identifier ci ON o.customer_id = ci.customer_id
    JOIN 
      customer_vehicle_info cvi ON o.vehicle_id = cvi.vehicle_id
    JOIN 
      order_status os ON o.order_id = os.order_id
    WHERE
      o.customer_id = ?;
  `;
  const rows = await query(sql, [customer_id]);
  console.log(rows);
  return rows.length > 0 ? rows : null;
};

module.exports = {
  createOrder,
  orderedServices,
  getVehicleByOrderId,
  editOrder,
  getAllOrders,
  getOrderByID,
  updateOrderProgress,
  getOrdersByCustomerId,
};
