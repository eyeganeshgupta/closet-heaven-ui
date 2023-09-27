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
  coupons: [],
  coupon: null,
  isExists: false,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};

// ! create coupon action
export const createCouponAction = createAsyncThunk(
  "coupon/create",
  async (
    { code, discount, startDate, endDate },
    { rejectWithValue, getState, dispatch }
  ) => {
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
        `${baseURL}/coupons`,
        {
          code,
          discount,
          startDate,
          endDate,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! fetch all coupons action
export const fetchAllCouponsAction = createAsyncThunk(
  "coupon/fetch-all-coupons",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // TODO: make the request
      const { data } = await axios.get(`${baseURL}/coupons`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! fetch single coupons action
export const fetchCouponAction = createAsyncThunk(
  "coupon/fetch-single-coupon",
  async (code, { rejectWithValue, getState, dispatch }) => {
    try {
      // TODO: make the request
      const { data } = await axios.get(
        `${baseURL}/coupons/single?code=${code}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! update coupon action
export const updateCouponAction = createAsyncThunk(
  "coupon/update",
  async (
    { code, discount, startDate, endDate, id },
    { rejectWithValue, getState, dispatch }
  ) => {
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
      const { data } = await axios.put(
        `${baseURL}/coupons/update/${id}`,
        {
          code,
          discount,
          startDate,
          endDate,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! delete coupon action
export const deleteCouponAction = createAsyncThunk(
  "coupon/delete-coupon",
  async (id, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.delete(
        `${baseURL}/coupons/delete/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! coupons slice
const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  extraReducers: (builder) => {
    // * ----- handle create coupon lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(createCouponAction.pending, (state) => {
      state.loading = true;
      state.coupons = [];
      state.coupon = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(createCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupons = [];
      state.coupon = action.payload;
      state.isAdded = true;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(createCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.coupons = [];
      state.coupon = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- handle fetch all coupons lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(fetchAllCouponsAction.pending, (state) => {
      state.loading = true;
      state.coupons = [];
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(fetchAllCouponsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupons = action.payload;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(fetchAllCouponsAction.rejected, (state, action) => {
      state.loading = false;
      state.coupons = [];
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- handle fetch single coupons lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(fetchCouponAction.pending, (state) => {
      state.loading = true;
      state.coupon = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(fetchCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload;
      state.isExists = true;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(fetchCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.coupon = null;
      state.isExists = false;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- handle update coupon lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(updateCouponAction.pending, (state) => {
      state.loading = true;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(updateCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload;
      state.isUpdated = true;
      state.error = null;
    });

    // ? rejected
    builder.addCase(updateCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.coupon = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- handle delete coupon lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(deleteCouponAction.pending, (state) => {
      state.loading = true;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(deleteCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = true;
      state.error = null;
    });

    // ? rejected
    builder.addCase(deleteCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- reset success action -----
    builder.addCase(resetSuccessAction.pending, (state) => {
      state.isAdded = false;
      state.isExists = false;
      state.error = null;
    });

    // * ----- reset error action -----
    builder.addCase(resetErrorAction.pending, (state) => {
      state.isAdded = false;
      state.error = null;
    });
  },
});

// ! generate the reducer
const couponsReducer = couponsSlice.reducer;

export default couponsReducer;
