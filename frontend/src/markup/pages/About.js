import React from 'react';
import { Link } from 'react-router-dom';
import OurExperience from '../components/OurExperiance/OurExperiance';
import AdditionalServices from '../components/AdditionalServices/AdditionalServices';
import WorkingSince from '../components/WorkingSince/WorkingSince';
import Appointment from '../components/Appointment/Appointment';
import Leader from "../../assets/images/Leaders.jpg";
import Image2 from "../../assets/images/image2.jpg";

function About() {
  return (
    <div>
      <section className="page-title" style={{ backgroundImage: `url(${Image2})` }}>
        <div className="auto-container">
          <h2>About us</h2>
          <ul className="page-breadcrumb">
            <li><Link to="/">home</Link></li>
            <li>About us</li>
          </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
      </section>
      <section className="about-section-three">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-7">
              <div className="content">
                <h2>We are highly skilled mechanics <br /> for your car repair</h2>
                <div className="text">
                  <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touch points for offshoring.</p>
                  <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional click through from DevOps. Nanotechnology immersion along the information heading towards a streamlined cloud solution. User generated content in real-time will have multiple.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="imageI"><img src={Leader} alt="" /></div>
            </div>
          </div>
        </div>
      </section>
      <OurExperience />
      <AdditionalServices />
      <WorkingSince />
      <Appointment />
    </div>
  );
}

export default About;