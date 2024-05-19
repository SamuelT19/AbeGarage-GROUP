import React from "react";
import { useState, useEffect } from "react";
import Orderservice from "../../../services/order.service";
import CustomerDetails from "./CustomerDetails";
import SelectedServies from "./SelectedServices";
import VehicleInSerivices from "./VehicleInService";
import { useParams } from "react-router-dom";

function OrderDetails() {
  //intialize the state
  const [singleOrder, setsingleOrder] = useState([]);
  const { order_id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Orderservice.getOrderByID(order_id);
        setsingleOrder(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  const customerVehicle = singleOrder?.customerVehicle || {};

  return (
    <>
      <section className='contact-section'>
        <div className='auto-container'>
          <div className='contact-title'>
            <h2 className='title'>{customerVehicle.customer_last_name}</h2>
            <div className='text22'>
              You can track the progress of your order using this page.
            </div>
          </div>
          <section className='service-section'>
            <div className='auto-container'>
              <div className='wrapper-box'>
                <div className='left-column'>
                  <CustomerDetails singleOrder={singleOrder} />
                  <VehicleInSerivices singleOrder={singleOrder} />
                  <SelectedServies singleOrder={singleOrder} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default OrderDetails;
