import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// * initialState
const initialState = {
  loading: false,
  cartItems: [],
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};
