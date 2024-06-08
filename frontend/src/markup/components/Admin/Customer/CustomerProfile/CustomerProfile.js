import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminMenu from "../../../../components/Admin/AdminMenu/AdminMenu";
import CustomerInfo from "../../../../components/Admin/Customer/CustomerInfo/CustomerInfo";
import VehicleInfo from "../../../../components/Admin/Vehicle/VehicleInfo/VehicleInfo";
import AddVehicleForm from "../../../../components/Admin/Vehicle/AddVehicleForm/AddVehicleForm";
import EditVehicleForm from "../../../../components/Admin/Vehicle/EditVehicleForm/EditVehicleForm";
import vehicleService from "../../../../../services/vehicle.service";
import { useAuth } from "../../../../../Contexts/AuthContext";
import customerService from "../../../../../services/customer.service";
import CustomerOrder from "../../../../components/Admin/Order/CustomerOrder/CustomerOrder";

function CustomerProfile() {
  const [showForm, setShowForm] = useState(false);
  const [renderType, setRenderType] = useState("add");
  const [vehiclesInfo, setVehiclesInfo] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({});
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [error, setError] = useState(null);
  const { customerId } = useParams();
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
        const data = await vehicleService.getAllVehiclesBycustomer(
          customerId,
          token
        );
        setVehiclesInfo(data.vehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoadingVehicles(false); // Set loadingVehicles to false after fetching data
      }
    };

    fetchVehicles();
  }, [customerId, token]);

  //Customer Info
  // Fetch customer information
  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const { data } = await customerService.getCustomerById(
          customerId,
          token
        );
        console.log(data);
        setCustomerInfo(data.customer[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingCustomer(false); // Set loadingCustomer to false after fetching data
      }
    };

    fetchCustomerInfo();
  }, [customerId, token]);

  if (loadingVehicles || loadingCustomer) {
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
                      // customerId={customerId}
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
                          onClick={() => {
                            setShowForm(true);
                            setRenderType("add");
                          }}>
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
                    <div className='text'>
                      <CustomerOrder customer_id={customerId} />
                    </div>
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
