import React from 'react'
import { Link } from 'react-router-dom'

function Appointment() {
  return (
    <div>
      <section className='cta-section'>
        <div className='auto-container'>
          <div className='wrapper-box'>
            <div className='left-column'>
              <h3>Schedule Your Appointment Today</h3>
              <div className='text'>
                Your Automotive Repair & Maintenance Service Specialist
              </div>
            </div>
            <div className='right-column'>
              <div className='phone'>+251713829204</div>
              <div className='btn'>
                <Link to='/Contact' className='theme-btn btn-style-one'>
                  <span>Appointment</span>
                  <i className='flaticon-right'></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Appointment