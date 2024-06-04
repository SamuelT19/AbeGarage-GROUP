import React from 'react';
import { Link } from 'react-router-dom';
import OurServices from '../components/OurServices/OurServices';
import AdditionalServices from '../components/AdditionalServices/AdditionalServices';
import WorkingSince from '../components/WorkingSince/WorkingSince';
import Appointment from '../components/Appointment/Appointment';
import Image3 from "../../assets/images/image3.jpg"

function Services() {
  return (
    <div>
      <section className="page-title" style={{ backgroundImage: `url(${Image3})` }}>
        <div className="auto-container">
          <h2>Services</h2>
          <ul className="page-breadcrumb">
            <li><Link to="/">home</Link></li>
            <li>Services</li>
          </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
      </section>
      <OurServices />
      <AdditionalServices />
      <WorkingSince />
      <Appointment />
    </div>
  );
}

export default Services;