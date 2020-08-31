import {
  FETCH_USER_ERROR,
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
} from '../constants'

// simple reducer
// I don't really think I even need to use redux to make this app work,
// but I already committed to my decision so...
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