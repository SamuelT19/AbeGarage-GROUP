import React from 'react'
import { FaEdit } from "react-icons/fa";
import { useParams,Link } from "react-router-dom";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";



function OrderVehicleCard({vehicle}){
  const { customer_id } = useParams();

    if (!vehicle) {
      return null; 
    }

  return (
    <section className="contact-section ">
      <div className="auto-container">
        <div className="contact-title">
          <div className="card card-text card-vehicle">
            <h5>{vehicle.vehicle_make}</h5>
            <p>Vehicle color: {vehicle.vehicle_color}</p>
            <p>Vehicle make: {vehicle.vehicle_make}</p>
            <p>Vehicle millage: {vehicle.vehicle_mileage}</p>
            <p>Vehicle series: {vehicle.vehicle_serial}</p>

            <div className="edit-delete-icons">
              <Link to={`/admin/customer/profile/${customer_id}`}>
                Edit vehicle
                <FaEdit color="red" />
              </Link>
              <span className="close-icon">
                <Link to={`/admin/order/new-order`}>
                  <DisabledByDefaultIcon style={{ color: "red" }} />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default OrderVehicleCard