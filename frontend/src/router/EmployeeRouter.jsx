import React from "react";
import { Routes, Route } from "react-router";
import Employees from "../markup/pages/admin/employee/Employees";
import EditEmployee from "../markup/pages/admin/employee/EditEmployee";
import PrivateAuthRoute from "../markup/components/Auth/PrivateAuthRoute";
import AddEmployee from "../markup/pages/admin/employee/AddEmployee";

function EmployeeRouter() {
  return (
    <Routes>
      <Route path="/employees" element={<Employees />} />
      <Route path="/edit-employee/:employee_id" element={<EditEmployee />} />
      <Route
        path="/add-employee"
        element={
          <PrivateAuthRoute roles={[3]}>
            <AddEmployee />
          </PrivateAuthRoute>
        }
      />
    </Routes>
  );
}

export default EmployeeRouter;
