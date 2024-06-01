import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { format } from "date-fns";
import orderService from "../../../../../services/order.service";
import { useAuth } from "../../../../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { ImLast, ImFirst } from "react-icons/im";
import { GrFormPrevious } from "react-icons/gr";
import CustomStatusIcon from "./CustomStatusIcon";

const AllOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAllOrder(token);
        const data = response.data;
        console.log(data);
        if (data.length !== 0) {
          setOrders(data);
        }
      } catch (error) {
        console.log(error);
        setApiError(true);
        if (error.response && error.response.status === 401) {
          setApiErrorMessage("Please login again");
        } else if (error.response && error.response.status === 403) {
          setApiErrorMessage("You are not authorized to view this page");
        } else {
          setApiErrorMessage("Please try again later");
        }
      }
    };

    fetchOrders();
  }, [token]);

  const filteredOrders = orders.filter((order) =>
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
      {apiError ? (
        <section className="contact-section order-table">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section order-table">
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
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Order Date</th>
                    <th>Order Received By</th>
                    <th>Order Status</th>
                    <th>Edit/View</th>
                  </tr>
                </thead>
                <tbody>
                  {records.length > 0 ? (
                    records.map((data, i) => (
                      <tr key={i}>
                        <td>{data.order.order_id}</td>
                        <td>
                          <div>
                            {data.customer.customer_first_name}{" "}
                            {data.customer.customer_last_name}
                          </div>
                          <div>{data.customer.customer_email}</div>
                          <div>{data.customer.customer_phone_number}</div>
                        </td>

                        <td>
                          <div>{data.vehicle.vehicle_make}</div>
                          <div>{data.vehicle.vehicle_year}</div>
                          <div>{data.vehicle.vehicle_tag}</div>
                        </td>
                        <td>
                          {data.order.order_date &&
                            format(
                              new Date(data.order.order_date),
                              "MM-dd-yyyy | HH:mm"
                            )}
                        </td>
                        <td>
                          {data.employee.employee_first_name}{" "}
                          {data.employee.employee_last_name}
                        </td>
                        <td>
                          <CustomStatusIcon status={data.order.order_status} />
                        </td>

                        <td>
                          <div className="edit-delete-icons">
                            {data.order.order_status === "complete" ||
                            data.order.order_status === 3 ? (
                              <FaEdit style={{ color: "gray" }} />
                            ) : (
                              <Link
                                to={`/admin/order/edit/${data.order.order_id}`}
                              >
                                <FaEdit />
                              </Link>
                            )}
                            <Link to={`/admin/order/${data.order.order_id}`}>
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
      )}
    </>
  );
};

export default AllOrderList;
