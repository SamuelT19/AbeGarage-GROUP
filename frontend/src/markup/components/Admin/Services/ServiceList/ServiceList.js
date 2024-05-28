import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../../Contexts/AuthContext";
import serviceService from "../../../../../services/service.service";
import NewService from "../NewService/NewService";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceService.getAllServices(token);
        console.log(response);

        setServices(response.services);
        console.log(response.services);
        setApiError(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setApiError(true);
      }
    };
    fetchServices();
  }, [token]);

  const confirmDeleteService = async (service) => {
    const { service_id } = service;
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this service? "${service.service_name}"?`
    );

    if (isConfirmed) {
      try {
        const status = await serviceService.deleteServiceById(
          service_id,
          token
        );
        console.log(status); // Check if status is received
        if (status) {
          console.log("Service deleted successfully");
          const updatedService = services.filter(
            (s) => s.service_id !== service_id
          );
          console.log("After deletion:", updatedService); // Log after deletion
          setServices(updatedService);
          // Now fetch all services again and update the database
          const updatedServicesInDB = await serviceService.getAllServices(
            token
          );
          console.log(
            "Service list updated in the database",
            updatedServicesInDB
          );
        }
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  return (
    <>
      {apiError ? (
        <section className='contact-section'>
          <div className='auto-container'>
            <div className='contact-title'>
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className='contact-section'>
          <div className='auto-container'>
            <div className='contact-title'>
              <h2 className='title'>Services we provide</h2>
              <div className='text22'>
                Bring to the table win-win strategies to ensure proactive
                domination. At the end of the day, going forward, a new normal
                that has evolved from generation to generation is on the runway
                heading towards a streamlined cloud solution.
              </div>
            </div>
            <section className='service-section'>
              <div className='auto-container'>
                <div className='wrapper-box'>
                  <div className='left-column'>
                    {services.map((service) => (
                      <div
                        className='service-list'
                        key={service.service_id}
                        style={{ marginBottom: "5px" }}>
                        <div className='service-name1'>
                          <h2 className='Name'>{service.service_name}</h2>
                          <div>{service.service_description}</div>
                        </div>

                        <div className='col-md-2'>
                          <Link
                            to={`/admin/services/edit-service/${service.service_id}`}>
                            <FaEdit
                              className='edit-icon'
                              style={{ cursor: "pointer" }}
                            />
                          </Link>
                          &nbsp; &nbsp;
                          <FaTrash
                            className='delete-icon'
                            style={{ cursor: "pointer" }}
                            onClick={() => confirmDeleteService(service)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <br />
                  <NewService />
                </div>
              </div>
            </section>
          </div>
        </section>
      )}
    </>
  );
};

export default ServiceList;
