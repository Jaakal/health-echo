import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import { logInUser } from '../actions/index';

import '../css/signup.css';

const SignUp = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { token, logInUser } = props;

  const handleChange = event => {
    switch (event.target.id) {
      case 'first-name':
        setFirstName(event.target.value);
        break;
      case 'last-name':
        setLastName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'password-confirmation':
        setPasswordConfirmation(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (password === passwordConfirmation) {
      axios.post('user/create', {
        user: {
          firstname: firstName,
          lastname: lastName,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      })
        .then(response => {
          if (response.data.loggedIn) {
            logInUser(response.data);
          }
        })
        .catch(error => {});

      setFirstName('');
      setLastName('');
      setEmail('');
    }

    setPassword('');
    setPasswordConfirmation('');
  };

  const signUpForm = (
    <div className="signup-form-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="first-name" onChange={handleChange} value={firstName} id="first-name" name="first-name" required="required" maxLength="20" placeholder="First Name" />
        <input type="last-name" onChange={handleChange} value={lastName} id="last-name" name="last-name" required="required" maxLength="30" placeholder="Last Name" />
        <input type="email" onChange={handleChange} value={email} id="email" name="email" required="required" maxLength="255" placeholder="Email" />
        <input type="password" onChange={handleChange} value={password} id="password" name="password" required="required" minLength="6" placeholder="Password" />
        <input type="password" onChange={handleChange} value={passwordConfirmation} id="password-confirmation" name="password-confirmation" required="required" minLength="6" placeholder="Confirm Password" />

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
