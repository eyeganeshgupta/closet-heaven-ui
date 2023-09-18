import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../redux/slices/users/usersSlice";
import AdminOnly from "../NotAuthorized/AdminOnly";

const AdminAuthRoute = ({ children }) => {
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

  if (!isAdmin) {
    return <AdminOnly />;
  }

  return <>{children}</>;
};

export default AdminAuthRoute;
