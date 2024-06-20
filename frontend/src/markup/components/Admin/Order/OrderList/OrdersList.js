import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { useAuth } from "../../../../../Contexts/AuthContext";
import Orderservice from "../../../../../services/order.service";
import { format } from "date-fns";

import { MdNavigateNext } from "react-icons/md";
import { ImLast, ImFirst } from "react-icons/im";
import { GrFormPrevious } from "react-icons/gr";
// import OrderStatusLabel from "./OrderStatusLabel";
import {
  getStatusClass,
  orderStatusLabels,
} from "../../../../../util/statusUtils";

function OrdersList() {
  const [orderData, setOrderData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

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

  const filteredOrders = orderData.filter((order) =>
    [
      order.customer.customer_first_name,
      order.customer.customer_last_name,
      order.customer.customer_email,
      order.customer.customer_phone_number,
    ].some((field) =>
      field?.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  const records = filteredOrders.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const npage = Math.ceil(filteredOrders.length / recordsPerPage);

  const firstPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const lastPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(npage);
    }
  };

  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Orders</h2>
            <div>
              <input
                type="text"
                placeholder="Search by first name, last name, email, or phone number"
                className="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
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
                {records.length > 0 ? (
                  records.map((order) => (
                    <tr key={order.order.order_id}>
                      <td>{order.order.order_id}</td>
                      <td>
                        <span className="bold-text">
                          {order.customer.customer_first_name}{" "}
                          {order.customer.customer_last_name}
                        </span>
                        <br />
                        {order.customer.customer_email}
                        <br />
                        {order.customer.customer_phone_number}
                      </td>
                      <td>
                        <span className="bold-text">
                          {order.vehicle.vehicle_make}{" "}
                          {order.vehicle.vehicle_model}
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

                      <td className="align-middle center">
                        {/* <OrderStatusLabel statusCode={order.order.order_status} /> */}
                        <span
                          className={`status-label ${getStatusClass(
                            order.order.order_status
                          )}`}
                        >
                          {orderStatusLabels[order.order.order_status]}
                        </span>
                      </td>

                      <td className="center align-middle">
                        <div className="edit-delete-icons">
                          {order.order.order_status === "complete" ||
                          order.order.order_status === 3 ? (
                            <FaEdit style={{ color: "gray" }} />
                          ) : (
                            <Link
                              to={`/admin/order/edit/${order.order.order_id}`}
                              className="icon-link"
                            >
                              <FaEdit />
                            </Link>
                          )}
                          <Link
                            key={order.order.order_id}
                            to={`/admin/order/${order.order.order_id}`}
                          >
                            <IoOpenOutline />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <nav className="pagination justify-content-center">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" onClick={firstPage}>
                  <ImFirst /> First
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" onClick={prePage}>
                  <GrFormPrevious /> Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" onClick={nextPage}>
                  <MdNavigateNext /> Next
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" onClick={lastPage}>
                  <ImLast /> Last
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}

export default OrdersList;
