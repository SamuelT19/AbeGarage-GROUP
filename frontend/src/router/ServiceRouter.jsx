import React from "react";
import { Route, Routes } from "react-router-dom";
import Services from "../markup/pages/admin/service/Services";
import PrivateAuthRoute from "../markup/components/Auth/PrivateAuthRoute";

function ServiceRouter() {
  return (
    <Routes>
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
