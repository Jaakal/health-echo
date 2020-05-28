const SERVICES = 'SERVICES';
const APPOINTMENTS = 'APPOINTMENTS';
const CHANGE_NAVBAR_STATE = 'CHANGE_NAVBAR_STATE';

const defaultState = {
  activeComponent: SERVICES,
  navbarOpen: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SERVICES:
    case APPOINTMENTS: {
      const newState = { ...state };
      newState.activeComponent = action.type;
      return newState;
    }
    case CHANGE_NAVBAR_STATE: {
      const newState = { ...state };
      newState.navbarOpen = !state.navbarOpen;
      return newState;
    }
    default:
      return state;
  }
};
