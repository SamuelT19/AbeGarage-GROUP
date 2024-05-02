import React from "react";
import { Routes, Route } from "react-router";
import PrivateAuthRoute from "../markup/components/Auth/PrivateAuthRoute";
import CustomersList from "../markup/pages/admin/customer/Customers";
import AddCustomer from "../markup/pages/admin/customer/AddCustomer";
import EditCustomer from "../markup/pages/admin/customer/EditCustomer";

function CustomerRouter() {
  return (
    <Routes>
      <Route
        path="/customers"
        element={
          <PrivateAuthRoute roles={[2, 3]}>
            <CustomersList />
          </PrivateAuthRoute>
        }
      />
      <Route path="/add-customer" element={<AddCustomer />} />
      <Route path="/edit-customer" element={<EditCustomer />} />
    </Routes>
  );
}

export default CustomerRouter;
