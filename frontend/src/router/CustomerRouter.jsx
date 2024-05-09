import React from "react";
import { Routes, Route } from "react-router";

import PrivateAuthRoute from "../markup/components/Auth/PrivateAuthRoute";
import CustomerPage from "../markup/pages/admin/vehicle/CustomerProfile";
import Customers from "../markup/pages/admin/customer/Customers";
import AddCustomer from "../markup/pages/admin/customer/AddCustomer";
import EditCustomer from "../markup/pages/admin/customer/EditCustomer";

function CustomerRouter() {
  return (
    <Routes>

      <Route path="/customers" element={<Customers />} />

      <Route
        path="/add-customer"
        element={
          <PrivateAuthRoute roles={[2, 3]}>
            <AddCustomer />
          </PrivateAuthRoute>
        }
      />
      <Route
        path="/edit/:customer_id"
        element={<EditCustomer />}
      />

      <Route
        path="/profile/:customerId"
        element={
          <PrivateAuthRoute roles={[3, 2]}>
            <CustomerPage />
          </PrivateAuthRoute>
        }
      />
    </Routes>
  );
}

export default CustomerRouter;
