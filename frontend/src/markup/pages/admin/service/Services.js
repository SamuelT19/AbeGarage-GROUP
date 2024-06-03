import React from "react";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import ServiceList from "../../../components/Admin/Services/ServiceList/ServiceList";

function Services() {
  return (
    <>
      <div className='container-fluid admin-pages'>
        <div className='row'>
          <div className='col-md-3 admin-left-side'>
            <AdminMenu />
          </div>
          <div className='col-md-9 admin-right-side'>
            <ServiceList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
