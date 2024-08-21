import axios from "axios";
import {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  signInRequest,
  signInSuccess,
  signInFail,
  loginRequest,
  loginSuccess,
  loginFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  clearErrors,
} from "./userSlice";

// Load User Action
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${server}/user/load-user`, {
      withCredentials: true, // Send cookies with request
    });

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(error.response?.data?.message || error.message));
  }
};

// User Registration Action
export const signIn = (userData) => async (dispatch) => {
  try {
    dispatch(signInRequest());

    const { data } = await axios.post(`${server}/sign-up`, userData, {
      withCredentials: true,
    });

    dispatch(signInSuccess(data.user));
  } catch (error) {
    dispatch(signInFail(error.response?.data?.message || error.message));
  }
};

// User Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      { withCredentials: true }
    );

    dispatch(loginSuccess(data.user));
  } catch (error) {
    dispatch(loginFail(error.response?.data?.message || error.message));
  }
};

// User Logout Action
export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());

    await axios.get(`${server}/logout`, { withCredentials: true });

    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.response?.data?.message || error.message));
  }
};

// Clear Errors Action
export const clearErrorsAction = () => (dispatch) => {
  dispatch(clearErrors());
};