import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import { LOGIN } from '../utilities/constants';
import { logInUser } from '../actions/index';

import '../css/login.css';

const LogIn = props => {
  const [credentials, setCredentials] = useState(LOGIN);
  const { token, logInUser } = props;

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
      case 'password':
        setCredentials({ ...credentials, [name]: value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('user/login', { user: credentials })
      .then(response => {
        if (response.data.loggedIn) {
          logInUser(response.data);
        }
      })
      .catch(error => {});

    setCredentials(LOGIN);
  };

  const logInForm = (
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" onChange={handleChange} value={credentials.email} id="email" name="email" placeholder="Email" />
        <input type="password" onChange={handleChange} value={credentials.password} id="password" name="password" placeholder="Password" />

        <div className="buttons-wrapper">
          <button type="submit">Login</button>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );

  return (
    token.length > 0 ? <Redirect to="/" /> : logInForm
  );
};

LogIn.propTypes = {
  token: PropTypes.string.isRequired,
  logInUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
  logInUser: data => {
    dispatch(
      logInUser(data),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
