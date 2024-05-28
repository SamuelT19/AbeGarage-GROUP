import React from "react";
import { Routes, Route } from "react-router";
import Home from "./markup/pages/Home";
import Services from "./markup/pages/Services";
import About from "./markup/pages/About"
import Login from "./markup/pages/Login";
import Unauthorized from "./markup/pages/Unauthorized";

import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

import "./assets/styles/custom.css";

import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";

import EmployeeRouter from "./router/EmployeeRouter";
import CustomerRouter from "./router/CustomerRouter";
import OrderRouter from "./router/OrderRouter";
import ServiceRouter from "./router/ServiceRouter";
import OilChange from "./markup/pages/OilChange/OilChange";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/OilChange' element={<OilChange />} />
        <Route path='/' element={<Home />} />
        <Route path='/Services' element={<Services />} />
        <Route path='/About' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/admin/employee/*' element={<EmployeeRouter />} />
        <Route path='/admin/customer/*' element={<CustomerRouter />} />
        <Route path='/admin/order/*' element={<OrderRouter />} />
        <Route path='/admin/services/*' element={<ServiceRouter />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
