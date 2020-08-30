import { combineReducers } from 'redux';

import employee from './employee.reducer';
import employees from './employees.reducer';

const reducers = {
  employees,
  employee
};

export default combineReducers(reducers);
