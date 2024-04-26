import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function VehicleInfo({ vehicles, handleEditClick }) {
  const handleDeleteClick = (vehicleId) => {
    // Implement delete logic here
    // For example, you can call a delete API endpoint
    // and then update the state to remove the deleted vehicle from the list
    console.log("Delete vehicle with ID:", vehicleId);
  };
  console.log(typeof vehicles);
  return (
    <>
      {vehicles.map((vehicle) => (
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
            Edit vehicle info
            <FaEdit className='red-icon' onClick={handleEditClick} />
          </div>
          <div>
            Delete vehicle info
            <FaTrash
              className='red-icon'
              onClick={() => handleDeleteClick(vehicle.id)}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default VehicleInfo;
