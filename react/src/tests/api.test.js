import { setUserApiBaseURL, unsetUserApiBaseURL } from '../actions/index';
import apiReducer from '../reducers/api';

describe('User reducer', () => {
  it('setUserApiBaseURL should set the URL', () => {
    const state = apiReducer([], setUserApiBaseURL('www.url.com'));
    expect(state.url).toEqual('www.url.com');
  });

  it('unsetUserApiBaseURL should set the URL', () => {
    const state = apiReducer([], setUserApiBaseURL('www.url.com'));
    const newState = apiReducer(state, unsetUserApiBaseURL());
    expect(newState.url).toEqual('');
  });
});
