import {
  FETCH_EMPLOYEES_ERROR,
  FETCH_EMPLOYEES_LOADING,
  FETCH_EMPLOYEES_SUCCESS,
} from '../constants'

// simple reducer
// I don't really think I even need to use redux to make this app work,
// but I already committed to my decision so...
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