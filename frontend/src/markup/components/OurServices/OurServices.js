import React from 'react'
import { Link } from 'react-router-dom'

function OurServices() {
  return (
    <div>
         <section className="services-section">
            <div className="auto-container">
                <div className="sec-title style-two">
                    <h2>Our Services</h2>
                    <div className="text">Bring to the table win-win survival strategies to ensure proactive domination. At
                        the end of the day, going forward, a new normal that has evolved from generation X is on the
                        runway heading towards a streamlined cloud solution. </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 service-block-one">
                        <div className="inner-box hvr-float-shadow">
                            <h5>Service and Repairs</h5>
                            <h2>Performance Upgrade</h2>
                            <Link to="#" className="read-more">read more +</Link>
                            <div className="icon"><span className="flaticon-power"></span></div>
                        </div>
                    </div>
                    <div className="col-lg-4 service-block-one">
                        <div className="inner-box hvr-float-shadow">
                            <h5>Service and Repairs</h5>
                            <h2>Transmission Services</h2>
                            <Link to="#" className="read-more">read more +</Link>
                            <div className="icon"><span className="flaticon-gearbox"></span></div>
                        </div>
                    </div>
                    <div className="col-lg-4 service-block-one">
                        <div className="inner-box hvr-float-shadow">
                            <h5>Service and Repairs</h5>
                            <h2>Break Repair & Service</h2>
                            <Link to="#" className="read-more">read more +</Link>
                            <div className="icon"><span className="flaticon-brake-disc"></span></div>
                        </div>
                    </div>
                    <div className="col-lg-4 service-block-one">
                        <div className="inner-box hvr-float-shadow">
                            <h5>Service and Repairs</h5>
                            <h2>Engine Service & Repair</h2>
                            <Link to="#" className="read-more">read more +</Link>
                            <div className="icon"><span className="flaticon-car-engine"></span></div>
                        </div>
                    </div>
                    <div className="col-lg-4 service-block-one">
                        <div className="inner-box hvr-float-shadow">
                            <h5>Service and Repairs</h5>
                            <h2>Tyre & Wheels</h2>
                            <Link to="#" className="read-more">read more +</Link>
                            <div className="icon"><span className="flaticon-tire"></span></div>
                        </div>
                    </div>
                    <div className="col-lg-4 service-block-one">
                        <div className="inner-box hvr-float-shadow">
                            <h5>Service and Repairs</h5>
                            <h2>Denting & Painting</h2>
                            <Link to="#" className="read-more">read more +</Link>
                            <div className="icon"><span className="flaticon-spray-gun"></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default OurServices