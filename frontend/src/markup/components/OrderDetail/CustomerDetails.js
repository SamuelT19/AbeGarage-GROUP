import React from "react";

function CustomerDetails({ singleOrder }) {
  //distracture the singleOrder object
  const { customer } = singleOrder;

  return (
    <div>
      <h2>Customer Details</h2>
      <div className='customer-details'>
        <p>
          <strong>Name:</strong> {singleOrder.customer.customer_first_name}
        </p>
        <p>
          <strong>Email:</strong> {customer.customer_email}
        </p>
      </div>
    </div>
  );
}

export default CustomerDetails;
