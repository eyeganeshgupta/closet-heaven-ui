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
