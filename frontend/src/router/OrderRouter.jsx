import React from "react";
import { Routes, Route } from "react-router";

import PrivateAuthRoute from "../markup/components/Auth/PrivateAuthRoute";

import OrderCustomersList from "../markup/pages/admin/order/OrderCustomerList";
import OrderCustomerDetailInfo from "../markup/pages/admin/order/OrderCustomerDetailInfo";
import AddNewOrder from "../markup/pages/admin/order/AddNewOrder";
// import Orders from "../markup/pages/admin/order/";
import Orders from "../markup/pages/admin/order/Orders";
import OrderDetail from "../markup/pages/OrderDetails/OrderDetails";

function OrderRouter() {
  return (
    <Routes>
      <Route path='/new-order' element={<OrderCustomersList />} />
      <Route
        path='/new-order/customer/:customer_id'
        element={<OrderCustomerDetailInfo />}
      />
      <Route path='/new-order/vehicle/:customer_id' element={<AddNewOrder />} />

      <Route
        path='/orders'
        element={
          <PrivateAuthRoute roles={[3, 2]}>
            <Orders />
          </PrivateAuthRoute>
        }
      />
      <Route
        path=':order_id/status/:order_status'
        element={
          <PrivateAuthRoute roles={[3, 2]}>
            <OrderDetail />
          </PrivateAuthRoute>
        }
      />
    </Routes>
  );
}

export default OrderRouter;
