import React, { useState, useEffect } from "react";
import orderService from "../../../../../services/order.service";
import { useAuth } from "../../../../../Contexts/AuthContext";
import ServiceCard from "../ServiceCard/ServiceCard";
import { useNavigate, useParams } from "react-router-dom";
import OrderVehicleCard from "../OrderVehicleCard/OrderVehicleCard";
import OrderCustomerCard from "../OrderCustomerCard/OrderCustomerCard";

function EditOrderForm() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [customerVehicle, setCustomerVehicle] = useState({});
  const [order, setOrder] = useState({
    additional_request: "",
    estimated_completion_date: "",
    notes_for_internal_use: "",
    notes_for_customer: "",
    additional_request_price: "",
    
  });

  const { employee } = useAuth();
  const token = employee?.employee_token;
  const { order_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await orderService.getAllServices(token);
        const data = response.data.services;
        setServices(data);
      } catch (error) {
        console.log("Error fetching services:", error);
        setApiError(true);
        setApiErrorMessage(
          error.response?.status === 401
            ? "Please login again"
            : error.response?.status === 403
            ? "You are not authorized to view this page"
            : "Please try again later"
        );
      }
    };

    fetchServices();
  }, [token]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        console.log(`Fetching order with ID: ${order_id}`);
        const response = await orderService.getOrderByOrderId(order_id, token);
        console.log("Response:", response);
        const data = response.data;
        console.log("Order data:", data);

   
        setOrder({
          additional_request: data.services[0].additional_request,
          estimated_completion_date: data.services[0].estimated_completion_date,
          notes_for_internal_use: data.services[0].notes_for_internal_use,
          notes_for_customer: data.services[0].notes_for_customer,
          additional_request_price: data.services[0].additional_request_price,
          
        });

        setSelectedServices(data.services);
        calculateTotalPrice(
          data.services,
          data.services[0].additional_request_price
        );

        setCustomerVehicle(data.customerVehicle);
      } catch (error) {
        console.log("Error fetching order:", error);
        setApiError(true);
        setApiErrorMessage(
          error.response?.status === 401
            ? "Please login again"
            : error.response?.status === 403
            ? "You are not authorized to view this page"
            : "Please try again later"
        );
      }
    };

    fetchOrder();
  }, [token, order_id]);

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
      ) + (parseFloat(additionalRequestPrice) || 0);
    setTotalPrice(total);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => {
      let updatedValue = value;
      // Parse the value to a number if it's not empty
      if (name === "additional_request_price" && value !== "") {
        updatedValue = parseFloat(value.replace(/\$|,/g, ""));
      }
      const updatedOrder = { ...prev, [name]: updatedValue };
      if (name === "additional_request_price") {
        calculateTotalPrice(selectedServices, updatedValue);
      }
      return updatedOrder;
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      order_id: order_id,
      employee_id: employee?.employee_id || 0,
      customer_id: customerVehicle?.customer_id || customerVehicle?.customer_id,
      vehicle_id: customerVehicle?.vehicle_id || 0,
      active_order: 1,
      order_total_price: totalPrice,
      estimated_completion_date: order.estimated_completion_date || null,
      additional_request: order.additional_request || "",
      notes_for_internal_use: order.notes_for_internal_use || "",
      notes_for_customer: order.notes_for_customer || "",
      additional_requests_completed: 0,
      order_status: 1,
      order_services: selectedServices.map((service) => ({
      service_id: service.service_id,
      service_completed: 1,
      })),
      additional_request_price: order.additional_request_price,
    };

    console.log("Order data being sent:", orderData);

    try {
      const response = await orderService.updateOrder(orderData, token);
      console.log(response); // Log the response
      // Handle successful response
      setSuccess(true);
      setServerError("");
      // Redirect to the order page after successful update
      setTimeout(() => {
        navigate("/admin/order/all");
      }, 2000);
    } catch (error) {
      console.error("Error updating order:", error);
      setApiError(true);
      setApiErrorMessage("Failed to update order. Please try again.");
    }
  };
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
    };

  return (
    <div>
      {apiError ? (
        <p style={{ color: "red" }}>{apiErrorMessage}</p>
      ) : (
        <div>
          {customerVehicle && (
            <>
              <OrderCustomerCard
                customer_first_name={customerVehicle.customer_first_name}
                customer_last_name={customerVehicle.customer_last_name}
                customer_email={customerVehicle.customer_email}
                customer_phone_number={customerVehicle.customer_phone_number}
                active_customer_status={customerVehicle.active_customer_status}
              />
              <OrderVehicleCard vehicle={customerVehicle} />
            </>
          )}
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
                      isSelected={selectedServices.some(
                        (s) => s.service_id === service.service_id
                      )}
                    />
                  ))
                ) : (
                  <p>No services available</p>
                )}
              </div>
            </div>
            <div className="card-addional edit-card-additional">
              <div className="form-group">
                <p
                  htmlFor="additional_request"
                  style={{
                    color: "navy",
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  Additional Request
                  <span style={{ color: "red" }}>___</span>
                </p>
                <input
                  type="textarea"
                  name="additional_request"
                  value={order.additional_request}
                  onChange={handleChange}
                  className="form-control"
                  id="additional_request"
                  placeholder="Enter any additional requests"
                  style={{ width: "80%" }}
                />
              </div>
              <div className="form-group">
                <p htmlFor="additional_request_price">
                  Additional Request Price
                </p>
                <input
                  type="text"
                  name="additional_request_price"
                  value={formatPrice(order.additional_request_price)}
                  onChange={handleChange}
                  className="form-control"
                  id="additional_request_price"
                  placeholder="Enter price for additional requests"
                  style={{ width: "80%" }}
                />
                <span></span>
              </div>
              <div className="form-group">
                <p htmlFor="estimated_completion_date">
                  Estimated Completion Date
                </p>
                <input
                  type="datetime-local"
                  name="estimated_completion_date"
                  value={order.estimated_completion_date}
                  onChange={handleChange}
                  placeholder="Estimated Completion Date"
                  style={{ width: "80%", height: "4px" }}
                />
              </div>
              <div className="form-group">
                <p htmlFor="notes_for_internal_use">Notes for Internal Use</p>
                <textarea
                  type="textarea"
                  name="notes_for_internal_use"
                  value={order.notes_for_internal_use}
                  onChange={handleChange}
                  placeholder="Notes for internal use"
                  className="form-control"
                  id="notes_for_internal_use"
                  style={{ width: "80%", height: "50px" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="notes_for_customer">Notes for Customer</label>
                <textarea
                  type="textarea"
                  name="notes_for_customer"
                  value={order.notes_for_customer}
                  onChange={handleChange}
                  placeholder="Notes for customer"
                  className="form-control"
                  id="notes_for_customer"
                  style={{ width: "80%", height: "50px" }}
                />
              </div>
              <div>
                <p> Total Price: </p>
                <input
                  type="text"
                  value={formatPrice(totalPrice.toFixed(2))}
                  readOnly
                  placeholder="Total price"
                  style={{ width: "80%", height: "30px" }}
                />
              </div>
              <div>
                <button
                  style={{
                    width: "20%",
                    marginBottom: "100px ",
                    marginTop: "10px ",
                  }}
                  className="theme-btn btn-style-one"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          {serverError && <p style={{ color: "red" }}>{serverError}</p>}
          {success && (
            <p style={{ color: "green", fontSize: "20px" }}>
              Order updated successfully!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default EditOrderForm;
