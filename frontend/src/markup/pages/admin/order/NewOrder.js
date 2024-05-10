// NewOrder.js
import React from "react";
import CreateOrder from "../../../components/Admin/Order/CreateOrder/NewOrder";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";

const NewOrder = () => {
  return (
    <div className='container-fluid admin-pages'>
      <div className='row'>
        <div className='col-md-3 admin-left-side'>
          <AdminMenu />
        </div>
        <div className='col-md-9 admin-right-side'>
          <h1>Create a New Order _____</h1>
          <CreateOrder />
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
