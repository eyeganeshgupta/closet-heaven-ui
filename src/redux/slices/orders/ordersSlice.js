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
  orders: [],
  order: null,
  stats: null,
  isAdded: false,
  isUpdated: false,
  error: null,
};

// ! place order action
export const placeOrderAction = createAsyncThunk(
  "order/place-order",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { orderItems, shippingAddress, totalPrice } = payload;

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
        `${baseURL}/orders`,
        { orderItems, shippingAddress, totalPrice },
        config
      );

      return window.open(data?.url);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! fetch all orders action
export const fetchAllOrdersAction = createAsyncThunk(
  "order/fetch-all-orders",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${baseURL}/orders`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! fetch single order action
export const fetchOrderAction = createAsyncThunk(
  "order/fetch-single-order",
  async (orderId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/orders/${orderId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! fetch order stats
export const fetchOrdersStatsAction = createAsyncThunk(
  "order/fetch-orders-stats",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${baseURL}/orders/sales/stats`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! update order action
export const updateOrderAction = createAsyncThunk(
  "order/update-order",
  async ({ id, status }, { rejectWithValue, getState, dispatch }) => {
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
        `${baseURL}/orders/update/${id}`,
        { status },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! orders slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    // * ----- handle place an order lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(placeOrderAction.pending, (state) => {
      state.loading = true;
      state.orders = [];
      state.order = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(placeOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.order = action.payload;
      state.isAdded = true;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(placeOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.order = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- handle fetch all orders lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(fetchAllOrdersAction.pending, (state) => {
      state.loading = true;
      state.orders = [];
      state.order = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(fetchAllOrdersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.order = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(fetchAllOrdersAction.rejected, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.order = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- handle fetch single order lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(fetchOrderAction.pending, (state) => {
      state.loading = true;
      state.orders = [];
      state.order = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(fetchOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.order = action.payload;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(fetchOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.order = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- handle fetch orders stats lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(fetchOrdersStatsAction.pending, (state) => {
      state.loading = true;
      state.stats = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(fetchOrdersStatsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(fetchOrdersStatsAction.rejected, (state, action) => {
      state.loading = false;
      state.stats = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- handle update an order lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(updateOrderAction.pending, (state) => {
      state.loading = true;
      state.order = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(updateOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.isAdded = false;
      state.isUpdated = true;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(updateOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
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
const ordersReducer = ordersSlice.reducer;

export default ordersReducer;
