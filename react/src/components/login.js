import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import { logInUser } from '../actions/index';

import '../css/login.css';

const LogIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, logInUser } = props;

  const handleChange = event => {
    switch (event.target.id) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('user/login', { user: { email, password } })
      .then(response => {
        if (response.data.loggedIn) {
          logInUser(response.data);
        }
      })
      .catch(error => {});

    setEmail('');
    setPassword('');
  };

  const logInForm = (
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" onChange={handleChange} value={email} id="email" name="email" placeholder="Email" />
        <input type="password" onChange={handleChange} value={password} id="password" name="password" placeholder="Password" />

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
