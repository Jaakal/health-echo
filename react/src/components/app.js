import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Redirect, Route, Switch, withRouter,
} from 'react-router-dom';

import '../css/app.css';

import Studio from '../containers/studio';
import SignUp from './signup';
import LogIn from './login';

const App = props => {
  const { token } = props;

  return (
    <div className="app">
      { token.length > 0 ? <Studio /> : <Redirect to="/login" />}
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
      </Switch>
    </div>
  );
};

App.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
});

export default withRouter(connect(mapStateToProps, null)(App));
