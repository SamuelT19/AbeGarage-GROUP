import React from "react";
import { Routes, Route } from "react-router";
import Orders from "../markup/pages/admin/order/Orders";
import PrivateAuthRoute from "../markup/components/Auth/PrivateAuthRoute";

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
    </Routes>
  );
}

export default OrderRouter;
