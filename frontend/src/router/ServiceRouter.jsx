import React from "react";
import { Route, Routes } from "react-router-dom";
import Services from "../markup/pages/admin/service/Services";
import EditService from "../markup/pages/admin/service/EditService";
import PrivateAuthRoute from "../markup/components/Auth/PrivateAuthRoute";

function ServiceRouter() {
  return (
    <Routes>
      <Route path='/edit-service/:service_id' element={<EditService />} />
      <Route
        path='/services'
        element={
          <PrivateAuthRoute roles={[3, 2]}>
            <Services />
          </PrivateAuthRoute>
        }
      />
    </Routes>
  );
}

export default ServiceRouter;
