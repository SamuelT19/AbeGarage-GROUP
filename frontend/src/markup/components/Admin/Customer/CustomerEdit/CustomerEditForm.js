import React, { useState, useEffect } from "react";
// import customer.service.js
import customerService from "../../../../../services/customer.service";
// Import the useAuth hook
import { useAuth } from "../../../../../Contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
function CustomerEditForm() {
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone_number, setPhoneNumber] = useState("");
  const [active_customer_status, setActiveCustomerStatus] = useState(1);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const { customer_id } = useParams();

  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await customerService.getCustomerById(
          customer_id,
          loggedInEmployeeToken
        );
        console.log(data.customer)
        const customerData = data.customer[0];
        console.log(customerData);
        setEmail(customerData.customer_email);
        setFirstName(customerData.customer_first_name);
        setLastName(customerData.customer_last_name);
        setPhoneNumber(customerData.customer_phone_number);
        setActiveCustomerStatus(customerData.active_customer_status)
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchData();
  }, [customer_id, loggedInEmployeeToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!customer_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }

    if (!customer_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!customer_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(customer_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    if (!valid) {
      return;
    }

    const formData = {
      customer_id,
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    };

    try {
      const editCustomer = await customerService.updateCustomerById(
        formData,
        loggedInEmployeeToken
      );

      // Handle successful response
      console.log(editCustomer);
      setSuccess(true);
      setServerError("");
      // Redirect to the home page after 2 seconds
      setTimeout(() => {
        window.location.href = "/admin/customer/customers";
      }, 2000);
    } catch (error) {
      // Handle error
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setServerError(resMessage);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            Edit : {customer_first_name} {customer_last_name}
          </h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <h3>Customer Email: {customer_email}</h3>
                      {/* <input
                        type="email"
                        name="customer_email"
                        value={customer_email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
                      /> */}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        value={customer_first_name}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="First Name"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        value={customer_last_name}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone"
                        value={customer_phone_number}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        placeholder="Customer phone (555-555-5555)"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="checkbox"
                        name="active employee"
                      ></input>
                      <label for="checkbox">is active customer:</label>
                    </div>
                    <div className="form-group col-md-12">
                      <button type="submit" className="theme-btn btn-style-one">
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CustomerEditForm;
