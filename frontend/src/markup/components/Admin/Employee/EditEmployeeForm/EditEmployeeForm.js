import React, { useEffect, useState } from "react";
import employeeService from "../../../../../services/employee.service";
import { useAuth } from "../../../../../Contexts/AuthContext";
import AddEditEmployee from "../AddEditemployee/AddEditEmployee";
import { useParams, useNavigate } from "react-router-dom";

function EditEmployeeForm(props) {
  const { employee_id } = useParams();
  const [employeeData, setEmployee] = useState({
    employee_id: Number(employee_id),
    employee_first_name: "",
    employee_last_name: "",
    employee_email: "",
    employee_phone: "",
    employee_password: "",
    company_role_id: 1,
    active_employee: 1,
  });

  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { employee } = useAuth();
  let token = "";
  if (employee && employee.employee_token) {
    token = employee.employee_token;
  }
  console.log(token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const editEmployee = employeeService.editEmployee(employeeData, token);

    editEmployee
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setServerError(data.error);
        } else {
          setSuccess(true);
          setServerError("");
          setTimeout(() => {
            navigate("/admin/employee/employees");
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
        const { data } = await employeeService.getEmployeeById(
          employee_id,
          token
        );
        const employee = data.employee;
        setEmployee((prev) => ({...prev,
          employee_first_name: employee.employee_first_name,
          employee_last_name: employee.employee_last_name,
          employee_email: employee.employee_email,
          employee_phone: employee.employee_phone,
          employee_password: employee.active_employee,
          company_role_id: employee.company_role_id,
          active_employee: employee.active_employee,
        }));

        console.log(data.employee);

        if (employeeData.active_employee === 1) {
          setIsChecked(true);
        } else {
          setIsChecked(false);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [employee_id]);

  return (
    <AddEditEmployee
      renderType="edit"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      employeeData={employeeData}
      setEmployee={setEmployee}
      passwordError={passwordError}
      serverError={serverError}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
    />
  );
}

export default EditEmployeeForm;
