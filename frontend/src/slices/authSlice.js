import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    isAuthenticated: false,
  },
  reducers: {
    loginRequest(state, action) {
      return {
        ...state,
        loading: true,
        // isAuthenticated: false =>instead of this can use spread op and get the state becasue no change
        //which is in init state
      };
    },
    loginSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

const { actions, reducer } = authSlice;

export const { loginRequest, loginSuccess, loginFail, clearError } = actions;

export default reducer;
