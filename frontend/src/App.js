import React from "react";
import { Routes, Route } from "react-router";
import Home from "./markup/pages/Home";
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


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route path="/admin/employee/*" element={<EmployeeRouter />} />
        <Route path="/admin/customer/*" element={<CustomerRouter />} />
        <Route path="/admin/order/*" element={<OrderRouter />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
