import React, { useState, useEffect } from "react";
import OrderService from "../../../../../services/order.service";

const OrderStatusDropdown = ({
  orderStatus,
  orderId,
  onUpdateStatus,
  selectedServicesId,
  statusType,
 
}) => {
  const [status, setStatus] = useState(orderStatus);

  useEffect(() => {
    setStatus(orderStatus);
  }, [orderStatus]);

  const getStatusClass = (statusCode) => {
    switch (statusCode) {
      case 1:
        return "received";
      case 2:
        return "in-progress";
      case 0:
        return "completed";
      case 3:
        return "canceled";
      default:
        return "";
    }
  };

  // const handleStatusChange = async (event) => {
  //   const newStatus = Number(event.target.value);
  //   setStatus(newStatus);
  //   console.log(newStatus);
  //   try {
  //     await OrderService.updateOrderStatus(orderId, newStatus);
  //     onUpdateStatus(newStatus);
  //     console.log(`Order ${orderId} status updated to ${newStatus}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleStatusChange = (event) => {
    const newStatus = Number(event.target.value);
    setStatus(newStatus);

    if (statusType === "service") {
      onUpdateStatus(selectedServicesId, newStatus);
      console.log(newStatus);
      return;
    }
    if (statusType === "order") {
      onUpdateStatus(orderId, newStatus);
      console.log(newStatus);
    }
    // onUpdateStatus(orderId, newStatus);
    // console.log(newStatus);
  };

  return (
    <select
      value={status}
      onChange={handleStatusChange}
      className={`status-dropdown ${getStatusClass(status)} status-label`}>
      <option value='1'>Received</option>
      <option value='2'>In Progress</option>
      <option value='0'>Completed</option>
      <option value='3'>Canceled</option>
    </select>
  );
};

export default OrderStatusDropdown;
