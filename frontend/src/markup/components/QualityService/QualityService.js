import React from 'react';
import Quality from "../../../assets/images/Quality.jpg"

function QualityService() {
  return (
    <div>
      <section className="features-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="inner-container">
                <h2>
                  Quality Service And <br /> Customer Satisfaction !!
                </h2>
                <div className="text">
                  We utilize the most recent diagnostic equipment to ensure your vehicle is fixed or serviced properly
                  and in a timely manner. We are a member of Professional Auto Service, a top-notch performance network,
                  where independent service facilities share common goals of being world-class automotive service centers.
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="image1">
                <img src={Quality} alt="Quality Service" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default QualityService;