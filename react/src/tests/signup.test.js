import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import SignUp from '../components/signup';

const mockStore = configureStore([]);

describe('Signup', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      user: {
        firstName: '',
        lastName: '',
        token: '',
      },
    });

    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render the signup form with Sign Up button', () => {
    const { getByText } = component;
    const element = getByText(/Sign Up/i);
    expect(element).toBeInTheDocument();
  });

  it('should render the signup form with login button', () => {
    const { getByText } = component;
    const element = getByText(/Back to Login/i);
    expect(element).toBeInTheDocument();
  });

  it('should render the signup form with email input', () => {
    const { getByPlaceholderText } = component;
    const element = getByPlaceholderText(/First Name/i);
    expect(element).toBeInTheDocument();
  });

  it('should render the signup form with email input', () => {
    const { getByPlaceholderText } = component;
    const element = getByPlaceholderText(/Last Name/i);
    expect(element).toBeInTheDocument();
  });

  it('should render the signup form with email input', () => {
    const { getByPlaceholderText } = component;
    const element = getByPlaceholderText(/Email/i);
    expect(element).toBeInTheDocument();
  });

  it('should render the signup form with password input', () => {
    const { getAllByPlaceholderText } = component;
    const elements = getAllByPlaceholderText(/Password/i);
    expect(elements.length).toBe(2);
  });

  it('should render the signup form with password input', () => {
    const { getByPlaceholderText } = component;
    const element = getByPlaceholderText(/Confirm Password/i);
    expect(element).toBeInTheDocument();
  });
});
