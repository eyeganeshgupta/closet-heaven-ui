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
