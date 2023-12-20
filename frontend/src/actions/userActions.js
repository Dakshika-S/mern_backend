import {
  clearError,
  loginFail,
  loginRequest,
  loginSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  logoutSuccess,
  logoutFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updatePasswordSuccess,
  updatePasswordFail,
  updatePasswordRequest,
} from "../slices/authSlice";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`/api/v1/login`, { email, password });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(`/api/v1/register`, userData, config);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};

export const loadUser = async (dispatch) => {
  /*not going to send any data*/

  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`/api/v1/myprofile`); //will return data that why got data in destructuring method
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

// export const logout = async (dispatch) => {
//   try {
//     await axios.get(`/api/v1/logout`); //this api not going to return any data so only a api call
//     dispatch(logoutSuccess);
//   } catch (error) {
//     dispatch(logoutFail);
//   }
// };

export const logout = async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail);
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(`/api/v1/update`, userData, config);
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};
export const updatePassword = (formData) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    const config = {
      // when creating formData object browswer autaomatically sends multipart data inodert chang this into json have to inser this code bcz in backeng we coded to recieve a json data
      headers: { "Content-type": "application/json" },
    };

    {
      /* // const { data } = not going to return anything so no need*/
    }
    await axios.put(`/api/v1/password/change`, formData, config);
    dispatch(updatePasswordSuccess());
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};
