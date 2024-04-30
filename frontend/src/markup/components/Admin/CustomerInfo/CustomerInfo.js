import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function CustomerInfo({ customerId, customerInfo }) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/admin/customer/edit/${customerId}`);
  };

  return (
    <>
      <div className='text'>
        <div>Email: {customerInfo.customer_email}</div>
        <div>Phone Number: {customerInfo.customer_phone_number} </div>
        <div>
          Active Customer:
          {customerInfo.active_customer_status === 1 ? "Yes" : "No"}
        </div>
        <div>
          Edit customer info:
          <FaEdit className='red-icon' onClick={handleEditClick} />
        </div>
      </div>
    </>
  );
}

export default CustomerInfo;
