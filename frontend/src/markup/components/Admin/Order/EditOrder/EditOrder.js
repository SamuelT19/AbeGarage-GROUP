// EditOrder.js
import React from "react";
import ServicesNotSelected from "./ServicesNotSelected";
import SelectedServices from "./SelectedServices";
import VehicleInService from "./VehicleInService";
import AdditionalRequests from "./AdditionalRequests";
import NotesSection from "./NotesSection";

function EditOrder() {
  return (
    <div>
      <ServicesNotSelected />
      <SelectedServices />
      <VehicleInService />
      <AdditionalRequests />
      <NotesSection />
    </div>
  );
}

export default EditOrder;
