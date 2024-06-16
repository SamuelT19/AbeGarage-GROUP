import React from "react";
import { Link } from "react-router-dom";

function AdminMenu(props) {
  return (
    <div className="admin-position">
      
      <div className='admin-menu'>
        <h2>Admin Menu</h2>
      </div>
      <div className='list-group'>
        <Link to={"/admin"} className='list-group-item'>
          Dashboard
        </Link>
        <Link to={"/admin/order/orders"} className='list-group-item'>
          Orders
        </Link>
        <Link to={"/admin/order/new-order"} className='list-group-item'>
          New order
        </Link>
        <Link to={"/admin/employee/add-employee"} className='list-group-item'>
          Add employee
        </Link>
        <Link to={"/admin/employee/employees"} className='list-group-item'>
          Employees
        </Link>
        <Link to={"/admin/customer/add-customer"} className='list-group-item'>
          Add customer
        </Link>
        <Link to={"/admin/customer/customers"} className='list-group-item'>
          Customers
        </Link>
        <Link to={"/admin/services/services"} className='list-group-item'>
          Services
        </Link>
      </div>
    </div>
  );
}

export default AdminMenu;
