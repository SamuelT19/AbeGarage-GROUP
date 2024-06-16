import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <footer className="main-footer">
      <div className="upper-box">
        <div className="auto-container">
          <div className="row no-gutters justify-content-center">
            {" "}
            {/* Center align content */}
            <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
              <div className="info-inner">
                <div className="content">
                  <div className="icon">
                    <span className="flaticon-pin"></span>
                  </div>
                  <div className="text">
                    Akaki Kality, <br /> Addis Ababa, Ethiopia
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
              <div className="info-inner">
                <div className="content">
                  <div className="icon">
                    <span className="flaticon-email"></span>
                  </div>
                  <div className="text">
                    Email us : <br />{" "}
                    <Link to="mailto:contact.contact@autorex.com">
                      g3autorepair@yahoo.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
              <div className="info-inner">
                <div className="content">
                  <div className="icon">
                    <span className="flaticon-phone"></span>
                  </div>
                  <div className="text">
                    Call us on : <br />
                    <strong>+251713829204</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="widgets-section">
        <div className="auto-container">
          <div className="widgets-inner-container">
            <div className="row clearfix">
              <div className="footer-column col-lg-8">
                <div className="row">
                  <div className="col-md-6">
                    <div className="widget widget_links footerLink widget_newsletter">
                      <h4 className="widget_title">Useful Links</h4>
                      <div className="widget-content ">
                        <ul className="list">
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>
                            <Link to="/about">About Us</Link>
                          </li>
                          <li>
                            <Link to="/services">Services</Link>
                          </li>
                          <li>
                            <Link to="/contact">Contact Us</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="widget widget_links serviceLinks  widget_newsletter">
                      <h4 className="widget_title ">Our Services</h4>
                      <div className="widget-content">
                        <ul className="list flex-list footerli">
                          <Link to="/services">
                            {" "}
                            <li>
                              Oil change & Programming the camera software
                            </li>
                          </Link>
                          <Link to="/services">
                            <li>
                              Spark Plug replacement & The ignition system
                            </li>
                          </Link>
                          <Link to="/services">
                            <li>
                              Fuel Cap tightening & Oxygen Sensor replacement
                            </li>
                          </Link>
                          <Link to="/services">
                            <li>Brake Work & Tire repairs and changes</li>
                          </Link>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-column col-lg-4">
                <div className="widget widget_newsletter ">
                  <h4 className="widget_title">Newsletter</h4>
                  <div className="text">Get latest updates and offers.</div>
                  <div className="newsletter-form"></div>
                  <ul className="social-links">
                    <li>
                      <Link to="#">
                        <span className="fab fa-facebook-f"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <span className="fab fa-linkedin-in"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <span className="fab fa-twitter"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <span className="fab fa-google-plus-g"></span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="auto-container">
        <div className="footer-bottom">
          <div className="copyright-text">
            © Copyright <Link to="#">G3 Auto Repair</Link> 2024 . All right
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
