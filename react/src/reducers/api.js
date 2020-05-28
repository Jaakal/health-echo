const SET_API_BASE_URL = 'SET_API_BASE_URL';
const UNSET_API_BASE_URL = 'UNSET_API_BASE_URL';

const defaultState = {
  url: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_API_BASE_URL: {
      const newState = { ...state };
      newState.url = action.url;
      return newState;
    }
    case UNSET_API_BASE_URL: {
      const newState = { ...defaultState };
      return newState;
    }
    default:
      return state;
  }
};
