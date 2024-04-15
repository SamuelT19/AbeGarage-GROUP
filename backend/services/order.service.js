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

const getAllOrders = async () => {
  try {
    const getAllOrdersQuery =
      "SELECT * FROM orders JOIN order_info USING (order_id)";

    const orders = await query(getAllOrdersQuery);
    return orders;
  } catch (error) {
    console.log("Error retrieving orders:", error);
    return null;
  }
};


// const  updateOrder = async (orders, order_id) => {
//   console.log(orders);
//   try {
//     await withTransaction(async () => {
//       if ( orders.employee_id || orders.customer_id || orders.vehicle_id) {
//         const orderQuery = `
//             UPDATE orders
//             SET 
//               ${orders.employee_id ? "employee_id  = ?," : ""}
//               ${orders.customer_id ? "customer_id  = ?" : ""}
//               ${orders.vehicle_id ? "vehicle_id  = ?" : ""}
//             WHERE
//               order_id = ?
//           `;
        
      
//        const results = await query(orderQuery, [  orders.employee_id, orders.customer_id, orders.vehicle_id, order_id,].filter((param) => param !== undefined));
//         console.log(results)
//       }
    
//       if (orders.order_total_price || orders.estimated_completion_date || orders.completion_date || orders.additional_request || orders.notes_for_internal_use || orders.notes_for_customer || orders.additional_request_completed) {
//         const orderInfoQuery = `
//             UPDATE order_info
//             SET 
//               order_total_price = ?,
//               estimated_completion_date = ?,
//               completion_date = ?,
//               additional_request = ?,
//               notes_for_internal_use = ?,
//               notes_for_customer = ?,
//               additional_request_completed = ?,
//             WHERE
//               order_id = ?
//           `;
//         const queryParams = [
//          orders. order_total_price,
//          orders.estimated_completion_date, 
//          orders.completion_date, 
//          orders.additional_request, 
//          orders.notes_for_internal_use,
//          orders.notes_for_customer, 
//          orders.additional_request_completed,
//          order_id
//         ];
    
//         await query(orderInfoQuery, queryParams);
//       }
    
//       if (orders.order_service_id || orders.service_id ||  orders.service_completed) {
//         const orderServiceQuery = `
//             UPDATE order_service
//             SET 
//               order_service_id = ?,
//               service_id = ?,
//               service_completed =?,
//             WHERE
//               order_id = ?
//           `;
//         await query(orderServiceQuery, [orders.order_service_id, orders.service_id, orders.service_completed, order_id]);
//       }
    
//       if (orders.order_status_id || orders.order_status) {
//         const orderStatusQuery = `
//             UPDATE order_status
//             SET 
//               order_status_id = ?,
//               order_status =?,
//             WHERE
//               order_id = ?
//           `;
//         await query(orderStatusQuery, [
//           orders.order_status_id,
//           orders.order_status,
//           order_id
//         ]);
//       }
    
//       updatedOrderData = {
//         order_id: order_id,
//         employee_id: orders.employee_id,
//         customer_id: orders.customer_id,
//         vehicle_id: orders.vehicle_id,
//         order_total_price: orders.order_total_price,
//         estimated_completion_date: orders.estimated_completion_date,
//         completion_date: orders.completion_date,
//         additional_request: orders.additional_request,
//         notes_for_internal_use: orders.notes_for_internal_use,
//         notes_for_customer: orders.notes_for_customer,
//         additional_request_completed:orders.additional_request_completed,
//         order_service_id:orders.order_service_id,
//         service_id: orders.service_id,
//         service_completed:orders.service_completed,
//         order_status_id:orders.order_status_id,
//         order_status:orders.order_status,
//       };
//     })
//     return true;
//   } catch (error) {
//     console.log("Transaction error:", error)
//   }
// }

const updateOrder = async (orderData, order_id) => {
  try {
    await withTransaction(async () => {
      // Update orders table
      const updateOrderQuery = `
        UPDATE orders
        SET 
          employee_id = ?,
          customer_id = ?,
          vehicle_id = ?,
          active_order = ?
        WHERE
          order_id = ?
      `;
      const updateOrderParams = [
        orderData.employee_id,
        orderData.customer_id,
        orderData.vehicle_id,
        orderData.active_order,
        order_id,
      ].map(param => param === undefined ? null : param); // Convert undefined to null
      await query(updateOrderQuery, updateOrderParams);

      // Update order_services table
      if (orderData.order_services && orderData.order_services.length > 0) {
        for (const service of orderData.order_services) {
          const updateServiceQuery = `
            UPDATE order_services
            SET 
              service_completed = ?
            WHERE
              order_id = ? AND
              service_id = ?
          `;
          const updateServiceParams = [
            service.service_completed,
            order_id,
            service.service_id,
          ].map(param => param === undefined ? null : param); // Convert undefined to null
          await query(updateServiceQuery, updateServiceParams);
        }
      }

      // Update order_info table
      const updateOrderInfoQuery = `
        UPDATE order_info
        SET 
          order_total_price = ?,
          estimated_completion_date = ?,
          completion_date = ?,
          additional_request = ?,
          notes_for_internal_use = ?,
          notes_for_customer = ?,
          additional_requests_completed = ?
        WHERE
          order_id = ?
      `;
      const updateOrderInfoParams = [
        orderData.order_total_price,
        orderData.estimated_completion_date,
        orderData.completion_date,
        orderData.additional_request,
        orderData.notes_for_internal_use,
        orderData.notes_for_customer,
        orderData.additional_requests_completed,
        order_id,
      ].map(param => param === undefined ? null : param); // Convert undefined to null
      await query(updateOrderInfoQuery, updateOrderInfoParams);

      // Update order_status table
      if (orderData.order_status !== undefined) {
        const updateOrderStatusQuery = `
          UPDATE order_status
          SET 
            order_status = ?
          WHERE
            order_id = ?
        `;
        const updateOrderStatusParams = [
          orderData.order_status,
          order_id,
        ].map(param => param === undefined ? null : param); // Convert undefined to null
        await query(updateOrderStatusQuery, updateOrderStatusParams);
      }
    });

    return true;
  } catch (error) {
    console.log("Transaction error:", error);
    return false;
  }
};


module.exports = {
    createOrder,
    getAllOrders,
    updateOrder
}
