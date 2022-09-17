import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch } from "../Hooks/Redux";
import { useAuth } from "../Hooks/useAuthAdmin";
import { useMeQuery } from "../Services/LoginService";
import { setCredentials } from "../Store/Slices/AuthSlice";

const PrivateOutlet: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: response, error, isLoading } = useMeQuery("");
  React.useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(
        setCredentials({
          token: response?.token,
          email: response?.email,
          isAdmin: response?.isAdmin,
        })
      );
    }
  });
  const auth = useAuth();
  const location = useLocation();
  if (error) {
    return <h1>Произошла ошибка при авторизации</h1>;
  } else if (isLoading) {
    return <h1>Идет аутентификация</h1>;
  }
  return auth.user || window.localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateOutlet;
