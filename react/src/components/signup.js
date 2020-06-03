import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import { USER } from '../utilities/constants';
import { logInUser } from '../actions/index';

import '../css/signup.css';

const SignUp = props => {
  const [user, setUser] = useState(USER);
  const { token, logInUser } = props;

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  /* eslint-disable camelcase */
  const handleSubmit = event => {
    event.preventDefault();
    const { password, password_confirmation } = user;

    if (password === password_confirmation) {
      axios.post('user/create', {
        user,
      })
        .then(response => {
          if (response.data.loggedIn) {
            logInUser(response.data);
          }
        })
        .catch(error => {});

      setUser(USER);
    }

    setUser({ ...user, password: '', password_confirmation: '' });
  };
  /* eslint-enable camelcase */

  const signUpForm = (
    <div className="signup-form-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="first-name" onChange={handleChange} value={user.firstName} id="first-name" name="firstname" required="required" maxLength="20" placeholder="First Name" />
        <input type="last-name" onChange={handleChange} value={user.lastName} id="last-name" name="lastname" required="required" maxLength="30" placeholder="Last Name" />
        <input type="email" onChange={handleChange} value={user.email} id="email" name="email" required="required" maxLength="255" placeholder="Email" />
        <input type="password" onChange={handleChange} value={user.password} id="password" name="password" required="required" minLength="6" placeholder="Password" />
        <input type="password" onChange={handleChange} value={user.passwordConfirmation} id="password-confirmation" name="password_confirmation" required="required" minLength="6" placeholder="Confirm Password" />

        <div className="buttons-wrapper">
          <button type="submit">Sign Up</button>
          <Link to="/login">Back to login</Link>
        </div>
      </form>
    </div>
  );

  return (
    token ? <Redirect to="/" /> : signUpForm
  );
};

SignUp.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
