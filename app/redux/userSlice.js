import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  successMessage: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Load User
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // Sign-in (Registration)
    signInRequest: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.successMessage = "User registered successfully!";
      state.error = null;
    },
    signInFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Login
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // Logout
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.successMessage = "User logged out successfully!";
      state.error = null;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear Errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
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
} = userSlice.actions;

export default userSlice.reducer;