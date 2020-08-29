import { combineReducers } from 'redux';

import user from './user.reducer';

const reducers = {
  user
};

export default combineReducers(reducers);
