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
  categories: [],
  category: {},
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};

// ! create category action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async ({ name, file }, { rejectWithValue, getState, dispatch }) => {
    try {
      // TODO 01: get the token for Authentication
      const token = getState().users?.userAuth?.userInfo?.token;

      // TODO 02: Pass the token for Authentication
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      // TODO 03: FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);

      // TODO 04: make the request
      const { data } = await axios.post(
        `${baseURL}/categories`,
        formData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! fetch all categories action
export const fetchAllCategoriesAction = createAsyncThunk(
  "category/fetch-all-categories",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // TODO: make the request
      const { data } = await axios.get(`${baseURL}/categories`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! category slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    // * ----- handle create category lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
      state.categories = [];
      state.category = {};
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = [];
      state.category = action.payload;
      state.isAdded = true;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = [];
      state.category = {};
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- handle fetch all categories lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(fetchAllCategoriesAction.pending, (state) => {
      state.loading = true;
      state.categories = [];
      state.category = {};
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(fetchAllCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.category = {};
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(fetchAllCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = [];
      state.category = {};
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
const categoryReducer = categorySlice.reducer;

export default categoryReducer;
