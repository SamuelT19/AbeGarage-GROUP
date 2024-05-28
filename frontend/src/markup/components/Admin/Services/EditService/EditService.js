import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../../Contexts/AuthContext";
import serviceService from "../../../../../services/service.service";
import { useParams, useNavigate } from "react-router";

function NewService(props) {
  const { service_id } = useParams();
  const [service_name, setServiceName] = useState("");
  const [service_description, setServiceDescription] = useState("");
  const [service_price, setServicePrice] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { employee } = useAuth();
  const token = employee?.employee_token;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = {
      service_id,
      service_name,
      service_description,
      service_price,
    };
    const editService = serviceService.editService(serviceData, token);
    editService
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
            navigate("/admin/services/services");
            // window.location.reload(); // Reload the page
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
        const data = await serviceService.getSingleService(service_id, token);
        console.log("Fetched data:", data);

        if (data && data.singleService) {
          console.log("Service data:", data.singleService);
          const { service_name, service_description, service_price } =
            data.singleService;
          setServiceName(service_name);
          setServiceDescription(service_description);
          setServicePrice(service_price);
        } else {
          console.error("Service data is not structured as expected:", data);
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    if (service_id && token) {
      fetchData();
    } else {
      console.warn("Service ID or token is missing.");
    }
  }, [service_id, token]);

  return (
    <section className='edit-service-section'>
      <div className='auto-container'>
        <div className='wrapper-box'>
          <div className='left-column'>
            <h2 className='edit_title'>Edit service</h2>
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
                </div>
                <div className='service-price form-group col-md-10'>
                  <input
                    type='number'
                    name='service_price'
                    value={service_price}
                    onChange={(event) => setServicePrice(event.target.value)}
                    placeholder='price'
                  />
                </div>
                <div className='form-group col-md-12'>
                  <button className='theme-btn btn-style-one' type='submit'>
                    <span>Edit service</span>
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
