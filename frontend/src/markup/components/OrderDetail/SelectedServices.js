import React from "react";
import OrderStatusLabel from "../../components/Admin/Order/OrdersList/OrderStatusLabel";

function SelectedServices({ singleOrder }) {
  const selectedServices = singleOrder?.services || [];
  const customerVehicle = singleOrder?.customerVehicle || {};

  return (
    <>
      <section className='contact-section'>
        <div className="row">
          <div className="col-lg-12 service-block-one">
            <div className="inner-box hvr-float-shadow">
        <div className='auto-container'>
          <div className='contact-title'>
            <p>
              {customerVehicle.vehicle_make} {customerVehicle.vehicle_model}
            </p>
            <h2 className='title'>Requested Services </h2>
          </div>
          <section className='service-section2'>
            <div className='auto-container'>
              <div className='wrapper-box'>
                <div className='left-column'>
                  {selectedServices.map((service) => (
                    <div
                      className='service-list2'
                      key={service.service_id}
                      style={{ marginBottom: "5px" }}>
                      <div>
                        <h2>{service.service_name}</h2>
                        <div className="description">{service.service_description}</div>
                      </div>

                      <div className="order-label">
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
        </div>
        </div>
        </div>
      </section>
    </>
  );
}

export default SelectedServices;
