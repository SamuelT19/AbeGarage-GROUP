import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderService from "../../../services/order.service";
import CustomerDetails from "./CustomerDetails";
import SelectedServices from "./SelectedServices";
import VehicleInServices from "./VehicleInService";
import AdditionalRequest from "./AdditionalRequest";
import OrderStatusDropdown from "../../../markup/components/Admin/Order/OrderList/OrderStatusDropdown";
import { useAuth } from "../../../Contexts/AuthContext"; // Adjust the import path if necessary
import { getStatusClass, orderStatusLabels } from "../../../util/statusUtils"; // Adjust the import path if necessary
import { add } from "date-fns";

// function OrderDetails() {
//   //initialize the state
//   const [singleOrder, setsingleOrder] = useState([]);
//   const { order_id, order_status } = useParams();
//   const { isLogged, isAdmin, isManager, isEmployee } = useAuth();

//   console.log(order_status);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await Orderservice.getOrderByID(order_id);
//         setsingleOrder(response);
//         console.log(response);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const customerVehicle = singleOrder?.customerVehicle || {};

//   return (
//     <>
//       <section className='contact-section'>
//         <div className='auto-container'>
//           <div className='tracker-title'>
//             <div className='order_tracker'>
//               <h2 className='customer_name'>
//                 {customerVehicle.customer_first_name}
//                 {customerVehicle.customer_last_name}
//               </h2>
//               <OrderStatusLabel statusCode={Number(order_status)} />
//             </div>
//             <p>
//               You can track the progress of your order using this page. We will
//               constantly update this page to let you know how we are
//               progressing. As soon as we are done with the order, the status
//               will turn green. That means, your order is ready for pick up. If
//               you have any questions, please feel free to contact us.
//             </p>
//           </div>
//           <section className='order-service'>
//             <div className='auto-container'>
//               <div className='wrapper-box'>
//                 <div className='customer-vehicle'>
//                   <div className='order-customer'>
//                     <CustomerDetails singleOrder={singleOrder} />
//                   </div>
//                   <div className='order-vehicle'>
//                     <VehicleInServices singleOrder={singleOrder} />
//                   </div>
//                 </div>
//                 <SelectedServices singleOrder={singleOrder} />
//               </div>
//             </div>
//           </section>
//         </div>
//       </section>
//     </>
//   );
// }

function OrderDetails() {
  const [singleOrder, setSingleOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState(null);
  const [additionalRequest, setAdditionalRequest] = useState(null);
  const [updatedServices, setUpdatedServices] = useState([]);
  // const [updatedOrder, setupdatedOrder] = useState({});
  const { orderId, orderHash } = useParams();
  const { isEmployee, isAdmin, isManager } = useAuth();

  // console.log(orderId);
  // console.log(orderHash);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await OrderService.getOrderByID(orderId);
        setSingleOrder(response);
        setOrderStatus(response.orderData.order_status);
        setAdditionalRequest(response.orderData.additional_requests_completed);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleAdditionalRequestStatusUpdate = (status) => {
    console.log(status);
    setAdditionalRequest(status);
    console.log(additionalRequest);
  };

  // console.log(singleOrder.orderData);
  const handleOrderStatusUpdate = (order_id, status) => {
    setOrderStatus(status);
  };

  const handleServiceStatusUpdate = (serviceId, completed) => {
    const updatedService = {
      order_service_id: serviceId,
      service_completed: completed,
    };

    setUpdatedServices((prevServices) => {
      const existingServiceIndex = prevServices.findIndex(
        (service) => service.order_service_id === serviceId
      );

      if (existingServiceIndex !== -1) {
        // If the service exists in the state, update its status
        const updatedServices = [...prevServices];
        updatedServices[existingServiceIndex] = updatedService;
        return updatedServices;
      } else {
        // If the service does not exist, add it to the state
        return [...prevServices, updatedService];
      }
    });
  };

  // console.log(singleOrder.orderData);
  // const handleAdditionalRequestStatusUpdate = (order_id, status) => {
  //   setAdditionalRequest(status);
  // };

  console.log(additionalRequest);

  const handleSubmitProgress = async () => {
    try {
      const updatedOrder = {
        additional_requests_completed: additionalRequest,
        order_status: orderStatus,
        order_services: updatedServices, // Ensure this is an array of objects with service_id and service_completed
      };

      console.log("Submitting order update:", updatedOrder);

      await OrderService.updateOrderProgress(orderId, updatedOrder);
      alert("Order progress submitted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to submit order progress.");
    }
  };

  const customerVehicle = singleOrder?.customerVehicle || {};
  // const services = singleOrder?.services || [];
  const order = singleOrder.orderData || {};
  // const isReadOnly = Boolean(orderHash == order.order_hash);
  const isReadOnly = Boolean(orderHash);

  // console.log(order.order_id);

  // console.log(services);

  return (
    <section className='contact-section'>
      <div className='auto-container'>
        <div className='tracker-title'>
          <div className='order_tracker'>
            <h2 className='customer_name'>
              {customerVehicle.customer_first_name}{" "}
              {customerVehicle.customer_last_name}
            </h2>
            {!isReadOnly && (isEmployee || isAdmin || isManager) ? (
              <OrderStatusDropdown
                statusType='order'
                orderStatus={order.order_status}
                orderId={orderId}
                onUpdateStatus={handleOrderStatusUpdate}
              />
            ) : (
              <span
                className={`status-label ${getStatusClass(
                  order.order_status
                )}`}>
                {orderStatusLabels[order.order_status]}
              </span>
            )}
          </div>
          <p>
            You can track the progress of your order using this page. We will
            constantly update this page to let you know how we are progressing.
            As soon as we are done with the order, the status will turn green.
            That means, your order is ready for pick up. If you have any
            questions, please feel free to contact us.
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
              <SelectedServices
                singleOrder={singleOrder}
                handleServiceCompletionChange={handleServiceStatusUpdate}
                isReadOnly={isReadOnly}
              />
              <AdditionalRequest
                singleOrder={singleOrder}
                handleAdditionalRequestCompletionChange={
                  handleAdditionalRequestStatusUpdate
                }
                isReadOnly={isReadOnly}
              />
            </div>
          </div>
        </section>
        {!isReadOnly && (isEmployee || isAdmin || isManager) && (
          <div className='submit-progress'>
            <button
              onClick={handleSubmitProgress}
              className='theme-btn btn-style-one'>
              Submit Progress
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default OrderDetails;
