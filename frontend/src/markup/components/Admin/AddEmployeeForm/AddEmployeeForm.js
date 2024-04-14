import React, { useState } from 'react';
// import employee.service.js 
import employeeService from '../../../../services/employee.service';
// Import the useAuth hook 
import { useAuth } from "../../../../Contexts/AuthContext";
import { useNavigate } from 'react-router';
import AddEditEmployee from "../AddEditemployee/AddEditEmployee";

function AddEmployeeForm(props) {
  const [employee_email, setEmail] = useState('');
  const [employee_first_name, setFirstName] = useState('');
  const [employee_last_name, setLastName] = useState('');
  const [employee_phone, setPhoneNumber] = useState('');
  const [employee_password, setPassword] = useState('');
  const [active_employee, setActive_employee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);
  // Errors 
  const [emailError, setEmailError] = useState('');
  const [firstNameRequired, setFirstNameRequired] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate()

  // Create a variable to hold the user's token
  let loggedInEmployeeToken = '';
  // Destructure the auth hook and get the token 
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations  
    let valid = true; // Flag 
    // First name is required 
    if (!employee_first_name) {
      setFirstNameRequired('First name is required');
      valid = false;
    } else {
      setFirstNameRequired('');
    }
    // Email is required
    if (!employee_email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!employee_email.includes('@')) {
      setEmailError('Invalid email format');
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError('Invalid email format');
        valid = false;
      } else {
        setEmailError('');
      }
    }
    // Password has to be at least 6 characters long
    if (!employee_password || employee_password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }
    // If the form is not valid, do not submit 
    if (!valid) {
      return;
    }
    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id
    };
    // Pass the form data to the service 
    const newEmployee = employeeService.createEmployee(formData, loggedInEmployeeToken);
    newEmployee.then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error)
        } else {
          // Handle successful response 
          setSuccess(true);
          setServerError('')
          // Redirect to the employees page after 2 seconds 
          // For now, just redirect to the home page 
          setTimeout(() => {
            navigate('/admin/employees')
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
  }


  return (
    <AddEditEmployee
      renderType="add"
      handleSubmit={handleSubmit}
      employee_email={employee_email}
      setEmail={setEmail}
      emailError={emailError}
      employee_first_name={employee_first_name}
      setFirstName={setFirstName}
      firstNameRequired={firstNameRequired}
      employee_last_name={employee_last_name}
      setLastName={setLastName}
      employee_phone={employee_phone}
      setPhoneNumber={setPhoneNumber}
      company_role_id={company_role_id}
      setCompany_role_id={setCompany_role_id}
      employee_password={employee_password}
      setPassword={setPassword}
      passwordError={passwordError}
      serverError={serverError}
    />
  );
}

export default AddEmployeeForm;