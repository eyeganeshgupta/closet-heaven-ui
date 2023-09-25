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

// ! remove product from cart action
export const removeOrderFromCartAction = createAsyncThunk(
  "cart/remove-from-cart",
  async (productId) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const newItems = cartItems?.filter((item) => {
      return item?._id.toString() !== productId.toString();
    });

    // TODO: push to localStorage
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    // * ----- handle add to cart lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(addOrderToCartAction.pending, (state) => {
      state.loading = true;
      state.cartItems = [];
      state.error = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
    });

    // ? fullfilled
    builder.addCase(addOrderToCartAction.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      state.error = null;
      state.isAdded = true;
      state.isUpdated = false;
      state.isDeleted = false;
    });

    // ? rejected
    builder.addCase(addOrderToCartAction.rejected, (state, action) => {
      state.loading = false;
      state.cartItems = null;
      state.error = action.payload;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
    });

    // * ----- get cart items from localStorage lifecycle - pending, fulfilled, rejected -----
    // ? pending
    builder.addCase(getCartItemsFromLocalStorageAction.pending, (state) => {
      state.loading = true;
      state.cartItems = [];
      state.error = null;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
    });

    // ? fullfilled
    builder.addCase(
      getCartItemsFromLocalStorageAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.error = null;
        state.isAdded = false;
        state.isUpdated = false;
        state.isDeleted = false;
      }
    );

    // ? rejected
    builder.addCase(
      getCartItemsFromLocalStorageAction.rejected,
      (state, action) => {
        state.loading = false;
        state.cartItems = null;
        state.error = action.payload;
        state.isAdded = false;
        state.isUpdated = false;
        state.isDeleted = false;
      }
    );
  },
});

// * generate reducer
const cartReducer = cartSlice.reducer;

export default cartReducer;
