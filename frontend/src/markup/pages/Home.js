import React from 'react';
import Banner from "../components/Banner/Banner";
import OurExperience from "../components/OurExperiance/OurExperiance";
import OurServices from "../components/OurServices/OurServices";
import QualityService from "../components/QualityService/QualityService";
import AdditionalServices from "../components/AdditionalServices/AdditionalServices";
import WorkingSince from "../components/WorkingSince/WorkingSince";
import Appointment from "../components/Appointment/Appointment";

function Home(props) {
  return (
    <div>
      <Banner />
      <OurExperience />
      <OurServices />
      <QualityService />
      <AdditionalServices />
      <WorkingSince />
      <Appointment />
    </div>
  );
}

export default Home;