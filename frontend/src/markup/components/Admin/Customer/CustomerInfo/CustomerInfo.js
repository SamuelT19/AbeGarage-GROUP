import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function CustomerInfo({ customerInfo }) {
  const navigate = useNavigate();
  const customerId = customerInfo.customer_id;
  const handleEditClick = () => {
    navigate(`/admin/customer/edit/${customerId}`);
  };

  return (
    <>
      <div className='customer_details col-lg-60 left-side '>
        <div>
          <div className='col-lg-20 service-block-one'>
            <div className='inner-box hvr-float-shadow box-resize'>
              <div className='text'>
                <div>
                  <span className='bold-text'>Email:</span>{" "}
                  {customerInfo.customer_email}
                </div>
                <div>
                  <span className='bold-text'>Phone Number: </span>
                  {customerInfo.customer_phone_number}{" "}
                </div>
                <div>
                  <span className='bold-text'>Active Customer:</span>

                  {customerInfo.active_customer_status === 1 ? "Yes" : "No"}
                </div>
                <div>
                  <span className='bold-text'>Edit customer info</span>

                  <FaEdit
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={handleEditClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerInfo;
