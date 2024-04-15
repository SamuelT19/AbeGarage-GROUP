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

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id; // Extract orderId from URL params
    const orderData = req.body;
    // console.log("Order ID:", order_id);
    console.log("Updated Order Data:", orderData);
    
    const response = await orderService.updateOrder(orderData, order_id);
    console.log("Update Order Response:", response);
    
    if (response !== false) {
      res.status(200).json({
        message: "Order updated successfully",
      });
    } else {
      res.status(400).json({
        error: "Failed to update order",
      });
    }
  } catch (error) {
    console.log("Controller Error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};



module.exports = {
  createOrder,
  getAllOrders,
  updateOrder
};
