import { setServicesToActiveComponent, setAppointmentsToActiveComponent, changeNavbarState } from '../actions/index';
import componentReducer from '../reducers/component';

const SERVICES = 'SERVICES';
const APPOINTMENTS = 'APPOINTMENTS';

describe('Component reducer', () => {
  it('setServicesToActiveComponent should service to active component', () => {
    const state = componentReducer([], setServicesToActiveComponent());
    expect(state.activeComponent).toEqual(SERVICES);
  });

  it('setAppointmentsToActiveComponent should service to active component', () => {
    const state = componentReducer([], setAppointmentsToActiveComponent());
    expect(state.activeComponent).toEqual(APPOINTMENTS);
  });

  it('changeNavbarState should change state of the navbar', () => {
    const state = componentReducer([], changeNavbarState());
    expect(state.navbarOpen).toBe(true);
  });
});
