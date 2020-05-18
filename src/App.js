import React, { useState, useEffect } from 'react';
import TrafficLight from './components/TrafficLight';
import { service } from './state-machines/LightMachine';
import './App.css';

// Constants to use when changing the light
const RED_LIGHT = {
  RedOn: true,
  YellowOn: false,
  GreenOn: false,
}

const YELLOW_LIGHT = {
  RedOn: false,
  YellowOn: true,
  GreenOn: false,
}

const GREEN_LIGHT = {
  RedOn: false,
  YellowOn: false,
  GreenOn: true,
}


const App = () => {
  // Initially the light is Green
  const [lightStatus, setLightStatus] = useState({
    RedOn: false,
    YellowOn: false,
    GreenOn: true,
  });

  // Run once to setup the state machine
  useEffect(() => {
    service.start();

    service.onTransition(state => {
      console.log(state);
      // Your code here to change lightStatus when the 
      //   state of the state machine changes

      switch (state.value) {
        case "off":
          setLightStatus({
            RedOn: false,
            YellowOn: false,
            GreenOn: false,
          });
          break;
        case "GreenOn":
          setLightStatus({
            RedOn: false,
            YellowOn: false,
            GreenOn: true,
          });
          break;
        case "YellowOn":
          setLightStatus({
            RedOn: false,
            YellowOn: true,
            GreenOn: false,
          });
          break;
        case "RedOn":
          setLightStatus({
            RedOn: true,
            YellowOn: false,
            GreenOn: false,
          });
          break;
        default: 
          console.log("Invalid state for light machine");
      }
    });
  }, [])

  const changeLight = () => {
    console.log('changing');
    service.send('changeLight');
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <div>
          <TrafficLight {...lightStatus} />
        </div>
        <div>
          <button onClick={changeLight}>Change</button>
        </div>
      </main>
    </div>
  );
}

export default App;
