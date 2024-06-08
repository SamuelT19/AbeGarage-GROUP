import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { GiClick } from "react-icons/gi";
import vehicleService from "../../../../../services/vehicle.service";
import { useAuth } from "../../../../../Contexts/AuthContext";

function OrderCustomerVehicleInfo() {
  const [vehicles, setVehicles] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const { customer_id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerVehicles = async () => {
      try {
        const response = await vehicleService.getAllVehiclesBycustomer(
          customer_id,
          token
        );
        setVehicles(response.vehicles);
      } catch (error) {
        console.log(error);
        setApiError(true);
        if (error.response && error.response.status === 401) {
          setApiErrorMessage("Please login again");
        } else if (error.response && error.response.status === 403) {
          setApiErrorMessage("You are not authorized to view this page");
        } else {
          setApiErrorMessage("Please try again later");
        }
      }
    };

    fetchCustomerVehicles();
  }, [customer_id, token]);

  const handleVehicleSelect = (vehicle) => {
    navigate(`/admin/order/new-order/vehicle/${vehicle.customer_id}`, {
      state: { vehicle },
    });
  };

// *  {
// *  state: { vehicle },
// *}
// *The second argument to navigate is an options object. Here, it contains a state property.
// *The state property is an object that contains additional data you want to pass to the new route. In this case, it includes the entire vehicle object.
// *This state can be accessed in the target component via the location object provided by react-router-dom. import { useLocation } from "react-router-dom";
  // * const location = useLocation();
  // *const { vehicle } = location.state;

  const goToAddVehicle = () => {
    navigate(`/admin/customer/profile/${customer_id}`);
  };

  return (
    <section className="contact-section">
      {apiError ? (
        <div>{apiErrorMessage}</div>
      ) : vehicles.length > 0 ? (
        <Table className="card-table " striped bordered hover>
          <thead>
            <tr>
              <th colSpan="8">
                <h4 className="table-title">Choose a vehicle</h4>
              </th>
            </tr>
            <tr>
              <th className="no-border">Year</th>
              <th className="no-border">Make</th>
              <th className="no-border">Model</th>
              <th className="no-border">Tag</th>
              <th className="no-border">Serial</th>
              <th className="no-border">Color</th>
              <th className="no-border">Mileage</th>
              <th className="no-border">Choose</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((data) => (
              <tr key={data.vehicle_id}>
                <td className="no-border">{data.vehicle_year}</td>
                <td className="no-border">{data.vehicle_make}</td>
                <td className="no-border">{data.vehicle_model}</td>
                <td className="no-border">{data.vehicle_tag}</td>
                <td className="no-border">{data.vehicle_serial}</td>
                <td className="no-border">{data.vehicle_color}</td>
                <td className="no-border">{data.vehicle_mileage}</td>
                <td>
                  <div className="edit-delete-icons">
                    <GiClick onClick={() => handleVehicleSelect(data)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="add-vehicle">
          <p style={{ color: "red" }}>No vehicles found</p>
          <button
            style={{ width: "20%", marginBottom: "30px " }}
            className="theme-btn btn-style-one"
            onClick={goToAddVehicle}
          >
            Add vehicle
          </button>
        </div>
      )}
    </section>
  );
}

export default OrderCustomerVehicleInfo;
