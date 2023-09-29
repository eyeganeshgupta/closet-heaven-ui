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
  products: [],
  product: {},
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};

// ! create product action
export const createProductAction = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      // TODO 00: destruct payload
      const {
        name,
        description,
        brand,
        category,
        sizes,
        colors,
        price,
        totalQty,
        files,
      } = payload;

      // TODO 01: get the token for Authentication
      const token = getState().users?.userAuth?.userInfo?.token;

      // TODO 02: Pass the token for Authentication
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      // TODO 03: Create the product with images
      // * FormData
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("category", category);
      sizes.forEach((size) => {
        formData.append("sizes", size);
      });
      colors.forEach((color) => {
        formData.append("colors", color);
      });
      formData.append("price", price);
      formData.append("totalQty", totalQty);
      files.forEach((file) => {
        formData.append("files", file);
      });

      // TODO 04: make the request
      const { data } = await axios.post(
        `${baseURL}/products`,
        formData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! fetch all products action
export const fetchAllProductsAction = createAsyncThunk(
  "product/fetch-all-products",
  async ({ url }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${url}`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
