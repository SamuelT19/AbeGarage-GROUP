import React from 'react';
import AdditionalServices from '../components/AdditionalServices/AdditionalServices';
import OurExperience from '../components/OurExperience/OurExperience';
import OurServices from '../components/OurServices/OurServices';
import QualityService from '../components/QualityService/QualityService';
import WorkingSince from '../components/WorkingSince/WorkingSince';
import Appointment from '../components/Appointment/Appointment';
import Banner from '../components/Banner/Banner';

function Home(props) {
  return (
    <div>
        <Banner />
        <OurExperience />
        <OurServices />
        <QualityService/>
        <AdditionalServices />
        <WorkingSince />
        <Appointment />
    </div>
  );
}

export default Home;