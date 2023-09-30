import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

// ! initialState
const initialState = {
  loading: false,
  reviews: [],
  review: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};

// ! create review action
export const createReviewAction = createAsyncThunk(
  "review/create",
  async ({ rating, message, id }, { rejectWithValue, getState, dispatch }) => {
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
        `${baseURL}/reviews/${id}`,
        {
          rating,
          message,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! reviews slice
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    // * ----- handle create review lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(createReviewAction.pending, (state) => {
      state.loading = true;
      state.reviews = [];
      state.review = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(createReviewAction.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = [];
      state.review = action.payload;
      state.isAdded = true;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(createReviewAction.rejected, (state, action) => {
      state.loading = false;
      state.reviews = [];
      state.review = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- reset success action -----
    builder.addCase(resetSuccessAction.pending, (state) => {
      state.isAdded = false;
    });

    // * ----- reset error action -----
    builder.addCase(resetErrorAction.pending, (state) => {
      state.error = null;
    });
  },
});

// ! generate the reducer
const reviewsReducer = reviewsSlice.reducer;

export default reviewsReducer;
