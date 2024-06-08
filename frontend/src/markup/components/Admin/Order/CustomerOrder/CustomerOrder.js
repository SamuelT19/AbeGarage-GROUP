
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../../../../Contexts/AuthContext";
import orderService from "../../../../../services/order.service";
import { format } from "date-fns";
import { IoOpenOutline } from "react-icons/io5";

const CustomerOrder = ({customer_id}) => {
  const [orders, setOrders] = useState([]); // Initialize as an array
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  // const { customer_id } = useParams();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrdersByCustomerId(customer_id, token);
        setOrders(data.orderData); 
        console.log(orders)
        console.log(data.orderData)
        // Assuming data is an array of order objects
      } catch (error) {
        console.log("Fetch Orders Error:", error);
        setApiError(true);
        setApiErrorMessage(error.message);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token, customer_id]);

  console.log("Orders state:", orders);
  console.log(orders[0])
 

  return (
    <>
      {apiError ? (
        <section className='contact-section'>
          <div className='auto-container'>
            <div className='contact-title'>
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className='contact-section1'>
          <div className='auto-container'>
            <div className='wrapper-box'>
              <div className='left-column'>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <div key={order.order_id}>
                      <div>
                        <div> 
                        <span className='bold-text'>Vehicle :</span>
                           {order.vehicle_make}  {order.vehicle_model}</div>
                       
                        {/* <div>Vehicle Model: {order.vehicle_model}</div> */}
                        <div>
                        <span className='bold-text'>Completion Date:</span>
                        
                          {order.completion_date
                            ? format(new Date(order.completion_date), "MM-dd-yyyy")
                            : "Pending"}
                        </div>
                        <div>
                        <span className='bold-text'>Order Detail:</span>
                          
                          <Link to={`/admin/order/${order.order_id}`}>
                            <IoOpenOutline />
                          </Link>
                        </div>
                        
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No orders found</div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CustomerOrder;















