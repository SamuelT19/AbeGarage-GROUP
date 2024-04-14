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

// Controller function to edit an order
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
