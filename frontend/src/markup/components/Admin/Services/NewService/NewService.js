import React, { useState } from "react";
import { useAuth } from "../../../../../Contexts/AuthContext";
import serviceService from "../../../../../services/service.service";
import { useNavigate } from "react-router";

function NewService() {
  const [service_name, setServiceName] = useState("");
  const [service_description, setServiceDescription] = useState("");
  const [service_price, setServicePrice] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serviceNameRequired, setServiceNameRequired] = useState("");
  const [serviceDescriptionRequired, setServiceDescriptionRequired] =
    useState("");
  const [servicePriceRequired, setServicePriceRequired] = useState("");
  const navigate = useNavigate();
  const { employee } = useAuth();
  const token = employee?.employee_token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if (!service_name) {
      setServiceNameRequired("Service name is required");
      valid = false;
    } else {
      setServiceNameRequired("");
    }
    if (!service_description) {
      setServiceDescriptionRequired("Service description is required");
      valid = false;
    } else {
      setServiceDescriptionRequired("");
    }
    if (!service_price) {
      setServicePriceRequired("Service price is required");
      valid = false;
    } else {
      setServicePriceRequired("");
    }
    if (!valid) {
      return;
    }
    const serviceData = {
      service_name,
      service_description,
      service_price,
    };
    const newService = serviceService.addService(serviceData, token);
    newService
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

  return (
    <section className='service-section1'>
      <div className='auto-container'>
        <div className='wrapper-box'>
          <div className='left-column'>
            <h2 className='Add-new_title'>Add a new service</h2>
            <form onSubmit={handleSubmit}>
              <div className='row clearfix'>
                <div className='service-name form-group col-md-10'>
                  {serverError && (
                    <div className='validation-error' role='alert'>
                      {serverError}
                    </div>
                  )}
                  <input
                    type='text'
                    name='service_name'
                    value={service_name}
                    onChange={(event) => setServiceName(event.target.value)}
                    placeholder='Service name'
                  />
                  {serviceNameRequired && (
                    <div className='validation-error' role='alert'>
                      {serviceNameRequired}
                    </div>
                  )}
                </div>
                <div className='service-description form-group col-md-10 left-side'>
                  <textarea
                    type='text'
                    name='service_description'
                    value={service_description}
                    onChange={(event) =>
                      setServiceDescription(event.target.value)
                    }
                    placeholder='Service description'
                  />
                  {serviceDescriptionRequired && (
                    <div className='validation-error' role='alert'>
                      {serviceDescriptionRequired}
                    </div>
                  )}
                </div>
                <div className='service-price form-group col-md-10'>
                  {serverError && (
                    <div className='validation-error' role='alert'>
                      {serverError}
                    </div>
                  )}
                  <input
                    type='number'
                    name='service_price'
                    value={service_price}
                    onChange={(event) => setServicePrice(event.target.value)}
                    placeholder='price'
                  />
                  {servicePriceRequired && (
                    <div className='validation-error' role='alert'>
                      {servicePriceRequired}
                    </div>
                  )}
                </div>
                <div className='form-group col-md-12'>
                  <button className='theme-btn btn-style-one' type='submit'>
                    <span>Add service</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewService;
