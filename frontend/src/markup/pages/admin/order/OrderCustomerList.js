import React from "react";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";

// Import the admin menu component
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";


import OrderCustomersListForm from "../../../components/Admin/Order/OrderCustomerList/OrderCustomersListForm";
function OrderCustomerList() {

  return (    
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
              <AdminMenu/>
              </div>
              <div className="col-md-9 admin-right-side">
                <OrderCustomersListForm />
              </div>
            </div>
          </div>
        </div>
      );
}

export default OrderCustomerList;
