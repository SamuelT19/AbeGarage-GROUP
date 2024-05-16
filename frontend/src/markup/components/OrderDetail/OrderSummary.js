import React from "react";
import { useState, useEffect } from "react";
import Orderservice from "../../../services/order.service";
import CustomerDetails from "./CustomerDetails";
// import SelectedServies from "./SelectedServices";
import VehicleInSerivices from "./VehicleInService";

function OrderDetails() {
  //intialize the state
  const [singleOrder, setsingleOrder] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Orderservice.getOrderByID();
        setsingleOrder(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <h2>Customer Name _____</h2>
      <p>You can track the progress of your order using this page.</p>
      <CustomerDetails singleOrder={singleOrder} />
      {/* <SelectedServies singleOrder={singleOrder} /> */}
      <VehicleInSerivices singleOrder={singleOrder} />
    </>
  );
}

export default OrderDetails;
