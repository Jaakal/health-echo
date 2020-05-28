import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import LogIn from '../components/login';

const mockStore = configureStore([]);

describe('Login', () => {
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
          <LogIn />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render the login form with login button', () => {
    const { getByText } = component;
    const element = getByText(/Login/i);
    expect(element).toBeInTheDocument();
  });

  it('should render the login form with Sign Up button', () => {
    const { getByText } = component;
    const element = getByText(/Sign Up/i);
    expect(element).toBeInTheDocument();
  });

  it('should render the login form with email input', () => {
    const { getByPlaceholderText } = component;
    const element = getByPlaceholderText(/Email/i);
    expect(element).toBeInTheDocument();
  });

  it('should render the login form with password input', () => {
    const { getByPlaceholderText } = component;
    const element = getByPlaceholderText(/Password/i);
    expect(element).toBeInTheDocument();
  });
});
