import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/images/10001.jpg";
import Appointment from "../components/Appointment/Appointment";

const Contact = () => {
  return (
    <>
      <section
        className='page-title'
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='auto-container'>
          <h2>Contact</h2>
          <ul className='page-breadcrumb'>
            <li>
              <Link to='/'>home</Link>
            </li>
            <li>Contact</li>
          </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
      </section>
      <section className='contact-section'>
        <div className='auto-container'>
          <div className='row clearfix'>
            {/* Map Column */}
            <div className='map-column col-lg-7'>
              <div className='inner-column'>
                <div className='contact-map' style={{ height: "470px" }}>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m17!1m8!1m3!1d2630.53892883073!2d38.771483490945734!3d8.939310972690448!3m2!1i1024!2i768!4f13.1!4m6!3e0!4m0!4m3!3m2!1d8.9387132478854!2d38.77130447501835!5e0!3m2!1sen!2set!4v1717637385595!5m2!1sen!2set'
                    width='600'
                    height='450'
                    style={{ border: 0 }}
                    allowfullscreen=''
                    loading='lazy'
                    referrerpolicy='no-referrer-when-downgrade'></iframe>
                </div>
              </div>
            </div>
            {/* Info Column */}
            <div className='info-column col-lg-5'>
              <div className='inner-column'>
                <h4>Our Address</h4>
                <div className='text'>
                  Completely synergize resource taxing relationships via premier
                  niche markets. Professionally cultivate one-to-one customer
                  service.
                </div>
                <ul>
                  <li>
                    <i className='flaticon-pin' />
                    <span>Address:</span> Akaki Kality, Addis Ababa, Ethiopia
                  </li>
                  <li>
                    <i className='flaticon-email' />
                    <span>Email:</span> g3autorepair@yahoo.com
                  </li>
                  <li>
                    <i className='flaticon-phone' />
                    <span>Phone:</span> +251713829204
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Contact Section */}
      <Appointment />
    </>
  );
};

export default Contact;
