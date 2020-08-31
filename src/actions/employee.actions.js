import axios from 'axios';
import {
  FETCH_USER_ERROR,
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
  FETCH_EMPLOYEES_ERROR,
  FETCH_EMPLOYEES_LOADING,
  FETCH_EMPLOYEES_SUCCESS,
} from '../constants'

// fetch indiv user from node api
export const fetchUser = (employeeId) => async (dispatch, getState) => {
  dispatch({ type: FETCH_USER_LOADING })
  try {
    const response = await axios.get(`http://localhost:8080/api/employee/${employeeId}`)

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {

    dispatch({
      type: FETCH_USER_ERROR,
      payload: error
    });
  }
};


// fetch employee search or all employees
export const fetchEmployees = (searchTerm = '') => async (dispatch, getState) => {
  dispatch({ type: FETCH_EMPLOYEES_LOADING })
  try {
    const response = await axios.get(`http://localhost:8080/api/employees?searchTerm=${searchTerm}`);

    dispatch({
      type: FETCH_EMPLOYEES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {

    dispatch({
      type: FETCH_EMPLOYEES_ERROR,
      payload: error
    });
  }
};