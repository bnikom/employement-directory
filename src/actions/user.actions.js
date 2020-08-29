import axios from 'axios';
import {
  FETCH_USER_ERROR,
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
} from '../constants'

export const fetchUser = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_USER_LOADING })
  try {
    const userResponse = await axios.get('https://randomuser.me/api/?seed=foobar')

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: userResponse.data,
    });
  } catch (error) {

    dispatch({
      type: FETCH_USER_ERROR,
      payload: error
    });
  }
};