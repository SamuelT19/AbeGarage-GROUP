import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
// import AddEditVehicle from "../../components/Admin/AddEditVehicle/AddVehicle";
import VehicleInfo from "../../components/Admin/Vehicles/VehicleInfo";
import CustomerInfo from "../../components/Admin/CustomerInfo/CustomerInfo";
import { useParams } from "react-router-dom";
import vehicleService from "../../../../src/services/vehicle.service";
import AddVehicleForm from "../../components/Admin/AddVehicleForm/AddVehicleForm";
import EditVehicleForm from "../../components/Admin/EditVehicleForm/EditVehicleForm";
import { useAuth } from "../../../../src/Contexts/AuthContext";
import customerService from "../../../../src/services/customer.service";

function CustomerProfile() {
  const [showForm, setShowForm] = useState(false);
  const [renderType, setRenderType] = useState("add");
  const [vehiclesInfo, setVehiclesInfo] = useState([]);
  const { customerId } = useParams();
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({});
  const [error, setError] = useState(null);
  const { employee } = useAuth();

  let token = "";
  if (employee && employee.employee_token) {
    token = employee.employee_token;
  }
  // console.log(token);

  // Function to handle edit button click
  const handleEditClick = (vehicleId) => {
    setRenderType("edit"); // Set renderType to 'edit' when the edit button is clicked
    setSelectedVehicleId(vehicleId);
    setShowForm(true); // Show the form when the edit button is clicked
  };

  const handleDeleteClick = (vehicleId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );
    if (confirmDelete) {
      deleteVehicle(vehicleId);
    }
  };

  const deleteVehicle = async (vehicleId) => {
    try {
      await vehicleService.deleteVehicleById(vehicleId, token);
      setVehiclesInfo(
        vehiclesInfo.filter((vehicle) => vehicle.vehicle_id !== vehicleId)
      );
      console.log("Vehicle with ID:", vehicleId, "deleted successfully.");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        console.log(token);
        const data = await vehicleService.getAllVehiclesBycustomer(
          customerId,
          token
        );
        setVehiclesInfo(data.vehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchVehicles();
  }, [customerId, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  //Customer Info
  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const data = await customerService.getCustomerById(customerId, token);
        setCustomerInfo(data.customer[0]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCustomerInfo();
  }, [customerId, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='container-fluid admin-pages'>
        <div className='row'>
          <div className='col-md-3 admin-left-side'>
            <AdminMenu />
          </div>
          <div className='col-md-9 admin-right-side'>
            <section className='history-section'>
              <div className='auto-container'>
                <div className='history-block'>
                  <div className='years'>Info</div>
                  <div className='content'>
                    <h4>Customer: {customerInfo.customer_first_name}</h4>
                    <CustomerInfo
                      customerId={customerId}
                      customerInfo={customerInfo}
                    />
                  </div>
                </div>
                <div className='history-block'>
                  <div className='years'>Cars</div>
                  <div className='content'>
                    <h4>Vehicles of {customerInfo.customer_first_name}</h4>
                    <VehicleInfo
                      vehiclesInfo={vehiclesInfo}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                    <div>
                      {vehiclesInfo.length === 0 && (
                        <div className='text'>
                          No vehicle information available.
                        </div>
                      )}
                    </div>
                    <div>
                      {showForm && renderType === "edit" ? (
                        <div id='editVehicleForm'>
                          <EditVehicleForm
                            customerId={customerId}
                            vehicle_id={selectedVehicleId}
                            renderType={renderType}
                            setRenderType={setRenderType}
                            setShowForm={setShowForm}
                            showForm={showForm}
                          />
                        </div>
                      ) : (
                        showForm && (
                          <div id='addOrEditVehicleForm'>
                            <AddVehicleForm
                              customer_id={customerId}
                              renderType={renderType}
                              setRenderType={setRenderType}
                              setShowForm={setShowForm}
                              showForm={showForm}
                            />
                          </div>
                        )
                      )}
                    </div>
                    {!showForm && (
                      <div className='form-group col-md-12'>
                        <button
                          className='theme-btn btn-style-one'
                          type='submit'
                          onClick={() => setShowForm(true)}>
                          ADD VEHICLE
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className='history-block'>
                  <div className='years'>Orders</div>
                  <div className='content'>
                    <h4>Orders of {customerInfo.customer_first_name}</h4>
                    <div className='text'>Orders will be displayed here</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerProfile;
