import React from "react";

function CustomerDetails({ singleOrder }) {
  //distracture the singleOrder object
  const customerInfo = singleOrder?.customerVehicle || {};

  return (
    <div className="customer-detail col-lg-60 left-side">
    <div className="row">
      <div className="col-lg-20 service-block-one">
        <div className="inner-box hvr-float-shadow">
          <h5>Customer</h5>
          <h4>
            {customerInfo.customer_first_name} {customerInfo.customer_last_name}
          </h4>
          <div>Email: {customerInfo.customer_email}</div>
          <div>Phone Number: {customerInfo.customer_phone_number}</div>
          <div>
            {" "}
            Active Customer:
            {customerInfo.active_customer_status === 1 ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CustomerDetails;
