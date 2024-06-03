import React from "react";

function VehicleInService({ singleOrder }) {
  const vehicleInfo = singleOrder?.customerVehicle || {};
  console.log(vehicleInfo);

  return (
    <>
      <div key={vehicleInfo.vehicle_id} className='vehicle_in_services '>
        <div>
          <div className='col-lg-20 service-block-one'>
            <div className='inner-box hvr-float-shadow'>
              <h6 className='bold-text'>CAR IN SERVICES</h6>
              <h4>
                {vehicleInfo.vehicle_make} {vehicleInfo.vehicle_model} (
                {vehicleInfo.vehicle_color})
              </h4>
              <div>
                <span className='bold-text'>Vehicle Tag:</span>{" "}
                {vehicleInfo.vehicle_tag}
              </div>
              <div>
                <span className='bold-text'>Vehicle Year:</span>{" "}
                {vehicleInfo.vehicle_year}
              </div>
              <div>
                <span className='bold-text'>Vehicle Mileage:</span>{" "}
                {vehicleInfo.vehicle_mileage}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VehicleInService;
