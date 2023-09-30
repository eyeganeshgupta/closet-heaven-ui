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
