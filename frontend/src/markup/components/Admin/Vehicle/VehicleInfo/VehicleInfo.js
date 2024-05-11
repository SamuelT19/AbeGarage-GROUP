import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function VehicleInfo(props) {
  const { vehiclesInfo, handleEditClick, handleDeleteClick } = props;

  return (
    <>
      {vehiclesInfo.map((vehicle) => (
        <div key={vehicle.vehicle_id} className='text'>
          <h4>
            {vehicle.vehicle_make} {vehicle.vehicle_model}
          </h4>
          <div>Vehicle Color: {vehicle.vehicle_color}</div>
          <div>Vehicle Tag: {vehicle.vehicle_tag}</div>
          <div>Vehicle Year: {vehicle.vehicle_year}</div>
          <div>Vehicle Mileage: {vehicle.vehicle_mileage}</div>
          <div>Vehicle Serial: {vehicle.vehicle_serial}</div>
          <div>
            <span>Edit vehicle info </span>
            <FaEdit
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleEditClick(vehicle.vehicle_id)}
            />
          </div>
          <div>
            Delete vehicle
            <FaTrash
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDeleteClick(vehicle.vehicle_id)}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default VehicleInfo;
