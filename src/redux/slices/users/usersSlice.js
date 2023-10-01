import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrorAction } from "../globalActions/globalActions";

// ! initialState
const initialState = {
  loading: false,
  users: [],
  user: null,
  profile: null,
  userAuth: {
    loading: false,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    error: null,
  },
  error: null,
};

// ! login action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      // TODO 01: make http request
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });

      // TODO 02: save the user into localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (
    { fullname, email, password },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      // TODO 01: make the http request
      const { data } = await axios.post(`${baseURL}/users/register`, {
        fullname,
        email,
        password,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! update user shipping address
export const updateUserShippingAddressAction = createAsyncThunk(
  "users/update-shipping-address",
  async (
    {
      firstName,
      lastName,
      address,
      city,
      country,
      state,
      postalCode,
      contactNo,
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // TODO: make http request
      const { data } = await axios.put(
        `${baseURL}/users/update/shipping`,
        {
          firstName,
          lastName,
          address,
          city,
          country,
          state,
          postalCode,
          contactNo,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! get user profile action
export const getUserProfileAction = createAsyncThunk(
  "users/get-user-profile",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // TODO: make http request
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! logout user action
export const logoutUserAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    localStorage.removeItem("userInfo");
    return true;
  }
);

// ! users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // * ----- handle login lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(loginUserAction.pending, (state) => {
      state.userAuth.loading = true;
      state.userAuth.userInfo = null;
      state.userAuth.error = null;
    });

    // ? fulfilled
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.loading = false;
      state.userAuth.userInfo = action.payload;
      state.userAuth.error = null;
    });

    // ? rejected
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.loading = false;
      state.userAuth.userInfo = null;
      state.userAuth.error = action.payload;
    });

    // * ----- handle register lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });

    // ? rejected
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    });

    // * ----- handle update shipping address lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(updateUserShippingAddressAction.pending, (state) => {
      state.loading = true;
    });

    // ? fulfilled
    builder.addCase(
      updateUserShippingAddressAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      }
    );

    // ? rejected
    builder.addCase(
      updateUserShippingAddressAction.rejected,
      (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      }
    );

    // * ----- handle get profile lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(getUserProfileAction.pending, (state) => {
      state.loading = true;
      state.profile = null;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
    });

    // ? rejected
    builder.addCase(getUserProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.profile = null;
      state.error = action.payload;
    });

    // ! ----- handle logout user -----
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = null;
    });

    // * ----- reset error action -----
    builder.addCase(resetErrorAction.pending, (state) => {
      state.error = null;
    });
  },
});

// TODO: generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
