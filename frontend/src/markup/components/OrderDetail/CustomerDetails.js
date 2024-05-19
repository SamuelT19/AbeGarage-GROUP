import React from "react";

function CustomerDetails({ singleOrder }) {
  //distracture the singleOrder object
  const customerInfo = singleOrder?.customerVehicle || {};

  return (
    <div>
      <div>
        <div>
          <h4>
            {customerInfo.customer_first_name} {customerInfo.customer_last_name}
          </h4>
          <div>Phone: {customerInfo.customer_email}</div>
          <div>Email: {customerInfo.customer_phone_number}</div>
          <div>
            {" "}
            Active Customer:
            {customerInfo.active_customer_status === 1 ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
