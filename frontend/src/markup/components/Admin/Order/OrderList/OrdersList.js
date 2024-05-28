import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { useAuth } from "../../../../../Contexts/AuthContext";
import Orderservice from "../../../../../services/order.service";
import { format } from "date-fns";
import OrderStatusLabel from "./OrderStatusLabel";

function OrdersList() {
  const [orderData, setOrderData] = useState([]);

  // Get logged-in employee token from the context
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Orderservice.getAllOrders(token);
        setOrderData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <>
      <section className='contact-section'>
        <div className='auto-container'>
          <div className='contact-title'>
            <h2>Orders</h2>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Order Date</th>
                <th>Received by</th>
                <th>Order status</th>
                <th>Edit/view</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order) => (
                <tr key={order.order.order_id}>
                  <td>{order.order.order_id}</td>
                  <td>
                    <span className='bold-text'>
                      {order.customer.customer_first_name}{" "}
                      {order.customer.customer_last_name}
                    </span>
                    <br />
                    {order.customer.customer_email}
                    <br />
                    {order.customer.customer_phone_number}
                  </td>
                  <td>
                    <span className='bold-text'>
                      {order.vehicle.vehicle_make} {order.vehicle.vehicle_model}
                    </span>
                    <br />
                    {order.vehicle.vehicle_year} <br />
                    {order.vehicle.vehicle_tag}
                  </td>
                  <td>
                    {format(
                      new Date(order.order.order_date),
                      "MM - dd - yyyy | kk:mm"
                    )}
                  </td>
                  <td>
                    {order.employee.employee_first_name}{" "}
                    {order.employee.employee_last_name}
                  </td>

                  <td className='align-middle center'>
                    <OrderStatusLabel statusCode={order.order.order_status} />
                  </td>

                  <td className='center align-middle'>
                    <Link
                      to={`/admin/order/edit/${order.order.order_id}`}
                      className='icon-link'>
                      <FaEdit />
                    </Link>
                    <Link
                      key={order.order.order_id}
                      to={`/admin/order/${order.order.order_id}/status/${order.order.order_status}`}>
                      <IoOpenOutline />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
}

export default OrdersList;
