import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import vehicleService from "../../../../../services/vehicle.service";
import { useAuth } from "../../../../../Contexts/AuthContext";
import AddEditVehicle from "../AddEditVehicle/AddEditVehicle";

import { FaTimes } from "react-icons/fa";

function EditVehicleForm(props) {
  // Destructure the props
  const { vehicle_id, showForm, setShowForm, renderType, setRenderType } =
    props;

  const [vehicle_year, setVehicleYear] = useState("");
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const navigate = useNavigate();
  const { customerId } = useParams();

  const { employee } = useAuth();
  let token = "";
  if (employee && employee.employee_token) {
    token = employee.employee_token;
  }
  console.log(token);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      vehicle_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    };

    const editVehicle = vehicleService.editVehicle(formData, token);
    editVehicle
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
        } else {
          setServerError("");

          setTimeout(() => {
            setRenderType(" ");
            setShowForm(false);
            window.location.reload(); // Reload the page
          }, 2000);
        }
      })
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data] = await vehicleService.getVehicleById(vehicle_id, token);
        console.log(data);

        const vehicle = data;
        console.log(data.vehicle);
        setVehicleYear(vehicle.vehicle_year);
        setVehicleMake(vehicle.vehicle_make);
        setVehicleModel(vehicle.vehicle_model);
        setVehicleType(vehicle.vehicle_type);
        setVehicleMileage(vehicle.vehicle_mileage);
        setVehicleTag(vehicle.vehicle_tag);
        setVehicleSerial(vehicle.vehicle_serial);
        setVehicleColor(vehicle.vehicle_color);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [vehicle_id]);

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator
  }

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
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </div>
  );
}

export default EditVehicleForm;
