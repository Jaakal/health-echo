import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import NavBar from '../components/navbar';

const mockStore = configureStore([]);

describe('Navbar', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      user: {
        firstName: 'Jon',
        lastName: 'Doe',
        token: 'ml124kmlk423m4ml42k34m',
      },
      component: {
        activeComponent: 'SERVICES',
        navbarOpen: true,
      },
    });

    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render the navbar with user data', () => {
    const { getByText } = component;
    const element = getByText(/Jon Doe/i);
    expect(element).toBeInTheDocument();
  });

  it('should render the navbar with services button', () => {
    const { getByText } = component;
    const element = getByText(/SERVICES/i);
    expect(element).toBeInTheDocument();
  });

  it('should render the navbar with appointments button', () => {
    const { getByText } = component;
    const element = getByText(/APPOINTMENTS/i);
    expect(element).toBeInTheDocument();
  });

  it('should render the navbar with logout button', () => {
    const { getByText } = component;
    const element = getByText(/LOGOUT/i);
    expect(element).toBeInTheDocument();
  });
});
