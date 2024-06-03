import React from 'react';
import { Link } from 'react-router-dom';
// import image1 from "../../../pages/admin/adminpage/division_6186048.png";
function AdminDashboard() {
  return (
    <>
      <section className="services-section">
        <div className="auto-container">
          <div className="sec-title style-two">
            <h2>Admin Dashboard</h2>
            <div className="text">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution.
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>open for all</h5>
                <h2>All Orders</h2>
                <Link to="/admin/order/orders" className="read-more">
                  LIST OF ORDERS +
                </Link>
                <div className="icon">
                  <span className="flaticon-power"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>OPEN FOR LEADS</h5>
                <h2>New orders</h2>
                <Link to="/admin/order/new-order" className="read-more">
                  ADD ORDER +
                </Link>
                <div className="icon">
                  {/* <span>
                    <img
                      src={image1}
                      alt="Description of the image"
                      style={{ width: "100px", height: "auto" }}
                    />
                  </span> */}
                  <span className="flaticon-gearbox"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>OPEN FOR ADMINS</h5>
                <h2>Add Employees</h2>
                <Link to="/admin/employee/add-employee" className="read-more">
                  add employee+
                </Link>
                <div className="icon">
                  <span className="flaticon-car-engine"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>OPEN FOR ADMINS</h5>
                <h2>Employees</h2>
                <Link to="/admin/employee/employees" className="read-more">
                  list of employees +
                </Link>
                <div className="icon">
                  <span className="flaticon-brake-disc"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>OPEN FOR ADMIN</h5>
                <h2>Add Customers</h2>
                <Link to="/admin/customer/add-customer" className="read-more">
                  read more +
                </Link>
                <div className="icon">
                  <span className="flaticon-spray-gun"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>OPEN FOR EMOPLOYEE</h5>
                <h2>Customers</h2>
                <Link to="/admin/customer/customers" className="read-more">
                  CUSTOMERS LIST +
                </Link>
                <div className="icon">
                  <span className="flaticon-tire"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>OPEN FOR ADMIN</h5>
                <h2>Services</h2>
                <Link to="/admin/services/services" className="read-more">
                  LIST OF +
                </Link>
                <div className="icon">
                  <span className="flaticon-spray-gun"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;
