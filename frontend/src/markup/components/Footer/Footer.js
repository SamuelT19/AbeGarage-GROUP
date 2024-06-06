import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <footer className='main-footer'>
      <div className='upper-box'>
        <div className='auto-container'>
          <div className='row no-gutters'>
            <div className='footer-info-box col-md-4 col-sm-6 col-xs-12'>
              <div className='info-inner'>
                <div className='content'>
                  <div className='icon'>
                    <span className='flaticon-pin'></span>
                  </div>
                  <div className='text'>
                    Akaki Kality, <br /> Addis Ababa, Ethiopia
                  </div>
                </div>
              </div>
            </div>
            <div className='footer-info-box col-md-4 col-sm-6 col-xs-12'>
              <div className='info-inner'>
                <div className='content'>
                  <div className='icon'>
                    <span className='flaticon-email'></span>
                  </div>
                  <div className='text'>
                    Email us : <br />{" "}
                    <a href='mailto:contact.contact@autorex.com'>
                      Abegarage@yahoo.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className='footer-info-box col-md-4 col-sm-6 col-xs-12'>
              <div className='info-inner'>
                <div className='content'>
                  <div className='icon'>
                    <span className='flaticon-phone'></span>
                  </div>
                  <div className='text'>
                    Call us on : <br />
                    <strong>+251713829204</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='widgets-section'>
        <div className='auto-container'>
          <div className='widgets-inner-container'>
            <div className='row clearfix'>
              <div className='footer-column col-lg-8'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='widget widget_links footerLink'>
                      <h4 className='widget_title'>Usefull Links</h4>
                      <div className='widget-content '>
                        <ul className='list'>
                          <li>
                            <a href='/'>Home</a>
                          </li>
                          <li>
                            <a href='/about'>About Us</a>
                          </li>

                          <li>
                            <a href='/services'>Services</a>
                          </li>
                          <li>
                            <a href='/contact'>Contact Us</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-6'>
                    <div className='widget widget_links serviceLinks'>
                      <h4 className='widget_title '>
                        {/* <Link to='/services'> Our Services</Link> */}

                        <a a href='/services'>
                          {" "}
                          Our Services
                        </a>
                      </h4>
                      <div className='widget-content'>
                        <ul className='list flex-list footerli'>
                          <li>Oil change & Programming the camera software</li>
                          <li>Spark Plug replacement & The ignition system</li>
                          <li>
                            Fuel Cap tightening & Oxygen Sensor replacement
                          </li>
                          <li>Brake Work & Tire repairs and changes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='footer-column col-lg-4'>
                <div className='widget widget_newsletter '>
                  <h4 className='widget_title'>Newsletter</h4>
                  <div className='text'>Get latest updates and offers.</div>
                  <div className='newsletter-form'></div>
                  <ul className='social-links'>
                    <li>
                      <a href='#'>
                        <span className='fab fa-facebook-f'></span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='fab fa-linkedin-in'></span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='fab fa-twitter'></span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='fab fa-google-plus-g'></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='auto-container'>
        <div className='footer-bottom'>
          <div className='copyright-text'>
            © Copyright <a href='#'>Abe Garage</a> 2024 . All right reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
