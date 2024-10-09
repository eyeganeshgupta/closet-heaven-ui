import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AddBrand from "./components/Admin/Categories/AddBrand";
import AddCategory from "./components/Admin/Categories/AddCategory";
import AddColor from "./components/Admin/Categories/AddColor";
import BrandsList from "./components/Admin/Categories/BrandsList";
import CategoryToAdd from "./components/Admin/Categories/CategoryToAdd";
import ColorsList from "./components/Admin/Categories/ColorsList";
import ManageCategories from "./components/Admin/Categories/ManageCategories";
import UpdateCategory from "./components/Admin/Categories/UpdateCategory";
import AddCoupon from "./components/Admin/Coupons/AddCoupon";
import ManageCoupons from "./components/Admin/Coupons/ManageCoupons";
import UpdateCoupon from "./components/Admin/Coupons/UpdateCoupon";
import Customers from "./components/Admin/Orders/Customers";
import ManageOrders from "./components/Admin/Orders/ManageOrders";
import OrdersList from "./components/Admin/Orders/OdersList";
import UpdateOrders from "./components/Admin/Orders/UpdateOrders";
import AddProduct from "./components/Admin/Products/AddProduct";
import ManageStocks from "./components/Admin/Products/ManageStocks";
import UpdateProduct from "./components/Admin/Products/UpdateProduct";
import AdminAuthRoute from "./components/AuthRoute/AdminAuthRoute";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import AllCategories from "./components/HomePage/AllCategories";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Users/Forms/Login";
import RegisterForm from "./components/Users/Forms/RegisterForm";
import OrderPayment from "./components/Users/Products/OrderPayment";
import Product from "./components/Users/Products/Product";
import ProductsFilters from "./components/Users/Products/ProductsFilters";
import ShoppingCart from "./components/Users/Products/ShoppingCart";
import ThanksForOrdering from "./components/Users/Products/ThanksForOrdering";
import CustomerProfile from "./components/Users/Profile/CustomerProfile";
import AddReview from "./components/Users/Reviews/AddReview";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminAuthRoute>
              <AdminDashboard />
            </AdminAuthRoute>
          }
        >
          <Route index element={<OrdersList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-products" element={<ManageStocks />} />
          <Route path="products/edit/:id" element={<UpdateProduct />} />
          <Route path="add-coupon" element={<AddCoupon />} />
          <Route path="manage-coupon" element={<ManageCoupons />} />
          <Route path="manage-coupon/edit/:code" element={<UpdateCoupon />} />

          {/* Category Routes */}
          <Route path="category/to-add" element={<CategoryToAdd />} />
          <Route path="category/add" element={<AddCategory />} />
          <Route path="category/manage" element={<ManageCategories />} />
          <Route path="category/edit/:id" element={<UpdateCategory />} />
          <Route path="category/add-brand" element={<AddBrand />} />
          <Route path="category/all-brands" element={<BrandsList />} />
          <Route path="category/add-color" element={<AddColor />} />
          <Route path="category/all-colors" element={<ColorsList />} />

          {/* Order Routes */}
          <Route path="orders/manage" element={<ManageOrders />} />
          <Route path="orders/:id" element={<UpdateOrders />} />
          <Route path="orders/customers" element={<Customers />} />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products-filters" element={<ProductsFilters />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />

        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<RegisterForm />} />
        <Route
          path="/auth/order-payment"
          element={
            <AuthRoute>
              <OrderPayment />
            </AuthRoute>
          }
        />
        <Route
          path="/auth/success"
          element={
            <AuthRoute>
              <ThanksForOrdering />
            </AuthRoute>
          }
        />
        <Route
          path="/auth/customer-profile"
          element={
            <AuthRoute>
              <CustomerProfile />
            </AuthRoute>
          }
        />
        <Route
          path="/auth/add-review/:id"
          element={
            <AuthRoute>
              <AddReview />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
