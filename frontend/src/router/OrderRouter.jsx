import React from "react";
import { Routes, Route } from "react-router";
import Orders from "../markup/pages/admin/order/Orders";
import PrivateAuthRoute from "../markup/components/Auth/PrivateAuthRoute";
import NewOrder from "../markup/pages/admin/order/NewOrder";

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
        path='/new-order'
        element={
          <PrivateAuthRoute roles={[3, 2]}>
            <NewOrder />
          </PrivateAuthRoute>
        }
      />
    </Routes>
  );
}

export default OrderRouter;
