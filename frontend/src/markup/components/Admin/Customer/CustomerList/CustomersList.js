import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { format } from "date-fns";
import customerService from "../../../../../services/customer.service";
import { useAuth } from "../../../../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { ImLast } from "react-icons/im";
import { ImFirst } from "react-icons/im";
import { GrFormPrevious } from "react-icons/gr";


const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = customers.slice(firstIndex, lastIndex);
  const npage = Math.ceil(customers.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const keys = [
    "customer_first_name",
    "customer_last_name",
    "customer_email",
    "customer_phone_number",
  ];
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await customerService.getAllCustomer(token);
        const data = response.data;
        if (data.data.length !== 0) {
          setCustomers(data.data);
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
    fetchCustomers();
  }, [token]);

  function firstPage() {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function lastPage() {
    if (currentPage !== npage) {
      setCurrentPage(npage);
    }
  }

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Customers</h2>
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
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Added Date</th>
                      <th>Active</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records
                      .filter((customer) =>
                        keys.some((key) =>
                          customer[key]
                            .toLowerCase()
                            .includes(query.toLowerCase())
                        )
                      )
                      .map((data, i) => (
                        <tr key={i}>
                          <td>{data.customer_id}</td>
                          <td>{data.customer_first_name}</td>
                          <td>{data.customer_last_name}</td>
                          <td>{data.customer_email}</td>
                          <td>{data.customer_phone_number}</td>
                          <td style={{ width: "200px" }}>
                            {data.customer_added_date &&
                              format(
                                new Date(data.customer_added_date),
                                "MM - dd - yyyy | kk:mm"
                              )}
                          </td>
                          <td>{data.active_customer_status ? "Yes" : "No"}</td>
                          <td>
                            <div className="edit-delete-icons">
                              <Link
                                to={`/admin/customer/edit/${data.customer_id}`}
                              >
                                <FaEdit />
                              </Link>

                              <Link
                                to={`/admin/customer/profile/${data.customer_id}`}
                              >
                                <IoOpenOutline />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
              <nav className="pagination justify-content-center">
                <ul className="pagination">
                  <li className="page-item">
                    <a
                      className="page-link first-page-button"
                      href="#"
                      tabIndex="-1"
                      aria-disabled="false"
                      onClick={firstPage}
                    >
                      <ImFirst /> First
                    </a>
                  </li>

                  <li className="page-item">
                    <a
                      className="page-link previous-page-button"
                      href="#"
                      tabIndex="-1"
                      aria-disabled="false"
                      onClick={prePage}
                    >
                      <GrFormPrevious /> Previous
                    </a>
                  </li>

                  <li className="page-item">
                    <a href="#" className="page-link" onClick={nextPage}>
                      <MdNavigateNext /> Next
                    </a>
                  </li>
                  <li className="page-item">
                    <a href="#" className="page-link" onClick={lastPage}>
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

export default CustomersList;
