const e = require("express");
const orderService = require("../services/order.service");

const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    console.log(orderData);
    const response = await orderService.createOrder(orderData);
    console.log(response);
    if (response) {
      res.status(200).json({
        message: "Order created successfully",
      });
    } else {
      res.status(400).json({
        error: "failed to create order",
      });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

// // create the getAllOrders controller
// async function getAllOrders(req, res, next) {
//   const orders = await orderService.getAllOrders();
//   if (!orders) {
//     res.status(400).json({
//       error: "Failed to get all orders!",
//     });
//   } else {
//     res.status(200).json({
//       status: "success",
//       data: orders,
//     });
//   }
// }

// // Controller function to get all orders data
// async function getAllOrdersData(req, res) {
//   try {
//     // Fetch all existing orders
//     const allOrders = await orderService.getAllOrders();

//     //console.log(allOrders);
//     // Initialize arrays to store data for each category
//     const allOrdersData = [];

//     // Loop through each order to fetch related data
//     for (const order of allOrders) {
//       const orderId = order.order_id;
//       const vehicleData = await orderService.getAllVehicleByOrderId(orderId);
//       const customerData = await orderService.getAllCustomerByOrderId(orderId);
//       const employeeData = await orderService.getAllEmployeeByOrderId(orderId);
//       const orderStatusData = await orderService.getAllOrderStatusByOrderId(
//         orderId
//       );

//       console.log(order);
//       console.log(vehicleData);
//       console.log(customerData);
//       console.log(employeeData);
//       console.log(orderStatusData);

//       // Combine all data into a single object
//       const orderData = {
//         order,
//         vehicleData,
//         customerData,
//         employeeData,
//         orderStatusData,
//       };

//       // Push the combined data for this order to the array
//       allOrdersData.push(orderData);
//       console.log(allOrdersData);
//     }

//     // Send the combined data as res.body to the frontend
//     res.json(allOrdersData);
//   } catch (error) {
//     console.error("Error fetching orders data:", error);
//     res.status(500).json({ error: "Error fetching orders data" });
//   }
// }

// Controller function to get all orders data
async function getAllOrdersData(req, res) {
  try {
    // Fetch all existing orders with related information
    const allOrdersData = await orderService.getAllOrders();

    // Send the combined data as res.body to the frontend
    res.json(allOrdersData);
  } catch (error) {
    console.error("Error fetching orders data:", error);
    res.status(500).json({ error: "Error fetching orders data" });
  }
}

//editOrder controller

// async function editOrder(req, res, next) {
//   const updatedOrderData = req.body;

//   console.log(req.body);

//   try {
//     const editOrder = await orderService.editOrder(updatedOrderData);

//     console.log(editOrder);

//     if (!editOrder) {
//       res.status(400).json({
//         error: "Failed to edit order!",
//       });
//     } else {
//       res.status(200).json({
//         status: " order successfully edited !",
//         // data: editOrder,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       error: "Something went wrong!",
//     });
//   }
// }

async function editOrder(req, res, next) {
  const updatedOrderData = req.body;

  console.log(req.body);

  try {
    const editOrderResult = await orderService.editOrder(updatedOrderData);

    if (editOrderResult) {
      res.status(200).json({
        status: "Order successfully edited!",
      });
    } else {
      res.status(400).json({
        error: "Failed to edit order!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = {
  createOrder,
  getAllOrdersData,
  editOrder,
};
