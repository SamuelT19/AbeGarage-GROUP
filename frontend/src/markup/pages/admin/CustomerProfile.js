import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddVehicle from "../../components/Admin/AddVehicle/AddVehicle";
import VehicleInfo from "../../components/Admin/Vehicles/VehicleInfo";
import CustomerInfo from "../../components/Admin/CustomerProfile/CustomerInfo";
import { useParams } from "react-router-dom";
import vehicleService from "../../../../src/services/vehicle.service";
import AddVehicleForm from "../../components/Admin/AddVehicleForm/AddVehicleForm";

function CustomerProfile() {
  const [showForm, setShowForm] = useState(false);
  const [renderType, setRenderType] = useState("add");
  const [vehicles, setVehicles] = useState([]);
  const { customerId } = useParams(); // Access customer ID from URL params

  console.log(customerId);
  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the value of showForm
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // For example, you can send the form data to the server
    // After form submission, hide the form
    setShowForm(false);
  };

  // Function to handle edit button click
  const handleEditClick = () => {
    setRenderType("edit"); // Set renderType to 'edit' when the edit button is clicked
    setShowForm(true); // Show the form when the edit button is clicked
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleService.getAllVehiclesBycustomer(customerId);
        console.log(data.vehicles.vehicle_color);
        setVehicles(data.vehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, [customerId]);

  console.log(vehicles);

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
                    <h4>Customer: Cust 1</h4>
                    <CustomerInfo />
                  </div>
                </div>
                <div className='history-block'>
                  <div className='years'>Cars</div>
                  <div className='content'>
                    <h4>Vehicles of Cust 1</h4>
                    <VehicleInfo
                      vehicles={vehicles}
                      handleEditClick={handleEditClick}
                    />
                    <div className='text'>
                      <input type='text' placeholder='search vehicle' />
                    </div>
                    <div>
                      {showForm ? (
                        <div id='addVehicleForm'>
                          <AddVehicleForm
                            customer_id={customerId}
                            renderType={renderType}
                            setRenderType={setRenderType}
                            // onSubmit={handleSubmit}
                          />
                        </div>
                      ) : (
                        <div id='addVehicleButton'>
                          <div className='form-group col-md-12'>
                            <button
                              className='theme-btn btn-style-one'
                              type='submit'
                              onClick={() => setShowForm(true)}>
                              ADD VEHICLE
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='history-block'>
                  <div className='years'>Orders</div>
                  <div className='content'>
                    <h4>Orders of Cust 1</h4>
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
