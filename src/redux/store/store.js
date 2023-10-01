import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productsReducer from "../slices/products/productsSlice";
import categoryReducer from "../slices/categories/categoriesSlice";
import brandsReducer from "../slices/brands/brandsSlice";
import colorsReducer from "../slices/colors/colorsSlice";
import cartReducer from "../slices/cart/cartSlice";
import couponsReducer from "../slices/coupons/couponsSlice";
import ordersReducer from "../slices/orders/ordersSlice";
import reviewsReducer from "../slices/reviews/reviewsSlice";

// * store
const store = configureStore({
  reducer: {
    brands: brandsReducer,
    cart: cartReducer,
    categories: categoryReducer,
    colors: colorsReducer,
    coupons: couponsReducer,
    orders: ordersReducer,
    products: productsReducer,
    reviews: reviewsReducer,
    users: usersReducer,
  },
});

export default store;
