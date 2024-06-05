import React, { useState } from "react";
import { useAuth } from "../../../../../Contexts/AuthContext";
import { useNavigate } from "react-router";
import employeeService from "../../../../../services/employee.service";
import AddEditEmployee from "../AddEditemployee/AddEditEmployee";

function AddEmployeeForm(props) {


  const [employeeData, setEmployee] = useState({
    employee_first_name: "",
    employee_last_name: "",
    employee_email: "",
    employee_phone: "",
    employee_password: "",
    company_role_id: 1,
    active_employee: 1,
  });


  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  // Create a variable to hold the user's token
  let token = "";
  // Destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    token = employee.employee_token;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations
    let valid = true; // Flag
    // First name is required
    if (!employeeData.employee_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }
    // Email is required
    if (!employeeData.employee_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!employeeData.employee_email.includes("@")) {
      setEmailError("Invalid email format");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employeeData.employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    // Password has to be at least 6 characters long
    if (
      !employeeData.employee_password ||
      employeeData.employee_password.length < 6
    ) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }
    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }

    // Pass the form data to the service
    const newEmployee = employeeService.createEmployee(employeeData, token);
    newEmployee
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error);
        } else {
          // Handle successful response
          setSuccess(true);
          setServerError("");
          // Redirect to the employees page after 2 seconds
          // For now, just redirect to the home page
          setTimeout(() => {
            navigate("/admin/employee/add-employee");
          }, 2000);
        }
      })
      // Handle Catch
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  };

  return (
    <AddEditEmployee
      renderType="add"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      employeeData={employeeData}
      setEmployee={setEmployee}
      emailError={emailError}
      firstNameRequired={firstNameRequired}
      passwordError={passwordError}
      serverError={serverError}
    />
  );
}

export default AddEmployeeForm;
