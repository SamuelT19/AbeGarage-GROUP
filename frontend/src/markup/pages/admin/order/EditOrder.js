import React from "react";
import EditOrderForm from "../../../components/Admin/Order/OrderEdit/EditOrderForm";

// Import the admin menu component
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";

function EditOrder() {
  return (
    <div>
      <div className='container-fluid admin-pages'>
        <div className='row'>
          <div className='col-md-3 admin-left-side'>
            <AdminMenu />
          </div>
          <div className='col-md-9 admin-right-side'>
            <EditOrderForm/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
