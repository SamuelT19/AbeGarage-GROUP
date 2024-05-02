import React from "react";
import { Routes, Route } from "react-router";

import PrivateAuthRoute from "../markup/components/Auth/PrivateAuthRoute";
import CustomersList from "../markup/pages/admin/customer/Customers";
import AddCustomer from "../markup/pages/admin/customer/AddCustomer";
import EditCustomer from "../markup/pages/admin/customer/EditCustomer";
import CustomerPage from "../markup/pages/admin/vehicle/CustomerProfile";

function CustomerRouter() {
  return (
    <Routes>
      <Route
        path='/customers'
        element={
          <PrivateAuthRoute roles={[2, 3]}>
            <CustomersList />
          </PrivateAuthRoute>
        }
      />
      <Route path='/add-customer' element={<AddCustomer />} />
      <Route path='/edit-customer' element={<EditCustomer />} />

      <Route
        path='/profile/:customerId'
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
