import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageCoupons from "./components/Admin/Coupons/ManageCoupons";
import AddCoupon from "./components/Admin/Coupons/AddCoupon";
import Login from "./components/Users/Forms/Login";
import AddProduct from "./components/Admin/Products/AddProduct";
import RegisterForm from "./components/Users/Forms/RegisterForm";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import OrderHistory from "./components/Admin/Orders/ManageOrders";
import OrderPayment from "./components/Users/Products/OrderPayment";
import ManageCategories from "./components/Admin/Categories/ManageCategories";
import UpdateProduct from "./components/Admin/Products/UpdateProduct";
import ManageStocks from "./components/Admin/Products/ManageStocks";
import CategoryToAdd from "./components/Admin/Categories/CategoryToAdd";
import AddCategory from "./components/Admin/Categories/AddCategory";
import AddBrand from "./components/Admin/Categories/AddBrand";
import AddColor from "./components/Admin/Categories/AddColor";
import AllCategories from "./components/HomePage/AllCategories";
import UpdateCoupon from "./components/Admin/Coupons/UpdateCoupon";
import Product from "./components/Users/Products/Product";
import ShoppingCart from "./components/Users/Products/ShoppingCart";
import ProductsFilters from "./components/Users/Products/ProductsFilters";
import CustomerProfile from "./components/Users/Profile/CustomerProfile";
import AddReview from "./components/Users/Reviews/AddReview";
import UpdateCategory from "./components/Admin/Categories/UpdateCategory";
import OrdersList from "./components/Admin/Orders/OdersList";
import ManageOrders from "./components/Admin/Orders/ManageOrders";
import Customers from "./components/Admin/Orders/Customers";
import BrandsList from "./components/Admin/Categories/BrandsList";
import ColorsList from "./components/Admin/Categories/ColorsList";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import AdminAuthRoute from "./components/AuthRoute/AdminAuthRoute";
import ThanksForOrdering from "./components/Users/Products/ThanksForOrdering";
import UpdateOrders from "./components/Admin/Orders/UpdateOrders";
import { getUserProfileAction } from "./redux/slices/users/usersSlice";

const App = () => {
  /*
  // ! dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  // TODO: get user from store
  const { userAuth } = useSelector((state) => {
    return state?.users;
  });

  const isAdmin = userAuth?.userInfo?.userFound?.isAdmin ? true : false;
  */

  return (
    <BrowserRouter>
      {/* hide navbar if admin
      {!isAdmin && <Navbar />}
  */}
      <Navbar />
      <Routes>
        {/* admin route */}
        <Route
          path="admin"
          element={
            <AdminAuthRoute>
              <AdminDashboard />
            </AdminAuthRoute>
          }
        >
          {/* products */}
          <Route
            path=""
            element={
              <AdminAuthRoute>
                <OrdersList />
              </AdminAuthRoute>
            }
          />
          <Route
            path="add-product"
            element={
              <AdminAuthRoute>
                <AddProduct />
              </AdminAuthRoute>
            }
          />
          <Route
            path="manage-products"
            element={
              <AdminAuthRoute>
                <ManageStocks />
              </AdminAuthRoute>
            }
          />
          <Route
            path="products/edit/:id"
            element={
              <AdminAuthRoute>
                <UpdateProduct />
              </AdminAuthRoute>
            }
          />
          {/* coupons */}
          <Route
            path="add-coupon"
            element={
              <AdminAuthRoute>
                <AddCoupon />
              </AdminAuthRoute>
            }
          />
          <Route
            path="manage-coupon"
            element={
              <AdminAuthRoute>
                <ManageCoupons />
              </AdminAuthRoute>
            }
          />
          <Route
            path="manage-coupon/edit/:code"
            element={
              <AdminAuthRoute>
                <UpdateCoupon />
              </AdminAuthRoute>
            }
          />
          {/* Category */}
          <Route
            path="category-to-add"
            element={
              <AdminAuthRoute>
                <CategoryToAdd />
              </AdminAuthRoute>
            }
          />{" "}
          <Route
            path="add-category"
            element={
              <AdminAuthRoute>
                <AddCategory />
              </AdminAuthRoute>
            }
          />
          <Route
            path="manage-category"
            element={
              <AdminAuthRoute>
                <ManageCategories />
              </AdminAuthRoute>
            }
          />
          <Route
            path="edit-category/:id"
            element={
              <AdminAuthRoute>
                <UpdateCategory />
              </AdminAuthRoute>
            }
          />
          {/* brand category */}
          <Route
            path="add-brand"
            element={
              <AdminAuthRoute>
                <AddBrand />
              </AdminAuthRoute>
            }
          />
          <Route path="all-brands" element={<BrandsList />} />
          {/* color category */}
          <Route
            path="add-color"
            element={
              <AdminAuthRoute>
                <AddColor />
              </AdminAuthRoute>
            }
          />
          <Route path="all-colors" element={<ColorsList />} />
          {/* Orders */}
          <Route
            path="manage-orders"
            element={
              <AdminAuthRoute>
                <ManageOrders />
              </AdminAuthRoute>
            }
          />
          <Route
            path="orders/:id"
            element={
              <AdminAuthRoute>
                <UpdateOrders />
              </AdminAuthRoute>
            }
          />
          <Route
            path="customers"
            element={
              <AdminAuthRoute>
                <Customers />
              </AdminAuthRoute>
            }
          />
        </Route>

        {/* public links */}
        {/* Products */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products-filters" element={<ProductsFilters />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route
          path="success"
          element={
            <AuthRoute>
              <ThanksForOrdering />
            </AuthRoute>
          }
        />

        {/* review */}
        <Route
          path="/add-review/:id"
          element={
            <AuthRoute>
              <AddReview />
            </AuthRoute>
          }
        />

        {/* shopping cart */}
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route
          path="/order-payment"
          element={
            <AuthRoute>
              <OrderPayment />
            </AuthRoute>
          }
        />

        {/* users */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/customer-profile"
          element={
            <AuthRoute>
              <CustomerProfile />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
