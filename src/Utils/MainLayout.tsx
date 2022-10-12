import React from "react";
import { Outlet } from "react-router-dom";
import Categories from "../Components/Categories";
import Downloader from "../Components/Downloader";
import ErrorPage from "../Components/Error";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useAppDispatch } from "../Hooks/Redux";
import { useMeQuery } from "../Services/LoginService";
import { setCredentials } from "../Store/Slices/AuthSlice";

const MainLayout: React.FC = () => {
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
  if (error) {
    return <ErrorPage />;
  } else if (isLoading) {
    return <Downloader />;
  }
  return (
    <div className="max-w-screen-xl flex items-center flex-col min-h-screen mx-auto">
      <div className="flex w-full items-center flex-col flex-[1_0_auto]">
        <div className="min-w-full flex items-center justify-start">
          <div className="block md:hidden">
            <Categories />
          </div>
          <Header />
        </div>
        <div className="w-full">
          <div className="max-w-full">
            <div className="hidden md:block">
              <Categories />
            </div>
            <div className="mt-5 min-w-full mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[0_0_auto] w-full">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
