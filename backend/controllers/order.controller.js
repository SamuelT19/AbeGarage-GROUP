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


const orderedServices = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    console.log(order_id);

    const services = await orderService.orderedServices(order_id);

    const [customerVehicle] = await orderService.getVehicleByOrderId(order_id);

    if (!services) {
      res.status(400).json({
        error: "Failed to fetch order",
      });
    } else {
      res.status(200).json({
        message: "single order fetched successfully",
        services,
        customerVehicle,
      });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  createOrder,
  orderedServices,
};
