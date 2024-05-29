import React from "react";
import { Routes, Route } from "react-router";
import Orders from "../markup/pages/admin/order/Orders";
import PrivateAuthRoute from "../markup/components/Auth/PrivateAuthRoute";
import OrderDtail from "../markup/pages/OrderDtail";

function OrderRouter() {
  return (
    <Routes>
      <Route
        path='/orders'
        element={
          <PrivateAuthRoute roles={[3, 2]}>
            <Orders />
          </PrivateAuthRoute>
        }
      />
      <Route
        path=':orderId/status/:orderStatus/:orderHash?'
        element={
          <PrivateAuthRoute roles={[3, 2]}>
            <OrderDtail />
          </PrivateAuthRoute>
        }
      />
    </Routes>
  );
}

export default OrderRouter;
