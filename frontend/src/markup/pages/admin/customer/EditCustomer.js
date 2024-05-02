import React from "react";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";


function EditCustomer(props) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <h1>Edit customer</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCustomer;
