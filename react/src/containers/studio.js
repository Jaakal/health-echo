import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import NavBar from '../components/navbar';
import Services from './services';
import Appointments from '../components/appointments';

import { changeNavbarState } from '../actions/index';

import '../css/studio.css';

const Studio = props => {
  const { changeNavbarState } = props;

  const handleClick = event => {
    switch (event.target.id) {
      case 'navbar-opener':
        changeNavbarState();
        break;
      default:
        break;
    }
  };

  return (
    <div className="studio">
      <div role="button" id="navbar-opener" className="navbar-opener" onClick={handleClick} onKeyDown={() => undefined} tabIndex={0}>
        <div />
        <div />
      </div>
      <NavBar />
      <div className="filler" />
      <div className="app-wrapper">
        <Switch>
          <Route path="/appointments" component={Appointments} />
          <Route path="/" component={Services} />
        </Switch>
      </div>
      <div className="filler" />
    </div>
  );
};

Studio.propTypes = {
  changeNavbarState: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   user: state.user,
// });

const mapDispatchToProps = dispatch => ({
  changeNavbarState: () => {
    dispatch(
      changeNavbarState(),
    );
  },
});

export default connect(null, mapDispatchToProps)(Studio);
