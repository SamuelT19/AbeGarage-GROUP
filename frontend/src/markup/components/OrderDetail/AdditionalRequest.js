import React from "react";
import OrderStatusDropdown from "../../components/Admin/Order/OrderList/OrderStatusDropdown";
import { getStatusClass, orderStatusLabels } from "../../../util/statusUtils";

function AdditionalRequest({
  singleOrder,
  handleAdditionalRequestCompletionChange,
  isReadOnly,
}) {
  const order = singleOrder?.orderData || [];
  const customerVehicle = singleOrder?.customerVehicle || {};

  return (
    <>
      <div>
        <section className='selected-services  '>
          <div className='row'>
            <div className='col-lg-12 service-block-one service-box'>
              <div className='inner-box hvr-float-shadow'>
                <div className='auto-container'>
                  <div className=' services-title'>
                    <h4>
                      {customerVehicle.vehicle_make}{" "}
                      {customerVehicle.vehicle_model}
                    </h4>
                    <h2 className='title'>Additional Request</h2>
                  </div>
                  <section className='services'>
                    <div className='auto-container'>
                      <div className='wrapper-box'>
                        <div className='left-column'>
                          <div className='services-list' key={order.order_id}>
                            <div className='services-name'>
                              {order.additional_request ? (
                                <div>{order.additional_request}</div>
                              ) : (
                                <div>No additional request</div>
                              )}
                            </div>
                            <div>
                              {isReadOnly ? (
                                <span
                                  className={`status-label ${getStatusClass(
                                    order.additional_requests_completed
                                  )}`}>
                                  {
                                    orderStatusLabels[
                                      order.additional_requests_completed
                                    ]
                                  }
                                </span>
                              ) : (
                                <OrderStatusDropdown
                                  statusType='additionalRequest'
                                  orderStatus={
                                    order?.additional_requests_completed
                                  }
                                  selectedServicesId={order.order_id}
                                  onUpdateStatus={
                                    handleAdditionalRequestCompletionChange
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AdditionalRequest;
