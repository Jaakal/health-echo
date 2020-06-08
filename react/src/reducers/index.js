import { combineReducers } from 'redux';

import user from './user';
import api from './api';
import component from './component';

export default combineReducers({ user, api, component });
