import React from "react";
import OrderStatusDropdown from "../../components/Admin/Order/OrderList/OrderStatusDropdown";
import { getStatusClass, orderStatusLabels } from "../../../util/statusUtils";

function SelectedServices({
  singleOrder,
  handleServiceCompletionChange,
  isReadOnly,
}) {
  const selectedServices = singleOrder?.services || [];
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
                    <h2 className='title'>Requested Services</h2>
                  </div>
                  <section className='services'>
                    <div className='auto-container'>
                      <div className='wrapper-box'>
                        <div className='left-column'>
                          {selectedServices.map((service) => (
                            <div
                              className='services-list'
                              key={service.service_id}>
                              <div className='services-name'>
                                <h2 className='Name'>{service.service_name}</h2>
                                <div>{service.service_description}</div>
                              </div>
                              <div>
                                {isReadOnly ? (
                                  <span
                                    className={`status-label ${getStatusClass(
                                      service.service_completed
                                    )}`}>
                                    {
                                      orderStatusLabels[
                                        service.service_completed
                                      ]
                                    }
                                  </span>
                                ) : (
                                  <OrderStatusDropdown
                                    statusType='service'
                                    orderStatus={service.service_completed}
                                    selectedServicesId={
                                      service.order_service_id
                                    }
                                    onUpdateStatus={
                                      handleServiceCompletionChange
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          ))}
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

export default SelectedServices;
