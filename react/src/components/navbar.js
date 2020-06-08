import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';

import {
  logOutUser, changeNavbarState, unsetUserApiBaseURL, setAppointmentsToActiveComponent,
} from '../actions/index';

import '../css/navbar.css';

const SERVICES = 'SERVICES';
const APPOINTMENTS = 'APPOINTMENTS';

const NavBar = props => {
  const {
    firstName, lastName, token, activeComponent, navbarOpen, logOutUser,
    changeNavbarState, unsetUserApiBaseURL, setAppointmentsToActiveComponent,
  } = props;
  const history = useHistory();

  const handleLogOut = () => {
    axios.post('user/logout', { user: { token } })
      .then(response => {
        if (!response.data.loggedIn) {
          logOutUser();
          unsetUserApiBaseURL();
        }
      })
      .catch(error => {});
  };

  const handleClick = event => {
    switch (event.target.id) {
      case 'services-button':
        history.push('/');
        break;
      case 'appointment-button':
        setAppointmentsToActiveComponent();
        history.push('/appointments');
        break;
      case 'logout-button':
        handleLogOut();
        changeNavbarState();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (navbarOpen) {
      $('#navbar-opener').addClass('navbar-open');
      $('.navbar').addClass('animate-in');
    } else {
      $('#navbar-opener').removeClass('navbar-open');
      $('.navbar').removeClass('animate-in');
    }

    switch (activeComponent) {
      case SERVICES:
        $('.navbar-button').removeClass('active');
        $('#services-button').addClass('active');
        break;
      case APPOINTMENTS:
        $('.navbar-button').removeClass('active');
        $('#appointment-button').addClass('active');
        break;
      default:
        break;
    }
  }, [navbarOpen, activeComponent]);

  return (
    <div className="navbar">
      <div className="user-name">{`${firstName} ${lastName}`}</div>
      <div className="navbar-buttons">
        <button type="button" id="services-button" className="navbar-button" onClick={handleClick}>Services</button>
        <button type="button" id="appointment-button" className="navbar-button" onClick={handleClick}>Appointments</button>
        <button type="button" id="logout-button" className="navbar-button" onClick={handleClick}>Logout</button>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  navbarOpen: PropTypes.bool.isRequired,
  activeComponent: PropTypes.string.isRequired,
  logOutUser: PropTypes.func.isRequired,
  changeNavbarState: PropTypes.func.isRequired,
  unsetUserApiBaseURL: PropTypes.func.isRequired,
  setAppointmentsToActiveComponent: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  token: state.user.token,
  navbarOpen: state.component.navbarOpen,
  activeComponent: state.component.activeComponent,
});

const mapDispatchToProps = dispatch => ({
  logOutUser: () => {
    dispatch(
      logOutUser(),
    );
  },
  changeNavbarState: () => {
    dispatch(
      changeNavbarState(),
    );
  },
  unsetUserApiBaseURL: () => {
    dispatch(
      unsetUserApiBaseURL(),
    );
  },
  setAppointmentsToActiveComponent: () => {
    dispatch(
      setAppointmentsToActiveComponent(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
