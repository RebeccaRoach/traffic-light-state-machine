import { Machine, interpret } from 'xstate';

const lightMachine = Machine({
  // Your state machine blueprint here
  id: "BeccaLightMachine",
  initial: "off",
  states: {
    off: {
      on: {
        changeLight: "GreenOn"
      }
    },
    GreenOn: {
      on: {
        changeLight: "YellowOn"
      }
    },
    YellowOn: {
      on: {
        changeLight: "RedOn"
      }
    },
    RedOn: {
      on: {
        changeLight: "GreenOn"
      }
    }
  }
});


const service = interpret(lightMachine);

export { lightMachine, service };