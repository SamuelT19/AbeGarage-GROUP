import React from "react";

function CustomerDetails({ singleOrder }) {
  //destructure the singleOrder object
  const customerInfo = singleOrder?.customerVehicle || {};

  return (
    <>
      <div className='customer_details col-lg-60 left-side '>
        <div>
          <div className='col-lg-20 service-block-one'>
            <div className='inner-box hvr-float-shadow'>
              <h6 className='bold-text'>CUSTOMER</h6>
              <h4>
                {customerInfo.customer_first_name}{" "}
                {customerInfo.customer_last_name}
              </h4>
              <div>
                <span className='bold-text'>Email:</span>{" "}
                {customerInfo.customer_email}
              </div>
              <div>
                <span className='bold-text'>Phone Number:</span>{" "}
                {customerInfo.customer_phone_number}
              </div>
              <div>
                <span className='bold-text'>Active Customer:</span>
                {customerInfo.active_customer_status === 1 ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDetails;
