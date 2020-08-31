import { combineReducers } from 'redux';

import employees from './employees.reducer';
import employee from './employee.reducer';

const reducers = {
  employee,
  employees
};

export default combineReducers(reducers);
