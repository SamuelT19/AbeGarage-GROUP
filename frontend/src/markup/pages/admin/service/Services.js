import React from "react";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import Services from "../../../components/Admin/Service/CommonServices/CommonServices";

function ServicesPage() {
  return (
    <>
      <div className='container-fluid admin-pages'>
        <div className='row'>
          <div className='col-md-3 admin-left-side'>
            <AdminMenu />
          </div>
          <div className='col-md-9 admin-right-side'>
            <Services />
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesPage;
