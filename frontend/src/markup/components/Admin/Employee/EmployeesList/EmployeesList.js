// Import the necessary components
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

import { useAuth } from "../../../../../Contexts/AuthContext";
import { format } from "date-fns"; 
import employeeService from "../../../../../services/employee.service";

//import the icons
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import { MdNavigateNext } from "react-icons/md";
import { ImLast } from "react-icons/im";
import { ImFirst } from "react-icons/im";
import { GrFormPrevious } from "react-icons/gr";


// Create the EmployeesList component
const EmployeesList = () => {
  // Create all the states we need to store the data
  // Create the employees state to store the employees data
  const [employees, setEmployees] = useState([]);
  // A state to serve as a flag to show the error message
  const [apiError, setApiError] = useState(false);
  // A state to store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // To get the logged in employee token
const [query, setQuery] = useState("");
 const [currentPage, setCurrentPage] = useState(1);
 const recordsPerPage = 5;
 const lastIndex = currentPage * recordsPerPage;
 const firstIndex = lastIndex - recordsPerPage;
 const records = employees.slice(firstIndex, lastIndex);
 const npage = Math.ceil(employees.length / recordsPerPage);
 const numbers = [...Array(npage + 1).keys()].slice(1);
 const keys = [
   "employee_first_name",
   "employee_last_name",
   "employee_email",
   "employee_phone",
 ];


  const { employee } = useAuth();
  let token = null; // To store the token
  if (employee) {
    token = employee.employee_token;
  }
  console.log(token);

  useEffect(() => {
    // Call the getAllEmployees function
    const allEmployees = employeeService.getAllEmployees(token);
    allEmployees
      .then((res) => {
        if (!res.ok) {
          console.log(res.status);
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (res.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        return res.json();
      })
      .then((data) => {
        if (data.data.length !== 0) {
          setEmployees(data.data);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  // *Create a function to confirm the deletion of an employee
  const confirmDeleteEmployee = (employee) => {
    const { employee_first_name, employee_id } = employee;
    const isConfirmed = window.confirm(
      `Are you sure you want to delete employee "${employee_first_name}"?`
    );

    if (isConfirmed) {
      handleDeleteEmployee(employee_id, token);
    }
    console.log(employee_id);
  };
  // *End of function to confirm the deletion of an employee

  // *Create a function to handle the deletion of an employee
  const handleDeleteEmployee = async (employee_id, token) => {
    try {
      // Call the deleteEmployee function from your employeeService
      const status = await employeeService.deleteEmployee(employee_id, token);
      console.log(status);
      if (status) {
        console.log("Employee deleted successfully");
        const updatedEmployees = employees.filter(
          (employee) => employee.employee_id !== employee_id
        );

        setEmployees(updatedEmployees);
      }

      // Handle successful deletion, e.g., remove the employee from the UI
    } catch (error) {
      console.error("Error deleting employee:", error);
      // Handle error, e.g., show an error message
    }
  };
  // *End of function to handle the deletion of an employee


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
                <h2>Employees</h2>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search by first name, last name, email, or phone number"
                  className="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="table-responsive">
                <Table striped bordered hover table-responsive-sm>
                  <thead>
                    <tr>
                      <th>Active</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Added Date</th>
                      <th>Role</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records
                      .filter((employee) =>
                        keys.some((key) =>
                          employee[key]
                            .toLowerCase()
                            .includes(query.toLowerCase())
                        )
                      )
                      .map((employee) => (
                        <tr key={employee.employee_id}>
                          <td>{employee.active_employee ? "Yes" : "No"}</td>
                          <td>{employee.employee_first_name}</td>
                          <td>{employee.employee_last_name}</td>
                          <td>{employee.employee_email}</td>
                          <td>{employee.employee_phone}</td>
                          <td>
                            {format(
                              new Date(employee.added_date),
                              "MM - dd - yyyy | kk:mm"
                            )}
                          </td>
                          <td>{employee.company_role_name}</td>
                          <td>
                            {/* <div className='edit-delete-icons'>edit | delete</div> */}
                            <Link
                              to={`/admin/employee/edit-employee/${employee.employee_id}`}
                            >
                              <FaEdit
                                className="edit-icon"
                                style={{ cursor: "pointer" }}
                              />
                            </Link>
                            &nbsp; &nbsp;
                            {/* // *Delete icon and event listener  */}
                            <FaTrash
                              className="delete-icon"
                              style={{ cursor: "pointer" }}
                              onClick={() => confirmDeleteEmployee(employee)}
                            />
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

// Export the EmployeesList component
export default EmployeesList;
