import axios from 'axios';

import { logOutUser } from '../actions/index';

export const getAllServices = (url, token) => {
  axios.defaults.baseURL = url;

  return axios.post('body_treatment/index', { user: { token } })
    .then(response => {
      if (response.data.loggedIn) {
        return response.data.services;
      }
      return logOutUser();
    })
    .catch(error => {});
};

export const insertAppointmentToDatabase = (url, user) => {
  axios.defaults.baseURL = url;

  return axios.post('appointment/create', {
    user,
  })
    .then(response => {
      if (response.data.loggedIn) {
        if (response.data.appointmentSet) {
          return true;
        }
      }
      return logOutUser();
    })
    .catch(error => {});
};

export const getAllTheAppointments = token => axios.post('appointment/index', { user: { token } })
  .then(response => {
    if (response.data.loggedIn) {
      return response.data.appointments;
    }
    return logOutUser();
  })
  .catch(error => {});
