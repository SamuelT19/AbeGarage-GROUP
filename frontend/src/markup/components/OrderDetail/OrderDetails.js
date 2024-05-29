import React from "react";
import { useState, useEffect } from "react";
import Orderservice from "../../../services/order.service";
import CustomerDetails from "./CustomerDetails";
import SelectedServices from "./SelectedServices";
import VehicleInServices from "./VehicleInService";
import { useParams } from "react-router-dom";
import OrderStatusLabel from "../../components/Admin/Order/OrderList/OrderStatusLabel";

function OrderDetails() {
  //initialize the state
  const [singleOrder, setsingleOrder] = useState([]);
  const { order_id, order_status } = useParams();

  console.log(order_status);

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
          <div className='tracker-title'>
            <div className='order_tracker'>
              <h2 className='customer_name'>
                {customerVehicle.customer_first_name}
                {customerVehicle.customer_last_name}
              </h2>
              <OrderStatusLabel statusCode={Number(order_status)} />
            </div>
            <p>
              You can track the progress of your order using this page. We will
              constantly update this page to let you know how we are
              progressing. As soon as we are done with the order, the status
              will turn green. That means, your order is ready for pick up. If
              you have any questions, please feel free to contact us.
            </p>
          </div>
          <section className='order-service'>
            <div className='auto-container'>
              <div className='wrapper-box'>
                <div className='customer-vehicle'>
                  <div className='order-customer'>
                    <CustomerDetails singleOrder={singleOrder} />
                  </div>
                  <div className='order-vehicle'>
                    <VehicleInServices singleOrder={singleOrder} />
                  </div>
                </div>
                <SelectedServices singleOrder={singleOrder} />
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default OrderDetails;
