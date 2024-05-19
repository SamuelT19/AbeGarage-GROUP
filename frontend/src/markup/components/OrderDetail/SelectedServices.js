import React from "react";
import OrderStatusLabel from "../../components/Admin/Order/OrdersList/OrderStatusLabel";

function SelectedServices({ singleOrder }) {
  const selectedServices = singleOrder?.services || [];
  const customerVehicle = singleOrder?.customerVehicle || {};

  return (
    <>
      <section className='contact-section'>
        <div className='auto-container'>
          <div className='contact-title'>
            <p>
              {customerVehicle.vehicle_make} {customerVehicle.vehicle_model}
            </p>
            <h2 className='title'>Requested Services </h2>
          </div>
          <section className='service-section'>
            <div className='auto-container'>
              <div className='wrapper-box'>
                <div className='left-column'>
                  {selectedServices.map((service) => (
                    <div
                      className='service-list'
                      key={service.service_id}
                      style={{ marginBottom: "5px" }}>
                      <div className='service-name1'>
                        <h2 className='Name'>{service.service_name}</h2>
                        <div>{service.service_description}</div>
                      </div>

                      <div>
                        <OrderStatusLabel
                          statusCode={service.service_completed}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default SelectedServices;
