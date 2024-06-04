import React, {useEffect, useState} from 'react'
import serviceService from "../../services/service.service";

function ReadMore() {

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
        <section className='service-section'>
              <div className='auto-container'>
                <div className='wrapper-box'>
                  <div className='left-column'>
                    {services.map((service) => (
                      <div
                        className='service-list'
                        key={service.service_id}
                        style={{ marginBottom: "5px" }}>
                        <div className='service-name1'>
                          <h2 className='Name'>{service.service_name}</h2>
                          <div>{service.service_description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
    </div>
  )
}

export default ReadMore