import React from "react";
import OrderStatusDropdown from "../../components/Admin/Order/OrdersList/OrderStatusDropdown";
import { useAuth } from "../../../Contexts/AuthContext";

function SelectedServices({ singleOrder, handleServiceCompletionChange }) {
  const { isEmployee, isAdmin, isManager } = useAuth();
  const selectedServices = singleOrder?.services || [];
  const customerVehicle = singleOrder?.customerVehicle || {};

  return (
    <div>
      <section className='selected-services'>
        <div className='row'>
          <div className='col-lg-12 service-block-one service-box'>
            <div className='inner-box hvr-float-shadow'>
              <div className='auto-container'>
                <div className='services-title'>
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
                              {isEmployee || isAdmin || isManager ? (
                                <OrderStatusDropdown
                                  orderStatus={service.service_completed}
                                  orderId={service.order_service_id}
                                  onUpdateStatus={(status) =>
                                    handleServiceCompletionChange(
                                      service.order_service_id,
                                      status
                                    )
                                  }
                                />
                              ) : (
                                <span
                                  className={`status-label ${getStatusClass(
                                    service.service_completed
                                  )}`}>
                                  {orderStatusLabels[service.service_completed]}
                                </span>
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
  );
}

const getStatusClass = (statusCode) => {
  switch (statusCode) {
    case 1:
      return "received";
    case 2:
      return "in-progress";
    case 0:
      return "completed";
    case 3:
      return "canceled";
    default:
      return "";
  }
};

const orderStatusLabels = {
  1: "Received",
  2: "In Progress",
  0: "Completed",
  3: "Canceled",
};

export default SelectedServices;
