import React from "react";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import OrdersList from "../../../components/Admin/Order/OrdersList/OrdersList";
const Orders = () => {
  return (
    <>
      <div className='container-fluid admin-pages'>
        <div className='row'>
          <div className='col-md-3 admin-left-side'>
            <AdminMenu />
          </div>
          <div className='col-md-9 admin-right-side'>
            <OrdersList />
          </div>
        </div>
      </div>
    </>
    <>
      <div className='container-fluid admin-pages'>
        <div className='row'>
          <div className='col-md-3 admin-left-side'>
            <AdminMenu />
          </div>
          <div className='col-md-9 admin-right-side'>
            <OrdersList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;

};

export default Orders;
