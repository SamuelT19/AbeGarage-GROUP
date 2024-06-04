import React from 'react';
import BackgroundImage from "../../../assets/images/banner/banner.jpg"

function Banner() {
  return (
    <div>
      <section className="video-section">
        <div
          data-parallax='{"y": 50}'
          className="sec-bg"
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        ></div>
        <div className="auto-container">
          <h5>Working since 1992</h5>
          <h2>
            Tuneup Your Car <br /> to Next Level
          </h2>
          <div className="video-box">
            <div className="video-btn">
              <a href="/" className="overlay-link lightbox-image video-fancybox ripple">
                <i className="flaticon-play"></i>
              </a>
            </div>
            <div className="text">
              Watch intro video <br /> about us
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;