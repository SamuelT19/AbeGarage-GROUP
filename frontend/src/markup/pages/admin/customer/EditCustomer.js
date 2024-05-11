import React from "react";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CustomerEditForm from "../../../components/Admin/Customer/CustomerEdit/CustomerEditForm";


function EditCustomer() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerEditForm/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCustomer;
