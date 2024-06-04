import React from 'react';
import { Link } from 'react-router-dom';
import vban1 from "../../../assets/images/vban1.jpg"
import vban2 from "../../../assets/images/vban2.jpg"

function OurExperience() {
  return (
    <div>
      <section className="about-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-5">
              <div className="image-box">
                <img src={vban1} alt="Experience Image 1" />
                <img src={vban2} alt="Experience Image 2" />
                <div className="year-experience" data-parallax='{"y": 30}'>
                  <strong>24</strong> years <br /> Experience
                </div>
              </div>
            </div>
            <div className="col-lg-7 pl-lg-5">
              <div className="sec-title">
                <h5>Welcome to Our Workshop</h5>
                <h2>We have 24 years of experience</h2>
                <div className="text">
                  <p>
                    Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User-generated content in real-time will have multiple touch points for offshoring.
                  </p>
                  <p>
                    Capitalize on low hanging fruit to identify a ballpark value-added activity to beta test. Override the digital divide with additional click through from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing.
                  </p>
                </div>
                <div className="link-btn mt-40">
                  <Link to="/About" className="theme-btn btn-style-one style-two">
                    <span>
                      About Us <i className="flaticon-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurExperience;