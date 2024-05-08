import React from "react";
import { Routes, Route } from "react-router";
import Orders from "../markup/pages/admin/order/Orders";

function OrderRouter() {
  return (
    <Routes>
      <Route path='/orders' element={<Orders />} />
    </Routes>
  );
}

export default OrderRouter;
