import React from "react";
import OrderCustomerInfo from "../../../components/Admin/Order/OrderCustomerDetail/OrderCustomerInfo.js";
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
           <OrderCustomerInfo />
         </div>
       </div>
     </div>
   </div>
 );
}

export default OrderCustomerDetailInfo;
