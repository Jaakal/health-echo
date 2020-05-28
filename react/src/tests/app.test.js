import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import App from '../components/app';

const mockStore = configureStore([]);

describe('App', () => {
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
          <App />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render the login form if user not logged in', () => {
    const { getByText } = component;
    const element = getByText(/Login/i);
    expect(element).toBeInTheDocument();
  });

  it('should render the signup form when clicked on the signup button', () => {
    act(() => {
      component.getByText(/Sign Up/i).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const { getByText } = component;
    const element = getByText(/Back to login/i);
    expect(element).toBeInTheDocument();
  });
});
