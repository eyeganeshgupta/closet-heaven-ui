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

// ! get cart items from localStorage action
export const getCartItemsFromLocalStorageAction = createAsyncThunk(
  "cart/get-order-items",
  async () => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    return cartItems;
  }
);

// ! change order item quantity action
export const changeOrderItemQuantityAction = createAsyncThunk(
  "cart/change-orderItem-qty",
  async ({ productId, qty }) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const newCartItems = cartItems?.map((item) => {
      if (item?._id?.toString() === productId?.toString()) {
        // TODO: calculate newPrice
        const newPrice = item?.price * qty;
        item.qty = Number(qty);
        item.totalPrice = newPrice;
      }
      return item;
    });

    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }
);
