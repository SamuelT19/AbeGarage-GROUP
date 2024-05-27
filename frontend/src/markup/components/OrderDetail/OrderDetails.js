import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderService from "../../../services/order.service";
import CustomerDetails from "./CustomerDetails";
import SelectedServices from "./SelectedServices";
import VehicleInServices from "./VehicleInService";
import OrderStatusDropdown from "../../components/Admin/Order/OrdersList/OrderStatusDropdown";
import { useAuth } from "../../../Contexts/AuthContext"; // Adjust the import path if necessary

// function OrderDetails() {
//   // Initialize the state
//   const [singleOrder, setSingleOrder] = useState([]);
//   const { order_id, order_status } = useParams();
//   const { isLogged, isAdmin, isManager, isEmployee } = useAuth();

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await OrderService.getOrderByID(order_id);
//         setSingleOrder(response);
//         console.log(response);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchOrder();
//   }, [order_id]);

//   const handleSubmitProgress = async () => {
//     try {
//       // Assuming Orderservice.updateOrderProgress is the method to submit progress
//       await OrderService.updateOrderProgress(order_id, singleOrder);
//       alert("Order progress submitted successfully.");
//     } catch (error) {
//       console.log(error);
//       alert("Failed to submit order progress.");
//     }
//   };

//   const customerVehicle = singleOrder?.customerVehicle || {};

//   return (
//     <>
//       <section className='contact-section'>
//         <div className='auto-container'>
//           <div className='tracker-title'>
//             <div className='order_tracker'>
//               <h2 className='customer_name'>
//                 {customerVehicle.customer_first_name}{" "}
//                 {customerVehicle.customer_last_name}
//               </h2>
//               <OrderStatusDropdown statusCode={Number(order_status)} />
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
//           {isEmployee && (
//             <div className='submit-progress'>
//               <button onClick={handleSubmitProgress} className='submit-button'>
//                 Submit Progress
//               </button>
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }

// export default OrderDetails;

function OrderDetails() {
  const [singleOrder, setSingleOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState(null);
  const { order_id, order_status } = useParams();
  const { isEmployee, isAdmin, isManager } = useAuth();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await OrderService.getOrderByID(order_id);
        setSingleOrder(response);
        setOrderStatus(response.order_status || Number(order_status));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [order_id, order_status]);

  const handleStatusUpdate = (status) => {
    setOrderStatus(status);
  };

  const handleServiceCompletionChange = (serviceId, completed) => {
    const updatedServices = singleOrder.services.map((service) =>
      service.order_service_id === serviceId
        ? { ...service, service_completed: completed }
        : service
    );
    setSingleOrder({ ...singleOrder, services: updatedServices });
  };

  const handleSubmitProgress = async () => {
    try {
      const updatedOrder = {
        ...singleOrder,
        order_status: orderStatus,
        services: singleOrder.services,
      };
      console.log(updatedOrder);
      await OrderService.updateOrderProgress(order_id, updatedOrder);
      alert("Order progress submitted successfully.");
    } catch (error) {
      console.log(error);
      alert("Failed to submit order progress.");
    }
  };

  const customerVehicle = singleOrder?.customerVehicle || {};

  return (
    <section className='contact-section'>
      <div className='auto-container'>
        <div className='tracker-title'>
          <div className='order_tracker'>
            <h2 className='customer_name'>
              {customerVehicle.customer_first_name}{" "}
              {customerVehicle.customer_last_name}
            </h2>
            {isEmployee || isAdmin || isManager ? (
              <OrderStatusDropdown
                orderStatus={orderStatus}
                orderId={order_id}
                onUpdateStatus={handleStatusUpdate}
              />
            ) : (
              <span className={`status-label ${getStatusClass(orderStatus)}`}>
                {orderStatusLabels[orderStatus]}
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
                handleServiceCompletionChange={handleServiceCompletionChange}
              />
            </div>
          </div>
        </section>
        {(isEmployee || isAdmin || isManager) && (
          <div className='submit-progress  '>
            <button
              onClick={handleSubmitProgress}
              className='submit-button btn-style-one'>
              Submit Progress
            </button>
          </div>
        )}
      </div>
    </section>
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

export default OrderDetails;
