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

// ! add product to cart action
export const addOrderToCartAction = createAsyncThunk(
  "cart/add-to-cart",
  async (cartItem) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    // TODO: push to storage
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
);
