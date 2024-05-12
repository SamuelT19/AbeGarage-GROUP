import React from "react";
import CustomerInfo from "./CustomerInfo";
import SelectedServies from "./SelectedServices";
import VehicleInSerivices from "./VehicleInServices";

function OrderSummary() {
  return (
    <>
      <h2>Customer Name _____</h2>
      <p>You can track the progress of your order using this page.</p>
      <CustomerInfo />
      <SelectedServies />
      <VehicleInSerivices />
    </>
  );
}

export default OrderSummary
;
