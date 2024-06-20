import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";

import customerService from "../../../../../services/customer.service";
import { useAuth } from "../../../../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { GiClick } from "react-icons/gi";
import AddCustomerForm from "../../Customer/AddCustomers/AddCustomerForm";


const OrderCustomersListForm = () => {
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const navigate = useNavigate();

  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }
  console.log(token);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await customerService.getAllCustomer(token);
        const data = response.data;

        console.log(data);
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

  const toggleAddCustomerForm = () => {
    navigate("/admin/customer/add-customer");
  };

  const closeAddCustomerForm = () => {
    setShowAddCustomerForm(false);
  };

  const filteredCustomers = customers.filter((customer) =>
    [
      "customer_first_name",
      "customer_last_name",
      "customer_email",
      "customer_phone_number",
    ].some((key) => customer[key].toLowerCase().includes(query.toLowerCase()))
  );

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery === "") {
      setCustomers([]);
      // set it back to customers
     setCustomers(customers);
    }
  };

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
                <h2>Create a new order</h2>
                <div>
                  <input
                    type="text"
                    placeholder="Search by first name, last name, email, or phone number"
                    className="search"
                    value={query}
                    onChange={handleSearch}
                  />
                </div>
              </div>

              {query !== "" && filteredCustomers.length > 0 ? (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Click</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((data, i) => (
                        <tr key={i}>
                          <td>{data.customer_first_name}</td>
                          <td>{data.customer_last_name}</td>
                          <td>{data.customer_email}</td>
                          <td>{data.customer_phone_number}</td>
                          <td>
                            <div className="edit-delete-icons">
                              <Link
                                to={`/admin/order/new-order/customer/${data.customer_id}`}
                              >
                                <GiClick />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <>
                  {query !== "" && <div>No search results found.</div>}
                  <div className="form-group col-md-12">
                    <Button
                      className="theme-btn btn-style-one"
                      onClick={toggleAddCustomerForm}
                    >
                      Add Customer
                    </Button>
                  </div>
                </>
              )}

              {showAddCustomerForm && (
                <div>
                  <AddCustomerForm onClose={closeAddCustomerForm} />
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default OrderCustomersListForm;
