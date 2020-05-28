const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

const defaultState = {
  firstName: '',
  lastName: '',
  token: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      const newState = { ...state };
      newState.firstName = action.firstName;
      newState.lastName = action.lastName;
      newState.token = action.token;
      return newState;
    }
    case LOGOUT_USER: {
      const newState = { ...defaultState };
      return newState;
    }
    default:
      return state;
  }
};
