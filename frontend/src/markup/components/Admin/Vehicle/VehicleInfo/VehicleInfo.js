import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function VehicleInfo(props) {
  const { vehiclesInfo, handleEditClick, handleDeleteClick } = props;

  return (
    <>
      <div className='customer_details col-lg-60 left-side '>
        <div>
          <div className='col-lg-20 service-block-one'>
            {vehiclesInfo.map((vehicle) => (
              <div className='inner-box hvr-float-shadow box-resize'>
                <div key={vehicle.vehicle_id} className='text'>
                  <h4>
                    {vehicle.vehicle_make} {vehicle.vehicle_model}
                  </h4>
                  <div>
                    <span className='bold-text'> Vehicle Color:</span>
                    {vehicle.vehicle_color}
                  </div>
                  <div>
                    <span className='bold-text'> Vehicle Tag:</span>
                    {vehicle.vehicle_tag}
                  </div>
                  <div>
                    <span className='bold-text'> Vehicle Year:</span>
                    {vehicle.vehicle_year}
                  </div>
                  <div>
                    <span className='bold-text'> Vehicle Mileage:</span>
                    {vehicle.vehicle_mileage}
                  </div>
                  <div>
                    <span className='bold-text'> Vehicle Serial: </span>
                    {vehicle.vehicle_serial}
                  </div>
                  <div>
                    <span className='bold-text'> Edit vehicle info </span>
                    <FaEdit
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleEditClick(vehicle.vehicle_id)}
                    />
                  </div>
                  <div>
                    <span className='bold-text'> Delete vehicle </span>
                    <FaTrash
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDeleteClick(vehicle.vehicle_id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default VehicleInfo;
