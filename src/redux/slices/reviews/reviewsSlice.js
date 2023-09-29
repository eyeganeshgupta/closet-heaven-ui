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
