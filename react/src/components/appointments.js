import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import { setAppointmentsToActiveComponent, logOutUser } from '../actions/index';

import '../css/appointments.css';

const Appointments = props => {
  const [appointments, setAppointments] = useState([]);
  const { token, setAppointmentsToActiveComponent } = props;

  const getAppointments = () => {
    axios.post('appointment/index', { user: { token } })
      .then(response => {
        if (response.data.loggedIn) {
          setAppointments(response.data.appointments);
        } else {
          logOutUser();
        }
      })
      .catch(error => {});
  };

  useEffect(() => {
    getAppointments();
    setAppointmentsToActiveComponent();
  }, []);

  let keyIndex = 0;

  return (
    <div className="appointments-wrapper">
      {appointments.map(appointment => (
        <div className="appointment" key={`appointment-${keyIndex += 1}`}>
          <div className="appointment-name">{appointment.name}</div>
          <div className="appointment-category">{appointment.category}</div>
          <div className="appointment-description">{appointment.description}</div>
          <div className="booking-info">
            <span className="booking-info-label">City:</span>
            {' '}
            {appointment.city}
          </div>
          <div className="booking-info">
            <span className="booking-info-label">Address:</span>
            {' '}
            {appointment.address}
          </div>
          <div className="booking-info">
            <span className="booking-info-label">Date:</span>
            {' '}
            {appointment.date}
          </div>
          <div className="booking-info">
            <span className="booking-info-label">Duration:</span>
            {' '}
            {appointment.duration}
          </div>
          <div className="booking-info">
            <span className="booking-info-label">Price:</span>
            {' '}
            {appointment.price}
          </div>
        </div>
      ))}
    </div>
  );
};

Appointments.propTypes = {
  token: PropTypes.string.isRequired,
  setAppointmentsToActiveComponent: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
  setAppointmentsToActiveComponent: () => {
    dispatch(
      setAppointmentsToActiveComponent(),
    );
  },
  logOutUser: () => {
    dispatch(
      logOutUser(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
