import React from "react";
import AddNewOrder from "../../../components/Admin/Order/AddNewOrder/AddNewOrder";
// Import the admin menu component
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";

function OrderCustomerDetailInfo() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
           <AddNewOrder/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCustomerDetailInfo;
