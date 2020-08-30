import {
  FETCH_EMPLOYEES_ERROR,
  FETCH_EMPLOYEES_LOADING,
  FETCH_EMPLOYEES_SUCCESS,
} from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_LOADING: {
      return {
        ...state
      };
    }
    case FETCH_EMPLOYEES_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case FETCH_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        data: action.payload,
      }
    }
    default:
      return state;
  }
};