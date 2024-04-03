import React, { useEffect, useState } from "react";
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import AddEditEmployee from "../AddEditemployee/AddEditEmployee";
import { useParams, useNavigate } from "react-router-dom";

function EditEmployeeForm(props) {
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee, setActive_employee] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [company_role_id, setCompany_role_id] = useState(1);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const { employee_id } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();
  let token = "";
  if (employee && employee.employee_token) {
    token = employee.employee_token;
  }
  console.log(token)

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      employee_id,
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    };

    const editEmployee = employeeService.editEmployee(
      formData,
      token
    );

    editEmployee
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setServerError(data.error);
        } else {
          setSuccess(true);
          setServerError("");
          setTimeout(() => {
            navigate("/admin/employees");
          }, 2000);
        }
      })
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await employeeService.getEmployeeById(employee_id,token);
        const employee = data.employee;
        setEmail(employee.employee_email);
        setFirstName(employee.employee_first_name);
        setLastName(employee.employee_last_name);
        setPhoneNumber(employee.employee_phone);
        setActive_employee(employee.active_employee);
        setCompany_role_id(employee.company_role_id);
        console.log(data.employee);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [employee_id]);
  useEffect(() => {
    if (active_employee === 1) {
      setIsChecked(true);
    } else if (active_employee === 2) {
      setIsChecked(false);
    }
  }, [active_employee]);
  console.log(isChecked);
  return (
    <AddEditEmployee
      renderType="edit"
      handleSubmit={handleSubmit}
      employee_email={employee_email}
      setEmail={setEmail}
      emailError={emailError}
      employee_first_name={employee_first_name}
      employee_last_name={employee_last_name}
      employee_phone={employee_phone}
      setPhoneNumber={setPhoneNumber}
      company_role_id={company_role_id}
      setCompany_role_id={setCompany_role_id}
      employee_password={employee_password}
      setPassword={setPassword}
      passwordError={passwordError}
      serverError={serverError}
      setActive_employee={setActive_employee}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
    />
  );
}

export default EditEmployeeForm;