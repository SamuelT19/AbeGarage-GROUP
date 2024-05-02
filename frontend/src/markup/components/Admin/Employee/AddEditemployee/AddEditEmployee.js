// EmployeeForm.js
import React, { useEffect } from "react";

function AddEditEmployee({
  renderType,
  handleSubmit,
  handleChange,
  employeeData,
  setEmployee,
  firstNameRequired,
  emailError,
  passwordError,
  serverError,
  isChecked,
  setIsChecked,
}) {
  useEffect(() => {
    if (isChecked === true) {
      setEmployee((prev) => ({ ...prev, active_employee: 1 }));
    } else if (isChecked === false) {
      setEmployee((prev) => ({ ...prev, active_employee: 2 }));
    }
  }, [isChecked]);

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            {renderType === "add" ? "Add a new employee" : "Edit employee data"}
          </h2>
          {renderType === "edit" && (
            <>
              <h4>
                Full Name: {employeeData.employee_first_name}{" "}
                {employeeData.employee_last_name}
              </h4>
            </>
          )}
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="employee_email"
                        id="email"
                        value={employeeData.employee_email}
                        onChange={handleChange}
                        placeholder="Employee email"
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>

                    {renderType === "add" && (
                      <>
                        <div className="form-group col-md-12">
                          <label htmlFor="first-name">First Name</label>
                          <input
                            type="text"
                            name="employee_first_name"
                            id="first-name"
                            value={employeeData.employee_first_name}
                            onChange={handleChange}
                            placeholder="Employee first name"
                          />
                          {firstNameRequired && (
                            <div className="validation-error" role="alert">
                              {firstNameRequired}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-md-12">
                          <label htmlFor="last-name">Last Name</label>
                          <input
                            type="text"
                            name="employee_last_name"
                            id="last-name"
                            value={employeeData.employee_last_name}
                            onChange={handleChange}
                            placeholder="Employee last name"
                            required
                          />
                        </div>
                      </>
                    )}

                    <div className="form-group col-md-12">
                      <label htmlFor="phone-number">Phone Number</label>
                      <input
                        type="text"
                        name="employee_phone"
                        id="phone-number"
                        value={employeeData.employee_phone}
                        onChange={handleChange}
                        placeholder="Employee phone (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <select
                        name="employee_role"
                        value={employeeData.company_role_id}
                        onChange={handleChange}
                        className="custom-select-box"
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>

                    <div className="form-group col-md-12">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="employee_password"
                        id="password"
                        value={employeeData.employee_password}
                        onChange={handleChange}
                        placeholder="Employee password"
                      />
                      {passwordError && (
                        <div className="validation-error" role="alert">
                          {passwordError}
                        </div>
                      )}
                    </div>
                    {renderType === "edit" && (
                      <>
                        <input
                          type="checkbox"
                          id="checkbox"
                          name="checkbox"
                          checked={isChecked}
                          onChange={(event) =>
                            setIsChecked(event.target.checked)
                          }
                        ></input>
                        <label htmlFor="checkbox"> is employee active</label>
                      </>
                    )}
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>
                          {renderType === "add"
                            ? "Add employee"
                            : "Edit employee"}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddEditEmployee;
