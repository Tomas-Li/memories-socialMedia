import * as api from '../api';

import { AUTH as CONST } from '../Constants'

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //We have to send the data towards our backend for authentication purposes
    const { data } = await api.signIn(formData);

    dispatch({ type: CONST.auth, data });

    navigate('/');
  } catch (error) {
    console.error(error)
  }
}

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //We have to send the data towards our backend for verification and saving purposes
    const { data } = await api.signUp(formData);

    dispatch({ type: CONST.auth, data });

    navigate('/');
  } catch (error) {
    console.error(error)
  }
}

export const logout = () => async (dispatch) => {
  dispatch({ type: CONST.logout });
}