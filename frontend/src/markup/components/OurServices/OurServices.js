import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import serviceService from "../../../services/service.service";

function OurServices() {
    const [services, setServices] = useState([]);
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
          try {
            const response = await serviceService.getAllServices();
            console.log(response);
    
            setServices(response.services);
            console.log(response.services);
            setApiError(false);
          } catch (error) {
            console.error("Error fetching services:", error);
            setApiError(true);
          }
        };
        fetchServices();
      }, []);
  return (
    <div>
      <section className="services-section">
        <div className="auto-container">
          <div className="sec-title style-two">
            <h2>Our Services</h2>
            <div className="text">
              Bring to the table win-win survival strategies to ensure proactive domination. At
              the end of the day, going forward, a new normal that has evolved from generation X is on the
              runway heading towards a streamlined cloud solution.
            </div>
          </div>
          <div className="row">
            {services.map((service) => (
              <div className="col-lg-4 service-block-one" key={service.service_id}>
                <div className="inner-box hvr-float-shadow">
                  <div className="service-name1">
                    <h2 className="Name1">{service.service_name}</h2>
                  </div>
                  <Link to="/ReadMore" className="read-more">read more +</Link>
                  <div className="icon"><span className="flaticon-power"></span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default OurServices