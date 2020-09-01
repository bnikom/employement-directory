import {
  FETCH_USER_ERROR,
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
} from '../constants'

// reducer for different case states
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_LOADING: {
      return {
        ...state
      };
    }
    case FETCH_USER_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload, 
      }
    }
    default:
      return state;
  }
};