import React from "react";
import { Route, Routes } from "react-router-dom";
import Services from "../markup/pages/admin/service/Services";

function ServiceRouter() {
  return (
    <Routes>
      <Route path='/services' element={<Services />} />
    </Routes>
  );
}

export default ServiceRouter;
