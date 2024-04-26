import React from "react";
import { FaEdit } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function CustomerInfo() {
  const navigate = useNavigate();

  const handleEditClick = () => {
    // Navigate to a different route
    navigate("/new-route");
  };

  return (
    <>
      <div className='text'>
        <div>Email:</div>
        <div>Phone Number:</div>
        <div>Active Customer:</div>
        <div>
          Edit customer info:
          <FaEdit className='red-icon' onClick={handleEditClick} />
        </div>
      </div>
    </>
  );
}

export default CustomerInfo;
