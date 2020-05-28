import { logInUser, logOutUser } from '../actions/index';
import userReducer from '../reducers/user';

describe('User reducer', () => {
  let user;

  beforeAll(() => {
    user = {
      firstName: 'Jon',
      lastName: 'Doe',
      token: 'fi0sdjgaf0asdnffdsgg9kfd',
    };
  });

  it('logInUser should return user back in the state', () => {
    const state = userReducer([], logInUser(user));
    expect(state.token).toEqual(user.token);
  });

  it('logOutUser should return back default state', () => {
    const logInState = userReducer([], logInUser(user));
    const logOutState = userReducer(logInState, logOutUser());
    expect(logOutState.token).toEqual('');
  });
});
