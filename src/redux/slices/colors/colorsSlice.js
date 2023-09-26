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
  colors: [],
  color: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};

// ! create color action
export const createColorAction = createAsyncThunk(
  "color/create",
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
        `${baseURL}/colors`,
        {
          name,
        },
        config
      );

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! fetch all colors action
export const fetchAllColorsAction = createAsyncThunk(
  "color/fetch-all-colors",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // TODO: make the request
      const { data } = await axios.get(`${baseURL}/colors`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! color slice
const colorsSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    // * ----- handle create color lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(createColorAction.pending, (state) => {
      state.loading = true;
      state.colors = [];
      state.color = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = [];
      state.color = action.payload;
      state.isAdded = true;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false;
      state.colors = [];
      state.color = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- handle fetch all colors lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(fetchAllColorsAction.pending, (state) => {
      state.loading = true;
      state.colors = [];
      state.color = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(fetchAllColorsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
      state.color = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(fetchAllColorsAction.rejected, (state, action) => {
      state.loading = false;
      state.colors = [];
      state.color = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- reset success action -----
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });

    // * ----- reset error action -----
    builder.addCase(resetErrorAction.pending, (state) => {
      state.error = null;
    });
  },
});

// ! generate the reducer
const colorsReducer = colorsSlice.reducer;

export default colorsReducer;
