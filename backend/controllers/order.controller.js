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


module.exports = {
  createOrder,
};
