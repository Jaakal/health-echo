const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

const SET_API_BASE_URL = 'SET_API_BASE_URL';
const UNSET_API_BASE_URL = 'UNSET_API_BASE_URL';

const SERVICES = 'SERVICES';
const APPOINTMENTS = 'APPOINTMENTS';
const CHANGE_NAVBAR_STATE = 'CHANGE_NAVBAR_STATE';

export const logInUser = data => ({
  type: LOGIN_USER,
  firstName: data.firstName,
  lastName: data.lastName,
  token: data.token,
});

export const logOutUser = () => ({
  type: LOGOUT_USER,
});

export const setUserApiBaseURL = url => ({
  type: SET_API_BASE_URL,
  url,
});

export const unsetUserApiBaseURL = () => ({
  type: UNSET_API_BASE_URL,
});

export const setServicesToActiveComponent = () => ({
  type: SERVICES,
});

export const setAppointmentsToActiveComponent = () => ({
  type: APPOINTMENTS,
});

export const changeNavbarState = () => ({
  type: CHANGE_NAVBAR_STATE,
});
