import React from "react";
import CustomerDetails from "./CustomerDetails";
import SelectedServies from "./SelectedServices";
import VehicleInSerivices from "./VehicleInServices";

function OrderSummary() {
  return (
    <>
      <h2>Customer Name _____</h2>
      <p>You can track the progress of your order using this page.</p>
      <CustomerDetails />
      <SelectedServies />
      <VehicleInSerivices />
    </>
  );
}

export default OrderSummary;
