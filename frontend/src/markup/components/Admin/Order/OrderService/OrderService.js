import React, { useState, useEffect } from "react";
import orderService from "../../../../../services/order.service";
import { useAuth } from "../../../../../Contexts/AuthContext";
import ServiceCard from "../ServiceCard/ServiceCard";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function OrderService() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const [order, setOrder] = useState({
    additional_request: "",
    estimated_completion_date: "",
    notes_for_internal_use: "",
    notes_for_customer: "",
    additional_request_price: "",
  });
  const { employee } = useAuth();
  const token = employee?.employee_token;

  const { customer_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicle } = location.state || {};

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await orderService.getAllServices(token);
        const data = response.data.services;
        setServices(data);
      } catch (error) {
        console.log("Error fetching services:", error);
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

    fetchService();
  }, [token]);

  useEffect(() => {
    console.log("Services:", services);
  }, [services]);

  const handleServiceSelect = (selectedService, isSelected) => {
    setSelectedServices((prevSelected) => {
      let updatedSelected;
      if (isSelected) {
        updatedSelected = [...prevSelected, selectedService];
      } else {
        updatedSelected = prevSelected.filter(
          (service) => service.service_id !== selectedService.service_id
        );
      }
      calculateTotalPrice(updatedSelected, order.additional_request_price);
      return updatedSelected;
    });
  };

  const calculateTotalPrice = (selectedServices, additionalRequestPrice) => {
    const total =
      selectedServices.reduce(
        (total, service) => total + (parseFloat(service.service_price) || 0),
        0
      ) + (parseFloat(additionalRequestPrice.replace(/[^0-9.]/g, "")) || 0);
    setTotalPrice(total);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => {
      let updatedValue = value;
      if (name === "additional_request_price") {
        updatedValue = value.replace(/[^0-9.]/g, "");
        calculateTotalPrice(selectedServices, updatedValue);
      }
      return { ...prev, [name]: updatedValue };
    });
  };

  //* Format the additional_request_price to currency format only when the input field loses focus.
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "additional_request_price") {
      setOrder((prev) => ({
        ...prev,
        [name]: formatPrice(value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      employee_id: employee?.employee_id || 0,
      customer_id: parseInt(customer_id, 10),
      vehicle_id: vehicle?.vehicle_id || 0,
      active_order: 1,
      order_total_price: totalPrice.toFixed(2),
      estimated_completion_date: order.estimated_completion_date || null,
      completion_date: null,
      additional_request: order.additional_request || "",
      notes_for_internal_use: order.notes_for_internal_use || "",
      notes_for_customer: order.notes_for_customer || "",
      additional_requests_completed: 0,
      order_status: 1,
      order_services: selectedServices.map((service) => ({
        service_id: service.service_id,
        service_completed: 1,
      })),
      additional_request_price:
        parseFloat(order.additional_request_price.replace(/[^0-9.]/g, "")) || 0,
    };

    console.log("Order data being sent:", orderData);

    try {
      const response = await orderService.createOrder(orderData, token);
      console.log(response);
      setSuccess(true);
      setServerError("");
      setTimeout(() => {
        navigate("/admin/order/orders");
      }, 2000);
    } catch (error) {
      console.error("Error creating order:", error);
      setApiError(true);
      setApiErrorMessage("Failed to create order. Please try again.");
    }
  };

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(numericPrice);
  };

  return (
    <div className="contact-section mt--2">
      {apiError ? (
        <p style={{ color: "red" }}>{apiErrorMessage}</p>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="chooseService">
                <p style={{ color: "navy", fontSize: "20px" }}>
                  <strong>Choose Services </strong>
                </p>
                {services.length > 0 ? (
                  services.map((service) => (
                    <ServiceCard
                      key={service.service_id}
                      service={service}
                      onSelect={handleServiceSelect}
                    />
                  ))
                ) : (
                  <p>No services available</p>
                )}
              </div>
            </div>
            <div className="card-addional">
              <div>
                <p style={{ color: "navy", fontSize: "20px" }}>
                  <strong>
                    Additional Request <span style={{ color: "red" }}>___</span>
                  </strong>
                </p>
                <br />
                <textarea
                  type="textarea"
                  name="additional_request"
                  value={order.additional_request}
                  onChange={handleChange}
                  placeholder="Service description"
                  style={{ width: "80%", height: "80px" }}
                />
                <div>
                  <input
                    type="text"
                    name="additional_request_price"
                    value={order.additional_request_price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Price"
                    style={{ width: "80%", height: "40px" }}
                  />
                </div>
              </div>
              <div>
                <p>Estimated Completion Date: </p>
                <input
                  type="datetime-local"
                  name="estimated_completion_date"
                  value={order.estimated_completion_date}
                  onChange={handleChange}
                  placeholder="Estimated Completion Date"
                  style={{ width: "80%", height: "4px" }}
                />
              </div>
              <div>
                <textarea
                  type="text"
                  name="notes_for_internal_use"
                  value={order.notes_for_internal_use}
                  placeholder="Notes for Internal Use"
                  onChange={handleChange}
                />
              </div>
              <div>
                <textarea
                  type="text"
                  name="notes_for_customer"
                  value={order.notes_for_customer}
                  placeholder="Notes for Customer"
                  onChange={handleChange}
                />
              </div>
              <div>
                <p> Total Price: </p>
                <input
                  type="text"
                  value={formatPrice(totalPrice.toFixed(2))}
                  readOnly
                  placeholder="Total price"
                  style={{ width: "80%", height: "40px" }}
                />
              </div>
              <button
                style={{ width: "20%", marginBottom: "30px " }}
                className="theme-btn btn-style-one"
                type="submit"
              >
                Create Order
              </button>
            </div>
          </form>
          {serverError && <p style={{ color: "red" }}>{serverError}</p>}
          {success && (
            <p style={{ color: "green", fontSize: "20px" }}>
              Order placed successfully!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderService;
