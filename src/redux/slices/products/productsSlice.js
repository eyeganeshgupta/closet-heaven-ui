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

// ! fetch single product action
export const fetchProductAction = createAsyncThunk(
  "product/fetch-single-product",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/products/${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! update product action
export const updateProductAction = createAsyncThunk(
  "product/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      // TODO 00: destruct payload
      const {
        id,
        name,
        description,
        brand,
        category,
        sizes,
        colors,
        price,
        totalQty,
      } = payload;

      // TODO 01: get the token for Authentication
      const token = getState().users?.userAuth?.userInfo?.token;

      // TODO 02: Pass the token for Authentication
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // TODO 04: make the request
      const { data } = await axios.put(
        `${baseURL}/products/${id}`,
        {
          name,
          description,
          brand,
          category,
          sizes,
          colors,
          price,
          totalQty,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! products slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    // * ----- handle create product lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
      state.products = [];
      state.product = {};
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = [];
      state.product = action.payload;
      state.isAdded = true;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.product = {};
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- handle fetch all products lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(fetchAllProductsAction.pending, (state) => {
      state.loading = true;
      state.products = [];
      state.product = {};
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(fetchAllProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.product = {};
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(fetchAllProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.product = {};
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- handle fetch single product lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(fetchProductAction.pending, (state) => {
      state.loading = true;
      state.products = [];
      state.product = {};
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = [];
      state.product = action.payload;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(fetchProductAction.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.product = {};
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- handle update product lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(updateProductAction.pending, (state) => {
      state.loading = true;
      state.products = [];
      state.product = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    });

    // ? fulfilled
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = [];
      state.product = action.payload;
      state.isAdded = false;
      state.isUpdated = true;
      state.isDeleted = false;
      state.error = null;
    });

    // ? rejected
    builder.addCase(updateProductAction.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.product = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = action.payload;
    });

    // * ----- reset success action -----
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
      state.isUpdated = false;
    });

    // * ----- reset error action -----
    builder.addCase(resetErrorAction.pending, (state) => {
      state.error = null;
    });
  },
});

// ! generate the reducer
const productsReducer = productsSlice.reducer;

export default productsReducer;
