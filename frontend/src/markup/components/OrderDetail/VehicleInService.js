import React from "react";

function VehicleInService({ singleOrder }) {
  const vehicleInfo = singleOrder?.customerVehicle || {};
  console.log(vehicleInfo);

  return (
    <>
      <div key={vehicleInfo.vehicle_id} className='text'>
        <h4>
          {vehicleInfo.vehicle_make} {vehicleInfo.vehicle_model} (
          {vehicleInfo.vehicle_color})
        </h4>
        <div>Vehicle Tag: {vehicleInfo.vehicle_tag}</div>
        <div>Vehicle Year: {vehicleInfo.vehicle_year}</div>
        <div>Vehicle Mileage: {vehicleInfo.vehicle_mileage}</div>
      </div>
    </>
  );
}

export default VehicleInService;
