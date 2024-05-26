import React from "react";
import AllOrderList from "../../../components/Admin/Order/OrderList/AllOrderList";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";

function Orders() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AllOrderList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
