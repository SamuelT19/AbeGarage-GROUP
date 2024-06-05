import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/images/10001.jpg';

const Contact = () => {
  return (
    <>
      <section className="page-title" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="auto-container">
          <h2>Contact</h2>
          <ul className="page-breadcrumb">
            <li><Link to="/">home</Link></li>
            <li>Contact</li>
          </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
      </section>
      <section className="contact-section">
        <div className="auto-container">
          <div className="row clearfix">
            {/* Map Column */}
            <div className="map-column col-lg-7">
              <div className="inner-column">
                <div className="contact-map" style={{ height: '470px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.9537353153161!3d-37.816279979751824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727d7b7b7b7b7b!2sLos%20Angeles!5e0!3m2!1sen!2sus!4v1622821827927!5m2!1sen!2sus"
                    width="100%"
                    height="470"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Map"
                  ></iframe>
                </div>
              </div>
            </div>
            {/* Info Column */}
            <div className="info-column col-lg-5">
              <div className="inner-column">
                <h4>Our Address</h4>
                <div className="text">
                  Completely synergize resource taxing relationships via premier niche markets.
                  Professionally cultivate one-to-one customer service.
                </div>
                <ul>
                  <li>
                    <i className="flaticon-pin" />
                    <span>Address:</span> 54B, Tailstoi Town 5238 MT, La city, IA 5224
                  </li>
                  <li>
                    <i className="flaticon-email" />
                    <span>Email:</span> contact@buildtruck.com
                  </li>
                  <li>
                    <i className="flaticon-phone" />
                    <span>Phone:</span> 1800 456 7890 / 1254 897 3654
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Contact Section */}
      <div className="schedule-appointment" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="auto-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: 'red', color: 'white' }}>
          <div className="left-column" style={{ flex: 1, textAlign: 'left' }}>
            <h3>Schedule Your Appointment Today</h3>
            <div className="text" style={{ fontSize: '14px', color: 'white' }}>Your Automotive Repair & Maintenance Service Specialist</div>
          </div>
          <div className="right-column" style={{ flex: 1, textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div className="phone" style={{ fontSize: '20px', marginRight: '10px' }}>1800.456.7890</div>
            <div className="btn">
              <a href="#" className="theme-btn btn-style-one" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: 'white', color: 'black', textDecoration: 'none', borderRadius: '5px' }}>
                <span>Contact Us</span><i className="flaticon-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
