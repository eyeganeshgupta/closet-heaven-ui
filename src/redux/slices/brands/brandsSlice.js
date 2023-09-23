import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

// * initialState
const initialState = {
  loading: false,
  brands: [],
  brand: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};

// ! create brand action
export const createBrandAction = createAsyncThunk(
  "brand/create",
  async (name, { rejectWithValue, getState, dispatch }) => {
    try {
      // TODO 01: get the token for Authentication
      const token = getState().users?.userAuth?.userInfo?.token;

      // TODO 02: Pass the token for Authentication
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // TODO 03: make the request
      const { data } = await axios.post(
        `${baseURL}/brands`,
        {
          name,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
