import React, { useState, useEffect  } from "react";
import CustomerCard from "../OrderCustomerCard/CustomerCard";
import OrderCustomerVehicleInfo from "../OrderCustomerVehicle/OrderCustomerVehicleInfo";



function OrderCustomerInfo({  }) {
    
  
  
  return (
    <div style={{ marginBottom: "0px" }}>
      <CustomerCard />

      {/*  */}

      <div style={{ marginTop: "-110px" }}>
       <OrderCustomerVehicleInfo/>
      </div>
    </div>
  );
}

export default OrderCustomerInfo;
