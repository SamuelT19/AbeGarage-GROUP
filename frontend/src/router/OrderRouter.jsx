import React from "react";
import { Routes, Route } from "react-router";

import PrivateAuthRoute from "../markup/components/Auth/PrivateAuthRoute";

import OrderCustomersList from "../markup/pages/admin/order/OrderCustomerList";
import OrderCustomerDetailInfo from "../markup/pages/admin/order/OrderCustomerDetailInfo";
import AddNewOrder from "../markup/pages/admin/order/AddNewOrder";
import Orders from "../markup/pages/admin/order/Orders";



function OrderRouter() {
  return (
    <Routes>
      <Route path="/new-order" element={<OrderCustomersList />} />
      <Route
        path="/new-order/customer/:customer_id"
        element={<OrderCustomerDetailInfo />}
      />
      <Route path="/new-order/vehicle/:customer_id" element={<AddNewOrder />} />
      <Route path="/all" element={<Orders/>} />
    </Routes>
  );
}

export default OrderRouter;
