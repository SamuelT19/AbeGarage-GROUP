// ServiceList.js
import React from "react";
import ServiceItem from "./ServiceItem";

function ServiceList({ services }) {
  return (
    <div>
      {services.map((service) => (
        <ServiceItem key={service.id} service={service} />
      ))}
    </div>
  );
}

export default ServiceList;
