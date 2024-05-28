import React from 'react'
import OilChangeComponent from '../../components/OilChangeComponent'
import SparkPlugReplacement from '../../components/SparkPlugReplacement'
import FuelCapTightening from '../../components/FuelCapTightening'
import OxygenSensorReplacement from '../../components/OxygenSensorReplacement'
import BrakeWork from '../../components/BrakeWork'
import TireRepairsAndChanges from '../../components/TireRepairsAndChanges'
import TheIgnitionSystem from '../../components/TheIgnitionSystem'
import ProgrammingCameraSoftware from '../../components/ProgrammingCameraSoftware'
import MotorReplacement from '../../components/MotorReplacement'

function OilChange() {
  return (
    <div className='oil-change'>
        <OilChangeComponent />
        <SparkPlugReplacement />
        <FuelCapTightening />
        <OxygenSensorReplacement />
        <BrakeWork />
        <TireRepairsAndChanges />
        <TheIgnitionSystem />
        <ProgrammingCameraSoftware />
        <MotorReplacement />
    </div>
  )
}

export default OilChange