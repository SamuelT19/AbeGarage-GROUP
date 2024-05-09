import React, { useState } from "react";
// import vehicle.service.js
import vehicleService from "../../../../../services/vehicle.service";
// Import the useAuth hook
import { useAuth } from "../../../../../Contexts/AuthContext";
import { useNavigate } from "react-router";
// Import the AddVehicle component
import AddEditVehicle from "../AddEditVehicle/AddEditVehicle";
// Import the react-icons
import { FaTimes } from "react-icons/fa";

function AddVehicleForm(props) {
  const [vehicle_year, setVehicleYear] = useState("");
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");
  // Errors
  const [vehicle_yearRequired, setVehicleYearRequired] = useState("");
  const [vehicle_makeRequired, setVehicleMakeRequired] = useState("");
  const [vehicle_modelRequired, setVehicleModelRequired] = useState("");
  const [vehicle_typeRequired, setVehicleTypeRequired] = useState("");
  const [vehicle_mileageRequired, setVehicleMileageRequired] = useState("");
  const [vehicle_tagRequired, setVehicleTagRequired] = useState("");
  const [vehicle_serialRequired, setVehicleSerialRequired] = useState("");
  const [vehicle_colorRequired, setVehicleColorRequired] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  //distructure the props customer_id
  const { customer_id, renderType, setShowForm, showForm, setRenderType } =
    props;
  // Get the renderType from the props
  const {} = props;

  const { employee } = useAuth();
  let token = "";
  if (employee && employee.employee_token) {
    token = employee.employee_token;
  }

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations
    let valid = true; // Flag
    // Vehicle year is required
    if (!vehicle_year) {
      setVehicleYearRequired("Vehicle year is required");
      valid = false;
    } else {
      setVehicleYearRequired("");
    }
    // Vehicle make is required
    if (!vehicle_make) {
      setVehicleMakeRequired("Vehicle make is required");
      valid = false;
    } else {
      setVehicleMakeRequired("");
    }
    // Vehicle model is required
    if (!vehicle_model) {
      setVehicleModelRequired("Vehicle model is required");
      valid = false;
    } else {
      setVehicleModelRequired("");
    }
    // Vehicle type is required
    if (!vehicle_type) {
      setVehicleTypeRequired("Vehicle type is required");
      valid = false;
    } else {
      setVehicleTypeRequired("");
    }
    // Vehicle mileage is required
    if (!vehicle_mileage) {
      setVehicleMileageRequired("Vehicle mileage is required");
      valid = false;
    } else {
      setVehicleMileageRequired("");
    }
    // Vehicle tag is required
    if (!vehicle_tag) {
      setVehicleTagRequired("Vehicle tag is required");
      valid = false;
    } else {
      setVehicleTagRequired("");
    }
    // Vehicle serial is required
    if (!vehicle_serial) {
      setVehicleSerialRequired("Vehicle serial is required");
      valid = false;
    } else {
      setVehicleSerialRequired("");
    }
    // Vehicle color is required
    if (!vehicle_color) {
      setVehicleColorRequired("Vehicle color is required");
      valid = false;
    } else {
      setVehicleColorRequired("");
    }

    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }
    const formData = {
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    };
    // Pass the form data to the service
    const newVehicle = vehicleService.createVehicle(formData, token);
    newVehicle
      .then((data) => {
        console.log(data);
        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error);
        } else {
          // Handle successful response
          setSuccess(true);
          setServerError("");
          // close the form after 2 seconds
          setTimeout(() => {
            setShowForm(false);
            window.location.reload(); // Reload the page
          }, 2000);
        }
      })
      // Handle Catch
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  };

  return (
    <div className='vehicle-form-content'>
      <span className='close-icon' onClick={() => setShowForm(false)}>
        <FaTimes style={{ color: "red" }} />
      </span>
      <AddEditVehicle
        renderType={renderType}
        handleSubmit={handleSubmit}
        vehicle_year={vehicle_year}
        setVehicleYear={setVehicleYear}
        vehicle_make={vehicle_make}
        setVehicleMake={setVehicleMake}
        vehicle_model={vehicle_model}
        setVehicleModel={setVehicleModel}
        vehicle_type={vehicle_type}
        setVehicleType={setVehicleType}
        vehicle_mileage={vehicle_mileage}
        setVehicleMileage={setVehicleMileage}
        vehicle_tag={vehicle_tag}
        setVehicleTag={setVehicleTag}
        vehicle_serial={vehicle_serial}
        setVehicleSerial={setVehicleSerial}
        vehicle_color={vehicle_color}
        setVehicleColor={setVehicleColor}
        serverError={serverError}
      />
    </div>
  );
}

export default AddVehicleForm;
