import React from 'react'

function VehicleInService(setsingleOrder) {

    //distructuring the singleOrder
    const { vehicle } = setsingleOrder;

    return <div>
        <div className="order-detail">
            <h3>Vehicle In Service</h3>
            <div className="order-detail__content">
                <div className="order-detail__content__item">
                    <h4>Vehicle</h4>
                    <p>{vehicle}</p>
                </div>
            </div>
        </div>
  </div>;
}

export default VehicleInService
